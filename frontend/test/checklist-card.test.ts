// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import "../src/card";
import type { Board, Item } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const item = (uid: string, o: Partial<Item> = {}): Item => ({
  uid, parent: "shop", summary: `note ${uid}`, description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false, ...o,
});
const board = (items: Item[]): Board => ({
  parents: [
    { id: "household", entity_id: "todo.household", name: "Household", icon: "mdi:home", color: "blue", checklist: false },
    { id: "shop", entity_id: "todo.shop", name: "Shopping", icon: "mdi:cart", color: "green", checklist: true },
  ],
  items, end_of_day_mode: "keep",
});

let card: any, push: (b: Board) => void, calls: [string, any][];
async function settle() { await card.updateComplete; await Promise.resolve(); await card.updateComplete; }
const root = () => card.shadowRoot as ShadowRoot;
const cardEl = (uid: string) => root().querySelector(`article[data-uid="${uid}"]`) as HTMLElement;
const rows = (uid: string) => [...cardEl(uid).querySelectorAll<HTMLButtonElement>(".cl-row")];
const dialog = () => root().querySelector("dialog.kb-dialog") as HTMLDialogElement | null;
const btn = (label: RegExp, scope: ParentNode = root()) => [...scope.querySelectorAll("button")].find((b) => label.test(b.textContent ?? "")) as HTMLButtonElement;

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(2026, 10, 1, 9, 0));
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
});
afterEach(() => { card.remove(); vi.useRealTimers(); });

test("a ticked row sends update_item with the description reordered", async () => {
  push(board([item("a", { description: "Lidl\n\n- [ ] milk\n- [ ] bread\n- [x] eggs" })]));
  await settle();
  expect(cardEl("a").querySelector(".cl-progress")?.textContent?.trim()).toBe("1/3");
  expect(cardEl("a").querySelector(".check")).toBeNull();
  rows("a")[0].click();
  await settle();
  expect(dialog()).toBeNull();
  expect(calls).toEqual([["update_item", { uid: "a", description: "Lidl\n\n- [ ] bread\n- [x] milk\n- [x] eggs" }]]);
});

test("more than 5 open lines show + N more", async () => {
  const lines = [1, 2, 3, 4, 5, 6, 7].map((n) => `- [ ] i${n}`).join("\n");
  push(board([item("a", { description: `${lines}\n- [x] done` })]));
  await settle();
  expect(rows("a").map((r) => r.textContent?.trim())).toEqual(["i1", "i2", "i3", "i4", "i5"]);
  const more = btn(/\+ 2 more · 1 ticked/, cardEl("a"));
  expect(more).toBeTruthy();
  more.click();
  await settle();
  expect(rows("a")).toHaveLength(8);
  expect(dialog()).toBeNull();
  btn(/Hide ticked/, cardEl("a")).click();
  await settle();
  expect(rows("a")).toHaveLength(5);
});

test("all ticked offers done", async () => {
  push(board([item("a", { description: "- [ ] milk\n- [x] eggs" })]));
  await settle();
  expect(btn(/Mark done/, cardEl("a"))).toBeUndefined();
  push(board([item("a", { description: "- [x] milk\n- [x] eggs" })]));
  await settle();
  btn(/Mark done/, cardEl("a")).click();
  await settle();
  expect(dialog()).toBeNull();
  expect(calls).toEqual([["set_status", { uid: "a", status: "completed" }]]);
});

test("in the dialog, Add item + Enter adds a row and Save sends the joined description", async () => {
  push(board([item("a", { description: "note\n\n- [ ] milk" })]));
  await settle();
  cardEl("a").querySelector<HTMLElement>(".title")!.click();
  await settle();
  expect(dialog()!.querySelector(".note")?.textContent).toBe("note");
  btn(/^\s*Edit\s*$/, dialog()!).click();
  await settle();
  expect((dialog()!.querySelector("textarea") as HTMLTextAreaElement).value).toBe("note");
  const input = dialog()!.querySelector(".cl-add input") as HTMLInputElement;
  input.focus();
  input.value = "bread";
  input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  await settle();
  expect(input.value).toBe("");
  expect(root().activeElement).toBe(input);
  expect([...dialog()!.querySelectorAll(".cl-text")].map((e) => e.textContent)).toEqual(["milk", "bread"]);
  btn(/^\s*Save\s*$/, dialog()!).click();
  await settle();
  expect(calls).toEqual([["update_item", { uid: "a", description: "note\n\n- [ ] milk\n- [ ] bread" }]]);
});

test("a new note in a checklist parent shows the List section", async () => {
  push(board([]));
  await settle();
  card._filter = { ...card._filter, parent: "shop" };
  await settle();
  (root().querySelector("header .new") as HTMLButtonElement).click();
  await settle();
  expect(dialog()!.querySelector(".cl-list")).not.toBeNull();
  expect(root().activeElement).toBe(dialog()!.querySelector(".cl-add input"));
});
