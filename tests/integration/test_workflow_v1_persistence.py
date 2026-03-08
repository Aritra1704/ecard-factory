"""Integration test for workflow job persistence across all n8n-facing endpoints."""

from __future__ import annotations

import httpx
import pytest
from sqlalchemy import select


@pytest.mark.integration
@pytest.mark.asyncio
async def test_workflow_job_persists_across_all_endpoints(real_db_session):
    """A single job_id should survive start -> content -> image -> final across Postgres."""

    from app.main import app
    from app.models.workflow import CardJob

    job_id: str | None = None
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        start_response = await client.post(
            "/api/jobs/start",
            json={
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
            },
        )
        assert start_response.status_code == 200
        job_id = start_response.json()["job_id"]

        db_job = await real_db_session.get(CardJob, job_id)
        assert db_job is not None

        get_after_start = await client.get(f"/api/jobs/{job_id}")
        assert get_after_start.status_code == 200
        assert get_after_start.json()["status"] == "content_pending_approval"

        content_response = await client.post(
            f"/api/jobs/{job_id}/content-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert content_response.status_code == 200
        assert content_response.json()["status"] == "image_pending_approval"

        get_after_content = await client.get(f"/api/jobs/{job_id}")
        assert get_after_content.status_code == 200
        assert get_after_content.json()["content_approval_status"] == "approved"

        image_response = await client.post(
            f"/api/jobs/{job_id}/image-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert image_response.status_code == 200
        assert image_response.json()["status"] == "final_pending_approval"

        get_after_image = await client.get(f"/api/jobs/{job_id}")
        assert get_after_image.status_code == 200
        assert get_after_image.json()["image_approval_status"] == "approved"

        final_response = await client.post(
            f"/api/jobs/{job_id}/final-approval",
            json={"decision": "approved", "notes": ""},
        )
        assert final_response.status_code == 200
        assert final_response.json()["status"] == "completed"

        get_after_final = await client.get(f"/api/jobs/{job_id}")
        assert get_after_final.status_code == 200
        final_payload = get_after_final.json()
        assert final_payload["status"] == "completed"
        assert final_payload["final_approval_status"] == "approved"
        assert final_payload["trace_id"]

    if job_id:
        stored = await real_db_session.get(CardJob, job_id)
        if stored is not None:
            await real_db_session.delete(stored)
            await real_db_session.commit()

    statement = select(CardJob).where(CardJob.job_id == job_id)
    result = await real_db_session.execute(statement)
    assert result.scalar_one_or_none() is None

