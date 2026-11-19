# Museum of Making — reference audit and scene design

## Diagnosis and retained engineering

The rejected prototype used repeated emissive gateway assemblies, dark empty backgrounds, generic panels and nodes, and a palette without meaningful material differences. Its project subjects were weakly recognizable. A real perspective camera did not compensate for that absence of object design. The prototype is preserved under ignored `.reference-review/rejected-spatial/`, with earlier camera-traversal screenshots under `review-evidence/spatial/`.

Retain the lazy Three.js dependency, one renderer, native scroll progress, explicit resource disposal, and accessible HTML. Rebuild the environments, materials, objects, camera shots, fallback illustrations, and surrounding UI. No new recording file was attached to the correction; no review of an unavailable recording is claimed.

## Live reference audit

The four main URLs were opened in the real in-app browser on 19 November 2026. These observations concern the visible portions actually inspected, not their entire source or every interaction.

| Reference | Identity, palette, and material | Composition, motion, and 3D | Content relationship and transferable principle | Do not copy |
| --- | --- | --- | --- | --- |
| [Inacio Nakiti](https://inacionakiti.com/?v=site) | Restrained typography; the Story experience uses near-black, pale type, and a particle subject. | Site/Story selector; large subject occupies the right/center while a short story beat occupies the left. Chapter controls and a skip action remain explicit. The particle composition is spatial; complete intermediate morph sequences were not examined. | The narrative introduces the creator directly. Use short, legible camera-stop captions and an immediate route to ordinary portfolio information. | Particle forms, signature composition, creator copy, sound, and chapter branding. |
| [Mowa](https://mowa.studio/) | Black-on-black objects with shaped highlights, clean white typography, an alignment grid, and restrained interface controls. | Large, smoothly modeled cross-shaped forms have consistent highlights; the brand typography is integral to the hero. | Materials and scale carry the main composition. Give a few carefully modeled exhibits visual prominence instead of filling space with small effects. | Its logo, cross forms, grid composition, brand treatment, and artwork. |
| [Shutabug](https://shutabug.com/) | The loaded gallery showed a warm white curved display wall, dark foreground/background, framed or mounted artworks, labels, and focused light pools. | A room-sized wall establishes physical space; repeated artwork mounting and light scale tie the collection together. | Actual artworks are the purpose of the architecture. Build engineering exhibits with consistent mounting, captions, table heights, and lighting. | Artwork, gallery geometry/layout, collection names, and ecommerce interface. |
| [Estheet](https://estheet.com/) | Dark editorial setting, warm gilded frames, pale serif typography, and artwork captions. | Large art presented with a scale-conscious composition; chapter navigation includes scale, close viewing, gallery light, and the museum. The Gallery light chapter's text explicitly describes track-light pools, frame shadows, and reflected artwork color. | Pair a meaningful object with its caption and make light explain its physical position. Keep motion subordinate to examining the object. | Paintings, frame design, editorial layout, wording, and distinctive museum arrangement. |

The linked `museum.estheet.com` destination timed out in the browser. Its navigable interior was not verified; the Estheet main site and Shutabug gallery provide the verified architectural observations.

## Design system

- Palette: architectural white `#F1EEE8`, charcoal `#202322`, stone `#D1C8BD`, warm gray `#A9ABA5`, brass `#B58B59`, terracotta `#A75D47`, sage `#819588`. Light is warm-neutral; accent colors identify exhibits, not arbitrary interaction glow.
- Materials: rough plaster walls, subtly mottled concrete floors, satin aluminum, brass trim, timber desktops, dark graphite equipment, lightly tinted glass, and readable screen surfaces. Original procedural textures and modeled assemblies; no borrowed model or artwork.
- Architecture: human-scale floors, pilasters, door reveals, roof beams, track fixtures, skylights, benches, display tables, wall plaques, and skirting. Shared construction establishes one institution; room contents establish the differences.
- Lighting: broad warm daylight plus focused exhibit lights; one restrained shadow source and contact shadows. No bloom, cosmic fog, star fields, or luminous rings.
- Typography/UI: architectural editorial serif for major story titles, quiet sans-serif body, clear exhibition labels, warm paper controls. Essential content stays HTML.
- Camera: 42–48° desktop field of view, adapted portrait framing, upright orientation, no roll. Progress-derived smooth interpolation; stable reading stops. Each shot has a named subject. Natural scrolling pins major scenes and releases after the final hold.
- Relevance: every primary object below has a physical referent and an explanatory role. Architectural details exist to establish scale, light, and continuity.

## Storyboard before implementation

Coordinates are intended scene units; composition may be adjusted after browser inspection. The museum's forward axis is negative Z.

| Scene | Initial → final camera; subject and reveal | Object cause/effect; introduced information | Architectural handoff |
| --- | --- | --- | --- |
| Entrance | `(16,9,30)` → `(0,5,-18)`; establish portico, enter double doors, reveal central engineering workstation. | Doors slide apart as the visitor approaches; the installed workstation introduces Abhishek and engineering interests. | Interior display doorway points toward the Secure Archive. |
| TrustShare / Secure Archive | `(14,10,23)` → `(12,9,20)` via a close view of the vault and workstations. | A physical access reader and vault door respond to authorization; a document passes along a protected channel from sender to receiver. Real permission conditions remain HTML. | Charcoal archive opens back into the shared stone gallery. |
| Compiler / Application Workshop | `(13,9,22)` → `(1,5,11)`; inspect a timber workstation and large display. | Requirement → schematic → validation → assembled screen components → readable application. Output is labelled illustrative. | Timber and plaster continue into the model gallery. |
| Stadium / Model Gallery | `(17,15,22)` → `(4,22,15)`; full stadium miniature on a table, then an overhead interpretation. | Seating, field, roof supports and entrances establish identity; routes and the illustrative zone explain accessibility/assistance. | Model table aligns with the next experimental table. |
| Probability / Laboratory | `(13,12,20)` → `(4,15,15)`; physical mathematics table and a numerical display. | Reproducible square/quarter-circle points accumulate; the displayed estimate and plot derive from those samples. | Pale stone and glass lead to contribution wall. |
| Open source | `(13,7,20)` → `(0,6,15)`; three mounted contribution panels. | Selection highlights real testing, documentation, or quality contributions. No fabricated GitHub UI. | Wall and track fixtures continue into the timeline corridor. |
| Experience | Walk a lit corridor between five stops, camera near each relevant exhibit. | Academic desk, development workstation, analysis display, collaboration wall, and recognition plaques. One current HTML description; final recognition holds before release. | Corridor ends in the engineering workshop. |
| Skills | `(14,10,22)` → a selected workstation within the same studio. | Five organized desk zones expose actual tools with HTML button equivalents. | Workshop opens onto recognition displays and atrium. |
| Achievements | Move between three recessed recognition plaques. | Verified Top 5, Rank 525/80,000+, internal SIH selection; framed text and simple physical award objects rather than floating icons. | Same daylight and stone as the final atrium. |
| Finale | `(13,9,25)` → `(2,6,16)`; open skylit atrium, central workbench, calm seating. | The completed workbench recalls making; contact invitation and real links conclude the journey. | Back-to-chapters and résumé remain immediately usable. |

## Quality gates

For each major scene, visually assess recognizability, relevance, art direction, composition, motion, narrative, and professional usability on the requested 0–5 scale. A scene below 4 on recognizability, relevance, composition, or narrative requires revision. Scores will be recorded only after actual browser inspection, with screenshot references and observed shortcomings; no perfect or performance scores are assumed in advance.
