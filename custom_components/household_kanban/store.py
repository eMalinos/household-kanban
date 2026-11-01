"""Persistent store for parents, items and the archive."""

from __future__ import annotations

import logging
from collections.abc import Callable
from dataclasses import asdict, dataclass, field, replace
from datetime import date, datetime, timedelta
from uuid import uuid4

from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util
from homeassistant.util import slugify

from .const import (
    DEFAULT_PARENT,
    DEFAULT_PARENT_COLOR,
    DEFAULT_PARENT_ICON,
    DEFAULT_PARENT_NAMES,
    DEFAULT_PRIORITY,
    DOMAIN,
    RUNS_KEPT,
    SIGNAL_BOARD_CHANGED,
    STATUS_COMPLETED,
    STATUS_NEEDS_ACTION,
    STORE_KEY,
    STORE_VERSION,
)

_LOGGER = logging.getLogger(__name__)


@dataclass
class ParentData:
    """A parent (one to-do entity)."""

    id: str
    name: str
    icon: str = DEFAULT_PARENT_ICON
    color: str = DEFAULT_PARENT_COLOR
    collapse: bool = False


@dataclass
class ItemData:
    """An item with the contract's metadata."""

    uid: str
    parent: str
    summary: str
    description: str = ""
    status: str = STATUS_NEEDS_ACTION
    due: str | None = None
    priority: int = DEFAULT_PRIORITY
    assignee: str | None = None
    created_at: str = field(default_factory=lambda: dt_util.utcnow().isoformat())
    completed_at: str | None = None
    moved: int = 0
    raised: bool = False


@dataclass
class RunSummary:
    """One end-of-day run; items are the day_closed event's item dicts."""

    run_id: str
    day: date
    mode: str
    items: list[dict]
    notified: bool = False
    # recipient -> uids they were told about; set when the summary is sent
    recipients: dict[str, list[str]] = field(default_factory=dict)


def due_sort_key(due: str | None) -> datetime:
    """Return the moment a due value sorts at (date only = end of local day)."""
    if due is None:
        return datetime.max.replace(tzinfo=dt_util.UTC)
    if "T" in due:
        return dt_util.parse_datetime(due)
    next_day = dt_util.parse_date(due) + timedelta(days=1)
    return dt_util.start_of_local_day(next_day) - timedelta(microseconds=1)


def item_sort_key(item: ItemData) -> tuple:
    """Contract sort: due (+time) -> priority -> created_at."""
    return (due_sort_key(item.due), item.priority, item.created_at)


class KanbanStore:
    """Holds parents, items and archive; saves on every change."""

    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict] = Store(hass, STORE_VERSION, STORE_KEY)
        self.parents: list[ParentData] = []
        self.items: dict[str, ItemData] = {}
        self.archive: dict[str, ItemData] = {}
        self._listeners: list[Callable[[], None]] = []
        self.last_close: date | None = None
        self.runs: dict[str, RunSummary] = {}

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.parents = [ParentData(**p) for p in data.get("parents", [])]
        self.items = {i["uid"]: ItemData(**i) for i in data.get("items", [])}
        self.archive = {i["uid"]: ItemData(**i) for i in data.get("archive", [])}
        if last_close := data.get("last_close"):
            self.last_close = date.fromisoformat(last_close)
        self.runs = {
            r["run_id"]: RunSummary(**r | {"day": date.fromisoformat(r["day"])})
            for r in data.get("runs", [])
        }
        if not any(p.id == DEFAULT_PARENT for p in self.parents):
            name = DEFAULT_PARENT_NAMES.get(
                self.hass.config.language, DEFAULT_PARENT_NAMES["en"]
            )
            self.parents.insert(0, ParentData(id=DEFAULT_PARENT, name=name))
            await self._async_save()

    async def _async_save(self) -> None:
        await self._store.async_save(
            {
                "parents": [asdict(p) for p in self.parents],
                "items": [asdict(i) for i in self.items.values()],
                "archive": [asdict(i) for i in self.archive.values()],
                "last_close": self.last_close and self.last_close.isoformat(),
                "runs": [
                    asdict(r) | {"day": r.day.isoformat()} for r in self.runs.values()
                ],
            }
        )

    async def _async_changed(self) -> None:
        await self._async_save()
        async_dispatcher_send(self.hass, SIGNAL_BOARD_CHANGED)
        for listener in list(self._listeners):
            try:
                listener()
            except Exception:
                _LOGGER.exception("Error in store listener")

    @property
    def listener_count(self) -> int:
        return len(self._listeners)

    @callback
    def add_listener(self, cb: Callable[[], None]) -> Callable[[], None]:
        self._listeners.append(cb)
        return lambda: self._listeners.remove(cb)

    async def async_add_parent(
        self, name: str, icon: str, color: str, collapse: bool
    ) -> ParentData:
        """Add a parent; id = slugified name (+ _2, _3 ... if taken), fixed forever."""
        # HA's slugify gives "unknown" for "!!!" or emoji-only names
        base = slugify(name) if any(c.isalnum() for c in name) else "list"
        taken = {p.id for p in self.parents}
        parent_id, n = base, 1
        while parent_id in taken:
            n += 1
            parent_id = f"{base}_{n}"
        parent = ParentData(parent_id, name, icon, color, collapse)
        self.parents.append(parent)
        await self._async_changed()
        return parent

    async def async_update_parent(self, parent_id: str, **fields) -> ParentData:
        """Change name/icon/color/collapse; the id and entity_id stay."""
        index = next(i for i, p in enumerate(self.parents) if p.id == parent_id)
        parent = self.parents[index] = replace(self.parents[index], **fields)
        await self._async_changed()
        return parent

    async def async_remove_parent(self, parent_id: str, target_id: str) -> None:
        """Remove a parent; its items (open, completed, archived) go to the target."""
        ids = {p.id for p in self.parents}
        if (
            parent_id == DEFAULT_PARENT
            or parent_id == target_id
            or (not {parent_id, target_id} <= ids)
        ):
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="unknown_parent",
                translation_placeholders={"value": parent_id},
            )
        for items in (self.items, self.archive):
            for uid, item in items.items():
                if item.parent == parent_id:
                    items[uid] = replace(item, parent=target_id)
        self.parents = [p for p in self.parents if p.id != parent_id]
        registry = er.async_get(self.hass)
        if entity_id := registry.async_get_entity_id("todo", DOMAIN, parent_id):
            registry.async_remove(entity_id)
        await self._async_changed()

    async def async_add_item(self, parent: str, summary: str, **fields) -> ItemData:
        item = ItemData(uid=uuid4().hex, parent=parent, summary=summary, **fields)
        item.completed_at = _completed_at(item, item.status)
        self.items[item.uid] = item
        await self._async_changed()
        return item

    async def async_update_item(self, uid: str, **fields) -> ItemData:
        """Update fields.

        A status change sets or clears completed_at; a changed due resets
        moved/raised unless the caller sets them (end of day does).
        """
        current = self.items[uid]
        if "due" in fields and fields["due"] != current.due:
            fields = {"moved": 0, "raised": False} | fields
        if "status" in fields:
            fields["completed_at"] = _completed_at(current, fields["status"])
        item = self.items[uid] = replace(current, **fields)
        await self._async_changed()
        return item

    async def async_close_day(self, run: RunSummary, changes: dict[str, dict]) -> None:
        """Apply an end-of-day run as is (moved/raised come with the changes)."""
        for uid, fields in changes.items():
            self.items[uid] = replace(self.items[uid], **fields)
        self.runs[run.run_id] = run
        for old in list(self.runs)[:-RUNS_KEPT]:
            del self.runs[old]
        self.last_close = run.day
        await self._async_changed()

    async def async_archive(self, uids: list[str]) -> None:
        for uid in uids:
            self.archive[uid] = self.items.pop(uid)
        await self._async_changed()

    async def async_save_runs(self) -> None:
        """Persist run flags (notified) without notifying listeners."""
        await self._async_save()

    async def async_set_last_close(self, day: date) -> None:
        self.last_close = day
        await self._async_save()

    async def async_delete_item(self, uid: str) -> None:
        del self.items[uid]
        await self._async_changed()

    async def async_set_status(self, uid: str, status: str) -> None:
        """Set status; reopening an archived item restores it into its parent."""
        if uid in self.archive and status != STATUS_COMPLETED:
            item = self.archive.pop(uid)
            if not any(p.id == item.parent for p in self.parents):
                item.parent = DEFAULT_PARENT
            self.items[uid] = item
        if uid in self.items:
            await self.async_update_item(uid, status=status)


def loaded_entry(hass: HomeAssistant) -> ConfigEntry:
    """Return the loaded config entry (its runtime_data is the store)."""
    for entry in hass.config_entries.async_entries(DOMAIN):
        if entry.state is ConfigEntryState.LOADED:
            return entry
    raise ServiceValidationError(
        translation_domain=DOMAIN, translation_key="not_loaded"
    )


def _completed_at(item: ItemData, status: str) -> str | None:
    """The single completed_at rule: keep it while completed, else clear it."""
    if status != STATUS_COMPLETED:
        return None
    return item.completed_at or dt_util.utcnow().isoformat()
