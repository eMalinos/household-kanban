export const DAY = 86_400_000;

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const p2 = (n: number) => String(n).padStart(2, "0");

/** Local calendar date as "YYYY-MM-DD". */
export function ymd(d: Date): string {
  return `${d.getFullYear()}-${p2(d.getMonth() + 1)}-${p2(d.getDate())}`;
}

/** Date + optional "HH:MM" (both local) as the service `due` value: a date, or an ISO datetime with offset. */
export function toDue(date: string, time: string): string | null {
  if (!date) return null;
  if (!time) return date;
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const off = -new Date(y, m - 1, d, hh, mm).getTimezoneOffset();
  const a = Math.abs(off);
  return `${date}T${p2(hh)}:${p2(mm)}:00${off < 0 ? "-" : "+"}${p2(Math.floor(a / 60))}:${p2(a % 60)}`;
}

/** Local "HH:MM" of a due value, "" for a date-only one. */
export function dueTime(due: string | null): string {
  if (!due) return "";
  const { date, hasTime } = parseDue(due);
  return hasTime ? `${p2(date.getHours())}:${p2(date.getMinutes())}` : "";
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** Calendar days from `a` to `b` (local), DST-safe. */
export function diffDays(a: Date, b: Date): number {
  return Math.round((Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) - Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) / DAY);
}

/** Parse "2026-11-01" as a local date, anything else as an instant. */
export function parseDue(due: string): { date: Date; hasTime: boolean } {
  if (/^\d{4}-\d{2}-\d{2}$/.test(due)) {
    const [y, m, d] = due.split("-").map(Number);
    return { date: new Date(y, m - 1, d), hasTime: false };
  }
  return { date: new Date(due), hasTime: true };
}

/**
 * The week the "This week" column covers: from `firstWeekday` (0 = Sunday)
 * through the day before; on the last day of the week it covers the next week.
 */
export function weekRange(today: Date, firstWeekday: number): { start: Date; end: Date } {
  const t = startOfDay(today);
  const sinceStart = (t.getDay() - firstWeekday + 7) % 7;
  const start = addDays(t, -sinceStart);
  return sinceStart === 6
    ? { start: addDays(start, 7), end: addDays(start, 13) }
    : { start, end: addDays(start, 6) };
}

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/** hass.locale.first_weekday (the user's profile), "language" via Intl weekInfo, else Monday. */
export function firstWeekday(locale: { first_weekday?: string; language?: string } | undefined): number {
  const fw = locale?.first_weekday;
  const named = DAYS.indexOf(fw ?? "");
  if (named >= 0) return named;
  try {
    const l = new Intl.Locale(locale?.language ?? "en") as Intl.Locale & {
      weekInfo?: { firstDay: number }; getWeekInfo?: () => { firstDay: number };
    };
    const first = (l.getWeekInfo?.() ?? l.weekInfo)?.firstDay; // 1 = Monday .. 7 = Sunday
    if (first) return first % 7;
  } catch { /* fall through */ }
  return 1;
}
