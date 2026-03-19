# eCardFactory Final Workflow

## Purpose

eCardFactory is the only interface exposed to workflow automation (n8n) and future external systems.

- n8n never calls ContentForge directly
- ContentForge is an internal engine used only by eCardFactory
- eCardFactory owns job state, audit logs, approvals, assets, and final export status

---

## System Roles

### n8n
Owns:
- schedule triggers
- calling eCardFactory endpoints
- waiting for approval responses
- reminders / timeout handling
- notifications

Does NOT own:
- prompt building
- model selection
- judging logic
- content generation internals

### eCardFactory
Owns:
- card job lifecycle
- theme resolution / prompt preparation
- calling ContentForge
- calling ImageForge for image assets
- storing generated candidates
- storing judged winner
- approval state tracking
- image prompt creation
- image generation orchestration and local ImageForge metadata persistence
- preview/final card assembly
- export and publishing state
- full audit logging

### ContentForge
Owns:
- multi-model content generation
- model comparison
- content quality judging
- winner selection
- returning structured results to eCardFactory

### ImageForge
Owns:
- reusable image asset generation
- provider execution against local image backends such as ComfyUI
- returning candidate `public_url` and relative-path metadata

Does NOT own:
- theme business rules
- final greeting-card text composition
- final eCard layout/rendering

### Human Approver
Owns:
- content approval
- image approval
- final card approval

---

## Stage 0 Canonical Contract

Authoritative stage field:

- `canonical_stage` is the source of truth for Stage 0 workflow progression.
- `current_stage` remains a backward-compatible UI label until the old console mappings are removed.

Canonical stage order:

| canonical_stage | owner | meaning |
|---|---|---|
| `job_created` | `ecard_factory` | job payload normalized and persisted |
| `text_candidates_ready` | `human_review` | shortlist exists and text selection is required |
| `text_selected` | `ecard_factory` | selected text is locked for the current pass |
| `image_candidates_ready` | `human_review` | ImageForge candidates exist and image selection is required |
| `image_selected` | `ecard_factory` | selected image is locked for the current pass |
| `preview_ready` | `human_review` | final preview exists and export approval is required |
| `export_ready` | `ecard_factory` | final export assets exist |
| `failed` | `ecard_factory` | rejected, timed-out, or failed terminal state |

Primary Stage 0 path:

1. `POST /api/jobs/start`
2. `POST /api/jobs/{job_id}/select-text`
3. `POST /api/jobs/{job_id}/image-assets/generate`
4. `POST /api/jobs/{job_id}/image-assets/{candidate_id}/select`
5. `POST /api/jobs/{job_id}/render-final`
6. `POST /api/jobs/{job_id}/approve-final`

Secondary but supported routes:

- theme-backed start routes
- shortlist preview routes
- explicit rerun routes
- `image-assets/regenerate`
- debug, list, asset, and event inspection routes

Legacy routes kept only for compatibility:

- `/api/jobs/{job_id}/content-approval`
- `/api/jobs/{job_id}/image-approval`
- `/api/jobs/{job_id}/final-approval`
- `/api/jobs/{job_id}/approve-content`
- `/api/jobs/{job_id}/generate-image`
- `/api/jobs/{job_id}/approve-image`
- `/api/jobs/{job_id}/select-image`
- `/api/jobs/{job_id}/generate-more-images`
- `/api/jobs/{job_id}/rerun-stage`

The machine-readable source for this contract is:

- `GET /api/jobs/workflow-contract`

---

## Final Flow

### Step 1 — Schedule Trigger
Owner: n8n

- Starts the workflow on a schedule or event
- Calls eCardFactory to create a new card job

### Step 2 — Start Card Job
Owner: eCardFactory

- Creates `job_id`
- Creates initial card job record
- Logs `job_created`

### Step 3 — Resolve Theme
Owner: eCardFactory

- Determines theme, audience, tone, cultural context, output format
- Builds prompt context for ContentForge
- Logs `theme_resolved`

### Step 4 — Generate + Judge Content
Owner: eCardFactory → ContentForge

- eCardFactory calls ContentForge with prompt context and selected targets
- ContentForge generates candidates across models
- ContentForge runs judging / ranking
- Returns:
  - candidates
  - winner
  - leaderboard
  - judge summary

### Step 5 — Store Content Results
Owner: eCardFactory

- Saves candidate outputs
- Saves winner content
- Saves judge results
- Logs:
  - `contentforge_request_sent`
  - `contentforge_response_received`
  - `winner_selected`

### Step 6 — Request Content Approval
Owner: n8n using eCardFactory payload

- n8n gets approval payload from eCardFactory
- Sends approval request to approver
- Includes:
  - winner content
  - optional runner-up
  - judge reason

### Step 7 — Wait for Content Approval
Owner: n8n

- Waits for approve / reject / timeout

### Step 8 — Update Content Approval
Owner: n8n → eCardFactory

- n8n sends approval result back to eCardFactory
- eCardFactory updates job status
- Logs:
  - `content_approved`
  - `content_rejected`
  - or `content_timeout`

### Step 9 — Build ImageForge Asset Request
Owner: eCardFactory

- Creates an ImageForge asset request using approved content + eCardFactory theme data
- Supplies caller-owned `creative_direction`, `scene_spec`, and `render_spec`
- Logs `imageforge_request_created`

### Step 10 — Generate Image Assets
Owner: eCardFactory -> ImageForge

- Calls ImageForge through the dedicated client module
- Saves ImageForge request metadata and candidate metadata locally in eCardFactory
- Logs `imageforge_response_received`

### Step 11 — Request Image Approval
Owner: n8n using eCardFactory payload

- n8n gets image approval payload from eCardFactory
- Sends selected image asset preview for approval

### Step 12 — Wait for Image Approval
Owner: n8n

- Waits for approve / reject / timeout

### Step 13 — Update Image Approval
Owner: n8n → eCardFactory

- Updates approval result in eCardFactory
- Logs:
  - `image_approved`
  - `image_rejected`
  - or `image_timeout`

### Step 14 — Assemble Preview / Final Card
Owner: eCardFactory

- Combines approved text + approved image + layout template
- Creates preview card / final card asset
- Logs `preview_assembled` or `final_card_assembled`

Important:

- ImageForge generates image assets only
- eCardFactory overlays readable text during final composition
- full-card generation with embedded text is intentionally not delegated to ImageForge

### Step 15 — Request Final Approval
Owner: n8n using eCardFactory payload

- Sends final card preview for approval

### Step 16 — Wait for Final Approval
Owner: n8n

- Waits for approve / reject / timeout

### Step 17 — Update Final Approval
Owner: n8n → eCardFactory

- Updates final approval result
- Logs:
  - `final_approved`
  - `final_rejected`
  - or `final_timeout`

### Step 18 — Export / Publish
Owner: eCardFactory

- Exports final assets:
  - PNG
  - social format
  - printable version
- Updates job status to completed
- Logs:
  - `final_png_exported`
  - `job_completed`

---

## API Boundary Rule

n8n may call only eCardFactory endpoints.

n8n must never call:
- ContentForge endpoints
- model providers
- image generators directly

All internal service calls are hidden behind eCardFactory.

---

## Required eCardFactory Data Ownership

eCardFactory should store:

### card_jobs
- job_id
- status
- current_stage
- theme_name
- audience
- cultural_context
- trace_id
- created_at
- updated_at

### card_content_candidates
- job_id
- model
- backend
- content_text
- raw_score
- judge_score
- is_winner

### card_judge_results
- job_id
- judge_provider
- judge_model
- winner_model
- leaderboard_json
- pairwise_json
- reason_summary

### card_approvals
- job_id
- stage
- decision
- decided_by
- decided_at
- notes

### card_assets
- job_id
- asset_type
- asset_url
- version
- approved
- created_at

### card_audit_log
- job_id
- event_type
- event_payload_json
- created_at

---

## Audit Principle

Every significant step must create an audit event.

Minimum event list:
- job_created
- theme_resolved
- contentforge_request_sent
- contentforge_response_received
- winner_selected
- content_approval_requested
- content_approved / content_rejected / content_timeout
- image_prompt_created
- image_generated
- image_approval_requested
- image_approved / image_rejected / image_timeout
- preview_assembled
- final_approval_requested
- final_approved / final_rejected / final_timeout
- final_png_exported
- job_completed

---

## Architectural Principle

eCardFactory = product + workflow facade + audit owner  
ContentForge = internal AI engine  
n8n = scheduler / waiter / notifier

This separation must be preserved.
