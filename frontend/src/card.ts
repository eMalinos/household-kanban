import { LitElement, html, nothing, type PropertyValues } from "lit";
import { setStatus, subscribeBoard, type Hass } from "./api";
import { firstWeekday, parseDue, startOfDay, weekRange } from "./logic/dates";
import { columnOf, type ColumnId, type Ctx } from "./logic/columns";
import { retryDelay } from "./logic/retry";
import { t, tn } from "./i18n";
import { styles } from "./styles";
import type { Board } from "./types";
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
  };
  static styles = styles;

  hass?: Hass;
  _config?: CardConfig;
  _board?: Board;
  _filter: FilterState = { who: null, parent: null, group: "date" };
  _expanded = new Set<string>();
  _loadFailed = false;
  _notice?: "err_update";
  private _unsub?: Promise<() => void>;
  private _retry?: number;
  private _attempts = 0;

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
    const env: Env = {
      hass, lang, now, parents,
      onToggle: (item) => {
        setStatus(hass, item.uid, item.status === "completed" ? "needs_action" : "completed").catch((err) => {
          console.warn("household_kanban: set_status failed", err);
          this._notice = "err_update";
          window.setTimeout(() => { this._notice = undefined; }, 5000);
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
      }, env)}
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
