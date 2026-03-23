# Next Steps LLD: Stage-Wise Implementation Design

Document Version: `v0.1`
Updated: `2026-03-23`
Status: `Working Snapshot`

## 1. Purpose

This document breaks the next-step platform redesign into low-level implementation stages so work stays aligned to the current in-hand task and does not drift into broad speculative redesign.

The sequence in this LLD assumes:

- `Pillow` remains the initial card assembly engine
- the UI lives in a separate sibling repo directory
- the platform remains deterministic first, agentic later
- the eCard MVP stays the only active product app until quality is commercially usable
- local models remain the default runtime for both text and image generation

## 2. Target Repo Structure

Recommended workspace structure after the UI split:

```text
content_generation_engine/
  ecard-factory/
    app/
      ...
    docs/
      NEXT_STEPS_HLD_v0.1.md
      NEXT_STEPS_LLD_v0.1.md
      EXECUTION_PLAYBOOK_v0.1.md
  contentforge/
    ...
  imageforge/
    ...
  content_engine_ui/
    package.json
    src/
    scripts/
    dist/
```

## 3. Stage 0: Workflow Stabilization

## Goal

Make one workflow canonical before the UI split or agentic expansion.

## Scope

- keep only one primary image path
- formalize job stage transitions
- make final preview/export deterministic
- preserve current service boundaries

## Backend changes

- define canonical states for:
  - job created
  - text candidates ready
  - text selected
  - image candidates ready
  - image selected
  - preview ready
  - export ready
  - failed
- mark legacy or side-path endpoints as secondary
- remove silent production fallback behavior
- ensure stage-local reruns only

## Deliverables

- explicit workflow-state contract
- endpoint inventory with canonical versus legacy labels
- stage transition validation

## Estimate

- `3-5 working days`

## Exit criteria

- no ambiguity in the main 1-job flow
- one accepted path from start to export

## 4. Stage 1: Content Stage Redesign

## Goal

Make text output reliable enough to trust downstream automation.

## Service owner

`contentforge`

## Required capabilities

- candidate generation
- duplicate filtering
- incomplete-output rejection
- structured ranking score
- shortlist reasons
- shared request fields for `app_id`, `content_type`, and `creative_brief`
- prompt-pack routing for:
  - `romantic_witty`
  - `festival_warm`
  - `festival_respectful`
  - `playful_modern`
  - `minimal_heartfelt`
- golden-set regression briefs for quality tuning

## Proposed response contract

```json
{
  "request_id": "txt_req_001",
  "candidates": [
    {
      "candidate_id": "txt_01",
      "text": "Warm anniversary wishes...",
      "quality_score": 8.8,
      "reason_codes": ["complete", "non_duplicate", "tone_match"],
      "is_shortlisted": true
    }
  ],
  "shortlist_ids": ["txt_01", "txt_02", "txt_03"],
  "recommended_candidate_id": "txt_01"
}
```

## eCardFactory integration changes

- persist full candidate pool
- persist shortlist separately
- persist selected text explicitly
- treat ContentForge ranking as primary truth

## Estimate

- `2-3 working days`

## Exit criteria

- no incomplete text shown in Studio
- duplicate rate becomes measurably low
- shortlist reasons are visible in UI
- tone pack and model source are visible in debug metadata

## 5. Stage 2: Image Stage Redesign

## Goal

Make ImageForge the only primary image generation path.

## Service owner

`imageforge`

## Required capabilities

- candidate generation
- image relevance metadata
- low-quality output filtering
- ranking of candidates
- selected image persistence
- illustration-first asset contract with `asset_role`
- preset workflows:
  - `ecard_spot_illustration_v1`
  - `ecard_soft_background_v1`

## Proposed response contract

```json
{
  "request_id": "img_req_001",
  "asset_role": "spot_illustration",
  "candidates": [
    {
      "candidate_id": "img_01",
      "public_url": "http://...",
      "quality_score": 8.4,
      "relevance_score": 8.9,
      "reason_codes": ["subject_match", "clean_composition", "text_safe_background"]
    }
  ],
  "recommended_candidate_id": "img_01"
}
```

## eCardFactory integration changes

- mirror only the metadata needed for Studio and final render
- treat ImageForge as the image generation source of truth
- store selected image separately from transient candidates
- default eCard requests to `spot_illustration`, not `background_full`

## Estimate

- `2-3 working days`

## Exit criteria

- no backend ambiguity about image-generation ownership
- image selection is visible and understandable in UI

## Current implementation status

As of `2026-03-22`:

- deterministic `quality_score`, `relevance_score`, `reason_codes`, and `recommended_candidate_id` are implemented in `imageforge`
- `ecard-factory` persists and mirrors ImageForge rank/recommendation metadata for Studio and final render
- `content_engine_ui` displays recommendation badges, scores, and reason codes
- illustration-first request mapping is implemented with `asset_role=spot_illustration`
- `ecard_spot_illustration_v1` is the canonical eCard preset and `ecard_soft_background_v1` exists as the soft-background fallback
- local automated verification is green across `ecard-factory`, `imageforge`, and `content_engine_ui`
- live local-stack validation passed on `2026-03-22`:
  - async kickoff returned the expected queued payload
  - shortlist remained manually selectable
  - `/image-assets/generate` returned ranked candidates with `recommended_candidate_id`, `quality_score`, `relevance_score`, and `reason_codes`
  - no image was auto-selected
  - select image -> render final -> approve final completed successfully through `export_ready`
- legacy `/generate-image`-style routes still exist for compatibility, but `/image-assets/*` is the canonical image path
- Stage 2 should be treated as mechanically working, not creatively finished

## 6. Stage 2A: Async Job Kickoff And Background Orchestration

## Goal

Make job creation immediate and move initial content generation into a background worker.

## Service owner

`ecard-factory`

## Required capabilities

- async kickoff endpoints:
  - `/api/jobs/start-async`
  - `/api/jobs/start-from-theme-async`
  - `/api/jobs/create-daily-theme-job-async`
- separate processing-state model:
  - `queued`
  - `running`
  - `failed`
  - `idle`
- background worker loop started from FastAPI lifespan
- queued-job claim and stale-job recovery
- Studio progress banners and faster polling while processing

## Processing-state contract

```json
{
  "job_id": "job_001",
  "status": "content_generation_queued",
  "canonical_stage": "job_created",
  "current_stage": "job_created",
  "processing_state": "queued",
  "processing_task": "content_generation",
  "processing_message": "Content creation queued"
}
```

## Recovery rules

- queued jobs are claimed oldest-first
- running jobs use a lease window
- expired running jobs are requeued on startup
- canonical stage does not advance until candidates and shortlist actually exist

## Estimate

- `3-4 working days`

## Exit criteria

- job creation returns immediately
- Studio lands on the job page without waiting for ContentForge
- Studio shows content-generation queued/running state clearly
- shortlist appears automatically after background completion
- existing sync `/start` routes still work

## Current implementation status

As of `2026-03-22`:

- async kickoff endpoints, background worker claim/recovery, and processing-state tracking are implemented
- the worker is started from FastAPI lifespan and requeues stale content-generation jobs
- Studio uses async kickoff and polls while content generation is in progress
- local automated verification is green
- live local-stack validation passed on `2026-03-22`:
  - `POST /api/jobs/start-async` returned immediately with queued processing metadata
  - shortlist data appeared asynchronously after background completion
  - manual text selection remained required before image generation

## 6A. Execution Gate Before Stage 3

## Goal

Use one fresh session to verify the live UI and local running stack before composition work begins.

## Why this gate existed

- Stage 2 and Stage 2A needed one live validation pass from the real running stack in this workspace
- Stage 3 should not begin if the live app is still using stale routes, stale bundles, or stale backend processes

## Exact deliverable

- verify live job creation uses `POST /api/jobs/start-async`
- verify Studio lands on `/studio/{job_id}` immediately
- verify shortlist appears asynchronously without auto-selecting text
- verify image generation uses `POST /api/jobs/{job_id}/image-assets/generate`
- verify Studio shows recommended image metadata:
  - recommended badge
  - `quality`
  - `relevance`
  - `reason_codes`
- verify no image is auto-selected
- verify final render still requires manual image selection

## Required evidence

- one short written result in the next handoff:
  - pass OR fail
  - exact failing step if any
  - exact route observed in DevTools if any mismatch exists

## Exit criteria

- live async kickoff is confirmed healthy
- live canonical image path is confirmed healthy
- Stage 3 is explicitly either unblocked or held behind a concrete blocker

## Gate result

As of `2026-03-22`, this gate is closed at runtime/API level:

- live async kickoff is healthy
- live canonical image path is healthy
- manual text selection and manual image selection are both still required
- Stage 3 is unblocked

Residual note:

- direct browser DevTools capture from Studio was not recorded in this workspace; do that only if explicit browser-network evidence is still required
- legacy `/generate-image`-style routes are now frozen as compatibility-only and should be removed only in a later dedicated cleanup pass after Stage 3 stabilizes

## 7. Stage 3: Composition Stage With Pillow

## Goal

Create a proper composition layer before advanced design tooling.

## Service owner

`ecard-factory`

## Composition model

The composition layer should render from a layout spec, not from scattered ad hoc parameters.

## Proposed layout spec

```json
{
  "layout_id": "illustration_top_text_bottom",
  "canvas": {
    "width": 1080,
    "height": 1350
  },
  "background_image_url": "http://...",
  "image_blocks": [
    {
      "block_id": "hero_illustration",
      "image_url": "http://...",
      "fit": "contain"
    }
  ],
  "text_blocks": [
    {
      "type": "message",
      "x": 120,
      "y": 420,
      "w": 840,
      "h": 360,
      "font_family": "serif",
      "font_size": 52,
      "align": "center",
      "color": "#1F2937"
    }
  ],
  "theme_style": "minimal"
}
```

## Rendering responsibilities

- preview render endpoint
- final PNG export
- final PDF export
- template-safe font and spacing logic
- deterministic wrapping and truncation rules

## Estimate

- `2-4 working days`

## Exit criteria

- preview and final export match closely
- layout is versioned and reproducible

## Current implementation status

As of `2026-03-22`, Stage 3 is code-complete pending manual Studio visual acceptance:

- `WorkflowCardRenderer` builds an explicit `WorkflowCardLayoutSpec`
- final preview and final PNG/PDF export in `workflow_v1_service.py` render from the same layout spec
- the selected image is placed as an illustration block instead of becoming the implicit card background
- the supported deterministic final layouts are:
  - `illustration_top_text_bottom`
  - `text_left_illustration_right`
  - `poster_illustration_caption`
- final preview, final PNG, and final PDF asset rows persist the layout version id
- final-card rendering now includes:
  - framed art treatment
  - `cover` fit with explicit crop-focus defaults
  - role-aware font variants for title/body/signoff
  - theme-specific ornament layers
  - content-aware balancing for compact versus dense copy
- targeted regressions passed:
  - `tests/test_workflow_card_renderer.py`
  - `tests/test_imageforge_integration.py`
  - `tests/test_workflow_v1_router.py`

## Remaining Stage 3 acceptance gate

- run the manual Studio visual pass on representative themes and message lengths
- verify crop-focus, ornament density, typography hierarchy, and compact/dense balancing against real jobs
- if the pass is clean, close Stage 3 and start Stage 4
- if the pass finds a concrete issue, do only the narrow Stage 3 tuning needed to fix it

## 8. Stage 4: Quality Stage

## Goal

Add a deterministic quality layer before adding autonomous agentic refinement.

## Service owner

Initial implementation inside `ecard-factory`

## Quality checks

- text completeness
- readability against background
- text-image emotional fit
- empty-space and balance checks
- overflow and clipping checks
- export integrity checks

## Proposed quality result

```json
{
  "score": 8.9,
  "status": "pass",
  "issues": [],
  "recommended_action": "accept"
}
```

## Future integration

This quality result later becomes input to the central eCard agent.

## Estimate

- `2-3 working days`

## Exit criteria

- quality failures are explicit
- reruns can target one weak stage only

## Current implementation status

As of `2026-03-23`:

- `ecard-factory` now includes `WorkflowQualityService` for deterministic workflow scoring
- current quality output is exposed on:
  - job detail/debug responses
  - Studio action responses
  - stage action responses
- current checks cover:
  - selected text presence and basic length fit
  - shortlist-derived selected-text quality
  - selected image presence
  - final preview presence
  - final export integrity
  - layout overflow / message-panel fit
  - simple tone-versus-visual tension warnings
- the first quality UI is live in `content_engine_ui`:
  - compact quality panel in Studio final-card review
  - quality panel in Job Detail
- operator-form configuration is now DB-driven through `operator_option_catalog`
- `/api/config/options` CRUD now exists for editable dropdown values with seed fallback when DB access is unavailable
- `Create New Card Job` and Theme Factory forms now source dropdown values from the config catalog instead of hardcoded defaults
- a `Config Catalog` admin screen now exists in `content_engine_ui`
- the earlier `operations team` audience default was only a hardcoded UI placeholder and has been removed
- targeted verification is green:
  - `venv/bin/python -m pytest tests/test_operator_option_service.py tests/test_workflow_quality_service.py tests/test_models.py tests/test_workflow_v1_router.py -q`
  - result: `32 passed in 14.71s`
  - `content_engine_ui` build passed

## Remaining Stage 4 work

- run live UI verification for the new config-catalog flow
- verify Stage 4 scoring against representative weak and strong jobs
- improve actual content quality using the new score signal instead of only surfacing warnings
- add more targeted rerun/recovery guidance only if the live pass shows clear operator value

## 9. Stage 5: UI Split

## Goal

Move all active React UI code out of `ecard-factory`.

## Current UI sources

- `ecard-factory/app/static/console`
- `ecard-factory/app/templates`

## Target UI app directory

`../content_engine_ui/`

## Initial migration strategy

### Step 1

Create a standalone UI app shell:

- app entry
- routes
- API client
- shared styles

### Step 2

Migrate page by page:

- Dashboard
- Studio
- Jobs
- Job Detail
- Themes
- Compare Lab

### Step 3

Point the frontend to `ecard-factory` APIs with a configurable base URL.

### Step 4

Stop bundling the frontend from inside `ecard-factory`.

## Required UI environment settings

- API base URL
- asset base URL
- optional feature flags for experimental design features

## Estimate

- baseline split: `completed`
- remaining hardening: `1-2 working days`

## Exit criteria

- UI lives in its own directory
- backend can run without building frontend
- frontend can run without importing backend code

## Current status

Current implementation status:

- `content_engine_ui` exists as a separate sibling git repo
- standalone frontend build is working
- `ecard-factory` startup no longer requires a frontend build
- legacy embedded console remains as a temporary fallback

## 10. New UI Component Design

## 10.1 App-level structure

Pages:

- `DashboardPage`
- `StudioPage`
- `JobsPage`
- `JobDetailPage`
- `ThemesPage`
- `CompareLabPage`

Shell:

- `AppShell`
- `PrimarySidebar`
- `TopBar`
- `RouteStatusBanner`

## 10.2 Studio feature components

Workspace:

- `StudioWorkspace`
- `PreviewCanvas`
- `InspectorPanel`
- `ActivityTimeline`

Text stage:

- `TextCandidateList`
- `TextCandidateCard`
- `TextRecommendationBanner`
- `TextRefinePanel`

Image stage:

- `ImageAssetGrid`
- `ImageAssetCard`
- `ImageRecommendationBanner`
- `ImageRegeneratePanel`

Composition stage:

- `LayoutPresetPicker`
- `TextBlockInspector`
- `CanvasStyleInspector`
- `AlignmentControls`
- `ColorControls`
- `TypographyControls`

Export stage:

- `PreviewStatusCard`
- `QualityScoreCard`
- `ExportPanel`

## 10.3 Shared components

- `StatusBadge`
- `MetricCard`
- `EmptyState`
- `ErrorState`
- `LoadingState`
- `ActionButton`
- `SectionHeader`
- `FilterBar`
- `Modal`

## 11. Stage 6: Central Agent Runtime

## Goal

Add a single bounded agent after the deterministic platform is stable.

## Owner

`ecard-factory`

## Agent permissions

Allowed:

- request more text candidates
- request more image candidates
- suggest different layout preset
- suggest style adjustments
- request human review

Not allowed initially:

- direct arbitrary DB writes
- unbounded rerun loops
- deleting assets automatically
- cross-service state mutation without API contracts

## Estimate

- `3-5 working days`

## Exit criteria

- agent actions are logged and bounded
- human operator can see why actions happened

## 12. Suggested Implementation Sequence

Do the work in this order:

1. HLD approval
2. LLD approval
3. Stage 0 stabilization
4. Stage 1 content redesign
5. Stage 2 image redesign
6. Stage 2A async kickoff and background orchestration
7. Stage 2/2A live validation gate in the running UI
8. Stage 3 Pillow composition redesign
9. Stage 4 quality layer
10. Stage 5 UI split hardening for `content_engine_ui` when needed
11. Stage 6 bounded agent runtime

Implementation note:

- Stage 5 UI split baseline is already completed in the current workspace, so the remaining work is hardening only and is not a blocker for Stage 0-2 verification
- the next new session should execute Step 7 only unless that validation uncovers a blocker requiring a narrow fix

## 13. Non-Deviation Conditions

- no frontend framework rewrite until the UI split is working
- no drag-and-drop canvas until guided layout editing is stable
- no multi-agent workflow until the single-agent supervisor proves useful
- no production dependency on manual hidden fallbacks
- no mixing of urgent festival delivery work with broad architecture changes in the same branch

## 14. Open Design Questions

These questions should be resolved before the UI move starts:

1. Should legacy Jinja/template pages be removed after the standalone UI reaches route parity, or retained longer as a safety fallback?
2. Should the standalone UI eventually be served through a reverse proxy path in production, or remain independently deployed?
3. Should `dist/` artifacts stay committed in `content_engine_ui`, or should that repo move to build-artifact-free source control?
