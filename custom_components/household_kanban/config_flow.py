"""Config flow (a single instance with no fields) and the options menu."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    BooleanSelector,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TimeSelector,
)

from .const import (
    CONF_CLOSE_TIME,
    CONF_END_OF_DAY_MODE,
    CONF_NOTIFY_ASSIGNEE,
    CONF_NOTIFY_ENABLED,
    CONF_NOTIFY_SERVICES,
    CONF_NOTIFY_TIME,
    DEFAULT_CLOSE_TIME,
    DEFAULT_END_OF_DAY_MODE,
    DEFAULT_NOTIFY_TIME,
    DOMAIN,
    END_OF_DAY_MODES,
)


class KanbanConfigFlow(ConfigFlow, domain=DOMAIN):
    """Create the one Household Kanban entry (single_config_entry in manifest)."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> KanbanOptionsFlow:
        return KanbanOptionsFlow()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is None:
            return self.async_show_form(step_id="user")
        return self.async_create_entry(title="Household Kanban", data={})


class KanbanOptionsFlow(OptionsFlow):
    """Options as a menu; each step saves its own keys and keeps the others."""

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        return self.async_show_menu(
            step_id="init", menu_options=["end_of_day", "notifications"]
        )

    async def async_step_end_of_day(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        options = self.config_entry.options
        if user_input is not None:
            user_input[CONF_CLOSE_TIME] = user_input[CONF_CLOSE_TIME][:5]  # "HH:MM"
            return self.async_create_entry(data={**options, **user_input})
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_END_OF_DAY_MODE,
                    default=options.get(CONF_END_OF_DAY_MODE, DEFAULT_END_OF_DAY_MODE),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=END_OF_DAY_MODES,
                        mode=SelectSelectorMode.LIST,
                        translation_key=CONF_END_OF_DAY_MODE,
                    )
                ),
                vol.Required(
                    CONF_CLOSE_TIME,
                    default=options.get(CONF_CLOSE_TIME, DEFAULT_CLOSE_TIME),
                ): TimeSelector(),
            }
        )
        return self.async_show_form(step_id="end_of_day", data_schema=schema)

    async def async_step_notifications(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        options = self.config_entry.options
        if user_input is not None:
            user_input[CONF_NOTIFY_TIME] = user_input[CONF_NOTIFY_TIME][:5]  # "HH:MM"
            return self.async_create_entry(data={**options, **user_input})
        offered = sorted(
            f"notify.{name}"
            for name in self.hass.services.async_services_for_domain("notify")
            if name.startswith("mobile_app_")
        )
        schema = vol.Schema(
            {
                vol.Required(
                    CONF_NOTIFY_ENABLED, default=options.get(CONF_NOTIFY_ENABLED, False)
                ): BooleanSelector(),
                vol.Required(
                    CONF_NOTIFY_TIME,
                    default=options.get(CONF_NOTIFY_TIME, DEFAULT_NOTIFY_TIME),
                ): TimeSelector(),
                vol.Required(
                    CONF_NOTIFY_ASSIGNEE,
                    default=options.get(CONF_NOTIFY_ASSIGNEE, True),
                ): BooleanSelector(),
                vol.Required(
                    CONF_NOTIFY_SERVICES,
                    default=[
                        s for s in options.get(CONF_NOTIFY_SERVICES, []) if s in offered
                    ],
                ): SelectSelector(SelectSelectorConfig(options=offered, multiple=True)),
            }
        )
        return self.async_show_form(step_id="notifications", data_schema=schema)
