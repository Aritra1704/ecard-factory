# eCardFactory

Internal eCard Studio for theme-driven card generation.

## Local Ports

Ports are sourced from [config/local.ports.env.example](/Users/aritrarpal/Documents/workspace_biz/ecard-factory/config/local.ports.env.example).

- `ECARDFACTORY_HOST=0.0.0.0`
- `ECARDFACTORY_PORT=8080`
- `CONTENTFORGE_HOST=0.0.0.0`
- `CONTENTFORGE_PORT=8001`
- `N8N_PORT=5678`
- `N8N_HOST_BRIDGE=host.docker.internal`

Local URLs:

- eCardFactory: `http://localhost:8080`
- ContentForge: `http://localhost:8001`
- n8n: `http://localhost:5678`

## Stage 2 UX Reset

Stage 2 moves eCardFactory away from a workflow-debug console and toward a human-controllable eCard Studio.

Core direction:

- cards are the main artifact
- Theme Factory stays in place
- generation auto-runs by default
- text, image, and final card reruns stay operator-controlled
- ports, Docker usage, and service boundaries stay unchanged

Primary routes:

- `/` Home
- `/themes` Theme Factory
- `/studio` Studio
- `/studio/{job_id}` Studio for a selected job
- `/jobs` Jobs
- `/jobs/{job_id}` Job Detail
- `/compare` Compare Lab

## Human-Controllable eCard Studio

Studio is the primary operator page.

It shows three tabs for a selected job:

1. `Text Options`
2. `Image Options`
3. `Final Cards`

Main Studio actions:

- `Use This Text`
- `Regenerate Text`
- `Generate 10 More`
- `Use This Image`
- `Regenerate Image`
- `Generate 3 More`
- `Regenerate Card`
- `Mark Favorite`
- `Archive`
- `Delete`

Job Detail still exists, but it is now secondary and audit-heavy sections are pushed lower on the page.

## Theme Factory

Theme Factory remains backed by the existing namespaced tables:

- `card_theme_catalog`
- `card_theme_schedule`
- `card_theme_overrides`

Theme buckets:

- `everyday`
- `occasion`
- `current_event`

Seeded theme keys:

- Everyday:
  - `motivation-monday`
  - `gratitude-tuesday`
  - `love-wednesday`
  - `friendship-thursday`
  - `humor-friday`
  - `family-saturday`
  - `reflection-sunday`
- Occasion:
  - `ramadan-month`
  - `holi-week`
  - `valentines-week`
  - `eid-celebration`
  - `diwali-week`
  - `friendship-day`
- Current event:
  - `india-lpg-issue`
  - `iran-war-update`
  - `gold-price-watch`
  - `india-trend-override`

## Theme Resolution Logic

`GET /api/themes/today` resolves themes in this order:

1. active override
2. active date-range schedule
3. active weekly recurring schedule
4. evergreen fallback

Default seeded schedules:

- Monday -> `motivation-monday`
- Tuesday -> `gratitude-tuesday`
- Wednesday -> `love-wednesday`
- Thursday -> `friendship-thursday`
- Friday -> `humor-friday`
- Saturday -> `family-saturday`
- Sunday -> `reflection-sunday`
- `ramadan-month`: `2026-02-18` to `2026-03-19`
- `holi-week`: `2026-03-09` to `2026-03-15`
- `valentines-week`: `2026-02-08` to `2026-02-14`
- `diwali-week`: `2026-11-08` to `2026-11-14`

No overrides are seeded active by default.

## Generate Today’s Cards

Home and Theme Factory both support `Generate Today’s Cards`.

This uses:

- `POST /api/jobs/create-daily-theme-job`

UI defaults:

- `cards_per_theme = 10`
- short, card-friendly copy
- target length around `8` to `18` words
- style defaults derived from theme tone, then normalized into Studio styles

## Generate From Theme

Manual theme run is first-class in Stage 2.

Use `Generate From Theme` from Home.

Supported operator inputs:

- theme selection
- style: `witty`, `playful`, `heartfelt`, `minimal`
- `cards_per_theme`
- optional notes

Backend route:

- `POST /api/jobs/start-from-theme`

Example:

```bash
curl -s -X POST http://localhost:8080/api/jobs/start-from-theme \
  -H 'Content-Type: application/json' \
  -d '{
    "theme_key": "holi-week",
    "copy_style": "playful",
    "target_words": 14,
    "cards_per_theme": 10,
    "notes": "manual studio run"
  }'
```

## Cards Per Theme

`cards_per_theme` is part of the current Studio-facing job start flow.

- default: `10`
- range: `1` to `50`
- configurable from:
  - Create New Card Job
  - Generate Today’s Cards
  - Generate From Theme
  - Use Today’s Theme

Current scope:

- the value is accepted, stored, and passed through
- advanced shortlist scaling by `cards_per_theme` is not part of Stage 2

## Rerun Text / Image / Card

Human-readable rerun actions map to existing backend behavior:

- `Regenerate Text` -> content generation rerun
- `Regenerate Image` -> image generation rerun
- `Regenerate Card` -> final render rerun

Relevant endpoints:

- `POST /api/jobs/{job_id}/regenerate-content`
- `POST /api/jobs/{job_id}/regenerate-image`
- `POST /api/jobs/{job_id}/render-final`
- `POST /api/jobs/{job_id}/rerun/content`
- `POST /api/jobs/{job_id}/rerun/image`
- `POST /api/jobs/{job_id}/rerun/final-render`
- `POST /api/jobs/{job_id}/rerun-stage`

`rerun-stage` body:

```json
{
  "stage": "content_generation"
}
```

Allowed stage values:

- `content_generation`
- `image_generation`
- `final_render`

## Workflow v1 vs Workflow v2

Workflow v1:

- approval-gate-first
- built around content/image/final approval hand-offs
- kept for compatibility

Workflow v2:

- Studio-first
- auto-runs text, image, and final card generation by default
- generates image options for later operator selection
- treats reruns as operator-triggered follow-up actions from Studio or the backend

Files:

- v1: [workflows/n8n/ecardfactory_workflow_v1_stable.json](/Users/aritrarpal/Documents/workspace_biz/ecard-factory/workflows/n8n/ecardfactory_workflow_v1_stable.json)
- v1 notes: [workflows/n8n/ecardfactory_workflow_v1_notes.md](/Users/aritrarpal/Documents/workspace_biz/ecard-factory/workflows/n8n/ecardfactory_workflow_v1_notes.md)
- v2: [workflows/n8n/ecardfactory_workflow_v2_stable.json](/Users/aritrarpal/Documents/workspace_biz/ecard-factory/workflows/n8n/ecardfactory_workflow_v2_stable.json)
- v2 notes: [workflows/n8n/ecardfactory_workflow_v2_notes.md](/Users/aritrarpal/Documents/workspace_biz/ecard-factory/workflows/n8n/ecardfactory_workflow_v2_notes.md)

## Storage and Asset Location

Generated files are stored outside the repository.

Required environment variables:

- `ASSET_STORAGE_BACKEND=filesystem`
- `ASSET_STORAGE_ROOT=/absolute/path/to/external/storage`
- `ASSET_PUBLIC_BASE_URL=http://localhost:8080/assets`

FastAPI serves `/assets` from `ASSET_STORAGE_ROOT`.

Example:

- Absolute path: `/Volumes/Ari_SSD_01/ecardfactory-assets/final/job_ab12cd34_final.png`
- Public URL: `http://localhost:8080/assets/final/job_ab12cd34_final.png`

## Ports and Local Run Flow Unchanged

Run sequence stays the same:

```bash
npm install
./venv/bin/alembic upgrade head
./venv/bin/python scripts/seed_themes.py
./scripts/run-contentforge.sh
./scripts/run-ecard.sh
./scripts/run-n8n.sh
```

Useful verification commands:

```bash
curl -s http://localhost:8080/api/themes/today
curl -s http://localhost:8080/api/jobs?limit=5
curl -s -X POST http://localhost:8080/api/jobs/create-daily-theme-job \
  -H 'Content-Type: application/json' \
  -d '{"cards_per_theme": 10, "copy_style": "minimal", "target_words": 14}'
```

## Current Scope

Explicitly not part of Stage 2:

- top-50 shortlist engine work
- multi-model 10-per-model expansion work
- multi-image comparison subsystem
- publishing/distribution redesign
- Compare Lab redesign
- ContentForge redesign
- port changes
- Docker topology changes
