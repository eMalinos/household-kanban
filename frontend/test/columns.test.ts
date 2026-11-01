import { expect, test } from "vitest";
import { columnOf, type ColumnId, type Ctx } from "../src/logic/columns";
import type { Item } from "../src/types";

const now = new Date("2026-11-04T12:00:00"); // Wednesday
const week = { start: new Date("2026-11-02T00:00:00"), end: new Date("2026-11-08T00:00:00") };
const ctx = (o: Partial<Ctx> = {}): Ctx => ({
  now, week, enabled: new Set<ColumnId>(["todo", "week", "today", "done"]), mode: "raise", doneDays: 7, ...o,
});
const it = (o: Partial<Item>): Item => ({
  uid: "u", parent: "household", summary: "x", description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null,
  moved: 0, raised: false, ...o,
});

test("no due -> todo", () => expect(columnOf(it({}), ctx())).toBe("todo"));
test("today", () => expect(columnOf(it({ due: "2026-11-04" }), ctx())).toBe("today"));
test("today with time", () => expect(columnOf(it({ due: "2026-11-04T09:00:00" }), ctx())).toBe("today"));
test("disabled today falls to week", () =>
  expect(columnOf(it({ due: "2026-11-04" }), ctx({ enabled: new Set<ColumnId>(["todo", "week"]) }))).toBe("week"));
test("disabled today and week falls to todo", () =>
  expect(columnOf(it({ due: "2026-11-04" }), ctx({ enabled: new Set<ColumnId>(["todo"]) }))).toBe("todo"));
test("within week", () => expect(columnOf(it({ due: "2026-11-07" }), ctx())).toBe("week"));
test("later column", () => {
  const e = new Set<ColumnId>(["todo", "later"]);
  expect(columnOf(it({ due: "2026-11-20" }), ctx({ enabled: e }))).toBe("later");
});
test("later disabled -> todo", () => expect(columnOf(it({ due: "2026-11-20" }), ctx())).toBe("todo"));
test("overdue only in mode overdue", () => {
  const e = new Set<ColumnId>(["todo", "today", "overdue"]);
  expect(columnOf(it({ due: "2026-11-02" }), ctx({ enabled: e, mode: "overdue" }))).toBe("overdue");
  expect(columnOf(it({ due: "2026-11-02" }), ctx({ enabled: e, mode: "raise" }))).toBe("today");
});
test("done within doneDays, older hidden", () => {
  expect(columnOf(it({ status: "completed", completed_at: "2026-11-01T10:00:00" }), ctx())).toBe("done");
  expect(columnOf(it({ status: "completed", completed_at: "2026-10-20T10:00:00" }), ctx())).toBeNull();
});
