# eCardFactory

Internal workflow console for theme-driven eCard generation, stage approvals, reruns, and shortlist-based card rendering.

## Local Ports

Ports are sourced from [config/local.ports.env.example](/Users/aritrarpal/Documents/workspace_biz/ecard-factory/config/local.ports.env.example).

- `ECARD_HOST_BIND=0.0.0.0`
- `ECARD_PORT=8080`
- `CONTENTFORGE_HOST_BIND=0.0.0.0`
- `CONTENTFORGE_PORT=8001`
- `N8N_PORT=5678`
- `ECARD_BASE_URL=http://host.docker.internal:8080`

Typical local URLs:

- eCardFactory: `http://localhost:8080`
- ContentForge: `http://localhost:8001`
- n8n: `http://localhost:5678`

## Workflow Overview

The internal app runs a staged workflow:

1. Create a job from a manual theme or from the resolved daily theme.
2. Generate a pooled candidate set across models.
3. Judge the pooled candidates and store a ranked shortlist.
4. Approve content.
5. Generate image previews.
6. Approve image.
7. Render final output.
8. Approve final output or rerun a specific stage.

Primary UI routes:

- `/` Workflow Console
- `/themes` Theme Factory
- `/compare` Compare Lab
- `/jobs/{job_id}` Job Detail

## Theme Factory

Theme Factory uses namespaced database tables so it does not collide with the legacy daily-planning theme tables:

- `card_theme_catalog`
- `card_theme_schedule`
- `card_theme_overrides`

Theme buckets used by the UI and API:

- `everyday`
- `special`
- `current_event`

Seed themes included by the local seed command:

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
- Current event:
  - `india-trend-override`

## Theme Resolution Logic

`GET /api/themes/today` resolves themes in this order:

1. Active override from `card_theme_overrides`
2. Active `single_day` or `date_range` schedule from `card_theme_schedule`
3. Active `weekly_recurring` schedule
4. Evergreen fallback from `card_theme_catalog`

This keeps editorial overrides and special campaigns above weekday defaults while still guaranteeing an everyday fallback when no campaign is active.

## Storage and Asset Location

Generated assets are stored outside the repository.

Required environment variables:

- `ASSET_STORAGE_BACKEND=filesystem`
- `ASSET_STORAGE_ROOT=/absolute/path/to/external/storage`
- `ASSET_PUBLIC_BASE_URL=http://localhost:8080/assets`

FastAPI serves generated files from `/assets`, mounted against `ASSET_STORAGE_ROOT`.

Typical physical directories under the storage root:

- `preview/`
- `image/`
- `final/`
- `pdf/`

Example:

- Absolute file path: `/Volumes/Ari_SSD_01/ecardfactory-assets/final/job_ab12cd34_final.png`
- Public URL: `http://localhost:8080/assets/final/job_ab12cd34_final.png`

## Stage Rerun Controls

Job Detail exposes stage-level reruns:

- `POST /api/jobs/{job_id}/rerun/content`
- `POST /api/jobs/{job_id}/rerun/image`
- `POST /api/jobs/{job_id}/rerun/final-render`
- `POST /api/jobs/{job_id}/rerun/full`

Tracked job metadata:

- `retry_count`
- `last_stage_started_at`
- `last_stage_finished_at`
- `last_error_message`

## Candidate Pool / Shortlist Logic

Content generation is pooled before a winner is selected:

1. Generate 10 phrases per model.
2. Merge all candidates into one pool.
3. Judge the full pool.
4. Store all candidates in `card_content_candidates`.
5. Store the ranked top 10 in `card_shortlists`.
6. Allow shortlisted phrases to be rendered into internal preview cards.

Relevant APIs:

- `GET /api/jobs/{job_id}/candidates`
- `GET /api/jobs/{job_id}/shortlist`
- `POST /api/jobs/{job_id}/render-shortlist`

## Local Run Commands

Install frontend dependencies once:

```bash
npm install
```

Run database migrations:

```bash
./venv/bin/alembic upgrade head
```

Seed Theme Factory data:

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

## Verification Commands

Verify the theme catalog:

```bash
curl -s http://localhost:8080/api/themes
```

Verify today's resolved theme:

```bash
curl -s http://localhost:8080/api/themes/today
```

Verify schedule dashboard:

```bash
curl -s http://localhost:8080/api/themes/schedule
```

Create a job using today's resolved theme:

```bash
curl -s -X POST http://localhost:8080/api/jobs/create-daily-theme-job
```

Check shortlist data for one job:

```bash
curl -s http://localhost:8080/api/jobs/<job_id>/shortlist
```

## n8n and Workflow Notes

- n8n should call eCardFactory through `http://host.docker.internal:8080`
- Compare Lab remains available at `/compare` as a secondary tool
- Theme Factory is served at `/themes`
- Generated eCard previews and shortlist renders are visible from the Workflow Console and Job Detail pages
