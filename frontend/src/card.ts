import { LitElement, html, nothing, type PropertyValues } from "lit";
import Sortable from "sortablejs";
import { createItem, deleteItem, fetchDashboard, fetchHistory, saveDashboard, setStatus, subscribeBoard, updateItem, type Hass } from "./api";
import { addDays, firstWeekday, parseDue, startOfDay, weekRange, ymd } from "./logic/dates";
import { columnOf, type ColumnId, type Ctx } from "./logic/columns";
import { dropPatch, isDrag, type Patch } from "./logic/drop";
import { retryDelay } from "./logic/retry";
import { keepDefined } from "./register";
import { mergeConfig, normalizeConfig, type CardConfig } from "./config";
import { dashboardUrlPath, replaceCard } from "./logic/lovelace";
import "./editor";
import { t, tn, type Key } from "./i18n";
import { styles } from "./styles";
import type { Board, Item, Priority } from "./types";
import { changedFields, draftOf, emptyDraft, fieldsOf, quickDate, renderDialog, type Draft } from "./ui/detail-dialog";
import { byRecent, renderBoard } from "./ui/board";
import { renderSheet } from "./ui/sheet";
import { renderTiles, TILE_META } from "./ui/tiles";
import { compareItems } from "./logic/sort";
import { stackItems } from "./logic/stack";
import { renderFilters, type FilterState } from "./ui/filters";
import { renderHistory, type HistoryState } from "./ui/history-dialog";
import { renderSettings, type SettingsState } from "./ui/settings-dialog";
import type { Env } from "./ui/item-card";


const HISTORY_PAGE = 50;
const NARROW_PX = 600;
const LONG_PRESS_MS = 500;
const GEAR = html`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;

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
    _narrow: { state: true },
    _sheet: { state: true },
    _menu: { state: true },
    _settings: { state: true },
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
  _narrow = false;
  _sheet?: { kind: "col" | "parent"; id: string };
  _menu?: string; // uid of the item whose "Move to…" menu is open
  _settings?: SettingsState;
  private _raw: Record<string, unknown> = {}; // exactly what setConfig got: the card's entry in the dashboard config
  private _ro?: ResizeObserver;
  private _sheetReturn?: string;
  private _sheetShown = false;
  private _menuShown = false;
  private _menuFor?: string;
  private _lp?: { x: number; y: number; timer: number };
  private _lpFired = false;
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

  static getConfigElement(): HTMLElement { return document.createElement("household-kanban-card-editor"); }
  static getStubConfig(): CardConfig { return normalizeConfig({ type: "custom:household-kanban-card" }); }

  setConfig(raw: CardConfig): void {
    const config = normalizeConfig(raw);
    this._raw = raw as unknown as Record<string, unknown>;
    this._config = config;
    this._filter = { ...this._filter, group: config.group ?? "date" };
  }

  getCardSize(): number { return 8; }

  /** Sections view: the board needs the full width. */
  getGridOptions(): { columns: "full"; rows: number; min_rows: number } { return { columns: "full", rows: 8, min_rows: 4 }; }

  connectedCallback(): void {
    super.connectedCallback();
    this._subscribe();
    if (typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver((es) => {
        const w = es[es.length - 1]?.contentRect.width ?? 0;
        if (w > 0) this._narrow = w < NARROW_PX; // 0 = not laid out yet: keep the current layout
        if (!this._narrow) this._closeSheet();
      });
      this._ro.observe(this);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._retry);
    this._retry = undefined;
    this._ro?.disconnect();
    this._ro = undefined;
    this._lpCancel();
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
    if (this._lpFired) { this._lpFired = false; return; } // the click that follows a long-press
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

  private _openSettings(): void {
    if (this._draft || this._hist || this._settings || !this._config) return;
    this._seq++;
    this._returnTo = () => this.renderRoot.querySelector<HTMLElement>("header .gear-btn");
    this._settings = { tab: "board", draft: { ...this._config }, saving: false, narrow: this._narrow };
  }

  /** Write the draft into this card's entry of the dashboard config; HA reloads the dashboard after the save. */
  private async _saveSettings(): Promise<void> {
    const hass = this.hass, st = this._settings, seq = this._seq;
    if (!hass || !st || st.saving) return;
    const set = (patch: Partial<SettingsState>) => { if (seq === this._seq && this._settings) this._settings = { ...this._settings, ...patch }; };
    set({ saving: true, error: undefined });
    const urlPath = dashboardUrlPath(window.location.pathname);
    try {
      const dash = await fetchDashboard(hass, urlPath);
      if (dash && typeof dash === "object" && "strategy" in dash) { set({ saving: false, error: "err_not_editable" }); return; }
      const next = mergeConfig(this._raw, normalizeConfig(st.draft));
      const r = replaceCard(dash, this._raw, next);
      if (r.matches !== 1) { set({ saving: false, error: r.matches ? "err_card_ambiguous" : "err_card_missing" }); return; }
      await saveDashboard(hass, urlPath, r.config);
      if (seq !== this._seq) return;
      this.setConfig(next as unknown as CardConfig);
      this._settings = undefined;
    } catch (err) {
      console.warn("household_kanban: dashboard save failed", err);
      const e = err as { code?: string; message?: string } | undefined;
      const locked = e?.code === "config_not_editable" || e?.code === "config_not_found" || /yaml/i.test(e?.message ?? "");
      set({ saving: false, error: locked ? "err_not_editable" : "err_settings" });
    }
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

  private _openSheet(kind: "col" | "parent", id: string, returnSel: string): void {
    this._sheetReturn = returnSel;
    this._menu = undefined;
    this._sheet = { kind, id };
  }

  private _closeSheet(): void {
    this._lpCancel();
    this._closeMenu();
    this._sheet = undefined;
  }

  private _closeMenu(): void {
    this._menu = undefined;
    this._lpFired = false; // no trailing click is coming any more
  }

  private _sheetCancel(): void {
    if (this._menu) this._closeMenu(); else this._closeSheet();
  }

  private _lpStart(ev: PointerEvent): void {
    this._lpFired = false;
    this._lpCancel();
    const target = ev.target as Element, el = target.closest<HTMLElement>("[data-uid]");
    const uid = el?.dataset.uid;
    if (!uid || target.closest(".check")) return;
    this._lp = { x: ev.clientX, y: ev.clientY, timer: window.setTimeout(() => {
      this._lp = undefined; this._lpFired = true; this._menu = uid; this._menuFor = uid;
    }, LONG_PRESS_MS) };
  }

  private _lpMove(ev: PointerEvent): void {
    const lp = this._lp;
    if (lp && isDrag(ev.clientX - lp.x, ev.clientY - lp.y, 0)) this._lpCancel(); // a scroll, not a press
  }

  private _lpCancel(): void {
    if (this._lp) window.clearTimeout(this._lp.timer);
    this._lp = undefined;
  }

  /** Focus handling for the sheet and its menu; the native dialog, when open, owns the focus. */
  private _sheetFocus(dialogOpen: boolean): void {
    if (dialogOpen) return;
    const sheet = this.renderRoot.querySelector<HTMLElement>(".sheet");
    if (sheet && !this._sheetShown) {
      this._sheetShown = true;
      sheet.querySelector<HTMLElement>(".sclose")?.focus();
    } else if (!sheet && this._sheetShown) {
      this._sheetShown = false;
      const sel = this._sheetReturn;
      // the tile is gone when the layout switched to the board: fall back to the header
      (sel && this.renderRoot.querySelector<HTMLElement>(sel) || this.renderRoot.querySelector<HTMLElement>("header .new"))?.focus();
    }
    const first = this.renderRoot.querySelector<HTMLElement>(".menu-btn");
    if (first && !this._menuShown) { this._menuShown = true; first.focus(); }
    else if (!first && this._menuShown) {
      this._menuShown = false;
      const uid = this._menuFor;
      const back = [...this.renderRoot.querySelectorAll<HTMLElement>(".sheet [data-uid]")].find((e) => e.dataset.uid === uid)?.querySelector<HTMLElement>(".title");
      (back ?? this.renderRoot.querySelector<HTMLElement>(".sheet .sclose"))?.focus();
    }
  }

  protected updated(): void {
    this._syncSortables();
    this._observeMore();
    const sheetDlg = this.renderRoot.querySelector<HTMLDialogElement>("dialog.kb-sheet");
    if (sheetDlg && !sheetDlg.open) sheetDlg.showModal();
    const dlg = this.renderRoot.querySelector<HTMLDialogElement>("dialog.kb-dialog");
    this._sheetFocus(!!dlg);
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
    const enabled = new Set<ColumnId>(cfg.columns ?? []);
    enabled.add("todo");
    if (board.end_of_day_mode === "overdue") enabled.add("overdue");
    const ctx: Ctx = {
      now, enabled, mode: board.end_of_day_mode, doneDays: cfg.done_days ?? 7,
      week: weekRange(now, firstWeekday(hass.locale)),
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
        ${hass.user?.is_admin ? html`<button class="round-btn gear-btn" type="button" aria-label=${t(lang, "settings")} title=${t(lang, "settings")}
          @click=${() => this._openSettings()}>${GEAR}</button>` : nothing}
        <button class="pill-btn hist-btn" type="button" @click=${() => this._openHistory("header .hist-btn")}>${t(lang, "history")}</button>
        <button class="new" type="button" @click=${() => this._add("todo", parents, ctx, "header .new")}>+ ${t(lang, "new_note")}</button>
      </header>
      ${this._narrow ? this._renderNarrow(env, ctx, scoped, people, parents) : html`
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
      }, env)}`}
      ${this._hist ? renderHistory(this._hist, {
        hass, lang, now, parents, firstDay: firstWeekday(hass.locale),
        onSearch: (search) => this._histFilter({ search }, 300),
        onParent: (parent) => this._histFilter({ parent }, 0),
        onReopen: (item) => this._reopen(item.uid),
        onMore: () => void this._loadHistory(false),
        onClose: () => this._closeHistory(),
      }) : nothing}
      ${this._settings ? renderSettings({ ...this._settings, narrow: this._narrow }, {
        hass, lang, parents: board.parents, people: Object.keys(hass.states).filter((id) => id.startsWith("person.")),
        onTab: (tab) => { if (this._settings) this._settings = { ...this._settings, tab }; },
        onChange: (patch) => { if (this._settings) this._settings = { ...this._settings, draft: { ...this._settings.draft, ...patch }, error: undefined }; },
        onSave: () => void this._saveSettings(),
        onClose: () => { this._seq++; this._settings = undefined; },
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

  /** Tiles + parents list, and the bottom sheet when one is open. */
  private _renderNarrow(env: Env, ctx: Ctx, scoped: Item[], people: string[], parents: Board["parents"]) {
    const who = this._filter.who;
    const items = scoped.filter((i) => !who || i.assignee === who);
    let sh = this._sheet;
    let sheet: unknown = nothing;
    const p = sh?.kind === "parent" ? parents.find((x) => x.id === sh?.id) : undefined;
    if (sh?.kind === "parent" && !p) { sh = undefined; queueMicrotask(() => this._closeSheet()); } // parent removed meanwhile
    if (sh) {
      const col = sh.id as ColumnId;
      const open = (list: Item[]) => list.filter((i) => i.status === "needs_action").sort(compareItems);
      const list = sh.kind === "parent"
        ? open(items.filter((i) => i.parent === sh.id))
        : col === "done" ? items.filter((i) => columnOf(i, ctx) === "done").sort(byRecent)
          : open(items.filter((i) => columnOf(i, ctx) === col));
      const meta = p ? { icon: p.icon, color: p.color, title: p.name } : { ...TILE_META[col], title: t(env.lang, `col_${col}` as Key) };
      sheet = renderSheet({
        ...meta, count: list.length, isDone: col === "done" && !p,
        entries: sh.kind === "col" && col !== "done" ? stackItems(list, parents, null) : list,
        olderDone: items.filter((i) => i.status === "completed").length - list.length,
        menu: this._menu ? items.find((i) => i.uid === this._menu) : undefined,
        expanded: this._expanded,
        onExpand: (id, on) => {
          const next = new Set(this._expanded);
          if (on) next.add(id); else next.delete(id);
          this._expanded = next;
        },
        onFocus: (id) => this._openSheet("parent", id, this._sheetReturn ?? ""),
        onClose: () => this._closeSheet(),
        onCancel: () => this._sheetCancel(),
        onHistory: () => this._openHistory(".sheet .hist-link"),
        onMove: (item, c) => { this._closeMenu(); this._drop(item.uid, c); },
        onMenuClose: () => this._closeMenu(),
        press: { down: (ev) => this._lpStart(ev), move: (ev) => this._lpMove(ev), end: () => this._lpCancel() },
      }, env);
    }
    return html`${renderTiles({
      ctx, items, people, who,
      onWho: (id) => { this._filter = { ...this._filter, who: id }; },
      onTile: (c) => this._openSheet("col", c, `.tile[data-tile="${c}"]`),
      onParent: (id) => this._openSheet("parent", id, `.prow[data-parent="${id}"]`),
    }, env)}${sheet}`;
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
