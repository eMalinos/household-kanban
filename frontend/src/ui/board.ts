import { html, nothing, type TemplateResult } from "lit";
import { columnOf, type ColumnId, type Ctx } from "../logic/columns";
import { compareItems } from "../logic/sort";
import { stackItems, type Stack } from "../logic/stack";
import { t, type Key } from "../i18n";
import type { Board, Item } from "../types";
import { renderItem, renderStack, type Env } from "./item-card";

export const ALL_COLUMNS: ColumnId[] = ["todo", "later", "week", "overdue", "today", "done"];

interface Col { id: string; label: string; led?: string; items: Item[]; done?: boolean }

export interface BoardView {
  board: Board; ctx: Ctx; group: "date" | "priority";
  who: string | null; parent: string | null;
  expanded: Set<string>;
  onExpand: (parentId: string, on: boolean) => void;
  onFocus: (parentId: string) => void;
  /** Column "+": `col` is a ColumnId, or p1/p2/p3 in priority grouping. */
  onAdd: (col: string) => void;
}

const byRecent = (a: Item, b: Item) => +new Date(b.completed_at ?? 0) - +new Date(a.completed_at ?? 0);

export function buildColumns(items: Item[], v: Pick<BoardView, "ctx" | "group">, lang: string): { cols: Col[]; olderDone: number } {
  const { ctx } = v;
  const open = items.filter((i) => i.status === "needs_action");
  const done = items.filter((i) => columnOf(i, ctx) === "done").sort(byRecent);
  const olderDone = items.filter((i) => i.status === "completed").length - done.length;
  const cols: Col[] = v.group === "date"
    ? ALL_COLUMNS.filter((c) => c !== "done" && (c === "todo" || ctx.enabled.has(c))).map((c) => ({
        id: c, label: t(lang, `col_${c}` as Key),
        led: c === "overdue" ? "rgb(var(--c-red))" : c === "week" || c === "today" ? "var(--kb-accent)" : undefined,
        items: open.filter((i) => columnOf(i, ctx) === c).sort(compareItems),
      }))
    : ([1, 2, 3] as const).map((p) => ({
        id: `p${p}`, label: t(lang, `prio_${p}` as Key),
        led: p === 1 ? "rgb(var(--c-red))" : p === 2 ? "rgb(var(--c-orange))" : undefined,
        items: open.filter((i) => i.priority === p).sort(compareItems),
      }));
  if (ctx.enabled.has("done")) cols.push({ id: "done", label: t(lang, "col_done"), led: "rgb(var(--c-green))", items: done, done: true });
  return { cols, olderDone };
}

export function renderBoard(items: Item[], v: BoardView, env: Env): TemplateResult {
  const { cols, olderDone } = buildColumns(items, v, env.lang);
  return html`<div class="board">${cols.map((col) => {
    const entries: (Item | Stack)[] = col.done ? col.items : stackItems(col.items, v.board.parents, v.parent);
    return html`<section class="col" data-col=${col.id}>
      <div class="col-head">
        <span class="led" style=${col.led ? `background:${col.led}` : ""}></span>
        <span class="label">${col.label}</span><span class="count">${col.items.length}</span>
        ${col.done || col.id === "overdue" ? nothing : html`<button class="add" type="button" aria-label=${`${t(env.lang, "add_here")}: ${col.label}`} @click=${() => v.onAdd(col.id)}>+</button>`}
      </div>
      ${entries.map((e) => "items" in e
        ? renderStack(e, env, v.expanded.has(e.parent.id), v.onExpand, v.onFocus)
        : renderItem(e, env, v.group === "date"))}
      ${col.done ? html`<div class="note">${t(env.lang, "done_note", { days: v.ctx.doneDays, older: olderDone })}</div>` : nothing}
      ${!col.done && entries.length === 0 ? html`<div class="empty">${t(env.lang, "nothing")}</div>` : nothing}
    </section>`;
  })}</div>`;
}
