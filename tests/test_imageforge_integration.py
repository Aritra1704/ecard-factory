"""Tests for the eCardFactory <-> ImageForge integration flow."""

from __future__ import annotations

from datetime import datetime, timezone
import importlib
import sys

from fastapi.testclient import TestClient


def reload_imageforge_modules():
    """Reload app modules so cached services pick up isolated test state."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database", "app.main"}
            or module_name.startswith("app.integrations")
            or module_name.startswith("app.models")
            or module_name.startswith("app.repositories")
            or module_name.startswith("app.routers")
            or module_name.startswith("app.schemas")
            or module_name.startswith("app.services")
            or module_name.startswith("app.store")
            or module_name.startswith("app.storage")
        ):
            sys.modules.pop(module_name, None)

    main_module = importlib.import_module("app.main")
    workflow_router_module = importlib.import_module("app.routers.workflow_v1")
    image_generation_service_module = importlib.import_module("app.services.image_generation_service")
    repository_module = importlib.import_module("app.repositories.workflow_repository")
    imageforge_schemas = importlib.import_module("app.integrations.imageforge.schemas")
    imageforge_mapper = importlib.import_module("app.integrations.imageforge.mapper")
    return (
        main_module,
        workflow_router_module,
        image_generation_service_module,
        repository_module,
        imageforge_schemas,
        imageforge_mapper,
    )


def sample_start_payload() -> dict[str, object]:
    """Return a workflow start payload that matches Studio expectations."""

    return {
        "theme_name": "Holi Week",
        "tone_funny_pct": 20,
        "tone_emotion_pct": 85,
        "tone_style": "festive",
        "audience": "friends and family",
        "cultural_context": "indian",
        "output_spec": {
            "format": "playful",
            "length": {"target_words": 14},
            "structure": {"no_lists": True, "no_numbering": True},
            "metadata": {
                "theme_key": "holi-week",
                "theme_bucket": "occasion",
                "theme_type": "campaign",
                "theme_description": "Holi celebration, colors, joy, togetherness",
                "default_visual_style": "festive",
            },
        },
        "avoid_cliches": True,
        "rendering": {
            "theme_style": "festive",
            "text_alignment": "center",
            "export_size": "1080x1350",
        },
    }


def _utc(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(timezone.utc)


def build_generation_response(schemas_module, *, request_id: str, trace_id: str, start_index: int, count: int):
    """Build one mocked ImageForge generation response."""

    started_at = _utc("2026-03-16T09:00:00Z")
    finished_at = _utc("2026-03-16T09:00:05Z")
    candidates = [
        schemas_module.GeneratedCandidate(
            candidate_id=f"cand_{start_index + offset}",
            provider_run_id=f"prun_{request_id}_{start_index + offset}",
            provider="comfyui",
            model="sd_xl_base_1.0",
            candidate_index=offset + 1,
            relative_path=f"candidates/{request_id}/cand_{start_index + offset}.png",
            public_url=f"http://127.0.0.1:8090/assets/candidates/{request_id}/cand_{start_index + offset}.png",
            is_selected=False,
            width=640,
            height=768,
            created_at=finished_at,
        )
        for offset in range(count)
    ]
    return schemas_module.GenerationResponse(
        ok=True,
        request_id=request_id,
        trace_id=trace_id,
        results=[
            schemas_module.ProviderExecution(
                status="completed",
                stage="completed",
                progress_pct=100,
                started_at=started_at,
                finished_at=finished_at,
                provider="comfyui",
                model="sd_xl_base_1.0",
                ok=True,
                latency_ms=42,
                prompt_used="soft festive reusable backdrop",
                negative_prompt_used="readable text, poster, greeting card layout",
                workflow_name="ecard_sdxl_basic.json",
                candidates=candidates,
            )
        ],
        meta={"total_candidates": count, "providers_succeeded": 1},
        status="completed",
        stage="completed",
        progress_pct=100,
        started_at=started_at,
        finished_at=finished_at,
    )


def build_select_response(schemas_module, *, request_id: str, candidate_id: str, candidate_index: int):
    """Build one mocked ImageForge select response."""

    created_at = _utc("2026-03-16T09:00:05Z")
    selected_at = _utc("2026-03-16T09:01:00Z")
    public_url = f"http://127.0.0.1:8090/assets/candidates/{request_id}/{candidate_id}.png"
    return schemas_module.SelectCandidateResponse(
        ok=True,
        candidate=schemas_module.ImageCandidateRecord(
            candidate_id=candidate_id,
            request_id=request_id,
            provider_run_id=f"prun_{request_id}_{candidate_id}",
            provider="comfyui",
            model="sd_xl_base_1.0",
            candidate_index=candidate_index,
            prompt_used="soft festive reusable backdrop",
            negative_prompt_used="readable text, poster, greeting card layout",
            relative_path=f"candidates/{request_id}/{candidate_id}.png",
            public_url=public_url,
            selected_asset_relative_path=f"candidates/{request_id}/{candidate_id}.png",
            selected_asset_public_url=public_url,
            storage_backend="filesystem",
            file_size_bytes=2048,
            width=640,
            height=768,
            is_selected=True,
            selected_at=selected_at,
            created_at=created_at,
        ),
    )


class FakeImageForgeClient:
    """Mock ImageForge client used by endpoint tests."""

    enabled = True

    def __init__(self, schemas_module) -> None:
        self._schemas = schemas_module
        self.generate_calls = []
        self.regenerate_calls = []
        self.select_calls = []
        self.detail_calls = []
        self.generate_response = build_generation_response(
            schemas_module,
            request_id="ifg_req_001",
            trace_id="trace_imageforge_001",
            start_index=1,
            count=3,
        )
        self.regenerate_response = build_generation_response(
            schemas_module,
            request_id="ifg_req_001",
            trace_id="trace_imageforge_001",
            start_index=4,
            count=2,
        )

    async def generate(self, payload):
        self.generate_calls.append(payload)
        return self.generate_response

    async def regenerate(self, payload):
        self.regenerate_calls.append(payload)
        return self.regenerate_response

    async def select_candidate(self, candidate_id: str):
        self.select_calls.append(candidate_id)
        candidate_index = 2 if candidate_id == "cand_2" else 1
        return build_select_response(
            self._schemas,
            request_id="ifg_req_001",
            candidate_id=candidate_id,
            candidate_index=candidate_index,
        )

    async def get_request_detail(self, request_id: str):
        self.detail_calls.append(request_id)
        candidates = [
            build_select_response(
                self._schemas,
                request_id=request_id,
                candidate_id="cand_2",
                candidate_index=2,
            ).candidate,
        ]
        request = self._schemas.ImageRequestRecord(
            request_id=request_id,
            trace_id="trace_imageforge_001",
            theme_name="Holi Week",
            theme_bucket="occasion",
            cultural_context="indian",
            selected_text="Warm Holi wishes.",
            workflow_type="ecard_background",
            asset_type="background_full",
            style_profile="soft_color_illustration",
            scene_spec={
                "subject": "Holi-inspired celebratory backdrop",
                "composition": "full-bleed reusable background",
                "background_intent": "bright Indian celebration mood with room for readable overlay text",
            },
            render_spec={"width": 640, "height": 768, "orientation": "portrait", "quality_profile": "draft"},
            creative_direction={
                "motif_hint": "festive reusable backdrop with cultural ornament and layered celebration energy",
                "subject_hint": "festive color burst with rangoli-inspired ornament",
                "visual_keywords": ["powder color bloom", "joyful movement", "Indian festive detail"],
                "avoid_keywords": ["readable text", "embedded typography"],
            },
            tone_style="festive",
            visual_style="festive",
            candidate_count=3,
            notes=None,
            request_payload_json={},
            status="completed",
            stage="completed",
            progress_pct=100,
            started_at=_utc("2026-03-16T09:00:00Z"),
            finished_at=_utc("2026-03-16T09:00:05Z"),
            created_at=_utc("2026-03-16T09:00:00Z"),
        )
        return self._schemas.RequestDetailResponse(
            ok=True,
            request=request,
            provider_runs=[],
            candidates=candidates,
            selected_candidate=candidates[0],
        )


def build_image_generation_service(image_generation_service_module, repository_module, fake_client):
    """Create one ImageGenerationService instance sharing the workflow repository singleton."""

    return image_generation_service_module.ImageGenerationService(
        repository=repository_module.get_workflow_job_repository(),
        imageforge_client=fake_client,
    )


def test_imageforge_mapper_builds_expected_payload(configured_env: dict[str, str]) -> None:
    """The mapper should convert eCardFactory-owned theme/text state into the ImageForge contract."""

    (
        _main_module,
        _workflow_router_module,
        _image_generation_service_module,
        _repository_module,
        _schemas_module,
        mapper_module,
    ) = reload_imageforge_modules()

    payload = mapper_module.build_imageforge_generate_request(
        {
            "theme_name": "Holi Week",
            "trace_id": "trace_job_001",
            "tone_style": "festive",
            "visual_style": "festive",
            "cultural_context": "indian",
            "content_preview": "Warm Holi wishes and colorful joy.",
            "operator_notes": "manual studio run",
            "output_spec": sample_start_payload()["output_spec"] | {"rendering": sample_start_payload()["rendering"]},
        },
        candidate_count=4,
    )

    assert payload.workflow_type == "ecard_background"
    assert payload.asset_type == "background_full"
    assert payload.style_profile == "soft_color_illustration"
    assert payload.theme_bucket == "occasion"
    assert payload.selected_text == "Warm Holi wishes and colorful joy."
    assert payload.trace_id == "trace_job_001"
    assert payload.candidate_count == 4
    assert payload.creative_direction.motif_hint
    assert payload.creative_direction.subject_hint
    assert "readable text" in payload.creative_direction.avoid_keywords
    assert payload.scene_spec.subject == "Holi-inspired celebratory backdrop"
    assert payload.render_spec.orientation == "portrait"
    assert payload.render_spec.width == 640
    assert payload.render_spec.height == 768
    assert payload.provider_targets[0].provider == "comfyui"
    assert payload.provider_targets[0].model == "sd_xl_base_1.0"


def test_generate_image_assets_endpoint_with_mocked_imageforge(configured_env: dict[str, str]) -> None:
    """Generate should call ImageForge through the dedicated service and persist request metadata locally."""

    (
        main_module,
        _workflow_router_module,
        image_generation_service_module,
        repository_module,
        schemas_module,
        _mapper_module,
    ) = reload_imageforge_modules()
    fake_client = FakeImageForgeClient(schemas_module)
    service = build_image_generation_service(image_generation_service_module, repository_module, fake_client)
    main_module.app.dependency_overrides[image_generation_service_module.get_image_generation_service] = lambda: service

    with TestClient(main_module.app) as client:
        start_response = client.post("/api/jobs/start", json=sample_start_payload())
        job_id = start_response.json()["job_id"]
        approve_response = client.post(f"/api/jobs/{job_id}/approve-content")
        assert approve_response.status_code == 200

        generate_response = client.post(f"/api/jobs/{job_id}/image-assets/generate")
        assert generate_response.status_code == 200
        body = generate_response.json()
        assert body["job_id"] == job_id
        assert body["imageforge_request_id"] == "ifg_req_001"
        assert body["imageforge_trace_id"] == "trace_imageforge_001"
        assert body["image_generation_status"] == "completed"
        assert body["image_generation_stage"] == "completed"
        assert len(body["candidates"]) == 3
        assert body["candidates"][0]["candidate_id"] == "cand_1"

        debug_response = client.get(f"/api/jobs/{job_id}")
        debug_payload = debug_response.json()
        assert debug_payload["imageforge_request_id"] == "ifg_req_001"
        assert debug_payload["image_generation_status"] == "completed"
        assert debug_payload["image_candidates"][0]["prompt_used"] == "soft festive reusable backdrop"
        assert debug_payload["image_candidates"][0]["negative_prompt_used"] == "readable text, poster, greeting card layout"

    main_module.app.dependency_overrides.clear()
    assert len(fake_client.generate_calls) == 1


def test_regenerate_image_assets_endpoint_with_mocked_imageforge(configured_env: dict[str, str]) -> None:
    """Regenerate should request another ImageForge batch and append candidate metadata locally."""

    (
        main_module,
        _workflow_router_module,
        image_generation_service_module,
        repository_module,
        schemas_module,
        _mapper_module,
    ) = reload_imageforge_modules()
    fake_client = FakeImageForgeClient(schemas_module)
    service = build_image_generation_service(image_generation_service_module, repository_module, fake_client)
    main_module.app.dependency_overrides[image_generation_service_module.get_image_generation_service] = lambda: service

    with TestClient(main_module.app) as client:
        job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        client.post(f"/api/jobs/{job_id}/approve-content")
        assert client.post(f"/api/jobs/{job_id}/image-assets/generate").status_code == 200

        regenerate_response = client.post(
            f"/api/jobs/{job_id}/image-assets/regenerate",
            json={"candidate_count": 2},
        )
        assert regenerate_response.status_code == 200
        body = regenerate_response.json()
        assert body["imageforge_request_id"] == "ifg_req_001"
        assert len(body["candidates"]) == 5
        assert body["candidates"][-1]["candidate_id"] == "cand_5"

    main_module.app.dependency_overrides.clear()
    assert len(fake_client.regenerate_calls) == 1
    assert fake_client.regenerate_calls[0].candidate_count == 2


def test_select_image_asset_endpoint_with_mocked_imageforge(configured_env: dict[str, str]) -> None:
    """Selecting a candidate should update both ImageForge and eCardFactory-local selected state."""

    (
        main_module,
        _workflow_router_module,
        image_generation_service_module,
        repository_module,
        schemas_module,
        _mapper_module,
    ) = reload_imageforge_modules()
    fake_client = FakeImageForgeClient(schemas_module)
    service = build_image_generation_service(image_generation_service_module, repository_module, fake_client)
    main_module.app.dependency_overrides[image_generation_service_module.get_image_generation_service] = lambda: service

    with TestClient(main_module.app) as client:
        job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        client.post(f"/api/jobs/{job_id}/approve-content")
        client.post(f"/api/jobs/{job_id}/image-assets/generate")

        select_response = client.post(f"/api/jobs/{job_id}/image-assets/cand_2/select")
        assert select_response.status_code == 200
        body = select_response.json()
        assert body["selected_image_candidate_id"] == "cand_2"
        assert body["selected_image_provider"] == "comfyui"
        assert body["selected_image_model"] == "sd_xl_base_1.0"
        assert body["selected_image_public_url"].endswith("/cand_2.png")

        debug_payload = client.get(f"/api/jobs/{job_id}").json()
        assert debug_payload["image_preview_url"].endswith("/cand_2.png")
        assert debug_payload["image_approval_status"] == "approved"
        assert debug_payload["selected_image_candidate_id"] == "cand_2"
        assert sum(1 for item in debug_payload["image_candidates"] if item["is_selected"]) == 1

    main_module.app.dependency_overrides.clear()
    assert fake_client.select_calls == ["cand_2"]


def test_image_candidate_metadata_persists_locally(configured_env: dict[str, str]) -> None:
    """ImageForge candidate metadata should be stored on the eCardFactory side after generation."""

    (
        main_module,
        _workflow_router_module,
        image_generation_service_module,
        repository_module,
        schemas_module,
        _mapper_module,
    ) = reload_imageforge_modules()
    fake_client = FakeImageForgeClient(schemas_module)
    service = build_image_generation_service(image_generation_service_module, repository_module, fake_client)
    main_module.app.dependency_overrides[image_generation_service_module.get_image_generation_service] = lambda: service

    with TestClient(main_module.app) as client:
        job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        client.post(f"/api/jobs/{job_id}/approve-content")
        client.post(f"/api/jobs/{job_id}/image-assets/generate")

        debug_payload = client.get(f"/api/jobs/{job_id}").json()
        stored = debug_payload["image_candidates"][0]
        assert stored["imageforge_request_id"] == "ifg_req_001"
        assert stored["candidate_id"] == "cand_1"
        assert stored["provider_run_id"].startswith("prun_ifg_req_001")
        assert stored["provider"] == "comfyui"
        assert stored["model"] == "sd_xl_base_1.0"
        assert stored["prompt_used"] == "soft festive reusable backdrop"
        assert stored["negative_prompt_used"] == "readable text, poster, greeting card layout"
        assert stored["width"] == 640
        assert stored["height"] == 768
        assert stored["public_url"].endswith("/cand_1.png")
        assert stored["relative_path"].endswith("/cand_1.png")

    main_module.app.dependency_overrides.clear()


def test_get_image_assets_endpoint_returns_ui_ready_structure(configured_env: dict[str, str]) -> None:
    """The image-assets fetch route should return a compact UI-ready payload."""

    (
        main_module,
        _workflow_router_module,
        image_generation_service_module,
        repository_module,
        schemas_module,
        _mapper_module,
    ) = reload_imageforge_modules()
    fake_client = FakeImageForgeClient(schemas_module)
    service = build_image_generation_service(image_generation_service_module, repository_module, fake_client)
    main_module.app.dependency_overrides[image_generation_service_module.get_image_generation_service] = lambda: service

    with TestClient(main_module.app) as client:
        job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]
        client.post(f"/api/jobs/{job_id}/approve-content")
        client.post(f"/api/jobs/{job_id}/image-assets/generate")
        client.post(f"/api/jobs/{job_id}/image-assets/cand_2/select")

        response = client.get(f"/api/jobs/{job_id}/image-assets")
        assert response.status_code == 200
        body = response.json()
        assert body["job_id"] == job_id
        assert body["selected_text"]
        assert body["selected_image_candidate_id"] == "cand_2"
        assert body["selected_image_public_url"].endswith("/cand_2.png")
        assert body["candidates"][1]["candidate_id"] == "cand_2"
        assert body["candidates"][1]["provider"] == "comfyui"
        assert body["candidates"][1]["model"] == "sd_xl_base_1.0"
        assert body["candidates"][1]["width"] == 640
        assert body["candidates"][1]["height"] == 768
        assert body["candidates"][1]["is_selected"] is True

    main_module.app.dependency_overrides.clear()


def test_stage_transitions_and_final_preview_follow_selected_text_and_image(configured_env: dict[str, str]) -> None:
    """Stage values should advance only when text, image, and final preview state actually exist."""

    (
        main_module,
        _workflow_router_module,
        image_generation_service_module,
        repository_module,
        schemas_module,
        _mapper_module,
    ) = reload_imageforge_modules()
    fake_client = FakeImageForgeClient(schemas_module)
    service = build_image_generation_service(image_generation_service_module, repository_module, fake_client)
    main_module.app.dependency_overrides[image_generation_service_module.get_image_generation_service] = lambda: service

    with TestClient(main_module.app) as client:
        job_id = client.post("/api/jobs/start", json=sample_start_payload()).json()["job_id"]

        start_debug = client.get(f"/api/jobs/{job_id}")
        assert start_debug.status_code == 200
        assert start_debug.json()["current_stage"] == "content_candidates_ready"

        approve_response = client.post(f"/api/jobs/{job_id}/approve-content")
        assert approve_response.status_code == 200
        assert approve_response.json()["current_stage"] == "text_selected"

        generate_response = client.post(f"/api/jobs/{job_id}/image-assets/generate")
        assert generate_response.status_code == 200
        after_generate = client.get(f"/api/jobs/{job_id}")
        assert after_generate.status_code == 200
        assert after_generate.json()["current_stage"] == "image_candidates_ready"

        select_response = client.post(f"/api/jobs/{job_id}/image-assets/cand_2/select")
        assert select_response.status_code == 200
        after_select = client.get(f"/api/jobs/{job_id}")
        assert after_select.status_code == 200
        assert after_select.json()["current_stage"] == "image_selected"

        render_response = client.post(f"/api/jobs/{job_id}/render-final")
        assert render_response.status_code == 200
        render_body = render_response.json()
        assert render_body["current_stage"] == "final_card_ready"
        assert render_body["final_preview_url"].endswith("_content_preview.png")

        final_debug = client.get(f"/api/jobs/{job_id}")
        assert final_debug.status_code == 200
        assert final_debug.json()["current_stage"] == "final_card_ready"
        assert final_debug.json()["final_preview_url"].endswith("_content_preview.png")

    main_module.app.dependency_overrides.clear()
