"""Pydantic schemas for v1 n8n workflow endpoints."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, Field


class OutputLength(BaseModel):
    """Word-target settings for generated message length."""

    target_words: int = Field(default=80, ge=1)


class OutputStructure(BaseModel):
    """Formatting constraints expected by downstream content generation."""

    no_lists: bool = True
    no_numbering: bool = True


class OutputSpec(BaseModel):
    """Structured output shape requested by n8n for content generation."""

    format: str = "paragraph"
    length: OutputLength = Field(default_factory=OutputLength)
    structure: OutputStructure = Field(default_factory=OutputStructure)


class RenderConfig(BaseModel):
    """Rendering inputs for preview/final card composition."""

    title: str | None = None
    message: str | None = None
    signoff: str | None = None
    theme_style: Literal["minimal", "festive", "elegant", "playful"] = "minimal"
    background_image_url: str | None = None
    text_alignment: Literal["left", "center", "right"] = "center"
    export_size: str = "1080x1350"


class StartJobRequest(BaseModel):
    """Request payload used by n8n to start a new card job."""

    theme_name: str
    tone_funny_pct: int = Field(ge=0, le=100)
    tone_emotion_pct: int = Field(ge=0, le=100)
    tone_style: str = "conversational"
    audience: str
    cultural_context: str
    output_spec: OutputSpec = Field(default_factory=OutputSpec)
    avoid_cliches: bool = True
    rendering: RenderConfig = Field(default_factory=RenderConfig)
    cards_per_theme: int = Field(default=10, ge=1, le=50)
    notes: str | None = None


class StartJobResponse(BaseModel):
    """Response sent back to n8n after initial generation + judging."""

    job_id: str
    status: str
    content_preview: str
    winner_model: str
    approval_message: str
    candidate_pool_count: int = 0
    shortlist_count: int = 0


class DailyThemeJobResponse(BaseModel):
    """Response returned when creating one job from today's resolved Theme Factory theme."""

    job_id: str
    status: str
    theme_name: str
    weekday: str
    source: str = "theme_schedule"
    cards_per_theme: int = 10


class ThemeJobCreateRequest(BaseModel):
    """Request payload for starting one workflow job from a resolved or selected theme."""

    cards_per_theme: int = Field(default=10, ge=1, le=50)
    notes: str | None = None
    copy_style: Literal["witty", "playful", "heartfelt", "minimal", "short_crisp", "warm_note"] = "minimal"
    target_words: int = Field(default=14, ge=4, le=60)
    tone_funny_pct: int | None = Field(default=None, ge=0, le=100)


class StartFromThemeRequest(ThemeJobCreateRequest):
    """Request payload for manual Theme Factory job creation."""

    theme_key: str


class ApprovalRequest(BaseModel):
    """Final approval payload, validated in service for explicit 400 errors."""

    decision: str
    notes: str = ""


class ContentApprovalRequest(BaseModel):
    """Approval payload for content gate, including timeout outcome."""

    decision: Literal["approved", "rejected", "timeout"]
    notes: str = ""


class ImageApprovalRequest(BaseModel):
    """Approval payload for image gate, including timeout outcome."""

    decision: str
    notes: str | None = ""


class ContentApprovalResponse(BaseModel):
    """Response after content approval state update."""

    job_id: str
    status: str
    image_prompt: str | None = None
    image_preview_url: str | None = None


class ImageApprovalResponse(BaseModel):
    """Response after image approval state update."""

    job_id: str
    status: str
    final_preview_url: str | None = None


class FinalAssetUrls(BaseModel):
    """Exported asset references for the completed job."""

    png: str
    pdf: str


class FinalApprovalResponse(BaseModel):
    """Response after final approval state update."""

    job_id: str
    status: str
    final_asset_urls: FinalAssetUrls | None = None


class CandidateDebugResponse(BaseModel):
    """Candidate data returned by the debug endpoint."""

    id: int | None = None
    model: str
    backend: str
    text: str
    content_text: str
    raw_score: float
    judged_score: float
    judge_score: float
    is_winner: bool
    is_shortlisted: bool = False
    is_selected: bool = False
    shortlist_rank: int | None = None


class ShortlistEntryResponse(BaseModel):
    """Ranked shortlist entry returned by shortlist APIs."""

    shortlist_id: int | None = None
    candidate_id: int
    rank: int
    score: float
    model: str
    backend: str
    text: str
    is_selected: bool = False
    created_at: datetime | None = None


class ApprovalDebugResponse(BaseModel):
    """Approval event data returned by the debug endpoint."""

    stage: str
    decision: str
    notes: str | None = None
    decided_by: str = "n8n_v1"
    decided_at: datetime


class ImageCandidateDebugResponse(BaseModel):
    """Persisted image candidate metadata returned by debug endpoint."""

    id: int | None = None
    stage: str
    provider: str
    prompt: str
    candidate_index: int
    public_url: str
    relative_path: str
    is_selected: bool = False
    created_at: datetime | None = None


class AuditEventDebugResponse(BaseModel):
    """Audit event returned by the debug endpoint."""

    event_type: str
    event_payload_json: dict[str, Any]
    created_at: datetime


class JobDebugResponse(BaseModel):
    """Full job snapshot for troubleshooting workflow state transitions."""

    job_id: str
    trace_id: str
    status: str
    theme_name: str
    audience: str
    cultural_context: str
    output_spec: dict[str, Any] = Field(default_factory=dict)
    content_preview: str | None = None
    winner_model: str | None = None
    content_approval_status: str = "pending"
    image_approval_status: str = "pending"
    final_approval_status: str = "pending"
    image_prompt: str | None = None
    image_preview_url: str | None = None
    final_preview_url: str | None = None
    final_asset_urls: dict[str, str] | None = None
    cards_per_theme: int = 10
    operator_notes: str | None = None
    retry_count: int = 0
    last_stage_started_at: datetime | None = None
    last_stage_finished_at: datetime | None = None
    last_error_message: str | None = None
    created_at: datetime
    updated_at: datetime
    candidates: list[CandidateDebugResponse] = Field(default_factory=list)
    image_candidates: list[ImageCandidateDebugResponse] = Field(default_factory=list)
    shortlist: list[ShortlistEntryResponse] = Field(default_factory=list)
    approvals: list[ApprovalDebugResponse] = Field(default_factory=list)
    audit_log: list[AuditEventDebugResponse] = Field(default_factory=list)


class JobListItemResponse(BaseModel):
    """Compact workflow job row used by admin list views."""

    job_id: str
    theme_name: str
    current_stage: str
    status: str
    output_spec: dict[str, Any] = Field(default_factory=dict)
    content_preview: str | None = None
    image_preview_url: str | None = None
    final_preview_url: str | None = None
    final_asset_urls: dict[str, str] | None = None
    cards_per_theme: int = 10
    content_approval_status: str = "pending"
    image_approval_status: str = "pending"
    final_approval_status: str = "pending"
    retry_count: int = 0
    last_error_message: str | None = None
    created_at: datetime
    updated_at: datetime


class JobAssetResponse(BaseModel):
    """Asset metadata for one workflow job."""

    asset_type: str
    asset_url: str
    storage_backend: str | None = None
    storage_root: str | None = None
    relative_path: str | None = None
    public_url: str | None = None
    absolute_path: str | None = None
    file_size_bytes: int | None = None
    version: str | None = None
    approved: bool = False
    created_at: datetime | None = None


class SelectTextRequest(BaseModel):
    """Request payload for choosing one generated text option as the active card copy."""

    candidate_id: int = Field(ge=1)


class SelectImageRequest(BaseModel):
    """Request payload for choosing one generated image option as the active visual direction."""

    relative_path: str | None = None
    public_url: str | None = None


class FavoriteCardRequest(BaseModel):
    """Request payload for toggling favorite state on the current card job."""

    favorite: bool = True


class StudioActionResponse(BaseModel):
    """Lightweight response for Studio selection and favorite actions."""

    job_id: str
    status: str
    content_preview: str | None = None
    image_preview_url: str | None = None
    final_preview_url: str | None = None
    is_favorite: bool = False


class GenerateMoreResponse(BaseModel):
    """Response payload for generating additional options inside Studio."""

    job_id: str
    status: str
    generated_count: int = 0


class JobEventResponse(BaseModel):
    """Audit event row for one workflow job."""

    event_type: str
    event_payload_json: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime


class JobArchiveResponse(BaseModel):
    """Response payload for archive operation."""

    job_id: str
    status: str
    updated_at: datetime


class JobDeleteResponse(BaseModel):
    """Response payload for delete operation."""

    job_id: str
    deleted: bool = True
    deleted_files: int = 0


class StageRerunResponse(BaseModel):
    """Response payload for stage-level rerun operations."""

    job_id: str
    stage: str
    status: str
    retry_count: int = 0
    last_stage_started_at: datetime | None = None
    last_stage_finished_at: datetime | None = None
    last_error_message: str | None = None


class StageActionResponse(BaseModel):
    """Response payload for one operator-driven stage action."""

    job_id: str
    status: str
    content_approval_status: str = "pending"
    image_approval_status: str = "pending"
    final_approval_status: str = "pending"
    image_preview_url: str | None = None
    final_preview_url: str | None = None
    final_asset_urls: FinalAssetUrls | None = None
    retry_count: int = 0
    last_stage_started_at: datetime | None = None
    last_stage_finished_at: datetime | None = None
    last_error_message: str | None = None


class StageRerunRequest(BaseModel):
    """Request payload for the generic rerun-stage endpoint."""

    stage: Literal["content_generation", "image_generation", "final_render"]


class RenderShortlistRequest(BaseModel):
    """Request payload selecting shortlisted candidates to render."""

    candidate_ids: list[int] = Field(default_factory=list)


class RenderedShortlistAssetResponse(BaseModel):
    """Rendered shortlist preview asset metadata."""

    candidate_id: int
    rank: int | None = None
    preview_url: str
    asset_type: str
    relative_path: str | None = None


class RenderShortlistResponse(BaseModel):
    """Response payload for shortlist rendering action."""

    job_id: str
    rendered_count: int
    rendered_assets: list[RenderedShortlistAssetResponse] = Field(default_factory=list)
