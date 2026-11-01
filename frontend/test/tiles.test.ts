import { describe, expect, test } from "vitest";
import { tileSummary } from "../src/ui/tiles";
import { weekRange } from "../src/logic/dates";
import type { Ctx } from "../src/logic/columns";
import type { Item, Parent } from "../src/types";

const now = new Date(2026, 10, 1, 9, 0); // Sunday
const ctx: Ctx = {
  now, week: weekRange(now, 1), mode: "keep", doneDays: 7,
  enabled: new Set(["todo", "week", "today", "done"]),
};
const item = (uid: string, o: Partial<Item> = {}): Item => ({
  uid, parent: "household", summary: uid, description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false, ...o,
});
const parents: Parent[] = [
  { id: "household", entity_id: "todo.h", name: "Household", icon: "mdi:home", color: "blue", collapse: false },
  { id: "shop", entity_id: "todo.s", name: "Shopping", icon: "mdi:cart", color: "green", collapse: true },
];

describe("tileSummary", () => {
  test("counts per tile, overdue badge, done within doneDays", () => {
    const s = tileSummary([
      item("t1", { due: "2026-11-01" }), item("o1", { due: "2026-10-30" }),
      item("w1", { due: "2026-11-04" }), item("n1"), item("n2"),
      item("d1", { status: "completed", completed_at: "2026-10-30T10:00:00+01:00" }),
      item("d2", { status: "completed", completed_at: "2026-10-01T10:00:00+01:00" }),
    ], ctx, parents);
    expect(s.counts.today).toBe(2); // overdue lands in Today when the overdue column is off
    expect(s.overdue).toBe(1);
    expect(s.counts.week).toBe(1);
    expect(s.counts.todo).toBe(2);
    expect(s.counts.done).toBe(1);
  });

  test("overdue counts only Today-column items, in every mode", () => {
    const items = [item("o1", { due: "2026-10-30" }), item("t1", { due: "2026-11-01" })];
    expect(tileSummary(items, { ...ctx, mode: "raise" }, parents).overdue).toBe(1);
    const od: Ctx = { ...ctx, mode: "overdue", enabled: new Set([...ctx.enabled, "overdue" as const]) };
    expect(tileSummary(items, od, parents).overdue).toBe(0); // those sit in the Overdue column
  });

  test("preview: first 3 Today items in sort order, collapsed parents skipped", () => {
    const s = tileSummary([
      item("late", { due: "2026-11-01T18:00:00+01:00" }), item("early", { due: "2026-11-01T08:00:00+01:00" }),
      item("milk", { parent: "shop", due: "2026-11-01" }), item("eod", { due: "2026-11-01" }),
      item("old", { due: "2026-10-31" }),
    ], ctx, parents);
    expect(s.preview.map((i) => i.uid)).toEqual(["old", "early", "late"]);
    expect(s.counts.today).toBe(5);
  });
});
