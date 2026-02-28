"""Pillow-powered card assembly service for production and preview images."""

from __future__ import annotations

from io import BytesIO
import math
from textwrap import wrap

from fastapi import HTTPException
import httpx
from PIL import Image, ImageColor, ImageDraw, ImageFont, ImageOps, UnidentifiedImageError


class PillowService:
    """Assemble production-ready card images entirely in memory."""

    PRODUCTION_SIZE = 2100
    PREVIEW_SIZE = 800
    BORDER_WIDTH = 40
    OVERLAY_RATIO = 0.30
    WATERMARK_TEXT = "\u00a9 eCard Factory"
    DEFAULT_BORDER = "#1F2937"
    DEFAULT_OVERLAY_ALPHA = 153

    async def assemble_card(
        self,
        image_url: str,
        phrase: str,
        theme_name: str,
        color_palette: list[str],
        visual_style: str,
        card_id: int,
    ) -> bytes:
        """Download, decorate, and render a full-resolution production PNG card."""

        image = await self._download_image(image_url=image_url)
        composed = self._compose_image(
            image=image,
            phrase=phrase,
            color_palette=color_palette,
            size=self.PRODUCTION_SIZE,
            include_watermark=True,
        )

        return self._export_png(composed)

    async def create_preview(
        self,
        image_url: str,
        phrase: str,
        color_palette: list[str],
    ) -> bytes:
        """Create a lighter JPEG preview image for chat and review workflows."""

        image = await self._download_image(image_url=image_url)
        composed = self._compose_image(
            image=image,
            phrase=phrase,
            color_palette=color_palette,
            size=self.PREVIEW_SIZE,
            include_watermark=False,
        )

        return self._export_jpeg(composed)

    def _wrap_text(self, text: str, font, max_width: int, draw) -> list[str]:
        """Wrap text into multiple lines that fit within the target width."""

        words = text.split()
        if not words:
            return [""]

        lines: list[str] = []
        current_line = words[0]

        for word in words[1:]:
            candidate = f"{current_line} {word}"
            if draw.textlength(candidate, font=font) <= max_width:
                current_line = candidate
            else:
                lines.append(current_line)
                current_line = word

        lines.append(current_line)

        # If a single word still exceeds the width, fall back to a simple
        # character-count wrap so extremely long tokens do not overflow.
        wrapped_lines: list[str] = []
        for line in lines:
            if draw.textlength(line, font=font) <= max_width:
                wrapped_lines.append(line)
                continue

            avg_char_width = max(draw.textlength("ABCDEFGHIJKLMNOPQRSTUVWXYZ", font=font) / 26, 1)
            max_chars = max(1, math.floor(max_width / avg_char_width))
            wrapped_lines.extend(wrap(line, width=max_chars))

        return wrapped_lines

    def _auto_font_size(self, phrase: str) -> int:
        """Return a font size based on the phrase word count."""

        word_count = len(phrase.split())
        if word_count <= 8:
            return 72
        if word_count <= 15:
            return 56
        return 44

    async def _download_image(self, image_url: str) -> Image.Image:
        """Download an image and return it as a Pillow image object."""

        try:
            async with httpx.AsyncClient(timeout=20.0, follow_redirects=True) as client:
                response = await client.get(image_url)
                response.raise_for_status()
        except httpx.HTTPError as exc:
            raise HTTPException(status_code=502, detail=f"Failed to download image: {exc}") from exc

        try:
            return Image.open(BytesIO(response.content)).convert("RGBA")
        except UnidentifiedImageError as exc:
            raise HTTPException(status_code=422, detail="Downloaded file is not a valid image") from exc

    def _compose_image(
        self,
        *,
        image: Image.Image,
        phrase: str,
        color_palette: list[str],
        size: int,
        include_watermark: bool,
    ) -> Image.Image:
        """Resize, decorate, and render the source image into the final card."""

        border_color = self._safe_color(color_palette[0] if color_palette else self.DEFAULT_BORDER)
        bordered_size = size - (self.BORDER_WIDTH * 2)
        canvas = Image.new("RGBA", (size, size), border_color)
        fitted = ImageOps.fit(image, (bordered_size, bordered_size), method=Image.Resampling.LANCZOS)
        canvas.paste(fitted, (self.BORDER_WIDTH, self.BORDER_WIDTH))

        overlay_height = int(size * self.OVERLAY_RATIO)
        self._apply_bottom_gradient(
            image=canvas,
            overlay_top=size - overlay_height,
            overlay_bottom=size,
            max_alpha=self.DEFAULT_OVERLAY_ALPHA,
        )

        draw = ImageDraw.Draw(canvas, "RGBA")
        font_size = self._scaled_font_size(size=size, base_size=self._auto_font_size(phrase))
        font = self._get_font(font_size)
        max_width = int(size * 0.80)
        lines = self._wrap_text(phrase, font, max_width, draw)
        self._draw_centered_text(
            draw=draw,
            lines=lines,
            font=font,
            center_x=size // 2,
            top=size - overlay_height,
            height=overlay_height,
            fill=(255, 255, 255, 255),
        )

        if include_watermark:
            watermark_font = self._get_font(self._scaled_font_size(size=size, base_size=24))
            self._draw_watermark(draw=draw, size=size, font=watermark_font)

        return canvas

    def _apply_bottom_gradient(
        self,
        *,
        image: Image.Image,
        overlay_top: int,
        overlay_bottom: int,
        max_alpha: int,
    ) -> None:
        """Apply a dark vertical gradient over the bottom text area."""

        gradient = Image.new("RGBA", image.size, (0, 0, 0, 0))
        gradient_draw = ImageDraw.Draw(gradient, "RGBA")
        height = max(overlay_bottom - overlay_top, 1)

        for index in range(height):
            alpha = int(max_alpha * ((index + 1) / height))
            y = overlay_top + index
            gradient_draw.line(
                [(0, y), (image.width, y)],
                fill=(0, 0, 0, alpha),
                width=1,
            )

        image.alpha_composite(gradient)

    def _draw_centered_text(
        self,
        *,
        draw: ImageDraw.ImageDraw,
        lines: list[str],
        font,
        center_x: int,
        top: int,
        height: int,
        fill: tuple[int, int, int, int],
    ) -> None:
        """Draw multiline text centered inside the overlay region."""

        spacing = max(10, font.size // 4) if hasattr(font, "size") else 10
        line_metrics = [draw.textbbox((0, 0), line, font=font) for line in lines]
        total_height = sum(metric[3] - metric[1] for metric in line_metrics)
        total_height += spacing * max(0, len(lines) - 1)
        current_y = top + ((height - total_height) / 2)

        for line, metric in zip(lines, line_metrics, strict=False):
            line_width = metric[2] - metric[0]
            line_height = metric[3] - metric[1]
            draw.text(
                (center_x - (line_width / 2), current_y),
                line,
                font=font,
                fill=fill,
                align="center",
            )
            current_y += line_height + spacing

    def _draw_watermark(self, *, draw: ImageDraw.ImageDraw, size: int, font) -> None:
        """Render the service watermark in the bottom-right corner."""

        bbox = draw.textbbox((0, 0), self.WATERMARK_TEXT, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        padding = max(18, size // 50)
        draw.text(
            (size - text_width - padding, size - text_height - padding),
            self.WATERMARK_TEXT,
            font=font,
            fill=(255, 255, 255, 178),
        )

    def _get_font(self, size: int):
        """Return a clean sans-serif font if available, else Pillow's default."""

        for font_name in ("DejaVuSans.ttf", "Arial.ttf", "Helvetica.ttf"):
            try:
                return ImageFont.truetype(font_name, size=size)
            except OSError:
                continue

        return ImageFont.load_default()

    def _scaled_font_size(self, *, size: int, base_size: int) -> int:
        """Scale reference font sizes from 2100px production to the target size."""

        return max(18, round(base_size * (size / self.PRODUCTION_SIZE)))

    def _safe_color(self, color_value: str) -> str:
        """Validate and normalize a color string, falling back if invalid."""

        try:
            ImageColor.getrgb(color_value)
            return color_value
        except ValueError:
            return self.DEFAULT_BORDER

    def _export_png(self, image: Image.Image) -> bytes:
        """Encode the final production card as a PNG under Etsy-friendly size limits."""

        output = BytesIO()
        candidate = image
        candidate.save(output, format="PNG", optimize=True, compress_level=9)
        png_bytes = output.getvalue()

        if len(png_bytes) <= 3 * 1024 * 1024:
            return png_bytes

        quantized = candidate.convert("P", palette=Image.Palette.ADAPTIVE, colors=256)
        output = BytesIO()
        quantized.save(output, format="PNG", optimize=True, compress_level=9)
        png_bytes = output.getvalue()

        return png_bytes

    def _export_jpeg(self, image: Image.Image) -> bytes:
        """Encode the preview as a compact JPEG for chat delivery."""

        output = BytesIO()
        image.convert("RGB").save(
            output,
            format="JPEG",
            quality=88,
            optimize=True,
            progressive=True,
        )
        return output.getvalue()
