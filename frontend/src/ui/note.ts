import { html, nothing, type TemplateResult } from "lit";

/**
 * The note as markdown through HA's own sanitizing `ha-markdown`; without it (tests, very old HA)
 * plain pre-wrapped text, set as text, never as HTML.
 */
export function renderNote(md: string, opts: { clamp?: number } = {}): TemplateResult {
  const style = opts.clamp ? `-webkit-line-clamp:${opts.clamp}` : nothing;
  const cls = opts.clamp ? "note clamp" : "note";
  return customElements.get("ha-markdown")
    ? html`<div class=${cls} style=${style}><ha-markdown .content=${md} breaks></ha-markdown></div>`
    : html`<div class="${cls} plain" style=${style}>${md}</div>`;
}

export type Format = "bold" | "italic" | "bullets" | "link";
export interface Edit { value: string; start: number; end: number }

/** A pure text transformation of the textarea's value and selection. */
export function applyFormat(value: string, start: number, end: number, kind: Format): Edit {
  const wrap = (open: string, close: string): Edit => ({
    value: value.slice(0, start) + open + value.slice(start, end) + close + value.slice(end),
    start: start + open.length, end: end + open.length,
  });
  if (kind === "bold") return wrap("**", "**");
  if (kind === "italic") return wrap("*", "*");
  if (kind === "link") {
    const r = wrap("[", "](https://)");
    return { ...r, start: end + 3, end: end + 3 + "https://".length };
  }
  const from = value.lastIndexOf("\n", start - 1) + 1;
  const nl = value.indexOf("\n", end);
  const to = nl < 0 ? value.length : nl;
  const rows = value.slice(from, to).split("\n");
  const off = rows.every((r) => r.startsWith("- "));
  const block = rows.map((r) => (off ? r.slice(2) : `- ${r}`)).join("\n");
  return { value: value.slice(0, from) + block + value.slice(to), start: from, end: from + block.length };
}
