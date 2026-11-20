/* Original simulated-build choreography around the authoritative semantic page. */
(() => {
 'use strict';
 const root=document.documentElement, $=(s,p=document)=>p.querySelector(s), all=(s,p=document)=>[...p.querySelectorAll(s)];
 const {clamp,ease,range,TaskGraph,trajectory}=window.SwarmCore;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),coarse=matchMedia('(pointer: coarse)');
 const roles=[['Layout','#75b8ef'],['Type','#e8b66b'],['Interface','#85c9ac'],['Visual','#bd9ced'],['Motion','#e98f8c'],['Content','#85c9ac'],['QA','#d9dde0'],['Orchestrator','#75b8ef']];
 const owned=[],targets=[],groups=[],agents=[];let graph,layer,panel,status,progress,skip,replay,effects,marker;
 let active=false,built=false,frame=0,lastTime=0,clock=0,state='inactive',groupIndex=0,holdUntil=0,camera=null;
 let introStart=0,dirty=true,effectsOn=true,resumeState=null,reactive=null,events=null,serial=0;
 const pointer={x:0,y:0,seen:false},touch={x:0,y:0};
 function own(parent,cls,html){const el=document.createElement('div');el.className=cls;el.hidden=true;el.innerHTML=html;parent.append(el);owned.push(el);return el;}
 function setState(next,label){state=next;root.dataset.swarmState=next;if(status&&label)status.textContent=label;}
 function addTarget(el,action='surface'){
  if(!el)return null;
  const found=targets.find(t=>t.el===el);if(found){if(action!=='frame')found.action=action;return found;}
  const target={el,id:++serial,action,originalClip:el.style.clipPath,originalOpacity:el.style.opacity,rect:null,letters:null};
  el.classList.add('sw-target');targets.push(target);return target;
 }
 function addGroup(name,anchor,specs){
  const id=groups.length, tasks=[];let frameId=`g${id}:frame`;
  const base=addTarget(anchor,'frame');
  tasks.push({id:frameId,group:id,role:0,target:base,action:'frame',duration:480,dependencies:[]});
  let prior=frameId;
  for(const [selector,action,role,dependency]of specs){
   const elements=typeof selector==='string'?all(selector,anchor):[selector].filter(Boolean);
   for(const el of elements){
    const target=addTarget(el,action);if(!target)continue;
    const taskId=`g${id}:t${tasks.length}`;
    tasks.push({id:taskId,group:id,role,target,action,duration:action==='type'?Math.min(1050,480+el.textContent.length*2.6):action==='draw'?840:640,dependencies:[dependency==='previous'?prior:frameId]});
    prior=taskId;
   }
  }
  tasks.push({id:`g${id}:qa`,group:id,role:6,target:base,action:'qa',duration:490,dependencies:tasks.map(t=>t.id)});
  groups.push({id,name,anchor,tasks});
 }
 function build(){
  if(built)return;built=true;
  const hero=own($('.hero-grid'),'sw-hero-art',window.SwarmArt.hero());
  const arts={sharing:'sharing',compiler:'compiler',stadium:'stadium',simulation:'probability'};
  for(const [key,method]of Object.entries(arts)){const art=own($('.project-visual.'+key),'sw-project-art sw-project-art--'+key,window.SwarmArt[method]());art.id='swarm-'+key;art.style.scrollMarginTop='80px';}
  const index=own($('#work'),'sw-index',`<span>BUILD MANIFEST / FOUR PROJECTS</span><nav aria-label="Swarm project exhibits">${Object.keys(arts).map((key,i)=>`<a href="#swarm-${key}"><small>0${i+1}</small>${['TrustShare','AI Compiler','StadiumPulse','Monte Carlo'][i]}<b aria-hidden="true">↗</b></a>`).join('')}</nav>`);$('#projects').before(index);
  panel=own(document.body,'sw-panel',`<div class="sw-panel-top"><span class="sw-indicator"></span><span>SIMULATED AGENT BUILD</span><span class="sw-count"></span></div><div class="sw-panel-line"><strong class="sw-status" role="status" aria-live="polite"></strong><progress max="1" value="0" aria-label="Swarm construction progress"></progress></div><div class="sw-panel-controls"><button data-sw-skip>Skip build</button><button data-sw-replay>Replay build</button><button data-sw-effects aria-pressed="true">Effects on</button></div>`);
  status=$('.sw-status',panel);progress=$('progress',panel);skip=$('[data-sw-skip]',panel);replay=$('[data-sw-replay]',panel);effects=$('[data-sw-effects]',panel);
  layer=own(document.body,'sw-layer','<div class="sw-orchestrator"><span class="sw-orchestrator-mark">＋</span><span>INITIALIZING BUILD</span></div>');layer.setAttribute('aria-hidden','true');layer.inert=true;marker=$('.sw-orchestrator',layer);
  for(let i=0;i<16;i++){
   const [role,color]=roles[i%8],node=document.createElement('div');node.className='sw-agent';node.style.setProperty('--agent-color',color);node.innerHTML=`<svg viewBox="0 0 24 28" aria-hidden="true"><path d="M3 2L7 24 12 17 21 15Z" fill="${color}" stroke="#101417" stroke-width="1.6"/><path d="M7 8L9 17 12 13" fill="none" stroke="#ffffff8c" stroke-width="1"/></svg><span>${role}${i>7?' / 02':''}</span>`;layer.append(node);
   const guide=document.createElement('div');guide.className='sw-guide';guide.style.setProperty('--agent-color',color);guide.innerHTML='<i></i><i></i><i></i><i></i><span></span>';layer.append(guide);
   const caret=document.createElement('div');caret.className='sw-caret';caret.style.background=color;layer.append(caret);
   agents.push({node,guide,caret,role:i%8,index:i,x:0,y:0,vx:0,vy:0,task:null,from:null});
  }
  addGroup('Hero / structure & identity',$('#home'),[
   [$('body > header .signature'),'surface',2],[$('body > header nav'),'surface',2],[$('#world-name'),'type',5],[$('#home h1'),'type',1],[$('#home .intro'),'type',5],[$('#home .text-link'),'surface',2]
  ]);
  addGroup('Hero / the collaborative workspace',hero,[[hero,'draw',3],[hero.querySelector('[data-sw-part="cards"]'),'surface',2,'previous'],[hero.querySelector('[data-sw-part="connections"]'),'draw',4,'previous']]);
  addGroup('Selected work / catalogue',$('#work'),[[':scope > .section-top','surface',0],[':scope > h2','type',1],[':scope > .section-intro','type',5],[index,'surface',2,'previous']]);
  all('.project').forEach((project,i)=>{
   const copy=$('.project-copy',project),visual=$('.sw-project-art',project),name=$('h3',copy).textContent;
   addGroup(name+' / the project',copy,[[':scope > .project-index','surface',5],[':scope > h3','type',1],[':scope > h4','type',1],[':scope > p:not(.chapter):not(.project-stack)','type',5],[':scope > details','surface',2],[':scope > .project-stack','surface',5],[':scope > a','surface',2]]);
   const parts=i===1?[['[data-sw-piece="requirement"]','type',1],['[data-sw-piece="schema"]','surface',5,'previous'],['[data-sw-piece="application"]','draw',2,'previous']]:all('[data-sw-part]',visual).map((el,j)=>[el,j===0?'surface':'draw',j%2?3:2,'previous']);
   addGroup(name+' / '+['controlled sharing','application assembly','venue & routes','computed evidence'][i],visual,[[visual,'draw',3],...parts]);
  });
  addGroup('Open source / shared engineering',$('#opensource'),[[':scope > .section-top','surface',0],[':scope > h2','type',1],[':scope > .two-col > div:first-child','type',5],['.contribution-list > article','surface',2],[':scope > .stats','surface',2,'previous']]);
  addGroup('About / the person behind the code',$('#about .two-col > div:first-child'),[[':scope > *','type',5]]);
  addGroup('Experience / milestones',$('#about .timeline'),[[':scope > article','surface',2]]);
  addGroup('Recognition / verified distinctions',$('#about .achievements'),[[':scope > h3','type',1],[':scope > ul','surface',2]]);
  addGroup('Skills / tools for making',$('#skills'),[[':scope > .chapter','surface',5],[':scope > h2','type',1],[':scope > .skill-grid > article','surface',2]]);
  addGroup('Contact / your next idea',$('#contact'),[[':scope > .chapter','surface',0],[':scope > h2','type',1],[':scope > p:not(.chapter)','type',5],[':scope > .contact-email','surface',2],[':scope > .resume-actions','surface',2],[':scope > .socials','surface',2,'previous']]);
  graph=new TaskGraph(groups.flatMap(g=>g.tasks));graph.tasks.forEach(task=>task.baseDuration=task.duration);
  skip.addEventListener('click',()=>finish('user-interrupted','Build skipped / explore freely'));
  replay.addEventListener('click',()=>{if(!reduced.matches){effectsOn=true;effects.setAttribute('aria-pressed','true');effects.textContent='Effects on';start(true);}});
  effects.addEventListener('click',()=>{effectsOn=!effectsOn;effects.setAttribute('aria-pressed',String(effectsOn));effects.textContent=effectsOn?'Effects on':'Effects off';if(!effectsOn)finish('user-interrupted','Effects paused / full portfolio available');else{layer.hidden=false;wake();}});
 }
 function agentCount(){return innerWidth<=600||coarse.matches?6:innerWidth<1000?12:16;}
 function measureText(target){
  if(target.action!=='type')return;
  const el=target.el,rect=el.getBoundingClientRect(),points=[];
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
  while((node=walker.nextNode())){for(let i=0;i<node.textContent.length;i++){
   if(points.length>700)break;
   const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);const r=range.getBoundingClientRect();
   if(r.height>0)points.push({x:r.right-rect.left,y:r.top-rect.top,h:r.height});
  }}
  target.letters=points;
 }
 function measure(){
  const y=scrollY;
  for(const target of targets){const rect=target.el.getBoundingClientRect();target.rect={x:rect.left,y:rect.top+y,w:rect.width,h:rect.height};measureText(target);}
  dirty=false;
 }
 function hideTarget(target){if(target.action==='frame')return;target.el.dataset.swBuild='waiting';target.el.style.clipPath='inset(0 100% 0 0)';}
 function reveal(target){delete target.el.dataset.swBuild;target.el.style.clipPath=target.originalClip;target.el.style.opacity=target.originalOpacity;}
 function clearAgent(agent){agent.task=null;agent.from=null;agent.guide.hidden=true;agent.caret.hidden=true;agent.node.classList.remove('is-working');}
 function finish(next='flocking',message='Build complete / awaiting your next interaction'){
  if(panel&&next==='flocking')panel.dataset.durationSeconds=(clock/1000).toFixed(2);
  camera=null;holdUntil=0;reactive=null;graph?.finish();targets.forEach(reveal);agents.forEach(clearAgent);marker.hidden=true;
  setState(next,message);progress.value=1;skip.hidden=true;replay.hidden=false;root.dataset.swarmBuilding='false';
  if(!active||reduced.matches||!effectsOn){stopFrame();layer.hidden=true;}else wake();
 }
 function start(replaying=false){
  stopFrame();clock=0;lastTime=0;groupIndex=0;camera=null;holdUntil=0;reactive=null;graph.reset();
  graph.tasks.forEach(task=>task.duration=task.baseDuration*(coarse.matches||innerWidth<700?.7:.88));
  dirty=true;measure();targets.forEach(hideTarget);agents.forEach(clearAgent);
  root.dataset.swarmBuilding='true';skip.hidden=false;replay.hidden=true;progress.value=0;
  setState(replaying?'replaying':'initializing','Initializing build / assigning roles');introStart=0;marker.hidden=false;
  layer.hidden=false;
  if(replaying)scrollTo({top:0,behavior:'instant'});
  const n=agentCount();agents.forEach((agent,i)=>{agent.x=innerWidth*.5+(i%2?1:-1)*(80+i*8);agent.y=innerHeight*.45+Math.sin(i)*60;agent.vx=agent.vy=0;agent.node.hidden=i>=n;});
  $('.sw-count',panel).textContent=n+' AGENTS';wake();
 }
 function wake(){if(active&&!frame&&!document.hidden&&!dialogsOpen()&&!reduced.matches&&effectsOn)frame=requestAnimationFrame(tick);}
 function stopFrame(){if(frame)cancelAnimationFrame(frame);frame=0;lastTime=0;}
 function dialogsOpen(){return !!document.querySelector('#lens-dialog[open],#resume-dialog[open]');}
 function destination(group){
  const rect=group.anchor.getBoundingClientRect();return clampScroll(scrollY+rect.top-(innerWidth<700?70:92));
 }
 function clampScroll(y){return Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,y));}
 function enterGroup(index){
  groupIndex=index;
  if(index>=groups.length){finish();return;}
  const group=groups[index];setState(index===0?'assembling-hero':'auto-building',group.name);
  const target=destination(group);camera={from:scrollY,to:target,start:clock,duration:Math.min(900,350+Math.abs(scrollY-target)*.13)};
 }
 function prepareTask(task,agent){
  agent.task=task;agent.from={x:agent.x,y:agent.y+scrollY};agent.node.classList.add('is-working');
  $('span',agent.node).textContent=roles[task.role][0];
  if(task.action!=='frame'&&task.action!=='qa')task.target.el.dataset.swBuild='building';
 }
 function eligibleAgent(task){const n=agentCount();return agents.slice(0,n).find(a=>!a.task&&a.role===task.role)||agents.slice(0,n).find(a=>!a.task);}
 function assign(){for(const task of graph.ready(groupIndex)){if(graph.tasks.filter(t=>t.state==='running').length>=Math.min(5,agentCount()-1))break;const agent=eligibleAgent(task);if(!agent)break;if(graph.start(task,clock,agent))prepareTask(task,agent);}}
 function guide(agent,rect,p,qa=false){
  const g=agent.guide;g.hidden=false;g.style.transform=`translate3d(${rect.x}px,${rect.y-scrollY}px,0)`;g.style.width=Math.max(1,rect.w*(qa?1:p))+'px';g.style.height=Math.max(1,rect.h*(qa?1:p))+'px';
  g.classList.toggle('is-qa',qa);$('span',g).textContent=qa?'CHECKED':Math.round(rect.w*p)+' × '+Math.round(rect.h*p);
 }
 function renderTask(task,p){
  const agent=task.agent,source=task.target.rect;if(!agent||!source)return;
  const r=(task.action==='frame'||task.action==='qa')?{...source,h:Math.min(source.h,innerHeight*.67)}:source;
  const start={x:r.x+3,y:r.y+3};let point=trajectory(agent.from,start,range(p,0,.22),Math.min(35,Math.hypot(agent.from.x-start.x,agent.from.y-start.y)*.04));
  const action=range(p,.22,.94),target=task.target;
  if(p>=.22){
   if(task.action==='type'){
    const letters=target.letters||[],index=Math.min(letters.length-1,Math.floor(action*letters.length)),letter=letters[Math.max(0,index)];
    if(letter){const x=Math.min(r.w,letter.x+2),top=Math.max(0,letter.y),bottom=Math.min(r.h,top+letter.h+2);target.el.style.clipPath=`polygon(0 0,100% 0,100% ${top}px,${x}px ${top}px,${x}px ${bottom}px,0 ${bottom}px)`;point={x:r.x+x,y:r.y+top+letter.h*.7};agent.caret.hidden=false;agent.caret.style.transform=`translate3d(${point.x}px,${r.y-scrollY+top}px,0)`;agent.caret.style.height=letter.h+'px';}
    else{target.el.style.clipPath=`inset(0 ${(1-action)*100}% 0 0)`;point={x:r.x+r.w*action,y:r.y+r.h*.5};}
   }else if(task.action==='qa'){
    const edge=action*4;const corners=[{x:r.x,y:r.y},{x:r.x+r.w,y:r.y},{x:r.x+r.w,y:r.y+r.h},{x:r.x,y:r.y+r.h},{x:r.x,y:r.y}];point=trajectory(corners[Math.min(3,Math.floor(edge))],corners[Math.min(4,Math.floor(edge)+1)],edge%1);guide(agent,r,1,true);
   }else{
    point={x:r.x+r.w*action,y:r.y+r.h*action};guide(agent,r,action);
    if(task.action!=='frame'){target.el.style.clipPath=task.action==='draw'?`inset(0 0 ${(1-action)*100}% 0)`:`inset(0 ${(1-action)*100}% 0 0)`;}
   }
  }
  agent.x=point.x;agent.y=point.y-scrollY;
 }
 function settledAgent(agent,dt,time){
  const n=agentCount(),mobile=coarse.matches||innerWidth<=600;
  let center=mobile?{x:innerWidth-42,y:innerHeight-155}:pointer.seen?pointer:{x:innerWidth*.5,y:innerHeight*.55};
  if(reactive){center={x:reactive.rect.x+reactive.rect.w*.5,y:reactive.rect.y-scrollY+Math.min(reactive.rect.h*.5,innerHeight*.45)};}
  const radius=mobile?24+Math.floor(agent.index/3)*14:75+Math.floor(agent.index/8)*26;
  const angle=agent.index/n*Math.PI*2+time*(mobile?.12:.18);let tx=Math.max(18,Math.min(innerWidth-40,center.x+Math.cos(angle)*radius)),ty=Math.max(16,Math.min(innerHeight-80,center.y+Math.sin(angle)*radius*.65));
  if(pointer.block&&!mobile&&!reactive){const b=pointer.block;if(tx>b.left-22&&tx<b.right+22&&ty>b.top-30&&ty<b.bottom+26)ty=Math.max(20,b.top-40-agent.index%3*12);}
  let ax=(tx-agent.x)*19,ay=(ty-agent.y)*19;
  for(const other of agents.slice(0,n)){if(other===agent)continue;const dx=agent.x-other.x,dy=agent.y-other.y,d=Math.hypot(dx,dy);if(d>0&&d<23){ax+=dx/d*(23-d)*20;ay+=dy/d*(23-d)*20;}}
  agent.vx=(agent.vx+ax*dt)*Math.exp(-8*dt);agent.vy=(agent.vy+ay*dt)*Math.exp(-8*dt);agent.x+=agent.vx*dt;agent.y+=agent.vy*dt;
 }
 function idleAtFrontier(agent,dt){
  const r=groups[groupIndex]?.tasks[0].target.rect;if(!r)return;
  const tx=Math.max(20,Math.min(innerWidth-35,r.x+r.w-28-(agent.index%4)*23)),ty=Math.max(35,Math.min(innerHeight-130,r.y-scrollY+25+Math.floor(agent.index/4)*22));
  const t=1-Math.exp(-dt*7);agent.x+=(tx-agent.x)*t;agent.y+=(ty-agent.y)*t;
 }
 function tick(timestamp){
  try{step(timestamp);}catch(error){
   console.error('Swarm presentation stopped; the complete portfolio remains available.',error);
   finish('user-interrupted','Build presentation paused / portfolio ready');effectsOn=false;effects.setAttribute('aria-pressed','false');effects.textContent='Effects off';stopFrame();layer.hidden=true;
  }
 }
 function step(timestamp){
  frame=0;if(!active||document.hidden||dialogsOpen()||reduced.matches||!effectsOn)return;
  const dt=Math.min(.04,lastTime?(timestamp-lastTime)/1000:1/60);lastTime=timestamp;clock+=dt*1000;
  if(dirty)measure();
  if(state==='initializing'||state==='replaying'){
   const p=clamp((clock-introStart)/900),n=agentCount();
   agents.slice(0,n).forEach((a,i)=>{const angle=i/n*Math.PI*2+ease(p)*.7;const target={x:innerWidth*.5+Math.cos(angle)*72,y:innerHeight*.43+Math.sin(angle)*47};a.x+=(target.x-a.x)*.1;a.y+=(target.y-a.y)*.1;a.node.style.opacity=String(range(p,i*.025,.4+i*.025));});
   if(p===1){marker.hidden=true;enterGroup(0);}
  }else if(state==='assembling-hero'||state==='auto-building'){
   if(camera){const p=clamp((clock-camera.start)/camera.duration);scrollTo({top:camera.from+(camera.to-camera.from)*ease(p),behavior:'instant'});if(p===1)camera=null;}
   else{assign();graph.update(clock,renderTask,task=>{if(task.action!=='frame'&&task.action!=='qa')reveal(task.target);clearAgent(task.agent);});
    progress.value=graph.tasks.filter(t=>t.state==='done').length/graph.tasks.length;
    if(graph.completeGroup(groupIndex)){if(!holdUntil)holdUntil=clock+320;else if(clock>=holdUntil){holdUntil=0;enterGroup(groupIndex+1);}}
   }
   agents.slice(0,agentCount()).forEach(a=>{if(!a.task)idleAtFrontier(a,dt);});
  }else{
   if(reactive){const p=range(clock,reactive.start,reactive.end);for(const [i,a]of agents.slice(0,3).entries()){guide(a,reactive.rect,Math.min(1,p*2),i===2);a.x=reactive.rect.x+reactive.rect.w*Math.min(1,p*2);a.y=reactive.rect.y-scrollY+reactive.rect.h*(i/3);const svg=reactive.el.querySelector('.sw-route');if(svg){svg.style.strokeDasharray='1';svg.style.strokeDashoffset=String(1-p);}}
    if(p===1){all('.sw-route',reactive.el).forEach(n=>{n.style.removeProperty('stroke-dasharray');n.style.removeProperty('stroke-dashoffset');});agents.forEach(clearAgent);reactive=null;setState('flocking','Awaiting your next interaction');}
   }
   agents.slice(0,agentCount()).forEach((a,i)=>{if(!reactive||i>=3)settledAgent(a,dt,clock/1000);});
  }
  const mobile=coarse.matches||innerWidth<=600;
  agents.forEach((a,i)=>{a.node.hidden=i>=agentCount();a.node.classList.toggle('sw-agent-labelled',!mobile&&!!a.task);a.node.style.transform=`translate3d(${a.x.toFixed(2)}px,${a.y.toFixed(2)}px,0)`;a.node.style.opacity=(state==='initializing'||state==='replaying')?a.node.style.opacity:'1';});
  wake();
 }
 function interrupt(message='You’re in control / explore freely'){
  if(['initializing','replaying','assembling-hero','auto-building'].includes(state))finish('user-interrupted',message);
 }
 function react(el){
  if(!el||reduced.matches||!effectsOn)return;
  const r=el.getBoundingClientRect();reactive={el,rect:{x:r.left,y:r.top+scrollY,w:r.width,h:Math.min(r.height,innerHeight*.7)},start:clock,end:clock+1400};setState('rebuilding-local','Inspecting destination / all links stay live');wake();
 }
 function onClick(event){
  if(panel.contains(event.target))return;
  const target=event.target.closest('a,button,input,select,summary');if(!target)return;
  interrupt();
  const link=target.closest('a[href]');
  if(link){const href=link.getAttribute('href');if(href?.startsWith('#')&&href!=='#resume'){
   const destination=document.getElementById(href.slice(1));if(destination)react(destination.closest('.project')||destination);
  }}
 }
 function handleWheel(event){if(event.deltaY||event.deltaX)interrupt();}
 function handleKey(event){if(event.altKey||event.ctrlKey||event.metaKey)return;if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' ','Tab'].includes(event.key))interrupt('Keyboard control / portfolio ready');}
 function onDialogs(){
  if(dialogsOpen()){interrupt('Interaction paused / portfolio ready');resumeState=state;stopFrame();layer.hidden=true;}
  else if(active){layer.hidden=reduced.matches||!effectsOn;lastTime=0;if(resumeState){setState('flocking','Awaiting your next interaction');resumeState=null;}wake();}
 }
 function listen(){
  events=new AbortController();const signal=events.signal;
  window.addEventListener('wheel',handleWheel,{passive:true,signal});
  window.addEventListener('keydown',handleKey,{signal});
  window.addEventListener('pointermove',event=>{pointer.x=event.clientX;pointer.y=event.clientY;pointer.seen=true;const control=event.target.closest?.('a,button,input,select,summary');pointer.block=control?control.getBoundingClientRect():null;},{passive:true,signal});
  window.addEventListener('pointerdown',event=>{if(panel.contains(event.target))return;touch.x=event.clientX;touch.y=event.clientY;interrupt();},{passive:true,signal});
  window.addEventListener('touchmove',()=>interrupt(),{passive:true,signal});
  document.addEventListener('click',onClick,{capture:true,signal});
  window.addEventListener('hashchange',()=>{interrupt('Navigation ready / follow your own path');const el=document.getElementById(location.hash.slice(1));if(el&&location.hash!=='#resume')react(el);},{signal});
  window.addEventListener('popstate',()=>interrupt(),{signal});
  window.addEventListener('resize',()=>{dirty=true;interrupt('Layout adapted / explore freely');wake();},{signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopFrame();else{lastTime=0;wake();}},{signal});
  document.fonts?.addEventListener('loadingdone',()=>{dirty=true;},{signal});
 }
 function sync(){
  const enabled=root.dataset.mode==='swarm';if(enabled===active)return;
  active=enabled;
  if(enabled){
   build();root.dataset.swarmReady='true';owned.forEach(el=>{el.hidden=false;});listen();
   pointer.block=null;dirty=true;measure();
   if(reduced.matches||location.hash){$('.sw-count',panel).textContent=agentCount()+' AGENTS';finish('flocking',reduced.matches?'Reduced motion / complete portfolio':'Opened at your destination / portfolio ready');}
   else start();onDialogs();
  }else{
   stopFrame();events?.abort();events=null;camera=null;reactive=null;resumeState=null;targets.forEach(reveal);agents.forEach(clearAgent);owned.forEach(el=>el.hidden=true);delete root.dataset.swarmReady;delete root.dataset.swarmBuilding;setState('inactive');delete root.dataset.swarmState;
  }
 }
 const dialogObserver=new MutationObserver(()=>{if(active)onDialogs();});
 $('#lens-grid').addEventListener('pointerdown',event=>{pointer.x=event.clientX;pointer.y=event.clientY;pointer.seen=true;},{passive:true});
 for(const el of all('#lens-dialog,#resume-dialog'))dialogObserver.observe(el,{attributes:true,attributeFilter:['open']});
 new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-mode']});
 reduced.addEventListener('change',()=>{if(!active)return;if(reduced.matches)finish('flocking','Reduced motion / complete portfolio');else{layer.hidden=!effectsOn;wake();}});
 window.addEventListener('pagehide',()=>{if(active){interrupt();stopFrame();}});
 window.addEventListener('pageshow',()=>{if(active)wake();});
 sync();
})();
