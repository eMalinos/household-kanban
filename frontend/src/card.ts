import { LitElement, html, nothing, type PropertyValues } from "lit";
import Sortable from "sortablejs";
import { createItem, deleteItem, setStatus, subscribeBoard, updateItem, type Hass } from "./api";
import { addDays, firstWeekday, parseDue, startOfDay, weekRange, ymd } from "./logic/dates";
import { columnOf, type ColumnId, type Ctx } from "./logic/columns";
import { dropPatch, isDrag, type Patch } from "./logic/drop";
import { retryDelay } from "./logic/retry";
import { t, tn, type Key } from "./i18n";
import { styles } from "./styles";
import type { Board, Item, Priority } from "./types";
import { changedFields, draftOf, emptyDraft, fieldsOf, quickDate, renderDialog, type Draft } from "./ui/detail-dialog";
import { renderBoard } from "./ui/board";
import { renderFilters, type FilterState } from "./ui/filters";
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
  private _ctx?: Ctx;
  private _down?: { x: number; y: number; t: number };
  private _sortables = new Map<HTMLElement, Sortable>();
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
    void this._unsub?.then((u) => u()).catch(() => undefined);
    this._unsub = undefined;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass")) this._subscribe();
  }

  /** Subscribe once; on failure retry on a capped backoff timer, never on hass updates. */
  private _subscribe(): void {
    if (this._unsub || this._retry !== undefined || !this.hass || !this.isConnected) return;
    const p = subscribeBoard(this.hass, (board) => { this._board = board; this._loadFailed = false; });
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
    this._busy = true;
    this._dlgError = undefined;
    try {
      await write();
      this._draft = undefined;
    } catch (e) {
      console.warn("household_kanban: write failed", e);
      this._dlgError = err;
    } finally {
      this._busy = false;
    }
  }

  private _save(): void {
    const hass = this.hass, d = this._draft;
    if (!hass || !d) return;
    const item = d.uid ? this._board?.items.find((i) => i.uid === d.uid) : undefined;
    void this._dialogWrite("err_save", () => item
      ? updateItem(hass, item.uid, changedFields(item, d))
      : createItem(hass, fieldsOf(d)));
  }

  /** Tap on a card; a click that ends a drag is not a tap. */
  private _open(item: Item, ev: Event): void {
    const me = ev as MouseEvent, down = this._down;
    if (down && isDrag(me.clientX - down.x, me.clientY - down.y, ev.timeStamp - down.t)) return;
    this._dlgError = undefined;
    this._draft = draftOf(item);
  }

  private _add(col: string, parents: { id: string }[], ctx: Ctx): void {
    const parent = this._filter.parent ?? parents.find((p) => p.id === "household")?.id ?? parents[0]?.id;
    if (!parent) return;
    const prio = /^p([123])$/.exec(col);
    const date: Partial<Record<string, string>> = {
      today: quickDate("today", ctx.now), week: ymd(ctx.week.end), later: ymd(addDays(ctx.week.end, 1)),
    };
    this._dlgError = undefined;
    this._draft = emptyDraft(parent, prio ? { priority: Number(prio[1]) as Priority } : { date: date[col] ?? "" });
  }

  /** One Sortable per column; Lit owns the DOM, so a drop is undone here and the next board push re-renders. */
  private _syncSortables(): void {
    const cols = new Set(this.renderRoot.querySelectorAll<HTMLElement>(".col"));
    for (const [el, s] of this._sortables) if (!cols.has(el)) { s.destroy(); this._sortables.delete(el); }
    const touch = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    for (const el of cols) {
      if (this._sortables.has(el)) continue;
      let next: Element | null = null;
      this._sortables.set(el, Sortable.create(el, {
        group: { name: "kb", pull: true, put: (to) => (to.el as HTMLElement).dataset.col !== "overdue" },
        draggable: "[data-uid]", filter: ".check", preventOnFilter: false, sort: false,
        delay: 150, delayOnTouchOnly: true, touchStartThreshold: 8, forceFallback: touch,
        onStart: (e) => { next = e.item.nextElementSibling; },
        onEnd: (e) => {
          e.from.insertBefore(e.item, next);
          if (e.to !== e.from) this._drop(e.item.dataset.uid, (e.to as HTMLElement).dataset.col);
        },
      }));
    }
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
    const dlg = this.renderRoot.querySelector("dialog");
    if (dlg && !dlg.open) dlg.showModal();
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
        <button class="new" type="button" @click=${() => this._add("todo", parents, ctx)}>+ ${t(lang, "new_note")}</button>
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
      }, env)}
      ${this._draft ? renderDialog(this._draft, {
        hass, lang, now, parents, people, busy: this._busy, error: this._dlgError,
        onChange: (patch) => { if (this._draft) this._draft = { ...this._draft, ...patch }; },
        onSave: () => this._save(),
        onClose: () => { this._draft = undefined; },
        onToggleDone: () => {
          const d = this._draft;
          if (d?.uid) void this._dialogWrite("err_update", () => setStatus(hass, d.uid as string, d.status === "completed" ? "needs_action" : "completed"));
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

customElements.define("household-kanban-card", HouseholdKanbanCard);

declare global {
  interface Window { customCards?: { type: string; name: string; description: string }[] }
}
(window.customCards ??= []).push({
  type: "household-kanban-card",
  name: "Household Kanban",
  description: "Kanban board for household tasks",
});
