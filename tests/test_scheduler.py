"""End-of-day scheduler, missed closes and the options flow."""

from datetime import date, datetime
from unittest.mock import patch
from zoneinfo import ZoneInfo

import pytest
from homeassistant.data_entry_flow import FlowResultType
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_capture_events,
    async_fire_time_changed,
)

from custom_components.household_kanban import rollover
from custom_components.household_kanban.const import DOMAIN

PRAGUE = ZoneInfo("Europe/Prague")
EVENT = "household_kanban_day_closed"


def _stored(hass_storage, last_close=None, items=(), **extra):
    hass_storage[DOMAIN] = {
        "version": 1,
        "key": DOMAIN,
        "data": {"parents": [], "items": list(items), "archive": []}
        | ({"last_close": last_close} if last_close else {})
        | extra,
    }


def _item(uid, **kw):
    return {"uid": uid, "parent": "household", "summary": uid} | kw


async def _setup(hass, options=None):
    entry = MockConfigEntry(
        domain=DOMAIN, title="Household Kanban", options=options or {}
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


@pytest.fixture(autouse=True)
async def prague(hass):
    await hass.config.async_set_time_zone("Europe/Prague")


async def test_missed_close_runs_on_startup(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 23, 59, 30, tzinfo=PRAGUE))
    _stored(
        hass_storage,
        last_close="2026-10-30",
        items=[_item("bins", due="2026-10-31", priority=3)],
    )
    events = async_capture_events(hass, EVENT)
    with patch(
        "custom_components.household_kanban.scheduler.close_day",
        wraps=rollover.close_day,
    ) as spy:
        entry = await _setup(hass)
        assert [c.args[1] for c in spy.call_args_list] == [
            date(2026, 10, 31),
            date(2026, 11, 1),
        ]
        store = entry.runtime_data
        assert store.last_close == date(2026, 11, 1)
        assert store.items["bins"].priority == 1 and store.items["bins"].raised
        assert [e.data["day"] for e in events] == ["2026-10-31", "2026-11-01"]
        assert events[0].data["mode"] == "raise"
        assert events[0].data["items"] == [
            {
                "uid": "bins",
                "summary": "bins",
                "parent": "household",
                "assignee": None,
                "priority": 2,
                "due": "2026-10-31",
            }
        ]
        assert [r.day for r in store.runs.values()] == [
            date(2026, 10, 31),
            date(2026, 11, 1),
        ]

        # A restart after catching up runs nothing again.
        assert await hass.config_entries.async_reload(entry.entry_id)
        await hass.async_block_till_done()
        assert spy.call_count == 2
    assert len(events) == 2


async def test_missed_close_respects_close_time(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 23, 0, tzinfo=PRAGUE))
    _stored(hass_storage, last_close="2026-10-31")
    events = async_capture_events(hass, EVENT)
    entry = await _setup(hass)
    assert events == [] and entry.runtime_data.last_close == date(2026, 10, 31)


async def test_first_install_sets_last_close_without_running(
    hass, hass_storage, freezer
):
    freezer.move_to(datetime(2026, 11, 1, 10, 0, tzinfo=PRAGUE))
    _stored(hass_storage, items=[_item("bins", due="2026-10-20", priority=3)])
    events = async_capture_events(hass, EVENT)
    entry = await _setup(hass)
    store = entry.runtime_data
    assert events == [] and store.last_close == date(2026, 10, 31)
    assert store.items["bins"].priority == 3


async def test_close_at_close_time_and_archive(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 20, 0, tzinfo=PRAGUE))
    _stored(
        hass_storage,
        last_close="2026-10-31",
        items=[
            _item("bins", due="2026-11-01T10:00:00+01:00"),
            _item(
                "old",
                status="completed",
                completed_at="2026-09-30T10:00:00+00:00",
            ),
        ],
    )
    events = async_capture_events(hass, EVENT)
    entry = await _setup(hass, {"end_of_day_mode": "move", "close_time": "23:59"})
    store = entry.runtime_data

    at = datetime(2026, 11, 1, 23, 59, tzinfo=PRAGUE)
    freezer.move_to(at)
    async_fire_time_changed(hass, at)
    await hass.async_block_till_done()
    assert store.items["bins"].due == "2026-11-02T10:00:00+01:00"
    assert store.items["bins"].moved == 1
    assert "old" in store.archive and "old" not in store.items
    assert [e.data["day"] for e in events] == ["2026-11-01"]
    assert events[0].data["items"][0]["due"] == "2026-11-02T10:00:00+01:00"
    assert events[0].data["run_id"] in store.runs


async def test_runs_keep_last_14(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 23, 59, 30, tzinfo=PRAGUE))
    _stored(hass_storage, last_close="2026-10-01")
    entry = await _setup(hass)
    runs = entry.runtime_data.runs
    assert len(runs) == 14
    assert min(r.day for r in runs.values()) == date(2026, 10, 19)


async def test_options_end_of_day(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 20, 0, tzinfo=PRAGUE))
    _stored(
        hass_storage,
        last_close="2026-10-31",
        items=[_item("bins", due="2026-11-01", priority=3)],
    )
    events = async_capture_events(hass, EVENT)
    entry = await _setup(hass)

    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.MENU
    assert result["menu_options"] == ["end_of_day", "notifications", "parents"]
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "end_of_day"}
    )
    assert result["type"] is FlowResultType.FORM
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"end_of_day_mode": "move", "close_time": "21:00:00"}
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done()
    assert entry.options == {"end_of_day_mode": "move", "close_time": "21:00"}

    for hour in (21, 23):  # re-armed at 21:00; the old 23:59 timer is gone
        at = datetime(2026, 11, 1, hour, 59 if hour == 23 else 0, tzinfo=PRAGUE)
        freezer.move_to(at)
        async_fire_time_changed(hass, at)
        await hass.async_block_till_done()
    store = entry.runtime_data
    assert store.items["bins"].due == "2026-11-02" and store.items["bins"].moved == 1
    assert len(events) == 1 and events[0].data["mode"] == "move"


async def test_options_defaults(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 20, 0, tzinfo=PRAGUE))
    entry = await _setup(hass)
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "end_of_day"}
    )
    defaults = {str(k): k.default() for k in result["data_schema"].schema if k.default}
    assert defaults == {"end_of_day_mode": "raise", "close_time": "23:59"}


async def test_close_after_midnight_closes_previous_day(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 20, 0, tzinfo=PRAGUE))
    _stored(
        hass_storage,
        last_close="2026-10-31",
        items=[
            _item("today", due="2026-11-01"),
            _item("tomorrow", due="2026-11-02T18:00:00+01:00"),
        ],
    )
    events = async_capture_events(hass, EVENT)
    entry = await _setup(hass, {"end_of_day_mode": "move", "close_time": "01:00"})
    assert events == []

    at = datetime(2026, 11, 2, 1, 0, tzinfo=PRAGUE)
    freezer.move_to(at)
    async_fire_time_changed(hass, at)
    await hass.async_block_till_done()
    store = entry.runtime_data
    assert [e.data["day"] for e in events] == ["2026-11-01"]
    assert store.items["today"].due == "2026-11-02"
    assert store.items["tomorrow"].due == "2026-11-02T18:00:00+01:00"
    assert store.items["tomorrow"].moved == 0


async def test_catch_up_before_early_close_time(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 0, 30, tzinfo=PRAGUE))
    _stored(hass_storage, last_close="2026-10-31")
    events = async_capture_events(hass, EVENT)
    entry = await _setup(hass, {"close_time": "01:00"})
    assert events == [] and entry.runtime_data.last_close == date(2026, 10, 31)


async def test_run_and_event_items_are_separate_lists(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 1, 23, 59, 30, tzinfo=PRAGUE))
    _stored(hass_storage, last_close="2026-10-31", items=[_item("a", due="2026-11-01")])
    events = async_capture_events(hass, EVENT)
    entry = await _setup(hass)
    [run] = entry.runtime_data.runs.values()
    assert run.items == events[0].data["items"]
    assert run.items is not events[0].data["items"]
