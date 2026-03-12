# eCardFactory n8n workflow v1 notes

Base URL used by n8n:
- http://host.docker.internal:8080

Approval nodes use:
- Body Content Type: JSON
- Specify Body: Using Fields Below

Required eCardFactory endpoints:
- POST /api/jobs/start
- POST /api/jobs/{job_id}/content-approval
- POST /api/jobs/{job_id}/image-approval
- POST /api/jobs/{job_id}/final-approval

ContentForge is never called directly from n8n.
