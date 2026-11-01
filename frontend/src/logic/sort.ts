import type { Item } from "../types";
import { parseDue } from "./dates";

/** Due instant; date-only means end of day, no due sorts last. */
function dueKey(item: Item): number {
  if (!item.due) return Infinity;
  const { date, hasTime } = parseDue(item.due);
  return hasTime ? +date : +new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1) - 1;
}

/** due date + time → priority → created_at (older first). */
export function compareItems(a: Item, b: Item): number {
  const ka = dueKey(a), kb = dueKey(b);
  if (ka !== kb) return ka < kb ? -1 : 1;
  return a.priority - b.priority || +new Date(a.created_at) - +new Date(b.created_at);
}
