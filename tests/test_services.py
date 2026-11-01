"""Service tests."""

import pytest
from homeassistant.components.todo import DOMAIN as TODO_DOMAIN
from homeassistant.exceptions import ServiceValidationError
from homeassistant.util import dt as dt_util

from custom_components.household_kanban.const import DOMAIN
from custom_components.household_kanban.store import ParentData


async def _svc(hass, service, data):
    await hass.services.async_call(DOMAIN, service, data, blocking=True)


def _only(store):
    [item] = store.items.values()
    return item


async def _todo_uids(hass, entity_id):
    resp = await hass.services.async_call(
        TODO_DOMAIN,
        "get_items",
        {},
        target={"entity_id": entity_id},
        blocking=True,
        return_response=True,
    )
    return [i["uid"] for i in resp[entity_id]["items"]]


async def test_create_item_with_meta(hass, entry):
    hass.states.async_set("person.karel", "home")
    await _svc(
        hass,
        "create_item",
        {
            "summary": "Bins",
            "description": "Blue one",
            "priority": 1,
            "assignee": "person.karel",
            "due": "2026-11-02T10:00:00+01:00",
        },
    )
    item = _only(entry.runtime_data)
    assert item.parent == "household"
    assert item.summary == "Bins"
    assert item.description == "Blue one"
    assert item.priority == 1
    assert item.assignee == "person.karel"
    assert item.due == "2026-11-02T10:00:00+01:00"
    assert item.status == "needs_action"


async def test_due_normalised(hass, entry):
    await hass.config.async_set_time_zone("Europe/Prague")
    store = entry.runtime_data
    await _svc(hass, "create_item", {"summary": "naive", "due": "2026-11-02 10:00"})
    await _svc(hass, "create_item", {"summary": "date", "due": "2026-11-03"})
    dues = {i.summary: i.due for i in store.items.values()}
    assert dues == {"naive": "2026-11-02T10:00:00+01:00", "date": "2026-11-03"}
    for bad in ("tomorrow", "2026-13-01", "2026-11-02T25:00"):
        with pytest.raises(ServiceValidationError) as err:
            await _svc(hass, "create_item", {"summary": "x", "due": bad})
        assert err.value.translation_key == "invalid_due"


async def test_update_due_resets_moved(hass, entry):
    store = entry.runtime_data
    item = await store.async_add_item(
        "household", "Bins", due="2026-11-01", moved=2, raised=True
    )
    await _svc(hass, "update_item", {"uid": item.uid, "summary": "Bins!"})
    assert (store.items[item.uid].moved, store.items[item.uid].raised) == (2, True)
    await _svc(hass, "update_item", {"uid": item.uid, "due": "2026-11-03"})
    updated = store.items[item.uid]
    assert updated.due == "2026-11-03"
    assert (updated.moved, updated.raised) == (0, False)
    assert updated.summary == "Bins!"


async def test_set_status_sets_completed_at(hass, entry):
    store = entry.runtime_data
    item = await store.async_add_item("household", "Bins")
    await _svc(hass, "set_status", {"uid": item.uid, "status": "completed"})
    done = store.items[item.uid]
    assert done.status == "completed"
    assert dt_util.parse_datetime(done.completed_at) is not None
    await _svc(hass, "set_status", {"uid": item.uid, "status": "needs_action"})
    assert store.items[item.uid].completed_at is None


async def test_set_status_restores_archived(hass, entry):
    store = entry.runtime_data
    item = await store.async_add_item("household", "Old", status="completed")
    store.archive[item.uid] = store.items.pop(item.uid)
    await _svc(hass, "set_status", {"uid": item.uid, "status": "needs_action"})
    assert item.uid not in store.archive
    restored = store.items[item.uid]
    assert restored.status == "needs_action" and restored.completed_at is None
    await hass.async_block_till_done()
    assert item.uid in await _todo_uids(hass, "todo.household")


async def test_move_to_other_parent(hass, entry):
    store = entry.runtime_data
    store.parents.append(ParentData(id="garden", name="Garden"))
    await store._async_save()
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    store = entry.runtime_data

    item = await store.async_add_item("household", "Rake leaves")
    await hass.async_block_till_done()
    assert await _todo_uids(hass, "todo.household") == [item.uid]

    await _svc(hass, "update_item", {"uid": item.uid, "parent": "garden"})
    await hass.async_block_till_done()
    assert await _todo_uids(hass, "todo.household") == []
    assert await _todo_uids(hass, "todo.garden") == [item.uid]


async def test_unknown_person_rejected(hass, entry):
    hass.states.async_set("sensor.karel", "on")
    for assignee in ("person.nobody", "sensor.karel"):
        with pytest.raises(ServiceValidationError) as err:
            await _svc(hass, "create_item", {"summary": "x", "assignee": assignee})
        assert err.value.translation_key == "unknown_person"
    assert entry.runtime_data.items == {}


async def test_unknown_uid_and_parent_rejected(hass, entry):
    item = await entry.runtime_data.async_add_item("household", "x")
    cases = [
        ("create_item", {"summary": "x", "parent": "nope"}, "unknown_parent"),
        ("update_item", {"uid": item.uid, "parent": "nope"}, "unknown_parent"),
        ("update_item", {"uid": "nope", "summary": "x"}, "unknown_item"),
        ("set_status", {"uid": "nope", "status": "completed"}, "unknown_item"),
        ("delete_item", {"uid": "nope"}, "unknown_item"),
    ]
    for service, data, key in cases:
        with pytest.raises(ServiceValidationError) as err:
            await _svc(hass, service, data)
        assert err.value.translation_key == key


async def test_delete_item(hass, entry):
    store = entry.runtime_data
    item = await store.async_add_item("household", "Bins")
    await _svc(hass, "delete_item", {"uid": item.uid})
    assert store.items == {}


async def test_external_item_gets_default_metadata(hass, entry):
    await hass.services.async_call(
        TODO_DOMAIN,
        "add_item",
        {"item": "Milk"},
        target={"entity_id": "todo.household"},
        blocking=True,
    )
    item = _only(entry.runtime_data)
    assert item.priority == 2
    assert item.assignee is None
    assert dt_util.parse_datetime(item.created_at) is not None

    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.runtime_data.items[item.uid] == item


async def test_entity_status_uses_store_rule(hass, entry):
    store = entry.runtime_data
    item = await store.async_add_item("household", "Bins")
    await hass.services.async_call(
        TODO_DOMAIN,
        "update_item",
        {"item": item.uid, "status": "completed"},
        target={"entity_id": "todo.household"},
        blocking=True,
    )
    first = store.items[item.uid].completed_at
    assert first
    await hass.services.async_call(
        TODO_DOMAIN,
        "update_item",
        {"item": item.uid, "rename": "Bins!"},
        target={"entity_id": "todo.household"},
        blocking=True,
    )
    assert store.items[item.uid].completed_at == first


async def test_failing_listener_does_not_block_others(hass, entry):
    store = entry.runtime_data
    calls = []

    def boom():
        raise RuntimeError("boom")

    store.add_listener(boom)
    store.add_listener(lambda: calls.append(1))
    await store.async_add_item("household", "x")
    assert calls == [1]
