import { expect, test } from "vitest";
import { compareItems } from "../src/logic/sort";
import type { Item } from "../src/types";

const it = (uid: string, o: Partial<Item>): Item => ({
  uid, parent: "household", summary: uid, description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null,
  moved: 0, raised: false, ...o,
});

test("due time, then no-time last on the same day", () => {
  const list = [
    it("a", { due: "2026-11-01T10:00:00+01:00", priority: 3 }),
    it("b", { due: "2026-11-01", priority: 1 }),
    it("c", { due: "2026-11-01T09:00:00+01:00", priority: 2 }),
  ];
  expect(list.sort(compareItems).map((i) => i.uid)).toEqual(["c", "a", "b"]);
});
test("priority then created_at; no due last", () => {
  const list = [
    it("n", {}),
    it("old", { due: "2026-11-02", created_at: "2026-10-01T08:00:00+00:00" }),
    it("new", { due: "2026-11-02", created_at: "2026-10-02T08:00:00+00:00" }),
    it("hi", { due: "2026-11-02", priority: 1, created_at: "2026-10-03T08:00:00+00:00" }),
  ];
  expect(list.sort(compareItems).map((i) => i.uid)).toEqual(["hi", "old", "new", "n"]);
});
