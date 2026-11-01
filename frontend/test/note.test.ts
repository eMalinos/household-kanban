// @vitest-environment happy-dom
import { render } from "lit";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import "../src/card";
import { applyFormat, renderNote } from "../src/ui/note";
import type { Board, Item } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

test("applyFormat bold wraps the selection", () => {
  expect(applyFormat("a milk b", 2, 6, "bold")).toEqual({ value: "a **milk** b", start: 4, end: 8 });
});
test("applyFormat bold and italic with an empty selection put the caret inside", () => {
  expect(applyFormat("ab", 1, 1, "bold")).toEqual({ value: "a****b", start: 3, end: 3 });
  expect(applyFormat("ab", 1, 1, "italic")).toEqual({ value: "a**b", start: 2, end: 2 });
});
test("applyFormat bullets prefixes every selected line and toggles off", () => {
  const on = applyFormat("x\none\ntwo\ny", 2, 9, "bullets");
  expect(on.value).toBe("x\n- one\n- two\ny");
  expect(applyFormat(on.value, on.start, on.end, "bullets").value).toBe("x\none\ntwo\ny");
});
test("applyFormat bullets on the first line when the value starts with a newline", () => {
  expect(applyFormat("\nab", 0, 0, "bullets").value).toBe("- \nab");
});
test("applyFormat link wraps the selection and selects the url", () => {
  const r = applyFormat("see docs now", 4, 8, "link");
  expect(r.value).toBe("see [docs](https://) now");
  expect(r.value.slice(r.start, r.end)).toBe("https://");
});

test("fallback without ha-markdown renders plain text with no script execution", () => {
  expect(customElements.get("ha-markdown")).toBeUndefined();
  const host = document.createElement("div");
  const src = "hi <script>window.__x=1</script> **b**";
  render(renderNote(src, { clamp: 3 }), host);
  const div = host.querySelector("div") as HTMLElement;
  expect(div.textContent).toBe(src);
  expect(host.querySelector("script")).toBeNull();
  expect(div.getAttribute("style")).toContain("--clamp:3");
  expect((window as any).__x).toBeUndefined();
});

const item = (uid: string, o: Partial<Item> = {}): Item => ({
  uid, parent: "shop", summary: `note ${uid}`, description: "", status: "needs_action", due: null,
  priority: 2, assignee: null, created_at: "2026-10-01T08:00:00+00:00", completed_at: null, moved: 0, raised: false, ...o,
});
const board = (items: Item[]): Board => ({
  parents: [{ id: "shop", entity_id: "todo.shop", name: "Shopping", icon: "mdi:cart", color: "green", checklist: true }],
  items, end_of_day_mode: "keep",
});
let card: any, push: (b: Board) => void, calls: [string, any][];
async function settle() { await card.updateComplete; await Promise.resolve(); await card.updateComplete; }
const root = () => card.shadowRoot as ShadowRoot;
const dialog = () => root().querySelector("dialog.kb-dialog") as HTMLDialogElement;
const btn = (label: RegExp, scope: ParentNode) => [...scope.querySelectorAll("button")].find((b) => label.test(b.textContent ?? "")) as HTMLButtonElement;
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

async function open(description: string) {
  push(board([item("a", { description })]));
  await settle();
  root().querySelector<HTMLElement>("article[data-uid=a] .title")!.click();
  await settle();
}

test("the card shows the note but not the checklist lines", async () => {
  push(board([item("a", { description: "**hi**\n\n- [ ] milk" })]));
  await settle();
  const n = root().querySelector("article[data-uid=a] .note") as HTMLElement;
  expect(n.textContent).toContain("**hi**");
  expect(n.textContent).not.toContain("milk");
});

test("the dialog opens in Preview for a non-empty note", async () => {
  await open("some note");
  expect(dialog().querySelector("textarea")).toBeNull();
  expect(dialog().querySelector(".note")?.textContent).toContain("some note");
  btn(/^\s*Edit\s*$/, dialog()).click();
  await settle();
  expect(dialog().querySelector("textarea")).not.toBeNull();
});

test("the dialog opens in Edit for an empty note", async () => {
  await open("- [ ] milk");
  expect(dialog().querySelector("textarea")).not.toBeNull();
});

test("a toolbar click changes the note and keeps the checklist part", async () => {
  await open("- [ ] milk");
  const ta = dialog().querySelector("textarea") as HTMLTextAreaElement;
  ta.value = "word";
  ta.dispatchEvent(new Event("input"));
  await settle();
  ta.setSelectionRange(0, 4);
  dialog().querySelector<HTMLButtonElement>('button[data-fmt="bold"]')!.click();
  await settle();
  expect((dialog().querySelector("textarea") as HTMLTextAreaElement).value).toBe("**word**");
  btn(/^\s*Save\s*$/, dialog()).click();
  await settle();
  expect(calls).toEqual([["update_item", { uid: "a", description: "**word**\n\n- [ ] milk" }]]);
});

test("applyFormat bullets on mixed lines adds the prefix only where missing and skips blank lines", () => {
  const on = applyFormat("- one\ntwo\n\nthree", 0, 15, "bullets");
  expect(on.value).toBe("- one\n- two\n\n- three");
  expect(applyFormat(on.value, on.start, on.end, "bullets").value).toBe("one\ntwo\n\nthree");
});

async function editNote(value: string) {
  await open("- [ ] milk");
  const ta = dialog().querySelector("textarea") as HTMLTextAreaElement;
  ta.value = value;
  ta.dispatchEvent(new Event("input"));
  await settle();
  return ta;
}

test("a toolbar edit replaces only the changed range, so native undo keeps working", async () => {
  const ta = await editNote("a word b");
  const spy = vi.spyOn(ta, "setRangeText");
  ta.setSelectionRange(2, 6);
  dialog().querySelector<HTMLButtonElement>('button[data-fmt="italic"]')!.click();
  await settle();
  expect(spy).toHaveBeenCalledOnce();
  expect(ta.value).toBe("a *word* b");
  expect([ta.selectionStart, ta.selectionEnd]).toEqual([3, 7]);
  btn(/^\s*Save\s*$/, dialog()).click();
  await settle();
  expect(calls).toEqual([["update_item", { uid: "a", description: "a *word* b\n\n- [ ] milk" }]]);
});

test("Ctrl+B formats, Ctrl+Shift+B and Ctrl+Alt+B do not", async () => {
  const ta = await editNote("word");
  ta.setSelectionRange(0, 4);
  for (const extra of [{ shiftKey: true }, { altKey: true }]) {
    ta.dispatchEvent(new KeyboardEvent("keydown", { key: "b", ctrlKey: true, bubbles: true, ...extra }));
  }
  expect(ta.value).toBe("word");
  ta.dispatchEvent(new KeyboardEvent("keydown", { key: "b", ctrlKey: true, bubbles: true }));
  expect(ta.value).toBe("**word**");
});

test("toolbar buttons have tooltips and the link button is an icon, not an emoji", async () => {
  await editNote("");
  const fmt = [...dialog().querySelectorAll<HTMLButtonElement>(".fmt-btn")];
  expect(fmt.every((b) => b.title && b.title === b.getAttribute("aria-label"))).toBe(true);
  const link = dialog().querySelector('button[data-fmt="link"]')!;
  expect(link.textContent).not.toContain("🔗");
  expect(link.querySelector("svg")).not.toBeNull();
});

test("a click whose composed path holds an anchor in a shadow root does not open the dialog", async () => {
  class FakeMd extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: "open" }).innerHTML = '<a href="#x">l</a>'; }
  }
  customElements.define("ha-markdown", FakeMd);
  push(board([item("a", { description: "see [l](#x)" })]));
    await settle();
    const a = root().querySelector("article[data-uid=a] ha-markdown")!.shadowRoot!.querySelector("a")!;
    a.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    await settle();
    expect(root().querySelector("dialog.kb-dialog")).toBeNull();
});
