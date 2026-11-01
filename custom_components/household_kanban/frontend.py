"""Serve the Lovelace card bundle and load it in every dashboard."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.frontend import add_extra_js_url
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import DOMAIN

CARD_URL = f"/{DOMAIN}/household-kanban-card.js"
CARD_FILE = Path(__file__).parent / "frontend" / "household-kanban-card.js"


async def async_register_card(hass: HomeAssistant) -> None:
    """Register the static path and the extra JS URL."""
    await hass.http.async_register_static_paths(
        [StaticPathConfig(CARD_URL, str(CARD_FILE), cache_headers=False)]
    )
    add_extra_js_url(hass, CARD_URL)
