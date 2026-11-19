# Retro — The Time Machine

Branch: `codex/retro-time-machine`  
Base: `codex/pixel-playable-adventure` (`95a620e`)  
Local preview: http://127.0.0.1:4181/#about

## Result

Retro now has an original analog-broadcast world: a dimensional wood-cabinet TV powers on, tunes, fills the viewport, and hands off to a print introduction and programme slate. Native scroll position drives the sequence through the existing shared frame scheduler. The new lens has no independent animation loop, new dependency, downloaded artwork, or audio.

The project broadcasts use different illustrations and interactions:

- TrustShare: sender/recipient terminals and a document following a measured SVG transmission path, with access-rule stages.
- AI Application Compiler: requirement, interpretation, schema, validation, assembly, and an illustrated working-result dashboard.
- StadiumPulse AI: a stadium overview, crowd-zone illustration, and a moving route marker.
- Monte Carlo Simulation Lab: deterministic samples, a computed pi estimate, and convergence chart.

Layer5/Meshery uses a broadcasting network; experience uses a horizontal film reel; skills use five selectable control-room desks. The achievements banner and sign-off conclude the broadcast. Illustrative project scenes are labelled rather than presented as actual product screenshots or live operational metrics.

## Targeted About correction

The original reel was in normal document flow, and its progress was calculated from the entire About section. The heading and reel could therefore leave the viewport while the story was still advancing.

About now owns a dedicated scroll container (`360svh`) and a sticky scene at a 12px offset. Its height reserves room for the floating controls. The heading, filmstrip, selectors, single active description, and progress indicator stay together. Detailed biography and experience remain below the scene in normal flow.

Normalized progress is calculated from the container's current bounds and the scene height. It drives horizontal reel travel and milestone selection, with reading holds between smooth advances. Education is followed by Infosys, Maincraft, and Meshery; Meshery holds through the ending before release. Scrolling backward derives the previous state from the same geometry. Optional buttons remain available but are not required. Resize recomputes the geometry; direct `#about` entry and refresh align to the scene start.

Related layout corrections:

- The Retro two-column grid used `gap: 8%`, including its stacked row gap. A percentage row gap could overflow the grid's intrinsic height and let the B.Tech text extend into achievements. Separate `column-gap: 8%` and `row-gap: 40px` fix the underlying flow; achievements follow the timeline with 48px clearance.
- Floating controls use consistent edge spacing and smaller mobile dimensions. The pinned composition reserves 96px vertically; focused content has matching scroll clearance.
- The green rectangles were intentional divider decoration, not failed animation or missing content. The skills divider is now a restrained rule with `NEXT / THE CONTROL ROOM` to make its purpose explicit.
- Reduced motion and Low Effects remove the About pin/runway, leaving a normal-flow composition with all four milestone selectors and the detailed timeline below.

The requested 26-second recording did not have an accessible file path in the targeted request. Diagnosis used the current source and live browser; no claim is made to have reviewed that recording.

## Files

- `retro-broadcast.js`: owned Retro scene DOM, original SVG illustrations, progress mapping, computed simulation, milestone and desk interactions, lifecycle cleanup, hash alignment.
- `retro-broadcast.css`: Retro-scoped art direction, responsive scenes, materials, pinned About layout, controls, and static fallback.
- `multiverse.js`: emits the Retro frame event and skips the generic ambient canvas in Retro.
- `index.html`: loads the Retro stylesheet and script.
- `RETRO_REVIEW.md`: this implementation and verification record.

Existing professional content, the circular lens transition, and the supplied-video résumé implementation are retained. Retro-owned elements are hidden outside the lens and its update listeners are detached on exit.

## Actual verification

Before the targeted correction, the complete Retro implementation was inspected in the local in-app browser:

- Opening sampled at 0/20/40/60/80/100% and intermediate quarter positions; four project stories inspected across six progress states each.
- Responsive layouts checked at 320, 390, 430, 768, 1280, 1440, and 1920px harness widths, with no document horizontal overflow in the sampled sections.
- Other eight lenses compared against the base revision at matching initial scroll positions; sampled layout/style values matched.
- Retro exit/re-entry reset the opening with one owned scene, and inactive Retro updates stopped.
- Reduced-motion fallback, computed simulation, and interactive desk controls checked.
- Existing résumé: exact local MP4, lazy loading, contain sizing, one playback, PDF hidden during video, natural completion, Skip, Close, Escape, and original PDF links checked. Fresh desktop error/warning log was empty.

After the user's instruction to avoid further general checks, verification was limited to the targeted correction:

- About at progress 0/.2/.4/.6/.8/1 remained at 12px (final sample 11.95px, rounding), presenting Education/Education/Infosys/Maincraft/Meshery/Meshery. Exactly one selector was pressed, and the active description stayed inside the scene.
- At 1.1 the scene released upward; reversing to .4 restored Infosys in the pinned frame.
- The complete composition was visually inspected at 320×667, including controls and description.
- At 320, 390, and 1280px harness widths, the achievements banner was 48px after the timeline. Floating-control horizontal clearance remained positive (at least 30.6px in these samples).
- Direct `#about` entry and reload both positioned the scene at approximately 12.04px.
- The reduced-motion harness reported normal positioning, no minimum scroll runway, and four milestone buttons.
- JavaScript syntax and Git whitespace checks passed.

Local evidence (ignored by Git): `review-evidence/retro/about-pinned-preview.jpg`, `about-pinned.jpg`, and `targeted-checks.json`, plus earlier whole-lens screenshots.

## Limits and delivery

Checks used the desktop in-app browser and responsive iframe harness, not physical phones or Safari. Native wheel/trackpad hardware, native OS reduced-motion toggling, frame-time profiling, and a browser video recording were not verified. Reduced motion used a local test harness. No new sound is included.

No merge or deployment was performed. The private supplied résumé video/PDF remain ignored and are not included in this commit. Public redistribution of the supplied anime footage still needs the user's rights review before deployment; this change does not replace it or authorize redistribution.
