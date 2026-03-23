"""Deterministic Stage 4 workflow quality scoring."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from PIL import Image, ImageDraw

from app.schemas.workflow import WorkflowQualityIssueResponse, WorkflowQualityResultResponse
from app.services.content_shortlist_service import score_content_candidate
from app.services.workflow_card_renderer import WorkflowCardLayoutSpec, WorkflowCardRenderer


@dataclass(slots=True)
class WorkflowQualityService:
    """Evaluate current workflow output quality without any external model call."""

    card_renderer: WorkflowCardRenderer

    def evaluate(
        self,
        *,
        job: dict[str, Any],
        layout_spec: WorkflowCardLayoutSpec | None = None,
    ) -> WorkflowQualityResultResponse:
        """Return one deterministic quality result for the current job snapshot."""

        issues: list[WorkflowQualityIssueResponse] = []
        selected_candidate = self._resolve_selected_candidate(job)
        selected_text = self._resolve_selected_text(job, selected_candidate=selected_candidate)
        target_words = self._resolve_target_words(job)
        word_count = len(selected_text.split())
        text_quality = self._score_selected_text(
            selected_candidate=selected_candidate,
            selected_text=selected_text,
            target_words=target_words,
        )
        has_selected_image = bool(str(job.get("selected_image_public_url") or "").strip())
        has_final_preview = bool(str(job.get("final_preview_url") or "").strip())
        final_asset_urls = job.get("final_asset_urls") if isinstance(job.get("final_asset_urls"), dict) else {}
        has_final_assets = bool(str(final_asset_urls.get("png") or "").strip() and str(final_asset_urls.get("pdf") or "").strip())

        if not selected_text:
            issues.append(
                self._issue(
                    code="selected_text_missing",
                    stage="content",
                    severity="critical",
                    message="No selected card copy is available for final quality evaluation.",
                )
            )
        else:
            min_words = max(6, min(10, max(4, target_words // 2)))
            if word_count < min_words:
                issues.append(
                    self._issue(
                        code="selected_text_too_short",
                        stage="content",
                        severity="warning",
                        message=f"Selected copy is only {word_count} words; target is {target_words}.",
                    )
                )
            if word_count > max(target_words + 10, target_words * 2):
                issues.append(
                    self._issue(
                        code="selected_text_too_long",
                        stage="content",
                        severity="warning",
                        message=f"Selected copy is {word_count} words and may feel heavy for this card format.",
                    )
                )
            if text_quality < 6.5:
                issues.append(
                    self._issue(
                        code="selected_text_quality_weak",
                        stage="content",
                        severity="critical",
                        message="Selected card copy scores weakly on completeness and readability.",
                    )
                )

        if not has_selected_image:
            issues.append(
                self._issue(
                    code="selected_image_missing",
                    stage="image",
                    severity="critical",
                    message="No selected image is attached to the current card.",
                )
            )

        if has_selected_image and layout_spec is not None and not layout_spec.image_blocks:
            issues.append(
                self._issue(
                    code="illustration_block_missing",
                    stage="final",
                    severity="critical",
                    message="The final layout resolved without an illustration block even though an image is selected.",
                )
            )

        if has_selected_image and not has_final_preview:
            issues.append(
                self._issue(
                    code="final_preview_missing",
                    stage="final",
                    severity="critical",
                    message="The selected text and image have not been rendered into a final card preview yet.",
                )
            )

        if str(job.get("final_approval_status") or "").strip().lower() == "approved" and not has_final_assets:
            issues.append(
                self._issue(
                    code="final_exports_missing",
                    stage="final",
                    severity="critical",
                    message="Final approval is marked approved but PNG/PDF exports are missing.",
                )
            )

        if has_final_assets:
            asset_rows = list(job.get("assets") or [])
            png_row = next((item for item in asset_rows if str(item.get("asset_type") or "").lower() == "final_png"), None)
            pdf_row = next((item for item in asset_rows if str(item.get("asset_type") or "").lower() == "final_pdf"), None)
            if png_row is None or pdf_row is None:
                issues.append(
                    self._issue(
                        code="final_asset_rows_incomplete",
                        stage="final",
                        severity="warning",
                        message="Final asset URLs exist but one or more persisted asset rows are missing.",
                    )
                )
            elif not png_row.get("file_size_bytes") or not pdf_row.get("file_size_bytes"):
                issues.append(
                    self._issue(
                        code="final_asset_size_missing",
                        stage="final",
                        severity="warning",
                        message="Final asset metadata is incomplete; file sizes were not captured.",
                    )
                )

        if layout_spec is not None:
            issues.extend(self._check_layout_fit(job=job, layout_spec=layout_spec))

        score = min(10.0, text_quality + (0.4 if has_selected_image else 0.0) + (0.3 if has_final_preview else 0.0) + (0.3 if has_final_assets else 0.0))
        for issue in issues:
            if issue.severity == "critical":
                score -= 1.6
            else:
                score -= 0.5
        score = round(max(0.0, min(10.0, score)), 2)

        critical_issues = [item for item in issues if item.severity == "critical"]
        if any(item.stage == "content" for item in critical_issues):
            recommended_action = "rerun_text"
        elif any(item.stage == "image" for item in critical_issues):
            recommended_action = "regenerate_image"
        elif any(item.stage == "final" for item in critical_issues):
            recommended_action = "rerender_final"
        elif issues:
            recommended_action = "manual_review"
        else:
            recommended_action = "accept"

        if critical_issues or score < 6.5:
            status = "fail"
        elif issues or score < 8.2:
            status = "review"
        else:
            status = "pass"

        metrics: dict[str, Any] = {
            "target_words": target_words,
            "selected_text_words": word_count,
            "selected_text_quality": round(text_quality, 2),
            "has_selected_image": has_selected_image,
            "has_final_preview": has_final_preview,
            "has_final_assets": has_final_assets,
        }
        if layout_spec is not None:
            metrics["layout_id"] = layout_spec.layout_id
            metrics["text_block_count"] = len(layout_spec.text_blocks)
            metrics["image_block_count"] = len(layout_spec.image_blocks)

        return WorkflowQualityResultResponse(
            score=score,
            status=status,
            recommended_action=recommended_action,
            issues=issues,
            metrics=metrics,
        )

    def _check_layout_fit(
        self,
        *,
        job: dict[str, Any],
        layout_spec: WorkflowCardLayoutSpec,
    ) -> list[WorkflowQualityIssueResponse]:
        scratch = Image.new("RGBA", (layout_spec.canvas_width, layout_spec.canvas_height), (255, 255, 255, 0))
        draw = ImageDraw.Draw(scratch, "RGBA")
        issues: list[WorkflowQualityIssueResponse] = []
        message_panel = next((shape for shape in layout_spec.shapes if shape.shape_id == "message_panel"), None)
        panel_bottom = message_panel.box[3] if message_panel is not None else None

        for block in layout_spec.text_blocks:
            font = self.card_renderer._load_font(size=block.font_size, variant=block.font_variant)  # noqa: SLF001
            block_height = self.card_renderer._measure_multiline_height(draw, list(block.lines), font, block.spacing)  # noqa: SLF001
            block_bottom = block.y + block_height
            if block_bottom > layout_spec.canvas_height - 10:
                issues.append(
                    self._issue(
                        code="text_block_outside_canvas",
                        stage="final",
                        severity="critical",
                        message=f"Text block '{block.block_id}' extends beyond the card canvas.",
                    )
                )
                break
            if panel_bottom is not None and block.role in {"title", "body", "signoff"} and block_bottom > panel_bottom - 12:
                issues.append(
                    self._issue(
                        code="message_panel_overflow",
                        stage="final",
                        severity="critical",
                        message="Final card copy is overflowing the intended message panel.",
                    )
                )
                break

        content_density = self.card_renderer._resolve_content_density(  # noqa: SLF001
            title=str(job.get("theme_name") or ""),
            message=self._resolve_selected_text(job, selected_candidate=self._resolve_selected_candidate(job)),
            signoff=None,
        )
        if content_density == "dense" and layout_spec.layout_id == "poster_illustration_caption":
            issues.append(
                self._issue(
                    code="dense_copy_caption_pressure",
                    stage="final",
                    severity="warning",
                    message="Dense copy is being forced into the poster caption layout and may still feel tight.",
                )
            )

        tone_style = str(job.get("tone_style") or "").strip().lower()
        visual_style = str(job.get("visual_style") or "").strip().lower()
        if layout_spec.theme_style == "festive" and any(token in tone_style for token in ("minimal", "reflect", "formal")):
            issues.append(
                self._issue(
                    code="tone_visual_tension",
                    stage="final",
                    severity="warning",
                    message=f"Tone '{tone_style}' may feel too restrained for the current festive visual direction.",
                )
            )
        if layout_spec.theme_style == "elegant" and ("play" in tone_style or "play" in visual_style):
            issues.append(
                self._issue(
                    code="tone_visual_tension",
                    stage="final",
                    severity="warning",
                    message="Playful tone cues may clash with the current elegant card treatment.",
                )
            )
        return issues

    @staticmethod
    def _resolve_selected_candidate(job: dict[str, Any]) -> dict[str, Any] | None:
        candidates = list(job.get("candidates") or [])
        selected = next((item for item in candidates if bool(item.get("is_selected"))), None)
        if selected is not None:
            return selected
        return next((item for item in candidates if bool(item.get("is_winner"))), None)

    @classmethod
    def _resolve_selected_text(
        cls,
        job: dict[str, Any],
        *,
        selected_candidate: dict[str, Any] | None,
    ) -> str:
        if selected_candidate is not None:
            selected_text = str(selected_candidate.get("content_text") or selected_candidate.get("text") or "").strip()
            if selected_text:
                return selected_text
        return str(job.get("content_preview") or "").strip()

    @staticmethod
    def _resolve_target_words(job: dict[str, Any]) -> int:
        output_spec = job.get("output_spec") if isinstance(job.get("output_spec"), dict) else {}
        length = output_spec.get("length") if isinstance(output_spec.get("length"), dict) else {}
        return min(max(int(length.get("target_words") or 14), 4), 60)

    @staticmethod
    def _score_selected_text(
        *,
        selected_candidate: dict[str, Any] | None,
        selected_text: str,
        target_words: int,
    ) -> float:
        if not selected_text:
            return 0.0
        candidate = dict(selected_candidate or {})
        candidate.setdefault("content_text", selected_text)
        candidate.setdefault("text", selected_text)
        return round(max(0.0, min(10.0, score_content_candidate(candidate, target_words=target_words) * 10.0)), 2)

    @staticmethod
    def _issue(
        *,
        code: str,
        stage: str,
        severity: str,
        message: str,
    ) -> WorkflowQualityIssueResponse:
        return WorkflowQualityIssueResponse(code=code, stage=stage, severity=severity, message=message)
