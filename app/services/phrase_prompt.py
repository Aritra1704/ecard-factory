"""Helpers for phrase prompt style anchoring."""

from __future__ import annotations

import re

EMOJI_PATTERN = re.compile(
    r"[\U0001F300-\U0001FAFF\U00002700-\U000027BF\u2600-\u26FF\U0001F1E6-\U0001F1FF]"
)

STYLE_ANCHORS: dict[str, list[str]] = {
    "minimal": [
        "Quiet focus, clear intent.",
        "Small words, sharp meaning.",
        "Calm tone, no extra flourish.",
        "One thought, one clean line.",
        "Warm but compact.",
    ],
    "conversational": [
        "Write like a thoughtful friend.",
        "Natural, everyday wording.",
        "Easy rhythm, easy to read.",
        "Warm and direct.",
        "Relatable, never stiff.",
    ],
    "poetic": [
        "Use light imagery and gentle motion.",
        "Soft metaphors, grounded meaning.",
        "Lyrical without heavy ornament.",
        "Let the line breathe.",
        "Quiet beauty over drama.",
    ],
    "witty": [
        "Light cleverness with a smile.",
        "Playful turns, clean intent.",
        "Smart and friendly, never mean.",
        "One crisp twist is enough.",
        "Keep humor kind and clear.",
    ],
    "inspirational": [
        "Steady encouragement, not hype.",
        "Confident voice, grounded hope.",
        "Forward-looking and practical.",
        "Strength with warmth.",
        "Uplifting, not preachy.",
    ],
}


def _strip_emojis(text: str) -> str:
    """Remove emoji glyphs from one string and normalize surrounding whitespace."""

    return re.sub(r"\s+", " ", EMOJI_PATTERN.sub("", text)).strip()


def get_style_anchor(tone_style: str, emoji_policy: str) -> list[str]:
    """Return short vibe-reference lines for the requested tone style.

    The lines are guidance anchors only; callers should instruct models not to
    copy them verbatim.
    """

    normalized_tone = tone_style.strip().lower()
    normalized_policy = emoji_policy.strip().lower()
    anchors = list(STYLE_ANCHORS.get(normalized_tone, STYLE_ANCHORS["conversational"]))

    if normalized_policy == "none":
        sanitized: list[str] = []
        for anchor in anchors:
            cleaned = _strip_emojis(anchor)
            if cleaned:
                sanitized.append(cleaned)
        return sanitized

    return anchors
