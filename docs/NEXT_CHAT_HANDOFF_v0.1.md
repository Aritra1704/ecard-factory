# Next Chat Handoff

Document Version: `v0.1`  
Updated: `2026-03-21`  
Status: `Active Working Snapshot`

## 1. Purpose

Use this document to continue the project in a fresh chat without re-explaining the repo history.

This handoff is the execution snapshot. The stable design intent remains in:

- `docs/NEXT_STEPS_HLD_v0.1.md`
- `docs/NEXT_STEPS_LLD_v0.1.md`
- `docs/EXECUTION_PLAYBOOK_v0.1.md`

## 2. Workspace Layout

```text
content_generation_engine/
  ecard-factory/
  contentforge/
  imageforge/
  content_engine_ui/
```

Important boundary:

- `content_engine_ui/` is a separate sibling repo, not inside `ecard-factory`

## 3. Current Branches

- `ecard-factory`: `version2`
- `content_engine_ui`: `master`

## 4. Current Goal

Primary product flow:

1. create job
2. generate text shortlist
3. select text
4. generate image candidates
5. select image
6. render final card

Design direction:

- deterministic platform first
- bounded agentic supervisor later
- Pillow-based composition before any Canva-like expansion

## 5. Completed Stages

### Stage 0: Workflow Stabilization

Status:

- completed and previously verified

Outcome:

- canonical workflow states defined
- legacy endpoints marked secondary where applicable
- one accepted start-to-export path documented

### Stage 1: Content Stage Redesign

Status:

- completed and previously verified

Outcome:

- ContentForge ranking and shortlist reasons integrated
- eCardFactory treats ContentForge shortlist/ranking as primary truth
- Studio expects manual text selection after shortlist arrives

### Stage 2A: Async Job Kickoff And Background Orchestration

Status:

- implemented and test-verified in code

Outcome:

- async kickoff endpoints added:
  - `POST /api/jobs/start-async`
  - `POST /api/jobs/start-from-theme-async`
  - `POST /api/jobs/create-daily-theme-job-async`
- background content-generation worker added inside `ecard-factory`
- job creation returns immediately with processing-state metadata
- Studio uses async kickoff and polls more aggressively while content is generating
- canonical stage remains `job_created` until shortlist exists

Important implementation note:

- kickoff latency was further reduced by removing an extra queue-update write and batching audit inserts into one transaction

## 6. Stage 2 Status

### Stage 2: Image Stage Redesign

Status:

- implemented in code and locally verified
- one live end-to-end validation pass is still pending

What is already done:

- ImageForge is the primary image-generation path
- image generation is blocked until text is selected
- image candidate persistence exists
- selected image persistence exists
- Studio image generate/select flow exists
- deterministic `quality_score`
- deterministic `relevance_score`
- stable `reason_codes`
- `recommended_candidate_id`
- obvious bad-candidate filtering
- eCardFactory persists and mirrors ImageForge ranking metadata
- Studio displays image recommendation badges, scores, and reason codes

What is still pending:

- direct browser validation against the running local stack
- real Postgres migration execution in the user environment
- explicit decision on when legacy image endpoints should be frozen or removed

Recommended rule:

- do not start Stage 3 composition work until one live validation pass confirms the canonical image path end to end

Compatibility note:

- legacy `/generate-image`, `/select-image`, and `/approve-image` routes still exist for compatibility
- `/api/jobs/{job_id}/image-assets/*` is the canonical image workflow path

## 7. Current Live Validation Risk

The code for async kickoff and the canonical image path is implemented, but the running local app may still appear stale if the local processes or browser bundle are outdated.

Possible causes:

- `ecard-factory` not restarted after backend changes
- `content_engine_ui` not rebuilt/restarted after switching to async endpoints
- browser serving an old cached bundle
- local DB commit latency still dominates the kickoff request

Important verification rule:

- in browser DevTools, the create action must hit `POST /api/jobs/start-async`, not `POST /api/jobs/start`
- in browser DevTools, the image generation action in Studio must hit `POST /api/jobs/{job_id}/image-assets/generate`, not the legacy `POST /api/jobs/{job_id}/generate-image`

Expected async kickoff response shape:

```json
{
  "job_id": "job_xxx",
  "status": "content_generation_queued",
  "canonical_stage": "job_created",
  "current_stage": "job_created",
  "processing_state": "queued",
  "processing_task": "content_generation",
  "processing_message": "Content creation queued"
}
```

## 8. Important Files Changed Recently

### eCardFactory

- `app/config.py`
- `app/integrations/imageforge/schemas.py`
- `app/main.py`
- `app/models/workflow.py`
- `app/repositories/workflow_repository.py`
- `app/routers/workflow_v1.py`
- `app/schemas/workflow.py`
- `app/services/image_generation_service.py`
- `app/services/workflow_v1_service.py`
- `app/services/async_content_worker.py`
- `app/store/job_store.py`
- `migrations/versions/031_add_imageforge_ranking_metadata.py`
- `migrations/versions/032_add_async_content_processing_fields.py`
- `docs/NEXT_STEPS_HLD_v0.1.md`
- `docs/NEXT_STEPS_LLD_v0.1.md`
- `docs/EXECUTION_PLAYBOOK_v0.1.md`

### content_engine_ui

- `src/console.css`
- `src/main.js`
- `dist/assets/app.js`
- `dist/assets/app.js.map`
- `dist/assets/console.css`
- `dist/config.js`

### imageforge

- `app/services/generation/service.py`
- `tests/test_generate.py`
- `tests/test_candidates.py`

### Existing active files already carrying image-stage work

These already contain the Stage 2 ranking/filtering slice and should be treated carefully:

- `ecard-factory/app/services/image_generation_service.py`
- `ecard-factory/tests/test_imageforge_integration.py`
- `ecard-factory/migrations/versions/031_add_imageforge_ranking_metadata.py`
- `content_engine_ui/src/console.css`

## 9. Verification Already Completed

Commands already run:

```bash
cd ecard-factory
venv/bin/python -m pytest tests/test_workflow_v1_router.py tests/test_imageforge_integration.py -q
```

Result:

- `32 passed in 12.69s`

```bash
cd imageforge
.venv/bin/python -m pytest tests/test_generate.py tests/test_candidates.py -q
```

Result:

- `17 passed in 0.16s`

```bash
cd content_engine_ui
npm run build
```

Result:

- build succeeded

What was not verified live from this workspace:

- direct browser validation against the running `localhost` app
- real Postgres migration execution in the user environment

## 10. Repo State Warning

Before opening a PR or switching focus, review current worktree state.

At handoff time:

- `ecard-factory` has multiple modified files plus untracked migrations and worker file
- `content_engine_ui` has modified source and built assets

Do not assume the repos are clean.

## 11. Startup Note

`ecard-factory/startup.txt` contains an outdated path reference and should not be treated as the source of truth.

Actual repo path:

```text
/Users/aritrarpal/Documents/workspace_biz/content_generation_engine/ecard-factory
```

## 12. Recommended Next Step

### Immediate next action

Do one live validation pass for the async kickoff path and the canonical Stage 2 image path before taking on more backend work.

Verify:

1. create job returns quickly
2. modal closes immediately
3. UI navigates to `/studio/{job_id}` right away
4. Studio shows `Content creation queued` or `Content creation in progress`
5. shortlist appears automatically when background content generation finishes
6. no text is auto-selected
7. manual text selection is still required before image generation
8. image generation calls `/api/jobs/{job_id}/image-assets/generate`
9. Studio shows a recommended image badge plus `quality`, `relevance`, and `reason_codes`
10. no image is auto-selected
11. final render still requires manual image selection first

### If live validation works

Next implementation stage should be:

- update the handoff with the live validation result
- only then decide whether Stage 3 composition work should start

### If live validation fails or still feels stale

Next debugging task should be:

- measure live request latency for `POST /api/jobs/start-async`
- confirm the UI is actually calling the async route
- confirm Studio is using `/image-assets/generate` rather than legacy image routes
- inspect DB write latency and app restart state before changing architecture again

## 13. Exact Prompt For The Next Chat

Use this in the next chat if you want continuity without replaying history:

```text
Continue from ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md.

Context:
- ecard-factory branch: version2
- content_engine_ui branch: master
- Stage 0 complete
- Stage 1 complete
- Stage 2 implemented in code and locally verified
- Stage 2A async job kickoff implemented and test-verified
- live browser validation still pending

First, read:
- ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md
- ecard-factory/docs/NEXT_STEPS_HLD_v0.1.md
- ecard-factory/docs/NEXT_STEPS_LLD_v0.1.md
- ecard-factory/docs/EXECUTION_PLAYBOOK_v0.1.md

Then do this:
- verify the live async kickoff behavior end to end
- verify the canonical image path end to end using `/api/jobs/{job_id}/image-assets/generate`
- if the live path is healthy, update the docs with the live findings before starting Stage 3 planning
- if not, debug the live issue without changing unrelated architecture

Guardrails:
- do not touch content ranking flow
- do not start Stage 3 Pillow composition yet
- do not add agent logic
- do not introduce a second image path
- do not auto-select text or image
- keep legacy `/generate-image` style routes compatibility-only unless a bug forces a change
- log every step clearly
```

## 14. Daily Brief Template

Use this message format in future chats:

```text
Today’s target:
- Phase:
- Exact deliverable:
- Files or modules to touch:
- What not to change:
- Required verification:
- Time limit for today:
```

## 15. Decision Rules To Preserve

- `ecard-factory` owns workflow state and final composition
- `contentforge` owns text generation and ranking
- `imageforge` owns image generation
- `/api/jobs/{job_id}/image-assets/*` is the canonical image path
- manual text selection remains the default
- manual image selection remains the default
- async kickoff only applies to initial job creation in this slice
- image generation still starts only after text selection
