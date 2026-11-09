import { html, nothing, type TemplateResult } from "lit";
import { columnOf, type ColumnId, type Ctx } from "../logic/columns";
import { compareItems } from "../logic/sort";
import { t, tn, type Key } from "../i18n";
import { parseDue, startOfDay } from "../logic/dates";
import type { Item } from "../types";
import { colorClass, renderItem, type Env } from "./item-card";
import { TILE_META } from "./tiles";

const overdue = (items: Item[], ctx: Ctx) => items.filter((i) => i.due && startOfDay(parseDue(i.due).date) < startOfDay(ctx.now)).length;

export const ALL_COLUMNS: ColumnId[] = ["todo", "later", "week", "overdue", "today", "done"];

interface Col { id: string; label: string; icon: string; color: string; items: Item[]; done?: boolean }

export interface BoardView {
  ctx: Ctx; group: "date" | "priority";
  /** Column "+": `col` is a ColumnId, or p1/p2/p3 in priority grouping. */
  onAdd: (col: string) => void;
  onHistory: () => void;
}

export const byRecent = (a: Item, b: Item) => +new Date(b.completed_at ?? 0) - +new Date(a.completed_at ?? 0);

export function buildColumns(items: Item[], v: Pick<BoardView, "ctx" | "group">, lang: string): { cols: Col[]; olderDone: number } {
  const { ctx } = v;
  const open = items.filter((i) => i.status === "needs_action");
  const done = items.filter((i) => columnOf(i, ctx) === "done").sort(byRecent);
  const olderDone = items.filter((i) => i.status === "completed").length - done.length;
  const cols: Col[] = v.group === "date"
    ? ALL_COLUMNS.filter((c) => c !== "done" && (c === "todo" || ctx.enabled.has(c))).map((c) => ({
        id: c, label: t(lang, `col_${c}` as Key),
        ...TILE_META[c],
        items: open.filter((i) => columnOf(i, ctx) === c).sort(compareItems),
      }))
    : ([1, 2, 3] as const).map((p) => ({
        id: `p${p}`, label: t(lang, `prio_${p}` as Key),
        icon: "mdi:flag-outline", color: ["", "red", "orange", "grey"][p],
        items: open.filter((i) => i.priority === p).sort(compareItems),
      }));
  if (ctx.enabled.has("done")) cols.push({ id: "done", label: t(lang, "col_done"), ...TILE_META.done, items: done, done: true });
  return { cols, olderDone };
}

export function renderBoard(items: Item[], v: BoardView, env: Env): TemplateResult {
  const { cols, olderDone } = buildColumns(items, v, env.lang);
  return html`<div class="board">${cols.map((col) => {
    return html`<section class="col" data-col=${col.id}>
      <div class="col-head">
        <span class="dot ${colorClass(col.color)}"><ha-icon .icon=${col.icon}></ha-icon></span>
        <span class="label">${col.label}</span>
        ${col.id === "today" && overdue(col.items, v.ctx) ? html`<span class="pill c-red">${tn(env.lang, "sum_overdue", overdue(col.items, v.ctx))}</span>` : nothing}
        <span class="count">${col.items.length}</span>
        ${col.done || col.id === "overdue" ? nothing : html`<button class="add" type="button" aria-label=${`${t(env.lang, "add_here")}: ${col.label}`} @click=${() => v.onAdd(col.id)}>+</button>`}
      </div>
      ${col.items.map((e) => renderItem(e, env, v.group === "date"))}
      ${col.done ? html`<button class="note note-btn" type="button" @click=${v.onHistory}>${t(env.lang, "done_note", { days: v.ctx.doneDays, older: olderDone })}</button>` : nothing}
      ${!col.done && col.items.length === 0 ? html`<div class="empty">${t(env.lang, "nothing")}</div>` : nothing}
    </section>`;
  })}</div>`;
}
