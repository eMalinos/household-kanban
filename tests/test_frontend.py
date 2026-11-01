"""Card serving tests."""

from unittest.mock import patch

from custom_components.household_kanban import frontend


async def test_card_registered(hass, entry):
    """The bundle exists and both the static path and extra JS URL are wired."""
    assert frontend.CARD_FILE.is_file()
    assert frontend.CARD_URL == "/household_kanban/household-kanban-card.js"
    with patch.object(hass.http, "async_register_static_paths") as static, patch(
        "custom_components.household_kanban.frontend.add_extra_js_url"
    ) as extra:
        await frontend.async_register_card(hass)
    [[config]] = static.call_args.args
    assert config.url_path == frontend.CARD_URL
    assert config.path == str(frontend.CARD_FILE)
    extra.assert_called_once_with(hass, "/household_kanban/household-kanban-card.js")
