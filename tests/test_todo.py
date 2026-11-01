"""To-do entity tests."""

from homeassistant.components.todo import DOMAIN as TODO_DOMAIN

ENTITY = "todo.household"


async def _call(hass, service, data):
    await hass.services.async_call(
        TODO_DOMAIN, service, data, target={"entity_id": ENTITY}, blocking=True
    )


async def _items(hass):
    resp = await hass.services.async_call(
        TODO_DOMAIN,
        "get_items",
        {},
        target={"entity_id": ENTITY},
        blocking=True,
        return_response=True,
    )
    return resp[ENTITY]["items"]


async def test_default_parent_created(hass, entry):
    state = hass.states.get(ENTITY)
    assert state is not None
    assert state.name == "Household"
    assert state.state == "0"


async def test_entity_crud(hass, entry):
    store = entry.runtime_data
    await _call(
        hass,
        "add_item",
        {"item": "Milk", "description": "2 l", "due_date": "2026-11-02"},
    )
    [item] = await _items(hass)
    assert item["summary"] == "Milk"
    assert item["description"] == "2 l"
    assert item["due"] == "2026-11-02"
    assert item["status"] == "needs_action"
    assert hass.states.get(ENTITY).state == "1"
    stored = store.items[item["uid"]]
    assert stored.priority == 2 and stored.assignee is None and stored.created_at

    await _call(
        hass,
        "update_item",
        {
            "item": item["uid"],
            "rename": "Oat milk",
            "due_datetime": "2026-11-02 10:00:00",
        },
    )
    [item] = await _items(hass)
    assert item["summary"] == "Oat milk"
    assert item["description"] == "2 l"
    assert item["due"].startswith("2026-11-02T10:00:00")

    await _call(hass, "update_item", {"item": item["uid"], "status": "completed"})
    assert store.items[item["uid"]].completed_at is not None
    assert hass.states.get(ENTITY).state == "0"

    await _call(hass, "update_item", {"item": item["uid"], "status": "needs_action"})
    assert store.items[item["uid"]].completed_at is None

    await _call(hass, "update_item", {"item": item["uid"], "due_date": None})
    [item] = await _items(hass)
    assert "due" not in item

    await _call(hass, "remove_item", {"item": [item["uid"]]})
    assert await _items(hass) == []
    assert store.items == {}


async def test_items_sorted(hass, entry):
    store = entry.runtime_data
    await store.async_add_item("household", "no due")
    await store.async_add_item("household", "low", due="2026-11-02", priority=3)
    await store.async_add_item("household", "high", due="2026-11-02", priority=1)
    await store.async_add_item("household", "older high", due="2026-11-02", priority=1)
    await store.async_add_item("household", "morning", due="2026-11-02T08:00:00+01:00")
    done = await store.async_add_item("household", "done", due="2026-11-01")
    await store.async_set_status(done.uid, "completed")
    await hass.async_block_till_done()
    assert [i["summary"] for i in await _items(hass)] == [
        "morning",
        "high",
        "older high",
        "low",
        "no due",
        "done",
    ]
