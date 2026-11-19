// DOM and numerical checks only. Synthetic geometry does not validate rendered CSS.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const require=createRequire(resolve('.reference-review/editorial-test/package.json'));
const {parseHTML}=require('linkedom'),{window,document}=parseHTML(fs.readFileSync('index.html','utf8'));
let target='home',progress=0;
const listeners=new Set(),media={matches:false,addEventListener(t,f){listeners.add(f);}};
const rect=(top,height,width=1280)=>({top,bottom:top+height,height,width,left:0,right:width});
window.Element.prototype.getBoundingClientRect=function(){
 if(this.matches('body > header'))return rect(-80,80);
 if(this.id==='home')return rect(target==='home'?-progress*1900:10000,2700);
 if(this.classList.contains('hero-grid'))return rect(0,800);
 if(this.classList.contains('va-exhibit'))return rect(this.classList.contains('va-exhibit--'+target)?12-progress*1612:10000,2400);
 if(this.classList.contains('va-exhibit-pin'))return rect(12,788);
 if(this.classList.contains('va-chronicle'))return rect(target==='about'?12-progress*2412:10000,3200);
 if(this.classList.contains('va-chronicle-runway'))return rect(target==='about'?12-progress*2412:10000,3200);
 if(this.classList.contains('va-workshop'))return rect(target==='skills'?12-progress*1612:10000,2400);
 if(this.classList.contains('va-support-pin'))return rect(12,788);
 return rect(10000,600);
};
const proto=window.HTMLSelectElement.prototype;
if(!Object.getOwnPropertyDescriptor(proto,'value')?.set)Object.defineProperty(proto,'value',{configurable:true,get(){return [...this.options].find(n=>n.hasAttribute('selected'))?.value??this.options[0]?.value;},set(v){[...this.options].forEach(n=>n.toggleAttribute('selected',n.value===String(v)));}});
const sandbox={window,document,console,matchMedia:()=>media,MutationObserver:window.MutationObserver,innerWidth:1280,innerHeight:900,scrollY:0,location:{hash:''},scrollTo(){},setTimeout,clearTimeout};
const ctx=vm.createContext(sandbox);
for(const file of ['app.js','archive-mechanics.js','victorian-art.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
const canonical=[...document.querySelectorAll('.project-copy > a')].map(n=>n.getAttribute('href'));
const M=window.ArchiveMechanics;
assert.equal(M.meshAngle(360,18,15),-432);
assert.equal(M.meshAngle(M.meshAngle(360,18,15),15,12),540);
assert.equal(M.opening(.3).doors,0,'the door cannot open before bolts retract');
assert.equal(M.opening(.48).pins,1,'pins have fully retracted before the door moves significantly');
assert.equal(M.opening(1).drawer,1);
assert.ok(M.gearPath(36,18).endsWith('Z'));
document.documentElement.dataset.mode='victorian';vm.runInContext(fs.readFileSync('victorian-archive.js','utf8'),ctx,{filename:'victorian-archive.js'});
const frame=(key,p)=>{target=key;progress=p;document.dispatchEvent(new window.CustomEvent('portfolio:archive-frame'));};
assert.equal(document.querySelectorAll('.va-exhibit').length,4);assert.equal(document.documentElement.dataset.archiveReady,'true');
for(const a of document.querySelectorAll('a[href^="#va-"]'))assert.ok(document.querySelector(a.getAttribute('href')));
const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);assert.equal(new Set(ids).size,ids.length);
const stages=[];for(const key of ['home','sharing','compiler','stadium','simulation'])for(const p of [0,.2,.4,.6,.8,1]){
 frame(key,p);const el=document.querySelector(key==='home'?'.va-opening':'.va-exhibit--'+key);assert.equal(+el.dataset.phase,Math.round(p*5));stages.push({key,p,phase:el.dataset.phase});
}
frame('home',.6);const door=document.querySelector('.va-door-left').getAttribute('transform');frame('home',1);frame('home',.6);assert.equal(document.querySelector('.va-door-left').getAttribute('transform'),door);
frame('compiler',1);assert.equal(document.querySelector('.va-reading-app').getAttribute('aria-hidden'),'false');
frame('compiler',0);assert.equal(document.querySelector('.va-reading-app').getAttribute('aria-hidden'),'true');
const plot=[];for(const p of [.4,1,.4]){frame('simulation',p);const el=document.querySelector('.va-exhibit--simulation'),svg=el.querySelector('.va-wide');const hit=(svg.querySelector('.va-sample-hits').getAttribute('d').match(/M/g)||[]).length,miss=(svg.querySelector('.va-sample-misses').getAttribute('d').match(/M/g)||[]).length,total=hit+miss;assert.equal(total,+el.dataset.samples);assert.ok(Math.abs(4*hit/total-Number(el.dataset.estimate))<.000001);plot.push({p,total,hit,estimate:el.dataset.estimate});}
assert.deepEqual(plot[0],plot[2]);assert.equal(plot[1].total,2000);
for(const p of [0,.2,.4,.6,.8,1]){frame('about',p);assert.equal(+document.querySelector('.va-chronicle').dataset.chapter,Math.min(4,Math.floor(p/.88*5)));}
frame('skills',.4);const picker=document.querySelector('[data-va-station]');picker.value='3';picker.dispatchEvent(new window.Event('change'));assert.equal(document.querySelector('.va-workshop').dataset.station,'3');assert.equal([...document.querySelectorAll('[data-va-station-art]')].filter(n=>!n.hidden).length,1);
const record=document.querySelector('[data-va-record]');record.value='2';record.dispatchEvent(new window.Event('change'));assert.equal(document.querySelector('.va-records').dataset.record,'2');
const flush=()=>new Promise(r=>setImmediate(r));
for(const mode of ['modern','victorian','sketch','victorian','spatial','victorian']){document.documentElement.dataset.mode=mode;await flush();await flush();if(mode==='victorian'){assert.equal(document.querySelectorAll('.va-exhibit').length,4);assert.equal(document.querySelector('.va-opening').hidden,false);}else{assert.equal(document.querySelector('.va-opening').hidden,true);assert.equal(document.documentElement.dataset.archiveUpdates,undefined);}}
const before=+document.documentElement.dataset.archiveUpdates;frame('home',0);assert.equal(+document.documentElement.dataset.archiveUpdates,before+1);
media.matches=true;for(const f of listeners)f();assert.ok([...document.querySelectorAll('.va-exhibit')].every(n=>n.dataset.phase==='5'));
assert.deepEqual([...document.querySelectorAll('.project-copy > a')].map(n=>n.getAttribute('href')),canonical);assert.equal(document.querySelector('#resume-video').getAttribute('src'),null);
fs.mkdirSync('review-evidence/victorian',{recursive:true});fs.writeFileSync('review-evidence/victorian/dom-checks.json',JSON.stringify({kind:'DOM logic only; no browser rendering',stages,plot,reverseOpening:true,modeCleanup:true,gearRatios:true,reducedFinalStates:true,canonical},null,2));
console.log('Archive DOM checks passed: mechanical ordering/ratios, 30 scroll states, reverse motion, computed plots, chapter/station/record controls, reduced state and lifecycle cleanup.');
