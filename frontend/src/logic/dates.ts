export const DAY = 86_400_000;

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
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

/** week_end config wins, then hass.locale.first_weekday, "language" via Intl weekInfo, else Monday. */
export function firstWeekday(weekEnd: string | undefined, locale: { first_weekday?: string; language?: string } | undefined): number {
  if (weekEnd === "saturday") return 0;
  if (weekEnd === "sunday") return 1;
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
