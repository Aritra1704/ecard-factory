# Next Steps HLD: eCardFactory Agentic Creative Platform

Document Version: `v0.1`
Updated: `2026-03-18`
Status: `Draft`

## 1. Purpose

This document defines the high-level design for the next transformation stage of the platform.

The near-term goal is not a fully autonomous multi-agent system. The near-term goal is:

- stabilize the current 1-job flow
- move UI into a separate repo directory
- keep final card assembly inside the platform using Pillow
- prepare the system for a controlled agentic supervisor later

Initial assembly decision:

- use `Pillow` for card composition and export
- do not depend on Canva in the initial redesign

## 2. Scope

In scope:

- canonical workflow for text, image, composition, and export
- UI extraction out of `ecard-factory`
- platform boundaries for agentic evolution
- phase-based delivery plan
- high-level component model for the new UI app

Out of scope for the initial redesign:

- full Canva replacement
- free-form infinite canvas editor
- multi-agent autonomous runtime as the production default
- moving final composition to an external design tool

## 3. Current Problem Summary

The current repo has the right service split, but the implementation still has overlap:

- `ecard-factory` owns orchestration, UI, and final render
- `contentforge` handles text generation
- `imageforge` handles image generation

Current issues:

- multiple workflow styles coexist
- image generation is split between old internal paths and ImageForge-backed paths
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
6. Agentic behavior remains bounded and auditable.
7. Quality scoring happens before autonomy expands.

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

### ContentForge v2

Responsibilities:

- text generation
- dedupe and incompleteness filtering
- ranking and shortlist scoring
- structured candidate output

### ImageForge v2

Responsibilities:

- image asset generation
- image candidate filtering and ranking
- image relevance metadata
- selected asset persistence

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
2. eCardFactory creates a job and normalizes input.
3. ContentForge generates candidates and returns ranked shortlist metadata.
4. User accepts or refines text choice.
5. ImageForge generates image candidates for the chosen text.
6. User accepts or refines image choice.
7. Composition layer builds a structured layout spec.
8. Pillow renders preview and final export.
9. Quality layer scores the result.
10. System either accepts, suggests refinement, or triggers a bounded rerun.

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

- template-driven backgrounds
- selected image used as background or panel asset
- structured text blocks
- fixed layout zones with editable alignment
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

| Level | Scope | Estimate |
| --- | --- | --- |
| Level 0 | workflow stabilization only | `3-5 working days` |
| Level 1 | text + image stage hardening | `4-6 working days` |
| Level 2 | Pillow composition redesign | `2-4 working days` |
| Level 3 | standalone UI extraction | `completed baseline`, additional hardening `1-2 working days` |
| Level 4 | quality layer and stage scoring | `2-3 working days` |
| Level 5 | bounded central agent | `3-5 working days` |

Practical total for a stable target flow without the central agent:

- `10-15 working days` if execution stays focused

Practical total including bounded agentic supervision:

- `15-20 working days`

## 12. Current Stage Note

Stage 5 UI split baseline is already implemented:

- `content_engine_ui` exists as a separate sibling git repo
- the standalone UI builds independently
- `ecard-factory` no longer needs to build the frontend during backend startup
- legacy embedded console remains as a temporary fallback

The next architectural stage after this document update is:

- Stage 1: Content Stage Redesign

## 13. Non-Deviation Guardrails

To avoid drifting away from the proposed architecture:

- do not introduce a second primary image path
- do not introduce Canva dependency during initial composition redesign
- do not split job state ownership outside `ecard-factory`
- do not add multi-agent autonomy before deterministic quality gates exist
- do not mix UI framework migration with broad backend refactors in the same step
- do not allow unbounded auto-regenerate loops
- do not remove working API contracts without replacement mapping

## 14. Immediate Recommendation

Start with this sequence:

1. finalize HLD and LLD
2. keep `content_engine_ui` as the standalone UI path
3. keep Pillow as the only composition path
4. stabilize the deterministic workflow
5. harden content and image quality
6. add agentic supervision later
