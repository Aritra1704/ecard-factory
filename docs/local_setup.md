# Local Setup

This project includes local-run wrappers for eCardFactory, n8n, and (optionally) ContentForge.

## Folder Layout

- `workflows/n8n/ecardfactory_workflow_v1_stable.json`
- `workflows/n8n/ecardfactory_workflow_v1_notes.md`
- `config/local.ports.env.example`
- `scripts/run-ecard.sh`
- `scripts/run-contentforge.sh`
- `scripts/run-n8n.sh`

## 1) Configure Ports

1. Copy the example file:
   `cp config/local.ports.env.example config/local.ports.env`
2. Adjust ports/hosts as needed.

## 2) Start eCardFactory

`./scripts/run-ecard.sh`

Expected URL:
- `http://localhost:8080`

Frontend build note:
- Console UI is bundled locally into `app/static/console/app.js` (no CDN React scripts).
- First-time setup:
  - `npm install`
  - `npm run build:console`
- `./scripts/run-ecard.sh` also runs `npm run build:console` automatically.

## 3) Start ContentForge (optional)

`./scripts/run-contentforge.sh`

Expected URL:
- `http://localhost:8001`

If no standalone service exists, the script prints a message and exits.

## 4) Start n8n

`./scripts/run-n8n.sh`

Expected URL:
- `http://localhost:5678`

## 5) Import Workflow

In n8n:
1. Workflows → Import from File
2. Select `workflows/n8n/ecardfactory_workflow_v1_stable.json`
3. Save
4. Open request nodes and verify API host/port in URLs
5. Execute from `Manual Trigger`

## Notes

- n8n runs in Docker and should call eCardFactory via:
  `http://host.docker.internal:8080`
- For workflow testing, keep reload disabled:
  - `ECARD_RELOAD=false`
  - `CONTENTFORGE_RELOAD=false`
- Weekly theme schedule file:
  - `config/theme_schedule.yaml`
- Theme endpoints:
  - `GET /api/themes`
  - `GET /api/themes/today`
  - `POST /api/jobs/create-daily-theme-job`
- Optional n8n cron example:
  - `workflows/n8n/ecardfactory_daily_theme_cron_example.json`

## Frontend Troubleshooting

If `/` shows only a background and no visible console:

1. Verify main page and static JS are served:
   - `curl -I http://localhost:8080/`
   - `curl -I http://localhost:8080/static/console/app.js`
2. Open browser DevTools console and check JS errors.
3. Rebuild local bundle:
   - `npm run build:console`
4. A boot fallback panel now appears with explicit runtime errors if mount/render fails.
