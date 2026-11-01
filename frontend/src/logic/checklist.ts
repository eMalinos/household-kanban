/** Description format `<note>\n\n<- [ ] lines>`; same rules as checklist.py. */
export interface Line { done: boolean; text: string }

const LINE = /^- \[( |x|X)\] ([^\n]+)$/;

/** The note and the trailing run of checklist lines. */
export function split(description: string): { note: string; lines: Line[] } {
  const rows = description.replace(/\r\n?/g, "\n").trimEnd().split("\n");
  const lines: Line[] = [];
  for (let m; rows.length && (m = LINE.exec(rows[rows.length - 1])); rows.pop()) lines.unshift({ done: m[1] !== " ", text: m[2] });
  return { note: rows.join("\n").trimEnd(), lines };
}

/** Unchecked first, then checked, each group in its order. */
export const order = (lines: Line[]): Line[] => [...lines.filter((l) => !l.done), ...lines.filter((l) => l.done)];

export function join(note: string, lines: Line[]): string {
  const body = order(lines).map((l) => `- [${l.done ? "x" : " "}] ${l.text}`).join("\n");
  const n = note.trimEnd();
  return n && body ? `${n}\n\n${body}` : n || body;
}

/** `index` points into the ordered list. */
export const toggle = (lines: Line[], index: number): Line[] =>
  order(order(lines).map((l, i) => (i === index ? { ...l, done: !l.done } : l)));

export const remove = (lines: Line[], index: number): Line[] => order(lines).filter((_, i) => i !== index);

/** Single-line text, appended to the unchecked group; empty is ignored. */
export function add(lines: Line[], text: string): Line[] {
  const t = text.replace(/[\r\n]+/g, " ").trim();
  return t ? order([...lines, { done: false, text: t }]) : lines;
}

export const progress = (lines: Line[]) => ({ done: lines.filter((l) => l.done).length, total: lines.length });
