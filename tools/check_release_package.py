"""Check both publication configurations against the actual release assets."""
from contextlib import redirect_stdout
import hashlib
from io import StringIO
from pathlib import Path
import re
from unittest.mock import patch

import prepare_vercel_release as release


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


original_html = digest(release.ROOT / "index.html")
with redirect_stdout(StringIO()):
    direct = release.prepare(include_resume=True)
    cinematic = release.prepare(include_resume=True, include_cinematic=True)
direct_path, cinematic_path = Path(direct["directory"]), Path(cinematic["directory"])
assert 'data-resume-cinematic="disabled"' in (direct_path / "index.html").read_text(encoding="utf8")
assert not (direct_path / "assets/resume-cinematic.mp4").exists()
assert not (direct_path / "assets/resume-final-frame.png").exists()
cinematic_html = (cinematic_path / "index.html").read_text(encoding="utf8")
assert 'data-resume-cinematic="enabled"' in cinematic_html
assert "?v=editorial-1" not in cinematic_html
for asset in ["assets/abhishek-resume.pdf", "assets/resume-cinematic.mp4", "assets/resume-final-frame.png", "resume-cinematic.js", "resume-cinematic.css"]:
    assert digest(cinematic_path / asset) == digest(release.ROOT / asset), asset
for url in re.findall(r'(?:src|href)="([^"]+\.(?:js|css)[^"]*)"', cinematic_html):
    assert "v=" + cinematic["source_commit"][:12] in url, url
for folder in [".git", "reference-fonts", "review-evidence", "tools", ".reference-review"]:
    assert not (cinematic_path / folder).exists(), folder
assert digest(release.ROOT / "index.html") == original_html
try:
    release.prepare(include_cinematic=True)
    raise AssertionError("Cinematic without its resume should fail")
except ValueError:
    pass
actual_is_file = Path.is_file
with patch.object(Path, "is_file", lambda path: False if path.name == "resume-final-frame.png" else actual_is_file(path)):
    try:
        release.prepare(include_resume=True, include_cinematic=True)
        raise AssertionError("Missing fallback asset should fail before producing a release")
    except FileNotFoundError:
        pass
print("Release package checks passed: opted-in cinematic, exact media/PDF/runtime bytes, versioned assets, default direct-PDF release, missing-file guards and private checkout exclusion.")
