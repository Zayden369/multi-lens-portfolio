// DOM integration checks only: this does not render CSS or emulate a browser.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
const require=createRequire(resolve('.reference-review/editorial-test/package.json'));
const {parseHTML}=require('linkedom');
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const base=process.cwd(), {window,document}=parseHTML(fs.readFileSync('index.html','utf8'));
let target='home',progress=0;
const mediaListeners=new Set(),media={matches:false,addEventListener(t,f){mediaListeners.add(f);},removeEventListener(t,f){mediaListeners.delete(f);}};
const rect=(top,height,width=1280)=>({top,bottom:top+height,height,width,left:0,right:width,x:0,y:top});
window.Element.prototype.getBoundingClientRect=function(){
 if(this.matches('body > header'))return rect(-80,80);
 if(this.id==='home')return rect(target==='home'?-progress*1900:10000,2700);
 if(this.classList.contains('hero-grid'))return rect(0,800);
 if(this.classList.contains('ed-feature'))return rect(this.classList.contains('ed-feature--'+target)?12-progress*1612:10000,2400);
 if(this.classList.contains('ed-feature-pin'))return rect(12,788);
 if(this.classList.contains('ed-profile'))return rect(target==='about'?-progress*2412:10000,3300);
 if(this.classList.contains('ed-profile-runway'))return rect(target==='about'?12-progress*2412:10000,3200);
 if(this.classList.contains('ed-profile-pin'))return rect(12,788);
 if(this.classList.contains('ed-toolkit'))return rect(target==='skills'?12-progress*1612:10000,2400);
 if(this.classList.contains('ed-toolkit-pin'))return rect(12,788);
 return rect(10000,600);
};
// LinkeDOM lacks the browser's selected-option value setter in this version.
const selectProto=window.HTMLSelectElement.prototype,desc=Object.getOwnPropertyDescriptor(selectProto,'value');
if(!desc?.set)Object.defineProperty(selectProto,'value',{configurable:true,get(){return [...this.options].find(n=>n.hasAttribute('selected'))?.value??this.options[0]?.value;},set(value){[...this.options].forEach(n=>n.toggleAttribute('selected',n.value===String(value)));}});
const sandbox={window,document,console,matchMedia:()=>media,MutationObserver:window.MutationObserver,innerWidth:1280,innerHeight:900,scrollY:0,location:{hash:''},scrollTo:()=>{},setTimeout,clearTimeout};
const ctx=vm.createContext(sandbox);
for(const name of ['app.js','editorial-art.js'])vm.runInContext(fs.readFileSync(name,'utf8'),ctx,{filename:name});
const canonical=[...document.querySelectorAll('.project-copy > a')].map(n=>n.getAttribute('href'));
document.documentElement.dataset.mode='editorial';vm.runInContext(fs.readFileSync('editorial-magazine.js','utf8'),ctx,{filename:'editorial-magazine.js'});
const frame=(key,p)=>{target=key;progress=p;document.dispatchEvent(new window.CustomEvent('portfolio:editorial-frame'));};
assert.equal(document.querySelectorAll('.ed-feature').length,4);
assert.equal(document.documentElement.dataset.editorialReady,'true');
assert.ok(document.querySelector('[data-ed-profile-art="0"]').textContent.includes('AG'),'the introduction art represents the creator');
assert.equal(document.querySelector('[data-ed-tool-art="0"]').querySelectorAll('.ed-art').length,2,'toolkit has a distinct narrow composition');
const ids=[...document.querySelectorAll('[id]')].map(n=>n.id);assert.equal(new Set(ids).size,ids.length,'IDs are unique');
for(const a of document.querySelectorAll('a[href^="#ed-"]'))assert.ok(document.querySelector(a.getAttribute('href')),'facts anchor exists');
const opening=[];for(const p of [0,.2,.4,.6,.8,1,.4]){frame('home',p);const el=document.querySelector('.ed-opening');opening.push({p,phase:el.dataset.phase,fold:el.querySelector('.ed-cover').style.transform});assert.equal(+el.dataset.phase,Math.round(p*5));}
assert.deepEqual(opening[2],opening[6]);
const stages=[];for(const key of ['sharing','compiler','stadium','simulation'])for(const p of [0,.2,.4,.6,.8,1]){frame(key,p);const el=document.querySelector('.ed-feature--'+key);assert.equal(+el.dataset.phase,Math.round(p*5));assert.ok(el.querySelector('.ed-headline').textContent);stages.push({key,p,phase:el.dataset.phase});}
frame('compiler',1);assert.equal(document.querySelector('.ed-reading-app').getAttribute('aria-hidden'),'false');assert.equal(document.querySelector('.ed-reading-app').style.clipPath,'inset(0 0 0% 0)');
const math=[];for(const p of [.4,1,.4]){frame('simulation',p);const el=document.querySelector('.ed-feature--simulation'),svg=el.querySelector('.ed-wide');const hits=(svg.querySelector('.ed-samples-in').getAttribute('d').match(/M/g)||[]).length,misses=(svg.querySelector('.ed-samples-out').getAttribute('d').match(/M/g)||[]).length,n=hits+misses;assert.equal(n,+el.dataset.samples);assert.ok(Math.abs(4*hits/n-Number(el.dataset.estimate))<.000001);math.push({p,total:n,inside:hits,estimate:el.dataset.estimate,chart:svg.querySelector('.ed-sample-chart').getAttribute('d')});}
assert.deepEqual(math[0],math[2]);
const chapters=[];for(const p of [0,.2,.4,.6,.8,1]){frame('about',p);const el=document.querySelector('.ed-profile');assert.equal(+el.dataset.chapter,Math.round(p*5));assert.equal([...el.querySelectorAll('[data-ed-profile-art]')].filter(n=>!n.hidden).length,1);chapters.push({p,chapter:el.dataset.chapter,heading:el.querySelector('.ed-profile-copy h3').textContent});}
frame('skills',.4);const picker=document.querySelector('[data-ed-tool]');picker.value='3';picker.dispatchEvent(new window.Event('change'));assert.equal(document.querySelector('.ed-tool-copy h3').textContent,'AI');assert.equal([...document.querySelectorAll('[data-ed-tool-art]')].filter(n=>!n.hidden).length,1);
const flush=()=>new Promise(r=>setImmediate(r));
for(const mode of ['modern','editorial','sketch','editorial','spatial','editorial']){document.documentElement.dataset.mode=mode;await flush();await flush();frame('home',0);if(mode==='editorial'){assert.equal(document.querySelectorAll('.ed-feature').length,4);assert.equal(document.querySelector('.ed-opening').hidden,false);}else{assert.equal(document.querySelector('.ed-opening').hidden,true);assert.equal(document.documentElement.dataset.editorialUpdates,undefined);}}
const before=+document.documentElement.dataset.editorialUpdates;frame('home',0);assert.equal(+document.documentElement.dataset.editorialUpdates,before+1,'exactly one active frame listener');
frame('compiler',1);const desktopCaption=document.querySelector('.ed-feature--compiler .ed-story-caption').textContent;sandbox.innerWidth=390;frame('compiler',1);const narrowCaption=document.querySelector('.ed-feature--compiler .ed-story-caption').textContent;assert.notEqual(narrowCaption,desktopCaption,'same-progress resize updates the compact caption');assert.ok(narrowCaption.includes('illustrative'));sandbox.innerWidth=1280;frame('compiler',1);assert.equal(document.querySelector('.ed-feature--compiler .ed-story-caption').textContent,desktopCaption);
media.matches=true;for(const listener of mediaListeners)listener();assert.ok([...document.querySelectorAll('.ed-feature')].every(n=>n.dataset.phase==='5'));
assert.deepEqual([...document.querySelectorAll('.project-copy > a')].map(n=>n.getAttribute('href')),canonical);
assert.equal(document.querySelector('#resume-video').getAttribute('src'),null);
const result={kind:'DOM logic only; synthetic geometry, no CSS rendering',opening,stages,chapters,math:math.map(({chart,...rest})=>rest),modeCycles:6,duplicateFeatures:false,duplicateFrameListeners:false,reducedFinalStates:true,canonicalProjectLinks:canonical};
fs.mkdirSync('review-evidence/editorial',{recursive:true});fs.writeFileSync('review-evidence/editorial/dom-checks.json',JSON.stringify(result,null,2));console.log('Editorial DOM checks passed: opening/reverse, 24 project states, six profile chapters, computed plots, selectors, mode cleanup, and reduced-motion state logic.');
