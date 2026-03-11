# eCardFactory – Next Stage Roadmap

Current milestone achieved:
- End-to-end card generation workflow working
- n8n orchestration functional
- Postgres persistence implemented
- Initial asset generation working

Next development stages:

---

## Stage 1 – Storage Layer

Goal:
Implement a proper asset storage system with lifecycle management.

Tasks:
- Introduce storage abstraction layer
- Support filesystem backend (external SSD)
- Configure via environment variables:
  - ASSET_STORAGE_BACKEND
  - ASSET_STORAGE_ROOT
  - ASSET_PUBLIC_BASE_URL
- Persist asset metadata in database
- Add storage health endpoint
- Implement asset cleanup support

---

## Stage 2 – Workflow Lifecycle Tracking

Goal:
Track every stage of card generation for observability and cleanup.

Tasks:
- Add stage fields to card_jobs
- Introduce card_assets table
- Introduce card_lifecycle_events table
- Record lifecycle events for:
  - generation
  - approval
  - rendering
  - storage
  - deletion

---

## Stage 3 – Job & Storage Management APIs

Goal:
Allow safe deletion and inspection of generated assets.

Endpoints to implement:

GET /api/jobs
GET /api/jobs/{job_id}
GET /api/jobs/{job_id}/assets
GET /api/jobs/{job_id}/events

DELETE /api/jobs/{job_id}

POST /api/jobs/{job_id}/archive
POST /api/storage/cleanup
GET  /api/storage/summary

Deletion must remove both:
- DB entries
- stored files

---

## Stage 4 – UI Refactor

Goal:
Replace simple HTML UI with an internal console.

Plan:
Convert frontend into a small React application.

Routes:

/               → Workflow Console
/compare        → Model Compare Lab
/jobs/:job_id   → Job Detail

Workflow Console:
- job status dashboard
- stage tracking
- asset previews
- lifecycle events
- storage usage

Compare Lab:
- model comparison tool
- prompt testing
- winner selection

---

## Stage 5 – Card Template System

Goal:
Produce visually polished greeting cards.

Tasks:
- separate preview vs final rendering
- introduce card templates
- support:
  - minimal
  - festive
  - elegant
  - playful
- export formats:
  - PNG
  - PDF

---

## Stage 6 – Platform UI (Future)

If additional products are added:
- StoryFactory
- CaptionFactory
- EbookFactory

Create a separate admin console:

content-studio-ui

This will interact with all product services through APIs.

For now, UI remains embedded in eCardFactory.