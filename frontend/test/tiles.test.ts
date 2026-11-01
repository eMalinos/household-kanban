// @vitest-environment happy-dom
import { describe, expect, test } from "vitest";
import { render } from "lit";
import { renderTiles, tileSummary } from "../src/ui/tiles";
import { weekRange } from "../src/logic/dates";
import type { Ctx } from "../src/logic/columns";
import type { Item } from "../src/types";

const now = new Date(2026, 10, 1, 9, 0); // Sunday
const ctx: Ctx = {
  now, week: weekRange(now, 1), mode: "keep", doneDays: 7,
  enabled: new Set(["todo", "week", "today", "done"]),
};
const item = (uid: string, o: Partial<Item> = {}): Item => ({
  uid, parent: "household", summary: uid, description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false, ...o,
});

describe("tileSummary", () => {
  test("counts per tile, overdue badge, done within doneDays", () => {
    const s = tileSummary([
      item("t1", { due: "2026-11-01" }), item("o1", { due: "2026-10-30" }),
      item("w1", { due: "2026-11-04" }), item("n1"), item("n2"),
      item("d1", { status: "completed", completed_at: "2026-10-30T10:00:00+01:00" }),
      item("d2", { status: "completed", completed_at: "2026-10-01T10:00:00+01:00" }),
    ], ctx);
    expect(s.counts.today).toBe(2); // overdue lands in Today when the overdue column is off
    expect(s.overdue).toBe(1);
    expect(s.counts.week).toBe(1);
    expect(s.counts.todo).toBe(2);
    expect(s.counts.done).toBe(1);
  });

  test("overdue counts only Today-column items, in every mode", () => {
    const items = [item("o1", { due: "2026-10-30" }), item("t1", { due: "2026-11-01" })];
    expect(tileSummary(items, { ...ctx, mode: "raise" }).overdue).toBe(1);
    const od: Ctx = { ...ctx, mode: "overdue", enabled: new Set([...ctx.enabled, "overdue" as const]) };
    expect(tileSummary(items, od).overdue).toBe(0); // those sit in the Overdue column
  });

  test("preview: first 3 Today items in sort order, every list counts", () => {
    const s = tileSummary([
      item("late", { due: "2026-11-01T18:00:00+01:00" }), item("early", { due: "2026-11-01T08:00:00+01:00" }),
      item("milk", { parent: "shop", due: "2026-11-01T07:00:00+01:00" }), item("eod", { due: "2026-11-01" }),
      item("old", { due: "2026-10-31" }),
    ], ctx);
    expect(s.preview.map((i) => i.uid)).toEqual(["old", "milk", "early"]);
    expect(s.counts.today).toBe(5);
  });
});

describe("mobile chips", () => {
  const draw = (enabled: string[], onTile: (c: string) => void = () => undefined) => {
    const host = document.createElement("div");
    const env = { hass: { states: {} }, lang: "en", now, parents: [] } as never;
    render(renderTiles({
      ctx: { ...ctx, enabled: new Set(enabled) as Ctx["enabled"] }, items: [item("a"), item("b"), item("t", { due: "2026-11-01" })],
      people: [], who: null, onWho: () => undefined, onTile, onParent: () => undefined,
    }, env), host);
    return host;
  };

  test("chips follow enabled columns", () => {
    const h = draw(["todo", "week", "today", "done"]);
    expect([...h.querySelectorAll(".qchip")].map((e) => (e as HTMLElement).dataset.tile)).toEqual(["todo", "done"]);
    const off = draw(["todo", "week", "today"]);
    expect([...off.querySelectorAll(".qchip")].map((e) => (e as HTMLElement).dataset.tile)).toEqual(["todo"]);
  });

  test("a chip shows its count (also 0) and a click opens that column", () => {
    const opened: string[] = [];
    const h = draw(["todo", "today", "done"], (c) => { opened.push(c); });
    expect(h.querySelector('.qchip[data-tile="todo"] .qcount')?.textContent).toBe("2");
    const done = h.querySelector('.qchip[data-tile="done"]') as HTMLElement;
    expect(done.querySelector(".qcount")?.textContent).toBe("0");
    done.click();
    expect(opened).toEqual(["done"]);
  });

  test("Today and This week are tiles, To-do and Done are not", () => {
    const h = draw(["todo", "week", "today", "done"]);
    expect([...h.querySelectorAll(".tile")].map((e) => (e as HTMLElement).dataset.tile)).toEqual(["today", "week"]);
    expect(h.querySelectorAll(".tile.wide").length).toBe(2);
  });
});
