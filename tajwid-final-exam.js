(function(){
'use strict';
const esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const style=String.raw;
const css=[
'.t4e{max-width:1100px;margin:auto;color:#282c51}.t4e *{box-sizing:border-box}.t4e button{font:inherit;cursor:pointer}',
'.t4e-hero{border-radius:24px;padding:24px;background:linear-gradient(120deg,#6250bd,#a566d7 50%,#f298b6,#ffbd77);color:#fff;display:flex;justify-content:space-between;gap:12px;align-items:center}.t4e-hero h1{font-size:clamp(1.5rem,4vw,2.5rem);margin:6px 0}.t4e-hero p{margin:5px 0}.t4e-hero .emoji{font-size:3rem}',
'.t4e-card,.t4e-panel{border-radius:20px;background:#fff;border:1px solid #e9ddf5;padding:20px;margin:14px 0;box-shadow:0 7px 19px #5b419019}.t4e-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:15px}.t4e-card{background:linear-gradient(135deg,#f8edff,#e7f6ff)}.t4e-card:nth-child(2){background:linear-gradient(130deg,#fff5d2,#ffe6ed)}.t4e-card:nth-child(3){background:linear-gradient(135deg,#e7fff0,#ece7ff)}.t4e-card .emoji{font-size:2.5rem}',
'.t4e small,.t4e .muted{color:#71748b}.t4e-btn{border:0;border-radius:12px;background:#7d4dc4;color:#fff;padding:11px 15px;min-height:44px;font-weight:850}.t4e-btn.alt{background:#eee7ff;color:#6543a0}.t4e-btn.go{background:#169779}.t4e-btn:disabled{opacity:.5}.t4e-actions{display:flex;flex-wrap:wrap;gap:9px;margin:15px 0}',
'.t4e-top{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin:15px 0}.t4e-tag{background:#eae4ff;color:#6245a5;font-weight:850;border-radius:30px;padding:8px 12px;font-size:.84rem}.t4e-clock{background:#32365f;color:white;border-radius:12px;padding:10px 15px;font-weight:900;font-variant-numeric:tabular-nums}.t4e-clock.urgent{background:#b5324b}.t4e-bar{height:10px;background:#eee7f5;border-radius:20px;overflow:hidden}.t4e-bar div{height:100%;background:linear-gradient(90deg,#9559d5,#38c0a0)}',
'.t4e-layout{display:grid;grid-template-columns:minmax(0,1fr) 240px;gap:15px}.t4e-options{display:grid;gap:10px}.t4e-option{background:#fff;border:2px solid #d8c6e9;color:#4f3e7c;border-radius:15px;min-height:61px;padding:12px;text-align:left;font-weight:800;display:flex;align-items:center;gap:10px}.t4e-option.sel{background:#dacdff;border-color:#7647bc}.t4e-option b{background:#ebe3f7;color:#69499f;border-radius:10px;padding:9px 12px;font-size:1rem}.t4e-question{direction:rtl;text-align:right;font-family:"Noto Naskh Arabic","Noto Sans Arabic",serif;font-size:clamp(2.15rem,2.9vw,2.45rem);line-height:1.85;font-weight:850;margin:18px 0}.t4e-option span{font-family:"Noto Naskh Arabic","Noto Sans Arabic",serif;direction:rtl;text-align:right;font-size:clamp(2.15rem,2.9vw,2.45rem);line-height:1.85;overflow-wrap:anywhere}',
'.t4e-palette{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.t4e-palette button{border:1px solid #c8b4e4;border-radius:9px;background:#f7f0ff;color:#654b94;aspect-ratio:1;font-weight:800}.t4e-palette button.done{background:#c7f7db;border-color:#2cac80;color:#146549}.t4e-palette button.now{outline:3px solid #8c6add}.t4e-notice{background:#fffae3;padding:12px;border-radius:12px;color:#695b66;margin-top:12px}',
'.t4e-result{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.t4e-result div{text-align:center;background:#f1ebff;padding:16px;border-radius:15px}.t4e-result b{display:block;font-size:1.9rem;color:#7547c5}.t4e-units{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px}.t4e-units div{background:#f6f0ff;border-radius:12px;padding:12px}.t4e-review{background:#fff;border:1px solid #e4dcf1;border-radius:14px;padding:15px;margin:10px 0}.t4e-review.wrong{border-color:#e39ca7;background:#fff1f2}.t4e-review.correct{border-color:#99dcbc;background:#f0fff8}',
'@media(max-width:800px){.t4e-cards{grid-template-columns:1fr}.t4e-layout{grid-template-columns:1fr}.t4e-palette{grid-template-columns:repeat(10,1fr)}.t4e-card,.t4e-panel{padding:14px}}@media(max-width:500px){.t4e-question,.t4e-option span{font-size:2rem}.t4e-palette{grid-template-columns:repeat(5,1fr)}.t4e-hero{padding:15px}.t4e-hero .emoji{font-size:2rem}.t4e-actions button{flex:1}.t4e-option{padding:9px;font-size:.86rem}}'
].join('');
if(!document.getElementById('t4e-css')){const st=document.createElement('style');st.id='t4e-css';st.textContent=css;document.head.appendChild(st);}
async function mount(ctx){
 const el=ctx.container,api=ctx.rpc,admin=ctx.profile.role==='admin';
 let catalog=[],mode='catalog',attempt=null,items=[],answers={},pos=0,report=null,expanded=false,notice='',busy=false,interval=null,deadline=0;
 const btn=(t,act,cls='')=>'<button type="button" class="t4e-btn '+cls+'" data-action="'+act+'">'+t+'</button>';
 const clock=()=>{const rem=Math.max(0,Math.ceil((deadline-Date.now())/1000));return String(Math.floor(rem/60)).padStart(2,'0')+':'+String(rem%60).padStart(2,'0');};
 function stop(){if(interval){clearInterval(interval);interval=null;}}
 function runClock(){if(interval)return;interval=setInterval(()=>{
  const rem=Math.max(0,Math.ceil((deadline-Date.now())/1000));const node=el.querySelector('#t4e-time');
  if(node){node.textContent='⏱ '+clock();node.classList.toggle('urgent',rem<=300);}
  if(rem===0){stop();if(mode==='paper'&&attempt)finish(true);}
 },1000);}
 const hero=()=>'<div class="t4e-hero"><div><b>🏆 FINAL EXAM · TAJWID TAHUN 4</b><h1>Cabaran Akhir!</h1><p>6 Pelajaran · 3 Set · 50 Soalan · 1 Jam</p></div><span class="emoji">📚</span></div>';
 function home(){
  return '<div class="t4e-panel"><h2>📌 Panduan Peperiksaan</h2><p>Jawab 50 soalan dari Pelajaran 3, 5, 8, 9, 10 dan 11 dalam masa 60 minit. Masa sebenar dikira oleh pelayan dan tidak berhenti walaupun kamu keluar atau refresh halaman.</p><p class="muted">Jawapan disimpan setiap kali ditekan. Jawapan dan penerangan yang betul hanya dipaparkan selepas peperiksaan dihantar.</p></div>'+
  '<div class="t4e-cards">'+catalog.map(s=>'<div class="t4e-card"><div class="emoji">'+['🥇','🥈','🥉'][s.id-10]+'</div><h2>'+esc(s.title)+'</h2><p>⏱ 60 minit · 📝 50 soalan</p><p class="muted">'+(s.attempts?'Sudah siap '+s.attempts+' kali · Markah terbaik '+s.best+'/50':'Belum dicuba')+'</p>'+btn(s.attempts?'Buka / Cuba Lagi':'🚀 Mula Exam','start:'+s.id)+'</div>').join('')+'</div>';
 }
 function paper(){
  if(!attempt||!items.length)return '<div class="t4e-panel">Tiada soalan.</div>';
  const q=items[pos],picked=answers[q.id],answered=Object.keys(answers).length;
  return '<div class="t4e-top"><div class="t4e-tag">📄 Set '+(attempt.setId-9)+' · Soalan '+(pos+1)+'/50</div><div class="t4e-clock" id="t4e-time">⏱ '+clock()+'</div></div><div class="t4e-bar"><div style="width:'+Math.round(answered*2)+'%"></div></div>'+
  '<div class="t4e-layout"><div class="t4e-panel"><div class="t4e-tag">'+esc(q.unit==='tajwid_t4_final'?'Integrasi':'Pelajaran '+String(q.unit).split('_p').pop())+' · '+esc(q.difficulty)+'</div><div class="t4e-question">'+esc(q.question)+'</div><div class="t4e-options">'+q.options.map((o,i)=>'<button type="button" class="t4e-option '+(picked===i?'sel':'')+'" data-choice="'+i+'" '+(busy?'disabled':'')+'><b>'+['A','B','C','D'][i]+'</b><span>'+esc(o)+(picked===i?' ✅':'')+'</span></button>').join('')+'</div><div class="t4e-actions">'+(pos?btn('← Sebelum','prev','alt'):'')+btn(pos===49?'✓ Semak Kertas':'Seterusnya →','next','go')+'</div>'+(notice?'<div class="t4e-notice" role="status">'+esc(notice)+'</div>':'')+'</div>'+
  '<div class="t4e-panel"><h3>🧩 Peta Soalan</h3><p>'+answered+'/50 dijawab</p><div class="t4e-palette">'+items.map((x,i)=>'<button data-jump="'+i+'" class="'+(answers[x.id]!==undefined?'done ':'')+(pos===i?'now':'')+'">'+(i+1)+'</button>').join('')+'</div><div class="t4e-actions">'+btn('📤 Hantar Kertas','submit')+'</div><p class="muted">Masa akan terus berjalan.</p></div></div>';
 }
 function result(){
  if(!report)return '<div class="t4e-panel">Keputusan tidak tersedia.</div>';
  const score=report.score||0,rev=report.review||[];
  return '<div class="t4e-panel" style="text-align:center"><div style="font-size:3rem">🏆</div><h2>Keputusan Set '+(report.setId-9)+'</h2><div class="t4e-result"><div><b>'+score+'/50</b><small>Markah</small></div><div><b>'+Math.round(score*2)+'%</b><small>Peratus</small></div><div><b>'+(50-score)+'</b><small>Perlu Ulang Kaji</small></div></div><h3>Keputusan Mengikut Pelajaran</h3><div class="t4e-units">'+(report.breakdown||[]).map(x=>'<div><b>'+esc(x.unit==='tajwid_t4_final'?'Integrasi':'Pelajaran '+String(x.unit).split('_p').pop())+'</b> · '+x.correct+'/'+x.total+'</div>').join('')+'</div><div class="t4e-actions" style="justify-content:center">'+btn(expanded?'Tutup Semakan':'📋 Semak Jawapan','review','alt')+btn('🔄 Cuba Lagi','retake')+btn('🏠 Semua Set','home','go')+'</div></div>'+
  (expanded?rev.map((r,i)=>'<div class="t4e-review '+(r.correct?'correct':'wrong')+'"><b>#'+(i+1)+' · '+esc(r.unit==='tajwid_t4_final'?'Integrasi':'Pelajaran '+r.unit.split('_p').pop())+' '+(r.correct?'✅':'❌')+'</b><h3>'+esc(r.question)+'</h3><p>Jawapan kamu: '+(r.selected===null?'Tidak dijawab':esc(r.options[Number(r.selected)]))+'</p><p><b>Jawapan betul:</b> '+esc(r.options[r.answerIndex])+'</p><p class="muted">'+esc(r.explanation)+' (m/s '+esc(r.page)+')</p></div>').join(''):'');
 }
 function draw(){el.innerHTML='<div class="t4e">'+hero()+(mode==='catalog'?home():mode==='paper'?paper():result())+'</div>';if(mode==='paper')runClock();}
 async function goHome(){stop();el.innerHTML='<div class="t4e-panel">⏳ Memuatkan set peperiksaan…</div>';catalog=(await api('learning_exam_catalog',{})).filter(s=>s.id>=10&&s.id<=12);mode='catalog';draw();}
 async function start(s,newAttempt=false){
  stop();el.innerHTML='<div class="t4e-panel">⏳ Memuatkan 50 soalan…</div>';
  const data=await api('learning_exam_start',{p_set_id:s,p_new:newAttempt});
  if(data.status==='completed'){report=await api('learning_exam_submit',{p_attempt_id:data.attemptId});expanded=false;attempt=null;mode='result';draw();return;}
  if(data.status!=='active'||data.questions?.length!==50)throw Error('Kertas tidak lengkap');
  attempt=data;items=data.questions;answers=data.answers||{};pos=0;notice='';mode='paper';deadline=Date.now()+(data.secondsLeft||0)*1000;draw();
 }
 async function choose(i){
  if(busy||!attempt)return;busy=true;const q=items[pos];notice='⏳ Menyimpan…';draw();
  try{const response=await api('learning_exam_save',{p_attempt_id:attempt.attemptId,p_question_id:q.id,p_selected_index:i});
   if(response.expired){busy=false;await finish(true);return;}
   if(!response.saved)throw Error('Jawapan gagal disimpan');
   answers[q.id]=i;notice='✅ Jawapan disimpan.';
  }catch(e){notice='⚠️ '+(e.message||'Cuba lagi');}
  finally{busy=false;if(mode==='paper')draw();}
 }
 async function finish(auto=false){
  if(!attempt||busy)return;
  if(!auto&&typeof window.confirm==='function'&&!window.confirm('Hantar peperiksaan sekarang? Jawapan tidak boleh diubah.'))return;
  busy=true;stop();const id=attempt.attemptId;el.innerHTML='<div class="t4e-panel">⏳ Memeriksa kertas…</div>';
  try{report=await api('learning_exam_submit',{p_attempt_id:id});attempt=null;mode='result';expanded=false;draw();}
  catch(e){notice='⚠️ Gagal menghantar: '+(e.message||String(e));mode='paper';draw();}
  finally{busy=false;}
 }
 el.addEventListener('click',async ev=>{
  const b=ev.target.closest('button');if(!b||!el.contains(b)||busy)return;
  try{
   if(b.dataset.choice!==undefined){await choose(Number(b.dataset.choice));return;}
   if(b.dataset.jump!==undefined){pos=Number(b.dataset.jump);notice='';draw();return;}
   const a=b.dataset.action||'';
   if(a==='home'){await goHome();return;}
   if(a.startsWith('start:')){await start(Number(a.split(':')[1]));return;}
   if(a==='prev'){pos=Math.max(0,pos-1);notice='';draw();return;}
   if(a==='next'){pos=Math.min(49,pos+1);notice='';draw();return;}
   if(a==='submit'){await finish();return;}
   if(a==='review'){expanded=!expanded;draw();return;}
   if(a==='retake'&&report?.setId){await start(report.setId,true);return;}
  }catch(e){console.error('Tajwid Final Exam',e);el.innerHTML='<div class="t4e-panel"><h2>Maaf, ralat peperiksaan</h2><p>'+esc(e.message||String(e))+'</p>'+btn('Cuba Lagi','home')+'</div>';}
 });
 window.__tajwidExamStop=stop;
 try{
  if(admin){el.innerHTML='<div class="t4e">'+hero()+'<div class="t4e-panel"><h2>Admin Preview</h2><p>Kertas hanya untuk pelajar Tahun 4. Gunakan akaun pelajar untuk ujian sebenar.</p></div></div>';return;}
  await goHome();
 }catch(e){el.innerHTML='<div class="t4e-panel"><h2>Peperiksaan belum tersedia</h2><p>'+esc(e.message||String(e))+'</p></div>';}
}
window.PKSK_TAJWID_FINAL_EXAM={mount};
})();