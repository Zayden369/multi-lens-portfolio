/* Original dependency scheduler and deterministic motion helpers. No reference source reused. */
(() => {
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => value * value * (3 - 2 * value);
  const range = (value, from, to) => clamp((value - from) / (to - from));
  class TaskGraph {
    constructor(tasks) {
      this.tasks = tasks.map((task, priority) => ({priority, state:'waiting', progress:0, started:0, ...task}));
      this.index = new Map(this.tasks.map(task => [task.id, task]));
      if (this.index.size !== this.tasks.length) throw Error('Duplicate swarm task');
      const visiting = new Set(), visited = new Set();
      const visit = task => {
        if (visiting.has(task.id)) throw Error('Cyclic swarm dependencies');
        if (visited.has(task.id)) return;
        visiting.add(task.id);
        for (const id of task.dependencies || []) {
          if (!this.index.has(id)) throw Error('Missing swarm dependency: '+id);
          visit(this.index.get(id));
        }
        visiting.delete(task.id); visited.add(task.id);
      };
      this.tasks.forEach(visit);
    }
    reset() { this.tasks.forEach(task => { task.state='waiting'; task.progress=0; task.started=0; task.agent=null; }); }
    ready(group) {
      return this.tasks.filter(task => task.group===group && task.state==='waiting' &&
        (task.dependencies || []).every(id => this.index.get(id).state==='done')).sort((a,b)=>a.priority-b.priority);
    }
    start(task, time, agent) { if (!this.ready(task.group).includes(task)) return false; task.state='running';task.started=time;task.agent=agent;return true; }
    update(time, render, complete) {
      for (const task of this.tasks) if (task.state==='running') {
        task.progress=clamp((time-task.started)/task.duration);
        render(task,task.progress);
        if (task.progress===1) { task.state='done';complete(task); }
      }
    }
    completeGroup(group) { return this.tasks.filter(task=>task.group===group).every(task=>task.state==='done'); }
    finish() { this.tasks.forEach(task=>{task.state='done';task.progress=1;task.agent=null;}); }
  }
  function trajectory(from,to,p,bend=0) {
    const t=ease(clamp(p)),dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy)||1,bow=Math.sin(t*Math.PI)*bend;
    return {x:from.x+dx*t-dy/length*bow,y:from.y+dy*t+dx/length*bow};
  }
  function samples(count=480) {
    let seed=86203,inside=0;
    return Array.from({length:count},(_,i)=>{
      seed=(Math.imul(seed,1664525)+1013904223)>>>0; const x=seed/4294967296;
      seed=(Math.imul(seed,1664525)+1013904223)>>>0; const y=seed/4294967296;
      const hit=x*x+y*y<=1; inside+=hit?1:0;
      return {x,y,hit,inside,estimate:4*inside/(i+1)};
    });
  }
  window.SwarmCore=Object.freeze({clamp,ease,range,TaskGraph,trajectory,samples});
})();
