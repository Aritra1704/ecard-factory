# Next Chat Handoff

Document Version: `v0.1`  
Updated: `2026-03-22`  
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
- `contentforge` and `imageforge` are shared engines
- `ecard-factory` remains the only active product app for now
- local-first mode is the default until paid providers are intentionally enabled
- current business priority is now creative quality hardening, not just mechanical flow completion

## 5. Completed Stages

### Stage 0: Workflow Stabilization

Status:

- mechanically complete, but creative quality hardening is still required

Outcome:

- canonical workflow states defined
- legacy endpoints marked secondary where applicable
- one accepted start-to-export path documented

### Stage 1: Content Stage Redesign

Status:

- completed and previously verified

Outcome:

- ContentForge ranking and shortlist reasons integrated
- shared content contract now includes:
  - `app_id`
  - `content_type`
  - `creative_brief`
- prompt packs now exist for:
  - `romantic_witty`
  - `festival_warm`
  - `festival_respectful`
  - `playful_modern`
  - `minimal_heartfelt`
- fixed golden-set briefs now exist for eCard, story, thought-of-the-day, and failure-guard scenarios
- eCardFactory treats ContentForge shortlist/ranking as primary truth
- Studio expects manual text selection after shortlist arrives

### Stage 2A: Async Job Kickoff And Background Orchestration

Status:

- implemented, regression-tested, and validated against the live local stack on `2026-03-22`

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

- mechanically working in code and regression-tested, but creative quality hardening is still required

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
- illustration-first request mapping with `asset_role`
- canonical eCard preset:
  - `ecard_spot_illustration_v1`
- secondary soft-background preset:
  - `ecard_soft_background_v1`
- eCardFactory persists and mirrors ImageForge ranking metadata
- Studio displays image recommendation badges, scores, and reason codes

Decision taken on `2026-03-22`:

- legacy `/generate-image`, `/select-image`, and `/approve-image` routes are now frozen as compatibility-only
- no new Stage 3 work should extend or depend on those legacy image routes
- remove legacy image routes only in a dedicated cleanup pass after Stage 3 stabilizes and Studio/runtime are confirmed not to call them
- manual browser DevTools capture remains optional and non-blocking; do it only if explicit UI-network evidence is requested

Recommended rule:

- Stage 3 composition work can continue, but prompt/image quality hardening should remain the main focus before any new product app work starts

Compatibility note:

- legacy `/generate-image`, `/select-image`, and `/approve-image` routes still exist for compatibility
- `/api/jobs/{job_id}/image-assets/*` is the canonical image workflow path

## 6A. Stage 3 Reality Check

What has been completed:

- the first Stage 3 slice landed
- Pillow now renders through an explicit layout spec
- final preview and final PNG/PDF export use the same layout-spec path
- final asset rows now persist the layout version id

What this does not mean:

- the current visual result is not the intended final design quality
- the current Pillow output is still essentially a basic single-panel overlay composition
- this slice solved renderer structure and preview/export parity, not premium visual composition

Current limitation to carry forward explicitly:

- the current composed card can still feel like "text pasted on top of the image" and is not acceptable as the end-state design language
- the Studio `Final Card` section can also still surface the raw image preview alongside the real final preview, which is confusing and should be cleaned up in the next UI hardening pass

## 7. Live Validation Result

Live validation executed on `2026-03-22` against the running local stack.

What passed:

- standalone UI source is wired to `POST /api/jobs/start-async`, `POST /api/jobs/{job_id}/select-text`, and `/api/jobs/{job_id}/image-assets/*`
- live kickoff returned the expected queued payload
- shortlist appeared asynchronously after background completion
- no text was auto-selected
- manual text selection was required before image generation
- canonical image generation returned `3` ranked candidates with `recommended_candidate_id`, `quality_score`, `relevance_score`, and `reason_codes`
- no image was auto-selected
- image select -> render final -> approve final completed successfully and the job reached `export_ready`

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
- `app/integrations/imageforge/mapper.py`
- `app/main.py`
- `app/models/workflow.py`
- `app/repositories/workflow_repository.py`
- `app/routers/workflow_v1.py`
- `app/schemas/workflow.py`
- `app/services/__init__.py`
- `app/services/image_generation_service.py`
- `app/services/workflow_v1_service.py`
- `app/services/workflow_card_renderer.py`
- `app/services/async_content_worker.py`
- `app/store/job_store.py`
- `migrations/versions/031_add_imageforge_ranking_metadata.py`
- `migrations/versions/032_add_async_content_processing_fields.py`
- `tests/test_workflow_card_renderer.py`
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

- `app/schemas.py`
- `app/services/prompts/image_prompt_builder.py`
- `app/services/providers/base.py`
- `app/services/providers/comfyui.py`
- `app/services/generation/service.py`
- `tests/test_generate.py`
- `tests/test_candidates.py`
- `workflows/comfyui/ecard_spot_illustration_v1.json`
- `workflows/comfyui/ecard_soft_background_v1.json`

### contentforge

- `app/schemas.py`
- `app/routers/generate.py`
- `app/candidate_ranking.py`
- `app/judge.py`
- `src/prompts/phrase_prompt.py`
- `tests/test_prompt_templates.py`
- `tests/test_golden_set.py`
- `tests/data/golden_set_briefs.json`

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
venv/bin/python -m pytest tests/test_content_shortlist_service.py tests/test_contentforge_client.py tests/test_workflow_v1_router.py tests/test_imageforge_integration.py -q
```

Result:

- `35 passed in 12.87s`

```bash
cd contentforge
venv/bin/python -m pytest tests/test_generate.py -k 'incomplete_paragraph_cannot_win or returns_ranked_candidates_with_reasons_and_dedupes_aggressively' -q
```

Result:

- `2 passed in 0.48s`

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

```bash
cd ecard-factory
venv/bin/python -m pytest tests/test_workflow_card_renderer.py tests/test_imageforge_integration.py tests/test_workflow_v1_router.py -q
```

Result:

- `35 passed in 13.41s`

```bash
cd contentforge
venv/bin/python -m pytest tests/test_prompt_templates.py tests/test_golden_set.py
```

Result:

- `10 passed in 0.11s`

```bash
cd imageforge
.venv/bin/python -m pytest tests/test_generate.py
```

Result:

- `14 passed in 0.14s`

```bash
cd ecard-factory
DATABASE_URL=postgresql://local_user:local_pass@localhost:5432/ecard_factory \
ASSET_STORAGE_BACKEND=filesystem \
ASSET_STORAGE_ROOT=/tmp/ecardfactory-renderer-test-assets \
ASSET_PUBLIC_BASE_URL=http://localhost:8080/assets \
venv/bin/python -m pytest tests/test_config.py tests/test_workflow_card_renderer.py tests/test_imageforge_integration.py
```

Result:

- `17 passed in 3.10s`

What was not verified live from this workspace:

- direct browser DevTools capture from the running `localhost` Studio

Live runtime validation completed from this workspace:

- `./start-all.sh` started `ecard-factory`, `content_engine_ui`, `contentforge`, `imageforge`, `n8n`, and ComfyUI dependencies
- ImageForge schema setup ran successfully against local Postgres
- eCardFactory startup ran against local Postgres with Alembic enabled
- one live job completed end to end through `export_ready` using:
  - `POST /api/jobs/start-async`
  - `POST /api/jobs/{job_id}/select-text`
  - `POST /api/jobs/{job_id}/image-assets/generate`
  - `POST /api/jobs/{job_id}/image-assets/{candidate_id}/select`
  - `POST /api/jobs/{job_id}/render-final`
  - `POST /api/jobs/{job_id}/approve-final`

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

Continue Stage 3 composition work.

First Stage 3 slice already completed:

1. defined the first explicit layout spec inside the Pillow renderer
2. routed final preview and final export through the same layout spec path
3. persisted the layout version on final preview/PNG/PDF asset rows
4. regression-tested the canonical workflow after the refactor

Next implementation slice:

1. redesign composition so the final card is not just a text panel over a generated image
2. keep the layout-spec-first approach and expand it only within `ecard-factory`
3. preserve preview/final export parity and the already-validated Stage 0/2/2A contracts
4. improve composition quality without changing the async kickoff or canonical `/image-assets/*` path

Concrete next phase of changes:

1. add real layout modes:
   - split layout
   - framed art layout
   - poster layout
   - hero-art plus caption layout
2. stop treating the selected image as only a generic background candidate
3. introduce explicit image zone plus text zone composition in the layout spec
4. support image-safe cropping, padding, and placement rules
5. improve typography hierarchy:
   - better title/body/signoff scale separation
   - theme-specific font choices if available
   - better spacing and line-length control
6. support theme-aware decorative layers:
   - borders
   - shape accents
   - festival framing
7. update Studio so `Final Card` shows the actual Pillow-composed card clearly and does not mix it with the raw image preview in the same review slot

Acceptance rule for the next phase:

- the final eCard should read as a designed card composition, not as raw text pasted on a generated image

### Scope rule for the next session

The next fresh session should focus only on Stage 3 composition unless a narrow bug fix is required to preserve the already-validated async kickoff or canonical image path.

### Stage 3 guardrails

- do not change the async kickoff contract
- do not introduce a second image path
- keep manual text selection and manual image selection as hard gates
- keep legacy image endpoints compatibility-only unless a bug forces a change
- do not mix Stage 3 composition refactor with Stage 4 quality scoring or Stage 6 agent work

## 13. Exact Prompt For The Next Chat

Use this in the next chat if you want continuity without replaying history:

```text
Continue from ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md.

Context:
- ecard-factory branch: version2
- content_engine_ui branch: master
- Stage 0 complete
- Stage 1 complete
- Stage 2 implemented in code, regression-tested, and live-validated
- Stage 2A async job kickoff implemented, regression-tested, and live-validated
- Stage 3 has started, but the current visual result is still not acceptable

First, read:
- ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md
- ecard-factory/docs/NEXT_STEPS_HLD_v0.1.md
- ecard-factory/docs/NEXT_STEPS_LLD_v0.1.md
- ecard-factory/docs/EXECUTION_PLAYBOOK_v0.1.md

Then do this:
- continue Stage 3 composition work inside `ecard-factory`
- keep the explicit layout spec as the source of truth for Pillow composition
- redesign the current single-panel overlay into a real card composition system
- extend composition behavior from that layout-spec path without disturbing the canonical workflow
- preserve the already-validated async kickoff and canonical `/image-assets/*` path

Guardrails:
- do not touch content ranking flow
- do not change Stage 2 or Stage 2A contracts unless a concrete regression is discovered
- do not add agent logic
- do not introduce a second image path
- do not auto-select text or image
- keep legacy `/generate-image` style routes compatibility-only unless a bug forces a change
- log every step clearly

Success condition:
- the final card should no longer feel like text pasted over the generated image
```

## 14. Exact Prompt To Trigger The Next Stage In A New Session

Use this if you want the next session to execute only Stage 3:

```text
Continue from ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md.

Execute only Stage 3 composition.

First read:
- ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md
- ecard-factory/docs/NEXT_STEPS_HLD_v0.1.md
- ecard-factory/docs/NEXT_STEPS_LLD_v0.1.md

Then do this only:
- continue from the initial explicit layout-spec implementation in the Pillow renderer
- keep `render-final` and final export on the shared layout-spec path
- replace the current basic single-panel overlay with a more intentional card composition
- extend composition capability while keeping preview/final export parity
- preserve the already-validated async kickoff and canonical image-selection path

If Stage 3 work uncovers a regression:
- fix only the regression required to keep the canonical flow healthy
- do not change unrelated architecture

Guardrails:
- do not touch content ranking flow
- do not add agent logic
- do not introduce a second image path
- keep legacy /generate-image style routes compatibility-only

Success condition:
- the final card should read as a designed eCard, not as text pasted over source art
```

## 15. Daily Brief Template

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

## 16. Decision Rules To Preserve

- `ecard-factory` owns workflow state and final composition
- `contentforge` owns text generation and ranking
- `imageforge` owns image generation
- `/api/jobs/{job_id}/image-assets/*` is the canonical image path
- manual text selection remains the default
- manual image selection remains the default
- async kickoff only applies to initial job creation in this slice
- image generation still starts only after text selection
