import { html, nothing, type TemplateResult } from "lit";
import type { Hass } from "../api";
import { DONE_DAYS, toggleIn, type CardConfig } from "../config";
import type { ColumnId } from "../logic/columns";
import { t, tn, type Key } from "../i18n";
import type { Parent } from "../types";
import { avatar, parentDot, personName } from "./item-card";

export type SettingsTab = "board" | "eod" | "lists";

/** Dialog state; the draft is this card's config, saved into the dashboard on Save. */
export interface SettingsState {
  tab: SettingsTab;
  draft: CardConfig;
  saving: boolean;
  error?: Key;
  narrow: boolean;
}

export interface SettingsEvents {
  hass: Hass; lang: string;
  parents: Parent[]; // every parent of the board, also the hidden ones
  people: string[]; // every person.* entity
  onTab: (tab: SettingsTab) => void;
  onChange: (patch: Partial<CardConfig>) => void;
  onSave: () => void;
  onClose: () => void;
}

// Overdue is not offered: it follows the integration's end-of-day mode.
const COLS: ColumnId[] = ["todo", "later", "week", "today", "done"];
const TABS: [SettingsTab, Key][] = [["board", "tab_board"], ["eod", "tab_eod"], ["lists", "tab_lists"]];
const SCREEN = "M3 5h18v12H3zM8 21h8M12 17v4";
const HOUSE = "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z";
const icon = (d: string, size = 16) => html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${d}></path></svg>`;

function toggle(on: boolean, label: string, onClick: () => void, data: Record<string, string>, locked = false): TemplateResult {
  return html`<button class="switch" type="button" role="switch" aria-checked=${on} aria-label=${label} ?disabled=${locked}
    data-col=${data.col ?? nothing} data-parent=${data.parent ?? nothing} @click=${onClick}></button>`;
}

function scope(lang: string, household: boolean, hint: Key): TemplateResult {
  return html`<div class="scope ${household ? "household" : "dashboard"}" role="note">
    ${icon(household ? HOUSE : SCREEN)}
    <span class="scope-text"><b>${t(lang, household ? "scope_household" : "scope_dashboard")}</b><span>${t(lang, hint)}</span></span>
  </div>`;
}

function boardTab(d: CardConfig, e: SettingsEvents): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const cols = d.columns ?? [];
  const seg = <T>(label: string, opts: [T, string][], cur: T, pick: (v: T) => void) => html`
    <div class="set-line"><span class="grow">${label}</span>
      <div class="seg" role="radiogroup" aria-label=${label}>
        ${opts.map(([v, text]) => html`<button type="button" role="radio" aria-checked=${v === cur} @click=${() => pick(v)}>${text}</button>`)}
      </div>
    </div>`;
  const sortKeys: Key[] = ["sort_due", "f_prio", "sort_created"];
  return html`
    <section class="set-sec">
      <h3 class="dlg-label">${L("columns")}</h3>
      <div class="set-rows">${COLS.map((c) => html`<div class="set-row">
        <span class="led led-${c}"></span>
        <span class="set-text"><span class="set-name">${L(`col_${c}` as Key)}</span><span class="set-hint">${L(`col_hint_${c}` as Key)}</span></span>
        ${toggle(c === "todo" || cols.includes(c), L(`col_${c}` as Key),
          () => e.onChange({ columns: cols.filter((x) => x !== c).concat(cols.includes(c) ? [] : [c]) }), { col: c }, c === "todo")}
      </div>`)}</div>
      ${cols.includes("done") ? html`
        ${seg(L("done_keep"), DONE_DAYS.map((n) => [n, tn(e.lang, "days", n)]), d.done_days, (done_days) => e.onChange({ done_days }))}
        <span class="set-hint pad">${L("done_keep_hint")}</span>` : nothing}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${L("view")}</h3>
      ${seg<CardConfig["group"]>(L("group_label"), [["date", L("group_date")], ["priority", L("group_priority")]], d.group, (group) => e.onChange({ group }))}
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${L("sort_order")}</h3>
      <div class="sort-keys">${sortKeys.map((k, i) => html`${i ? icon("M9 6l6 6-6 6") : nothing}<span class="sort-key"><span class="sort-n">${i + 1}</span>${L(k)}</span>`)}</div>
      <span class="set-hint pad">${L("sort_hint")}</span>
    </section>`;
}

function listsTab(d: CardConfig, e: SettingsEvents): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const allParents = e.parents.map((p) => p.id);
  return html`
    <section class="set-sec">
      <h3 class="dlg-label">${L("lists_here")}</h3>
      <div class="set-rows">${e.parents.map((p) => {
        const on = !d.parents || d.parents.includes(p.id);
        return html`<div class="set-row">
          ${parentDot(p)}
          <span class="set-text"><span class="set-name">${p.name}</span><span class="set-hint mono">${p.entity_id}</span></span>
          ${p.collapse ? html`<span class="set-badge">${L("collapse")}</span>` : nothing}
          ${toggle(on, t(e.lang, "show_list", { name: p.name }), () => e.onChange({ parents: toggleIn(d.parents, allParents, p.id, !on) }), { parent: p.id })}
          <button class="icon-btn edit-list" type="button" aria-label=${L("edit_list")} disabled>${icon("M4 20h4L19 9l-4-4L4 16zM14 6l4 4")}</button>
        </div>`;
      })}</div>
      <button class="add-list" type="button" disabled>${icon("M12 5v14M5 12h14", 14)}${L("add_list")}</button>
      <span class="set-hint pad">${L("lists_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${L("people_filter")}</h3>
      <div class="chips">${e.people.map((id) => {
        const on = !d.people || d.people.includes(id);
        return html`<button class="pill-btn person-chip" type="button" aria-pressed=${on} data-person=${id}
          @click=${() => e.onChange({ people: toggleIn(d.people, e.people, id, !on) })}>${avatar(e.hass, id, "", true)}${personName(e.hass, id)}</button>`;
      })}</div>
    </section>`;
}

export function renderSettings(s: SettingsState, e: SettingsEvents): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const onBackdrop = (ev: Event) => { if (ev.target === ev.currentTarget) e.onClose(); };
  const body = s.tab === "board" ? html`${scope(e.lang, false, "scope_dashboard_hint")}${boardTab(s.draft, e)}`
    : s.tab === "lists" ? html`${scope(e.lang, false, "scope_lists_hint")}${listsTab(s.draft, e)}`
      : html`${scope(e.lang, true, "scope_household_hint")}<p class="set-hint pad">${L("eod_soon")}</p>`;
  return html`<dialog class="kb-dialog kb-settings ${s.narrow ? "narrow" : ""}" aria-labelledby="kb-set-title" @close=${e.onClose} @click=${onBackdrop}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><span class="dlg-kicker">${L("settings")}</span>
          <h2 id="kb-set-title" class="hist-title">${L("title")} · ${L("settings")}</h2></div>
        <button class="round-btn" type="button" aria-label=${L("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div class="set-tabs" role="tablist" aria-label=${L("settings")}>
        ${TABS.map(([id, k]) => html`<button type="button" role="tab" data-tab=${id} aria-selected=${s.tab === id} @click=${() => e.onTab(id)}>${L(k)}</button>`)}
      </div>
      <div class="set-body" role="tabpanel">${body}</div>
      ${s.error ? html`<div class="notice" role="alert">${L(s.error)}</div>` : nothing}
      <div class="dlg-foot">
        <span class="grow"></span>
        <button class="pill-btn" type="button" @click=${e.onClose}>${L("cancel")}</button>
        <button class="primary-btn" type="button" ?disabled=${s.saving} @click=${e.onSave}>${L("save")}</button>
      </div>
    </div>
  </dialog>`;
}
