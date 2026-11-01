"""To-do list entities, one per parent."""

from __future__ import annotations

from datetime import date, datetime

from homeassistant.components.todo import (
    TodoItem,
    TodoItemStatus,
    TodoListEntity,
    TodoListEntityFeature,
)
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.util import dt as dt_util

from . import KanbanConfigEntry
from .const import STATUS_COMPLETED, STATUS_NEEDS_ACTION
from .store import ItemData, KanbanStore, ParentData, item_sort_key


async def async_setup_entry(
    hass: HomeAssistant,
    entry: KanbanConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    store = entry.runtime_data
    async_add_entities(KanbanTodoList(store, parent) for parent in store.parents)


def _due_to_str(due: date | datetime | None) -> str | None:
    return due.isoformat() if due else None


def _due_from_str(due: str | None) -> date | datetime | None:
    if due is None:
        return None
    return dt_util.parse_datetime(due) if "T" in due else dt_util.parse_date(due)


def _to_todo_item(item: ItemData) -> TodoItem:
    return TodoItem(
        uid=item.uid,
        summary=item.summary,
        description=item.description or None,
        status=TodoItemStatus(item.status),
        due=_due_from_str(item.due),
        completed=dt_util.parse_datetime(item.completed_at)
        if item.completed_at
        else None,
    )


class KanbanTodoList(TodoListEntity):
    """A parent shown as a to-do list."""

    _attr_should_poll = False
    _attr_supported_features = (
        TodoListEntityFeature.CREATE_TODO_ITEM
        | TodoListEntityFeature.UPDATE_TODO_ITEM
        | TodoListEntityFeature.DELETE_TODO_ITEM
        | TodoListEntityFeature.MOVE_TODO_ITEM
        | TodoListEntityFeature.SET_DUE_DATE_ON_ITEM
        | TodoListEntityFeature.SET_DUE_DATETIME_ON_ITEM
        | TodoListEntityFeature.SET_DESCRIPTION_ON_ITEM
    )

    def __init__(self, store: KanbanStore, parent: ParentData) -> None:
        self._store = store
        self._parent_id = parent.id
        self._attr_unique_id = parent.id
        self.entity_id = f"todo.{parent.id}"
        self._refresh()

    @callback
    def _refresh(self) -> None:
        parent = next(p for p in self._store.parents if p.id == self._parent_id)
        self._attr_name = parent.name
        self._attr_icon = parent.icon
        mine = [i for i in self._store.items.values() if i.parent == self._parent_id]
        mine.sort(key=lambda i: (i.status == STATUS_COMPLETED, item_sort_key(i)))
        self._attr_todo_items = [_to_todo_item(i) for i in mine]

    @callback
    def _on_store_change(self) -> None:
        self._refresh()
        self.async_write_ha_state()

    async def async_added_to_hass(self) -> None:
        self.async_on_remove(self._store.add_listener(self._on_store_change))

    async def async_create_todo_item(self, item: TodoItem) -> None:
        await self._store.async_add_item(
            self._parent_id,
            item.summary or "",
            description=item.description or "",
            due=_due_to_str(item.due),
            status=str(item.status or STATUS_NEEDS_ACTION),
        )

    async def async_update_todo_item(self, item: TodoItem) -> None:
        fields: dict = {
            "summary": item.summary or "",
            "description": item.description or "",
            "due": _due_to_str(item.due),
        }
        if item.status:
            fields["status"] = str(item.status)  # store owns the completed_at rule
        await self._store.async_update_item(item.uid, **fields)

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        for uid in uids:
            await self._store.async_delete_item(uid)

    async def async_move_todo_item(
        self, uid: str, previous_uid: str | None = None
    ) -> None:
        """Ignore manual reordering: the order is always the contract sort."""
