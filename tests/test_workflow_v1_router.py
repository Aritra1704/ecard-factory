"""HTTP tests for v1 n8n workflow endpoints."""

from __future__ import annotations

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

        get_after_start = client.get(f"/api/jobs/{job_id}")
        assert get_after_start.status_code == 200
        assert get_after_start.json()["status"] == "content_pending_approval"

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

        get_after_final = client.get(f"/api/jobs/{job_id}")
        assert get_after_final.status_code == 200
        debug_payload = get_after_final.json()
        assert debug_payload["status"] == "completed"
        assert debug_payload["final_approval_status"] == "approved"
        assert len(debug_payload["candidates"]) >= 1
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
