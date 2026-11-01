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
  sum_open: "{n} open", sum_today: "{n} for today", sum_moved: "{n} moved from yesterday", sum_overdue: "{n} overdue",
  loading: "Loading…",
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
  sum_open: "{n} otevřených", sum_today: "{n} na dnes", sum_moved: "{n} přesunuté ze včerejška", sum_overdue: "{n} po termínu",
  loading: "Načítání…",
};

export type Key = keyof typeof en;
const dict: Record<string, typeof en> = { en, cs };

export function t(lang: string | undefined, key: Key, vars: Record<string, string | number> = {}): string {
  const d = dict[(lang ?? "en").split("-")[0]] ?? en;
  return d[key].replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? ""));
}
