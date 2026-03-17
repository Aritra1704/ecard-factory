# Role
Orchestrator service responsible for final card creation.

## Responsibilities
- Manage full pipeline flow
- Handle user selections (text + image)
- Render final card
- Maintain themes and layouts

## Should NOT do
- Generate text (handled by contentforge)
- Generate images (handled by imageforge)

## Inputs
- shortlisted text
- selected image assets

## Outputs
- final rendered eCard

## Current Issues
- unstable preview rendering
- stage/progress sync issues

## Rules
- never embed text inside image
- always use selected assets only