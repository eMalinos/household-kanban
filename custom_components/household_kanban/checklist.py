"""Checklist description format: `<note>\n\n<- [ ] lines>` (see the v1.2 plan)."""

from __future__ import annotations

import re

_LINE = re.compile(r"^- \[( |x|X)\] ([^\n]+)$")


def split(description: str) -> tuple[str, list[tuple[bool, str]]]:
    """Return the note and the trailing run of checklist lines as (done, text)."""
    rows = description.replace("\r\n", "\n").replace("\r", "\n").rstrip().split("\n")
    lines: list[tuple[bool, str]] = []
    while rows and (m := _LINE.match(rows[-1])):
        lines.insert(0, (m[1] != " ", m[2]))
        rows.pop()
    return "\n".join(rows).rstrip(), lines


def join(note: str, lines: list[tuple[bool, str]]) -> str:
    """Serialize: unchecked first, then checked, each group in order."""
    ordered = [x for x in lines if not x[0]] + [x for x in lines if x[0]]
    body = "\n".join(f"- [{'x' if done else ' '}] {text}" for done, text in ordered)
    note = note.rstrip()
    return f"{note}\n\n{body}" if note and body else note or body


def append(description: str, text: str) -> str:
    """Add an unchecked line at the end of the unchecked group."""
    note, lines = split(description)
    return join(note, [*lines, (False, text)])
