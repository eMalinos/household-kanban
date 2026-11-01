"""Services: create, update, set status and delete items."""

from __future__ import annotations

from datetime import date, datetime

import voluptuous as vol
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util

from .const import (
    DEFAULT_PARENT,
    DOMAIN,
    PRIORITY_HIGH,
    PRIORITY_LOW,
    PRIORITY_MEDIUM,
    STATUS_COMPLETED,
    STATUS_NEEDS_ACTION,
)
from .store import KanbanStore, loaded_entry

_PRIORITY = vol.All(
    vol.Coerce(int), vol.In([PRIORITY_HIGH, PRIORITY_MEDIUM, PRIORITY_LOW])
)
_OPTIONAL_STR = vol.Any(None, cv.string)
_META = {
    vol.Optional("summary"): cv.string,
    vol.Optional("description"): cv.string,
    vol.Optional("due"): _OPTIONAL_STR,
    vol.Optional("priority"): _PRIORITY,
    vol.Optional("assignee"): _OPTIONAL_STR,
    vol.Optional("parent"): cv.string,
}
CREATE_SCHEMA = vol.Schema(_META | {vol.Required("summary"): cv.string})
UPDATE_SCHEMA = vol.Schema(_META | {vol.Required("uid"): cv.string})
STATUS_SCHEMA = vol.Schema(
    {
        vol.Required("uid"): cv.string,
        vol.Required("status"): vol.In([STATUS_NEEDS_ACTION, STATUS_COMPLETED]),
    }
)
DELETE_SCHEMA = vol.Schema({vol.Required("uid"): cv.string})


def _invalid(key: str, value: str) -> ServiceValidationError:
    return ServiceValidationError(
        translation_domain=DOMAIN,
        translation_key=key,
        translation_placeholders={"value": str(value)},
    )


def normalise_due(value: str | None) -> str | None:
    """Return a date string or a local ISO datetime (naive = HA local time)."""
    if not value:  # None or "" clears the due
        return None
    try:
        if len(value) == 10:
            return date.fromisoformat(value).isoformat()
        moment = datetime.fromisoformat(value)
    except ValueError:
        raise _invalid("invalid_due", value) from None
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=dt_util.get_default_time_zone())
    return dt_util.as_local(moment).isoformat()


def _fields(hass: HomeAssistant, store: KanbanStore, data: dict) -> dict:
    """Validate parent/assignee and normalise due; return store fields."""
    fields = dict(data)
    if "parent" in fields and not any(p.id == fields["parent"] for p in store.parents):
        raise _invalid("unknown_parent", fields["parent"])
    assignee = fields.get("assignee")
    if assignee is not None and (
        not assignee.startswith("person.") or hass.states.get(assignee) is None
    ):
        raise _invalid("unknown_person", assignee)
    if "due" in fields:
        fields["due"] = normalise_due(fields["due"])
    return fields


def _store(hass: HomeAssistant) -> KanbanStore:
    return loaded_entry(hass).runtime_data


def _check_uid(store: KanbanStore, uid: str, *, archive: bool = False) -> None:
    if uid not in store.items and not (archive and uid in store.archive):
        raise _invalid("unknown_item", uid)


def async_setup_services(hass: HomeAssistant) -> None:
    """Register the integration's services."""

    async def create_item(call: ServiceCall) -> None:
        store = _store(hass)
        fields = _fields(hass, store, {"parent": DEFAULT_PARENT} | call.data)
        await store.async_add_item(
            fields.pop("parent"), fields.pop("summary"), **fields
        )

    async def update_item(call: ServiceCall) -> None:
        store = _store(hass)
        fields = _fields(hass, store, call.data)
        uid = fields.pop("uid")
        _check_uid(store, uid)
        await store.async_update_item(uid, **fields)

    async def set_status(call: ServiceCall) -> None:
        store = _store(hass)
        _check_uid(store, call.data["uid"], archive=True)
        await store.async_set_status(call.data["uid"], call.data["status"])

    async def delete_item(call: ServiceCall) -> None:
        store = _store(hass)
        _check_uid(store, call.data["uid"])
        await store.async_delete_item(call.data["uid"])

    for name, handler, schema in (
        ("create_item", create_item, CREATE_SCHEMA),
        ("update_item", update_item, UPDATE_SCHEMA),
        ("set_status", set_status, STATUS_SCHEMA),
        ("delete_item", delete_item, DELETE_SCHEMA),
    ):
        hass.services.async_register(DOMAIN, name, handler, schema)
