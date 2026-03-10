"""Business logic for v1 n8n workflow endpoints with DB-first persistence and memory fallback."""

from __future__ import annotations

from io import BytesIO
from datetime import datetime, timezone
from functools import lru_cache
import logging
from textwrap import wrap
from typing import Any
from uuid import uuid4

from fastapi import HTTPException, status
from PIL import Image, ImageDraw, ImageFont

from app.repositories.workflow_repository import WorkflowJobRepository, get_workflow_job_repository
from app.schemas.workflow import (
    ApprovalRequest,
    ContentApprovalRequest,
    ContentApprovalResponse,
    FinalApprovalResponse,
    FinalAssetUrls,
    ImageApprovalRequest,
    ImageApprovalResponse,
    JobDebugResponse,
    StartJobRequest,
    StartJobResponse,
)
from app.storage import AssetStorage, get_asset_storage

logger = logging.getLogger(__name__)


class StubContentForgeClient:
    """Stub ContentForge adapter used until real integration is wired in.

    TODO(v2): replace this class with a real ContentForge client while keeping
    the same `generate_and_judge` output contract.
    """

    async def generate_and_judge(self, payload: StartJobRequest) -> dict[str, Any]:
        """Generate deterministic candidates and a judged winner for local testing."""

        theme = payload.theme_name.strip()
        audience = payload.audience.strip()
        context = payload.cultural_context.strip()

        candidates = [
            {
                "model": "qwen2.5:7b-instruct",
                "backend": "ollama",
                "content_text": (
                    f"Happy birthday! You make every day brighter, {audience}. "
                    f"Wishing you warmth, laughter, and lots of cake."
                ),
                "raw_score": 0.84,
                "judge_score": 0.90,
            },
            {
                "model": "llama3.1:8b",
                "backend": "ollama",
                "content_text": (
                    f"{theme}: today is your day to smile big and dream bigger. "
                    f"Sending heartfelt wishes from your people."
                ),
                "raw_score": 0.80,
                "judge_score": 0.83,
            },
            {
                "model": "mistral:7b",
                "backend": "ollama",
                "content_text": (
                    f"Shubho jonmodin! May this year bring joy, health, and love. "
                    f"Celebrating you with full heart and happy memories."
                ),
                "raw_score": 0.78,
                "judge_score": 0.81,
            },
        ]

        winner_index = max(range(len(candidates)), key=lambda idx: candidates[idx]["judge_score"])
        for index, candidate in enumerate(candidates):
            candidate["is_winner"] = index == winner_index

        winner = candidates[winner_index]
        judge_summary = (
            f"Winner selected for '{theme}' with {context} context based on tone balance and clarity."
        )

        return {
            "candidates": candidates,
            "winner": winner,
            "judge_summary": judge_summary,
        }


class WorkflowV1Service:
    """Orchestrates v1 workflow state transitions expected by imported n8n flow."""

    def __init__(
        self,
        *,
        repository: WorkflowJobRepository | None = None,
        asset_storage: AssetStorage | None = None,
    ) -> None:
        self._contentforge = StubContentForgeClient()
        self._repository = repository or get_workflow_job_repository()
        self._asset_storage = asset_storage or get_asset_storage()

    async def start_job(self, payload: StartJobRequest) -> StartJobResponse:
        """Create a job, run stub generation/judging, persist state, and return approval payload."""

        job_id = f"job_{uuid4().hex[:10]}"
        trace_id = f"trace_{uuid4().hex[:12]}"
        now = datetime.now(timezone.utc)

        generation = await self._contentforge.generate_and_judge(payload)
        winner = generation["winner"]
        content_preview = str(winner["content_text"])
        winner_model = str(winner["model"])
        approval_message = (
            f"Content approval required for {job_id}. Winner model: {winner_model}. "
            "Review preview text and approve/reject."
        )

        job_record: dict[str, Any] = {
            "job_id": job_id,
            "trace_id": trace_id,
            "status": "content_pending_approval",
            "theme_name": payload.theme_name,
            "tone_funny_pct": payload.tone_funny_pct,
            "tone_emotion_pct": payload.tone_emotion_pct,
            "tone_style": payload.tone_style,
            "visual_style": payload.tone_style,
            "audience": payload.audience,
            "cultural_context": payload.cultural_context,
            "output_spec": payload.output_spec.model_dump(),
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
            "created_at": now,
            "updated_at": now,
        }

        candidate_records = [
            {
                "model": str(candidate["model"]),
                "backend": str(candidate["backend"]),
                "content_text": str(candidate["content_text"]),
                "raw_score": float(candidate["raw_score"]),
                "judge_score": float(candidate["judge_score"]),
                "is_winner": bool(candidate["is_winner"]),
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
                ("winner_selected", {"winner_model": winner_model}),
                ("content_approval_requested", {"approval_message": approval_message}),
            ],
        )

        creation_backend = await self._repository.create_job(job_record)
        await self._repository.save_content_candidates(job_id, candidate_records)
        await self._repository.save_judge_results(
            job_id,
            {
                "judge_provider": "contentforge_stub",
                "judge_model": "stub-judge",
                "winner_model": winner_model,
                "leaderboard_json": {"models": [item["model"] for item in candidate_records]},
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
        )

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

        if decision == "approved":
            image_prompt = self.build_image_prompt(job)
            image_preview_relative_path = self._build_image_preview_relative_path(job_id)
            self._write_placeholder_preview_image(
                relative_path=image_preview_relative_path,
                title="Image Preview",
                subtitle=f"Job ID: {job_id}",
                body=image_prompt,
            )
            image_preview_url = self._asset_storage.get_public_url(image_preview_relative_path)
            approved_content = self._resolve_winning_content(job)
            updates = {
                "status": "image_pending_approval",
                "content_approval_status": "approved",
                "image_approval_status": "pending",
                "image_prompt": image_prompt,
                "image_preview_url": image_preview_url,
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_approved", {"decision": decision, "notes": notes}),
                ("image_prompt_created", {"stub": True, "approved_content": approved_content}),
                ("image_generated", {"stub": False, "image_preview_url": image_preview_url}),
                ("image_approval_requested", {"image_preview_url": image_preview_url}),
            ]
        elif decision == "rejected":
            updates = {
                "status": "content_rejected",
                "content_approval_status": "rejected",
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_rejected", {"decision": decision, "notes": notes}),
            ]
        else:
            updates = {
                "status": "content_timeout",
                "content_approval_status": "timeout",
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

        if decision == "approved":
            image_preview_relative_path = self._build_image_preview_relative_path(job_id)
            await self._repository.save_asset(
                job_id,
                asset_type="image_preview",
                asset_url=str(updated.get("image_preview_url") or ""),
                relative_path=image_preview_relative_path,
                public_url=str(updated.get("image_preview_url") or ""),
                absolute_path=self._asset_storage.get_absolute_path(image_preview_relative_path),
                version="v1",
                approved=False,
            )
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

        if normalized_decision == "approved":
            final_preview_relative_path = self._build_final_preview_relative_path(job_id)
            self._write_placeholder_preview_image(
                relative_path=final_preview_relative_path,
                title="Final Approval Preview",
                subtitle=f"Job ID: {job_id}",
                body=self._resolve_winning_content(job),
            )
            final_preview_url = self._asset_storage.get_public_url(final_preview_relative_path)
            updates = {
                "status": "final_pending_approval",
                "image_approval_status": "approved",
                "final_preview_url": final_preview_url,
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
                relative_path=final_preview_relative_path,
                public_url=str(updated.get("final_preview_url") or ""),
                absolute_path=self._asset_storage.get_absolute_path(final_preview_relative_path),
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

        event_payload = {
            "job_id": job_id,
            "decision": normalized_decision,
            "notes": notes,
            "timestamp": datetime.now(timezone.utc).isoformat(),
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
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_rejected", event_payload),
            ]
        else:
            updates = {
                "status": "final_timeout",
                "final_approval_status": "timeout",
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
                    relative_path=png_meta["relative_path"],
                    public_url=png_meta["public_url"],
                    absolute_path=png_meta["absolute_path"],
                    version="v1",
                    approved=True,
                )
            if pdf_meta["public_url"]:
                await self._repository.save_asset(
                    job_id,
                    asset_type="final_pdf",
                    asset_url=pdf_meta["public_url"],
                    relative_path=pdf_meta["relative_path"],
                    public_url=pdf_meta["public_url"],
                    absolute_path=pdf_meta["absolute_path"],
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

    async def get_job_debug(self, job_id: str) -> JobDebugResponse:
        """Return a full job snapshot including approvals, candidates, and audit events."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        return JobDebugResponse.model_validate(job)

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

    def build_image_prompt(self, job: dict[str, Any]) -> str:
        """Build image prompt from theme + approved winner text + audience context."""

        winning_content = self._resolve_winning_content(job)
        visual_style = str(job.get("visual_style") or job.get("tone_style") or "conversational")
        return (
            f"Create a {visual_style} greeting-card visual for theme '{job['theme_name']}'. "
            f"Audience: {job['audience']}. Cultural context: {job['cultural_context']}. "
            f"Approved message text: {winning_content}"
        )

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

    def _generate_final_assets(self, *, job_id: str, job: dict[str, Any]) -> dict[str, dict[str, str]]:
        """Render deterministic placeholder final assets and ensure files exist."""

        relative_paths = self._build_final_asset_relative_paths(job_id)
        self._write_placeholder_card_assets(
            job_id=job_id,
            theme_name=str(job.get("theme_name") or ""),
            winner_content=self._resolve_winning_content(job),
            png_relative_path=relative_paths["png"],
            pdf_relative_path=relative_paths["pdf"],
        )

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
        return {
            "png": {
                "relative_path": relative_paths["png"],
                "public_url": self._asset_storage.get_public_url(relative_paths["png"]),
                "absolute_path": self._asset_storage.get_absolute_path(relative_paths["png"]),
            },
            "pdf": {
                "relative_path": relative_paths["pdf"],
                "public_url": self._asset_storage.get_public_url(relative_paths["pdf"]),
                "absolute_path": self._asset_storage.get_absolute_path(relative_paths["pdf"]),
            },
        }

    def _write_placeholder_preview_image(
        self,
        *,
        relative_path: str,
        title: str,
        subtitle: str,
        body: str,
    ) -> None:
        """Create and save a deterministic preview placeholder PNG."""

        image_bytes = self._create_placeholder_image_bytes(title=title, subtitle=subtitle, body=body)
        self._asset_storage.save_bytes(relative_path, image_bytes)
        if not self._asset_storage.file_exists(relative_path):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate preview asset: {relative_path}",
            )

    def _write_placeholder_card_assets(
        self,
        *,
        job_id: str,
        theme_name: str,
        winner_content: str,
        png_relative_path: str,
        pdf_relative_path: str,
    ) -> None:
        """Create deterministic placeholder PNG/PDF assets for workflow v1."""

        canvas = Image.new("RGB", (1280, 720), color=(250, 245, 236))
        draw = ImageDraw.Draw(canvas)
        title_font = self._load_font(size=52)
        body_font = self._load_font(size=30)
        meta_font = self._load_font(size=24)

        draw.rectangle([(0, 0), (1280, 120)], fill=(38, 70, 83))
        draw.text((40, 30), "eCardFactory Final Card", fill=(255, 255, 255), font=title_font)

        y = 150
        draw.text((40, y), f"Theme: {theme_name or 'N/A'}", fill=(33, 33, 33), font=body_font)
        y += 48
        draw.text((40, y), f"Job ID: {job_id}", fill=(33, 33, 33), font=meta_font)
        y += 46
        draw.text((40, y), "Approved Winner Content:", fill=(33, 33, 33), font=meta_font)
        y += 40

        content = winner_content.strip() or "No approved content available."
        for line in wrap(content, width=74):
            draw.text((40, y), line, fill=(33, 33, 33), font=meta_font)
            y += 34
            if y > 680:
                break

        png_buffer = BytesIO()
        canvas.save(png_buffer, format="PNG", optimize=True)
        self._asset_storage.save_bytes(png_relative_path, png_buffer.getvalue())

        pdf_buffer = BytesIO()
        canvas.save(pdf_buffer, format="PDF", resolution=100.0)
        self._asset_storage.save_bytes(pdf_relative_path, pdf_buffer.getvalue())

    def _create_placeholder_image_bytes(self, *, title: str, subtitle: str, body: str) -> bytes:
        """Build a simple deterministic preview image payload."""

        canvas = Image.new("RGB", (1024, 576), color=(245, 247, 250))
        draw = ImageDraw.Draw(canvas)
        title_font = self._load_font(size=46)
        subtitle_font = self._load_font(size=28)
        body_font = self._load_font(size=24)

        draw.rectangle([(0, 0), (1024, 105)], fill=(23, 37, 84))
        draw.text((30, 26), title, fill=(255, 255, 255), font=title_font)
        draw.text((30, 130), subtitle, fill=(17, 24, 39), font=subtitle_font)

        y = 182
        for line in wrap(body.strip() or "N/A", width=68):
            draw.text((30, y), line, fill=(17, 24, 39), font=body_font)
            y += 34
            if y > 540:
                break

        output = BytesIO()
        canvas.save(output, format="PNG", optimize=True)
        return output.getvalue()

    @staticmethod
    def _load_font(*, size: int):
        """Load a readable font for placeholder asset rendering."""

        for font_name in ("DejaVuSans.ttf", "Arial.ttf", "Helvetica.ttf"):
            try:
                return ImageFont.truetype(font_name, size=size)
            except OSError:
                continue
        return ImageFont.load_default()

    @staticmethod
    def _resolve_winning_content(job: dict[str, Any]) -> str:
        """Return the stored winner content for prompt building and approvals."""

        candidates = job.get("candidates") or []
        winner = next((item for item in candidates if item.get("is_winner")), None)
        if winner and winner.get("content_text"):
            return str(winner["content_text"])
        return str(job.get("content_preview") or "")


@lru_cache(maxsize=1)
def get_workflow_v1_service() -> WorkflowV1Service:
    """Return singleton workflow service instance for all workflow endpoints."""

    return WorkflowV1Service(
        repository=get_workflow_job_repository(),
        asset_storage=get_asset_storage(),
    )
