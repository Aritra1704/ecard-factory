"""HTTP tests for v1 n8n workflow endpoints."""

from __future__ import annotations

import asyncio
from datetime import datetime, timedelta, timezone
import importlib
import os
from pathlib import Path
import sys
import time

from fastapi.testclient import TestClient


def reload_workflow_modules():
    """Reload app modules so workflow service picks up test env variables cleanly."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database", "app.main"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.routers")
            or module_name.startswith("app.repositories")
            or module_name.startswith("app.schemas")
            or module_name.startswith("app.services")
            or module_name.startswith("app.store")
            or module_name.startswith("app.storage")
        ):
            sys.modules.pop(module_name, None)

    main_module = importlib.import_module("app.main")
    workflow_router_module = importlib.import_module("app.routers.workflow_v1")
    return main_module, workflow_router_module


def sample_start_payload() -> dict[str, object]:
    """Return the v1 start payload expected by imported n8n workflow."""

    return {
        "theme_name": "Warm birthday message",
        "tone_funny_pct": 20,
        "tone_emotion_pct": 75,
        "tone_style": "conversational",
        "audience": "close friend",
        "cultural_context": "bengali",
        "output_spec": {
            "format": "paragraph",
            "length": {"target_words": 80},
            "structure": {"no_lists": True, "no_numbering": True},
        },
        "avoid_cliches": True,
    }


def override_theme_factory_dependencies(main_module):
    """Override theme dependencies so theme-backed job routes work without a live database."""

    database_module = importlib.import_module("app.database")
    theme_factory_schemas = importlib.import_module("app.schemas.theme_factory")
    theme_service_module = importlib.import_module("app.services.theme_service")

    class StubThemeService:
        async def get_today_theme(self, _session, **_kwargs):
            theme = theme_factory_schemas.ThemeResolvedPayload(
                theme_id=1,
                theme_key="holi-week",
                theme_name="Holi Week",
                description="Holi celebration, colors, joy, togetherness",
                theme_bucket="occasion",
                theme_type="campaign",
                cultural_context="indian",
                tone_style="festive",
                tone_funny_pct=20,
                tone_emotion_pct=85,
                audience="friends and family",
                visual_style="festive",
                priority=94,
            )
            return theme_factory_schemas.ThemeTodayResponse(
                resolved=True,
                timezone="Asia/Kolkata",
                plan_date=datetime(2026, 3, 13, tzinfo=timezone.utc).date(),
                weekday="friday",
                source="schedule",
                schedule_type="date_range",
                schedule_id=11,
                resolution_note="Holi campaign window",
                theme=theme,
            )

        async def get_theme_by_key(self, _session, theme_key: str):
            return theme_factory_schemas.ThemeCatalogResponse(
                id=2,
                theme_key=theme_key,
                theme_name="Holi Week" if theme_key == "holi-week" else "Diwali Week",
                description="Manual theme selection",
                theme_bucket="occasion",
                theme_type="campaign",
                cultural_context="indian",
                tone_style="festive",
                default_funny_pct=20,
                default_emotion_pct=85,
                default_audience="friends and family",
                default_visual_style="festive",
                is_active=True,
                priority=94,
                created_at=None,
                updated_at=None,
            )

    async def override_get_db():
        yield None

    main_module.app.dependency_overrides[database_module.get_db] = override_get_db
    main_module.app.dependency_overrides[theme_service_module.get_theme_service] = lambda: StubThemeService()


def override_workflow_contentforge(client_obj):
    """Replace the singleton workflow service ContentForge client for one test."""

    workflow_service_module = importlib.import_module("app.services.workflow_v1_service")
    service = workflow_service_module.get_workflow_v1_service()
    service._contentforge = client_obj
    return service


class SlowContentForgeClient:
    """Deterministic test double that delays before returning stub content."""

    def __init__(self, *, delay_seconds: float = 0.35) -> None:
        workflow_service_module = importlib.import_module("app.services.workflow_v1_service")
        self._fallback = workflow_service_module.StubContentForgeClient()
        self._delay_seconds = delay_seconds

    async def generate_and_judge(self, payload):
        await asyncio.sleep(self._delay_seconds)
        return await self._fallback.generate_and_judge(payload)


class FailingContentForgeClient:
    """Deterministic test double that fails after a short delay."""

    def __init__(self, *, delay_seconds: float = 0.05) -> None:
        self._delay_seconds = delay_seconds

    async def generate_and_judge(self, _payload):
        await asyncio.sleep(self._delay_seconds)
        raise RuntimeError("Simulated ContentForge outage")


def wait_for_job_snapshot(client: TestClient, job_id: str, predicate, *, timeout_seconds: float = 3.0) -> dict[str, object]:
    """Poll job detail until one condition is true or the timeout expires."""

    deadline = time.monotonic() + timeout_seconds
    last_payload: dict[str, object] | None = None
    while time.monotonic() < deadline:
        response = client.get(f"/api/jobs/{job_id}")
        assert response.status_code == 200
        last_payload = response.json()
        if predicate(last_payload):
            return last_payload
        time.sleep(0.05)
    raise AssertionError(f"Timed out waiting for job {job_id}; last payload={last_payload}")


def _assets_dir() -> Path:
    """Return configured storage root used by workflow endpoints during tests."""

    root = os.environ.get("ASSET_STORAGE_ROOT", "").strip()
    if not root:
        raise RuntimeError("ASSET_STORAGE_ROOT is required for workflow router tests")
    return Path(root).expanduser().resolve()


def test_workflow_v1_happy_path(configured_env: dict[str, str]) -> None:
    """The v1 endpoints should keep one job_id consistent across the full lifecycle."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        assert start_response.status_code == 200
        start_payload = start_response.json()
        job_id = start_payload["job_id"]
        assert start_payload["status"] == "content_pending_approval"
        assert isinstance(start_payload["content_preview"], str)
        assert isinstance(start_payload["winner_model"], str)
        assert start_payload["candidate_pool_count"] == 30
        assert 3 <= start_payload["shortlist_count"] <= 5

        candidates_response = client.get(f"/api/jobs/{job_id}/candidates")
        assert candidates_response.status_code == 200
        candidates_payload = candidates_response.json()
        assert len(candidates_payload) == 30
        assert sum(1 for item in candidates_payload if item["is_shortlisted"]) == start_payload["shortlist_count"]

        shortlist_response = client.get(f"/api/jobs/{job_id}/shortlist")
        assert shortlist_response.status_code == 200
        shortlist_payload = shortlist_response.json()
        assert len(shortlist_payload) == start_payload["shortlist_count"]
        assert shortlist_payload[0]["rank"] == 1
        assert "reason_codes" in shortlist_payload[0]

        get_after_start = client.get(f"/api/jobs/{job_id}")
        assert get_after_start.status_code == 200
        assert get_after_start.json()["status"] == "content_pending_approval"
        assert get_after_start.json()["current_stage"] == "content_candidates_ready"
        assert get_after_start.json()["cards_per_theme"] == 10

        content_response = client.post(
            f"/api/jobs/{job_id}/content-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert content_response.status_code == 200
        assert content_response.json()["status"] == "image_pending_approval"
        assert isinstance(content_response.json()["image_prompt"], str)
        assert content_response.json()["image_preview_url"].endswith("_image_preview.png")

        get_after_content = client.get(f"/api/jobs/{job_id}")
        assert get_after_content.status_code == 200
        assert get_after_content.json()["status"] == "image_pending_approval"
        assert get_after_content.json()["current_stage"] == "image_candidates_ready"
        assert get_after_content.json()["content_approval_status"] == "approved"
        assert get_after_content.json()["image_approval_status"] == "pending"
        assert len(get_after_content.json()["image_candidates"]) == 3
        assert all(item["provider"] == "local_sdxl" for item in get_after_content.json()["image_candidates"])

        image_response = client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert image_response.status_code == 200
        assert image_response.json()["status"] == "final_pending_approval"
        assert image_response.json()["final_preview_url"] == (
            f"http://localhost:8080/assets/preview/{job_id}_content_preview.png"
        )

        get_after_image = client.get(f"/api/jobs/{job_id}")
        assert get_after_image.status_code == 200
        assert get_after_image.json()["status"] == "final_pending_approval"
        assert get_after_image.json()["current_stage"] == "final_card_ready"
        assert get_after_image.json()["image_approval_status"] == "approved"
        assert get_after_image.json()["final_preview_url"] == (
            f"http://localhost:8080/assets/preview/{job_id}_content_preview.png"
        )

        final_response = client.post(
            f"/api/jobs/{job_id}/final-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert final_response.status_code == 200
        final_payload = final_response.json()
        assert final_payload["status"] == "completed"
        assert final_payload["final_asset_urls"]["png"] == f"http://localhost:8080/assets/final/{job_id}_final.png"
        assert final_payload["final_asset_urls"]["pdf"] == f"http://localhost:8080/assets/pdf/{job_id}_final.pdf"
        assert (_assets_dir() / "final" / f"{job_id}_final.png").exists()
        assert (_assets_dir() / "pdf" / f"{job_id}_final.pdf").exists()
        png_response = client.get(f"/assets/final/{job_id}_final.png")
        assert png_response.status_code == 200

        list_response = client.get("/api/jobs")
        assert list_response.status_code == 200
        list_payload = list_response.json()
        list_item = next(item for item in list_payload if item["job_id"] == job_id)
        assert list_item["content_preview"]
        assert list_item["current_stage"] == "final_card_ready"
        assert list_item["cards_per_theme"] == 10
        assert list_item["image_preview_url"] == f"http://localhost:8080/assets/image/{job_id}_image_preview.png"
        assert list_item["final_preview_url"] == f"http://localhost:8080/assets/preview/{job_id}_content_preview.png"
        assert list_item["final_asset_urls"]["png"] == f"http://localhost:8080/assets/final/{job_id}_final.png"

        get_after_final = client.get(f"/api/jobs/{job_id}")
        assert get_after_final.status_code == 200
        debug_payload = get_after_final.json()
        assert debug_payload["status"] == "completed"
        assert debug_payload["current_stage"] == "final_card_ready"
        assert debug_payload["final_approval_status"] == "approved"
        assert len(debug_payload["candidates"]) == 30
        assert len(debug_payload["shortlist"]) == start_payload["shortlist_count"]
        assert any(event["event_type"] == "job_completed" for event in debug_payload["audit_log"])
        (_assets_dir() / "image" / f"{job_id}_image_preview.png").unlink(missing_ok=True)
        (_assets_dir() / "preview" / f"{job_id}_content_preview.png").unlink(missing_ok=True)
        (_assets_dir() / "final" / f"{job_id}_final.png").unlink(missing_ok=True)
        (_assets_dir() / "pdf" / f"{job_id}_final.pdf").unlink(missing_ok=True)


def test_workflow_v1_new_job_is_studio_ready_before_manual_text_selection(configured_env: dict[str, str]) -> None:
    """Fresh jobs should expose candidates and shortlist without auto-selecting text."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        assert start_response.status_code == 200
        job_id = start_response.json()["job_id"]

        job_response = client.get(f"/api/jobs/{job_id}")
        assert job_response.status_code == 200
        job_payload = job_response.json()
        assert job_payload["status"] == "content_pending_approval"
        assert job_payload["current_stage"] == "content_candidates_ready"

        candidates_response = client.get(f"/api/jobs/{job_id}/candidates")
        assert candidates_response.status_code == 200
        candidates_payload = candidates_response.json()
        assert len(candidates_payload) > 0
        assert all(candidate["is_selected"] is False for candidate in candidates_payload)

        shortlist_response = client.get(f"/api/jobs/{job_id}/shortlist")
        assert shortlist_response.status_code == 200
        shortlist_payload = shortlist_response.json()
        assert len(shortlist_payload) > 0
        assert all(entry["is_selected"] is False for entry in shortlist_payload)
        assert shortlist_payload[0]["rank"] == 1
        assert shortlist_payload[0]["reason_codes"]

        image_assets_response = client.get(f"/api/jobs/{job_id}/image-assets")
        assert image_assets_response.status_code == 200
        image_assets_payload = image_assets_response.json()
        assert image_assets_payload["generation_path"] == "imageforge"
        assert image_assets_payload["can_generate"] is False
        assert image_assets_payload["blocking_reason"] == "text_selected is required before image generation"
        assert image_assets_payload["selected_text"] is None
        assert image_assets_payload["candidates"] == []

        chosen_candidate_id = shortlist_payload[0]["candidate_id"]
        select_response = client.post(
            f"/api/jobs/{job_id}/select-text",
            json={"candidate_id": chosen_candidate_id},
        )
        assert select_response.status_code == 200
        select_payload = select_response.json()
        assert select_payload["status"] == "content_approved"
        assert select_payload["current_stage"] == "text_selected"

        job_after_select = client.get(f"/api/jobs/{job_id}")
        assert job_after_select.status_code == 200
        job_after_select_payload = job_after_select.json()
        assert job_after_select_payload["current_stage"] == "text_selected"
        assert job_after_select_payload["status"] == "content_approved"

        shortlist_after_select = client.get(f"/api/jobs/{job_id}/shortlist")
        assert shortlist_after_select.status_code == 200
        shortlist_after_select_payload = shortlist_after_select.json()
        chosen_entry = next(item for item in shortlist_after_select_payload if item["candidate_id"] == chosen_candidate_id)
        assert chosen_entry["is_selected"] is True

        image_assets_after_select = client.get(f"/api/jobs/{job_id}/image-assets")
        assert image_assets_after_select.status_code == 200
        image_assets_after_select_payload = image_assets_after_select.json()
        assert image_assets_after_select_payload["can_generate"] is True
        assert image_assets_after_select_payload["blocking_reason"] is None
        assert image_assets_after_select_payload["selected_text"] == job_after_select_payload["content_preview"]


def test_workflow_v1_async_start_returns_immediately_and_completes_in_background(
    configured_env: dict[str, str],
) -> None:
    """Async kickoff should return quickly and let the worker populate shortlist data afterward."""

    main_module, _workflow_module = reload_workflow_modules()
    override_workflow_contentforge(SlowContentForgeClient(delay_seconds=0.35))

    with TestClient(main_module.app) as client:
        started_at = time.monotonic()
        start_response = client.post("/api/jobs/start-async", json=sample_start_payload())
        elapsed_seconds = time.monotonic() - started_at

        assert start_response.status_code == 202
        kickoff_payload = start_response.json()
        job_id = kickoff_payload["job_id"]
        assert elapsed_seconds < 0.25
        assert kickoff_payload["status"] == "content_generation_queued"
        assert kickoff_payload["canonical_stage"] == "job_created"
        assert kickoff_payload["current_stage"] == "job_created"
        assert kickoff_payload["processing_state"] == "queued"
        assert kickoff_payload["processing_task"] == "content_generation"
        assert kickoff_payload["processing_message"] == "Content creation queued"

        job_response = client.get(f"/api/jobs/{job_id}")
        assert job_response.status_code == 200
        job_payload = job_response.json()
        assert job_payload["canonical_stage"] == "job_created"
        assert job_payload["current_stage"] == "job_created"
        assert job_payload["processing_task"] == "content_generation"
        assert job_payload["processing_state"] in {"queued", "running"}

        completed_job = wait_for_job_snapshot(
            client,
            job_id,
            lambda payload: payload["current_stage"] == "content_candidates_ready",
            timeout_seconds=4.0,
        )
        assert completed_job["status"] == "content_pending_approval"
        assert completed_job["processing_state"] == "idle"
        assert completed_job["processing_task"] == "none"
        assert completed_job["processing_message"] is None

        shortlist_response = client.get(f"/api/jobs/{job_id}/shortlist")
        assert shortlist_response.status_code == 200
        shortlist_payload = shortlist_response.json()
        assert len(shortlist_payload) > 0


def test_workflow_v1_async_start_surfaces_content_generation_failure(configured_env: dict[str, str]) -> None:
    """Async kickoff should preserve failed background generation state on the job."""

    main_module, _workflow_module = reload_workflow_modules()
    override_workflow_contentforge(FailingContentForgeClient(delay_seconds=0.05))

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start-async", json=sample_start_payload())
        assert start_response.status_code == 202
        job_id = start_response.json()["job_id"]

        failed_job = wait_for_job_snapshot(
            client,
            job_id,
            lambda payload: payload["status"] == "content_generation_failed",
            timeout_seconds=3.0,
        )
        assert failed_job["canonical_stage"] == "failed"
        assert failed_job["processing_state"] == "failed"
        assert failed_job["processing_task"] == "content_generation"
        assert "Content creation failed" in str(failed_job["processing_message"])
        assert "Simulated ContentForge outage" in str(failed_job["last_error_message"])

        shortlist_response = client.get(f"/api/jobs/{job_id}/shortlist")
        assert shortlist_response.status_code == 200
        assert shortlist_response.json() == []


def test_workflow_v1_rejects_out_of_order_approval(configured_env: dict[str, str]) -> None:
    """Image approval should fail with 409 until content approval is submitted."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        job_id = start_response.json()["job_id"]

        response = client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "approved", "notes": ""},
        )

    assert response.status_code == 409
    assert response.json()["detail"] == "Job not in image_pending_approval state"


def test_workflow_v1_content_timeout_transition(configured_env: dict[str, str]) -> None:
    """Content timeout decision should move job to content_timeout and audit the event."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        job_id = start_response.json()["job_id"]

        timeout_response = client.post(
            f"/api/jobs/{job_id}/content-approval",
            json={"decision": "timeout", "notes": "No approver response within SLA."},
        )
        assert timeout_response.status_code == 200
        timeout_payload = timeout_response.json()
        assert timeout_payload["status"] == "content_timeout"
        assert timeout_payload["image_prompt"] is None
        assert timeout_payload["image_preview_url"] is None

        debug_response = client.get(f"/api/jobs/{job_id}")
        assert debug_response.status_code == 200
        debug_payload = debug_response.json()
        assert debug_payload["content_approval_status"] == "timeout"
        assert any(event["event_type"] == "content_timeout" for event in debug_payload["audit_log"])


def test_workflow_v1_image_timeout_transition(configured_env: dict[str, str]) -> None:
    """Image timeout decision should move job to image_timeout and audit the event."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        job_id = start_response.json()["job_id"]
        content_response = client.post(
            f"/api/jobs/{job_id}/content-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert content_response.status_code == 200

        timeout_response = client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "timeout", "notes": "No image approval response in time."},
        )
        assert timeout_response.status_code == 200
        timeout_payload = timeout_response.json()
        assert timeout_payload["status"] == "image_timeout"
        assert timeout_payload["final_preview_url"] is None

        debug_response = client.get(f"/api/jobs/{job_id}")
        assert debug_response.status_code == 200
        debug_payload = debug_response.json()
        assert debug_payload["image_approval_status"] == "timeout"
        assert any(event["event_type"] == "image_timeout" for event in debug_payload["audit_log"])


def test_workflow_v1_final_timeout_transition(configured_env: dict[str, str]) -> None:
    """Final timeout decision should move job to final_timeout and audit the event."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        job_id = start_response.json()["job_id"]

        content_response = client.post(
            f"/api/jobs/{job_id}/content-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert content_response.status_code == 200

        image_response = client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert image_response.status_code == 200

        timeout_response = client.post(
            f"/api/jobs/{job_id}/final-approval",
            json={"decision": "timeout", "notes": "No final approver response in SLA."},
        )
        assert timeout_response.status_code == 200
        timeout_payload = timeout_response.json()
        assert timeout_payload["status"] == "final_timeout"
        assert timeout_payload["final_asset_urls"] is None

        debug_response = client.get(f"/api/jobs/{job_id}")
        assert debug_response.status_code == 200
        debug_payload = debug_response.json()
        assert debug_payload["final_approval_status"] == "timeout"
        assert any(event["event_type"] == "final_timeout" for event in debug_payload["audit_log"])


def test_workflow_v1_rerun_and_shortlist_render_endpoints(configured_env: dict[str, str]) -> None:
    """Rerun and shortlist-render endpoints should update job metadata and emit preview assets."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        assert start_response.status_code == 200
        job_id = start_response.json()["job_id"]

        shortlist_response = client.get(f"/api/jobs/{job_id}/shortlist")
        assert shortlist_response.status_code == 200
        shortlist_payload = shortlist_response.json()
        selected_ids = [shortlist_payload[0]["candidate_id"], shortlist_payload[1]["candidate_id"]]

        render_response = client.post(
            f"/api/jobs/{job_id}/render-shortlist",
            json={"candidate_ids": selected_ids},
        )
        assert render_response.status_code == 200
        render_payload = render_response.json()
        assert render_payload["rendered_count"] == 2
        assert len(render_payload["rendered_assets"]) == 2
        for asset in render_payload["rendered_assets"]:
            assert asset["preview_url"].endswith(f"_shortlist_{asset['candidate_id']}.png")
            assert (_assets_dir() / "preview" / f"{job_id}_shortlist_{asset['candidate_id']}.png").exists()

        rerun_content = client.post(f"/api/jobs/{job_id}/rerun/content")
        assert rerun_content.status_code == 200
        assert rerun_content.json()["stage"] == "content"
        assert rerun_content.json()["retry_count"] == 1

        refreshed_shortlist = client.get(f"/api/jobs/{job_id}/shortlist")
        assert refreshed_shortlist.status_code == 200
        refreshed_shortlist_payload = refreshed_shortlist.json()
        assert refreshed_shortlist_payload
        select_text = client.post(
            f"/api/jobs/{job_id}/select-text",
            json={"candidate_id": refreshed_shortlist_payload[0]["candidate_id"]},
        )
        assert select_text.status_code == 200
        assert select_text.json()["current_stage"] == "text_selected"

        rerun_image = client.post(f"/api/jobs/{job_id}/rerun/image")
        assert rerun_image.status_code == 200
        assert rerun_image.json()["stage"] == "image"
        assert rerun_image.json()["status"] == "image_pending_approval"

        image_assets = client.get(f"/api/jobs/{job_id}/assets")
        assert image_assets.status_code == 200
        selectable_options = [
            asset
            for asset in image_assets.json()
            if asset["asset_type"] == "image_option" and asset.get("relative_path")
        ]
        assert selectable_options
        select_image = client.post(
            f"/api/jobs/{job_id}/select-image",
            json={"relative_path": selectable_options[0]["relative_path"]},
        )
        assert select_image.status_code == 200
        assert select_image.json()["current_stage"] == "image_selected"

        rerun_final = client.post(f"/api/jobs/{job_id}/rerun/final-render")
        assert rerun_final.status_code == 200
        assert rerun_final.json()["stage"] == "final_render"
        assert rerun_final.json()["status"] == "final_pending_approval"

        rerun_full = client.post(f"/api/jobs/{job_id}/rerun/full")
        assert rerun_full.status_code == 200
        assert rerun_full.json()["stage"] == "full"
        assert rerun_full.json()["status"] == "content_pending_approval"
        assert rerun_full.json()["retry_count"] == 4

        debug_response = client.get(f"/api/jobs/{job_id}")
        assert debug_response.status_code == 200
        debug_payload = debug_response.json()
        assert debug_payload["retry_count"] == 4
        assert debug_payload["last_stage_started_at"] is not None
        assert debug_payload["last_stage_finished_at"] is not None


def test_workflow_v1_theme_start_routes_store_cards_per_theme(configured_env: dict[str, str]) -> None:
    """Daily-theme and manual-theme job creation should persist operator settings and short card copy."""

    main_module, _workflow_module = reload_workflow_modules()
    override_theme_factory_dependencies(main_module)

    try:
        with TestClient(main_module.app) as client:
            daily_response = client.post(
                "/api/jobs/create-daily-theme-job",
                json={
                    "cards_per_theme": 12,
                    "notes": "today run",
                    "copy_style": "short_crisp",
                    "target_words": 14,
                    "tone_funny_pct": 35,
                },
            )
            assert daily_response.status_code == 201
            daily_job_id = daily_response.json()["job_id"]

            daily_debug = client.get(f"/api/jobs/{daily_job_id}")
            assert daily_debug.status_code == 200
            assert daily_debug.json()["theme_name"] == "Holi Week"
            assert daily_debug.json()["cards_per_theme"] == 12
            assert daily_debug.json()["operator_notes"] == "today run"
            assert len(str(daily_debug.json()["content_preview"]).split()) <= 14

            manual_response = client.post(
                "/api/jobs/start-from-theme",
                json={
                    "theme_key": "holi-week",
                    "cards_per_theme": 7,
                    "notes": "manual run from theme factory",
                    "copy_style": "playful",
                    "target_words": 12,
                    "tone_funny_pct": 55,
                },
            )
            assert manual_response.status_code == 201
            manual_job_id = manual_response.json()["job_id"]

            manual_debug = client.get(f"/api/jobs/{manual_job_id}")
            assert manual_debug.status_code == 200
            assert manual_debug.json()["theme_name"] == "Holi Week"
            assert manual_debug.json()["cards_per_theme"] == 7
            assert manual_debug.json()["operator_notes"] == "manual run from theme factory"
            assert len(str(manual_debug.json()["content_preview"]).split()) <= 12
    finally:
        main_module.app.dependency_overrides.clear()


def test_workflow_v1_operator_stage_control_endpoints(configured_env: dict[str, str]) -> None:
    """Operator stage control endpoints should allow approve/reject/generate/render actions per stage."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        content_job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        reject_content = client.post(f"/api/jobs/{content_job_id}/reject-content")
        assert reject_content.status_code == 200
        assert reject_content.json()["status"] == "content_rejected"
        assert reject_content.json()["content_approval_status"] == "rejected"

        image_job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        approve_content = client.post(f"/api/jobs/{image_job_id}/approve-content")
        assert approve_content.status_code == 200
        assert approve_content.json()["status"] == "content_approved"

        generate_image = client.post(f"/api/jobs/{image_job_id}/generate-image")
        assert generate_image.status_code == 200
        assert generate_image.json()["status"] == "image_pending_approval"
        assert generate_image.json()["image_preview_url"].endswith("_image_preview.png")

        reject_image = client.post(f"/api/jobs/{image_job_id}/reject-image")
        assert reject_image.status_code == 200
        assert reject_image.json()["status"] == "image_rejected"
        assert reject_image.json()["image_approval_status"] == "rejected"

        final_job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        assert client.post(f"/api/jobs/{final_job_id}/approve-content").status_code == 200
        assert client.post(f"/api/jobs/{final_job_id}/generate-image").status_code == 200
        assert client.post(f"/api/jobs/{final_job_id}/approve-image").status_code == 200

        render_final = client.post(f"/api/jobs/{final_job_id}/render-final")
        assert render_final.status_code == 200
        assert render_final.json()["status"] == "final_pending_approval"
        assert render_final.json()["final_preview_url"].endswith("_content_preview.png")

        reject_final = client.post(f"/api/jobs/{final_job_id}/reject-final")
        assert reject_final.status_code == 200
        assert reject_final.json()["status"] == "final_rejected"
        assert reject_final.json()["final_approval_status"] == "rejected"

        regen_job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        regenerate_content = client.post(f"/api/jobs/{regen_job_id}/regenerate-content")
        assert regenerate_content.status_code == 200
        assert regenerate_content.json()["status"] == "content_pending_approval"
        assert regenerate_content.json()["retry_count"] == 1

        assert client.post(f"/api/jobs/{regen_job_id}/approve-content").status_code == 200
        assert client.post(f"/api/jobs/{regen_job_id}/generate-image").status_code == 200

        regenerate_image = client.post(f"/api/jobs/{regen_job_id}/regenerate-image")
        assert regenerate_image.status_code == 200
        assert regenerate_image.json()["status"] == "image_pending_approval"
        assert regenerate_image.json()["retry_count"] == 2

        assert client.post(f"/api/jobs/{regen_job_id}/approve-image").status_code == 200
        assert client.post(f"/api/jobs/{regen_job_id}/render-final").status_code == 200
        approve_final = client.post(f"/api/jobs/{regen_job_id}/approve-final")
        assert approve_final.status_code == 200
        assert approve_final.json()["status"] == "completed"
        assert approve_final.json()["final_asset_urls"]["png"].endswith("_final.png")


def test_workflow_v1_image_provider_generates_three_local_candidates(configured_env: dict[str, str]) -> None:
    """Image generation should default to local provider candidates and allow explicit selection."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        assert client.post(f"/api/jobs/{job_id}/approve-content").status_code == 200
        assert client.post(f"/api/jobs/{job_id}/generate-image").status_code == 200

        debug_response = client.get(f"/api/jobs/{job_id}")
        assert debug_response.status_code == 200
        debug_payload = debug_response.json()
        assert len(debug_payload["image_candidates"]) == 3
        assert all(item["provider"] == "local_sdxl" for item in debug_payload["image_candidates"])
        assert sum(1 for item in debug_payload["image_candidates"] if item["is_selected"]) == 1

        assets_response = client.get(f"/api/jobs/{job_id}/assets")
        assert assets_response.status_code == 200
        image_assets = [
            asset
            for asset in assets_response.json()
            if asset["asset_type"] in {"image_preview", "image_option"}
        ]
        assert len(image_assets) == 3

        more_response = client.post(f"/api/jobs/{job_id}/generate-more-images")
        assert more_response.status_code == 200
        assert more_response.json()["generated_count"] == 3

        refreshed_assets = client.get(f"/api/jobs/{job_id}/assets").json()
        selectable_options = [
            asset
            for asset in refreshed_assets
            if asset["asset_type"] == "image_option" and asset.get("relative_path")
        ]
        assert len(selectable_options) >= 4

        selected_option = selectable_options[-1]
        select_response = client.post(
            f"/api/jobs/{job_id}/select-image",
            json={"relative_path": selected_option["relative_path"]},
        )
        assert select_response.status_code == 200
        assert select_response.json()["image_preview_url"] == selected_option["public_url"]

        selected_debug = client.get(f"/api/jobs/{job_id}").json()
        matching_candidates = [
            candidate
            for candidate in selected_debug["image_candidates"]
            if candidate["relative_path"] == selected_option["relative_path"]
        ]
        assert matching_candidates
        assert matching_candidates[0]["is_selected"] is True


def test_workflow_v1_generic_rerun_stage_endpoint(configured_env: dict[str, str]) -> None:
    """The generic rerun-stage endpoint should dispatch only the requested stage."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]

        rerun_content = client.post(f"/api/jobs/{job_id}/rerun-stage", json={"stage": "content_generation"})
        assert rerun_content.status_code == 200
        assert rerun_content.json()["stage"] == "content"
        assert rerun_content.json()["retry_count"] == 1

        assert client.post(f"/api/jobs/{job_id}/approve-content").status_code == 200
        assert client.post(f"/api/jobs/{job_id}/generate-image").status_code == 200

        rerun_image = client.post(f"/api/jobs/{job_id}/rerun-stage", json={"stage": "image_generation"})
        assert rerun_image.status_code == 200
        assert rerun_image.json()["stage"] == "image"
        assert rerun_image.json()["retry_count"] == 2

        assert client.post(f"/api/jobs/{job_id}/approve-image").status_code == 200
        assert client.post(f"/api/jobs/{job_id}/render-final").status_code == 200

        rerun_final = client.post(f"/api/jobs/{job_id}/rerun-stage", json={"stage": "final_render"})
        assert rerun_final.status_code == 200
        assert rerun_final.json()["stage"] == "final_render"
        assert rerun_final.json()["retry_count"] == 3


def test_workflow_v1_final_approval_invalid_decision_returns_400(configured_env: dict[str, str]) -> None:
    """Final approval should validate decision with explicit 400 response."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        job_id = start_response.json()["job_id"]

        content_response = client.post(
            f"/api/jobs/{job_id}/content-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert content_response.status_code == 200

        image_response = client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert image_response.status_code == 200

        bad_response = client.post(
            f"/api/jobs/{job_id}/final-approval",
            json={"decision": "approve_now", "notes": ""},
        )

    assert bad_response.status_code == 400
    assert bad_response.json()["detail"] == "Invalid decision. Allowed values: approved, rejected, timeout"


def test_storage_health_endpoint(configured_env: dict[str, str]) -> None:
    """Storage health endpoint should report filesystem backend and writable root."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        response = client.get("/api/storage/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["backend"] == "filesystem"
    assert payload["writable"] is True


def test_workflow_console_job_management_endpoints(configured_env: dict[str, str]) -> None:
    """List/assets/events/archive/delete endpoints should support console workflows."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        assert start_response.status_code == 200
        job_id = start_response.json()["job_id"]

        list_response = client.get("/api/jobs")
        assert list_response.status_code == 200
        jobs = list_response.json()
        assert any(item["job_id"] == job_id for item in jobs)

        assets_response = client.get(f"/api/jobs/{job_id}/assets")
        assert assets_response.status_code == 200
        assert assets_response.json() == []

        events_response = client.get(f"/api/jobs/{job_id}/events")
        assert events_response.status_code == 200
        assert len(events_response.json()) >= 1

        archive_response = client.post(f"/api/jobs/{job_id}/archive")
        assert archive_response.status_code == 200
        assert archive_response.json()["status"] == "archived"

        delete_response = client.delete(f"/api/jobs/{job_id}")
        assert delete_response.status_code == 200
        assert delete_response.json()["deleted"] is True

        missing_response = client.get(f"/api/jobs/{job_id}")
        assert missing_response.status_code == 404


def test_storage_summary_endpoint(configured_env: dict[str, str]) -> None:
    """Storage summary should return aggregate bytes/files and per-directory usage."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        response = client.get("/api/storage/summary")

    assert response.status_code == 200
    payload = response.json()
    assert payload["backend"] == "filesystem"
    assert payload["writable"] is True
    assert isinstance(payload["total_files"], int)
    assert isinstance(payload["total_bytes"], int)
    assert isinstance(payload["directories"], list)


def test_theme_factory_endpoints_return_empty_payloads_without_db_theme_data(configured_env: dict[str, str]) -> None:
    """Theme Factory read APIs should degrade to empty payloads when no DB-backed theme data is available."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        catalog_response = client.get("/api/themes")
        assert catalog_response.status_code == 200
        catalog_payload = catalog_response.json()
        assert catalog_payload == []

        schedule_response = client.get("/api/themes/schedule")
        assert schedule_response.status_code == 200
        schedule_payload = schedule_response.json()
        assert schedule_payload == []

        today_response = client.get("/api/themes/today")
        assert today_response.status_code == 200
        today_payload = today_response.json()
        assert today_payload["resolved"] is False
        assert today_payload["message"] == "No theme resolved yet"
        assert today_payload["theme"] is None

        create_response = client.post("/api/jobs/create-daily-theme-job")
        assert create_response.status_code == 409
        assert create_response.json()["detail"] == "No theme resolved yet"


def test_theme_service_returns_empty_state_when_database_is_unavailable(configured_env: dict[str, str]) -> None:
    """Theme service should degrade to empty Theme Factory responses instead of failing when DB is unavailable."""

    reload_workflow_modules()
    theme_service_module = importlib.import_module("app.services.theme_service")
    ThemeService = theme_service_module.ThemeService

    service = ThemeService()
    catalog = asyncio.run(service.get_catalog(None))
    schedule = asyncio.run(service.get_schedule_dashboard(None))
    today = asyncio.run(service.get_today_theme(None))

    assert catalog == []
    assert schedule.timezone == "Asia/Kolkata"
    assert schedule.week_schedule == []
    assert schedule.month_schedule == []
    assert schedule.active_overrides == []
    assert today.resolved is False
    assert today.message == "No theme resolved yet"
    assert today.theme is None


def test_repository_requeues_stale_running_content_jobs(configured_env: dict[str, str]) -> None:
    """Expired running content-generation jobs should reset to queued on startup recovery."""

    reload_workflow_modules()
    repository_module = importlib.import_module("app.repositories.workflow_repository")
    schemas_module = importlib.import_module("app.schemas.workflow")
    store_module = importlib.import_module("app.store.job_store")
    workflow_service_module = importlib.import_module("app.services.workflow_v1_service")

    repository = repository_module.WorkflowJobRepository(
        memory_store=store_module.InMemoryJobStore(),
        allow_memory_fallback=True,
    )
    repository._memory_mode = True
    service = workflow_service_module.WorkflowV1Service(repository=repository)
    payload = schemas_module.StartJobRequest.model_validate(sample_start_payload())

    job_record = asyncio.run(service._create_initial_job_record(payload))
    job_id = str(job_record["job_id"])
    stale_started_at = datetime.now(timezone.utc)
    stale_lease_expires_at = stale_started_at.replace(microsecond=0)
    asyncio.run(
        repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "content_generation_in_progress",
                "processing_state": "running",
                "processing_task": "content_generation",
                "processing_message": "Content creation in progress",
                "processing_owner_token": "worker_stale",
                "processing_lease_expires_at": stale_lease_expires_at,
                "processing_started_at": stale_started_at,
                "processing_finished_at": None,
            },
        )
    )

    reset_count = asyncio.run(
        repository.reset_stale_content_generation_jobs(
            now=stale_started_at + timedelta(minutes=16),
        )
    )
    assert reset_count == 1

    recovered_job, backend = asyncio.run(repository.get_job(job_id))
    assert backend == "memory_fallback"
    assert recovered_job is not None
    assert recovered_job["status"] == "content_generation_queued"
    assert recovered_job["processing_state"] == "queued"
    assert recovered_job["processing_task"] == "content_generation"
    assert recovered_job["processing_message"] == "Content creation queued"
    assert recovered_job["processing_owner_token"] is None
    assert recovered_job["processing_started_at"] is None


def test_repository_recovers_preview_urls_from_asset_rows_for_legacy_jobs(configured_env: dict[str, str]) -> None:
    """Legacy jobs should still expose previews/final URLs when only asset rows are populated."""

    reload_workflow_modules()
    workflow_models = importlib.import_module("app.models.workflow")
    repository_module = importlib.import_module("app.repositories.workflow_repository")

    CardAsset = workflow_models.CardAsset
    CardJob = workflow_models.CardJob
    WorkflowJobRepository = repository_module.WorkflowJobRepository

    now = datetime.now(timezone.utc)
    job_id = "job_legacy_preview"
    job = CardJob(
        job_id=job_id,
        trace_id="trace_legacy_preview",
        status="completed",
        theme_name="Legacy Theme",
        tone_funny_pct=20,
        tone_emotion_pct=80,
        tone_style="conversational",
        visual_style="minimal",
        audience="internal reviewer",
        cultural_context="global",
        output_spec={"format": "paragraph"},
        avoid_cliches=True,
        content_preview="Legacy content preview",
        winner_model="gpt-test",
        content_approval_status="approved",
        image_approval_status="approved",
        final_approval_status="approved",
        image_prompt="legacy prompt",
        image_preview_url=None,
        final_preview_url=None,
        final_asset_urls=None,
        created_at=now,
        updated_at=now,
    )
    job.assets = [
        CardAsset(
            job_id=job_id,
            asset_type="image_preview",
            asset_url=f"http://localhost:8080/assets/image/{job_id}_image_preview.png",
            storage_backend="filesystem",
            storage_root="/tmp/ecardfactory-test-assets",
            relative_path=f"image/{job_id}_image_preview.png",
            public_url=f"http://localhost:8080/assets/image/{job_id}_image_preview.png",
            absolute_path=f"/tmp/ecardfactory-test-assets/image/{job_id}_image_preview.png",
            file_size_bytes=1234,
            version="v1",
            approved=False,
            created_at=now,
        ),
        CardAsset(
            job_id=job_id,
            asset_type="final_preview",
            asset_url=f"http://localhost:8080/assets/preview/{job_id}_content_preview.png",
            storage_backend="filesystem",
            storage_root="/tmp/ecardfactory-test-assets",
            relative_path=f"preview/{job_id}_content_preview.png",
            public_url=f"http://localhost:8080/assets/preview/{job_id}_content_preview.png",
            absolute_path=f"/tmp/ecardfactory-test-assets/preview/{job_id}_content_preview.png",
            file_size_bytes=2345,
            version="v1",
            approved=False,
            created_at=now,
        ),
        CardAsset(
            job_id=job_id,
            asset_type="final_png",
            asset_url=f"http://localhost:8080/assets/final/{job_id}_final.png",
            storage_backend="filesystem",
            storage_root="/tmp/ecardfactory-test-assets",
            relative_path=f"final/{job_id}_final.png",
            public_url=f"http://localhost:8080/assets/final/{job_id}_final.png",
            absolute_path=f"/tmp/ecardfactory-test-assets/final/{job_id}_final.png",
            file_size_bytes=3456,
            version="v1",
            approved=True,
            created_at=now,
        ),
    ]

    snapshot = WorkflowJobRepository._serialize_job(job)

    assert snapshot["image_preview_url"] == f"http://localhost:8080/assets/image/{job_id}_image_preview.png"
    assert snapshot["final_preview_url"] == f"http://localhost:8080/assets/preview/{job_id}_content_preview.png"
    assert snapshot["final_asset_urls"]["png"] == f"http://localhost:8080/assets/final/{job_id}_final.png"


def test_repository_recovers_preview_urls_from_filesystem_when_metadata_is_missing(configured_env: dict[str, str]) -> None:
    """Legacy jobs should still expose previews when files exist but DB metadata is incomplete."""

    reload_workflow_modules()
    workflow_models = importlib.import_module("app.models.workflow")
    repository_module = importlib.import_module("app.repositories.workflow_repository")

    CardJob = workflow_models.CardJob
    WorkflowJobRepository = repository_module.WorkflowJobRepository

    now = datetime.now(timezone.utc)
    job_id = "job_legacy_filesystem_preview"
    assets_dir = _assets_dir()
    (assets_dir / "image").mkdir(parents=True, exist_ok=True)
    (assets_dir / "preview").mkdir(parents=True, exist_ok=True)
    (assets_dir / "final").mkdir(parents=True, exist_ok=True)
    (assets_dir / "pdf").mkdir(parents=True, exist_ok=True)
    (assets_dir / "image" / f"{job_id}_image_preview.png").write_bytes(b"png")
    (assets_dir / "preview" / f"{job_id}_content_preview.png").write_bytes(b"png")
    (assets_dir / "final" / f"{job_id}_final.png").write_bytes(b"png")

    job = CardJob(
        job_id=job_id,
        trace_id="trace_legacy_filesystem_preview",
        status="completed",
        theme_name="Legacy Filesystem Theme",
        tone_funny_pct=20,
        tone_emotion_pct=80,
        tone_style="conversational",
        visual_style="minimal",
        audience="internal reviewer",
        cultural_context="global",
        output_spec={"format": "paragraph"},
        avoid_cliches=True,
        content_preview="Legacy content preview",
        winner_model="gpt-test",
        content_approval_status="approved",
        image_approval_status="approved",
        final_approval_status="approved",
        image_prompt="legacy prompt",
        image_preview_url=None,
        final_preview_url=None,
        final_asset_urls=None,
        created_at=now,
        updated_at=now,
    )
    job.assets = []

    snapshot = WorkflowJobRepository._serialize_job(job)

    assert snapshot["image_preview_url"] == f"http://localhost:8080/assets/image/{job_id}_image_preview.png"
    assert snapshot["final_preview_url"] == f"http://localhost:8080/assets/preview/{job_id}_content_preview.png"
    assert snapshot["final_asset_urls"]["png"] == f"http://localhost:8080/assets/final/{job_id}_final.png"

    (assets_dir / "image" / f"{job_id}_image_preview.png").unlink(missing_ok=True)
    (assets_dir / "preview" / f"{job_id}_content_preview.png").unlink(missing_ok=True)
    (assets_dir / "final" / f"{job_id}_final.png").unlink(missing_ok=True)


def test_workflow_contract_exposes_canonical_stages_and_endpoint_roles(configured_env: dict[str, str]) -> None:
    """The workflow contract endpoint should make the primary path and legacy routes explicit."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        response = client.get("/api/jobs/workflow-contract")

    assert response.status_code == 200
    payload = response.json()
    assert payload["version"] == "stage0_canonical_v1"
    assert payload["canonical_path_name"] == "start_select_generate_select_render_export"
    assert payload["canonical_stage_order"] == [
        "job_created",
        "text_candidates_ready",
        "text_selected",
        "image_candidates_ready",
        "image_selected",
        "preview_ready",
        "export_ready",
    ]

    stages = {item["stage"]: item for item in payload["stages"]}
    assert stages["text_candidates_ready"]["owner"] == "human_review"
    assert stages["preview_ready"]["allowed_next_stages"] == ["export_ready", "failed"]
    assert stages["failed"]["allowed_next_stages"] == []

    primary_paths = {item["path"] for item in payload["primary_endpoints"]}
    secondary_paths = {item["path"] for item in payload["secondary_endpoints"]}
    legacy_paths = {item["path"] for item in payload["legacy_endpoints"]}
    assert "/api/jobs/start" in primary_paths
    assert "/api/jobs/{job_id}/image-assets/generate" in primary_paths
    assert "/api/jobs/{job_id}/render-shortlist" in secondary_paths
    assert "/api/jobs/{job_id}/content-approval" in legacy_paths
    assert "/api/jobs/{job_id}/approve-content" in legacy_paths


def test_openapi_marks_legacy_workflow_routes_deprecated(configured_env: dict[str, str]) -> None:
    """Legacy approval and shortcut routes should be flagged as deprecated in OpenAPI."""

    main_module, _workflow_module = reload_workflow_modules()

    with TestClient(main_module.app) as client:
        response = client.get("/openapi.json")

    assert response.status_code == 200
    paths = response.json()["paths"]
    assert paths["/api/jobs/{job_id}/content-approval"]["post"]["deprecated"] is True
    assert paths["/api/jobs/{job_id}/image-approval"]["post"]["deprecated"] is True
    assert paths["/api/jobs/{job_id}/final-approval"]["post"]["deprecated"] is True
    assert paths["/api/jobs/{job_id}/approve-content"]["post"]["deprecated"] is True
    assert paths["/api/jobs/{job_id}/generate-more-images"]["post"]["deprecated"] is True
    assert paths["/api/jobs/{job_id}/approve-final"]["post"].get("deprecated") is not True
