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

CONF_END_OF_DAY_MODE = "end_of_day_mode"
DEFAULT_END_OF_DAY_MODE = "raise"
END_OF_DAY_MODES = ["keep", "overdue", "move", "raise"]
CONF_CLOSE_TIME = "close_time"
DEFAULT_CLOSE_TIME = "23:59"
CONF_NOTIFY_ENABLED = "notify_enabled"
CONF_NOTIFY_TIME = "notify_time"
CONF_NOTIFY_ASSIGNEE = "notify_assignee"
CONF_NOTIFY_SERVICES = "notify_services"
DEFAULT_NOTIFY_TIME = "08:00"
ACTION_PREFIX = "HOUSEHOLD_KANBAN"
EVENT_DAY_CLOSED = f"{DOMAIN}_day_closed"
RUNS_KEPT = 14
SIGNAL_BOARD_CHANGED = f"{DOMAIN}_board_changed"
PARENT_COLORS = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "cyan",
    "blue",
    "indigo",
    "purple",
    "pink",
    "brown",
    "grey",
]
