import type { Item, Priority } from "../types";
import { columnOf, type ColumnId, type Ctx } from "./columns";
import { addDays, parseDue, startOfDay, ymd } from "./dates";

export interface Patch { due?: string | null; status?: Item["status"]; priority?: Priority }

/** Movement under this many px is a tap (opens the dialog), not a drag. */
const DRAG_PX = 8;

/** The touch long-press delay lives in SortableJS (`delay: 150`, touch only); this tells a tap from a drag afterwards. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept in the signature: the press time is not needed for the 8 px rule
export function isDrag(dx: number, dy: number, _ms: number): boolean {
  return Math.hypot(dx, dy) >= DRAG_PX;
}

/** What changes when `item` is dropped on a column (or, in priority grouping, a priority); null = nothing. */
export function dropPatch(item: Item, target: ColumnId | Priority, ctx: Ctx): Patch | null {
  const reopen: Patch = item.status === "completed" ? { status: "needs_action" } : {};
  if (typeof target === "number") {
    if (item.status === "needs_action" && item.priority === target) return null;
    return { ...reopen, ...(item.priority === target ? {} : { priority: target }) };
  }
  if (target === "overdue" || columnOf(item, ctx) === target) return null;
  if (target === "done") return { status: "completed" };
  if (target === "todo") return { ...reopen, due: null };
  if (target === "week") return { ...reopen, due: ymd(ctx.week.end) };
  if (target === "later") return { ...reopen, due: ymd(addDays(ctx.week.end, 1)) };
  const today = startOfDay(ctx.now);
  if (item.due && +startOfDay(parseDue(item.due).date) === +today) return Object.keys(reopen).length ? reopen : null;
  return { ...reopen, due: ymd(today) };
}
