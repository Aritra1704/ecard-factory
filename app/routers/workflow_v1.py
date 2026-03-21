"""v1 n8n-facing workflow router that exposes only eCardFactory endpoints."""

from __future__ import annotations

from fastapi import APIRouter, Body, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.schemas.workflow import (
    ApprovalRequest,
    CandidateDebugResponse,
    ContentApprovalRequest,
    ContentApprovalResponse,
    DailyThemeJobResponse,
    DailyThemeJobKickoffResponse,
    FavoriteCardRequest,
    FinalApprovalResponse,
    GenerateMoreResponse,
    JobImageAssetsResponse,
    ImageApprovalRequest,
    ImageApprovalResponse,
    JobArchiveResponse,
    JobAssetResponse,
    JobDebugResponse,
    JobDeleteResponse,
    JobEventResponse,
    JobListItemResponse,
    OutputLength,
    OutputSpec,
    RenderShortlistRequest,
    RenderShortlistResponse,
    RenderConfig,
    RegenerateImageAssetsRequest,
    SelectImageRequest,
    SelectTextRequest,
    StageActionResponse,
    StageRerunRequest,
    ShortlistEntryResponse,
    StudioActionResponse,
    StageRerunResponse,
    StartFromThemeRequest,
    StartJobRequest,
    StartJobKickoffResponse,
    StartJobResponse,
    ThemeJobCreateRequest,
    WorkflowContractResponse,
)
from app.schemas.theme_factory import ThemeCatalogResponse, ThemeResolvedPayload
from app.services.async_content_worker import get_async_content_worker
from app.services.image_generation_service import ImageGenerationService, get_image_generation_service
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


def _build_theme_start_request(
    *,
    theme: ThemeResolvedPayload | ThemeCatalogResponse,
    cards_per_theme: int,
    notes: str | None,
    copy_style: str,
    target_words: int,
    tone_funny_pct: int | None,
) -> StartJobRequest:
    """Map one resolved or selected theme into the standard job-start payload."""

    audience = getattr(theme, "audience", None) or getattr(theme, "default_audience", None) or "general audience"
    cultural_context = getattr(theme, "cultural_context", None) or "global"
    visual_style = getattr(theme, "visual_style", None) or getattr(theme, "default_visual_style", None) or "minimal"
    resolved_funny_pct = tone_funny_pct
    if resolved_funny_pct is None:
        resolved_funny_pct = getattr(theme, "tone_funny_pct", None)
    if resolved_funny_pct is None:
        resolved_funny_pct = getattr(theme, "default_funny_pct", 20)
    tone_emotion_pct = getattr(theme, "tone_emotion_pct", None)
    if tone_emotion_pct is None:
        tone_emotion_pct = getattr(theme, "default_emotion_pct", 80)
    return StartJobRequest(
        theme_name=theme.theme_name,
        tone_funny_pct=int(resolved_funny_pct),
        tone_emotion_pct=int(tone_emotion_pct),
        tone_style=theme.tone_style,
        audience=audience,
        cultural_context=cultural_context,
        output_spec=OutputSpec(
            format=copy_style,
            length=OutputLength(target_words=target_words),
            metadata={
                "theme_key": getattr(theme, "theme_key", None),
                "theme_bucket": getattr(theme, "theme_bucket", "everyday"),
                "theme_type": getattr(theme, "theme_type", None),
                "theme_description": getattr(theme, "description", None),
                "default_visual_style": visual_style,
            },
        ),
        rendering=RenderConfig(theme_style=_map_visual_style_to_template(visual_style)),
        cards_per_theme=cards_per_theme,
        notes=notes,
    )


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


@router.post("/start-async", response_model=StartJobKickoffResponse, status_code=status.HTTP_202_ACCEPTED)
async def start_job_async(
    payload: StartJobRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StartJobKickoffResponse:
    """Create a job immediately and queue background content generation."""

    created = await service.start_job_async(payload)
    get_async_content_worker().wake()
    return created


@router.get("/workflow-contract", response_model=WorkflowContractResponse, status_code=status.HTTP_200_OK)
async def get_workflow_contract(
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> WorkflowContractResponse:
    """Return the explicit Stage 0 canonical workflow contract and endpoint inventory."""

    return service.get_workflow_contract()


@router.post("/create-daily-theme-job", response_model=DailyThemeJobResponse, status_code=status.HTTP_201_CREATED)
async def create_daily_theme_job(
    payload: ThemeJobCreateRequest | None = Body(default=None),
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
    theme_service: ThemeService = Depends(get_theme_service),
    db: AsyncSession = Depends(get_db),
) -> DailyThemeJobResponse:
    """Create one new workflow job using today's resolved Theme Factory configuration."""

    payload = payload or ThemeJobCreateRequest()
    today_theme = await theme_service.get_today_theme(db)
    theme = today_theme.theme
    if not today_theme.resolved or theme is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No theme resolved yet")
    start_payload = _build_theme_start_request(
        theme=theme,
        cards_per_theme=payload.cards_per_theme,
        notes=payload.notes,
        copy_style=payload.copy_style,
        target_words=payload.target_words,
        tone_funny_pct=payload.tone_funny_pct,
    )
    created = await service.start_job(start_payload)
    return DailyThemeJobResponse(
        job_id=created.job_id,
        status=created.status,
        theme_name=theme.theme_name,
        weekday=today_theme.weekday,
        source=today_theme.source,
        cards_per_theme=payload.cards_per_theme,
    )


@router.post(
    "/create-daily-theme-job-async",
    response_model=DailyThemeJobKickoffResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
async def create_daily_theme_job_async(
    payload: ThemeJobCreateRequest | None = Body(default=None),
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
    theme_service: ThemeService = Depends(get_theme_service),
    db: AsyncSession = Depends(get_db),
) -> DailyThemeJobKickoffResponse:
    """Create one job from today's theme and return immediately with queued processing state."""

    payload = payload or ThemeJobCreateRequest()
    today_theme = await theme_service.get_today_theme(db)
    theme = today_theme.theme
    if not today_theme.resolved or theme is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No theme resolved yet")
    start_payload = _build_theme_start_request(
        theme=theme,
        cards_per_theme=payload.cards_per_theme,
        notes=payload.notes,
        copy_style=payload.copy_style,
        target_words=payload.target_words,
        tone_funny_pct=payload.tone_funny_pct,
    )
    created = await service.start_job_async(start_payload)
    get_async_content_worker().wake()
    return DailyThemeJobKickoffResponse(
        **created.model_dump(),
        theme_name=theme.theme_name,
        weekday=today_theme.weekday,
        source=today_theme.source,
        cards_per_theme=payload.cards_per_theme,
    )


@router.post("/start-from-theme", response_model=StartJobResponse, status_code=status.HTTP_201_CREATED)
async def start_job_from_theme(
    payload: StartFromThemeRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
    theme_service: ThemeService = Depends(get_theme_service),
    db: AsyncSession = Depends(get_db),
) -> StartJobResponse:
    """Create one job from a manually selected Theme Factory catalog entry."""

    theme = await theme_service.get_theme_by_key(db, payload.theme_key)
    start_payload = _build_theme_start_request(
        theme=theme,
        cards_per_theme=payload.cards_per_theme,
        notes=payload.notes,
        copy_style=payload.copy_style,
        target_words=payload.target_words,
        tone_funny_pct=payload.tone_funny_pct,
    )
    return await service.start_job(start_payload)


@router.post("/start-from-theme-async", response_model=StartJobKickoffResponse, status_code=status.HTTP_202_ACCEPTED)
async def start_job_from_theme_async(
    payload: StartFromThemeRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
    theme_service: ThemeService = Depends(get_theme_service),
    db: AsyncSession = Depends(get_db),
) -> StartJobKickoffResponse:
    """Queue one job from a manually selected Theme Factory entry and return immediately."""

    theme = await theme_service.get_theme_by_key(db, payload.theme_key)
    start_payload = _build_theme_start_request(
        theme=theme,
        cards_per_theme=payload.cards_per_theme,
        notes=payload.notes,
        copy_style=payload.copy_style,
        target_words=payload.target_words,
        tone_funny_pct=payload.tone_funny_pct,
    )
    created = await service.start_job_async(start_payload)
    get_async_content_worker().wake()
    return created


@router.post("/{job_id}/content-approval", response_model=ContentApprovalResponse, deprecated=True)
async def submit_content_approval(
    job_id: str,
    payload: ContentApprovalRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> ContentApprovalResponse:
    """Legacy n8n callback that auto-advances from content approval to image generation."""

    return await service.submit_content_approval(job_id, payload)


@router.post("/{job_id}/image-approval", response_model=ImageApprovalResponse, deprecated=True)
async def submit_image_approval(
    job_id: str,
    payload: ImageApprovalRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> ImageApprovalResponse:
    """Legacy n8n callback that auto-advances from image approval to preview rendering."""

    return await service.submit_image_approval(job_id, payload)


@router.post("/{job_id}/final-approval", response_model=FinalApprovalResponse, deprecated=True)
async def submit_final_approval(
    job_id: str,
    payload: ApprovalRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> FinalApprovalResponse:
    """Legacy n8n callback that accepts final approval decisions through one payload endpoint."""

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


@router.get("/{job_id}/candidates", response_model=list[CandidateDebugResponse], status_code=status.HTTP_200_OK)
async def get_job_candidates(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> list[CandidateDebugResponse]:
    """Return the full pooled content candidate set for a job."""

    return await service.get_job_candidates(job_id)


@router.get("/{job_id}/shortlist", response_model=list[ShortlistEntryResponse], status_code=status.HTTP_200_OK)
async def get_job_shortlist(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> list[ShortlistEntryResponse]:
    """Return the ranked shortlist for a job."""

    return await service.get_job_shortlist(job_id)


@router.post("/{job_id}/render-shortlist", response_model=RenderShortlistResponse, status_code=status.HTTP_200_OK)
async def render_job_shortlist(
    job_id: str,
    payload: RenderShortlistRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> RenderShortlistResponse:
    """Render one or more shortlisted phrases into preview cards."""

    return await service.render_shortlist(job_id, payload)


@router.post("/{job_id}/select-text", response_model=StudioActionResponse, status_code=status.HTTP_200_OK)
async def select_text_option(
    job_id: str,
    payload: SelectTextRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StudioActionResponse:
    """Choose one generated text option as the active card copy."""

    return await service.select_text_option(job_id, payload)


@router.post("/{job_id}/generate-more-text", response_model=GenerateMoreResponse, status_code=status.HTTP_200_OK)
async def generate_more_text(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> GenerateMoreResponse:
    """Append more short card-copy options for Studio."""

    return await service.generate_more_text_options(job_id, count=10)


@router.post(
    "/{job_id}/generate-more-images",
    response_model=GenerateMoreResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def generate_more_images(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> GenerateMoreResponse:
    """Legacy local image-option generation path that bypasses the ImageForge asset contract."""

    return await service.generate_more_image_options(
        job_id,
        count=settings.image_candidates_per_run,
        refresh_batch=False,
    )


@router.post(
    "/{job_id}/select-image",
    response_model=StudioActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def select_image_option(
    job_id: str,
    payload: SelectImageRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StudioActionResponse:
    """Legacy local image-option selection path that bypasses ImageForge candidate ids."""

    return await service.select_image_option(job_id, payload)


@router.post(
    "/{job_id}/image-assets/generate",
    response_model=JobImageAssetsResponse,
    status_code=status.HTTP_200_OK,
)
async def generate_image_assets(
    job_id: str,
    service: ImageGenerationService = Depends(get_image_generation_service),
    workflow_service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> JobImageAssetsResponse:
    """Generate ImageForge-backed image asset candidates for the current job."""

    await workflow_service.assert_can_generate_image_assets(job_id, regenerate=False)
    return await service.generate_image_assets_for_job(job_id)


@router.post(
    "/{job_id}/image-assets/regenerate",
    response_model=JobImageAssetsResponse,
    status_code=status.HTTP_200_OK,
)
async def regenerate_image_assets(
    job_id: str,
    payload: RegenerateImageAssetsRequest | None = Body(default=None),
    service: ImageGenerationService = Depends(get_image_generation_service),
    workflow_service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> JobImageAssetsResponse:
    """Request another ImageForge candidate batch for the current job."""

    await workflow_service.assert_can_generate_image_assets(job_id, regenerate=True)
    return await service.regenerate_image_assets_for_job(
        job_id,
        candidate_count=payload.candidate_count if payload else None,
    )


@router.post(
    "/{job_id}/image-assets/{candidate_id}/select",
    response_model=JobImageAssetsResponse,
    status_code=status.HTTP_200_OK,
)
async def select_image_asset_candidate(
    job_id: str,
    candidate_id: str,
    service: ImageGenerationService = Depends(get_image_generation_service),
    workflow_service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> JobImageAssetsResponse:
    """Select one ImageForge candidate for final card composition."""

    await workflow_service.assert_can_select_image_asset(job_id)
    return await service.select_image_candidate_for_job(job_id, candidate_id)


@router.get(
    "/{job_id}/image-assets",
    response_model=JobImageAssetsResponse,
    status_code=status.HTTP_200_OK,
)
async def get_image_assets(
    job_id: str,
    service: ImageGenerationService = Depends(get_image_generation_service),
) -> JobImageAssetsResponse:
    """Return normalized ImageForge image asset state for Studio."""

    return await service.get_image_assets_for_job(job_id)


@router.post("/{job_id}/favorite", response_model=StudioActionResponse, status_code=status.HTTP_200_OK)
async def favorite_job(
    job_id: str,
    payload: FavoriteCardRequest | None = Body(default=None),
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StudioActionResponse:
    """Mark or unmark the current card job as a favorite."""

    return await service.mark_favorite(job_id, payload or FavoriteCardRequest())


@router.post("/{job_id}/rerun/content", response_model=StageRerunResponse, status_code=status.HTTP_200_OK)
async def rerun_content_stage(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageRerunResponse:
    """Rerun content generation and shortlist judging for a job."""

    return await service.rerun_content(job_id)


@router.post("/{job_id}/rerun/image", response_model=StageRerunResponse, status_code=status.HTTP_200_OK)
async def rerun_image_stage(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageRerunResponse:
    """Rerun image-stage preview generation for a job."""

    return await service.rerun_image(job_id)


@router.post("/{job_id}/rerun/final-render", response_model=StageRerunResponse, status_code=status.HTTP_200_OK)
async def rerun_final_render_stage(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageRerunResponse:
    """Rerun final preview rendering for a job."""

    return await service.rerun_final_render(job_id)


@router.post("/{job_id}/rerun/full", response_model=StageRerunResponse, status_code=status.HTTP_200_OK)
async def rerun_full_job(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageRerunResponse:
    """Rerun the full workflow from content candidate generation."""

    return await service.rerun_full(job_id)


@router.post(
    "/{job_id}/approve-content",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def approve_content(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy operator shortcut that approves the current winner without explicit text selection."""

    return await service.approve_content(job_id)


@router.post(
    "/{job_id}/reject-content",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def reject_content(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy operator content rejection shortcut."""

    return await service.reject_content(job_id)


@router.post(
    "/{job_id}/regenerate-content",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def regenerate_content(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy content regeneration shortcut."""

    return await service.regenerate_content(job_id)


@router.post(
    "/{job_id}/generate-image",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def generate_image(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy image generation shortcut that bypasses the ImageForge asset contract."""

    return await service.generate_image(job_id)


@router.post(
    "/{job_id}/regenerate-image",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def regenerate_image(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy image regeneration shortcut that bypasses the ImageForge asset contract."""

    return await service.regenerate_image(job_id)


@router.post(
    "/{job_id}/approve-image",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def approve_image(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy operator shortcut that approves image state without candidate-id selection."""

    return await service.approve_image(job_id)


@router.post(
    "/{job_id}/reject-image",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def reject_image(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy operator image rejection shortcut."""

    return await service.reject_image(job_id)


@router.post("/{job_id}/render-final", response_model=StageActionResponse, status_code=status.HTTP_200_OK)
async def render_final(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Render final preview after image approval."""

    return await service.render_final(job_id)


@router.post("/{job_id}/approve-final", response_model=StageActionResponse, status_code=status.HTTP_200_OK)
async def approve_final(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Approve final stage only."""

    return await service.approve_final(job_id)


@router.post(
    "/{job_id}/reject-final",
    response_model=StageActionResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def reject_final(
    job_id: str,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageActionResponse:
    """Legacy final rejection shortcut kept for compatibility."""

    return await service.reject_final(job_id)


@router.post(
    "/{job_id}/rerun-stage",
    response_model=StageRerunResponse,
    status_code=status.HTTP_200_OK,
    deprecated=True,
)
async def rerun_stage(
    job_id: str,
    payload: StageRerunRequest,
    service: WorkflowV1Service = Depends(get_workflow_v1_service),
) -> StageRerunResponse:
    """Legacy generic rerun endpoint replaced by explicit stage rerun routes."""

    return await service.rerun_stage(job_id, payload)


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
