# Next Steps LLD: Stage-Wise Implementation Design

Document Version: `v0.1`
Updated: `2026-03-18`
Status: `Draft`

## 1. Purpose

This document breaks the next-step platform redesign into low-level implementation stages so work stays aligned to the current in-hand task and does not drift into broad speculative redesign.

The sequence in this LLD assumes:

- `Pillow` remains the initial card assembly engine
- the UI lives in a separate sibling repo directory
- the platform remains deterministic first, agentic later

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

## Proposed response contract

```json
{
  "request_id": "img_req_001",
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

## Estimate

- `2-3 working days`

## Exit criteria

- no backend ambiguity about image-generation ownership
- image selection is visible and understandable in UI

## 6. Stage 3: Composition Stage With Pillow

## Goal

Create a proper composition layer before advanced design tooling.

## Service owner

`ecard-factory`

## Composition model

The composition layer should render from a layout spec, not from scattered ad hoc parameters.

## Proposed layout spec

```json
{
  "layout_id": "layout_minimal_v1",
  "canvas": {
    "width": 1080,
    "height": 1350
  },
  "background": {
    "image_url": "http://...",
    "mode": "cover"
  },
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

## 7. Stage 4: Quality Stage

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

## 8. Stage 5: UI Split

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

## 9. New UI Component Design

## 9.1 App-level structure

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

## 9.2 Studio feature components

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

## 9.3 Shared components

- `StatusBadge`
- `MetricCard`
- `EmptyState`
- `ErrorState`
- `LoadingState`
- `ActionButton`
- `SectionHeader`
- `FilterBar`
- `Modal`

## 10. Stage 6: Central Agent Runtime

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

## 11. Suggested Implementation Sequence

Do the work in this order:

1. HLD approval
2. LLD approval
3. Stage 0 stabilization
4. Stage 1 content redesign
5. Stage 2 image redesign
6. Stage 3 Pillow composition redesign
7. Stage 4 quality layer
8. Stage 6 bounded agent runtime

## 12. Non-Deviation Conditions

- no frontend framework rewrite until the UI split is working
- no drag-and-drop canvas until guided layout editing is stable
- no multi-agent workflow until the single-agent supervisor proves useful
- no production dependency on manual hidden fallbacks
- no mixing of urgent festival delivery work with broad architecture changes in the same branch

## 13. Open Design Questions

These questions should be resolved before the UI move starts:

1. Should legacy Jinja/template pages be removed after the standalone UI reaches route parity, or retained longer as a safety fallback?
2. Should the standalone UI eventually be served through a reverse proxy path in production, or remain independently deployed?
3. Should `dist/` artifacts stay committed in `content_engine_ui`, or should that repo move to build-artifact-free source control?
