import { expect, test } from "vitest";
import { cardLang, mergeConfig, normalizeConfig, toggleIn } from "../src/config";

test("fills defaults", () => {
  expect(normalizeConfig({ type: "custom:household-kanban-card" })).toEqual({
    type: "custom:household-kanban-card",
    columns: ["todo", "week", "today", "done"],
    done_days: 7, group: "date",
  });
});

test("keeps valid values and always includes todo", () => {
  const c = normalizeConfig({ type: "x", columns: ["today", "later"], done_days: 30, group: "priority", parents: ["household"], people: ["person.a"] });
  expect(c.columns).toEqual(["todo", "later", "today"]);
  expect(c).toMatchObject({ done_days: 30, group: "priority", parents: ["household"], people: ["person.a"] });
});

test("rejects unknown column ids", () => {
  expect(() => normalizeConfig({ type: "x", columns: ["todo", "nope"] } as never)).toThrow(/nope/);
});

test("invalid scalar values fall back to defaults", () => {
  const c = normalizeConfig({ type: "x", done_days: 5, group: "foo" } as never);
  expect(c).toMatchObject({ done_days: 7, group: "date" });
});

test("a stale week_end is dropped from the normalized config", () => {
  expect(normalizeConfig({ type: "x", week_end: "saturday" } as never)).not.toHaveProperty("week_end");
});

test("toggleIn: nothing or everything picked means all (undefined)", () => {
  const all = ["a", "b", "c"];
  expect(toggleIn(undefined, all, "b", false)).toEqual(["a", "c"]);
  expect(toggleIn(["a", "c"], all, "b", true)).toBeUndefined();
  expect(toggleIn(["a"], all, "a", false)).toBeUndefined();
  expect(toggleIn(["c"], all, "a", true)).toEqual(["a", "c"]);
});

test("mergeConfig keeps unknown keys and drops filters that are off", () => {
  const raw = { type: "x", grid_options: { rows: 8 }, week_end: "sunday", parents: ["a"], people: ["p"] };
  const out = mergeConfig(raw, normalizeConfig({ type: "x", columns: ["later"], people: ["p"] }));
  expect(out).toMatchObject({ grid_options: { rows: 8 }, week_end: "sunday", people: ["p"], columns: ["todo", "later"] });
  expect(out).not.toHaveProperty("parents");
});

test("language: own pick wins over Home Assistant, unknown or left out follows HA", () => {
  const hass = { locale: { language: "cs" }, language: "cs" };
  expect(cardLang(hass, normalizeConfig({ type: "x", language: "en" }))).toBe("en");
  expect(normalizeConfig({ type: "x", language: "de" } as never)).not.toHaveProperty("language");
  expect(cardLang(hass, normalizeConfig({ type: "x" }))).toBe("cs");
  expect(mergeConfig({ type: "x", language: "en" }, normalizeConfig({ type: "x" }))).not.toHaveProperty("language");
});
