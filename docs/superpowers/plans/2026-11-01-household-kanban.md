# Household Kanban Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Each task is also a GitHub issue in milestone "v1" (one task = one PR).

**Goal:** A HACS integration `household_kanban` that owns household to-do lists (parents), runs the end-of-day rule and morning notifications, and ships a TypeScript/Lit board card with drag & drop, history and a responsive mobile layout.

**Architecture:** Python integration keeps parents, items + metadata and an archive in one HA `Store`; each parent is a `TodoListEntity`; a websocket subscription pushes the board to the card, services do the writes. Pure-logic modules (Python `rollover.py`, TypeScript `logic/*.ts`) carry the rules and the tests; UI and HA glue stay thin.

**Tech Stack:** Python 3.13, Home Assistant ≥ 2025.1, `pytest-homeassistant-custom-component`, ruff; TypeScript 5, Lit 3, Vite 6, SortableJS 1.15, Vitest, ESLint.

**Spec:** `docs/superpowers/specs/2026-11-01-household-kanban-design.md` · visual design: https://claude.ai/artifact/F7SF24fMRAthJaKGgdx3Cv (v2 board, v3 mobile, v4 end-of-day board, v5 integration options; v1 detail dialog, v2 history/settings)

## Global Constraints

- Repo `eMalinos/household-kanban`, private until v1; HACS category Integration (`hacs.json`: `"name": "Household Kanban"`, `"homeassistant": "2025.1.0"`, `"render_readme": true`).
- Domain `household_kanban`; all code, identifiers, entity IDs, comments, commits in English; UI texts via translations `en` + `cs`.
- Never write to the live Home Assistant; manual checks only against the local dev HA in `dev/` (Docker, port 8190).
- The integration serves the card itself (static path + `frontend.add_extra_js_url`); users install one thing.
- Card looks: `--bento-*` tokens with fallbacks to standard HA variables; it must look right without the Bento theme.
- Priority values: `1` = High, `2` = Medium, `3` = Low. New items default to `2`.
- Sorting everywhere: due date + time (no time = end of day) → priority → `created_at` (older first). No manual order.
- End-of-day modes: `keep` | `overdue` | `move` | `raise`; default `raise`; default close time `23:59`; default notify time `08:00`; notifications default off.
- Completed items stay in their entity 30 days after `completed_at`, then move to the archive; history never deletes.
- Default parent `household` ("Household" / "Domácnost") always exists, can be renamed, never removed.
- Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`; PR bodies end with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.

## Shared data contract (backend ⇄ card)

Every task that touches either side uses exactly these shapes.

```ts
type Priority = 1 | 2 | 3;
interface Parent { id: string; entity_id: string; name: string; icon: string; color: string; collapse: boolean }
// color: one of red|orange|yellow|green|teal|cyan|blue|indigo|purple|pink|brown|grey
interface Item {
  uid: string; parent: string; summary: string; description: string;
  status: "needs_action" | "completed";
  due: string | null;          // "2026-11-01" (date) or "2026-11-01T10:00:00+01:00" (datetime)
  priority: Priority; assignee: string | null;   // person entity_id
  created_at: string; completed_at: string | null; // ISO datetimes
  moved: number; raised: boolean;                  // set by end of day, reset when the user edits due
}
interface Board { parents: Parent[]; items: Item[]; end_of_day_mode: "keep" | "overdue" | "move" | "raise" }
```

- WS `household_kanban/subscribe` → result `null`, then events `{board: Board}` on subscribe and after every change (items in entities only, no archive).
- WS `household_kanban/history` `{search?: string, parent?: string, offset: number, limit: number}` → `{items: Item[], total: number}`: completed items from entities + archive, `completed_at` descending, `search` = case-insensitive substring of summary/description.
- Services (all return nothing, raise `ServiceValidationError` on unknown uid/parent/person):
  - `household_kanban.create_item` `{parent?: str (default "household"), summary: str, description?: str, due?: str|null, priority?: 1|2|3, assignee?: str|null}`
  - `household_kanban.update_item` `{uid: str, summary?, description?, due?: str|null, priority?, assignee?: str|null, parent?: str}` — a changed `due` resets `moved=0`, `raised=false`.
  - `household_kanban.set_status` `{uid: str, status: "needs_action"|"completed"}` — sets/clears `completed_at`; reopening an archived uid restores it into its parent entity.
  - `household_kanban.delete_item` `{uid: str}`

## File Structure

```
custom_components/household_kanban/
  __init__.py          setup/unload, wires store, entities, ws, services, scheduler, frontend
  manifest.json        domain, name, version, config_flow, dependencies [frontend, http, websocket_api, person], iot_class local_push
  const.py             DOMAIN, defaults, priority/mode constants
  store.py             KanbanStore: load/save, parents, items, archive, change listeners
  todo.py              KanbanTodoList(TodoListEntity) per parent
  config_flow.py       single-instance config flow + options flow (menu)
  services.py          service schemas + handlers
  websocket.py         subscribe + history commands
  rollover.py          pure end-of-day + archive logic
  scheduler.py         time listeners: close day, notify
  notify.py            recipients, message building, action handling
  frontend.py          static path + extra js url
  services.yaml, strings.json, translations/en.json, translations/cs.json
  frontend/household-kanban-card.js   built bundle (committed)
frontend/
  package.json, tsconfig.json, vite.config.ts, eslint.config.js
  src/card.ts          <household-kanban-card>, picks board or tiles by width
  src/api.ts           subscribe/history/services wrappers
  src/logic/{dates,columns,sort,drop,stack}.ts   pure rules
  src/ui/{board,tiles,sheet,item-card,detail-dialog,history-dialog,filters}.ts
  src/editor.ts        card editor
  src/i18n.ts, src/styles.ts
  test/*.test.ts
tests/                 pytest for the integration
dev/docker-compose.yml, dev/config/configuration.yaml
hacs.json, README.md, .github/workflows/ci.yml
```

## Review Focus

1. **Timezones / DST** — a due datetime in local time and a close at 23:59 on a DST-change day must move items to the correct next calendar day and keep their local time. Test: `test_close_day_keeps_local_time_across_dst` (Task 3).
2. **Items created outside the card** (HA app, Assist, `todo.add_item`) have no metadata — they must appear with priority 2, no assignee, `created_at` = creation time, and survive restarts. Test: `test_external_item_gets_default_metadata` (Task 2).
3. **HA offline at close time** (restart over midnight) — the missed close must run once on startup for each missed day, not zero or twice. Test: `test_missed_close_runs_on_startup` (Task 3).
4. **Person without a phone / removed notify service** — the summary must still reach the selected services, never raise. Test: `test_assignee_without_phone_falls_back` (Task 4).
5. **Drag on touch in the HA app** — a tap must still open the detail dialog and a scroll must not start a drag. Test: `drop.test.ts › tap does not produce a patch` + manual check on a phone (Task 7).

---

### Task 1: Integration skeleton, store, parents as to-do entities

**Files:** Create `custom_components/household_kanban/{__init__,const,store,todo,config_flow}.py`, `manifest.json`, `strings.json`, `translations/{en,cs}.json`, `hacs.json`, `pyproject.toml`, `requirements_test.txt`, `.github/workflows/ci.yml`, `dev/docker-compose.yml`, `dev/config/configuration.yaml`, `tests/{conftest,test_store,test_todo,test_config_flow}.py`.

**Interfaces:**
- Produces: `KanbanStore(hass)` with `async_load()`, `parents: list[ParentData]`, `items: dict[str, ItemData]`, `archive: dict[str, ItemData]`, `async_add_item(parent, summary, **fields) -> ItemData`, `async_update_item(uid, **fields) -> ItemData`, `async_delete_item(uid)`, `async_set_status(uid, status)`, `add_listener(cb) -> unsub`; `ParentData`/`ItemData` = dataclasses with the contract's fields. Store key `household_kanban`, version 1. Entity unique_id = parent id; entity_id `todo.<parent id>`.

- [ ] **Step 1: Failing tests** — `test_default_parent_created` (fresh setup → `todo.household` exists, name "Household"); `test_entity_crud` (`todo.add_item`/`update_item`/`remove_item` on `todo.household` round-trip summary, description, due date and due datetime); `test_store_persists` (reload entry → items back); `test_single_instance` (second config flow aborts `single_instance_allowed`).
- [ ] **Step 2:** `pytest` → FAIL (module missing).
- [ ] **Step 3: Implement.** `KanbanTodoList` supports CREATE/UPDATE/DELETE/MOVE_TODO_ITEM, SET_DUE_DATE_ON_ITEM, SET_DUE_DATETIME_ON_ITEM, SET_DESCRIPTION_ON_ITEM; `todo_items` = open + completed items of its parent in the contract sort order; status changes through the entity set/clear `completed_at`. Config flow: no fields, title "Household Kanban". CI runs `ruff check`, `pytest`, `hacs/action` (category integration) and `home-assistant/actions/hassfest`. `dev/docker-compose.yml`: `homeassistant/home-assistant:stable` on port 8190, mounts `../custom_components` and `./config`.
- [ ] **Step 4:** `pytest` → PASS; `ruff check .` clean.
- [ ] **Step 5:** Commit `feat: integration skeleton with household to-do list`.

Model: opus · Review: high

### Task 2: Metadata, services and websocket API

**Files:** Create `services.py`, `services.yaml`, `websocket.py`, `tests/{test_services,test_websocket}.py`; modify `__init__.py`, `store.py`, `strings.json`, translations.

**Interfaces:** Consumes Task 1 store. Produces the services and WS commands of the shared contract.

- [ ] **Step 1: Failing tests** — `test_create_item_with_meta` (priority 1, assignee `person.karel`, due datetime → board item matches); `test_update_due_resets_moved` (item with `moved=2, raised=True`, update due → `0/False`); `test_set_status_sets_completed_at`; `test_move_to_other_parent` (`update_item parent=garden` → item leaves `todo.household`, appears in `todo.garden`); `test_unknown_person_rejected` (`ServiceValidationError`); `test_external_item_gets_default_metadata` (`todo.add_item` → board item priority 2, assignee null, `created_at` set, persists after reload); `test_subscribe_pushes_on_change` (subscribe → board; `create_item` → second event with the item); `test_history_search_and_paging` (25 completed, `search="mlé"` matches "Mléko" case-insensitive, `limit=10 offset=10` → 10 items, `total` correct).
- [ ] **Step 2:** `pytest` → FAIL.
- [ ] **Step 3: Implement.** `history` merges entity completed items and archive; ordering `completed_at` desc. Subscription unsubscribes via `connection.subscriptions[msg_id]`.
- [ ] **Step 4:** `pytest` → PASS.
- [ ] **Step 5:** Commit `feat: item metadata, services and websocket api`.

Depends on: Task 1 · Model: opus · Review: high

### Task 3: End of day, archive and options

**Files:** Create `rollover.py`, `scheduler.py`, `tests/{test_rollover,test_scheduler}.py`; modify `config_flow.py` (options flow menu: `end_of_day`), `__init__.py`, `store.py` (persist `last_close: date`, `runs: dict[run_id, RunSummary]`), translations.

**Interfaces:**
- Produces: `close_day(items: Iterable[ItemData], day: date, mode: str, now: datetime) -> CloseResult` where `CloseResult(changes: dict[str, dict], affected: list[str], run_id: str)`; `archive_due(items, now) -> list[str]` (completed > 30 days); event `household_kanban_day_closed` with `{run_id, day, mode, items: [{uid, summary, parent, assignee, priority, due}]}`; options keys `end_of_day_mode`, `close_time` ("HH:MM").

- [ ] **Step 1: Failing tests** —
  - `test_keep_and_overdue_change_nothing` (open item due yesterday → no changes, listed in `affected`);
  - `test_move_shifts_one_day_keeps_time` (due `2026-11-01T10:00` closed on 11-01 → `2026-11-02T10:00`, `moved=1`, priority unchanged; date-only due → next date);
  - `test_raise_steps_priority` (3 → 2, `raised=True`; 1 stays 1, `raised` unchanged);
  - `test_items_without_due_untouched`; `test_completed_untouched`;
  - `test_close_day_keeps_local_time_across_dst` (Europe/Prague, close 2026-10-24 → item due `2026-10-24T10:00+02:00` becomes `2026-10-25T10:00+01:00`);
  - `test_archive_after_30_days` (completed 31 days ago → archived, 29 days → stays);
  - `test_missed_close_runs_on_startup` (`last_close` two days ago, setup → `close_day` applied twice in date order, once each);
  - `test_options_end_of_day` (options flow saves mode + time, scheduler re-arms).
- [ ] **Step 2:** `pytest` → FAIL.
- [ ] **Step 3: Implement.** `rollover.py` has no HA imports. Scheduler: `async_track_time_change` at `close_time`; on close apply changes, archive, store run, fire event. Options flow defaults per Global Constraints.
- [ ] **Step 4:** `pytest` → PASS.
- [ ] **Step 5:** Commit `feat: end-of-day rollover, archive and options`.

Depends on: Task 2 · Model: opus · Review: high

### Task 4: Morning notifications with actions

**Files:** Create `notify.py`, `tests/test_notify.py`; modify `config_flow.py` (options step `notifications`), `scheduler.py`, translations.

**Interfaces:** Consumes `RunSummary` from Task 3. Produces options keys `notify_enabled` (bool), `notify_time` ("HH:MM"), `notify_assignee` (bool), `notify_services` (list of `notify.mobile_app_*` service names); `build_messages(run, options, phones: dict[person, service]) -> list[Message]`; action ids `HOUSEHOLD_KANBAN|<action>|<run_id>|<recipient>` with `<action>` in `move_today`, `done`.

- [ ] **Step 1: Failing tests** — `test_one_summary_per_recipient` (Karel's 2 items → Karel's phone; unassigned 1 → each selected service; one message each); `test_assignee_without_phone_falls_back` (person without mobile_app tracker → his items go to selected services, no exception); `test_notify_assignee_off_sends_all_to_services`; `test_actions_by_mode` (`keep`/`overdue` → "Move all to today"; `move`/`raise` → "All done"; single item → same action applied to that uid); `test_action_event_applies` (`mobile_app_notification_action` with `HOUSEHOLD_KANBAN|done|<run>|<recipient>` → those uids completed, already-completed ones untouched); `test_no_message_when_nothing_affected`; `test_options_service_list` (options form offers only existing `notify.mobile_app_*` services).
- [ ] **Step 2:** `pytest` → FAIL.
- [ ] **Step 3: Implement.** Phone of a person: `person` state attribute `device_trackers` → device registry → mobile_app → `notify.mobile_app_<device slug>`. Message: title "N tasks moved to today" / "N tasks are overdue" (translated, cs: „N úkoly přesunuty na dnes“), body = comma-joined summaries (max 5, then "+N more"), `data.url` = `/lovelace` (builder may make it an option), `data.actions` = Open tasks + bulk action. Sent at `notify_time` for the latest unsent run.
- [ ] **Step 4:** `pytest` → PASS.
- [ ] **Step 5:** Commit `feat: morning summary notifications with actions`.

Depends on: Task 3 · Model: sonnet · Review: high

### Task 5: Parent management in options

**Files:** Modify `config_flow.py` (options menu `parents`: add, edit, remove), `store.py`, `todo.py`, translations; Create `tests/test_parents.py`.

**Interfaces:** Produces `KanbanStore.async_add_parent(name, icon, color, collapse) -> ParentData` (id = slugified English-safe name, unique), `async_update_parent(id, **fields)`, `async_remove_parent(id, target_id)`.

- [ ] **Step 1: Failing tests** — `test_add_parent_creates_entity` ("Shopping" → `todo.shopping`); `test_rename_keeps_entity_id`; `test_remove_moves_items_and_history` (open + completed + archived items of `garden` end in target `household`, entity `todo.garden` removed from registry); `test_household_cannot_be_removed` (not offered in the remove form); `test_collapse_flag_in_board`.
- [ ] **Step 2:** `pytest` → FAIL.
- [ ] **Step 3: Implement.** Icon via `IconSelector`, colour via `SelectSelector` of the contract colours.
- [ ] **Step 4:** `pytest` → PASS.
- [ ] **Step 5:** Commit `feat: manage parents in options`.

Depends on: Task 2 · Model: sonnet · Review: medium

### Task 6: Card foundation — build, serving, rules, read-only board

**Files:** Create `frontend/**` (package, configs, `src/card.ts`, `src/api.ts`, `src/logic/{dates,columns,sort,stack}.ts`, `src/ui/{board,item-card,filters}.ts`, `src/i18n.ts`, `src/styles.ts`, `test/{columns,sort,dates,stack}.test.ts`), `custom_components/household_kanban/frontend.py`, built `custom_components/household_kanban/frontend/household-kanban-card.js`; modify `__init__.py`, CI (node job: lint, test, build, fail if the committed bundle differs).

**Interfaces:**
- Produces (TS):
  - `weekRange(today: Date, firstWeekday: 0..6): {start: Date; end: Date}` — the week the This week column covers; on the last day of a week → next week. `firstWeekday` comes from card config `week_end` (saturday → 0 Sunday-first, sunday → 1 Monday-first), else `hass.locale.first_weekday`, and for its value `"language"` from `Intl.Locale(lang).weekInfo` (fallback Monday).
  - `type ColumnId = "todo" | "later" | "week" | "today" | "overdue" | "done"`;
  - `columnOf(item: Item, ctx: Ctx): ColumnId | null` with `Ctx = {now: Date; week: {start, end}; enabled: Set<ColumnId>; mode: Board["end_of_day_mode"]; doneDays: number}`;
  - `compareItems(a: Item, b: Item): number`;
  - `stackItems(items: Item[], parents: Parent[], focusedParent: string | null): (Item | Stack)[]` with `Stack = {parent: Parent; items: Item[]}`.
  - Card config: `{type: "custom:household-kanban-card", columns?: ColumnId[] (default ["todo","week","today","done"]), done_days?: 1|3|7|30 (default 7), group?: "date"|"priority", parents?: string[], people?: string[], week_end?: "auto"|"saturday"|"sunday"}`.
- Rules for `columnOf` (disabled column → falls through to the next rule, finally `todo`): completed → `done` if `completed_at` within `doneDays`, else `null`; no due → `todo`; due before today → `overdue` in mode `overdue`, otherwise treated as today; due today → `today` → `week` → `todo`; due within `week` → `week` → `todo`; later → `later` → `todo`.

- [ ] **Step 1: Failing tests** — `columns.test.ts`: one case per rule above incl. disabled Today falls to This week, `overdue` only in mode `overdue`, Done older than `doneDays` hidden; `dates.test.ts`: Sunday 2026-11-01 with Monday-first → week = 2026-11-02..2026-11-08; Saturday-end config; `sort.test.ts`: `[due 10:00 p3, due no-time p1, due 09:00 p2]` → 09:00, 10:00, no-time; equal due+priority → older `created_at` first; `stack.test.ts`: collapse parent with 5 items → one Stack, focused parent → plain items.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement.** Board renders columns, item cards (parent tag, assignee avatar from `person` `entity_picture` else initials, check circle, priority + due pills, "Moved N× · ↑ priority" pill), shopping stack (first 3 + "+N more" expand), filters (people avatars, parents chips with open counts), grouping toggle, summary line. Bento tokens with fallbacks (e.g. `var(--bento-fill, var(--secondary-background-color))`). i18n en/cs from `hass.locale.language`. `frontend.py` registers `/household_kanban/household-kanban-card.js` via `async_register_static_paths` and `add_extra_js_url`. Check circle toggles via `set_status` (only write in this task).
- [ ] **Step 4:** `npm run lint && npm test && npm run build` → PASS; dev HA (`dev/`, :8190): add card, board matches design canvas v2 page.
- [ ] **Step 5:** Commit `feat: card foundation with read-only board`.

Depends on: Task 2 · Model: sonnet · Review: high

### Task 7: Detail dialog and drag & drop

**Files:** Create `frontend/src/logic/drop.ts`, `frontend/src/ui/detail-dialog.ts`, `frontend/test/drop.test.ts`; modify `board.ts`, `item-card.ts`, `api.ts`.

**Interfaces:** Produces `dropPatch(item: Item, target: ColumnId | Priority, ctx: Ctx): Patch | null` with `Patch = {due?: string | null; status?: Item["status"]; priority?: Priority}`.

- [ ] **Step 1: Failing tests** — today → `due` = today's date (an existing time on the same day is kept); week → `ctx.week.end`; later → day after `ctx.week.end`; todo → `due: null`; done → `status: "completed"`; from done to week → `status: "needs_action"` + week end; overdue target → `null`; priority grouping target 1 → `{priority: 1}`; same column → `null`; `tap does not produce a patch` (drag distance < threshold → no call).
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement.** SortableJS per column, `group` shared, `sort: false`, `delay: 150` + `delayOnTouchOnly: true`, `forceFallback` on touch; on drop call `update_item`/`set_status` with the patch and let the next board push re-render. Detail dialog (design v1 Detail): title, note, parent chips, priority segmented control, due quick picks Today / Tomorrow / Weekend / No date + `<input type="date">` + optional `<input type="time">`, assignee chips, Mark done, Delete (confirm), Save; "New note" and column "+" open it empty (column "+" presets the column's due).
- [ ] **Step 4:** `npm run lint && npm test && npm run build` → PASS; dev HA: drag mouse + touch emulation, create/edit/delete.
- [ ] **Step 5:** Commit `feat: detail dialog and drag and drop`.

Depends on: Task 6 · Model: sonnet · Review: high

### Task 8: History dialog

**Files:** Create `frontend/src/ui/history-dialog.ts`, `frontend/test/history.test.ts`; modify `board.ts`, `api.ts`.

- [ ] **Step 1: Failing test** — `groupHistory(items, now)` buckets: this week, last week, then "<month> <year>" (cs month names lower case: "říjen 2026").
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement** dialog per design v2 History: search (debounced 300 ms), parent chips, grouped list with parent + completed date + assignee, Reopen button (`set_status needs_action`), infinite paging (`limit` 50). Entry points: header History button and the Done column footer "Last N days · M older in history".
- [ ] **Step 4:** lint/test/build → PASS; dev HA: archived item (set `completed_at` 40 days back via store in a test fixture) is found and reopened.
- [ ] **Step 5:** Commit `feat: history dialog`.

Depends on: Task 6 · Model: sonnet · Review: medium

### Task 9: Narrow layout — tiles and bottom sheet

**Files:** Create `frontend/src/ui/{tiles,sheet}.ts`; modify `card.ts`.

- [ ] **Step 1: Failing test** — `tileSummary(items, ctx)` → Today count, overdue count, first 3 non-collapsed items in sort order; This week / To-do counts; Done count within `doneDays`.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement** per design v3: `ResizeObserver` on the card, width < 600 px → tiles (Today wide with overdue badge + preview, This week + To-do, Done wide), parents list with open counts; tap → bottom sheet (82 % height, slide-up transition, backdrop closes) with item cards, collapsed shopping stack, Done sheet footer "Older in history"; long-press (500 ms) on an item → menu "Move to…" (Today / This week / To-do / Done) using `dropPatch`.
- [ ] **Step 4:** lint/test/build → PASS; dev HA in the HA app or a 390 px viewport.
- [ ] **Step 5:** Commit `feat: narrow tiles layout with bottom sheet`.

Depends on: Task 7 · Model: sonnet · Review: medium

### Task 10: Card editor, README, release prep

**Files:** Create `frontend/src/editor.ts`, `README.md` (EN, screenshots from dev HA only), `docs/screenshots/*`; modify `card.ts` (`getConfigElement`, `getStubConfig`, `window.customCards` entry), `manifest.json` version `1.0.0`.

- [ ] **Step 1: Failing test** — `normalizeConfig(raw)` fills defaults from Task 6 and rejects unknown column ids.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement** editor per design v4 Settings "Board" tab + "Lists and people" (columns toggles with To-do locked, done days 1/3/7/30, default grouping, parents and people pickers, week end auto/Saturday/Sunday). README: install via HACS custom repository, add integration, options (end of day, notifications, parents), card config table, event payload, screenshots.
- [ ] **Step 4:** full CI green; dev HA editor round-trip.
- [ ] **Step 5:** Commit `feat: card editor and docs`; tag `v1.0.0` only after the user tests on dev HA.

Depends on: Tasks 4, 5, 8, 9 · Model: sonnet · Review: medium
