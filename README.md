# Project Multiverse

Buildless HTML, CSS, and JavaScript portfolio. Bohemian is the default. Nine visual lenses share the portfolio content, chapter anchors, project examples, and résumé.

Run a static server from this directory: `python -m http.server 4174 --bind 127.0.0.1`. Open http://127.0.0.1:4174.

Vercel preview release: https://abhishek-gupta-portfolio-orpin.vercel.app/. This was uploaded through Vercel Drop, so later local edits need a new deployment.

The latest résumé identifies the AWS Student Builder Group role as community membership. The timeline also includes the Maincraft Technologies internship and the résumé’s competition and hackathon achievements. The GitHub contribution counts are a historical snapshot. To enable the Résumé actions on a local checkout, place your approved PDF at `assets/abhishek-resume.pdf`. The source branch excludes the supplied PDF because it contains personal contact information.

Sketchbook references ten local font faces under `reference-fonts/`. These downloaded font files are not committed because their licenses restrict redistribution. To see Sketchbook as designed in a local checkout, place the original downloaded fonts in the paths listed by the `@font-face` rules at the top of `style.css`. Other modes work without them; the browser falls back to its default fonts in Sketchbook until those files are present. The [deployed preview](https://abhishek-gupta-portfolio-orpin.vercel.app/) includes the fonts for visual review.

| Lens | Prologue and project motion |
| --- | --- |
| Bohemian | Botanical journal turns open. Project notes tilt into place. |
| Modern | Blueprint grid and scanning doors separate. Project interfaces tilt forward. |
| Retro | A vinyl record rolls into a vintage television. Project graphics slide in like prints. |
| Pixel | A sprite advances as the gate retracts in steps. Project content rises into place. |
| Vector | Four curved forms reshape as they move outward. Project graphics straighten into position. |
| 3D | A perspective camera moves through a star field and layered wireframes. Project cards move forward in depth. |
| Sketchbook | A pencil trace draws a doorway onto ruled paper. Project notes slide and straighten. |
| Editorial | A magazine cover folds open. Project spreads pivot on their edges. |
| Victorian | Brass gears turn and separate inside a circular archive. Project records scale into view. |

Every lens uses the same scroll progress and chapter navigator. On narrower or shorter views the prologue and project visuals return to normal document flow. Reduced motion disables scroll transforms and opens the PDF viewer immediately. The 3D prologue projects spatial coordinates into a 2D canvas and does not require WebGL.

The local résumé cinematic uses the exact supplied 9.45-second, 1280×720 JJK MP4. Place it at `assets/resume-cinematic.mp4`. The file is ignored by Git pending distribution-rights review. Clicking Résumé lazily loads the file and plays it once at its original timing, with contained aspect ratio on a dark full-screen background. Completion, skip, or playback failure opens a full-resolution rendering of the supplied résumé. Open PDF and Download PDF use the original document. Closing releases media resources. Reduced motion goes directly to the document. After placing the PDF locally, run `python tools/render_resume.py` with pypdfium2 and Pillow installed to generate the viewer page. Generated résumé images stay local with the PDF.

Project walkthroughs progress with scrolling through sticky project scenes. The compiler story has five stages, from requirement through intent, schemas, validation, and an illustrative reading dashboard. TrustShare follows authentication and protected access. StadiumPulse shows a crowd zone and route. The Monte Carlo example calculates its estimate from sampled points. Each frame derives from section geometry. Scrolling backward reverses the sequence, and plateaus allow time to read each stage. Narrow layouts delay progress until the project visual reaches the screen.
