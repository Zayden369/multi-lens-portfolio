"""Render the approved local résumé for the in-page document viewer.

Requires pypdfium2 and Pillow. The original PDF remains the download source.
Run from the repository root with: python tools/render_resume.py
"""

from pathlib import Path

import pypdfium2 as pdfium


root = Path(__file__).resolve().parents[1]
source = root / "assets" / "abhishek-resume.pdf"
with pdfium.PdfDocument(source) as document:
    if len(document) != 1:
        raise ValueError("The current viewer expects the supplied single-page résumé.")
    page = document[0]
    try:
        bitmap = page.render(scale=2)
        bitmap.to_pil().save(root / "assets" / "resume-page-1.png")
        bitmap.close()
    finally:
        page.close()
print("Rendered assets/resume-page-1.png")
