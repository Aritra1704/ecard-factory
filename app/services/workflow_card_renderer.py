"""Renderers for internal workflow previews and user-facing final eCards."""

from __future__ import annotations

from dataclasses import dataclass, field
from io import BytesIO
import logging
from textwrap import wrap
from typing import Literal

import httpx
from PIL import Image, ImageDraw, ImageFont, ImageOps

logger = logging.getLogger(__name__)

TemplateName = Literal["minimal", "festive", "elegant", "playful"]
TextAlignment = Literal["left", "center", "right"]


@dataclass(slots=True)
class PreviewCardRenderInput:
    """Rendering input for internal workflow previews."""

    title: str
    message: str
    signoff: str | None
    theme_style: TemplateName
    background_image_url: str | None
    text_alignment: TextAlignment
    export_size: str = "1080x1350"
    theme_name: str = ""
    job_id: str = ""
    status: str = ""
    metadata_lines: list[str] = field(default_factory=list)


@dataclass(slots=True)
class FinalCardRenderInput:
    """Rendering input for user-facing final card exports."""

    title: str | None
    message: str
    signoff: str | None
    theme_style: TemplateName
    background_image_url: str | None
    text_alignment: TextAlignment
    export_size: str = "1080x1350"


@dataclass(frozen=True, slots=True)
class _TemplateStyle:
    top_color: tuple[int, int, int]
    bottom_color: tuple[int, int, int]
    panel_fill: tuple[int, int, int, int]
    title_color: tuple[int, int, int, int]
    body_color: tuple[int, int, int, int]
    accent_color: tuple[int, int, int, int]
    add_shapes: bool


class WorkflowCardRenderer:
    """Create polished card compositions for preview and final asset export."""

    DEFAULT_SIZE = (1080, 1350)
    _TEMPLATES: dict[str, _TemplateStyle] = {
        "minimal": _TemplateStyle(
            top_color=(245, 243, 236),
            bottom_color=(229, 239, 252),
            panel_fill=(255, 255, 255, 232),
            title_color=(28, 36, 52, 255),
            body_color=(35, 43, 57, 255),
            accent_color=(116, 143, 171, 255),
            add_shapes=False,
        ),
        "festive": _TemplateStyle(
            top_color=(255, 234, 206),
            bottom_color=(252, 190, 139),
            panel_fill=(255, 255, 255, 225),
            title_color=(133, 34, 21, 255),
            body_color=(88, 31, 22, 255),
            accent_color=(217, 77, 31, 255),
            add_shapes=True,
        ),
        "elegant": _TemplateStyle(
            top_color=(25, 30, 52),
            bottom_color=(55, 37, 67),
            panel_fill=(248, 245, 238, 225),
            title_color=(30, 26, 22, 255),
            body_color=(52, 45, 39, 255),
            accent_color=(182, 145, 91, 255),
            add_shapes=False,
        ),
        "playful": _TemplateStyle(
            top_color=(228, 250, 255),
            bottom_color=(255, 221, 244),
            panel_fill=(255, 255, 255, 224),
            title_color=(40, 48, 114, 255),
            body_color=(48, 52, 92, 255),
            accent_color=(255, 94, 163, 255),
            add_shapes=True,
        ),
    }

    def render_preview_png(self, payload: PreviewCardRenderInput) -> bytes:
        """Render internal preview card with workflow/debug metadata."""

        width, height = self._parse_export_size(payload.export_size)
        style = self._resolve_template_style(payload.theme_style)
        canvas = self._create_base_canvas(
            width=width,
            height=height,
            style=style,
            background_image_url=payload.background_image_url,
        )
        draw = ImageDraw.Draw(canvas, "RGBA")
        padding = int(width * 0.075)

        self._draw_metadata_header(
            draw=draw,
            width=width,
            height=height,
            payload=payload,
            style=style,
            padding=padding,
        )

        body_top = int(height * 0.26)
        body_height = int(height * 0.60)
        self._draw_message_block(
            draw=draw,
            width=width,
            top=body_top,
            height=body_height,
            title="Internal Preview",
            message=payload.message,
            signoff=payload.signoff,
            alignment=payload.text_alignment,
            style=style,
            padding=padding,
        )
        return self._encode_png(canvas)

    def render_final_png(self, payload: FinalCardRenderInput) -> bytes:
        """Render polished user-facing greeting card without workflow metadata."""

        width, height = self._parse_export_size(payload.export_size)
        style = self._resolve_template_style(payload.theme_style)
        canvas = self._create_base_canvas(
            width=width,
            height=height,
            style=style,
            background_image_url=payload.background_image_url,
        )
        draw = ImageDraw.Draw(canvas, "RGBA")
        padding = int(width * 0.08)

        self._draw_message_block(
            draw=draw,
            width=width,
            top=int(height * 0.16),
            height=int(height * 0.72),
            title=(payload.title or "").strip() or None,
            message=payload.message,
            signoff=payload.signoff,
            alignment=payload.text_alignment,
            style=style,
            padding=padding,
        )
        return self._encode_png(canvas)

    def render_pdf_from_png(self, png_bytes: bytes) -> bytes:
        """Export PDF bytes from already-rendered PNG bytes."""

        with Image.open(BytesIO(png_bytes)) as image:
            output = BytesIO()
            image.convert("RGB").save(output, format="PDF", resolution=100.0)
            return output.getvalue()

    def _create_base_canvas(
        self,
        *,
        width: int,
        height: int,
        style: _TemplateStyle,
        background_image_url: str | None,
    ) -> Image.Image:
        """Build a stylized base canvas with optional background image."""

        canvas = self._build_vertical_gradient(width, height, style.top_color, style.bottom_color)
        background = self._download_background(background_image_url, width, height)
        if background is not None:
            canvas = Image.blend(background, canvas, alpha=0.45)
        if style.add_shapes:
            self._draw_template_shapes(canvas, style)
        return canvas.convert("RGBA")

    def _draw_metadata_header(
        self,
        *,
        draw: ImageDraw.ImageDraw,
        width: int,
        height: int,
        payload: PreviewCardRenderInput,
        style: _TemplateStyle,
        padding: int,
    ) -> None:
        """Draw top metadata panel for internal preview mode."""

        header_height = int(height * 0.18)
        header_box = [(padding, padding), (width - padding, padding + header_height)]
        draw.rounded_rectangle(header_box, radius=28, fill=style.panel_fill)
        title_font = self._load_font(size=int(width * 0.043))
        meta_font = self._load_font(size=int(width * 0.024))
        small_font = self._load_font(size=int(width * 0.019))

        x = padding + int(width * 0.03)
        y = padding + int(height * 0.022)
        draw.text((x, y), payload.title.strip() or "Approval Preview", fill=style.title_color, font=title_font)
        y += int(height * 0.05)
        draw.text((x, y), f"Theme: {payload.theme_name}", fill=style.body_color, font=meta_font)
        y += int(height * 0.031)
        draw.text((x, y), f"Job ID: {payload.job_id} | Status: {payload.status}", fill=style.body_color, font=meta_font)

        metadata = payload.metadata_lines[:3]
        y += int(height * 0.03)
        for item in metadata:
            draw.text((x, y), f"- {item}", fill=style.body_color, font=small_font)
            y += int(height * 0.024)

    def _draw_message_block(
        self,
        *,
        draw: ImageDraw.ImageDraw,
        width: int,
        top: int,
        height: int,
        title: str | None,
        message: str,
        signoff: str | None,
        alignment: TextAlignment,
        style: _TemplateStyle,
        padding: int,
    ) -> None:
        """Draw centered card content panel with hierarchy and safe margins."""

        left = padding
        right = width - padding
        panel_box = [(left, top), (right, top + height)]
        draw.rounded_rectangle(panel_box, radius=34, fill=style.panel_fill)

        inner_left = left + int(width * 0.055)
        inner_right = right - int(width * 0.055)
        inner_top = top + int(height * 0.085)
        inner_bottom = top + height - int(height * 0.08)
        content_width = inner_right - inner_left
        vertical_space = inner_bottom - inner_top

        cursor_y = inner_top
        if title:
            title_font = self._load_font(size=int(width * 0.06))
            title_lines = self._wrap_lines(draw, title, title_font, content_width, max_lines=2)
            title_spacing = max(10, int(title_font.size * 0.25))
            title_height = self._measure_multiline_height(draw, title_lines, title_font, title_spacing)
            self._draw_multiline(
                draw=draw,
                lines=title_lines,
                x_left=inner_left,
                x_right=inner_right,
                y=cursor_y,
                font=title_font,
                spacing=title_spacing,
                fill=style.title_color,
                alignment=alignment,
            )
            cursor_y += title_height + int(height * 0.04)

        body_max_height = vertical_space - (cursor_y - inner_top)
        if signoff:
            body_max_height -= int(height * 0.12)
        body_font, body_lines, body_spacing = self._fit_body_text(
            draw=draw,
            message=message,
            max_width=content_width,
            max_height=max(body_max_height, 150),
            width=width,
        )
        body_height = self._measure_multiline_height(draw, body_lines, body_font, body_spacing)
        self._draw_multiline(
            draw=draw,
            lines=body_lines,
            x_left=inner_left,
            x_right=inner_right,
            y=cursor_y,
            font=body_font,
            spacing=body_spacing,
            fill=style.body_color,
            alignment=alignment,
        )
        cursor_y += body_height + int(height * 0.05)

        if signoff:
            signoff_font = self._load_font(size=max(24, int(width * 0.028)))
            signoff_text = signoff.strip()
            if signoff_text:
                self._draw_multiline(
                    draw=draw,
                    lines=[signoff_text],
                    x_left=inner_left,
                    x_right=inner_right,
                    y=min(cursor_y, inner_bottom - int(height * 0.08)),
                    font=signoff_font,
                    spacing=0,
                    fill=style.accent_color,
                    alignment=alignment,
                )

    def _fit_body_text(
        self,
        *,
        draw: ImageDraw.ImageDraw,
        message: str,
        max_width: int,
        max_height: int,
        width: int,
    ) -> tuple[ImageFont.ImageFont, list[str], int]:
        """Wrap and scale body text so it fits without overflow."""

        text = message.strip() or "Warm wishes."
        initial = max(28, int(width * 0.04))
        minimum = 20
        max_lines = 14

        for size in range(initial, minimum - 1, -2):
            font = self._load_font(size=size)
            lines = self._wrap_lines(draw, text, font, max_width, max_lines=max_lines)
            spacing = max(8, int(size * 0.3))
            total_height = self._measure_multiline_height(draw, lines, font, spacing)
            if total_height <= max_height:
                return font, lines, spacing

        fallback_font = self._load_font(size=minimum)
        lines = self._wrap_lines(draw, text, fallback_font, max_width, max_lines=max_lines, truncate=True)
        spacing = max(8, int(minimum * 0.3))
        return fallback_font, lines, spacing

    def _wrap_lines(
        self,
        draw: ImageDraw.ImageDraw,
        text: str,
        font: ImageFont.ImageFont,
        max_width: int,
        *,
        max_lines: int,
        truncate: bool = False,
    ) -> list[str]:
        """Wrap text into lines that fit width constraints."""

        words = text.split()
        if not words:
            return [""]

        lines: list[str] = []
        current = words[0]
        for word in words[1:]:
            candidate = f"{current} {word}"
            if draw.textlength(candidate, font=font) <= max_width:
                current = candidate
                continue
            lines.append(current)
            current = word
        lines.append(current)

        wrapped: list[str] = []
        for line in lines:
            if draw.textlength(line, font=font) <= max_width:
                wrapped.append(line)
                continue
            avg_char_width = max(draw.textlength("ABCDEFGHIJKLMNOPQRSTUVWXYZ", font=font) / 26, 1)
            char_count = max(1, int(max_width / avg_char_width))
            wrapped.extend(wrap(line, width=char_count))

        if len(wrapped) <= max_lines:
            return wrapped
        clipped = wrapped[:max_lines]
        if truncate:
            clipped[-1] = self._ellipsis_line(draw=draw, line=clipped[-1], font=font, max_width=max_width)
        return clipped

    def _draw_multiline(
        self,
        *,
        draw: ImageDraw.ImageDraw,
        lines: list[str],
        x_left: int,
        x_right: int,
        y: int,
        font: ImageFont.ImageFont,
        spacing: int,
        fill: tuple[int, int, int, int],
        alignment: TextAlignment,
    ) -> None:
        """Render multiline text with the requested alignment."""

        current_y = y
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            line_width = bbox[2] - bbox[0]
            line_height = bbox[3] - bbox[1]
            x = x_left
            if alignment == "center":
                x = x_left + ((x_right - x_left - line_width) // 2)
            elif alignment == "right":
                x = x_right - line_width
            draw.text((x, current_y), line, font=font, fill=fill)
            current_y += line_height + spacing

    @staticmethod
    def _measure_multiline_height(
        draw: ImageDraw.ImageDraw,
        lines: list[str],
        font: ImageFont.ImageFont,
        spacing: int,
    ) -> int:
        """Calculate total height of a multiline text block."""

        heights = []
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            heights.append(bbox[3] - bbox[1])
        if not heights:
            return 0
        return sum(heights) + spacing * max(0, len(heights) - 1)

    @staticmethod
    def _ellipsis_line(
        *,
        draw: ImageDraw.ImageDraw,
        line: str,
        font: ImageFont.ImageFont,
        max_width: int,
    ) -> str:
        """Truncate a single line and append ellipsis if needed."""

        candidate = line.strip()
        if draw.textlength(candidate, font=font) <= max_width:
            return candidate
        suffix = "..."
        while candidate and draw.textlength(f"{candidate}{suffix}", font=font) > max_width:
            candidate = candidate[:-1]
        return f"{candidate}{suffix}" if candidate else suffix

    def _download_background(self, url: str | None, width: int, height: int) -> Image.Image | None:
        """Fetch optional background image and resize to canvas."""

        if not url:
            return None
        try:
            with httpx.Client(timeout=8.0, follow_redirects=True) as client:
                response = client.get(url)
                response.raise_for_status()
            image = Image.open(BytesIO(response.content)).convert("RGB")
            return ImageOps.fit(image, (width, height), method=Image.Resampling.LANCZOS)
        except Exception as exc:  # noqa: BLE001
            logger.warning("background image download failed url=%s error=%s", url, exc)
            return None

    @classmethod
    def _resolve_template_style(cls, template_name: str) -> _TemplateStyle:
        """Resolve style config for one supported template."""

        return cls._TEMPLATES.get(template_name.strip().lower(), cls._TEMPLATES["minimal"])

    @staticmethod
    def _build_vertical_gradient(
        width: int,
        height: int,
        top_color: tuple[int, int, int],
        bottom_color: tuple[int, int, int],
    ) -> Image.Image:
        """Create a smooth vertical gradient background image."""

        base = Image.new("RGB", (width, height), top_color)
        pixels = base.load()
        for y in range(height):
            mix = y / max(height - 1, 1)
            r = int(top_color[0] + (bottom_color[0] - top_color[0]) * mix)
            g = int(top_color[1] + (bottom_color[1] - top_color[1]) * mix)
            b = int(top_color[2] + (bottom_color[2] - top_color[2]) * mix)
            for x in range(width):
                pixels[x, y] = (r, g, b)
        return base

    @staticmethod
    def _draw_template_shapes(canvas: Image.Image, style: _TemplateStyle) -> None:
        """Add a few decorative circles for festive/playful templates."""

        draw = ImageDraw.Draw(canvas, "RGBA")
        width, height = canvas.size
        accent = style.accent_color
        draw.ellipse(
            (int(width * 0.03), int(height * 0.05), int(width * 0.21), int(height * 0.20)),
            fill=(accent[0], accent[1], accent[2], 65),
        )
        draw.ellipse(
            (int(width * 0.78), int(height * 0.12), int(width * 0.96), int(height * 0.27)),
            fill=(accent[0], accent[1], accent[2], 58),
        )
        draw.ellipse(
            (int(width * 0.82), int(height * 0.78), int(width * 0.98), int(height * 0.94)),
            fill=(accent[0], accent[1], accent[2], 46),
        )

    @classmethod
    def _parse_export_size(cls, export_size: str) -> tuple[int, int]:
        """Parse WxH export string with defaults and guard rails."""

        raw = (export_size or "").strip().lower()
        if "x" not in raw:
            return cls.DEFAULT_SIZE
        try:
            width_str, height_str = raw.split("x", 1)
            width = max(600, int(width_str))
            height = max(800, int(height_str))
            return width, height
        except ValueError:
            return cls.DEFAULT_SIZE

    @staticmethod
    def _load_font(*, size: int) -> ImageFont.ImageFont:
        """Return an available font with fallback."""

        for font_name in ("DejaVuSans.ttf", "Arial.ttf", "Helvetica.ttf"):
            try:
                return ImageFont.truetype(font_name, size=size)
            except OSError:
                continue
        return ImageFont.load_default()

    @staticmethod
    def _encode_png(image: Image.Image) -> bytes:
        """Encode a composed card as optimized PNG bytes."""

        output = BytesIO()
        image.convert("RGBA").save(output, format="PNG", optimize=True)
        return output.getvalue()
