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
from homeassistant.util import dt as dt_util

from .const import (
    CONF_END_OF_DAY_MODE,
    DEFAULT_END_OF_DAY_MODE,
    DOMAIN,
    STATUS_COMPLETED,
)
from .store import item_sort_key, loaded_entry


def board(hass: HomeAssistant, entry: ConfigEntry) -> dict[str, Any]:
    """Build the contract Board (entity items only, no archive)."""
    store = entry.runtime_data
    registry = er.async_get(hass)
    parents = [
        {
            "id": p.id,
            "entity_id": registry.async_get_entity_id("todo", DOMAIN, p.id)
            or f"todo.{p.id}",
            "name": p.name,
            "icon": p.icon,
            "color": p.color,
            "collapse": p.collapse,
        }
        for p in store.parents
    ]
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
    if (entry := _entry_or_error(hass, connection, msg)) is None:
        return

    @callback
    def forward() -> None:
        connection.send_message(
            websocket_api.event_message(msg["id"], {"board": board(hass, entry)})
        )

    # ponytail: bound to this store; after an entry reload the card must resubscribe
    connection.subscriptions[msg["id"]] = entry.runtime_data.add_listener(forward)
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


@callback
def async_setup_websocket(hass: HomeAssistant) -> None:
    """Register the websocket commands."""
    websocket_api.async_register_command(hass, ws_subscribe)
    websocket_api.async_register_command(hass, ws_history)
