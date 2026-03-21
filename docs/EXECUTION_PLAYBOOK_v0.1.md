# Execution Playbook: Delivery Routine And Timeline

Document Version: `v0.1`
Updated: `2026-03-18`
Status: `Working Draft`

## 1. Purpose

This document defines how we should work together daily so implementation stays fast, stable, and aligned with the approved HLD and LLD.

It also includes:

- a realistic delivery timeline
- a practical Ugadi shortcut plan
- the exact task briefing format you can reuse every day

## 2. Delivery Objective

Primary objective:

- complete a stable target flow:
  - text shortlist
  - text select
  - image generate
  - image select
  - Pillow preview/final render
  - export

Secondary objective:

- keep `content_engine_ui` as the standalone sibling UI repo and finish only remaining hardening work when needed

Tertiary objective:

- prepare the platform for a bounded agentic supervisor

## 3. Realistic Timelines

## 3.1 Ugadi Tomorrow

A fully redesigned platform by tomorrow is not realistic.

What is realistic by tomorrow if we focus only on delivery:

- produce a small set of usable Ugadi cards
- use the existing backend flow
- use a fixed Pillow template
- use manual operator selection where needed
- avoid UI split and architecture changes for that urgent path

Fast Ugadi delivery estimate:

- `6-10 focused hours` if services are already runnable

Expected output:

- `3-5 polished Ugadi eCards`

## 3.2 Stable Target Flow

For the stable target flow without agentic supervision:

- `10-15 working days`

For the stable target flow plus bounded supervisor:

- `15-20 working days`

## 4. Phase Plan

### Phase 0: Workflow Stabilization

Duration:

- `3-5 working days`

Main output:

- one canonical start-to-export path

### Phase 1: Content Stage Redesign

Duration:

- `2-3 working days`

Main output:

- better shortlist quality

### Phase 2: Image Stage Redesign

Duration:

- `2-3 working days`

Main output:

- cleaner image candidate selection
- one primary ImageForge path

### Phase 2A: Async Job Kickoff And Background Orchestration

Duration:

- `3-4 working days`

Main output:

- immediate job creation
- background content-generation worker
- live Studio progress state

### Phase 3: Pillow Composition Redesign

Duration:

- `2-4 working days`

Main output:

- reproducible preview/final render via layout spec

### Phase 4: Quality Layer

Duration:

- `2-3 working days`

Main output:

- deterministic accept/refine quality scoring

### Phase 5: UI Split Hardening To content_engine_ui

Duration:

- baseline split completed
- remaining hardening `1-2 working days`

Main output:

- standalone frontend app

### Phase 6: Bounded Agent Supervisor

Duration:

- `3-5 working days`

Main output:

- safe agent-assisted reruns and recommendations

Numbering rule:

- the authoritative stage sequence is `0`, `1`, `2`, `2A`, `3`, `4`, `5`, `6`
- Phase 5 UI split work is now a hardening track because the baseline split is already completed in the current workspace

## 5. Daily Working Routine

Use this routine every day.

### Morning Kickoff

Send one message in this format:

```text
Today’s target:
- Phase:
- Exact deliverable:
- Files or modules to touch:
- What not to change:
- Required verification:
- Time limit for today:
```

Example:

```text
Today’s target:
- Phase: Stage 0
- Exact deliverable: define canonical workflow states and mark legacy image endpoints as secondary
- Files or modules to touch: workflow_v1 router/service, related schemas, docs
- What not to change: UI files, ImageForge provider internals
- Required verification: unit tests for valid and invalid stage transitions
- Time limit for today: 4 hours
```

### Midday Check

Send:

```text
Status check:
- continue current task OR
- cut scope to X OR
- switch to blocker Y
```

### End Of Day

Send:

```text
Close today with:
- what was completed
- what remains
- what should be first tomorrow
- any blockers
```

## 6. Rules To Keep Us Aligned

- one day should target one stage or one sub-deliverable only
- no mixing urgent festival output work with architecture migration in the same day unless you explicitly say so
- no new branch for a broad refactor without naming the exact phase
- every day must end with a verification note
- if scope expands, we cut features before cutting correctness
- if a blocker appears, we document it and choose the smallest unblock path

## 7. What To Ask Me For

Best requests:

- “Implement Stage 0 state machine changes only”
- “Harden the standalone content_engine_ui integration only”
- “Refactor Pillow render to layout spec only”
- “Add tests for text dedupe logic only”

Weaker requests that create drift:

- “Improve everything”
- “Make the system more agentic”
- “Do the next steps”

Use bounded requests instead.

## 8. Branching Routine

Recommended pattern:

- one branch per phase or sub-phase
- one branch should map to one reviewable goal

Recommended naming:

- `phase-0-workflow-stabilization`
- `phase-1-content-stage-redesign`
- `phase-2-image-stage-redesign`
- `phase-2a-async-kickoff`
- `phase-3-pillow-composition`
- `phase-4-quality-layer`
- `phase-5-content-engine-ui-hardening`
- `phase-6-bounded-agent-supervisor`

## 9. Recommended Weekly Timetable

### If You Want Fastest Practical Delivery

Day 1:

- Ugadi delivery sprint only

Day 2-4:

- Phase 0 workflow stabilization

Day 5-8:

- Phase 1 content redesign plus Phase 2 image redesign

Day 9-11:

- Phase 2A async kickoff hardening and live validation

Day 12-14:

- Phase 3 Pillow composition redesign

Day 15-16:

- Phase 4 quality layer

Day 17-18:

- Phase 5 UI split hardening for `content_engine_ui`

Day 20+:

- Phase 6 bounded agent supervisor

## 10. Ugadi Shortcut Plan

If the business goal is to have usable Ugadi cards tomorrow, do this instead of broad refactoring:

1. define Ugadi theme input and tone variants
2. generate 10-20 text candidates
3. manually pick top 3-5
4. generate 6-10 relevant image assets
5. manually pick top 3-5
6. render final cards with one or two fixed Pillow layouts
7. export and review

Do not do tomorrow:

- UI split
- agent runtime
- multi-stage architectural refactor
- generalized editor

## 11. Decision Rule

If the choice is between:

- shipping a few good cards tomorrow, or
- beginning the full redesign tomorrow

Choose shipping the few good cards tomorrow first, then resume the redesign on the next working block.
