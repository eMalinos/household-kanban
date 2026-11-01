# Checklist Notes, Formatted Notes and Mobile Chips — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Each task is also a GitHub issue in milestone "v1.2" (one task = one PR); Task N = issue #N.

**Goal:** A shopping list becomes one note with a native checklist: tick on the card, checked items struck through at the end. Every note gets basic formatting (bold, italic, bullets, links). The narrow layout shows To-do and Done as chips.

**Architecture:** Checklist lines live in the item `description` as GitHub task-list lines (`- [ ] milk` / `- [x] milk`), after the free-text note. The HA app, Reminders and Assist therefore still see readable text, and no new storage is needed. Pure parse/serialize helpers exist on both sides: `logic/checklist.ts` for the card, `checklist.py` for the Assist append. The UI never shows the raw lines: the checklist has its own rows, the note is markdown rendered by HA's `ha-markdown`. A parent flag `checklist` (renamed from `collapse`) marks shopping lists. An item added from outside the card (Assist, HA app) to such a list becomes a line in the newest open note there instead of a new note.

**Tech Stack:** as v1.1: Python 3.14, HA 2026.10, `pytest-homeassistant-custom-component`, ruff; TypeScript 5, Lit 3, Vite 6, Vitest, ESLint.

**Spec:** `docs/superpowers/specs/2026-11-01-household-kanban-design.md` (section "v1.2: checklist notes, formatting, mobile chips") · visual design: https://claude.ai/artifact/F7SF24fMRAthJaKGgdx3Cv page **v7** (`Cards7`, `Detail7`, `Detail7Note`, `Mobile7`, `Mobile7Open`, `Mobile7Detail`)

## Global Constraints

- Everything in the v1 and v1.1 plans' Global Constraints still applies (`docs/superpowers/plans/2026-11-01-household-kanban.md`, `…-settings-dialog.md`).
- **Description format** (both sides must agree, one place per side):
  - The description is `<note>` + `"\n\n"` + `<checklist lines>`. Either part may be empty. With no checklist there is no separator; with no note it is just the lines.
  - A checklist line matches `^- \[( |x|X)\] (.+)$`. The checklist is the **trailing** run of such lines; any task-list line inside the note text stays note text.
  - Serialize: unchecked lines first, then checked, each group keeping its order; `x` lowercase; `\n` between lines; a note is `trimEnd`-ed.
- Item texts are single-line: newlines become spaces and leading/trailing whitespace is trimmed. An empty text is not added.
- The card never shows raw `- [ ]` lines: the checklist renders as rows, and only the note part goes through markdown.
- Markdown rendering uses HA's `<ha-markdown>` (sanitized by HA). If it is not defined, the note shows as plain pre-wrapped text. No markdown library is added to the bundle.
- A tick on the card writes the full new description with `update_item` (`ponytail:` last write wins if two people tick in the same second; a per-line server op can come later).
- Parent flag rename `collapse` → `checklist` everywhere (store, websocket contract, options flow, card types, settings dialog). Stored data with `collapse` loads as `checklist`; no store version bump.
- The shopping stack (several items of a `collapse` parent shown as one card, `logic/stack.ts`) is removed; a checklist parent's items render as normal notes.
- Existing separate shopping items are not migrated; they stay separate notes.

## Review Focus

1. **A description written outside the card** (HA app, Reminders) with mixed text and task-list lines, CRLF line endings, `* [ ]` bullets or a trailing blank line. Expected: parse never loses text; anything that is not a trailing `- [ ]`/`- [x]` line stays in the note; serialize(parse(x)) is stable after one round. Tests: `checklist.test.ts › round trip keeps foreign text`, `test_checklist.py › test_round_trip_keeps_foreign_text` (Task 16).
2. **Assist adds to a shopping list with no open note**, or with several open notes. Expected: no open note → one new note named "Shopping" / "Nákup" (HA language) holding the line. Several → the newest by `created_at` gets it. Never two new notes for two quick adds. Test: `test_assist_add_to_checklist_parent` (Task 16).
3. **Ticking the last open line.** Expected: the card offers "Mark done" on that note (inline button); it does not auto-complete. Test: `checklist-card.test.ts › all ticked offers done` (Task 17).
4. **Note with markdown in a narrow card / dark theme and without `ha-markdown`** (tests, very old HA). Expected: readable plain text fallback, clamp to 3 lines on the card. Test: `note.test.ts › fallback without ha-markdown` (Task 18).
5. **Mobile chips with 0 items** and with Done disabled in the card config. Expected: a chip shows `0` and still opens an empty sheet; a disabled column has no chip. Test: `tiles.test.ts › chips follow enabled columns` (Task 19).

---

### Task 16: Backend — checklist parent flag and Assist append

**Files:** Create `custom_components/household_kanban/checklist.py`, `tests/test_checklist.py`; modify `store.py`, `todo.py`, `websocket.py`, `config_flow.py`, `strings.json`, `translations/{en,cs}.json`, `README.md` (parent options), existing tests that use `collapse`.

**Interfaces:**
- Produces (Python), in `checklist.py`:
  - `split(description: str) -> tuple[str, list[tuple[bool, str]]]`: returns the note and `[(done, text)]`.
  - `join(note: str, lines: list[tuple[bool, str]]) -> str`: follows the Description format rules.
  - `append(description: str, text: str) -> str`: adds `(False, text)` at the end of the unchecked group.
- Contract change: `Parent.checklist: bool` replaces `collapse` in the board, in `parents/add|update` and in the options flow field (label en "Shopping list (items go into one note)", cs "Nákupní seznam (položky do jednoho lístečku)").
- Assist / HA-app rule: in `HouseholdTodoListEntity.async_create_todo_item`, if the parent has `checklist` and the new item is open, append `item.summary` to the newest open item (by `created_at`) of that parent via `store.async_update_item(uid, description=...)`. If there is none, create one item with summary from `{"en": "Shopping", "cs": "Nákup"}` by `hass.config.language` (default en) and the line as description. The card's `create_item` service is unchanged: an explicit create always makes a note.
- [ ] **Step 1: Failing tests** `tests/test_checklist.py`:
  - `split`/`join` cases: note only; lines only; both; `- [X]` → done; CRLF normalized; a task-list line followed by plain text stays note.
  - `test_round_trip_keeps_foreign_text`: `join(*split(x))` keeps every non-line character of the note, and a second round is identical.
  - `append` puts the new line before the first checked line.
  - `test_assist_add_to_checklist_parent`:
    - with no open note → `todo.add_item` on the checklist entity creates one note "Shopping" with `- [ ] milk`;
    - a second add → the same note gains `- [ ] bread`, still one note;
    - a non-checklist parent → a separate item as before.
  - `test_collapse_loads_as_checklist`: stored parent `{"collapse": true}` loads with `checklist == True`.
  - `test_parents_add_checklist`: websocket accepts `checklist`.
- [ ] **Step 2:** `.venv/bin/pytest tests/test_checklist.py` → FAIL.
- [ ] **Step 3: Implement.** Rename the field. In `KanbanStore.async_load`, map a stored `collapse` key to `checklist`. Concurrent adds are serialized by the event loop: do the lookup and the update without an await in between, or re-read after it.
- [ ] **Step 4:** `.venv/bin/ruff check . && .venv/bin/pytest` → PASS.
- [ ] **Step 5:** Commit `feat: checklist lists and Assist append to the open note`.

Depends on: — · Model: sonnet · Review: high

### Task 17: Card — checklist on the card and in the detail dialog

**Files:** Create `frontend/src/logic/checklist.ts`, `frontend/test/checklist.test.ts`, `frontend/test/checklist-card.test.ts`; modify `frontend/src/{types.ts, ui/item-card.ts, ui/detail-dialog.ts, ui/board.ts, ui/tiles.ts, ui/sheet.ts, ui/settings-dialog.ts, card.ts, i18n.ts, styles.ts}`. Delete `frontend/src/logic/stack.ts` and `frontend/test/stack.test.ts`, and remove their uses. Rebuild the bundle.

**Interfaces:**
- Consumes: Task 16's `Parent.checklist` and Description format.
- Produces (TS), in `logic/checklist.ts`:
  - `type Line = { done: boolean; text: string }`;
  - `split(description: string): { note: string; lines: Line[] }`;
  - `join(note: string, lines: Line[]): string`;
  - `toggle(lines: Line[], index: number): Line[]`: the index is into the ordered list and the result is re-ordered;
  - `add(lines, text)`, `remove(lines, index)`, `progress(lines): { done: number; total: number }`.
  - The format rules are identical to Task 16.
- Behaviour per design `Cards7` / `Detail7`:
  - **Card with lines:**
    - The title row shows a `done/total` pill and a thin progress bar.
    - The first 5 unchecked lines show as checkbox rows; a tick writes `update_item {description}`.
    - "+ N more · M ticked" expands to show all lines, the checked ones struck through at the end; "Hide ticked" collapses.
    - When every line is ticked, an inline "Mark done" button appears (Review Focus 3).
    - The card's own check circle is hidden while the note has lines; the note is completed through the button or the dialog.
  - **Detail dialog:**
    - A "List" section above the note, shown when the item has lines or its parent has `checklist`. Each row has a checkbox, the text and a × to remove; checked rows are struck through below a dashed divider.
    - An "Add item…" input at the bottom adds a line on Enter and keeps focus; a blur with text also adds it.
    - Edits are saved with the dialog's Save, as every other field.
    - A new note created in a `checklist` parent opens with the List section and the focus in "Add item…".
  - **Removals:**
    - The shopping stack is removed from the board, tiles and sheet.
    - The settings dialog list form's "collapse" switch becomes "Shopping list" (`checklist`) and the row badge reads "Shopping list".
  - i18n keys (en + cs): `cl_list`, `cl_add_ph`, `cl_remove`, `cl_more`, `cl_ticked`, `cl_hide_ticked`, `cl_all_done`, `cl_mark_done`, `list_checklist`, `list_checklist_hint`; remove keys used only by the stack.
- [ ] **Step 1: Failing tests**:
  - `checklist.test.ts`: the same split/join cases as Task 16 (copy the inputs verbatim from `tests/test_checklist.py`), plus `round trip keeps foreign text`, `toggle reorders`, `add trims and ignores empty`, `progress`.
  - `checklist-card.test.ts` (happy-dom, like `card.test.ts`):
    - a ticked row sends `update_item` with the description reordered;
    - more than 5 open lines show "+ N more";
    - `all ticked offers done` → the button sends `set_status completed`;
    - in the dialog, "Add item" + Enter adds a row and Save sends the joined description;
    - a new note in a checklist parent shows the List section.
- [ ] **Step 2:** `cd frontend && npm test` → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4:** `npm run lint && npm test && npm run build` → PASS.
- [ ] **Step 5:** Commit `feat: checklist notes on the card and in the detail dialog`.

Depends on: Task 16 · Model: opus · Review: high

### Task 18: Card — formatted notes

**Files:** Create `frontend/src/ui/note.ts`, `frontend/test/note.test.ts`; modify `frontend/src/{ui/item-card.ts, ui/detail-dialog.ts, i18n.ts, styles.ts}`; rebuild the bundle.

**Interfaces:**
- Consumes: Task 17's `split` (only the note part is rendered or edited here).
- Produces (TS), in `ui/note.ts`:
  - `renderNote(md: string, opts: { clamp?: number }): TemplateResult`: `<ha-markdown .content=${md} breaks>` when `customElements.get("ha-markdown")`, else a pre-wrapped `<div>`; `clamp` sets `-webkit-line-clamp`.
  - `applyFormat(value: string, start: number, end: number, kind: "bold" | "italic" | "bullets" | "link"): { value: string; start: number; end: number }`, a pure transformation:
    - bold/italic wrap the selection in `**`/`*`, or insert the markers with the caret inside when the selection is empty;
    - bullets prefix every selected line with `- ` and toggle it off when all already have it;
    - link wraps the selection as `[text](https://)` and selects `https://`.
- Behaviour per design `Cards7` / `Detail7Note`:
  - The item card shows the rendered note clamped to 3 lines under the title.
  - The detail dialog's note gets a toolbar (B, I, bullets, link) and an Edit / Preview switch:
    - Edit = the textarea; Preview = `renderNote` without clamp;
    - the dialog opens in Preview when the note is non-empty, in Edit when it is empty;
    - Ctrl/Cmd+B and Ctrl/Cmd+I work in the textarea.
  - i18n: `fmt_bold`, `fmt_italic`, `fmt_bullets`, `fmt_link`, `note_edit`, `note_preview`.
- [ ] **Step 1: Failing tests** `note.test.ts`:
  - `applyFormat` cases: bold with a selection, bold empty, bullets on 2 lines, bullets toggle off, link;
  - `fallback without ha-markdown` renders plain text with no `<script>` execution (content set as text);
  - the dialog opens in Preview for a non-empty note;
  - a toolbar click changes the draft description and keeps the checklist part intact.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4:** `npm run lint && npm test && npm run build` → PASS.
- [ ] **Step 5:** Commit `feat: formatted notes with a small toolbar`.

Depends on: Task 17 · Model: sonnet · Review: high

### Task 19: Card — mobile chips for To-do and Done

**Files:** Modify `frontend/src/{ui/tiles.ts, i18n.ts, styles.ts}`, `frontend/test/tiles.test.ts` (and `narrow.test.ts` where tile counts are asserted); rebuild the bundle.

**Interfaces:**
- Behaviour per design `Mobile7` / `Mobile7Open`:
  - The narrow layout keeps the Today and This week tiles, both full-width with the 3-item preview, plus Later and Overdue tiles when enabled, as today.
  - To-do and Done become one row of two pill chips: icon, label, count. A tap opens the existing bottom sheet for that column; a long-press or "Move to…" in the sheet is unchanged.
  - A column disabled in the card config has no chip. A chip with 0 items still opens its (empty) sheet.
- [ ] **Step 1: Failing tests** `tiles.test.ts`:
  - `chips follow enabled columns`: Done off → only the To-do chip;
  - a chip shows its count and a click opens the sheet for that column;
  - Today and This week render as tiles, To-do and Done do not.
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3: Implement.**
- [ ] **Step 4:** `npm run lint && npm test && npm run build` → PASS.
- [ ] **Step 5:** Commit `feat: To-do and Done as chips in the narrow layout`.

Depends on: — (touches files Task 17 also edits; run after it) · Model: sonnet · Review: medium
