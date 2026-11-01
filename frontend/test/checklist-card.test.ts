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

const openDialog = async (uid: string) => {
  cardEl(uid).querySelector<HTMLElement>(".title")!.click();
  await settle();
};
const setTitle = (v: string) => {
  const t = dialog()!.querySelector("#kb-title") as HTMLInputElement;
  t.value = v;
  t.dispatchEvent(new Event("input"));
};

test("Save with an untouched list does not erase a line Assist added meanwhile", async () => {
  push(board([item("a", { description: "note\n\n- [ ] milk" })]));
  await settle();
  await openDialog("a");
  push(board([item("a", { description: "note\n\n- [ ] milk\n- [ ] bread" })]));
  await settle();
  setTitle("Lidl");
  await settle();
  btn(/^\s*Save\s*$/, dialog()!).click();
  await settle();
  expect(calls).toEqual([["update_item", { uid: "a", summary: "Lidl" }]]);
});

test("Save with a ticked row keeps a line Assist added meanwhile", async () => {
  push(board([item("a", { description: "note\n\n- [ ] milk\n- [ ] eggs" })]));
  await settle();
  await openDialog("a");
  push(board([item("a", { description: "note\n\n- [ ] milk\n- [ ] eggs\n- [ ] bread" })]));
  await settle();
  (dialog()!.querySelector(".cl-check") as HTMLButtonElement).click();
  await settle();
  btn(/^\s*Save\s*$/, dialog()!).click();
  await settle();
  expect(calls).toEqual([["update_item", { uid: "a", description: "note\n\n- [ ] eggs\n- [ ] bread\n- [x] milk" }]]);
});

test("two quick ticks before the board push keep both", async () => {
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs\n- [ ] bread" })]));
  await settle();
  rows("a")[0].click(); // milk
  await settle();
  expect(rows("a").map((r) => r.textContent?.trim())).toEqual(["eggs", "bread"]); // rendered from the pending tick
  rows("a")[0].click(); // eggs, now first
  await settle();
  expect(calls[1]).toEqual(["update_item", { uid: "a", description: "- [ ] bread\n- [x] eggs\n- [x] milk" }]);
  push(board([item("a", { description: "- [ ] bread\n- [x] eggs\n- [x] milk" })]));
  await settle();
  expect(card._ticks.size).toBe(0);
});

test("a new note in a checklist list is titled and can be saved right away", async () => {
  push(board([]));
  await settle();
  card._filter = { ...card._filter, parent: "shop" };
  await settle();
  (root().querySelector("header .new") as HTMLButtonElement).click();
  await settle();
  expect((dialog()!.querySelector("#kb-title") as HTMLInputElement).value).toBe("Shopping");
  const save = btn(/^\s*Save\s*$/, dialog()!);
  expect(save.disabled).toBe(false);
  save.click();
  await settle();
  expect(calls[0][0]).toBe("create_item");
  expect(calls[0][1]).toMatchObject({ summary: "Shopping", parent: "shop" });
});

const progressOf = (uid: string) => cardEl(uid).querySelector(".cl-progress")?.textContent?.trim();

test("three ticks on three rows before any echo survive the echoes arriving one by one", async () => {
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs\n- [ ] bread" })]));
  await settle();
  for (let n = 0; n < 3; n++) { rows("a")[0].click(); await settle(); }
  const sent = calls.map(([, d]) => d.description as string);
  expect(sent[2]).toBe("- [x] bread\n- [x] eggs\n- [x] milk");
  expect(progressOf("a")).toBe("3/3");
  for (const echo of sent) {
    push(board([item("a", { description: echo })]));
    await settle();
    expect(progressOf("a")).toBe("3/3");
  }
  expect(card._ticks.size).toBe(0);
});

test("a foreign write drops the pending tick", async () => {
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs" })]));
  await settle();
  rows("a")[0].click();
  await settle();
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs\n- [ ] bread" })]));
  await settle();
  expect(card._ticks.size).toBe(0);
  expect(progressOf("a")).toBe("0/3");
});

test("a pending tick whose echo never arrives is dropped after a timeout", async () => {
  vi.useRealTimers();
  vi.useFakeTimers({ toFake: ["Date", "setTimeout"] });
  vi.setSystemTime(new Date(2026, 10, 1, 9, 0));
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs" })]));
  await settle();
  rows("a")[0].click();
  await settle();
  expect(progressOf("a")).toBe("1/2");
  vi.advanceTimersByTime(10_000);
  await settle();
  expect(card._ticks.size).toBe(0);
  expect(progressOf("a")).toBe("0/2");
});

test("ticking the last open line does not complete the note", async () => {
  push(board([item("a", { description: "- [ ] milk\n- [x] eggs" })]));
  await settle();
  rows("a")[0].click();
  await settle();
  expect(calls).toEqual([["update_item", { uid: "a", description: "- [x] milk\n- [x] eggs" }]]);
});

test("Save keeps a line someone else added and ticked meanwhile ticked", async () => {
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs" })]));
  await settle();
  await openDialog("a");
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs\n- [x] bread" })]));
  await settle();
  (dialog()!.querySelector(".cl-check") as HTMLButtonElement).click();
  await settle();
  btn(/^\s*Save\s*$/, dialog()!).click();
  await settle();
  expect(calls).toEqual([["update_item", { uid: "a", description: "- [ ] eggs\n- [x] milk\n- [x] bread" }]]);
});

test("a completed checklist note shows the reopen circle on the card", async () => {
  push(board([item("a", { description: "- [x] milk", status: "completed", completed_at: "2026-11-01T08:00:00+00:00" })]));
  await settle();
  const check = cardEl("a").querySelector(".check") as HTMLButtonElement;
  expect(check.getAttribute("aria-pressed")).toBe("true");
  check.click();
  await settle();
  expect(calls).toEqual([["set_status", { uid: "a", status: "needs_action" }]]);
});

test("each × in the dialog list names its item", async () => {
  push(board([item("a", { description: "- [ ] milk\n- [ ] eggs" })]));
  await settle();
  await openDialog("a");
  expect([...dialog()!.querySelectorAll(".cl-x")].map((b) => b.getAttribute("aria-label"))).toEqual(["Remove item: milk", "Remove item: eggs"]);
});

test("expanded with nothing ticked offers Show less", async () => {
  push(board([item("a", { description: [1, 2, 3, 4, 5, 6].map((n) => `- [ ] i${n}`).join("\n") })]));
  await settle();
  btn(/\+ 1 more/, cardEl("a")).click();
  await settle();
  expect(btn(/Show less/, cardEl("a"))).toBeTruthy();
  expect(btn(/Hide ticked/, cardEl("a"))).toBeUndefined();
});
