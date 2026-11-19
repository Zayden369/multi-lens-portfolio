/* Original technical illustration definitions; scroll behavior is separate. */
(() => {
  const P=(d,cls='',extra='')=>`<path class="sk-stroke ${cls}" d="${d}" pathLength="1" ${extra}/>`;
  const R=(x,y,w,h,cls='',rx=0)=>`<rect class="sk-stroke ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" pathLength="1"/>`;
  const C=(x,y,r,cls='')=>`<circle class="sk-stroke ${cls}" cx="${x}" cy="${y}" r="${r}" pathLength="1"/>`;
  const T=(s,x,y,size=19,cls='')=>`<text x="${x}" y="${y}" font-size="${size}" class="sk-svg-text ${cls}">${s}</text>`;
  const I=(a,b,body,cls='')=>`<g data-ink="${a} ${b}" class="${cls}">${body}</g>`;
  const S=(body,view='0 0 900 580',cls='sk-wide')=>`<svg class="sk-art ${cls}" viewBox="${view}" aria-hidden="true" focusable="false">${body}</svg>`;
  const doc=(x,y,w=44,h=57)=>P(`M${x} ${y}h${w-13}l13 13v${h-13}h-${w}ZM${x+w-13} ${y}v13h13M${x+9} ${y+27}h${w-18}m-${w-18} 10h${w-18}m-${w-18} 10h${w-25}`,'sk-file');
  const laptop=(x,y,w=140,h=88)=>R(x,y,w,h,'',4)+P(`M${x-14} ${y+h+11}h${w+28}l-9 8H${x-5}ZM${x+w*.36} ${y+h+11}h${w*.28}`, 'sk-bold');
  const user=(x,y)=>C(x,y,17)+P(`M${x-30} ${y+52}q0-30 30-30t30 30M${x-18} ${y+26}v26m36-26v26`);
  const lock=(x,y)=>R(x,y,44,38,'sk-blue',3)+P(`M${x+8} ${y}v-15a14 14 0 0 1 28 0v15M${x+22} ${y+13}v12`,'sk-blue sk-bold');
  const db=(x,y,w=115,h=98)=>P(`M${x} ${y+16}a${w/2} 16 0 1 1 ${w} 0a${w/2} 16 0 1 1 -${w} 0M${x} ${y+16}v${h-16}a${w/2} 16 0 0 0 ${w} 0V${y+16}M${x} ${y+48}a${w/2} 16 0 0 0 ${w} 0M${x} ${y+72}a${w/2} 16 0 0 0 ${w} 0`,'sk-blue');
  const arrow=(d,x,y,dir='right',cls='sk-blue')=>P(d,cls)+P(dir==='right'?`M${x-9} ${y-5}l9 5-9 5`:dir==='down'?`M${x-5} ${y-9}l5 9 5-9`:dir==='up'?`M${x-5} ${y+9}l5-9 5 9`:`M${x+9} ${y-5}l-9 5 9 5`,cls);
  const dimension=(x,y,w,label)=>P(`M${x} ${y-10}v20m0-10h${w}m0-10v20m-${w-5}-5l-10 10m${w}-10l10 10`,'sk-construction')+T(label,x+w/2,y-12,15,'sk-center sk-light');
  const rules=(x,y,w,count=4)=>Array.from({length:count},(_,i)=>P(`M${x} ${y+i*11}h${w-(i%3)*10}`,'sk-fine')).join('');

  function sharingBody(dimensions=true){
    return I(0,.19,user(145,155)+laptop(75,225,155,100)+T('SENDER',110,367,22))+
      I(.14,.36,lock(418,178)+R(365,158,150,146,'sk-blue',8)+T('AUTHENTICATE',371,335,18,'sk-blue-text')+T('FastAPI',398,280,19))+
      I(.28,.5,arrow('M230 274H365',365,274)+arrow('M515 274H660',660,274)+db(385,405,110,76)+P('M440 304V405','sk-blue')+T('PostgreSQL',382,526,18,'sk-blue-text')+user(738,155)+laptop(660,225,155,100)+T('RECIPIENT',680,367,22))+
      I(.43,.65,P('M345 111h190M345 115v-45h190v45','sk-construction')+T('CONTROLLED LINK',353,59,18,'sk-blue-text')+T('password / expiry',348,93,16)+P('M538 182H625V155H700','sk-red')+T('view limits',637,110,17,'sk-red-text')+T('revocation',637,135,17,'sk-red-text'))+
      I(.78,.94,(dimensions?dimension(76,561,740,'APPLICATION ACCESS FLOW / CONCEPTUAL'):'')+P('M65 385h165m425 0h170','sk-construction')+T('React interface',95,414,18)+T('authorized access',666,414,17))+
      `<path class="sk-route-guide" d="M266 268H365H515H724" fill="none" stroke="none"/>`+
      `<g class="sk-transfer">${doc(-20,-27,40,54)}</g>`;
  }
  function sharingNarrow(){return I(0,.2,user(61,44)+laptop(14,91,101,63)+T('Sender',33,180,22))+I(.15,.4,lock(251,112)+T('FastAPI',235,187,22)+arrow('M115 123H233',233,123))+I(.3,.57,db(235,252,65,64)+T('Data',245,348,22)+P('M273 151V252','sk-blue')+laptop(14,244,101,63)+T('Recipient',20,338,22)+arrow('M250 205H196V279H115',115,279,'left'))+I(.47,.72,T('Link rules',16,212,22,'sk-blue-text')+T('Access limits',16,235,22,'sk-blue-text'))+I(.72,.93,doc(135,265,35,48));}
  function sharing(){return S(sharingBody())+S(sharingNarrow(),'0 0 340 370','sk-narrow');}

  function opening(){
    const tools=P('M31 90L72 84 157 674 117 680ZM42 116l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3m-19 25l22-3','sk-tool')+P('M1070 108l18-5 102 469-7 40-22-34ZM1075 108l100 470m-14 0l22-6M1183 612l-8-17','sk-tool');
    return S(`${tools}<rect class="sk-sheet-shadow" x="101" y="43" width="990" height="672" rx="3"/><rect class="sk-sheet-fill" x="89" y="30" width="990" height="672" rx="3"/>${P('M165 50V680M110 225H1056','sk-construction')}${Array.from({length:10},(_,i)=>P(`M87 ${70+i*62}q-16-12-16 0t16 0`,'sk-binding')).join('')}${I(.02,.25,P('M412 434H516','sk-blue sk-bold'))}<g class="sk-opening-drawing" transform="translate(235 223) scale(.77)">${sharingBody(false)}</g>`,'0 0 1200 760')+S(`${R(4,4,332,366,'sk-construction')}${sharingNarrow()}`,'0 0 340 375','sk-narrow');
  }

  function compiler(){
    const wire=R(67,70,764,435,'sk-construction',3)+R(88,93,160,390,'sk-blue')+R(269,94,539,60,'sk-blue')+R(269,178,258,153,'sk-blue')+R(548,178,260,153,'sk-blue')+R(269,351,539,132,'sk-blue')+T('READING ROOM',104,132,18)+T('Overview',104,193,18)+T('Library',104,240,18)+T('Notes',104,287,18)+T('Your next chapter.',290,134,25)+P('M289 295l40-58 40 15 40-31 50 16 45-40','sk-blue')+T('progress',573,224,19)+rules(572,250,180,5)+rules(290,381,470,5);
    const schema=I(.16,.4,doc(97,192,85,109)+T('INTENT',98,345,21)+arrow('M183 245H274',274,245)+R(274,159,280,208,'sk-blue',3)+T('UI schema',299,203,22)+T('data models',299,246,22)+T('API config',299,289,22)+T('cross-layer checks',299,332,18)+arrow('M554 245H644',644,245)+R(644,175,150,144,'',3)+T('REACT',680,220,23)+T('RUNTIME',664,258,23));
    const validation=I(.4,.61,R(258,402,406,94,'sk-red',3)+T('progress: "72"',282,437,23,'sk-red-text')+P('M282 443h191','sk-red')+T('number: 72',468,474,23,'sk-blue-text')+P('M624 427l10 12 20-26','sk-blue sk-bold')+T('typed, checked, repaired',267,536,18,'sk-annotation'));
    return S(`<g class="sk-wireframe">${I(0,.22,wire)}</g><g class="sk-schema">${schema}${validation}</g><g class="sk-wire-final">${wire}</g>`)+S(`<g class="sk-wireframe">${I(0,.24,R(12,30,316,275,'sk-blue',3)+R(25,49,290,42,'sk-blue')+R(25,109,136,98)+R(177,109,138,98)+R(25,224,290,64)+T('Reading room',40,77,23)+P('M37 185l25-29 27 7 26-26 30 14','sk-blue')+rules(190,130,100,5))}</g><g class="sk-schema">${I(.17,.4,doc(20,36,45,60)+T('Intent',84,72,22)+arrow('M47 96V126',47,126,'down')+R(20,126,300,110,'sk-blue',3)+T('UI / Data / API',44,162,23)+T('Validated configuration',44,206,18)+arrow('M170 236V267',170,267,'down')+T('React runtime',75,303,24))}${I(.4,.62,T('progress: "72"',36,337,20,'sk-red-text')+P('M35 341h157','sk-red')+T('→ 72',218,337,20,'sk-blue-text'))}</g><g class="sk-wire-final">${R(12,30,316,275,'sk-blue')}</g>`,'0 0 340 370','sk-narrow');
  }

  const polar=(cx,cy,rx,ry,a)=>[cx+Math.cos(a)*rx,cy+Math.sin(a)*ry];
  function stadiumPlan(cx,cy,rx,ry){
    let blocks='',tier='',ribs='';
    for(let i=0;i<24;i++){
      if(i%6===0)continue;
      const a=i/24*Math.PI*2+.028,b=(i+1)/24*Math.PI*2-.028;
      const pts=[polar(cx,cy,rx,ry,a),polar(cx,cy,rx,ry,b),polar(cx,cy,rx*.69,ry*.64,b),polar(cx,cy,rx*.69,ry*.64,a)];
      blocks+=P('M'+pts.map(p=>p.map(n=>n.toFixed(1)).join(' ')).join('L')+'Z','sk-blue');
      for(let k=1;k<5;k++){
        const q=1-k*.06,r=1-k*.07,p1=polar(cx,cy,rx*q,ry*r,a),p2=polar(cx,cy,rx*q,ry*r,b);
        tier+=P(`M${p1}L${p2}`,'sk-fine');
      }
      const p1=polar(cx,cy,rx*1.06,ry*1.06,a),p2=polar(cx,cy,rx*1.13,ry*1.13,a);ribs+=P(`M${p1}L${p2}`,'sk-construction');
    }
    return {blocks,tier,ribs};
  }
  function stadium(){
    const {blocks,tier,ribs}=stadiumPlan(430,267,306,170),s=stadiumPlan(170,165,144,89);
    const field=P('M315 195H545V339H315ZM430 195V339M315 231H347V303H315M545 231H513V303H545M307 247H315V287H307M545 247H553V287H545','sk-blue')+C(430,267,28,'sk-blue');
    return S(I(0,.18,P('M99 267C99 23 761 23 761 267S99 511 99 267Z','sk-bold')+dimension(100,52,661,'ARCHITECTURAL CONCEPT / NOT TO SCALE'))+I(.13,.4,blocks+tier+ribs+field+T('NORTH',390,80,18)+T('SOUTH ACCESS',365,475,18))+I(.35,.59,arrow('M83 440H142V287H247',247,287)+T('ENTRY A',40,471,18,'sk-blue-text')+P('M61 421v-29h70','sk-construction'))+I(.5,.72,P('M281 91L317 82 331 142 298 152Z','sk-red sk-bold')+P('M301 90L260 34H119','sk-red')+T('ASSISTANCE ZONE',119,25,18,'sk-red-text'))+I(.64,.86,P('M822 440H721V267H630','sk-blue sk-dashed sk-bold')+C(810,467,16,'sk-blue')+P('M807 446v26h20m-20-13h16l10 26','sk-blue')+T('ACCESSIBLE ROUTE',619,517,18,'sk-blue-text'))+I(.81,.97,P('M140 552H535M160 551v-39h80l60 28h210M186 512v39m54-39v39m60-11v11m83-11v11m83-11v11','sk-fine')+T('STAND SECTION',600,559,18,'sk-light')))+S(I(0,.2,P('M8 165C8 15 332 15 332 165S8 315 8 165Z','sk-bold'))+I(.14,.42,s.blocks+s.tier+P('M111 125H229V205H111ZM170 125V205M111 146H128V184H111M229 146H212V184H229','sk-blue')+C(170,165,18,'sk-blue'))+I(.35,.62,arrow('M22 323H33V193H87',87,193)+T('Entry A',10,349,18,'sk-blue-text'))+I(.49,.73,P('M99 72L125 62 135 98 113 105Z','sk-red sk-bold')+T('Assistance',19,25,18,'sk-red-text'))+I(.65,.94,P('M320 323H307V182H255','sk-blue sk-dashed sk-bold')+T('Accessible',217,349,18,'sk-blue-text')),'0 0 340 370','sk-narrow');
  }

  function simulation(){
    const plot=(x,y,size)=>R(x,y,size,size,'sk-blue')+P(`M${x} ${y}A${size} ${size} 0 0 1 ${x+size} ${y+size}M${x} ${y+size}h${size+13}m-${size+13} 0v-${size+13}`,'sk-blue')+T('0',x-18,y+size+22,18)+T('1',x+size-6,y+size+22,18);
    return S(I(0,.18,T('How can random points estimate π?',80,59,29,'sk-annotation')+T('area(circle) / area(square)',508,146,23,'sk-blue-text'))+I(.12,.35,plot(80,112,340)+T('x² + y² ≤ 1',135,500,24,'sk-blue-text'))+`<g class="sk-sampling"><path class="sk-sample-hits"/><path class="sk-sample-misses"/></g>`+I(.32,.6,T('Count the points inside.',508,192,22)+P('M513 223h257','sk-fine')+T('π ≈ 4 × inside / total',508,259,25,'sk-blue-text'))+I(.59,.84,P('M514 333V465H811','sk-blue')+T('CONVERGENCE',515,316,19,'sk-blue-text')+T('sample count',642,503,18))+`<path class="sk-convergence"/>`+I(.83,.98,P('M497 533Q645 541 815 531','sk-red')+T('An estimate, not a proof.',520,562,22,'sk-annotation')))+S(I(0,.19,T('Estimate π with points.',18,26,23,'sk-annotation'))+I(.12,.36,plot(37,53,220)+T('x² + y² ≤ 1',73,312,21,'sk-blue-text'))+`<g class="sk-sampling"><path class="sk-sample-hits"/><path class="sk-sample-misses"/></g>`+I(.57,.85,P('M38 352V420H309','sk-blue'))+`<path class="sk-convergence"/>`,'0 0 340 440','sk-narrow');
  }

  function collaboration(index){
    const variants=[
      I(0,.23,doc(55,122,152,186)+T('BATS + Go',74,355,23)+T('combined report',48,391,18))+
      I(.2,.57,arrow('M207 211H320',320,211)+P('M320 151H529L462 230V291L399 320V230Z','sk-blue')+T('project = mesheryctl',317,94,20,'sk-blue-text')+T('framework = bats',317,124,20,'sk-blue-text'))+
      I(.49,.9,arrow('M529 211H672',672,211)+doc(672,122,150,186)+T('BATS E2E',681,355,23,'sk-blue-text')+T('dedicated report',667,391,18)+P('M130 427H747','sk-construction')+T('Existing combined report is preserved.',194,474,24,'sk-annotation')),
      I(0,.31,doc(70,94,170,237)+T('AGENT',92,214,22)+T('QUICKSTART',92,252,22))+
      I(.22,.59,arrow('M240 211H354',354,211)+P('M355 125l-13 13 13 13m18-26l13 13-13 13','sk-blue')+T('Setup',369,210,23)+T('Run',369,258,23)+T('Contribute',369,306,23)+P('M357 228h160M357 277h160','sk-fine'))+
      I(.51,.9,arrow('M532 211H659',659,211)+doc(659,99,171,236)+T('workflow',681,234,24)+T('DOCS',701,377,20,'sk-blue-text')+T('Lower the cost of the next contribution.',151,480,26,'sk-annotation')),
      I(0,.3,R(45,112,205,208)+P('M65 290l55-65 35 27 49-89 31 40','sk-fine')+P('M83 136l21 22m0-22l-21 22','sk-red')+T('preview issue',48,366,22))+
      I(.23,.59,arrow('M250 220H343',343,220)+R(343,153,222,128,'sk-blue')+T('metadata',365,198,23)+T('image path',365,244,23))+
      I(.51,.9,arrow('M565 220H656',656,220)+R(656,112,194,208,'sk-blue')+P('M680 287l51-68 37 22 58-64','sk-blue')+P('M684 151l13 15 24-31','sk-blue sk-bold')+T('validate',695,366,22,'sk-blue-text')+T('Fix the cause. Catch the recurrence.',164,480,26,'sk-annotation'))
    ];
    const narrow=[
      I(0,.25,doc(25,30,85,102)+T('BATS + Go',135,80,22))+I(.21,.58,arrow('M69 142V178',69,178,'down')+R(25,178,285,76,'sk-blue')+T('mesheryctl / bats filter',42,222,20))+I(.51,.94,arrow('M69 254V292',69,292,'down')+doc(25,292,85,102)+T('BATS E2E',135,340,22,'sk-blue-text')+T('Combined kept',135,374,17)),
      I(0,.28,doc(25,30,85,102)+T('Quickstart',135,80,22))+I(.23,.6,arrow('M69 142V178',69,178,'down')+T('Setup / Run / Contribute',25,222,21,'sk-blue-text'))+I(.51,.94,arrow('M69 254V292',69,292,'down')+doc(25,292,85,102)+T('Workflow docs',130,340,20)),
      I(0,.28,R(25,30,85,102)+P('M40 62l30 32m0-32l-30 32','sk-red')+T('Preview issue',130,80,20))+I(.23,.6,arrow('M69 142V178',69,178,'down')+T('Metadata + image path',25,222,21,'sk-blue-text'))+I(.51,.94,arrow('M69 254V292',69,292,'down')+R(25,292,85,102,'sk-blue')+P('M45 340l15 15 29-35','sk-blue sk-bold')+T('Validation',135,340,22))
    ];
    return S(variants[index])+S(narrow[index],'0 0 340 420','sk-narrow');
  }

  function mini(i,x=0,y=0){
    const bodies=[
      P('M15 100Q77 75 140 100V237Q78 212 15 237ZM140 100Q203 75 265 100V237Q202 212 140 237ZM140 100V237','sk-blue')+rules(33,123,80,7)+rules(161,123,80,7)+P('M44 53L140 12 235 53 140 94ZM91 75v28q48 30 96 0V75M235 53v76','sk-bold'),
      laptop(23,100,234,150)+doc(63,132,55,77)+lock(169,165)+P('M11 274H270M50 280v35m185-35v35','sk-blue'),
      R(25,57,228,219)+T('DATA → MODEL',44,94,21,'sk-blue-text')+P('M49 227V121m0 106h183M70 217v-34h25v34m15 0v-64h25v64m15 0v-91h25v91m15 0v-51h25v51','sk-blue')+T('logistic regression',28,314,19),
      doc(34,27,207,246)+T('BATS',68,154,30,'sk-blue-text')+P('M67 187l12 12 26-30m-38 62l12 12 26-30M124 188h79m-79 44h79','sk-blue')+T('TEST / DOCS / QUALITY',10,319,18),
      R(33,42,215,244)+R(47,57,187,214,'sk-fine')+T('TOP',101,125,28)+T('5',108,206,66,'sk-blue-text')+P('M83 225q-40-40-22-83m137 83q39-40 21-83','sk-blue')+T('RECOGNITION',54,322,21)
    ];return `<g transform="translate(${x} ${y})">${bodies[i]}</g>`;
  }
  function timeline(){
    const track=P('M60 410C150 410 155 445 250 445S345 410 440 410 535 445 630 445 735 410 840 410','sk-blue sk-career-line');
    return S(`${Array.from({length:5},(_,i)=>`<g class="sk-career-mini" data-mini="${i}" transform="translate(285 8) scale(1.07)">${mini(i)}</g>`).join('')}${track}${[60,250,440,630,840].map((x,i)=>C(x,i%2?445:410,8,'sk-blue')+T(['LEARN','BUILD','ANALYZE','CONTRIBUTE','GROW'][i],x,493,17,'sk-center')).join('')}<g class="sk-pencil-tip">${P('M-5-40h10v29L0 0-5-11ZM-5-11H5','sk-bold')}</g>`,'0 0 900 530')+S(`${Array.from({length:5},(_,i)=>`<g class="sk-career-mini" data-mini="${i}" transform="translate(72 0) scale(.7)">${mini(i)}</g>`).join('')}${P('M20 255C58 255 48 280 95 280S127 255 170 255 207 280 245 280 285 255 320 255','sk-blue sk-career-line')}${[20,95,170,245,320].map((x,i)=>C(x,i%2?280:255,5,'sk-blue')).join('')}<g class="sk-pencil-tip">${P('M-4-26h8v18L0 0-4-8ZM-4-8H4','sk-bold')}</g>`,'0 0 340 300','sk-narrow');
  }

  function skills(){
    const node=(i,a,b,body)=>`<g class="sk-domain" data-domain="${i}">${I(a,b,body)}</g>`;
    return S(node(0,0,.25,laptop(50,235,200,133)+T('FRONTEND',72,421,22))+node(1,.15,.42,R(340,212,206,176,'sk-blue')+P('M370 252l-16 16 16 16m142-32l16 16-16 16M417 246l-19 55','sk-blue')+T('BACKEND / API',354,346,20)+arrow('M250 293H340',340,293))+node(2,.28,.55,db(672,245,150,125)+T('DATABASES',675,421,22)+arrow('M546 293H672',672,293))+node(3,.4,.68,R(346,39,196,94,'sk-blue',4)+T('STRUCTURED AI',359,95,21)+arrow('M443 212V133',443,133,'up'))+node(4,.5,.8,P('M25 188V13H856V466H570','sk-construction')+T('DOCKER / AWS / CI',58,73,21,'sk-blue-text'))+node(5,.65,.94,P('M257 478H613V548H257Z','sk-red')+P('M277 509l11 12 24-25','sk-blue sk-bold')+T('TESTS / VALIDATION',328,523,22)+P('M443 388V478','sk-blue')))+S(node(0,0,.25,laptop(20,42,116,75)+T('Frontend',24,145,18))+node(1,.15,.42,R(197,35,120,90,'sk-blue')+T('API',238,85,24)+arrow('M136 80H197',197,80))+node(2,.28,.55,db(214,212,92,78)+T('Databases',208,325,18)+arrow('M257 125V212',257,212,'down'))+node(3,.4,.68,R(20,213,116,78,'sk-blue')+T('AI',63,260,24)+arrow('M214 248H136',136,248,'left'))+node(4,.5,.8,P('M7 171H333V350H7Z','sk-construction')+T('Delivery / Cloud',34,385,21,'sk-blue-text'))+node(5,.65,.94,P('M12 418H326M35 443l10 11 23-24','sk-blue')+T('Tests / Validation',85,451,20)),'0 0 340 480','sk-narrow');
  }

  function awards(){return S(I(0,.4,C(145,126,99,'sk-blue')+C(145,126,88,'sk-fine')+T('TOP 5',87,135,34,'sk-blue-text')+T('INTERNSHIP',77,171,17)+P('M75 203l-9 60 77-39 76 39-7-60','sk-blue'))+I(.18,.65,P('M332 247V58h218','sk-blue')+P('M348 75L399 106 431 165 464 181 530 217','sk-blue sk-bold')+C(431,165,7,'sk-red')+T('525',395,277,34,'sk-blue-text')+T('AMONG 80,000+',350,311,17))+I(.4,.94,R(614,39,240,221)+R(626,51,216,197,'sk-fine')+T('SIH',698,119,39,'sk-blue-text')+T('INTERNAL',674,159,20)+T('SELECTION',667,193,20)+P('M646 224h61m24 0h89','sk-fine')),'0 0 900 350')+S(I(0,.4,C(57,58,44,'sk-blue')+T('TOP 5',26,66,20,'sk-blue-text'))+I(.2,.65,P('M128 28V91h86M138 41l29 13 20 28','sk-blue')+T('525',147,117,22))+I(.4,.94,R(242,17,86,87)+T('SIH',263,60,22,'sk-blue-text')+T('INTERNAL',248,86,12)),'0 0 340 135','sk-narrow');}
  function finale(){const s=stadiumPlan(460,180,155,91);return S(I(0,.33,laptop(40,140,215,144)+doc(85,170,48,68)+lock(176,196))+I(.18,.55,s.blocks+P('M400 143H520V218H400ZM460 143V218','sk-blue')+C(460,180,19,'sk-blue'))+I(.35,.76,R(695,98,150,150,'sk-blue')+P('M695 98A150 150 0 0 1 845 248','sk-blue')+T('π ≈ 4 × in / n',658,291,24,'sk-blue-text'))+I(.58,.97,P('M58 340C161 386 254 312 358 350S550 381 648 347 756 349 842 347','sk-blue sk-bold')+T('A question. A sketch. Something that works.',172,425,28,'sk-annotation')),'0 0 900 470')+S(I(0,.45,laptop(11,45,128,85)+doc(42,62,34,45))+I(.22,.73,P('M187 87C187 15 329 15 329 87S187 159 187 87Z','sk-blue')+R(218,65,80,44,'sk-blue')+P('M258 65v44','sk-blue'))+I(.5,.96,P('M19 183Q120 215 180 183T325 183','sk-blue sk-bold')),'0 0 340 230','sk-narrow');}

  window.SketchbookIllustrations=Object.freeze({opening,sharing,compiler,stadium,simulation,collaboration,timeline,skills,awards,finale});
})();
