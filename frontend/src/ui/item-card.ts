import { html, nothing, type TemplateResult } from "lit";
import type { Hass } from "../api";
import { diffDays, parseDue, startOfDay } from "../logic/dates";
import type { Stack } from "../logic/stack";
import { t } from "../i18n";
import type { Item, Parent } from "../types";

/** What every renderer needs from the card. */
export interface Env {
  hass: Hass;
  lang: string;
  now: Date;
  parents: Parent[];
  onToggle: (item: Item) => void;
  /** A tap/click on a card; the card ignores it when it ended a drag. */
  onOpen: (item: Item, ev: Event) => void;
}

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
function checkButton(item: Item, env: Env, xs = false): TemplateResult {
  const done = item.status === "completed";
  return html`<button class="check ${xs ? "xs" : ""}" type="button" aria-pressed=${done} aria-label=${item.summary}
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
  return html`<article class="card ${done ? "done" : ""}" data-uid=${item.uid} @click=${(ev: Event) => { if (!(ev.target as Element).closest(".check")) env.onOpen(item, ev); }}>
    <div class="row">
      ${parentDot(parent, true)}
      <span class="parent-name">${parent?.name ?? item.parent}</span>
      ${avatar(env.hass, item.assignee)}
    </div>
    <div class="row top">
      ${checkButton(item, env)}
      <button class="title" type="button">${item.summary}</button>
    </div>
    <div class="pills">
      ${!done && showPriority ? html`<span class="pill prio-${item.priority} ${colorClass(["", "red", "orange", "grey"][item.priority])}">${flag}${t(env.lang, `prio_${item.priority}` as "prio_1")}</span>` : nothing}
      ${!done && item.moved > 0 ? html`<span class="pill c-orange">${t(env.lang, item.raised ? "moved_raised" : "moved", { n: item.moved })}</span>` : nothing}
      ${done && item.completed_at ? html`<span class="pill c-green">${doneLabel(item, env)}</span>` : nothing}
      ${!done && item.due ? html`<span class="pill ${overdue ? "c-red" : dueToday ? "today" : "later"}">${dueLabel(item, env)}</span>` : nothing}
    </div>
  </article>`;
}

export function renderStack(stack: Stack, env: Env, expanded: boolean, onExpand: (parentId: string, on: boolean) => void, onFocus: (parentId: string) => void): TemplateResult {
  const shown = expanded ? stack.items : stack.items.slice(0, 3);
  const more = stack.items.length - shown.length;
  return html`<article class="card">
    <div class="row">
      ${parentDot(stack.parent)}
      <span class="stack-head">${stack.parent.name}</span>
      <span class="stack-sub">${stack.items.length}</span>
    </div>
    <div class="stack-rows">
      ${shown.map((item) => html`<div class="item">
        ${checkButton(item, env, true)}
        <span class="t">${item.summary}</span>
        ${item.assignee ? avatar(env.hass, item.assignee, "xs") : nothing}
      </div>`)}
      ${more > 0 ? html`<button class="link" type="button" @click=${() => onExpand(stack.parent.id, true)}>${t(env.lang, "more", { n: more })}</button>` : nothing}
      ${expanded && stack.items.length > 3 ? html`<button class="link muted" type="button" @click=${() => onExpand(stack.parent.id, false)}>${t(env.lang, "collapse")}</button>` : nothing}
    </div>
    <button class="link" type="button" @click=${() => onFocus(stack.parent.id)}>${t(env.lang, "open_list")} ›</button>
  </article>`;
}
