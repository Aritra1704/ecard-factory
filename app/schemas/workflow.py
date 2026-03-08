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


class StartJobResponse(BaseModel):
    """Response sent back to n8n after initial generation + judging."""

    job_id: str
    status: str
    content_preview: str
    winner_model: str
    approval_message: str


class ApprovalRequest(BaseModel):
    """Common approval payload for image/final gates."""

    decision: Literal["approved", "rejected"]
    notes: str = ""


class ContentApprovalRequest(BaseModel):
    """Approval payload for content gate, including timeout outcome."""

    decision: Literal["approved", "rejected", "timeout"]
    notes: str = ""


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

    model: str
    backend: str
    content_text: str
    raw_score: float
    judge_score: float
    is_winner: bool


class ApprovalDebugResponse(BaseModel):
    """Approval event data returned by the debug endpoint."""

    stage: str
    decision: str
    notes: str | None = None
    decided_by: str = "n8n_v1"
    decided_at: datetime


class AuditEventDebugResponse(BaseModel):
    """Audit event returned by the debug endpoint."""

    event_type: str
    event_payload_json: dict[str, Any]
    created_at: datetime


class JobDebugResponse(BaseModel):
    """Full job snapshot for troubleshooting workflow state transitions."""

    job_id: str
    status: str
    theme_name: str
    audience: str
    cultural_context: str
    content_preview: str | None = None
    winner_model: str | None = None
    content_approval_status: str = "pending"
    image_prompt: str | None = None
    image_preview_url: str | None = None
    final_preview_url: str | None = None
    final_asset_urls: dict[str, str] | None = None
    created_at: datetime
    updated_at: datetime
    candidates: list[CandidateDebugResponse] = Field(default_factory=list)
    approvals: list[ApprovalDebugResponse] = Field(default_factory=list)
    audit_log: list[AuditEventDebugResponse] = Field(default_factory=list)
