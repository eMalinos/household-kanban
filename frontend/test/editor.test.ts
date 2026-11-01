// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import "../src/editor";

/* eslint-disable @typescript-eslint/no-explicit-any */

const parents = ["household", "garden"].map((id) => ({ id, entity_id: `todo.${id}`, name: id, icon: "", color: "blue", checklist: false }));
let ed: any;

function make(subscribeMessage: (cb: (e: unknown) => void) => Promise<() => void>) {
  ed = document.createElement("household-kanban-card-editor");
  ed.hass = { states: {}, locale: { language: "en" }, connection: { subscribeMessage } };
  return ed;
}
async function settle() { await ed.updateComplete; await Promise.resolve(); await Promise.resolve(); await ed.updateComplete; }

beforeEach(() => { vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] }); });
afterEach(() => { ed?.remove(); vi.useRealTimers(); });

test("HA-owned keys survive a toggle; selecting all drops the filter key", async () => {
  make(async (cb) => { cb({ board: { parents, items: [], end_of_day_mode: "keep" } }); return () => undefined; });
  ed.setConfig({
    type: "custom:household-kanban-card", grid_options: { columns: "full", rows: 8 },
    visibility: [{ condition: "user", users: ["x"] }], view_layout: { position: "main" }, parents: ["household"],
  });
  const seen: any[] = [];
  ed.addEventListener("config-changed", (e: CustomEvent) => seen.push(e.detail.config));
  document.body.append(ed);
  await settle();
  const later = ed.shadowRoot.querySelectorAll('input[role="switch"]')[1] as HTMLInputElement;
  later.checked = true;
  later.dispatchEvent(new Event("change"));
  expect(seen[0].grid_options).toEqual({ columns: "full", rows: 8 });
  expect(seen[0].visibility).toEqual([{ condition: "user", users: ["x"] }]);
  expect(seen[0].view_layout).toEqual({ position: "main" });
  expect(seen[0].columns).toContain("later");
  expect(seen[0].parents).toEqual(["household"]);
  await settle();
  const garden = [...ed.shadowRoot.querySelectorAll('input[type="checkbox"]:not([role])')][1] as HTMLInputElement;
  garden.checked = true;
  garden.dispatchEvent(new Event("change"));
  expect("parents" in seen[1]).toBe(false);
  expect(seen[1].grid_options).toEqual({ columns: "full", rows: 8 });
});

test("a failed subscribe retries on backoff, not on every update", async () => {
  vi.spyOn(console, "warn").mockImplementation(() => undefined);
  let calls = 0;
  make(async () => { calls++; throw new Error("down"); });
  ed.setConfig({ type: "custom:household-kanban-card" });
  document.body.append(ed);
  await settle();
  for (let i = 0; i < 3; i++) { ed.hass = { ...ed.hass }; await settle(); }
  expect(calls).toBe(1);
  vi.advanceTimersByTime(5000);
  await settle();
  expect(calls).toBe(2);
});
