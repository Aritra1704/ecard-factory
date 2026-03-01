"""HTTP tests for the standalone FastAPI health endpoint."""

from __future__ import annotations

import importlib
import sys

from fastapi.testclient import TestClient


def reload_main_module():
    """Reload app modules so the FastAPI app picks up the test environment."""

    for module_name in list(sys.modules):
        if module_name in {"app.config", "app.database", "app.main"} or module_name.startswith(
            "app.models"
        ):
            sys.modules.pop(module_name, None)

    return importlib.import_module("app.main")


def test_health_endpoint_returns_200(configured_env: dict[str, str], monkeypatch) -> None:
    """The health endpoint should return static service metadata without hitting the DB."""

    main_module = reload_main_module()

    with TestClient(main_module.app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "env": configured_env["APP_ENV"],
        "schema": configured_env["DB_SCHEMA"],
        "version": "1.0.0",
    }
