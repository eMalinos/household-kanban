"""Pure end-of-day and archive rules."""

from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.household_kanban.rollover import archive_due, close_day
from custom_components.household_kanban.store import ItemData

PRAGUE = ZoneInfo("Europe/Prague")
NOW = datetime(2026, 11, 1, 23, 59, tzinfo=PRAGUE)
DAY = date(2026, 11, 1)


def _item(uid, **kw):
    return ItemData(uid=uid, parent="household", summary=uid, **kw)


def test_keep_and_overdue_change_nothing():
    items = [_item("a", due="2026-10-31"), _item("b", due="2026-11-01T10:00:00+01:00")]
    for mode in ("keep", "overdue"):
        result = close_day(items, DAY, mode, NOW)
        assert result.changes == {}
        assert result.affected == ["a", "b"]
        assert result.run_id


def test_move_shifts_one_day_keeps_time():
    items = [
        _item("dt", due="2026-11-01T10:00:00+01:00", priority=3),
        _item("d", due="2026-11-01", moved=2),
    ]
    result = close_day(items, DAY, "move", NOW)
    assert result.changes == {
        "dt": {"due": "2026-11-02T10:00:00+01:00", "moved": 1},
        "d": {"due": "2026-11-02", "moved": 3},
    }


def test_move_older_overdue_lands_on_next_day():
    result = close_day([_item("a", due="2026-10-28")], DAY, "move", NOW)
    assert result.changes == {"a": {"due": "2026-11-02", "moved": 1}}


def test_raise_steps_priority():
    items = [
        _item("low", due="2026-11-01", priority=3),
        _item("high", due="2026-11-01", priority=1),
    ]
    result = close_day(items, DAY, "raise", NOW)
    assert result.changes == {"low": {"priority": 2, "raised": True}}
    assert result.affected == ["low", "high"]


def test_items_without_due_untouched():
    items = [_item("none"), _item("future", due="2026-11-02")]
    for mode in ("move", "raise"):
        result = close_day(items, DAY, mode, NOW)
        assert result.changes == {} and result.affected == []


def test_completed_untouched():
    items = [_item("done", due="2026-11-01", status="completed", priority=3)]
    result = close_day(items, DAY, "raise", NOW)
    assert result.changes == {} and result.affected == []


def test_close_day_keeps_local_time_across_dst():
    now = datetime(2026, 10, 24, 23, 59, tzinfo=PRAGUE)
    item = _item("a", due="2026-10-24T10:00:00+02:00")
    result = close_day([item], date(2026, 10, 24), "move", now)
    assert result.changes["a"]["due"] == "2026-10-25T10:00:00+01:00"


def test_close_day_uses_local_date_of_due():
    # 23:30 UTC on 10-31 is 00:30 on 11-01 in Prague: due on the closed day.
    item = _item("a", due="2026-10-31T23:30:00+00:00")
    result = close_day([item], DAY, "move", NOW)
    assert result.changes["a"]["due"] == "2026-11-02T00:30:00+01:00"


def test_archive_after_30_days():
    def done(uid, days):
        return _item(
            uid,
            status="completed",
            completed_at=(NOW - timedelta(days=days)).isoformat(),
        )

    items = [done("old", 31), done("new", 29), _item("open")]
    assert archive_due(items, NOW) == ["old"]


def test_move_into_spring_forward_gap_gets_valid_offset():
    # 2027-03-28 02:00-03:00 does not exist in Prague.
    now = datetime(2027, 3, 27, 23, 59, tzinfo=PRAGUE)
    item = _item("a", due="2027-03-27T02:30:00+01:00")
    result = close_day([item], date(2027, 3, 27), "move", now)
    assert result.changes["a"]["due"] == "2027-03-28T03:30:00+02:00"
