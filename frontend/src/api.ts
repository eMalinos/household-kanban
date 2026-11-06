import type { Board, EodMode, Item, Parent } from "./types";

/** The slice of the Home Assistant frontend `hass` object this card uses. */
export interface Hass {
  states: Record<string, { state: string; attributes: Record<string, unknown> }>;
  locale?: { language?: string; first_weekday?: string };
  language?: string;
  themes?: { darkMode?: boolean };
  user?: { is_admin: boolean };
  connection: {
    subscribeMessage<T>(cb: (event: T) => void, msg: Record<string, unknown>): Promise<() => void>;
    sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T>;
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

export interface HistoryQuery { search?: string; parent?: string; offset: number; limit: number }

export function fetchHistory(hass: Hass, q: HistoryQuery): Promise<{ items: Item[]; total: number }> {
  return hass.connection.sendMessagePromise({ type: `${DOMAIN}/history`, ...q });
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

/** Lovelace dashboard config; `urlPath` null = the default dashboard. */
export function fetchDashboard(hass: Hass, urlPath: string | null): Promise<unknown> {
  return hass.connection.sendMessagePromise({ type: "lovelace/config", url_path: urlPath });
}

export function saveDashboard(hass: Hass, urlPath: string | null, config: unknown): Promise<unknown> {
  return hass.connection.sendMessagePromise({ type: "lovelace/config/save", url_path: urlPath, config });
}

/** Household-wide options of the integration (the options flow edits the same data). */
export interface Settings {
  end_of_day_mode: EodMode; close_time: string; // "HH:MM"
  notify_enabled: boolean; notify_time: string; notify_assignee: boolean;
  notify_services: string[]; // "notify.mobile_app_*"
  offered_services: string[]; // currently registered notify.mobile_app_* (sorted)
}
export type SettingsPatch = Partial<Omit<Settings, "offered_services">>;
export type ParentFields = Pick<Parent, "name" | "icon" | "color" | "checklist">;

export function getSettings(hass: Hass): Promise<Settings> {
  return hass.connection.sendMessagePromise({ type: `${DOMAIN}/settings` });
}

export function updateSettings(hass: Hass, patch: SettingsPatch): Promise<Settings> {
  return hass.connection.sendMessagePromise({ type: `${DOMAIN}/settings/update`, ...patch });
}

export function addParent(hass: Hass, p: ParentFields): Promise<Parent> {
  return hass.connection.sendMessagePromise({ type: `${DOMAIN}/parents/add`, ...p });
}

export function updateParent(hass: Hass, id: string, patch: Partial<ParentFields>): Promise<Parent> {
  return hass.connection.sendMessagePromise({ type: `${DOMAIN}/parents/update`, parent_id: id, ...patch });
}

export function removeParent(hass: Hass, id: string, target: string): Promise<null> {
  return hass.connection.sendMessagePromise({ type: `${DOMAIN}/parents/remove`, parent_id: id, target });
}
