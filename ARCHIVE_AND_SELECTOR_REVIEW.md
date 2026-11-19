# Mechanical Archive and living lens previews

## Scope and review status

Implemented on `codex/victorian-mechanical-archive`, based on Editorial `1fca75e`. No merge or deployment. Victorian was committed separately as `1b33cd5`, with chronicle carriage sequencing in `f7d6233`; the subsequent selector commit contains the preview enhancement and this report.

**Source and DOM checks pass. Visual acceptance is pending.** The preview responds at <http://127.0.0.1:4181/>. A real-browser inspection was attempted using the Windows Computer Use skill. The tool returned **“Computer Use was not approved to use Google Chrome.”** No input or alternative browser automation was attempted after that denial. There are no verified post-change screenshots or recordings. Do not interpret the DOM checks as proof of smooth loops, responsive layout, visual quality, keyboard behavior, or frame rate.

## Victorian: The Mechanical Archive

The doorway, hall and apparatus are original SVG assemblies, with walnut grain, parchment records, brass fittings, forest-green instrument surfaces and oxblood annotations. Colors: parchment `#ede2cb`, ivory `#f6f0e3`, walnut `#382b26`, green `#30483d`, oxblood `#6d3038`, brass `#b39259`, bronze `#86694a`, ink `#252421`. The existing local OFL-licensed Instrument Serif supplies inscriptions; body copy remains readable Arial and serif text. No new font downloads or runtime dependencies.

The entrance clock drives connected gears, retracts locking pins, opens the carved doors and approaches the first document drawer. The progress-derived camera and mechanical states reverse with scroll. A separate narrow framing preserves the clock and doorway on phones. Captions and the author's name are HTML, separate from decorative artwork.

| Exhibit | Sequence and actual meaning |
| --- | --- |
| TrustShare | Sender document → identity and link conditions → retracting bolts → opening vault → recipient delivery. Explains controlled access without claiming that a physical vault is the encryption architecture. |
| AI Application Compiler | Requirement paper feeds into rollers → UI/data/API configuration → inspection arm → readable illustrative Reading Journal. Actual validation, repair and fallback claims stay tied to the canonical project copy. |
| StadiumPulse | A detailed stadium scale model on a timber table → closer structural framing → entrance route → assistance zone → accessible route → complete model. No fabricated live venue metrics. |
| Monte Carlo | Quarter circle and square → reproducible sampling → moving stylus → actual inside/total count → convergence trace and computed pi estimate. The same deterministic sequence drives both plotted points and readout. |

Supporting chapters include three contribution drawers, a five-record biography chronicle, six workshop stations, three recognition plates and a closing clock that settles as the contact invitation enters. Drawer/station/chapter selects provide keyboard-operable alternatives to scrolling. Recognition plates are labelled illustrations, not fabricated certificates. The original biography, timeline, contribution snapshot, project facts, stacks and repository links remain accessible.

The shared scheduler dispatches one Victorian-specific frame event after native scrolling. There is no Victorian idle render loop. Mechanical rotations use common pitch, correct opposing direction and inverse tooth-count speed; their silhouettes are stylized, not a physical involute-gear simulation. Each project has a sticky narrative runway followed by ordinary factual HTML, direct facts anchors and a complete narrative transcript. Reduced motion and short landscape viewports use static, ordinary-flow exhibits. Original contact and résumé actions remain immediately available.

## Nine animated windows

The existing button elements, lens keys, titles, descriptions and click closures are retained. Only their decorative swatches are replaced; preview height increases from 65px to 110px (96px on phones). The desktop five-column and phone two-column layouts remain. Labels and descriptions are stable and readable. Active selection uses the existing `aria-pressed` state plus a small CURRENT badge. Keyboard focus has a separate dashed outline.

| Key / lens | Authored preview | Narrative cycle |
| --- | --- | --- |
| `boho` / Bohemian | Folding paper journal, ink-growing stem, unfolding leaves and blooming pressed flower | 7.8s |
| `modern` / Modern | Precision grid, sequential data connection, scanning line, connected nodes and activated system core | 6.2s |
| `retro` / Retro | Timber television, expanding analog screen, tuning dial and crossfading broadcast/play graphics | 7.2s |
| `pixel` / Pixel | Crisp rectilinear landscape, original two-frame walking sprite, collectible, parallax and responsive gateway | 6.4s; gait shares the scene clock with a short idle hold |
| `vector` / Vector | Four connected geometric components expand, reorganize into an interface symbol, and merge | 5.6s |
| `spatial` / 3D | Stone gallery, architectural perspective, metal exhibit and gently approaching/reframing camera | 8.4s |
| `sketch` / Sketchbook | Graph paper, construction lines, a drawing application interface, pencil and drafting annotations | 7.6s |
| `editorial` / Editorial | Serif magazine cover opens to a ruled, two-page feature with typeset columns, then closes | 8.0s |
| `victorian` / Victorian | Archival clock, coupled 12/8-tooth gears, retracting latch, opening aperture and emerging record | 6.8s |

The 3D card reflects the current Museum of Making art direction while retaining the actual `spatial` key and current description. Its miniature uses SVG spatial perspective, not another WebGL context. The clockwork pair has pitch radii 18/12, center distance 30, opposite directions and a 1.5 speed ratio. Integer full rotations return both gears to their starting orientation at the cycle boundary.

## Lifecycle, performance and accessibility

`lens-previews.js` mounts artwork once. CSS timelines are paused by default. A single IntersectionObserver rooted in the dialog enables only the visible cards while the dialog is open, the document is visible and reduced motion is off. The initial visibility measurement avoids briefly starting offscreen cards. Closing, selecting, hiding the tab or leaving the page disconnects the observer and pauses all timelines. Reopening resumes them without duplicating artwork or observers. Unsupported IntersectionObserver falls back to bounded scroll/resize measurements while open. Hover changes the card border without restarting a timeline.

The selection capture listener only pauses artwork. It does not cancel events, replace button closures, change coordinates, delay selection or touch the transition overlay. The original circular expansion, lens application, scroll reset, storage, focus restoration and JJK/PDF code compare unchanged against the Editorial base, after normalizing Windows line endings.

There are no preview videos, Canvas/WebGL contexts, animation timers, requestAnimationFrame loops, SVG filters or new production packages. The previews use small SVG compositions, transforms, opacity and a few stroke-dash animations. Actual rendering performance is unmeasured; DOM checks cannot establish FPS or GPU usage.

Artwork is aria-hidden and non-focusable. There are no nested controls. Native dialog semantics, labels, focus handling, Escape/backdrop dismissal and existing pressed states are preserved. Under reduced motion, CSS animation is removed and the composed base artwork remains visible; the manager also suspends its observer. Contrast and small-screen legibility still require rendered inspection.

## Checks performed

- `node --check` for each new JavaScript file and the modified shared script.
- `node tools/check_archive_dom.mjs`: 30 entrance/project scroll states, reverse door state, bolt-before-door ordering, inverse gear ratios, computed sample counts and estimates, chapter/station/record controls, mode cleanup, reduced-motion state logic, unique SVG IDs and retained project/resume references.
- `node tools/check_lens_previews.mjs`: all nine distinct artworks; original button identity, labels and handlers; initial offscreen pause; observer entries; fallback visibility measurement; hidden-tab/reduced-motion suspension; four close/reopen cycles; delayed-close handling; page lifecycle; unchanged reveal and résumé source.
- `node tools/check_editorial_dom.mjs`: preceding Editorial integration still passes.
- `git diff --check` and local HTTP asset-readiness checks.

The DOM scripts use LinkeDOM 0.18.12 installed under ignored `.reference-review/editorial-test/node_modules`. To reproduce on a fresh checkout: `npm install --prefix .reference-review/editorial-test --no-save --package-lock=false linkedom@0.18.12`, then run the commands above. Production remains buildless and dependency-free.

## Required browser review before acceptance

1. At 1440×900 and laptop size, select Victorian. Verify the circle starts at the interaction point, returns to the top, and reveals the closed archive without a previous-lens flash.
2. Scroll slowly and reverse through all six opening states and every project. Check physical ordering, caption separation, final holds, facts handoff and readable full compositions.
3. Inspect contribution drawers, biography records, workshop selects, recognition, contact and the unchanged résumé experience. Follow project and chapter anchors.
4. Open Change Lens. Watch at least three complete loops without hovering. Inspect the subject, choreography, reset and clipping of each of the nine cards. Check pixel edge clarity and opposite meshing gear motion.
5. Hover and keyboard-focus cards without resetting loops. Use Tab/Shift+Tab, Enter, Space, Escape and backdrop dismissal. Verify the selected state is distinct from focus and focus returns to Change Lens.
6. Repeat open, select, close and reopen several times. Confirm the original circle and scroll reset still work for all nine keys.
7. At 320/390/768px widths, scroll the dialog. Observe that only intersecting previews run. Check no horizontal overflow or overlapping card descriptions; inspect small-height landscape fallback.
8. Hide and restore the browser tab; confirm pause/resume. Turn on emulated reduced motion in browser accessibility tools, then inspect static previews, normal-flow exhibits, and keyboard access.
9. Inspect the browser Performance/Animations panels for dropped frames, hidden animation activity and duplicate work. Record the complete selector if capture is available. No recording has been captured in this task.

## Important files

- `victorian-art.js`: original archive and apparatus drawings.
- `archive-mechanics.js`: pure mechanical timing, gear construction and deterministic sampling.
- `victorian-archive.js` / `.css`: scoped scenes, native-scroll controller and responsive layouts.
- `lens-preview-art.js`: nine small original scenes.
- `lens-previews.js` / `.css`: one lifecycle manager, choreography, selection and reduced-motion styling.
- `index.html`, `multiverse.js`: small asset/scheduler integration changes.
- `VICTORIAN_DIRECTION.md`, this report and `tools/check_*.mjs`: art direction, review and reproducible logic checks.

Remaining limitation: **real-browser visual, motion, mobile, keyboard and performance validation has not been completed.** The full user acceptance criteria are therefore not yet satisfied. Existing Editorial visual QA was also pending at the base commit.
