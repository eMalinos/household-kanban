# Household Kanban

A shared household board for Home Assistant. Every parent (e.g. *Household*, *Shopping*) is a `todo.*` entity owned by the integration.

## Install

1. HACS → Integrations → custom repository `eMalinos/household-kanban` (category Integration).
2. Restart Home Assistant, then Settings → Devices & services → Add integration → *Household Kanban*.

## Development

```sh
uv venv --python 3.14 .venv
uv pip install --python .venv/bin/python -r requirements_test.txt
.venv/bin/pytest
.venv/bin/ruff check .
```

Local HA for manual checks: `docker compose -f dev/docker-compose.yml up` → http://localhost:8190.
