import { html, nothing, type TemplateResult } from "lit";
import type { Hass } from "../api";
import { addDays, startOfDay } from "../logic/dates";
import { t, type Key } from "../i18n";
import type { Item, Parent } from "../types";
import { avatar, parentDot } from "./item-card";

export interface HistoryState {
  search: string; parent: string | null;
  items: Item[]; total: number;
  loading: boolean; error?: Key;
}

export interface HistoryGroup { label: string; items: Item[] }

/**
 * Bucket completed items (newest first) into this week, last week, then one group per month.
 * `firstDay` is the card's first weekday (0 = Sunday), see `firstWeekday`.
 */
export function groupHistory(items: Item[], now: Date, lang: string, firstDay: number): HistoryGroup[] {
  const today = startOfDay(now);
  const thisStart = addDays(today, -((today.getDay() - firstDay + 7) % 7));
  const lastStart = addDays(thisStart, -7);
  const month = new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" });
  const groups = new Map<string, HistoryGroup>();
  for (const item of items) {
    const at = new Date(item.completed_at ?? 0);
    let key: string, label: string;
    if (at >= thisStart) { key = "this"; label = t(lang, "col_week"); }
    else if (at >= lastStart) { key = "last"; label = t(lang, "hist_last_week"); }
    else {
      key = `${at.getFullYear()}-${at.getMonth()}`;
      label = month.format(at);
      if (lang.startsWith("cs")) label = label.toLocaleLowerCase("cs");
    }
    const g = groups.get(key) ?? { label, items: [] };
    g.items.push(item);
    groups.set(key, g);
  }
  return [...groups.values()];
}

export interface HistoryEnv {
  hass: Hass; lang: string; now: Date; firstDay: number; parents: Parent[];
  onSearch: (q: string) => void;
  onParent: (id: string | null) => void;
  onReopen: (item: Item) => void;
  onMore: () => void;
  onClose: () => void;
}

const UNDO = html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14 4 9l5-5M4 9h10.5a5.5 5.5 0 0 1 0 11H11"></path></svg>`;

export function renderHistory(s: HistoryState, e: HistoryEnv): TemplateResult {
  const L = (k: Key) => t(e.lang, k);
  const day = new Intl.DateTimeFormat(e.lang, { day: "numeric", month: "short" });
  const onBackdrop = (ev: Event) => { if (ev.target === ev.currentTarget) e.onClose(); };
  const parentOf = (id: string) => e.parents.find((p) => p.id === id);
  const groups = groupHistory(s.items, e.now, e.lang, e.firstDay);
  return html`<dialog class="kb-dialog kb-history" aria-labelledby="kb-hist-title" @close=${e.onClose} @click=${onBackdrop}>
    <div class="dlg">
      <div class="dlg-head">
        <div class="grow"><h2 id="kb-hist-title" class="hist-title">${L("history")}</h2>
          <span class="hist-sub">${t(e.lang, "hist_total", { n: s.total })}</span></div>
        <button class="round-btn" type="button" aria-label=${L("close")} @click=${e.onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
        </button>
      </div>
      ${s.error ? html`<div class="notice" role="alert">${L(s.error)}</div>` : nothing}
      <label class="hist-search">
        <span class="vis-hidden">${L("hist_search")}</span>
        <input type="search" autocomplete="off" .value=${s.search} placeholder=${L("hist_search_ph")}
          @input=${(ev: Event) => e.onSearch((ev.target as HTMLInputElement).value)} />
      </label>
      <div class="chips" role="group" aria-label=${L("filter_parents")}>
        <button class="pill-btn" type="button" aria-pressed=${s.parent === null} @click=${() => e.onParent(null)}>${L("all_parents")}</button>
        ${e.parents.map((p) => html`<button class="pill-btn hist-chip" type="button" aria-pressed=${s.parent === p.id}
          @click=${() => e.onParent(p.id)}>${parentDot(p, true)}${p.name}</button>`)}
      </div>
      <div class="hist-list">
        ${groups.map((g) => html`<section class="hist-group">
          <h3 class="dlg-label">${g.label}</h3>
          <ul class="hist-rows">${g.items.map((i) => html`<li class="hist-row" data-uid=${i.uid}>
            <span class="hist-check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"></path></svg></span>
            <div class="hist-text"><span class="hist-name">${i.summary}</span>
              <span class="hist-meta">${parentOf(i.parent)?.name ?? i.parent} · ${i.completed_at ? day.format(new Date(i.completed_at)) : ""}</span></div>
            ${i.assignee ? avatar(e.hass, i.assignee) : nothing}
            <button class="hist-reopen" type="button" title=${L("reopen")} aria-label=${`${L("reopen")}: ${i.summary}`}
              @click=${() => e.onReopen(i)}>${UNDO}</button>
          </li>`)}</ul>
        </section>`)}
        ${s.items.length === 0 && !s.loading && !s.error ? html`<div class="empty hist-empty">${L("hist_empty")}</div>` : nothing}
        ${s.items.length < s.total ? html`<button class="pill-btn hist-more" type="button" ?disabled=${s.loading} @click=${e.onMore}>${L("hist_more")}</button>` : nothing}
      </div>
    </div>
  </dialog>`;
}
