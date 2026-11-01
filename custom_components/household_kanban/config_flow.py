"""Config flow (a single instance with no fields) and the options menu."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.config_entries import (
    ConfigEntry,
    ConfigEntryState,
    ConfigFlow,
    ConfigFlowResult,
    OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    BooleanSelector,
    IconSelector,
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
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
    DEFAULT_PARENT,
    DEFAULT_PARENT_COLOR,
    DEFAULT_PARENT_ICON,
    DOMAIN,
    END_OF_DAY_MODES,
    PARENT_COLORS,
)
from .store import KanbanStore, ParentData


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

    _parent_id: str

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        return self.async_show_menu(
            step_id="init", menu_options=["end_of_day", "notifications", "parents"]
        )

    async def async_step_parents(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Parents menu; changes apply at once, the dialog is closed to finish."""
        if self._store() is None:
            return self.async_abort(reason="entry_not_loaded")
        return self.async_show_menu(
            step_id="parents",
            menu_options=["add_parent", "edit_parent", "remove_parent"],
        )

    def _store(self) -> KanbanStore | None:
        if self.config_entry.state is not ConfigEntryState.LOADED:
            return None
        return self.config_entry.runtime_data

    @staticmethod
    def _parent_schema(
        name: str = "",
        icon: str = DEFAULT_PARENT_ICON,
        color: str = DEFAULT_PARENT_COLOR,
        collapse: bool = False,
    ) -> vol.Schema:
        return vol.Schema(
            {
                vol.Required("name", default=name): TextSelector(),
                vol.Required("icon", default=icon): IconSelector(),
                vol.Required("color", default=color): SelectSelector(
                    SelectSelectorConfig(
                        options=PARENT_COLORS,
                        mode=SelectSelectorMode.DROPDOWN,
                        translation_key="parent_color",
                    )
                ),
                vol.Required("collapse", default=collapse): BooleanSelector(),
            }
        )

    @staticmethod
    def _clean(user_input: dict[str, Any]) -> dict[str, Any]:
        return user_input | {"name": user_input["name"].strip()}

    async def async_step_add_parent(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if (store := self._store()) is None:
            return self.async_abort(reason="entry_not_loaded")
        errors = {}
        if user_input is not None:
            user_input = self._clean(user_input)
            if user_input["name"]:
                await store.async_add_parent(**user_input)
                return await self.async_step_parents()
            errors["name"] = "name_required"
        return self.async_show_form(
            step_id="add_parent", data_schema=self._parent_schema(), errors=errors
        )

    async def async_step_edit_parent(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if (store := self._store()) is None:
            return self.async_abort(reason="entry_not_loaded")
        if user_input is not None:
            self._parent_id = user_input["parent"]
            return await self.async_step_edit_parent_details()
        schema = vol.Schema(
            {vol.Required("parent"): self._parent_selector(store.parents)}
        )
        return self.async_show_form(step_id="edit_parent", data_schema=schema)

    async def async_step_edit_parent_details(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if (store := self._store()) is None:
            return self.async_abort(reason="entry_not_loaded")
        parent = next((p for p in store.parents if p.id == self._parent_id), None)
        if parent is None:  # removed in the meantime
            return await self.async_step_parents()
        errors = {}
        if user_input is not None:
            user_input = self._clean(user_input)
            if user_input["name"]:
                await store.async_update_parent(parent.id, **user_input)
                return await self.async_step_parents()
            errors["name"] = "name_required"
        return self.async_show_form(
            step_id="edit_parent_details",
            data_schema=self._parent_schema(
                parent.name, parent.icon, parent.color, parent.collapse
            ),
            errors=errors,
            description_placeholders={"parent": parent.id},
        )

    async def async_step_remove_parent(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if (store := self._store()) is None:
            return self.async_abort(reason="entry_not_loaded")
        removable = [p for p in store.parents if p.id != DEFAULT_PARENT]
        if not removable:
            return await self.async_step_parents()
        if user_input is not None:
            if user_input["parent"] != user_input["target"]:
                await store.async_remove_parent(
                    user_input["parent"], user_input["target"]
                )
                return await self.async_step_parents()
        schema = vol.Schema(
            {
                vol.Required("parent"): self._parent_selector(removable),
                vol.Required("target", default=DEFAULT_PARENT): self._parent_selector(
                    store.parents
                ),
            }
        )
        errors = {"target": "same_parent"} if user_input is not None else {}
        return self.async_show_form(
            step_id="remove_parent",
            data_schema=self.add_suggested_values_to_schema(schema, user_input),
            errors=errors,
        )

    @staticmethod
    def _parent_selector(parents: list[ParentData]) -> SelectSelector:
        return SelectSelector(
            SelectSelectorConfig(
                options=[SelectOptionDict(value=p.id, label=p.name) for p in parents],
                mode=SelectSelectorMode.DROPDOWN,
            )
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
