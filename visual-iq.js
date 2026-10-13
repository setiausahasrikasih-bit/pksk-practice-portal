/* PKSK Pro Visual IQ V1 — declarative, text-only SVG renderer. No remote images or HTML from question data. */
(function(){
'use strict';
const E = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const N = v => Math.max(-9999,Math.min(9999,Number.isFinite(Number(v)) ? Number(v) : 0));
const TXT = (x,y,t,size=19) => '<text x="'+x+'" y="'+y+'" text-anchor="middle" dominant-baseline="middle" font-size="'+size+'" font-family="system-ui, sans-serif" font-weight="700" fill="#24354b">'+E(t)+'</text>';
const RECT = (x,y,w,h,fill='#fff',stroke='#8294a8')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.8"/>';
function grid(mask,x,y,side=24){
  const bits=String(mask||'').replace(/[^01]/g,'').padEnd(9,'0').slice(0,9);
  let out='';
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){
    out+='<rect x="'+(x+c*side)+'" y="'+(y+r*side)+'" width="'+side+'" height="'+side+'" fill="'+(bits[r*3+c]==='1'?'#8063da':'#fff')+'" stroke="#44556a" stroke-width="1.5"/>';
  }
  return out;
}
function shape(kind,cx,cy,size=19){
  const stroke=' stroke="#6042ad" stroke-width="3" fill="#e3d8ff" stroke-linejoin="round" ';
  if(kind==='circle')return '<circle cx="'+cx+'" cy="'+cy+'" r="'+size+'"'+stroke+'/>';
  if(kind==='square')return '<rect x="'+(cx-size)+'" y="'+(cy-size)+'" width="'+size*2+'" height="'+size*2+'" rx="3"'+stroke+'/>';
  const sides=kind==='triangle'?3:kind==='pentagon'?5:kind==='hexagon'?6:kind==='star'?10:4;
  let ps=[];
  for(let i=0;i<sides;i++){const a=-Math.PI/2+i*2*Math.PI/sides;const radius=kind==='star'&&i%2?size*.46:size;ps.push((cx+radius*Math.cos(a)).toFixed(1)+','+(cy+radius*Math.sin(a)).toFixed(1));}
  return '<polygon points="'+ps.join(' ')+'"'+stroke+'/>';
}
function diamond(a,cx,cy){
  const p=Array.isArray(a)?a:['?','?','?','?'];let s='<polygon points="'+cx+','+(cy-60)+' '+(cx+67)+','+cy+' '+cx+','+(cy+60)+' '+(cx-67)+','+cy+'" fill="#fff9ff" stroke="#aa3f67" stroke-width="2.5"/>';
  s+='<path d="M '+cx+' '+(cy-60)+' V '+(cy+60)+' M '+(cx-67)+' '+cy+' H '+(cx+67)+'" stroke="#aa3f67" stroke-width="2"/>';
  [[cx-32,cy-26],[cx+32,cy-26],[cx-32,cy+28],[cx+32,cy+28]].forEach((pt,i)=>s+=TXT(pt[0],pt[1],p[i],20));return s;
}
function boxes(items){
  let s='';
  (Array.isArray(items)?items:[]).slice(0,3).forEach((a,i)=>{
    const x=12+i*150,y=16;s+=RECT(x,y,135,130,'#faf8ff','#7d6ea5');
    s+='<path d="M '+(x+67.5)+' '+y+' V '+(y+57)+' M '+x+' '+(y+57)+' H '+(x+135)+'" stroke="#7d6ea5" stroke-width="2"/>';
    s+=TXT(x+34,y+31,a[0],20)+TXT(x+100,y+31,a[1],20)+TXT(x+68,y+96,a[2],24);
  });return s;
}
function arrows(angles){
  let s='';
  (Array.isArray(angles)?angles:[]).slice(0,4).forEach((a,i)=>{
    const x=55+i*105,y=85;s+=RECT(x-43,y-52,86,104,'#faf9ff','#d9cafa');
    if(a==='?'||a==null){s+=TXT(x,y,'?',35);return;}
    const angle=N(a);s+='<g transform="translate('+x+' '+y+') rotate('+angle+')"><path d="M 0 -37 L 24 -8 H 9 V 32 H -9 V -8 H -24 Z" fill="#8063da" stroke="#5438a3" stroke-width="2"/></g>';
  });return s;
}
function shapeRow(spec,odd=false){
 let s='';const arr=Array.isArray(spec)?spec:[];const start=odd?66:43,step=odd?107:83,cy=odd?84:77;
 arr.slice(0,odd?4:6).forEach((kind,i)=>{
   const x=start+step*i;s+=RECT(x-34,cy-37,68,75,'#faf9ff','#ded3f0');
   if(kind==='?')s+=TXT(x,cy,'?',34);else s+=shape(String(kind),x,cy,22);
   if(odd)s+=TXT(x,cy+54,String.fromCharCode(65+i),15);
 });return s;
}
function paint(d){
 if(!d||typeof d!=='object')throw Error('Invalid diagram');
 let body='',w=470,h=168;
 switch(d.kind){
 case 'grid':w=455;h=128;body=grid(d.left,12,21,27)+TXT(123,62,'−',26)+grid(d.right,150,21,27)+TXT(262,62,'=',26)+RECT(294,16,143,95,'#faf9ff','#cebee9')+TXT(366,65,'?',43);break;
 case 'cells':w=105;h=105;body=grid(d.mask,12,11,27);break;
 case 'boxes':body=boxes(d.rows);w=470;h=162;break;
 case 'diamonds':w=468;h=325;(d.items||[]).slice(0,4).forEach((a,i)=>body+=diamond(a,114+(i%2)*235,78+Math.floor(i/2)*166));break;
 case 'arrows':body=arrows(d.angles);w=445;h=170;break;
 case 'sequence':body=shapeRow(d.shapes);w=467;h=158;break;
 case 'odd':body=shapeRow(d.shapes,true);w=457;h=166;break;
 default:throw Error('Unsupported diagram');
 }
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Rajah IQ visual" style="display:block;max-width:100%;width:min(100%,'+w+'px);height:auto;margin:10px auto 14px;background:white;border:1px solid #e5def0;border-radius:12px;padding:6px">'+body+'</svg>';
}
function renderText(value){
  const text=String(value||'');const re=/\\[\\[VIQ:([\\s\\S]*?)\\]\\]/g;let out='',last=0,m;
  while((m=re.exec(text))!==null){out+=E(text.slice(last,m.index));try{out+=paint(JSON.parse(m[1]));}catch(e){out+='<span class="muted">Rajah tidak tersedia</span>';}last=re.lastIndex;}
  return out+E(text.slice(last));
}
window.PKSK_VISUAL_IQ={renderText,paint};
})();
