// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import "../src/card";
import type { Board } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const parents = ["household", "garden"].map((id) => ({ id, entity_id: `todo.${id}`, name: id, icon: "mdi:home", color: "blue", checklist: false }));
const board = (): Board => ({ parents, items: [], end_of_day_mode: "raise" });
const SETTINGS = {
  end_of_day_mode: "raise", close_time: "23:59", notify_enabled: true, notify_time: "08:00", notify_assignee: true,
  notify_services: ["notify.mobile_app_gone"], offered_services: ["notify.mobile_app_karel"],
};
const RAW = { type: "custom:household-kanban-card", columns: ["todo", "week", "today", "done"] };
let card: any, sent: any[], fail: Set<string>;

async function settle() { for (let i = 0; i < 6; i++) { await card.updateComplete; await Promise.resolve(); } }
const $ = (sel: string) => (card.shadowRoot as ShadowRoot).querySelector(sel) as HTMLElement | null;
const click = (sel: string) => ($(sel) as HTMLElement).click();
const of = (type: string) => sent.filter((m) => m.type === type);

async function make(raw: any = RAW) {
  (window as any).happyDOM?.setURL("http://localhost/kanban-dev/ukoly");
  card = document.createElement("household-kanban-card");
  card.hass = {
    states: {}, locale: { language: "en", first_weekday: "monday" }, user: { is_admin: true },
    connection: {
      subscribeMessage: async (cb: (e: unknown) => void) => { cb({ board: board() }); return () => undefined; },
      sendMessagePromise: async (msg: any) => {
        sent.push(msg);
        if (fail.has(msg.type)) throw { code: "unknown_error", message: "boom" };
        if (msg.type === "lovelace/config") return { views: [{ cards: [structuredClone(raw)] }] };
        if (msg.type === "lovelace/config/save") return null;
        if (msg.type === "household_kanban/settings") return structuredClone(SETTINGS);
        if (msg.type === "household_kanban/settings/update") return { ...structuredClone(SETTINGS), ...msg };
        if (msg.type === "household_kanban/parents/add") return { id: "garden_2" };
        if (msg.type.startsWith("household_kanban/parents/")) return null;
        throw new Error(`unexpected ${msg.type}`);
      },
    },
    callService: async () => undefined,
  };
  card.setConfig(raw);
  document.body.append(card);
  await settle();
  click("header .gear-btn");
  await settle();
}

async function tab(id: string) { click(`.kb-settings [role="tab"][data-tab="${id}"]`); await settle(); }

beforeEach(() => { sent = []; fail = new Set(); });
afterEach(() => { card?.remove(); });

describe("end of day tab", () => {
  test("opening tab Eod calls settings once", async () => {
    await make();
    await tab("eod");
    await tab("board");
    await tab("eod");
    expect(of("household_kanban/settings")).toHaveLength(1);
    expect($('.kb-settings [role="radio"][data-mode="raise"]')?.getAttribute("aria-checked")).toBe("true");
  });

  test("picking keep + Save sends only end_of_day_mode", async () => {
    await make();
    await tab("eod");
    click('.kb-settings [role="radio"][data-mode="keep"]');
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    const ups = of("household_kanban/settings/update");
    expect(ups).toHaveLength(1);
    const { type, ...body } = ups[0];
    expect(type).toBeTruthy();
    expect(body).toEqual({ end_of_day_mode: "keep" });
    expect(of("lovelace/config/save")).toHaveLength(0); // board options unchanged
    expect($("dialog.kb-settings")).toBeNull();
  });

  test("stale service is listed", async () => {
    await make();
    await tab("eod");
    const row = $('.kb-settings [role="checkbox"][data-service="notify.mobile_app_gone"]');
    expect(row?.getAttribute("aria-checked")).toBe("true");
    expect(row?.textContent).toContain("notify.mobile_app_gone");
    expect($('.kb-settings [role="checkbox"][data-service="notify.mobile_app_karel"]')?.getAttribute("aria-checked")).toBe("false");
    click('.kb-settings [role="checkbox"][data-service="notify.mobile_app_gone"]');
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    expect(of("household_kanban/settings/update")[0].notify_services).toEqual([]);
  });

  test("load error shows err_load_settings", async () => {
    fail.add("household_kanban/settings");
    await make();
    await tab("eod");
    expect($(".kb-settings .notice")?.textContent).toContain("Could not load the settings");
  });

  test("both sides changed: dashboard error keeps dialog, settings still saved", async () => {
    fail.add("lovelace/config/save");
    await make();
    click('.kb-settings [role="switch"][data-col="later"]');
    await settle();
    await tab("eod");
    click('.kb-settings [role="radio"][data-mode="move"]');
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    expect(of("lovelace/config/save")).toHaveLength(1);
    expect(of("household_kanban/settings/update")).toHaveLength(1);
    expect($("dialog.kb-settings")).not.toBeNull();
    expect($(".kb-settings .notice")?.textContent).toContain("Could not save the settings");
    // retry sends only the side that is still pending
    fail.clear();
    click(".kb-settings .primary-btn");
    await settle();
    expect(of("lovelace/config/save")).toHaveLength(2);
    expect(of("household_kanban/settings/update")).toHaveLength(1);
    expect($("dialog.kb-settings")).toBeNull();
  });

  test("cancel during an in-flight save writes nothing more", async () => {
    await make();
    click('.kb-settings [role="switch"][data-col="later"]');
    await settle();
    click(".kb-settings .primary-btn");
    click('.kb-settings .dlg-foot .pill-btn'); // Cancel before lovelace/config resolves
    await settle();
    expect(of("lovelace/config/save")).toHaveLength(0);
  });
});

describe("list editing", () => {
  test("add list form sends parents/add with the picked colour", async () => {
    await make();
    await tab("lists");
    click(".kb-settings .add-list");
    await settle();
    const name = $(".kb-settings .parent-form input[name=name]") as HTMLInputElement;
    name.value = "Garden 2";
    name.dispatchEvent(new Event("input"));
    await settle();
    click('.kb-settings .parent-form [data-color="green"]');
    await settle();
    click(".kb-settings .parent-form .save-parent");
    await settle();
    expect(of("household_kanban/parents/add")).toEqual([
      { type: "household_kanban/parents/add", name: "Garden 2", icon: "mdi:format-list-checks", color: "green", checklist: false },
    ]);
    expect($(".kb-settings .parent-form")).toBeNull();
  });

  test("a list added under an explicit parents filter is appended to the draft and saved", async () => {
    await make({ ...RAW, parents: ["household"] });
    await tab("lists");
    click(".kb-settings .add-list");
    await settle();
    const name = $(".kb-settings .parent-form input[name=name]") as HTMLInputElement;
    name.value = "Garden 2";
    name.dispatchEvent(new Event("input"));
    await settle();
    click(".kb-settings .parent-form .save-parent");
    await settle();
    click(".kb-settings .primary-btn:not(.save-parent)");
    await settle();
    const saved = of("lovelace/config/save")[0];
    expect(saved.config.views[0].cards[0].parents).toEqual(["household", "garden_2"]);
  });

  test("pencil edits a list via parents/update", async () => {
    await make();
    await tab("lists");
    click('.kb-settings .edit-list[data-parent="garden"]');
    await settle();
    click(".kb-settings .parent-form [role=switch]");
    await settle();
    click(".kb-settings .parent-form .save-parent");
    await settle();
    expect(of("household_kanban/parents/update")).toEqual([{ type: "household_kanban/parents/update", parent_id: "garden", checklist: true }]);
  });

  test("remove asks for target and sends parents/remove", async () => {
    await make();
    await tab("lists");
    click('.kb-settings .edit-list[data-parent="garden"]');
    await settle();
    click(".kb-settings .parent-form .remove-parent");
    await settle();
    expect(of("household_kanban/parents/remove")).toHaveLength(0);
    expect(($(".kb-settings .parent-form select") as HTMLSelectElement).value).toBe("household");
    click(".kb-settings .parent-form .confirm-remove");
    await settle();
    expect(of("household_kanban/parents/remove")).toEqual([{ type: "household_kanban/parents/remove", parent_id: "garden", target: "household" }]);
  });

  test("parent write error shows err_parent", async () => {
    fail.add("household_kanban/parents/update");
    await make();
    await tab("lists");
    click('.kb-settings .edit-list[data-parent="garden"]');
    await settle();
    click(".kb-settings .parent-form [role=switch]");
    await settle();
    click(".kb-settings .parent-form .save-parent");
    await settle();
    expect($(".kb-settings .parent-form .notice")?.textContent).toContain("Could not save the list");
  });

  test("default parent has no Remove", async () => {
    await make();
    await tab("lists");
    click('.kb-settings .edit-list[data-parent="household"]');
    await settle();
    expect($(".kb-settings .parent-form")).not.toBeNull();
    expect($(".kb-settings .parent-form .remove-parent")).toBeNull();
  });
});

const key = (sel: string, k: string) => { ($(sel) as HTMLElement).dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true })); return settle(); };

describe("polish", () => {
  test("load error lives in the tab, survives Board edits and retries", async () => {
    fail.add("household_kanban/settings");
    await make();
    await tab("eod");
    expect($(".kb-settings .set-body .notice")?.textContent).toContain("Could not load the settings");
    expect($(".kb-settings .dlg > .notice")).toBeNull();
    await tab("board");
    click('.kb-settings [role="switch"][data-col="later"]');
    await settle();
    await tab("eod");
    expect($(".kb-settings .set-body .notice")).not.toBeNull();
    fail.clear();
    click(".kb-settings .retry-eod");
    await settle();
    expect($(".kb-settings .set-body .notice")).toBeNull();
    expect($('.kb-settings [role="radio"][data-mode="raise"]')).not.toBeNull();
  });

  test("loading the tab keeps a pending save error", async () => {
    fail.add("lovelace/config/save");
    await make();
    click('.kb-settings [role="switch"][data-col="later"]');
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    expect($(".kb-settings .dlg > .notice")?.textContent).toContain("Could not save the settings");
    await tab("eod");
    expect($(".kb-settings .dlg > .notice")?.textContent).toContain("Could not save the settings");
  });

  test("a cleared time input shows the draft's time again and sends nothing", async () => {
    await make();
    await tab("eod");
    const input = $(".kb-settings .time-in") as HTMLInputElement;
    input.value = "";
    input.dispatchEvent(new Event("change"));
    await settle();
    expect(input.value).toBe("23:59");
    click(".kb-settings .primary-btn");
    await settle();
    expect(of("household_kanban/settings/update")).toHaveLength(0);
  });

  test("an unsaved list form blocks Save; Cancel and Escape close the form first", async () => {
    await make();
    await tab("lists");
    click('.kb-settings .edit-list[data-parent="garden"]');
    await settle();
    expect(($(".kb-settings .dlg-foot .primary-btn") as HTMLButtonElement).disabled).toBe(false);
    const name = $(".kb-settings .parent-form input[name=name]") as HTMLInputElement;
    name.value = "Yard";
    name.dispatchEvent(new Event("input"));
    await settle();
    expect(($(".kb-settings .dlg-foot .primary-btn") as HTMLButtonElement).disabled).toBe(true);
    expect($(".kb-settings .form-unsaved")?.textContent).toBe("Save or cancel the list first");
    click(".kb-settings .dlg-foot .pill-btn");
    await settle();
    expect($(".kb-settings .parent-form")).toBeNull();
    expect($("dialog.kb-settings")).not.toBeNull();
    expect($(".kb-settings .form-unsaved")).toBeNull();
    click('.kb-settings .edit-list[data-parent="garden"]');
    await settle();
    const esc = new Event("cancel", { cancelable: true });
    ($("dialog.kb-settings") as HTMLElement).dispatchEvent(esc);
    await settle();
    expect(esc.defaultPrevented).toBe(true);
    expect($(".kb-settings .parent-form")).toBeNull();
    click(".kb-settings .dlg-foot .pill-btn");
    await settle();
    expect($("dialog.kb-settings")).toBeNull();
  });

  test("Cancel closes the dialog at once when the open list form is unchanged", async () => {
    await make();
    await tab("lists");
    click('.kb-settings .edit-list[data-parent="garden"]');
    await settle();
    expect($(".kb-settings .parent-form")).not.toBeNull();
    click(".kb-settings .dlg-foot .pill-btn");
    await settle();
    expect($("dialog.kb-settings")).toBeNull();
  });

  test("tabs are wired to the panel and move with the arrow keys", async () => {
    await make();
    const board = $('.kb-settings [role="tab"][data-tab="board"]') as HTMLElement;
    const panel = $(".kb-settings [role=tabpanel]") as HTMLElement;
    expect(board.getAttribute("aria-controls")).toBe(panel.id);
    expect(panel.getAttribute("aria-labelledby")).toBe(board.id);
    expect(board.tabIndex).toBe(0);
    expect(($('.kb-settings [role="tab"][data-tab="eod"]') as HTMLElement).tabIndex).toBe(-1);
    await key('.kb-settings [role="tab"][data-tab="board"]', "ArrowRight");
    expect($('.kb-settings [role="tab"][data-tab="eod"]')?.getAttribute("aria-selected")).toBe("true");
    expect(panel.getAttribute("aria-labelledby")).toBe("kb-tab-eod");
    await key('.kb-settings [role="tab"][data-tab="eod"]', "End");
    expect($('.kb-settings [role="tab"][data-tab="lists"]')?.getAttribute("aria-selected")).toBe("true");
  });

  test("radios rove: arrow keys pick the next mode, only the checked one is tabbable", async () => {
    await make();
    await tab("eod");
    const mode = (m: string) => $(`.kb-settings [role="radio"][data-mode="${m}"]`) as HTMLElement;
    expect(mode("raise").tabIndex).toBe(0);
    expect(mode("keep").tabIndex).toBe(-1);
    await key('.kb-settings [role="radio"][data-mode="raise"]', "ArrowRight");
    expect(mode("keep").getAttribute("aria-checked")).toBe("true");
    expect(mode("keep").tabIndex).toBe(0);
  });

  test("colour chips have names and the kicker is the product name", async () => {
    await make();
    expect($(".kb-settings .dlg-kicker")?.textContent).toBe("Household Kanban");
    expect($(".kb-settings #kb-set-title")?.textContent).toBe("Settings");
    await tab("lists");
    click(".kb-settings .add-list");
    await settle();
    expect($('.kb-settings [data-color="green"]')?.getAttribute("aria-label")).toBe("Green");
  });
});
