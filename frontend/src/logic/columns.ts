import type { Board, Item } from "../types";
import { diffDays, parseDue, startOfDay } from "./dates";

export type ColumnId = "todo" | "later" | "week" | "today" | "overdue" | "done";
export interface Ctx {
  now: Date;
  week: { start: Date; end: Date };
  enabled: Set<ColumnId>;
  mode: Board["end_of_day_mode"];
  doneDays: number;
}

export function columnOf(item: Item, ctx: Ctx): ColumnId | null {
  const today = startOfDay(ctx.now);
  if (item.status === "completed") {
    if (!item.completed_at || !ctx.enabled.has("done")) return null;
    return diffDays(new Date(item.completed_at), today) < ctx.doneDays ? "done" : null;
  }
  if (!item.due) return "todo";
  const due = startOfDay(parseDue(item.due).date);
  const first = (...cols: ColumnId[]): ColumnId => cols.find((c) => ctx.enabled.has(c)) ?? "todo";
  if (due < today) return ctx.mode === "overdue" && ctx.enabled.has("overdue") ? "overdue" : first("today", "week");
  if (+due === +today) return first("today", "week");
  if (due <= ctx.week.end) return first("week");
  return first("later");
}
