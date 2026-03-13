# eCardFactory

Internal operator console for theme-driven eCard workflows.

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

## Workflow Overview

Stage 1 keeps the existing internal workflow shape and adds operator control:

1. Create a job manually, from today's theme, or from any selected theme.
2. Review content output.
3. Approve, reject, or regenerate content.
4. Generate or regenerate the image preview.
5. Approve or reject the image stage.
6. Render the final preview.
7. Approve or reject the final stage.

Primary routes:

- `/` Workflow Console
- `/themes` Theme Factory
- `/compare` Compare Lab
- `/jobs/{job_id}` Job Detail

## Theme Buckets

Theme Factory uses the existing namespaced tables:

- `card_theme_catalog`
- `card_theme_schedule`
- `card_theme_overrides`

Stage 1 theme buckets:

- `everyday`
- `occasion`
- `current_event`

Fresh seed data includes exactly these theme keys:

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

## Theme Resolution Priority

`GET /api/themes/today` resolves themes in this order:

1. Active override
2. Active date-range schedule
3. Active weekly recurring schedule
4. Evergreen fallback

Default seeded schedules:

- Weekly recurring:
  - Monday -> `motivation-monday`
  - Tuesday -> `gratitude-tuesday`
  - Wednesday -> `love-wednesday`
  - Thursday -> `friendship-thursday`
  - Friday -> `humor-friday`
  - Saturday -> `family-saturday`
  - Sunday -> `reflection-sunday`
- Date range:
  - `ramadan-month`: `2026-02-18` to `2026-03-19`
  - `holi-week`: `2026-03-09` to `2026-03-15`
  - `valentines-week`: `2026-02-08` to `2026-02-14`
  - `diwali-week`: `2026-11-08` to `2026-11-14`

No overrides are seeded active by default.

## Cards Per Theme

Stage 1 adds `cards_per_theme` to workflow jobs.

- default: `10`
- allowed range: `1` to `50`
- configurable from:
  - Create New Card Job
  - Use Today's Theme
  - Generate From Theme

Current scope for `cards_per_theme`:

- the value is accepted, stored, and passed through job creation
- Stage 1 does not change the generation engine based on this value yet

## Manual Theme Run

Operator actions added in Stage 1:

- `Use Today's Theme`
- `Generate From Theme`

Theme-backed job APIs:

- `POST /api/jobs/create-daily-theme-job`
- `POST /api/jobs/start-from-theme`

Example manual theme run:

```bash
curl -s -X POST http://localhost:8080/api/jobs/start-from-theme \
  -H 'Content-Type: application/json' \
  -d '{
    "theme_key": "holi-week",
    "cards_per_theme": 10,
    "notes": "manual run from theme factory"
  }'
```

Create a job from today's resolved theme:

```bash
curl -s -X POST http://localhost:8080/api/jobs/create-daily-theme-job \
  -H 'Content-Type: application/json' \
  -d '{
    "cards_per_theme": 10,
    "notes": "operator-triggered daily run"
  }'
```

Verify today's theme:

```bash
curl -s http://localhost:8080/api/themes/today
```

## Stage Control

Stage 1 adds these exact operator endpoints:

- `POST /api/jobs/{job_id}/approve-content`
- `POST /api/jobs/{job_id}/reject-content`
- `POST /api/jobs/{job_id}/regenerate-content`
- `POST /api/jobs/{job_id}/generate-image`
- `POST /api/jobs/{job_id}/regenerate-image`
- `POST /api/jobs/{job_id}/approve-image`
- `POST /api/jobs/{job_id}/reject-image`
- `POST /api/jobs/{job_id}/render-final`
- `POST /api/jobs/{job_id}/approve-final`
- `POST /api/jobs/{job_id}/reject-final`
- `POST /api/jobs/{job_id}/rerun-stage`

`rerun-stage` request body:

```json
{
  "stage": "content_generation"
}
```

Allowed `stage` values:

- `content_generation`
- `image_generation`
- `final_render`

Jobs also track:

- `retry_count`
- `last_stage_started_at`
- `last_stage_finished_at`
- `last_error_message`

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

## Current Scope

Stage 1 scope is intentionally limited.

Not part of this stage:

- multi-model 10-per-model shortlist engine work
- multi-image candidate selection
- publishing/distribution workflow expansion
- Compare Lab redesign
- ContentForge redesign
- n8n workflow redesign

## Local Commands

Install frontend dependencies once:

```bash
npm install
```

Apply migrations:

```bash
./venv/bin/alembic upgrade head
```

Reset and reseed Theme Factory data:

```bash
./venv/bin/python scripts/seed_themes.py
```

Run eCardFactory:

```bash
./scripts/run-ecard.sh
```

Run ContentForge:

```bash
./scripts/run-contentforge.sh
```

Run n8n:

```bash
./scripts/run-n8n.sh
```
