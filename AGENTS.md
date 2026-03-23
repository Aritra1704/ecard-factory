# Role
Orchestrator service responsible for final card creation.

## Responsibilities
- Manage full pipeline flow
- Handle user selections (text + image)
- Render final card with Pillow
- Maintain themes and layouts
- Own canonical workflow state and final export

## Should NOT do
- Generate text (handled by contentforge)
- Generate images (handled by imageforge)

## Inputs
- shortlisted text
- selected image assets

## Outputs
- final rendered eCard

## Current Issues
- Stage 3 composition still needs one live Studio visual signoff pass
- Stage 4 deterministic quality scoring is implemented, but the system still needs actual content-quality improvement
- config-catalog routes and UI wiring are in place, but they still need live QA against the running stack

## Rules
- never embed text inside image
- always use selected assets only
- keep `/api/jobs/{job_id}/image-assets/*` as the canonical image path
- keep async kickoff behavior intact while Stage 3 and Stage 4 are being verified
- keep operator dropdowns DB-driven; do not reintroduce hardcoded form values like `operations team`
