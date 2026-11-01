import { expect, test } from "vitest";
import { normalizeConfig } from "../src/config";

test("fills defaults", () => {
  expect(normalizeConfig({ type: "custom:household-kanban-card" })).toEqual({
    type: "custom:household-kanban-card",
    columns: ["todo", "week", "today", "done"],
    done_days: 7, group: "date", week_end: "auto",
  });
});

test("keeps valid values and always includes todo", () => {
  const c = normalizeConfig({ type: "x", columns: ["today", "later"], done_days: 30, group: "priority", week_end: "sunday", parents: ["household"], people: ["person.a"] });
  expect(c.columns).toEqual(["todo", "later", "today"]);
  expect(c).toMatchObject({ done_days: 30, group: "priority", week_end: "sunday", parents: ["household"], people: ["person.a"] });
});

test("rejects unknown column ids", () => {
  expect(() => normalizeConfig({ type: "x", columns: ["todo", "nope"] } as never)).toThrow(/nope/);
});

test("invalid scalar values fall back to defaults", () => {
  const c = normalizeConfig({ type: "x", done_days: 5, group: "foo", week_end: "mon" } as never);
  expect(c).toMatchObject({ done_days: 7, group: "date", week_end: "auto" });
});
