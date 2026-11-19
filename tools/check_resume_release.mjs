// State/event checks only. Fake clocks and media do not prove visual playback quality.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const require=createRequire(resolve('.reference-review/editorial-test/package.json'));
const {parseHTML}=require('linkedom');
const html=fs.readFileSync('index.html','utf8'),source=fs.readFileSync('resume-cinematic.js','utf8');
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
function fixture({publicRelease=false,motion=false,pdf=true,playResults=[],decoded=true,frameApi=true}={}){
 const {window,document}=parseHTML(html),root=document.documentElement,dialog=document.querySelector('#resume-dialog'),video=document.querySelector('#resume-video');
 const $=s=>document.querySelector(s),timers=new Map(),frames=new Map(),mediaListeners=new Set();
 let now=0,id=0,plays=0,pauses=0,shows=0,focused=null,draws=0;
 Object.defineProperty(document,'activeElement',{get:()=>focused});
 window.HTMLElement.prototype.focus=function(){focused=this;};
 window.HTMLElement.prototype.animate=function(kf,opts){let resolve,reject;const finished=new Promise((a,b)=>{resolve=a;reject=b;});const timer=setTimer(resolve,opts.duration);return{finished,cancel(){clearTimer(timer);reject(Error('Canceled'));}};};
 Object.defineProperty(dialog,'open',{get(){return this.hasAttribute('open');}});
 dialog.showModal=()=>{shows++;dialog.setAttribute('open','');};dialog.close=()=>{dialog.removeAttribute('open');dialog.dispatchEvent(new window.Event('close'));};
 // LinkeDOM's generic media element lacks the browser's reflected src property.
 Object.defineProperty(video,'src',{get(){return this.getAttribute('src')??'';},set(v){this.setAttribute('src',v);}});
 video.readyState=decoded?4:0;video.videoWidth=decoded?1280:0;video.videoHeight=decoded?720:0;
 video.pause=()=>{pauses++;video.paused=true;};video.load=()=>{};video.canPlayType=()=> 'probably';
 video.play=()=>{plays++;video.paused=false;const outcome=playResults[plays-1];if(outcome==='pending')return new Promise(()=>{});if(outcome instanceof Error)return Promise.reject(outcome);return Promise.resolve();};
 if(frameApi){video.requestVideoFrameCallback=fn=>{const n=++id;frames.set(n,fn);return n;};video.cancelVideoFrameCallback=n=>frames.delete(n);}
 $('#resume-freeze').getContext=()=>({drawImage(){draws++;}});
 Object.defineProperty($('#resume-final-frame'),'complete',{get:()=>true});Object.defineProperty($('#resume-final-frame'),'naturalWidth',{get:()=>1280});
 const media={matches:motion,addEventListener(t,f){mediaListeners.add(f);}};
 function setTimer(fn,ms){const n=++id;timers.set(n,{at:now+ms,fn});return n;}
 function clearTimer(n){timers.delete(n);}
 async function advance(ms){const end=now+ms;for(;;){await flush();const next=[...timers.entries()].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;now=next[1].at;timers.delete(next[0]);next[1].fn();}now=end;await flush();}
 if(publicRelease)root.dataset.resumeCinematic='disabled';
 vm.runInNewContext(source,{document,window,navigator:{pdfViewerEnabled:pdf},MutationObserver:window.MutationObserver,AbortController,matchMedia:()=>media,setTimeout:setTimer,clearTimeout:clearTimer,console});
 const click=s=>$(s).dispatchEvent(new window.Event('click',{bubbles:true,cancelable:true}));
 const intro=()=>{const e=new window.Event('animationend');e.animationName='resume-intro-timeline';$('#resume-energy').dispatchEvent(e);};
 const firstFrame=()=>{for(const [n,fn]of [...frames]){frames.delete(n);fn();}};
 const pdfLoad=()=>$('#resume-pdf')?.dispatchEvent(new window.Event('load'));
 const phase=()=>dialog.dataset.phase;
 return{window,document,root,dialog,video,$,media,mediaListeners,timers,frames,click,intro,firstFrame,pdfLoad,advance,phase,get plays(){return plays;},get pauses(){return pauses;},get shows(){return shows;},get draws(){return draws;},get focused(){return focused;}};
}
async function play(f){f.click('#resume-open');await flush();f.intro();await flush();f.firstFrame();assert.equal(f.phase(),'video-playing');}
async function hold(f,{ready=true}={}){await play(f);f.video.currentTime=4.9;f.video.dispatchEvent(new f.window.Event('ended'));if(ready)f.pdfLoad();await flush();assert.equal(f.phase(),'final-frame-hold');}
const report=[];
for(const config of [{publicRelease:true},{motion:true},{publicRelease:true,pdf:false}]){
 const f=fixture(config);assert.equal(f.phase(),'idle');assert.equal(f.video.getAttribute('src'),null);assert.equal(f.$('#resume-pdf'),null);
 f.click('#resume-open');await flush();assert.equal(f.phase(),'resume-visible');assert.equal(f.plays,0);assert.equal(f.video.getAttribute('src'),null);assert.equal(f.$('#resume-final-frame').getAttribute('src'),null);assert.equal(f.$('#resume-view').inert,false);
 if(config.pdf===false){assert.equal(f.$('#resume-pdf'),null);assert.equal(f.$('#resume-pdf-fallback').hidden,false);}else{assert.ok(f.$('#resume-pdf').src.includes('assets/abhishek-resume.pdf'));f.pdfLoad();assert.equal(f.$('#resume-pdf').hidden,false);}
 const links=[...f.document.querySelectorAll('#resume-view a')];assert.equal(links.length,3);assert.ok(links.every(a=>a.getAttribute('href')==='assets/abhishek-resume.pdf'));
 f.click('#resume-close');assert.equal(f.phase(),'closed');assert.equal(f.$('#resume-pdf'),null);assert.equal(f.focused,f.$('#resume-open'));report.push({config,directPdf:true});
}
{
 const f=fixture();f.click('#resume-open');assert.equal(f.phase(),'energy-intro');assert.equal(f.plays,1);f.click('#resume-open');assert.equal(f.shows,1);assert.equal(f.plays,1);await flush();assert.equal(f.video.currentTime,0);
 f.intro();await flush();assert.equal(f.phase(),'video-loading');assert.equal(f.$('#resume-energy').hidden,false,'opaque intro cover stays until a decoded frame');f.firstFrame();assert.equal(f.phase(),'video-playing');
 assert.equal(f.video.getAttribute('src'),'assets/resume-cinematic.mp4');assert.equal(f.video.loop,false);assert.equal(f.video.controls,false);assert.equal(f.video.playbackRate,1);assert.equal(f.$('#resume-energy').hidden,true);assert.equal(f.$('#resume-view').hidden,true);assert.equal(f.$('#resume-pdf'),null);
 f.video.dispatchEvent(new f.window.Event('ended'));f.pdfLoad();await flush();assert.equal(f.phase(),'final-frame-hold');assert.equal(f.video.getAttribute('src'),'assets/resume-cinematic.mp4');assert.equal(f.video.paused,true);assert.equal(f.draws,1);assert.equal(f.$('#resume-freeze').width,1280);assert.equal(f.dialog.dataset.freezeSource,'decoded-video-frame');
 await f.advance(699);assert.equal(f.phase(),'final-frame-hold');await f.advance(1);assert.equal(f.phase(),'video-fading');assert.equal(f.video.getAttribute('src'),'assets/resume-cinematic.mp4','source survives into fade');
 await f.advance(50);assert.equal(f.phase(),'resume-revealing');assert.equal(f.$('#resume-view').inert,false);await f.advance(900);assert.equal(f.phase(),'resume-visible');assert.equal(f.video.getAttribute('src'),null);assert.equal(f.$('#resume-film').hidden,true);assert.equal(f.$('#resume-view').style.opacity,'1');assert.equal(f.timers.size,0);report.push({fullSequence:true,holdMs:700,dissolveMs:950,sourceRetainedUntilDissolve:true});
}
for(const state of ['energy-intro','video-loading','video-playing','final-frame-hold','video-fading','resume-revealing','resume-visible']){
 const f=fixture();if(state==='energy-intro')f.click('#resume-open');else if(state==='video-loading'){f.click('#resume-open');await flush();f.intro();await flush();}else if(state==='video-playing')await play(f);else{await hold(f);if(state==='video-fading')await f.advance(700);if(state==='resume-revealing')await f.advance(750);if(state==='resume-visible')await f.advance(1650);}
 assert.equal(f.phase(),state);f.click('#resume-close');await flush();assert.equal(f.phase(),'closed');assert.equal(f.dialog.open,false);assert.equal(f.timers.size,0);assert.equal(f.frames.size,0);assert.equal(f.video.getAttribute('src'),null);assert.equal(f.$('#resume-pdf'),null);await f.advance(20000);assert.equal(f.phase(),'closed');
 f.click('#resume-open');await flush();assert.equal(f.phase(),'energy-intro');assert.equal(f.video.currentTime,0);f.click('#resume-close');report.push({closeDuring:state,cleanup:true,reopen:true});
}
{
 const f=fixture({decoded:false});await hold(f);assert.equal(f.dialog.dataset.freezeSource,'supplied-video-final-frame');assert.equal(f.$('#resume-final-frame').hidden,false);f.click('#resume-close');
}
{
 const f=fixture();await hold(f,{ready:false});await f.advance(700);assert.equal(f.phase(),'final-frame-hold','hold also waits for PDF readiness');await f.advance(3300);assert.equal(f.phase(),'video-fading');assert.equal(f.$('#resume-pdf-fallback').hidden,false);await f.advance(950);assert.equal(f.phase(),'resume-visible');
}
for(const state of ['energy-intro','video-playing','final-frame-hold','resume-revealing']){
 const f=fixture();if(state==='energy-intro')f.click('#resume-open');else if(state==='video-playing')await play(f);else{await hold(f);if(state==='resume-revealing')await f.advance(750);}f.click('#resume-skip');await flush();assert.equal(f.phase(),'resume-visible');assert.equal(f.video.getAttribute('src'),null);f.click('#resume-close');
}
{
 const f=fixture({playResults:['pending']});f.click('#resume-open');f.intro();await f.advance(12000);assert.equal(f.phase(),'resume-visible');assert.equal(f.video.getAttribute('src'),null);report.push({slowMediaTimeout:true});
}
{
 const denied=Object.assign(Error('Policy'),{name:'NotAllowedError'}),f=fixture({playResults:[null,denied]});await play(f);assert.equal(f.plays,3);assert.equal(f.video.muted,true);f.click('#resume-close');
 const failed=fixture({playResults:[Error('Unsupported')]});failed.click('#resume-open');await flush();assert.equal(failed.phase(),'resume-visible');assert.equal(failed.video.getAttribute('src'),null);
 const error=fixture();await play(error);error.video.dispatchEvent(new error.window.Event('error'));assert.equal(error.phase(),'resume-visible');
}
{
 const f=fixture();await play(f);f.media.matches=true;for(const callback of f.mediaListeners)callback();assert.equal(f.phase(),'resume-visible');f.click('#resume-close');
 const g=fixture();await play(g);g.root.dataset.mode='modern';await new Promise(r=>setImmediate(r));assert.equal(g.phase(),'closed');
 const h=fixture();await play(h);h.dialog.dispatchEvent(new h.window.Event('cancel',{cancelable:true}));assert.equal(h.phase(),'closed');
}
assert.ok(!html.includes('<img id="resume-page"'),'viewer embeds actual PDF rather than a rendered image');assert.ok(!/<video[^>]*\scontrols(?:\s|>)/.test(html));
fs.mkdirSync('review-evidence/resume-cinematic',{recursive:true});fs.writeFileSync('review-evidence/resume-cinematic/state-checks.json',JSON.stringify({kind:'DOM state tests; fake media and clocks, not visual verification',cases:report},null,2));
console.log('Resume state checks passed: direct PDF, complete sequence, ended-driven hold/fade, final-frame fallback, close/reopen at seven phases, skip, failures, slow loads, reduced motion, Escape and lens cleanup.');
