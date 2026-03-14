"""Business logic for v1 n8n workflow endpoints with DB-first persistence and memory fallback."""

from __future__ import annotations

from datetime import datetime, timezone
from functools import lru_cache
import logging
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse
from uuid import uuid4

from fastapi import HTTPException, status

from app.config import settings
from app.repositories.workflow_repository import WorkflowJobRepository, get_workflow_job_repository
from app.schemas.workflow import (
    ApprovalRequest,
    CandidateDebugResponse,
    ContentApprovalRequest,
    ContentApprovalResponse,
    FavoriteCardRequest,
    FinalApprovalResponse,
    FinalAssetUrls,
    GenerateMoreResponse,
    ImageApprovalRequest,
    ImageApprovalResponse,
    JobArchiveResponse,
    JobAssetResponse,
    JobDebugResponse,
    JobDeleteResponse,
    JobEventResponse,
    JobListItemResponse,
    RenderShortlistRequest,
    RenderShortlistResponse,
    RenderedShortlistAssetResponse,
    SelectImageRequest,
    SelectTextRequest,
    ShortlistEntryResponse,
    StageActionResponse,
    StudioActionResponse,
    StageRerunRequest,
    StageRerunResponse,
    StartJobRequest,
    StartJobResponse,
)
from app.services.image_provider import ImageCandidateResult, ImageGenerationRequest, ImageProvider, get_image_provider
from app.services.workflow_card_renderer import (
    FinalCardRenderInput,
    PreviewCardRenderInput,
    WorkflowCardRenderer,
)
from app.storage import AssetStorage, get_asset_storage

logger = logging.getLogger(__name__)


class StubContentForgeClient:
    """Stub ContentForge adapter used until real integration is wired in.

    TODO(v2): replace this class with a real ContentForge client while keeping
    the same `generate_and_judge` output contract.
    """

    _MODEL_PROFILES = [
        ("qwen2.5:7b-instruct", "ollama", "clean and balanced"),
        ("llama3.1:8b", "ollama", "uplifting and direct"),
        ("mistral:7b", "ollama", "warm and expressive"),
    ]

    async def generate_and_judge(self, payload: StartJobRequest) -> dict[str, Any]:
        """Generate a pooled candidate set, judge it, and return a top-10 shortlist."""

        theme = payload.theme_name.strip() or "Untitled Theme"
        candidates = self._build_candidate_rows(payload, total_count=30, start_index=0)

        ranked_candidates = sorted(
            candidates,
            key=lambda item: (float(item["judge_score"]), float(item["raw_score"]), item["model"]),
            reverse=True,
        )
        shortlist = []
        for rank, candidate in enumerate(ranked_candidates[:10], start=1):
            candidate["is_shortlisted"] = True
            candidate["is_selected"] = rank == 1
            candidate["is_winner"] = rank == 1
            shortlist.append(
                {
                    "rank": rank,
                    "score": float(candidate["judge_score"]),
                    "model": candidate["model"],
                    "backend": candidate["backend"],
                    "content_text": candidate["content_text"],
                }
            )

        winner = ranked_candidates[0]
        judge_summary = (
            f"Evaluated {len(candidates)} greeting-card candidates for '{theme}'. "
            f"Shortlisted top {len(shortlist)} across all models using judged score."
        )

        return {
            "candidates": candidates,
            "shortlist": shortlist,
            "winner": winner,
            "judge_summary": judge_summary,
        }

    def generate_more_candidates(
        self,
        payload: StartJobRequest,
        *,
        count: int,
        start_index: int,
    ) -> list[dict[str, Any]]:
        """Return additional text candidates without replacing the existing pool."""

        safe_count = max(1, min(count, 30))
        return self._build_candidate_rows(payload, total_count=safe_count, start_index=max(start_index, 0))

    def _build_candidate_rows(
        self,
        payload: StartJobRequest,
        *,
        total_count: int,
        start_index: int,
    ) -> list[dict[str, Any]]:
        """Generate one batch of short-form card copy candidates."""

        theme = payload.theme_name.strip()
        tone = payload.tone_style.strip() or "conversational"
        funny_pct = int(payload.tone_funny_pct)
        emotion_pct = int(payload.tone_emotion_pct)
        copy_style = self._resolve_copy_style(payload)
        target_words = self._resolve_target_words(payload)
        safe_total = max(1, total_count)

        candidates: list[dict[str, Any]] = []
        for offset in range(safe_total):
            sequence = start_index + offset
            model_index = sequence % len(self._MODEL_PROFILES)
            variant = sequence // len(self._MODEL_PROFILES)
            model, backend, style_hint = self._MODEL_PROFILES[model_index]
            raw_score = round(0.71 + (model_index * 0.035) + max(0, (12 - (variant % 12))) * 0.007, 4)
            brevity_bonus = 0.02 if target_words <= 18 else 0.012 if target_words <= 24 else 0.0
            judge_bonus = round(
                ((sequence % 5) * 0.008)
                + (emotion_pct / 1000)
                + (funny_pct / 3000)
                + brevity_bonus,
                4,
            )
            judged_score = round(raw_score + 0.08 + judge_bonus, 4)
            content_text = self._compose_candidate_text(
                theme=theme,
                audience=payload.audience,
                tone=tone,
                funny_pct=funny_pct,
                emotion_pct=emotion_pct,
                copy_style=copy_style,
                target_words=target_words,
                style_hint=style_hint,
                variant=variant,
                model_index=model_index,
            )
            candidates.append(
                {
                    "model": model,
                    "backend": backend,
                    "content_text": content_text,
                    "text": content_text,
                    "raw_score": raw_score,
                    "judge_score": judged_score,
                    "judged_score": judged_score,
                    "is_winner": False,
                    "is_shortlisted": False,
                    "is_selected": False,
                }
            )
        return candidates

    @staticmethod
    def _resolve_copy_style(payload: StartJobRequest) -> str:
        """Return one supported content style for short-form card copy."""

        value = str(payload.output_spec.format or "minimal").strip().lower()
        if value in {"witty", "playful", "heartfelt", "minimal"}:
            return value
        if value == "short_crisp":
            return "minimal"
        if value in {"warm_note", "letter", "paragraph"}:
            return "heartfelt"
        return "minimal"

    @staticmethod
    def _resolve_target_words(payload: StartJobRequest) -> int:
        """Return a bounded word target from the requested output spec."""

        target = int(payload.output_spec.length.target_words or 16)
        return min(max(target, 4), 60)

    def _compose_candidate_text(
        self,
        *,
        theme: str,
        audience: str,
        tone: str,
        funny_pct: int,
        emotion_pct: int,
        copy_style: str,
        target_words: int,
        style_hint: str,
        variant: int,
        model_index: int,
    ) -> str:
        """Build short greeting-card copy instead of editorial bulletin copy."""

        sequence = variant + model_index
        theme_line = self._pick_theme_line(theme, sequence)
        style_line = self._pick_style_line(copy_style, style_hint, sequence)
        humor_line = self._pick_humor_line(theme, tone, funny_pct, sequence)
        emotion_line = self._pick_emotion_line(audience, emotion_pct, sequence)
        closing_line = self._pick_closing_line(copy_style, sequence)

        parts = [theme_line, style_line]
        if target_words >= 12 and humor_line:
            parts.append(humor_line)
        if target_words >= 10 and emotion_line:
            parts.append(emotion_line)
        parts.append(closing_line)

        text = self._trim_to_words(" ".join(part for part in parts if part), target_words)
        if text[-1:] not in {".", "!", "?"}:
            text = f"{text}."
        return text

    @staticmethod
    def _pick_theme_line(theme: str, sequence: int) -> str:
        """Pick one theme-first opening that reads like a card, not a brief."""

        theme_key = theme.strip().lower()
        library = {
            "motivation": [
                "New week, new fire.",
                "Fresh start, steady heart.",
                "Show up and raise the bar.",
                "Start strong and stay kind.",
                "Small step, real momentum.",
            ],
            "gratitude": [
                "A quiet thank-you changes the whole day.",
                "Gratitude makes ordinary moments glow.",
                "This note carries real appreciation.",
                "Good support deserves good words.",
                "Thank you for showing up so consistently.",
            ],
            "love": [
                "Love feels brightest when it stays true.",
                "This comes straight from the heart.",
                "Some people make the whole day softer.",
                "Love sounds best in honest words.",
                "You make ordinary moments feel golden.",
            ],
            "friendship": [
                "Good friends make the day easier to carry.",
                "Friendship turns routine days warm.",
                "Life lands better with a real friend in it.",
                "A true friend makes even chaos lighter.",
                "This note is for the friend who stays solid.",
            ],
            "humor": [
                "Weekend energy has entered the chat.",
                "This day looks better with a grin on it.",
                "A little laughter fixes the lighting.",
                "Good mood, better timing.",
                "The smile starts here.",
            ],
            "family": [
                "Home feels warmer when hearts stay close.",
                "Family makes the whole week softer.",
                "Togetherness is still the best comfort.",
                "The best kind of peace feels like home.",
                "This note belongs with the people who matter most.",
            ],
            "reflection": [
                "Pause, breathe, keep the good.",
                "A calm heart changes the whole week.",
                "Slow down and keep what matters.",
                "Peace grows in small quiet moments.",
                "Let this be a soft reset.",
            ],
            "ramadan": [
                "Wishing peace, grace, and gentle strength this Ramadan.",
                "May this Ramadan bring calm, light, and reflection.",
                "Sending respectful Ramadan warmth your way.",
                "May this Ramadan feel steady, kind, and blessed.",
                "Holding space for peace and prayer this Ramadan.",
            ],
            "holi": [
                "Sending color, joy, and bright-hearted wishes this Holi.",
                "May Holi arrive loud with joy and warmth.",
                "Here is a Holi note full of color and closeness.",
                "Wishing you a Holi full of laughter and light.",
                "May this Holi feel vibrant, warm, and shared.",
            ],
            "valentine": [
                "Love looks brighter when it stays sincere.",
                "A small romantic note can still land deeply.",
                "Keeping this Valentine's note honest and warm.",
                "Here is a little extra heart for your day.",
                "Some feelings deserve a softer voice.",
            ],
            "eid": [
                "Wishing your Eid joy, peace, and togetherness.",
                "May Eid bring warmth to your whole home.",
                "Sending an Eid greeting full of heart.",
                "May this Eid feel bright, generous, and close.",
                "Eid Mubarak, with warmth and goodwill.",
            ],
            "diwali": [
                "May this Diwali bring light, warmth, and good fortune.",
                "Wishing you a Diwali full of glow and joy.",
                "May your Diwali feel bright, shared, and peaceful.",
                "Sending a Diwali note with warmth and sparkle.",
                "Light, laughter, and good energy for your Diwali.",
            ],
            "lpg": [
                "Steady voices matter in a noisy moment.",
                "Awareness starts with human words.",
                "Clarity and care matter right now.",
                "Even hard topics deserve calm language.",
                "This moment needs steadiness more than noise.",
            ],
            "war": [
                "In heavy times, humanity matters most.",
                "Holding hope and dignity close today.",
                "Some moments call for care before commentary.",
                "Let this note stay human and steady.",
                "Even difficult news needs gentle language.",
            ],
            "gold": [
                "Stay sharp, stay steady, read the moment well.",
                "A calm eye beats a rushed reaction.",
                "The market moves fast; your judgment can stay clear.",
                "Keep patience close when the numbers move.",
                "Clarity matters more than panic.",
            ],
            "trend": [
                "When the moment moves fast, keep your words human.",
                "A strong note can still stay grounded.",
                "This card should feel timely without losing warmth.",
                "Stay current, but keep the message human.",
                "Quick moment, clear heart.",
            ],
            "default": [
                "A small note can still land deeply.",
                "This message keeps it simple and real.",
                "A crisp line can say a lot.",
                "Some words work best when they stay light.",
                "This card starts with something real.",
            ],
        }
        for token, lines in library.items():
            if token != "default" and token in theme_key:
                return lines[sequence % len(lines)]
        return library["default"][sequence % len(library["default"])]

    @staticmethod
    def _pick_style_line(copy_style: str, style_hint: str, sequence: int) -> str:
        """Pick one style line that keeps the card short and readable."""

        minimal = [
            "Keep it clear and easy to feel.",
            "Let it land simply and well.",
            "Make the warmth feel immediate.",
            "Keep the line clean and memorable.",
            "Let the note stay light on its feet.",
        ]
        heartfelt = [
            "Sending warmth without overexplaining it.",
            "Keeping the note soft, close, and sincere.",
            "Let this read like a real human voice.",
            "Gentle words, real feeling.",
            "Warmth first, noise never.",
        ]
        playful = [
            "Let the smile do some of the talking.",
            "A little fun belongs here.",
            "Keep the sparkle switched on.",
            "Give the day something to grin about.",
            "Let the note stay quick and bright.",
        ]
        witty = [
            "Keep it sharp without losing the heart.",
            "A clean line and a sly smile work well here.",
            "Let the wit stay light, not loud.",
            "Quick words, bright finish.",
            "Make the cleverness feel effortless.",
        ]
        if copy_style == "playful":
            lines = playful
        elif copy_style == "heartfelt":
            lines = heartfelt
        elif copy_style == "witty":
            lines = witty
        else:
            lines = minimal
        if "uplifting" in style_hint and copy_style != "playful":
            lines = lines + ["Keep the energy optimistic and steady."]
        return lines[sequence % len(lines)]

    @staticmethod
    def _pick_humor_line(theme: str, tone: str, funny_pct: int, sequence: int) -> str:
        """Return optional humor only when the request meaningfully asks for it."""

        serious_theme = any(token in theme.lower() for token in ("war", "issue", "price"))
        serious_tone = tone.strip().lower() in {"serious", "awareness", "informative", "editorial"}
        if funny_pct < 20:
            return ""
        if funny_pct < 45 or (serious_theme and serious_tone and funny_pct < 60):
            medium_lines = [
                "A little lightness helps the message breathe.",
                "There is room here for a small smile.",
                "A touch of levity keeps the note alive.",
                "Even a simple grin can carry the point.",
                "A softer smile keeps the message human.",
            ]
            return medium_lines[sequence % len(medium_lines)]
        high_lines = [
            "If the day acts dramatic, outshine it anyway.",
            "Even the stress could use a tea break.",
            "Keep the cool, lose the chaos.",
            "Consider this your officially approved smile.",
            "Let the mess stay funny, not fatal.",
        ]
        return high_lines[sequence % len(high_lines)]

    @staticmethod
    def _pick_emotion_line(audience: str, emotion_pct: int, sequence: int) -> str:
        """Return optional emotional grounding based on the requested intensity."""

        if emotion_pct < 40:
            return ""
        audience_key = audience.strip().lower()
        if "partner" in audience_key or "love" in audience_key:
            lines = [
                "You mean more than ordinary words can say.",
                "There is real affection in this note.",
                "Keeping you close in every word.",
                "This carries love without making it loud.",
                "You stay at the center of this message.",
            ]
        elif "family" in audience_key:
            lines = [
                "This comes with closeness, comfort, and care.",
                "Family is the feeling underneath this note.",
                "Keeping home and heart close together.",
                "This carries the warmth of being together.",
                "The feeling here is simple: you matter deeply.",
            ]
        else:
            lines = [
                "This comes with real feeling behind it.",
                "You matter more than the rush around you.",
                "Keeping the message warm and genuine.",
                "This note is meant to feel personal.",
                "A little heart belongs in the line.",
            ]
        return lines[sequence % len(lines)]

    @staticmethod
    def _pick_closing_line(copy_style: str, sequence: int) -> str:
        """Return a short closer that feels like a card signoff."""

        closers = {
            "minimal": ["You've got this.", "Keep going.", "Still rooting for you.", "Stay bright.", "Onward."],
            "heartfelt": ["With warmth.", "Sending good energy.", "Keeping you in mind.", "Right here with you.", "With love."],
            "playful": ["Carry the smile with you.", "Go make the day jealous.", "Keep the sparkle loud.", "Now go steal the scene.", "Stay brilliant."],
            "witty": ["Stay clever.", "Keep the grin close.", "Go win the day.", "Still sharp, still warm.", "Carry the spark."],
        }
        lines = closers.get(copy_style, closers["minimal"])
        return lines[sequence % len(lines)]

    @staticmethod
    def _trim_to_words(text: str, target_words: int) -> str:
        """Trim generated copy to the requested word count ceiling."""

        words = [item for item in text.split() if item]
        if len(words) <= target_words:
            return " ".join(words)
        trimmed = " ".join(words[:target_words]).rstrip(",;:-")
        return trimmed


class WorkflowV1Service:
    """Orchestrates v1 workflow state transitions expected by imported n8n flow."""

    def __init__(
        self,
        *,
        repository: WorkflowJobRepository | None = None,
        asset_storage: AssetStorage | None = None,
        image_provider: ImageProvider | None = None,
    ) -> None:
        self._contentforge = StubContentForgeClient()
        self._repository = repository or get_workflow_job_repository()
        self._asset_storage = asset_storage or get_asset_storage()
        self._card_renderer = WorkflowCardRenderer()
        self._image_provider = image_provider or get_image_provider()

    async def start_job(self, payload: StartJobRequest) -> StartJobResponse:
        """Create a job, run stub generation/judging, persist state, and return approval payload."""

        job_id = f"job_{uuid4().hex[:10]}"
        trace_id = f"trace_{uuid4().hex[:12]}"
        now = datetime.now(timezone.utc)

        generation = await self._contentforge.generate_and_judge(payload)
        winner = generation["winner"]
        content_preview = str(winner["content_text"])
        winner_model = str(winner["model"])
        shortlist_seed = list(generation.get("shortlist") or [])
        approval_message = (
            f"Content approval required for {job_id}. Winner model: {winner_model}. "
            "Review the message text shown on the job detail page, then approve or regenerate."
        )
        output_spec = payload.output_spec.model_dump()
        output_spec["rendering"] = payload.rendering.model_dump()
        if payload.notes:
            output_spec["operator_notes"] = payload.notes

        job_record: dict[str, Any] = {
            "job_id": job_id,
            "trace_id": trace_id,
            "status": "content_pending_approval",
            "theme_name": payload.theme_name,
            "tone_funny_pct": payload.tone_funny_pct,
            "tone_emotion_pct": payload.tone_emotion_pct,
            "tone_style": payload.tone_style,
            "visual_style": payload.rendering.theme_style,
            "audience": payload.audience,
            "cultural_context": payload.cultural_context,
            "output_spec": output_spec,
            "avoid_cliches": payload.avoid_cliches,
            "content_preview": content_preview,
            "winner_model": winner_model,
            "content_approval_status": "pending",
            "image_approval_status": "pending",
            "final_approval_status": "pending",
            "image_prompt": None,
            "image_preview_url": None,
            "final_preview_url": None,
            "final_asset_urls": None,
            "cards_per_theme": int(payload.cards_per_theme),
            "operator_notes": str(payload.notes or "").strip() or None,
            "retry_count": 0,
            "last_stage_started_at": now,
            "last_stage_finished_at": now,
            "last_error_message": None,
            "created_at": now,
            "updated_at": now,
        }

        candidate_records = [
            {
                "model": str(candidate["model"]),
                "backend": str(candidate["backend"]),
                "content_text": str(candidate["content_text"]),
                "text": str(candidate["content_text"]),
                "raw_score": float(candidate["raw_score"]),
                "judge_score": float(candidate["judge_score"]),
                "judged_score": float(candidate["judge_score"]),
                "is_winner": bool(candidate["is_winner"]),
                "is_shortlisted": bool(candidate.get("is_shortlisted")),
                "is_selected": bool(candidate.get("is_selected")),
            }
            for candidate in generation["candidates"]
        ]

        audit_events = self._build_audit_events(
            job_id=job_id,
            events=[
                ("api_start_called", {"endpoint": "/api/jobs/start"}),
                ("job_created", {"status": "content_pending_approval"}),
                ("contentforge_request_sent", {"stub": True}),
                ("contentforge_response_received", {"candidate_count": len(candidate_records)}),
                ("shortlist_created", {"shortlist_count": len(shortlist_seed)}),
                ("winner_selected", {"winner_model": winner_model}),
                ("content_approval_requested", {"approval_message": approval_message}),
            ],
        )

        creation_backend = await self._repository.create_job(job_record)
        await self._repository.save_content_candidates(job_id, candidate_records, replace_existing=True)
        persisted_job = await self._load_job(job_id)
        shortlist_rows = self._build_shortlist_rows(
            persisted_candidates=list(persisted_job.get("candidates") or []) if persisted_job else [],
            shortlist_seed=shortlist_seed,
        )
        await self._repository.save_shortlist(job_id, shortlist_rows, replace_existing=True)
        await self._repository.save_judge_results(
            job_id,
            {
                "judge_provider": "contentforge_stub",
                "judge_model": "stub-judge",
                "winner_model": winner_model,
                "leaderboard_json": {
                    "models": [item["model"] for item in candidate_records],
                    "shortlist": shortlist_seed,
                },
                "pairwise_json": {},
                "reason_summary": generation["judge_summary"],
            },
        )
        await self._repository.append_audit_events(job_id, audit_events)
        logger.info("workflow job created job_id=%s backend=%s", job_id, creation_backend)

        return StartJobResponse(
            job_id=job_id,
            status="content_pending_approval",
            content_preview=content_preview,
            winner_model=winner_model,
            approval_message=approval_message,
            candidate_pool_count=len(candidate_records),
            shortlist_count=len(shortlist_seed),
        )

    async def approve_content(self, job_id: str) -> StageActionResponse:
        """Approve content without auto-triggering image generation."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        if not str(job.get("content_preview") or "").strip():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No generated content available to approve")

        transition_time = datetime.now(timezone.utc)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "content_approved",
                "content_approval_status": "approved",
                "image_approval_status": "pending",
                "final_approval_status": "pending",
                "image_prompt": None,
                "image_preview_url": None,
                "final_preview_url": None,
                "final_asset_urls": None,
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": None,
            },
            stage="content",
            decision="approved",
            notes="",
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("api_approve_content_called", {"endpoint": f"/api/jobs/{job_id}/approve-content"}),
                    ("content_approved", {"decision": "approved", "mode": "operator"}),
                ],
            ),
        )
        return self._build_stage_action_response(updated)

    async def reject_content(self, job_id: str) -> StageActionResponse:
        """Reject generated content without touching downstream stages."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        transition_time = datetime.now(timezone.utc)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "content_rejected",
                "content_approval_status": "rejected",
                "image_approval_status": "pending",
                "final_approval_status": "pending",
                "image_prompt": None,
                "image_preview_url": None,
                "final_preview_url": None,
                "final_asset_urls": None,
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": "Content rejected by operator",
            },
            stage="content",
            decision="rejected",
            notes="",
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("api_reject_content_called", {"endpoint": f"/api/jobs/{job_id}/reject-content"}),
                    ("content_rejected", {"decision": "rejected", "mode": "operator"}),
                ],
            ),
        )
        return self._build_stage_action_response(updated)

    async def regenerate_content(self, job_id: str) -> StageActionResponse:
        """Rerun content generation only."""

        await self.rerun_content(job_id)
        updated = await self._load_job(job_id)
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[("api_regenerate_content_called", {"endpoint": f"/api/jobs/{job_id}/regenerate-content"})],
            ),
        )
        return self._build_stage_action_response(updated)

    async def generate_image(self, job_id: str) -> StageActionResponse:
        """Generate the image preview for an approved content stage."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        if str(job.get("content_approval_status") or "").lower() != "approved":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Content must be approved before generating image")

        started_at = await self._mark_stage_started(job_id=job_id, job=job, stage="image_generation", increment_retry=False)
        try:
            batch = int(self._studio_state(job).get("image_option_batch") or 0) + 1
            image_prompt = self.build_image_prompt(job)
            generated = await self._generate_image_candidates_for_job(
                job_id=job_id,
                job=job,
                count=settings.image_candidates_per_run,
                batch=batch,
                include_preview_candidate=True,
                stage="image_generation",
            )
            primary_candidate = generated["primary_candidate"]
            image_preview_url = str(primary_candidate["public_url"])
            selected_style = str(primary_candidate["theme_style"])
            updated_output_spec = self._with_studio_state(
                job,
                selected_image_relative_path=str(primary_candidate["relative_path"]),
                selected_image_url=image_preview_url,
                selected_image_version=str(primary_candidate["version"]),
                selected_image_style=selected_style,
                image_option_batch=batch,
            )
            finished_at = datetime.now(timezone.utc)
            updated = await self._repository.update_job_status(
                job_id=job_id,
                updates={
                    "status": "image_pending_approval",
                    "image_approval_status": "pending",
                    "final_approval_status": "pending",
                    "image_prompt": image_prompt,
                    "image_preview_url": image_preview_url,
                    "final_preview_url": None,
                    "final_asset_urls": None,
                    "output_spec": updated_output_spec,
                    "last_stage_started_at": started_at,
                    "last_stage_finished_at": finished_at,
                    "last_error_message": None,
                },
            )
            assert updated is not None
            await self._repository.append_audit_events(
                job_id,
                self._build_audit_events(
                    job_id=job_id,
                    events=[
                        ("api_generate_image_called", {"endpoint": f"/api/jobs/{job_id}/generate-image"}),
                        (
                            "image_generated",
                            {
                                "image_preview_url": image_preview_url,
                                "provider": self._image_provider.name,
                                "generated_count": len(generated["assets"]),
                                "mode": "operator",
                            },
                        ),
                        ("image_approval_requested", {"image_preview_url": image_preview_url}),
                    ],
                ),
            )
            return self._build_stage_action_response(updated)
        except Exception as exc:  # noqa: BLE001
            await self._mark_stage_failed(
                job_id=job_id,
                job=job,
                stage="image_generation",
                started_at=started_at,
                error=exc,
            )
            raise

    async def regenerate_image(self, job_id: str) -> StageActionResponse:
        """Regenerate image preview only."""

        await self.rerun_image(job_id)
        updated = await self._load_job(job_id)
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[("api_regenerate_image_called", {"endpoint": f"/api/jobs/{job_id}/regenerate-image"})],
            ),
        )
        return self._build_stage_action_response(updated)

    async def approve_image(self, job_id: str) -> StageActionResponse:
        """Approve image stage without auto-rendering the final preview."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        if not str(job.get("image_preview_url") or "").strip():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No generated image preview available to approve")

        transition_time = datetime.now(timezone.utc)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "image_approved",
                "image_approval_status": "approved",
                "final_approval_status": "pending",
                "final_preview_url": None,
                "final_asset_urls": None,
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": None,
            },
            stage="image",
            decision="approved",
            notes="",
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("api_approve_image_called", {"endpoint": f"/api/jobs/{job_id}/approve-image"}),
                    ("image_approved", {"decision": "approved", "mode": "operator"}),
                ],
            ),
        )
        return self._build_stage_action_response(updated)

    async def reject_image(self, job_id: str) -> StageActionResponse:
        """Reject generated image preview."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        transition_time = datetime.now(timezone.utc)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "image_rejected",
                "image_approval_status": "rejected",
                "final_approval_status": "pending",
                "final_preview_url": None,
                "final_asset_urls": None,
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": "Image rejected by operator",
            },
            stage="image",
            decision="rejected",
            notes="",
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("api_reject_image_called", {"endpoint": f"/api/jobs/{job_id}/reject-image"}),
                    ("image_rejected", {"decision": "rejected", "mode": "operator"}),
                ],
            ),
        )
        return self._build_stage_action_response(updated)

    async def render_final(self, job_id: str) -> StageActionResponse:
        """Render final review preview without final approval."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        if str(job.get("image_approval_status") or "").lower() != "approved":
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Image must be approved before rendering final")

        started_at = await self._mark_stage_started(job_id=job_id, job=job, stage="final_render", increment_retry=False)
        try:
            final_preview_relative_path = self._build_final_preview_relative_path(job_id)
            self._save_internal_preview_asset(
                relative_path=final_preview_relative_path,
                payload=PreviewCardRenderInput(
                    title="Final Render",
                    message=self._resolve_winning_content(job),
                    signoff="Internal Preview",
                    theme_style=self._resolve_theme_style(job),
                    background_image_url=self._resolve_background_image_url(job),
                    text_alignment="left",
                    export_size=self._resolve_export_size(job),
                    theme_name=str(job.get("theme_name") or ""),
                    job_id=job_id,
                    status="final_pending_approval",
                    metadata_lines=[
                        f"Audience: {job.get('audience', 'N/A')}",
                        f"Tone: {job.get('tone_style', 'N/A')}",
                        "Final preview ready for operator approval",
                    ],
                ),
            )
            final_preview_url = self._asset_storage.get_public_url(final_preview_relative_path)
            finished_at = datetime.now(timezone.utc)
            updated = await self._repository.update_job_status(
                job_id=job_id,
                updates={
                    "status": "final_pending_approval",
                    "final_approval_status": "pending",
                    "final_preview_url": final_preview_url,
                    "final_asset_urls": None,
                    "last_stage_started_at": started_at,
                    "last_stage_finished_at": finished_at,
                    "last_error_message": None,
                },
            )
            assert updated is not None
            await self._repository.save_asset(
                job_id,
                asset_type="final_preview",
                asset_url=final_preview_url,
                storage_backend=self._asset_storage.backend,
                storage_root=self._asset_storage.get_absolute_path(""),
                relative_path=final_preview_relative_path,
                public_url=final_preview_url,
                absolute_path=self._asset_storage.get_absolute_path(final_preview_relative_path),
                file_size_bytes=self._read_file_size_bytes(final_preview_relative_path),
                version="v1",
                approved=False,
            )
            await self._repository.append_audit_events(
                job_id,
                self._build_audit_events(
                    job_id=job_id,
                    events=[
                        ("api_render_final_called", {"endpoint": f"/api/jobs/{job_id}/render-final"}),
                        ("final_render_completed", {"final_preview_url": final_preview_url, "mode": "operator"}),
                        ("final_approval_requested", {"final_preview_url": final_preview_url}),
                    ],
                ),
            )
            return self._build_stage_action_response(updated)
        except Exception as exc:  # noqa: BLE001
            await self._mark_stage_failed(
                job_id=job_id,
                job=job,
                stage="final_render",
                started_at=started_at,
                error=exc,
            )
            raise

    async def approve_final(self, job_id: str) -> StageActionResponse:
        """Approve final preview and export final assets."""

        await self.apply_final_approval(job_id, "approved", "")
        updated = await self._load_job(job_id)
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[("api_approve_final_called", {"endpoint": f"/api/jobs/{job_id}/approve-final"})],
            ),
        )
        return self._build_stage_action_response(updated)

    async def reject_final(self, job_id: str) -> StageActionResponse:
        """Reject the final preview without deleting preview assets."""

        await self.apply_final_approval(job_id, "rejected", "")
        updated = await self._load_job(job_id)
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[("api_reject_final_called", {"endpoint": f"/api/jobs/{job_id}/reject-final"})],
            ),
        )
        return self._build_stage_action_response(updated)

    async def rerun_stage(self, job_id: str, payload: StageRerunRequest) -> StageRerunResponse:
        """Rerun one explicit stage based on the operator-selected stage name."""

        if payload.stage == "content_generation":
            return await self.rerun_content(job_id)
        if payload.stage == "image_generation":
            return await self.rerun_image(job_id)
        return await self.rerun_final_render(job_id)

    async def submit_content_approval(
        self,
        job_id: str,
        payload: ContentApprovalRequest,
    ) -> ContentApprovalResponse:
        """Persist content approval and prepare the image approval stage."""

        return await self.apply_content_approval(job_id, payload.decision, payload.notes)

    async def apply_content_approval(
        self,
        job_id: str,
        decision: str,
        notes: str,
    ) -> ContentApprovalResponse:
        """Apply content approval decision and transition job state accordingly."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        old_status = str(job["status"])
        self._assert_expected_status(job, expected="content_pending_approval")
        transition_time = datetime.now(timezone.utc)

        if decision == "approved":
            image_prompt = self.build_image_prompt(job)
            batch = int(self._studio_state(job).get("image_option_batch") or 0) + 1
            generated = await self._generate_image_candidates_for_job(
                job_id=job_id,
                job=job,
                count=settings.image_candidates_per_run,
                batch=batch,
                include_preview_candidate=True,
                stage="image_generation",
            )
            primary_candidate = generated["primary_candidate"]
            image_preview_url = str(primary_candidate["public_url"])
            updated_output_spec = self._with_studio_state(
                job,
                selected_image_relative_path=str(primary_candidate["relative_path"]),
                selected_image_url=image_preview_url,
                selected_image_version=str(primary_candidate["version"]),
                selected_image_style=str(primary_candidate["theme_style"]),
                image_option_batch=batch,
            )
            updates = {
                "status": "image_pending_approval",
                "content_approval_status": "approved",
                "image_approval_status": "pending",
                "image_prompt": image_prompt,
                "image_preview_url": image_preview_url,
                "output_spec": updated_output_spec,
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": None,
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_approved", {"decision": decision, "notes": notes}),
                ("image_prompt_created", {"provider": self._image_provider.name}),
                (
                    "image_generated",
                    {
                        "image_preview_url": image_preview_url,
                        "provider": self._image_provider.name,
                        "generated_count": len(generated["assets"]),
                    },
                ),
                ("image_approval_requested", {"image_preview_url": image_preview_url}),
            ]
        elif decision == "rejected":
            updates = {
                "status": "content_rejected",
                "content_approval_status": "rejected",
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": notes or "Content rejected by operator",
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_rejected", {"decision": decision, "notes": notes}),
            ]
        else:
            updates = {
                "status": "content_timeout",
                "content_approval_status": "timeout",
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": notes or "Content approval timed out",
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_timeout", {"decision": decision, "notes": notes}),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates=updates,
            stage="content",
            decision=decision,
            notes=notes,
        )
        assert updated is not None
        await self._repository.append_audit_events(job_id, audit_events)

        logger.info(
            "workflow transition job_id=%s stage=content %s -> %s",
            job_id,
            old_status,
            updated["status"],
        )

        return ContentApprovalResponse(
            job_id=job_id,
            status=str(updated["status"]),
            image_prompt=updated.get("image_prompt"),
            image_preview_url=updated.get("image_preview_url"),
        )

    async def submit_image_approval(
        self,
        job_id: str,
        payload: ImageApprovalRequest,
    ) -> ImageApprovalResponse:
        """Persist image approval and prepare final approval preview."""

        return await self.apply_image_approval(job_id, payload.decision, payload.notes or "")

    async def apply_image_approval(
        self,
        job_id: str,
        decision: str,
        notes: str,
    ) -> ImageApprovalResponse:
        """Apply image approval decision and transition job state accordingly."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        old_status = str(job["status"])
        if str(job.get("status")) != "image_pending_approval":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Job not in image_pending_approval state",
            )

        normalized_decision = decision.strip().lower()
        if normalized_decision not in {"approved", "rejected", "timeout"}:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid decision. Allowed values: approved, rejected, timeout",
            )

        transition_time = datetime.now(timezone.utc)
        if normalized_decision == "approved":
            final_preview_relative_path = self._build_final_preview_relative_path(job_id)
            self._save_internal_preview_asset(
                relative_path=final_preview_relative_path,
                payload=PreviewCardRenderInput(
                    title="Image Approved - Final Review",
                    message=self._resolve_winning_content(job),
                    signoff="Internal Preview",
                    theme_style=self._resolve_theme_style(job),
                    background_image_url=self._resolve_background_image_url(job),
                    text_alignment="left",
                    export_size=self._resolve_export_size(job),
                    theme_name=str(job.get("theme_name") or ""),
                    job_id=job_id,
                    status="final_pending_approval",
                    metadata_lines=[
                        f"Audience: {job.get('audience', 'N/A')}",
                        f"Tone: {job.get('tone_style', 'N/A')}",
                        "Final card render queued",
                    ],
                ),
            )
            final_preview_url = self._asset_storage.get_public_url(final_preview_relative_path)
            updates = {
                "status": "final_pending_approval",
                "image_approval_status": "approved",
                "final_preview_url": final_preview_url,
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": None,
            }
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                (
                    "image_approved",
                    {
                        "job_id": job_id,
                        "decision": normalized_decision,
                        "notes": notes,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    },
                ),
                ("preview_assembled", {"stub": False, "final_preview_url": final_preview_url}),
                ("final_approval_requested", {"final_preview_url": final_preview_url}),
            ]
        elif normalized_decision == "rejected":
            updates = {
                "status": "image_rejected",
                "image_approval_status": "rejected",
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": notes or "Image rejected by operator",
            }
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                (
                    "image_rejected",
                    {
                        "job_id": job_id,
                        "decision": normalized_decision,
                        "notes": notes,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    },
                ),
            ]
        else:
            updates = {
                "status": "image_timeout",
                "image_approval_status": "timeout",
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": notes or "Image approval timed out",
            }
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                (
                    "image_timeout",
                    {
                        "job_id": job_id,
                        "decision": normalized_decision,
                        "notes": notes,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    },
                ),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates=updates,
            stage="image",
            decision=normalized_decision,
            notes=notes,
        )
        assert updated is not None
        await self._repository.append_audit_events(job_id, audit_events)

        if normalized_decision == "approved":
            final_preview_relative_path = self._build_final_preview_relative_path(job_id)
            await self._repository.save_asset(
                job_id,
                asset_type="final_preview",
                asset_url=str(updated.get("final_preview_url") or ""),
                storage_backend=self._asset_storage.backend,
                storage_root=self._asset_storage.get_absolute_path(""),
                relative_path=final_preview_relative_path,
                public_url=str(updated.get("final_preview_url") or ""),
                absolute_path=self._asset_storage.get_absolute_path(final_preview_relative_path),
                file_size_bytes=self._read_file_size_bytes(final_preview_relative_path),
                version="v1",
                approved=False,
            )
        logger.info(
            "workflow transition job_id=%s stage=image %s -> %s",
            job_id,
            old_status,
            updated["status"],
        )

        return ImageApprovalResponse(
            job_id=job_id,
            status=str(updated["status"]),
            final_preview_url=updated.get("final_preview_url"),
        )

    async def submit_final_approval(self, job_id: str, payload: ApprovalRequest) -> FinalApprovalResponse:
        """Persist final approval and mark job completion when approved."""

        return await self.apply_final_approval(job_id, payload.decision, payload.notes)

    async def apply_final_approval(
        self,
        job_id: str,
        decision: str,
        notes: str,
    ) -> FinalApprovalResponse:
        """Apply final approval decision and transition job state accordingly."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
        old_status = str(job["status"])
        if str(job.get("status")) != "final_pending_approval":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Job not in final_pending_approval state",
            )

        normalized_decision = decision.strip().lower()
        if normalized_decision not in {"approved", "rejected", "timeout"}:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid decision. Allowed values: approved, rejected, timeout",
            )

        transition_time = datetime.now(timezone.utc)
        event_payload = {
            "job_id": job_id,
            "decision": normalized_decision,
            "notes": notes,
            "timestamp": transition_time.isoformat(),
        }
        if normalized_decision == "approved":
            generated_assets = self._generate_final_assets(job_id=job_id, job=job)
            final_asset_urls = {
                "png": generated_assets["png"]["public_url"],
                "pdf": generated_assets["pdf"]["public_url"],
            }
            updates = {
                "status": "completed",
                "final_approval_status": "approved",
                "final_asset_urls": final_asset_urls,
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": None,
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_approved", event_payload),
                (
                    "final_png_exported",
                    {"stub": False, "png": final_asset_urls["png"], "pdf": final_asset_urls["pdf"]},
                ),
                ("job_completed", {"status": "completed"}),
            ]
        elif normalized_decision == "rejected":
            updates = {
                "status": "final_rejected",
                "final_approval_status": "rejected",
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": notes or "Final output rejected by operator",
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_rejected", event_payload),
            ]
        else:
            updates = {
                "status": "final_timeout",
                "final_approval_status": "timeout",
                "last_stage_started_at": transition_time,
                "last_stage_finished_at": transition_time,
                "last_error_message": notes or "Final approval timed out",
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_timeout", event_payload),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates=updates,
            stage="final",
            decision=normalized_decision,
            notes=notes,
        )
        assert updated is not None
        await self._repository.append_audit_events(job_id, audit_events)

        if normalized_decision == "approved":
            png_meta = generated_assets["png"]
            pdf_meta = generated_assets["pdf"]
            if png_meta["public_url"]:
                await self._repository.save_asset(
                    job_id,
                    asset_type="final_png",
                    asset_url=png_meta["public_url"],
                    storage_backend=png_meta["storage_backend"],
                    storage_root=png_meta["storage_root"],
                    relative_path=png_meta["relative_path"],
                    public_url=png_meta["public_url"],
                    absolute_path=png_meta["absolute_path"],
                    file_size_bytes=png_meta["file_size_bytes"],
                    version="v1",
                    approved=True,
                )
            if pdf_meta["public_url"]:
                await self._repository.save_asset(
                    job_id,
                    asset_type="final_pdf",
                    asset_url=pdf_meta["public_url"],
                    storage_backend=pdf_meta["storage_backend"],
                    storage_root=pdf_meta["storage_root"],
                    relative_path=pdf_meta["relative_path"],
                    public_url=pdf_meta["public_url"],
                    absolute_path=pdf_meta["absolute_path"],
                    file_size_bytes=pdf_meta["file_size_bytes"],
                    version="v1",
                    approved=True,
                )
        logger.info(
            "workflow transition job_id=%s stage=final %s -> %s",
            job_id,
            old_status,
            updated["status"],
        )
        logger.info("workflow final approval committed job_id=%s status=%s", job_id, updated["status"])

        asset_urls = updated.get("final_asset_urls")
        return FinalApprovalResponse(
            job_id=job_id,
            status=str(updated["status"]),
            final_asset_urls=FinalAssetUrls.model_validate(asset_urls) if asset_urls else None,
        )

    async def get_job_candidates(self, job_id: str) -> list[CandidateDebugResponse]:
        """Return the full pooled candidate set for one job."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        candidates = sorted(
            list(job.get("candidates") or []),
            key=lambda item: (
                int(item.get("shortlist_rank") or 9999),
                -float(item.get("judged_score") or item.get("judge_score") or 0.0),
            ),
        )
        return [CandidateDebugResponse.model_validate(item) for item in candidates]

    async def get_job_shortlist(self, job_id: str) -> list[ShortlistEntryResponse]:
        """Return the ranked top-10 shortlist for one job."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        shortlist = sorted(list(job.get("shortlist") or []), key=lambda item: int(item.get("rank") or 9999))
        return [ShortlistEntryResponse.model_validate(item) for item in shortlist]

    async def rerun_content(self, job_id: str) -> StageRerunResponse:
        """Regenerate the pooled content candidates and shortlist for an existing job."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        started_at = await self._mark_stage_started(job_id=job_id, job=job, stage="content")
        try:
            payload = self._build_start_payload_from_job(job)
            generation = await self._contentforge.generate_and_judge(payload)
            winner = generation["winner"]
            candidate_records = [
                {
                    "model": str(candidate["model"]),
                    "backend": str(candidate["backend"]),
                    "content_text": str(candidate["content_text"]),
                    "text": str(candidate["content_text"]),
                    "raw_score": float(candidate["raw_score"]),
                    "judge_score": float(candidate["judge_score"]),
                    "judged_score": float(candidate["judge_score"]),
                    "is_winner": bool(candidate["is_winner"]),
                    "is_shortlisted": bool(candidate.get("is_shortlisted")),
                    "is_selected": bool(candidate.get("is_selected")),
                }
                for candidate in generation["candidates"]
            ]
            winner_model = str(winner["model"])
            content_preview = str(winner["content_text"])
            await self._repository.save_content_candidates(job_id, candidate_records, replace_existing=True)
            persisted = await self._load_job(job_id)
            shortlist_rows = self._build_shortlist_rows(
                persisted_candidates=list(persisted.get("candidates") or []) if persisted else [],
                shortlist_seed=list(generation.get("shortlist") or []),
            )
            await self._repository.save_shortlist(job_id, shortlist_rows, replace_existing=True)
            finished_at = datetime.now(timezone.utc)
            updated = await self._repository.update_job_status(
                job_id=job_id,
                updates={
                    "status": "content_pending_approval",
                    "content_preview": content_preview,
                    "winner_model": winner_model,
                    "content_approval_status": "pending",
                    "image_approval_status": "pending",
                    "final_approval_status": "pending",
                    "image_prompt": None,
                    "image_preview_url": None,
                    "final_preview_url": None,
                    "final_asset_urls": None,
                    "last_stage_started_at": started_at,
                    "last_stage_finished_at": finished_at,
                    "last_error_message": None,
                },
            )
            assert updated is not None
            await self._repository.save_judge_results(
                job_id,
                {
                    "judge_provider": "contentforge_stub",
                    "judge_model": "stub-judge",
                    "winner_model": winner_model,
                    "leaderboard_json": {
                        "models": [item["model"] for item in candidate_records],
                        "shortlist": generation.get("shortlist") or [],
                    },
                    "pairwise_json": {},
                    "reason_summary": generation["judge_summary"],
                },
            )
            await self._repository.append_audit_events(
                job_id,
                self._build_audit_events(
                    job_id=job_id,
                    events=[
                        ("rerun_requested", {"stage": "content"}),
                        ("content_rerun_completed", {"candidate_count": len(candidate_records), "shortlist_count": len(shortlist_rows)}),
                    ],
                ),
            )
            return self._build_stage_rerun_response("content", updated)
        except Exception as exc:  # noqa: BLE001
            await self._mark_stage_failed(job_id=job_id, job=job, stage="content", started_at=started_at, error=exc)
            raise

    async def rerun_image(self, job_id: str) -> StageRerunResponse:
        """Regenerate the image-stage preview from the selected content."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        if not self._resolve_winning_content(job):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No approved content available to rerun image stage")
        started_at = await self._mark_stage_started(job_id=job_id, job=job, stage="image")
        try:
            batch = int(self._studio_state(job).get("image_option_batch") or 0) + 1
            image_prompt = self.build_image_prompt(job)
            generated = await self._generate_image_candidates_for_job(
                job_id=job_id,
                job=job,
                count=settings.image_candidates_per_run,
                batch=batch,
                include_preview_candidate=True,
                stage="image_generation",
            )
            primary_candidate = generated["primary_candidate"]
            image_preview_url = str(primary_candidate["public_url"])
            updated_output_spec = self._with_studio_state(
                job,
                selected_image_relative_path=str(primary_candidate["relative_path"]),
                selected_image_url=image_preview_url,
                selected_image_version=str(primary_candidate["version"]),
                selected_image_style=str(primary_candidate["theme_style"]),
                image_option_batch=batch,
            )
            finished_at = datetime.now(timezone.utc)
            updated = await self._repository.update_job_status(
                job_id=job_id,
                updates={
                    "status": "image_pending_approval",
                    "image_approval_status": "pending",
                    "final_approval_status": "pending",
                    "image_prompt": image_prompt,
                    "image_preview_url": image_preview_url,
                    "final_preview_url": None,
                    "final_asset_urls": None,
                    "output_spec": updated_output_spec,
                    "last_stage_started_at": started_at,
                    "last_stage_finished_at": finished_at,
                    "last_error_message": None,
                },
            )
            assert updated is not None
            await self._repository.append_audit_events(
                job_id,
                self._build_audit_events(
                    job_id=job_id,
                    events=[
                        ("rerun_requested", {"stage": "image"}),
                        (
                            "image_rerun_completed",
                            {
                                "image_preview_url": image_preview_url,
                                "provider": self._image_provider.name,
                                "generated_count": len(generated["assets"]),
                            },
                        ),
                    ],
                ),
            )
            return self._build_stage_rerun_response("image", updated)
        except Exception as exc:  # noqa: BLE001
            await self._mark_stage_failed(job_id=job_id, job=job, stage="image", started_at=started_at, error=exc)
            raise

    async def rerun_final_render(self, job_id: str) -> StageRerunResponse:
        """Rebuild the final-review preview from the selected content/image state."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        if not str(job.get("image_preview_url") or "").strip():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No image preview available to rerun final render")
        started_at = await self._mark_stage_started(job_id=job_id, job=job, stage="final_render")
        try:
            final_preview_relative_path = self._build_final_preview_relative_path(job_id)
            self._save_internal_preview_asset(
                relative_path=final_preview_relative_path,
                payload=PreviewCardRenderInput(
                    title="Final Render Rerun",
                    message=self._resolve_winning_content(job),
                    signoff="Internal Preview",
                    theme_style=self._resolve_theme_style(job),
                    background_image_url=self._resolve_background_image_url(job),
                    text_alignment="left",
                    export_size=self._resolve_export_size(job),
                    theme_name=str(job.get("theme_name") or ""),
                    job_id=job_id,
                    status="final_pending_approval",
                    metadata_lines=[
                        f"Audience: {job.get('audience', 'N/A')}",
                        f"Tone: {job.get('tone_style', 'N/A')}",
                        "Final preview rebuilt from shortlisted content",
                    ],
                ),
            )
            final_preview_url = self._asset_storage.get_public_url(final_preview_relative_path)
            finished_at = datetime.now(timezone.utc)
            updated = await self._repository.update_job_status(
                job_id=job_id,
                updates={
                    "status": "final_pending_approval",
                    "final_approval_status": "pending",
                    "final_preview_url": final_preview_url,
                    "final_asset_urls": None,
                    "last_stage_started_at": started_at,
                    "last_stage_finished_at": finished_at,
                    "last_error_message": None,
                },
            )
            assert updated is not None
            await self._repository.save_asset(
                job_id,
                asset_type="final_preview",
                asset_url=final_preview_url,
                storage_backend=self._asset_storage.backend,
                storage_root=self._asset_storage.get_absolute_path(""),
                relative_path=final_preview_relative_path,
                public_url=final_preview_url,
                absolute_path=self._asset_storage.get_absolute_path(final_preview_relative_path),
                file_size_bytes=self._read_file_size_bytes(final_preview_relative_path),
                version="v1",
                approved=False,
            )
            await self._repository.append_audit_events(
                job_id,
                self._build_audit_events(
                    job_id=job_id,
                    events=[
                        ("rerun_requested", {"stage": "final_render"}),
                        ("final_render_rerun_completed", {"final_preview_url": final_preview_url}),
                    ],
                ),
            )
            return self._build_stage_rerun_response("final_render", updated)
        except Exception as exc:  # noqa: BLE001
            await self._mark_stage_failed(job_id=job_id, job=job, stage="final_render", started_at=started_at, error=exc)
            raise

    async def rerun_full(self, job_id: str) -> StageRerunResponse:
        """Rerun the workflow from pooled content generation."""

        response = await self.rerun_content(job_id)
        return StageRerunResponse(
            job_id=response.job_id,
            stage="full",
            status=response.status,
            retry_count=response.retry_count,
            last_stage_started_at=response.last_stage_started_at,
            last_stage_finished_at=response.last_stage_finished_at,
            last_error_message=response.last_error_message,
        )

    async def render_shortlist(self, job_id: str, payload: RenderShortlistRequest) -> RenderShortlistResponse:
        """Render one or more shortlisted candidates into preview assets."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        shortlist = sorted(list(job.get("shortlist") or []), key=lambda item: int(item.get("rank") or 9999))
        if not shortlist:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No shortlist available for this job")
        shortlist_by_candidate = {int(item["candidate_id"]): item for item in shortlist if item.get("candidate_id")}
        selected_ids = [int(candidate_id) for candidate_id in payload.candidate_ids if int(candidate_id) in shortlist_by_candidate]
        if not selected_ids:
            selected_ids = [int(shortlist[0]["candidate_id"])]

        await self._repository.update_candidate_selection(job_id, selected_ids)
        rendered_assets: list[RenderedShortlistAssetResponse] = []
        for candidate_id in selected_ids:
            shortlist_entry = shortlist_by_candidate[candidate_id]
            relative_path = self._build_shortlist_preview_relative_path(job_id, candidate_id)
            message = str(shortlist_entry.get("text") or "")
            self._save_internal_preview_asset(
                relative_path=relative_path,
                payload=PreviewCardRenderInput(
                    title=f"Shortlist Render #{shortlist_entry.get('rank')}",
                    message=message,
                    signoff="Shortlist Preview",
                    theme_style=self._resolve_theme_style(job),
                    background_image_url=self._resolve_background_image_url(job),
                    text_alignment="left",
                    export_size=self._resolve_export_size(job),
                    theme_name=str(job.get("theme_name") or ""),
                    job_id=job_id,
                    status=str(job.get("status") or "content_pending_approval"),
                    metadata_lines=[
                        f"Candidate model: {shortlist_entry.get('model') or 'N/A'}",
                        f"Shortlist rank: {shortlist_entry.get('rank') or '-'}",
                        "Rendered from candidate pool shortlist",
                    ],
                ),
            )
            preview_url = self._asset_storage.get_public_url(relative_path)
            await self._repository.save_asset(
                job_id,
                asset_type="shortlist_preview",
                asset_url=preview_url,
                storage_backend=self._asset_storage.backend,
                storage_root=self._asset_storage.get_absolute_path(""),
                relative_path=relative_path,
                public_url=preview_url,
                absolute_path=self._asset_storage.get_absolute_path(relative_path),
                file_size_bytes=self._read_file_size_bytes(relative_path),
                version="v1",
                approved=False,
            )
            rendered_assets.append(
                RenderedShortlistAssetResponse(
                    candidate_id=candidate_id,
                    rank=int(shortlist_entry.get("rank") or 0) or None,
                    preview_url=preview_url,
                    asset_type="shortlist_preview",
                    relative_path=relative_path,
                )
            )

        primary = shortlist_by_candidate[selected_ids[0]]
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "content_preview": str(primary.get("text") or job.get("content_preview") or ""),
                "winner_model": str(primary.get("model") or job.get("winner_model") or ""),
                "last_error_message": None,
            },
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("shortlist_render_requested", {"candidate_ids": selected_ids}),
                    ("shortlist_render_completed", {"rendered_count": len(rendered_assets)}),
                ],
            ),
        )
        return RenderShortlistResponse(
            job_id=job_id,
            rendered_count=len(rendered_assets),
            rendered_assets=rendered_assets,
        )

    async def select_text_option(self, job_id: str, payload: SelectTextRequest) -> StudioActionResponse:
        """Choose one candidate as the active card copy and clear downstream visuals."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        candidates = list(job.get("candidates") or [])
        selected = next((item for item in candidates if int(item.get("id") or 0) == payload.candidate_id), None)
        if selected is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Text option not found.")

        await self._repository.update_candidate_selection(job_id, [payload.candidate_id])
        selection_time = datetime.now(timezone.utc)
        updated_output_spec = self._with_studio_state(
            job,
            selected_text_candidate_id=payload.candidate_id,
            selected_image_relative_path=None,
            selected_image_url=None,
            selected_image_version=None,
            selected_image_style=None,
            text_selected_at=selection_time.isoformat(),
            image_option_batch=0,
        )
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "content_approved",
                "content_preview": str(selected.get("content_text") or selected.get("text") or ""),
                "winner_model": str(selected.get("model") or "") or None,
                "content_approval_status": "approved",
                "image_approval_status": "pending",
                "final_approval_status": "pending",
                "image_prompt": None,
                "image_preview_url": None,
                "final_preview_url": None,
                "final_asset_urls": None,
                "output_spec": updated_output_spec,
                "last_stage_started_at": selection_time,
                "last_stage_finished_at": selection_time,
                "last_error_message": None,
            },
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("studio_text_selected", {"candidate_id": payload.candidate_id, "model": str(selected.get("model") or "")}),
                ],
            ),
        )
        return self._build_studio_action_response(updated)

    async def generate_more_text_options(self, job_id: str, *, count: int = 10) -> GenerateMoreResponse:
        """Append more short card-copy options without replacing the current selection."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        payload = self._build_start_payload_from_job(job)
        existing_count = len(list(job.get("candidates") or []))
        generated = self._contentforge.generate_more_candidates(
            payload,
            count=count,
            start_index=existing_count,
        )
        if not generated:
            return GenerateMoreResponse(job_id=job_id, status=str(job.get("status") or "unknown"), generated_count=0)

        await self._repository.save_content_candidates(job_id, generated, replace_existing=False)
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("studio_more_text_generated", {"generated_count": len(generated)}),
                ],
            ),
        )
        refreshed = await self._load_job(job_id)
        return GenerateMoreResponse(
            job_id=job_id,
            status=str(refreshed.get("status") or job.get("status") or "unknown") if refreshed else str(job.get("status") or "unknown"),
            generated_count=len(generated),
        )

    async def generate_more_image_options(self, job_id: str, *, count: int = 3, refresh_batch: bool = False) -> GenerateMoreResponse:
        """Generate more card-style visual options for the currently selected text."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        selected_text = self._resolve_winning_content(job)
        if not selected_text.strip():
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="No selected text available to generate image options")

        studio_state = self._studio_state(job)
        current_batch = int(studio_state.get("image_option_batch") or 0)
        batch = 1 if refresh_batch and current_batch <= 0 else current_batch + 1
        generated_assets = await self._generate_image_option_assets(job_id=job_id, job=job, count=count, batch=batch)
        updated_output_spec = self._with_studio_state(
            job,
            image_option_batch=batch,
            text_selected_at=studio_state.get("text_selected_at") or datetime.now(timezone.utc).isoformat(),
        )
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "output_spec": updated_output_spec,
                "status": str(job.get("status") or "content_approved"),
                "last_stage_started_at": datetime.now(timezone.utc),
                "last_stage_finished_at": datetime.now(timezone.utc),
                "last_error_message": None,
            },
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("studio_more_images_generated", {"generated_count": len(generated_assets), "batch": batch}),
                ],
            ),
        )
        return GenerateMoreResponse(job_id=job_id, status=str(updated.get("status") or "unknown"), generated_count=len(generated_assets))

    async def select_image_option(self, job_id: str, payload: SelectImageRequest) -> StudioActionResponse:
        """Choose one visual option as the active card direction."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        assets = list(job.get("assets") or [])
        selected_asset = self._find_image_asset(assets, payload)
        if selected_asset is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image option not found.")

        relative_path = str(selected_asset.get("relative_path") or "")
        selected_url = str(selected_asset.get("public_url") or selected_asset.get("asset_url") or "") or None
        selected_style = self._extract_theme_style_from_asset(selected_asset)
        current_output_spec = self._resolve_output_spec(job)
        rendering = dict(current_output_spec.get("rendering") or {})
        if selected_style:
            rendering["theme_style"] = selected_style
        updated_output_spec = self._with_studio_state(
            job,
            selected_image_relative_path=relative_path,
            selected_image_url=selected_url,
            selected_image_version=str(selected_asset.get("version") or "") or None,
            selected_image_style=selected_style,
        )
        updated_output_spec["rendering"] = rendering
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "image_approved",
                "image_preview_url": selected_url,
                "image_approval_status": "approved",
                "final_approval_status": "pending",
                "final_preview_url": None,
                "final_asset_urls": None,
                "output_spec": updated_output_spec,
                "last_stage_started_at": datetime.now(timezone.utc),
                "last_stage_finished_at": datetime.now(timezone.utc),
                "last_error_message": None,
            },
        )
        assert updated is not None
        await self._repository.update_asset_selection(
            job_id,
            asset_type=str(selected_asset.get("asset_type") or "image_option"),
            selected_relative_path=relative_path,
        )
        await self._repository.update_image_candidate_selection(
            job_id,
            selected_relative_path=relative_path,
        )
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("studio_image_selected", {"relative_path": relative_path, "theme_style": selected_style}),
                ],
            ),
        )
        return self._build_studio_action_response(updated)

    async def mark_favorite(self, job_id: str, payload: FavoriteCardRequest) -> StudioActionResponse:
        """Mark or unmark the current card job as a favorite."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        updated_output_spec = self._with_studio_state(job, is_favorite=bool(payload.favorite))
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "output_spec": updated_output_spec,
                "updated_at": datetime.now(timezone.utc),
            },
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("studio_favorite_updated", {"is_favorite": bool(payload.favorite)}),
                ],
            ),
        )
        return self._build_studio_action_response(updated)

    async def get_job_debug(self, job_id: str) -> JobDebugResponse:
        """Return a full job snapshot including approvals, candidates, and audit events."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        final_assets = job.get("final_asset_urls") if isinstance(job.get("final_asset_urls"), dict) else {}
        asset_urls = [
            str(asset.get("asset_url") or asset.get("public_url") or "")
            for asset in list(job.get("assets") or [])
            if str(asset.get("asset_url") or asset.get("public_url") or "").strip()
        ]
        logger.info(
            "workflow preview debug source=get_job_debug job_id=%s image_preview_url=%s final_preview_url=%s final_asset_png=%s asset_urls=%s",
            job_id,
            str(job.get("image_preview_url") or ""),
            str(job.get("final_preview_url") or ""),
            str(final_assets.get("png") or ""),
            asset_urls[:4],
        )
        return JobDebugResponse.model_validate(job)

    async def list_jobs(self, *, limit: int = 100) -> list[JobListItemResponse]:
        """Return newest-first jobs with a compact status payload for admin console."""

        rows, backend = await self._repository.list_jobs(limit=limit)
        logger.info("workflow jobs listed count=%s backend=%s", len(rows), backend)
        items: list[JobListItemResponse] = []
        for row in rows:
            created_at = self._coerce_datetime(row.get("created_at"))
            updated_at = self._coerce_datetime(row.get("updated_at"), fallback=created_at)
            status_value = str(row.get("status") or "unknown")
            items.append(
                JobListItemResponse(
                    job_id=str(row.get("job_id")),
                    theme_name=str(row.get("theme_name") or "Untitled"),
                    current_stage=self._resolve_current_stage(status_value),
                    status=status_value,
                    output_spec=row.get("output_spec") if isinstance(row.get("output_spec"), dict) else {},
                    content_preview=str(row.get("content_preview") or "") or None,
                    image_preview_url=str(row.get("image_preview_url") or "") or None,
                    final_preview_url=str(row.get("final_preview_url") or "") or None,
                    final_asset_urls=row.get("final_asset_urls") if isinstance(row.get("final_asset_urls"), dict) else None,
                    cards_per_theme=int(row.get("cards_per_theme") or 10),
                    content_approval_status=str(row.get("content_approval_status") or "pending"),
                    image_approval_status=str(row.get("image_approval_status") or "pending"),
                    final_approval_status=str(row.get("final_approval_status") or "pending"),
                    retry_count=int(row.get("retry_count") or 0),
                    last_error_message=str(row.get("last_error_message") or "") or None,
                    created_at=created_at,
                    updated_at=updated_at,
                )
            )
        if items:
            sample = items[0]
            final_assets = sample.final_asset_urls if isinstance(sample.final_asset_urls, dict) else {}
            logger.info(
                "workflow preview debug source=list_jobs job_id=%s image_preview_url=%s final_preview_url=%s final_asset_png=%s",
                sample.job_id,
                sample.image_preview_url or "",
                sample.final_preview_url or "",
                str(final_assets.get("png") or ""),
            )
        return items

    async def get_job_assets(self, job_id: str) -> list[JobAssetResponse]:
        """Return persisted asset metadata for a job."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        assets = sorted(
            list(job.get("assets") or []),
            key=lambda item: self._coerce_datetime(item.get("created_at"), fallback=datetime.min.replace(tzinfo=timezone.utc)),
            reverse=True,
        )
        models = [JobAssetResponse.model_validate(item) for item in assets]
        logger.info(
            "workflow preview debug source=get_job_assets job_id=%s asset_urls=%s",
            job_id,
            [asset.asset_url for asset in models[:4]],
        )
        return models

    async def get_job_events(self, job_id: str) -> list[JobEventResponse]:
        """Return lifecycle audit events for a job."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        events = sorted(
            list(job.get("audit_log") or []),
            key=lambda item: self._coerce_datetime(item.get("created_at"), fallback=datetime.min.replace(tzinfo=timezone.utc)),
        )
        return [JobEventResponse.model_validate(item) for item in events]

    async def archive_job(self, job_id: str) -> JobArchiveResponse:
        """Archive a job without deleting any assets."""

        current = await self._load_job(job_id)
        if current is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        previous_status = str(current.get("status") or "unknown")
        if previous_status == "archived":
            return JobArchiveResponse(
                job_id=job_id,
                status=previous_status,
                updated_at=self._coerce_datetime(current.get("updated_at")),
            )

        updated = await self._repository.update_job_status(job_id=job_id, updates={"status": "archived"})
        if updated is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("api_archive_called", {"endpoint": f"/api/jobs/{job_id}/archive"}),
                    ("job_archived", {"previous_status": previous_status}),
                ],
            ),
        )
        return JobArchiveResponse(
            job_id=job_id,
            status=str(updated["status"]),
            updated_at=self._coerce_datetime(updated.get("updated_at")),
        )

    async def delete_job(self, job_id: str) -> JobDeleteResponse:
        """Delete a job and remove known asset files from storage."""

        deleted_snapshot, backend = await self._repository.delete_job(job_id)
        if deleted_snapshot is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        deleted_files = 0
        delete_targets = sorted(self._collect_asset_delete_targets(deleted_snapshot), key=lambda item: str(item))
        for path in delete_targets:
            if self._delete_asset_path(path):
                deleted_files += 1

        logger.info(
            "workflow job deleted job_id=%s backend=%s deleted_files=%s",
            job_id,
            backend,
            deleted_files,
        )
        return JobDeleteResponse(job_id=job_id, deleted=True, deleted_files=deleted_files)

    async def _load_job(self, job_id: str) -> dict[str, Any] | None:
        """Load job from Postgres when possible, otherwise from in-memory fallback."""

        job, backend = await self._repository.get_job(job_id)
        logger.info(
            "workflow lookup job_id=%s found=%s backend=%s",
            job_id,
            "true" if job is not None else "false",
            backend,
        )
        return job

    @staticmethod
    def _assert_expected_status(job: dict[str, Any], *, expected: str) -> None:
        """Guard endpoints against invalid workflow state transitions."""

        current = str(job["status"])
        if current != expected:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Invalid state transition. Expected '{expected}' but current status is '{current}'.",
            )

    @staticmethod
    def _build_audit_events(
        *,
        job_id: str,
        events: list[tuple[str, dict[str, Any]]],
    ) -> list[dict[str, Any]]:
        """Create normalized audit payloads with timestamps."""

        now = datetime.now(timezone.utc)
        return [
            {
                "job_id": job_id,
                "event_type": event_type,
                "event_payload_json": payload,
                "created_at": now,
            }
            for event_type, payload in events
        ]

    @staticmethod
    def _coerce_datetime(value: Any, *, fallback: datetime | None = None) -> datetime:
        """Normalize unknown datetime values to an aware UTC datetime."""

        if isinstance(value, datetime):
            if value.tzinfo is None:
                return value.replace(tzinfo=timezone.utc)
            return value
        if isinstance(value, str):
            try:
                parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
                if parsed.tzinfo is None:
                    return parsed.replace(tzinfo=timezone.utc)
                return parsed
            except ValueError:
                pass
        if fallback is not None:
            return fallback
        return datetime.now(timezone.utc)

    @staticmethod
    def _resolve_current_stage(status_value: str) -> str:
        """Map persisted workflow status to one coarse-grained current stage."""

        normalized = status_value.strip().lower()
        if normalized == "content_approved":
            return "image_generation"
        if normalized == "image_approved":
            return "final_render"
        if normalized.startswith("content"):
            return "content_generation"
        if normalized.startswith("image"):
            return "image_generation"
        if normalized.startswith("final"):
            return "final_render"
        if normalized in {"completed", "archived"}:
            return normalized
        return "queued"

    async def _mark_stage_started(
        self,
        *,
        job_id: str,
        job: dict[str, Any],
        stage: str,
        increment_retry: bool = True,
    ) -> datetime:
        """Persist generic rerun tracking metadata when a stage begins."""

        started_at = datetime.now(timezone.utc)
        next_retry_count = int(job.get("retry_count") or 0) + (1 if increment_retry else 0)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "retry_count": next_retry_count,
                "last_stage_started_at": started_at,
                "last_stage_finished_at": None,
                "last_error_message": None,
            },
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[("stage_rerun_started", {"stage": stage, "retry_count": updated.get("retry_count", 0)})],
            ),
        )
        return started_at

    async def _mark_stage_failed(
        self,
        *,
        job_id: str,
        job: dict[str, Any],
        stage: str,
        started_at: datetime,
        error: Exception,
    ) -> None:
        """Persist rerun failure metadata for user-facing diagnostics."""

        finished_at = datetime.now(timezone.utc)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": str(job.get("status") or "unknown"),
                "last_stage_started_at": started_at,
                "last_stage_finished_at": finished_at,
                "last_error_message": str(error),
            },
        )
        assert updated is not None
        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[("stage_rerun_failed", {"stage": stage, "error": str(error)})],
            ),
        )

    @staticmethod
    def _build_stage_rerun_response(stage: str, updated: dict[str, Any]) -> StageRerunResponse:
        """Build a normalized response for stage rerun endpoints."""

        return StageRerunResponse(
            job_id=str(updated.get("job_id") or ""),
            stage=stage,
            status=str(updated.get("status") or "unknown"),
            retry_count=int(updated.get("retry_count") or 0),
            last_stage_started_at=WorkflowV1Service._coerce_datetime(
                updated.get("last_stage_started_at"),
                fallback=None,
            )
            if updated.get("last_stage_started_at")
            else None,
            last_stage_finished_at=WorkflowV1Service._coerce_datetime(
                updated.get("last_stage_finished_at"),
                fallback=None,
            )
            if updated.get("last_stage_finished_at")
            else None,
            last_error_message=str(updated.get("last_error_message") or "") or None,
        )

    @staticmethod
    def _build_stage_action_response(updated: dict[str, Any]) -> StageActionResponse:
        """Build a normalized response for one operator stage action."""

        final_asset_urls = updated.get("final_asset_urls") if isinstance(updated.get("final_asset_urls"), dict) else None
        return StageActionResponse(
            job_id=str(updated.get("job_id") or ""),
            status=str(updated.get("status") or "unknown"),
            content_approval_status=str(updated.get("content_approval_status") or "pending"),
            image_approval_status=str(updated.get("image_approval_status") or "pending"),
            final_approval_status=str(updated.get("final_approval_status") or "pending"),
            image_preview_url=str(updated.get("image_preview_url") or "") or None,
            final_preview_url=str(updated.get("final_preview_url") or "") or None,
            final_asset_urls=FinalAssetUrls.model_validate(final_asset_urls) if final_asset_urls else None,
            retry_count=int(updated.get("retry_count") or 0),
            last_stage_started_at=WorkflowV1Service._coerce_datetime(
                updated.get("last_stage_started_at"),
                fallback=None,
            )
            if updated.get("last_stage_started_at")
            else None,
            last_stage_finished_at=WorkflowV1Service._coerce_datetime(
                updated.get("last_stage_finished_at"),
                fallback=None,
            )
            if updated.get("last_stage_finished_at")
            else None,
            last_error_message=str(updated.get("last_error_message") or "") or None,
        )

    @staticmethod
    def _build_studio_action_response(updated: dict[str, Any]) -> StudioActionResponse:
        """Build a compact Studio response after a selection or favorite action."""

        studio_state = WorkflowV1Service._studio_state(updated)
        return StudioActionResponse(
            job_id=str(updated.get("job_id") or ""),
            status=str(updated.get("status") or "unknown"),
            content_preview=str(updated.get("content_preview") or "") or None,
            image_preview_url=str(updated.get("image_preview_url") or "") or None,
            final_preview_url=str(updated.get("final_preview_url") or "") or None,
            is_favorite=bool(studio_state.get("is_favorite")),
        )

    @staticmethod
    def _resolve_output_spec(job: dict[str, Any]) -> dict[str, Any]:
        """Return one mutable copy of output_spec from a job snapshot."""

        output_spec = job.get("output_spec")
        return dict(output_spec) if isinstance(output_spec, dict) else {}

    @staticmethod
    def _studio_state(job: dict[str, Any]) -> dict[str, Any]:
        """Return Studio metadata stored inside output_spec.studio."""

        output_spec = WorkflowV1Service._resolve_output_spec(job)
        studio = output_spec.get("studio")
        return dict(studio) if isinstance(studio, dict) else {}

    @staticmethod
    def _with_studio_state(job: dict[str, Any], **updates: Any) -> dict[str, Any]:
        """Return output_spec with nested Studio metadata merged in."""

        output_spec = WorkflowV1Service._resolve_output_spec(job)
        studio = WorkflowV1Service._studio_state(job)
        for key, value in updates.items():
            if value is None:
                studio.pop(key, None)
            else:
                studio[key] = value
        output_spec["studio"] = studio
        return output_spec

    @staticmethod
    def _build_shortlist_rows(
        *,
        persisted_candidates: list[dict[str, Any]],
        shortlist_seed: list[dict[str, Any]],
    ) -> list[dict[str, Any]]:
        """Map shortlist seed rows to persisted candidate ids."""

        candidates_by_signature: dict[tuple[str, str], list[dict[str, Any]]] = {}
        for candidate in persisted_candidates:
            signature = (
                str(candidate.get("model") or ""),
                str(candidate.get("content_text") or candidate.get("text") or ""),
            )
            candidates_by_signature.setdefault(signature, []).append(candidate)

        shortlist_rows: list[dict[str, Any]] = []
        for row in shortlist_seed:
            signature = (str(row.get("model") or ""), str(row.get("content_text") or ""))
            matches = candidates_by_signature.get(signature) or []
            if not matches:
                continue
            candidate = matches.pop(0)
            shortlist_rows.append(
                {
                    "candidate_id": int(candidate.get("id") or 0),
                    "rank": int(row.get("rank") or 0),
                    "score": float(row.get("score") or 0.0),
                }
            )
        shortlist_rows.sort(key=lambda item: item["rank"])
        return shortlist_rows

    @staticmethod
    def _build_shortlist_preview_relative_path(job_id: str, candidate_id: int) -> str:
        """Return relative storage path for one shortlist render preview."""

        return f"preview/{job_id}_shortlist_{candidate_id}.png"

    @staticmethod
    def _build_start_payload_from_job(job: dict[str, Any]) -> StartJobRequest:
        """Reconstruct a start payload from an existing job snapshot."""

        output_spec = job.get("output_spec") if isinstance(job.get("output_spec"), dict) else {}
        rendering = output_spec.get("rendering") if isinstance(output_spec.get("rendering"), dict) else {}
        return StartJobRequest(
            theme_name=str(job.get("theme_name") or "Internal Theme"),
            tone_funny_pct=int(job.get("tone_funny_pct") or 20),
            tone_emotion_pct=int(job.get("tone_emotion_pct") or 80),
            tone_style=str(job.get("tone_style") or "conversational"),
            audience=str(job.get("audience") or "internal reviewer"),
            cultural_context=str(job.get("cultural_context") or "global"),
            output_spec=output_spec,
            avoid_cliches=bool(job.get("avoid_cliches", True)),
            rendering=rendering,
            cards_per_theme=int(job.get("cards_per_theme") or 10),
            notes=str(job.get("operator_notes") or "") or None,
        )

    def _collect_asset_delete_targets(self, job: dict[str, Any]) -> set[Path]:
        """Collect absolute file paths that should be removed for a deleted job."""

        targets: set[Path] = set()
        default_root = self._asset_storage.get_absolute_path("")

        for asset in list(job.get("assets") or []):
            relative_path = self._normalize_relative_path(asset.get("relative_path"))
            storage_root = str(asset.get("storage_root") or "").strip() or default_root
            if relative_path:
                resolved = self._resolve_storage_target(storage_root, relative_path)
                if resolved is not None:
                    targets.add(resolved)

            absolute_path = str(asset.get("absolute_path") or "").strip()
            if absolute_path:
                resolved_absolute = self._resolve_known_absolute_target(
                    absolute_path=absolute_path,
                    allowed_storage_root=storage_root,
                )
                if resolved_absolute is not None:
                    targets.add(resolved_absolute)

            for key in ("asset_url", "public_url"):
                maybe_relative = self._relative_path_from_asset_url(str(asset.get(key) or ""))
                if maybe_relative:
                    resolved = self._resolve_storage_target(default_root, maybe_relative)
                    if resolved is not None:
                        targets.add(resolved)

        for key in ("image_preview_url", "final_preview_url"):
            maybe_relative = self._relative_path_from_asset_url(str(job.get(key) or ""))
            if maybe_relative:
                resolved = self._resolve_storage_target(default_root, maybe_relative)
                if resolved is not None:
                    targets.add(resolved)

        final_asset_urls = job.get("final_asset_urls")
        if isinstance(final_asset_urls, dict):
            for url in final_asset_urls.values():
                maybe_relative = self._relative_path_from_asset_url(str(url or ""))
                if maybe_relative:
                    resolved = self._resolve_storage_target(default_root, maybe_relative)
                    if resolved is not None:
                        targets.add(resolved)

        return targets

    @staticmethod
    def _normalize_relative_path(value: Any) -> str | None:
        """Normalize one storage-relative path and block traversal attempts."""

        candidate = str(value or "").strip().replace("\\", "/").lstrip("/")
        if not candidate:
            return None
        if any(part == ".." for part in candidate.split("/")):
            return None
        return candidate

    @staticmethod
    def _resolve_storage_target(storage_root: str, relative_path: str) -> Path | None:
        """Resolve one absolute storage path safely from `storage_root` + `relative_path`."""

        try:
            root = Path(storage_root).expanduser().resolve()
            target = (root / relative_path).resolve()
        except OSError:
            return None
        if root not in target.parents and target != root:
            return None
        return target

    @staticmethod
    def _resolve_known_absolute_target(*, absolute_path: str, allowed_storage_root: str) -> Path | None:
        """Allow absolute-path deletes only for files under one known storage root."""

        try:
            configured_root = Path(allowed_storage_root).expanduser().resolve()
            target = Path(absolute_path).expanduser().resolve()
        except OSError:
            return None
        if configured_root not in target.parents and target != configured_root:
            return None
        return target

    @staticmethod
    def _relative_path_from_asset_url(value: str) -> str | None:
        """Extract storage-relative path from asset URL-like values."""

        candidate = (value or "").strip()
        if not candidate:
            return None

        parsed = urlparse(candidate)
        path_candidate = parsed.path or candidate
        if "/assets/" in path_candidate:
            path_candidate = path_candidate.split("/assets/", 1)[1]
        elif parsed.scheme:
            return None

        normalized = unquote(path_candidate).replace("\\", "/").strip().lstrip("/")
        if not normalized:
            return None
        if any(part == ".." for part in normalized.split("/")):
            return None
        return normalized

    def _delete_asset_path(self, absolute: Path) -> bool:
        """Delete one absolute asset file if present."""

        try:
            if not absolute.exists() or not absolute.is_file():
                return False
            absolute.unlink(missing_ok=True)
            return True
        except (OSError, ValueError):
            logger.exception("failed deleting asset path=%s", absolute)
            return False

    def build_image_prompt(self, job: dict[str, Any]) -> str:
        """Build image prompt from theme + approved winner text + audience context."""

        winning_content = self._resolve_winning_content(job)
        visual_style = str(job.get("visual_style") or job.get("tone_style") or "conversational")
        return (
            f"Create a {visual_style} greeting-card visual for theme '{job['theme_name']}'. "
            f"Audience: {job['audience']}. Cultural context: {job['cultural_context']}. "
            f"Approved message text: {winning_content}"
        )

    async def _generate_image_option_assets(
        self,
        *,
        job_id: str,
        job: dict[str, Any],
        count: int,
        batch: int,
    ) -> list[dict[str, Any]]:
        """Render selectable visual directions for Studio image options."""

        generated = await self._generate_image_candidates_for_job(
            job_id=job_id,
            job=job,
            count=count,
            batch=batch,
            include_preview_candidate=False,
            stage="image_generation",
        )
        return list(generated["assets"])

    async def _persist_image_option_assets(self, job_id: str, assets: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """Persist already-rendered Studio image option assets."""

        for asset in assets:
            await self._repository.save_asset(
                job_id,
                asset_type=str(asset["asset_type"]),
                asset_url=str(asset["asset_url"]),
                storage_backend=str(asset["storage_backend"]),
                storage_root=str(asset["storage_root"]),
                relative_path=str(asset["relative_path"]),
                public_url=str(asset["public_url"]),
                absolute_path=str(asset["absolute_path"]),
                file_size_bytes=asset.get("file_size_bytes"),
                version=str(asset["version"]),
                approved=bool(asset.get("approved")),
            )
        return assets

    async def _generate_image_candidates_for_job(
        self,
        *,
        job_id: str,
        job: dict[str, Any],
        count: int,
        batch: int,
        include_preview_candidate: bool,
        stage: str,
    ) -> dict[str, Any]:
        """Generate provider-backed image candidates and persist both files and metadata."""

        request = ImageGenerationRequest(
            job_id=job_id,
            theme_name=str(job.get("theme_name") or ""),
            approved_text=self._resolve_winning_content(job),
            prompt=self.build_image_prompt(job),
            audience=str(job.get("audience") or ""),
            cultural_context=str(job.get("cultural_context") or ""),
            theme_style=self._resolve_theme_style(job),
            export_size=self._resolve_export_size(job),
            count=max(1, count),
            batch=batch,
            background_image_url=self._resolve_background_image_url(job),
        )
        provider_candidates = await self._image_provider.generate_candidates(request)
        if not provider_candidates:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Image provider '{self._image_provider.name}' returned no candidates",
            )
        persisted_assets: list[dict[str, Any]] = []
        persisted_candidate_rows: list[dict[str, Any]] = []

        for candidate in provider_candidates:
            relative_path, asset_type = self._resolve_image_candidate_path(
                job_id=job_id,
                candidate=candidate,
                batch=batch,
                include_preview_candidate=include_preview_candidate,
            )
            self._asset_storage.save_bytes(relative_path, candidate.image_bytes)
            public_url = self._asset_storage.get_public_url(relative_path)
            version = f"{candidate.provider}:{candidate.theme_style}:{candidate.text_alignment}"
            asset_record = {
                "asset_type": asset_type,
                "asset_url": public_url,
                "storage_backend": self._asset_storage.backend,
                "storage_root": self._asset_storage.get_absolute_path(""),
                "relative_path": relative_path,
                "public_url": public_url,
                "absolute_path": self._asset_storage.get_absolute_path(relative_path),
                "file_size_bytes": self._read_file_size_bytes(relative_path),
                "version": version,
                "approved": include_preview_candidate and asset_type == "image_preview",
                "provider": candidate.provider,
                "theme_style": candidate.theme_style,
                "text_alignment": candidate.text_alignment,
            }
            persisted_assets.append(asset_record)
            persisted_candidate_rows.append(
                {
                    "stage": stage,
                    "provider": candidate.provider,
                    "prompt": candidate.prompt,
                    "candidate_index": candidate.candidate_index,
                    "public_url": public_url,
                    "relative_path": relative_path,
                    "is_selected": include_preview_candidate and asset_type == "image_preview",
                    "created_at": datetime.now(timezone.utc),
                }
            )

        await self._persist_image_option_assets(job_id=job_id, assets=persisted_assets)
        await self._repository.save_image_candidates(
            job_id,
            persisted_candidate_rows,
            replace_existing=False,
            stage=stage,
        )
        primary_candidate = persisted_assets[0] if persisted_assets else None
        if primary_candidate is not None:
            await self._repository.update_image_candidate_selection(
                job_id,
                selected_relative_path=str(primary_candidate["relative_path"]),
            )
        return {
            "assets": persisted_assets,
            "primary_candidate": primary_candidate,
            "prompt": request.prompt,
        }

    def _resolve_image_candidate_path(
        self,
        *,
        job_id: str,
        candidate: ImageCandidateResult,
        batch: int,
        include_preview_candidate: bool,
    ) -> tuple[str, str]:
        """Return the storage path and asset type for one generated image candidate."""

        if include_preview_candidate and int(candidate.candidate_index) == 1:
            return self._build_image_preview_relative_path(job_id), "image_preview"
        return (
            self._build_image_option_relative_path(
                job_id,
                batch=batch,
                sequence=int(candidate.candidate_index),
                theme_style=candidate.theme_style,
            ),
            "image_option",
        )

    @staticmethod
    def _find_image_asset(assets: list[dict[str, Any]], payload: SelectImageRequest) -> dict[str, Any] | None:
        """Resolve one image-option asset from relative path or public URL."""

        requested_relative_path = str(payload.relative_path or "").strip()
        requested_url = str(payload.public_url or "").strip()
        for asset in assets:
            asset_type = str(asset.get("asset_type") or "").strip()
            if asset_type not in {"image_option", "image_preview"}:
                continue
            if requested_relative_path and str(asset.get("relative_path") or "").strip() == requested_relative_path:
                return asset
            asset_url = str(asset.get("public_url") or asset.get("asset_url") or "").strip()
            if requested_url and asset_url == requested_url:
                return asset
        return None

    @staticmethod
    def _extract_theme_style_from_asset(asset: dict[str, Any]) -> str | None:
        """Extract theme style token from a persisted Studio image option asset."""

        version = str(asset.get("version") or "").strip()
        if ":" not in version:
            return None
        parts = version.split(":")
        if len(parts) < 2:
            return None
        style = parts[1].strip().lower()
        return style if style in {"minimal", "festive", "elegant", "playful"} else None

    @staticmethod
    def _build_image_option_relative_path(job_id: str, *, batch: int, sequence: int, theme_style: str) -> str:
        """Return relative storage path for one Studio image option."""

        safe_style = "".join(char for char in theme_style.lower() if char.isalnum() or char == "_") or "minimal"
        return f"image/{job_id}_option_b{batch}_{sequence}_{safe_style}.png"

    @staticmethod
    def _build_image_preview_relative_path(job_id: str) -> str:
        """Return relative storage path for image approval preview."""

        return f"image/{job_id}_image_preview.png"

    @staticmethod
    def _build_final_preview_relative_path(job_id: str) -> str:
        """Return relative storage path for final approval preview."""

        return f"preview/{job_id}_content_preview.png"

    @staticmethod
    def _build_final_asset_relative_paths(job_id: str) -> dict[str, str]:
        """Return relative storage paths for final exported assets."""

        return {
            "png": f"final/{job_id}_final.png",
            "pdf": f"pdf/{job_id}_final.pdf",
        }

    def _generate_final_assets(self, *, job_id: str, job: dict[str, Any]) -> dict[str, dict[str, Any]]:
        """Render polished final card assets and ensure files exist."""

        relative_paths = self._build_final_asset_relative_paths(job_id)
        final_payload = FinalCardRenderInput(
            title=self._resolve_final_title(job),
            message=self._resolve_final_message(job),
            signoff=self._resolve_final_signoff(job),
            theme_style=self._resolve_theme_style(job),
            background_image_url=self._resolve_background_image_url(job),
            text_alignment=self._resolve_text_alignment(job),
            export_size=self._resolve_export_size(job),
        )
        png_bytes = self._card_renderer.render_final_png(final_payload)
        pdf_bytes = self._card_renderer.render_pdf_from_png(png_bytes)

        self._asset_storage.save_bytes(relative_paths["png"], png_bytes)
        self._asset_storage.save_bytes(relative_paths["pdf"], pdf_bytes)

        if not self._asset_storage.file_exists(relative_paths["png"]):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to generate final PNG asset",
            )
        if not self._asset_storage.file_exists(relative_paths["pdf"]):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to generate final PDF asset",
            )
        storage_root = self._asset_storage.get_absolute_path("")
        return {
            "png": {
                "storage_backend": self._asset_storage.backend,
                "storage_root": storage_root,
                "relative_path": relative_paths["png"],
                "public_url": self._asset_storage.get_public_url(relative_paths["png"]),
                "absolute_path": self._asset_storage.get_absolute_path(relative_paths["png"]),
                "file_size_bytes": self._read_file_size_bytes(relative_paths["png"]),
            },
            "pdf": {
                "storage_backend": self._asset_storage.backend,
                "storage_root": storage_root,
                "relative_path": relative_paths["pdf"],
                "public_url": self._asset_storage.get_public_url(relative_paths["pdf"]),
                "absolute_path": self._asset_storage.get_absolute_path(relative_paths["pdf"]),
                "file_size_bytes": self._read_file_size_bytes(relative_paths["pdf"]),
            },
        }

    def _save_internal_preview_asset(
        self,
        *,
        relative_path: str,
        payload: PreviewCardRenderInput,
    ) -> None:
        """Render and save one internal preview card image."""

        image_bytes = self._card_renderer.render_preview_png(payload)
        self._asset_storage.save_bytes(relative_path, image_bytes)
        if not self._asset_storage.file_exists(relative_path):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate preview asset: {relative_path}",
            )

    def _read_file_size_bytes(self, relative_path: str) -> int | None:
        """Return file size in bytes for one stored relative path."""

        try:
            absolute = Path(self._asset_storage.get_absolute_path(relative_path))
            if not absolute.exists() or not absolute.is_file():
                return None
            return absolute.stat().st_size
        except OSError:
            return None

    @staticmethod
    def _resolve_rendering_options(job: dict[str, Any]) -> dict[str, Any]:
        """Return optional rendering config stored inside output_spec.rendering."""

        output_spec = job.get("output_spec")
        if not isinstance(output_spec, dict):
            return {}
        rendering = output_spec.get("rendering")
        return rendering if isinstance(rendering, dict) else {}

    def _resolve_theme_style(self, job: dict[str, Any]) -> str:
        """Map theme/visual hints to one supported final card template."""

        options = self._resolve_rendering_options(job)
        explicit = str(options.get("theme_style") or "").strip().lower()
        if explicit in {"minimal", "festive", "elegant", "playful"}:
            return explicit

        source = str(job.get("visual_style") or job.get("tone_style") or "").strip().lower()
        if any(token in source for token in ("festive", "celebr", "party")):
            return "festive"
        if any(token in source for token in ("elegant", "classic", "formal")):
            return "elegant"
        if any(token in source for token in ("playful", "fun", "casual")):
            return "playful"
        return "minimal"

    def _resolve_export_size(self, job: dict[str, Any]) -> str:
        """Resolve export size with default portrait 1080x1350."""

        options = self._resolve_rendering_options(job)
        export_size = str(options.get("export_size") or "1080x1350").strip()
        return export_size or "1080x1350"

    def _resolve_text_alignment(self, job: dict[str, Any]) -> str:
        """Resolve final card text alignment from rendering options."""

        options = self._resolve_rendering_options(job)
        alignment = str(options.get("text_alignment") or "center").strip().lower()
        return alignment if alignment in {"left", "center", "right"} else "center"

    def _resolve_background_image_url(self, job: dict[str, Any]) -> str | None:
        """Resolve optional background image URL from rendering options."""

        options = self._resolve_rendering_options(job)
        background_url = str(options.get("background_image_url") or "").strip()
        return background_url or None

    def _resolve_final_title(self, job: dict[str, Any]) -> str | None:
        """Resolve optional user-facing title for final card mode."""

        options = self._resolve_rendering_options(job)
        title = str(options.get("title") or "").strip()
        if title:
            return title
        fallback = str(job.get("theme_name") or "").strip()
        return fallback or None

    def _resolve_final_signoff(self, job: dict[str, Any]) -> str | None:
        """Resolve optional user-facing signoff for final card mode."""

        options = self._resolve_rendering_options(job)
        signoff = str(options.get("signoff") or "").strip()
        return signoff or None

    def _resolve_final_message(self, job: dict[str, Any]) -> str:
        """Resolve final card message with optional explicit override."""

        options = self._resolve_rendering_options(job)
        message = str(options.get("message") or "").strip()
        if message:
            return message
        return self._resolve_winning_content(job)

    @staticmethod
    def _shorten(text: str, *, max_len: int) -> str:
        """Return text truncated to a safe single-line preview length."""

        content = (text or "").strip()
        if len(content) <= max_len:
            return content
        return f"{content[: max_len - 3].rstrip()}..."

    @staticmethod
    def _resolve_winning_content(job: dict[str, Any]) -> str:
        """Return the stored winner content for prompt building and approvals."""

        candidates = job.get("candidates") or []
        selected = next((item for item in candidates if item.get("is_selected")), None)
        if selected and (selected.get("content_text") or selected.get("text")):
            return str(selected.get("content_text") or selected.get("text"))
        winner = next((item for item in candidates if item.get("is_winner")), None)
        if winner and (winner.get("content_text") or winner.get("text")):
            return str(winner.get("content_text") or winner.get("text"))
        return str(job.get("content_preview") or "")


@lru_cache(maxsize=1)
def get_workflow_v1_service() -> WorkflowV1Service:
    """Return singleton workflow service instance for all workflow endpoints."""

    return WorkflowV1Service(
        repository=get_workflow_job_repository(),
        asset_storage=get_asset_storage(),
        image_provider=get_image_provider(),
    )
