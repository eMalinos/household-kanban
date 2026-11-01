"""Config flow: a single instance with no fields."""

from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class KanbanConfigFlow(ConfigFlow, domain=DOMAIN):
    """Create the one Household Kanban entry (single_config_entry in manifest)."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is None:
            return self.async_show_form(step_id="user")
        return self.async_create_entry(title="Household Kanban", data={})
