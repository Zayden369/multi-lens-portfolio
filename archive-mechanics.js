/* Pure mechanical and numerical helpers shared by the archive and its tests. */
(() => {
 const clamp=p=>Math.max(0,Math.min(1,p));
 const ramp=(p,a,b)=>clamp((p-a)/(b-a));
 const smooth=p=>p*p*(3-2*p);
 const meshAngle=(angle,driverTeeth,drivenTeeth)=>-angle*driverTeeth/drivenTeeth;
 function opening(p){p=clamp(p);return {drive:360*smooth(ramp(p,.08,.4)),pins:smooth(ramp(p,.3,.48)),doors:smooth(ramp(p,.43,.67)),approach:smooth(ramp(p,.62,.9)),drawer:smooth(ramp(p,.87,.97)),pendulum:Math.sin(ramp(p,.08,.38)*Math.PI*4)*9*(1-ramp(p,.3,.5))};}
 function makeSamples(count=2000,seed=3619){let inside=0;return Array.from({length:count},(_,i)=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;const x=seed/4294967296;seed=(Math.imul(seed,1664525)+1013904223)>>>0;const y=seed/4294967296,hit=x*x+y*y<=1;if(hit)inside++;return {x,y,hit,inside,estimate:4*inside/(i+1)};});}
 function gearPath(radius,teeth){let d='';for(let i=0;i<teeth;i++)for(let k=0;k<4;k++){const angle=(i+(k+.2)/4)/teeth*Math.PI*2,r=k===1||k===2?radius+3:radius-3;d+=(d?'L':'M')+(Math.cos(angle)*r).toFixed(3)+' '+(Math.sin(angle)*r).toFixed(3);}return d+'Z';}
 window.ArchiveMechanics=Object.freeze({clamp,ramp,smooth,meshAngle,opening,makeSamples,gearPath});
})();
