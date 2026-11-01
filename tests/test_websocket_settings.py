"""Settings and parent websocket commands."""

from datetime import date, datetime
from zoneinfo import ZoneInfo

from homeassistant.core import ServiceCall
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.household_kanban.const import DOMAIN


async def _call(client, type_, **fields):
    await client.send_json_auto_id({"type": f"{DOMAIN}/{type_}", **fields})
    return await client.receive_json()


def _register(hass, name):
    async def noop(call: ServiceCall) -> None:
        return None

    hass.services.async_register("notify", name, noop)


async def test_settings_defaults(hass, entry, hass_ws_client):
    _register(hass, "mobile_app_test_phone")
    _register(hass, "other")
    msg = await _call(await hass_ws_client(hass), "settings")
    assert msg["success"]
    assert msg["result"] == {
        "end_of_day_mode": "raise",
        "close_time": "23:59",
        "notify_enabled": False,
        "notify_time": "08:00",
        "notify_assignee": True,
        "notify_services": [],
        "offered_services": ["notify.mobile_app_test_phone"],
    }


async def test_settings_update_merges_options(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    hass.config_entries.async_update_entry(entry, options={"notify_time": "07:15"})
    msg = await _call(
        client, "settings/update", end_of_day_mode="keep", close_time="22:30"
    )
    assert msg["success"]
    assert entry.options["end_of_day_mode"] == "keep"
    assert entry.options["close_time"] == "22:30"
    assert entry.options["notify_time"] == "07:15"
    again = await _call(client, "settings")
    assert again["result"] == msg["result"]


async def test_settings_update_rearms_close_timer(hass, entry, hass_ws_client, freezer):
    client = await hass_ws_client(hass)  # before the frozen clock moves
    prague = ZoneInfo("Europe/Prague")
    await hass.config.async_set_time_zone("Europe/Prague")
    freezer.move_to(datetime(2026, 11, 1, 20, 0, tzinfo=prague))
    store = entry.runtime_data
    await store.async_set_last_close(date(2026, 10, 31))
    await store.async_add_item("household", "bins", due="2026-11-01")
    uid = next(iter(store.items))

    msg = await _call(
        client, "settings/update", end_of_day_mode="move", close_time="21:00"
    )
    assert msg["success"]
    await hass.async_block_till_done()
    at = datetime(2026, 11, 1, 21, 0, tzinfo=prague)  # the old 23:59 would not fire
    freezer.move_to(at)
    async_fire_time_changed(hass, at)
    await hass.async_block_till_done()
    assert store.items[uid].due == "2026-11-02"
    assert store.last_close == date(2026, 11, 1)


async def test_settings_not_loaded(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    await hass.config_entries.async_unload(entry.entry_id)
    for type_, fields in (
        ("settings", {}),
        ("settings/update", {"close_time": "22:00"}),
        (
            "parents/add",
            {"name": "X", "icon": "mdi:x", "color": "red", "checklist": False},
        ),
        ("parents/update", {"parent_id": "household", "name": "X"}),
    ):
        msg = await _call(client, type_, **fields)
        assert msg["error"]["code"] == "not_loaded", type_


async def test_settings_update_rejects_bad_time(hass, entry, hass_ws_client):
    msg = await _call(await hass_ws_client(hass), "settings/update", close_time="24:00")
    assert not msg["success"]
    assert msg["error"]["code"] == "invalid_format"
    assert "close_time" not in entry.options


async def test_settings_update_rejects_trailing_newline(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    for field in ("notify_time", "close_time"):
        msg = await _call(client, "settings/update", **{field: "08:00\n"})
        assert msg["error"]["code"] == "invalid_format"
        assert field not in entry.options


async def test_parents_reject_blank_name(hass, entry, hass_ws_client):
    msg = await _call(await hass_ws_client(hass), "parents/add", name="   ")
    assert msg["error"]["code"] == "invalid_format"


async def test_settings_rejects_bad_service_and_mode(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    msg = await _call(client, "settings/update", notify_services=["notify.other"])
    assert msg["error"]["code"] == "invalid_format"
    msg = await _call(client, "settings/update", end_of_day_mode="nope")
    assert msg["error"]["code"] == "invalid_format"


async def test_settings_requires_admin(
    hass, entry, hass_ws_client, hass_read_only_access_token
):
    client = await hass_ws_client(hass, hass_read_only_access_token)
    assert (await _call(client, "settings"))["error"]["code"] == "unauthorized"
    msg = await _call(
        client, "parents/add", name="X", icon="mdi:x", color="red", checklist=False
    )
    assert msg["error"]["code"] == "unauthorized"


async def test_settings_keeps_unknown_service(hass, entry, hass_ws_client):
    hass.config_entries.async_update_entry(
        entry, options={"notify_services": ["notify.mobile_app_gone"]}
    )
    msg = await _call(await hass_ws_client(hass), "settings")
    assert msg["result"]["notify_services"] == ["notify.mobile_app_gone"]
    assert msg["result"]["offered_services"] == []


async def _add_garden(client):
    return await _call(
        client,
        "parents/add",
        name="Garden",
        icon="mdi:flower",
        color="green",
        checklist=False,
    )


async def test_parents_add_update_remove(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    msg = await _add_garden(client)
    assert msg["result"]["id"] == "garden"
    assert set(msg["result"]) == {
        "id",
        "entity_id",
        "name",
        "icon",
        "color",
        "checklist",
    }

    msg = await _call(client, "parents/update", parent_id="garden", color="red")
    assert msg["result"]["color"] == "red"
    assert entry.runtime_data.parents[-1].color == "red"

    msg = await _call(client, "parents/update", parent_id="garden", name="Yard")
    assert msg["result"]["name"] == "Yard"
    assert entry.runtime_data.parents[-1].name == "Yard"

    msg = await _call(client, "parents/update", parent_id="garden", checklist=True)
    assert msg["result"]["checklist"] is True
    assert entry.runtime_data.parents[-1].checklist is True
    assert entry.runtime_data.parents[-1].name == "Yard"

    msg = await _call(client, "parents/update", parent_id="nope", color="red")
    assert msg["error"]["code"] == "not_found"

    msg = await _call(client, "parents/remove", parent_id="garden", target="household")
    assert msg["success"] and msg["result"] is None
    assert [p.id for p in entry.runtime_data.parents] == ["household"]


async def test_parents_remove_default_not_allowed(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    await _add_garden(client)
    msg = await _call(client, "parents/remove", parent_id="household", target="garden")
    assert msg["error"]["code"] == "not_allowed"
    msg = await _call(client, "parents/remove", parent_id="garden", target="garden")
    assert msg["error"]["code"] == "not_allowed"
    msg = await _call(client, "parents/remove", parent_id="garden", target="ghost")
    assert msg["error"]["code"] == "not_allowed"
