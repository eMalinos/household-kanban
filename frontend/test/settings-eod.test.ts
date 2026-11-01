// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import "../src/card";
import type { Board } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const parents = ["household", "garden"].map((id) => ({ id, entity_id: `todo.${id}`, name: id, icon: "mdi:home", color: "blue", collapse: false }));
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

async function make() {
  (window as any).happyDOM?.setURL("http://localhost/kanban-dev/ukoly");
  card = document.createElement("household-kanban-card");
  card.hass = {
    states: {}, locale: { language: "en", first_weekday: "monday" }, user: { is_admin: true },
    connection: {
      subscribeMessage: async (cb: (e: unknown) => void) => { cb({ board: board() }); return () => undefined; },
      sendMessagePromise: async (msg: any) => {
        sent.push(msg);
        if (fail.has(msg.type)) throw { code: "unknown_error", message: "boom" };
        if (msg.type === "lovelace/config") return { views: [{ cards: [structuredClone(RAW)] }] };
        if (msg.type === "lovelace/config/save") return null;
        if (msg.type === "household_kanban/settings") return structuredClone(SETTINGS);
        if (msg.type === "household_kanban/settings/update") return { ...structuredClone(SETTINGS), ...msg };
        if (msg.type.startsWith("household_kanban/parents/")) return null;
        throw new Error(`unexpected ${msg.type}`);
      },
    },
    callService: async () => undefined,
  };
  card.setConfig(RAW);
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
      { type: "household_kanban/parents/add", name: "Garden 2", icon: "mdi:format-list-checks", color: "green", collapse: false },
    ]);
    expect($(".kb-settings .parent-form")).toBeNull();
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
    expect(of("household_kanban/parents/update")).toEqual([{ type: "household_kanban/parents/update", parent_id: "garden", collapse: true }]);
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
