import { expect, test } from "vitest";
import { add, join, progress, remove, split, toggle, type Line } from "../src/logic/checklist";

const L = (done: boolean, text: string): Line => ({ done, text });

test("split/join cases (same as test_checklist.py)", () => {
  expect(split("just a note")).toEqual({ note: "just a note", lines: [] });
  expect(split("- [ ] a\n- [x] b")).toEqual({ note: "", lines: [L(false, "a"), L(true, "b")] });
  expect(split("note\n\n- [ ] a")).toEqual({ note: "note", lines: [L(false, "a")] });
  expect(split("- [X] a").lines).toEqual([L(true, "a")]);
  expect(split("n\r\n\r\n- [ ] a\r\n")).toEqual({ note: "n", lines: [L(false, "a")] });
  expect(split("- [ ] a\nplain")).toEqual({ note: "- [ ] a\nplain", lines: [] });
  expect(join("note", [L(true, "b"), L(false, "a")])).toBe("note\n\n- [ ] a\n- [x] b");
  expect(join("", [L(false, "a")])).toBe("- [ ] a");
  expect(join("note  \n", [])).toBe("note");
});

test("round trip keeps foreign text", () => {
  const x = "intro\n- [ ] inside\n* [ ] star\n\ntail\r\n- [x] done\n- [ ] open\n\n";
  const s = split(x);
  const once = join(s.note, s.lines);
  for (const part of ["intro", "- [ ] inside", "* [ ] star", "tail"]) expect(once).toContain(part);
  const again = split(once);
  expect(join(again.note, again.lines)).toBe(once);
});

test("toggle reorders", () => {
  const lines = [L(false, "a"), L(true, "c"), L(false, "b")];
  // ordered: a, b, [x] c; tick a (index 0)
  expect(toggle(lines, 0)).toEqual([L(false, "b"), L(true, "a"), L(true, "c")]);
  // untick c (index 2 in the ordered list)
  expect(toggle(lines, 2)).toEqual([L(false, "a"), L(false, "b"), L(false, "c")]);
});

test("add trims and ignores empty", () => {
  const lines = [L(false, "a"), L(true, "x")];
  expect(add(lines, "  milk\nfresh  ")).toEqual([L(false, "a"), L(false, "milk fresh"), L(true, "x")]);
  expect(add(lines, "   ")).toBe(lines);
  expect(remove(lines, 1)).toEqual([L(false, "a")]);
});

test("a U+2028/U+2029 inside an item stays in that item (same as test_checklist.py)", () => {
  expect(split("- [ ] a b\n- [x] c")).toEqual({ note: "", lines: [L(false, "a b"), L(true, "c")] });
  expect(split("- [ ] a b").lines).toEqual([L(false, "a b")]);
});

test("progress", () => {
  expect(progress([L(false, "a"), L(true, "b"), L(true, "c")])).toEqual({ done: 2, total: 3 });
  expect(progress([])).toEqual({ done: 0, total: 0 });
});
