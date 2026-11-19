# Project Multiverse

Buildless HTML, CSS, and JavaScript portfolio. Bohemian is the default. Nine visual lenses share the portfolio content, chapter anchors, project examples, and résumé.

Run a static server from this directory: `python -m http.server 4174 --bind 127.0.0.1`. Open http://127.0.0.1:4174.

Vercel production: https://abhishek-gupta-portfolio-orpin.vercel.app/. The existing project is `abhishek-gupta-portfolio` in the owner's Vercel account. It is not connected to GitHub, so pushing or merging alone does not publish changes.

Prepare an allowlisted public release with `python tools/prepare_vercel_release.py --include-resume`, then deploy the returned directory to that existing project using `vercel deploy <directory> --prod --yes --project abhishek-gupta-portfolio --scope <owner-team>`. This includes the owner-approved local résumé PDF and rendered page; their files remain excluded from Git. The public HTML explicitly disables the cinematic and opens the résumé directly. The original supplied-video experience remains available in the private checkout. The package excludes the anime MP4, restricted downloaded fonts, Git metadata, local review evidence and development dependencies.

The latest résumé identifies the AWS Student Builder Group role as community membership. The timeline also includes the Maincraft Technologies internship and the résumé’s competition and hackathon achievements. The GitHub contribution counts are a historical snapshot. To enable the Résumé actions on a local checkout, place your approved PDF at `assets/abhishek-resume.pdf`. The source branch excludes the supplied PDF because it contains personal contact information.

Sketchbook now uses the original **Notebook Draft** display alphabet included in `assets/notebook-draft.ttf`, with system sans-serif body copy and monospaced technical labels. Rebuild it with `python tools/build_drafting_font.py` (no dependencies). The legacy downloaded font definitions remain in `style.css`, but the redesigned Sketchbook does not depend on those files. Their personal-use/redistribution restrictions still apply, and `reference-fonts/` remains ignored. The older deployed preview does not contain this local redesign.

| Lens | Prologue and project motion |
| --- | --- |
| Bohemian | Botanical journal turns open. Project notes tilt into place. |
| Modern | Blueprint grid and scanning doors separate. Project interfaces tilt forward. |
| Retro | A vinyl record rolls into a vintage television. Project graphics slide in like prints. |
| Pixel | A sprite advances as the gate retracts in steps. Project content rises into place. |
| Vector | Four curved forms reshape as they move outward. Project graphics straighten into position. |
| 3D | The Museum of Making: a Three.js camera enters an architectural gallery and tours a secure archive, application workshop, stadium model, probability table, and experience corridor. |
| Sketchbook | The Inventor's Notebook: a drafting sheet develops into a sharing blueprint, an application sketch becomes an HTML dashboard, a stadium plan is constructed, and real sample points form a numerical experiment. A pencil follows the pinned experience timeline. |
| Editorial | The Engineer's Edition: a cover opens into a feature spread, followed by full-width security, application, stadium, and probability stories. A pinned profile and toolkit complete the issue. Post-change browser visual QA is pending; see `EDITORIAL_REVIEW.md`. |
| Victorian | The Mechanical Archive: carved doors unlock, a document vault opens, a paper-fed automaton assembles an application, a stadium model explains routes, and a probability instrument plots computed samples. Native scroll drives the mechanisms. |

Every lens uses the shared scroll scheduler and chapter navigator. Completed lens controllers provide their own responsive story layouts and reduced-motion alternatives. Reduced motion opens the PDF viewer immediately. The 3D lens lazily loads the locally bundled Three.js runtime and uses one WebGL renderer, with an illustrated architectural fallback when rendering is unavailable. Its GPU resources are disposed when leaving the lens. See `MUSEUM_ART_DIRECTION.md` and `MUSEUM_REVIEW.md` for the architectural direction and actual verification record.

Sketchbook uses original SVG illustrations, progress-controlled stroke drawing, separate narrow-screen compositions, and accessible HTML project facts and drawing transcripts. Its controller listens to the shared scheduler only while selected. Opening, project, and experience scenes pin with native scrolling; reduced motion presents their completed states in normal flow. Mobile supporting chapters also use normal document flow. See `SKETCHBOOK_DIRECTION.md` and `SKETCHBOOK_REVIEW.md` for the illustration system, storyboards, evidence, and verification limits. No additional animation or rendering library is required.

Editorial uses original SVG feature illustrations and labelled illustrative HTML interfaces, with the original project facts and links in normal flow after each feature. Instrument Serif is locally hosted with its SIL OFL and provenance in `assets/fonts/instrument-serif/`. No new runtime library is required. `EDITORIAL_DIRECTION.md` contains the design/storyboard; `EDITORIAL_REVIEW.md` distinguishes source/DOM verification from the still-pending browser visual review. A manual scene review is available locally at `/.reference-review/editorial.html` in this checkout (ignored development artifact).

Editorial logic checks run with `node tools/check_editorial_dom.mjs` after installing the isolated test dependency using `npm install --prefix .reference-review/editorial-test --no-save --ignore-scripts --no-audit --no-fund linkedom@0.18.12`. These use a DOM implementation and synthetic geometry; they do not render CSS, prove pinning/framing, or replace browser QA. Test packages and generated observations remain ignored.

The local résumé cinematic uses the exact supplied 9.45-second, 1280×720 JJK MP4. Place it at `assets/resume-cinematic.mp4`. The file is ignored by Git pending distribution-rights review. Clicking Résumé lazily loads the file and plays it once at its original timing, with contained aspect ratio on a dark full-screen background. Completion, skip, or playback failure opens a full-resolution rendering of the supplied résumé. Open PDF and Download PDF use the original document. Closing releases media resources. Reduced motion goes directly to the document. After placing the PDF locally, run `python tools/render_resume.py` with pypdfium2 and Pillow installed to generate the viewer page. Generated résumé images stay local with the PDF.

Project walkthroughs progress with scrolling through sticky project scenes. The compiler story has five stages, from requirement through intent, schemas, validation, and an illustrative reading dashboard. TrustShare follows authentication and protected access. StadiumPulse shows a crowd zone and route. The Monte Carlo example calculates its estimate from sampled points. Each frame derives from section geometry. Scrolling backward reverses the sequence, and plateaus allow time to read each stage. Narrow layouts delay progress until the project visual reaches the screen.
