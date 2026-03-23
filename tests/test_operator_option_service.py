"""Unit tests for operator-facing option catalog defaults."""

from __future__ import annotations

import asyncio
import importlib
import sys


def reload_operator_option_modules():
    """Reload operator option modules so tests use a fresh import graph."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.schemas")
            or module_name.startswith("app.services.operator_option_service")
        ):
            sys.modules.pop(module_name, None)

    service_module = importlib.import_module("app.services.operator_option_service")
    return service_module


def test_list_options_without_db_returns_seed_catalog(configured_env: dict[str, str]) -> None:
    """Seed fallback should provide meaningful dropdown options without nonsense defaults."""

    service_module = reload_operator_option_modules()
    service = service_module.OperatorOptionService()

    payload = asyncio.run(service.list_options(None))

    assert payload.source == "seed"
    assert "audience" in payload.categories
    assert "tone_style" in payload.categories
    audience_values = [item.option_value for item in payload.categories["audience"]]
    assert "operations team" not in audience_values
    assert audience_values[0] == "general audience"
    assert any(item.option_value == "working professionals" for item in payload.categories["audience"])


def test_seed_catalog_marks_one_default_per_primary_category(configured_env: dict[str, str]) -> None:
    """Primary job-creation categories should expose one sensible default each."""

    service_module = reload_operator_option_modules()
    service = service_module.OperatorOptionService()

    payload = asyncio.run(service.list_options(None))

    for category, expected_default in {
        "audience": "general audience",
        "cultural_context": "global",
        "tone_style": "conversational",
        "copy_style": "minimal",
        "visual_style": "minimal",
    }.items():
        defaults = [item.option_value for item in payload.categories[category] if item.is_default]
        assert defaults == [expected_default]
