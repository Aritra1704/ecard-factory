"""HTTP tests for v1 n8n workflow endpoints."""

from __future__ import annotations

import importlib
import sys

from fastapi.testclient import TestClient


def reload_workflow_modules():
    """Reload app modules so workflow service picks up test env variables cleanly."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database", "app.main"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.routers")
            or module_name.startswith("app.schemas")
            or module_name.startswith("app.services")
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


def test_workflow_v1_happy_path(configured_env: dict[str, str]) -> None:
    """The v1 endpoints should support start -> content -> image -> final transitions."""

    main_module, workflow_module = reload_workflow_modules()
    workflow_module.workflow_service._prefer_memory = True

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        assert start_response.status_code == 200
        start_payload = start_response.json()
        job_id = start_payload["job_id"]
        assert start_payload["status"] == "content_pending_approval"
        assert isinstance(start_payload["content_preview"], str)
        assert isinstance(start_payload["winner_model"], str)

        content_response = client.post(
            f"/api/jobs/{job_id}/content-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert content_response.status_code == 200
        assert content_response.json()["status"] == "image_pending_approval"
        assert isinstance(content_response.json()["image_prompt"], str)
        assert content_response.json()["image_preview_url"].endswith("_image_preview.png")

        image_response = client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert image_response.status_code == 200
        assert image_response.json()["status"] == "final_pending_approval"
        assert image_response.json()["final_preview_url"].startswith(
            "http://localhost:8080/assets/final_preview_"
        )

        final_response = client.post(
            f"/api/jobs/{job_id}/final-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert final_response.status_code == 200
        final_payload = final_response.json()
        assert final_payload["status"] == "completed"
        assert final_payload["final_asset_urls"]["png"].startswith("http://localhost:8080/assets/final_")
        assert final_payload["final_asset_urls"]["pdf"].startswith("http://localhost:8080/assets/final_")

        debug_response = client.get(f"/api/jobs/{job_id}")
        assert debug_response.status_code == 200
        debug_payload = debug_response.json()
        assert debug_payload["status"] == "completed"
        assert len(debug_payload["candidates"]) >= 1
        assert any(event["event_type"] == "job_completed" for event in debug_payload["audit_log"])


def test_workflow_v1_rejects_out_of_order_approval(configured_env: dict[str, str]) -> None:
    """Image approval should fail with 409 until content approval is submitted."""

    main_module, workflow_module = reload_workflow_modules()
    workflow_module.workflow_service._prefer_memory = True

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        job_id = start_response.json()["job_id"]

        response = client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "approved", "notes": ""},
        )

    assert response.status_code == 409
    assert "Invalid state transition" in response.json()["detail"]


def test_workflow_v1_content_timeout_transition(configured_env: dict[str, str]) -> None:
    """Content timeout decision should move job to content_timeout and audit the event."""

    main_module, workflow_module = reload_workflow_modules()
    workflow_module.workflow_service._prefer_memory = True

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
