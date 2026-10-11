(function(){
'use strict';
const U='sejarah_t4_u4',esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=x=>{const a=[...x];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const css=[
'.u4{max-width:1080px;margin:auto;color:#302b52;font-family:inherit}.u4 *{box-sizing:border-box}.u4 button{font:inherit;cursor:pointer;touch-action:manipulation}',
'.u4-hero{border-radius:26px;padding:26px;background:linear-gradient(115deg,#6448bd,#c969b7,#f5a061);color:white;display:flex;justify-content:space-between;align-items:center;gap:10px}.u4-hero h1{font-size:clamp(1.6rem,4vw,2.5rem);margin:7px 0}.u4-hero p{margin:5px 0}.u4-hero .mascot{font-size:4rem;animation:u4b 2.5s infinite}',
'.u4-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:15px 0}.u4-stat{text-align:center;background:#fff;border:1px solid #eadcf4;border-radius:16px;padding:12px}.u4-stat b{display:block;color:#7d4ac1;font-size:1.55rem}.u4-stat small{font-size:.77rem;color:#71718b}',
'.u4-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.u4-card,.u4-panel{background:#fff;border:1px solid #e9dff0;border-radius:22px;padding:20px;margin-bottom:14px;box-shadow:0 6px 23px #5442720d}.u4-card{position:relative;overflow:hidden}.u4-card:before{content:"";position:absolute;top:0;left:0;right:0;height:7px;background:linear-gradient(90deg,#8e5ad5,#ffb860)}.u4-card h3{margin:5px 0}.u4-card p,.u4-muted{color:#70748a;line-height:1.55}',
'.u4-chip{display:inline-block;background:#eee7ff;color:#68449c;border-radius:40px;padding:7px 12px;font-size:.8rem;font-weight:850}.u4-actions{display:flex;flex-wrap:wrap;gap:9px;margin:15px 0 0}.u4-btn{border:0;border-radius:13px;padding:11px 14px;min-height:44px;color:white;background:#7950c4;font-weight:850;box-shadow:0 4px 0 #513485}.u4-btn.light{background:#efe9ff;color:#5f389a;box-shadow:0 4px 0 #d4c6f3}.u4-btn.green{background:#149574;box-shadow:0 4px 0 #0f6b55}.u4-btn.orange{background:#e88e39;box-shadow:0 4px 0 #bf6c1f}.u4-btn:disabled{opacity:.48;box-shadow:none}',
'.u4-bar{background:#f0e9f8;height:11px;border-radius:40px;overflow:hidden;margin:14px 0}.u4-bar>div{height:100%;background:linear-gradient(90deg,#a36be1,#42c5af);transition:width .2s}',
'.u4-scene{background:linear-gradient(135deg,#d3efff,#f6e4ff 58%,#fff0c4);border:2px dashed #bb9edb;border-radius:24px;padding:20px;position:relative}.u4-scene h2{margin:7px 0}.u4-question{text-align:center;background:#ffffff7d;border-radius:20px;padding:17px;font-size:1.24rem;font-weight:800;line-height:1.5}.u4-emoji{font-size:2.5rem;text-align:center}',
'.u4-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:13px 0}.u4-option{color:#583d8d;background:white;border:3px solid #d7c1e9;border-radius:17px;min-height:89px;padding:12px;font-weight:850;line-height:1.45;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px}.u4-option:disabled{opacity:1;cursor:default}.u4-option.ok,.u4-pin.ok,.u4-slot.ok,.u4-year.ok{background:#c6f8da;border-color:#20a978;color:#0e6044}.u4-option.bad,.u4-pin.bad,.u4-slot.bad,.u4-year.bad{background:#ffd8da;border-color:#d44f63;color:#87283c}',
'.u4-feedback{background:#fff9e1;border:1px solid #edce80;border-radius:15px;padding:14px;margin-top:13px;line-height:1.6;color:#524467}.u4-feedback strong{display:block}.u4-map{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px;border-radius:20px;background:linear-gradient(110deg,#d9f6d8 0 46%,#bbe9ff 47% 54%,#d9f6d8 55% 100%)}.u4-pin{background:#fffdf7;border:2px solid #9ac7af;border-radius:15px;min-height:110px;padding:8px 4px;font-size:.79rem;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;font-weight:850;color:#366373}.u4-pin span{font-size:2rem}',
'.u4-line{display:flex;gap:8px;overflow-x:auto;margin:12px 0}.u4-point{flex:1;min-width:105px;background:#c9f6dc;border:1px solid #84dbb1;border-radius:12px;padding:11px;text-align:center;font-size:.83rem}.u4-point b{display:block;color:#197e55}.u4-years{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.u4-year{background:white;border:3px solid #d6beee;border-radius:15px;padding:11px 5px;min-height:112px;font-weight:850;color:#603a96;font-size:.83rem}.u4-year b{display:block;font-size:1.35rem;color:#df763b}.u4-year.used{background:#d7f9e8;border-color:#40bb93;opacity:.7}',
'.u4-tree{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:13px 0}.u4-slot{background:#fff;border:2px dashed #ad91d7;border-radius:15px;padding:10px 5px;min-height:122px;color:#5b427f;font-size:.84rem}.u4-slot.top{grid-column:1/4;max-width:310px;width:100%;margin:auto}.u4-slot small{display:block;color:#7b7790;font-size:.75rem;margin-top:5px}.u4-tokens{display:flex;gap:8px;flex-wrap:wrap}.u4-token{background:#fff;border:2px solid #b79bdc;border-radius:12px;padding:10px;color:#60399a;font-weight:800}.u4-token.selected{background:#7b51be;color:#fff}.u4-token.used{display:none}',
'.u4-flash{background:linear-gradient(145deg,#fff0bd,#ffe2eb,#e7dcff);border-radius:22px;text-align:center;min-height:230px;padding:23px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px}.u4-flash h3{margin:0;line-height:1.5}.u4-answer{font-weight:750;line-height:1.7}.u4-win{text-align:center;padding:25px;border-radius:22px;background:linear-gradient(120deg,#ffe5b0,#ffcce5,#ded5ff);position:relative}.u4-win .trophy{font-size:4rem;animation:u4b 2s infinite}.u4-spark{position:absolute;pointer-events:none;font-size:1.6rem;animation:u4up 1.1s forwards}',
'@keyframes u4b{50%{transform:translateY(-9px) rotate(5deg)}}@keyframes u4up{to{transform:translate(50px,-140px) rotate(55deg);opacity:0}}',
'@media(max-width:640px){.u4-grid{grid-template-columns:1fr}.u4-hero{padding:17px}.u4-hero .mascot{font-size:2.8rem}.u4-card,.u4-panel{padding:15px}.u4-scene{padding:11px}.u4-stats{gap:5px}.u4-stat{padding:8px}.u4-stat b{font-size:1.15rem}.u4-stat small{font-size:.66rem}.u4-options{gap:7px}.u4-option{min-height:105px;padding:8px;font-size:.83rem}.u4-pin{font-size:.72rem;min-height:108px}.u4-map{gap:5px;padding:6px}.u4-year{font-size:.74rem}.u4-years,.u4-tree{gap:5px}.u4-slot{min-height:135px}}'
].join('');
if(!document.getElementById('sq4styles')){const st=document.createElement('style');st.id='sq4styles';st.textContent=css;document.head.appendChild(st);}
async function mount(ctx){
 const learnerName=esc(ctx.profile.display_nickname||ctx.profile.display_name||'Pelajar');
 const root=ctx.container,admin=ctx.profile.role==='admin',rest=(p,o)=>ctx.authedJson('/rest/v1/'+p,o||{method:'GET'}),rpc=(n,a)=>ctx.rpc(n,a);
 let student=ctx.profile.user_id,M=[],G=[],Q=[],A=[],P=[],view='home',mission=1,card=0,reveal=false,g={},quiz=[],qi=0,qResult=null,qBusy=false,score=0,label='',message='',busy=false;
 const btn=(t,a,cls='')=>'<button class="u4-btn '+cls+'" data-action="'+a+'">'+t+'</button>';
 const m=()=>M.find(x=>x.n===mission),game=()=>G.find(x=>x.n===mission),completed=()=>P.filter(x=>x.completed).length,stars=()=>P.reduce((n,x)=>n+Number(x.stars||0),0);
 const mastered=()=>{const latest=new Map();for(const a of A)if(!latest.has(a.question_id))latest.set(a.question_id,a.is_correct);return [...latest.values()].filter(Boolean).length;};
 const nav=()=>'<div class="u4-actions" style="margin:0 0 15px">'+btn('🏠 Semua Misi','home','light')+(!admin?btn('🔁 Latihan Salah','revision','light')+btn('🏆 Boss Tempat Tinggal','boss','orange'):'')+'</div>';
 const bar=(n,t)=>'<div class="u4-bar"><div style="width:'+Math.round(t?n/t*100:0)+'%"></div></div>';
 function top(){return '<div class="u4-hero"><div><span class="u4-chip">✨ TEMPAT TINGGAL QUEST • UNIT 4</span><h1>Sejarah Tempat Tinggal</h1><p>Jelajah Miri, Johor Bahru dan Ranau. Temui tokoh dan khazanah kawasan!</p></div><div class="mascot">🏘️</div></div><div class="u4-stats"><div class="u4-stat"><b>'+completed()+'/6</b><small>Misi siap</small></div><div class="u4-stat"><b>'+mastered()+'/'+Q.length+'</b><small>Soalan dikuasai</small></div><div class="u4-stat"><b>⭐ '+stars()+'</b><small>Bintang</small></div></div>';}
 function home(){return '<div class="u4-panel"><h2>Hai, '+(admin?'Ibu / Ayah':learnerName)+'! 👋</h2><p>Jom jadi penjelajah tempat tinggal! Nota mudah, tujuh permainan interaktif dan 36 soalan berpandukan buku teks m/s 44–57.</p><p class="u4-muted">🗺️ Miri, Johor Bahru dan Ranau ialah <b>contoh daripada buku teks</b>, bukan alamat peribadi kamu. Peta permainan ialah ilustrasi, bukan laluan atau peta berskala.</p></div>'+
 '<div class="u4-grid">'+M.map(x=>{const p=P.find(z=>z.mission===x.n);return '<div class="u4-card"><div style="font-size:2.5rem">'+esc(x.icon)+'</div><h3>Misi '+x.n+': '+esc(x.title)+'</h3><p>'+esc(x.subtitle)+'</p><span class="u4-chip">'+(p?.completed?'✅ Selesai · ⭐ '+p.stars:'🚀 Belum selesai')+'</span><div class="u4-actions"><button class="u4-btn light" data-action="notes" data-m="'+x.n+'">📖 Nota</button><button class="u4-btn orange" data-action="game" data-m="'+x.n+'">🎮 Main!</button>'+(!admin?'<button class="u4-btn green" data-action="quiz" data-m="'+x.n+'">✍️ Latihan</button>':'')+'</div></div>';}).join('')+'</div><div class="u4-panel" style="margin-top:17px"><h3>🗝️ BONUS — Peti Warisan</h3><p>Cari enam kunci emas untuk membuka harta warisan tempat tinggal!</p>'+btn('🔑 Mula Cabaran Bonus','bonus','orange')+'</div>'+(admin?adminStats():'');}
 function adminStats(){return '<div class="u4-panel"><h3>📊 Prestasi Pelajar</h3>'+M.map(x=>{const ids=new Set(Q.filter(q=>q.mission===x.n).map(q=>q.id)),aa=A.filter(a=>ids.has(a.question_id));return '<p>Misi '+x.n+': '+aa.length+' jawapan · '+(aa.length?Math.round(aa.filter(a=>a.is_correct).length/aa.length*100)+'% betul':'Belum cuba')+'</p>';}).join('')+'</div>';}
 function note(){const x=m().cards[card];return nav()+'<div class="u4-panel"><span class="u4-chip">📖 Misi '+mission+' · Kad '+(card+1)+'/'+m().cards.length+' · m/s '+esc(x.page)+'</span>'+bar(card+1,m().cards.length)+'<div class="u4-flash"><div class="u4-emoji">'+esc(m().icon)+'</div><h3>'+esc(x.q)+'</h3>'+(reveal?'<div class="u4-answer">'+esc(x.a)+'</div><div class="u4-feedback">💡 '+esc(x.tip)+'</div>':'<p class="u4-muted">Teka jawapan, kemudian ketuk Buka Jawapan!</p>')+'</div><div class="u4-actions">'+(card?btn('← Sebelum','prev','light'):'')+btn(reveal?'🙈 Tutup':'👀 Buka Jawapan','flip')+(card<m().cards.length-1?btn('Kad seterusnya →','next','green'):btn('🎮 Jom Main','game','orange'))+'</div></div>';}
 function start(n){mission=n;const x=game();g={i:0,choice:null,feedback:null,wrong:0,selected:null,placed:new Set(),trail:[],won:false};if(x.type==='timeline')g.shuffled=shuffle(x.events.map((a,i)=>({a,i})));if(x.type==='build')g.tokens=shuffle(x.slots.map((a,i)=>({a,i})));view='game';message='';draw();}
 function total(){const x=game();return x.type==='timeline'?x.events.length:x.type==='build'?x.slots.length:x.steps.length;}
 function resultBox(){const f=g.feedback;return (f?'<div class="u4-feedback" role="status"><strong>'+(f.ok?'🌟 Betul!':'💡 Belum tepat — pilihan benar berwarna hijau')+'</strong>'+esc(f.info)+'</div><div class="u4-actions">'+btn(f.ok?(g.i===total()-1?'🏆 Selesaikan Misi':'➡️ Seterusnya'):'🔄 Cuba Lagi',f.ok?'advance':'retry',f.ok?'green':'light')+'</div>':message?'<div class="u4-feedback" role="status">'+esc(message)+'</div>':'');}
 function opt(x,i){const f=g.feedback,cls=f?(i===f.correct?'ok':i===f.chosen&&!f.ok?'bad':''):'';return '<button class="u4-option '+cls+'" data-pick="'+i+'" '+(f?'disabled':'')+'>'+esc(x)+(cls?'<strong>'+(cls==='ok'?'✅ Betul':'❌ Pilihan kamu')+'</strong>':'')+'</button>';}
 function gamePage(){
  const x=game();if(g.won)return nav()+victory();
  let inner='';
  if(x.type==='clue'||x.type==='treasure'){
   const z=x.steps[g.i];inner='<div class="u4-question"><div class="u4-emoji">'+esc(z[5])+'</div>'+esc(z[0])+'</div><div class="u4-options">'+z[1].map((q,i)=>opt(q,i)).join('')+'</div>';
  }else if(x.type==='map'){
   const z=x.steps[g.i];inner='<div class="u4-question">🧭 '+esc(z[0])+'</div><div class="u4-map">'+x.landmarks.map((a,i)=>{const f=g.feedback,cls=f?(i===f.correct?'ok':i===f.chosen&&!f.ok?'bad':''):'';return '<button class="u4-pin '+cls+'" data-pick="'+i+'" '+(f?'disabled':'')+'><span>'+esc(a[0])+'</span>'+esc(a[1])+(cls?'<strong>'+(cls==='ok'?'✅':'❌')+'</strong>':'')+'</button>';}).join('')+'</div><p class="u4-muted">📍 Miri • Johor Bahru • Ranau · papan lokasi ilustrasi, bukan berskala</p>';
  }else if(x.type==='timeline'){
   inner='<h3>🛤️ Garis masa kamu</h3><div class="u4-line">'+g.trail.map(i=>'<div class="u4-point"><b>'+esc(x.events[i][0])+'</b>'+esc(x.events[i][1])+'</div>').join('')+(g.trail.length?'':'<span class="u4-chip">Pilih tahun paling awal</span>')+'</div><h3>🚀 Pilih kapsul masa berikutnya</h3><div class="u4-years">'+g.shuffled.map(z=>{const f=g.feedback,cl=g.placed.has(z.i)?'used':f?(z.i===f.correct?'ok':z.i===f.chosen&&!f.ok?'bad':''):'';return '<button class="u4-year '+cl+'" data-pick="'+z.i+'" '+(g.placed.has(z.i)||f?'disabled':'')+'><b>'+esc(z.a[0])+'</b>'+esc(z.a[1])+'</button>';}).join('')+'</div>';
  }else if(x.type==='build'){
   inner='<h3 style="text-align:center">🦸 Galeri Tokoh Setempat</h3><div class="u4-tree">'+x.slots.map((z,i)=>{const f=g.feedback,cl=g.placed.has(i)?'ok':f&&i===f.chosen&&!f.ok?'bad':f&&i===f.correct?'ok':'';return '<button class="u4-slot '+(i===0?'top ':'')+cl+'" data-slot="'+i+'" '+(f||g.placed.has(i)?'disabled':'')+'><div style="font-size:1.8rem">'+(g.placed.has(i)?esc(z[0]):'❔')+'</div><b>'+(g.placed.has(i)?esc(z[1]):'Siapakah saya?')+'</b><small>'+esc(z[2])+'</small></button>';}).join('')+'</div><h3>🧩 Pilih tokoh dan ketuk petak sumbangan</h3><div class="u4-tokens">'+g.tokens.map(z=>'<button class="u4-token '+(g.selected===z.i?'selected':'')+' '+(g.placed.has(z.i)?'used':'')+'" data-token="'+z.i+'" '+(g.feedback?'disabled':'')+'>'+esc(z.a[0])+' '+esc(z.a[1])+'</button>').join('')+'</div>';
  }
  let reference=x.type==='timeline'?'36–37':x.type==='build'?'40':x.type==='map'?x.steps[g.i][3]:x.steps[g.i][4];
  return nav()+'<div class="u4-panel"><span class="u4-chip">'+esc(x.name)+' · '+(g.i+1)+'/'+total()+'</span><h2>'+esc(x.intro)+'</h2>'+bar(g.i,total())+'<div class="u4-scene">'+inner+'</div>'+resultBox()+'<p class="u4-muted" style="font-size:.81rem">📚 Rujukan buku teks m/s '+esc(reference)+' · Tiada pemasa. Jawapan kekal sehingga tekan Seterusnya.</p></div>';
 }
 function victory(){let n=g.wrong===0?3:g.wrong<=2?2:1;return '<div class="u4-win u4-stage"><div class="trophy">🏆</div><h2>Tahniah, '+learnerName+'!</h2><p>'+esc(game().name)+' berjaya diselesaikan!</p><h2>⭐ '+n+' bintang!</h2><div class="u4-actions" style="justify-content:center">'+btn('🔄 Main Lagi','game','orange')+(!admin&&mission<=6?btn('📝 Latihan Misi','quiz','green'):'')+btn('🏠 Semua Misi','home','light')+'</div>'+(message?'<p>'+esc(message)+'</p>':'')+'</div>';}
 async function win(){
  if(g.won)return;g.won=true;
  if(!admin&&mission<=6){
   const n=g.wrong===0?3:g.wrong<=2?2:1,old=P.find(p=>p.mission===mission),row={student_id:student,unit_code:U,mission,completed:true,stars:Math.max(n,old?.stars||0),updated_at:new Date().toISOString()};
   try{await rest('learning_mission_progress?on_conflict=student_id,unit_code,mission',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(row)});P=P.filter(p=>p.mission!==mission);P.push(row);}catch(e){message='⚠️ Bintang belum tersimpan: '+(e.message||String(e));}
  }
  draw();const stage=root.querySelector('.u4-stage');if(stage&&document.createElement){for(let i=0;i<12;i++){const e=document.createElement('span');e.className='u4-spark';e.textContent=['⭐','🎉','✨','💛'][i%4];e.style.left=(5+Math.random()*85)+'%';e.style.top=(30+Math.random()*25)+'%';stage.appendChild(e);setTimeout(()=>e.remove(),1600);}}
 }
 async function choose(choice,slot=null){
  if(g.feedback||g.won)return;const x=game();let correct,info,chosen=choice;
  if(x.type==='clue'||x.type==='treasure'){let z=x.steps[g.i];correct=z[2];info=z[3];}
  else if(x.type==='map'){let z=x.steps[g.i];correct=z[1];info=z[2];}
  else if(x.type==='timeline'){correct=g.i;info=x.events[correct][0]+' — '+x.events[correct][1]+' ialah peristiwa seterusnya.';}
  else if(x.type==='build'){
   if(g.selected===null){message='Pilih kad tokoh dahulu!';draw();return;}
   chosen=slot;correct=g.selected;info='Kad '+x.slots[g.selected][1]+' perlu dipadankan dengan sumbangan yang betul.';
  }else return;
  const ok=chosen===correct;if(!ok)g.wrong++;
  g.feedback={chosen,correct,ok,info};message='';draw();
 }
 async function advance(){
  if(!g.feedback?.ok)return;const type=game().type;
  if(type==='timeline'){g.placed.add(g.i);g.trail.push(g.i);}
  if(type==='build'){g.placed.add(g.feedback.correct);g.selected=null;}
  g.feedback=null;g.i++;
  if(g.i===total())return win();
  draw();
 }
 function quizStart(items,title){quiz=shuffle(items);qi=0;qResult=null;qBusy=false;score=0;label=title;message='';view='quiz';draw();}
 function quizPage(){
  if(!quiz.length)return nav()+'<div class="u4-panel"><h2>🌟 Tiada kesilapan lagi!</h2><p>Teruskan ke misi lain.</p></div>';
  if(qi>=quiz.length)return nav()+'<div class="u4-win"><div class="trophy">🏆</div><h2>Latihan Tamat!</h2><h1>'+score+'/'+quiz.length+'</h1><p>'+Math.round(100*score/quiz.length)+'% · '+esc(label)+'</p>'+btn('🏠 Semua Misi','home')+'</div>';
  const q=quiz[qi];
  return nav()+'<div class="u4-panel"><span class="u4-chip">✍️ '+esc(label)+' · '+(qi+1)+'/'+quiz.length+' · '+esc(q.difficulty)+'</span>'+bar(qi,quiz.length)+'<h2>'+esc(q.question)+'</h2><div class="u4-options">'+q.options.map((text,i)=>{const cls=qResult?(i===qResult.answer_index?'ok':i===qResult.chosen&&!qResult.correct?'bad':''):'';return '<button class="u4-option '+cls+'" data-answer="'+i+'" '+(qResult||qBusy?'disabled':'')+'>'+['A','B','C','D'][i]+'. '+esc(text)+(cls?'<strong>'+(cls==='ok'?'✅ Betul':'❌ Pilihan kamu')+'</strong>':'')+'</button>';}).join('')+'</div>'+
   (qResult?'<div class="u4-feedback" role="status"><strong>'+(qResult.correct?'🌟 Tepat!':'💡 Jom fahamkan!')+'</strong>'+esc(qResult.explanation)+'<small style="display:block">📚 Buku teks m/s '+esc(qResult.page)+'</small></div><div class="u4-actions">'+btn(qi===quiz.length-1?'🏆 Lihat markah':'➡️ Seterusnya','nextQuestion','green')+'</div>':'')+
   (qBusy?'<div class="u4-feedback">⏳ Menyimpan jawapan…</div>':'')+(message?'<div class="u4-feedback">'+esc(message)+'</div>':'')+'</div>';
 }
 async function submit(choice){if(qResult||qBusy||admin)return;qBusy=true;message='';draw();
  try{const q=quiz[qi],r=await rpc('learning_submit_answer',{p_unit_code:U,p_question_id:q.id,p_selected_index:choice});qResult={...r,chosen:choice};if(qResult.correct)score++;A.unshift({question_id:q.id,is_correct:!!r.correct,answered_at:new Date().toISOString()});}catch(e){message='Gagal menyimpan jawapan: '+(e.message||String(e));}
  qBusy=false;draw();
 }
 function draw(){root.innerHTML='<div class="u4">'+top()+(view==='home'?home():view==='notes'?note():view==='game'?gamePage():view==='quiz'?quizPage():home())+'</div>';}
 async function onClick(b){
  if(b.dataset.m)mission=Number(b.dataset.m);
  const a=b.dataset.action;
  if(a==='home'){view='home';draw();return;}if(a==='notes'){view='notes';card=0;reveal=false;draw();return;}
  if(a==='game'){start(mission);return;}if(a==='bonus'){start(7);return;}
  if(a==='quiz'){quizStart(Q.filter(q=>q.mission===mission),'Latihan Misi '+mission);return;}
  if(a==='boss'){quizStart(M.flatMap(m=>shuffle(Q.filter(q=>q.mission===m.n)).slice(0,2)),'🏆 Boss Tempat Tinggal');return;}
  if(a==='revision'){const recent=new Map();A.forEach(x=>{if(!recent.has(x.question_id))recent.set(x.question_id,x.is_correct);});quizStart(Q.filter(q=>recent.has(q.id)&&!recent.get(q.id)),'🔁 Latih Kesilapan');return;}
  if(a==='flip'){reveal=!reveal;draw();return;}
  if(a==='next'){card=Math.min(card+1,m().cards.length-1);reveal=false;draw();return;}
  if(a==='prev'){card=Math.max(0,card-1);reveal=false;draw();return;}
  if(a==='retry'){g.feedback=null;message='Cuba lagi! 💪';draw();return;}
  if(a==='advance'){await advance();return;}
  if(a==='nextQuestion'){qi++;qResult=null;message='';draw();return;}
  if(b.dataset.answer!==undefined){await submit(Number(b.dataset.answer));return;}
  if(b.dataset.token!==undefined){if(g.feedback)return;g.selected=Number(b.dataset.token);message='Sekarang ketuk petak yang sesuai!';draw();return;}
  if(b.dataset.slot!==undefined){await choose(null,Number(b.dataset.slot));return;}
  if(b.dataset.pick!==undefined){await choose(Number(b.dataset.pick));return;}
 }
 root.addEventListener('click',async e=>{let b=e.target.closest('button');if(!b||!root.contains(b)||busy)return;busy=true;try{await onClick(b);}catch(err){console.error('School Quest',err);message=err.message||String(err);draw();}finally{busy=false;}});
 try{
  root.innerHTML='<div class="u4-panel">⏳ Menyediakan Pengembaraan Sejarah Sekolah…</div>';
  if(admin){const as=await rest('learning_assignments?select=student_id&unit_code=eq.'+U);if(!as?.length)throw Error('Tiada pelajar ditugaskan');student=as[0].student_id;}
  const [unit,q,a,p]=await Promise.all([
   rest('learning_units?select=missions,games,published&unit_code=eq.'+U),
   rpc('learning_get_questions',{p_unit_code:U}),
   rest('learning_answers?select=question_id,is_correct,answered_at&student_id=eq.'+student+'&unit_code=eq.'+U+'&order=answered_at.desc&limit=1000'),
   rest('learning_mission_progress?select=mission,completed,stars&student_id=eq.'+student+'&unit_code=eq.'+U)
  ]);
  if(!unit?.length)throw Error('Unit 3 belum ditugaskan kepada akaun ini');
  M=unit[0].missions||[];G=unit[0].games||[];Q=q||[];A=a||[];P=p||[];
  if(M.length!==6||G.length!==7||Q.length!==36)throw Error('Kandungan Unit 3 belum lengkap.');
  draw();
 }catch(err){root.innerHTML='<div class="u4-panel"><h2>Unit 3 belum dapat dibuka</h2><p>'+esc(err.message||String(err))+'</p><button class="u4-btn" onclick="location.reload()">Cuba Lagi</button></div>';}
}
window.PKSK_NEIGHBOURHOOD_QUEST={mount};
})();