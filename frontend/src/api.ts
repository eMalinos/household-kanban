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
