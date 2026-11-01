import { expect, test } from "vitest";
import { dashboardUrlPath, replaceCard } from "../src/logic/lovelace";

const card = () => ({ type: "custom:household-kanban-card", columns: ["todo", "done"] });
const next = { type: "custom:household-kanban-card", columns: ["todo", "later", "done"] };

test("dashboardUrlPath: default dashboard is null, others the first segment", () => {
  expect(dashboardUrlPath("/lovelace/0")).toBeNull();
  expect(dashboardUrlPath("/kanban-dev/ukoly")).toBe("kanban-dev");
  expect(dashboardUrlPath("/")).toBeNull();
});

test("finds the card in views[].cards", () => {
  const r = replaceCard({ views: [{ cards: [{ type: "markdown" }, card()] }] }, card(), next);
  expect(r.matches).toBe(1);
  expect(r.config).toEqual({ views: [{ cards: [{ type: "markdown" }, next] }] });
});

test("finds the card in views[].sections[].cards", () => {
  const r = replaceCard({ views: [{ type: "sections", sections: [{ type: "grid", cards: [card()] }] }] }, card(), next);
  expect(r.matches).toBe(1);
  expect(r.config).toEqual({ views: [{ type: "sections", sections: [{ type: "grid", cards: [next] }] }] });
});

test("finds the card in a vertical-stack and in a conditional card", () => {
  const stack = replaceCard({ views: [{ cards: [{ type: "vertical-stack", cards: [card()] }] }] }, card(), next);
  expect(stack.matches).toBe(1);
  expect(stack.config).toEqual({ views: [{ cards: [{ type: "vertical-stack", cards: [next] }] }] });
  const cond = replaceCard({ views: [{ cards: [{ type: "conditional", conditions: [], card: card() }] }] }, card(), next);
  expect(cond.matches).toBe(1);
  expect(cond.config).toEqual({ views: [{ cards: [{ type: "conditional", conditions: [], card: next }] }] });
});

test("key order does not matter for the match", () => {
  const r = replaceCard({ views: [{ cards: [{ columns: ["todo", "done"], type: "custom:household-kanban-card" }] }] }, card(), next);
  expect(r.matches).toBe(1);
});

test("ambiguous match is not replaced", () => {
  const dash = { views: [{ cards: [card(), { type: "vertical-stack", cards: [card()] }] }] };
  const r = replaceCard(dash, card(), next);
  expect(r.matches).toBe(2);
  expect(r.config).toBe(dash);
  expect(dash.views[0].cards[0]).toEqual(card());
});

test("no match returns the input", () => {
  const dash = { views: [{ cards: [{ type: "markdown" }] }] };
  expect(replaceCard(dash, card(), next)).toEqual({ config: dash, matches: 0 });
});

test("replaceCard keeps keys outside the card", () => {
  const dash = { title: "Home", views: [{ path: "ukoly", badges: [{ entity: "sun.sun" }], cards: [card()] }] };
  const r = replaceCard(dash, card(), next);
  expect(r.config).toEqual({ title: "Home", views: [{ path: "ukoly", badges: [{ entity: "sun.sun" }], cards: [next] }] });
});
