"""v1 n8n-facing workflow router that exposes only eCardFactory endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Query, status

from app.schemas.workflow import (
    ApprovalRequest,
    ContentApprovalRequest,
    ContentApprovalResponse,
    FinalApprovalResponse,
    ImageApprovalRequest,
    ImageApprovalResponse,
    JobArchiveResponse,
    JobAssetResponse,
    JobDebugResponse,
    JobDeleteResponse,
    JobEventResponse,
    JobListItemResponse,
    StartJobRequest,
    StartJobResponse,
)
from app.services.workflow_v1_service import WorkflowV1Service, get_workflow_v1_service

router = APIRouter(prefix="/api/jobs", tags=["workflow-v1"])


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
