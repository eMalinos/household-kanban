"""Checklist format, Assist append and the parent flag."""

import asyncio

from homeassistant.components.todo import DOMAIN as TODO_DOMAIN

from custom_components.household_kanban.checklist import append, join, split
from custom_components.household_kanban.store import KanbanStore


def test_split_join_cases():
    assert split("just a note") == ("just a note", [])
    assert split("- [ ] a\n- [x] b") == ("", [(False, "a"), (True, "b")])
    assert split("note\n\n- [ ] a") == ("note", [(False, "a")])
    assert split("- [X] a")[1] == [(True, "a")]
    assert split("n\r\n\r\n- [ ] a\r\n") == ("n", [(False, "a")])
    assert split("- [ ] a\nplain") == ("- [ ] a\nplain", [])
    assert join("note", [(True, "b"), (False, "a")]) == "note\n\n- [ ] a\n- [x] b"
    assert join("", [(False, "a")]) == "- [ ] a"
    assert join("note  \n", []) == "note"


def test_round_trip_keeps_foreign_text():
    x = "intro\n- [ ] inside\n* [ ] star\n\ntail\r\n- [x] done\n- [ ] open\n\n"
    once = join(*split(x))
    for part in ("intro", "- [ ] inside", "* [ ] star", "tail"):
        assert part in once
    assert join(*split(once)) == once


def test_line_separator_stays_inside_an_item():
    assert split("- [ ] a b\n- [x] c") == ("", [(False, "a b"), (True, "c")])
    assert split("- [ ] a b")[1] == [(False, "a b")]


def test_append_before_first_checked():
    assert append("n\n\n- [ ] a\n- [x] b", "c") == "n\n\n- [ ] a\n- [ ] c\n- [x] b"


async def _add(hass, entity, item):
    await hass.services.async_call(
        TODO_DOMAIN,
        "add_item",
        {"item": item},
        target={"entity_id": entity},
        blocking=True,
    )


def _notes(store, parent):
    return [i for i in store.items.values() if i.parent == parent]


async def test_assist_add_to_checklist_parent(hass, entry):
    store = entry.runtime_data
    await store.async_add_parent("Shop", "mdi:cart", "green", True)
    await store.async_add_parent("Plain", "mdi:x", "red", False)
    await hass.async_block_till_done()

    await _add(hass, "todo.shop", "milk")
    [note] = _notes(store, "shop")
    assert (note.summary, note.description) == ("Shopping", "- [ ] milk")
    await _add(hass, "todo.shop", "bread")
    [note] = _notes(store, "shop")
    assert note.description == "- [ ] milk\n- [ ] bread"

    await _add(hass, "todo.plain", "a")
    await _add(hass, "todo.plain", "b")
    assert len(_notes(store, "plain")) == 2


async def test_concurrent_assist_adds_make_one_note(hass, entry):
    store = entry.runtime_data
    await store.async_add_parent("Shop", "mdi:cart", "green", True)
    await hass.async_block_till_done()
    await asyncio.gather(
        _add(hass, "todo.shop", "milk"), _add(hass, "todo.shop", "bread")
    )
    [note] = _notes(store, "shop")
    assert sorted(note.description.split("\n")) == ["- [ ] bread", "- [ ] milk"]


async def test_collapse_loads_as_checklist(hass, hass_storage):
    store = KanbanStore(hass)
    hass_storage[store._store.key] = {
        "version": store._store.version,
        "data": {"parents": [{"id": "x", "name": "X", "collapse": True}]},
    }
    await store.async_load()
    assert next(p for p in store.parents if p.id == "x").checklist is True


async def test_parents_add_checklist(hass, entry, hass_ws_client):
    client = await hass_ws_client(hass)
    await client.send_json(
        {
            "id": 1,
            "type": "household_kanban/parents/add",
            "name": "S",
            "icon": "mdi:cart",
            "color": "red",
            "checklist": True,
        }
    )
    assert (await client.receive_json())["success"]
    assert next(p for p in entry.runtime_data.parents if p.id == "s").checklist


async def test_assist_prefers_newest_note_with_lines(hass, entry):
    store = entry.runtime_data
    await store.async_add_parent("Shop", "mdi:cart", "green", True)
    await hass.async_block_till_done()
    old = await store.async_add_item(
        "shop", "Old", description="- [ ] eggs", created_at="2026-01-01T00:00:00+00:00"
    )
    await store.async_add_item(
        "shop", "Older plain", created_at="2025-01-01T00:00:00+00:00"
    )
    await store.async_add_item(
        "shop", "Newer plain", created_at="2026-06-01T00:00:00+00:00"
    )
    await _add(hass, "todo.shop", "milk")
    assert store.items[old.uid].description == "- [ ] eggs\n- [ ] milk"
    assert len(_notes(store, "shop")) == 3


async def test_assist_new_note_named_by_language(hass, entry):
    hass.config.language = "cs"
    store = entry.runtime_data
    await store.async_add_parent("Shop", "mdi:cart", "green", True)
    await hass.async_block_till_done()
    await _add(hass, "todo.shop", "mléko")
    [note] = _notes(store, "shop")
    assert (note.summary, note.description) == ("Nákup", "- [ ] mléko")
