import { html, type TemplateResult } from "lit";
import { t } from "../i18n";
import type { Item, Parent } from "../types";
import { avatar, colorClass, parentDot, personName, type Env } from "./item-card";

export interface FilterState { who: string | null; parent: string | null; group: "date" | "priority" }

export function renderFilters(
  env: Env, state: FilterState, people: string[], items: Item[],
  set: (patch: Partial<FilterState>) => void,
): TemplateResult {
  const open = items.filter((i) => i.status === "needs_action" && (!state.who || i.assignee === state.who));
  const chip = (p: Parent | null) => {
    const on = state.parent === (p?.id ?? null);
    const n = open.filter((i) => !p || i.parent === p.id).length;
    return html`<button class="chip ${p ? colorClass(p.color) : ""}" type="button" aria-pressed=${on}
      @click=${() => set({ parent: on ? null : (p?.id ?? null) })}>
      ${parentDot(p ?? undefined)}<span>${p?.name ?? t(env.lang, "all_parents")}</span><b>${n}</b></button>`;
  };
  return html`<div class="filters">
    <div class="people ${state.who ? "has-filter" : ""}" role="group" aria-label=${t(env.lang, "filter_people")}>
      ${people.map((id) => {
        const on = state.who === id;
        return html`<button class="person" type="button" aria-pressed=${on} @click=${() => set({ who: on ? null : id })}>
          ${avatar(env.hass, id, "lg", true)}<span>${personName(env.hass, id)}</span></button>`;
      })}
    </div>
    <div class="parents" role="group" aria-label=${t(env.lang, "filter_parents")}>
      ${chip(null)}${env.parents.map((p) => chip(p))}
    </div>
    <div class="seg" role="group" aria-label=${t(env.lang, "group_label")}>
      ${(["date", "priority"] as const).map((g) => html`<button type="button" aria-pressed=${state.group === g}
        @click=${() => set({ group: g })}>${t(env.lang, `group_${g}`)}</button>`)}
    </div>
  </div>`;
}
