/* The Living Journal. All added surfaces belong only to the Bohemian lens. */
(() => {
  const html = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(pointer: fine)');
  const clamp = value => Math.max(0, Math.min(1, value));
  const ramp = (value, start, end) => clamp((value - start) / (end - start));
  const ease = value => value * value * (3 - 2 * value);
  const hero = document.querySelector('#home');
  const stage = hero.querySelector('.world-stage');
  const ownedElements = [];

  function botanical(className = '') {
    return `<svg class="journal-botanical ${className}" viewBox="0 0 180 300" fill="none" aria-hidden="true">
      <path class="journal-ink-path" d="M82 288C49 215 122 130 86 22 M80 244L34 209 M83 205L134 176 M90 158L45 122 M94 112L137 73 M91 70L64 42" stroke="currentColor" stroke-width="1.3"/>
      <g fill="currentColor"><path d="M65 235Q4 233 17 194Q59 194 65 235Z M95 198Q154 201 153 163Q109 151 95 198Z M77 151Q18 153 22 115Q64 109 77 151Z M98 109Q153 101 149 63Q111 66 98 109Z M88 66Q53 69 48 32Q78 31 88 66Z M87 36Q83 7 109 3Q124 25 87 36Z"/></g>
      <g stroke="currentColor" stroke-width="1"><path d="M43 266Q27 251 17 263Q13 278 29 281Q47 281 43 266Z M137 134Q120 116 110 130Q108 148 126 149Q142 148 137 134Z"/><circle cx="29" cy="268" r="3"/><circle cx="123" cy="136" r="3"/></g>
    </svg>`;
  }

  const laptop = `<svg viewBox="0 0 300 230" fill="none" aria-hidden="true"><g class="journal-ink-path" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
    <path d="M66 44Q67 37 76 38L246 45L240 159L58 152Z M75 50L233 56L228 143L70 138Z M58 152L26 185Q132 206 270 191L240 159 M26 185L28 194Q150 212 270 200V191"/>
    <path d="M89 72L106 66 M90 83L136 85 M89 96L164 100 M89 108L143 111 M175 75L213 78V124L173 121Z M106 176L177 181 M110 64L140 67"/>
    <path d="M55 102C7 98 29 15 66 20 M244 111C297 105 280 28 251 30 M66 20L59 10 M66 20L55 25 M251 30L263 20 M251 30L264 35"/>
  </g></svg>`;

  function add(parent, className, markup, decorative = false) {
    const element = document.createElement('div');
    element.className = className;
    element.innerHTML = markup;
    if (decorative) element.setAttribute('aria-hidden', 'true');
    element.hidden = true;
    parent.append(element);
    ownedElements.push(element);
    return element;
  }

  const journal = add(stage, 'journal-studio', `
    <div class="journal-sunlight"></div>
    ${botanical('journal-studio-sprig')}
    <div class="journal-loose-sheet"></div><div class="journal-loose-sheet sheet-two"></div>
    <div class="journal-book">
      <div class="journal-page-edges"></div><div class="journal-spine"></div>
      <div class="journal-leaf journal-left-page">
        <span class="journal-page-caption">A note to the reader</span>
        <p>Things imagined.<br><em>Things built.</em></p>
        ${botanical('journal-page-sprig')}
        <span class="journal-marginal">Begin with curiosity.</span>
      </div>
      <div class="journal-leaf journal-right-page">
        <span class="journal-page-caption">The builder</span>
        <div class="journal-builder-drawing">${laptop}</div>
        <div class="journal-builder-notes"><span>Full-stack development</span><span>Backend engineering</span><span>AI-powered applications</span></div>
      </div>
      <div class="journal-turning-page">
        <div class="journal-face journal-page-front"><span class="journal-page-caption">Collected ideas</span><p>Learning by<br><em>making.</em></p><div class="journal-drawn-lines"></div><span class="journal-marginal">One idea at a time.</span></div>
        <div class="journal-face journal-page-back">${botanical()}</div>
      </div>
      <div class="journal-cover">
        <div class="journal-face journal-cover-front"><div class="journal-cover-stitch"></div><span>ABHISHEK GUPTA</span><h3>The Living<br><em>Journal</em></h3>${botanical('journal-cover-art')}<p>Stories of things<br>imagined and built.</p><b>AG</b></div>
        <div class="journal-face journal-cover-back"><span class="journal-exlibris">From the desk of<br><b>Abhishek Kumar Gupta</b></span>${botanical()}</div>
      </div>
      <div class="journal-ribbon"></div>
    </div>`, true);

  const chapterNote = add(hero.querySelector('.hero-grid'), 'journal-reading-note',
    '<span>The discovery</span><i aria-hidden="true"></i><a href="#work">Turn to the work ↘</a>');
  const noteLabel = chapterNote.querySelector('span');

  function projectScene(key, heading, content) {
    return add(document.querySelector('.project-visual.' + key), 'journal-project journal-' + key, `
      <div class="journal-scene-label"><span>${heading}</span><small>Illustrative project story</small></div>
      <div class="journal-scene-caption"></div>${content}`);
  }

  const letter = projectScene('sharing', 'The letter of trust', `
    <div class="journal-letter-map">
      <svg class="journal-post-route" viewBox="0 0 600 360" fill="none" aria-hidden="true">
        <path d="M32 288Q40 40 280 54T563 269 M92 0Q144 169 0 212 M600 100Q436 204 495 360" stroke="#8c8e6b" stroke-opacity=".4"/>
        <path class="journal-delivery-route" d="M70 250C160 280 180 80 310 123S419 297 530 170" stroke="#8d553f" stroke-width="2" stroke-dasharray="4 5"/>
        <circle cx="70" cy="250" r="5" stroke="#8d553f"/><circle cx="530" cy="170" r="5" stroke="#8d553f"/>
        <text x="32" y="279" fill="#695e4e" font-size="13">Sender</text><text x="490" y="200" fill="#695e4e" font-size="13">Recipient</text>
      </svg>
      <div class="journal-envelope">
        <div class="journal-letter"><b>project-notes.pdf</b><i></i><i></i><i></i><small>Access-controlled document</small></div>
        <div class="journal-envelope-back"></div><div class="journal-envelope-pocket"></div><div class="journal-envelope-flap"></div>
        <div class="journal-wax-seal"><svg viewBox="0 0 60 60" fill="none" aria-hidden="true"><path d="M21 27V19C21 7 39 7 39 19V27M18 27H42V47H18ZM30 34V40" stroke="currentColor" stroke-width="2"/></svg></div>
      </div>
      <span class="journal-map-note">Software access, told as a letter.</span>
    </div>
    <div class="journal-permission-notes"><span>Identity & ownership</span><span>Password & expiration</span><span>View limits & revocation</span></div>`);

  const invention = projectScene('compiler', 'The invention that drew itself', `
    <div class="journal-invention">
      <div class="journal-idea-paper"><span class="journal-tape"></span><small>THE IDEA</small><p>Build a dashboard that tracks <em>reading progress.</em></p><span class="journal-marginal">What would it need?</span></div>
      <div class="journal-blueprint">
        <svg viewBox="0 0 600 360" fill="none" aria-hidden="true"><g class="journal-ink-path" stroke="#79644b" stroke-width="1.5"><path d="M300 44Q300 75 300 100M300 100Q121 91 112 142M300 100Q475 91 487 142M300 100L300 142M112 212Q113 278 300 280M487 212Q486 275 300 280M300 212V280"/><path d="M106 130L112 143L124 132M294 130L300 143L306 130M477 132L487 143L493 130"/></g></svg>
        <div class="journal-schema schema-ui"><small>INTERFACE</small><b>Reading dashboard</b><code>UI schema</code></div>
        <div class="journal-schema schema-data"><small>DATA</small><b>Book & progress</b><code>Data model</code></div>
        <div class="journal-schema schema-api"><small>LOGIC</small><b>Book operations</b><code>API definitions</code></div>
        <div class="journal-validation"><span class="journal-proof-mark">✓</span><p><del>progress: string</del><strong>progress: number</strong><small>Repair the invalid field.<br>Keep the valid components.</small></p></div>
      </div>
      <div class="journal-invention-result">
        <div class="journal-reading-cover"></div>
        <div class="journal-reading-page"><header><b>Reading room</b><small>Illustrative preview</small></header><h4>A little further,<br><em>every day.</em></h4><div class="journal-library"><div><i></i><span>Designing systems</span><progress max="100" value="72"></progress></div><div><i></i><span>Thinking in code</span><progress max="100" value="43"></progress></div><div><i></i><span>Creative practice</span><progress max="100" value="89"></progress></div></div><span class="journal-marginal">An idea becomes something useful.</span></div>
      </div>
    </div>`);

  const map = projectScene('stadium', 'The map of a living city', `
    <div class="journal-fold-map">
      <div class="journal-map-creases"><i></i><i></i></div>
      <svg class="journal-stadium-drawing" viewBox="0 0 620 430" fill="none" role="img" aria-label="Illustrated stadium with an accessible route around a congested concourse">
        <g class="journal-ink-path" stroke="#62694d" stroke-width="1.8"><path d="M80 219C75 31 538 31 542 218C544 412 74 405 80 219Z"/><path d="M107 217C108 64 514 64 516 218C522 370 103 370 107 217Z"/><path d="M142 218C141 111 478 106 480 219C482 328 143 328 142 218Z"/><path d="M225 164H394V272H225ZM309 164V272M225 192H246V244H225M394 192H372V244H394"/><circle cx="309" cy="218" r="21"/></g>
        <path class="journal-congestion" d="M224 72Q303 43 401 73L379 108Q310 88 243 110Z" fill="#b96c54" fill-opacity=".5"/>
        <path class="journal-accessible-route" d="M309 29C478 8 575 102 574 219C575 332 447 375 396 325" stroke="#8c513d" stroke-width="3" stroke-linecap="round"/>
        <circle class="journal-route-marker" cx="309" cy="29" r="6" fill="#8c513d"/>
        <text x="242" y="22" fill="#695944" font-size="13">North entrance</text><text x="195" y="412" fill="#695944" font-size="13">Accessible concourse</text>
        <path d="M43 89V42M33 59L43 42L53 59M40 105H46" stroke="#a18c65" stroke-width="1.5"/>
      </svg>
      <span class="journal-map-stamp">STADIUMPULSE<br>Field sketch</span>
    </div>
    <div class="journal-map-key"><span>Ink path · Accessible route</span><span>Rose wash · Illustrative congestion</span></div>`);

  const math = projectScene('simulation', 'The pages of probability', `
    <div class="journal-math-notebook"><div class="journal-math-question"><p>How much of a square<br>belongs to its circle?</p><span class="journal-marginal">Try it. Count. Repeat.</span></div>
      <canvas class="journal-math-plot" width="440" height="330" role="img" aria-label="Computed ink samples in a square and quarter circle"></canvas>
      <div class="journal-math-answer"><small>ESTIMATING π</small><strong>3.14</strong><span></span><code>4 × inside / total</code></div>
      <svg class="journal-convergence" viewBox="0 0 600 100" role="img" aria-label="Convergence of the computed pi estimate"><path d="M0 50Q300 49 600 50" stroke="#b7a583" stroke-dasharray="3 6"/><path class="journal-convergence-line" fill="none" stroke="#896145" stroke-width="1.8"/></svg>
    </div><p class="journal-math-footnote">Each ink dot is a computed sample. More samples refine the estimate.</p>`);

  const thread = add(document.querySelector('#opensource .contribution-list'), 'journal-contribution-thread',
    '<svg viewBox="0 0 100 600" preserveAspectRatio="none" fill="none"><path class="journal-ink-path" d="M50 10C-15 110 110 120 50 220S-15 400 50 430S95 520 50 590" stroke="currentColor" stroke-width="1.5"/></svg>', true);
  const timelineInk = add(document.querySelector('.timeline'), 'journal-timeline-ink',
    '<svg viewBox="0 0 60 900" preserveAspectRatio="none" fill="none"><path class="journal-ink-path" d="M30 0C0 120 60 200 30 300S0 450 30 520S60 660 30 740S14 850 30 900" stroke="currentColor" stroke-width="1.3"/></svg>', true);
  const toolPaths = [
    laptop,
    '<svg viewBox="0 0 300 230" fill="none" aria-hidden="true"><g class="journal-ink-path" stroke="currentColor" stroke-width="1.5"><path d="M50 53L237 47L245 179L44 186ZM63 68L222 63L225 100L61 106ZM61 119L227 114L231 151L59 157ZM115 78L171 76M115 134L171 132M72 186L70 202M219 181L222 197"/><circle cx="205" cy="83" r="4"/><circle cx="207" cy="135" r="4"/><path d="M144 47V16H266V111H244"/></g></svg>',
    '<svg viewBox="0 0 300 230" fill="none" aria-hidden="true"><g class="journal-ink-path" stroke="currentColor" stroke-width="1.5"><path d="M76 67L144 49L215 80M76 67L119 128L215 80M144 49L119 128L187 165L215 80M76 67L50 167L119 128M50 167L187 165M187 165L241 197M119 128L103 198"/><circle cx="76" cy="67" r="16"/><circle cx="144" cy="49" r="11"/><circle cx="215" cy="80" r="19"/><circle cx="119" cy="128" r="21"/><circle cx="50" cy="167" r="12"/><circle cx="187" cy="165" r="16"/><circle cx="103" cy="198" r="9"/><circle cx="241" cy="197" r="9"/></g></svg>',
  ];
  document.querySelectorAll('.skill-grid article').forEach((article, index) => {
    const artwork = add(article, 'journal-tool-art', toolPaths[index], true);
    article.prepend(artwork);
  });
  const ending = add(document.querySelector('#contact'), 'journal-last-page', `
    ${botanical('journal-ending-sprig')}
    <h2>Every great project<br>begins with<br><em>a conversation.</em></h2>
    <svg class="journal-final-signature" viewBox="0 0 200 90" fill="none" aria-label="Drawn AG monogram"><path class="journal-ink-path" d="M15 70C47-11 72 3 66 60C62 83 28 76 38 49C46 30 67 24 83 46M98 41C115 7 145 18 137 40C124 73 81 74 95 41C106 17 138 15 137 55C135 118 88 101 109 72L177 49" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`);
  document.querySelector('#contact .chapter').after(ending);

  const sections = [...document.querySelectorAll('main > section')].slice(1);
  sections.forEach((section, index) => {
    const ornament = add(section.querySelector('.chapter-gate'), 'journal-chapter-ornament',
      index === 0 ? botanical() : '<svg viewBox="0 0 600 80" fill="none"><path class="journal-ink-path" d="M10 42Q150 29 240 41L300 19L360 41Q450 30 590 40M278 41L300 60L323 41" stroke="currentColor" stroke-width="1.2"/></svg>', true);
    ornament.dataset.chapter = String(index);
  });

  // Normalize each drawn path, including paths in groups, so short sketches
  // reveal continuously instead of remaining invisible until the last frame.
  ownedElements.forEach(element => {
    element.querySelectorAll('path.journal-ink-path, .journal-ink-path path').forEach(path => {
      path.setAttribute('pathLength', '1500');
    });
  });

  const entries = [...document.querySelectorAll('.project')].map(project => ({
    project, scene: project.querySelector('.journal-project'),
  }));
  const coverLabels = ['The discovery', 'The first touch', 'Opening the journal', 'The pages come alive', 'Entering the journal', 'The first chapter'];
  const inventionLabels = ['An idea, written down.', 'Draw the architecture.', 'Connect the invention.', 'Check. Correct. Keep building.', 'The blueprint becomes an interface.', 'An idea becomes something useful.'];
  const letterLabels = ['Something worth protecting.', 'Set the sharing conditions.', 'A controlled path to the recipient.', 'Opened with permission.'];
  const mapLabels = ['A map waiting to unfold.', 'Make the venue legible.', 'Find a clearer route.'];
  const venuePath = map.querySelector('.journal-accessible-route');
  const pathLength = venuePath.getTotalLength();
  const marker = map.querySelector('.journal-route-marker');
  venuePath.style.strokeDasharray = String(pathLength);
  let active = false;
  let currentCover = -1;
  let lastCount = -1;
  const paperPen = math.querySelector('canvas').getContext('2d');
  let inside = 0;
  // Reuse the existing shared sample set rather than introducing another RNG.
  const estimates = samples.map(([x, y], index) => {
    if (x * x + y * y <= 1) inside++;
    return 4 * inside / (index + 1);
  });

  function drawProbability(progress) {
    const count = Math.max(20, Math.round(20 + progress * (samples.length - 20)));
    if (count === lastCount) return;
    lastCount = count;
    if (paperPen) {
      paperPen.clearRect(0, 0, 440, 330);
      paperPen.strokeStyle = '#806b4d';
      paperPen.lineWidth = 1;
      paperPen.strokeRect(85, 25, 270, 270);
      paperPen.beginPath();
      paperPen.arc(85, 295, 270, -Math.PI / 2, 0);
      paperPen.stroke();
      for (let i = 0; i < count; i++) {
        const [x, y] = samples[i];
        paperPen.fillStyle = x * x + y * y <= 1 ? '#8b5039' : '#868465';
        paperPen.fillRect(85 + x * 270, 295 - y * 270, 2, 2);
      }
    }
    math.querySelector('.journal-math-answer strong').textContent = estimates[count - 1].toFixed(4);
    math.querySelector('.journal-math-answer span').textContent = count.toLocaleString() + ' samples';
    const graph = [];
    for (let i = 19; i < count; i += 8) {
      graph.push((i === 19 ? 'M' : 'L') + (600 * i / samples.length).toFixed(1) + ' ' + (50 - (estimates[i] - Math.PI) * 90).toFixed(1));
    }
    math.querySelector('.journal-convergence-line').setAttribute('d', graph.join(' '));
  }

  function update(event) {
    if (!active) return;
    const p = reduced.matches ? 1 : event.detail.opening;
    journal.style.setProperty('--cover', ease(ramp(p, .08, .48)));
    journal.style.setProperty('--page', ease(ramp(p, .43, .78)));
    journal.style.setProperty('--ink', ramp(p, .4, .78));
    journal.style.setProperty('--enter', ease(ramp(p, .78, 1)));
    const coverPhase = Math.min(5, Math.floor(p * 5.999));
    if (coverPhase !== currentCover) {
      currentCover = coverPhase;
      noteLabel.textContent = coverLabels[coverPhase];
    }
    entries.forEach(({project, scene}) => {
      const progress = reduced.matches ? 1 : Number(project.style.getPropertyValue('--journey')) || 0;
      scene.style.setProperty('--story', progress);
      if (scene === letter) {
        const phase = Math.min(3, Math.floor(progress * 4));
        letter.dataset.phase = String(phase);
        letter.querySelector('.journal-scene-caption').textContent = letterLabels[phase];
        letter.style.setProperty('--insert', ramp(progress, .04, .3));
        letter.style.setProperty('--seal', ramp(progress, .25, .42));
        letter.style.setProperty('--delivery', ease(ramp(progress, .4, .78)));
        letter.style.setProperty('--receive', ramp(progress, .8, 1));
      } else if (scene === invention) {
        const phase = Math.min(5, Math.floor(progress * 6));
        invention.dataset.phase = String(phase);
        invention.querySelector('.journal-scene-caption').textContent = inventionLabels[phase];
        invention.style.setProperty('--draw', ramp(progress, .13, .48));
        invention.style.setProperty('--create', ease(ramp(progress, .66, .92)));
      } else if (scene === map) {
        const phase = Math.min(2, Math.floor(progress * 3));
        map.querySelector('.journal-scene-caption').textContent = mapLabels[phase];
        map.style.setProperty('--unfold', ease(ramp(progress, 0, .4)));
        const routeProgress = ramp(progress, .4, 1);
        venuePath.style.strokeDashoffset = String(pathLength * (1 - routeProgress));
        const point = venuePath.getPointAtLength(pathLength * routeProgress);
        marker.setAttribute('cx', point.x);
        marker.setAttribute('cy', point.y);
      } else if (scene === math) {
        math.querySelector('.journal-scene-caption').textContent = progress < .4 ? 'Ask a question. Gather the evidence.' : 'An estimate, refined by repetition.';
        const rect = project.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < innerHeight) drawProbability(progress);
      }
    });
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const progress = reduced.matches ? 1 : clamp((innerHeight * .8 - rect.top) / Math.max(innerHeight, rect.height * .8));
      section.style.setProperty('--journal-progress', progress);
    }
  }

  function onPointer(event) {
    if (reduced.matches || !fine.matches) return;
    const rect = stage.getBoundingClientRect();
    journal.style.setProperty('--tilt', ((event.clientX - rect.left) / rect.width - .5).toFixed(3));
  }

  function clearPointer() {
    journal.style.setProperty('--tilt', 0);
  }

  function syncLens() {
    const enabled = html.dataset.mode === 'boho';
    if (active === enabled) return;
    active = enabled;
    ownedElements.forEach(element => { element.hidden = !enabled; });
    if (enabled) {
      document.addEventListener('portfolio:journal-frame', update);
      stage.addEventListener('pointermove', onPointer);
      stage.addEventListener('pointerleave', clearPointer);
      currentCover = -1;
      update({detail: {opening: Number(html.style.getPropertyValue('--opening')) || 0}});
    } else {
      document.removeEventListener('portfolio:journal-frame', update);
      stage.removeEventListener('pointermove', onPointer);
      stage.removeEventListener('pointerleave', clearPointer);
      clearPointer();
    }
  }

  new MutationObserver(syncLens).observe(html, {attributes: true, attributeFilter: ['data-mode']});
  reduced.addEventListener('change', () => {
    clearPointer();
    if (active) update({detail: {opening: Number(html.style.getPropertyValue('--opening')) || 0}});
  });
  syncLens();
})();
