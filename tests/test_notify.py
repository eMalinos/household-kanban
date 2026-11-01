"""Morning notifications: messages, phone lookup, actions, options."""

from datetime import date, datetime
from zoneinfo import ZoneInfo

import pytest
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import (
    MockConfigEntry,
    async_fire_time_changed,
    async_mock_service,
)

from custom_components.household_kanban.const import DOMAIN
from custom_components.household_kanban.notify import build_messages
from custom_components.household_kanban.store import RunSummary

PRAGUE = ZoneInfo("Europe/Prague")
KAREL, ANNA = "person.karel", "person.anna"
PHONE = "notify.mobile_app_karel_phone"
SHARED = "notify.mobile_app_shared"


def _it(uid, assignee=None, summary=None, due="2026-11-02"):
    return {
        "uid": uid,
        "summary": summary or uid,
        "parent": "household",
        "assignee": assignee,
        "priority": 2,
        "due": due,
    }


def _run(mode="move", items=()):
    return RunSummary("2026-11-01", date(2026, 11, 1), mode, list(items))


OPTS = {"notify_assignee": True, "notify_services": [SHARED]}


def test_one_summary_per_recipient():
    run = _run(items=[_it("a", KAREL), _it("b", KAREL), _it("c")])
    msgs = build_messages(run, OPTS, {KAREL: PHONE})
    assert [(m.recipient, m.services, m.uids) for m in msgs] == [
        (KAREL, [PHONE], ["a", "b"]),
        ("services", [SHARED], ["c"]),
    ]
    assert msgs[0].title == "2 tasks moved to today"
    assert msgs[1].title == "1 task moved to today"
    assert msgs[0].data["url"] == "/lovelace"
    assert msgs[0].data["clickAction"] == "/lovelace"


def test_assignee_without_phone_falls_back():
    run = _run(items=[_it("a", ANNA)])
    msgs = build_messages(run, OPTS, {})
    assert [(m.recipient, m.services, m.uids) for m in msgs] == [
        ("services", [SHARED], ["a"])
    ]


def test_notify_assignee_off_sends_all_to_services():
    run = _run(items=[_it("a", KAREL), _it("c")])
    msgs = build_messages(run, OPTS | {"notify_assignee": False}, {KAREL: PHONE})
    assert [(m.recipient, m.uids) for m in msgs] == [("services", ["a", "c"])]


@pytest.mark.parametrize(
    ("mode", "action", "title"),
    [
        ("keep", "move_today", "are overdue"),
        ("overdue", "move_today", "are overdue"),
        ("move", "done", "moved to today"),
        ("raise", "done", "are overdue"),
    ],
)
def test_actions_by_mode(mode, action, title):
    msgs = build_messages(_run(mode, [_it("a"), _it("b")]), OPTS, {})
    act = msgs[0].data["actions"]
    assert act[0] == {"action": "URI", "title": "Open tasks", "uri": "/lovelace"}
    assert act[1]["action"] == f"HOUSEHOLD_KANBAN|{action}|2026-11-01|services"
    assert (
        act[1]["title"]
        == {
            "move_today": "Move all to today",
            "done": "All done",
        }[action]
    )
    assert title in msgs[0].title


def test_single_item_action_label_and_body_cap():
    one = build_messages(_run("move", [_it("a")]), OPTS, {})[0]
    assert one.data["actions"][1]["title"] == "Done"
    many = build_messages(_run("move", [_it(f"i{n}") for n in range(8)]), OPTS, {})[0]
    assert many.message == "i0, i1, i2, i3, i4, +3 more"


def test_czech_title():
    msg = build_messages(_run("move", [_it("a"), _it("b")]), OPTS, {}, "cs")[0]
    assert msg.title == "2 úkoly přesunuty na dnes"
    many = build_messages(
        _run("move", [_it(f"i{n}") for n in range(6)]), OPTS, {}, "cs"
    )
    assert many.__class__ is list and many[0].message.endswith("+1 další")


def test_no_services_logs_warning(caplog):
    build_messages(_run(items=[_it("a", ANNA)]), {"notify_assignee": True}, {})
    assert "reach nobody" in caplog.text


def test_no_message_when_nothing_affected():
    assert build_messages(_run(items=[]), OPTS, {}) == []


# --- integration ---------------------------------------------------------


@pytest.fixture(autouse=True)
async def prague(hass):
    await hass.config.async_set_time_zone("Europe/Prague")


async def _setup(hass, hass_storage, options, runs, items=()):
    hass_storage[DOMAIN] = {
        "version": 1,
        "key": DOMAIN,
        "data": {
            "parents": [],
            "items": [
                {"uid": i, "parent": "household", "summary": i, "due": d} | extra
                for i, d, extra in items
            ],
            "archive": [],
            "last_close": "2026-11-01",
            "runs": [
                {
                    "run_id": r.run_id,
                    "day": r.day.isoformat(),
                    "mode": r.mode,
                    "items": r.items,
                    "notified": r.notified,
                    "recipients": r.recipients,
                }
                for r in runs
            ],
        },
    }
    entry = MockConfigEntry(domain=DOMAIN, title="Household Kanban", options=options)
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


def _add_phone(
    hass, person=KAREL, service="mobile_app_karel_phone", name="Karel Phone"
):
    app = MockConfigEntry(domain="mobile_app", data={"device_name": name})
    app.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=app.entry_id, identifiers={("mobile_app", name)}, name=name
    )
    er.async_get(hass).async_get_or_create(
        "device_tracker", "mobile_app", name, device_id=device.id
    )
    tracker = next(
        e.entity_id
        for e in er.async_get(hass).entities.values()
        if e.device_id == device.id
    )
    hass.states.async_set(person, "home", {"device_trackers": [tracker]})


async def test_send_at_notify_time_latest_unsent_only(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 7, 0, tzinfo=PRAGUE))
    calls = async_mock_service(hass, "notify", "mobile_app_shared")
    old = RunSummary("2026-10-31", date(2026, 10, 31), "move", [_it("o")])
    new = RunSummary("2026-11-01", date(2026, 11, 1), "move", [_it("a"), _it("b")])
    entry = await _setup(
        hass, hass_storage, OPTS | {"notify_enabled": True}, [old, new]
    )
    assert calls == []  # before notify time
    at = datetime(2026, 11, 2, 8, 0, tzinfo=PRAGUE)
    freezer.move_to(at)
    async_fire_time_changed(hass, at)
    await hass.async_block_till_done()
    assert len(calls) == 1
    assert calls[0].data["title"] == "2 tasks moved to today"
    assert calls[0].data["message"] == "a, b"
    assert all(r.notified for r in entry.runtime_data.runs.values())
    # Persisted
    assert all(r["notified"] for r in hass_storage[DOMAIN]["data"]["runs"])
    # No resend
    async_fire_time_changed(hass, at.replace(hour=8, minute=0, second=30))
    await hass.async_block_till_done()
    assert len(calls) == 1


async def test_disabled_sends_nothing_but_marks(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 9, 0, tzinfo=PRAGUE))
    calls = async_mock_service(hass, "notify", "mobile_app_shared")
    entry = await _setup(hass, hass_storage, OPTS, [_run("move", [_it("a")])])
    assert calls == []
    assert entry.runtime_data.runs["2026-11-01"].notified


async def test_startup_catch_up_after_notify_time(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 9, 0, tzinfo=PRAGUE))
    calls = async_mock_service(hass, "notify", "mobile_app_shared")
    await _setup(
        hass,
        hass_storage,
        OPTS | {"notify_enabled": True},
        [_run("move", [_it("a")])],
    )
    assert len(calls) == 1


async def test_no_message_run_marked_notified(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 9, 0, tzinfo=PRAGUE))
    calls = async_mock_service(hass, "notify", "mobile_app_shared")
    entry = await _setup(
        hass, hass_storage, OPTS | {"notify_enabled": True}, [_run("move", [])]
    )
    assert calls == []
    assert entry.runtime_data.runs["2026-11-01"].notified


async def test_phone_lookup_and_missing_service(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 9, 0, tzinfo=PRAGUE))
    karel = async_mock_service(hass, "notify", "mobile_app_karel_phone")
    shared = async_mock_service(hass, "notify", "mobile_app_shared")
    _add_phone(hass)
    # Anna has a tracker that is not a mobile_app device; Bob does not exist.
    hass.states.async_set(ANNA, "home", {"device_trackers": ["device_tracker.x"]})
    run = _run("move", [_it("a", KAREL), _it("b", ANNA), _it("c", "person.bob")])
    await _setup(
        hass,
        hass_storage,
        OPTS | {"notify_enabled": True, "notify_services": [SHARED, "notify.gone"]},
        [run],
    )
    assert [c.data["message"] for c in karel] == ["a"]
    assert [c.data["message"] for c in shared] == ["b, c"]


async def _fire_action(hass, action):
    hass.bus.async_fire("mobile_app_notification_action", {"action": action})
    await hass.async_block_till_done()


async def test_action_event_applies(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 7, 0, tzinfo=PRAGUE))
    run = RunSummary(
        "2026-11-01",
        date(2026, 11, 1),
        "move",
        [_it("a"), _it("b"), _it("c")],
        True,
        {"services": ["a", "b", "c"]},
    )
    entry = await _setup(
        hass,
        hass_storage,
        OPTS,
        [run],
        items=[
            ("a", "2026-11-02", {}),
            (
                "b",
                "2026-11-02",
                {"status": "completed", "completed_at": "2026-11-01T20:00:00+00:00"},
            ),
            ("z", "2026-11-02", {}),
        ],
    )
    store = entry.runtime_data
    await _fire_action(hass, "HOUSEHOLD_KANBAN|done|2026-11-01|services")
    assert store.items["a"].status == "completed"
    assert store.items["b"].completed_at == "2026-11-01T20:00:00+00:00"
    assert store.items["z"].status == "needs_action"


async def test_action_move_today_keeps_local_time(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 7, 0, tzinfo=PRAGUE))
    run = RunSummary(
        "2026-11-01",
        date(2026, 11, 1),
        "keep",
        [_it("a"), _it("b")],
        True,
        {"services": ["a", "b"]},
    )
    entry = await _setup(
        hass,
        hass_storage,
        OPTS,
        [run],
        items=[("a", "2026-10-30T10:00:00+01:00", {}), ("b", "2026-10-30", {})],
    )
    await _fire_action(hass, "HOUSEHOLD_KANBAN|move_today|2026-11-01|services")
    items = entry.runtime_data.items
    assert items["a"].due == "2026-11-02T10:00:00+01:00"
    assert items["b"].due == "2026-11-02"


async def test_foreign_actions_ignored(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 7, 0, tzinfo=PRAGUE))
    run = RunSummary(
        "2026-11-01", date(2026, 11, 1), "move", [_it("a")], True, {"services": ["a"]}
    )
    entry = await _setup(
        hass, hass_storage, OPTS, [run], items=[("a", "2026-11-02", {})]
    )
    for action in (
        "OTHER",
        "HOUSEHOLD_KANBAN|done|nope|services",
        "HOUSEHOLD_KANBAN|x",
        "HOUSEHOLD_KANBAN|done|2026-11-01|someone",
    ):
        await _fire_action(hass, action)
    item = entry.runtime_data.items["a"]
    assert item.status == "needs_action" and item.due == "2026-11-02"


async def test_action_uses_persisted_recipients(hass, hass_storage, freezer):
    freezer.move_to(datetime(2026, 11, 2, 9, 0, tzinfo=PRAGUE))
    async_mock_service(hass, "notify", "mobile_app_karel_phone")
    async_mock_service(hass, "notify", "mobile_app_shared")
    _add_phone(hass)
    run = _run("move", [_it("a", KAREL), _it("c")])
    entry = await _setup(
        hass,
        hass_storage,
        OPTS | {"notify_enabled": True},
        [run],
        items=[("a", "2026-11-02", {}), ("c", "2026-11-02", {})],
    )
    store = entry.runtime_data
    assert store.runs["2026-11-01"].recipients == {KAREL: ["a"], "services": ["c"]}
    assert hass_storage[DOMAIN]["data"]["runs"][0]["recipients"]["services"] == ["c"]
    hass.states.async_remove(KAREL)  # phone lookup now fails
    await _fire_action(hass, f"HOUSEHOLD_KANBAN|done|2026-11-01|{KAREL}")
    assert store.items["a"].status == "completed"
    assert store.items["c"].status == "needs_action"


async def test_no_night_catch_up_before_next_notify(hass, hass_storage, freezer):
    calls = async_mock_service(hass, "notify", "mobile_app_shared")
    freezer.move_to(datetime(2026, 11, 1, 22, 0, tzinfo=PRAGUE))
    opts = OPTS | {"notify_enabled": True, "close_time": "21:00"}
    entry = await _setup(hass, hass_storage, opts, [_run("move", [_it("a")])])
    assert calls == []
    freezer.move_to(datetime(2026, 11, 2, 9, 0, tzinfo=PRAGUE))
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert len(calls) == 1


async def test_options_service_list(hass, entry):
    async_mock_service(hass, "notify", "mobile_app_karel_phone")
    async_mock_service(hass, "notify", "persistent_notification")
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.MENU
    assert "notifications" in result["menu_options"]
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "notifications"}
    )
    assert result["type"] is FlowResultType.FORM
    schema = result["data_schema"].schema
    services = next(v for k, v in schema.items() if k == "notify_services")
    assert services.config["options"] == ["notify.mobile_app_karel_phone"]
    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            "notify_enabled": True,
            "notify_time": "07:30:00",
            "notify_assignee": False,
            "notify_services": ["notify.mobile_app_karel_phone"],
        },
    )
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options["notify_time"] == "07:30"
    assert entry.options["notify_enabled"] is True
