"""Websocket API tests."""

from datetime import timedelta

from homeassistant.util import dt as dt_util

from custom_components.household_kanban.const import DOMAIN


async def test_subscribe_pushes_on_change(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/subscribe"})
    msg = await client.receive_json()
    assert msg["success"] and msg["result"] is None

    msg = await client.receive_json()
    board = msg["event"]["board"]
    assert board["items"] == []
    assert board["end_of_day_mode"] == "raise"
    assert board["parents"] == [
        {
            "id": "household",
            "entity_id": "todo.household",
            "name": "Household",
            "icon": "mdi:home",
            "color": "blue",
            "collapse": False,
        }
    ]

    await hass.services.async_call(
        DOMAIN, "create_item", {"summary": "Bins", "priority": 1}, blocking=True
    )
    msg = await client.receive_json()
    [item] = msg["event"]["board"]["items"]
    assert item["summary"] == "Bins" and item["priority"] == 1
    assert set(item) == {
        "uid", "parent", "summary", "description", "status", "due", "priority",
        "assignee", "created_at", "completed_at", "moved", "raised",
    }  # fmt: skip

    store = entry.runtime_data
    archived = await store.async_add_item("household", "old", status="completed")
    store.archive[archived.uid] = store.items.pop(archived.uid)
    await store.async_update_item(item["uid"], summary="Bins!")
    msg = await client.receive_json()
    msg = await client.receive_json()
    assert [i["summary"] for i in msg["event"]["board"]["items"]] == ["Bins!"]

    await client.send_json_auto_id({"type": "unsubscribe_events", "subscription": 1})
    assert (await client.receive_json())["success"]
    assert len(store._listeners) == 1  # only the entity's


async def test_history_search_and_paging(hass, entry, hass_ws_client):
    store = entry.runtime_data
    base = dt_util.utcnow()
    for n in range(25):
        name = "Mléko" if n == 3 else f"Item {n}"
        item = await store.async_add_item(
            "household",
            name,
            status="completed",
            completed_at=(base + timedelta(minutes=n)).isoformat(),
        )
        if n < 10:
            store.archive[item.uid] = store.items.pop(item.uid)
    await store.async_add_item("household", "open mléko")

    client = await hass_ws_client(hass)

    async def history(**kw):
        await client.send_json_auto_id(
            {"type": f"{DOMAIN}/history", "offset": 0, "limit": 50} | kw
        )
        msg = await client.receive_json()
        assert msg["success"], msg
        return msg["result"]

    res = await history(search="mlé")
    assert res["total"] == 1
    assert [i["summary"] for i in res["items"]] == ["Mléko"]

    res = await history(limit=10, offset=10)
    assert res["total"] == 25
    assert len(res["items"]) == 10
    assert [i["summary"] for i in res["items"]] == [
        f"Item {n}" if n != 3 else "Mléko" for n in range(14, 4, -1)
    ]

    assert (await history(parent="garden"))["total"] == 0
    assert (await history(parent="household"))["total"] == 25
