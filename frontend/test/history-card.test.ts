// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import "../src/card";
import type { Board, Item } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const item = (uid: string, o: Partial<Item> = {}): Item => ({
  uid, parent: "household", summary: `task ${uid}`, description: "", status: "completed", due: null,
  priority: 2, assignee: null, created_at: "2026-09-01T08:00:00+00:00", completed_at: "2026-09-10T08:00:00+00:00", moved: 0, raised: false, ...o,
});
const board = (): Board => ({
  parents: [{ id: "household", entity_id: "todo.household", name: "Household", icon: "mdi:home", color: "blue", checklist: false }],
  items: [], end_of_day_mode: "keep",
});

type Req = { msg: any; resolve: (v: { items: Item[]; total: number }) => void; reject: (e: unknown) => void };
let card: any, reqs: Req[], services: string[], failService: boolean;

async function settle() { for (let i = 0; i < 4; i++) { await card.updateComplete; await Promise.resolve(); } }
const root = () => card.shadowRoot as ShadowRoot;
const rows = () => [...root().querySelectorAll(".hist-row")].map((e) => (e as HTMLElement).dataset.uid);
const click = (sel: string) => (root().querySelector(sel) as HTMLElement).click();

beforeEach(async () => {
  vi.useFakeTimers({ toFake: ["Date", "setTimeout", "clearTimeout"] });
  vi.setSystemTime(new Date(2026, 10, 1, 9, 0));
  reqs = []; services = []; failService = false;
  card = document.createElement("household-kanban-card");
  card.hass = {
    states: {}, locale: { language: "en", first_weekday: "monday" },
    connection: {
      subscribeMessage: async (cb: (e: unknown) => void) => { cb({ board: board() }); return () => undefined; },
      sendMessagePromise: (msg: any) => new Promise((resolve, reject) => { reqs.push({ msg, resolve, reject }); }),
    },
    callService: async (_d: string, s: string) => { services.push(s); if (failService) throw new Error("boom"); },
  };
  card.setConfig({ type: "household-kanban-card" });
  document.body.append(card);
  await settle();
});
afterEach(() => { card.remove(); vi.useRealTimers(); });

async function openHistory(via = "header .hist-btn") {
  click(via);
  await settle();
  reqs[0].resolve({ items: [item("a"), item("b"), item("c")], total: 7 });
  await settle();
}

describe("history dialog", () => {
  test("both entry points open it and the first page is requested with limit 50", async () => {
    click("header .hist-btn");
    await settle();
    expect(reqs[0].msg).toEqual({ type: "household_kanban/history", offset: 0, limit: 50 });
    expect(root().querySelector("dialog.kb-history")).not.toBeNull();
    card._closeHistory(); await settle();
    reqs = [];
    await openHistory('.col[data-col="done"] .note-btn');
    expect(rows()).toEqual(["a", "b", "c"]);
  });

  test("search is debounced 300 ms and discards the in-flight older response", async () => {
    await openHistory();
    const input = root().querySelector(".kb-history input") as HTMLInputElement;
    input.value = "ba"; input.dispatchEvent(new Event("input"));
    await vi.advanceTimersByTimeAsync(299);
    expect(reqs).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(reqs[1].msg).toMatchObject({ search: "ba", offset: 0 });
    input.value = "bak"; input.dispatchEvent(new Event("input"));
    await vi.advanceTimersByTimeAsync(300);
    expect(reqs[2].msg).toMatchObject({ search: "bak", offset: 0 });
    reqs[2].resolve({ items: [item("new")], total: 1 });
    await settle();
    reqs[1].resolve({ items: [item("stale")], total: 1 }); // arrives late
    await settle();
    expect(rows()).toEqual(["new"]);
  });

  test("a parent chip refilters from offset 0", async () => {
    await openHistory();
    click(".hist-chip");
    await vi.advanceTimersByTimeAsync(0);
    expect(reqs[1].msg).toMatchObject({ parent: "household", offset: 0 });
  });

  test("load more appends the next page at offset = loaded count", async () => {
    await openHistory();
    click(".hist-more");
    await settle();
    expect(reqs[1].msg).toMatchObject({ offset: 3, limit: 50 });
    reqs[1].resolve({ items: [item("d")], total: 7 });
    await settle();
    expect(rows()).toEqual(["a", "b", "c", "d"]);
  });

  test("reopen removes the row and decrements the total; a failure keeps the row and shows an error", async () => {
    await openHistory();
    click('.hist-row[data-uid="b"] .hist-reopen');
    await settle();
    expect(services).toEqual(["set_status"]);
    expect(rows()).toEqual(["a", "c"]);
    expect(root().querySelector(".hist-sub")!.textContent).toBe("6 completed");
    failService = true;
    click('.hist-row[data-uid="a"] .hist-reopen');
    await settle();
    expect(rows()).toEqual(["a", "c"]);
    expect(root().querySelector(".kb-history .notice")).not.toBeNull();
  });
});
