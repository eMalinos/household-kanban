"""Shared fixtures for household_kanban tests."""

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.household_kanban.const import DOMAIN


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Allow loading custom integrations in every test."""


@pytest.fixture
async def entry(hass):
    """Set up the integration and return its config entry."""
    entry = MockConfigEntry(domain=DOMAIN, title="Household Kanban")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry
