# eCardFactory API Contract v1

## Purpose

This contract defines the minimum endpoints and payloads n8n expects for `eCardFactory Workflow v1`.

Boundary rule:
- n8n calls eCardFactory only.
- n8n never calls ContentForge directly.

Base URL for v1 placeholders:
- `http://localhost:8000`

## Stage 0 Authoritative Fields

- `canonical_stage` is the authoritative workflow stage field for Stage 0 stabilization.
- `current_stage` is a backward-compatible UI label and should not be treated as the canonical state machine key.
- `GET /api/jobs/workflow-contract` returns the explicit stage graph plus primary, secondary, and legacy endpoint inventory.

## Canonical Stage 0 Start-to-Export Path

Primary route sequence:

1. `POST /api/jobs/start`
2. `POST /api/jobs/{job_id}/select-text`
3. `POST /api/jobs/{job_id}/image-assets/generate`
4. `POST /api/jobs/{job_id}/image-assets/{candidate_id}/select`
5. `POST /api/jobs/{job_id}/render-final`
6. `POST /api/jobs/{job_id}/approve-final`

Canonical stage order:

1. `job_created`
2. `text_candidates_ready`
3. `text_selected`
4. `image_candidates_ready`
5. `image_selected`
6. `preview_ready`
7. `export_ready`
8. `failed`

## 1) Start Job

- Method: `POST`
- Path: `/api/jobs/start`
- Called by n8n node: `Start Job`

Request example:
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

Response example:
```json
{
  "job_id": "job_123",
  "status": "content_pending_approval",
  "canonical_stage": "text_candidates_ready",
  "content_preview": "....",
  "winner_model": "qwen2.5:7b-instruct",
  "approval_message": "..."
}
```

## 2) Submit Content Approval

- Method: `POST`
- Path: `/api/jobs/{job_id}/content-approval`
- Called by n8n node: `Submit Content Approval`

Request example:
```json
{
  "decision": "approved",
  "notes": ""
}
```

Response example:
```json
{
  "job_id": "job_123",
  "status": "image_pending_approval",
  "canonical_stage": "image_candidates_ready",
  "image_preview_url": "http://localhost:8000/assets/image_123.png"
}
```

## 3) Submit Image Approval

- Method: `POST`
- Path: `/api/jobs/{job_id}/image-approval`
- Called by n8n node: `Submit Image Approval`

Request example:
```json
{
  "decision": "approved",
  "notes": ""
}
```

Response example:
```json
{
  "job_id": "job_123",
  "status": "final_pending_approval",
  "canonical_stage": "preview_ready",
  "final_preview_url": "http://localhost:8000/assets/final_preview_123.png"
}
```

## 4) Submit Final Approval

- Method: `POST`
- Path: `/api/jobs/{job_id}/final-approval`
- Called by n8n node: `Submit Final Approval`

Request example:
```json
{
  "decision": "approved",
  "notes": ""
}
```

Response example:
```json
{
  "job_id": "job_123",
  "status": "completed",
  "canonical_stage": "export_ready",
  "final_asset_urls": {
    "png": "http://localhost:8000/assets/final_123.png",
    "pdf": "http://localhost:8000/assets/final_123.pdf"
  }
}
```

## Legacy Compatibility Endpoints

The following routes remain available only for compatibility and should not be used as the primary Stage 0 workflow:

- `POST /api/jobs/{job_id}/content-approval`
- `POST /api/jobs/{job_id}/image-approval`
- `POST /api/jobs/{job_id}/final-approval`
- `POST /api/jobs/{job_id}/approve-content`
- `POST /api/jobs/{job_id}/generate-image`
- `POST /api/jobs/{job_id}/approve-image`
- `POST /api/jobs/{job_id}/select-image`
- `POST /api/jobs/{job_id}/generate-more-images`
- `POST /api/jobs/{job_id}/rerun-stage`

## Response Expectations and Error Shape

Minimum success behavior:
- Return HTTP `200` for successful state transitions.
- Return JSON body with the fields shown above.

Recommended error behavior for v1:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "human readable message",
    "details": {}
  }
}
```

Recommended status codes:
- `400` invalid request
- `404` unknown `job_id`
- `409` invalid transition for current job state
- `500` unexpected server error

## TODO for v2

- Add idempotency keys for approval submissions.
- Add callback/webhook model for real async approval waits.
- Add explicit audit event payload contracts.
- Add authentication/authorization requirements.
