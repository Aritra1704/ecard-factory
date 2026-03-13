"""v1 n8n-facing workflow router that exposes only eCardFactory endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.workflow import (
    ApprovalRequest,
    ContentApprovalRequest,
    ContentApprovalResponse,
    DailyThemeJobResponse,
    FinalApprovalResponse,
    ImageApprovalRequest,
    ImageApprovalResponse,
    JobArchiveResponse,
    JobAssetResponse,
    JobDebugResponse,
    JobDeleteResponse,
    JobEventResponse,
    JobListItemResponse,
    RenderConfig,
    StartJobRequest,
    StartJobResponse,
)
from app.services.theme_service import ThemeService, get_theme_service
from app.services.workflow_v1_service import WorkflowV1Service, get_workflow_v1_service

router = APIRouter(prefix="/api/jobs", tags=["workflow-v1"])


def _map_visual_style_to_template(visual_style: str) -> str:
    """Map free-form schedule visual style to one supported rendering template."""

    value = visual_style.strip().lower()
    if value in {"minimal", "festive", "elegant", "playful"}:
        return value
    if any(token in value for token in ("party", "celebr", "festive")):
        return "festive"
    if any(token in value for token in ("formal", "classic", "elegant")):
        return "elegant"
    if any(token in value for token in ("playful", "fun", "casual")):
        return "playful"
    return "minimal"


@router.get("", response_model=list[JobListItemResponse], status_code=status.HTTP_200_OK)
async def list_jobs(
    limit: int = Query(default=50, ge=1, le=500),
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> list[JobListItemResponse]:
    """Return workflow jobs for internal console list views."""

    return await service.list_jobs(limit=limit)


@router.post("/start", response_model=StartJobResponse)
async def start_job(
    payload: StartJobRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StartJobResponse:
    """Start a card job and return content approval payload for n8n."""

    return await service.start_job(payload)


@router.post("/create-daily-theme-job", response_model=DailyThemeJobResponse, status_code=status.HTTP_201_CREATED)
async def create_daily_theme_job(
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
    theme_service: ThemeService = Depends(get_theme_service),
    db: AsyncSession = Depends(get_db),
) -> DailyThemeJobResponse:
    """Create one new workflow job using today's resolved Theme Factory configuration."""

    today_theme = await theme_service.get_today_theme(db)
    theme = today_theme.theme
    start_payload = StartJobRequest(
        theme_name=theme.theme_name,
        tone_funny_pct=theme.tone_funny_pct,
        tone_emotion_pct=theme.tone_emotion_pct,
        tone_style=theme.tone_style,
        audience=theme.audience,
        cultural_context=theme.cultural_context,
        rendering=RenderConfig(theme_style=_map_visual_style_to_template(theme.visual_style)),
    )
    created = await service.start_job(start_payload)
    return DailyThemeJobResponse(
        job_id=created.job_id,
        status=created.status,
        theme_name=theme.theme_name,
        weekday=today_theme.weekday,
        source=today_theme.source,
    )


@router.post("/{job_id}/content-approval", response_model=ContentApprovalResponse)
async def submit_content_approval(
    job_id: str,
    payload: ContentApprovalRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> ContentApprovalResponse:
    """Persist content approval decision and prepare image approval stage."""

    return await service.submit_content_approval(job_id, payload)


@router.post("/{job_id}/image-approval", response_model=ImageApprovalResponse)
async def submit_image_approval(
    job_id: str,
    payload: ImageApprovalRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> ImageApprovalResponse:
    """Persist image approval decision and prepare final approval stage."""

    return await service.submit_image_approval(job_id, payload)


@router.post("/{job_id}/final-approval", response_model=FinalApprovalResponse)
async def submit_final_approval(
    job_id: str,
    payload: ApprovalRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> FinalApprovalResponse:
    """Persist final approval decision and mark the job as completed when approved."""

    return await service.submit_final_approval(job_id, payload)


@router.get("/{job_id}", response_model=JobDebugResponse, status_code=status.HTTP_200_OK)
async def get_job(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> JobDebugResponse:
    """Return full job state, approvals, candidates, and audit events for debugging."""

    return await service.get_job_debug(job_id)


@router.get("/{job_id}/assets", response_model=list[JobAssetResponse], status_code=status.HTTP_200_OK)
async def get_job_assets(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> list[JobAssetResponse]:
    """Return stored assets for one workflow job."""

    return await service.get_job_assets(job_id)


@router.get("/{job_id}/events", response_model=list[JobEventResponse], status_code=status.HTTP_200_OK)
async def get_job_events(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> list[JobEventResponse]:
    """Return lifecycle audit events for one workflow job."""

    return await service.get_job_events(job_id)


@router.post("/{job_id}/archive", response_model=JobArchiveResponse, status_code=status.HTTP_200_OK)
async def archive_job(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> JobArchiveResponse:
    """Archive one workflow job for internal retention."""

    return await service.archive_job(job_id)


@router.delete("/{job_id}", response_model=JobDeleteResponse, status_code=status.HTTP_200_OK)
async def delete_job(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> JobDeleteResponse:
    """Delete one workflow job and attempt to remove associated asset files."""

    return await service.delete_job(job_id)
