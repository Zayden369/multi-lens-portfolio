// DOM event checks, not a rendered PDF/video inspection.
import {createRequire} from 'node:module';
import {resolve} from 'node:path';
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const require=createRequire(resolve('.reference-review/editorial-test/package.json')),{parseHTML}=require('linkedom');
const source=fs.readFileSync('multiverse.js','utf8'),block=source.slice(source.indexOf('const resumeDialog'),source.indexOf('const projectScenes'));
for(const publicRelease of [true,false]){
 const {window,document}=parseHTML(fs.readFileSync('index.html','utf8')),root=document.documentElement;
 if(publicRelease)root.dataset.resumeCinematic='disabled';
 const dialog=document.querySelector('#resume-dialog'),video=document.querySelector('#resume-video');
 // LinkeDOM's generic media element lacks the browser's reflected src property.
 Object.defineProperty(video,'src',{get(){return this.getAttribute('src')??'';},set(v){this.setAttribute('src',v);}});
 dialog.showModal=()=>{dialog.open=true;};dialog.close=()=>{dialog.open=false;dialog.dispatchEvent(new window.Event('close'));};
 let plays=0;video.pause=()=>{};video.load=()=>{};video.play=()=>{plays++;return Promise.resolve();};
 window.HTMLElement.prototype.focus=function(){};
 vm.runInNewContext(block,{document,root,motion:{matches:false,addEventListener(){}},console});
 document.querySelector('#resume-open').dispatchEvent(new window.Event('click'));
 assert.equal(dialog.open,true);
 if(publicRelease){assert.equal(plays,0);assert.equal(video.getAttribute('src'),null);assert.equal(document.querySelector('#resume-view').hidden,false);assert.equal(document.querySelector('#resume-page').getAttribute('src'),'assets/resume-page-1.png');}
 else{assert.equal(plays,1);assert.equal(video.getAttribute('src'),'assets/resume-cinematic.mp4');assert.equal(document.querySelector('#resume-view').hidden,true);video.dispatchEvent(new window.Event('ended'));assert.equal(document.querySelector('#resume-view').hidden,false);}
 dialog.close();assert.equal(video.getAttribute('src'),null);
 for(const a of document.querySelectorAll('#resume-view a'))assert.ok(a.getAttribute('href').includes('abhishek-resume.pdf'));
}
console.log('Resume release checks passed: public mode opens the document without loading video; private mode retains supplied-video playback and completion.');
