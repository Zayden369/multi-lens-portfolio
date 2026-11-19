/* Original low-resolution artwork. Scroll state and optional play state stay separate. */
(() => {
  const html = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const limit = x => Math.max(0, Math.min(1, x));
  const ramp = (p,a,b) => limit((p-a)/(b-a));
  const ease = x => x*x*(3-2*x);
  const owned = [];
  const surfaces = [];
  let active = false, raf = 0, lastTime = 0, elapsed = 0;
  let opening = 0, playing = false, playX = 70, jump = 0, jumpSpeed = 0;
  let keepsake = false, lastOpeningPhase = -1;
  let ignoreScrollUntil = 0;
  const held = new Set();
  const frameInterval=(navigator.hardwareConcurrency||8)<=4?50:33;
  const palette = {sky:'#192c44',mist:'#344a62',night:'#0e1b2e',stone:'#607b7d',light:'#acc9ad',grass:'#7caa79',gold:'#e0bc76',ink:'#111e30',wood:'#886544'};

  function add(parent, cls, markup) {
    const el = document.createElement('div');
    el.className = cls; el.innerHTML = markup; el.hidden = true;
    parent.append(el); owned.push(el); return el;
  }
  const openingScene = add(document.querySelector('.hero-grid'), 'pixel-opening', `
    <canvas class="pixel-overworld" width="640" height="360" aria-hidden="true"></canvas>
    <div class="pixel-title"><small>LEVEL 00 / THE AWAKENING</small><h2>World of<br>Abhishek</h2><p>SCROLL TO BEGIN YOUR ADVENTURE</p></div>
    <div class="pixel-quest"><span>THE BEGINNING</span><progress max="1" value="0" aria-label="Opening adventure progress"></progress></div>
    <div class="pixel-dialogue"><small>FIELD NOTES / THE EXPLORER</small><p></p></div>
    <div class="pixel-controls"><button type="button" class="pixel-explore" aria-pressed="false">Explore with keyboard</button>
    <span class="pixel-controls-help" id="pixel-help">Scroll tells the story. Exploration is optional.</span>
    <div class="pixel-touch" hidden><button data-move="-1" aria-label="Move explorer left">←</button><button data-move="1" aria-label="Move explorer right">→</button><button data-jump aria-label="Jump">Jump</button><button data-interact aria-label="Inspect nearby object">Inspect</button></div>
    <a href="#work">Skip to projects ↓</a></div>`);
  openingScene.tabIndex = 0;
  openingScene.setAttribute('role','region');
  openingScene.setAttribute('aria-label','Adventure scene. Optional keyboard exploration');
  openingScene.setAttribute('aria-describedby','pixel-help');
  const exploreButton = openingScene.querySelector('.pixel-explore');
  const speech = openingScene.querySelector('.pixel-dialogue p');
  speech.setAttribute('aria-live','polite');
  const questLabel = openingScene.querySelector('.pixel-quest span');
  const openingLabels = ['THE BEGINNING','ON THE PATH','FIRST DISCOVERY','PORTAL AWAKENS','CROSS THE THRESHOLD','LEVEL 01 UNLOCKED'];
  const openingCopy = [
    'A trail, a notebook, and something worth building. Welcome to the world of Abhishek.',
    'Every working product begins with a little curiosity. Follow the path through the forest.',
    'Abhishek Kumar Gupta. Computer Science undergraduate, building full-stack products, backends, and AI-powered applications.',
    'The gateway responds to the journey. Scroll to bring its scattered runes together.',
    'Step through. On the other side: the workshop where ideas become working software.',
    'LEVEL 01 UNLOCKED — THE BUILDER. Explore four engineering projects, each with its own challenge.',
  ];
  const specs = [
    {key:'sharing',level:'02',name:'THE FORTRESS OF TRUST',captions:['A document worth protecting.','First, verify identity.','Set the sharing conditions.','Authorize the passage.','Transfer through a controlled link.','The recipient can open the document.'],note:'Authentication · Ownership · Password · Expiry · Revocation'},
    {key:'compiler',level:'03',name:'THE FORGE OF CREATION',captions:['An idea arrives at the forge.','The machine awakens.','Connected schemas take shape.','Validate. Repair the invalid field.','Compile the connected components.','An application emerges.'],note:'Illustrative requirement: a dashboard that tracks reading progress.'},
    {key:'stadium',level:'04',name:'THE ARENA OF INTELLIGENCE',captions:['Approach the arena.','See the venue as a whole.','Connect entrances and concourses.','Recognize a crowded zone.','Find an accessible route.','Guidance for fans, volunteers, and staff.'],note:'Illustrative route and crowd zone · No live venue data'},
    {key:'simulation',level:'05',name:'THE TEMPLE OF PROBABILITY',captions:['The challenge: estimate pi.','Gather the first samples.','Count the points inside.','Observe the distribution.','Watch the estimate evolve.','A result grounded in computation.'],note:'Computed demonstration · 4 × inside / total'},
  ];
  const projectEntries = specs.map(spec => {
    const parent = document.querySelector('.project-visual.'+spec.key);
    const el = add(parent,'pixel-world pixel-'+spec.key,`<div class="pixel-world-head"><span>LEVEL ${spec.level} / ${spec.name}</span><small>Illustrative project world</small></div><h4></h4><canvas class="pixel-level-art" width="480" height="300" aria-hidden="true"></canvas><div class="pixel-world-note"><span>${spec.note}</span><output class="pixel-world-metric"></output></div>`);
    return {...spec,el,project:parent.closest('.project'),caption:el.querySelector('h4'),metric:el.querySelector('output'),phase:-1};
  });
  const guild = add(document.querySelector('#opensource'), 'pixel-guild', '<canvas class="pixel-secondary-art" width="800" height="260" aria-hidden="true"></canvas><div class="pixel-place-caption"><span>LEVEL 06 / THE BUILDERS GUILD</span><span>REAL CONTRIBUTIONS / ARCHIVED SNAPSHOT BELOW</span></div>');
  document.querySelector('#opensource .two-col').before(guild);
  const route = add(document.querySelector('#about'),'pixel-route','<canvas class="pixel-secondary-art" width="800" height="220" aria-hidden="true"></canvas><div class="pixel-place-caption"><span>THE ADVENTURE LOG</span><span>REAL ROLES / REAL MILESTONES</span></div>');
  document.querySelector('#about .two-col').before(route);
  const trophies = add(document.querySelector('.achievements'),'pixel-trophies','<canvas class="pixel-secondary-art" width="800" height="170" aria-hidden="true"></canvas><div class="pixel-place-caption"><span>THE ACHIEVEMENT HALL</span><span>TOP 5 / RANK 525 / INTERNAL SIH SELECTION</span></div>');
  document.querySelector('.achievements').prepend(trophies);
  const abilities = [
    ['Frontend','React · Next.js · TypeScript','JavaScript, HTML, CSS. Interfaces and reusable application components.'],
    ['Backend','Python · FastAPI · Node.js','Application services, API boundaries, and integration.'],
    ['Data','PostgreSQL · SQLAlchemy · Prisma','Relational storage, models, and application data access.'],
    ['AI','OpenAI · Vercel AI SDK · Zod','Generation pipelines, structured output, validation, and fallbacks.'],
    ['Delivery','Docker · AWS · GitHub Actions','Containers, cloud tooling, and continuous integration.'],
  ];
  const tree = add(document.querySelector('#skills'),'pixel-tree',`<p>Choose a branch to explore the tools I build with.</p><div class="pixel-tree-map"><svg class="pixel-tree-lines" aria-hidden="true"></svg><span class="pixel-tree-root" aria-hidden="true">AG</span>${abilities.map((a,i)=>`<button type="button" class="pixel-ability" data-ability="${i}" aria-pressed="${i===0}" aria-controls="pixel-ability-info"><b>${a[0]}</b><small>${a[1]}</small></button>`).join('')}</div><div class="pixel-ability-detail" id="pixel-ability-info" aria-live="polite"><strong></strong><p></p></div>`);
  const treeMap = tree.querySelector('.pixel-tree-map');
  const treeLines = tree.querySelector('svg');
  let selectedAbility = 0;
  const ending = add(document.querySelector('#contact'),'pixel-ending','<canvas class="pixel-secondary-art" width="800" height="300" aria-hidden="true"></canvas><span>QUEST COMPLETE.</span><h2>The next adventure starts with a conversation.</h2>');
  document.querySelector('#contact .chapter').after(ending);

  function surface(container, key, w, h) {
    const canvas = container.querySelector('canvas');
    canvas.width=w; canvas.height=h;
    const ctx = canvas.getContext('2d',{alpha:false});
    if(ctx) ctx.imageSmoothingEnabled=false;
    const item={canvas,ctx,key,p:0,visible:false,frames:0}; surfaces.push(item); return item;
  }
  const overworld = surface(openingScene,'opening',640,360);
  projectEntries.forEach(entry=>{ entry.surface=surface(entry.el,entry.key,480,300); });
  const guildArt=surface(guild,'guild',800,260);
  const routeArt=surface(route,'route',800,220);
  const trophyArt=surface(trophies,'trophies',800,170);
  const endingArt=surface(ending,'ending',800,300);
  const sectionSurfaces = [[guildArt,document.querySelector('#opensource')],[routeArt,document.querySelector('#about')],[trophyArt,document.querySelector('.achievements')],[endingArt,document.querySelector('#contact')]];

  // All rectangles snap to the same logical pixel grid, regardless of DPR.
  let g;
  function rect(x,y,w,h,color) { g.fillStyle=color;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h)); }
  function poly(points,color) { g.fillStyle=color;g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(Math.round(x),Math.round(y)):g.moveTo(Math.round(x),Math.round(y)));g.closePath();g.fill(); }
  function stroke(points,color,width=1) { g.strokeStyle=color;g.lineWidth=width;g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(Math.round(x)+.5,Math.round(y)+.5):g.moveTo(Math.round(x)+.5,Math.round(y)+.5));g.stroke(); }
  function label(text,x,y,color='#e8d9a7',size=10) {g.fillStyle=color;g.font=`${Math.max(10,Math.round(size/10)*10)}px Adventure,monospace`;g.textBaseline='top';g.fillText(text,Math.round(x),Math.round(y));}
  const hash = n => { const a=Math.sin(n*127.1+311.7)*43758.5453;return a-Math.floor(a); };
  function ellipse(x,y,rx,ry,color) {
    for(let row=-ry;row<=ry;row++) {const half=Math.floor(rx*Math.sqrt(Math.max(0,1-row*row/(ry*ry))));rect(x-half,y+row,half*2+1,1,color);}
  }
  function stars(w,h,t) {for(let i=0;i<(w<500?26:48);i++){const x=Math.floor(hash(i+1)*w),y=Math.floor(hash(i+121)*h*.62);rect(x,y,i%7===0?2:1,1,(i%4===Math.floor(t)%4)?'#a6c4b1':'#536e82');}}
  function cloud(x,y,scale=1) {rect(x,y,40*scale,5*scale,'#526b7d');rect(x+8*scale,y-5*scale,23*scale,7*scale,'#607e8c');rect(x+14*scale,y-8*scale,12*scale,6*scale,'#6e8f98');}
  function treeSprite(x,y,s=1,bright=false) {
    rect(x-2*s,y-35*s,4*s,38*s,'#283f40');
    const colors=bright?['#437366','#56856c','#76a17a']:['#294e50','#345d59','#426b60'];
    for(let n=0;n<3;n++) {const yy=y-(72-n*17)*s;poly([[x,yy],[x+4*s,yy+5*s],[x+4*s,yy+10*s],[x+(19+n*3)*s,yy+30*s],[x-(19+n*3)*s,yy+30*s],[x-4*s,yy+10*s],[x-4*s,yy+5*s]],colors[n]);rect(x-7*s,yy+15*s,3*s,2*s,colors[Math.min(2,n+1)]);}
  }
  function brickWall(x,y,w,h,base='#526c70',shadow='#3c555e') {
    rect(x,y,w,h,shadow);
    for(let row=0;row<h;row+=10) for(let col=0;col<w;col+=17) {const xx=x+col-(row%20?8:0);g.save();g.beginPath();g.rect(x,y,w,h);g.clip();rect(xx+1,y+row+1,15,8,base);rect(xx+2,y+row+2,12,1,'#718687');if(hash(row+col)>.7)rect(xx+5,y+row+5,3,1,shadow);g.restore();}
  }
  function ground(w,y,h,camera=0,theme='forest') {
    const turf=theme==='forge'?'#9d6243':theme==='temple'?'#73977b':'#86a878';
    rect(0,y,w,h,'#263c42');rect(0,y,w,4,turf);rect(0,y+4,w,5,'#476957');
    for(let i=0;i<w+24;i+=12){const x=i-Math.round(camera%12);rect(x,y+8+(i%24?3:0),10,8,'#354e4a');rect(x+3,y+22+(i%36),4,2,'#5d6952');rect(x+7,y+18+(i%20),2,2,'#8a8361');}
    for(let n=0;n<w;n+=23){const x=n-Math.round(camera%23);rect(x,y-4,1,5,turf);rect(x+3,y-2,2,3,'#a3bd83');}
  }
  function explorer(x,y,t,walking=false,facing=1,opacity=1) {
    g.save();g.globalAlpha=opacity;g.translate(Math.round(x),Math.round(y));g.scale(facing,1);
    const step=walking?Math.floor(t*9)%4:0,bob=walking?(step%2):Math.floor(t*1.8)%2;
    ellipse(0,1,10,2,'#0c1b2c');
    rect(-5,-26-bob,11,9,'#302b37');rect(-4,-24-bob,10,8,'#d7ad80');rect(3,-22-bob,2,2,'#18333b');
    rect(-7,-29-bob,13,5,'#719683');rect(-10,-25-bob,20,2,'#a4b68a');rect(-5,-27-bob,11,1,'#c9c294');
    rect(-7,-15-bob,13,10,'#657d83');rect(-8,-14-bob,4,8,'#aa704c');rect(-4,-15-bob,11,3,'#c0ac75');rect(-7,-11-bob,3,6,'#e1b58c');
    rect(-5,-5,4,5+(step===1?2:0),'#222e3f');rect(2,-5,4,5+(step===3?2:0),'#222e3f');rect(-6,0+(step===1?2:0),6,2,'#a39372');rect(2,0+(step===3?2:0),6,2,'#a39372');
    g.restore();
  }
  function portal(x,y,amount,t,scale=1) {
    const w=44*scale,h=76*scale;
    brickWall(x-w/2-8*scale,y-h,w+16*scale,h,'#647d78','#3d565d');
    rect(x-w/2,y-h+8*scale,w,h-8*scale,'#122a37');
    rect(x-w/2-4*scale,y-h+4*scale,w+8*scale,4*scale,'#9dab8a');
    for(let n=0;n<6;n++){const yy=y-h+12*scale+n*10*scale;rect(x-w/2-6*scale,yy,3*scale,3*scale,n<amount*6?'#d6dda0':'#456160');rect(x+w/2+3*scale,yy,3*scale,3*scale,n<amount*6?'#d6dda0':'#456160');}
    if(amount>0){g.save();g.beginPath();g.rect(x-w/2,y-h+8*scale,w,h-8*scale);g.clip();for(let i=0;i<28;i++){const xx=x-w/2+((i*17+Math.floor(t*9))%Math.max(1,w));const yy=y-((i*11+Math.floor(t*13))%(h-8*scale));rect(xx,yy,2*scale,6*scale,i%3?'#87b8a2':'#d2d8a2');}rect(x-w/2,y-h+8*scale,w,Math.round((h-8*scale)*(1-amount)),'#1e3d46');g.restore();}
    if(amount>.6){rect(x-w/2-12*scale,y-3*scale,w+24*scale,3*scale,'#94b48a');for(let n=0;n<8;n++){const angle=n*1.7+t*.5;rect(x+Math.round(Math.cos(angle)*(w/2+12*scale)),y-h/2+Math.round(Math.sin(angle)*h/2),2*scale,2*scale,'#c7d78a');}}
  }
  function chest(x,y,open=false) {rect(x-10,y-10,20,10,'#5e4936');rect(x-11,y-12,22,5,'#c29557');rect(x-8,y-10,16,8,'#8e6541');rect(x-2,y-8,4,5,'#e6c57a');if(open){rect(x-11,y-20,22,6,'#b68b50');rect(x-8,y-14,16,3,'#e2d084');rect(x-4,y-20,8,8,'#e6d99b');}}

  function landscape(w,h,p,t,final=false,groundRatio) {
    rect(0,0,w,h,final?'#25334c':'#1b2c43');stars(w,h,t);
    const y=Math.round(h*(groundRatio??(final?.79:w<500?.60:.68))),camera=p*(w*.65);
    rect(0,Math.round(h*.35),w,h*.5,'#2d465b');rect(0,Math.round(h*.51),w,h*.3,'#405e6b');
    // Stepped silhouettes, never anti-aliased smooth mountain outlines.
    for(let i=-1;i<7;i++){const x=i*145-Math.round(camera*.14)%145;const peak=60+(i%3)*17;poly([[x,y],[x,y-56],[x+18,y-56],[x+18,y-86],[x+34,y-86],[x+34,y-peak-69],[x+52,y-peak-69],[x+52,y-peak-83],[x+69,y-peak-83],[x+69,y-peak-60],[x+92,y-peak-60],[x+92,y-70],[x+115,y-70],[x+115,y]],'#354e63');}
    for(let i=-1;i<9;i++) {const x=i*95-Math.round(camera*.35)%95;treeSprite(x,y-4,.8,false);}
    for(let i=0;i<4;i++)cloud(((i*184+t*2-camera*.09)%(w+100)+w+100)%(w+100)-50,Math.round(h*.23)+(i%2)*23,.9);
    // Floating sanctuary and a falling ribbon of water in the distance.
    const islandX=w*.7-Math.round(camera*.12);
    rect(islandX,h*.39,58,5,'#94a88a');poly([[islandX,h*.39+5],[islandX+58,h*.39+5],[islandX+43,h*.39+24],[islandX+19,h*.39+34]],'#485b60');
    for(let n=0;n<4;n++)rect(islandX+20+n*3,h*.39+4,2,53+(n%2)*14,n%2?'#82a8a9':'#5f8f9e');
    for(let n=0;n<12;n++)rect(islandX+22+(n%4)*2,h*.46+((n*7+t*14)%50),1,4,'#a9c9bd');
    ground(w,y,h-y,camera);
    for(let i=0;i<9;i++){const x=((i*97-camera*.8)%(w+100)+w+100)%(w+100)-40;if(x<w*.2||x>w*.8)treeSprite(x,y,1.1,i%2===0);}
    for(let n=0;n<(w<500?9:15);n++){const xx=((n*73+t*3-camera*.4)%w+w)%w,yy=y-12-(n*29%88);rect(xx,yy,1+(n%3===0),1+(n%3===0),n%3?'#64836e':'#d7ca86');}
    return y;
  }

  function drawOpening(item,t) {
    const w=item.canvas.width,h=item.canvas.height,p=playing?0:item.p;
    const travel=ease(ramp(p,.05,.76)),enter=ease(ramp(p,.77,.97));
    const y=landscape(w,h,p,t,false,innerHeight<760?(w<500?.48:.55):undefined);
    const portalX=w*.73-travel*w*.15;
    const playerX=playing?playX:w*.17+travel*w*.41;
    const scale=1+enter*.75;
    g.save();g.translate(w*.58,h*.6);g.scale(scale,scale);g.translate(-w*.58,-h*.6);
    portal(portalX,y,ramp(p,.44,.77),t,w<500?.85:1.2);
    const sx=w*.36-travel*w*.12;
    rect(sx,y-35,3,35,'#8b7958');rect(sx-17,y-55,60,25,'#665f48');rect(sx-15,y-53,56,21,'#b6b38b');label('BUILDER',sx-12,y-48,'#283c3f',8);label('THIS WAY >',sx-12,y-39,'#283c3f',6);
    chest(w*.35,y,keepsake&&playing);
    if(p<.88||playing)explorer(playerX,y-jump,t,p>.07&&p<.76||held.size>0,1,1-ramp(p,.76,.9));
    g.restore();
    if(p>.79) {
      const dissolve=ramp(p,.79,.94);
      for(let i=0;i<200;i++){const n=hash(i+900);if(n<dissolve)rect((i%20)*w/20,Math.floor(i/20)*h/10,w/20+1,h/10+1,n<dissolve*.75?'#18242f':'#3d5c55');}
      if(p>.91)workshop(w,h,ramp(p,.91,1),t);
    }
    item.canvas.dataset.camera=(travel*w*.65).toFixed(2);
    item.canvas.dataset.player=Math.round(playerX);
    item.canvas.dataset.portal=ramp(p,.44,.77).toFixed(3);
  }

  function workshop(w,h,p,t) {
    rect(0,0,w,h,'#1a2932');brickWall(0,h*.31,w,h*.54,'#293e43','#1e3038');
    const y=h*(w<500?(innerHeight<760?.48:.60):(innerHeight<760?.56:.66));
    for(let n=0;n<5;n++){const x=n*w*.23-p*25;rect(x,y-95,80,5,'#9e8862');rect(x+4,y-93,3,60,'#685a44');for(let b=0;b<6;b++)rect(x+7+b*10,y-113-(b%3)*5,7,18+(b%3)*5,['#749b7a','#ab8960','#74959c'][b%3]);}
    rect(w*.36,y-32,w*.3,11,'#a58a60');rect(w*.39,y-21,8,25,'#65553f');rect(w*.61,y-21,8,25,'#65553f');
    rect(w*.45,y-75,55,40,'#57747a');rect(w*.45+4,y-71,47,30,'#152e38');for(let i=0;i<4;i++)rect(w*.45+9,y-65+i*5,10+(i%3)*10,2,'#b5c997');
    rect(w*.45+23,y-35,10,4,'#87a09a');rect(w*.45+14,y-31,28,3,'#91a99a');
    ground(w,y,h-y,0);explorer(w*.32+p*30,y,t,p>0);
  }

  function drawFortress(item,t) {
    const p=item.p,w=480,h=300,y=247;
    rect(0,0,w,h,'#1d293d');stars(w,h,t);ellipse(405,46,19,19,'#b7bea0');ellipse(414,41,18,18,'#1d293d');
    for(let n=0;n<7;n++)treeSprite(n*83-25,y,1.1,false);
    brickWall(125,102,253,145,'#4d686e','#354b59');brickWall(109,73,52,174);brickWall(345,73,52,174);
    for(const x of [109,345]){for(let c=0;c<4;c++)rect(x+c*14,62,9,15,'#718584');rect(x-2,82,56,6,'#9ca692');rect(x+15,104,17,31,'#203947');rect(x+20,110,7,18,'#ccba7e');rect(x+25,37,2,25,'#8a8d72');poly([[x+27,37],[x+51,42],[x+27,51]],'#b79367');}
    rect(217,142,65,105,'#152938');rect(217,136,65,7,'#9ca68c');
    const gate=1-ease(ramp(p,.43,.75));
    for(let x=221;x<282;x+=9)rect(x,143,4,104*gate,'#8da39b');rect(217,142+104*gate-6,65,6,'#c6b68a');
    for(let i=0;i<3;i++){rect(190+i*25,117,12,12,i<ramp(p,.13,.5)*3?'#d8cc8c':'#314d57');}
    ground(w,y,h-y,p*70);
    const x=55+ease(ramp(p,0,.95))*350;
    explorer(x,y,t,p>.05&&p<.95);
    if(p>.48){const dx=87+ramp(p,.48,.92)*300;rect(dx,y-48,14,19,'#dcd8b1');rect(dx+9,y-48,5,5,'#8cac9d');for(let n=0;n<3;n++)rect(dx+3,y-39+n*3,8,1,'#6c826f');}
    label('IDENTITY',133,89,'#d2ce9e',8);label(p<.5?'PROTECTED':'AUTHORIZED',206,267,'#c8d4a0',8);
  }
  function gear(x,y,t,r=17) {for(let n=0;n<8;n++){const a=n*Math.PI/4+t;rect(x+Math.cos(a)*r-4,y+Math.sin(a)*r-4,8,8,'#a28057');}ellipse(x,y,r-3,r-3,'#c39e62');ellipse(x,y,5,5,'#3b3a3a');}
  function drawForge(item,t) {
    const p=item.p,w=480,h=300,y=254,phase=Math.min(5,Math.floor(p*6));
    rect(0,0,w,h,'#292b38');brickWall(0,0,w,255,'#3d3d45','#30313d');
    for(let i=0;i<6;i++){rect(i*90+8,0,9,255,'#5b4c45');rect(i*90+8,92,9,4,'#b18e5a');}
    rect(101,48,289,168,'#776b58');rect(107,54,277,156,'#1e3038');rect(111,58,269,4,'#b5a27b');
    gear(133,86,t*.4);gear(357,86,-t*.4,13);
    rect(29,152,53,80,'#657470');rect(34,158,43,35,'#233b3f');label('IDEA',41,168,'#c7d3a6',8);rect(43+p*45,140-p*11,26,18,'#d7c699');
    const power=ramp(p,.14,.35);
    for(let i=0;i<19;i++){const x=82+i*13;rect(x,200,8,3,i<power*19?'#dfb773':'#4c5a56');}
    if(phase===0){label('A READING DASHBOARD',127,122,'#d7d9b5',10);label('FROM AN IDEA...',157,149,'#a6b89d',8);}
    if(phase===1){
      label('PARSING INTENT',177,117,'#d7d3a0');
      for(let n=0;n<7;n++){const x=150+n*27;rect(x,147,16,24,'#354f50');rect(x+3,150,10,5+Math.round(power*12),'#b7b47d');}
      label('IDEA > STRUCTURE',166,180,'#9fb89f');
    }
    if(phase>=2&&phase<=3){
      for(let n=0;n<3;n++){const x=128+n*82;rect(x,117,62,51,'#506969');rect(x+3,120,56,45,'#283e44');label(['UI','DATA','API'][n],x+12,130,'#d7c58f',10);label(['VIEW','BOOK','LOGIC'][n],x+9,151,'#9cb6a0',7);if(n<2)for(let s=0;s<3;s++)rect(x+62+s*7,143,5,2,'#c3bb84');}
      if(phase===3){rect(201,174,154,30,'#40594d');label('PROGRESS: STRING',207,178,'#cda780');rect(206,183,96,1,'#d1ad82');label('PROGRESS: NUMBER',207,192,'#dfd5a5');}
    }
    if(phase>=4){
      const ready=ease(ramp(p,.68,.92));const yy=152-ready*60;
      rect(159,yy,173,112,'#8ca59a');rect(163,yy+4,165,104,'#e1d7ad');rect(169,yy+11,153,15,'#4f7965');label('READING ROOM',177,yy+16,'#e3e2bf',8);
      for(let n=0;n<3;n++){const x=178+n*46;rect(x,yy+37,30,42,['#718d70','#b47c57','#5e7884'][n]);rect(x+3,yy+39,2,38,'#ccba84');rect(x,yy+86,30,3,'#b0b58e');rect(x,yy+86,[23,14,27][n],3,'#59816a');}
      rect(147,87,4,51*(1-ready),'#c0a16b');rect(342,87,4,51*(1-ready),'#c0a16b');
    }
    ground(w,y,h-y,p*20,'forge');for(let n=0;n<20;n++)rect(n*27,y+30+(n%3)*3,12,2,['#b27448','#e3af65','#79563d'][n%3]);explorer(65+p*48,y,t,p<.3);
    for(let n=0;n<8;n++)rect(394+(n%3)*9,y-((n*17+t*18)%110),2,2,'#d3a562');
  }
  const arenaRoute=[[235,38],[364,38],[421,38],[421,230],[350,230],[350,210]];
  function pathMarker(points,p){let length=0;const lengths=[];for(let i=1;i<points.length;i++){const d=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);lengths.push(d);length+=d;}let remaining=p*length;const out=[points[0]];for(let i=1;i<points.length;i++){const d=lengths[i-1];if(remaining>=d){out.push(points[i]);remaining-=d;}else{const a=points[i-1],b=points[i];out.push([a[0]+(b[0]-a[0])*remaining/d,a[1]+(b[1]-a[1])*remaining/d]);break;}}return out;}
  function drawArena(item,t) {
    const p=item.p,w=480,h=300;
    rect(0,0,w,h,'#233f46');for(let i=0;i<60;i++)rect(Math.floor(hash(i+2)*w),Math.floor(hash(i+37)*h),2,2,'#2d5151');
    const overview=ease(ramp(p,.15,.4));
    g.save();g.translate(240,153);g.scale(1, .48+overview*.52);g.translate(-240,-153);
    poly([[110,46],[370,46],[410,83],[410,225],[371,259],[109,259],[70,225],[70,83]],'#617e78');
    poly([[119,61],[360,61],[392,94],[392,214],[359,242],[120,242],[88,213],[88,95]],'#a1b290');
    poly([[135,78],[345,78],[375,106],[375,202],[345,226],[135,226],[107,200],[107,108]],'#344f56');
    for(let row=0;row<3;row++){for(let i=0;i<26;i++){const x=136+i*8;rect(x,84+row*8,4,3,'#7b9d87');rect(x,212-row*8,4,3,'#879976');}}
    rect(156,117,167,77,'#6c966e');rect(161,121,157,69,'#7eaa7d');rect(238,121,1,69,'#d9dbad');stroke([[161,121],[318,121],[318,190],[161,190],[161,121]],'#cbd2a5');ellipse(239,155,15,15,'#c7cf9d');ellipse(239,155,14,14,'#7eaa7d');rect(161,139,15,34,'#c7cf9d');rect(162,140,13,32,'#7eaa7d');
    if(p>.4){for(let i=0;i<40;i++)rect(162+i%14*8,83+Math.floor(i/14)*7,3,3,'#c78f69');}
    const routeProgress=ramp(p,.46,.96),route=pathMarker(arenaRoute,routeProgress);stroke(route,'#e1cf91',3);const point=route[route.length-1];rect(point[0]-3,point[1]-3,7,7,'#f1e3aa');g.restore();
    label('NORTH ENTRANCE',192,15,'#c5d7ac',8);label('ACCESSIBLE CONCOURSE',137,280,'#c5d7ac',8);
    for(const x of [39,441]){rect(x,48,2,178,'#708c83');rect(x-12,45,26,5,'#9eb39c');for(let n=0;n<4;n++)rect(x-10+n*6,46,4,3,'#e5d6a6');}
    explorer(32,266,t,p<.15);
  }

  let hits=0;
  const estimates=samples.map(([x,y],i)=>{if(x*x+y*y<=1)hits++;return 4*hits/(i+1);});
  const mathLayer=document.createElement('canvas');mathLayer.width=174;mathLayer.height=174;
  const mathPen=mathLayer.getContext('2d');
  let mathCount=-1;
  function drawTemple(item,t) {
    const p=item.p,count=Math.max(20,Math.round(20+p*(samples.length-20)));
    rect(0,0,480,300,'#1f2b40');stars(480,300,t);rect(0,251,480,49,'#34494d');
    for(let i=0;i<6;i++){const x=28+i*83;rect(x,61,25,190,'#587675');rect(x+3,64,5,183,'#729084');rect(x-5,53,35,10,'#b4b58a');rect(x-7,242,39,9,'#a5a781');}
    rect(106,42,265,214,'#a6ad8a');rect(112,48,253,202,'#182e3b');
    if(count!==mathCount&&mathPen){mathCount=count;mathPen.fillStyle='#203a43';mathPen.fillRect(0,0,174,174);mathPen.strokeStyle='#a4b68c';mathPen.strokeRect(6.5,6.5,160,160);for(let i=0;i<count;i++){const [x,y]=samples[i];mathPen.fillStyle=x*x+y*y<=1?'#d9bd79':'#628c8a';mathPen.fillRect(7+Math.floor(x*158),165-Math.floor(y*158),1,1);}for(let y=0;y<159;y++){const x=Math.floor(Math.sqrt(1-(y/159)**2)*159);mathPen.fillStyle='#b7c89c';mathPen.fillRect(7+x,165-y,1,1);}}
    if(mathPen)g.drawImage(mathLayer,118,65);
    label('PI',310,83,'#d8cc96',12);label(estimates[count-1].toFixed(3),298,109,'#d8cc96',10);label('SAMPLES',298,142,'#9ebd9f',7);label(String(count),301,159,'#ddd0a1',9);
    const graph=[];for(let i=19;i<count;i+=12)graph.push([120+i/samples.length*237,236-(estimates[i]-Math.PI)*30]);stroke(graph,'#c5b880');
    chest(419,250,p>.92);explorer(61+p*18,251,t,p<.25);
    const entry=projectEntries[3];entry.metric.textContent=count.toLocaleString()+' samples\nπ ≈ '+estimates[count-1].toFixed(4);
  }

  function building(x,y,w=110,type='guild',lit=true) {
    rect(x,y-75,w,75,'#526e68');brickWall(x,y-60,w,60,'#526c64','#3d5656');
    for(let n=0;n<6;n++)rect(x-7+n*5,y-78-n*6,w+14-n*10,7,n%2?'#86745c':'#a18b68');
    for(let n=0;n<3;n++){rect(x+13+n*(w-32)/3,y-45,14,19,'#233c42');rect(x+15+n*(w-32)/3,y-43,10,14,lit?'#d5c68b':'#59776c');}
    rect(x+w/2-10,y-30,20,30,'#243c40');rect(x+w/2-7,y-26,14,26,'#719078');
    label(type.toUpperCase(),x+9,y-66,'#ddd0a1',7);
  }
  function drawGuild(item,t) {
    const w=800,h=260,y=223,p=item.p;
    landscape(w,h,p*.4,t);rect(0,209,w,51,'#273f44');
    for(let i=0;i<7;i++)treeSprite(25+i*127,y,.9,i%2===0);
    building(270,y,210,'BUILDERS GUILD');
    // Guild mission board: professional contribution descriptions remain in HTML.
    rect(534,y-112,126,94,'#6c654d');rect(541,y-105,112,78,'#a49c76');
    for(let i=0;i<3;i++){rect(549+i*33,y-96,27,54,'#ddd0a2');rect(553+i*33,y-90,19,3,'#839376');rect(553+i*33,y-80,17,1,'#9b956f');rect(553+i*33,y-74,19,1,'#9b956f');}
    label('QUEST RECORDS',541,y-124,'#ddd0a1',8);chest(200,y,p>.7);
    explorer(92+p*565,y,t,p>.05&&p<.95);
    for(let n=0;n<12;n++)rect(366+(n%3)*3,y-122-((n*13+t*9)%45),3,4,'#748a83');
  }
  function drawRoute(item,t) {
    const y=173,p=item.p;rect(0,0,800,220,'#213b46');
    for(let n=0;n<7;n++)treeSprite(45+n*127,y,.8,n%2===0);
    const places=[['ACADEMY',58],['WORKSHOP',245],['DATA LAB',438],['GUILD',629]];
    places.forEach(([name,x],i)=>{building(x,y-15,94,name,i/4<=p);rect(x+42,y-15,9,35,'#9b9d79');});
    stroke([[30,y+21],[770,y+21]],'#667b64',5);for(let n=0;n<38;n++)rect(30+n*20,y+19,9,1,'#c4b888');
    explorer(40+p*710,y+20,t,p>.02&&p<.98);label('A JOURNEY OF BUILDING AND LEARNING',198,17,'#c5d2a4',9);
  }
  function drawTrophies(item,t) {
    rect(0,0,800,170,'#273240');brickWall(0,0,800,135,'#35474d','#293b44');rect(0,135,800,35,'#53605a');
    for(let i=0;i<3;i++){const x=152+i*245;rect(x-35,107,70,28,'#738379');rect(x-40,104,80,6,'#b4af86');
      const lift=reduced.matches?0:Math.round(Math.sin(t*.7+i)*2);
      if(i===0){rect(x-14,46-lift,28,25,'#d0b778');rect(x-9,71-lift,18,8,'#a18958');rect(x-3,79-lift,6,17,'#d0b778');rect(x-14,96-lift,28,5,'#c7ae6c');stroke([[x-14,51-lift],[x-24,51-lift],[x-24,70-lift],[x-9,75-lift]],'#d0b778',3);stroke([[x+14,51-lift],[x+24,51-lift],[x+24,70-lift],[x+9,75-lift]],'#d0b778',3);}
      else {poly([[x,36-lift],[x+22,58-lift],[x+22,84-lift],[x,99-lift],[x-22,84-lift],[x-22,58-lift]],i===1?'#8eb3a0':'#b1a278');label(i===1?'525':'SIH',x-13,63-lift,'#253e46',10);}
      label(['TOP 5 / INTERNSHIP','525 / 80,000+','INTERNAL SELECTION'][i],x-66,147,'#ddd0a1',8);
    }
  }
  function drawEnding(item,t) {
    const y=landscape(800,300,item.p*.2,t,true);
    // Echoes of previous regions, beyond the final overlook.
    building(42,y-23,95,'GUILD');brickWall(186,y-73,55,52,'#5c7378','#3f5864');rect(180,y-80,15,12,'#89958c');rect(232,y-80,15,12,'#89958c');
    rect(566,y-46,100,27,'#627c71');for(let n=0;n<7;n++)rect(574+n*12,y-42,7,4,'#a5b88b');
    portal(423,y, .6+item.p*.4,t,1.5);explorer(339,y,t,false);chest(488,y,item.p>.5);
  }
  const draw = {opening:drawOpening,sharing:drawFortress,compiler:drawForge,stadium:drawArena,simulation:drawTemple,guild:drawGuild,route:drawRoute,trophies:drawTrophies,ending:drawEnding};
  const projectBuffer=document.createElement('canvas');projectBuffer.width=480;projectBuffer.height=300;
  const projectPen=projectBuffer.getContext('2d',{alpha:false});
  function render(item,time) {
    if(!item.ctx)return;
    const closeCamera=item.canvas.width===300&&projectEntries.some(entry=>entry.surface===item)&&projectPen;
    g=closeCamera?projectPen:item.ctx;g.imageSmoothingEnabled=false;draw[item.key](item,time);
    if(closeCamera){
      const camera=item.key==='sharing'?Math.max(0,Math.min(180,55+ease(ramp(item.p,0,.95))*350-100)):ease(ramp(item.p,0,.4))*85+(item.key==='stadium'?ease(ramp(item.p,.46,.9))*50:0);
      item.ctx.imageSmoothingEnabled=false;item.ctx.drawImage(projectBuffer,Math.round(camera),0,300,300,0,0,300,300);
      item.canvas.dataset.camera=String(Math.round(camera));
    }
    item.canvas.dataset.frames=String(++item.frames);
  }
  function tick(now) {
    raf=0;
    if(!active||document.hidden)return;
    const dt=Math.min(.05,(now-lastTime)/1000||0);lastTime=now;
    if(playing){const direction=(held.has('ArrowRight')||held.has('d')?1:0)-(held.has('ArrowLeft')||held.has('a')?1:0);playX=Math.max(18,Math.min(overworld.canvas.width-18,playX+direction*dt*105));if(jump>0||jumpSpeed>0){jump+=jumpSpeed*dt;jumpSpeed-=dt*310;if(jump<0){jump=0;jumpSpeed=0;}}}
    if(!reduced.matches)elapsed+=dt;
    // Bound ambient redraws to 30fps (20 on <=4 logical cores).
    if(now-(tick.lastPaint||0)>=frameInterval||reduced.matches){tick.lastPaint=now;surfaces.forEach(item=>{if(item.visible)render(item,reduced.matches?0:elapsed);});}
    if((!reduced.matches||playing)&&surfaces.some(item=>item.visible))raf=requestAnimationFrame(tick);
  }
  function requestDraw(){if(active&&!document.hidden&&!raf){lastTime=performance.now();raf=requestAnimationFrame(tick);}}
  const intersection = new IntersectionObserver(entries=>{entries.forEach(entry=>{const item=surfaces.find(s=>s.canvas===entry.target);if(item)item.visible=entry.isIntersecting;});if(playing&&!overworld.visible)exitPlay(false);requestDraw();},{rootMargin:'50px'});

  function update(event) {
    if(!active)return;
    const next=reduced.matches?1:event.detail.opening;
    // Focus and the newly expanded touch controls can trigger scroll anchoring.
    // Ignore those geometry changes briefly; wheel/swipe intent exits at once.
    if(playing&&Math.abs(next-opening)>.002&&performance.now()>ignoreScrollUntil)exitPlay(false);
    opening=next;overworld.p=next;
    const phase=Math.min(5,Math.floor(next*5.999));
    if(!playing&&phase!==lastOpeningPhase){lastOpeningPhase=phase;questLabel.textContent=openingLabels[phase];speech.textContent=openingCopy[phase];openingScene.dataset.phase=String(phase);openingScene.querySelector('.pixel-title small').textContent=phase===5?'LEVEL 01 / THE BUILDER':'LEVEL 00 / THE AWAKENING';openingScene.querySelector('.pixel-title h2').innerHTML=phase===5?'The<br>Builder':'World of<br>Abhishek';openingScene.querySelector('.pixel-title > p').textContent=phase===5?'SCROLL TO MEET THE PROJECTS':'SCROLL TO BEGIN YOUR ADVENTURE';}
    openingScene.querySelector('progress').value=next;
    projectEntries.forEach(entry=>{const p=reduced.matches?1:Number(entry.project.style.getPropertyValue('--journey'))||0;entry.surface.p=p;const phase=Math.min(5,Math.floor(p*6));if(phase!==entry.phase){entry.phase=phase;entry.el.dataset.phase=phase;entry.caption.textContent=entry.captions[phase];}entry.el.dataset.progress=p.toFixed(5);});
    sectionSurfaces.forEach(([surface,section])=>{const r=section.getBoundingClientRect();surface.p=reduced.matches?1:limit((innerHeight*.8-r.top)/Math.max(innerHeight,r.height*.75));});
    requestDraw();
  }
  function resize(){if(!active)return;const mobile=innerWidth<=800;const width=mobile?360:640,height=mobile?430:360;if(overworld.canvas.width!==width||overworld.canvas.height!==height){overworld.canvas.width=width;overworld.canvas.height=height;playX=Math.min(playX,width-20);}projectEntries.forEach(entry=>{const width=innerWidth<=450?300:480;if(entry.surface.canvas.width!==width)entry.surface.canvas.width=width;});drawTree();requestDraw();}

  function drawTree(){if(!active)return;const r=treeMap.getBoundingClientRect();if(!r.width)return;treeLines.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);const root=treeMap.querySelector('.pixel-tree-root').getBoundingClientRect(),sx=root.left-r.left+root.width/2,sy=root.top-r.top+root.height/2;treeLines.innerHTML=[...treeMap.querySelectorAll('button')].map((button,i)=>{const b=button.getBoundingClientRect(),x=b.left-r.left+b.width/2,y=b.top-r.top+b.height/2;return `<path class="${i===selectedAbility?'active':''}" d="M${sx} ${sy}V${(sy+y)/2}H${x}V${y}"/>`;}).join('');}
  function selectAbility(i){selectedAbility=i;tree.querySelectorAll('button').forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));tree.querySelector('.pixel-ability-detail strong').textContent=abilities[i][0];tree.querySelector('.pixel-ability-detail p').textContent=abilities[i][1]+'. '+abilities[i][2];drawTree();}
  tree.querySelectorAll('button').forEach((button,i)=>{button.addEventListener('click',()=>selectAbility(i));button.addEventListener('focus',()=>selectAbility(i));});

  function enterPlay(){playing=true;ignoreScrollUntil=performance.now()+350;held.clear();playX=overworld.canvas.width*.18;jump=jumpSpeed=0;exploreButton.textContent='Exit exploration';exploreButton.setAttribute('aria-pressed','true');openingScene.querySelector('.pixel-touch').hidden=false;openingScene.querySelector('.pixel-controls-help').textContent='A / D or ← → to move. Space: jump. E: inspect. Esc: exit.';speech.textContent='Explore the clearing. A small keepsake waits in the chest along the trail.';questLabel.textContent='EXPLORATION';openingScene.querySelector('.pixel-title small').textContent='OPTIONAL EXPLORATION';openingScene.querySelector('.pixel-title h2').innerHTML='Forest<br>Clearing';openingScene.querySelector('.pixel-title > p').textContent='FIND THE BUILDERS NOTEBOOK';openingScene.focus({preventScroll:true});requestDraw();}
  function exitPlay(focus=true){playing=false;held.clear();jump=jumpSpeed=0;exploreButton.textContent='Explore with keyboard';exploreButton.setAttribute('aria-pressed','false');openingScene.querySelector('.pixel-touch').hidden=true;openingScene.querySelector('.pixel-controls-help').textContent='Scroll tells the story. Exploration is optional.';lastOpeningPhase=-1;update({detail:{opening}});if(focus)exploreButton.focus({preventScroll:true});}
  function leap(){if(jump===0){jumpSpeed=135;jump=.01;requestDraw();}}
  function inspect(){const chestX=overworld.canvas.width*.35;if(Math.abs(playX-chestX)<35){keepsake=true;speech.textContent='Found: the builder’s notebook. A reminder to stay curious, test ideas, and keep making.';}else if(Math.abs(playX-overworld.canvas.width*.73)<45){speech.textContent='The story opens this portal. Exit exploration and scroll to continue.';}else speech.textContent='A quiet trail through the clearing. Inspect the chest nearby, or exit and follow the scroll story.';requestDraw();}
  function keydown(event) {
    if(!playing||event.altKey||event.ctrlKey||event.metaKey)return;
    if(event.key==='Escape'){event.preventDefault();exitPlay();return;}
    if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(event.key)){exitPlay(false);return;}
    if(document.activeElement!==openingScene)return;
    const key=event.key.length===1?event.key.toLowerCase():event.key;
    if(!['ArrowLeft','ArrowRight','a','d',' ','e','Enter'].includes(key))return;
    event.preventDefault();ignoreScrollUntil=performance.now()+250;
    if(key===' ')leap();
    else if(key==='e'||key==='Enter')inspect();
    else {
      if(!event.repeat)playX=Math.max(18,Math.min(overworld.canvas.width-18,playX+(['ArrowRight','d'].includes(key)?6:-6)));
      held.add(key);
    }
    requestDraw();
  }
  function keyup(event){held.delete(event.key.length===1?event.key.toLowerCase():event.key);}
  function blurScene(){held.clear();}
  function pointerIntent(){if(playing)ignoreScrollUntil=performance.now()+350;}
  function scrollIntent(){if(playing)exitPlay(false);}
  function focusExit(event){if(playing&&!openingScene.contains(event.relatedTarget))exitPlay(false);}
  exploreButton.addEventListener('click',()=>playing?exitPlay():enterPlay());
  openingScene.querySelector('a').addEventListener('click',()=>{if(playing)exitPlay(false);});
  openingScene.querySelectorAll('[data-move]').forEach(button=>button.addEventListener('click',()=>{playX=Math.max(18,Math.min(overworld.canvas.width-18,playX+Number(button.dataset.move)*18));requestDraw();}));
  openingScene.querySelector('[data-jump]').addEventListener('click',leap);
  openingScene.querySelector('[data-interact]').addEventListener('click',inspect);
  const treeResize = new ResizeObserver(drawTree);
  function visibility(){held.clear();if(document.hidden){cancelAnimationFrame(raf);raf=0;}else requestDraw();}
  function syncLens() {
    const enabled=html.dataset.mode==='pixel';
    if(enabled===active)return;
    active=enabled;owned.forEach(el=>el.hidden=!enabled);
    if(enabled) {
      opening=0;lastOpeningPhase=-1;projectEntries.forEach(e=>e.phase=-1);resize();
      surfaces.forEach(s=>intersection.observe(s.canvas));treeResize.observe(treeMap);
      document.addEventListener('portfolio:pixel-frame',update);
      window.addEventListener('resize',resize);
      window.addEventListener('wheel',scrollIntent,{passive:true});
      window.addEventListener('touchmove',scrollIntent,{passive:true});
      openingScene.addEventListener('keydown',keydown);
      openingScene.addEventListener('keyup',keyup);
      openingScene.addEventListener('blur',blurScene);
      openingScene.addEventListener('focusout',focusExit);
      openingScene.addEventListener('pointerdown',pointerIntent);
      document.addEventListener('visibilitychange',visibility);
      selectAbility(0);update({detail:{opening:0}});
    } else {
      playing=false;held.clear();cancelAnimationFrame(raf);raf=0;
      surfaces.forEach(s=>s.visible=false);intersection.disconnect();treeResize.disconnect();
      document.removeEventListener('portfolio:pixel-frame',update);
      window.removeEventListener('resize',resize);
      window.removeEventListener('wheel',scrollIntent);
      window.removeEventListener('touchmove',scrollIntent);
      openingScene.removeEventListener('keydown',keydown);
      openingScene.removeEventListener('keyup',keyup);
      openingScene.removeEventListener('blur',blurScene);
      openingScene.removeEventListener('focusout',focusExit);
      openingScene.removeEventListener('pointerdown',pointerIntent);
      document.removeEventListener('visibilitychange',visibility);
      exploreButton.textContent='Explore with keyboard';exploreButton.setAttribute('aria-pressed','false');
      openingScene.querySelector('.pixel-touch').hidden=true;
    }
  }
  new MutationObserver(syncLens).observe(html,{attributes:true,attributeFilter:['data-mode']});
  reduced.addEventListener('change',()=>{if(active){if(playing)exitPlay(false);update({detail:{opening}});}});
  document.fonts.ready.then(()=>{if(active){selectAbility(selectedAbility);surfaces.forEach(s=>{if(s.visible)render(s,0);});requestDraw();}});
  syncLens();
})();
