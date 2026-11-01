const en = {
  title: "Tasks",
  col_todo: "To-do", col_later: "Later", col_week: "This week", col_today: "Today",
  col_overdue: "Overdue", col_done: "Done",
  prio_1: "High", prio_2: "Medium", prio_3: "Low",
  group_date: "By date", group_priority: "By priority", group_label: "Group",
  filter_people: "Filter by person", filter_parents: "Filter by list",
  all_people: "Everyone", all_parents: "All", unassigned: "Unassigned",
  nothing: "Nothing here", mark_done: "Done", mark_open: "Reopen", bought: "Bought",
  moved: "Moved {n}×", moved_raised: "Moved {n}× · ↑ priority",
  yesterday: "Yesterday", today: "Today", tomorrow: "Tomorrow", days_ago: "{n} days ago",
  done_today: "Done today", done_yesterday: "Done yesterday", done_days_ago: "Done {n} days ago",
  done_note: "Last {days} days · {older} older in history",
  more: "+ {n} more", collapse: "Collapse", open_list: "Open list",
  loading: "Loading…", err_load: "Could not load tasks. Retrying…", err_update: "Could not update the task.",
};
const cs: typeof en = {
  title: "Úkoly",
  col_todo: "To-do", col_later: "Později", col_week: "Tento týden", col_today: "Dnes",
  col_overdue: "Po termínu", col_done: "Hotovo",
  prio_1: "Vysoká", prio_2: "Střední", prio_3: "Nízká",
  group_date: "Podle data", group_priority: "Podle priority", group_label: "Seskupit",
  filter_people: "Filtr podle osoby", filter_parents: "Filtr podle seznamu",
  all_people: "Všichni", all_parents: "Vše", unassigned: "Nepřiřazeno",
  nothing: "Nic tu není", mark_done: "Hotovo", mark_open: "Znovu otevřít", bought: "Koupeno",
  moved: "Přesunuto {n}×", moved_raised: "Přesunuto {n}× · ↑ priorita",
  yesterday: "Včera", today: "Dnes", tomorrow: "Zítra", days_ago: "Před {n} dny",
  done_today: "Hotovo dnes", done_yesterday: "Hotovo včera", done_days_ago: "Hotovo před {n} dny",
  done_note: "Za posledních {days} dní · {older} starších v historii",
  more: "+ {n} dalších", collapse: "Sbalit", open_list: "Otevřít seznam",
  loading: "Načítání…", err_load: "Úkoly se nepodařilo načíst. Zkouším znovu…", err_update: "Úkol se nepodařilo změnit.",
};

export type Key = keyof typeof en;
const dict: Record<string, typeof en> = { en, cs };

export function t(lang: string | undefined, key: Key, vars: Record<string, string | number> = {}): string {
  const d = dict[(lang ?? "en").split("-")[0]] ?? en;
  return d[key].replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}

type Forms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
const plural: Record<string, Record<string, Forms>> = {
  en: {
    sum_open: { other: "{n} open" },
    sum_today: { other: "{n} for today" },
    sum_moved: { other: "{n} moved from yesterday" },
    sum_overdue: { other: "{n} overdue" },
  },
  cs: {
    sum_open: { one: "{n} otevřený", few: "{n} otevřené", other: "{n} otevřených" },
    sum_today: { other: "{n} na dnes" },
    sum_moved: { one: "{n} přesunutý ze včerejška", few: "{n} přesunuté ze včerejška", other: "{n} přesunutých ze včerejška" },
    sum_overdue: { other: "{n} po termínu" },
  },
};

/** Count-dependent strings, picked with Intl.PluralRules. */
export function tn(lang: string | undefined, base: "sum_open" | "sum_today" | "sum_moved" | "sum_overdue", n: number): string {
  const code = (lang ?? "en").split("-")[0];
  const l = code in plural ? code : "en";
  const forms = plural[l][base];
  return (forms[new Intl.PluralRules(l).select(n)] ?? forms.other).replace("{n}", String(n));
}
