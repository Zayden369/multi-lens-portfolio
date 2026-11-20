# AI Swarm — The Autonomous Builders

## Audit and scope

Base: clean `codex/resume-cinematic-final-reveal` at `dc47b3b`. The current nine lenses, animated chooser, supplied-video résumé controller and circular reveal were all present. Work is on `codex/ai-swarm-autonomous-builders`. No merge or production deployment is part of this change. The ignored replacement résumé video and matching final-frame image remain untouched.

Canonical content is `index.html` and `app.js`. The shared registry and circular transition are in `multiverse.js`; the chooser is generated from that registry. Existing controllers use root `data-mode` observation. The new lens follows that architecture and excludes itself from the shared generic ambient-canvas loop. It has no new framework, server, model service or production dependency.

## References and original direction

Reviewed the supplied **Agentic Build** MP4: 57.33 seconds, portrait 720×1280, H.264 / 30 FPS, AAC audio. Sampled the complete sequence into a local contact sheet. Its screen recording shows cursors at component edges, a progressively assembled dark portfolio, an automatic trip through sections and a final completed page. The supplied video is a reference only and is not embedded or published.

Read [Joel Califa's Swarm repository](https://github.com/califa/swarm-site), [Swarm Rebuild's explanation and licensing caveat](https://github.com/DhvanilPatel/swarm-cursors), and [Agents at Work](https://www.avivashishta.com/blog/agents-at-work-a-page-that-builds-itself). These informed the general concept of causal construction and visitor takeover. No repository animation source, cursor sprites, assets, sound, branding or distinctive choreography was copied, adapted or vendored. The original live site returned no readable page content to the web reader; it was not visually inspected in this task.

Graphite `#131619`, secondary surface `#1d2226`, warm off-white `#f1f1ed`, cool gray `#9fa8ac`, blueprint blue `#75b8ef`, amber `#e8b66b`, sage `#85c9ac`, muted violet `#bd9ced` and coral `#e98f8c` define a collaborative engineering workspace. Technical system typography and quiet line work keep portfolio content prominent. There is no cyberpunk glow, chatbot illustration or copied logo.

## What is implemented

The registry adds only `swarm` / **AI Swarm** / **The Autonomous Builders**. Saved selection accepts that key. The chooser says ten perspectives and retains its five-column desktop grid, yielding two complete rows. The tenth miniature has an outline-drawing cursor, type cursor, interface builder and QA cursor; it constructs a small page, gathers the cursors and resets on a 7.4-second CSS loop. The existing preview manager handles it without another observer or render loop.

The dedicated controller lazily adds owned artwork, a pointer-transparent decorative layer, 16 cursor/guide/caret sets and a small status panel. No actual section is removed, no original link is replaced, and no professional content is fabricated. Real elements are visually clipped during construction, with their full text remaining in the semantic DOM and their geometry unchanged. Any deliberate interaction, focus navigation or Skip reveals the full content immediately. The presentation identifies itself as **SIMULATED AGENT BUILD**.

### Roles and causal construction

- **Layout** travels to the actual target and drags a measured bounding frame.
- **Type** reveals the existing text along cached character geometry, with a caret at the visible frontier; actual text is not rewritten or reflowed.
- **Interface** constructs controls and card surfaces at their actual locations.
- **Visual** draws the relevant illustration into the target region.
- **Motion** reveals interface connections and paths.
- **Content** integrates existing descriptions, labels and technical stacks.
- **QA** traverses the completed region's perimeter after its prerequisites finish.
- **Orchestrator** participates in the initial coordinated arrival and task allocation.

The pure `TaskGraph` stores IDs, role, target, action, dependencies, duration, priority, state and progress. It rejects missing prerequisites, duplicate IDs and cycles. A target's layout frame precedes its content tasks; sequential graphic parts depend on the previous part; QA depends on the complete group. Up to five independent jobs run concurrently, assigned from one cursor pool. Each job includes travel, its visible action and a small completion interval. Graphics are inline SVG/HTML, so there are no delayed remote image assets.

### Build stages

| Stage | Concrete work |
| --- | --- |
| Hero identity | Real signature and navigation, existing headline typed in place, verified introduction and Work action. |
| Hero workspace | Original browser/workspace study: navigation rail, heading, interface cards, chart, system connections and validation label. A separate stage keeps the visual accessible on tall mobile layouts. |
| Work catalogue | Existing heading and introduction, then four genuine internal jump links to owned project exhibits. |
| TrustShare | Existing facts and repository action; sender document, access boundary, recipient and permitted path. Labels use identity, password, expiry, view limits and revocation. |
| AI Application Compiler | Existing project facts; reading-progress requirement, connected UI/data/API configuration, validation label, then a real HTML reading-dashboard illustration with sidebar, books, progress and chart. It is clearly illustrative output. |
| StadiumPulse | Existing facts; segmented stands around a field, concourse, entrance route, assistance marker and accessible route. No invented crowd measurements. |
| Monte Carlo | Existing facts; square and quarter-circle, 480 reproducible samples, matching convergence trace, inside count and computed pi estimate. The HTML caption exposes the numerical result too. |
| Open source | Existing Layer5/Meshery introduction, individual testing/documentation/quality records and historical contribution snapshot. |
| About and experience | Existing biography, individual verified timeline cards and recognition items. |
| Skills | Existing technical groups and technologies. No proficiency scores. |
| Contact | Existing invitation, email, résumé actions and social links. The final QA task completes before the flock takes over. |

## Tour, standby and navigation

One animation callback coordinates the build clock, dependency scheduler, cursor motion and smooth camera interpolation. Group destinations derive from real document positions. Text geometry is cached, and camera movement does not remeasure the page on every frame. Font changes and resize invalidate geometry. Desktop and narrow layouts use normal document flow rather than long pinned scenes; narrow/coarse-pointer task durations are shorter.

Genuine wheel, touch, pointer, keyboard, link and content-control input immediately stops the tour, resolves all remaining clips, removes guides and preserves the visitor's viewport. Programmatic scrolling does not generate those interruption signals. Skip also finishes at the current position. Replay deliberately resets to the top without duplicating content, agents or listeners. Replaying after Effects Off turns effects back on, preventing masked content with no running clock.

After completion or takeover, desktop cursors converge around the most recently observed pointer position. Spring/damping movement, separation, bounded positions and a pointer exclusion radius keep the formation controlled. Hovered controls receive additional avoidance and standby labels are hidden. On coarse/narrow devices six cursors settle in a compact formation beside the status area rather than chasing a nonexistent mouse.

Internal links retain native navigation. A short subset draws/inspects the actual destination region; existing venue/sharing routes are traced when relevant. This is a brief contextual reaction, not a replay of the entire portfolio. External, email, PDF and repository links are not cancelled or delayed.

## Lifecycle and accessibility

Only an active Swarm lens owns its animation frame loop and input listeners. A hidden document pauses its clock. Opening the résumé or chooser resolves unfinished construction, cancels the loop and hides the decorative cursor layer. After dismissal, the page resumes in ready/standby state rather than restarting an abandoned tour. Leaving the lens aborts its active listeners, cancels its callback, clears camera/reactivation state, restores original element clipping/opacity and hides owned UI/artwork. Returning does not mount another instance.

Reduced motion shows the finished page immediately, removes continuous cursor motion and preserves normal links and résumé behavior. Hash entry likewise starts with complete content at the visitor's intended destination. Decorative cursor artwork is aria-hidden, inert and pointer-transparent; it cannot steal focus or clicks. The controls have visible keyboard focus and 44px minimum heights. Original semantic headings, descriptions, links and résumé remain authoritative. A presentation exception fails open to the complete page with effects stopped.

## Checks actually performed

- JavaScript syntax and Git whitespace checks.
- `node tools/check_swarm.mjs`: dependency ordering and invalid-graph guards, full simulated autonomous tour, no forced scrolling after takeover, three replay cycles, one active callback, hidden-document suspension, résumé/chooser suspension, mode switching, Effects Off → Replay recovery, reduced motion, hash entry and six mobile agents.
- Deterministic experiment: 480 computed samples, 375 inside, estimate **3.125**; the graph and count derive from the same sequence.
- Exact source comparison of `resume-cinematic.js` and the circular lens transition against `dc47b3b`; original project/contact links remain present.
- `node tools/check_lens_previews.mjs`: ten unique previews, unchanged button/handler identity, offscreen/closed/hidden/reduced-motion lifecycle, observer fallback and repeated opening/closing.
- `node tools/check_resume_release.mjs`, `node tools/check_archive_dom.mjs` and `node tools/check_editorial_dom.mjs`: existing integrations still pass.

These use LinkeDOM and synthetic geometry/fake animation frames. They do **not** render CSS, test native browser scroll behavior, establish visual causality/legibility, prove screen-reader behavior or measure FPS/GPU/memory. Test dependencies remain ignored under `.reference-review/editorial-test/node_modules`.

## Browser limitation and unfinished acceptance

**Actual browser visual validation has not been completed.** The supported unified browser tool repeatedly returned `computer-use request timed out: service_info` before selecting any page. The supported Windows fallback also timed out on `list_windows`. No browser screenshot, motion recording, rendered mobile result or performance score is claimed. The brief's hero visual gate and final visual acceptance therefore remain outstanding; this is reviewable implementation, not a visual sign-off. No production deployment was attempted.

Local reference evidence and synthetic observations are under ignored `review-evidence/swarm/`. They include the supplied-video contact sheet and test observations; they are not screenshots of the new page.

## Remaining browser checklist

1. Select AI Swarm through the actual chooser; watch the circular reveal, closed initial construction, arrival and hero tasks. Confirm the cursors visibly cause each change rather than masking unrelated content.
2. Watch the full autonomous tour. Check every graphic, typing frontier, QA pass, brief completed hold, stage framing and final pointer convergence.
3. Interrupt with wheel, touch, keyboard and navigation. Confirm no subsequent snap-back and immediate content access. Try Skip immediately and halfway through; Replay several times, including after Effects Off.
4. Use every internal project jump and chapter link, then external/social/PDF actions. Verify short local reactions and normal navigation.
5. Open/close résumé and Change Lens during arrival, building and standby. Verify no swarm over the media/dialog and no scrolling behind it. Switch among all ten lenses, including back to Swarm.
6. Check 320/390/768px and desktop/short-height layouts. Inspect control clearance, text legibility, cursor clipping and absence of horizontal overflow. Test touch standby and resize during a job.
7. Exercise reduced motion, hidden tabs, saved Swarm selection, direct hash entry, back/forward, font readiness and missing-art fallback behavior. Inspect animation and memory profiles; record the complete sequence if capture is available.

## Files

- `ai-swarm-core.js`: pure dependency and motion/data helpers.
- `ai-swarm-art.js`: original hero/project illustrations and HTML compiler example.
- `ai-swarm.js`: manifest, lifecycle, construction, camera, cursor coordination and reactivation.
- `ai-swarm.css`: scoped workspace, responsive composition and owned UI.
- `index.html`, `multiverse.js`: stylesheet/scripts, tenth registry key, storage validation and chooser caption.
- `lens-preview-art.js`, `lens-previews.css`, `lens-previews.js`: tenth miniature and registry-neutral comment.
- `tools/check_swarm.mjs`, `tools/check_lens_previews.mjs`: new integration checks and dynamic chooser count.
- `README.md`, this report: usage, scope and verification limits.

Optional future refinements: sound remains omitted (the brief makes it optional); physical-device, Safari, assistive-technology and live performance profiling await browser access. No claims of real autonomous AI or runtime source editing are made.
