import { LitElement, html, nothing, type PropertyValues } from "lit";
import Sortable from "sortablejs";
import { createItem, deleteItem, fetchHistory, setStatus, subscribeBoard, updateItem, type Hass } from "./api";
import { addDays, firstWeekday, parseDue, startOfDay, weekRange, ymd } from "./logic/dates";
import { columnOf, type ColumnId, type Ctx } from "./logic/columns";
import { dropPatch, isDrag, type Patch } from "./logic/drop";
import { retryDelay } from "./logic/retry";
import { keepDefined } from "./register";
import { t, tn, type Key } from "./i18n";
import { styles } from "./styles";
import type { Board, Item, Priority } from "./types";
import { changedFields, draftOf, emptyDraft, fieldsOf, quickDate, renderDialog, type Draft } from "./ui/detail-dialog";
import { renderBoard } from "./ui/board";
import { renderFilters, type FilterState } from "./ui/filters";
import { renderHistory, type HistoryState } from "./ui/history-dialog";
import type { Env } from "./ui/item-card";

export interface CardConfig {
  type: string;
  columns?: ColumnId[];
  done_days?: 1 | 3 | 7 | 30;
  group?: "date" | "priority";
  parents?: string[];
  people?: string[];
  week_end?: "auto" | "saturday" | "sunday";
}

const DEFAULT_COLUMNS: ColumnId[] = ["todo", "week", "today", "done"];
const HISTORY_PAGE = 50;

class HouseholdKanbanCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _board: { state: true },
    _filter: { state: true },
    _expanded: { state: true },
    _loadFailed: { state: true },
    _notice: { state: true },
    _draft: { state: true },
    _busy: { state: true },
    _dlgError: { state: true },
    _hist: { state: true },
  };
  static styles = styles;

  hass?: Hass;
  _config?: CardConfig;
  _board?: Board;
  _filter: FilterState = { who: null, parent: null, group: "date" };
  _expanded = new Set<string>();
  _loadFailed = false;
  _notice?: "err_update";
  _draft?: Draft;
  _busy = false;
  _dlgError?: Key;
  _hist?: HistoryState;
  private _hq = 0; // bumped per filter change/close: a response of an older query is dropped
  private _hTimer?: number;
  private _hObs?: IntersectionObserver;
  private _hMore: { el: HTMLElement; n: number } | null = null;
  private _ctx?: Ctx;
  private _down?: { x: number; y: number; t: number };
  private _sortables = new Map<HTMLElement, Sortable>();
  private _dragFrom?: { parent: Node; next: Node | null };
  private _pending?: Board;
  private _seq = 0; // bumped per opened dialog, so a late write cannot touch a newer one
  private _returnTo?: () => HTMLElement | null | undefined;
  private _unsub?: Promise<() => void>;
  private _retry?: number;
  private _attempts = 0;

  constructor() {
    super();
    this.addEventListener("pointerdown", (e) => { this._down = { x: e.clientX, y: e.clientY, t: e.timeStamp }; }, true);
  }

  setConfig(config: CardConfig): void {
    this._config = config;
    this._filter = { ...this._filter, group: config.group ?? "date" };
  }

  getCardSize(): number { return 8; }

  connectedCallback(): void {
    super.connectedCallback();
    this._subscribe();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._retry);
    this._retry = undefined;
    this._sortables.forEach((s) => s.destroy());
    this._sortables.clear();
    this._endDrag(); // destroy() does not fire `end`; do not hold board pushes forever
    window.clearTimeout(this._hTimer);
    this._hObs?.disconnect();
    this._hObs = undefined;
    this._hMore = null;
    void this._unsub?.then((u) => u()).catch(() => undefined);
    this._unsub = undefined;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass")) this._subscribe();
  }

  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  private _subscribe(): void {
    if (this._unsub || this._retry !== undefined || !this.hass || !this.isConnected) return;
    const p = subscribeBoard(this.hass, (board) => {
      if (this._dragFrom) { this._pending = board; return; } // applied when the drag ends
      this._board = board; this._loadFailed = false;
    });
    this._unsub = p;
    p.then(() => { if (this._unsub === p) this._attempts = 0; }, () => {
      if (this._unsub !== p) return; // a newer subscription replaced this one
      this._unsub = undefined;
      this._loadFailed = true;
      this._retry = window.setTimeout(() => { this._retry = undefined; this._subscribe(); }, retryDelay(this._attempts++));
    });
  }

  private _fail(key: "err_update"): void {
    this._notice = key;
    window.setTimeout(() => { this._notice = undefined; }, 5000);
  }

  /** Run a write from inside the dialog; close it on success, show the error in it otherwise. */
  private async _dialogWrite(err: Key, write: () => Promise<unknown>): Promise<void> {
    const seq = this._seq;
    this._busy = true;
    this._dlgError = undefined;
    try {
      await write();
      if (seq === this._seq) this._draft = undefined;
    } catch (e) {
      console.warn("household_kanban: write failed", e);
      if (seq === this._seq) this._dlgError = err;
    } finally {
      if (seq === this._seq) this._busy = false;
    }
  }

  private _save(): void {
    const hass = this.hass, d = this._draft;
    if (!hass || !d) return;
    const item = d.uid ? this._board?.items.find((i) => i.uid === d.uid) : undefined;
    if (d.uid && !item) { this._dlgError = "err_save"; return; } // deleted meanwhile: never turn an edit into a create
    void this._dialogWrite("err_save", () => item
      ? updateItem(hass, item.uid, changedFields(item, d))
      : createItem(hass, fieldsOf(d)));
  }

  /** Tap on a card; a click that ends a drag is not a tap. */
  private _open(item: Item, ev: Event): void {
    const me = ev as MouseEvent, down = this._down;
    this._down = undefined;
    // detail 0 = keyboard activation: there is no pointer to compare with
    if (me.detail !== 0 && down && isDrag(me.clientX - down.x, me.clientY - down.y, ev.timeStamp - down.t)) return;
    // compared in JS, not via a selector: a uid may contain quotes or backslashes
    this._openDialog(draftOf(item), () => [...this.renderRoot.querySelectorAll<HTMLElement>("[data-uid]")].find((e) => e.dataset.uid === item.uid)?.querySelector<HTMLElement>(".title"));
  }

  private _openDialog(draft: Draft, returnTo: () => HTMLElement | null | undefined): void {
    this._seq++;
    this._busy = false; // an older dialog's write no longer owns the flag
    this._dlgError = undefined;
    this._returnTo = returnTo;
    this._draft = draft;
  }

  private _openHistory(returnTo: string): void {
    if (this._draft || this._hist) return;
    this._returnTo = () => this.renderRoot.querySelector<HTMLElement>(returnTo);
    this._hist = { search: "", parent: null, items: [], total: 0, loading: false };
    void this._loadHistory(true);
  }

  private _closeHistory(): void {
    window.clearTimeout(this._hTimer);
    this._hq++;
    this._hist = undefined;
  }

  /** `reset` starts over at offset 0 for the current filters; otherwise appends the next page. */
  private async _loadHistory(reset: boolean): Promise<void> {
    const hass = this.hass, h = this._hist;
    if (!hass || !h) return;
    if (reset) this._hq++; else if (h.loading) return;
    const q = this._hq;
    this._hist = { ...h, loading: true, error: undefined };
    try {
      const r = await fetchHistory(hass, {
        search: h.search.trim() || undefined, parent: h.parent ?? undefined,
        offset: reset ? 0 : h.items.length, limit: HISTORY_PAGE,
      });
      if (q !== this._hq || !this._hist) return;
      this._hist = { ...this._hist, items: reset ? r.items : [...this._hist.items, ...r.items], total: r.total, loading: false };
    } catch (e) {
      console.warn("household_kanban: history failed", e);
      if (q === this._hq && this._hist) this._hist = { ...this._hist, loading: false, error: "err_history" };
    }
  }

  private _histFilter(patch: Partial<Pick<HistoryState, "search" | "parent">>, wait: number): void {
    if (!this._hist) return;
    this._hist = { ...this._hist, ...patch };
    window.clearTimeout(this._hTimer);
    this._hTimer = window.setTimeout(() => void this._loadHistory(true), wait);
  }

  private _reopen(uid: string): void {
    const hass = this.hass;
    if (!hass) return;
    setStatus(hass, uid, "needs_action").then(() => {
      const h = this._hist;
      if (!h || !h.items.some((i) => i.uid === uid)) return;
      this._hist = { ...h, items: h.items.filter((i) => i.uid !== uid), total: Math.max(0, h.total - 1), error: undefined };
    }, (err) => {
      console.warn("household_kanban: reopen failed", err);
      if (this._hist) this._hist = { ...this._hist, error: "err_reopen" };
    });
  }

  /** Load the next page when the "Load more" button scrolls into view; the button itself is the fallback. */
  private _observeMore(): void {
    const el = this.renderRoot.querySelector<HTMLElement>(".hist-more");
    const n = this._hist?.items.length ?? 0;
    if (!el || this._hist?.loading) { if (!el) { this._hObs?.disconnect(); this._hMore = null; } return; }
    if (this._hMore?.el === el && this._hMore.n === n) return;
    this._hMore = { el, n };
    if (typeof IntersectionObserver === "undefined") return;
    this._hObs ??= new IntersectionObserver((es) => { if (es.some((x) => x.isIntersecting)) void this._loadHistory(false); });
    this._hObs.disconnect(); // observing anew reports again, so a still-visible button keeps paging
    this._hObs.observe(el);
  }

  private _add(col: string, parents: { id: string }[], ctx: Ctx, returnTo = `.col[data-col="${col}"] .add`): void {
    const back = () => this.renderRoot.querySelector<HTMLElement>(returnTo);
    const parent = this._filter.parent ?? parents.find((p) => p.id === "household")?.id ?? parents[0]?.id;
    if (!parent) return;
    const prio = /^p([123])$/.exec(col);
    const date: Partial<Record<string, string>> = {
      today: quickDate("today", ctx.now), week: ymd(ctx.week.end), later: ymd(addDays(ctx.week.end, 1)),
    };
    this._openDialog(emptyDraft(parent, prio ? { priority: Number(prio[1]) as Priority } : { date: date[col] ?? "" }), back);
  }

  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  private _syncSortables(): void {
    const cols = new Set(this.renderRoot.querySelectorAll<HTMLElement>(".col"));
    for (const [el, s] of this._sortables) if (!cols.has(el)) { s.destroy(); this._sortables.delete(el); }
    const touch = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    for (const el of cols) {
      if (this._sortables.has(el)) continue;
      this._sortables.set(el, Sortable.create(el, {
        group: { name: "kb", pull: true, put: (to) => (to.el as HTMLElement).dataset.col !== "overdue" },
        draggable: "[data-uid]", filter: ".check", preventOnFilter: false, sort: false,
        delay: 150, delayOnTouchOnly: true, touchStartThreshold: 8, forceFallback: touch,
        // the exact node after the card is its own Lit end marker, so the card goes back inside its part
        onStart: (e) => { this._dragFrom = { parent: e.item.parentNode as Node, next: e.item.nextSibling }; },
        onEnd: (e) => {
          this._endDrag(e.item);
          if (e.to !== e.from) this._drop(e.item.dataset.uid, (e.to as HTMLElement).dataset.col);
        },
      }));
    }
  }

  /** Put a dragged card back inside its Lit part and apply the board push held during the drag. */
  private _endDrag(item?: HTMLElement): void {
    const from = this._dragFrom;
    this._dragFrom = undefined;
    if (from && item) from.parent.insertBefore(item, from.next && from.next.parentNode === from.parent ? from.next : null);
    if (this._pending) { this._board = this._pending; this._loadFailed = false; this._pending = undefined; }
  }

  private _drop(uid: string | undefined, col: string | undefined): void {
    const hass = this.hass, ctx = this._ctx;
    const item = this._board?.items.find((i) => i.uid === uid);
    if (!hass || !ctx || !item || !col) return;
    const prio = /^p([123])$/.exec(col);
    const patch: Patch | null = dropPatch(item, prio ? (Number(prio[1]) as Priority) : (col as ColumnId), ctx);
    if (!patch) return;
    const { status, ...fields } = patch;
    const run = async () => {
      if (Object.keys(fields).length) await updateItem(hass, item.uid, fields);
      if (status) await setStatus(hass, item.uid, status);
    };
    run().catch((err) => { console.warn("household_kanban: drop failed", err); this._fail("err_update"); });
  }

  protected updated(): void {
    this._syncSortables();
    this._observeMore();
    const dlg = this.renderRoot.querySelector("dialog");
    if (dlg && !dlg.open) {
      dlg.showModal();
      if (this._hist) this.renderRoot.querySelector<HTMLElement>(".kb-history input")?.focus();
      else if (!this._draft?.uid) this.renderRoot.querySelector<HTMLElement>("#kb-title")?.focus();
    } else if (!dlg && this._returnTo) {
      const sel = this._returnTo;
      this._returnTo = undefined;
      sel()?.focus();
    }
  }

  protected render() {
    const hass = this.hass, cfg = this._config, board = this._board;
    if (!hass || !cfg) return nothing;
    const lang = hass.locale?.language ?? hass.language ?? "en";
    if (!board) return html`<ha-card><div class="loading">${t(lang, this._loadFailed ? "err_load" : "loading")}</div></ha-card>`;

    const now = new Date();
    const parents = board.parents.filter((p) => !cfg.parents || cfg.parents.includes(p.id));
    const enabled = new Set<ColumnId>(cfg.columns ?? DEFAULT_COLUMNS);
    enabled.add("todo");
    if (board.end_of_day_mode === "overdue") enabled.add("overdue");
    const ctx: Ctx = {
      now, enabled, mode: board.end_of_day_mode, doneDays: cfg.done_days ?? 7,
      week: weekRange(now, firstWeekday(cfg.week_end, hass.locale)),
    };
    this._ctx = ctx;
    const env: Env = {
      hass, lang, now, parents,
      onOpen: (item, ev) => this._open(item, ev),
      onToggle: (item) => {
        setStatus(hass, item.uid, item.status === "completed" ? "needs_action" : "completed").catch((err) => {
          console.warn("household_kanban: set_status failed", err);
          this._fail("err_update");
        });
      },
    };
    const people = cfg.people ?? Object.keys(hass.states).filter((id) => id.startsWith("person."));
    const f = this._filter;
    const scoped = board.items.filter((i) => parents.some((p) => p.id === i.parent));
    const shown = scoped.filter((i) => (!f.who || i.assignee === f.who) && (!f.parent || i.parent === f.parent));

    return html`<ha-card>
      ${this._notice ? html`<div class="notice" role="alert">${t(lang, this._notice)}</div>` : nothing}
      <header>
        <div class="titles"><h1>${t(lang, "title")}</h1><div class="summary">${this._summary(scoped, ctx, lang)}</div></div>
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${t(lang, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", parents, ctx, "header .new")}>+ ${t(lang, "new_note")}</button>
      </header>
      ${renderFilters(env, f, people, scoped, (patch) => { this._filter = { ...f, ...patch }; })}
      ${renderBoard(shown, {
        board: { ...board, parents }, ctx, group: f.group, who: f.who, parent: f.parent,
        expanded: this._expanded,
        onExpand: (id, on) => {
          const next = new Set(this._expanded);
          if (on) next.add(id); else next.delete(id);
          this._expanded = next;
        },
        onFocus: (id) => { this._filter = { ...f, parent: id }; },
        onAdd: (col) => this._add(col, parents, ctx),
        onHistory: () => this._openHistory(".col[data-col=\"done\"] .note-btn"),
      }, env)}
      ${this._hist ? renderHistory(this._hist, {
        hass, lang, now, parents, firstDay: firstWeekday(cfg.week_end, hass.locale),
        onSearch: (search) => this._histFilter({ search }, 300),
        onParent: (parent) => this._histFilter({ parent }, 0),
        onReopen: (item) => this._reopen(item.uid),
        onMore: () => void this._loadHistory(false),
        onClose: () => this._closeHistory(),
      }) : nothing}
      ${this._draft ? renderDialog(this._draft, {
        hass, lang, now, parents, people, busy: this._busy, error: this._dlgError,
        onChange: (patch) => { if (this._draft) this._draft = { ...this._draft, ...patch }; },
        onSave: () => this._save(),
        onClose: () => { this._draft = undefined; },
        onToggleDone: () => {
          const d = this._draft, uid = d?.uid;
          if (!d || !uid) return;
          const orig = this._board?.items.find((i) => i.uid === uid);
          if (!orig) { this._dlgError = "err_update"; return; }
          const fields = changedFields(orig, d);
          void this._dialogWrite("err_update", async () => {
            if (Object.keys(fields).length) await updateItem(hass, uid, fields); // keep unsaved edits
            await setStatus(hass, uid, d.status === "completed" ? "needs_action" : "completed");
          });
        },
        onDelete: () => {
          const d = this._draft;
          if (d?.uid) void this._dialogWrite("err_delete", () => deleteItem(hass, d.uid as string));
        },
      }) : nothing}
    </ha-card>`;
  }

  private _summary(items: Board["items"], ctx: Ctx, lang: string): string {
    const open = items.filter((i) => i.status === "needs_action");
    const today = startOfDay(ctx.now);
    const overdue = open.filter((i) => i.due && startOfDay(parseDue(i.due).date) < today).length;
    // same rule as the Today column, so the number matches what the board shows
    const forToday = open.filter((i) => columnOf(i, ctx) === "today").length;
    const last = ctx.mode === "overdue"
      ? tn(lang, "sum_overdue", overdue)
      : tn(lang, "sum_moved", open.filter((i) => i.moved > 0).length);
    return [tn(lang, "sum_open", open.length), tn(lang, "sum_today", forToday), last].join(" · ");
  }
}

const NAME = "household-kanban-card";
keepDefined(NAME, HouseholdKanbanCard);

declare global {
  interface Window { customCards?: { type: string; name: string; description: string }[] }
}
if (!(window.customCards ??= []).some((c) => c.type === NAME)) {
  window.customCards.push({ type: NAME, name: "Household Kanban", description: "Kanban board for household tasks" });
}
