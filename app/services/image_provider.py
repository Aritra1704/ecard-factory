"""Provider abstraction for workflow image generation."""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
from typing import Protocol

from fastapi import HTTPException, status

from app.config import settings
from app.services.workflow_card_renderer import FinalCardRenderInput, WorkflowCardRenderer


@dataclass(slots=True)
class ImageGenerationRequest:
    """Normalized input passed into pluggable image providers."""

    job_id: str
    theme_name: str
    approved_text: str
    prompt: str
    audience: str
    cultural_context: str
    theme_style: str
    export_size: str
    count: int
    batch: int = 1
    background_image_url: str | None = None


@dataclass(slots=True)
class ImageCandidateResult:
    """One generated image candidate returned by a provider."""

    provider: str
    prompt: str
    candidate_index: int
    theme_style: str
    text_alignment: str
    image_bytes: bytes


class ImageProvider(Protocol):
    """Interface implemented by workflow image providers."""

    name: str

    async def generate_candidates(self, request: ImageGenerationRequest) -> list[ImageCandidateResult]:
        """Generate one or more image candidates for a workflow job."""


class _LocalRendererImageProvider:
    """Workflow-local image provider backed by the existing card renderer."""

    def __init__(self, *, name: str, renderer: WorkflowCardRenderer | None = None) -> None:
        self.name = name
        self._renderer = renderer or WorkflowCardRenderer()

    async def generate_candidates(self, request: ImageGenerationRequest) -> list[ImageCandidateResult]:
        variants = self._build_variants(
            base_style=request.theme_style,
            count=request.count,
            batch=request.batch,
        )
        results: list[ImageCandidateResult] = []
        for index, variant in enumerate(variants, start=1):
            payload = FinalCardRenderInput(
                title=(request.theme_name or "").strip() or None,
                message=request.approved_text,
                signoff=None,
                theme_style=variant["theme_style"],
                background_image_url=request.background_image_url,
                text_alignment=variant["text_alignment"],
                export_size=request.export_size,
            )
            results.append(
                ImageCandidateResult(
                    provider=self.name,
                    prompt=request.prompt,
                    candidate_index=index,
                    theme_style=variant["theme_style"],
                    text_alignment=variant["text_alignment"],
                    image_bytes=self._renderer.render_final_png(payload),
                )
            )
        return results

    def _build_variants(self, *, base_style: str, count: int, batch: int) -> list[dict[str, str]]:
        """Return lightweight local visual variants for one provider run."""

        style_order = self._style_order(base_style)
        alignments = ["center", "left", "right"]
        variants: list[dict[str, str]] = []
        for index in range(max(1, count)):
            variants.append(
                {
                    "theme_style": style_order[index % len(style_order)],
                    "text_alignment": alignments[(batch + index) % len(alignments)],
                }
            )
        return variants

    def _style_order(self, base_style: str) -> list[str]:
        """Return provider-specific style ordering."""

        normalized_base = (base_style or "minimal").strip().lower()
        base = normalized_base if normalized_base in {"minimal", "festive", "elegant", "playful"} else "minimal"
        if self.name == "local_flux":
            seed = [base, "playful", "minimal", "elegant", "festive"]
        else:
            seed = [base, "elegant", "minimal", "playful", "festive"]
        ordered: list[str] = []
        for item in seed:
            if item not in ordered:
                ordered.append(item)
        return ordered


class DalleImageProvider:
    """Non-default placeholder provider kept for future paid-provider integration."""

    name = "dalle"

    async def generate_candidates(self, request: ImageGenerationRequest) -> list[ImageCandidateResult]:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail=(
                "IMAGE_PROVIDER=dalle is not implemented for workflow image generation yet. "
                "Use IMAGE_PROVIDER=local_sdxl or IMAGE_PROVIDER=local_flux."
            ),
        )


@lru_cache(maxsize=3)
def _build_provider(provider_name: str) -> ImageProvider:
    normalized = provider_name.strip().lower()
    if normalized == "local_flux":
        return _LocalRendererImageProvider(name="local_flux")
    if normalized == "dalle":
        return DalleImageProvider()
    return _LocalRendererImageProvider(name="local_sdxl")


def get_image_provider(provider_name: str | None = None) -> ImageProvider:
    """Return the configured workflow image provider."""

    return _build_provider((provider_name or settings.image_provider or "local_sdxl").strip().lower())
