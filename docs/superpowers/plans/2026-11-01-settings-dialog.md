# Settings From the Board — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Each task is also a GitHub issue in milestone "v1.1" (one task = one PR).

**Goal:** A gear button on the card opens a settings dialog. The Board and Lists & people tabs save to this dashboard's card config. The End of day tab and parent editing save to the integration for the whole household.

**Architecture:** New admin-only websocket commands expose the integration options and parent management, which until now lived only in the options flow. The card writes its own Lovelace config through HA's `lovelace/config` + `lovelace/config/save` websocket commands. It finds itself in the dashboard config by deep equality with its raw config. Pure helpers (`logic/lovelace.ts`) carry the search/replace and its tests.

**Tech Stack:** as v1: Python 3.14, HA 2026.10, `pytest-homeassistant-custom-component`, ruff; TypeScript 5, Lit 3, Vite 6, Vitest, ESLint.

**Spec:** `docs/superpowers/specs/2026-11-01-household-kanban-design.md` (section "v1.1: settings from the board") · visual design: https://claude.ai/artifact/F7SF24fMRAthJaKGgdx3Cv page **v6** (`Settings6`, `Main6*`, `Mobile6`)

## Global Constraints

- Everything in the v1 plan's Global Constraints and Shared data contract still applies (`docs/superpowers/plans/2026-11-01-household-kanban.md`).
- The gear is rendered only when `hass.user.is_admin` is true. Every new websocket command is `@websocket_api.require_admin`.
- Scope per tab:
  - Board and Lists & people (show switches, people chips) → this card's Lovelace config only.
  - End of day & notifications, and parent add/edit/remove → integration, the whole household.
- The card config keys and defaults do not change (`normalizeConfig` stays the single place for them). HA-owned keys in the raw config (`grid_options`, `visibility`, …) survive a save.
- The options flow keeps working on the same data. The new commands and the options flow share the validation and the offered-services helper.
- Dialog = native `<dialog>` with `showModal` (glass themes, see v1 Task 9); narrow card (<600 px) shows it as a full-height bottom panel (design `Mobile6`).
- Notification preview from the design is illustration only, not built.

## Websocket contract (new)

All require admin; unknown entry → error `not_loaded` (as v1).

- `household_kanban/settings` → `Settings`:
  ```ts
  interface Settings {
    end_of_day_mode: "keep" | "overdue" | "move" | "raise"; close_time: string;  // "HH:MM"
    notify_enabled: boolean; notify_time: string; notify_assignee: boolean;
    notify_services: string[];   // "notify.mobile_app_*"
    offered_services: string[];  // currently registered notify.mobile_app_* (sorted)
  }
  ```
  Missing options are filled with the v1 defaults (`raise`, `23:59`, `false`, `08:00`, `true`, `[]`).
- `household_kanban/settings/update` `{end_of_day_mode?, close_time?, notify_enabled?, notify_time?, notify_assignee?, notify_services?}` → `Settings`. It merges into `entry.options` via `hass.config_entries.async_update_entry`, so the existing update listener reschedules. Times must match `^([01]\d|2[0-3]):[0-5]\d$`; services must start with `notify.mobile_app_`. Invalid input → voluptuous error (`invalid_format`).
- `household_kanban/parents/add` `{name: str (min 1), icon: str, color: one of PARENT_COLORS, collapse: bool}` → `Parent`.
- `household_kanban/parents/update` `{id: str, name?, icon?, color?, collapse?}` → `Parent`; unknown id → error `not_found`.
- `household_kanban/parents/remove` `{id: str, target: str}` → `null`; the default parent, `id == target` or unknown ids → error `not_allowed`.

Every parent change already pushes a new board through `SIGNAL_BOARD_CHANGED`.

## File Structure

```
custom_components/household_kanban/
  notify.py         + offered_services(hass) -> list[str]   (moved out of config_flow)
  config_flow.py    uses offered_services
  websocket.py      + settings, settings/update, parents/add|update|remove
tests/test_websocket_settings.py
frontend/src/
  api.ts            + Settings, getSettings, updateSettings, addParent, updateParent, removeParent, fetchDashboard, saveDashboard; Hass.user
  logic/lovelace.ts dashboardUrlPath, replaceCard
  ui/settings-dialog.ts  dialog with the three tabs (pure render + events, like detail-dialog.ts)
  card.ts           gear button, keeps raw config, opens/saves the dialog
  i18n.ts, styles.ts
frontend/test/lovelace.test.ts, settings.test.ts, settings-eod.test.ts
```

## Review Focus

1. **Card not found or found twice in the dashboard config**: two identical household-kanban cards on one dashboard, or a card inside a stack or a section. Expected: nested cards are found; two equal matches → error `err_card_ambiguous` and nothing is saved. Test: `lovelace.test.ts › ambiguous match is not replaced` (Task 12).
2. **Dashboard that cannot be saved from the UI** (YAML mode, strategy/auto-generated dashboard). Expected: a readable error in the dialog, the board keeps working, no partial write. Test: `settings.test.ts › strategy dashboard shows err_not_editable` (Task 12).
3. **HA-owned keys and unknown keys in the card config** (`grid_options`, `visibility`). Expected: kept after a save. Test: `lovelace.test.ts › replaceCard keeps keys outside the card` + `settings.test.ts › save keeps grid_options` (Task 12).
4. **Non-admin user** (a family member). Expected: no gear, and the websocket commands reject the call. Tests: `test_settings_requires_admin` (Task 11), `settings.test.ts › no gear for non-admin` (Task 12).
5. **Notify service that disappeared** (phone removed) but is still in options. Expected: settings still load; the stale service shows as checked with its name and can be unticked. Test: `test_settings_keeps_unknown_service` (Task 11), `settings-eod.test.ts › stale service is listed` (Task 13).

---

### Task 11: Settings and parent websocket commands

**Files:** Modify `custom_components/household_kanban/{websocket.py, notify.py, config_flow.py}`; create `tests/test_websocket_settings.py`.

**Interfaces:**
- Produces: the five commands in "Websocket contract (new)"; `offered_services(hass: HomeAssistant) -> list[str]` in `notify.py`.
- Consumes: `KanbanStore.async_add_parent / async_update_parent / async_remove_parent` (v1), the `CONF_*` / `DEFAULT_*` constants, `loaded_entry`.

- [ ] **Step 1: Failing tests** in `tests/test_websocket_settings.py` (use `hass_ws_client`; non-admin via `hass_ws_client(hass, hass_read_only_access_token)`):
  - `test_settings_defaults`: fresh entry → `{end_of_day_mode: "raise", close_time: "23:59", notify_enabled: False, notify_time: "08:00", notify_assignee: True, notify_services: [], offered_services: [...]}` (register a fake `notify.mobile_app_test_phone` service first → it appears in `offered_services`).
  - `test_settings_update_merges_and_reschedules`: update `{end_of_day_mode: "keep", close_time: "22:30"}` → `entry.options` has both, other keys untouched; result equals a following `settings` call.
  - `test_settings_update_rejects_bad_time`: `close_time: "24:00"` → error, options unchanged.
  - `test_settings_requires_admin`: read-only user → error code `unauthorized` for `settings` and `parents/add`.
  - `test_settings_keeps_unknown_service`: options hold `notify.mobile_app_gone`, not registered → still returned in `notify_services`.
  - `test_parents_add_update_remove`: add "Garden" → returns parent with id `garden`; update color → board event shows it; remove with target `household` → items moved (v1 store test covers the move; here assert result `null` and parent gone).
  - `test_parents_remove_default_not_allowed`: remove `household` → error `not_allowed`.
- [ ] **Step 2:** `.venv/bin/pytest tests/test_websocket_settings.py` → FAIL.
- [ ] **Step 3: Implement** the commands in `websocket.py` (register in `async_setup_websocket`), move the offered list from `config_flow.async_step_notifications` into `notify.offered_services` and use it there. A time from the options flow is stored as `"HH:MM"` already; keep that format.
- [ ] **Step 4:** `.venv/bin/ruff check . && .venv/bin/pytest` → PASS (81 v1 tests + new).
- [ ] **Step 5:** Commit `feat: admin websocket commands for settings and parents`.

Depends on: — · Model: sonnet · Review: high

### Task 12: Gear and settings dialog — Board, Lists & people (per dashboard)

**Files:** Create `frontend/src/logic/lovelace.ts`, `frontend/src/ui/settings-dialog.ts`, `frontend/test/lovelace.test.ts`, `frontend/test/settings.test.ts`; modify `frontend/src/{card.ts, api.ts, i18n.ts, styles.ts}`, rebuilt bundle.

**Interfaces:**
- Produces (TS):
  - `dashboardUrlPath(pathname: string): string | null`: first path segment; `"lovelace"` → `null` (default dashboard).
  - `replaceCard(dashboard: unknown, oldCard: Record<string, unknown>, newCard: Record<string, unknown>): {config: unknown; matches: number}`: walks every array/object in the dashboard config (views, sections, `cards`, `card`), counts cards deep-equal to `oldCard`, and replaces the match only when `matches === 1`. Otherwise it returns the input unchanged. Pure, no HA imports.
  - `api.ts`: `fetchDashboard(hass, urlPath: string | null): Promise<unknown>` (`{type: "lovelace/config", url_path: urlPath}`), `saveDashboard(hass, urlPath, config): Promise<unknown>` (`{type: "lovelace/config/save", url_path: urlPath, config}`); `Hass.user?: {is_admin: boolean}`.
  - `renderSettings(s: SettingsState, e: SettingsEvents): TemplateResult` in `ui/settings-dialog.ts`, with `SettingsState = {tab: "board" | "eod" | "lists"; draft: CardConfig; saving: boolean; error?: Key; narrow: boolean; ...}`. Task 13 extends the state for the eod tab; in this task the eod tab renders a placeholder.
  - i18n keys (en + cs): `settings`, `tab_board`, `tab_eod`, `tab_lists`, `scope_dashboard`, `scope_dashboard_hint`, `scope_household`, `scope_household_hint`, `columns`, `col_hint_*`, `done_keep`, `done_keep_hint`, `view`, `sort_order`, `sort_hint`, `lists_here`, `lists_hint`, `people_filter`, `err_card_ambiguous`, `err_card_missing`, `err_not_editable`, `err_save`.
- Behaviour:
  - Gear button in the header before History (icon only, `aria-label` = `settings`), only for admins. Narrow layout: same position in the tiles header.
  - Board tab per design `Settings6`: column switches (To-do locked on; Overdue not listed, it follows the integration mode), Done retention 1/3/7/30, Group by date/priority, sort order shown as info. No week-end control: the design's "Týden končí" row is dropped (user decision).
  - **Week start comes only from HA** (`hass.locale.first_weekday`, the user's profile setting; `"language"` → `Intl` weekInfo, else Monday). Remove the `week_end` card option everywhere: `config.ts` (type + `normalizeConfig`), `editor.ts` select, i18n `ed_week_end`/`ed_auto`/`ed_saturday`/`ed_sunday` if unused, `firstWeekday` loses its config argument, README options table and example, `config.test.ts`. A stale `week_end` in an existing YAML is ignored (and kept in the raw config on save, like any unknown key).
  - Lists & people tab: one switch per parent (on = shown; all on → `parents` key removed), pencil and "Add list" are disabled until Task 13; people chips toggle `people` the same way (as `editor.ts` `_toggleIn`, reuse it by moving it to `config.ts` as `toggleIn(list: string[] | undefined, all: string[], id: string, on: boolean): string[] | undefined`).
  - Save: `fetchDashboard` → if the result has `strategy` → `err_not_editable`; `replaceCard(dash, rawConfig, {...rawConfig, ...normalizeConfig(draft)})` → `matches === 0` → `err_card_missing`, `> 1` → `err_card_ambiguous`; else `saveDashboard`; a rejected save → `err_not_editable` if the error code is `config_not_editable` or the message mentions YAML, else `err_save`. On success call `this.setConfig(newRaw)` and close the dialog (HA reloads the dashboard on its own).
  - The card keeps `_raw` = the exact object passed to `setConfig` for the match.
- [ ] **Step 1: Failing tests**:
  - `lovelace.test.ts`: `dashboardUrlPath("/lovelace/0") === null`, `("/kanban-dev/ukoly") === "kanban-dev"`; `replaceCard` finds a card in `views[].cards`, in `views[].sections[].cards`, in a `vertical-stack` `cards` and in a `conditional` `card`; `ambiguous match is not replaced` (two equal cards → `matches: 2`, config unchanged); `replaceCard keeps keys outside the card` (view `path`, `badges` untouched).
  - `settings.test.ts` (happy-dom, fake `hass.connection.sendMessagePromise`): `no gear for non-admin`; gear opens dialog on tab Board; toggling Later + Save sends `lovelace/config/save` whose card has `columns` incl. `"later"`; `save keeps grid_options`; `strategy dashboard shows err_not_editable` (no save call); two equal cards → `err_card_ambiguous`; hiding a parent writes `parents` without it, re-enabling all removes the key; `dates.test.ts`: `firstWeekday` follows `hass.locale.first_weekday` (`"sunday"` → Sunday-first week) and a config with `week_end: "saturday"` no longer changes the week.
- [ ] **Step 2:** `cd frontend && npm test` → FAIL.
- [ ] **Step 3: Implement** per Behaviour and design `Settings6` / `Mobile6` (Bento tokens with HA fallbacks; scope banner `--warm`-style for dashboard, orange for household).
- [ ] **Step 4:** `npm run lint && npm test && npm run build` → PASS; dev HA (:8190, `/kanban-dev/ukoly`, user `dev`): as admin toggle Later → board shows Later after save; config in raw editor shows `columns` with `later` and keeps `grid_options`; a non-admin user (create one in dev HA) sees no gear.
- [ ] **Step 5:** Commit `feat: settings dialog with per-dashboard board options`.

Depends on: — · Model: opus · Review: high

### Task 13: End of day tab and parent editing in the dialog

**Files:** Modify `frontend/src/{ui/settings-dialog.ts, card.ts, api.ts, i18n.ts, styles.ts}`; create `frontend/test/settings-eod.test.ts`; rebuilt bundle.

**Interfaces:**
- Consumes: Task 11 commands; Task 12 `renderSettings`, `SettingsState`.
- Produces (TS): `api.ts` `Settings` type (as the contract), `getSettings(hass)`, `updateSettings(hass, patch: Partial<Omit<Settings, "offered_services">>)`, `addParent(hass, p: {name; icon; color; collapse})`, `updateParent(hass, id, patch)`, `removeParent(hass, id, target)`.
- Behaviour:
  - Eod tab per design `Main6Eod`: mode radios (4, with icons and descriptions from v4/v5), close time, notify switch, notify time, "Assigned person" checkbox, one checkbox per service = union of `offered_services` and `notify_services` (a stale one shows its id as the name). Loaded with `getSettings` when the tab first opens; a load error shows `err_load_settings`.
  - Save with changes on both sides: dashboard save (Task 12) then `updateSettings` with only the changed keys; an error in one keeps the dialog open with that error and does not roll back the other.
  - Lists tab: pencil opens an inline form in the row (name, icon `ha-icon-picker` if defined else text input `mdi:…`, colour chips from `PARENT_COLORS`, collapse switch, Save / Remove). "Remove" asks for the target list (select of the others, default Household) and calls `removeParent`. "Add list" opens the same form empty → `addParent`. These write immediately (not on dialog Save) and the board update arrives by subscription. The default parent shows no Remove.
  - i18n keys: `eod_title`, `eod_keep`, `eod_keep_hint`, `eod_overdue`, `eod_overdue_hint`, `eod_move`, `eod_move_hint`, `eod_raise`, `eod_raise_hint`, `close_at`, `close_hint`, `notify_title`, `notify_on`, `notify_on_hint`, `notify_at`, `notify_at_hint`, `notify_whom`, `notify_assignee`, `notify_assignee_hint`, `event_hint`, `add_list`, `edit_list`, `remove_list`, `move_items_to`, `err_load_settings`, `err_parent`.
- [ ] **Step 1: Failing tests** `settings-eod.test.ts`: opening tab Eod calls `household_kanban/settings` once; picking `keep` + Save sends `settings/update` with `{end_of_day_mode: "keep"}` only; `stale service is listed` (options `notify.mobile_app_gone` not offered → a checked row with that id); add list form sends `parents/add` with the picked colour; remove asks for target and sends `parents/remove {id, target: "household"}`; default parent has no Remove.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4:** `npm run lint && npm test && npm run build` → PASS; dev HA: change mode to `overdue` → board shows the Overdue column; add list "Garden" → appears in filters and as `todo.garden`; options flow in HA shows the same values.
- [ ] **Step 5:** Commit `feat: end of day settings and list editing from the board`.

Depends on: Task 11, Task 12 · Model: opus · Review: high
