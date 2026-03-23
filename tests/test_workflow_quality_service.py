"""Unit tests for deterministic workflow quality evaluation."""

from __future__ import annotations

from app.services.workflow_card_renderer import FinalCardRenderInput, WorkflowCardRenderer
from app.services.workflow_quality_service import WorkflowQualityService


def _job_snapshot(
    *,
    text: str,
    selected_image_public_url: str | None = "http://localhost:8080/assets/image/example.png",
    final_preview_url: str | None = "http://localhost:8080/assets/preview/example.png",
    final_asset_urls: dict[str, str] | None = None,
    final_approval_status: str = "pending",
) -> dict[str, object]:
    return {
        "job_id": "job_quality_test",
        "theme_name": "Festival of Colors",
        "tone_funny_pct": 20,
        "tone_emotion_pct": 80,
        "tone_style": "conversational",
        "visual_style": "festive",
        "audience": "friends and family",
        "cultural_context": "indian",
        "content_preview": text,
        "selected_image_public_url": selected_image_public_url,
        "final_preview_url": final_preview_url,
        "final_asset_urls": final_asset_urls,
        "final_approval_status": final_approval_status,
        "output_spec": {
            "length": {"target_words": 14},
            "rendering": {"theme_style": "festive", "layout_id": "poster_illustration_caption"},
        },
        "candidates": [
            {
                "id": 1,
                "content_text": text,
                "text": text,
                "judge_score": 0.91,
                "judged_score": 0.91,
                "raw_score": 0.86,
                "is_selected": True,
                "is_winner": True,
            }
        ],
        "assets": [],
    }


def test_quality_service_passes_well_formed_preview_ready_job() -> None:
    """A complete text/image/final-preview combination should not fail quality outright."""

    renderer = WorkflowCardRenderer()
    service = WorkflowQualityService(card_renderer=renderer)
    job = _job_snapshot(text="May your day glow with color, laughter, and easy togetherness.")
    layout_spec = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Festival of Colors",
            message=str(job["content_preview"]),
            signoff=None,
            theme_style="festive",
            background_image_url=None,
            illustration_image_url=str(job["selected_image_public_url"]),
            text_alignment="center",
            layout_id="poster_illustration_caption",
        )
    )

    result = service.evaluate(job=job, layout_spec=layout_spec)

    assert result.status in {"pass", "review"}
    assert result.recommended_action in {"accept", "manual_review"}
    assert result.metrics["layout_id"] == "poster_illustration_caption"
    assert all(issue.code != "selected_image_missing" for issue in result.issues)


def test_quality_service_fails_when_text_is_weak_and_image_is_missing() -> None:
    """Missing image plus incomplete text should direct the operator back to text first."""

    renderer = WorkflowCardRenderer()
    service = WorkflowQualityService(card_renderer=renderer)
    job = _job_snapshot(
        text="Warm wishes and",
        selected_image_public_url=None,
        final_preview_url=None,
    )

    result = service.evaluate(job=job, layout_spec=None)

    assert result.status == "fail"
    assert result.recommended_action == "rerun_text"
    issue_codes = {issue.code for issue in result.issues}
    assert "selected_text_quality_weak" in issue_codes
    assert "selected_image_missing" in issue_codes
    assert result.score < 6.5


def test_quality_service_flags_missing_exports_after_final_approval() -> None:
    """Approved final jobs must surface export integrity failures explicitly."""

    renderer = WorkflowCardRenderer()
    service = WorkflowQualityService(card_renderer=renderer)
    job = _job_snapshot(
        text="May your day glow with color, laughter, and easy togetherness.",
        final_asset_urls=None,
        final_approval_status="approved",
    )
    layout_spec = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Festival of Colors",
            message=str(job["content_preview"]),
            signoff=None,
            theme_style="festive",
            background_image_url=None,
            illustration_image_url=str(job["selected_image_public_url"]),
            text_alignment="center",
            layout_id="poster_illustration_caption",
        )
    )

    result = service.evaluate(job=job, layout_spec=layout_spec)

    issue_codes = {issue.code for issue in result.issues}
    assert "final_exports_missing" in issue_codes
    assert result.recommended_action == "rerender_final"
