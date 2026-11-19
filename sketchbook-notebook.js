/* Sketchbook owns its drawing timelines; shared navigation/media stay untouched. */
(() => {
  const root=document.documentElement, reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const $=(s,p=document)=>p.querySelector(s), all=(s,p=document)=>[...p.querySelectorAll(s)];
  const clamp=x=>Math.max(0,Math.min(1,x)), ramp=(p,a,b)=>clamp((p-a)/(b-a));
  const smooth=x=>x*x*(3-2*x);
  const owned=[], entries=[], prepared=new WeakMap();
  let active=false,built=false,hero,career,network,toolkit,award,ending,manual=null,manualAt=0,selectedTool=0,selectedContribution=0,hashTimer=0,updates=0;
  const milestones=[
    ['Education','2024–2028','B.Tech · Computer Science','Dev Bhoomi Uttarakhand University. A software-engineering foundation through coursework and hands-on projects.'],
    ['Infosys','June–August 2026','Infosys Springboard','Software Development Intern. Built TrustShare with a team: interfaces, AI summaries, testing, integration, and deployment.'],
    ['Maincraft','June–August 2026','Maincraft Technologies','Data Science Intern. Python analysis projects and a Titanic survival prediction pipeline using logistic regression.'],
    ['Meshery','Since September 2026','Layer5 / Meshery','Contributions across test reporting, documentation, publishing workflows, SEO, and validation.'],
    ['Recognition','Verified milestones','Learning, made tangible.','Top 5 internship performer. ML competition Rank 525 among 80,000+ participants. Institute-level internal SIH selection.']
  ];
  const tools=[
    ['Frontend','React · Next.js · TypeScript · JavaScript · HTML · CSS','Interfaces and reusable application components.'],
    ['Backend','Python · FastAPI · Node.js','Application services, API boundaries, integration, and tests.'],
    ['Databases','PostgreSQL · SQLAlchemy · Prisma','Relational storage, models, and application data access.'],
    ['AI','OpenAI · Vercel AI SDK · Zod · AJV','Structured generation, cross-layer validation, targeted repair, and fallback behavior.'],
    ['Cloud & DevOps','Docker · AWS · GitHub Actions','Containers, cloud tooling, and continuous integration.'],
    ['Testing & Quality','Vitest · Supertest · Frontend and backend tests','Tested APIs, validated inputs, and inspected end-to-end reporting.']
  ];
  const contributions=[
    ['Testing','A dedicated mesheryctl BATS report filters by project and framework, separates end-to-end results from Go unit tests, and preserves the existing combined report.'],
    ['Documentation','Agent quickstart documentation, repository-template cleanup, and publishing workflow documentation help the next contributor begin.'],
    ['Quality','SEO metadata and social-preview image fixes address the immediate issue; validation helps catch recurring image problems.']
  ];
  const specs=[
    ['sharing','SECURE SHARING BLUEPRINT',
      ['A file begins with a sender.','Identity before access.','Connect the sharing system.','Conditions belong to the link.','An authorized transfer.','The complete sharing blueprint.'],
      ['A React interface gives the sender a place to share a document.','Authentication guards access to the application.','FastAPI and PostgreSQL support the application and its stored records. This is a conceptual access flow.','Protected links can use passwords, expiry, view limits, and revocation.','The document follows the permitted path to its recipient.','A sender, a controlled application boundary, and a recipient: the purpose behind the lines.'],
      'Conceptual access flow · Verified project features'],
    ['compiler','THE INVENTION THAT DESIGNS ITSELF',
      ['Build a dashboard that tracks reading progress.','Read the intent behind the idea.','Give the application a structure.','Validate before rendering.','The sketch becomes an interface.','A working idea. A readable application.'],
      ['Begin with a reading-progress requirement and a rough interface study.','Identify the reading view, books, and progress data required by the prompt.','UI schema, data models, and API configuration describe a reusable React application.','Illustrative repair: progress must be numeric. Cross-layer validation checks the configuration.','Navigation, book cards, chart, and reading notes align with the original wireframe.','Reading room is illustrative output, not an authenticated product screenshot or live generation.'],
      'Illustrative application · No live generation'],
    ['stadium','THE ARCHITECT’S STADIUM',
      ['Begin with the footprint.','A venue takes shape.','Find a way through.','Make the assistance zone visible.','Plan an accessible route.','A complete match-day concept.'],
      ['A structural outline defines the venue drawing.','Segmented stands, seating rows, entrances, field markings, and a stand section make the stadium recognizable.','A route connects an entrance to the concourse.','A restrained red zone identifies the area discussed in this illustrative assistance scenario.','The accessible route concept connects the venue’s circulation and assistance story.','Role-aware assistance covers fans, volunteers, and staff. This is not a surveyed plan or live venue data.'],
      'Illustrative plan and routes · Not to scale'],
    ['simulation','THE MATHEMATICIAN’S NOTEBOOK',
      ['Can chance tell us something precise?','Draw the experiment.','Sample the square.','Count what falls inside.','Watch the estimate evolve.','A result from every plotted point.'],
      ['Estimate pi from the relative area of a quarter circle inside a unit square.','Draw axes, the square, and the quarter-circle boundary.','A deterministic sequence supplies real computed sample coordinates.','Inside points satisfy x² + y² ≤ 1. Their proportion supplies the estimate.','The chart uses estimates from the same growing set of samples.','The displayed result is 4 × inside / total. Reverse scrolling restores the earlier sample state.'],
      'Computed samples · Seeded and reproducible']
  ];
  function add(parent,cls,content,before){const el=document.createElement('div');el.className=cls;el.hidden=true;el.innerHTML=content;if(before)before.before(el);else parent.append(el);owned.push(el);return el;}
  function controls(items,attr){return `<div class="sk-controls">${items.map((a,i)=>`<button ${attr}="${i}" aria-pressed="${i===0}">${a[0]}</button>`).join('')}</div>`;}
  function frame(label,art){return `<div class="sk-sheet"><span class="sk-sheet-label">${label}</span>${art}</div>`;}
  function build(){
    if(built)return;built=true;const art=window.SketchbookIllustrations;
    hero=add($('.hero-grid'),'sk-opening',`${art.opening()}<div class="sk-intro"><span class="sk-kicker">ABHISHEK’S / INVENTOR’S NOTEBOOK</span><h2>Everything starts with an idea.</h2><p class="sk-opening-copy"></p><p class="sk-manifesto" hidden>IDEAS ARE A START.<br>I MAKE THEM WORK.</p></div><div class="sk-hero-foot"><a href="#work">Explore the creations</a><span class="sk-hero-caption">Scroll to draw the first line.</span><progress max="1" value="0" aria-label="Opening drawing progress"></progress></div>`);
    const board=document.createElement('div');board.className='sk-opening-board';while(hero.firstChild)board.append(hero.firstChild);hero.append(board);
    specs.forEach(([key,label,captions,descriptions,note])=>{
      const parent=$('.project-visual.'+key),project=parent.closest('.project');
      const el=add(parent,'sk-world',`<div class="sk-world-heading"><span class="sk-kicker">${label}</span><h4></h4></div>${frame('DRAFT → BLUEPRINT → WORKING IDEA',art[key]())}<p class="sk-caption"></p><div class="sk-world-footer"><small>${note}</small><output aria-live="off"></output></div>`);
      const transcript=document.createElement('details');transcript.className='sk-transcript';transcript.hidden=true;transcript.innerHTML='<summary>Read the drawing sequence</summary><ol>'+captions.map((c,i)=>`<li><b>${c}</b> ${descriptions[i]}</li>`).join('')+'</ol>';$('.project-copy',project).append(transcript);owned.push(transcript);
      entries.push({key,el,parent,project,captions,descriptions,originalLabel:parent.getAttribute('aria-label'),phase:-1,p:-1});
    });
    const compiler=entries[1];$('.sk-sheet',compiler.el).insertAdjacentHTML('beforeend',`<div class="sk-final-app" role="img" aria-label="Illustrative reading dashboard with books, progress chart, and notes"><div class="sk-app-nav"><b>Reading room.</b><span>Overview</span><span>My library</span><span>Reading notes</span></div><div class="sk-app-content"><small>ILLUSTRATIVE APPLICATION</small><h5>Your next chapter.</h5><p>A little further, every day.</p><div class="sk-books">${['Designing systems','Thinking in code','Creative practice'].map((s,i)=>`<div><i></i><b>${s}</b><progress max="100" value="${[72,45,84][i]}" aria-label="Illustrative reading progress: ${s}"></progress></div>`).join('')}</div><div class="sk-app-lower"><div><b>Reading this week</b><svg viewBox="0 0 240 66" aria-hidden="true"><path d="M5 55H235M5 32H235" stroke="#d5dfda" fill="none"/><path d="M5 53L45 38 85 42 125 20 165 26 205 8 235 12" stroke="#3f6657" stroke-width="3" fill="none"/></svg></div><div><b>Reading notes</b><p>Systems grow from clear boundaries.</p><span>Continue a thought.</span></div></div></div></div>`);
    network=add($('#opensource'),'sk-collaboration',`<div class="sk-support-frame">${frame('ISSUE → ENGINEERING → CONTRIBUTION',contributions.map((_,i)=>`<div class="sk-contribution-art" data-board="${i}" ${i?'hidden':''}>${art.collaboration(i)}</div>`).join(''))}${controls(contributions,'data-sk-contribution')}<p class="sk-selection-copy"></p></div>`,$('#opensource .two-col'));
    career=add($('#about'),'sk-career',`<div class="sk-career-frame"><div class="sk-career-heading"><span class="sk-kicker">THE STORY OF THE INVENTOR</span><h2>A line of curiosity.</h2></div><div class="sk-career-body">${frame('FOLLOW THE PENCIL',art.timeline())}<div class="sk-career-copy"><small></small><h3></h3><p></p></div></div>${controls(milestones,'data-sk-milestone')}<progress max="1" value="0" aria-label="Experience drawing progress"></progress></div>`,$('#about .two-col'));
    toolkit=add($('#skills'),'sk-toolkit',`<div class="sk-support-frame">${frame('THE TECHNICAL BLUEPRINT',art.skills())}${controls(tools,'data-sk-tool')}<div class="sk-tool-copy"><h3></h3><p></p><span></span></div></div>`);
    award=add($('.achievements'),'sk-awards',frame('DESIGN MILESTONES',art.awards()));$('.achievements').prepend(award);
    ending=add($('#contact'),'sk-ending',`${frame('THE COMPLETED INVENTION',art.finale())}<h2>Everything starts with an idea.<br><em>Let’s build something real.</em></h2>`,$('#contact > p:not(.chapter)'));
    all('[data-sk-tool]',toolkit).forEach((b,i)=>{b.addEventListener('click',()=>selectTool(i));b.addEventListener('focus',()=>selectTool(i));});
    all('[data-sk-contribution]',network).forEach((b,i)=>{b.addEventListener('click',()=>selectContribution(i));b.addEventListener('focus',()=>selectContribution(i));});
    all('[data-sk-milestone]',career).forEach((b,i)=>b.addEventListener('click',()=>{manual=i;manualAt=Number(career.dataset.progress)||0;setMilestone(i,1,manualAt);}));
    owned.forEach(el=>{el.inert=true;});
  }
  function paths(el){return all('.sk-stroke',el).filter(n=>!n.classList.contains('sk-career-line'));}
  function drawPaths(el,p){const nodes=paths(el);nodes.forEach((n,i)=>{const t=ramp(p,(i/nodes.length)*.23,.68+(i/nodes.length)*.32);if(t===1)n.style.removeProperty('stroke-dasharray');else n.style.strokeDasharray='1';n.style.strokeDashoffset=String(1-t);});all('text',el).forEach(n=>n.style.opacity=String(ramp(p,.42,.85)));}
  function draw(el,p){
    let groups=prepared.get(el);if(!groups){groups=all('[data-ink]',el).map(g=>{const [a,b]=g.dataset.ink.split(' ').map(Number);return {g,a,b,last:-1};});prepared.set(el,groups);}
    groups.forEach(item=>{const local=ramp(p,item.a,item.b);if(Math.abs(local-item.last)<.0004)return;item.last=local;item.g.style.opacity=local===0?'0':'1';drawPaths(item.g,local);});
  }
  function selectButtons(el,selector,i){all(selector,el).forEach((b,n)=>b.setAttribute('aria-pressed',String(i===n)));}
  function selectTool(i){selectedTool=i;selectButtons(toolkit,'[data-sk-tool]',i);$('.sk-tool-copy h3',toolkit).textContent=tools[i][0];$('.sk-tool-copy p',toolkit).textContent=tools[i][1];$('.sk-tool-copy span',toolkit).textContent=tools[i][2];all('[data-domain]',toolkit).forEach(n=>{n.classList.toggle('sk-domain-active',Number(n.dataset.domain)===i);});}
  function selectContribution(i){selectedContribution=i;selectButtons(network,'[data-sk-contribution]',i);all('[data-board]',network).forEach((n,j)=>n.hidden=i!==j);$('.sk-selection-copy',network).textContent=contributions[i][1];draw(network,reduce.matches?1:Number(network.dataset.progress)||0);}
  function pinProgress(container,scene,offset=0){if(reduce.matches)return 1;const r=container.getBoundingClientRect();return clamp((offset-r.top)/Math.max(1,r.height-scene.getBoundingClientRect().height));}
  function sectionProgress(el){if(reduce.matches)return 1;const r=el.getBoundingClientRect();return clamp((innerHeight*.85-r.top)/Math.max(1,r.height*.72));}
  function projectProgress(e){if(reduce.matches)return 1;const r=e.project.getBoundingClientRect(),copy=innerWidth<=800?$('.project-copy',e.project).getBoundingClientRect().height+28:0;const inset=32+copy;return clamp((12-r.top-inset)/Math.max(1,r.height-inset-32-e.parent.getBoundingClientRect().height));}
  function setOpening(raw){
    hero.parentElement.style.setProperty('--sk-header-space',Math.max(0,document.querySelector('body > header').getBoundingClientRect().bottom)+'px');
    const p=reduce.matches?1:clamp(raw/.9),phase=Math.round(raw*5);hero.dataset.progress=raw.toFixed(5);hero.dataset.phase=phase;draw(hero,p);
    const titles=['Everything starts with an idea.','The first line.','A blueprint for what’s next.','Ideas become systems.','Abhishek Gupta','Sharing files. Keeping trust.'];
    const notes=['A private notebook of software, systems, and experiments.','One deliberate line. A question worth following.','An interface, an access boundary, and a place for data.','Full-stack development. Thoughtful backends. AI-powered applications.','Computer Science undergraduate. Full-stack, backend, and AI applications.','First creation: TrustShare, a secure file-sharing platform.'];
    $('.sk-intro h2',hero).textContent=titles[phase];$('.sk-opening-copy',hero).textContent=notes[phase];$('.sk-manifesto',hero).hidden=phase!==4;
    $('.sk-hero-caption',hero).textContent=['Scroll to draw the first line.','A sketch begins.','Construction becomes structure.','Follow the connections.','Ideas are a start. I make them work.','Continue into the secure sharing blueprint.'][phase];$('progress',hero).value=raw;
    const transfer=ramp(p,.65,.9);all('.sk-transfer',hero).forEach(n=>{n.style.opacity=String(ramp(p,.03,.12));n.setAttribute('transform',`translate(${266+458*transfer} 268)`);});
    hero.style.setProperty('--sheet-turn',String(1-smooth(ramp(p,0,.3))));
  }
  let seed=741031,hits=0;const samples=Array.from({length:1800},(_,i)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;const x=seed/4294967296;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const y=seed/4294967296;const inside=x*x+y*y<=1;if(inside)hits++;return {x,y,inside,hits,estimate:4*hits/(i+1)};});
  function samplePlot(e,p){
    const n=Math.round(1800*ramp(p,.25,.96));if(e.count===n)return;e.count=n;
    all('.sk-art',e.el).forEach(svg=>{const mobile=svg.classList.contains('sk-narrow'),x0=mobile?37:80,y0=mobile?273:452,size=mobile?220:340;let a='',b='',g='';
      for(let i=0;i<n;i++){const s=samples[i],d=`M${(x0+s.x*size).toFixed(1)} ${(y0-s.y*size).toFixed(1)}h1.9v1.9h-1.9Z`;if(s.inside)a+=d;else b+=d;if(i>=29&&(i%12===0||i===n-1)){const x=(mobile?38:514)+(i/1799)*(mobile?271:297),y=(mobile?385:398)-Math.max(-.55,Math.min(.55,s.estimate-Math.PI))*(mobile?58:109);g+=(g?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}}
      $('.sk-sample-hits',svg).setAttribute('d',a);$('.sk-sample-misses',svg).setAttribute('d',b);$('.sk-convergence',svg).setAttribute('d',g);$('.sk-convergence',svg).style.opacity=String(ramp(p,.59,.76));
    });
    const s=samples[Math.max(0,n-1)];e.el.dataset.samples=n;e.el.dataset.estimate=n?s.estimate.toFixed(6):'';$('output',e.el).textContent=n?`${n} samples · ${s.hits} inside · π ≈ ${s.estimate.toFixed(5)}`:'No samples yet · π ≈ 4 × inside / total';
  }
  function setProject(e,raw){
    const p=reduce.matches?1:clamp(raw/.9);if(Math.abs(e.p-p)<.0001&&e.el.dataset.phase===String(Math.round(raw*5)))return;e.p=p;e.el.dataset.progress=raw.toFixed(5);const phase=Math.round(raw*5);e.el.dataset.phase=phase;draw(e.el,p);
    if(e.phase!==phase){e.phase=phase;$('h4',e.el).textContent=e.captions[phase];$('.sk-caption',e.el).textContent=e.descriptions[phase];}
    if(e.key==='sharing'){all('.sk-transfer',e.el).forEach(n=>{n.setAttribute('transform',`translate(${266+458*ramp(p,.66,.87)} 268)`);n.style.opacity=String(ramp(p,.02,.15));});}
    if(e.key==='compiler'){
      const intoSchema=ramp(p,.14,.3),assembly=smooth(ramp(p,.67,.9));all('.sk-wireframe',e.el).forEach(n=>n.style.opacity=String(1-intoSchema));all('.sk-schema',e.el).forEach(n=>{n.style.opacity=String(1-ramp(p,.61,.74));});all('.sk-wire-final',e.el).forEach(n=>{n.style.opacity=String(ramp(p,.6,.73)*(1-ramp(p,.85,.95)));});
      e.el.style.setProperty('--assembly',String(assembly));const app=$('.sk-final-app',e.el);app.style.opacity=String(ramp(p,.68,.87));app.style.clipPath=`inset(0 ${(1-assembly)*100}% 0 0)`;app.setAttribute('aria-hidden',String(p<.88));
    }
    if(e.key==='simulation')samplePlot(e,p);
  }
  function setMilestone(index,local,p){
    career.dataset.milestone=index;selectButtons(career,'[data-sk-milestone]',index);const m=milestones[index];$('.sk-career-copy small',career).textContent=m[1];$('.sk-career-copy h3',career).textContent=m[2];$('.sk-career-copy p',career).textContent=m[3];
    all('.sk-career-mini',career).forEach(n=>{const on=Number(n.dataset.mini)===index;n.style.opacity=on?'1':'0';if(on)drawPaths(n,local);});
    all('.sk-career-line',career).forEach(path=>{const q=reduce.matches?1:clamp((index+local)/5),len=path.getTotalLength(),point=path.getPointAtLength(q*len);path.style.strokeDasharray='1';path.style.strokeDashoffset=String(1-q);$('.sk-pencil-tip',path.parentElement).setAttribute('transform',`translate(${point.x} ${point.y})`);});
    $('progress',career).value=p;
  }
  function update(){
    if(!active||document.hidden)return;root.dataset.sketchUpdates=String(++updates);
    const visible=el=>{const r=el.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;};
    if(visible($('#home')))setOpening(pinProgress($('#home'),$('.hero-grid')));
    entries.forEach(e=>{if(visible(e.project)||reduce.matches)setProject(e,projectProgress(e));});
    if(visible(career)||reduce.matches){const p=pinProgress(career,$('.sk-career-frame',career),12);career.dataset.progress=p.toFixed(5);if(manual!==null&&Math.abs(p-manualAt)>.012)manual=null;const t=clamp(p/.88)*5,index=Math.min(4,Math.floor(t)),local=reduce.matches?1:smooth(ramp(t-index,0,.7));setMilestone(manual??index,manual!==null?1:local,p);}
    for(const el of [network,toolkit,award,ending]){if(visible(el)||reduce.matches){const p=sectionProgress(el);el.dataset.progress=p.toFixed(5);draw(el,p);}}
  }
  function hashEntry(){clearTimeout(hashTimer);const align=()=>{if(active&&location.hash==='#about')scrollTo({top:scrollY+career.getBoundingClientRect().top-12,behavior:'instant'});};align();hashTimer=setTimeout(align,0);}
  function sync(){
    const enabled=root.dataset.mode==='sketch';if(enabled===active)return;active=enabled;
    if(enabled){build();owned.forEach(el=>{el.hidden=false;el.inert=false;});manual=null;selectedTool=selectedContribution=0;entries.forEach(e=>{e.parent.setAttribute('aria-label','Scroll-drawn technical illustration for '+$('h3',e.project).textContent);e.p=-1;e.phase=-1;setProject(e,reduce.matches?1:0);});setOpening(reduce.matches?1:0);selectTool(0);selectContribution(0);setMilestone(reduce.matches?4:0,reduce.matches?1:0,reduce.matches?1:0);document.addEventListener('portfolio:sketch-frame',update);window.addEventListener('resize',update);window.addEventListener('hashchange',hashEntry);window.addEventListener('load',hashEntry);document.addEventListener('visibilitychange',update);update();hashEntry();}
    else {owned.forEach(el=>{el.hidden=true;el.inert=true;});entries.forEach(e=>e.originalLabel===null?e.parent.removeAttribute('aria-label'):e.parent.setAttribute('aria-label',e.originalLabel));hero?.parentElement.style.removeProperty('--sk-header-space');document.removeEventListener('portfolio:sketch-frame',update);window.removeEventListener('resize',update);window.removeEventListener('hashchange',hashEntry);window.removeEventListener('load',hashEntry);document.removeEventListener('visibilitychange',update);clearTimeout(hashTimer);delete root.dataset.sketchUpdates;}
  }
  new MutationObserver(sync).observe(root,{attributes:true,attributeFilter:['data-mode']});reduce.addEventListener('change',()=>{if(active){entries.forEach(e=>e.p=-1);setOpening(reduce.matches?1:0);update();}});sync();
})();
