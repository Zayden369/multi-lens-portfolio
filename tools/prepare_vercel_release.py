"""Prepare an allowlisted static release with explicit cinematic publication opt-in."""
import argparse
from datetime import datetime, timezone
import json
import re
from pathlib import Path
import shutil
import subprocess
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parents[1]


def prepare(include_resume=False, include_cinematic=False):
    if include_cinematic and not include_resume:
        raise ValueError("Cinematic publication requires --include-resume")
    local_assets = ["assets/abhishek-resume.pdf"] if include_resume else []
    if include_cinematic:
        local_assets += ["assets/resume-cinematic.mp4", "assets/resume-final-frame.png"]
    for name in local_assets:
        if not (ROOT / name).is_file():
            raise FileNotFoundError("Approved release asset is missing: " + name)
    source_commit = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip()
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S-%f")
    target = ROOT / ".reference-review" / ("vercel-release-" + stamp)
    target.mkdir(parents=True, exist_ok=False)
    tracked = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
    copied = []
    for name in tracked:
        if not name:
            continue
        path = Path(name)
        allowed = (len(path.parts) == 1 and (path.suffix in {".html", ".css", ".js"} or name == "favicon.svg")) or path.parts[0] in {"assets", "vendor"}
        if not allowed or path.suffix.lower() in {".mp4", ".zip", ".pdf", ".png"}:
            continue
        dest = target / path
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / path, dest)
        copied.append(name)
    # Cinematic publication is an explicit owner decision. Ordinary packages retain
    # direct PDF access; an opted-in package includes the exact local media files.
    html_path = target / "index.html"
    html = html_path.read_text(encoding="utf-8")
    marker = '<html lang="en" data-mode="boho">'
    if html.count(marker) != 1:
        raise ValueError("Unexpected HTML root; refusing an unconfigured public release")
    cinematic = "enabled" if include_cinematic else "disabled"
    html = html.replace(marker, f'<html lang="en" data-mode="boho" data-resume-cinematic="{cinematic}">')
    # Revalidate each release's own scripts and styles as a coherent version.
    # The old constant ?v=editorial-1 must not survive across controller changes.
    def version_asset(match):
        attribute, value = match.groups()
        url = urlsplit(value)
        if url.scheme or url.netloc or not url.path.endswith((".js", ".css")):
            return match.group(0)
        query = [(key, val) for key, val in parse_qsl(url.query) if key != "v"]
        query.append(("v", source_commit[:12]))
        return f'{attribute}="{urlunsplit((url.scheme, url.netloc, url.path, urlencode(query), url.fragment))}"'
    html = re.sub(r'(src|href)="([^\"]+)"', version_asset, html)
    html_path.write_text(html, encoding="utf-8")
    for name in local_assets:
        dest = target / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / name, dest)
        copied.append(name)
    config = {"$schema": "https://openapi.vercel.sh/vercel.json", "framework": None, "buildCommand": None, "outputDirectory": ".", "cleanUrls": False}
    (target / "vercel.json").write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
    assert list(target.rglob("*.mp4")) == ([target / "assets/resume-cinematic.mp4"] if include_cinematic else [])
    assert (target / "assets/resume-final-frame.png").exists() == include_cinematic
    assert not (target / ".git").exists()
    assert not (target / "reference-fonts").exists()
    assert not (target / "review-evidence").exists()
    result = {"directory": str(target), "source_commit": source_commit, "files": len(copied) + 1, "resume_included": include_resume, "cinematic": cinematic, "cinematic_assets_included": include_cinematic}
    print(json.dumps(result))
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--include-resume", action="store_true", help="Include the owner-approved original PDF; private footage and its final-frame image remain excluded")
    parser.add_argument("--include-cinematic", action="store_true", help="Publish the owner-authorized supplied MP4 and exact final frame and enable the full cinematic; requires --include-resume")
    args = parser.parse_args()
    if args.include_cinematic and not args.include_resume:
        parser.error("--include-cinematic requires --include-resume")
    prepare(args.include_resume, args.include_cinematic)
