import { expect, test } from "vitest";
import { retryDelay } from "../src/logic/retry";
import { tn } from "../src/i18n";
import { firstWeekday } from "../src/logic/dates";
import { compareItems } from "../src/logic/sort";
import { columnOf, type ColumnId, type Ctx } from "../src/logic/columns";
import type { Item } from "../src/types";

const it = (o: Partial<Item>): Item => ({
  uid: "u", parent: "household", summary: "x", description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null,
  moved: 0, raised: false, ...o,
});

test("retry backoff 5s doubling, capped at 60s", () => {
  expect([0, 1, 2, 3, 4, 5, 20].map(retryDelay)).toEqual([5000, 10000, 20000, 40000, 60000, 60000, 60000]);
});

test("czech plurals", () => {
  expect(tn("cs", "sum_open", 1)).toBe("1 otevřený");
  expect(tn("cs", "sum_open", 2)).toBe("2 otevřené");
  expect(tn("cs", "sum_open", 5)).toBe("5 otevřených");
  expect(tn("en", "sum_open", 1)).toBe("1 open");
  expect(tn("en", "sum_open", 3)).toBe("3 open");
});

test("firstWeekday mapping", () => {
  expect(firstWeekday({ first_weekday: "monday" })).toBe(1);
  expect(firstWeekday({ first_weekday: "saturday" })).toBe(6);
  expect(firstWeekday({ first_weekday: "sunday" })).toBe(0);
  expect(firstWeekday({ first_weekday: "language", language: "en-US" })).toBe(0);
  expect(firstWeekday({ first_weekday: "language", language: "cs" })).toBe(1);
});

test("date-only sorts after 23:30 on a 25h DST day (Europe/Prague 2026-10-25)", () => {
  const list = [it({ uid: "date", due: "2026-10-25" }), it({ uid: "late", due: "2026-10-25T23:30:00+01:00" })];
  expect(list.sort(compareItems).map((i) => i.uid)).toEqual(["late", "date"]);
});

const ctx = (enabled: ColumnId[]): Ctx => ({
  now: new Date("2026-11-04T12:00:00"),
  week: { start: new Date("2026-11-02T00:00:00"), end: new Date("2026-11-08T00:00:00") },
  enabled: new Set(enabled), mode: "raise", doneDays: 7,
});

test("datetime offset landing on another local day", () => {
  // 23:30 UTC on Nov 4 is 00:30 on Nov 5 in Europe/Prague -> not today
  expect(columnOf(it({ due: "2026-11-04T23:30:00+00:00" }), ctx(["todo", "week", "today"]))).toBe("week");
});

test("overdue with Today disabled falls to week", () => {
  expect(columnOf(it({ due: "2026-11-02" }), ctx(["todo", "week"]))).toBe("week");
});
