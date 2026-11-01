// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import "../src/card";
import type { Board } from "../src/types";

/* eslint-disable @typescript-eslint/no-explicit-any */

const parents = ["household", "garden"].map((id) => ({ id, entity_id: `todo.${id}`, name: id, icon: "mdi:home", color: "blue", collapse: false }));
const board = (): Board => ({ parents, items: [], end_of_day_mode: "keep" });

const RAW = { type: "custom:household-kanban-card", columns: ["todo", "week", "today", "done"], grid_options: { columns: "full", rows: 8 } };
let card: any, sent: any[], dash: unknown, saveError: unknown;

async function settle() { for (let i = 0; i < 6; i++) { await card.updateComplete; await Promise.resolve(); } }
const root = () => card.shadowRoot as ShadowRoot;
const $ = (sel: string) => root().querySelector(sel) as HTMLElement | null;
const click = (sel: string) => ($(sel) as HTMLElement).click();
const saves = () => sent.filter((m) => m.type === "lovelace/config/save");
const savedCard = () => (saves()[0].config as any).views[0].cards[0];

async function make(admin: boolean, raw: Record<string, unknown> = RAW) {
  (window as any).happyDOM?.setURL("http://localhost/kanban-dev/ukoly");
  card = document.createElement("household-kanban-card");
  card.hass = {
    states: { "person.anna": { state: "home", attributes: { friendly_name: "Anna" } }, "person.tom": { state: "home", attributes: { friendly_name: "Tom" } } },
    locale: { language: "en", first_weekday: "monday" },
    user: { is_admin: admin },
    connection: {
      subscribeMessage: async (cb: (e: unknown) => void) => { cb({ board: board() }); return () => undefined; },
      sendMessagePromise: async (msg: any) => {
        sent.push(msg);
        if (msg.type === "lovelace/config") return structuredClone(dash);
        if (msg.type === "lovelace/config/save") { if (saveError) throw saveError; return null; }
        throw new Error(`unexpected ${msg.type}`);
      },
    },
    callService: async () => undefined,
  };
  card.setConfig(raw);
  document.body.append(card);
  await settle();
}

async function openAndSave(toggle: string) {
  click("header .gear-btn");
  await settle();
  click(toggle);
  await settle();
  click(".kb-settings .primary-btn");
  await settle();
}

beforeEach(() => {
  sent = []; saveError = undefined;
  dash = { views: [{ path: "ukoly", cards: [structuredClone(RAW)] }] };
});
afterEach(() => { card?.remove(); });

describe("settings dialog", () => {
  test("no gear for non-admin", async () => {
    await make(false);
    expect($("header .gear-btn")).toBeNull();
  });

  test("gear opens the dialog on tab Board", async () => {
    await make(true);
    const gear = $("header .gear-btn") as HTMLElement;
    expect(gear.getAttribute("aria-label")).toBe("Settings");
    expect(gear.nextElementSibling?.classList.contains("hist-btn")).toBe(true);
    gear.click();
    await settle();
    expect($("dialog.kb-settings")).not.toBeNull();
    expect($('.kb-settings [role="tab"][aria-selected="true"]')?.dataset.tab).toBe("board");
    expect($('.kb-settings [role="switch"][data-col="todo"]')?.hasAttribute("disabled")).toBe(true);
    expect($('.kb-settings [role="switch"][data-col="overdue"]')).toBeNull();
  });

  test("toggling Later and saving writes columns incl. later", async () => {
    await make(true);
    await openAndSave('.kb-settings [role="switch"][data-col="later"]');
    expect(sent[0]).toEqual({ type: "lovelace/config", url_path: "kanban-dev" });
    expect(saves()).toHaveLength(1);
    expect(saves()[0].url_path).toBe("kanban-dev");
    expect(savedCard().columns).toEqual(["todo", "later", "week", "today", "done"]);
    expect((saves()[0].config as any).views[0].path).toBe("ukoly");
    expect($("dialog.kb-settings")).toBeNull();
    expect(card._config.columns).toContain("later");
  });

  test("save keeps grid_options", async () => {
    await make(true);
    await openAndSave('.kb-settings [role="switch"][data-col="later"]');
    expect(savedCard().grid_options).toEqual({ columns: "full", rows: 8 });
  });

  test("strategy dashboard shows err_not_editable", async () => {
    dash = { strategy: { type: "original-states" } };
    await make(true);
    await openAndSave('.kb-settings [role="switch"][data-col="later"]');
    expect(saves()).toHaveLength(0);
    expect($(".kb-settings .notice")?.textContent).toContain("can't be edited");
    expect($("dialog.kb-settings")).not.toBeNull();
  });

  test("YAML dashboard save error shows err_not_editable", async () => {
    saveError = { code: "config_not_editable", message: "Cannot edit YAML dashboard" };
    await make(true);
    await openAndSave('.kb-settings [role="switch"][data-col="later"]');
    expect($(".kb-settings .notice")?.textContent).toContain("can't be edited");
  });

  test("two equal cards show err_card_ambiguous", async () => {
    dash = { views: [{ cards: [structuredClone(RAW), structuredClone(RAW)] }] };
    await make(true);
    await openAndSave('.kb-settings [role="switch"][data-col="later"]');
    expect(saves()).toHaveLength(0);
    expect($(".kb-settings .notice")?.textContent).toContain("twice");
  });

  test("missing card shows err_card_missing", async () => {
    dash = { views: [{ cards: [] }] };
    await make(true);
    await openAndSave('.kb-settings [role="switch"][data-col="later"]');
    expect(saves()).toHaveLength(0);
    expect($(".kb-settings .notice")?.textContent).toContain("not found");
  });

  test("hiding a parent writes parents without it; re-enabling all removes the key", async () => {
    await make(true);
    click("header .gear-btn");
    await settle();
    click('.kb-settings [role="tab"][data-tab="lists"]');
    await settle();
    click('.kb-settings [role="switch"][data-parent="garden"]');
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    expect(savedCard().parents).toEqual(["household"]);

    const raw2 = savedCard();
    sent = [];
    dash = { views: [{ cards: [structuredClone(raw2)] }] };
    click("header .gear-btn");
    await settle();
    click('.kb-settings [role="tab"][data-tab="lists"]');
    await settle();
    expect($('.kb-settings [role="switch"][data-parent="garden"]')?.getAttribute("aria-checked")).toBe("false");
    click('.kb-settings [role="switch"][data-parent="garden"]');
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    expect(savedCard()).not.toHaveProperty("parents");
    expect(savedCard().grid_options).toEqual({ columns: "full", rows: 8 });
  });

  test("people chips toggle the people key", async () => {
    await make(true);
    click("header .gear-btn");
    await settle();
    click('.kb-settings [role="tab"][data-tab="lists"]');
    await settle();
    click('.kb-settings [data-person="person.tom"]');
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    expect(savedCard().people).toEqual(["person.anna"]);
  });

  test("pencil and Add list are enabled; eod tab is household scope", async () => {
    await make(true);
    click("header .gear-btn");
    await settle();
    click('.kb-settings [role="tab"][data-tab="lists"]');
    await settle();
    expect($(".kb-settings .add-list")?.hasAttribute("disabled")).toBe(false);
    expect($(".kb-settings .edit-list")?.hasAttribute("disabled")).toBe(false);
    click('.kb-settings [role="tab"][data-tab="eod"]');
    await settle();
    expect($(".kb-settings .scope.household")).not.toBeNull();
    expect(sent.map((m) => m.type)).toEqual(["household_kanban/settings"]);
  });

  test("save without changes writes nothing and closes", async () => {
    await make(true);
    click("header .gear-btn");
    await settle();
    click(".kb-settings .primary-btn");
    await settle();
    expect(sent).toHaveLength(0);
    expect($("dialog.kb-settings")).toBeNull();
  });
});
