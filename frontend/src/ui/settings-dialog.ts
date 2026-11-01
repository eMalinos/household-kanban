import { html, nothing, type TemplateResult } from "lit";
import type { Hass, Settings, SettingsPatch } from "../api";
import { DONE_DAYS, toggleIn, type CardConfig } from "../config";
import type { ColumnId } from "../logic/columns";
import { t, tn, type Key } from "../i18n";
import type { Parent } from "../types";
import { avatar, PARENT_COLORS, parentDot, personName } from "./item-card";

export type SettingsTab = "board" | "eod" | "lists";

/** Dialog state; the draft is this card's config, saved into the dashboard on Save. */
export interface SettingsState {
  tab: SettingsTab;
  draft: CardConfig;
  saving: boolean;
  error?: Key;
  narrow: boolean;
  server?: Settings; // household settings as last loaded or saved
  eod?: Settings; // their draft, written on Save
  eodLoading?: boolean;
  eodError?: boolean; // loading the household settings failed; shown in the End of day tab
  form?: ParentForm; // the open add/edit list form; it writes at once, not on Save
}

/** `id` undefined = a new list; `target` set = removing, items go there. */
export interface ParentForm {
  id?: string; name: string; icon: string; color: string; checklist: boolean;
  target?: string; busy?: boolean; error?: boolean;
}

export const DEFAULT_PARENT = "household";
export const NEW_PARENT: ParentForm = { name: "", icon: "mdi:format-list-checks", color: "blue", checklist: false };

/** Only the keys the draft changed, or null when nothing did. */
export function settingsPatch(server: Settings | undefined, draft: Settings | undefined): SettingsPatch | null {
  if (!server || !draft) return null;
  const keys = ["end_of_day_mode", "close_time", "notify_enabled", "notify_time", "notify_assignee", "notify_services"] as const;
  const out: Record<string, unknown> = {};
  for (const k of keys) if (JSON.stringify(server[k]) !== JSON.stringify(draft[k])) out[k] = draft[k];
  return Object.keys(out).length ? out as SettingsPatch : null;
}

export interface SettingsEvents {
  hass: Hass; lang: string;
  parents: Parent[]; // every parent of the board, also the hidden ones
  people: string[]; // every person.* entity
  onTab: (tab: SettingsTab) => void;
  onChange: (patch: Partial<CardConfig>) => void;
  onSave: () => void;
  onClose: () => void;
  onEod: (patch: SettingsPatch) => void;
  onRetry: () => void;
  onForm: (form: ParentForm | undefined) => void;
  onFormSave: () => void;
  onFormRemove: () => void;
}

// Overdue is not offered: it follows the integration's end-of-day mode.
const COLS: ColumnId[] = ["todo", "later", "week", "today", "done"];
const TABS: [SettingsTab, Key][] = [["board", "tab_board"], ["eod", "tab_eod"], ["lists", "tab_lists"]];
const SCREEN = "M3 5h18v12H3zM8 21h8M12 17v4";
const HOUSE = "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z";
const icon = (d: string, size = 16) => html`<svg width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d=${d}></path></svg>`;

/** Roving tabindex: the checked item (or the first when none is) is the one Tab stops on. */
const rove = (checked: boolean[], i: number): number => ((checked.includes(true) ? checked[i] : i === 0) ? 0 : -1);

/** Arrow keys, Home and End move between the tabs or radios of a group (and pick them). */
function arrows(ev: KeyboardEvent): void {
  const step: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
  const items = [...(ev.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role="radio"],[role="tab"]')];
  const i = items.indexOf(ev.target as HTMLElement);
  if (i < 0) return;
  const to = ev.key === "Home" ? 0 : ev.key === "End" ? items.length - 1 : ev.key in step ? (i + step[ev.key] + items.length) % items.length : -1;
  if (to < 0) return;
  ev.preventDefault();
  items[to].focus();
  items[to].click();
}

/** An open list form with edits that are not written yet. */
export function formDirty(f: ParentForm | undefined, parents: Parent[]): boolean {
  if (!f) return false;
  const orig = f.id === undefined ? NEW_PARENT : parents.find((p) => p.id === f.id);
  return f.target !== undefined || !orig || (["name", "icon", "color", "checklist"] as const).some((k) => f[k] !== orig[k]);
}

function toggle(on: boolean, label: string, onClick: () => void, data: Record<string, string> = {}, locked = false): TemplateResult {
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
      <div class="seg" role="radiogroup" aria-label=${label} @keydown=${arrows}>
        ${opts.map(([v, text], i) => html`<button type="button" role="radio" aria-checked=${v === cur} tabindex=${rove(opts.map(([x]) => x === cur), i)} @click=${() => pick(v)}>${text}</button>`)}
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

const EOD_MODES: [Settings["end_of_day_mode"], string, string][] = [
  ["keep", "M5 21V4h11l-1.5 4L16 12H5", "red"],
  ["overdue", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16.5h.01", "red"],
  ["move", "M4 12h13M13 7l5 5-5 5M20 5v14", "blue"],
  ["raise", "M12 19V5M6 11l6-6 6 6", "orange"],
];
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const CHECK = html`<span class="box"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>`;

function timeInput(value: string, label: string, pick: (v: string) => void): TemplateResult {
  return html`<input class="time-in" type="time" aria-label=${label} .value=${value}
    @change=${(ev: Event) => {
      const input = ev.target as HTMLInputElement;
      if (TIME.test(input.value)) pick(input.value); else input.value = value; // cleared: show the draft's time again
    }}>`;
}

function checkRow(on: boolean, name: string, hint: string, onClick: () => void, service?: string): TemplateResult {
  return html`<button class="check-row" type="button" role="checkbox" aria-checked=${on} data-service=${service ?? nothing} @click=${onClick}>
    ${CHECK}${service ? icon("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2") : nothing}
    <span class="set-text"><span class="set-name">${name}</span><span class="set-hint ${service ? "mono" : ""}">${hint}</span></span>
  </button>`;
}

function eodTab(s: SettingsState, e: SettingsEvents): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const d = s.eod;
  if (!d) {
    if (s.eodError) return html`<div class="notice" role="alert">${L("err_load_settings")}
      <button class="pill-btn retry-eod" type="button" @click=${e.onRetry}>${L("retry")}</button></div>`;
    return s.eodLoading ? html`<p class="set-hint pad">${L("loading")}</p>` : html``;
  }
  // a phone removed from HA but still picked stays listed, so it can be unticked
  const services = [...d.offered_services, ...d.notify_services.filter((x) => !d.offered_services.includes(x))];
  const [pre, post] = t(e.lang, "event_hint", { event: "\u0000" }).split("\u0000");
  return html`
    <section class="set-sec">
      <h3 class="dlg-label">${L("eod_title")}</h3>
      <div class="eod-opts" role="radiogroup" aria-label=${L("eod_title")} @keydown=${arrows}>${EOD_MODES.map(([m, path, c], i) => html`
        <button class="eod-opt" type="button" role="radio" data-mode=${m} aria-checked=${d.end_of_day_mode === m}
          tabindex=${rove(EOD_MODES.map(([x]) => x === d.end_of_day_mode), i)} @click=${() => e.onEod({ end_of_day_mode: m })}>
          <span class="radio"></span><span class="dot c-${c}">${icon(path, 15)}</span>
          <span class="set-text"><span class="set-name">${L(`eod_${m}`)}</span><span class="set-hint">${L(`eod_${m}_hint`)}</span></span>
        </button>`)}</div>
      <label class="set-line"><span class="grow">${L("close_at")}</span>${timeInput(d.close_time, L("close_at"), (close_time) => e.onEod({ close_time }))}</label>
      <span class="set-hint pad">${L("close_hint")}</span>
    </section>
    <section class="set-sec">
      <h3 class="dlg-label">${L("notify_title")}</h3>
      <div class="set-rows">
        <div class="set-row">
          <span class="set-text"><span class="set-name">${L("notify_on")}</span><span class="set-hint">${L("notify_on_hint")}</span></span>
          ${toggle(d.notify_enabled, L("notify_on"), () => e.onEod({ notify_enabled: !d.notify_enabled }))}
        </div>
        ${d.notify_enabled ? html`
          <label class="set-row">
            <span class="set-text"><span class="set-name">${L("notify_at")}</span><span class="set-hint">${L("notify_at_hint")}</span></span>
            ${timeInput(d.notify_time, L("notify_at"), (notify_time) => e.onEod({ notify_time }))}
          </label>
          <div class="notify-whom">
            <span class="set-name">${L("notify_whom")}</span>
            ${checkRow(d.notify_assignee, L("notify_assignee"), L("notify_assignee_hint"), () => e.onEod({ notify_assignee: !d.notify_assignee }))}
            ${services.map((id) => {
              const on = d.notify_services.includes(id);
              const name = d.offered_services.includes(id) ? id.replace(/^notify\.mobile_app_/, "").replace(/_/g, " ") : id;
              return checkRow(on, name, id, () => e.onEod({ notify_services: on ? d.notify_services.filter((x) => x !== id) : [...d.notify_services, id] }), id);
            })}
          </div>` : nothing}
      </div>
      ${d.notify_enabled ? html`<span class="set-hint pad">${pre}<code class="mono">household_kanban_day_closed</code>${post}</span>` : nothing}
    </section>`;
}

function parentForm(f: ParentForm, e: SettingsEvents): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const set = (patch: Partial<ParentForm>) => e.onForm({ ...f, ...patch, error: false });
  const others = e.parents.filter((p) => p.id !== f.id);
  const value = (ev: Event) => (ev.target as HTMLInputElement).value;
  return html`<div class="parent-form">
    <label class="field"><span class="dlg-label">${L("list_name")}</span>
      <input class="text-in" name="name" .value=${f.name} @input=${(ev: Event) => set({ name: value(ev) })}></label>
    <label class="field"><span class="dlg-label">${L("list_icon")}</span>
      ${customElements.get("ha-icon-picker")
        ? html`<ha-icon-picker .hass=${e.hass} .value=${f.icon} @value-changed=${(ev: CustomEvent<{ value?: string }>) => set({ icon: ev.detail.value ?? "" })}></ha-icon-picker>`
        : html`<input class="text-in mono" name="icon" placeholder="mdi:…" .value=${f.icon} @input=${(ev: Event) => set({ icon: value(ev) })}>`}</label>
    <div class="field"><span class="dlg-label">${L("list_color")}</span>
      <div class="chips" role="radiogroup" aria-label=${L("list_color")} @keydown=${arrows}>${PARENT_COLORS.map((c, i) => html`
        <button class="color-chip c-${c}" type="button" role="radio" data-color=${c} aria-label=${L(`color_${c}` as Key)} aria-checked=${f.color === c}
          tabindex=${rove(PARENT_COLORS.map((x) => x === f.color), i)} @click=${() => set({ color: c })}></button>`)}</div></div>
    <div class="set-line"><span class="set-text grow"><span class="set-name">${L("list_checklist")}</span><span class="set-hint">${L("list_checklist_hint")}</span></span>${toggle(f.checklist, L("list_checklist"), () => set({ checklist: !f.checklist }))}</div>
    ${f.target !== undefined ? html`<label class="field"><span class="dlg-label">${L("move_items_to")}</span>
      <select class="text-in" @change=${(ev: Event) => set({ target: value(ev) })}>${others.map((p) => html`<option value=${p.id} ?selected=${p.id === f.target}>${p.name}</option>`)}</select></label>` : nothing}
    ${f.error ? html`<div class="notice" role="alert">${L("err_parent")}</div>` : nothing}
    <div class="form-foot">
      ${f.id && f.id !== DEFAULT_PARENT && f.target === undefined && others.length ? html`<button class="pill-btn remove-parent" type="button"
        @click=${() => set({ target: others.some((p) => p.id === DEFAULT_PARENT) ? DEFAULT_PARENT : others[0].id })}>${L("remove_list")}</button>` : nothing}
      <span class="grow"></span>
      <button class="pill-btn" type="button" @click=${() => e.onForm(undefined)}>${L("cancel")}</button>
      ${f.target === undefined
        ? html`<button class="primary-btn save-parent" type="button" ?disabled=${f.busy || !f.name.trim()} @click=${e.onFormSave}>${L("save")}</button>`
        : html`<button class="primary-btn confirm-remove" type="button" ?disabled=${f.busy} @click=${e.onFormRemove}>${L("remove_list")}</button>`}
    </div>
  </div>`;
}

function listsTab(d: CardConfig, form: ParentForm | undefined, e: SettingsEvents): TemplateResult {
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
          ${p.checklist ? html`<span class="set-badge">${L("list_checklist")}</span>` : nothing}
          ${toggle(on, t(e.lang, "show_list", { name: p.name }), () => e.onChange({ parents: toggleIn(d.parents, allParents, p.id, !on) }), { parent: p.id })}
          <button class="icon-btn edit-list" type="button" data-parent=${p.id} aria-label=${L("edit_list")} aria-expanded=${form?.id === p.id}
            @click=${() => e.onForm(form?.id === p.id ? undefined : { id: p.id, name: p.name, icon: p.icon, color: p.color, checklist: p.checklist })}>${icon("M4 20h4L19 9l-4-4L4 16zM14 6l4 4")}</button>
        </div>${form?.id === p.id ? parentForm(form, e) : nothing}`;
      })}</div>
      ${form && form.id === undefined ? parentForm(form, e)
        : html`<button class="add-list" type="button" @click=${() => e.onForm({ ...NEW_PARENT })}>${icon("M12 5v14M5 12h14", 14)}${L("add_list")}</button>`}
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
  // an open list form closes first (Escape, Cancel, the X, the backdrop); the dialog on the next try
  const close = () => (s.form ? e.onForm(undefined) : e.onClose());
  const onBackdrop = (ev: Event) => { if (ev.target === ev.currentTarget) close(); };
  const pending = formDirty(s.form, e.parents);
  const body = s.tab === "board" ? html`${scope(e.lang, false, "scope_dashboard_hint")}${boardTab(s.draft, e)}`
    : s.tab === "lists" ? html`${scope(e.lang, false, "scope_lists_hint")}${listsTab(s.draft, s.form, e)}`
      : html`${scope(e.lang, true, "scope_household_hint")}${eodTab(s, e)}`;
  return html`<dialog class="kb-dialog kb-settings ${s.narrow ? "narrow" : ""}" aria-labelledby="kb-set-title" @close=${e.onClose}
    @cancel=${(ev: Event) => { if (s.form) { ev.preventDefault(); e.onForm(undefined); } }} @click=${onBackdrop}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><span class="dlg-kicker">Household Kanban</span>
          <h2 id="kb-set-title" class="hist-title">${L("settings")}</h2></div>
        <button class="round-btn" type="button" aria-label=${L("close")} @click=${close}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      <div class="set-tabs" role="tablist" aria-label=${L("settings")} @keydown=${arrows}>
        ${TABS.map(([id, k], i) => html`<button type="button" role="tab" id="kb-tab-${id}" data-tab=${id} aria-selected=${s.tab === id} aria-controls="kb-panel"
          tabindex=${rove(TABS.map(([x]) => x === s.tab), i)} @click=${() => e.onTab(id)}>${L(k)}</button>`)}
      </div>
      <div class="set-body" id="kb-panel" role="tabpanel" aria-labelledby="kb-tab-${s.tab}">${body}</div>
      ${s.error ? html`<div class="notice" role="alert">${L(s.error)}</div>` : nothing}
      <div class="dlg-foot">
        ${pending ? html`<span class="set-hint form-unsaved" role="status">${L("form_unsaved")}</span>` : nothing}
        <span class="grow"></span>
        <button class="pill-btn" type="button" @click=${close}>${L("cancel")}</button>
        <button class="primary-btn" type="button" ?disabled=${s.saving || pending} @click=${e.onSave}>${L("save")}</button>
      </div>
    </div>
  </dialog>`;
}
