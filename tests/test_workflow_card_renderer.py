"""Unit tests for the Stage 3 layout-spec-driven workflow card renderer."""

from __future__ import annotations

from io import BytesIO
import os
from pathlib import Path
import tempfile

from PIL import Image

os.environ.setdefault("DATABASE_URL", "postgresql://local_user:local_pass@localhost:5432/ecard_factory")
os.environ.setdefault("ASSET_STORAGE_BACKEND", "filesystem")
os.environ.setdefault(
    "ASSET_STORAGE_ROOT",
    str((Path(tempfile.gettempdir()) / "ecardfactory-renderer-test-assets").resolve()),
)
os.environ.setdefault("ASSET_PUBLIC_BASE_URL", "http://localhost:8080/assets")

from app.services.workflow_card_renderer import (
    FinalCardRenderInput,
    PreviewCardRenderInput,
    WorkflowCardRenderer,
)


def test_build_final_layout_spec_is_versioned_and_explicit() -> None:
    """Final renders should resolve to one explicit versioned layout spec."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Festival Joy",
            message="Wishing you a bright season full of color, laughter, and kind company.",
            signoff="With love",
            theme_style="festive",
            background_image_url=None,
            illustration_image_url="https://example.com/illustration.png",
            text_alignment="center",
            export_size="1200x1500",
        )
    )

    assert layout.layout_id == "poster_illustration_caption"
    assert layout.canvas_width == 1200
    assert layout.canvas_height == 1500
    assert any(shape.shape_type == "rounded_rect" and shape.layer == "content" for shape in layout.shapes)
    assert any(shape.shape_type == "ellipse" and shape.layer == "background" for shape in layout.shapes)
    assert len(layout.image_blocks) == 1
    assert {block.role for block in layout.text_blocks} >= {"title", "body", "signoff"}


def test_preview_layout_spec_includes_metadata_blocks() -> None:
    """Preview rendering should build explicit metadata blocks alongside message content."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_preview_layout_spec(
        PreviewCardRenderInput(
            title="Shortlist Render #1",
            message="A calm and thoughtful message for review.",
            signoff="Shortlist Preview",
            theme_style="minimal",
            background_image_url=None,
            text_alignment="left",
            export_size="1080x1350",
            theme_name="Launch Sprint",
            job_id="job_123",
            status="content_pending_approval",
            metadata_lines=[
                "Candidate model: test-model",
                "Shortlist rank: 1",
                "Rendered from shortlist",
            ],
        )
    )

    assert layout.layout_id == "preview_minimal_v1"
    assert any(block.role == "metadata_title" for block in layout.text_blocks)
    assert len([block for block in layout.text_blocks if block.role == "metadata_line"]) >= 5
    assert any(block.role == "body" for block in layout.text_blocks)


def test_render_layout_png_honors_canvas_dimensions_and_custom_layout_id() -> None:
    """Rendering from an explicit layout spec should preserve the resolved canvas size."""

    renderer = WorkflowCardRenderer()
    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Team Launch",
            message="Steady progress, sharp execution, and a clean finish.",
            signoff=None,
            theme_style="elegant",
            background_image_url=None,
            illustration_image_url=None,
            text_alignment="right",
            export_size="900x1200",
            layout_id="text_left_illustration_right",
        )
    )

    png_bytes = renderer.render_layout_png(layout)
    with Image.open(BytesIO(png_bytes)) as image:
        assert image.format == "PNG"
        assert image.size == (900, 1200)
    assert layout.layout_id == "text_left_illustration_right"


def test_elegant_theme_defaults_to_side_by_side_layout() -> None:
    """Elegant cards should default to the side-by-side composition preset."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Quiet Grace",
            message="A restrained, polished design should not default to the festival poster layout.",
            signoff="Regards",
            theme_style="elegant",
            background_image_url=None,
            illustration_image_url="https://example.com/elegant.png",
            text_alignment="left",
            export_size="1080x1350",
        )
    )

    assert layout.layout_id == "text_left_illustration_right"
    assert len(layout.image_blocks) == 1
