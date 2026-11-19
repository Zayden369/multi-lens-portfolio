/* Modern is an additive scene controller. The shared engine owns scroll timing. */
(() => {
  const html = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointerDevice = matchMedia('(pointer: fine)');
  const hero = document.querySelector('#home');
  const worldStage = hero.querySelector('.world-stage');
  const clamp = value => Math.min(1, Math.max(0, value));
  const ramp = (value, start, end) => clamp((value - start) / (end - start));
  const smooth = value => value * value * (3 - 2 * value);

  const environment = document.createElement('div');
  environment.className = 'lab-environment';
  environment.innerHTML = `
    <div class="lab-horizon"></div><div class="lab-floor"></div>
    <div class="lab-architecture">
      <div class="lab-corridor"><i></i><i></i><i></i><i></i><i></i></div>
      <svg class="lab-circuits" viewBox="0 0 800 650" fill="none">
        <path d="M20 140H140L210 210V270H290 M780 140H660L590 210V270H510 M0 500H160L230 430H300 M800 500H640L570 430H500"/>
        <path d="M160 20V85L290 155 M640 20V85L510 155 M160 650V570L290 500 M640 650V570L510 500"/>
      </svg>
      <div class="lab-gateway">
        <div class="lab-gate-frame"><svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none"><defs><linearGradient id="lab-frame-metal" x2="1" y2="1"><stop stop-color="#9aaeb9"/><stop offset=".3" stop-color="#253c4b"/><stop offset=".65" stop-color="#6d8c9b"/><stop offset="1" stop-color="#263b49"/></linearGradient></defs><path d="M13 2H87L98 11V89L87 98H13L2 89V11Z" stroke="url(#lab-frame-metal)" stroke-width="3"/><path d="M14 4H86L96 12V88L86 96H14L4 88V12Z" stroke="#93bacb" stroke-opacity=".3" stroke-width=".4"/></svg></div>
        <div class="lab-door lab-door-left"><i></i><b></b><span>AG</span></div>
        <div class="lab-door lab-door-right"><i></i><b></b><span>LAB</span></div>
        <div class="lab-lock"><i></i><i></i><i></i><i></i></div>
      </div>
      <div class="lab-specialties"><span>Full-stack engineering</span><span>Backend systems</span><span>AI applications</span></div>
    </div>`;
  worldStage.append(environment);
  environment.append(environment.querySelector('.lab-specialties'));

  const heroStatus = document.createElement('div');
  heroStatus.className = 'lab-hero-status';
  heroStatus.innerHTML = '<span class="lab-state">System offline</span><div class="lab-phase-track" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><a href="#work">Enter the work ↘</a>';
  hero.querySelector('.hero-grid').append(heroStatus);
  const stateLabel = heroStatus.querySelector('.lab-state');

  function makeScene(visual, title, inner) {
    const scene = document.createElement('div');
    scene.className = 'lab-project lab-' + title;
    scene.innerHTML = inner;
    visual.append(scene);
    return scene;
  }

  const compiler = makeScene(document.querySelector('.compiler'), 'compiler', `
    <div class="lab-scene-top"><span>AI Application Compiler</span><span>Illustrative sequence</span></div>
    <div class="lab-scene-heading"><small class="lab-scene-step">Requirement</small><h4>Start with an idea.</h4></div>
    <div class="lab-compiler-space">
      <div class="lab-prompt"><div><i></i><i></i><i></i><span>application.intent</span></div>
        <p>Build a dashboard that tracks <strong>reading progress.</strong></p>
        <span class="lab-prompt-note">Natural language → structured application</span>
      </div>
      <svg class="lab-network" viewBox="0 0 700 420" fill="none" aria-hidden="true">
        <path d="M350 75V135 M350 135H130V210 M350 135H570V210 M350 135V210 M130 245V300H350 M570 245V300H350 M350 245V345"/>
      </svg>
      <div class="lab-layer lab-layer-ui"><small>INTERFACE</small><b>Reading dashboard</b><code>UI.schema</code></div>
      <div class="lab-layer lab-layer-api"><small>API</small><b>Book operations</b><code>GET /books</code></div>
      <div class="lab-layer lab-layer-data"><small>DATA MODEL</small><b>Book · Progress</b><code>progress: number</code></div>
      <div class="lab-repair"><span>Cross-layer validation</span><del>progress: string</del><strong>progress: number ✓</strong><small>Targeted repair · Valid modules preserved</small></div>
      <div class="lab-dashboard">
        <div class="lab-dashboard-bar"><b>Reading room<span> / Personal library</span></b><span>Illustrative preview</span></div>
        <div class="lab-dashboard-body">
          <aside><span class="chosen">Overview</span><span>My books</span><span>Reading log</span></aside>
          <div class="lab-dashboard-content"><small>YOUR LIBRARY</small><h5>A little further, every day.</h5>
            <div class="lab-dashboard-stats"><div><strong>3</strong><span>Books in progress</span></div><div><strong>68%</strong><span>Illustrative progress</span></div></div>
            <div class="lab-book-row"><i></i><div><b>Designing systems</b><span>72% complete</span><progress value="72" max="100"></progress></div><em>Continue ↗</em></div>
            <div class="lab-book-row"><i></i><div><b>Thinking in code</b><span>43% complete</span><progress value="43" max="100"></progress></div><em>Continue ↗</em></div>
            <div class="lab-book-row"><i></i><div><b>Creative practice</b><span>89% complete</span><progress value="89" max="100"></progress></div><em>Continue ↗</em></div>
          </div>
        </div>
      </div>
    </div>
    <div class="lab-project-timeline" aria-hidden="true"><span>Intent</span><span>Structure</span><span>Validate</span><span>Assemble</span><span>Result</span><i></i></div>`);

  const sharing = makeScene(document.querySelector('.sharing'), 'sharing', `
    <div class="lab-scene-top"><span>TrustShare</span><span>Illustrative access flow</span></div>
    <div class="lab-scene-heading"><small class="lab-scene-step">Protected document</small><h4>Trust is a sequence of checks.</h4></div>
    <div class="lab-share-system">
      <div class="lab-identity"><i>AG</i><b>Sender</b><span>Authenticated owner</span></div>
      <svg viewBox="0 0 600 200" class="lab-share-lines" fill="none" aria-hidden="true"><path d="M65 100H535"/><path d="M300 100V185"/></svg>
      <div class="lab-file"><svg viewBox="0 0 100 120" fill="none" aria-hidden="true"><path d="M15 5H65L85 25V112H15Z M65 5V25H85 M30 49H68 M30 65H68 M30 81H55"/></svg><b>project-notes.pdf</b><span>Protected document</span></div>
      <div class="lab-recipient"><i>↗</i><b>Recipient</b><span class="lab-access-state">Awaiting access</span></div>
      <div class="lab-permissions"><span><i></i>Identity verified</span><span><i></i>Password protection</span><span><i></i>Expiry & view limits</span><span><i></i>Revocable access</span></div>
    </div>
    <div class="lab-bottom-note">Access is granted after the sharing conditions are satisfied.</div>`);

  const stadium = makeScene(document.querySelector('.stadium'), 'stadium', `
    <div class="lab-scene-top"><span>StadiumPulse AI</span><span>Illustrative operations map</span></div>
    <div class="lab-scene-heading"><small class="lab-scene-step">Venue overview</small><h4>A clearer path through the crowd.</h4></div>
    <svg class="lab-stadium-map" viewBox="0 0 700 400" fill="none" aria-label="Illustrative stadium with an alternate accessible route">
      <defs><pattern id="lab-seat-grid" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.3" fill="#7991a0"/></pattern></defs>
      <rect x="95" y="40" width="510" height="310" rx="150" fill="url(#lab-seat-grid)" stroke="#4e6679"/>
      <rect x="140" y="80" width="420" height="230" rx="110" stroke="#536d80"/>
      <rect x="185" y="115" width="330" height="160" rx="72" stroke="#5a798d"/>
      <rect x="260" y="140" width="180" height="112" fill="#163c3b" stroke="#6c9e95"/>
      <path d="M350 140V252 M260 175H285V217H260 M440 175H415V217H440" stroke="#70968d"/>
      <circle cx="350" cy="196" r="24" stroke="#70968d"/>
      <path class="lab-crowd" d="M260 50H420L460 85H240Z" fill="#ad7550" fill-opacity=".55"/>
      <path class="lab-direct-route" d="M350 15V120" stroke="#d7a176" stroke-dasharray="5 6"/>
      <path class="lab-safe-route" d="M350 15H505Q635 15 635 160Q635 295 500 295H450" stroke="#9fddd9" stroke-width="4" stroke-linecap="round"/>
      <circle class="lab-route-person" r="7" fill="#d8ffff" cx="350" cy="15"/>
      <text x="292" y="392" fill="#91a9b7" font-size="13">ACCESSIBLE CONCOURSE</text>
      <text x="285" y="31" fill="#aabecb" font-size="12">NORTH ENTRANCE</text>
    </svg>
    <div class="lab-venue-key"><span><i></i>Accessible route</span><span><i></i>Illustrative congestion</span><span>Role-aware guidance</span></div>`);

  const simulation = makeScene(document.querySelector('.simulation'), 'simulation', `
    <div class="lab-scene-top"><span>Monte Carlo Simulation Lab</span><span>Computed samples</span></div>
    <div class="lab-scene-heading"><small>Uniform sampling</small><h4>Watch an estimate converge.</h4></div>
    <div class="lab-math-layout"><canvas width="480" height="360" class="lab-samples" role="img" aria-label="Points sampled inside a unit square and quarter circle"></canvas>
      <div class="lab-math-readout"><small>ESTIMATE OF π</small><strong class="lab-pi">3.14</strong><span class="lab-sample-count"></span><code>π ≈ 4 × inside / total</code></div></div>
    <svg class="lab-convergence" viewBox="0 0 640 100" role="img" aria-label="Computed convergence of the pi estimate"><path d="M0 50H640" stroke="#697884" stroke-dasharray="3 5"/><path class="lab-convergence-line" fill="none" stroke="#9fddd9" stroke-width="2"/></svg>
    <div class="lab-bottom-note">Scroll to accumulate samples. The estimate uses real point-in-circle tests.</div>`);

  const venueRoute = stadium.querySelector('.lab-safe-route');
  const venuePerson = stadium.querySelector('.lab-route-person');
  const venueRouteLength = venueRoute.getTotalLength();
  venueRoute.style.strokeDasharray = String(venueRouteLength);

  const projectEntries = [...document.querySelectorAll('.project')].map(project => ({
    project, scene: project.querySelector('.lab-project'),
  }));
  const heroStates = ['System offline', 'Initializing the laboratory', 'Gateway unlocked', 'Entering the system', 'Meet the builder'];
  const compilerStates = ['Requirement', 'Intent analysis', 'Schema construction', 'Validation & repair', 'Application assembly', 'Application ready'];
  const compilerHeadings = ['Start with an idea.', 'Find the moving parts.', 'Connect every layer.', 'Repair the inconsistency.', 'Bring the pieces together.', 'An idea, made tangible.'];
  const compilerLabel = compiler.querySelector('.lab-scene-step');
  const compilerHeading = compiler.querySelector('h4');
  let active = false;
  let phase = -1;
  let compilerPhase = -1;
  let lastSamples = -1;

  // Seeded samples give the same mathematical demonstration when reversing scroll.
  let seed = 2026;
  const points = Array.from({length: 2400}, () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const x = seed / 4294967296;
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return [x, seed / 4294967296];
  });
  const samplePen = simulation.querySelector('canvas').getContext('2d');
  const estimates = [];
  let totalInside = 0;
  for (const [index, [x, y]] of points.entries()) {
    if (x * x + y * y <= 1) totalInside++;
    estimates.push(4 * totalInside / (index + 1));
  }

  function plotSamples(progress) {
    const count = Math.max(20, Math.round(20 + progress * 2380));
    if (count === lastSamples) return;
    lastSamples = count;
    if (samplePen) {
      samplePen.clearRect(0, 0, 480, 360);
      samplePen.strokeStyle = '#4c6876';
      samplePen.strokeRect(85, 25, 300, 300);
      samplePen.beginPath();
      samplePen.arc(85, 325, 300, -Math.PI / 2, 0);
      samplePen.stroke();
      for (let i = 0; i < count; i++) {
        const [x, y] = points[i];
        samplePen.fillStyle = x * x + y * y <= 1 ? '#9fddd9' : '#485365';
        samplePen.fillRect(85 + x * 300, 325 - y * 300, 2, 2);
      }
    }
    simulation.querySelector('.lab-pi').textContent = estimates[count - 1].toFixed(4);
    simulation.querySelector('.lab-sample-count').textContent = count.toLocaleString() + ' samples';
    const line = [];
    for (let i = 19; i < count; i += 10) {
      line.push((i === 19 ? 'M' : 'L') + (640 * i / 2400).toFixed(1) + ' ' + (50 - (estimates[i] - Math.PI) * 95).toFixed(1));
    }
    simulation.querySelector('.lab-convergence-line').setAttribute('d', line.join(' '));
  }

  function update(event) {
    if (!active) return;
    const p = reducedMotion.matches ? 1 : event.detail.opening;
    environment.style.setProperty('--activation', ramp(p, .02, .28));
    environment.style.setProperty('--unlock', smooth(ramp(p, .25, .57)));
    environment.style.setProperty('--travel', smooth(ramp(p, .57, .88)));
    environment.style.setProperty('--builder', ramp(p, .8, 1));
    const nextPhase = Math.min(4, Math.floor(p * 4.999));
    if (nextPhase !== phase) {
      phase = nextPhase;
      stateLabel.textContent = heroStates[phase];
      heroStatus.dataset.phase = phase;
    }
    projectEntries.forEach(({project, scene}) => {
      const progress = reducedMotion.matches ? 1 : Number(project.style.getPropertyValue('--journey')) || 0;
      scene.style.setProperty('--progress', progress);
      if (scene === compiler) {
        const next = Math.min(5, Math.floor(progress * 6));
        if (next !== compilerPhase) {
          compilerPhase = next;
          compiler.dataset.phase = String(next);
          compilerLabel.textContent = compilerStates[next];
          compilerHeading.textContent = compilerHeadings[next];
        }
        compiler.style.setProperty('--intent', ramp(progress, .12, .3));
        compiler.style.setProperty('--schema', ramp(progress, .29, .43));
        compiler.style.setProperty('--repair', ramp(progress, .48, .58));
        compiler.style.setProperty('--assembly', smooth(ramp(progress, .65, .87)));
      } else if (scene === sharing) {
        const step = Math.min(3, Math.floor(progress * 4));
        sharing.dataset.phase = String(step);
        sharing.querySelector('.lab-scene-step').textContent = ['Protected document', 'Identity & authorization', 'Sharing conditions', 'Recipient access'][step];
        sharing.querySelector('.lab-access-state').textContent = step === 3 ? 'Access granted' : 'Awaiting access';
      } else if (scene === stadium) {
        const step = Math.min(2, Math.floor(progress * 3));
        stadium.dataset.phase = String(step);
        stadium.querySelector('.lab-scene-step').textContent = ['Venue overview', 'Crowd-aware guidance', 'Accessible route'][step];
        const routeProgress = ramp(progress, .4, .95);
        venueRoute.style.strokeDashoffset = String(venueRouteLength * (1 - routeProgress));
        const location = venueRoute.getPointAtLength(venueRouteLength * routeProgress);
        venuePerson.setAttribute('cx', location.x);
        venuePerson.setAttribute('cy', location.y);
      } else if (scene === simulation) {
        const rect = project.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) plotSamples(progress);
      }
    });
  }

  function onPointer(event) {
    if (reducedMotion.matches || !pointerDevice.matches) return;
    const rect = worldStage.getBoundingClientRect();
    environment.style.setProperty('--pointer-x', ((event.clientX - rect.left) / rect.width - .5).toFixed(3));
    environment.style.setProperty('--pointer-y', ((event.clientY - rect.top) / rect.height - .5).toFixed(3));
  }

  function clearPointer() {
    environment.style.setProperty('--pointer-x', 0);
    environment.style.setProperty('--pointer-y', 0);
  }

  function syncLens() {
    const enabled = html.dataset.mode === 'modern';
    if (enabled === active) return;
    active = enabled;
    environment.hidden = !enabled;
    heroStatus.hidden = !enabled;
    projectEntries.forEach(({scene}) => { scene.hidden = !enabled; });
    if (active) {
      document.addEventListener('portfolio:frame', update);
      worldStage.addEventListener('pointermove', onPointer);
      worldStage.addEventListener('pointerleave', clearPointer);
      phase = compilerPhase = -1;
      update({detail: {opening: Number(html.style.getPropertyValue('--opening')) || 0}});
    } else {
      document.removeEventListener('portfolio:frame', update);
      worldStage.removeEventListener('pointermove', onPointer);
      worldStage.removeEventListener('pointerleave', clearPointer);
      clearPointer();
    }
  }

  new MutationObserver(syncLens).observe(html, {attributes: true, attributeFilter: ['data-mode']});
  reducedMotion.addEventListener('change', () => {
    clearPointer();
    if (active) update({detail: {opening: Number(html.style.getPropertyValue('--opening')) || 0}});
  });
  // An initial non-Modern page keeps these additions outside its layout and AX tree.
  environment.hidden = heroStatus.hidden = true;
  projectEntries.forEach(({scene}) => { scene.hidden = true; });
  syncLens();
})();
