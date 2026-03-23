# Next Steps HLD: eCard MVP First Local Creative Platform

Document Version: `v0.1`
Updated: `2026-03-23`
Status: `Working Snapshot`

## 1. Purpose

This document defines the high-level design for the next transformation stage of the platform.

The near-term goal is not a fully autonomous multi-agent system or a broad multi-app shell. The near-term goal is:

- keep `ecard-factory` as the first product app and stabilize its 1-job flow
- treat `contentforge` and `imageforge` as shared creative engines for future sibling apps
- stabilize the current 1-job flow
- move UI into a separate repo directory
- keep final card assembly inside the platform using Pillow
- prepare the system for a controlled agentic supervisor later
- stay local-first until revenue justifies paid providers

Initial assembly decision:

- use `Pillow` for card composition and export
- do not depend on Canva in the initial redesign

## 2. Scope

In scope:

- canonical workflow for text, image, composition, and export
- local-first runtime using Ollama plus ImageForge/ComfyUI as the primary path
- illustration-first asset generation for eCards
- UI extraction out of `ecard-factory`
- platform boundaries for agentic evolution
- phase-based delivery plan
- high-level component model for the new UI app

Out of scope for the initial redesign:

- full Canva replacement
- free-form infinite canvas editor
- multi-agent autonomous runtime as the production default
- moving final composition to an external design tool
- building StoryFactory or ThoughtFactory inside `ecard-factory`

## 3. Current Problem Summary

The current repo has the right service split, but the implementation still has overlap:

- `ecard-factory` owns orchestration, UI, and final render
- `contentforge` handles text generation
- `imageforge` handles image generation

Current issues:

- multiple workflow styles coexist
- image generation is split between old internal paths and ImageForge-backed paths
- image outputs skew toward full-card backdrops instead of reusable spot illustrations
- local mode still drifts toward paid-provider assumptions in some settings/contracts
- UI is embedded inside `ecard-factory`
- preview/export quality is coupled to backend internals
- the system is not yet structured for a safe agentic loop

## 4. Design Principles

The redesign should follow these rules:

1. One canonical workflow.
2. One state owner.
3. One image-generation path.
4. Final assembly stays in-platform and uses Pillow first.
5. UI becomes its own sibling repo directory.
6. Job creation returns immediately; expensive generation runs in the background.
7. Agentic behavior remains bounded and auditable.
8. Quality scoring happens before autonomy expands.
9. `contentforge` and `imageforge` are shared engines; future StoryFactory/ThoughtFactory apps should be sibling orchestrators, not extra flows inside `ecard-factory`.
10. eCard assets are illustration-first by default; soft backgrounds remain opt-in.

## 5. Target High-Level Architecture

## 5.1 Core Runtime

### eCardFactory API Runtime

Responsibilities:

- job lifecycle and workflow state machine
- orchestration across services
- composition request handling
- Pillow-based preview and export
- audit log, retries, and stage status
- agent runtime later

### ContentForge Shared Engine

Responsibilities:

- text generation
- dedupe and incompleteness filtering
- ranking and shortlist scoring
- structured candidate output
- thin shared contract for `app_id`, `content_type`, and `creative_brief`
- prompt-pack routing across local models
- fixed golden-set evaluation briefs for regression tracking

### ImageForge Shared Engine

Responsibilities:

- image asset generation
- image candidate filtering and ranking
- image relevance metadata
- selected asset persistence
- asset roles for `spot_illustration`, `background`, and `motif`
- preset workflows for `ecard_spot_illustration_v1` and `ecard_soft_background_v1`

### Composition Layer

This remains inside `ecard-factory` for now.

Responsibilities:

- layout generation from a structured layout spec
- Pillow-based preview render
- final PNG/PDF export
- theme template application

### Quality Layer

This starts as a deterministic scoring module, not as a free autonomous agent.

Responsibilities:

- readability checks
- text-image fit checks
- layout balance checks
- final-card quality score
- stage-level rerun recommendations

## 5.2 UI App

The UI lives in a separate sibling repository directory.

Approved target name:

`../content_engine_ui/`

Responsibilities:

- design studio
- dashboard
- jobs and workflow views
- text/image/layout selection
- preview controls
- future AI-assisted design controls

The new UI app should not contain backend business logic.

It should communicate with `ecard-factory` only through HTTP APIs.

## 6. Canonical Workflow

The target workflow is:

1. User starts a card request.
2. eCardFactory creates the job immediately and returns the job id to Studio.
3. Background content generation begins asynchronously and Studio shows live progress.
4. ContentForge generates candidates and returns ranked shortlist metadata.
5. User accepts or refines text choice.
6. ImageForge generates image candidates for the chosen text.
7. User accepts or refines image choice.
8. Composition layer builds a structured layout spec.
9. Pillow renders preview and final export.
10. Quality layer scores the result.
11. System either accepts, suggests refinement, or triggers a bounded rerun.

Async kickoff rule:

- `POST /api/jobs/start-async` returns immediately with `job_id`
- canonical stage remains `job_created` until shortlist data exists
- progress is communicated through a separate processing-state layer, not by mutating canonical stages

## 7. Agentic Direction

The platform should evolve in this order:

### Phase A

Deterministic workflow with strong scoring and quality gates.

### Phase B

Single central agent in `ecard-factory` with bounded tools:

- ask for more text
- ask for more images
- switch style strategy
- suggest composition changes
- request human review

### Phase C

Optional specialized agents only if the single-agent model proves insufficient.

The system should not begin with 3-4 autonomous agents.

## 8. Pillow-First Composition Model

Pillow is the correct initial choice because it is:

- already aligned with the backend stack
- deterministic
- testable
- easy to version
- suitable for preview and export parity

Initial composition model:

- template-driven gradients plus optional soft backgrounds
- selected image used as a reusable illustration asset by default
- structured text blocks
- two deterministic eCard layouts:
  - `illustration_top_text_bottom`
  - `text_left_illustration_right`
- deterministic font and spacing rules
- export parity between preview and final asset

Later evolution:

- richer layout grammar
- draggable UI controls
- AI-assisted redesign requests

## 9. UI Extraction Design

Current UI history sources:

- React console in `ecard-factory/app/static/console`
- legacy server-rendered templates in `ecard-factory/app/templates`

Current implemented direction:

- active React UI lives in `../content_engine_ui`
- keep `ecard-factory` backend-only
- serve UI separately in development
- optionally ship a built frontend artifact later

High-level migration rule:

- backend serves APIs and assets
- frontend owns pages, routing, and interaction state

## 10. New UI App: High-Level Component Model

Core pages:

- Dashboard
- Studio
- Jobs
- Job Detail
- Themes
- Compare Lab

Core feature areas:

- Job Intake
- Text Candidate Review
- Image Candidate Review
- Layout Inspector
- Preview Workspace
- Export Panel
- Activity and Audit Feed

Core shared components:

- App Shell
- Sidebar
- Header
- Status Badge
- Job Card
- Candidate Card
- Image Grid
- Preview Pane
- Inspector Panel
- Action Bar
- Empty State
- Error Banner

## 11. Effort Estimate

High-level estimate for the target flow:

| Stage | Scope | Estimate |
| --- | --- | --- |
| Stage 0 | workflow stabilization only | `3-5 working days` |
| Stage 1 | content redesign | `2-3 working days` |
| Stage 2 | image redesign | `2-3 working days` |
| Stage 2A | async kickoff and background orchestration | `3-4 working days` |
| Stage 3 | Pillow composition redesign | `2-4 working days` |
| Stage 4 | quality layer and stage scoring | `2-3 working days` |
| Stage 5 | standalone UI extraction | `completed baseline`, additional hardening `1-2 working days` |
| Stage 6 | bounded central agent | `3-5 working days` |

Practical total for a stable target flow without the central agent:

- `10-15 working days` if execution stays focused

Practical total including bounded agentic supervision:

- `15-20 working days`

## 12. Current Execution Snapshot

Stage 5 UI split baseline is already implemented:

- `content_engine_ui` exists as a separate sibling git repo
- the standalone UI builds independently
- `ecard-factory` no longer needs to build the frontend during backend startup
- legacy embedded console remains as a temporary fallback

Current verified state:

- Stage 0 complete
- Stage 1 mechanically complete, but quality hardening is still required for prompt packs, tone diversity, and shortlist usefulness
- Stage 2 mechanically complete, but quality hardening is still required for illustration fit and negative-space safety
- Stage 2A implemented in code, regression-tested, and validated against the live local stack on `2026-03-22`
- Stage 3 composition redesign is accepted on `2026-03-23`
  - explicit layout spec inside the Pillow renderer is the only composition path
  - final preview and final export render from the same layout-spec path
  - deterministic final layouts now include:
    - `illustration_top_text_bottom`
    - `text_left_illustration_right`
    - `poster_illustration_caption`
  - selected image is treated as an illustration block instead of an implicit full-card background
  - final preview/PNG/PDF asset rows carry the layout version id
  - crop-focus defaults, role-aware font variants, theme-specific ornament layers, and content-aware layout balancing are implemented
  - targeted regression slice is green after the refactor
  - representative rerendered live previews were reviewed across minimal, festive, and elegant jobs:
    - `job_d6281fb50d`
    - `job_fd95fc7d65`
    - `job_966e98cbf8`
    - `job_95e76a8593`
- Stage 4 quality and operator-config hardening is functionally complete on `2026-03-23`
  - deterministic workflow quality scoring is live inside `ecard-factory`
  - compact-card prompt/ranking hardening is live inside `contentforge`
  - a live compact-copy compare-models pass returned compact two-sentence shortlist candidates for `target_words=18`
  - live job `job_b25fd58e50` completed the canonical flow through `export_ready`
    - selected text landed at `17` words for a `target_words=18` request
    - final workflow quality result returned `score=10.0`, `status=pass`
  - `/api/config/options` is serving database-backed categories and no longer exposes the old `operations team` audience placeholder

Next execution gate before Stage 3:

- closed on `2026-03-22` through a live local-stack runtime pass
- confirmed `POST /api/jobs/start-async` returns the immediate queued payload
- confirmed shortlist data arrives asynchronously and text is not auto-selected
- confirmed `/api/jobs/{job_id}/image-assets/generate` returns ranked candidates with recommendation metadata and no auto-selected image
- confirmed manual image selection, `render-final`, and `approve-final` complete the canonical flow through `export_ready`

Stage 3 composition work is now code-complete enough for manual acceptance.

- Stage 4 first pass moved from implemented to live-validated on `2026-03-23`
  - Stage 4 signals are exposed in job detail, Studio actions, and stage action responses
  - operator dropdown configuration is DB-driven through `operator_option_catalog` with API CRUD plus seed fallback
  - `content_engine_ui` is serving on the live stack and the config API is live from the database

Current practical reading:

- no Stage 3 or Stage 4 acceptance gate remains open
- the main remaining operational concern is image-generation latency; one live `image-assets/generate` client call timed out while the backend still completed and persisted candidates
- the next work should focus on optional Stage 5 hardening, image latency reduction, and continued quality tuning without changing the canonical flow

## 13. Non-Deviation Guardrails

To avoid drifting away from the proposed architecture:

- do not introduce a second primary image path
- do not introduce Canva dependency during initial composition redesign
- do not split job state ownership outside `ecard-factory`
- do not add multi-agent autonomy before deterministic quality gates exist
- do not mix UI framework migration with broad backend refactors in the same step
- do not allow unbounded auto-regenerate loops
- do not remove working API contracts without replacement mapping
- keep legacy image routes frozen as compatibility-only; remove them only in a dedicated cleanup pass after Stage 3 stabilizes and the canonical `/image-assets/*` path is the only confirmed caller path

## 14. Immediate Recommendation

Start with this sequence:

1. use `docs/NEXT_CHAT_HANDOFF_v0.1.md` as the execution snapshot in the next session
2. treat Stage 3 and Stage 4 as the current verified baseline
3. preserve the already-validated async kickoff and canonical ImageForge path while tuning latency or UX
4. use the existing Stage 4 scoring signal to guide any further text/image quality work instead of adding more plumbing
5. take only targeted Stage 5 UI hardening work if the running stack shows a concrete operator issue
6. defer StoryFactory, ThoughtFactory, and bounded-agent work until there is a stronger reason than the current eCard backlog
