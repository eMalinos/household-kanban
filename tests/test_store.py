"""Store tests."""

from custom_components.household_kanban.const import DEFAULT_PARENT


async def test_store_persists(hass, entry):
    store = entry.runtime_data
    item = await store.async_add_item(DEFAULT_PARENT, "Bread", priority=1)
    assert item.priority == 1
    assert item.assignee is None
    assert item.created_at
    assert item.moved == 0 and item.raised is False

    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()

    reloaded = entry.runtime_data
    assert reloaded is not store
    assert reloaded.items[item.uid] == item
    assert [p.id for p in reloaded.parents] == [DEFAULT_PARENT]
    assert hass.states.get("todo.household").state == "1"


async def test_listener_and_update(hass, entry):
    store = entry.runtime_data
    calls = []
    unsub = store.add_listener(lambda: calls.append(1))
    item = await store.async_add_item(DEFAULT_PARENT, "Bread")
    updated = await store.async_update_item(item.uid, summary="Rye bread")
    assert updated.summary == "Rye bread"
    await store.async_delete_item(item.uid)
    assert len(calls) == 3
    unsub()
    await store.async_add_item(DEFAULT_PARENT, "Eggs")
    assert len(calls) == 3
