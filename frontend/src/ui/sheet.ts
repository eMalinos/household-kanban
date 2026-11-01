import { html, nothing, type TemplateResult } from "lit";
import type { ColumnId } from "../logic/columns";
import type { Stack } from "../logic/stack";
import { t } from "../i18n";
import type { Item } from "../types";
import { colorClass, renderItem, renderStack, type Env } from "./item-card";

const MOVE_TARGETS: ColumnId[] = ["today", "week", "todo", "done"];

export interface SheetView {
  title: string; icon: string; color: string;
  entries: (Item | Stack)[]; count: number;
  isDone: boolean; olderDone: number;
  /** uid of the item whose "Move to…" menu is open. */
  menu?: Item;
  expanded: Set<string>;
  onExpand: (parentId: string, on: boolean) => void;
  onFocus: (parentId: string) => void;
  onClose: () => void;
  onKey: (ev: KeyboardEvent) => void;
  onHistory: () => void;
  onMove: (item: Item, col: ColumnId) => void;
  onMenuClose: () => void;
  press: { down: (ev: PointerEvent) => void; move: (ev: PointerEvent) => void; end: () => void };
}

export function renderSheet(v: SheetView, env: Env): TemplateResult {
  return html`<div class="backdrop" @click=${v.onClose}></div>
  <section class="sheet" role="dialog" aria-modal="true" aria-label=${v.title} @keydown=${v.onKey}>
    <div class="grabber"><span></span></div>
    <div class="sheet-head">
      <span class="dot ${colorClass(v.color)}"><ha-icon .icon=${v.icon}></ha-icon></span>
      <h2>${v.title}</h2>
      <span class="count">${v.count}</span>
      <button class="round-btn sclose" type="button" aria-label=${t(env.lang, "close")} @click=${v.onClose}>✕</button>
    </div>
    <div class="sheet-list" @pointerdown=${v.press.down} @pointermove=${v.press.move} @pointerup=${v.press.end}
      @pointercancel=${v.press.end} @pointerleave=${v.press.end} @contextmenu=${(e: Event) => e.preventDefault()}>
      ${v.entries.map((e) => "items" in e
        ? renderStack(e, env, v.expanded.has(e.parent.id), v.onExpand, v.onFocus)
        : renderItem(e, env, true))}
      ${v.entries.length === 0 ? html`<div class="empty">${t(env.lang, "nothing")}</div>` : nothing}
      ${v.isDone ? html`<button class="pill-btn hist-link" type="button" @click=${v.onHistory}>${t(env.lang, "older_history", { n: v.olderDone })}</button>` : nothing}
    </div>
    ${v.menu ? renderMenu(v.menu, v, env) : nothing}
  </section>`;
}

function renderMenu(item: Item, v: SheetView, env: Env): TemplateResult {
  return html`<div class="menu-wrap" @click=${(e: Event) => { if (e.target === e.currentTarget) v.onMenuClose(); }}>
    <div class="menu" role="group" aria-label=${t(env.lang, "move_to")}>
      <div class="menu-title">${t(env.lang, "move_to")}<small>${item.summary}</small></div>
      ${MOVE_TARGETS.map((c) => html`<button class="menu-btn" type="button" data-move=${c} @click=${() => v.onMove(item, c)}>${t(env.lang, `col_${c}` as "col_today")}</button>`)}
      <button class="menu-btn muted" type="button" @click=${v.onMenuClose}>${t(env.lang, "cancel")}</button>
    </div>
  </div>`;
}
