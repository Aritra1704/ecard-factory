# eCardFactory n8n Workflow v1

## Overview

This workflow is a thin orchestration layer for approvals around card generation.

It is intentionally limited to:
- manual trigger
- local/API-base-url configurable API calls
- simulated human approvals using Set nodes
- no retries, no waits, no schedules, no external notifications

## Architecture Boundary

n8n calls only eCardFactory endpoints.

n8n does not call:
- ContentForge
- model providers
- image generators

Reason: eCardFactory is the facade and audit owner. ContentForge stays internal to eCardFactory.

## What This Workflow Does

- Starts a new card job via eCardFactory.
- Extracts required fields from each API response.
- Prepares human-readable approval messages (placeholder only).
- Simulates content, image, and final approvals as `approved`.
- Submits those simulated approvals back to eCardFactory.
- Prepares a final completion summary.

## What This Workflow Does NOT Do

- No direct ContentForge calls.
- No Telegram/Slack/email integration yet.
- No asynchronous wait/timeout logic.
- No retry logic.
- No schedule trigger.
- No batch runs.

## Node-by-Node Details

1. `Manual Trigger`
- Type: `manualTrigger`
- Input: none
- Output: single empty item

2. `Start Job`
- Type: `httpRequest` (POST)
- Endpoint: `{{$node["Runtime Config"].json.base_url}}/api/jobs/start`
- Request body:
```json
{
  "theme_name": "Warm birthday message",
  "tone_funny_pct": 20,
  "tone_emotion_pct": 75,
  "tone_style": "conversational",
  "audience": "close friend",
  "cultural_context": "bengali",
  "output_spec": {
    "format": "paragraph",
    "length": { "target_words": 80 },
    "structure": { "no_lists": true, "no_numbering": true }
  },
  "avoid_cliches": true
}
```
- Expected response fields: `job_id`, `status`, `content_preview`, `winner_model`, `approval_message`

3. `Extract Start Job Fields`
- Type: `set`
- Output fields: `job_id`, `content_preview`, `winner_model`, `status`

4. `Prepare Content Approval Message`
- Type: `set` (placeholder notification)
- Builds `content_approval_message` for human review
- TODO: replace with real messaging integration in v2

5. `Simulate Content Approval`
- Type: `set`
- Sets `content_decision = approved`, `content_notes = ""`

6. `Content Approved?`
- Type: `if`
- Condition: `content_decision === "approved"`

7. `Submit Content Approval`
- Type: `httpRequest` (POST)
- Endpoint: `{{$node["Runtime Config"].json.base_url}}/api/jobs/{{$json.job_id}}/content-approval`
- Request body:
```json
{
  "decision": "approved",
  "notes": ""
}
```
- Expected response fields: `job_id`, `status`, `image_preview_url`

8. `Extract Image Approval Fields`
- Type: `set`
- Output fields: `job_id`, `status`, `image_preview_url`

9. `Prepare Image Approval Message`
- Type: `set` (placeholder notification)
- Builds `image_approval_message`
- TODO: replace with real messaging integration in v2

10. `Simulate Image Approval`
- Type: `set`
- Sets `image_decision = approved`, `image_notes = ""`

11. `Image Approved?`
- Type: `if`
- Condition: `image_decision === "approved"`

12. `Submit Image Approval`
- Type: `httpRequest` (POST)
- Endpoint: `{{$node["Runtime Config"].json.base_url}}/api/jobs/{{$json.job_id}}/image-approval`
- Request body:
```json
{
  "decision": "approved",
  "notes": ""
}
```
- Expected response fields: `job_id`, `status`, `final_preview_url`

13. `Extract Final Approval Fields`
- Type: `set`
- Output fields: `job_id`, `status`, `final_preview_url`

14. `Prepare Final Approval Message`
- Type: `set` (placeholder notification)
- Builds `final_approval_message`
- TODO: replace with real messaging integration in v2

15. `Simulate Final Approval`
- Type: `set`
- Sets `final_decision = approved`, `final_notes = ""`

16. `Final Approved?`
- Type: `if`
- Condition: `final_decision === "approved"`

17. `Submit Final Approval`
- Type: `httpRequest` (POST)
- Endpoint: `{{$node["Runtime Config"].json.base_url}}/api/jobs/{{$json.job_id}}/final-approval`
- Request body:
```json
{
  "decision": "approved",
  "notes": ""
}
```
- Expected response fields: `job_id`, `status`, `final_asset_urls`

18. `Prepare Completion Summary`
- Type: `set`
- Output fields: `job_id`, `status`, `final_asset_png`, `final_asset_pdf`, `summary_message`

19. `Content Rejected Placeholder`
20. `Image Rejected Placeholder`
21. `Final Rejected Placeholder`
- Type: `set`
- Purpose: explicit false-branch placeholders for simulation mode
- TODO: map these branches to real rejection handling in v2

## Import Instructions (n8n)

1. Open n8n UI.
2. Go to `Workflows`.
3. Click `Import from File`.
4. Select `workflows/ecardfactory_n8n_workflow_v1.json`.
5. Confirm workflow name is `eCardFactory Workflow v1`.
6. Save workflow.
7. Click `Execute workflow` to test with manual trigger.

No credentials are required for import. Set `base_url` in the `Runtime Config` node:

- Local app: `http://localhost:8000`
- n8n in Docker calling app on host machine: `http://host.docker.internal:8000`

## Required eCardFactory Responses for Flow Continuity

To keep the workflow moving, each endpoint should return:

- `/api/jobs/start`: `job_id`, `status`, `content_preview`, `winner_model`
- `/api/jobs/{job_id}/content-approval`: `job_id`, `status`, `image_preview_url`
- `/api/jobs/{job_id}/image-approval`: `job_id`, `status`, `final_preview_url`
- `/api/jobs/{job_id}/final-approval`: `job_id`, `status`, `final_asset_urls.png`, `final_asset_urls.pdf`

If any field is missing, downstream Set nodes may produce empty values.
