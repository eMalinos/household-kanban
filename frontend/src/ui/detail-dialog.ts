import { html, nothing, type TemplateResult } from "lit";
import type { Hass, ItemFields } from "../api";
import { add, join, order, progress, remove, split, toggle, type Line } from "../logic/checklist";
import { addDays, dueTime, parseDue, startOfDay, toDue, ymd } from "../logic/dates";
import { t, type Key } from "../i18n";
import type { Item, Parent, Priority } from "../types";
import { avatar, parentDot, personName } from "./item-card";

/** Editable copy of a task; `uid` unset = a new one. */
export interface Draft {
  uid?: string; status: Item["status"];
  /** The task title when opened, the dialog's accessible name. */
  heading: string;
  parent: string; summary: string;
  /** The note part of the description; `lines` is its checklist, kept in serialized order. */
  description: string; lines: Line[];
  priority: Priority; assignee: string | null;
  date: string; time: string;
  confirmDelete: boolean;
}

export function draftOf(item: Item): Draft {
  const { note, lines } = split(item.description);
  return {
    uid: item.uid, status: item.status, heading: item.summary, parent: item.parent, summary: item.summary, description: note, lines: order(lines),
    priority: item.priority, assignee: item.assignee,
    date: item.due ? ymd(parseDue(item.due).date) : "", time: dueTime(item.due), confirmDelete: false,
  };
}

export function emptyDraft(parent: string, preset: Partial<Pick<Draft, "date" | "priority">> = {}): Draft {
  return { status: "needs_action", heading: "", parent, summary: "", description: "", lines: [], priority: 2, assignee: null, date: "", time: "", confirmDelete: false, ...preset };
}

export function fieldsOf(d: Draft): ItemFields & { summary: string } {
  return {
    summary: d.summary.trim(), description: join(d.description, d.lines), due: toDue(d.date, d.date ? d.time : ""),
    priority: d.priority, assignee: d.assignee, parent: d.parent,
  };
}

/** Only what the user changed, so an untouched due is not re-sent (a changed due resets "moved"). */
export function changedFields(item: Item, d: Draft): ItemFields {
  const f = fieldsOf(d), o = draftOf(item), out: ItemFields = {};
  if (f.summary !== item.summary) out.summary = f.summary;
  // against the normalized original, so opening and saving never rewrites a foreign description
  const { note, lines } = split(item.description);
  if (f.description !== join(note, lines)) out.description = f.description;
  if (d.date !== o.date || d.time !== o.time) out.due = f.due;
  if (f.priority !== item.priority) out.priority = f.priority;
  if (f.assignee !== item.assignee) out.assignee = f.assignee;
  if (f.parent !== item.parent) out.parent = f.parent;
  return out;
}

export type Quick = "today" | "tomorrow" | "weekend" | "none";

/** Weekend = the next Saturday, today if it is Saturday. */
export function quickDate(kind: Quick, now: Date): string {
  const today = startOfDay(now);
  if (kind === "none") return "";
  if (kind === "today") return ymd(today);
  if (kind === "tomorrow") return ymd(addDays(today, 1));
  return ymd(addDays(today, (6 - today.getDay() + 7) % 7));
}

export interface DialogEnv {
  hass: Hass; lang: string; now: Date; parents: Parent[]; people: string[]; busy: boolean; error?: Key;
  onChange: (patch: Partial<Draft>) => void;
  onSave: () => void; onClose: () => void; onToggleDone: () => void; onDelete: () => void;
}

const FLAG = html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;

export function renderDialog(d: Draft, e: DialogEnv): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const isNew = !d.uid;
  const quick: Quick[] = ["today", "tomorrow", "weekend", "none"];
  const onBackdrop = (ev: Event) => { if (ev.target === ev.currentTarget) e.onClose(); };
  return html`<dialog class="kb-dialog" aria-label=${isNew ? L("new_task") : d.heading} @close=${e.onClose} @click=${onBackdrop}>
    <div class="dlg">
      <div class="dlg-head">
        <span class="dlg-kicker">${isNew ? L("new_note") : L("f_title")}</span>
        ${isNew ? nothing : html`<button class="pill-btn ${d.status === "completed" ? "on" : ""}" type="button" @click=${e.onToggleDone}>
          ${L(d.status === "completed" ? "mark_open" : "mark_done")}</button>`}
        <button class="round-btn" type="button" aria-label=${L("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>

      ${e.error ? html`<div class="notice" role="alert">${L(e.error)}</div>` : nothing}
      <label class="vis-hidden" for="kb-title">${L("f_title")}</label>
      <input id="kb-title" class="dlg-title" type="text" autocomplete="off" .value=${d.summary} placeholder=${L("f_title_ph")}
        @input=${(ev: Event) => e.onChange({ summary: (ev.target as HTMLInputElement).value })} />

      ${d.lines.length || e.parents.find((p) => p.id === d.parent)?.checklist ? renderList(d, e) : nothing}

      <label class="field"><span class="dlg-label">${L("f_note")}</span>
        <textarea rows="3" .value=${d.description} placeholder=${L("f_note_ph")}
          @input=${(ev: Event) => e.onChange({ description: (ev.target as HTMLTextAreaElement).value })}></textarea></label>

      <div class="field"><span class="dlg-label">${L("f_parent")}</span>
        <div class="chips" role="radiogroup" aria-label=${L("f_parent")}>
          ${e.parents.map((p) => html`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${d.parent === p.id}
            @click=${() => e.onChange({ parent: p.id })}>${parentDot(p, true)}${p.name}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${L("f_prio")}</span>
        <div class="seg3" role="radiogroup" aria-label=${L("f_prio")}>
          ${([1, 2, 3] as const).map((p) => html`<button type="button" role="radio" aria-checked=${d.priority === p}
            class="prio-${p}" @click=${() => e.onChange({ priority: p })}>${FLAG}${L(`prio_${p}` as Key)}</button>`)}
        </div></div>

      <div class="field"><span class="dlg-label">${L("f_due")}</span>
        <div class="chips">
          ${quick.map((q) => html`<button class="pill-btn ${quickDate(q, e.now) === d.date ? "on" : ""}" type="button"
            aria-pressed=${quickDate(q, e.now) === d.date}
            @click=${() => e.onChange({ date: quickDate(q, e.now), ...(q === "none" ? { time: "" } : {}) })}>${L(`q_${q}` as Key)}</button>`)}
          <label class="pill-input"><span class="vis-hidden">${L("f_date")}</span>
            <input type="date" .value=${d.date} @input=${(ev: Event) => e.onChange({ date: (ev.target as HTMLInputElement).value })} /></label>
          <label class="pill-input"><span class="vis-hidden">${L("f_time")}</span>
            <input type="time" .value=${d.time} ?disabled=${!d.date} @input=${(ev: Event) => e.onChange({ time: (ev.target as HTMLInputElement).value })} /></label>
        </div></div>

      <div class="field"><span class="dlg-label">${L("f_who")}</span>
        <div class="chips" role="radiogroup" aria-label=${L("f_who")}>
          <button class="chip dlg-chip" type="button" role="radio" aria-checked=${d.assignee === null}
            @click=${() => e.onChange({ assignee: null })}>${avatar(e.hass, null, "", true)}${L("unassigned")}</button>
          ${e.people.map((id) => html`<button class="chip dlg-chip" type="button" role="radio" aria-checked=${d.assignee === id}
            @click=${() => e.onChange({ assignee: id })}>${avatar(e.hass, id, "", true)}${personName(e.hass, id)}</button>`)}
        </div></div>

      <div class="dlg-foot">
        ${isNew ? nothing : d.confirmDelete
          ? html`<span class="danger-text" role="alert">${L("delete_confirm")}</span>
              <button class="danger-btn" type="button" ?disabled=${e.busy} @click=${e.onDelete}>${L("delete_yes")}</button>
              <button class="pill-btn" type="button" @click=${() => e.onChange({ confirmDelete: false })}>${L("cancel")}</button>`
          : html`<button class="danger-link" type="button" @click=${() => e.onChange({ confirmDelete: true })}>${L("delete")}</button>`}
        <span class="grow"></span>
        ${d.confirmDelete ? nothing : html`
          <button class="pill-btn" type="button" @click=${e.onClose}>${L("cancel")}</button>
          <button class="primary-btn" type="button" ?disabled=${!d.summary.trim() || e.busy} @click=${e.onSave}>${L("save")}</button>`}
      </div>
    </div>
  </dialog>`;
}

const X = html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>`;
const TICK = html`<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;

/** The List section: ticks, removals and adds change the draft; Save writes them with the rest. */
function renderList(d: Draft, e: DialogEnv): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const p = progress(d.lines);
  const firstDone = d.lines.findIndex((l) => l.done);
  const addFrom = (input: HTMLInputElement) => {
    const lines = add(d.lines, input.value);
    input.value = "";
    if (lines !== d.lines) e.onChange({ lines });
  };
  return html`<section class="field cl-list">
    <div class="row"><span class="dlg-label grow">${L("cl_list")}</span>
      ${p.total ? html`<span class="pill c-green">${p.done}/${p.total}</span>` : nothing}</div>
    <div class="cl-box-list">
      ${d.lines.map((l, i) => html`<div class="cl-item ${l.done ? "done" : ""} ${i === firstDone && i > 0 ? "first-done" : ""}">
        <button class="cl-check" type="button" role="checkbox" aria-checked=${l.done} aria-label=${l.text}
          @click=${() => e.onChange({ lines: toggle(d.lines, i) })}>${TICK}</button>
        <span class="cl-text">${l.text}</span>
        <button class="cl-x" type="button" aria-label=${L("cl_remove")} @click=${() => e.onChange({ lines: remove(d.lines, i) })}>${X}</button>
      </div>`)}
      <label class="cl-add"><span aria-hidden="true">+</span>
        <input type="text" autocomplete="off" placeholder=${L("cl_add_ph")} aria-label=${L("cl_add_ph")}
          @keydown=${(ev: KeyboardEvent) => { if (ev.key === "Enter" && !ev.isComposing) { ev.preventDefault(); addFrom(ev.target as HTMLInputElement); } }}
          @blur=${(ev: Event) => addFrom(ev.target as HTMLInputElement)} /></label>
    </div>
  </section>`;
}
