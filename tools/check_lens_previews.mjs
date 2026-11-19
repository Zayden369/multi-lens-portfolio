// Tests lifecycle state and integration in a DOM; does not render or time CSS loops.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const require=createRequire(resolve('.reference-review/editorial-test/package.json'));
const {parseHTML}=require('linkedom');
const source=fs.readFileSync('multiverse.js','utf8').replaceAll('\r\n','\n');
const worldLiteral=source.slice(source.indexOf('const worlds = ')+15,source.indexOf('\n};',source.indexOf('const worlds = '))+2);
const worlds=vm.runInNewContext('('+worldLiteral+')');
const pause=()=>new Promise(r=>setImmediate(r));
async function fixture(withObserver=true){
 const {window,document}=parseHTML(fs.readFileSync('index.html','utf8'));
 const dialog=document.querySelector('#lens-dialog'),grid=document.querySelector('#lens-grid'),mediaListeners=new Set();
 Object.defineProperty(dialog,'open',{get(){return this.hasAttribute('open');},set(v){this.toggleAttribute('open',v);}});
 let hidden=false,instanceCount=0,disconnections=0,io;
 Object.defineProperty(document,'hidden',{get(){return hidden;}});
 const media={matches:false,addEventListener(t,f){mediaListeners.add(f);}};
 const rect=(top,height,left=0,width=160)=>({top,bottom:top+height,left,right:left+width,height,width});
 dialog.getBoundingClientRect=()=>rect(30,620,40,800);
 const originalButtons=[],hits=[];
 for(const [key,[name,description]]of Object.entries(worlds)){
  const button=document.createElement('button');button.className='lens-option';button.dataset.lens=key;button.setAttribute('aria-pressed',String(key==='boho'));
  button.innerHTML=`<span class="swatch swatch-${key}" aria-hidden="true">Aa</span><strong>${name}</strong><span>${description}</span>`;
  button.addEventListener('click',e=>{hits.push({key,x:e.clientX,y:e.clientY,detail:e.detail});dialog.open=false;});grid.append(button);originalButtons.push(button);
  button.querySelector('.swatch').getBoundingClientRect=()=>rect(130,110,60,140);
 }
 class Observer {constructor(cb,options){instanceCount++;this.cb=cb;this.options=options;this.nodes=[];io=this;}observe(el){this.nodes.push(el);}disconnect(){disconnections++;}entries(items){this.cb(items);}}
 const ctx=vm.createContext({window,document,console,MutationObserver:window.MutationObserver,matchMedia:()=>media,innerWidth:1000,innerHeight:800,...(withObserver?{IntersectionObserver:Observer}:{})});
 for(const file of ['archive-mechanics.js','lens-preview-art.js','lens-previews.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
 const previews=[...document.querySelectorAll('.lens-preview')],playing=()=>previews.filter(el=>el.dataset.playing==='true').length;
 assert.equal(previews.length,9);assert.equal(playing(),0);assert.deepEqual([...grid.children],originalButtons,'existing buttons and listener identities survive');
 assert.equal(new Set(previews.map(n=>n.innerHTML)).size,9);
 assert.ok(previews.every(n=>n.getAttribute('aria-hidden')==='true'&&!n.textContent.includes('Aa')));
 assert.equal(grid.querySelectorAll('button button').length,0);
 assert.deepEqual([...grid.querySelectorAll(':scope > button > strong')].map(n=>n.textContent),Object.values(worlds).map(w=>w[0]));
 // A genuinely off-screen card starts paused even before the first observer delivery.
 previews[8].getBoundingClientRect=()=>rect(700,110,60,140);
 dialog.open=true;await pause();assert.equal(playing(),8);
 if(withObserver){assert.equal(io.options.root,dialog);assert.equal(io.nodes.length,9);io.entries([{target:previews[8],isIntersecting:true,intersectionRatio:.5}]);assert.equal(playing(),9);io.entries([{target:previews[0],isIntersecting:false,intersectionRatio:0}]);assert.equal(playing(),8);}
 else{previews[8].getBoundingClientRect=()=>rect(500,110,60,140);dialog.dispatchEvent(new window.Event('scroll'));assert.equal(playing(),9);}
 hidden=true;document.dispatchEvent(new window.Event('visibilitychange'));assert.equal(playing(),0);
 hidden=false;document.dispatchEvent(new window.Event('visibilitychange'));assert.equal(playing(),withObserver?8:9);
 media.matches=true;for(const f of mediaListeners)f();assert.equal(playing(),0);
 media.matches=false;for(const f of mediaListeners)f();assert.ok(playing()>0);
 const event=new window.Event('click',{bubbles:true});Object.assign(event,{clientX:231,clientY:302,detail:1});originalButtons[2].dispatchEvent(event);await pause();
 assert.deepEqual(hits,[{key:'retro',x:231,y:302,detail:1}]);assert.equal(playing(),0);
 for(let i=0;i<4;i++){dialog.open=true;await pause();assert.ok(playing()>0);dialog.open=false;await pause();assert.equal(playing(),0);}
 // Native close events can be queued: a late close event must not pause a reopened dialog.
 dialog.open=true;await pause();dialog.dispatchEvent(new window.Event('close'));assert.ok(playing()>0);
 assert.equal(previews.length,grid.querySelectorAll('.lens-preview').length);
 const before=instanceCount;document.dispatchEvent(new window.Event('visibilitychange'));document.dispatchEvent(new window.Event('visibilitychange'));assert.equal(instanceCount,before,'no duplicate observer when already running');
 window.dispatchEvent(new window.Event('pagehide'));assert.equal(playing(),0);window.dispatchEvent(new window.Event('pageshow'));assert.ok(playing()>0);
 return {observer:withObserver,previews:9,cycles:4,hiddenPaused:true,reducedPaused:true,selectionCoordinatesPreserved:true,instanceCount,disconnections};
}
const results=[await fixture(true),await fixture(false)];
const prior=execFileSync('git',['show','1fca75e:multiverse.js'],{encoding:'utf8'}).replaceAll('\r\n','\n');
const transition=s=>s.slice(s.indexOf('async function changeLens('),s.indexOf('\nconst resumeDialog'));
assert.equal(transition(source),transition(prior),'circular reveal, top reset and dialog handlers are unchanged');
const expectedResume=prior.slice(prior.indexOf('const resumeDialog')).replace('if (motion.matches) {','if (motion.matches || root.dataset.resumeCinematic === \'disabled\') {');
assert.equal(source.slice(source.indexOf('const resumeDialog')),expectedResume,'private JJK/PDF flow is preserved; only the explicit public-release bypass is added');
const css=fs.readFileSync('lens-previews.css','utf8');
assert.ok(css.includes('prefers-reduced-motion:reduce'));assert.ok(css.includes('animation:none!important'));assert.ok(css.includes('[data-playing="true"]'));
const keyframes=[...css.matchAll(/@keyframes\s+([\w-]+)/g)].map(m=>m[1]);assert.equal(new Set(keyframes).size,keyframes.length);
assert.ok(!/requestAnimationFrame|setInterval|setTimeout|WebGLRenderingContext/.test(fs.readFileSync('lens-previews.js','utf8')));
fs.mkdirSync('review-evidence/lens-previews',{recursive:true});fs.writeFileSync('review-evidence/lens-previews/dom-checks.json',JSON.stringify({kind:'Synthetic DOM logic, not browser/visual acceptance',results,unchangedTransition:true,privateResumePreserved:true,explicitPublicResumeBypass:true,keyframes:keyframes.length},null,2));
console.log('Selector DOM checks passed: nine distinct previews, visible/offscreen lifecycle, tab visibility, reduced motion, repeated open/close, fallback, original handlers, unchanged circle and preserved private resume.');
