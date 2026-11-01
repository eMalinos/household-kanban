import { expect, test } from "vitest";
import { firstWeekday, weekRange } from "../src/logic/dates";
import { normalizeConfig } from "../src/config";

const d = (s: string) => new Date(`${s}T00:00:00`);
const iso = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;

test("last day of week rolls to next week (Monday-first)", () => {
  const r = weekRange(d("2026-11-01"), 1); // Sunday
  expect([iso(r.start), iso(r.end)]).toEqual(["2026-11-02", "2026-11-08"]);
});
test("mid week", () => {
  const r = weekRange(d("2026-11-04"), 1);
  expect([iso(r.start), iso(r.end)]).toEqual(["2026-11-02", "2026-11-08"]);
});
test("Saturday-end (Sunday-first) rolls on Saturday", () => {
  const r = weekRange(d("2026-10-31"), 0);
  expect([iso(r.start), iso(r.end)]).toEqual(["2026-11-01", "2026-11-07"]);
});

test("firstWeekday follows hass.locale.first_weekday (Sunday-first week)", () => {
  const r = weekRange(d("2026-11-04"), firstWeekday({ first_weekday: "sunday" }));
  expect([iso(r.start), iso(r.end)]).toEqual(["2026-11-01", "2026-11-07"]);
});

test("a config with week_end: saturday no longer changes the week", () => {
  const cfg = normalizeConfig({ type: "x", week_end: "saturday" } as never);
  expect(cfg).not.toHaveProperty("week_end");
  expect(firstWeekday({ first_weekday: "monday" })).toBe(1);
});
