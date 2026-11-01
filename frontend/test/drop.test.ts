import { describe, expect, test } from "vitest";
import { dropPatch, isDrag } from "../src/logic/drop";
import { weekRange } from "../src/logic/dates";
import type { Ctx } from "../src/logic/columns";
import type { Item } from "../src/types";

// 2026-11-01 is a Sunday; with Monday as first weekday the week column covers Nov 2-8.
const now = new Date(2026, 10, 1, 9, 0);
const ctx: Ctx = {
  now, week: weekRange(now, 1), mode: "raise", doneDays: 7,
  enabled: new Set(["todo", "later", "week", "today", "overdue", "done"]),
};
const item = (o: Partial<Item> = {}): Item => ({
  uid: "u1", parent: "household", summary: "x", description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false, ...o,
});
const done = (o: Partial<Item> = {}) => item({ status: "completed", completed_at: "2026-11-01T07:00:00+01:00", ...o });

describe("dropPatch", () => {
  test("today sets today's date", () => expect(dropPatch(item(), "today", ctx)).toEqual({ due: "2026-11-01" }));
  test("today drops an other-day time", () =>
    expect(dropPatch(item({ due: "2026-11-05T10:00:00+01:00" }), "today", ctx)).toEqual({ due: "2026-11-01" }));
  test("today keeps an existing time on the same day", () =>
    expect(dropPatch(done({ due: "2026-11-01T10:00:00+01:00" }), "today", ctx)).toEqual({ status: "needs_action" }));
  test("week sets the week end", () => expect(dropPatch(item(), "week", ctx)).toEqual({ due: "2026-11-08" }));
  test("later is the day after the week end", () => expect(dropPatch(item(), "later", ctx)).toEqual({ due: "2026-11-09" }));
  test("todo clears due", () => expect(dropPatch(item({ due: "2026-11-05" }), "todo", ctx)).toEqual({ due: null }));
  test("done completes", () => expect(dropPatch(item(), "done", ctx)).toEqual({ status: "completed" }));
  test("done to week reopens and sets week end", () =>
    expect(dropPatch(done(), "week", ctx)).toEqual({ status: "needs_action", due: "2026-11-08" }));
  test("overdue is not a target", () => expect(dropPatch(item(), "overdue", ctx)).toBeNull());
  test("priority target", () => expect(dropPatch(item(), 1, ctx)).toEqual({ priority: 1 }));
  test("same priority", () => expect(dropPatch(item(), 2, ctx)).toBeNull());
  test("done to a priority reopens", () => expect(dropPatch(done(), 3, ctx)).toEqual({ status: "needs_action", priority: 3 }));
  test("same column", () => {
    expect(dropPatch(item({ due: "2026-11-05" }), "week", ctx)).toBeNull();
    expect(dropPatch(item(), "todo", ctx)).toBeNull();
    expect(dropPatch(done(), "done", ctx)).toBeNull();
  });
});

describe("isDrag", () => {
  test("tap does not produce a patch", () => {
    expect(isDrag(2, 3, 90)).toBe(false);
    expect(isDrag(0, 0, 0)).toBe(false);
  });
  test("movement of 8px or more is a drag", () => {
    expect(isDrag(8, 0, 10)).toBe(true);
    expect(isDrag(-6, 6, 400)).toBe(true);
  });
});
