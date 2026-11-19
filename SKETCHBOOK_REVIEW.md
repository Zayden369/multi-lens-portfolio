# Sketchbook — The Inventor's Notebook

Implemented and inspected locally on 19 November 2026, based on Museum commit `658a987`. Feature branch: `codex/sketchbook-inventors-notebook`. No merge or deployment is included.

## What changed

The old Sketchbook combined ten decorative font faces with ruled backgrounds, a small notebook canvas, and generic project graphics. The browser baseline showed compressed, difficult-to-scan navigation and body text. The replacement makes the drawing process the main experience: a substantial drafting surface, original technical illustrations constructed by scroll, an application blueprint becoming a readable HTML interface, and a continuous pencil-led experience journey.

The audit, illustration rules, palette, and pre-build storyboards are in [SKETCHBOOK_DIRECTION.md](SKETCHBOOK_DIRECTION.md). The primary palette is natural paper, graphite, drafting blue, pale construction blue, and restrained technical red. Consistent outline, construction, dimension, and shading weights distinguish structural information from guidance. A quiet grid and margin rule establish the surface without a continuous noise filter or decorative doodles.

### Typography and assets

- **Notebook Draft** is an original monoline display alphabet, authored as centerlines and generated into a 14,692-byte TrueType file by `tools/build_drafting_font.py`. It contains no glyph outlines from the downloaded fonts. Lowercase deliberately maps to capitals; it is used for short titles, not descriptions or controls.
- Information and navigation use system sans-serif; technical labels use system monospace. Browser computed styles confirmed Arial for body/navigation and NotebookDraft for the display hierarchy. Short-phone timeline body text measured 16px.
- Rebuilding the font produced the same SHA-256: `CD978C38B324886736FA262ED8C3331273689CB9111271303B4AC1E1AA2F4968`. Its source and generated asset can be redistributed with the project; provenance is recorded in `assets/notebook-art.txt`.
- The original downloaded font files remain ignored. Their personal-use/redistribution restrictions were inspected; the new Sketchbook does not depend on them. Existing font definitions remain intact for the legacy implementation.
- Illustrations are original authored SVG, CSS, and HTML. No image library, stock drawing, animation framework, new 3D dependency, or external font service was added. The existing dependency-free font-packing helper is reused.

## Scene-by-scene result

| Scene | Illustration and meaningful construction | Browser review / remaining simplification |
| --- | --- | --- |
| Opening | A large drafting sheet starts with construction marks. A deliberate stroke becomes part of the sharing connection; sender, authentication boundary, recipient, and data layer are drawn. At 80%, Abhishek's identity and “IDEAS ARE A START. I MAKE THEM WORK.” appear. The completed drawing introduces TrustShare. | Inspected at 0/20/40/60/80/100%, with phases 0–5 and a pinned top around 0px. Initial header clearance and an aspect-ratio board keep title, paper, drawing, and footer aligned. The diagram is reused in the first project to maintain the visual handoff; the selected-work introduction still provides a normal HTML chapter boundary. |
| TrustShare | Sender/file → authentication → application/storage connections → link rules → document delivery → completed conceptual architecture. React, FastAPI, PostgreSQL, password, expiry, view-limit, and revocation information comes from the existing portfolio. | Recognizable workstations, document, lock, and database. No invented backend services. The drawing is explicitly conceptual, rather than a claimed production network topology. Mobile rearranges the system vertically and places detailed rules in the readable stage caption/transcript. |
| AI Application Compiler | A reading-progress requirement and rough wireframe become intent, UI/data/API configuration, validation and illustrative numeric repair, aligned interface components, then a polished HTML Reading room dashboard. | Inspected rough, architecture, assembly, and final states. Sidebar, book cards, reading progress, chart, and notes provide an application-shaped payoff. Output is labelled illustrative, not a live generation or authentic product screenshot. Mobile uses a two-book compact layout with its full chart visible. |
| StadiumPulse AI | Footprint → segmented seating and pitch → entrance route → assistance zone → accessible route → completed architectural concept, including a stand-section study on desktop. | The venue is recognizable from its seating blocks, goals, field markings, entrances, and structural drawing, rather than concentric ellipses. Routes and zones are illustrative; there are no invented crowd statistics or surveyed dimensions. Mobile has a separately composed plan. |
| Monte Carlo Simulation Lab | Question → square/quarter-circle/axes → computed points → inside/outside count → corresponding convergence trace → annotated result. | Points, count, estimate, and graph share one deterministic sequence. Plot-path counts independently matched the HTML counts and formula, including reverse scrolling. It is an estimate; no claim of monotonic convergence or exact pi. |
| Collaboration | The default board shows the combined BATS/Go report, project/framework filtering, and dedicated BATS result while preserving the combined report. Additional selectable drawings explain agent quickstart/workflow documentation and metadata/image-path validation. | Actual supplied Meshery contribution descriptions; no fabricated PR IDs. Pointer and keyboard exploration select one diagram and update its HTML explanation. Existing full contribution copy and historical counts remain below. |
| About / experience | A continuous pencil line reaches five distinct miniatures: academic book/cap, secure-sharing workstation, analysis chart, contribution report, and recognition certificate. One active description accompanies each. | All five stops inspected. The scene remains pinned until Recognition is drawn and held; release and reverse travel were measured. Optional buttons provide direct exploration. The original biography, full timeline, and AWS community membership remain below. |
| Skills | Interface, backend/API, database, structured AI, delivery boundary, and test/validation elements form a systems blueprint. | Six keyboard-accessible domains highlight the appropriate drawing and reveal the verified stack. No proficiency scores. Mobile uses normal document flow so text below the controls remains reachable. |
| Achievements | Top 5 internship recognition stamp, an ML ranking study with 525 / 80,000+, and internal SIH selection certificate. | Different visual concepts replace repeated trophies. Exact achievement descriptions remain HTML; the ranking line is illustrative, not a measured competition-performance chart. |
| Finale | Workstation, stadium, and probability motifs return above a finishing pencil line, followed by the requested idea/build invitation. | Existing email, GitHub, LinkedIn, résumé actions, and back-navigation remain available. The drawings are a recap, not a new set of decorative project cards. |

The illustration review considered recognizability, relevance, draftsmanship, composition, consistency, motion, and readability. The main subjects are identifiable, connectors explain specific relationships, the drawing vocabulary is consistent, and essential information is readable HTML. Some scientific annotations and miniature labels remain secondary visual detail, particularly on short phones; they are not the sole source of project facts. These are stylized technical illustrations, not architectural surveys or photorealistic drawings.

## Scroll and lifecycle behavior

The shared scheduler now emits a Sketchbook-only frame event after its ordinary geometry updates. The controller maps native scroll positions to normalized opening, project, and career progress. SVG path lengths and dash offsets construct strokes; text follows the structure it describes. The compiler adds a clipped sketch-to-interface reveal and aligned component movement. Final drawings hold before release; scrolling backward reconstructs earlier states.

The opening, four projects, and experience scene use native sticky positioning. Separate narrow SVG compositions avoid shrinking the entire desktop sheet. Mobile supporting chapters use normal flow; desktop collaboration and toolkit retain their pinned drafting surface. Reduced motion removes the long pinned runways and exposes completed illustrations, while milestone/tool controls remain usable.

Illustration definitions and animation logic are separate files. Owned DOM is created on the first Sketchbook activation, then retained, hidden, and made inert on exit. Active frame, resize, hash, load, and visibility listeners are removed when leaving. Button handlers are attached once to retained owned DOM; the small mode/preference observers remain guarded by the active state. No Sketchbook requestAnimationFrame loop, persistent WebGL context, or continuously animated filter was added. Drawing groups cache completed values, and point generation updates only when its sample count changes.

## Actual verification

| Check | Observed result |
| --- | --- |
| Local preview | Existing server verified by a successful real-browser reload at http://127.0.0.1:4181/. A shell loopback health request was denied by the sandbox; no second server was started. |
| Opening | Six stages inspected and saved. Approximately 0px pinned top through the intended sequence; final measurement −0.2px from rounding. Builder identity now occurs at 80%, followed by the first creation. |
| Project progress | Six states per project inspected/observed through the real-browser harness. At intermediate and final states the visual stayed around 12px from the frame top. Stroke dash offsets changed from approximately 1 to 0, rather than solely fading in a finished image. |
| Numerical consistency | At 40%: 493 plotted points, 376 inside, computed `4 × 376 / 493 = 3.050709939…`, displayed 3.050710. Final: 1,800 plotted, 1,399 inside, computed 3.108888888…, displayed 3.108889. Rewinding to 40% restored counts and the same graph path. |
| About pin/release/reverse | All five milestones had one active description. Pin top stayed 12px, final Recognition held, release moved the frame to −291.825px, and reversing restored Maincraft at 12px. |
| Short-phone timeline | All milestones inspected in a 320 × 667 iframe. Body copy was 16px. Content endpoints stayed within the roughly 12–575px frame; the last control/progress endpoint was at most 551.7px. |
| Direct anchor | About navigation followed by reload selected Education and aligned the pinned frame at 12px. |
| Responsive widths | At 320/390/768 iframe widths, client/scroll widths matched at 305/305, 375/375, and 753/753 for opening, all four projects, About, Skills, and Contact. These are browser iframe tests, not physical-device tests. |
| Short desktop | A 1440 × 700 iframe confirmed the opening at 0/40/80/100%. Footer bottom was about 564px, above the dock at 622px; title and drawing stayed in the paper composition. The browser viewport override did not reliably change every tab, so the iframe's actual inner dimensions were checked instead. |
| Input | Tab from Frontend selected/focused Backend and updated its explanation. AI selection exposed the real stack. Quality selection displayed only its corresponding contribution board and explanation. Existing project links and drawing transcripts remain ordinary links/disclosures. |
| Nine-lens switching | All eight other modes activated with Sketchbook hidden. Every observed switch reset scroll to zero; returning to Sketchbook restored phase zero. Only 3D created a WebGL canvas, which disappeared when leaving it. Nine lens options and four projects remained. |
| Idle work | The background diagnostic tab's Sketchbook update counter remained 9 → 9 while the other review tab was used. This is not a foreground idle/FPS benchmark. Source inspection confirms no Sketchbook-owned animation loop; updates come from shared geometry events. |
| Reduced motion | A pre-script preference harness with matching reduced-motion CSS produced all project final states, a relative/unpinned career frame, and direct résumé access with no video source. This simulated the preference; no OS preference setting was changed. |
| Résumé | Normal click loaded the actual `assets/resume-cinematic.mp4`, initially at time zero, `loop=false`, `object-fit:contain`. Skip opened `assets/resume-page-1.png`, removed the video source, and retained the original PDF controls. Reduced motion opened the viewer directly. Close worked. No résumé source or media files were changed. |
| Diagnostics | Fresh diagnostic page captured no application error events or error/warning console messages, including the nine-lens switch cycle. Earlier repeatedly navigated QA pages logged a MutationObserver invalid-node message that did not reproduce in the fresh diagnostic page; its origin was not established. |
| Source/assets | `node --check` for the shared controller and both Sketchbook JavaScript files; `git diff --check`; reproducible font build. No restricted fonts, private PDF/video, or review artifacts are staged. |

One late browser call was temporarily rejected when automatic approval review encountered an account usage limit. After the user requested continuation, the normal browser tool succeeded and remaining verification was completed. No alternate browser surface or bypass was used.

## Corrections made during visual review

- Restored a distinct 80% builder introduction instead of skipping directly to the final phase.
- Replaced the opening's loose first curve with the actual sharing connection it becomes.
- Removed overlapping annotations and a duplicate document; repositioned permission leaders away from the recipient silhouette.
- Preserved final dashed construction lines after stroke completion.
- Corrected the compact application's layout so its reading chart is visible.
- Separated the mobile lens and chapter controls, and put mobile supporting chapters in normal flow.
- Fitted the paper and typography to a shared aspect-ratio board; accounted for the initially visible header so the footer clears the dock.
- Shortened narrow sharing annotations and enlarged core labels; full link-rule facts remain in HTML.

## Evidence and files

Local screenshots are under ignored `review-evidence/sketchbook/`: `before.jpg`, `opening-0.jpg` through `opening-100.jpg` at the sampled stages, four `*-final.jpg` project views, compiler intermediate stages, About/Skills/Open Source/Achievements/Contact views, updated phone examples, `short-desktop.jpg`, `contact-links.jpg`, and `preview.jpg`. Opening samples include review iterations; `short-desktop.jpg`, the four final project views, and `preview.jpg` incorporate the final corrections. A compact `verification.json` records sampled observations. Some screenshots include the ignored review harness's top controls; those controls are not part of the portfolio. No screen-recording tool was available, so screenshots are supplied instead.

Changed files:

- `sketchbook-illustrations.js`: original desktop/narrow SVG definitions.
- `sketchbook-notebook.js`: owned HTML, drawing timelines, numerical experiment, exploration, lifecycle, and anchor handling.
- `sketchbook-notebook.css`: scoped drafting identity, original display face, responsive and reduced-motion layouts.
- `tools/build_drafting_font.py`, `assets/notebook-draft.ttf`, `assets/notebook-art.txt`: original font source, generated font, and provenance.
- `index.html`, `multiverse.js`: stylesheet/script loading and Sketchbook-only scheduler integration.
- `README.md`, `.gitignore`, `SKETCHBOOK_DIRECTION.md`, `SKETCHBOOK_REVIEW.md`: usage, generated Python-cache exclusion, direction, and review record.

## Limits

No physical mobile device, Safari, screen-reader, automated contrast audit, FPS, GPU-memory, battery, or long-duration leak benchmark was performed. Reduced motion was verified through a simulated preference harness. The compact mobile application preview omits one illustrative book and notes panel; essential portfolio content and project sequence transcripts remain accessible. Drawings demonstrate verified concepts but are not production schematics, surveyed stadium plans, or authentic AI-generated output screenshots. The final handoff uses native chapter flow rather than a continuous cross-section SVG morph.

Private résumé media, downloaded reference fonts, and screenshots remain ignored. The supplied JJK footage retains its existing rights-aware local handling; no public deployment or redistribution change was made. Git commit and draft PR identifiers are supplied with the final delivery.
