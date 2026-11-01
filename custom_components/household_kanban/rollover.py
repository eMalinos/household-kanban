"""Pure end-of-day and archive rules (no Home Assistant imports)."""

from __future__ import annotations

from collections.abc import Iterable
from dataclasses import dataclass
from datetime import UTC, date, datetime, timedelta
from typing import TYPE_CHECKING

from .const import STATUS_COMPLETED, STATUS_NEEDS_ACTION

if TYPE_CHECKING:
    from .store import ItemData

ARCHIVE_AFTER = timedelta(days=30)


@dataclass
class CloseResult:
    """Field changes per uid, the open items due by the closed day, the run."""

    changes: dict[str, dict]
    affected: list[str]
    run_id: str


def _due_date(due: str, now: datetime) -> date:
    """Local calendar date of a due value (now carries the local zone)."""
    if "T" not in due:
        return date.fromisoformat(due)
    return datetime.fromisoformat(due).astimezone(now.tzinfo).date()


def _next_day(due: str, day: date, now: datetime) -> str:
    """The due moved to day + 1, keeping its local wall-clock time."""
    target = day + timedelta(days=1)
    if "T" not in due:
        return target.isoformat()
    local = datetime.fromisoformat(due).astimezone(now.tzinfo)
    # replace() keeps the wall clock; the zone recomputes the offset (DST).
    # The UTC round trip normalises a time in a spring-forward gap (02:30 ->
    # 03:30); astimezone() to the same tzinfo would return it unchanged.
    moved = local.replace(year=target.year, month=target.month, day=target.day)
    return moved.astimezone(UTC).astimezone(now.tzinfo).isoformat()


def close_day(
    items: Iterable[ItemData], day: date, mode: str, now: datetime
) -> CloseResult:
    """Close `day`: open items due on or before it are affected.

    keep/overdue change nothing; move sets due to day + 1 (same local time)
    and counts moved; raise moves too and steps priority up one (1 stays 1).
    """
    changes: dict[str, dict] = {}
    affected: list[str] = []
    for item in items:
        if item.status != STATUS_NEEDS_ACTION or item.due is None:
            continue
        if _due_date(item.due, now) > day:
            continue
        affected.append(item.uid)
        if mode in ("move", "raise"):
            changes[item.uid] = {
                "due": _next_day(item.due, day, now),
                "moved": item.moved + 1,
            }
        if mode == "raise" and item.priority > 1:
            changes[item.uid] |= {"priority": item.priority - 1, "raised": True}
    return CloseResult(changes, affected, run_id=day.isoformat())


def archive_due(items: Iterable[ItemData], now: datetime) -> list[str]:
    """Uids of items completed more than 30 days before now."""
    return [
        i.uid
        for i in items
        if i.status == STATUS_COMPLETED
        and i.completed_at
        and now - datetime.fromisoformat(i.completed_at) > ARCHIVE_AFTER
    ]
