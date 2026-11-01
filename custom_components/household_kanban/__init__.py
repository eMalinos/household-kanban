"""Household Kanban integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from .store import KanbanStore

PLATFORMS = [Platform.TODO]

type KanbanConfigEntry = ConfigEntry[KanbanStore]


async def async_setup_entry(hass: HomeAssistant, entry: KanbanConfigEntry) -> bool:
    store = KanbanStore(hass)
    await store.async_load()
    entry.runtime_data = store
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: KanbanConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
