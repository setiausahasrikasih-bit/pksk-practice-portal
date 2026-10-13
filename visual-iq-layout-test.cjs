// Run with: node visual-iq-layout-test.cjs
// Zero external dependencies. Guards the SVG geometry and parsing mistakes seen in V1.
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const window = {};
const renderer = fs.readFileSync('visual-iq.js','utf8');
vm.runInNewContext(renderer,{window}, {timeout:1000});
const visual = window.PKSK_VISUAL_IQ;
assert.equal(typeof visual?.paint,'function','SVG renderer must be available');

const samples = [
 {kind:'grid', left:'101010101',right:'011001100'},
 {kind:'cells', mask:'111001100'},
 {kind:'boxes', rows:[[13,59,189],[25,47,297],[74,15,'?']]},
 {kind:'diamonds',items:[[8,12,8,12],[9,12,18,24],[12,15,16,20],['?',12,8,16]]},
 {kind:'arrows',angles:[270,0,90,'?']},
 {kind:'sequence',shapes:['pentagon','pentagon','triangle','circle','circle','?']},
 {kind:'odd',shapes:['square','square','triangle','square']}
];

function props(attrs){
 return Object.fromEntries([...attrs.matchAll(/([a-z-]+)="([^"]+)"/g)].map(m=>[m[1],m[2]]));
}
function bounds(svg){
 const view=svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
 assert.ok(view,'Each visual must declare its SVG drawing bounds');
 const w=+view[1],h=+view[2],errors=[];
 const verify=(x,y,x2,y2,label)=>{
  if([x,y,x2,y2].some(v=>!Number.isFinite(v))||x<-.5||y<-.5||x2>w+.5||y2>h+.5)
   errors.push({label,x,y,x2,y2,w,h});
 };
 for(const [,attrs] of svg.matchAll(/<rect\s+([^>]+?)\/>/g)){
  const p=props(attrs);const x=+p.x,y=+p.y;
  verify(x,y,x+(+p.width),y+(+p.height),'rectangle');
 }
 for(const [,pts] of svg.matchAll(/<polygon points="([^"]+)"/g)){
  for(const part of pts.trim().split(/\s+/)){
   const [x,y]=part.split(',').map(Number);verify(x,y,x,y,'polygon vertex');
  }
 }
 for(const [,attrs] of svg.matchAll(/<circle\s+([^>]+?)\/>/g)){
  const p=props(attrs),x=+p.cx,y=+p.cy,r=+p.r;
  verify(x-r,y-r,x+r,y+r,'circle');
 }
 for(const [,attrs] of svg.matchAll(/<text\s+([^>]+?)>/g)){
  const p=props(attrs),x=+p.x,y=+p.y,size=Number(p['font-size']||19);
  // Text labels are placed inside their drawing box, including font ascent/descent.
  verify(x,y-size,x,y+size,'label');
 }
 return {w,h,errors};
}
for(const sample of samples){
 const svg=visual.paint(sample),check=bounds(svg);
 assert.ok(svg.startsWith('<svg'),sample.kind+' must return SVG');
 assert.deepEqual(check.errors,[],sample.kind+' must have zero clipped elements');
 assert.ok(check.w<=500,sample.kind+' must remain responsive to small screens');
 if(sample.kind==='sequence'||sample.kind==='odd'){
  const cards=(svg.match(/fill="#faf9ff"/g)||[]).length;
  assert.equal(cards,sample.kind==='sequence'?6:4,'The entire shape sequence must be displayed');
  const rows=[...svg.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="94" height="86"/g)]
    .map(m=>[+m[1],+m[2]]);
  assert.ok(new Set(rows.map(x=>x[1])).size===2,'Shapes must use two balanced rows');
 }
 for(const viewport of [280,320,375,414,768,1200]){
  const scaled=Math.min(viewport,check.w),height=check.h*scaled/check.w;
  assert.ok(scaled<=viewport && height>40,sample.kind+' must fit '+viewport+'px without horizontal overflow');
 }
}

const page=fs.readFileSync('visual-iq.html','utf8');
assert.ok(page.includes('<script src="/visual-iq.js"></script>'),'Practice page must load renderer');
assert.ok(page.includes('.diagram{width:100%;max-width:100%;min-width:0;overflow-x:hidden'),
 'Diagram area must not overflow mobile content width');
assert.ok(page.includes('function answerDiagram(o)'),'Visual options must be supported');
const start=page.indexOf('function diagram(q){'),end=page.indexOf('function answerDiagram(o){',start);
assert.ok(start!==-1 && end>start,'Question diagram parser must exist');
const context={window:{PKSK_VISUAL_IQ:visual}};
vm.runInNewContext(page.slice(start,end)+';this.diagram=diagram;',context,{timeout:1000});
const prompts=[
 ['grid','[Siri 1] Petak A: ■□□ / ■□□ / □■□. Petak B: □■□ / ■□□ / □□□.'],
 ['boxes','[Siri 3] [13 | 59] → 189; [25 | 47] → 297; [74 | 15] → ?. Cari pola nombor kotak.'],
 ['diamonds','[Siri 2] Berlian [2,3 / 6,9]; [8,6 / 4,3]; [10,5 / 4,2]; [6,? / 3,5].'],
 ['arrows','[Siri 7] Pola arah: ← | ↑ | → | ?. Anak panah berputar mengikut arah jam.'],
 ['sequence','[Siri 4] Susunan bentuk: ⬟ ⬟ ▲ ● ● ?. Bentuk seterusnya?'],
 ['odd','[Siri 8] Pilihan bentuk: A ■ B ■ C ▲ D ■. Yang manakah tidak sama?']
];
for(const [kind,text] of prompts){
 const svg=context.diagram({prompt_ms:text});
 assert.ok(svg.includes('viewBox='),'Parser must produce a diagram for '+kind);
 assert.deepEqual(bounds(svg).errors,[],'Parsed diagram must fit canvas: '+kind);
}
const newArrow=context.diagram({prompt_ms:'Pola arah: ← | ↑ | → | ?'});
assert.ok(newArrow.includes('rotate(270)')&&newArrow.includes('rotate(0)')&&newArrow.includes('rotate(90)'),
 'All three known arrow directions must be displayed');
console.log('Visual IQ layout regression: PASS — all 7 SVG types, 6 parsed questions, 6 viewport sizes.');
