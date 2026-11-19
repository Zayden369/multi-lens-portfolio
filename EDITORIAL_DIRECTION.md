# Editorial — The Engineer's Edition

## Audit and scope

Start: clean `codex/sketchbook-inventors-notebook`, commit `efd4715`. All seven preceding redesigns exist in the active history and are loaded by `index.html`; no assumption of a merge into main is made. Feature branch: `codex/editorial-living-magazine`.

`app.js` contains the four real project descriptions, contributions, stacks and repository links. `multiverse.js` owns circular lens switching, top reset, chapter navigation, geometry scheduling and the supplied JJK/PDF viewer. Earlier controllers own their lens-specific DOM and activate only for their mode. The new Editorial controller will use that pattern, without modifying the eight existing lens implementations or résumé behavior.

The old Editorial implementation is a handful of scoped rules in `style.css`/`multiverse.css` and a generic canvas book in `multiverse.js`. Actual browser inspection showed the conventional introduction, small book canvas and shared project catalogue. A real-browser reload verified the existing server at http://127.0.0.1:4181/. The baseline screenshot is locally preserved in `review-evidence/editorial/before.jpg`.

Browser control became unavailable after the baseline inspection. Implementation can continue, but post-change visual QA must not be claimed without the tool returning. Record the actual verification boundary in `EDITORIAL_REVIEW.md`.

## Art direction

Publication identity: **The Engineer's Edition**, a portfolio by Abhishek Kumar Gupta, Issue 001. The issue number is an artistic publication device, not an invented award or publication credit. No fabricated personal photograph or stock fashion imagery.

Colors: ivory `#F5F2EB`, ink `#191919`, warm paper `#E7DED0`, burgundy `#752C3C`, charcoal `#404040`, olive `#75785F`, and restrained vermilion `#D44F3F`. TrustShare uses burgundy; compiler warm paper; StadiumPulse deep ink/olive; probability a dark data-journalism spread. Shared rules, folios, gutters and type keep them one publication.

Typography: locally hosted Instrument Serif regular/italic for refined display typography and pull quotes; system Arial/Helvetica grotesk for body and controls; system monospace for schema/code. Body at least 16px, primary labels/controls 14px, 12–13px reserved for secondary folios. Font provenance and the unmodified SIL OFL are bundled. The restricted reference font downloads are not used or committed.

Grid: full-width feature spreads rather than a repeated side-by-side project catalogue. Each project receives a self-contained native sticky story, followed by the original readable project facts, contributions, stack and repository link in normal flow. A contents list can jump directly to these facts. Mobile recomposes into single-page arrangements rather than shrinking a two-page layout.

Image strategy: original SVG print-style engineering illustrations and clearly labelled illustrative HTML interfaces. Their content must explain work: documents and permissions, application configuration, a recognizable stadium, and actual computed samples. No borrowed product screenshots or misleading live data. No bitmap assets or 3D engine are needed.

## Storyboard before implementation

| Feature | Scroll progression and composition | Purpose / handoff |
| --- | --- | --- |
| Cover | Masthead, issue and name, engineering still-life, cover lines → controlled type/image separation → perspective paper fold → two-page feature spread → builder introduction → Architecture of Trust | The magazine itself opens; an application/workstation illustration introduces the subjects inside. The final document illustration becomes TrustShare's feature image. |
| TrustShare | Large permission document → sender/authentication/recipient flow → verified link conditions → authorized transfer → FastAPI/PostgreSQL annotation → illustrative share interface | Explains why sharing requires an access boundary. Paper travel is the narrative; the final interface is explicitly illustrative. Original project facts follow the feature. |
| Compiler | Oversized question and reading prompt → intent requirements → UI/data/API schemas → typed validation/repair example → structures align into UI → substantial HTML reading dashboard | The layout transforms from a technical explanation into an application. No slider or tab controls advance the primary sequence. |
| StadiumPulse | Full-bleed stadium illustration → match-day question → plan view → entrance route → assistance/accessibility zone → illustrative role-aware venue guide | A recognizable venue shifts scale and perspective to explain navigation. No invented crowd statistics, surveyed dimensions or live status. |
| Monte Carlo | Typographic pi question → quarter-circle experiment → deterministic sampling → inside/outside proportion → matching convergence plot → computed insight | One sample sequence supplies the points, counts, estimate and graph. The conclusion explains an estimate, not a monotonic improvement guarantee. |
| Collaboration | Pull-quote composition → testing/documentation/quality columns → BATS/Go filtering and preserved combined report | Real Meshery contributions, existing profile link and historical count context. No fabricated PR references. |
| Profile | Identity → education → Infosys → Maincraft → Meshery → looking forward | Six profile leaves share one pinned frame, one active description, meaningful technical illustration and date. Last state holds before release. Actual biography, AWS community role and career archive remain below. |
| Toolkit | Interface → backend/API → relational data → structured AI → cloud/delivery → testing | Six editorial infographic studies, each with real tools and HTML explanation; optional selector supplements scroll. No proficiency ratings or invented cloud services. |
| Achievements | Top 5, rank 525 / 80,000+, internal SIH selection as typographic callouts | Exact verified distinctions, no inflated claims or generic trophies. |
| Back cover | Earlier feature imagery simplifies to a closing rule and full-page statement → real contact methods | Resolves the issue without a long outro. Existing GitHub, LinkedIn and résumé controls remain ordinary accessible actions. |

## Motion and engineering

Use the existing scheduler with an Editorial-only frame event. Native sticky scenes map geometry to deterministic progress; reverse scroll reconstructs prior states. Deliberately vary fold, column movement, full-bleed-to-plan transformation, component assembly and data accumulation. Final states hold before release. Avoid a repeating page-turn effect for every article.

Owned DOM is created once on first Editorial activation, hidden/inert on exit; active listeners detach. Essential facts and sequence transcripts remain HTML. Reduced motion presents final drawings and unpins the runways. Direct chapter/facts navigation bypasses the opening. No continuous animation loop, expensive filters or new animation framework.

Quality review must cover editorial design, relevance, typography, storytelling, composition, motion, cohesion and professional usefulness. Required browser review includes six opening states, project intermediates/finals, profile hold/release/reverse, narrow framing, lens re-entry and résumé. Source checks alone do not establish those visual results.
