/* Private cinematic and public direct-PDF reader. One cancellable session at a time. */
(() => {
  const root = document.documentElement;
  const dialog = document.querySelector('#resume-dialog');
  if (!dialog) return;
  const button = document.querySelector('#resume-open');
  const navLink = document.querySelector('a[href="#resume"]');
  const skip = document.querySelector('#resume-skip');
  const closeButton = document.querySelector('#resume-close');
  const energy = document.querySelector('#resume-energy');
  const film = document.querySelector('#resume-film');
  const video = document.querySelector('#resume-video');
  const freeze = document.querySelector('#resume-freeze');
  const finalImage = document.querySelector('#resume-final-frame');
  const reader = document.querySelector('#resume-view');
  const pdfHost = document.querySelector('#resume-pdf-host');
  const pdfFallback = document.querySelector('#resume-pdf-fallback');
  const status = document.querySelector('#resume-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const PDF = 'assets/abhishek-resume.pdf';
  const VIDEO = 'assets/resume-cinematic.mp4';
  const FINAL_FRAME = 'assets/resume-final-frame.png';
  const HOLD_MS = 700, FADE_MS = 950, REVEAL_DELAY_MS = 50;
  const activeMediaPhases = new Set(['energy-intro', 'video-loading', 'video-playing']);
  const timers = new Map(), animations = new Set();
  let session = 0, phase = 'idle', opener = button;
  let introDone = false, primed = false, launching = false;
  let frameCallback = 0, loadDeadline = 0, pdfDeadline = 0, pdfFrame = null;
  let pdfPromise = null, resolvePdf = null, pdfEvents = null;

  function setPhase(next) {
    phase = next;
    dialog.dataset.phase = next;
  }
  function current(token) { return token === session && dialog.open; }
  function wait(ms, token) {
    return new Promise(resolve => {
      const id = setTimeout(() => {
        timers.delete(id);
        resolve(current(token));
      }, ms);
      timers.set(id, () => resolve(false));
    });
  }
  function clearDeadline() { clearTimeout(loadDeadline); loadDeadline = 0; }
  function armDeadline(token) {
    clearDeadline();
    loadDeadline = setTimeout(() => {
      if (current(token) && activeMediaPhases.has(phase)) {
        showDocument('The cinematic could not finish loading. Your original résumé is available below.');
      }
    }, 12000);
  }
  function cancelWork() {
    clearDeadline();
    for (const [id, cancel] of timers) { clearTimeout(id); cancel(); }
    timers.clear();
    for (const animation of animations) animation.cancel();
    animations.clear();
    if (frameCallback) video.cancelVideoFrameCallback?.(frameCallback);
    frameCallback = 0;
    energy.classList.remove('is-running');
    introDone = primed = launching = false;
  }
  function releaseMedia() {
    video.pause();
    video.removeAttribute('src');
    video.preload = 'none';
    video.load();
    video.hidden = true;
    finalImage.hidden = true;
    finalImage.removeAttribute('src');
    freeze.hidden = true;
    freeze.width = freeze.height = 1;
  }
  function releasePdf() {
    clearTimeout(pdfDeadline);
    pdfDeadline = 0;
    pdfEvents?.abort();
    pdfEvents = null;
    resolvePdf?.(false);
    resolvePdf = null;
    pdfPromise = null;
    pdfFrame?.remove();
    pdfFrame = null;
  }
  function resetSurface() {
    for (const el of [film, reader]) {
      el.style.removeProperty('opacity');
      el.style.removeProperty('transition');
    }
    film.hidden = energy.hidden = true;
    reader.hidden = true;
    reader.inert = true;
    reader.setAttribute('aria-hidden', 'true');
  }

  function preparePdf(token) {
    if (pdfPromise) return pdfPromise;
    pdfPromise = new Promise(resolve => { resolvePdf = resolve; });
    // Build the PDF underneath the opaque frozen film, without exposing it or
    // giving it focus. Keeping its layout alive lets native PDF viewers initialize.
    reader.hidden = false;
    reader.style.opacity = '0';
    pdfFallback.hidden = false;
    if (navigator.pdfViewerEnabled === false) {
      resolvePdf(false);
      resolvePdf = null;
      return pdfPromise;
    }
    const frame = document.createElement('iframe');
    frame.id = 'resume-pdf';
    frame.title = 'Abhishek Kumar Gupta — original résumé PDF';
    frame.referrerPolicy = 'no-referrer';
    frame.hidden = false;
    pdfFrame = frame;
    pdfEvents = new AbortController();
    frame.addEventListener('load', () => {
      if (!current(token) || frame !== pdfFrame) return;
      frame.hidden = false;
      pdfFallback.hidden = true;
      clearTimeout(pdfDeadline);
      pdfDeadline = 0;
      resolvePdf?.(true);
      resolvePdf = null;
    }, {signal: pdfEvents.signal});
    frame.addEventListener('error', () => {
      if (!current(token) || frame !== pdfFrame) return;
      frame.hidden = true;
      pdfFallback.hidden = false;
      clearTimeout(pdfDeadline);
      pdfDeadline = 0;
      status.textContent = 'The embedded viewer is unavailable. Open or download the original PDF using the links above.';
      resolvePdf?.(false);
      resolvePdf = null;
    }, {signal: pdfEvents.signal});
    // Set the real PDF URL before attaching, avoiding an initial about:blank load event.
    frame.src = PDF + '#view=FitH&toolbar=0&navpanes=0';
    pdfHost.append(frame);
    pdfDeadline = setTimeout(() => {
      pdfDeadline = 0;
      if (!current(token) || frame !== pdfFrame || !resolvePdf) return;
      status.textContent = 'The PDF is taking longer to display. You can open or download the original document.';
      resolvePdf(false);
      resolvePdf = null;
    }, 4000);
    return pdfPromise;
  }
  function makeReaderAccessible() {
    reader.hidden = false;
    reader.inert = false;
    reader.setAttribute('aria-hidden', 'false');
    skip.hidden = true;
    if (document.activeElement === skip) closeButton.focus({preventScroll: true});
  }
  function finishDocument() {
    setPhase('resume-visible');
    reader.style.opacity = '1';
    makeReaderAccessible();
    film.hidden = energy.hidden = true;
    cancelWork();
    releaseMedia();
  }
  function showDocument(message = '') {
    if (!dialog.open) return;
    // Invalidate media promises and pending fades before starting the direct reader.
    session++;
    cancelWork();
    releasePdf();
    status.textContent = message;
    preparePdf(session);
    finishDocument();
  }

  function fade(el, from, to, duration, token) {
    if (el.animate) {
      const animation = el.animate([{opacity: from}, {opacity: to}], {
        duration, easing: 'cubic-bezier(.3,0,.2,1)', fill: 'forwards',
      });
      animations.add(animation);
      return animation.finished.then(() => {
        if (current(token)) el.style.opacity = String(to);
        animation.cancel();
        return current(token);
      }, () => false).finally(() => animations.delete(animation));
    }
    el.style.opacity = String(from);
    el.style.transition = `opacity ${duration}ms ease`;
    void el.offsetWidth;
    el.style.opacity = String(to);
    return wait(duration, token);
  }
  function freezeFinalFrame() {
    // The source remains mounted and paused throughout the hold and cross-dissolve.
    video.pause();
    try {
      if (!video.videoWidth || !video.videoHeight || video.readyState < 2) throw Error('No decoded frame');
      freeze.width = video.videoWidth;
      freeze.height = video.videoHeight;
      const context = freeze.getContext('2d', {alpha: false});
      if (!context) throw Error('Canvas unavailable');
      context.drawImage(video, 0, 0, freeze.width, freeze.height);
      freeze.hidden = false;
      dialog.dataset.freezeSource = 'decoded-video-frame';
    } catch {
      // This local PNG is the exact last decoded frame of the supplied MP4, not a recreation.
      if (finalImage.complete && finalImage.naturalWidth) {
        finalImage.hidden = false;
        dialog.dataset.freezeSource = 'supplied-video-final-frame';
      } else {
        dialog.dataset.freezeSource = 'mounted-video';
      }
    }
  }
  async function onEnded() {
    if (!dialog.open || phase !== 'video-playing') return;
    const token = session;
    clearDeadline();
    setPhase('final-frame-hold');
    freezeFinalFrame();
    const pdfReady = preparePdf(token);
    if (!await wait(HOLD_MS, token)) return;
    await pdfReady;
    if (!current(token)) return;
    reader.hidden = false;
    reader.style.opacity = '0';
    film.style.opacity = '1';
    setPhase('video-fading');
    const filmFade = fade(film, 1, 0, FADE_MS, token);
    if (!await wait(REVEAL_DELAY_MS, token)) return;
    setPhase('resume-revealing');
    makeReaderAccessible();
    const pdfFade = fade(reader, 0, 1, FADE_MS - REVEAL_DELAY_MS, token);
    await Promise.all([filmFade, pdfFade]);
    if (current(token)) finishDocument();
  }
  function showFirstFrame(token) {
    if (!current(token) || phase !== 'video-loading') return;
    clearDeadline();
    video.hidden = false;
    film.hidden = false;
    energy.hidden = true;
    energy.classList.remove('is-running');
    setPhase('video-playing');
  }
  async function startVideo(token) {
    if (!current(token) || !introDone || !primed || launching) return;
    launching = true;
    setPhase('video-loading');
    video.hidden = false;
    film.hidden = false;
    video.muted = false;
    try {
      // The click already primed this element. Retain audio when the browser permits it.
      try { await video.play(); }
      catch (error) {
        if (!current(token)) return;
        if (error.name !== 'NotAllowedError') throw error;
        video.muted = true;
        await video.play();
        if (current(token)) status.textContent = 'Your browser is playing the cinematic without sound.';
      }
      if (!current(token)) return;
      if (video.requestVideoFrameCallback) {
        frameCallback = video.requestVideoFrameCallback(() => {
          frameCallback = 0;
          showFirstFrame(token);
        });
      } else if (video.readyState >= 2) showFirstFrame(token);
    } catch {
      if (current(token)) showDocument('Video playback is unavailable. Your original résumé is ready below.');
    }
  }
  function onIntroEnd(event) {
    if (event.target !== energy || event.animationName !== 'resume-intro-timeline' || phase !== 'energy-intro') return;
    introDone = true;
    setPhase('video-loading');
    startVideo(session);
  }
  function open(event) {
    event?.preventDefault();
    if (dialog.open) return;
    session++;
    const token = session;
    cancelWork();
    releasePdf();
    releaseMedia();
    resetSurface();
    opener = event?.currentTarget || button;
    status.textContent = '';
    delete dialog.dataset.freezeSource;
    dialog.showModal();
    if (reduced.matches || root.dataset.resumeCinematic === 'disabled') {
      showDocument();
      return;
    }
    if (video.canPlayType && !video.canPlayType('video/mp4')) {
      showDocument('This browser cannot play the cinematic. Open or download your original résumé below.');
      return;
    }
    setPhase('energy-intro');
    energy.hidden = false;
    energy.classList.add('is-running');
    skip.hidden = false;
    skip.focus({preventScroll: true});
    finalImage.src = FINAL_FRAME;
    video.controls = false;
    video.loop = false;
    video.playbackRate = 1;
    video.disablePictureInPicture = true;
    video.disableRemotePlayback = true;
    video.preload = 'auto';
    video.muted = true;
    video.src = VIDEO;
    armDeadline(token);
    // Invoke play in the click handler. Decode silently behind the intro, pause,
    // rewind to zero, then reveal the full clip only when its first frame is ready.
    try {
      Promise.resolve(video.play()).then(() => {
        if (!current(token) || !activeMediaPhases.has(phase)) return;
        video.pause();
        video.currentTime = 0;
        primed = true;
        startVideo(token);
      }, () => {
        if (current(token)) showDocument('The cinematic is unavailable. Your original résumé is ready below.');
      });
    } catch {
      showDocument('The cinematic is unavailable. Your original résumé is ready below.');
    }
  }
  function cleanClosed(restoreFocus = true) {
    session++;
    setPhase('closed');
    cancelWork();
    releaseMedia();
    releasePdf();
    resetSurface();
    skip.hidden = true;
    status.textContent = '';
    if (restoreFocus) (opener?.isConnected ? opener : button).focus({preventScroll: true});
  }
  function close(restoreFocus = true) {
    if (!dialog.open) return;
    cleanClosed(restoreFocus);
    dialog.close();
  }

  button.hidden = false;
  button.addEventListener('click', open);
  navLink.addEventListener('click', open);
  closeButton.addEventListener('click', () => close());
  skip.addEventListener('click', () => showDocument());
  energy.addEventListener('animationend', onIntroEnd);
  video.addEventListener('ended', onEnded);
  video.addEventListener('error', () => {
    if (dialog.open && activeMediaPhases.has(phase)) showDocument('The cinematic is unavailable. Your original résumé is ready below.');
  });
  video.addEventListener('waiting', () => { if (phase === 'video-playing') armDeadline(session); });
  video.addEventListener('playing', () => { if (phase === 'video-playing') clearDeadline(); });
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('close', () => { if (!dialog.open && phase !== 'closed') cleanClosed(); });
  reduced.addEventListener('change', () => { if (reduced.matches && dialog.open) showDocument(); });
  new MutationObserver(() => { if (dialog.open) close(); }).observe(root, {attributes: true, attributeFilter: ['data-mode']});
  window.addEventListener('pagehide', () => close(false));
  setPhase('idle');
})();
