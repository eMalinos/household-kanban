import { describe, expect, test } from "vitest";
import { groupHistory } from "../src/ui/history-dialog";
import type { Item } from "../src/types";

const done = (uid: string, completed_at: string): Item => ({
  uid, parent: "household", summary: uid, description: "", status: "completed", due: null,
  priority: 2, assignee: null, created_at: "2026-09-01T08:00:00", completed_at, moved: 0, raised: false,
});
// Sunday 2026-11-01; with Monday as first weekday this week = Oct 26..Nov 1
const now = new Date(2026, 10, 1, 9, 0);
const items = [
  done("a", "2026-11-01T07:00:00"), done("b", "2026-10-26T00:30:00"),
  done("c", "2026-10-25T23:00:00"), done("d", "2026-10-19T10:00:00"),
  done("e", "2026-10-10T10:00:00"), done("f", "2026-09-03T10:00:00"), done("g", "2026-09-01T10:00:00"),
];
const flat = (g: ReturnType<typeof groupHistory>) => g.map((x) => [x.label, x.items.map((i) => i.uid).join("")]);

describe("groupHistory", () => {
  test("this week, last week, then month and year (cs lower case)", () => {
    expect(flat(groupHistory(items, now, "cs", 1))).toEqual([
      ["Tento týden", "ab"], ["Minulý týden", "cd"], ["říjen 2026", "e"], ["září 2026", "fg"],
    ]);
  });
  test("english labels and a Sunday-first week", () => {
    // Sunday first: this week = Nov 1.., last week = Oct 25..31
    expect(flat(groupHistory(items, now, "en", 0))).toEqual([
      ["This week", "a"], ["Last week", "bc"], ["October 2026", "de"], ["September 2026", "fg"],
    ]);
  });
  test("empty input gives no groups", () => { expect(groupHistory([], now, "en", 1)).toEqual([]); });
});
