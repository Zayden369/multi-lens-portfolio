"""Prepare an allowlisted static release; never upload the checkout or private video."""
import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def prepare(include_resume=False):
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
    # The private checkout retains its exact supplied-video interaction. Public releases
    # open the actual resume immediately, without requesting copyrighted footage.
    html_path = target / "index.html"
    html = html_path.read_text(encoding="utf-8")
    marker = '<html lang="en" data-mode="boho">'
    if html.count(marker) != 1:
        raise ValueError("Unexpected HTML root; refusing an unconfigured public release")
    html_path.write_text(html.replace(marker, '<html lang="en" data-mode="boho" data-resume-cinematic="disabled">'), encoding="utf-8")
    if include_resume:
        for name in ("assets/abhishek-resume.pdf",):
            src = ROOT / name
            if not src.is_file():
                raise FileNotFoundError("Approved resume artifact is missing: " + name)
            dest = target / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
            copied.append(name)
    config = {"$schema": "https://openapi.vercel.sh/vercel.json", "framework": None, "buildCommand": None, "outputDirectory": ".", "cleanUrls": False}
    (target / "vercel.json").write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
    assert not list(target.rglob("*.mp4"))
    assert not (target / ".git").exists()
    assert not (target / "reference-fonts").exists()
    assert not (target / "review-evidence").exists()
    result = {"directory": str(target), "source_commit": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(), "files": len(copied) + 1, "resume_included": include_resume, "cinematic": "disabled", "private_video_included": False}
    print(json.dumps(result))
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--include-resume", action="store_true", help="Include the owner-approved original PDF; private footage and its final-frame image remain excluded")
    prepare(parser.parse_args().include_resume)
