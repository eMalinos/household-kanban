// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Sortable from "sortablejs";
import "../src/card";
import type { Board, Item } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const item = (uid: string, o: Partial<Item> = {}): Item => ({
  uid, parent: "household", summary: `task ${uid}`, description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false, ...o,
});
const board = (items: Item[]): Board => ({
  parents: [{ id: "household", entity_id: "todo.household", name: "Household", icon: "mdi:home", color: "blue", collapse: false }],
  items, end_of_day_mode: "keep",
});

let card: any, push: (b: Board) => void, calls: [string, any][], gate: Promise<void> | undefined;

async function settle() { await card.updateComplete; await Promise.resolve(); await card.updateComplete; }

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 10, 1, 9, 0)); // Sunday; week column = Nov 2-8
  calls = []; gate = undefined;
  card = document.createElement("household-kanban-card");
  card.hass = {
    states: {}, locale: { language: "en", first_weekday: "monday" },
    connection: { subscribeMessage: async (cb: (e: unknown) => void) => { push = (b) => cb({ board: b }); return () => undefined; } },
    callService: async (_d: string, s: string, data: any) => { calls.push([s, data]); await gate; },
  };
  card.setConfig({ type: "household-kanban-card" });
  document.body.append(card);
  await settle();
  push(board([item("a"), item("b"), item("c", { due: "2026-11-05" })]));
  await settle();
});
afterEach(() => { card.remove(); vi.useRealTimers(); });

const root = () => card.shadowRoot as ShadowRoot;
const uids = (col: string) => [...root().querySelectorAll(`.col[data-col="${col}"] article[data-uid]`)].map((e) => (e as HTMLElement).dataset.uid);
const colEl = (col: string) => root().querySelector(`.col[data-col="${col}"]`) as HTMLElement;
const cardEl = (uid: string) => root().querySelector(`article[data-uid="${uid}"]`) as HTMLElement;
const opts = (col: string) => Sortable.get(colEl(col))!.options as any;
const dialog = () => root().querySelector("dialog") as HTMLDialogElement | null;
const btn = (label: RegExp) => [...root().querySelectorAll("dialog button")].find((b) => label.test(b.textContent ?? "")) as HTMLButtonElement;

function drag(uid: string, from: string, to: string) {
  const el = cardEl(uid);
  opts(from).onStart({ item: el });
  if (to !== from) colEl(to).append(el); // what Sortable does on a cross-column drop
  opts(from).onEnd({ item: el, from: colEl(from), to: colEl(to) });
}

describe("drag and drop keeps Lit's DOM intact", () => {
  test("cross-column drop of the first, middle and last card", async () => {
    for (const uid of ["a", "b"]) {
      drag(uid, "todo", "week");
      await settle();
      expect(uids("todo")).toEqual(["a", "b"]);
    }
    expect(calls.map((c) => c[0])).toEqual(["update_item", "update_item"]);
    push(board([item("a", { due: "2026-11-08" }), item("b"), item("c", { due: "2026-11-05" })]));
    await settle();
    expect(uids("todo")).toEqual(["b"]);
    expect(uids("week").sort()).toEqual(["a", "c"]);
  });

  test("same-column cancel (and a touch long-press with no move)", async () => {
    drag("b", "todo", "todo");
    await settle();
    expect(uids("todo")).toEqual(["a", "b"]);
    expect(calls).toEqual([]);
    push(board([item("a"), item("b"), item("c", { due: "2026-11-05" }), item("d")]));
    await settle();
    expect(uids("todo")).toEqual(["a", "b", "d"]);
    expect(root().querySelectorAll("article[data-uid]")).toHaveLength(4);
  });

  test("a board push during a drag waits for the drag to end", async () => {
    const el = cardEl("a");
    opts("todo").onStart({ item: el });
    push(board([item("a"), item("b"), item("c", { due: "2026-11-05" }), item("d")]));
    await settle();
    expect(uids("todo")).toEqual(["a", "b"]);
    opts("todo").onEnd({ item: el, from: colEl("todo"), to: colEl("todo") });
    await settle();
    expect(uids("todo")).toEqual(["a", "b", "d"]);
  });
});

describe("opening and the dialog", () => {
  test("keyboard activation opens even after a stale pointerdown elsewhere", async () => {
    card.dispatchEvent(new MouseEvent("pointerdown", { clientX: 400, clientY: 400 }));
    (cardEl("a").querySelector(".title") as HTMLElement).dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 }));
    await settle();
    expect(dialog()).not.toBeNull();
  });

  test("a click that ends a drag does not open; the guard is used up afterwards", async () => {
    card.dispatchEvent(new MouseEvent("pointerdown", { clientX: 0, clientY: 0 }));
    cardEl("a").dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1, clientX: 50, clientY: 50 }));
    await settle();
    expect(dialog()).toBeNull();
    cardEl("a").dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 1, clientX: 50, clientY: 50 }));
    await settle();
    expect(dialog()).not.toBeNull();
  });

  test("dialog is named after the task", async () => {
    cardEl("a").dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 }));
    await settle();
    expect(dialog()!.getAttribute("aria-label")).toBe("task a");
  });

  test("Mark done saves unsaved edits first", async () => {
    cardEl("a").dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 }));
    await settle();
    const input = root().querySelector("#kb-title") as HTMLInputElement;
    input.value = "renamed";
    input.dispatchEvent(new Event("input"));
    await settle();
    btn(/^\s*Done\s*$/).click();
    await settle();
    expect(calls).toEqual([["update_item", { uid: "a", summary: "renamed" }], ["set_status", { uid: "a", status: "completed" }]]);
  });

  test("Save for an item that vanished shows an error and creates nothing", async () => {
    cardEl("a").dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 }));
    await settle();
    push(board([item("b")]));
    await settle();
    btn(/^\s*Save\s*$/).click();
    await settle();
    expect(calls).toEqual([]);
    expect(dialog()!.querySelector('[role="alert"]')).not.toBeNull();
  });

  test("a late write success does not close a newer dialog", async () => {
    let release!: () => void;
    gate = new Promise((r) => { release = r; });
    cardEl("a").dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 }));
    await settle();
    const input = root().querySelector("#kb-title") as HTMLInputElement;
    input.value = "changed";
    input.dispatchEvent(new Event("input"));
    await settle();
    btn(/^\s*Save\s*$/).click();
    await settle();
    dialog()!.dispatchEvent(new Event("close")); // user dismisses while the write is pending
    await settle();
    cardEl("b").dispatchEvent(new MouseEvent("click", { bubbles: true, detail: 0 }));
    await settle();
    release();
    await settle();
    await settle();
    expect(dialog()?.getAttribute("aria-label")).toBe("task b");
  });

  test("new note focuses the title; closing returns focus to the opener", async () => {
    const open = root().querySelector("header .new") as HTMLButtonElement;
    open.click();
    await settle();
    expect(dialog()!.getAttribute("aria-label")).toBe("New task");
    expect(root().activeElement?.id).toBe("kb-title");
    dialog()!.dispatchEvent(new Event("close"));
    await settle();
    expect(root().activeElement).toBe(open);
  });
});
