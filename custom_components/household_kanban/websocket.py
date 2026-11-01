"""Websocket commands: board subscription and history."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.util import dt as dt_util

from .const import (
    CONF_CLOSE_TIME,
    CONF_END_OF_DAY_MODE,
    CONF_NOTIFY_ASSIGNEE,
    CONF_NOTIFY_ENABLED,
    CONF_NOTIFY_SERVICES,
    CONF_NOTIFY_TIME,
    DEFAULT_CLOSE_TIME,
    DEFAULT_END_OF_DAY_MODE,
    DEFAULT_NOTIFY_TIME,
    DOMAIN,
    END_OF_DAY_MODES,
    PARENT_COLORS,
    SIGNAL_BOARD_CHANGED,
    STATUS_COMPLETED,
)
from .notify import offered_services
from .store import item_sort_key, loaded_entry


def _parent_dict(registry: er.EntityRegistry, p) -> dict[str, Any]:
    return {
        "id": p.id,
        "entity_id": registry.async_get_entity_id("todo", DOMAIN, p.id)
        or f"todo.{p.id}",
        "name": p.name,
        "icon": p.icon,
        "color": p.color,
        "checklist": p.checklist,
    }


def board(hass: HomeAssistant, entry: ConfigEntry) -> dict[str, Any]:
    """Build the contract Board (entity items only, no archive)."""
    store = entry.runtime_data
    registry = er.async_get(hass)
    parents = [_parent_dict(registry, p) for p in store.parents]
    items = [asdict(i) for i in sorted(store.items.values(), key=item_sort_key)]
    return {
        "parents": parents,
        "items": items,
        "end_of_day_mode": entry.options.get(
            CONF_END_OF_DAY_MODE, DEFAULT_END_OF_DAY_MODE
        ),
    }


def _entry_or_error(hass, connection, msg) -> ConfigEntry | None:
    try:
        return loaded_entry(hass)
    except ServiceValidationError:
        connection.send_error(msg["id"], "not_loaded", "Household Kanban is not loaded")
        return None


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection, msg: dict) -> None:
    """Send the board now and after every store change."""
    if _entry_or_error(hass, connection, msg) is None:
        return

    @callback
    def forward() -> None:
        # Look the entry up per event so a reloaded entry keeps pushing.
        try:
            entry = loaded_entry(hass)
        except ServiceValidationError:
            return
        connection.send_message(
            websocket_api.event_message(msg["id"], {"board": board(hass, entry)})
        )

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass, SIGNAL_BOARD_CHANGED, forward
    )
    connection.send_result(msg["id"])
    forward()


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/history",
        vol.Optional("search"): str,
        vol.Optional("parent"): str,
        vol.Required("offset"): vol.All(int, vol.Range(min=0)),
        vol.Required("limit"): vol.All(int, vol.Range(min=1, max=500)),
    }
)
@callback
def ws_history(hass: HomeAssistant, connection, msg: dict) -> None:
    """Completed items from entities and archive, newest completion first."""
    if (entry := _entry_or_error(hass, connection, msg)) is None:
        return
    store = entry.runtime_data
    search = msg.get("search", "").casefold()
    parent = msg.get("parent")
    found = [
        i
        for i in [*store.items.values(), *store.archive.values()]
        if i.status == STATUS_COMPLETED
        and (parent is None or i.parent == parent)
        and (search in i.summary.casefold() or search in i.description.casefold())
    ]
    found.sort(key=lambda i: dt_util.parse_datetime(i.completed_at), reverse=True)
    page = found[msg["offset"] : msg["offset"] + msg["limit"]]
    connection.send_result(
        msg["id"], {"items": [asdict(i) for i in page], "total": len(found)}
    )


TIME = vol.All(str, vol.Match(r"^([01]\d|2[0-3]):[0-5]\d\Z"))
SERVICE = vol.All(str, vol.Match(r"^notify\.mobile_app_.+"))
NAME = vol.All(str, vol.Strip, vol.Length(min=1))


def _settings(hass: HomeAssistant, entry: ConfigEntry) -> dict[str, Any]:
    o = entry.options
    return {
        CONF_END_OF_DAY_MODE: o.get(CONF_END_OF_DAY_MODE, DEFAULT_END_OF_DAY_MODE),
        CONF_CLOSE_TIME: o.get(CONF_CLOSE_TIME, DEFAULT_CLOSE_TIME),
        CONF_NOTIFY_ENABLED: o.get(CONF_NOTIFY_ENABLED, False),
        CONF_NOTIFY_TIME: o.get(CONF_NOTIFY_TIME, DEFAULT_NOTIFY_TIME),
        CONF_NOTIFY_ASSIGNEE: o.get(CONF_NOTIFY_ASSIGNEE, True),
        CONF_NOTIFY_SERVICES: list(o.get(CONF_NOTIFY_SERVICES, [])),
        "offered_services": offered_services(hass),
    }


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/settings"})
@websocket_api.require_admin
@callback
def ws_settings(hass: HomeAssistant, connection, msg: dict) -> None:
    """Current options with defaults filled in, plus the phones to offer."""
    if (entry := _entry_or_error(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], _settings(hass, entry))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/settings/update",
        vol.Optional(CONF_END_OF_DAY_MODE): vol.In(END_OF_DAY_MODES),
        vol.Optional(CONF_CLOSE_TIME): TIME,
        vol.Optional(CONF_NOTIFY_ENABLED): bool,
        vol.Optional(CONF_NOTIFY_TIME): TIME,
        vol.Optional(CONF_NOTIFY_ASSIGNEE): bool,
        vol.Optional(CONF_NOTIFY_SERVICES): [SERVICE],
    }
)
@websocket_api.require_admin
@callback
def ws_settings_update(hass: HomeAssistant, connection, msg: dict) -> None:
    """Merge into the options; the update listener reschedules."""
    if (entry := _entry_or_error(hass, connection, msg)) is None:
        return
    changes = {k: v for k, v in msg.items() if k not in ("id", "type")}
    hass.config_entries.async_update_entry(entry, options={**entry.options, **changes})
    connection.send_result(msg["id"], _settings(hass, entry))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/parents/add",
        vol.Required("name"): NAME,
        vol.Required("icon"): str,
        vol.Required("color"): vol.In(PARENT_COLORS),
        vol.Required("checklist"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_parents_add(hass: HomeAssistant, connection, msg: dict) -> None:
    """Add a list."""
    if (entry := _entry_or_error(hass, connection, msg)) is None:
        return
    parent = await entry.runtime_data.async_add_parent(
        msg["name"], msg["icon"], msg["color"], msg["checklist"]
    )
    connection.send_result(msg["id"], _parent_dict(er.async_get(hass), parent))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/parents/update",
        vol.Required("parent_id"): str,
        vol.Optional("name"): NAME,
        vol.Optional("icon"): str,
        vol.Optional("color"): vol.In(PARENT_COLORS),
        vol.Optional("checklist"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_parents_update(hass: HomeAssistant, connection, msg: dict) -> None:
    """Change name, icon, color or checklist flag of a list."""
    if (entry := _entry_or_error(hass, connection, msg)) is None:
        return
    store = entry.runtime_data
    if all(p.id != msg["parent_id"] for p in store.parents):
        connection.send_error(msg["id"], "not_found", "Unknown list")
        return
    fields = {k: msg[k] for k in ("name", "icon", "color", "checklist") if k in msg}
    parent = await store.async_update_parent(msg["parent_id"], **fields)
    connection.send_result(msg["id"], _parent_dict(er.async_get(hass), parent))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/parents/remove",
        vol.Required("parent_id"): str,
        vol.Required("target"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_parents_remove(hass: HomeAssistant, connection, msg: dict) -> None:
    """Remove a list, moving its items to the target list."""
    if (entry := _entry_or_error(hass, connection, msg)) is None:
        return
    try:
        await entry.runtime_data.async_remove_parent(msg["parent_id"], msg["target"])
    except ServiceValidationError:
        connection.send_error(msg["id"], "not_allowed", "Cannot remove this list")
        return
    connection.send_result(msg["id"])


@callback
def async_setup_websocket(hass: HomeAssistant) -> None:
    """Register the websocket commands."""
    for command in (
        ws_subscribe,
        ws_history,
        ws_settings,
        ws_settings_update,
        ws_parents_add,
        ws_parents_update,
        ws_parents_remove,
    ):
        websocket_api.async_register_command(hass, command)
