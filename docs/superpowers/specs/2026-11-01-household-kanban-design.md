# Household Kanban — design

Date: 2026-11-01 · Status: draft for approval
Visual design: https://claude.ai/artifact/F7SF24fMRAthJaKGgdx3Cv (pages v1–v5; v2 = board, v3 = mobile, v4 = end of day, v5 = integration options)

## Intent

A shared household board for home tasks and shopping, living inside Home Assistant. Everyone in the household sees one board, puts "sticky notes" on it with a priority and optionally a date, an assignee and a parent (an epic such as *Bathroom renovation* or *Shopping*). The board arranges notes by time (or by priority), keeps itself tidy at the end of each day, and tells people in the morning what slipped.

It must feel good to use: the Bento theme look (Slate preset first), fast to add and tick off, works on desktop dashboards and in the HA mobile app.

## Goals

- One board shared by the whole household; filters by person (avatar photos) and by parent.
- Notes: title, note text, parent (defaults to *Household*), priority (High / Medium / Low), optional due date and optional time, optional assignee (HA `person`).
- Columns by date: **To-do** (always on, catch-all), **Later** (optional, off by default), **This week**, **Today**, **Overdue** (only in the "overdue column" end-of-day mode), **Done**. Every column except To-do can be switched off. Alternative grouping: by priority (High / Medium / Low / Done).
- Done column shows only the last N days (card setting: 1, 3, 7, 30 days). Completed items are never lost: a History view searches all of them, filters by parent, groups by week/month and can reopen an item.
- Sorting inside every column: due date + time → priority → creation order (older first). No manual reordering.
- End of day (integration setting): at a configurable time (default 23:59), silently apply one of: keep in Today (red overdue label) | move to an Overdue column | move to the next day | move to the next day and raise priority one step per day (Low → Medium → High). Moved notes show "Moved N× · ↑ priority".
- Morning notification (optional, integration setting): at a separate configurable time (e.g. 08:00) send a summary of what the end of day did. Recipients: the assigned person's phone and/or selected `notify.mobile_app_*` services (unassigned items go to the selected services). Actionable buttons (e.g. "Done", "Move to today") handled by the integration. Always fire an event `household_kanban_day_closed` with the summary for custom automations.
- Shopping: a parent can be marked "collapse"; on the board its items in one column collapse into one checklist card showing the first 3 items and "+N more" to expand. "Open list" filters the board to that parent.
- Drag & drop between columns, mouse and touch (HA app):
  - → Today: due = today · → This week: due = end of the week the column covers (on the last day of the week: end of next week) · → Later: due = first day after the "This week" range · → To-do: due cleared · → Done: completed (dragging out of Done reopens) · → Overdue: not a drop target.
  - In priority grouping a drop changes priority.
- Week start: always from the HA user profile's first weekday; no card setting. *(user decision, v1.1; v1 had a card override)*
- Responsive card: wide → kanban board; narrow (phone, small dashboard column) → tiles (Today wide with overdue badge and 3-item preview, This week + To-do, Done) plus a list of parents; tapping a tile or parent slides up a bottom sheet with the notes. Long-press in the sheet offers "Move to…".
- Detail dialog on click: title, note, parent chips (+ new parent), priority segmented control, due quick picks (Today / Tomorrow / Weekend / No date) + date input + optional time, assignee chips, mark done, delete, save. "New note" opens the same dialog empty.
- Native integration: items live in HA to-do entities so the HA app's to-do views, Assist ("add milk to shopping") and iOS Reminders sync keep working.
- UI languages: English and Czech.

## Non-goals (v1)

- Custom mobile home-screen widget (the user uses the HA app).
- Wrapping arbitrary existing to-do providers (Google Tasks, CalDAV, the core Shopping List). The integration owns its lists. Importing from them can come later.
- Manual ordering within a column, subtasks, recurring tasks, comments, attachments.
- HFB-specific notification channels (the integration notifies by itself; HFB can listen to the event later if wanted).

## Anti-goals

- A generic Trello clone. Columns are about *time* in a household, not arbitrary lanes (that space is already covered by Todo Kanban Card and Hakanban).
- Losing completed history, or the board silently drifting from what the HA to-do entities show.
- Notifications at midnight.
- A card that only looks right in the Bento theme. It must fall back to normal HA theme variables.

## Constraints

- One repo, `eMalinos/household-kanban`, **private until v1 is done**, HACS category *Integration*. The integration serves its own card (registers the static path and the Lovelace resource), so users install one thing.
- Backend: Python custom integration `custom_components/household_kanban/` (HA core is Python). Frontend: TypeScript + Lit, bundled to one JS file (Vite or Rollup). Drag & drop via SortableJS (bundled; touch support in the HA app webview).
- Identifiers, entity IDs, code, comments, commits in English; Czech only in translations.
- Look: Bento theme tokens (`--bento-*`) with fallbacks to standard HA variables (`--card-background-color`, `--primary-color`, `--divider-color`, …). Visual reference = the design canvas above.
- Tests: `pytest-homeassistant-custom-component` for the integration; unit tests (e.g. Vitest) for card logic (column assignment, sorting, drop → date rules).

## Decided architecture

- **Parents = to-do list entities owned by the integration.** Each parent is a `todo.*` entity (e.g. `todo.household`, `todo.shopping_list`, `todo.bathroom_renovation`) implemented as a `TodoListEntity` with create/update/delete/move, due date and due datetime, description. Parents are added/renamed/removed in the integration options; per parent: name, icon, colour, "collapse on board" flag.
- **Extra metadata** (priority, assignee `person` entity_id, created_at, completed_at, times moved, priority raised) stored by the integration next to the items (HA `Store`), keyed by item uid. Items created from outside (Assist, HA app) get defaults: Medium priority, no assignee, created_at = now.
- **Reading and writing from the card:** a websocket subscription that pushes the board (items + metadata) and integration services for writes that the core `todo.*` services cannot express (priority, assignee, moving between parents, complete/reopen with timestamps).
- **End of day and notifications run in the integration** (time-based listeners), configured in the integration options:
  - end-of-day mode, day close time,
  - notification on/off, notification time, "notify assigned person" toggle, list of `notify.mobile_app_*` services.
- **Default parent:** a built-in parent *Household* (`todo.household`) always exists; it can be renamed but not deleted. Items created without choosing a parent (from the card, or via Assist without naming a list) land there. The card shows it like any other parent; there is no "no parent" option. *(builder's call, from review)*
- **Removing a parent:** the options flow asks for a target parent and moves all its items there, open and completed, before the entity is removed. History is never deleted. *(builder's call, from review)*
- **Completed items:** stay in their `todo.*` entity for 30 days after completion, then the integration moves them to its archive (Store). History in the card queries entities + archive; reopening an archived item puts it back into its parent entity. The HA app and Reminders therefore show only the last 30 days of completions. *(user decision)*
- **Morning notification shape:** one summary notification per recipient. Buttons: "Open tasks" (opens the dashboard) and one bulk action depending on the end-of-day mode ("Move all to today" for keep/overdue modes, "All done" for move modes). When the summary has a single item, the action applies to that item. Button payloads identify the day-close run, so the integration knows which items they mean. *(user decision)*
- **This week on the last day of the week:** the column covers next week (today's items are in Today), so a drop into This week (due = end of next week) stays in This week; Later starts after that range. *(builder's call, from review)*
- **Card settings** (card editor) hold only presentation: enabled columns, Done retention days, default grouping, which parents and people to show.

## Left to the builder

- Exact websocket message shapes and service names/schemas.
- How to resolve a person's phone (person → device trackers → mobile_app device → notify service), and what happens when a person has none (fall back to the selected services).
- Container-query breakpoint between board and tiles.
- Precise wording of notifications and the summary event payload.
- Store schema versioning/migrations.

## v1.1: settings from the board

Visual design: canvas page v6 (`Settings6`, `Main6*`, `Mobile6`). Plan: `docs/superpowers/plans/2026-11-01-settings-dialog.md`.

- A gear button on the card (admins only) opens a settings dialog with three tabs; a banner under the tabs says where the tab applies.
- **Board** (this dashboard only): enabled columns, Done retention, grouping. The week start is not a setting here; it comes from the HA user profile. *(user decision)* Saved into this card's config in the dashboard, so a kitchen tablet and a phone can differ. *(user decision)*
- **Lists & people**: which parents and people this dashboard shows (this dashboard only); adding, renaming, recolouring and removing a list applies to the whole household.
- **End of day & notifications** (whole household): the same values as the integration options; both places stay editable.
- Card editor and options flow keep working; the dialog is a shortcut, not a replacement. *(builder's call)*
