# Pixel — The Playable Adventure

## Audit and branch base

The previous Pixel hero was a small Canvas sprite and retracting rectangle beside the normal portfolio heading. Project walkthroughs inherited the shared panels. There was no exploration mode, ability tree, or connected game-world progression.

This branch starts from `361ecac`, the final Bohemian heading correction, on `codex/bohemian-living-journal`. It retains the unmerged Modern and Bohemian implementations and the real supplied résumé flow. Source, history, shared scroll scheduling, lens activation, earlier review documents, and the current Pixel browser rendering were inspected before implementation. The earlier supplied-video reference findings remain documented in `REVIEW.md`. The existing local server at `http://127.0.0.1:4181/` was verified through the working browser preview.

## The opening and scroll mechanics

The full-width forest contains original stepped mountain silhouettes, multiple forest depths, drifting clouds, stars, an island waterfall, grass, a stone portal, a wooden sign, a chest, and an explorer with an original hat/backpack sprite.

| Progress | Story state |
| --- | --- |
| 0% | The explorer waits in the clearing; the title and scroll invitation introduce the world. |
| 20% | Walking and camera travel begin; scenery layers move at different rates. |
| 40% | A discovery panel introduces Abhishek and his verified engineering interests. |
| 60% | Portal runes activate and the gateway fills with moving pixel fragments. |
| 80% | The explorer enters, foreground perspective advances, and tiles begin dissolving. |
| 100% | The inventor's workshop appears and Level 01 — The Builder is unlocked. |

The existing shared scheduler derives story state from native vertical scrolling. It emits one Pixel-only event. Player position, camera progression, portal opening, project phases, and section travel are mapped from that state. Backward scrolling returns to the corresponding earlier positions and captions. Ambient clouds, stars, and idle movement use time rather than scroll; these decorative cycles do not rewind.

Phones receive a portrait opening canvas. At widths up to 450px, project art uses a square camera that pans across the original world rather than shrinking its complete landscape into a small letterboxed picture. Ground position adapts to short screens so dialogue does not conceal the explorer.

## Levels and project interactions

- **Level 01 — The Builder:** a workshop with bookshelves, a monitor, a bench, and the engineering introduction. This is the final prologue state, followed by the accessible Selected Work chapter.
- **Level 02 — The Fortress of Trust:** the explorer approaches a guarded stone fortress. Identity runes illuminate, the gate retracts, and a document crosses the controlled passage. The HTML story names authentication and sharing conditions; the actual TrustShare description, contributions, stack, and repository link remain available.
- **Level 03 — The Forge of Creation:** a written reading-dashboard requirement enters a mechanical forge. Six stages show the idea, intent processing, connected UI/data/API schemas, a string-to-number field correction, compilation, and an illustrated application emerging from the chamber. Cogs, lights, and the assembly motion accompany the scroll state. This is an illustration, not a live AI call or authentic product screenshot.
- **Level 04 — The Arena of Intelligence:** the camera changes from a compressed approach to a venue overview. An illustrative crowd zone and an accessible concourse route appear. The route marker follows a computed polyline; the phone camera follows the route into the right-hand concourse. No operational metrics are fabricated.
- **Level 05 — The Temple of Probability:** sample points accumulate inside a square and quarter circle. The numeric estimate and convergence graph both use the existing deterministic samples. The final chest is decorative; the mathematical result is available without interacting with it.
- **Level 06 — The Builders Guild:** a guild building, mission board, chest, and traveling explorer frame the existing Layer5/Meshery contribution records. Existing PR statistics remain explicitly archived snapshots.
- **Adventure log and achievement hall:** a pixel route links academy, workshop, data laboratory, and guild locations. The authentic timeline remains readable below it. The hall illustrates the existing Top 5 internship recognition, Rank 525 result, and internal SIH selection without inventing job roles or awards.
- **Ability tree:** five selectable branches cover Frontend, Backend, Data, AI, and Delivery. Lines connect the actual button locations to the central builder node. Focus or selection illuminates one branch and reveals its tools and explanation. Skills come from the existing portfolio; there are no numerical proficiency scores.
- **Last portal:** a calm overlook recalls earlier places and leads into “Quest complete” and the conversation heading. Contact methods and the existing résumé controls remain ordinary accessible actions.

## Optional exploration

Exploration is explicit opt-in and confined to the opening region. A/D or Left/Right move, Space jumps, E/Enter inspects nearby objects, and Escape exits. On-screen movement, Jump, and Inspect controls support pointer/touch use. The chest reveals a small fictional builder's-notebook keepsake; it is not a professional achievement or a required unlock.

Bindings act only inside the focused game region, ignore browser shortcut modifiers, and do not intercept Tab. Page navigation keys return to the story without preventing their default scrolling. Wheel/swipe, leaving the region, and Skip to projects exit exploration. A short anchoring guard prevents the expanded on-screen controls from cancelling their own mode. Keepsake state is memory-only; no storage is required. All portfolio information remains available without exploration.

## Files changed

- `pixel-adventure.js`: original Canvas drawing routines, scroll mappings, mobile cameras, optional controls, ability-tree interaction, deterministic probability rendering, and lifecycle.
- `pixel-adventure.css`: Pixel-only layout, materials, typography, world framing, focus states, phone composition, and reduced-motion rules.
- `assets/adventure-pixel.ttf`: original 5x7 display font, 17,340 bytes.
- `tools/build_adventure_font.py`: reproducible font builder using only Python's standard library; contains the original glyph patterns.
- `assets/adventure-art.txt`: provenance for the new font and artwork.
- `index.html`: loads the new Pixel stylesheet and controller.
- `multiverse.js`: emits `portfolio:pixel-frame` and bypasses Pixel's replaced ambient drawing. The other lens branches are unchanged.

## Performance and lifecycle

There is no game-engine dependency, external art request, or large texture download. New JS, CSS, and font total approximately 73 KB before compression. Canvas uses small logical resolutions and disables image smoothing. Rectangles and sprite coordinates snap to logical pixels. Phones use fewer ambient stars/motes, a 360px-wide opening, and a shared offscreen camera buffer.

One animation scheduler serves the nine Pixel canvases. IntersectionObserver limits painting to visible scenes, hidden documents stop scheduling, and render frequency is capped at 30fps, or 20fps on devices reporting four or fewer logical cores. Those are targets, not a measured device-performance guarantee. The numerical plot is cached until its sample count changes.

Leaving Pixel cancels its frame request, disconnects its scene/tree observers, removes input/resize/visibility/intent handlers, clears held keys, and hides the owned elements. One persistent mode observer is responsible for later activation. The display font and SVG/Canvas art are separate from the previously downloaded restricted fonts.

## Actual verification

- Node syntax checks passed for the Pixel controller and shared engine. Git whitespace checks passed. The font's sfnt checksum is `0xb1b0afba`; it loaded successfully in the browser without font warnings.
- Captured the opening at 0%, 20%, 40%, 60%, 80%, and 100%, and inspected all project worlds at the same six positions. The compiler has distinct intent, schema, correction, compilation, and result compositions.
- Reverse opening test: at 40%, player x=237 and camera travel=203.84; after visiting 100% and returning to 40%, both values matched. Returning to 0% restored player x=109, camera 0, and closed portal.
- Reverse mathematics test: 60% produced 1,088 samples and pi approximately 3.1691; 100% produced 1,800 samples and 3.1667; returning to 60% reproduced 1,088 and 3.1691. More samples are not claimed to improve every intermediate estimate monotonically.
- Actual iframe layout widths tested: 320, 390, 430, 768, 1280, 1440, and 1920px. Opening, compiler, skills, and contact document widths matched their client widths at all seven sizes. The iframe scrollbar subtracts 15px from the chosen frame width. A 320×667 layout and the native shorter desktop viewport were additionally inspected for dialogue/sprite overlap.
- Native keyboard movement reached the chest and E revealed the notebook. Space, Escape, Page Down, and focus restoration were exercised. On the phone layout, three on-screen Right actions followed by Inspect reached the same keepsake. Ability selection worked through keyboard and pointer with exactly one selected branch and active connection.
- Repeated Pixel → Modern → Pixel → Bohemian → Pixel switching restored scroll position zero, opening phase zero, and exploration disabled. Exactly one opening world remained in the document. Its render counter stayed unchanged at 1069 while Pixel was inactive during a separate test interval.
- Compared initial desktop heading, hero, world-stage, project-visual, contact, and skills dimensions plus computed typography/background/border/display to `361ecac` for Modern, Bohemian, Retro, Vector, 3D, Sketchbook, Editorial, and Victorian. All eight matched. This is a measured initial-state regression check, not a screenshot diff of every state of every lens.
- A local reduced-motion harness applied the preference to initialization and styles. It displayed the final workshop, unpinned project scenes, and immediate résumé access without a video source. Its frame counter stayed at 2 across subsequent interaction, confirming no ambient loop. Native OS preference switching was not used.
- The exact supplied MP4 remained unloaded before résumé activation, then played once with contained aspect ratio while the document stayed hidden. Natural completion opened the existing résumé rendering. Skip, original PDF/download links, Close, and Escape were verified. The fresh desktop browser error/warning log was empty.

Local screenshots and structured evidence are in the ignored `review-evidence/pixel/` directory. Temporary responsive, baseline, and reduced-motion harnesses remain under ignored `.reference-review/`. These test pages are not part of the shipped site. No screen recording was captured; screenshots are supplemented by observed state and input checks.

## Remaining limits

Physical mobile devices, Safari, assistive-technology announcements, sustained GPU/CPU profiling, and the low-core render policy on real low-end hardware remain untested. Pixel art uses low-resolution Canvas, with crisp CSS scaling where practical; fractional display scaling can produce unequal physical pixel widths. Exploration is a contained bonus rather than a full collision-based platform game.

The actual résumé, rendered PDF page, supplied anime MP4, and restricted downloaded fonts remain local under the existing exclusions. The footage still requires distribution-rights review before public deployment. This branch is for review only and has not been merged or deployed.
