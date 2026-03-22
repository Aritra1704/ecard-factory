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
- Stage 3 composition quality is still not premium
- live visual QA is still needed for the current framed-art and `cover`-fit layouts
- quality/scoring layer is not implemented yet

## Rules
- never embed text inside image
- always use selected assets only
- keep `/api/jobs/{job_id}/image-assets/*` as the canonical image path
- keep async kickoff behavior intact while Stage 3 is being polished
