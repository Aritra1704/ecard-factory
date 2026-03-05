# ecard-factory

## Phrase prompt style anchors

Phrase prompt construction now supports optional style-reference anchors to improve output microcopy consistency.

- Helper: `app/services/phrase_prompt.py::get_style_anchor(tone_style, emoji_policy) -> list[str]`
- Supported styles: `minimal`, `conversational`, `poetic`, `witty`, `inspirational`
- Prompt insertion text:
  `Style reference (do not copy; match the vibe):`
- New request flag: `style_anchor_enabled` (default: `true`)

### Backward compatibility

- Existing callers do not need to send `style_anchor_enabled`; anchors are enabled by default.
- Compare calls still fall back to legacy payloads when extended fields are rejected by older services.
