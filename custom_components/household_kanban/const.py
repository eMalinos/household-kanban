"""Constants for Household Kanban."""

DOMAIN = "household_kanban"
STORE_KEY = DOMAIN
STORE_VERSION = 1

DEFAULT_PARENT = "household"
DEFAULT_PARENT_NAMES = {"en": "Household", "cs": "Domácnost"}
DEFAULT_PARENT_ICON = "mdi:home"
DEFAULT_PARENT_COLOR = "blue"

PRIORITY_HIGH = 1
PRIORITY_MEDIUM = 2
PRIORITY_LOW = 3
DEFAULT_PRIORITY = PRIORITY_MEDIUM

STATUS_NEEDS_ACTION = "needs_action"
STATUS_COMPLETED = "completed"
