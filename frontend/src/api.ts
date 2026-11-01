import type { Board } from "./types";

/** The slice of the Home Assistant frontend `hass` object this card uses. */
export interface Hass {
  states: Record<string, { state: string; attributes: Record<string, unknown> }>;
  locale?: { language?: string; first_weekday?: string };
  language?: string;
  connection: {
    subscribeMessage<T>(cb: (event: T) => void, msg: Record<string, unknown>): Promise<() => void>;
  };
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
}

const DOMAIN = "household_kanban";

export function subscribeBoard(hass: Hass, cb: (board: Board) => void): Promise<() => void> {
  return hass.connection.subscribeMessage<{ board: Board }>((e) => cb(e.board), { type: `${DOMAIN}/subscribe` });
}

export function setStatus(hass: Hass, uid: string, status: "needs_action" | "completed"): Promise<unknown> {
  return hass.callService(DOMAIN, "set_status", { uid, status });
}

export interface ItemFields {
  summary?: string; description?: string; due?: string | null; priority?: 1 | 2 | 3;
  assignee?: string | null; parent?: string;
}

export function createItem(hass: Hass, fields: ItemFields & { summary: string }): Promise<unknown> {
  return hass.callService(DOMAIN, "create_item", { ...fields });
}

export function updateItem(hass: Hass, uid: string, fields: ItemFields): Promise<unknown> {
  return hass.callService(DOMAIN, "update_item", { uid, ...fields });
}

export function deleteItem(hass: Hass, uid: string): Promise<unknown> {
  return hass.callService(DOMAIN, "delete_item", { uid });
}
