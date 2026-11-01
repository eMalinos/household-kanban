import type { ColumnId } from "./logic/columns";

export interface CardConfig {
  type: string;
  columns?: ColumnId[];
  done_days?: 1 | 3 | 7 | 30;
  group?: "date" | "priority";
  parents?: string[];
  people?: string[];
}

export const COLUMN_IDS: ColumnId[] = ["todo", "later", "week", "today", "overdue", "done"];
export const DEFAULT_COLUMNS: ColumnId[] = ["todo", "week", "today", "done"];
export const DONE_DAYS = [1, 3, 7, 30] as const;

/** The single place for defaults and validation; throws on unknown column ids (HA shows the message). */
export function normalizeConfig(raw: CardConfig): CardConfig {
  const cols = raw.columns ?? DEFAULT_COLUMNS;
  const bad = cols.filter((c) => !COLUMN_IDS.includes(c));
  if (bad.length) throw new Error(`Unknown column id: ${bad.join(", ")}`);
  const picked = new Set<ColumnId>(cols).add("todo");
  const out: CardConfig = {
    type: raw.type,
    columns: COLUMN_IDS.filter((c) => picked.has(c)),
    done_days: DONE_DAYS.find((d) => d === raw.done_days) ?? 7,
    group: raw.group === "priority" ? "priority" : "date",
  };
  if (raw.parents) out.parents = raw.parents;
  if (raw.people) out.people = raw.people;
  return out;
}

/** Checkbox list where "nothing picked" or "everything picked" means all (config key left out). */
export function toggleIn(list: string[] | undefined, all: string[], id: string, on: boolean): string[] | undefined {
  const cur = new Set(list ?? all);
  if (on) cur.add(id); else cur.delete(id);
  return cur.size === 0 || cur.size === all.length ? undefined : all.filter((x) => cur.has(x));
}

/** The raw card config with `config` applied: HA-owned and unknown keys stay, filters that are off are dropped. */
export function mergeConfig(raw: Record<string, unknown>, config: CardConfig): Record<string, unknown> {
  const out: Record<string, unknown> = { ...raw, ...config };
  for (const k of ["parents", "people"] as const) if (!(k in config)) delete out[k];
  return out;
}
