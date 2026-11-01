import type { ColumnId } from "./logic/columns";

export interface CardConfig {
  type: string;
  columns?: ColumnId[];
  done_days?: 1 | 3 | 7 | 30;
  group?: "date" | "priority";
  parents?: string[];
  people?: string[];
  week_end?: "auto" | "saturday" | "sunday";
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
    week_end: raw.week_end === "saturday" || raw.week_end === "sunday" ? raw.week_end : "auto",
  };
  if (raw.parents) out.parents = raw.parents;
  if (raw.people) out.people = raw.people;
  return out;
}
