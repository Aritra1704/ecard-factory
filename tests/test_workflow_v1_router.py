"""HTTP tests for v1 n8n workflow endpoints."""

from __future__ import annotations

import asyncio
from datetime import datetime, timezone
import importlib
import os
from pathlib import Path
import sys

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
        assert start_payload["shortlist_count"] == 10

        candidates_response = client.get(f"/api/jobs/{job_id}/candidates")
        assert candidates_response.status_code == 200
        candidates_payload = candidates_response.json()
        assert len(candidates_payload) == 30
        assert sum(1 for item in candidates_payload if item["is_shortlisted"]) == 10

        shortlist_response = client.get(f"/api/jobs/{job_id}/shortlist")
        assert shortlist_response.status_code == 200
        shortlist_payload = shortlist_response.json()
        assert len(shortlist_payload) == 10
        assert shortlist_payload[0]["rank"] == 1

        get_after_start = client.get(f"/api/jobs/{job_id}")
        assert get_after_start.status_code == 200
        assert get_after_start.json()["status"] == "content_pending_approval"
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
        assert get_after_content.json()["content_approval_status"] == "approved"
        assert get_after_content.json()["image_approval_status"] == "pending"

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
        assert list_item["cards_per_theme"] == 10
        assert list_item["image_preview_url"] == f"http://localhost:8080/assets/image/{job_id}_image_preview.png"
        assert list_item["final_preview_url"] == f"http://localhost:8080/assets/preview/{job_id}_content_preview.png"
        assert list_item["final_asset_urls"]["png"] == f"http://localhost:8080/assets/final/{job_id}_final.png"

        get_after_final = client.get(f"/api/jobs/{job_id}")
        assert get_after_final.status_code == 200
        debug_payload = get_after_final.json()
        assert debug_payload["status"] == "completed"
        assert debug_payload["final_approval_status"] == "approved"
        assert len(debug_payload["candidates"]) == 30
        assert len(debug_payload["shortlist"]) == 10
        assert any(event["event_type"] == "job_completed" for event in debug_payload["audit_log"])
        (_assets_dir() / "image" / f"{job_id}_image_preview.png").unlink(missing_ok=True)
        (_assets_dir() / "preview" / f"{job_id}_content_preview.png").unlink(missing_ok=True)
        (_assets_dir() / "final" / f"{job_id}_final.png").unlink(missing_ok=True)
        (_assets_dir() / "pdf" / f"{job_id}_final.pdf").unlink(missing_ok=True)


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

        rerun_image = client.post(f"/api/jobs/{job_id}/rerun/image")
        assert rerun_image.status_code == 200
        assert rerun_image.json()["stage"] == "image"
        assert rerun_image.json()["status"] == "image_pending_approval"

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
