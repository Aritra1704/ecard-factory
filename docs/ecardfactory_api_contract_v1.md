# eCardFactory API Contract v1

## Purpose

This contract defines the minimum endpoints and payloads n8n expects for `eCardFactory Workflow v1`.

Boundary rule:
- n8n calls eCardFactory only.
- n8n never calls ContentForge directly.

Base URL for v1 placeholders:
- `http://localhost:8000`

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
  "final_asset_urls": {
    "png": "http://localhost:8000/assets/final_123.png",
    "pdf": "http://localhost:8000/assets/final_123.pdf"
  }
}
```

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
