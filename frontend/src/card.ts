import { LitElement, html, nothing, type PropertyValues } from "lit";
import { setStatus, subscribeBoard, type Hass } from "./api";
import { firstWeekday, parseDue, startOfDay, weekRange } from "./logic/dates";
import type { ColumnId, Ctx } from "./logic/columns";
import { t } from "./i18n";
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
  };
  static styles = styles;

  hass?: Hass;
  _config?: CardConfig;
  _board?: Board;
  _filter: FilterState = { who: null, parent: null, group: "date" };
  _expanded = new Set<string>();
  private _unsub?: Promise<() => void>;

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
    void this._unsub?.then((u) => u()).catch(() => undefined);
    this._unsub = undefined;
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass")) this._subscribe();
  }

  private _subscribe(): void {
    if (this._unsub || !this.hass || !this.isConnected) return;
    this._unsub = subscribeBoard(this.hass, (board) => { this._board = board; });
    this._unsub.catch(() => { this._unsub = undefined; });
  }

  protected render() {
    const hass = this.hass, cfg = this._config, board = this._board;
    if (!hass || !cfg) return nothing;
    const lang = hass.locale?.language ?? hass.language ?? "en";
    if (!board) return html`<ha-card><div class="loading">${t(lang, "loading")}</div></ha-card>`;

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
      onToggle: (item) => void setStatus(hass, item.uid, item.status === "completed" ? "needs_action" : "completed"),
    };
    const people = cfg.people ?? Object.keys(hass.states).filter((id) => id.startsWith("person."));
    const f = this._filter;
    const scoped = board.items.filter((i) => parents.some((p) => p.id === i.parent));
    const shown = scoped.filter((i) => (!f.who || i.assignee === f.who) && (!f.parent || i.parent === f.parent));

    return html`<ha-card>
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
    const days = open.map((i) => (i.due ? +startOfDay(parseDue(i.due).date) - +today : null));
    const last = ctx.mode === "overdue"
      ? t(lang, "sum_overdue", { n: days.filter((d) => d !== null && d < 0).length })
      : t(lang, "sum_moved", { n: open.filter((i) => i.moved > 0).length });
    return [t(lang, "sum_open", { n: open.length }), t(lang, "sum_today", { n: days.filter((d) => d === 0).length }), last].join(" · ");
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
