"""Parent management: store API and the options flow."""

from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import entity_registry as er

from custom_components.household_kanban.const import PARENT_COLORS


async def _menu(hass, entry, step, user_input=None):
    result = await hass.config_entries.options.async_init(entry.entry_id)
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": "parents"}
    )
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"next_step_id": step}
    )
    if user_input is not None:
        result = await hass.config_entries.options.async_configure(
            result["flow_id"], user_input
        )
    return result


async def test_add_parent_creates_entity(hass, entry):
    result = await _menu(
        hass,
        entry,
        "add_parent",
        {"name": "Shopping", "icon": "mdi:cart", "color": "green", "collapse": True},
    )
    assert result["type"] is FlowResultType.MENU
    await hass.async_block_till_done()
    state = hass.states.get("todo.shopping")
    assert state
    assert state.name == "Shopping"
    assert state.attributes["icon"] == "mdi:cart"
    shopping = next(p for p in entry.runtime_data.parents if p.id == "shopping")
    assert (shopping.color, shopping.collapse) == ("green", True)


async def test_duplicate_name_gets_suffix(hass, entry):
    store = entry.runtime_data
    a = await store.async_add_parent("Garden", "mdi:flower", "green", False)
    b = await store.async_add_parent("Garden", "mdi:flower", "green", False)
    assert (a.id, b.id) == ("garden", "garden_2")


async def test_rename_keeps_entity_id(hass, entry):
    store = entry.runtime_data
    await store.async_add_parent("Garden", "mdi:flower", "green", False)
    await hass.async_block_till_done()
    result = await _menu(hass, entry, "edit_parent", {"parent": "garden"})
    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {"name": "Yard", "icon": "mdi:tree", "color": "teal", "collapse": False},
    )
    assert result["type"] is FlowResultType.MENU
    await hass.async_block_till_done()
    assert hass.states.get("todo.garden").name == "Yard"
    assert hass.states.get("todo.yard") is None
    assert next(p for p in store.parents if p.id == "garden").color == "teal"


async def test_remove_moves_items_and_history(hass, entry):
    store = entry.runtime_data
    await store.async_add_parent("Garden", "mdi:flower", "green", False)
    open_ = await store.async_add_item("garden", "open")
    done = await store.async_add_item("garden", "done", status="completed")
    old = await store.async_add_item("garden", "old", status="completed")
    await store.async_archive([old.uid])
    await hass.async_block_till_done()
    assert hass.states.get("todo.garden")

    result = await _menu(
        hass, entry, "remove_parent", {"parent": "garden", "target": "household"}
    )
    assert result["type"] is FlowResultType.MENU
    await hass.async_block_till_done()

    assert [p.id for p in store.parents] == ["household"]
    assert store.items[open_.uid].parent == "household"
    assert store.items[done.uid].parent == "household"
    assert store.archive[old.uid].parent == "household"
    assert hass.states.get("todo.garden") is None
    assert er.async_get(hass).async_get("todo.garden") is None
    assert hass.states.get("todo.household").state == "1"


async def test_household_cannot_be_removed(hass, entry):
    await entry.runtime_data.async_add_parent("Garden", "mdi:flower", "green", False)
    result = await _menu(hass, entry, "remove_parent")
    schema = result["data_schema"].schema
    values = lambda key: [o["value"] for o in schema[key].config["options"]]  # noqa: E731
    assert values("parent") == ["garden"]
    assert values("target") == ["household", "garden"]
    assert next(k for k in schema if k == "target").default() == "household"


async def test_remove_with_only_household_returns_to_menu(hass, entry):
    result = await _menu(hass, entry, "remove_parent")
    assert result["type"] is FlowResultType.MENU


async def test_collapse_flag_in_board(hass, entry, hass_ws_client):
    await entry.runtime_data.async_add_parent("Garden", "mdi:flower", "green", True)
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "household_kanban/subscribe"})
    assert (await client.receive_json())["success"]
    board = (await client.receive_json())["event"]["board"]
    garden = next(p for p in board["parents"] if p["id"] == "garden")
    assert garden["collapse"] is True
    assert garden["entity_id"] == "todo.garden"
    assert garden["color"] in PARENT_COLORS
