"""Morning summary notifications: recipients, messages, action handling."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import Event, HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.util import dt as dt_util
from homeassistant.util import slugify

from .const import (
    ACTION_PREFIX,
    CONF_NOTIFY_ASSIGNEE,
    CONF_NOTIFY_ENABLED,
    CONF_NOTIFY_SERVICES,
    STATUS_COMPLETED,
)
from .store import RunSummary

_LOGGER = logging.getLogger(__name__)

URL = "/lovelace"
MAX_LISTED = 5
SERVICES_RECIPIENT = "services"  # recipient id of the selected-services message
MOVE_TODAY = "move_today"
DONE = "done"


def _en_plural(n: int) -> str:
    return "task" if n == 1 else "tasks"


def _cs_form(n: int, one: str, few: str, many: str) -> str:
    return one if n == 1 else few if n < 5 else many


# ponytail: in-code texts for en/cs; move to translation files if more languages come.
_TEXTS = {
    "en": {
        "moved": lambda n: f"{n} {_en_plural(n)} moved to today",
        "overdue": lambda n: f"{n} {_en_plural(n)} {'is' if n == 1 else 'are'} overdue",
        "more": lambda n: f"+{n} more",
        "open": "Open tasks",
        MOVE_TODAY: ("Move to today", "Move all to today"),
        DONE: ("Done", "All done"),
    },
    "cs": {
        "moved": lambda n: (
            f"{n} {_cs_form(n, 'úkol přesunut', 'úkoly přesunuty', 'úkolů přesunuto')}"
            " na dnes"
        ),
        "overdue": lambda n: (
            f"{n} {_cs_form(n, 'úkol je', 'úkoly jsou', 'úkolů je')} po termínu"
        ),
        "more": lambda n: f"+{n} {_cs_form(n, 'další', 'další', 'dalších')}",
        "open": "Otevřít úkoly",
        MOVE_TODAY: ("Přesunout na dnes", "Přesunout vše na dnes"),
        DONE: ("Hotovo", "Vše hotovo"),
    },
}


@dataclass
class Message:
    recipient: str  # person entity_id or SERVICES_RECIPIENT
    services: list[str]  # "notify.mobile_app_*"
    title: str
    message: str
    data: dict
    uids: list[str] = field(default_factory=list)


def build_messages(
    run: RunSummary,
    options: dict,
    phones: dict[str, str],
    language: str = "en",
) -> list[Message]:
    """One message per recipient; empty groups produce nothing."""
    texts = _TEXTS.get(language, _TEXTS["en"])
    selected = list(options.get(CONF_NOTIFY_SERVICES, []))
    by_person: dict[str, list[dict]] = {}
    shared: list[dict] = []
    for item in run.items:
        person = item.get("assignee")
        if options.get(CONF_NOTIFY_ASSIGNEE) and person in phones:
            by_person.setdefault(person, []).append(item)
        else:
            shared.append(item)
    groups = [(p, [phones[p]], items) for p, items in by_person.items()]
    groups.append((SERVICES_RECIPIENT, selected, shared))

    action = MOVE_TODAY if run.mode in ("keep", "overdue") else DONE
    title_key = "moved" if run.mode in ("move", "raise") else "overdue"
    messages = []
    for recipient, services, items in groups:
        if not items:
            continue
        if not services:
            _LOGGER.warning(
                "Summary for %s would reach nobody: no phone or services", recipient
            )
            continue
        names = [i["summary"] for i in items[:MAX_LISTED]]
        if len(items) > MAX_LISTED:
            names.append(texts["more"](len(items) - MAX_LISTED))
        label = texts[action][1 if len(items) > 1 else 0]
        messages.append(
            Message(
                recipient=recipient,
                services=services,
                title=texts[title_key](len(items)),
                message=", ".join(names),
                data={
                    "url": URL,  # iOS
                    "clickAction": URL,  # Android
                    "actions": [
                        {"action": "URI", "title": texts["open"], "uri": URL},
                        {
                            "action": (
                                f"{ACTION_PREFIX}|{action}|{run.run_id}|{recipient}"
                            ),
                            "title": label,
                        },
                    ],
                },
                uids=[i["uid"] for i in items],
            )
        )
    return messages


def offered_services(hass: HomeAssistant) -> list[str]:
    """Registered mobile app notify services, sorted."""
    return sorted(
        f"notify.{name}"
        for name in hass.services.async_services_for_domain("notify")
        if name.startswith("mobile_app_")
    )


def _phone_of(hass: HomeAssistant, person: str) -> str | None:
    """Return the person's mobile_app notify service, or None; never raises."""
    try:
        state = hass.states.get(person)
        if state is None:
            return None
        ent_reg, dev_reg = er.async_get(hass), dr.async_get(hass)
        for tracker in state.attributes.get("device_trackers") or []:
            reg = ent_reg.async_get(tracker)
            device = reg and reg.device_id and dev_reg.async_get(reg.device_id)
            if not device:
                continue
            for entry_id in device.config_entries:
                entry = hass.config_entries.async_get_entry(entry_id)
                if entry and entry.domain == "mobile_app":
                    name = entry.data.get("device_name") or device.name
                    service = f"mobile_app_{slugify(name)}"
                    if hass.services.has_service("notify", service):
                        return f"notify.{service}"
    except Exception:
        _LOGGER.debug("Phone lookup failed for %s", person, exc_info=True)
    return None


def _messages(hass: HomeAssistant, entry: ConfigEntry, run: RunSummary):
    people = {i["assignee"] for i in run.items if i.get("assignee")}
    phones = {p: s for p in people if (s := _phone_of(hass, p))}
    return build_messages(run, dict(entry.options), phones, hass.config.language)


async def async_send_latest(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Notify for the newest unsent run; older unsent runs are only marked."""
    store = entry.runtime_data
    unsent = [r for r in store.runs.values() if not r.notified]
    if not unsent:
        return
    for run in unsent:
        run.notified = True
    messages = (
        _messages(hass, entry, unsent[-1])
        if entry.options.get(CONF_NOTIFY_ENABLED)
        else []
    )
    # Taps act on exactly what each recipient was told about.
    unsent[-1].recipients = {m.recipient: m.uids for m in messages}
    await store.async_save_runs()
    for msg in messages:
        for service in msg.services:
            domain, _, name = service.partition(".")
            if not hass.services.has_service(domain, name):
                _LOGGER.warning("Notify service %s is gone", service)
                continue
            try:
                await hass.services.async_call(
                    domain,
                    name,
                    {"title": msg.title, "message": msg.message, "data": msg.data},
                    blocking=True,
                )
            except Exception:
                _LOGGER.exception("Sending to %s failed", service)


def _today_like(due: str | None, now: datetime) -> str:
    """Today's date; a datetime due keeps its local time."""
    if due and "T" in due and (parsed := dt_util.parse_datetime(due)):
        local = dt_util.as_local(parsed)
        return local.replace(year=now.year, month=now.month, day=now.day).isoformat()
    return now.date().isoformat()


async def async_handle_action(
    hass: HomeAssistant, entry: ConfigEntry, event: Event
) -> None:
    """Apply a notification action to its recipient's still-open items."""
    parts = str(event.data.get("action", "")).split("|")
    if len(parts) != 4 or parts[0] != ACTION_PREFIX:
        return
    _, action, run_id, recipient = parts
    store = entry.runtime_data
    run = store.runs.get(run_id)
    if run is None or action not in (MOVE_TODAY, DONE):
        return
    uids = run.recipients.get(recipient, [])
    now = dt_util.now()
    for uid in uids:
        item = store.items.get(uid)
        if item is None or item.status == STATUS_COMPLETED:
            continue
        if action == DONE:
            await store.async_set_status(uid, STATUS_COMPLETED)
        else:
            await store.async_update_item(uid, due=_today_like(item.due, now))
