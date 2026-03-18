# eCardFactory n8n workflow v2 notes

Base URL used by n8n:
- http://host.docker.internal:8080

What changed from v1:
- v2 is Studio-first, not approval-gate-first
- text, image, and final card generation auto-run in sequence
- image options are generated for later operator choice in Studio
- the main workflow no longer pauses on manual content/image/final approvals

Why approvals were demoted:
- Stage 2 makes cards the main artifact
- operators should see usable text, image, and final card output by default
- approve/reject endpoints still exist, but they are no longer the main path through n8n

v2 flow summary:
1. POST /api/jobs/start
2. POST /api/jobs/{job_id}/approve-content
3. POST /api/jobs/{job_id}/generate-more-images
4. POST /api/jobs/{job_id}/generate-image
5. POST /api/jobs/{job_id}/approve-image
6. POST /api/jobs/{job_id}/render-final
7. GET /api/jobs/{job_id}/assets

How rerun actions work:
- operators use the eCard Studio UI or backend endpoints after the initial run
- Regenerate Text -> reruns content_generation
- Regenerate Image -> reruns image_generation
- Regenerate Card -> reruns final_render
- Use This Text and Use This Image stay UI/backend driven and are not part of the base n8n v2 chain

Ports and Docker assumptions:
- unchanged from v1
- eCardFactory stays on localhost:8080
- n8n stays on localhost:5678
- ContentForge is still not called directly from n8n
