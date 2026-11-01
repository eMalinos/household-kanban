import { html, nothing, type TemplateResult } from "lit";
import type { Hass } from "../api";
import { diffDays, parseDue, startOfDay } from "../logic/dates";
import { join, order, progress, split, toggle, type Line } from "../logic/checklist";
import { t, type Key } from "../i18n";
import type { Item, Parent } from "../types";
import { renderNote } from "./note";

/** What every renderer needs from the card. */
export interface Env {
  hass: Hass;
  lang: string;
  now: Date;
  parents: Parent[];
  onToggle: (item: Item) => void;
  /** uids of notes whose checklist shows every line. */
  expanded: Set<string>;
  onExpand: (uid: string, on: boolean) => void;
  /** Write a new description (a tick on the card). */
  onLines: (item: Item, description: string) => void;
  /** A tap/click on a card; the card ignores it when it ended a drag. */
  onOpen: (item: Item, ev: Event) => void;
}

/** Controls on a card that neither open the dialog nor start a drag. */
export const NO_OPEN = ".check, .cl button";

/** A control or a link was hit; links of `ha-markdown` live in its shadow root, so look at the composed path. */
export const skipOpen = (ev: Event): boolean =>
  !!(ev.target as Element).closest(NO_OPEN) || ev.composedPath().some((n) => (n as Element).tagName === "A");

/** Open lines shown on a collapsed card. */
const SHOWN = 5;

/** Mirrors const.py PARENT_COLORS. */
export const PARENT_COLORS = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "indigo", "purple", "pink", "brown", "grey"];
export const colorClass = (c: string) => `c-${PARENT_COLORS.includes(c) ? c : "grey"}`;

export function personName(hass: Hass, entityId: string): string {
  return String(hass.states[entityId]?.attributes.friendly_name ?? entityId.split(".")[1] ?? entityId);
}

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

export function parentDot(p: Parent | undefined, small = false): TemplateResult {
  return html`<span class="dot ${small ? "sm" : ""} ${colorClass(p?.color ?? "grey")}"><ha-icon .icon=${p?.icon ?? "mdi:format-list-checks"}></ha-icon></span>`;
}

/** `decorative`: the name is already announced by a parent button, so the image gets an empty alt. */
export function avatar(hass: Hass, entityId: string | null, size = "", decorative = false): TemplateResult {
  if (!entityId) return html`<span class="ava none ${size}" title="-">+</span>`;
  const name = personName(hass, entityId);
  const pic = hass.states[entityId]?.attributes.entity_picture;
  if (typeof pic === "string" && pic) return html`<img class="ava ${size}" src=${pic} alt=${decorative ? "" : name} title=${name} />`;
  const hue = [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  return html`<span class="ava ${size}" title=${name} style="background:linear-gradient(135deg,hsl(${hue} 55% 62%),hsl(${(hue + 25) % 360} 55% 42%))">${initials(name)}</span>`;
}

const CHECK = html`<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"></path></svg>`;

/** Stable label (the summary) with aria-pressed carrying the state. */
function checkButton(item: Item, env: Env): TemplateResult {
  const done = item.status === "completed";
  return html`<button class="check" type="button" aria-pressed=${done} aria-label=${item.summary}
    @click=${() => env.onToggle(item)}>${CHECK}</button>`;
}

function dueLabel(item: Item, env: Env): string {
  const { date, hasTime } = parseDue(item.due as string);
  const days = diffDays(startOfDay(env.now), date);
  let label: string;
  if (days === -1) label = t(env.lang, "yesterday");
  else if (days < -1) label = t(env.lang, "days_ago", { n: -days });
  else if (days === 0) label = t(env.lang, "today");
  else if (days === 1) label = t(env.lang, "tomorrow");
  else label = date.toLocaleDateString(env.lang, { weekday: "short", day: "numeric", month: "numeric" });
  return hasTime ? `${label} ${date.toLocaleTimeString(env.lang, { hour: "2-digit", minute: "2-digit" })}` : label;
}

function doneLabel(item: Item, env: Env): string {
  const days = diffDays(new Date(item.completed_at as string), startOfDay(env.now));
  if (days <= 0) return t(env.lang, "done_today");
  return days === 1 ? t(env.lang, "done_yesterday") : t(env.lang, "done_days_ago", { n: days });
}

export function renderItem(item: Item, env: Env, showPriority: boolean): TemplateResult {
  const done = item.status === "completed";
  const parent = env.parents.find((p) => p.id === item.parent);
  const today = startOfDay(env.now);
  const overdue = !done && item.due && startOfDay(parseDue(item.due).date) < today;
  const dueToday = !done && item.due && +startOfDay(parseDue(item.due).date) === +today;
  const flag = html`<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h11l-1.5 4L16 12H5"></path></svg>`;
  const { note, lines: raw } = split(item.description);
  const lines = order(raw), p = progress(lines);
  return html`<article class="card ${done ? "done" : ""}" data-uid=${item.uid} @click=${(ev: Event) => { if (!skipOpen(ev)) env.onOpen(item, ev); }}>
    <div class="row">
      ${parentDot(parent, true)}
      <span class="parent-name">${parent?.name ?? item.parent}</span>
      ${avatar(env.hass, item.assignee)}
    </div>
    <div class="row top">
      ${p.total ? nothing : checkButton(item, env)}
      <button class="title" type="button">${item.summary}</button>
      ${p.total ? html`<span class="pill c-green cl-progress">${p.done}/${p.total}</span>` : nothing}
    </div>
    ${note ? renderNote(note, { clamp: 3 }) : nothing}
    ${p.total ? renderLines(item, note, lines, env) : nothing}
    <div class="pills">
      ${!done && showPriority ? html`<span class="pill prio-${item.priority} ${colorClass(["", "red", "orange", "grey"][item.priority])}">${flag}${t(env.lang, `prio_${item.priority}` as "prio_1")}</span>` : nothing}
      ${!done && item.moved > 0 ? html`<span class="pill c-orange">${t(env.lang, item.raised ? "moved_raised" : "moved", { n: item.moved })}</span>` : nothing}
      ${done && item.completed_at ? html`<span class="pill c-green">${doneLabel(item, env)}</span>` : nothing}
      ${!done && item.due ? html`<span class="pill ${overdue ? "c-red" : dueToday ? "today" : "later"}">${dueLabel(item, env)}</span>` : nothing}
    </div>
  </article>`;
}

/** The card's checklist: the first open lines, all of them when expanded; a tick writes at once. */
function renderLines(item: Item, note: string, lines: Line[], env: Env): TemplateResult {
  const L = (k: Key, n = 0) => t(env.lang, k, { n });
  const p = progress(lines), open = p.total - p.done;
  const expanded = env.expanded.has(item.uid);
  const shown = expanded ? lines : lines.slice(0, Math.min(open, SHOWN));
  const hidden = open - shown.filter((l) => !l.done).length;
  const more = expanded ? L("cl_hide_ticked")
    : `+ ${[hidden ? L("cl_more", hidden) : "", p.done ? L("cl_ticked", p.done) : ""].filter(Boolean).join(" · ")}`;
  return html`<div class="cl-bar"><span style="width:${Math.round((p.done / p.total) * 100)}%"></span></div>
    <div class="cl">
      ${shown.map((l, i) => html`<button class="cl-row" type="button" role="checkbox" aria-checked=${l.done}
        @click=${() => env.onLines(item, join(note, toggle(lines, i)))}><span class="cl-box">${CHECK}</span><span class="cl-t">${l.text}</span></button>`)}
      ${expanded || hidden || p.done ? html`<button class="link muted cl-more" type="button" @click=${() => env.onExpand(item.uid, !expanded)}>${more}</button>` : nothing}
      ${!open && item.status !== "completed" ? html`<div class="cl-alldone"><span>${L("cl_all_done")}</span>
        <button class="pill-btn" type="button" @click=${() => env.onToggle(item)}>${L("cl_mark_done")}</button></div>` : nothing}
    </div>`;
}
