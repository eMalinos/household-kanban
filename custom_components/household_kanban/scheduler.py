"""End-of-day timer: closes every due day once, archives, fires the event."""

from __future__ import annotations

from dataclasses import asdict
from datetime import date, datetime, time, timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import CALLBACK_TYPE, Event, HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_change
from homeassistant.util import dt as dt_util

from .const import (
    CONF_CLOSE_TIME,
    CONF_END_OF_DAY_MODE,
    CONF_NOTIFY_TIME,
    DEFAULT_CLOSE_TIME,
    DEFAULT_END_OF_DAY_MODE,
    DEFAULT_NOTIFY_TIME,
    EVENT_DAY_CLOSED,
    SIGNAL_BOARD_CHANGED,
)
from .notify import async_handle_action, async_send_latest
from .rollover import archive_due, close_day
from .store import RunSummary

EVENT_ITEM_KEYS = ("uid", "summary", "parent", "assignee", "priority", "due")


def _close_time(entry: ConfigEntry) -> time:
    return time.fromisoformat(entry.options.get(CONF_CLOSE_TIME, DEFAULT_CLOSE_TIME))


def _notify_time(entry: ConfigEntry) -> time:
    return time.fromisoformat(entry.options.get(CONF_NOTIFY_TIME, DEFAULT_NOTIFY_TIME))


def last_due_day(now: datetime, close: time) -> date:
    """The most recent day whose close moment has passed (local time).

    A close time before 12:00 belongs to the previous calendar day (01:00 on
    11-02 closes 11-01); from 12:00 on it closes the current day.
    """
    day = now.date() if now.time() >= close else now.date() - timedelta(days=1)
    return day - timedelta(days=1) if close < time(12) else day


async def async_close_due(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Close each day after last_close up to the last due one, in date order.

    Idempotent: a day is closed only when it is after last_close, so a startup
    catch-up, a timer tick and a repeated wall-clock time (DST) never close
    the same day twice. A first install only records the last due day.
    """
    store = entry.runtime_data
    now = dt_util.now()
    due = last_due_day(now, _close_time(entry))
    if store.last_close is None:
        await store.async_set_last_close(due)
        return
    mode = entry.options.get(CONF_END_OF_DAY_MODE, DEFAULT_END_OF_DAY_MODE)
    # last_close is re-read and advanced with no await in between: no double run.
    while store.last_close < due:
        day = store.last_close + timedelta(days=1)
        result = close_day(store.items.values(), day, mode, now)
        # Event items show the values after the close (e.g. the moved due).
        items = []
        for uid in result.affected:
            fields = asdict(store.items[uid]) | result.changes.get(uid, {})
            items.append({k: fields[k] for k in EVENT_ITEM_KEYS})
        await store.async_close_day(
            RunSummary(result.run_id, day, mode, items), result.changes
        )
        hass.bus.async_fire(
            EVENT_DAY_CLOSED,
            {
                "run_id": result.run_id,
                "day": day.isoformat(),
                "mode": mode,
                "items": [dict(i) for i in items],  # not the persisted run's dicts
            },
        )
    if archived := archive_due(store.items.values(), now):
        await store.async_archive(archived)


async def async_setup_scheduler(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Catch up missed work, arm the daily timers; re-arm on options change."""
    unsubs: list[CALLBACK_TYPE] = []

    async def close_tick(_now: datetime) -> None:
        await async_close_due(hass, entry)

    async def notify_tick(_now: datetime | None = None) -> None:
        await async_close_due(hass, entry)  # a notify time equal to close time
        await async_send_latest(hass, entry)

    async def catch_up_notify() -> None:
        # A notify time that passed while HA was down (or was just changed).
        # Only when the latest unsent run closed before the last notify moment.
        unsent = [r for r in entry.runtime_data.runs.values() if not r.notified]
        if not unsent:
            return
        now, notify, close = dt_util.now(), _notify_time(entry), _close_time(entry)
        tz = dt_util.get_default_time_zone()
        last_notify = datetime.combine(now.date(), notify, tzinfo=tz)
        if last_notify > now:
            last_notify -= timedelta(days=1)
        closed_on = unsent[-1].day + timedelta(days=close < time(12))
        if last_notify > datetime.combine(closed_on, close, tzinfo=tz):
            await notify_tick()

    def disarm() -> None:
        while unsubs:
            unsubs.pop()()

    def arm() -> None:
        disarm()
        close, notify = _close_time(entry), _notify_time(entry)
        unsubs.append(
            async_track_time_change(
                hass, close_tick, hour=close.hour, minute=close.minute, second=0
            )
        )
        unsubs.append(
            async_track_time_change(
                hass, notify_tick, hour=notify.hour, minute=notify.minute, second=0
            )
        )

    async def options_updated(hass: HomeAssistant, entry: ConfigEntry) -> None:
        arm()
        await async_close_due(hass, entry)  # an earlier close time may be past
        await catch_up_notify()
        async_dispatcher_send(hass, SIGNAL_BOARD_CHANGED)

    async def on_action(event: Event) -> None:
        await async_handle_action(hass, entry, event)

    await async_close_due(hass, entry)
    await catch_up_notify()
    arm()
    entry.async_on_unload(disarm)
    entry.async_on_unload(entry.add_update_listener(options_updated))
    entry.async_on_unload(
        hass.bus.async_listen("mobile_app_notification_action", on_action)
    )
