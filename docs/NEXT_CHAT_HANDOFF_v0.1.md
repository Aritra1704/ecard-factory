# Next Chat Handoff

Document Version: `v0.2`  
Updated: `2026-03-25`  
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
- Stage 4 baseline exists, but the immediate next work is:
  - content quality and tone-diversity hardening
  - illustration quality and latency hardening
  - shared-engine readiness gating before any sibling app build starts
- GIF/video generation is explicitly not part of the current improvement cycle

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
- a fast follow-up slice landed:
  - illustration-first composition was tightened so the final card has a clearer art zone and smaller text zone
  - Studio final-card review was narrowed in `content_engine_ui` so the raw image preview does not masquerade as a final card asset
- the next Stage 3 composition slice is now partially complete:
  - final-card layout selection supports multiple explicit layouts instead of one generic final-card shape
  - `poster_illustration_caption` now exists as a real Pillow layout mode
  - theme-aware defaults now choose a better layout by style:
    - `elegant` -> `text_left_illustration_right`
    - `festive` and `playful` -> `poster_illustration_caption`
    - fallback -> `illustration_top_text_bottom`
  - renderer tests were extended so theme-aware layout defaults are covered explicitly
- the current Stage 3 polish slice has started and is regression-tested:
  - final-card shapes now support decorative outline/border rendering inside the layout spec
  - the existing layouts now use stronger framed-art treatment instead of flat surfaces only
  - final image placement in the main card layouts now uses fuller framed rendering with `cover` fit
  - text panels now support styled variants so poster/caption/editorial layouts have clearer hierarchy
- the next Stage 3 polish slice is now in place and regression-tested:
  - final image blocks now carry explicit crop-focus metadata instead of relying on generic center-crop behavior
  - current layouts use deterministic crop-focus defaults tuned for portrait-style illustration framing
  - final text blocks now carry deterministic font variants by role and theme
  - title/body/signoff hierarchy is stronger because the renderer now resolves serif/sans/italic variants intentionally
- the latest Stage 3 polish slice is now in place and regression-tested:
  - final-card themes now add deterministic ornament layers instead of relying only on shared frame treatments
  - `minimal`, `elegant`, `festive`, and `playful` now each carry distinct decorative shape language
  - theme-specific ornament rendering is now covered directly in renderer tests
- the final Stage 3 code-side slice is now in place and regression-tested:
  - layouts now rebalance themselves for compact versus dense copy instead of using one fixed art/text proportion
  - top, poster, and side-by-side layouts now adapt art-zone and message-panel proportions to content density
  - Stage 3 is now code-complete enough that only an optional narrow Studio confidence check should remain

What this does mean:

- Stage 3 should now be treated as the active render baseline
- any further Stage 3 work should be narrow regression fixing only
- the main product bottlenecks have moved to content quality, illustration quality, and latency

Current limitation to carry forward explicitly:

- one narrow live Studio signoff pass may still be used as a confidence check if a concrete visual regression is suspected
- do not reopen broad Stage 3 refactoring unless a serious composition defect is observed in the running stack

## 6B. Stage 4 First Pass

Status:

- started on `2026-03-23` by explicit user direction before the deferred Stage 3 live visual closeout
- code-complete for the first deterministic pass and regression/build verified locally

What is already implemented:

- `ecard-factory` now computes a deterministic `quality_result` for the current job snapshot
- Stage 4 quality output is exposed on:
  - job debug/detail responses
  - Studio action responses
  - stage action responses
- current checks include:
  - selected text presence
  - selected text length versus target words
  - selected text shortlist-quality score
  - selected image presence
  - final preview presence
  - final export integrity
  - layout overflow / message-panel fit
  - simple tone-versus-visual tension warnings
- `content_engine_ui` now shows Stage 4 quality panels in Studio and Job Detail

Operator configuration work completed in the same pass:

- hardcoded job-form defaults such as `operations team` were removed
- `operations team` was only a UI placeholder default, not a required backend concept
- editable operator dropdowns are now backed by a new catalog model and API:
  - `GET /api/config/options`
  - `POST /api/config/options`
  - `PUT /api/config/options/{option_id}`
  - `DELETE /api/config/options/{option_id}`
- the new `operator_option_catalog` table is seeded with sensible defaults and still has a seed fallback if DB access is unavailable
- Create Job and Theme Factory forms now read dropdown values from that catalog instead of hardcoded lists
- a new `Config Catalog` admin screen exists in `content_engine_ui` for editing categories and values

Default audience options now include:

- `general audience`
- `working professionals`
- `friends and family`
- `teammates`
- `community`
- `friends`
- `family`
- `partners and loved ones`

Current limitation:

- Stage 4 currently scores the existing workflow deterministically; it does not by itself improve model prompting or rewrite bad copy
- content quality improvement still requires follow-up tuning in `contentforge` and possibly tighter rerun heuristics inside `ecard-factory`
- the active Stage 4 UI is `content_engine_ui`; the old embedded fallback bundle under `ecard-factory/app/static/console` still exists and may lag the standalone UI

## 6C. Immediate Next Work After The Current Baseline

The next session should pick one of these tracks only:

### Track 4A: Content Quality And Tone Diversity

- strengthen prompt-pack routing in `contentforge`
- intentionally diversify local-model behavior by route, not just by model name
- make shortlist quality improvements measurable through better benchmark coverage and route metadata

### Track 4B: Illustration Quality And Latency

- improve spot-illustration fit so outputs stop looking like full-card templates
- tighten negative-space safety for Pillow composition
- reduce operator-facing timeout confusion around `image-assets/generate`

### Track 4C: Shared-Engine Readiness Gate

- document the readiness bar for starting StoryFactory or ThoughtFactory
- explicitly keep story sequencing, character continuity, and GIF/video scope out of the current eCard improvement cycle

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
- `app/models/operator_option.py`
- `app/models/workflow.py`
- `app/repositories/workflow_repository.py`
- `app/routers/operator_config.py`
- `app/routers/workflow_v1.py`
- `app/schemas/operator_config.py`
- `app/schemas/workflow.py`
- `app/services/__init__.py`
- `app/services/image_generation_service.py`
- `app/services/operator_option_service.py`
- `app/services/workflow_v1_service.py`
- `app/services/workflow_card_renderer.py`
- `app/services/workflow_quality_service.py`
- `app/services/async_content_worker.py`
- `app/store/job_store.py`
- `migrations/versions/031_add_imageforge_ranking_metadata.py`
- `migrations/versions/032_add_async_content_processing_fields.py`
- `migrations/versions/033_add_operator_option_catalog.py`
- `tests/test_operator_option_service.py`
- `tests/test_workflow_quality_service.py`
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
cd ecard-factory
venv/bin/python -m py_compile app/services/workflow_card_renderer.py app/services/workflow_v1_service.py tests/test_workflow_card_renderer.py
venv/bin/python -m pytest tests/test_workflow_card_renderer.py tests/test_imageforge_integration.py tests/test_workflow_v1_router.py -q
```

Result:

- `36 passed in 14.36s`
- compile check passed for the current Stage 3 layout-selection slice

```bash
cd ecard-factory
venv/bin/python -m py_compile app/services/workflow_card_renderer.py tests/test_workflow_card_renderer.py
venv/bin/python -m pytest tests/test_workflow_card_renderer.py tests/test_imageforge_integration.py tests/test_workflow_v1_router.py -q
```

Result:

- `37 passed in 14.28s`
- compile check passed for the Stage 3 visual polish slice

```bash
cd ecard-factory
venv/bin/python -m py_compile app/services/workflow_card_renderer.py tests/test_workflow_card_renderer.py
venv/bin/python -m pytest tests/test_workflow_card_renderer.py tests/test_imageforge_integration.py tests/test_workflow_v1_router.py -q
```

Result:

- `38 passed in 14.23s`
- compile check passed for the Stage 3 theme-ornament slice

```bash
cd ecard-factory
venv/bin/python -m py_compile app/services/workflow_card_renderer.py tests/test_workflow_card_renderer.py
venv/bin/python -m pytest tests/test_workflow_card_renderer.py tests/test_imageforge_integration.py tests/test_workflow_v1_router.py -q
```

Result:

- `40 passed in 14.35s`
- compile check passed for the Stage 3 content-aware balancing slice

```bash
cd ecard-factory
venv/bin/python -m py_compile app/models/operator_option.py app/routers/operator_config.py app/schemas/operator_config.py app/services/operator_option_service.py app/services/workflow_quality_service.py app/services/workflow_v1_service.py app/schemas/workflow.py tests/test_operator_option_service.py tests/test_workflow_quality_service.py
venv/bin/python -m pytest tests/test_operator_option_service.py tests/test_workflow_quality_service.py tests/test_models.py tests/test_workflow_v1_router.py -q
```

Result:

- `32 passed in 14.71s`
- compile check passed for the Stage 4 config-catalog and deterministic quality-scoring slice

```bash
cd content_engine_ui
npm run build
```

Result:

- build succeeded for the new `Config Catalog` screen and config-backed form dropdown wiring

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

- `ecard-factory` has modified Stage 3 renderer/service/test files plus this handoff doc
- `content_engine_ui` still has modified source and built assets from the Studio review cleanup

Do not assume the repos are clean.

## 11. Startup Note

`ecard-factory/startup.txt` contains an outdated path reference and should not be treated as the source of truth.

Actual repo path:

```text
/Users/aritrarpal/Documents/workspace_biz/content_generation_engine/ecard-factory
```

## 11A. Manual QA Workflow For The Current Build

Use this exact workflow to validate the current stack from UI through final export.

Preconditions:

- local stack is running
- `ecard-factory`, `content_engine_ui`, `contentforge`, `imageforge`, Postgres, and ComfyUI are healthy
- Studio is served from `http://localhost:4173`

Step-by-step:

1. Open Studio and create a new job.
   - Expected:
     - job creation returns immediately
     - Studio lands on the job page without waiting for content generation to finish
2. Wait for shortlist generation.
   - Expected:
     - queued/running content state is visible
     - shortlist appears asynchronously
     - no text is auto-selected
3. Select one text candidate manually.
   - Expected:
     - selected text is clearly shown
     - image generation remains unavailable until text is selected
4. Generate image candidates.
   - Expected:
     - ImageForge candidates appear through the canonical `/image-assets/*` flow
     - recommendation metadata is visible:
       - recommended badge
       - `quality_score`
       - `relevance_score`
       - `reason_codes`
     - no image is auto-selected
5. Select one image candidate manually.
   - Expected:
     - selected image is clearly shown
     - final render remains gated on this manual image selection
6. Render the final card.
   - Expected:
     - the `Final Card` section shows the Pillow-composed final card for review
     - the raw image preview must not masquerade as the final eCard review asset
     - the card should use framed art, stronger panel treatment, and the current theme-aware layout defaults
7. Review the current Stage 3 polish outcome.
   - Expected:
     - art fills the framed area more fully because the current layouts now use `cover` fit with explicit crop-focus defaults
     - text panel shows stronger border/frame treatment
     - title/body/signoff should have clearer visual separation because the renderer now uses role-aware font variants
     - different themes should no longer feel visually identical because they now add theme-specific ornament layers
     - the result should look better than the old plain text-over-image composition, but it may still not feel commercially premium yet
8. Approve the final card.
   - Expected:
     - final PNG/PDF export completes
     - job reaches `export_ready`

Failure signals to watch for:

- shortlist never appears after async kickoff
- text or image gets auto-selected
- Studio still shows raw `image_preview` as the final review asset
- final card image crops badly with the new `cover` fit
- typography or spacing visibly overflows the panel
- title/body/signoff still feel visually identical despite the new font-role treatment
- minimal/elegant/festive/playful cards still look visually interchangeable despite the new ornament layer
- approve-final does not produce export assets

## 11B. Practical Next Roadmap Slice

Current practical focus is no longer broad Stage 3 or Stage 4 work. The next useful work is:

1. Stage 4A content quality hardening
2. Stage 4B illustration quality and latency hardening
3. Stage 4C shared-engine readiness gating before sibling apps

Stage 5 UI hardening remains secondary and non-blocking.

Stage 6 bounded agent runtime remains deferred until deterministic quality is stronger.

## 12. Recommended Next Step

### Immediate next action

Use the current Stage 3 plus Stage 4 baseline as stable plumbing, then take exactly one of these next slices:

1. improve content quality and tone diversity in `contentforge`
2. improve illustration quality and latency behavior in `imageforge` plus `ecard-factory`
3. define the shared-engine readiness gate before any StoryFactory or ThoughtFactory work starts

### Scope rule for the next session

The next fresh session should pick one track only:

- Stage 4A content quality hardening
- Stage 4B illustration quality and latency hardening
- Stage 4C shared-engine readiness gate

Do not start Stage 5 or Stage 6 unless a concrete regression or operator issue forces it.

### Guardrails

- do not change the async kickoff contract
- do not introduce a second image path
- keep manual text selection and manual image selection as hard gates
- keep legacy image endpoints compatibility-only unless a bug forces a change
- do not add agent logic
- keep the new config catalog DB-driven and editable; do not reintroduce hardcoded operator dropdowns
- do not start StoryFactory, ThoughtFactory, or GIF/video work in the current cycle

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
- Stage 3 render path is code-complete and regression-tested; treat it as the current baseline
- Stage 4 quality/operator-config baseline is implemented and live-validated
- the immediate next work is not a new product app; it is one of:
  - Stage 4A content quality hardening
  - Stage 4B illustration quality and latency hardening
  - Stage 4C shared-engine readiness gate

First, read:
- ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md
- ecard-factory/docs/NEXT_STEPS_HLD_v0.1.md
- ecard-factory/docs/NEXT_STEPS_LLD_v0.1.md
- ecard-factory/docs/EXECUTION_PLAYBOOK_v0.1.md

Then do this:
- confirm there is no regression against the current Stage 3 and Stage 4 baseline
- pick one next slice only:
  - Stage 4A content quality hardening, or
  - Stage 4B illustration quality and latency hardening, or
  - Stage 4C shared-engine readiness gate
- keep the explicit layout spec as the source of truth for Pillow composition
- preserve the already-validated async kickoff and canonical `/image-assets/*` path

Guardrails:
- do not reintroduce hardcoded dropdown values like `operations team`
- do not change Stage 2 or Stage 2A contracts unless a concrete regression is discovered
- do not add agent logic
- do not introduce a second image path
- do not auto-select text or image
- keep legacy `/generate-image` style routes compatibility-only unless a bug forces a change
- do not start StoryFactory, ThoughtFactory, or GIF/video work
- log every step clearly

Success condition:
- the current baseline still holds, and one concrete Stage 4A/4B/4C improvement is identified or implemented
```

## 14. Exact Prompt To Run One Improvement Slice In A New Session

Use this if you want the next session to execute only one improvement track:

```text
Continue from ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md.

Execute exactly one improvement slice after the current baseline.

First read:
- ecard-factory/docs/NEXT_CHAT_HANDOFF_v0.1.md
- ecard-factory/docs/NEXT_STEPS_HLD_v0.1.md
- ecard-factory/docs/NEXT_STEPS_LLD_v0.1.md

Then choose only one:
- Stage 4A content quality hardening
- Stage 4B illustration quality and latency hardening
- Stage 4C shared-engine readiness gate before sibling apps

Rules:
- keep Stage 3 render behavior on the existing layout-spec path
- preserve async kickoff and canonical `/image-assets/*`
- if a regression is discovered, fix only the regression required to keep the canonical flow healthy
- do not start Stage 5, Stage 6, StoryFactory, ThoughtFactory, or GIF/video work

Success condition:
- one improvement slice is completed or clearly narrowed, without expanding scope
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
