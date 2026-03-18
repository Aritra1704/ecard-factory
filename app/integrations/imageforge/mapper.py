"""Map eCardFactory job state into the ImageForge request contract."""

from __future__ import annotations

from typing import Any

from app.config import settings
from app.integrations.imageforge.schemas import (
    CreativeDirection,
    GenerateImageRequest,
    ProviderTarget,
    RenderSpec,
    SceneSpec,
)

_TEXT_AVOID_KEYWORDS = [
    "readable text",
    "embedded typography",
    "poster",
    "greeting card layout",
    "page design",
    "headline",
]

_BUCKET_PROFILES: dict[str, dict[str, Any]] = {
    "everyday": {
        "workflow_type": "ecard_background",
        "asset_type": "background_full",
        "style_profile": "soft_color_illustration",
        "motif_hint": "soft reusable greeting-card backdrop with subtle decorative accents",
        "subject_hint": "single symbolic focal element",
        "visual_keywords": ["gentle depth", "clean negative space", "soft lighting"],
        "scene_subject": "stylized celebratory backdrop",
        "scene_composition": "full-bleed reusable background",
        "scene_background_intent": "warm everyday greeting-card atmosphere",
    },
    "occasion": {
        "workflow_type": "ecard_background",
        "asset_type": "background_full",
        "style_profile": "soft_color_illustration",
        "motif_hint": "festive reusable backdrop with cultural ornament and layered celebration energy",
        "subject_hint": "symbolic festive centerpiece",
        "visual_keywords": ["celebratory accents", "ornamental details", "warm ambient glow"],
        "scene_subject": "festive decorative backdrop",
        "scene_composition": "full-bleed reusable background",
        "scene_background_intent": "culturally aware celebration setting without embedded text",
    },
    "current_event": {
        "workflow_type": "supporting_scene",
        "asset_type": "hero_illustration",
        "style_profile": "flat_illustration",
        "motif_hint": "editorial-style symbolic visual asset without text or poster layout",
        "subject_hint": "single symbolic subject",
        "visual_keywords": ["clean silhouette", "focused subject", "non-textual storytelling"],
        "scene_subject": "editorial symbolic scene",
        "scene_composition": "supporting scene",
        "scene_background_intent": "contextual atmosphere without headlines or layout chrome",
    },
}

_THEME_KEY_OVERRIDES: dict[str, dict[str, Any]] = {
    "holi-week": {
        "subject_hint": "festive color burst with rangoli-inspired ornament",
        "visual_keywords": ["powder color bloom", "joyful movement", "Indian festive detail"],
        "scene_subject": "Holi-inspired celebratory backdrop",
        "scene_background_intent": "bright Indian celebration mood with room for readable overlay text",
    },
    "diwali-week": {
        "subject_hint": "diya-lit decorative glow scene",
        "visual_keywords": ["lamp glow", "warm gold light", "festive ornament"],
        "scene_subject": "Diwali-inspired luminous backdrop",
        "scene_background_intent": "warm festival-of-lights atmosphere with open composition",
    },
    "ramadan-month": {
        "subject_hint": "crescent and lantern-inspired reflective centerpiece",
        "visual_keywords": ["soft lantern glow", "quiet elegance", "respectful ornament"],
        "scene_subject": "Ramadan-inspired reflective backdrop",
        "scene_background_intent": "calm spiritual atmosphere with restrained ornament",
    },
    "eid-celebration": {
        "subject_hint": "crescent and lantern celebration scene",
        "visual_keywords": ["festive lanterns", "warm celebration light", "ornamental detail"],
        "scene_subject": "Eid celebration backdrop",
        "scene_background_intent": "bright but respectful celebration setting",
    },
    "valentines-week": {
        "subject_hint": "romantic floral centerpiece with soft light",
        "visual_keywords": ["rose tones", "soft glow", "gentle romance"],
        "scene_subject": "romantic greeting-card backdrop",
        "scene_background_intent": "intimate celebratory atmosphere with clean composition",
    },
    "friendship-day": {
        "subject_hint": "playful shared-moment illustration cue",
        "visual_keywords": ["lighthearted energy", "warm palette", "friendly atmosphere"],
        "scene_subject": "friendship celebration backdrop",
        "scene_background_intent": "supportive and upbeat shared-moment mood",
    },
}

_VISUAL_STYLE_TO_PROFILE = {
    "editorial": "flat_illustration",
    "elegant": "premium_render",
    "festive": "soft_color_illustration",
    "minimal": "flat_illustration",
    "playful": "soft_color_illustration",
}


def build_imageforge_generate_request(
    job: dict[str, Any],
    *,
    candidate_count: int | None = None,
) -> GenerateImageRequest:
    """Build one ImageForge request using eCardFactory-owned job and theme data."""

    output_spec = job.get("output_spec") if isinstance(job.get("output_spec"), dict) else {}
    metadata = output_spec.get("metadata") if isinstance(output_spec.get("metadata"), dict) else {}
    imageforge_meta = metadata.get("imageforge") if isinstance(metadata.get("imageforge"), dict) else {}
    theme_bucket = _resolve_theme_bucket(job, metadata)
    visual_style = str(
        imageforge_meta.get("visual_style")
        or job.get("visual_style")
        or metadata.get("default_visual_style")
        or "minimal"
    ).strip() or "minimal"
    theme_key = str(metadata.get("theme_key") or imageforge_meta.get("theme_key") or "").strip().lower() or None
    base_profile = dict(_BUCKET_PROFILES.get(theme_bucket, _BUCKET_PROFILES["everyday"]))
    if theme_key and theme_key in _THEME_KEY_OVERRIDES:
        base_profile.update(_THEME_KEY_OVERRIDES[theme_key])

    workflow_type = str(imageforge_meta.get("workflow_type") or base_profile["workflow_type"]).strip()
    asset_type = str(imageforge_meta.get("asset_type") or base_profile["asset_type"]).strip()
    style_profile = str(
        imageforge_meta.get("style_profile")
        or _VISUAL_STYLE_TO_PROFILE.get(visual_style.lower(), base_profile["style_profile"])
    ).strip()
    creative_direction = _resolve_creative_direction(
        job=job,
        metadata=metadata,
        imageforge_meta=imageforge_meta,
        profile=base_profile,
        visual_style=visual_style,
    )
    scene_spec = _resolve_scene_spec(
        job=job,
        metadata=metadata,
        imageforge_meta=imageforge_meta,
        profile=base_profile,
    )
    render_spec = _resolve_render_spec(output_spec=output_spec, imageforge_meta=imageforge_meta)

    return GenerateImageRequest(
        theme_name=str(job.get("theme_name") or "Untitled Theme"),
        theme_bucket=theme_bucket,
        cultural_context=str(job.get("cultural_context") or "").strip() or None,
        selected_text=str(job.get("content_preview") or "").strip() or None,
        workflow_type=workflow_type,
        asset_type=asset_type,
        style_profile=style_profile,
        scene_spec=scene_spec,
        render_spec=render_spec,
        creative_direction=creative_direction,
        tone_style=str(job.get("tone_style") or "").strip() or None,
        visual_style=visual_style,
        candidate_count=int(candidate_count or settings.imageforge_default_candidate_count),
        provider_targets=[
            ProviderTarget(
                provider=str(settings.imageforge_default_provider),
                model=str(settings.imageforge_default_model),
            )
        ],
        trace_id=str(job.get("trace_id") or "").strip() or None,
        notes=str(job.get("operator_notes") or "").strip() or None,
    )


def _resolve_theme_bucket(job: dict[str, Any], metadata: dict[str, Any]) -> str:
    explicit = str(metadata.get("theme_bucket") or "").strip().lower()
    if explicit in _BUCKET_PROFILES:
        return explicit
    theme_name = str(job.get("theme_name") or "").strip().lower()
    if any(token in theme_name for token in ("ramadan", "holi", "diwali", "eid", "valentine", "friendship day")):
        return "occasion"
    return "everyday"


def _resolve_creative_direction(
    *,
    job: dict[str, Any],
    metadata: dict[str, Any],
    imageforge_meta: dict[str, Any],
    profile: dict[str, Any],
    visual_style: str,
) -> CreativeDirection:
    explicit = imageforge_meta.get("creative_direction")
    if isinstance(explicit, dict):
        return CreativeDirection.model_validate(explicit)

    description = str(metadata.get("theme_description") or "").strip()
    theme_name = str(job.get("theme_name") or "Untitled Theme").strip()
    cultural_context = str(job.get("cultural_context") or "").strip()
    visual_keywords = list(profile.get("visual_keywords") or [])
    for value in (visual_style, cultural_context, description):
        cleaned = str(value or "").strip()
        if cleaned and cleaned not in visual_keywords:
            visual_keywords.append(cleaned)

    return CreativeDirection(
        motif_hint=str(profile.get("motif_hint") or f"reusable backdrop inspired by {theme_name}"),
        subject_hint=str(profile.get("subject_hint") or theme_name),
        visual_keywords=visual_keywords,
        avoid_keywords=list(dict.fromkeys([*profile.get("avoid_keywords", []), *_TEXT_AVOID_KEYWORDS])),
    )


def _resolve_scene_spec(
    *,
    job: dict[str, Any],
    metadata: dict[str, Any],
    imageforge_meta: dict[str, Any],
    profile: dict[str, Any],
) -> SceneSpec:
    explicit = imageforge_meta.get("scene_spec")
    if isinstance(explicit, dict):
        return SceneSpec.model_validate(explicit)

    theme_name = str(job.get("theme_name") or "Untitled Theme").strip()
    description = str(metadata.get("theme_description") or "").strip()
    background_intent = str(
        profile.get("scene_background_intent")
        or description
        or job.get("cultural_context")
        or "clean reusable card backdrop"
    )
    return SceneSpec(
        subject=str(profile.get("scene_subject") or theme_name),
        composition=str(profile.get("scene_composition") or "full-bleed reusable background"),
        background_intent=background_intent,
    )


def _resolve_render_spec(*, output_spec: dict[str, Any], imageforge_meta: dict[str, Any]) -> RenderSpec:
    explicit = imageforge_meta.get("render_spec")
    if isinstance(explicit, dict):
        return RenderSpec.model_validate(explicit)

    rendering = output_spec.get("rendering") if isinstance(output_spec.get("rendering"), dict) else {}
    export_size = str(rendering.get("export_size") or "").strip().lower()
    if "x" in export_size:
        raw_width, _, raw_height = export_size.partition("x")
        scaled = _scaled_dimensions(raw_width, raw_height)
        if scaled is not None:
            width, height = scaled
            return RenderSpec(
                width=width,
                height=height,
                orientation=_orientation_for(width, height),
                quality_profile="draft",
            )

    return RenderSpec(width=512, height=512, orientation="square", quality_profile="draft")


def _scaled_dimensions(raw_width: str, raw_height: str) -> tuple[int, int] | None:
    try:
        width = int(raw_width)
        height = int(raw_height)
    except (TypeError, ValueError):
        return None
    if width <= 0 or height <= 0:
        return None
    scale = min(1.0, 768 / max(width, height))
    next_width = max(64, int(round((width * scale) / 64)) * 64)
    next_height = max(64, int(round((height * scale) / 64)) * 64)
    return next_width, next_height


def _orientation_for(width: int, height: int) -> str:
    if width == height:
        return "square"
    if width > height:
        return "landscape"
    return "portrait"
