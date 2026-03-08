"""v1 n8n-facing workflow router that exposes only eCardFactory endpoints."""

from __future__ import annotations

from fastapi import APIRouter, status

from app.schemas.workflow import (
    ApprovalRequest,
    ContentApprovalRequest,
    ContentApprovalResponse,
    FinalApprovalResponse,
    ImageApprovalResponse,
    JobDebugResponse,
    StartJobRequest,
    StartJobResponse,
)
from app.services.workflow_v1_service import WorkflowV1Service

router = APIRouter(prefix="/api/jobs", tags=["workflow-v1"])
workflow_service = WorkflowV1Service()


@router.post("/start", response_model=StartJobResponse)
async def start_job(payload: StartJobRequest) -> StartJobResponse:
    """Start a card job and return content approval payload for n8n."""

    return await workflow_service.start_job(payload)


@router.post("/{job_id}/content-approval", response_model=ContentApprovalResponse)
async def submit_content_approval(job_id: str, payload: ContentApprovalRequest) -> ContentApprovalResponse:
    """Persist content approval decision and prepare image approval stage."""

    return await workflow_service.submit_content_approval(job_id, payload)


@router.post("/{job_id}/image-approval", response_model=ImageApprovalResponse)
async def submit_image_approval(job_id: str, payload: ApprovalRequest) -> ImageApprovalResponse:
    """Persist image approval decision and prepare final approval stage."""

    return await workflow_service.submit_image_approval(job_id, payload)


@router.post("/{job_id}/final-approval", response_model=FinalApprovalResponse)
async def submit_final_approval(job_id: str, payload: ApprovalRequest) -> FinalApprovalResponse:
    """Persist final approval decision and mark the job as completed when approved."""

    return await workflow_service.submit_final_approval(job_id, payload)


@router.get("/{job_id}", response_model=JobDebugResponse, status_code=status.HTTP_200_OK)
async def get_job(job_id: str) -> JobDebugResponse:
    """Return full job state, approvals, candidates, and audit events for debugging."""

    return await workflow_service.get_job_debug(job_id)
