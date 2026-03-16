"""Local DTOs for the ImageForge HTTP contract."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class ProviderTarget(BaseModel):
    """One concrete ImageForge provider target."""

    provider: str
    model: str | None = None


class CreativeDirection(BaseModel):
    """Caller-owned theme and motif guidance passed into ImageForge."""

    motif_hint: str
    subject_hint: str
    visual_keywords: list[str] = Field(default_factory=list)
    avoid_keywords: list[str] = Field(default_factory=list)


class SceneSpec(BaseModel):
    """Structured scene guidance for one asset generation request."""

    subject: str
    composition: str
    background_intent: str


class RenderSpec(BaseModel):
    """Structured render intent for one asset generation request."""

    width: int = Field(ge=64)
    height: int = Field(ge=64)
    orientation: str
    quality_profile: str


class GenerateImageRequest(BaseModel):
    """Payload sent to ImageForge generate."""

    theme_name: str
    theme_bucket: str
    cultural_context: str | None = None
    selected_text: str | None = None
    workflow_type: str
    asset_type: str
    style_profile: str
    scene_spec: SceneSpec | str | None = None
    render_spec: RenderSpec | str | None = None
    creative_direction: CreativeDirection | None = None
    tone_style: str | None = None
    visual_style: str | None = None
    candidate_count: int = Field(ge=1)
    provider_targets: list[ProviderTarget] = Field(default_factory=list)
    trace_id: str | None = None
    notes: str | None = None


class RegenerateImageRequest(BaseModel):
    """Payload sent to ImageForge regenerate."""

    request_id: str
    provider_targets: list[ProviderTarget] | None = None
    candidate_count: int | None = Field(default=None, ge=1)
    trace_id: str | None = None


class GeneratedCandidate(BaseModel):
    """One generated image candidate returned by ImageForge."""

    candidate_id: str
    provider_run_id: str
    provider: str
    model: str | None = None
    candidate_index: int
    relative_path: str
    public_url: str
    is_selected: bool
    width: int | None = None
    height: int | None = None
    created_at: datetime


class ProviderError(BaseModel):
    """One provider execution error payload."""

    type: str
    message: str


class ProviderExecution(BaseModel):
    """One provider execution result returned by ImageForge."""

    status: str
    stage: str
    progress_pct: int = Field(ge=0, le=100)
    started_at: datetime | None = None
    finished_at: datetime | None = None
    provider: str
    model: str | None = None
    ok: bool
    latency_ms: int | None = None
    prompt_used: str
    negative_prompt_used: str
    workflow_name: str | None = None
    candidates: list[GeneratedCandidate] = Field(default_factory=list)
    error: ProviderError | None = None


class GenerationResponse(BaseModel):
    """Generate/regenerate response returned by ImageForge."""

    status: str
    stage: str
    progress_pct: int = Field(ge=0, le=100)
    started_at: datetime | None = None
    finished_at: datetime | None = None
    ok: bool
    request_id: str
    trace_id: str | None = None
    results: list[ProviderExecution] = Field(default_factory=list)
    meta: dict[str, Any] = Field(default_factory=dict)


class ImageRequestRecord(BaseModel):
    """Persisted ImageForge request detail."""

    request_id: str
    trace_id: str | None = None
    theme_name: str
    theme_bucket: str
    cultural_context: str | None = None
    selected_text: str | None = None
    workflow_type: str | None = None
    asset_type: str | None = None
    style_profile: str | None = None
    scene_spec: SceneSpec | str | None = None
    render_spec: RenderSpec | str | None = None
    creative_direction: CreativeDirection | None = None
    tone_style: str | None = None
    visual_style: str | None = None
    candidate_count: int | None = None
    notes: str | None = None
    request_payload_json: dict[str, Any] = Field(default_factory=dict)
    status: str
    stage: str
    progress_pct: int = Field(ge=0, le=100)
    started_at: datetime | None = None
    finished_at: datetime | None = None
    created_at: datetime


class ImageCandidateRecord(BaseModel):
    """Persisted candidate detail returned by ImageForge."""

    candidate_id: str
    request_id: str
    provider_run_id: str
    provider: str
    model: str | None = None
    candidate_index: int
    prompt_used: str
    negative_prompt_used: str
    relative_path: str
    public_url: str
    selected_asset_relative_path: str | None = None
    selected_asset_public_url: str | None = None
    storage_backend: str
    file_size_bytes: int | None = None
    width: int | None = None
    height: int | None = None
    is_selected: bool
    selected_at: datetime | None = None
    created_at: datetime


class RequestDetailResponse(BaseModel):
    """Request detail response used for local resync when needed."""

    ok: bool
    request: ImageRequestRecord
    provider_runs: list[dict[str, Any]] = Field(default_factory=list)
    candidates: list[ImageCandidateRecord] = Field(default_factory=list)
    selected_candidate: ImageCandidateRecord | None = None


class SelectCandidateResponse(BaseModel):
    """Selection response returned by ImageForge."""

    ok: bool
    candidate: ImageCandidateRecord
