"""Settings and parent websocket commands."""

from homeassistant.core import ServiceCall

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


async def test_settings_update_merges_and_reschedules(hass, entry, hass_ws_client):
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


async def test_settings_update_rejects_bad_time(hass, entry, hass_ws_client):
    msg = await _call(await hass_ws_client(hass), "settings/update", close_time="24:00")
    assert not msg["success"]
    assert msg["error"]["code"] == "invalid_format"
    assert "close_time" not in entry.options


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
        client, "parents/add", name="X", icon="mdi:x", color="red", collapse=False
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
        collapse=False,
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
        "collapse",
    }

    msg = await _call(client, "parents/update", parent_id="garden", color="red")
    assert msg["result"]["color"] == "red"
    assert entry.runtime_data.parents[-1].color == "red"

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
