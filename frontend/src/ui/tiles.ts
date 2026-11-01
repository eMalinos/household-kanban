import { html, nothing, type TemplateResult } from "lit";
import { columnOf, type ColumnId, type Ctx } from "../logic/columns";
import { parseDue, startOfDay } from "../logic/dates";
import { compareItems } from "../logic/sort";
import { t, tn, type Key } from "../i18n";
import type { Item, Parent } from "../types";
import { avatar, colorClass, parentDot, personName, type Env } from "./item-card";

export interface TileSummary {
  counts: Record<ColumnId, number>;
  /** Open items due before today, whatever column they sit in. */
  overdue: number;
  /** First 3 Today items in sort order, skipping parents that collapse into a stack. */
  preview: Item[];
}

export function tileSummary(items: Item[], ctx: Ctx, parents: Parent[] = []): TileSummary {
  const counts: Record<ColumnId, number> = { todo: 0, later: 0, week: 0, today: 0, overdue: 0, done: 0 };
  const today = startOfDay(ctx.now);
  const inToday: Item[] = [];
  let overdue = 0;
  for (const i of items) {
    const col = columnOf(i, ctx);
    if (col) counts[col]++;
    if (col === "today") inToday.push(i);
    if (i.status === "needs_action" && i.due && startOfDay(parseDue(i.due).date) < today) overdue++;
  }
  const collapsed = new Set(parents.filter((p) => p.collapse).map((p) => p.id));
  const preview = inToday.filter((i) => !collapsed.has(i.parent)).sort(compareItems).slice(0, 3);
  return { counts, overdue, preview };
}

export const TILE_META: Record<ColumnId, { icon: string; color: string }> = {
  today: { icon: "mdi:calendar-today", color: "blue" },
  overdue: { icon: "mdi:alert-circle-outline", color: "red" },
  week: { icon: "mdi:calendar-week", color: "indigo" },
  todo: { icon: "mdi:format-list-checks", color: "teal" },
  later: { icon: "mdi:calendar-clock", color: "purple" },
  done: { icon: "mdi:check-circle-outline", color: "green" },
};
const ORDER: ColumnId[] = ["today", "overdue", "week", "todo", "later", "done"];

export interface TilesView {
  ctx: Ctx; items: Item[]; people: string[]; who: string | null;
  onWho: (id: string | null) => void;
  onTile: (col: ColumnId) => void;
  onParent: (id: string) => void;
}

export function renderTiles(v: TilesView, env: Env): TemplateResult {
  const s = tileSummary(v.items, v.ctx, env.parents);
  const open = v.items.filter((i) => i.status === "needs_action");
  return html`<div class="tiles-view">
    <div class="people ${v.who ? "has-filter" : ""}" role="group" aria-label=${t(env.lang, "filter_people")}>
      ${v.people.map((id) => {
        const on = v.who === id;
        return html`<button class="person" type="button" aria-pressed=${on} @click=${() => v.onWho(on ? null : id)}>
          ${avatar(env.hass, id, "lg", true)}<span>${personName(env.hass, id)}</span></button>`;
      })}
    </div>
    <div class="tiles">
      ${ORDER.filter((c) => v.ctx.enabled.has(c)).map((c) => {
        const wide = c === "today" || c === "done";
        const badge = c === "today" && v.ctx.mode === "overdue" ? s.overdue : 0;
        return html`<button class="tile ${wide ? "wide" : ""} ${colorClass(TILE_META[c].color)}" type="button" data-tile=${c} @click=${() => v.onTile(c)}>
          <span class="row">
            <span class="dot"><ha-icon .icon=${TILE_META[c].icon}></ha-icon></span>
            <span class="tile-label">${t(env.lang, `col_${c}` as Key)}</span>
            ${badge > 0 ? html`<span class="pill c-red">${tn(env.lang, "sum_overdue", badge)}</span>` : nothing}
          </span>
          <span class="tile-count">${s.counts[c]}</span>
          ${c === "today" ? html`<span class="preview">${s.preview.map((i) => html`<span class="row">
            <span class="mark"></span><span class="t">${i.summary}</span>${i.assignee ? avatar(env.hass, i.assignee, "xs", true) : nothing}</span>`)}</span>` : nothing}
        </button>`;
      })}
    </div>
    <span class="dlg-label tiles-h">${t(env.lang, "lists")}</span>
    <div class="plist">
      ${env.parents.map((p) => html`<button class="prow" type="button" data-parent=${p.id} @click=${() => v.onParent(p.id)}>
        ${parentDot(p)}<span class="pname">${p.name}</span>
        <span class="pcount">${open.filter((i) => i.parent === p.id).length}</span><span aria-hidden="true">›</span></button>`)}
    </div>
  </div>`;
}
