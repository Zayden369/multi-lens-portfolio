# Museum of Making — implementation and review

Reviewed locally on 19 November 2026. The 3D lens retains its public name, The Multiverse. This change is based on `codex/vector-geometry-playground`; the other eight lenses and existing résumé implementation remain in place. No merge or deployment is part of this delivery.

## Before and after

The rejected local prototype contained a real perspective camera but repeated luminous gateways, disconnected platforms, indistinct objects, and a predominantly dark purple environment. The earlier committed 3D lens was a simpler canvas presentation. Neither established a convincing physical collection of engineering exhibits.

The replacement uses a contemporary museum: plaster walls, concrete floors, timber beams and desks, glazed entrances, benches, track fixtures, and consistently mounted exhibits. The camera approaches recognizable objects instead of orbiting arbitrary shapes. Warm architectural white and stone provide the main field; charcoal equipment, timber, satin metal, brass, terracotta, and sage supply material and functional contrast. Large editorial headings and quiet HTML captions share the same warm palette.

The reference audit, design system, failure diagnosis, and pre-implementation camera storyboard are in [MUSEUM_ART_DIRECTION.md](MUSEUM_ART_DIRECTION.md). All four main reference URLs were inspected in the browser. Estheet's separate museum subdomain timed out. No new recording path was supplied with the correction, so comparison uses the preserved prototype source and screenshots; it does not claim inspection of an unavailable recording.

## Exhibits and object relevance

| Destination / significant objects | What they represent and why they belong | What motion explains / what removal would lose |
| --- | --- | --- |
| Entrance: portico, pilasters, sliding glass doors, engineering workstation, archive doorway | Establishes the museum's physical scale, then introduces Abhishek through a recognizable place of software work. The archive glimpse names the next destination spatially. | Six scroll beats approach, open, cross the threshold, introduce the workstation, and look toward the archive. Removing the architecture loses arrival and depth; removing the workstation loses the creator introduction's physical subject. |
| TrustShare: hinged document vault with wheel and reader, sender/receiver workstations, paper document, protected brass path | A physical analogy for authentication, access conditions, and protected file sharing. Verified capabilities remain in HTML; the vault is explicitly a visual metaphor. | Authorization precedes opening and document delivery; the final camera reveals the system. Without the reader/barrier the access-control story disappears; without the two workstations the transfer has no meaningful endpoints. |
| AI Application Compiler: timber workstation, keyboard, monitor, architecture schematic, assembled interface pieces | Natural-language requirements become interpreted components, schemas, validated configuration, and a rendered interface. The Reading room dashboard is clearly labelled an illustrative application, not a claimed authentic output or live AI result. | Six stages move from requirement through interpretation, architecture, validation, assembly, and a close final screen. Components carry actual interface texture crops and assemble into navigation, books, progress, and notes. Removing the final UI would lose the evidence of an application-shaped result. |
| StadiumPulse AI: stadium miniature on display table, five oval seating tiers, 480 instanced seats, pitch markings and goals, roof and 28 supports, entrances and route | Recognizable venue structure gives route, zone, accessibility, and assistance concepts a physical context. Routes and crowd zone are labelled illustrative; there is no live venue data or invented crowd metric. | The camera approaches and rises over the model; route and zone emphasis explain the assistance story before a final overview. Without the venue geometry the route loses context; without routes the model would only decorate the project. |
| Monte Carlo: physical experiment table, square/quarter-circle sample surface, numerical and convergence display | Shows the actual pi-estimation experiment using reproducible computed samples. The same sample sequence drives points, estimate, and plot. | Scroll increases the sample count up to 1,800; reverse scrolling reconstructs the earlier sample state. Removing the numerical display loses the connection between geometric proportion and computed estimate. |
| Open source: three mounted contribution panels | Testing, documentation, and quality work reflect the supplied Meshery contribution descriptions. These are category exhibits, not fabricated GitHub screenshots or new merge claims. Historical PR counts remain identified as a snapshot. | Selecting a category highlights its panel and updates readable HTML. Removing the panels loses the gallery's subject; the factual content remains accessible outside WebGL. |
| Experience: academic desk/books, Infosys workstation, Maincraft analysis display, collaboration wall, recognition plaques | Five corridor stops distinguish education, secure-file-sharing internship work, data-analysis learning, Meshery collaboration, and recognition. The Maincraft screen is an illustrative Python/Titanic pipeline with no invented accuracy. AWS community membership remains in the full biography below. | Native scroll pins the corridor, focuses one milestone and description at a time, holds the last stop, then releases. Removing the different exhibits would make the timeline an arbitrary camera journey. |
| Skills: five organized workstations with tool displays | Physical desk zones organize the actual development stack and engineering practices. Labels do not imply unsupported proficiency scores. | Pointer, touch, and keyboard selection focus the corresponding desk and reveal real tool names in HTML. Removing the screens loses the relationship to actual tools. |
| Recognition: three framed displays and plinths | Presents the supplied Top 5 internship recognition, rank 525 among 80,000+, and internal SIH selection without invented trophies or awards. | The camera emphasizes the displays while readable captions supply the exact facts. Removing the recognition objects loses the corridor's concluding exhibit, though the accessible facts remain. |
| Finale: skylit atrium, central workbench, benches, project plaques | A calm gathering space recalls the work already exhibited and leads to the real contact invitation and links. | A measured approach ends at the workbench. Removing it would leave the final architectural room without a link to making. |

Architectural beams, fixtures, floor contact shadows, skirting, and benches establish scale, lighting, and continuity. They do not serve as unrelated animated centerpieces.

## Camera and rendering implementation

- Native scroll geometry supplies progress for pinned opening, project, and experience sequences. Camera position, target, exhibit state, and caption derive from the same progress. Reverse scrolling reverses those states; reading plateaus and the experience's final hold precede release.
- The entrance travels from outside to an interior workstation and archive glimpse. Project cameras frame mechanisms and outcomes: reader and document, assembled application, stadium route, and computed experiment. The experience camera follows a corridor of professional milestones.
- One lazy-loaded Three.js renderer serves the most visible scene. Completed canvas stills retain the other rooms' last view without extra WebGL contexts. Scene changes dispose world resources; leaving 3D disposes renderer resources and detaches the lens's listeners.
- Rendering is event-driven; there is no ambient animation loop. Low-effects mode lowers pixel density. Repeated stadium seats and keyboard keys use instanced meshes. Only one light casts a shadow; exhibit lighting is limited to three spotlights plus shared fill/directional lighting.
- All models are original procedural assemblies. Concrete/wood textures, screen graphics, and plaques are original generated canvas assets. No third-party GLB, artwork, HDR environment, or Blender model is included. Glass and reflections are stylized approximations, not ray tracing.
- Three.js 0.187.0 is locally bundled under its MIT license. Its source archive integrity was verified against official npm metadata; provenance and the reproducible bundle command are in `vendor/three/README.md`.

## Actual visual inspection and corrections

Browser inspection covered all six opening stops and six states for each of the four projects, supporting galleries, forward/reverse experience scrolling, and transitions. Desktop inspection used 1280 and 1440 widths; responsive harnesses included 768 and a 320 × 667 viewport. Harness controls visible in some evidence screenshots belong only to the ignored QA page, not the portfolio.

Corrections made after inspecting rendered output:

- Raised the stadium/probability gallery ceilings and repositioned lights so overhead cameras no longer intersect roof beams.
- Corrected portrait camera adaptation that previously advanced too close to exhibits; rechecked the workstation and stadium on the narrow viewport.
- Made screen faces unlit readable surfaces after architectural shadows obscured their interface content.
- Replaced plain assembly panes with cropped application graphics, and reframed the final mathematical display to fit the full plot.
- Improved the opening's final look target and added the archive glimpse beyond the workstation.
- Increased narrow-screen introduction/timeline body text to 16px and rechecked the entire pinned milestone panel.
- Batched keyboard keys after observing 847 draw calls in the five-desk workshop. The same workshop then reported 372 draw calls, about 56% fewer. This is a draw-call comparison, not an FPS benchmark.

### Scene quality review, 0–5

These are internal art-direction judgments after browser inspection, not independent ratings. A = recognizability, B = relevance, C = art direction, D = composition, E = motion, F = narrative, G = professional usability. No scene is rated perfect overall. The key columns A/B/D/F meet the requested minimum of 4 after the corrections above; procedural fidelity and chapter cuts remain limitations.

| Scene | A | B | C | D | E | F | G | Local screenshot evidence under `review-evidence/museum/` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Entrance | 4 | 4 | 4 | 4 | 4 | 4 | 4 | `entrance-0.jpg`, `entrance-2.jpg`, `entrance-4.jpg`, `entrance-5.jpg` |
| Secure Archive | 4 | 5 | 4 | 4 | 4 | 4 | 4 | `sharing-final.jpg` |
| Application Workshop | 4 | 5 | 4 | 4 | 4 | 4 | 4 | `compiler-final.jpg` |
| Stadium Exhibit | 4 | 5 | 4 | 4 | 4 | 4 | 4 | `stadium-final.jpg` |
| Probability Laboratory | 4 | 5 | 4 | 4 | 4 | 4 | 4 | `simulation-final.jpg` |
| Collaboration Gallery | 4 | 4 | 4 | 4 | 4 | 4 | 4 | `opensource.jpg` |
| Experience Corridor | 4 | 5 | 4 | 4 | 4 | 4 | 4 | `experience.jpg`, `phone-timeline.jpg` |
| Skills Workshop | 4 | 5 | 4 | 4 | 4 | 4 | 4 | `skills.jpg` |
| Recognition | 4 | 5 | 4 | 4 | 4 | 4 | 4 | `awards.jpg` |
| Atrium Finale | 4 | 4 | 4 | 4 | 4 | 4 | 4 | `contact.jpg` |

### Functional, performance, and accessibility observations

| Check | Observed result |
| --- | --- |
| Probability consistency | At an intermediate stop: 1,092 samples and pi 3.142857. At the end: 1,800 and 3.144444. Rewinding restored 1,092 / 3.142857. No claim that every additional sample improves the estimate. |
| Pinned timeline | Top stayed approximately 12px through milestone travel; final Recognition held before release. After release top was −250.525px; reverse scrolling restored the Maincraft stop and pin. Direct `#about` followed by reload also aligned at 12px with Education selected. |
| Short phone timeline | At 320 × 667 the active scene was top 12px to bottom 574.2px; description ended at 447.7375px with 16px body type, leaving room above the dock. |
| Horizontal overflow | In the narrow harness, client and scroll widths both measured 305px at home, all four projects, skills, recognition, and contact. Tablet measurement was 753 / 753. |
| Lens lifecycle | All other eight lenses activated with no `.sp-webgl` canvas. Repeated Modern → 3D → Pixel → 3D → Bohemian → 3D produced zero canvases outside 3D and one inside, resetting scroll to the top. Re-entry restored opening progress zero and the initial camera. |
| Idle rendering | Frame counter remained 44 across the idle observation. No continuous ambient renderer was running. |
| Low effects | At a 699px CSS scene width the backing canvas reduced from 874px to 804px. This verifies a quality change, not a hardware performance guarantee. |
| WebGL failure | Forced context loss removed the WebGL canvas, displayed the architectural SVG fallback, and retained all four project links and portfolio text. No black-screen dependency blocked content. |
| Reduced motion | A pre-script preference harness selected the normal-flow/static presentation: experience was not pinned, project final state remained available, milestone/tool controls updated text, and Résumé opened the document with no video source. This was simulated in the harness, not an OS-setting test. |
| Keyboard and pointer | Tool selection worked by pointer and Tab focus; milestone buttons followed ordinary tab navigation. Essential copy and links are HTML. No screen-reader audit is claimed. |
| Existing résumé | Résumé loaded the exact `assets/resume-cinematic.mp4` on click, `loop=false`, `object-fit:contain`. Skip opened the real readable résumé viewer with Open PDF and Download PDF; Close worked. No media or résumé implementation files were modified. |
| Console | Fresh diagnostic-page error/warning collection was empty. Earlier navigation sessions contained a MutationObserver invalid-node message that was not reproduced in the fresh page; its origin was not established. A Three.js shadow-map deprecation was corrected by selecting PCFShadowMap. |
| Source checks | `node --check` for the shared controller and both spatial JavaScript files passed. The staged whitespace check passed for authored files. The generated Three.js bundle retains upstream shader-string indentation/trailing whitespace; those generated-string warnings are excluded rather than rewriting vendor shader contents. |

Machine-readable observations are saved locally in `review-evidence/museum/verification.json`. That compact file contains only a subset of the inspected project camera stops; it is not a complete test runner. Evidence and temporary browser harnesses remain ignored. No screen-recording tool was available, so screenshots are supplied instead of claiming a recorded walkthrough.

## Files changed

- `index.html`: loads the spatial stylesheet/controller and revised shared-script cache key.
- `multiverse.js`: warm 3D lens transition colors, spatial frame event, and exclusion from generic ambient rendering.
- `spatial-multiverse.css`: scoped architectural UI, pinned/responsive scenes, mobile spacing, reduced-motion layout, and the 3D selector swatch.
- `spatial-multiverse.js`: accessible exhibit content, scene selection, native progress, timeline/tool controls, lifecycle, and fallbacks.
- `spatial-worlds.js`: original museum models, materials, lighting, camera choreography, numerical sampling, rendering, and resource management.
- `vendor/three/three.bundle.js`, `vendor/three/LICENSE`, `vendor/three/README.md`: local licensed runtime and provenance.
- `README.md`, `MUSEUM_ART_DIRECTION.md`, `MUSEUM_REVIEW.md`: usage, design specification, and this review record.

## Known limitations and delivery boundaries

- These are stylized procedural environments, not photorealistic asset productions. Room transitions select separate destinations with shared construction; this is not a freely navigable, seamlessly continuous museum. Native chapter boundaries can produce scene cuts.
- The WebGL fallback uses a simplified shared architectural illustration plus complete HTML content; it does not reproduce every interactive exhibit.
- No FPS, GPU-memory, battery, long-duration leak, native Safari, physical mobile device, or screen-reader benchmark was performed. Lifecycle checks establish observed canvas counts and source disposal paths, not proof of zero retained GPU bytes.
- The final compiler UI, stadium route/zone, and Maincraft pipeline are illustrative exhibits. They are not live services, authenticated product screenshots, live venue analytics, or new performance claims.
- Public redistribution approval for the supplied JJK footage remains separate. The MP4, private résumé PDF/renderings, restricted reference fonts, and local review artifacts remain ignored. No private media was added to Git and no public deployment was performed.

Local preview: http://127.0.0.1:4181/ . Select **3D** in Change the lens. The review branch is `codex/spatial-museum-of-making`, targeting `codex/vector-geometry-playground`; commit/PR identifiers are supplied with the delivery after creation.
