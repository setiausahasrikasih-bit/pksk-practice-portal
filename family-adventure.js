
(function(){
'use strict';
const U='sejarah_t4_u2';
const h=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CSS=[
'.f2{color:#31304b;max-width:1060px;margin:auto}.f2 *{box-sizing:border-box}.f2 button{font:inherit;cursor:pointer;touch-action:manipulation}',
'.f2hero{border-radius:26px;padding:23px 28px;margin-bottom:15px;color:#fff;background:radial-gradient(circle at 87% 30%,#ffffff55 0 6%,transparent 7%),linear-gradient(115deg,#7243c2,#c56fbb,#f2aa68);display:flex;justify-content:space-between;align-items:center;box-shadow:0 13px 30px #8a63a533}',
'.f2hero h1{font-size:clamp(1.55rem,4vw,2.3rem);margin:8px 0}.f2hero p{margin:0;line-height:1.5}.f2hero .mascot{font-size:4.5rem;animation:f2float 3s infinite ease-in-out}',
'.f2stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:14px 0}.f2stat{background:white;border:1px solid #e9dcf5;border-radius:16px;text-align:center;padding:12px}.f2stat b{font-size:1.4rem;display:block;color:#7444b6}.f2stat small{color:#6d7485}',
'.f2grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.f2card{background:white;border:1px solid #e8dff0;border-radius:22px;padding:19px;box-shadow:0 8px 25px #614c7810}.f2card h3{margin:8px 0;font-size:1.15rem}.f2card p{color:#6f7186;font-size:.91rem;line-height:1.5}',
'.f2panel{padding:23px;border-radius:22px;background:white;border:1px solid #e7dbf0;margin-bottom:16px}.f2panel h2{margin:8px 0 12px}.f2chip{background:#f0e8fd;color:#653d9f;border-radius:40px;padding:7px 12px;display:inline-block;font-weight:850;font-size:.81rem}',
'.f2btn{background:#7146b5;color:#fff;border:none;padding:11px 16px;border-radius:13px;font-weight:850;min-height:43px;box-shadow:0 4px 0 #53328b;transition:transform .16s}.f2btn:hover{transform:translateY(-2px)}.f2btn:active{transform:translateY(2px)}.f2btn:disabled{opacity:.45;box-shadow:none}.f2btn.soft{background:#ece7f9;color:#57378f;box-shadow:0 4px 0 #c9baea}.f2btn.green{background:#19896e;box-shadow:0 4px 0 #0c6851}.f2btn.orange{background:#eb9046;box-shadow:0 4px 0 #c16b2d}',
'.f2actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:15px}.f2bar{height:10px;border-radius:40px;background:#eee9f5;overflow:hidden;margin:15px 0}.f2bar>div{height:100%;background:linear-gradient(90deg,#8f66e7,#58d0af);transition:width .2s}',
'.f2scene{background:linear-gradient(145deg,#e4f7ff,#f6e8fc 54%,#fff1ca);border-radius:22px;padding:18px;border:2px dashed #cbb4eb;position:relative}.f2scene h3{margin:8px 0}',
'.f2flash{background:linear-gradient(135deg,#fff1c3,#fce4ec,#eae2ff);border-radius:22px;padding:23px;min-height:235px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:13px;text-align:center}.f2flash h3{line-height:1.5}.f2reply{line-height:1.65;color:#3d3261;font-weight:700}.f2hint{background:#fff9;padding:11px;border-radius:12px;font-size:.91rem}',
'.f2options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.f2opt{border:2px solid #d7c6ed;border-radius:15px;background:white;color:#554088;padding:13px 8px;min-height:68px;font-weight:800}.f2opt.ok{border-color:#4aaa83;background:#d5f9e8;color:#11694b}',
'.f2slots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.f2slot{border:2px dashed #b9a4dd;border-radius:16px;padding:10px;background:#fff9;min-height:105px;text-align:center;color:#4e4070}.f2slot.ok{border:2px solid #44b28a;background:#daf9e7}.f2slot .face{font-size:2rem}.f2slot small{display:block;font-size:.77rem;line-height:1.4;color:#636f7f}',
'.f2tokens{display:flex;flex-wrap:wrap;gap:8px;margin-top:15px}.f2token{border:2px solid #c0a7e8;border-radius:12px;background:#fff;padding:9px;color:#5d398e;font-weight:800}.f2token.selected{background:#704ab8;color:#fff}.f2token.used{display:none}',
'.f2pick{display:block;width:100%;border:2px solid #e0d5ef;background:#fff;border-radius:13px;padding:13px;text-align:left;margin:8px 0;color:#46326f;font-weight:800;transition:background .15s,border-color .15s;min-height:54px}.f2pick:disabled{opacity:1;cursor:default}.f2pick:focus-visible{outline:3px solid #9675d9;outline-offset:2px}.f2pick.good{border-color:#158154;background:#c6f5d8;color:#125d3d;box-shadow:inset 5px 0 #159963}.f2pick.bad{border-color:#bd4545;background:#ffd9d9;color:#8b2020;box-shadow:inset 5px 0 #c44747}.f2pick.pending{border-color:#bb8b26;background:#fff1b4;color:#644510}.f2pick .f2mark{float:right;font-weight:900;margin-left:8px}',
'.f2event{border:2px solid #c9b3ec;background:white;color:#5e4291;border-radius:14px;padding:12px;font-weight:800;min-height:76px}.f2event strong{display:block;color:#e07f35}.f2event.used{opacity:.28;pointer-events:none}.f2line{display:flex;gap:7px;overflow-x:auto;margin:13px 0}.f2point{flex:1;min-width:105px;background:#d9f9e8;border:1px solid #a9e8c7;border-radius:12px;padding:9px;font-size:.83rem;text-align:center}.f2point b{display:block;color:#16845d}',
'.f2msg{background:#fff9e8;border:1px solid #f1dbad;color:#664c56;padding:13px;border-radius:13px;margin-top:13px;line-height:1.5;font-weight:700}.f2finish{background:linear-gradient(135deg,#ffeac0,#ffcfe9,#e8e3ff);padding:27px;border-radius:22px;text-align:center;position:relative}.f2finish .trophy{font-size:4rem;animation:f2float 2s infinite}',
'.f2letters{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));gap:2px;max-width:490px;margin:10px auto}.f2letter{aspect-ratio:1;background:#fff;border:1px solid #d3bfeb;border-radius:4px;color:#493472;font-size:clamp(.64rem,2.4vw,.99rem);font-weight:900;padding:0}.f2letter.selected{background:#ffd375}.f2letter.found{background:#6dd5b3;color:#125d46}.f2words{display:flex;flex-wrap:wrap;gap:7px;justify-content:center}.f2words span{padding:7px 10px;border-radius:9px;background:white;font-size:.84rem;font-weight:850}.f2words .done{background:#b7f0da;text-decoration:line-through}',
'.f2opt.bad,.f2slot.bad,.f2token.bad,.f2event.bad{background:#ffd9d9;border-color:#c44747;color:#8b2020;box-shadow:inset 4px 0 #c44747}.f2event.used{opacity:1;pointer-events:none;background:#d7f9e7;border-color:#4eb78e;color:#146343}.f2event.used strong{color:#146343}.f2spark{position:absolute;animation:f2rise 1s ease-out forwards;pointer-events:none;font-size:1.7rem;z-index:10}.f2fine{font-size:.8rem;color:#72748d;line-height:1.55;margin-top:12px}',
'@keyframes f2float{50%{transform:translateY(-9px) rotate(4deg)}}@keyframes f2rise{to{transform:translate(50px,-170px) rotate(90deg);opacity:0}}',
'@media(max-width:650px){.f2grid{grid-template-columns:1fr}.f2hero{padding:17px}.f2hero .mascot{font-size:3rem}.f2panel{padding:15px}.f2scene{padding:10px}.f2stats{gap:5px}.f2stat{padding:8px}.f2stat b{font-size:1.15rem}.f2stat small{font-size:.65rem}.f2btn{padding:10px 12px;font-size:.87rem}.f2opt{font-size:.83rem}}'
].join('');
if(!document.getElementById('f2styles')){const e=document.createElement('style');e.id='f2styles';e.textContent=CSS;document.head.appendChild(e);}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function puzzle(){
 const W=11,dict=['KELUARGA','BIODATA','HARMONI','DATUK','KASIH','MASA'],g=Array.from({length:W},()=>Array(W).fill(''));
 let seed=194726;const rand=()=>((seed=Math.imul(seed,1664525)+1013904223|0)>>>0)/4294967296;
 const placed=[];
 for(const w of dict){
  let found=false;
  for(let k=0;k<700&&!found;k++){
   const dirs=[[1,0],[0,1],[1,1],[1,-1]],d=dirs[Math.floor(rand()*4)],x=Math.floor(rand()*W),y=Math.floor(rand()*W),cells=[];
   for(let i=0;i<w.length;i++){const xx=x+i*d[0],yy=y+i*d[1];if(xx<0||xx>=W||yy<0||yy>=W){cells.length=0;break;}cells.push([xx,yy]);}
   if(cells.length!==w.length||!cells.every(([xx,yy],i)=>!g[yy][xx]||g[yy][xx]===w[i]))continue;
   cells.forEach(([xx,yy],i)=>g[yy][xx]=w[i]);placed.push({word:w,cells});found=true;
  }
  if(!found)throw Error('Gagal menyediakan permainan perkataan');
 }
 const ABC='ABCDEFGHIJKLMNOPQRSTUVWXYZ';for(let y=0;y<W;y++)for(let x=0;x<W;x++)if(!g[y][x])g[y][x]=ABC[Math.floor(rand()*26)];
 return {g,placed};
}
async function mount(ctx){
 const learnerName=h(ctx.profile.display_nickname||ctx.profile.display_name||'Pelajar');
 const el=ctx.container,admin=ctx.profile.role==='admin',rest=(p,o)=>ctx.authedJson('/rest/v1/'+p,o||{method:'GET'}),rpc=(n,args)=>ctx.rpc(n,args);
 let target=ctx.profile.user_id,missions=[],games=[],questions=[],answers=[],progress=[],page='home',mission=1,card=0,open=false;
 let game={},notice='',busy=false,quiz=[],question=0,reply=null,right=0,qTitle='',qBusy=false,quizError='';
 const m=()=>missions.find(x=>x.n===mission),g=()=>games.find(x=>x.mission===mission);
 const done=()=>progress.filter(x=>x.completed).length;
 const stars=()=>progress.reduce((t,x)=>t+Number(x.stars||0),0);
 const mastered=()=>{const seen=new Map();for(const a of answers)if(!seen.has(a.question_id))seen.set(a.question_id,a.is_correct);return [...seen.values()].filter(Boolean).length;};
 const B=(txt,cmd,cls='')=>'<button class="f2btn '+cls+'" data-act="'+cmd+'">'+txt+'</button>';
 const top=()=>'<div class="f2hero"><div><span class="f2chip">✨ FAMILY ARCADE • TAHUN 4</span><h1>Unit 2: Saya dan Keluarga</h1><p>Belajar, bermain dan kumpul bintang!</p></div><div class="mascot">🏡</div></div>'+
 '<div class="f2stats"><div class="f2stat"><b>'+done()+'/6</b><small>Misi siap</small></div><div class="f2stat"><b>'+mastered()+'/'+questions.length+'</b><small>Soalan dikuasai</small></div><div class="f2stat"><b>⭐ '+stars()+'</b><small>Bintang terkumpul</small></div></div>';
 const nav=()=>'<div class="f2actions" style="margin:0 0 13px">'+B('🏠 Semua Misi','home','soft')+(!admin?B('🔁 Ulang Salah','revision','soft')+B('🏆 Boss Keluarga','boss','orange'):'')+'</div>';
 const bar=(v,n)=>'<div class="f2bar"><div style="width:'+Math.round(n?v/n*100:0)+'%"></div></div><span class="f2chip">🎯 '+v+'/'+n+'</span>';
 function home(){
  return '<div class="f2panel"><h2>Selamat datang, '+(admin?'Ibu / Ayah':learnerName)+'! 👋</h2><p>Enam misi, enam permainan interaktif, nota pendek dan 36 soalan mengikut buku teks.</p><p class="f2fine">Contoh dalam permainan adalah berdasarkan buku teks, bukan biodata peribadi kamu. Jangan masukkan nombor MyKid atau maklumat pengenalan sebenar.</p></div>'+
  '<div class="f2grid">'+missions.map(x=>{
   const p=progress.find(z=>z.mission===x.n);
   return '<article class="f2card"><div style="font-size:2.4rem">'+h(x.icon)+'</div><h3>Misi '+x.n+': '+h(x.title)+'</h3><p>'+h(x.subtitle)+'</p><span class="f2chip">'+(p?.completed?'✅ Selesai · ⭐ '+p.stars:'🎯 Sedia dimainkan')+'</span><div class="f2actions">'+
   '<button class="f2btn soft" data-act="notes" data-m="'+x.n+'">📖 Nota</button><button class="f2btn orange" data-act="game" data-m="'+x.n+'">🎮 Main!</button>'+
   (!admin?'<button class="f2btn green" data-act="quiz" data-m="'+x.n+'">📝 Latihan</button>':'')+'</div></article>';
  }).join('')+'</div><div class="f2panel" style="margin-top:18px"><h3>🔤 BONUS: Harta Karun Perkataan</h3><p>Permainan cari perkataan berdasarkan halaman 30 buku teks.</p>'+B('🔎 Cari Perkataan','words','green')+'</div>'+
  (admin?'<div class="f2panel"><h3>📊 Jawapan Pelajar</h3>'+missions.map(x=>{const ids=new Set(questions.filter(q=>q.mission===x.n).map(q=>q.id));const a=answers.filter(z=>ids.has(z.question_id));return '<p>Misi '+x.n+': '+a.length+' percubaan · '+(a.length?Math.round(a.filter(z=>z.is_correct).length/a.length*100)+'% betul':'Belum cuba')+'</p>';}).join('')+'</div>':'');
 }
 function notes(){
  const x=m().cards[card];
  return nav()+'<div class="f2panel"><span class="f2chip">📖 Misi '+mission+' · Kad '+(card+1)+'/'+m().cards.length+' · m/s '+h(x.page)+'</span>'+
  bar(card+1,m().cards.length)+'<div class="f2flash"><div style="font-size:3rem">'+m().icon+'</div><h3>'+h(x.q)+'</h3>'+
  (open?'<div class="f2reply">'+h(x.a)+'</div><div class="f2hint">💡 '+h(x.tip)+'</div>':'<p>Teka dahulu! Kemudian buka jawapan.</p>')+'</div>'+
  '<div class="f2actions">'+(card?B('← Kembali','prev','soft'):'')+B(open?'🙈 Tutup':'👀 Buka Jawapan','flip')+
  (card<m().cards.length-1?B('Kad Seterusnya →','next','green'):B('🎮 Jom Main!','game','orange'))+'</div></div>';
 }
 function setup(n){mission=n;page='game';notice='';game={correct:new Set(),selected:null,index:0,wrong:0,won:false,trail:[],feedback:null,tentative:null,lastFeedback:null};
  if(g().type==='catch')game.items=shuffle(g().items.map((it,i)=>({it,id:i})));
  if(g().type==='tree')game.tokens=shuffle(g().slots.map((it,i)=>({it,id:i})));
  if(g().type==='timeline')game.items=shuffle(g().items.map((it,i)=>({it,id:i})));
  draw();
 }
 function victory(label,bonus=false){
  const rating=game.wrong===0?3:game.wrong<=2?2:1;
  return nav()+'<div class="f2finish f2stage"><div class="trophy">🏆</div><h2>Tahniah, '+learnerName+'!</h2><p>'+h(label)+' berjaya diselesaikan!</p><h2>⭐ '+rating+' bintang!</h2>'+
   '<p>Teruskan pengembaraan dan cuba lagi jika mahu!</p><div class="f2actions" style="justify-content:center">'+B('🔄 Main Lagi',bonus?'words':'game','orange')+(!admin?B('📝 Latihan','quiz','green'):'')+B('🏠 Semua Misi','home','soft')+'</div></div>';
 }
 async function finish(bonus=false){
  if(game.won)return;
  game.won=true;
  const score=game.wrong===0?3:game.wrong<=2?2:1;
  if(!admin){
   const key=bonus?6:mission,old=progress.find(x=>x.mission===key);
   const row={student_id:target,unit_code:U,mission:key,completed:true,stars:Math.max(score,old?.stars||0),updated_at:new Date().toISOString()};
   progress=progress.filter(x=>x.mission!==key);progress.push(row);
   try{await rest('learning_mission_progress?on_conflict=student_id,unit_code,mission',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(row)});}
   catch(e){notice='Bintang belum dapat disimpan: '+(e.message||String(e));}
  }
  draw();
  const targetNode=el.querySelector('.f2stage');if(targetNode)for(let i=0;i<12;i++){const b=document.createElement('span');b.className='f2spark';b.textContent=['⭐','💛','🎉','✨'][i%4];b.style.left=(5+Math.random()*85)+'%';b.style.top=(25+Math.random()*40)+'%';b.style.animationDelay=(i*.05)+'s';targetNode.appendChild(b);setTimeout(()=>b.remove(),1900);}
 }
 function scene(){
  const x=g(),type=x.type,n=type==='tree'?x.slots.length:type==='catch'?x.items.filter(z=>z[1]===1).length:x.items.length;
  const completed=(type==='tree'||type==='catch')?game.correct.size:game.index;
  if(game.won)return victory(x.title);
  let content='';
  if(type==='catch')content='<div class="f2options">'+game.items.map(z=>'<button class="f2opt '+(game.correct.has(z.id)?'ok':game.lastFeedback?.type==='catch'&&game.lastFeedback.id===z.id?'bad':'')+'" data-catch="'+z.id+'" '+(game.correct.has(z.id)?'disabled':'')+'>'+(game.correct.has(z.id)?'🌟 ':game.lastFeedback?.type==='catch'&&game.lastFeedback.id===z.id?'❌ ':'')+h(z.it[0])+'</button>').join('')+'</div>';
  if(type==='tree')content='<p>Pilih kepingan ahli keluarga, kemudian tekan tempat yang sepadan.</p><div class="f2slots">'+x.slots.map((z,i)=>'<button class="f2slot '+(game.correct.has(i)?'ok':game.lastFeedback?.type==='slot'&&game.lastFeedback.id===i?'bad':'')+'" data-slot="'+i+'" '+(game.correct.has(i)?'disabled':'')+'><div class="face">'+(game.correct.has(i)?h(z[0]):game.lastFeedback?.type==='slot'&&game.lastFeedback.id===i?'❌':'❔')+'</div><b>'+(game.correct.has(i)?h(z[1]):'Siapakah saya?')+'</b><small>'+h(z[2])+'</small></button>').join('')+'</div><h3>🧩 Kepingan keluarga</h3><div class="f2tokens">'+game.tokens.map(z=>'<button class="f2token '+(game.lastFeedback?.type==='slot'&&game.lastFeedback.token===z.id?'bad':game.selected===z.id?'selected':'')+' '+(game.correct.has(z.id)?'used':'')+'" data-token="'+z.id+'">'+h(z.it[1])+'</button>').join('')+'</div>';
  if(type==='sortcards'||type==='choices'){
   const z=x.items[game.index],arr=type==='sortcards'?x.categories:z?.[1],fb=game.feedback;
   content=z?'<div class="f2flash" style="min-height:140px"><div style="font-size:2.6rem">💬</div><h3>'+h(z[0])+'</h3></div>'+
   arr.map((opt,i)=>{
     const correct=fb&&i===fb.correct,wrong=fb&&i===fb.chosen&&!fb.isCorrect;
     const cls=correct?'good':wrong?'bad':game.tentative===i?'pending':'';
     const mark=correct?'✅ Betul':wrong?'❌ Pilihan kamu':'';
     return '<button class="f2pick '+cls+'" data-pick="'+i+'" aria-pressed="'+Boolean(fb?fb.chosen===i:game.tentative===i)+'" '+(fb?'disabled':'')+'>'+h(opt)+(mark?'<span class="f2mark">'+mark+'</span>':'')+'</button>';
   }).join('')+
   (fb?'<div class="f2msg" role="status" aria-live="polite"><strong>'+(fb.isCorrect?'🌟 Tepat sekali!':'💡 Belum tepat. Jom semak!')+'</strong><p style="margin:7px 0">'+h(fb.explanation)+'</p>'+
     (fb.isCorrect?'':'<small>Jawapan tepat ditandakan hijau. Cuba pilih semula.</small>')+'</div>'+
     '<div class="f2actions">'+B(fb.isCorrect?(game.index===x.items.length-1?'🏆 Selesaikan Misi':'➡️ Soalan Seterusnya'):'🔄 Cuba Lagi',fb.isCorrect?'advanceGame':'retryGame',fb.isCorrect?'green':'soft')+'</div>':''):'';
  }
  if(type==='timeline')content='<h3>🛤️ Garis masa buku teks</h3><div class="f2line">'+game.trail.map(i=>'<div class="f2point"><b>'+h(x.items[i][0])+'</b>'+h(x.items[i][1])+'</div>').join('')+(game.trail.length?'':'<span class="f2chip">Pilih tahun terawal dahulu</span>')+'</div><h3>🚀 Susun peristiwa</h3><div class="f2options">'+game.items.map(z=>'<button class="f2event '+(game.correct.has(z.id)?'used':game.lastFeedback?.type==='timeline'&&game.lastFeedback.id===z.id?'bad':'')+'" data-timeline="'+z.id+'" '+(game.correct.has(z.id)?'disabled':'')+'><strong>'+h(z.it[0])+'</strong>'+h(z.it[1])+'</button>').join('')+'</div>';
  return nav()+'<div class="f2panel f2stage"><span class="f2chip">🎮 Misi '+mission+'</span><h2>'+h(x.title)+'</h2><p>'+h(x.intro)+'</p>'+bar(completed,n)+
  '<div class="f2scene">'+content+'</div>'+(notice?'<div class="f2msg" role="status">'+h(notice)+'</div>':'')+
  '<p class="f2fine">📚 Rujukan buku teks m/s '+h(x.page)+' · Cuba lagi jika tersilap. Tiada pemasa!</p></div>';
 }
 function startQuiz(list,label){quiz=shuffle(list);question=0;reply=null;right=0;qTitle=label;quizError='';page='quiz';draw();}
 function quizPage(){
  if(!quiz.length)return nav()+'<div class="f2panel"><h2>🌟 Tiada kesilapan untuk diulang!</h2><p>Cuba jawab latihan Misi yang lain dahulu.</p></div>';
  if(question>=quiz.length)return nav()+'<div class="f2finish"><div class="trophy">🏆</div><h2>Hebat!</h2><h1>'+right+'/'+quiz.length+'</h1><p>Markah '+Math.round(right/quiz.length*100)+'% · '+h(qTitle)+'</p>'+B('🏠 Semua Misi','home')+'</div>';
  const x=quiz[question];
  return nav()+'<div class="f2panel"><span class="f2chip">📝 '+h(qTitle)+' · '+(question+1)+'/'+quiz.length+' · '+h(x.difficulty)+'</span>'+
  bar(question,quiz.length)+'<h2>'+h(x.question)+'</h2>'+x.options.map((a,i)=>'<button class="f2pick '+(reply&&reply.answer_index===i?'good':'')+' '+(reply&&reply.chosen===i&&!reply.correct?'bad':'')+'" data-answer="'+i+'" '+(reply||qBusy?'disabled':'')+'>'+['A','B','C','D'][i]+'. '+h(a)+'</button>').join('')+
  (reply?'<div class="f2msg"><b>'+(reply.correct?'🎉 Betul!':'💡 Cuba fahamkan jawapan ini:')+'</b><p>Jawapan: '+h(x.options[reply.answer_index])+'</p><p>'+h(reply.explanation)+'</p><small>📚 Buku teks m/s '+h(reply.page)+'</small></div>'+B(question===quiz.length-1?'Lihat Markah':'Soalan Seterusnya →','nextQuestion','green'):'')+
  (qBusy?'<div class="f2msg">⏳ Menyimpan jawapan…</div>':'')+(quizError?'<div class="f2msg">'+h(quizError)+'</div>':'')+'</div>';
 }
 async function answer(i){if(qBusy||reply||admin)return;qBusy=true;draw();try{
  const x=quiz[question];const result=await rpc('learning_submit_answer',{p_unit_code:U,p_question_id:x.id,p_selected_index:i});
  reply={...result,chosen:i};if(reply.correct)right++;
  answers.unshift({question_id:x.id,is_correct:!!reply.correct,answered_at:new Date().toISOString()});
  quizError='';
 }catch(err){quizError='Gagal menyimpan jawapan: '+(err.message||String(err));}
 qBusy=false;draw();}
 function startWords(){page='words';notice='';game={...game,word:puzzle(),selected:null,found:new Set(),wrong:0,won:false};draw();}
 function wordsPage(){
  if(game.won)return victory('Cari Perkataan',true);
  const selected=new Set();for(const z of game.word.placed)if(game.found.has(z.word))for(const [x,y]of z.cells)selected.add(x+','+y);
  return nav()+'<div class="f2panel f2stage"><span class="f2chip">🔤 BONUS • m/s 30</span><h2>Cari Perkataan Rahsia!</h2><p>Sentuh huruf PERTAMA dan huruf TERAKHIR setiap perkataan. Perkataan boleh mendatar, menegak atau menyerong.</p>'+
  bar(game.found.size,game.word.placed.length)+'<div class="f2scene"><div class="f2letters">'+game.word.g.map((row,y)=>row.map((c,x)=>'<button class="f2letter '+(selected.has(x+','+y)?'found':'')+' '+(game.selected&&game.selected[0]===x&&game.selected[1]===y?'selected':'')+'" data-letter="'+x+','+y+'">'+c+'</button>').join('')).join('')+'</div><div class="f2words">'+game.word.placed.map(z=>'<span class="'+(game.found.has(z.word)?'done':'')+'">'+z.word+'</span>').join('')+'</div></div>'+
  (notice?'<div class="f2msg" role="status">'+h(notice)+'</div>':'')+'</div>';
 }
 function draw(){el.innerHTML='<div class="f2">'+top()+(page==='home'?home():page==='notes'?notes():page==='game'?scene():page==='quiz'?quizPage():page==='words'?wordsPage():home())+'</div>';}
 async function playTap(type,i){
  const x=g();
  if(game.won)return;
  if(type==='catch'){const z=x.items[i];if(game.correct.has(i))return;game.lastFeedback={type:'catch',id:i};if(z?.[1]===1){game.correct.add(i);notice='🌟 Betul! Kad hijau menunjukkan maklumat biodata.';if(game.correct.size===x.items.filter(a=>a[1]===1).length)return finish();}else{game.wrong++;notice='❌ Kad merah belum tepat — cuba kad lain.';}}
  if(type==='token'){game.selected=i;game.lastFeedback=null;notice='Sekarang tekan petak dengan petunjuk yang sesuai.';}
  if(type==='slot'){
   if(game.selected===null){notice='Pilih kepingan nama terlebih dahulu.';}
   else if(game.selected===i){game.correct.add(i);game.selected=null;game.lastFeedback=null;notice='✨ Hebat! Petak hijau menunjukkan hubungan yang betul.';if(game.correct.size===x.slots.length)return finish();}
   else{game.wrong++;game.lastFeedback={type:'slot',id:i,token:game.selected};game.selected=null;notice='❌ Petak merah belum tepat. Baca petunjuk dan pilih kepingan lain.';}
  }
  if(type==='pick'){
   if(game.feedback)return;
   const z=x.items[game.index],idx=x.type==='sortcards'?z[1]:z[2],correct=idx===i;
   if(!correct)game.wrong++;
   game.tentative=i;
   notice='';
   const why=x.type==='sortcards'?
     '“'+z[0]+'” ialah tanggungjawab '+x.categories[idx].toLowerCase()+' berdasarkan buku teks.':
     z[3];
   game.feedback={chosen:i,correct:idx,isCorrect:correct,explanation:why};
   // Keep the question and chosen answer visible; advance only on an explicit click.
  }
  if(type==='timeline'){game.lastFeedback={type:'timeline',id:i};if(i===game.index){game.correct.add(i);game.trail.push(i);game.index++;notice='⭐ Betul! Peristiwa hijau sudah dimasukkan ke garis masa.';if(game.index===x.items.length)return finish();}else{game.wrong++;notice='❌ Peristiwa merah belum tepat. Tahun yang mana paling awal antara baki pilihan?';}}
  draw();
 }
 async function wordTap(x,y){
  if(!game.selected){game.selected=[x,y];notice='Sekarang pilih huruf terakhir bagi perkataan ini.';draw();return;}
  const [sx,sy]=game.selected;game.selected=null;
  const found=game.word.placed.find(z=>{if(game.found.has(z.word))return false;const a=z.cells[0],b=z.cells.at(-1);return (a[0]===sx&&a[1]===sy&&b[0]===x&&b[1]===y)||(b[0]===sx&&b[1]===sy&&a[0]===x&&a[1]===y);});
  if(found){game.found.add(found.word);notice='🌟 Kamu jumpa '+found.word+'!';if(game.found.size===game.word.placed.length)return finish(true);}
  else{game.wrong++;notice='Belum jumpa. Pilih huruf awal dan akhir yang betul.';}
  draw();
 }
 async function run(b){
  const type=b.dataset.act;
  if(type){
   if(type==='home'){page='home';draw();return;}
   if(type==='notes'){mission=Number(b.dataset.m)||mission;page='notes';card=0;open=false;draw();return;}
   if(type==='game'){setup(Number(b.dataset.m)||mission);return;}
   if(type==='quiz'){mission=Number(b.dataset.m)||mission;startQuiz(questions.filter(x=>x.mission===mission),'Latihan Misi '+mission);return;}
   if(type==='flip'){open=!open;draw();return;}
   if(type==='next'){card=Math.min(card+1,m().cards.length-1);open=false;draw();return;}
   if(type==='prev'){card=Math.max(card-1,0);open=false;draw();return;}
   if(type==='words'){startWords();return;}
   if(type==='boss'){startQuiz(missions.flatMap(x=>shuffle(questions.filter(q=>q.mission===x.n)).slice(0,2)),'🏆 Boss Keluarga');return;}
   if(type==='revision'){const latest=new Map();for(const a of answers)if(!latest.has(a.question_id))latest.set(a.question_id,a.is_correct);startQuiz(questions.filter(q=>latest.has(q.id)&&!latest.get(q.id)),'🔁 Ulang Salah');return;}
   if(type==='nextQuestion'){question++;reply=null;draw();return;}
   if(type==='advanceGame'){
     if(page!=='game'||!game.feedback?.isCorrect)return;
     game.index++;game.feedback=null;game.tentative=null;notice='';
     if(game.index===g().items.length){await finish();return;}
     draw();return;
   }
   if(type==='retryGame'){
     if(page!=='game'||!game.feedback||game.feedback.isCorrect)return;
     game.feedback=null;game.tentative=null;notice='';
     draw();return;
   }
  }
  if(b.dataset.answer!==undefined)return answer(Number(b.dataset.answer));
  for(const t of ['catch','token','slot','pick','timeline'])if(b.dataset[t]!==undefined)return playTap(t,Number(b.dataset[t]));
  if(b.dataset.letter!==undefined){const [x,y]=b.dataset.letter.split(',').map(Number);return wordTap(x,y);}
 }
 el.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b||!el.contains(b)||busy)return;busy=true;try{await run(b);}catch(err){console.error(err);notice=err.message||String(err);draw();}finally{busy=false;}});
 try{
  el.innerHTML='<div class="f2panel">⏳ Menyediakan permainan Unit 2…</div>';
  if(admin){const assigned=await rest('learning_assignments?select=student_id&unit_code=eq.'+U);if(!assigned?.length)throw Error('Unit 2 belum ada pelajar yang ditugaskan');target=assigned[0].student_id;}
  const [u,q,a,p]=await Promise.all([
   rest('learning_units?select=missions,games,published&unit_code=eq.'+U),
   rpc('learning_get_questions',{p_unit_code:U}),
   rest('learning_answers?select=question_id,is_correct,answered_at&student_id=eq.'+target+'&unit_code=eq.'+U+'&order=answered_at.desc&limit=1000'),
   rest('learning_mission_progress?select=mission,completed,stars&student_id=eq.'+target+'&unit_code=eq.'+U)
  ]);
  if(!u?.length)throw Error('Unit 2 tidak diberikan kepada akaun ini');
  missions=u[0].missions;games=u[0].games;questions=q;answers=a||[];progress=p||[];
  if(missions.length!==6||games.length!==6||questions.length!==36)throw Error('Kandungan Unit 2 belum lengkap.');
  draw();
 }catch(err){el.innerHTML='<div class="f2panel"><h2>Unit 2 tidak dapat dibuka</h2><p>'+h(err.message||String(err))+'</p><button class="f2btn" onclick="location.reload()">Cuba Lagi</button></div>';}
}
window.PKSK_FAMILY_ARCADE={mount,puzzle};
})();
