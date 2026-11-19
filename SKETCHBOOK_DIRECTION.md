# The Inventor's Notebook — audit and storyboard

## Repository audit

Starting point: clean `codex/spatial-museum-of-making`, commit `658a987`. Modern, Bohemian, Pixel, Retro, Vector, and Museum redesigns are present in history and loaded by `index.html`. The Sketchbook feature branch starts here, preserving them all. `app.js` owns the verified project content; `multiverse.js` owns lens selection, circular wipe, top reset, native scroll scheduling, project progress, navigation, and the unchanged JJK/PDF viewer. Existing lens controllers listen only while active.

The old Sketchbook is scattered between `style.css`, `multiverse.css`, and the generic canvas branch in `multiverse.js`. Browser inspection showed unusually compressed decorative navigation and body type, with a small notebook canvas below a conventional heading. Its generic diagrams and repeated tilted project containers do not explain the four projects. The old view is recorded locally before replacement.

Local font audit: Amsterdam, Star, Punk, Tritopani, and Itacha families include personal-use terms; the Itacha license explicitly prohibits redistribution without consent. `reference-fonts/` stays ignored. The new lens will not depend on these downloads: original project-authored drafting display lettering for selected headlines, system sans-serif for information and controls, system monospace for technical captions. Existing font definitions and other lenses remain untouched.

The existing browser tab uses http://127.0.0.1:4181/. Readiness will be confirmed by a browser reload; a sandboxed shell loopback request was denied. Available local evidence consists of earlier lens screenshots and the supplied résumé cinematic; no new Sketchbook recording accompanied this brief. The résumé cinematic is not a visual reference to repurpose into this lens.

## Drawing system

- Paper `#F5F1E7`, inset sheet `#FFFDF7`, graphite `#30363B`, drafting blue `#3D6194`, construction blue `#A5B9CA`, technical red `#BC6458`, graphite gray `#92938D`, restrained yellow `#E8D18A`.
- Primary SVG outlines 2–3 units; structural emphasis 4; construction 1 with intentional dashed geometry; dimension lines have consistent ticks. A pale 24-unit grid and margin rule establish the drawing surface. Crosshatching belongs to seating, paper edges, or section material.
- Original SVG assemblies retain recognizable silhouettes and aligned connections. Stroke-dashoffset constructs geometry; fills follow the outlines, and text follows the structures it describes. No noisy continuous filters, random scribbles, or ambient animation loop.
- Desktop uses a substantial pinned sheet beside the real project facts. Mobile has separately composed SVG views and HTML captions rather than unreadably scaled labels. Body copy is at least 16px; touch targets at least 44px. SVG illustrations are decorative supplements to accessible HTML.
- Smooth progress ramps draw each construction stage; the final state holds before release. Reversing scroll reconstructs the earlier state. Controls explore actual details without replacing scroll as the main sequence.

## Storyboards and relevance

| Sequence | Six construction beats / focal composition | Meaning and handoff |
| --- | --- | --- |
| Opening | Blank drafting sheet → first deliberate pencil line → workstation and document blueprint → connected interface/access/data layers → Abhishek's identity → completed secure-sharing concept | The large drawing surface is the hero. A real file-sharing system introduces full-stack/backend/AI interests and carries the same recognizable diagram into TrustShare. Pencil and ruler establish drawing practice, not unrelated ornament. |
| TrustShare | Sender/file → authentication → application/storage relationship → password/expiry/view-limit/revocation annotations → authorized document transfer → complete exchange | Only verified React/FastAPI/PostgreSQL and access-control concepts; arrows encode actual request/response or transfer relationships, not an invented infrastructure topology. |
| Application Compiler | Reading-progress requirement → intent/requirements → UI/data/API schema → validation and typed progress repair → wireframe components align → readable HTML Reading room | Illustrative dashboard, not an authentic generated screenshot or live AI service. The sketch and final application share placement and content for a legible before/after. |
| StadiumPulse | Site outline → segmented stands/pitch/entrances → venue route → assistance zone → accessible route → full architectural concept | Seating blocks, structural section, goals and pitch marks establish identity. Illustrative route/zone, not live crowd measurements or a surveyed venue plan. |
| Monte Carlo | Pi question → square/quarter-circle/axes → reproducible samples → inside/outside proportion → corresponding convergence chart → computed conclusion | One deterministic sequence drives points, counts, estimate and graph. Mathematical annotations explain the experiment; no invented values. |
| Collaboration | Existing combined BATS/Go report → project/framework filter → dedicated BATS report alongside preserved combined report | Alternate drawings explain quickstart/documentation and metadata/validation work. Actual contributions, no invented PR IDs. |
| Experience | Continuous pencil line reaches education, Infosys, Maincraft, Meshery, recognition; each stop constructs a distinct miniature | Active copy appears one milestone at a time inside a pinned frame; the last drawing and description hold before release. Full biography and AWS community membership remain available below. |
| Toolkit | Interface sketch → API → relational store → structured AI → delivery boundary → testing annotation | Six browsable domains use the real stack. Selection highlights the relevant part and readable explanation, without proficiency ratings. |
| Achievements | Internship recognition stamp, ML ranking study, internal SIH selection certificate | Each visual represents a different verified achievement; no repeated generic trophies. Exact facts also remain HTML. |
| Finale | Earlier workstation, stadium plan, and experiment details reconnect along a finishing pencil line | Completed inventions return to the opening idea, then lead to actual email, GitHub, LinkedIn, and unchanged résumé access. |

## Implementation and quality gates

Keep authored illustration definitions separate from the scroll controller. Use a sketch-only shared frame event, scoped CSS, owned hidden DOM, bounded drawing updates, detached active listeners, native pins, direct-anchor alignment, and reduced-motion final views in normal flow. No new framework, animation library, or 3D dependency is needed.

Before delivery inspect six opening states, multiple states of all projects, About pin/hold/release/reverse, support sections, keyboard/focus, narrow/tablet framing, reduced motion, lens switching and résumé access. Evaluate recognizability, relevance, draftsmanship, composition, consistency, motion, and readability. Revise illustrations that fail their explanatory purpose; report actual evidence and limits in `SKETCHBOOK_REVIEW.md`. No merge or deployment.
