// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import "../src/card";
import type { Board, Item } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const item = (uid: string, o: Partial<Item> = {}): Item => ({
  uid, parent: "household", summary: `task ${uid}`, description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false, ...o,
});
const board = (items: Item[]): Board => ({
  parents: [
    { id: "household", entity_id: "todo.household", name: "Household", icon: "mdi:home", color: "blue", checklist: false },
    { id: "shop", entity_id: "todo.shop", name: "Shopping", icon: "mdi:cart", color: "green", checklist: true },
  ],
  items, end_of_day_mode: "keep",
});

let card: any, push: (b: Board) => void, calls: [string, any][], resize: (w: number) => void;

async function settle() { await card.updateComplete; await Promise.resolve(); await card.updateComplete; }
const root = () => card.shadowRoot as ShadowRoot;
const q = (sel: string) => root().querySelector(sel) as HTMLElement | null;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const ptr = (el: Element, type: string, x: number, y: number) =>
  el.dispatchEvent(new PointerEvent(type, { bubbles: true, composed: true, clientX: x, clientY: y }));

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 10, 1, 9, 0));
  vi.stubGlobal("ResizeObserver", class {
    constructor(cb: any) { resize = (w) => cb([{ contentRect: { width: w } }]); }
    observe() { /* test double */ }
    disconnect() { /* test double */ }
  });
  calls = [];
  card = document.createElement("household-kanban-card");
  card.hass = {
    states: {}, locale: { language: "en", first_weekday: "monday" },
    connection: { subscribeMessage: async (cb: (e: unknown) => void) => { push = (b) => cb({ board: b }); return () => undefined; } },
    callService: async (_d: string, s: string, data: any) => { calls.push([s, data]); },
  };
  card.setConfig({ type: "household-kanban-card" });
  document.body.append(card);
  await settle();
  push(board([
    item("a", { due: "2026-11-01" }), item("b"), item("m1", { parent: "shop", due: "2026-11-01" }),
    item("m2", { parent: "shop", due: "2026-11-01" }),
  ]));
  resize(390);
  await settle();
});
afterEach(() => { card.remove(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("narrow layout", () => {
  test("switches between tiles and board by width", async () => {
    expect(q(".tiles")).toBeTruthy();
    expect(q(".board")).toBeNull();
    resize(900); await settle();
    expect(q(".board")).toBeTruthy();
    expect(q(".tiles")).toBeNull();
  });

  test("the header wraps its buttons below the title only when narrow", async () => {
    expect(q("header")?.classList.contains("narrow")).toBe(true);
    resize(900); await settle();
    expect(q("header")?.classList.contains("narrow")).toBe(false);
  });

  test("Today tile opens a sheet with every note as a card; Esc and backdrop close it", async () => {
    q('.tile[data-tile="today"]')!.click(); await settle();
    expect(q(".sheet")).toBeTruthy();
    expect(root().querySelectorAll(".sheet article[data-uid]").length).toBe(3);
    q(".sheet")!.dispatchEvent(new Event("cancel", { cancelable: true })); await settle();
    expect(q(".sheet")).toBeNull();
    q('.tile[data-tile="today"]')!.click(); await settle();
    q(".sheet")!.click(); await settle();
    expect(q(".sheet")).toBeNull();
  });

  test("parent row opens that parent's items as plain rows", async () => {
    q('.prow[data-parent="shop"]')!.click(); await settle();
    expect([...root().querySelectorAll(".sheet article[data-uid]")].map((e) => (e as HTMLElement).dataset.uid)).toEqual(["m1", "m2"]);
  });

  test("long press opens the move menu and applies the move; the trailing click is not a tap", async () => {
    q('.prow[data-parent="household"]')!.click(); await settle();
    const art = q('.sheet article[data-uid="b"]')!;
    ptr(art, "pointerdown", 5, 5);
    await wait(560); await settle();
    expect(q(".menu")).toBeTruthy();
    art.click(); await settle();
    expect(q("dialog.kb-dialog")).toBeNull();
    q('.menu-btn[data-move="done"]')!.click(); await settle();
    expect(calls).toEqual([["set_status", { uid: "b", status: "completed" }]]);
    expect(q(".menu")).toBeNull();
  });

  test("moving more than 8 px cancels the long press", async () => {
    q('.prow[data-parent="household"]')!.click(); await settle();
    const art = q('.sheet article[data-uid="b"]')!;
    ptr(art, "pointerdown", 5, 5);
    ptr(art, "pointermove", 5, 30);
    await wait(560); await settle();
    expect(q(".menu")).toBeNull();
  });

  test("the sheet is a native modal dialog; cancel closes the menu first, then the sheet; focus returns to the tile", async () => {
    const spy = vi.spyOn(HTMLDialogElement.prototype, "showModal");
    q('.tile[data-tile="week"]')!.focus();
    q('.tile[data-tile="today"]')!.click(); await settle();
    expect(q("dialog.kb-sheet")).toBeTruthy();
    expect(spy.mock.contexts.some((c) => (c as HTMLElement).classList.contains("kb-sheet"))).toBe(true);
    const art = q('.sheet article[data-uid="a"]')!;
    ptr(art, "pointerdown", 5, 5);
    await wait(560); await settle();
    expect(q(".menu")).toBeTruthy();
    q(".sheet")!.dispatchEvent(new Event("cancel", { cancelable: true })); await settle();
    expect(q(".menu")).toBeNull();
    expect(q(".sheet")).toBeTruthy();
    q(".sheet")!.dispatchEvent(new Event("cancel", { cancelable: true })); await settle();
    expect(q(".sheet")).toBeNull();
    expect(root().activeElement).toBe(q('.tile[data-tile="today"]'));
  });

  test("sheet list children do not shrink (cards would be squeezed and overlap)", async () => {
    const css = (card.constructor.styles as { cssText: string }).cssText;
    expect(css).toMatch(/\.sheet-list > \* \{[^}]*flex-shrink: 0/);
  });

  test("a sheet whose parent disappears closes instead of crashing", async () => {
    q('.prow[data-parent="shop"]')!.click(); await settle();
    expect(q(".sheet")).toBeTruthy();
    push({ ...board([item("a")]), parents: board([]).parents.slice(0, 1) }); await settle(); await settle();
    expect(q(".sheet")).toBeNull();
  });

  test("overdue badge counts Today-column items due before today in the default mode", async () => {
    push({ ...board([item("y", { due: "2026-10-31" }), item("a", { due: "2026-11-01" })]), end_of_day_mode: "raise" }); await settle();
    expect(q('.tile[data-tile="today"] .pill.c-red')?.textContent).toBe("1 overdue");
  });

  test("closing a sheet opened from a chip returns the focus to that chip", async () => {
    q('.qchip[data-tile="todo"]')!.click(); await settle();
    expect(q(".sheet")).toBeTruthy();
    q(".sheet")!.dispatchEvent(new Event("cancel", { cancelable: true })); await settle();
    expect(q(".sheet")).toBeNull();
    expect(root().activeElement).toBe(q('.qchip[data-tile="todo"]'));
  });

  test("tap on an item opens the detail dialog", async () => {
    q('.prow[data-parent="household"]')!.click(); await settle();
    q('.sheet article[data-uid="b"]')!.click(); await settle();
    expect(q("dialog.kb-dialog")).toBeTruthy();
  });
});
