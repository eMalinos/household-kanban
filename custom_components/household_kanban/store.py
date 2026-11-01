"""Persistent store for parents, items and the archive."""

from __future__ import annotations

import logging
from collections.abc import Callable
from dataclasses import asdict, dataclass, field, replace
from datetime import datetime, timedelta
from uuid import uuid4

from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import (
    DEFAULT_PARENT,
    DEFAULT_PARENT_COLOR,
    DEFAULT_PARENT_ICON,
    DEFAULT_PARENT_NAMES,
    DEFAULT_PRIORITY,
    DOMAIN,
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

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.parents = [ParentData(**p) for p in data.get("parents", [])]
        self.items = {i["uid"]: ItemData(**i) for i in data.get("items", [])}
        self.archive = {i["uid"]: ItemData(**i) for i in data.get("archive", [])}
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
            }
        )

    async def _async_changed(self) -> None:
        await self._async_save()
        for listener in list(self._listeners):
            try:
                listener()
            except Exception:
                _LOGGER.exception("Error in store listener")

    @callback
    def add_listener(self, cb: Callable[[], None]) -> Callable[[], None]:
        self._listeners.append(cb)
        return lambda: self._listeners.remove(cb)

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
