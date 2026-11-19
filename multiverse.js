const root = document.documentElement;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine)');
const worlds = {
  boho: ['Bohemian', 'The Living Journal', '#f2e8d8', '#a15336'],
  modern: ['Modern', 'The Digital Laboratory', '#111316', '#95bfff'],
  retro: ['Retro', 'The Time Machine', '#f2e5c9', '#d83920'],
  pixel: ['Pixel', 'The Playable Adventure', '#101d2f', '#7cebb9'],
  vector: ['Vector', 'The Geometry Playground', '#f8f6ef', '#2351db'],
  spatial: ['3D', 'The Multiverse', '#f1eee8', '#b58b59'],
  sketch: ['Sketchbook', 'The Inventor’s Notebook', '#f5f1e7', '#3d6194'],
  editorial: ['Editorial', 'The Living Magazine', '#f5f2eb', '#752c3c'],
  victorian: ['Victorian', 'The Mechanical Archive', '#f0e3c9', '#752d3a'],
};

const chapterNames = ['Prologue', 'Selected work', 'Open source', 'About', 'Skills', 'Contact'];
const chapters = [...document.querySelectorAll('main > section')];
const projectsOnPage = [...document.querySelectorAll('.project')];
const chapterLinks = document.querySelector('#chapter-links');
const progress = document.querySelector('#story-progress');
const activeChapter = document.querySelector('#active-chapter');
const stage = document.querySelector('.world-stage');

chapters.forEach((chapter, index) => {
  const link = document.createElement('a');
  link.href = '#' + chapter.id;
  link.textContent = chapterNames[index];
  link.addEventListener('click', () => { chapterLinks.parentElement.open = false; });
  chapterLinks.append(link);
  if (!index) return;
  const gate = document.createElement('div');
  gate.className = 'chapter-gate';
  gate.setAttribute('aria-hidden', 'true');
  gate.innerHTML = '<i></i><b>✦</b><i></i>';
  chapter.prepend(gate);
});

const art = stage.querySelector('canvas');
const pen = art.getContext('2d');
const clamp = value => Math.min(1, Math.max(0, value));
const pointer = { x: 0, y: 0 };
const smooth = value => value * value * (3 - 2 * value);

function line(points) {
  pen.beginPath();
  points.forEach(([x, y], index) => index ? pen.lineTo(x, y) : pen.moveTo(x, y));
  pen.stroke();
}

function circle(x, y, radius, fill = false) {
  pen.beginPath();
  pen.arc(x, y, radius, 0, Math.PI * 2);
  if (fill) pen.fill();
  else pen.stroke();
}

function drawWorld(key, amount, seconds, accent) {
  if (!pen) return;
  const p = smooth(amount);
  const center = 320;
  pen.clearRect(0, 0, 640, 640);
  pen.save();
  pen.translate(center + pointer.x * 10, center + pointer.y * 10);
  pen.strokeStyle = accent;
  pen.fillStyle = accent;
  pen.lineWidth = 2;

  if (key === 'boho' || key === 'editorial') {
    const journal = key === 'boho';
    if (journal) {
      for (const side of [-1, 1]) {
        pen.save();
        pen.scale(side, 1);
        pen.rotate(Math.sin(seconds * 0.9) * 0.04);
        pen.stroke(new Path2D('M 130 211 Q 182 113 205 -80 Q 214 -145 251 -210'));
        for (let n = 0; n < 7; n++) {
          const x = 169 + n * 12;
          const y = 132 - n * 46;
          pen.fill(new Path2D(`M ${x} ${y} q -53 -13 -42 -46 q 40 1 42 46 q 13 -51 46 -40 q -3 38 -46 40`));
        }
        pen.restore();
      }
    }
    pen.fillStyle = journal ? '#cfb298' : '#e6d9d7';
    pen.fillRect(-143, -181, 286, 362);
    for (let n = 0; n < 9; n++) {
      const y = -110 + n * 26;
      line([[-110, y], [n % 3 === 0 ? 72 : 106, y]]);
    }
    pen.save();
    pen.transform(Math.cos(p * Math.PI * .94), -.23 * Math.sin(p * Math.PI), 0, 1, -142, 0);
    pen.fillStyle = accent;
    pen.fillRect(0, -185, 291, 370);
    pen.strokeStyle = '#fff2d7';
    pen.strokeRect(12, -171, 267, 342);
    pen.fillStyle = '#fff2d7';
    pen.font = journal ? 'italic 46px Georgia' : 'bold 48px Georgia';
    pen.fillText(journal ? 'Field notes' : 'Portfolio', 28, 8);
    pen.restore();
  } else if (key === 'modern') {
    pen.globalAlpha = .38;
    for (let n = -250; n <= 250; n += 25) {
      line([[n, -250], [n, 250]]);
      line([[-250, n], [250, n]]);
    }
    pen.globalAlpha = 1;
    for (const side of [-1, 1]) {
      pen.save();
      pen.scale(side, 1);
      pen.translate(p * 135, 0);
      pen.fillStyle = '#1c3047';
      const panel = new Path2D('M 0 -175 H 122 L 182 -105 V 105 L 122 175 H 0 Z');
      pen.fill(panel);
      pen.stroke(panel);
      pen.fillStyle = accent;
      pen.fillRect(22, ((seconds * 56) % 258) - 130, 112, 3);
      pen.restore();
    }
    circle(0, 0, 32 + p * 58);
  } else if (key === 'retro') {
    pen.rotate(-.08);
    pen.fillStyle = '#cf6536';
    pen.fillRect(-230, -172, 460, 344);
    pen.fillStyle = '#282522';
    pen.fillRect(-203, -143, 344, 286);
    pen.save();
    pen.beginPath();
    pen.rect(-193, -133, 324, 266);
    pen.clip();
    pen.translate(-30, 50 - p * 112);
    pen.fillStyle = '#f6cb68';
    circle(0, 0, 110, true);
    pen.rotate(seconds * .45);
    for (let n = 30; n < 110; n += 9) circle(0, 0, n);
    line([[-110, 0], [110, 0]]);
    pen.restore();
    circle(182, -64, 24);
    circle(182, 2, 24);
    for (let n = 0; n < 5; n++) line([[158, 55 + n * 12], [207, 55 + n * 12]]);
  } else if (key === 'pixel') {
    pen.fillStyle = '#5fa5bf';
    for (let n = 0; n < 5; n++) {
      const x = ((n * 133 + seconds * 9) % 480) - 240;
      pen.fillRect(x, -184 + n % 2 * 30, 60, 15);
      pen.fillRect(x + 15, -199 + n % 2 * 30, 30, 15);
    }
    pen.fillStyle = '#304e62';
    for (let n = -240; n < 240; n += 24) {
      pen.fillRect(n, 122, 22, 24);
      pen.fillRect(n, 148, 22, 24);
    }
    pen.fillStyle = '#58798a';
    pen.fillRect(-81, -137, 162, 259);
    pen.fillStyle = '#152b42';
    pen.fillRect(-58, -103, 116, 225);
    pen.fillStyle = accent;
    pen.fillRect(-58, -103, 116, Math.round((1 - p) * 225 / 9) * 9);
    pen.translate(Math.round((-192 + 349 * p) / 8) * 8, 65);
    pen.fillStyle = '#ffe490';
    pen.fillRect(-13, 0, 26, 22);
    pen.fillRect(-9, 25, 18, 21);
    pen.fillRect(-13, 46, 8, 10);
    pen.fillRect(5, 46, 8, 10);
  } else if (key === 'vector') {
    const palette = ['#2351db', '#ea6d4d', '#ebbb28', '#6c4eca'];
    palette.forEach((color, index) => {
      pen.save();
      const angle = index * Math.PI / 2 + p * 1.4 + seconds * .1;
      pen.rotate(angle);
      pen.translate(60 + p * 132, 0);
      pen.fillStyle = color;
      pen.beginPath();
      pen.moveTo(-60, 0);
      pen.bezierCurveTo(-40, -125 + p * 35, 121, -91, 98, 33);
      pen.bezierCurveTo(81, 124, -43, 99 - p * 45, -60, 0);
      pen.fill();
      pen.restore();
    });
  } else if (key === 'spatial') {
    // Project real 3D coordinates onto the canvas without a GPU dependency.
    const camera = p * 760;
    for (let n = 0; n < 66; n++) {
      const z = (n * 73 + 1200 - camera) % 1200 + 90;
      const scale = 480 / z;
      pen.globalAlpha = Math.min(.85, scale / 2);
      circle(((n * 203 % 710) - 355) * scale, ((n * 191 % 710) - 355) * scale, Math.min(3, scale), true);
    }
    pen.globalAlpha = 1;
    for (let plane = 5; plane >= 0; plane--) {
      const z = ((plane * 147 + 900 - camera) % 900) + 230;
      const angle = plane * .29 + seconds * .3;
      const points = Array.from({length: 7}, (_, n) => {
        const theta = n * Math.PI / 3 + angle;
        const depth = z + Math.sin(theta) * 90;
        return [Math.cos(theta) * 145 * 480 / depth, Math.sin(theta) * 145 * 480 / depth];
      });
      pen.globalAlpha = 1 - plane * .11;
      line(points);
    }
  } else if (key === 'sketch') {
    pen.fillStyle = '#efe3be';
    pen.rotate(-.06);
    pen.fillRect(-152, -195, 304, 390);
    for (let n = -150; n < 190; n += 22) line([[-146, n], [146, n]]);
    const trace = new Path2D('M -94 137 L -98 -83 Q -100 -141 1 -142 Q 89 -139 91 -82 L 93 135 Z');
    pen.lineWidth = 4;
    pen.setLineDash([20 + p * 950, 1100]);
    pen.stroke(trace);
    pen.setLineDash([]);
    circle(64, 24, 8);
    line([[113, -37], [147, -68], [119, -68]]);
  } else {
    pen.fillStyle = '#492f28';
    circle(0, 0, 198, true);
    pen.strokeStyle = '#d5ae66';
    for (const radius of [176, 187, 199, 213]) circle(0, 0, radius);
    for (const side of [-1, 1]) {
      pen.save();
      pen.translate(side * (81 + p * 120), 0);
      pen.rotate(side * (p * 2 + seconds * .13));
      pen.fillStyle = '#ba9252';
      circle(0, 0, 54, true);
      for (let tooth = 0; tooth < 12; tooth++) {
        pen.rotate(Math.PI / 6);
        pen.fillRect(-8, -66, 16, 17);
      }
      pen.fillStyle = '#492f28';
      circle(0, 0, 26, true);
      circle(0, 0, 37);
      pen.restore();
    }
  }
  pen.restore();
}

let frame = 0;
let pageDirty = true;
let visibleStage = false;
let opening = 0;
let activeIndex = -1;

function paint(time) {
  frame = 0;
  if (document.hidden) return;
  if (pageDirty) {
    pageDirty = false;
    const viewport = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - viewport;
    progress.value = maxScroll > 0 ? 100 * clamp(scrollY / maxScroll) : 0;
    const hero = chapters[0].getBoundingClientRect();
    opening = clamp(-hero.top / Math.max(200, hero.height - viewport));
    root.style.setProperty('--opening', motion.matches ? 0 : opening);
    visibleStage = hero.bottom > 0 && hero.top < viewport;
    let current = 0;
    chapters.forEach((chapter, index) => {
      const rect = chapter.getBoundingClientRect();
      if (rect.top <= viewport * .45) current = index;
      chapter.style.setProperty('--gate', smooth(clamp((viewport * .9 - rect.top) / (viewport * .54))));
    });
    if (current !== activeIndex) {
      activeIndex = current;
      activeChapter.textContent = chapterNames[current];
      [...chapterLinks.children].forEach((link, index) => {
        if (index === current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    projectsOnPage.forEach(project => {
      const rect = project.getBoundingClientRect();
      const stacked = window.innerWidth <= (root.dataset.mode === 'modern' ? 900 : 800);
      const copyHeight = stacked ? project.querySelector('.project-copy').getBoundingClientRect().height + 92 : 0;
      const journey = motion.matches ? 1 : clamp((innerHeight * .15 - rect.top - copyHeight) / Math.max(1, rect.height - copyHeight - innerHeight * .9));
      project.style.setProperty('--journey', journey);
      const steps = [...project.querySelectorAll('.scene-step')];
      project.dataset.scene = String(Math.min(Math.max(0, steps.length - 1), Math.round(journey * Math.max(0, steps.length - 1))));
      steps.forEach((step, index) => {
        const position = journey * (steps.length - 1);
        const distance = clamp((Math.abs(position - index) - .3) / .5);
        step.style.setProperty('--distance', motion.matches ? (index === steps.length - 1 ? 0 : 1) : distance);
        step.inert = Math.round(position) !== index;
        step.setAttribute('aria-hidden', String(Math.round(position) !== index));
      });
      project.style.setProperty('--reveal', smooth(clamp((viewport * .86 - rect.top) / (viewport * .63))));
    });
    if (root.dataset.mode === 'modern') {
      document.dispatchEvent(new CustomEvent('portfolio:frame', {detail: {opening}}));
    }
    if (root.dataset.mode === 'boho') {
      document.dispatchEvent(new CustomEvent('portfolio:journal-frame', {detail: {opening}}));
    }
    if (root.dataset.mode === 'pixel') {
      document.dispatchEvent(new CustomEvent('portfolio:pixel-frame', {detail: {opening}}));
    }
    if (root.dataset.mode === 'retro') {
      document.dispatchEvent(new CustomEvent('portfolio:retro-frame', {detail: {opening}}));
    }
    if (root.dataset.mode === 'vector') {
      document.dispatchEvent(new CustomEvent('portfolio:vector-frame', {detail: {opening}}));
    }
    if (root.dataset.mode === 'spatial') {
      document.dispatchEvent(new CustomEvent('portfolio:spatial-frame', {detail: {opening}}));
    }
    if (root.dataset.mode === 'sketch') {
      document.dispatchEvent(new CustomEvent('portfolio:sketch-frame', {detail: {opening}}));
    }
    if (root.dataset.mode === 'editorial') {
      document.dispatchEvent(new CustomEvent('portfolio:editorial-frame', {detail: {opening}}));
    }
  }
  if (visibleStage && !['modern', 'boho', 'pixel', 'retro', 'vector', 'spatial', 'sketch', 'editorial'].includes(root.dataset.mode)) {
    const key = root.dataset.mode;
    drawWorld(key, motion.matches ? .68 : opening, motion.matches ? 0 : time / 1000, worlds[key][3]);
    if (!motion.matches) frame = requestAnimationFrame(paint);
  }
}

function refreshStory() {
  pageDirty = true;
  if (!frame) frame = requestAnimationFrame(paint);
}
window.addEventListener('scroll', refreshStory, {passive: true});
window.addEventListener('resize', refreshStory);
document.addEventListener('visibilitychange', refreshStory);
motion.addEventListener('change', () => {
  pointer.x = pointer.y = 0;
  refreshStory();
});
stage.addEventListener('pointermove', event => {
  if (motion.matches || !finePointer.matches) return;
  const rect = stage.getBoundingClientRect();
  pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
  pointer.y = (event.clientY - rect.top) / rect.height * 2 - 1;
});
stage.addEventListener('pointerleave', () => { pointer.x = pointer.y = 0; });
new ResizeObserver(refreshStory).observe(document.querySelector('main'));

const lensDialog = document.querySelector('#lens-dialog');
const lensTrigger = document.querySelector('#lens-button');
const lensGrid = document.querySelector('#lens-grid');
const wipe = document.querySelector('#lens-wipe');
let switching = false;

Object.entries(worlds).forEach(([key, [name, description]]) => {
  const button = document.createElement('button');
  button.className = 'lens-option';
  button.dataset.lens = key;
  button.innerHTML = `<span class="swatch swatch-${key}" aria-hidden="true">Aa</span><strong>${name}</strong><span>${description}</span>`;
  button.addEventListener('click', event => changeLens(key, event));
  lensGrid.append(button);
});

function applyLens(key) {
  root.dataset.mode = key;
  document.querySelector('#current-mode').textContent = worlds[key][0];
  document.querySelector('#world-name').textContent = worlds[key][1];
  for (const button of lensGrid.children) {
    button.setAttribute('aria-pressed', String(button.dataset.lens === key));
  }
  refreshStory();
}

async function changeLens(key, event) {
  if (switching) return;
  if (key === root.dataset.mode) {
    lensDialog.close();
    return;
  }
  switching = true;
  const x = event.detail ? event.clientX : innerWidth / 2;
  const y = event.detail ? event.clientY : innerHeight / 2;
  const radius = Math.ceil(Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))) + 4;
  const point = `at ${x}px ${y}px`;
  const start = `circle(0px ${point})`;
  const full = `circle(${radius}px ${point})`;
  const [, , paper, accent] = worlds[key];
  lensDialog.close();
  try {
    if (!motion.matches && wipe.animate) {
      wipe.style.background = `radial-gradient(circle at ${x}px ${y}px, ${accent}, ${paper} 32%)`;
      wipe.style.clipPath = start;
      wipe.hidden = false;
      if (wipe.showPopover) wipe.showPopover();
      await wipe.animate([{clipPath: start}, {clipPath: full}], {
        duration: 380, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards',
      }).finished;
    }
    applyLens(key);
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
    window.scrollTo({top: 0, behavior: 'instant'});
    try { localStorage.setItem('portfolio-lens', key); } catch {}
    if (!wipe.hidden) {
      await wipe.animate([{opacity: 1}, {opacity: 0}], {duration: 260, fill: 'forwards'}).finished;
    }
  } finally {
    wipe.hidePopover?.();
    wipe.hidden = true;
    wipe.getAnimations().forEach(animation => animation.cancel());
    switching = false;
    lensTrigger.focus({preventScroll: true});
  }
}

wipe.setAttribute('popover', 'manual');
lensTrigger.addEventListener('click', () => {
  if (switching) return;
  lensDialog.showModal();
  lensGrid.querySelector('[aria-pressed="true"]').focus();
});
lensDialog.querySelector('.close-dialog').addEventListener('click', () => lensDialog.close());
lensDialog.addEventListener('click', event => {
  if (event.target !== lensDialog) return;
  const rect = lensDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom) lensDialog.close();
});
applyLens(root.dataset.mode);

const resumeDialog = document.querySelector('#resume-dialog');
const resumeButton = document.querySelector('#resume-open');
const resumeSkip = document.querySelector('#resume-skip');

const cinematic = document.querySelector('#resume-video');
const viewer = document.querySelector('#resume-view');
const resumePage = document.querySelector('#resume-page');
resumePage.addEventListener('error', () => {
  playbackStatus.textContent = 'The page preview is unavailable. Use Open PDF or Download PDF to access the original résumé.';
});
const playbackStatus = document.querySelector('#resume-status');
const resumeLink = document.querySelector('a[href="#resume"]');
let playbackSession = 0;

function stopCinematic() {
  cinematic.pause();
  cinematic.hidden = true;
  cinematic.removeAttribute('src');
  cinematic.load();
}

function revealResume() {
  playbackSession++;
  stopCinematic();
  resumeDialog.classList.remove('playing');
  resumeSkip.hidden = true;
  resumePage.src = 'assets/resume-page-1.png';
  viewer.hidden = false;
  if (document.activeElement === resumeSkip) document.querySelector('#resume-close').focus();
}

function openResume(event) {
  event?.preventDefault();
  const session = ++playbackSession;
  playbackStatus.textContent = '';
  viewer.hidden = true;
  resumePage.removeAttribute('src');
  resumeDialog.showModal();
  if (motion.matches) {
    revealResume();
    return;
  }
  resumeDialog.classList.add('playing');
  resumeSkip.hidden = false;
  cinematic.hidden = false;
  cinematic.src = 'assets/resume-cinematic.mp4';
  cinematic.currentTime = 0;
  resumeSkip.focus();
  const playback = cinematic.play();
  playback?.catch(() => {
    if (session !== playbackSession || !resumeDialog.open) return;
    playbackStatus.textContent = 'Video playback could not start. Your résumé is available below.';
    revealResume();
  });
}

resumeButton.hidden = false;
resumeButton.addEventListener('click', openResume);
resumeLink.addEventListener('click', openResume);
resumeSkip.addEventListener('click', revealResume);
cinematic.addEventListener('ended', revealResume);
cinematic.addEventListener('error', () => {
  if (!resumeDialog.open || cinematic.hidden) return;
  playbackStatus.textContent = 'The video is unavailable. Your résumé is available below.';
  revealResume();
});
document.querySelector('#resume-close').addEventListener('click', () => resumeDialog.close());
resumeDialog.addEventListener('close', () => {
  playbackSession++;
  stopCinematic();
  resumeDialog.classList.remove('playing');
  viewer.hidden = true;
  resumePage.removeAttribute('src');
  resumeButton.focus({preventScroll: true});
});
motion.addEventListener('change', () => {
  if (motion.matches && resumeDialog.open && !cinematic.hidden) revealResume();
});


const projectScenes = {
  sharing: ['Sign in securely', 'Check sharing rules', 'Open the protected document'],
  compiler: ['The idea', 'Understand the intent', 'Generate connected schemas', 'Validate and repair', 'The application takes shape'],
  stadium: ['Find the entrance', 'Identify crowded zones', 'Follow an accessible route'],
};
for (const [key, labels] of Object.entries(projectScenes)) {
  const visual = document.querySelector('.project-visual.' + key);
  const scene = document.createElement('div');
  scene.className = 'project-scene scene-' + key;
  scene.innerHTML = '<p class="scene-label">Illustrative concept walkthrough</p>' +
    labels.map((label, index) => '<div class="scene-step step-' + index + '"><span>' + label + '</span></div>').join('');
  if (key === 'compiler') {
    scene.querySelector('.step-0').insertAdjacentHTML('beforeend',
      '<div class="prompt-editor"><small>REQUIREMENT</small><p>Build a dashboard that tracks reading progress.</p><div class="editor-caret"></div></div>');
    scene.querySelector('.step-1').insertAdjacentHTML('beforeend', '<div class="intent-map"><b>Reading progress</b><span>Books</span><span>Progress tracking</span><span>Dashboard</span><small>One requirement becomes connected responsibilities.</small></div>');
    scene.querySelector('.step-2').insertAdjacentHTML('beforeend',
      '<div class="schema-grid"><div>UI<br><code>ReadingDashboard</code></div><div>API<br><code>GET /books</code></div><div>DATA<br><code>Book.progress</code></div><div>VALIDATION<br><code>progress: number ✓</code></div></div>');
    scene.querySelector('.step-3').insertAdjacentHTML('beforeend', '<div class="validation-panel"><small>CROSS-LAYER CHECK</small><p><code>Book.progress</code> → <code>API.progress</code></p><del>progress: string</del><strong>progress: number</strong><span>Schema repaired · Valid components preserved</span></div>');
    scene.querySelector('.step-4').insertAdjacentHTML('beforeend',
      '<div class="reading-app"><header>Reading room <small>Illustrative preview</small></header><strong>Your next chapter</strong><div class="reading-books"><div><i></i>Designing systems<progress value="72" max="100"></progress></div><div><i></i>Thinking in code<progress value="43" max="100"></progress></div><div><i></i>Creative practice<progress value="89" max="100"></progress></div></div></div>');
  } else if (key === 'sharing') {
    for (const [index, step] of [...scene.querySelectorAll('.scene-step')].entries()) {
      step.insertAdjacentHTML('beforeend', '<div class="sharing-flow"><b>Sender</b><div class="protected-file">▤<small>project-notes.pdf</small></div><b>' + ['Authenticate', 'Password · Expiry · Access', 'Recipient ✓'][index] + '</b></div>');
    }
  } else {
    for (const [index, step] of [...scene.querySelectorAll('.scene-step')].entries()) {
      step.insertAdjacentHTML('beforeend', '<div class="stadium-map"><div class="pitch"></div><div class="crowd-zone"></div><div class="route route-' + index + '"></div><b>North entrance</b><span>Accessible concourse</span></div>');
    }
  }
  visual.append(scene);
}

const simulation = document.createElement('div');
simulation.className = 'project-demo';
simulation.innerHTML = `<label>Estimate π with random samples
  <input type="range" min="50" max="1800" step="50" value="350">
</label><canvas width="320" height="160" aria-hidden="true"></canvas><output></output>`;
document.querySelector('.project-visual.simulation').append(simulation);

const sampleControl = simulation.querySelector('input');
const samplePlot = simulation.querySelector('canvas').getContext('2d');
let seed = 2026;
function uniform() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
const samples = Array.from({length: 1800}, () => [uniform(), uniform()]);

function drawSamples() {
  const count = sampleControl.valueAsNumber;
  let inside = 0;
  const accent = worlds[root.dataset.mode][3];
  if (samplePlot) samplePlot.clearRect(0, 0, 320, 160);
  for (let index = 0; index < count; index++) {
    const [x, y] = samples[index];
    const hit = x * x + y * y <= 1;
    if (hit) inside++;
    if (samplePlot) {
      samplePlot.fillStyle = hit ? accent : '#8889';
      samplePlot.fillRect(90 + x * 140, 150 - y * 140, 2, 2);
    }
  }
  simulation.querySelector('output').value = `${count} samples · π ≈ ${(4 * inside / count).toFixed(3)}`;
}
sampleControl.addEventListener('input', drawSamples);
new MutationObserver(drawSamples).observe(root, {attributes: true, attributeFilter: ['data-mode']});
drawSamples();
