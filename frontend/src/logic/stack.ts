import type { Item, Parent } from "../types";

export interface Stack { parent: Parent; items: Item[] }

/** Collapse items of `collapse` parents into one stack at the first item's position; the focused parent stays plain. */
export function stackItems(items: Item[], parents: Parent[], focusedParent: string | null): (Item | Stack)[] {
  const out: (Item | Stack)[] = [];
  const stacks = new Map<string, Stack>();
  for (const item of items) {
    const parent = parents.find((p) => p.id === item.parent);
    if (!parent?.collapse || parent.id === focusedParent) { out.push(item); continue; }
    let s = stacks.get(parent.id);
    if (!s) { s = { parent, items: [] }; stacks.set(parent.id, s); out.push(s); }
    s.items.push(item);
  }
  return out;
}
