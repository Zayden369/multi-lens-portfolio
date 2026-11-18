const root = document.documentElement;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(pointer: fine)');
const worlds = {
  boho: ['Bohemian', 'The Living Journal', '#f2e8d8', '#a15336'],
  modern: ['Modern', 'The Digital Laboratory', '#111316', '#95bfff'],
  retro: ['Retro', 'The Time Machine', '#f2e5c9', '#d83920'],
  pixel: ['Pixel', 'The Playable Adventure', '#101d2f', '#7cebb9'],
  vector: ['Vector', 'The Geometry Playground', '#f8f6ef', '#2351db'],
  spatial: ['3D', 'The Multiverse', '#101021', '#bca0ff'],
  sketch: ['Sketchbook', 'The Inventor’s Notebook', '#f8f4e9', '#3a55a6'],
  editorial: ['Editorial', 'The Interactive Magazine', '#f4f0e7', '#7c2634'],
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
  if (pageDirty) {
    pageDirty = false;
    const viewport = window.innerHeight;
    const maxScroll = document.documentElement.scrollHeight - viewport;
    progress.value = maxScroll > 0 ? 100 * clamp(scrollY / maxScroll) : 0;
    const hero = chapters[0].getBoundingClientRect();
    opening = clamp(-hero.top / Math.max(200, hero.height - viewport * .55));
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
      project.style.setProperty('--reveal', smooth(clamp((viewport * .86 - rect.top) / (viewport * .63))));
    });
  }
  if (visibleStage) {
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
const energy = document.querySelector('#resume-energy');
const viewer = document.querySelector('#resume-view');
let revealTimer;

function revealResume() {
  clearTimeout(revealTimer);
  energy.hidden = true;
  if (document.activeElement === resumeSkip) document.querySelector('#resume-close').focus();
  resumeSkip.hidden = true;
  viewer.src = 'assets/abhishek-resume.pdf';
  viewer.hidden = false;
}

resumeButton.hidden = false;
resumeButton.addEventListener('click', () => {
  resumeDialog.showModal();
  if (motion.matches) {
    revealResume();
    return;
  }
  resumeSkip.hidden = false;
  energy.hidden = false;
  resumeSkip.focus();
  revealTimer = setTimeout(revealResume, 2450);
});
resumeSkip.addEventListener('click', revealResume);
document.querySelector('#resume-close').addEventListener('click', () => resumeDialog.close());
resumeDialog.addEventListener('close', () => {
  clearTimeout(revealTimer);
  energy.hidden = true;
  viewer.hidden = true;
  viewer.removeAttribute('src');
  if (!resumeDialog.open) resumeButton.focus({preventScroll: true});
});
motion.addEventListener('change', () => {
  if (motion.matches && resumeDialog.open && !energy.hidden) revealResume();
});

const demonstrations = {
  sharing: [
    'Authenticate: The recipient signs in before requesting access.',
    'Validate link: The server checks expiration, view limits, and revocation.',
    'Grant access: A valid request can open the shared file.',
  ],
  compiler: [
    'Prompt: Build a dashboard that tracks reading progress.',
    'Generate schemas: Describe the book model, API, and dashboard view.',
    'Validate and render: Check shared fields before rendering the dashboard.',
  ],
  stadium: [
    'Entry: A fan starts at the north entrance.',
    'Crowd alert: The direct concourse is modeled as congested.',
    'Alternate route: Guide the fan through the quieter east concourse.',
  ],
};

for (const [key, steps] of Object.entries(demonstrations)) {
  const visual = document.querySelector('.project-visual.' + key);
  const demo = document.createElement('div');
  demo.className = 'project-demo';
  demo.innerHTML = `<label>Explore the illustrative flow
    <input type="range" min="0" max="2" value="0">
  </label><div class="demo-stages" aria-hidden="true"></div><output></output>`;
  const control = demo.querySelector('input');
  const output = demo.querySelector('output');
  const stages = demo.querySelector('.demo-stages');
  for (const step of steps) {
    const badge = document.createElement('span');
    badge.textContent = step.split(':')[0];
    stages.append(badge);
  }
  function showStep() {
    const selected = control.valueAsNumber;
    [...stages.children].forEach((badge, index) => badge.classList.toggle('selected', index === selected));
    const step = steps[selected];
    output.value = step;
    control.setAttribute('aria-valuetext', step);
  }
  visual.append(demo);
  control.addEventListener('input', showStep);
  showStep();
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
