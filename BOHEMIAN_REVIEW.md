# Bohemian — The Living Journal

## Scope

This review branch is based on `codex/modern-digital-lab` at `53aed95`, preserving the unmerged Part 1 implementation. Only Bohemian's creative direction changes. No merge or deployment is part of this work.

## The journal opening

A stitched, textured walnut cover sits over loose parchment, a botanical sprig, and warm studio light. The book has a spine, layered page edges, separate leaves, a ribbon, shadows, and independent front/back faces. Opening the cover never exposes the reverse of its front typography: the back is its own correctly oriented ex-libris illustration.

The six reviewed scroll positions reveal:

| Progress | Composition |
| --- | --- |
| 0% | Closed cover, identity, title, stitched edges, paper layers, botanical artwork. |
| 20% | First touch: cover begins rotating, ribbon and loose paper respond. |
| 40% | Open cover and collected-ideas page, with the inside-cover inscription. |
| 60% | An independent interior leaf turns while engineering ink forms. |
| 80% | Open illustrated builder spread and technical domains. |
| 100% | The composition moves closer into the builder's page and leads into the project chapter. |

The actual introduction remains in accessible HTML beside the book. On phones up to 450px, the book becomes a single full-width leaf with readable domain labels. It does not shrink two desktop pages into miniature text.

## Project stories

- **TrustShare:** a document enters a layered envelope, a security seal appears, access conditions become annotations, the delivery route draws, the envelope travels, and the document emerges for the recipient. The scene explicitly labels physical delivery as a software-access metaphor. Real project copy, contributions, stack, and repository link remain available.
- **AI Application Compiler:** six scroll states move from a written requirement to architecture, connected schemas, a corrected field, a folding paper reveal, and an illustrated reading dashboard. The result is labeled illustrative rather than live AI output. Only the relevant stage is visible; the old slider panel is hidden only in Bohemian.
- **StadiumPulse AI:** a creased paper map expands in perspective. Stadium lines form, illustrative congestion is highlighted, and a marker follows the actual SVG geometry of an accessible route. It presents no invented operational measurements.
- **Monte Carlo Simulation Lab:** ink samples accumulate inside a square and quarter circle. Both the pi estimate and convergence curve use the existing deterministic sample set. At 1,088 samples the estimate is 3.1691; at 1,800 it is 3.1667. Reversing to 1,088 samples reproduces 3.1691. More samples do not guarantee a monotonically improving estimate.

## The remaining chapters

Open source becomes a paper noticeboard with pinned contributions and a growing connecting thread. The experience timeline uses taped notes, a winding ink path, existing verified milestones, and archival achievement framing. Skills pair clear technology labels with custom interface, server, and network illustrations. The final page carries the conversation heading, botanical artwork, a drawn AG monogram, contact links, and the existing résumé controls.

Chapter separators use botanical, thread, fold, and expanding ink treatments. Hover lifts remain subtle. Illustrations use original SVG artwork and CSS materials; no stock images, external requests, dependencies, or downloaded fonts were added.

## Files and animation lifecycle

- `bohemian.css`: Bohemian-scoped materials, book faces, project worlds, later chapters, responsive adaptation, reduced-motion rules, and horizontal paint containment.
- `bohemian-journal.js`: owned scene markup, deterministic math rendering, scroll-state mapping, normalized SVG path lengths, and lens lifecycle.
- `multiverse.js`: emits a Bohemian-only frame event after the existing native-scroll calculations; bypasses the replaced Bohemian ambient Canvas rendering. Other lens branches are unchanged.
- `index.html`: loads the new Bohemian stylesheet and script after the existing Modern implementation.

The journal uses the existing scheduler. It creates no independent animation loop or scroll listener. Its frame and pointer handlers detach on leaving Bohemian; one persistent mode observer activates them when needed. Each scene is constructed once and hidden outside its lens. Numerical rendering is skipped when offscreen or when the sample count has not changed.

## Validation performed

- Node syntax checks passed for `bohemian-journal.js` and `multiverse.js`; `git diff --check` passed.
- Inspected and captured all six opening states in the browser, including natural Page Down scrolling. Separate book faces retained readable orientation.
- Inspected all four project stories at 0%, 20%, 40%, 60%, 80%, and 100%. The compiler displayed all six distinct captions and compositions.
- Inspected open source, experience, skills, and contact visually.
- Reversed the opening from 40% to 100% to 40% to 0%; corresponding cover, page, ink, and camera values matched the earlier states.
- Reversed the simulation from 60% to 100% to 60%; sample count and computed estimate matched.
- Used actual responsive iframe layouts at 320, 390, 430, 768, 1280, 1440, and 1920px. After fixing the folding-paper overflow, document scroll width equaled client width at the opening, compiler reveal, and contact at every tested size. The iframe scrollbar accounts for the 15px difference between frame width and client width.
- Compared heading, hero, world-stage, project-visual, contact, and skills dimensions and computed typography/background/border/display against `53aed95` for Modern, Retro, Pixel, Vector, 3D, Sketchbook, Editorial, and Victorian. All eight comparisons matched. This is a measured regression check at the initial desktop state, not a full screenshot diff of every state in every lens.
- Used keyboard Enter to switch Bohemian → Modern → Bohemian repeatedly. Each activation returned to scroll position zero; exactly one journal existed, hidden outside Bohemian.
- The real supplied MP4 remained unloaded before résumé activation. Clicking Résumé used `assets/resume-cinematic.mp4`, with no loop and `object-fit: contain`; the document stayed hidden during footage. Natural video completion displayed the existing résumé image. Skip, original PDF/download links, Close, Escape, source removal, and focus restoration were verified.
- A local-only reduced-motion harness applied the styles and initialized the controllers with the preference enabled. It produced an open static book, final compiler state, unpinned projects, and immediate résumé access without loading the video. This was emulation, not a change to the user's OS preference.
- The desktop browser error log was empty after the interaction run.

Local evidence is saved in the ignored `review-evidence/bohemian/` directory: six opening frames, six frames per project, later chapters, phone layouts, a reduced-motion view, computed regression data, and `preview-open.jpg`. The ignored `.reference-review/` directory contains the temporary local test harness and baseline snapshot; neither is part of the shipped site.

## Limits and distribution

The physical depth uses CSS perspective, layered materials, SVG, and Canvas rather than a WebGL book model. Physical-device Safari/mobile playback and GPU frame-time profiling have not been exercised. Reduced motion was tested through a local harness rather than a native OS toggle.

The actual résumé PDF, rendered page, supplied anime video, and separately licensed downloaded fonts remain local under the existing ignore rules. The public review branch contains implementation code, not those private or distribution-restricted assets. The supplied footage requires the owner's distribution-rights review before public deployment; no replacement animation has been substituted. This change has not been merged or deployed.
