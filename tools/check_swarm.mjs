// Dependency, lifecycle and integration tests. Synthetic geometry is not visual QA.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const require=createRequire(resolve('.reference-review/editorial-test/package.json')),{parseHTML}=require('linkedom');
const source=n=>fs.readFileSync(n,'utf8');
const coreContext={window:{}};vm.runInNewContext(source('ai-swarm-core.js'),coreContext);const core=coreContext.window.SwarmCore;
assert.throws(()=>new core.TaskGraph([{id:'a',dependencies:['b']}]),/Missing/);
assert.throws(()=>new core.TaskGraph([{id:'a',dependencies:['b']},{id:'b',dependencies:['a']}]),/Cyclic/);
assert.throws(()=>new core.TaskGraph([{id:'a'},{id:'a'}]),/Duplicate/);
const graph=new core.TaskGraph([{id:'frame',group:0,duration:20},{id:'text',group:0,duration:30,dependencies:['frame']},{id:'qa',group:0,duration:10,dependencies:['text']}]);
assert.equal(graph.ready(0).map(t=>t.id).join(','),'frame');assert.equal(graph.start(graph.tasks[1],0,{}),false);graph.start(graph.tasks[0],0,{});graph.update(20,()=>{},()=>{});assert.equal(graph.ready(0)[0].id,'text');graph.start(graph.tasks[1],20,{});graph.update(50,()=>{},()=>{});assert.equal(graph.ready(0)[0].id,'qa');
const points=core.samples();assert.equal(points.length,480);assert.equal(points.at(-1).inside,points.filter(p=>p.hit).length);assert.equal(points.at(-1).estimate,4*points.filter(p=>p.hit).length/480);
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function fixture({width=1440,motion=false,hash=''}={}){
 const {window,document}=parseHTML(source('index.html'));let y=0,rafId=0,now=0,hidden=false;
 const rafs=new Map(),mediaCallbacks=new Set(),queries=new Map(),scrolls=[];
 Object.defineProperty(document,'hidden',{get:()=>hidden});
 const rect=(top=200,height=260,left=90,w=520)=>({top,bottom:top+height,left,right:left+w,height,width:w});
 const topFor=el=>{
  if(el.matches('header,header *'))return 0;
  const section=el.closest('main > section');const base={home:100,work:850,opensource:4550,about:5150,skills:6400,contact:7000}[section?.id]||50;
  const project=el.closest('.project');if(project){const i=[...document.querySelectorAll('.project')].indexOf(project);return 1100+i*820+(el.closest('.project-visual')?300:0);}
  if(el.closest('.timeline'))return base+500;
  if(el.closest('.achievements'))return base+850;
  return base;
 };
 window.Element.prototype.getBoundingClientRect=function(){return rect(topFor(this)-y,this.matches('h1')?150:this.matches('main > section')?700:260);};
 Object.defineProperty(document.documentElement,'scrollHeight',{get:()=>8000});
 document.createRange=()=>({setStart(){},setEnd(){},getBoundingClientRect(){return rect(150-y,24,130,16);}});
 window.HTMLElement.prototype.focus=function(){};
 const sandbox={window,document,NodeFilter:{SHOW_TEXT:4},MutationObserver:window.MutationObserver,AbortController,innerWidth:width,innerHeight:900,location:{hash},console,requestAnimationFrame(fn){const id=++rafId;rafs.set(id,fn);return id;},cancelAnimationFrame(id){rafs.delete(id);},scrollTo(o){y=o.top;scrolls.push(y);},get scrollY(){return y;},matchMedia(q){if(!queries.has(q))queries.set(q,{matches:q.includes('reduced-motion')?motion:width<600,addEventListener(type,fn){if(q.includes('reduced-motion'))mediaCallbacks.add(fn);}});return queries.get(q);}};
 const ctx=vm.createContext(sandbox);for(const file of ['app.js','ai-swarm-core.js','ai-swarm-art.js'])vm.runInContext(source(file),ctx,{filename:file});
 const originalLinks=[...document.querySelectorAll('main a')].map(n=>n.getAttribute('href'));
 document.documentElement.dataset.mode='swarm';vm.runInContext(source('ai-swarm.js'),ctx,{filename:'ai-swarm.js'});
 const frame=()=>{now+=40;const pending=[...rafs];rafs.clear();for(const [,fn]of pending)fn(now);assert.ok(rafs.size<=1,'one swarm frame loop');};
 const advance=ms=>{for(let i=0;i<Math.ceil(ms/40);i++)frame();};
 const click=selector=>document.querySelector(selector).dispatchEvent(new window.Event('click',{bubbles:true}));
 return{window,document,sandbox,ctx,rafs,scrolls,frame,advance,click,originalLinks,queries,mediaCallbacks,setHidden(v){hidden=v;document.dispatchEvent(new window.Event('visibilitychange'));},get state(){return document.documentElement.dataset.swarmState;}};
}
const report=[];
console.log('Swarm: scheduler and computed-data checks passed; starting DOM tour.');
{
 const f=fixture();console.log('Swarm: DOM fixture initialized.');assert.equal(f.state,'initializing');assert.equal(f.document.querySelectorAll('.sw-agent').length,16);assert.equal(f.document.querySelectorAll('.sw-project-art').length,4);assert.ok(f.document.querySelectorAll('[data-sw-build="waiting"]').length>30);
 f.advance(1100);assert.equal(f.state,'assembling-hero');for(let i=0;i<2250&&f.state!=='flocking';i++)f.advance(40);assert.equal(f.state,'flocking');const tourSeconds=Number(f.document.querySelector('.sw-panel').dataset.durationSeconds);assert.ok(tourSeconds<=70,'bounded simulated tour duration');assert.equal(f.document.querySelectorAll('[data-sw-build]').length,0);assert.ok(f.scrolls.at(-1)>6500);assert.equal(f.document.querySelector('.sw-panel progress').value,1);
 assert.deepEqual([...f.document.querySelectorAll('main a')].filter(n=>!n.closest('.sw-index')).map(n=>n.getAttribute('href')),f.originalLinks);assert.equal(f.document.querySelector('#resume-video').getAttribute('src'),null);
 for(const link of f.document.querySelectorAll('.sw-index a'))assert.ok(f.document.querySelector(link.getAttribute('href')),'project jump points to an actual owned exhibit');
 f.click('[data-sw-replay]');assert.equal(f.state,'replaying');f.advance(2500);const wheel=new f.window.Event('wheel');wheel.deltaY=100;f.window.dispatchEvent(wheel);assert.equal(f.state,'user-interrupted');assert.equal(f.document.querySelectorAll('[data-sw-build]').length,0);const count=f.scrolls.length;f.advance(2000);assert.equal(f.scrolls.length,count,'manual input permanently stops tour scrolling');
 for(let i=0;i<3;i++){f.click('[data-sw-replay]');f.advance(1200);f.click('[data-sw-skip]');assert.equal(f.document.querySelectorAll('.sw-agent').length,16);assert.equal(f.document.querySelectorAll('.sw-project-art').length,4);}
 f.setHidden(true);assert.equal(f.rafs.size,0);f.setHidden(false);assert.equal(f.rafs.size,1);
 f.click('[data-sw-replay]');f.advance(2000);f.document.querySelector('#resume-dialog').setAttribute('open','');await flush();assert.equal(f.rafs.size,0);assert.equal(f.document.querySelector('.sw-layer').hidden,true);assert.equal(f.document.querySelectorAll('[data-sw-build]').length,0);f.document.querySelector('#resume-dialog').removeAttribute('open');await flush();assert.equal(f.rafs.size,1);
 f.document.querySelector('#lens-dialog').setAttribute('open','');await flush();assert.equal(f.rafs.size,0);f.document.documentElement.dataset.mode='modern';await flush();assert.equal(f.document.querySelector('.sw-layer').hidden,true);assert.equal(f.rafs.size,0);assert.equal(f.document.querySelectorAll('[data-sw-build]').length,0);
 f.document.querySelector('#lens-dialog').removeAttribute('open');for(const mode of ['swarm','boho','swarm','victorian','swarm']){f.document.documentElement.dataset.mode=mode;await flush();f.advance(100);}assert.equal(f.document.querySelectorAll('.sw-agent').length,16);assert.equal(f.rafs.size,1);
 f.click('[data-sw-effects]');assert.equal(f.rafs.size,0);f.click('[data-sw-replay]');assert.equal(f.state,'replaying');assert.equal(f.rafs.size,1,'replay after Effects off reenables animation instead of leaving content masked');f.click('[data-sw-skip]');
 f.queries.get('(prefers-reduced-motion: reduce)').matches=true;for(const callback of f.mediaCallbacks)callback();assert.equal(f.rafs.size,0);assert.equal(f.document.querySelectorAll('[data-sw-build]').length,0);report.push({fullTour:true,simulatedTourSeconds:tourSeconds,replayCycles:3,oneLoop:true,modeCleanup:true,dialogSuspension:true,manualTakeover:true});
}
for(const options of [{motion:true},{hash:'#work'},{width:390}]){
 const f=fixture(options);if(options.motion||options.hash){assert.equal(f.state,'flocking');assert.equal(f.document.querySelectorAll('[data-sw-build]').length,0);assert.equal(f.scrolls.length,0);}else{f.advance(1200);assert.equal([...f.document.querySelectorAll('.sw-agent')].filter(n=>!n.hidden).length,6);f.click('[data-sw-skip]');assert.equal(f.document.querySelectorAll('[data-sw-build]').length,0);}report.push({options,state:f.state,rafCount:f.rafs.size});
}
const prior=execFileSync('git',['show','dc47b3b:multiverse.js'],{encoding:'utf8'}).replaceAll('\r\n','\n'),current=source('multiverse.js').replaceAll('\r\n','\n');
const circle=s=>s.slice(s.indexOf('async function changeLens('),s.indexOf('// Résumé lifecycle'));
assert.equal(circle(current),circle(prior));
assert.equal(source('resume-cinematic.js').replaceAll('\r\n','\n'),execFileSync('git',['show','dc47b3b:resume-cinematic.js'],{encoding:'utf8'}).replaceAll('\r\n','\n'));
const previewContext=vm.createContext({window:{}});vm.runInContext(source('archive-mechanics.js'),previewContext);
vm.runInContext(execFileSync('git',['show','dc47b3b:lens-preview-art.js'],{encoding:'utf8'}),previewContext);const priorPreviews=previewContext.window.LensPreviewArt;
vm.runInContext(source('lens-preview-art.js'),previewContext);for(const key of Object.keys(priorPreviews))assert.equal(previewContext.window.LensPreviewArt[key](),priorPreviews[key](),'existing preview is unchanged: '+key);
const registry=current.slice(current.indexOf('const worlds = ')+15,current.indexOf('\n};')+2);assert.equal(Object.keys(vm.runInNewContext('('+registry+')')).length,10);
fs.mkdirSync('review-evidence/swarm',{recursive:true});fs.writeFileSync('review-evidence/swarm/logic-checks.json',JSON.stringify({kind:'DOM with synthetic geometry, not rendered browser QA',report,sampleCount:points.length,inside:points.at(-1).inside,estimate:points.at(-1).estimate},null,2));
console.log('AI Swarm checks passed: DAG ordering, full autonomous tour, user takeover, replay, single loop, dialogs, mode cleanup, mobile count, reduced motion, hash entry, canonical links, exact resume and circle preservation.');
