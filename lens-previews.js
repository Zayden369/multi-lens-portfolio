/* A single observer manages nine CSS timelines; no timers, RAFs or render contexts. */
(() => {
 const dialog=document.querySelector('#lens-dialog'),grid=document.querySelector('#lens-grid');
 if(!dialog||!grid||!window.LensPreviewArt)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),previews=[];
 let observer=null,running=false,selecting=false,fallback=false;
 for(const button of grid.querySelectorAll('.lens-option')){
  const key=button.dataset.lens,swatch=button.querySelector('.swatch'),art=window.LensPreviewArt[key];
  if(!swatch||!art)continue;
  swatch.classList.add('lens-preview');swatch.dataset.preview=key;swatch.dataset.playing='false';
  swatch.innerHTML=art()+'<span class="lp-current">CURRENT</span>';previews.push(swatch);
 }
 function play(el,value){const next=String(value);if(el.dataset.playing!==next)el.dataset.playing=next;}
 function measure(){if(!running)return;const region=dialog.getBoundingClientRect();const left=Math.max(0,region.left),right=Math.min(innerWidth,region.right),top=Math.max(0,region.top),bottom=Math.min(innerHeight,region.bottom);
  for(const el of previews){const r=el.getBoundingClientRect();play(el,r.bottom>top&&r.top<bottom&&r.right>left&&r.left<right);}
 }
 function stop(){running=false;observer?.disconnect();observer=null;if(fallback){dialog.removeEventListener('scroll',measure);window.removeEventListener('resize',measure);fallback=false;}previews.forEach(el=>play(el,false));}
 function sync(){const wanted=dialog.open&&!document.hidden&&!reduced.matches&&!selecting;
  if(!wanted){stop();return;}if(running)return;running=true;measure();
  if(typeof IntersectionObserver==='function'){
   observer=new IntersectionObserver(entries=>{if(!running)return;for(const e of entries)play(e.target,e.isIntersecting&&e.intersectionRatio>0);},{root:dialog,threshold:0});
   previews.forEach(el=>observer.observe(el));
  }else{fallback=true;dialog.addEventListener('scroll',measure,{passive:true});window.addEventListener('resize',measure);}
 }
 function lifecycle(){if(!dialog.open)selecting=false;sync();}
 new MutationObserver(lifecycle).observe(dialog,{attributes:true,attributeFilter:['open']});
 dialog.addEventListener('toggle',lifecycle);dialog.addEventListener('close',lifecycle);
 // Capture only suspends artwork: the original button handler retains the click point and reveal.
 dialog.addEventListener('click',event=>{if(event.target.closest?.('.lens-option')){selecting=true;stop();}},{capture:true});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 window.addEventListener('pagehide',stop);window.addEventListener('pageshow',lifecycle);sync();
})();
