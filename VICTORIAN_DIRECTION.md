# Victorian — The Mechanical Archive

## Audit and boundary

Start: clean `codex/editorial-living-magazine`, commit `1fca75e`; Parts 1–8 are present in the active history. Editorial's post-change visual QA remains pending. The Victorian branch is `codex/victorian-mechanical-archive`. Build Victorian first, commit it, then implement the animated selector as a second focused commit on this branch. No merge or deployment.

The canonical project facts are in `app.js` and `index.html`. `multiverse.js` owns nine keys, chapter progress, circular reveal, top reset and the unchanged JJK/PDF viewer. Victorian currently consists of the generic clock/gear canvas and scoped parchment/double-border rules in `style.css` and `multiverse.css`. The selector builds nine buttons with `data-lens`, an aria-hidden Aa swatch, name and description; existing button closures call `changeLens`, and `aria-pressed` identifies the current lens. Preserve those buttons and handlers when changing previews.

Browser control was initially unavailable. The Windows Computer Use tool became available later, and its skill, guidance, API and confirmation rules were read. Its attempt to access the selected Chrome window returned “Computer Use was not approved to use Google Chrome.” No further browser inputs were attempted. Source/DOM checks and HTTP readiness passed; rendered scenes, keyboard behavior and performance remain unverified. Do not treat these checks as visual acceptance.

## Art direction and materials

Parchment `#EDE2CB`, walnut `#382B26`, oxblood `#6D3038`, brass `#B39259`, forest `#30483D`, ivory `#F6F0E3`, ink `#252421`, bronze `#86694A`. Wood grain, fine engraved hatching, stone joints, iron latches, controlled brass highlights and warm interior light establish distinct materials. Avoid a yellow wash or neon effects.

Original SVG assemblies and layered perspective communicate a physical archive without a new 3D runtime. Reuse the already licensed Instrument Serif for inscriptions; use readable Georgia/Arial body text and monospace code labels. Important facts remain HTML, and the mechanical scenes are explicitly metaphors for modern software.

Common gear pitch governs connected gears: pitch radius / tooth count is constant, center distance equals the sum of pitch radii, directly meshing gears have opposite rotation, and speed is inversely proportional to tooth count. Door locks retract before doors open. Drawers translate on rails. Camera framing is progress-derived and reverses with scroll. No autonomous decorative gear loops in the full lens.

## Storyboards

| Scene | Meaningful construction and sequence | Information / handoff |
| --- | --- | --- |
| Entrance | Monumental carved doorway and astronomical clock → coupled gears/pendulum → retracting pins → weighty door opening → approach through the threshold → central archive case opens | Introduces Abhishek and full-stack/backend/AI interests. The first document case leads to TrustShare. Narrow screens focus the entrance and retain separate HTML captions. |
| Vault of Trust | Document at sender → identity mechanism → verified link conditions → wheel/locks retract → door opens and document travels → recipient and complete system | Password, expiry, limits, revocation; actual React/FastAPI/PostgreSQL stack. The physical vault is an explanatory metaphor, not claimed infrastructure. |
| Automaton of Creation | Requirement enters feed rollers → coupled calculation registers → UI/data/API plates → inspection of typed progress → output blueprint unfolds → readable HTML reading application | Verified structured generation, validation, repair/fallback concepts. Output is illustrative. Paper feed and output assembly carry the story instead of unrelated gears. |
| Grand Stadium Model | Detailed scale model on a timber display table → closer structural view → entrance/concourse route → assistance zone → accessible path → overview | Recognizable stands, pitch, roof supports, entrances and technical pointer. No invented venue metrics or operational outcomes. |
| Probability Chamber | Quarter-circle question → framed precision plotting surface → actual deterministic samples → inside/outside count → corresponding convergence graph → computed result | Slider/stylus coordinates follow the current sample; counters derive from those samples. No Galton-board metaphor for an unrelated experiment. |
| Collaboration | Filing cabinet drawers expose testing, documentation and quality records | Actual Meshery contributions; historical counts stay labelled; no invented PR identifiers. |
| Chronicle | Calibrated rail moves between education, Infosys, Maincraft, Meshery and recognition; one compartment opens at a time | One readable description, real dates, final hold before release; original full biography and AWS community role remain available. |
| Workshop | Focused drafting, logic, indexing, structured-generation, delivery and inspection stations | Actual tool stacks in HTML; optional selector supplements scroll. No fake proficiency values or claimed cloud topology. |
| Distinctions | Framed illustrative recognition plates | Top 5, rank 525 / 80,000+, internal SIH selection; no fabricated certificates. |
| Finale | Central clock aligns and becomes still; warm light and contact invitation | Contact actions are immediately available; no mandatory waiting. |

Use owned, scoped DOM/CSS, a Victorian-only scheduler event, native sticky sequences and ordinary facts below them. Reduced motion exposes final illustrations and removes runways. Retain direct facts/chapter bypass, visible focus and responsive compositions. Build separate pure mechanical helpers so gear relations and progress states can be tested without claiming rendered quality.
