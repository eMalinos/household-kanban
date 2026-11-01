import { expect, test } from "vitest";
import { stackItems } from "../src/logic/stack";
import type { Item, Parent } from "../src/types";

const parents: Parent[] = [
  { id: "shop", entity_id: "todo.shop", name: "Shop", icon: "mdi:cart", color: "green", collapse: true },
  { id: "household", entity_id: "todo.household", name: "Household", icon: "mdi:home", color: "blue", collapse: false },
];
const it = (uid: string, parent: string): Item => ({
  uid, parent, summary: uid, description: "", status: "needs_action", due: null, priority: 2,
  assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false,
});

test("collapse parent becomes one stack at first position", () => {
  const items = [it("h1", "household"), ...[1, 2, 3, 4, 5].map((n) => it(`s${n}`, "shop")), it("h2", "household")];
  const out = stackItems(items, parents, null);
  expect(out).toHaveLength(3);
  expect("items" in out[1] && out[1].items).toHaveLength(5);
});
test("focused parent shows plain items", () => {
  const items = [1, 2, 3].map((n) => it(`s${n}`, "shop"));
  expect(stackItems(items, parents, "shop")).toHaveLength(3);
});
