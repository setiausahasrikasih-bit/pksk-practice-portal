(function(){
'use strict';
const U='sejarah_t4_u5',esc=x=>String(x==null?'':x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle=x=>{const a=[...x];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const css=[
'.u5{max-width:1080px;margin:auto;color:#302b52;font-family:inherit}.u5 *{box-sizing:border-box}.u5 button{font:inherit;cursor:pointer;touch-action:manipulation}',
'.u5-hero{border-radius:26px;padding:26px;background:linear-gradient(115deg,#6448bd,#c969b7,#f5a061);color:white;display:flex;justify-content:space-between;align-items:center;gap:10px}.u5-hero h1{font-size:clamp(1.6rem,4vw,2.5rem);margin:7px 0}.u5-hero p{margin:5px 0}.u5-hero .mascot{font-size:4rem;animation:u5b 2.5s infinite}',
'.u5-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:15px 0}.u5-stat{text-align:center;background:#fff;border:1px solid #eadcf4;border-radius:16px;padding:12px}.u5-stat b{display:block;color:#7d4ac1;font-size:1.55rem}.u5-stat small{font-size:.77rem;color:#71718b}',
'.u5-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.u5-card,.u5-panel{background:#fff;border:1px solid #e9dff0;border-radius:22px;padding:20px;margin-bottom:14px;box-shadow:0 6px 23px #5442720d}.u5-card{position:relative;overflow:hidden}.u5-card:before{content:"";position:absolute;top:0;left:0;right:0;height:7px;background:linear-gradient(90deg,#8e5ad5,#ffb860)}.u5-card h3{margin:5px 0}.u5-card p,.u5-muted{color:#70748a;line-height:1.55}',
'.u5-chip{display:inline-block;background:#eee7ff;color:#68449c;border-radius:40px;padding:7px 12px;font-size:.8rem;font-weight:850}.u5-actions{display:flex;flex-wrap:wrap;gap:9px;margin:15px 0 0}.u5-btn{border:0;border-radius:13px;padding:11px 14px;min-height:44px;color:white;background:#7950c4;font-weight:850;box-shadow:0 4px 0 #513485}.u5-btn.light{background:#efe9ff;color:#5f389a;box-shadow:0 4px 0 #d4c6f3}.u5-btn.green{background:#149574;box-shadow:0 4px 0 #0f6b55}.u5-btn.orange{background:#e88e39;box-shadow:0 4px 0 #bf6c1f}.u5-btn:disabled{opacity:.48;box-shadow:none}',
'.u5-bar{background:#f0e9f8;height:11px;border-radius:40px;overflow:hidden;margin:14px 0}.u5-bar>div{height:100%;background:linear-gradient(90deg,#a36be1,#42c5af);transition:width .2s}',
'.u5-scene{background:linear-gradient(135deg,#d3efff,#f6e4ff 58%,#fff0c4);border:2px dashed #bb9edb;border-radius:24px;padding:20px;position:relative}.u5-scene h2{margin:7px 0}.u5-question{text-align:center;background:#ffffff7d;border-radius:20px;padding:17px;font-size:1.24rem;font-weight:800;line-height:1.5}.u5-emoji{font-size:2.5rem;text-align:center}',
'.u5-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:13px 0}.u5-option{color:#583d8d;background:white;border:3px solid #d7c1e9;border-radius:17px;min-height:89px;padding:12px;font-weight:850;line-height:1.45;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px}.u5-option:disabled{opacity:1;cursor:default}.u5-option.ok,.u5-pin.ok,.u5-slot.ok,.u5-year.ok{background:#c6f8da;border-color:#20a978;color:#0e6044}.u5-option.bad,.u5-pin.bad,.u5-slot.bad,.u5-year.bad{background:#ffd8da;border-color:#d44f63;color:#87283c}',
'.u5-feedback{background:#fff9e1;border:1px solid #edce80;border-radius:15px;padding:14px;margin-top:13px;line-height:1.6;color:#524467}.u5-feedback strong{display:block}.u5-map{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px;border-radius:20px;background:linear-gradient(110deg,#d9f6d8 0 46%,#bbe9ff 47% 54%,#d9f6d8 55% 100%)}.u5-pin{background:#fffdf7;border:2px solid #9ac7af;border-radius:15px;min-height:110px;padding:8px 4px;font-size:.79rem;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;font-weight:850;color:#366373}.u5-pin span{font-size:2rem}',
'.u5-line{display:flex;gap:8px;overflow-x:auto;margin:12px 0}.u5-point{flex:1;min-width:105px;background:#c9f6dc;border:1px solid #84dbb1;border-radius:12px;padding:11px;text-align:center;font-size:.83rem}.u5-point b{display:block;color:#197e55}.u5-years{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.u5-year{background:white;border:3px solid #d6beee;border-radius:15px;padding:11px 5px;min-height:112px;font-weight:850;color:#603a96;font-size:.83rem}.u5-year b{display:block;font-size:1.35rem;color:#df763b}.u5-year.used{background:#d7f9e8;border-color:#40bb93;opacity:.7}',
'.u5-tree{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:13px 0}.u5-slot{background:#fff;border:2px dashed #ad91d7;border-radius:15px;padding:10px 5px;min-height:122px;color:#5b427f;font-size:.84rem}.u5-slot.top{grid-column:1/4;max-width:310px;width:100%;margin:auto}.u5-slot small{display:block;color:#7b7790;font-size:.75rem;margin-top:5px}.u5-tokens{display:flex;gap:8px;flex-wrap:wrap}.u5-token{background:#fff;border:2px solid #b79bdc;border-radius:12px;padding:10px;color:#60399a;font-weight:800}.u5-token.selected{background:#7b51be;color:#fff}.u5-token.used{display:none}',
'.u5-flash{background:linear-gradient(145deg,#fff0bd,#ffe2eb,#e7dcff);border-radius:22px;text-align:center;min-height:230px;padding:23px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px}.u5-flash h3{margin:0;line-height:1.5}.u5-answer{font-weight:750;line-height:1.7}.u5-win{text-align:center;padding:25px;border-radius:22px;background:linear-gradient(120deg,#ffe5b0,#ffcce5,#ded5ff);position:relative}.u5-win .trophy{font-size:4rem;animation:u5b 2s infinite}.u5-spark{position:absolute;pointer-events:none;font-size:1.6rem;animation:u5up 1.1s forwards}',
'@keyframes u5b{50%{transform:translateY(-9px) rotate(5deg)}}@keyframes u5up{to{transform:translate(50px,-140px) rotate(55deg);opacity:0}}',
'@media(max-width:640px){.u5-grid{grid-template-columns:1fr}.u5-hero{padding:17px}.u5-hero .mascot{font-size:2.8rem}.u5-card,.u5-panel{padding:15px}.u5-scene{padding:11px}.u5-stats{gap:5px}.u5-stat{padding:8px}.u5-stat b{font-size:1.15rem}.u5-stat small{font-size:.66rem}.u5-options{gap:7px}.u5-option{min-height:105px;padding:8px;font-size:.83rem}.u5-pin{font-size:.72rem;min-height:108px}.u5-map{gap:5px;padding:6px}.u5-year{font-size:.74rem}.u5-years,.u5-tree{gap:5px}.u5-slot{min-height:135px}}'
,
'.u5-hero{background:linear-gradient(115deg,#0b54a8,#31a4d4 50%,#846cd8,#edb2ff)!important}.u5-card{background:linear-gradient(145deg,#fff,#edfaff,#f5e9ff)}.u5-scene{background:linear-gradient(150deg,#d9faff,#dfe9ff 58%,#ffe9f9)}',
'.u5-thermobg{height:205px;background:linear-gradient(180deg,#a0d5fa,#ebf8ff);border-radius:24px;position:relative;overflow:hidden;border:2px solid #8bc9ec}.u5-sun{position:absolute;right:9%;top:9%;font-size:3.5rem;transition:transform .3s}.u5-icecap{height:125px;position:absolute;bottom:0;left:0;background:linear-gradient(155deg,#f4fdff,#83cffa);clip-path:polygon(0 19%,19% 0,42% 20%,67% 4%,84% 27%,100% 4%,100% 100%,0 100%);transition:width .35s}.u5-water{position:absolute;bottom:0;left:0;right:0;background:#249bd389;transition:height .35s}.u5-tempcontrols{display:flex;justify-content:space-between;gap:8px;margin:14px 0}.u5-tempcontrols button{border:2px solid #acd7f4;border-radius:15px;background:white;color:#235e9b;padding:11px;font-weight:900}.u5-tempcontrols button:disabled{opacity:.5}.u5-gauge{background:white;border-radius:14px;padding:11px;text-align:center;flex:1;font-weight:850}',
'.u5-fauna{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;background:linear-gradient(145deg,#bde7fa,#d1ebd3,#d9cffa);padding:13px;border-radius:23px}.u5-fauna button{border:3px solid #b9dbec;border-radius:17px;background:white;color:#3c5677;padding:9px 4px;min-height:112px;font-size:.83rem;font-weight:850;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:6px}.u5-fauna .u5-animal{font-size:2.5rem;animation:u5b 3s infinite}.u5-fauna button.ok{background:#c7f8dc;border-color:#16a479}.u5-fauna button.bad{background:#ffd9e2;border-color:#d54f62}',
'.u5-chain{display:flex;flex-wrap:wrap;align-items:center;gap:7px;padding:12px;background:#f2e9ff;border-radius:18px}.u5-domino{min-height:85px;min-width:116px;flex:1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;background:white;border:2px solid #b5a0d8;border-radius:14px;color:#493c7e;font-weight:850;text-align:center;padding:9px;font-size:.86rem}.u5-domino b{font-size:2rem}.u5-domino.ok,.u5-domino.used{background:#c7f6d8;border-color:#24ac79}.u5-domino.bad{background:#ffd6df;border-color:#d84c63}.u5-arrow{color:#7a53b4;font-size:1.5rem}',
'.u5-sundamap{background:#50bce9;position:relative;overflow:hidden;border-radius:24px;min-height:220px;border:3px solid #81bce1}.u5-land{position:absolute;background:linear-gradient(145deg,#a5db6b,#318857);border:3px solid #267958;transition:all .35s}.u5-land.main{left:8%;top:11%;width:68%;height:73%;border-radius:46% 28% 35% 27%}.u5-land.island{right:8%;top:35%;width:19%;height:40%;border-radius:46%}.u5-sundamap.high .u5-land.main{left:8%;top:9%;width:29%;height:70%;border-radius:46%}.u5-sundamap.high .u5-land.island{right:14%;top:37%;width:21%;height:33%}.u5-islet{position:absolute;left:45%;top:32%;width:18%;height:24%;border-radius:50%;background:#458b55;border:3px solid #267958;transition:all .35s}.u5-sundamap:not(.high) .u5-islet{opacity:0}.u5-mapnote{position:absolute;left:12px;bottom:10px;background:#ffffffd9;border-radius:12px;padding:8px 10px;font-size:.8rem;font-weight:850;color:#276080}.u5-epochoptions{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:13px 0}.u5-epoch{border:3px solid #b2cfea;background:#fff;color:#285b90;padding:11px;border-radius:15px;min-height:75px;font-weight:850}.u5-epoch.selected{outline:3px solid #7652c6}.u5-epoch.ok{background:#c7f6d8;border-color:#21a77d}.u5-epoch.bad{background:#ffd7dd;border-color:#d65068}',
'@media(max-width:640px){.u5-fauna{gap:5px;padding:6px}.u5-fauna button{min-height:110px;font-size:.7rem}.u5-fauna .u5-animal{font-size:2rem}.u5-domino{min-width:92px;font-size:.72rem}.u5-tempcontrols button{font-size:.75rem;padding:6px}.u5-gauge{font-size:.75rem}.u5-epoch{font-size:.75rem}.u5-sundamap{min-height:180px}}'
].join('');
if(!document.getElementById('sq5styles')){const st=document.createElement('style');st.id='sq5styles';st.textContent=css;document.head.appendChild(st);}
async function mount(ctx){
 const learnerName=esc(ctx.profile.display_nickname||ctx.profile.display_name||'Pelajar');
 const root=ctx.container,admin=ctx.profile.role==='admin',rest=(p,o)=>ctx.authedJson('/rest/v1/'+p,o||{method:'GET'}),rpc=(n,a)=>ctx.rpc(n,a);
 let student=ctx.profile.user_id,M=[],G=[],Q=[],A=[],P=[],view='home',mission=1,card=0,reveal=false,g={},quiz=[],qi=0,qResult=null,qBusy=false,score=0,label='',message='',busy=false;
 const btn=(t,a,cls='')=>'<button class="u5-btn '+cls+'" data-action="'+a+'">'+t+'</button>';
 const m=()=>M.find(x=>x.n===mission),game=()=>G.find(x=>x.n===mission),completed=()=>P.filter(x=>x.completed).length,stars=()=>P.reduce((n,x)=>n+Number(x.stars||0),0);
 const mastered=()=>{const latest=new Map();for(const a of A)if(!latest.has(a.question_id))latest.set(a.question_id,a.is_correct);return [...latest.values()].filter(Boolean).length;};
 const nav=()=>'<div class="u5-actions" style="margin:0 0 15px">'+btn('🏠 Semua Misi','home','light')+(!admin?btn('🔁 Latihan Salah','revision','light')+btn('🏆 Boss Zaman Ais','boss','orange'):'')+'</div>';
 const bar=(n,t)=>'<div class="u5-bar"><div style="width:'+Math.round(t?n/t*100:0)+'%"></div></div>';
 function top(){return '<div class="u5-hero"><div><span class="u5-chip">✨ ICE AGE ADVENTURE • UNIT 5</span><h1>Zaman Air Batu</h1><p>Laraskan suhu, jelajah haiwan purba dan selamatkan Pentas Sunda!</p></div><div class="mascot">🦣</div></div><div class="u5-stats"><div class="u5-stat"><b>'+completed()+'/6</b><small>Misi siap</small></div><div class="u5-stat"><b>'+mastered()+'/'+Q.length+'</b><small>Soalan dikuasai</small></div><div class="u5-stat"><b>⭐ '+stars()+'</b><small>Bintang</small></div></div>';}
 function home(){return '<div class="u5-panel"><h2>Hai, '+(admin?'Ibu / Ayah':learnerName)+'! 👋</h2><p>Jom ke Dunia Ais! 29 kad nota, tujuh permainan visual dan 36 soalan berpandukan buku teks m/s 58–71.</p><p class="u5-muted">❄️ Simulasi suhu dan Pentas Sunda ialah <b>ilustrasi konsep</b>, bukan pengukuran suhu atau peta geografi sebenar.</p></div>'+
 '<div class="u5-grid">'+M.map(x=>{const p=P.find(z=>z.mission===x.n);return '<div class="u5-card"><div style="font-size:2.5rem">'+esc(x.icon)+'</div><h3>Misi '+x.n+': '+esc(x.title)+'</h3><p>'+esc(x.subtitle)+'</p><span class="u5-chip">'+(p?.completed?'✅ Selesai · ⭐ '+p.stars:'🚀 Belum selesai')+'</span><div class="u5-actions"><button class="u5-btn light" data-action="notes" data-m="'+x.n+'">📖 Nota</button><button class="u5-btn orange" data-action="game" data-m="'+x.n+'">🎮 Main!</button>'+(!admin?'<button class="u5-btn green" data-action="quiz" data-m="'+x.n+'">✍️ Latihan</button>':'')+'</div></div>';}).join('')+'</div><div class="u5-panel" style="margin-top:17px"><h3>🗝️ BONUS — Gua Kristal Rahsia</h3><p>Kumpul enam kristal daripada enam misi untuk membuka harta karun!</p>'+btn('🔑 Mula Cabaran Bonus','bonus','orange')+'</div>'+(admin?adminStats():'');}
 function adminStats(){return '<div class="u5-panel"><h3>📊 Prestasi Pelajar</h3>'+M.map(x=>{const ids=new Set(Q.filter(q=>q.mission===x.n).map(q=>q.id)),aa=A.filter(a=>ids.has(a.question_id));return '<p>Misi '+x.n+': '+aa.length+' jawapan · '+(aa.length?Math.round(aa.filter(a=>a.is_correct).length/aa.length*100)+'% betul':'Belum cuba')+'</p>';}).join('')+'</div>';}
 function note(){const x=m().cards[card];return nav()+'<div class="u5-panel"><span class="u5-chip">📖 Misi '+mission+' · Kad '+(card+1)+'/'+m().cards.length+' · m/s '+esc(x.page)+'</span>'+bar(card+1,m().cards.length)+'<div class="u5-flash"><div class="u5-emoji">'+esc(m().icon)+'</div><h3>'+esc(x.q)+'</h3>'+(reveal?'<div class="u5-answer">'+esc(x.a)+'</div><div class="u5-feedback">💡 '+esc(x.tip)+'</div>':'<p class="u5-muted">Teka jawapan, kemudian ketuk Buka Jawapan!</p>')+'</div><div class="u5-actions">'+(card?btn('← Sebelum','prev','light'):'')+btn(reveal?'🙈 Tutup':'👀 Buka Jawapan','flip')+(card<m().cards.length-1?btn('Kad seterusnya →','next','green'):btn('🎮 Jom Main','game','orange'))+'</div></div>';}
 function start(n){mission=n;const x=game();g={i:0,choice:null,feedback:null,wrong:0,selected:x.type==='thermo'?1:null,placed:new Set(),trail:[],won:false};if(x.type==='timeline'||x.type==='chain')g.shuffled=shuffle(x.events.map((a,i)=>({a,i})));if(x.type==='build')g.tokens=shuffle(x.slots.map((a,i)=>({a,i})));view='game';message='';draw();}
 function total(){const x=game();return x.type==='timeline'||x.type==='chain'?x.events.length:x.type==='build'?x.slots.length:x.steps.length;}
 function resultBox(){const f=g.feedback;return (f?'<div class="u5-feedback" role="status"><strong>'+(f.ok?'🌟 Betul!':'💡 Belum tepat — pilihan benar berwarna hijau')+'</strong>'+esc(f.info)+'</div><div class="u5-actions">'+btn(f.ok?(g.i===total()-1?'🏆 Selesaikan Misi':'➡️ Seterusnya'):'🔄 Cuba Lagi',f.ok?'advance':'retry',f.ok?'green':'light')+'</div>':message?'<div class="u5-feedback" role="status">'+esc(message)+'</div>':'');}
 function opt(x,i){const f=g.feedback,cls=f?(i===f.correct?'ok':i===f.chosen&&!f.ok?'bad':''):'';return '<button class="u5-option '+cls+'" data-pick="'+i+'" '+(f?'disabled':'')+'>'+esc(x)+(cls?'<strong>'+(cls==='ok'?'✅ Betul':'❌ Pilihan kamu')+'</strong>':'')+'</button>';}
 function gamePage(){
  const x=game();if(g.won)return nav()+victory();
  let inner='';
  if(x.type==='clue'||x.type==='treasure'){
   const z=x.steps[g.i];inner='<div class="u5-question"><div class="u5-emoji">'+esc(z[5])+'</div>'+esc(z[0])+'</div><div class="u5-options">'+z[1].map((q,i)=>opt(q,i)).join('')+'</div>';
  }else if(x.type==='map'){
   const z=x.steps[g.i];inner='<div class="u5-question">🧭 '+esc(z[0])+'</div><div class="u5-map">'+x.landmarks.map((a,i)=>{const f=g.feedback,cls=f?(i===f.correct?'ok':i===f.chosen&&!f.ok?'bad':''):'';return '<button class="u5-pin '+cls+'" data-pick="'+i+'" '+(f?'disabled':'')+'><span>'+esc(a[0])+'</span>'+esc(a[1])+(cls?'<strong>'+(cls==='ok'?'✅':'❌')+'</strong>':'')+'</button>';}).join('')+'</div><p class="u5-muted">🦣 Ilustrasi haiwan purba, bukan gambar sebenar</p>';
  }else if(x.type==='timeline'){
   inner='<h3>🛤️ Garis masa kamu</h3><div class="u5-line">'+g.trail.map(i=>'<div class="u5-point"><b>'+esc(x.events[i][0])+'</b>'+esc(x.events[i][1])+'</div>').join('')+(g.trail.length?'':'<span class="u5-chip">Pilih tahun paling awal</span>')+'</div><h3>🚀 Pilih kapsul masa berikutnya</h3><div class="u5-years">'+g.shuffled.map(z=>{const f=g.feedback,cl=g.placed.has(z.i)?'used':f?(z.i===f.correct?'ok':z.i===f.chosen&&!f.ok?'bad':''):'';return '<button class="u5-year '+cl+'" data-pick="'+z.i+'" '+(g.placed.has(z.i)||f?'disabled':'')+'><b>'+esc(z.a[0])+'</b>'+esc(z.a[1])+'</button>';}).join('')+'</div>';
  }else if(x.type==='thermo'){
   const st=x.steps[g.i],temp=g.selected,fb=g.feedback;
   inner='<div class="u5-question">🌡️ '+esc(st[0])+'</div><div class="u5-thermobg"><span class="u5-sun" style="transform:scale('+(temp===2?1.35:temp===1?1:.6)+')">'+(temp===2?'☀️':temp===1?'🌤️':'🌨️')+'</span><div class="u5-icecap" style="width:'+(temp===0?100:temp===1?67:35)+'%"></div><div class="u5-water" style="height:'+(temp===2?66:temp===1?38:16)+'px"></div></div>'+
    '<div class="u5-tempcontrols"><button data-action="cool" '+(fb||temp===0?'disabled':'')+'>🧊 Sejukkan</button><div class="u5-gauge">🌡️ '+['SEJUK','SEDERHANA','PANAS'][temp]+'</div><button data-action="heat" '+(fb||temp===2?'disabled':'')+'>☀️ Panaskan</button></div>'+
    '<p class="u5-muted">Laraskan keadaan melalui butang. Ini ilustrasi, bukan bacaan suhu sebenar.</p>'+
    (fb?'<div class="u5-chip">Jawapan betul: '+['SEJUK','SEDERHANA','PANAS'][fb.correct]+'</div>':btn('🔬 Semak Termometer','confirmThermo','orange'));
  }else if(x.type==='wildlife'){
   const st=x.steps[g.i],fb=g.feedback;
   inner='<div class="u5-question">🦣 '+esc(st[0])+'</div><div class="u5-fauna">'+x.animals.map((a,i)=>{const cls=fb?(i===fb.correct?'ok':i===fb.chosen&&!fb.ok?'bad':''):'';return '<button class="'+cls+'" data-pick="'+i+'" '+(fb?'disabled':'')+'><span class="u5-animal">'+esc(a[0])+'</span>'+esc(a[1])+(cls?'<b>'+(cls==='ok'?'✅ Betul':'❌ Cuba lagi')+'</b>':'')+'</button>';}).join('')+'</div><p class="u5-muted">Haiwan lain ialah pilihan gangguan dalam permainan, bukan senarai haiwan purba.</p>';
  }else if(x.type==='chain'){
   const fb=g.feedback;
   inner='<h3>💧 Rantaian perubahan bumi</h3><div class="u5-chain">'+(g.trail.length?g.trail.map(i=>'<div class="u5-domino used"><b>'+esc(x.events[i][0])+'</b>'+esc(x.events[i][1])+'</div>').join('<span class="u5-arrow">➜</span>'):'<span class="u5-chip">Pilih peristiwa pertama</span>')+'</div><h3>🧩 Sambung domino seterusnya</h3><div class="u5-chain">'+g.shuffled.map(z=>{const cls=g.placed.has(z.i)?'used':fb?(z.i===fb.correct?'ok':z.i===fb.chosen&&!fb.ok?'bad':''):'';return '<button class="u5-domino '+cls+'" data-pick="'+z.i+'" '+(g.placed.has(z.i)||fb?'disabled':'')+'><b>'+esc(z.a[0])+'</b>'+esc(z.a[1])+'</button>';}).join('')+'</div>';
  }else if(x.type==='sunda'){
   const st=x.steps[g.i],fb=g.feedback,high=g.selected===1;
   inner='<div class="u5-question">🌏 '+esc(st[0])+'</div><div class="u5-sundamap '+(high?'high':'')+'" role="img" aria-label="Model konsep Pentas Sunda, bukan peta geografi"><div class="u5-land main"></div><div class="u5-land island"></div><div class="u5-islet"></div><div class="u5-mapnote">'+(high?'🌊 LAUT MENINGKAT · tanah rendah ditenggelami air':'🌿 LAUT RENDAH · daratan lebih luas')+'</div></div>'+
   '<div class="u5-epochoptions">'+[0,1].map(i=>{const cl=fb?(i===fb.correct?'ok':i===fb.chosen&&!fb.ok?'bad':''):g.selected===i?'selected':'';
   return '<button class="u5-epoch '+cl+'" data-sunda="'+i+'" '+(fb?'disabled':'')+'>'+(i===0?'🌿 LAUT RENDAH':'🌊 LAUT MENINGKAT')+'</button>';}).join('')+'</div>'+
   '<p class="u5-muted">Model konsep ilustrasi, <b>bukan peta geografi Pentas Sunda sebenar</b>.</p>'+
   (fb?'':btn('✅ Semak Pilihan','confirmSunda','orange'));
  }else if(x.type==='build'){
   inner='<h3 style="text-align:center">🧊 Padankan Maklumat Ais</h3><div class="u5-tree">'+x.slots.map((z,i)=>{const f=g.feedback,cl=g.placed.has(i)?'ok':f&&i===f.chosen&&!f.ok?'bad':f&&i===f.correct?'ok':'';return '<button class="u5-slot '+(i===0?'top ':'')+cl+'" data-slot="'+i+'" '+(f||g.placed.has(i)?'disabled':'')+'><div style="font-size:1.8rem">'+(g.placed.has(i)?esc(z[0]):'❔')+'</div><b>'+(g.placed.has(i)?esc(z[1]):'Siapakah saya?')+'</b><small>'+esc(z[2])+'</small></button>';}).join('')+'</div><h3>🧩 Pilih kepingan dan ketuk petak sepadan</h3><div class="u5-tokens">'+g.tokens.map(z=>'<button class="u5-token '+(g.selected===z.i?'selected':'')+' '+(g.placed.has(z.i)?'used':'')+'" data-token="'+z.i+'" '+(g.feedback?'disabled':'')+'>'+esc(z.a[0])+' '+esc(z.a[1])+'</button>').join('')+'</div>';
  }
  let reference=x.type==='timeline'?'61–62':x.type==='chain'?'64–65':x.type==='wildlife'?'62':x.type==='sunda'?'66–67':x.type==='thermo'?'60–61':x.type==='build'?'60–67':x.type==='map'?x.steps[g.i][3]:x.steps?.[g.i]?.[4]||'58–71';
  return nav()+'<div class="u5-panel"><span class="u5-chip">'+esc(x.name)+' · '+(g.i+1)+'/'+total()+'</span><h2>'+esc(x.intro)+'</h2>'+bar(g.i,total())+'<div class="u5-scene">'+inner+'</div>'+resultBox()+'<p class="u5-muted" style="font-size:.81rem">📚 Rujukan buku teks m/s '+esc(reference)+' · Tiada pemasa. Jawapan kekal sehingga tekan Seterusnya.</p></div>';
 }
 function victory(){let n=g.wrong===0?3:g.wrong<=2?2:1;return '<div class="u5-win u5-stage"><div class="trophy">🏆</div><h2>Tahniah, '+learnerName+'!</h2><p>'+esc(game().name)+' berjaya diselesaikan!</p><h2>⭐ '+n+' bintang!</h2><div class="u5-actions" style="justify-content:center">'+btn('🔄 Main Lagi','game','orange')+(!admin&&mission<=6?btn('📝 Latihan Misi','quiz','green'):'')+btn('🏠 Semua Misi','home','light')+'</div>'+(message?'<p>'+esc(message)+'</p>':'')+'</div>';}
 async function win(){
  if(g.won)return;g.won=true;
  if(!admin&&mission<=6){
   const n=g.wrong===0?3:g.wrong<=2?2:1,old=P.find(p=>p.mission===mission),row={student_id:student,unit_code:U,mission,completed:true,stars:Math.max(n,old?.stars||0),updated_at:new Date().toISOString()};
   try{await rest('learning_mission_progress?on_conflict=student_id,unit_code,mission',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(row)});P=P.filter(p=>p.mission!==mission);P.push(row);}catch(e){message='⚠️ Bintang belum tersimpan: '+(e.message||String(e));}
  }
  draw();const stage=root.querySelector('.u5-stage');if(stage&&document.createElement){for(let i=0;i<12;i++){const e=document.createElement('span');e.className='u5-spark';e.textContent=['⭐','🎉','✨','💛'][i%4];e.style.left=(5+Math.random()*85)+'%';e.style.top=(30+Math.random()*25)+'%';stage.appendChild(e);setTimeout(()=>e.remove(),1600);}}
 }
 async function choose(choice,slot=null){
  if(g.feedback||g.won)return;const x=game();let correct,info,chosen=choice;
  if(x.type==='clue'||x.type==='treasure'){let z=x.steps[g.i];correct=z[2];info=z[3];}
  else if(x.type==='map'){let z=x.steps[g.i];correct=z[1];info=z[2];}
  else if(x.type==='timeline'||x.type==='chain'){correct=g.i;info=x.events[correct][0]+' — '+x.events[correct][1]+' ialah peristiwa seterusnya.';}
  else if(x.type==='thermo'||x.type==='sunda'||x.type==='wildlife'){const z=x.steps[g.i];correct=z[1];info=z[2];}
  else if(x.type==='build'){
   if(g.selected===null){message='Pilih kad dahulu!';draw();return;}
   chosen=slot;correct=g.selected;info='Kad '+x.slots[g.selected][1]+' perlu dipadankan dengan fakta yang betul.';
  }else return;
  const ok=chosen===correct;if(!ok)g.wrong++;
  g.feedback={chosen,correct,ok,info};message='';draw();
 }
 async function advance(){
  if(!g.feedback?.ok)return;const type=game().type;
  if(type==='timeline'||type==='chain'){g.placed.add(g.i);g.trail.push(g.i);} if(type==='thermo')g.selected=1; if(type==='sunda')g.selected=null;
  if(type==='build'){g.placed.add(g.feedback.correct);g.selected=null;}
  g.feedback=null;g.i++;
  if(g.i===total())return win();
  draw();
 }
 function quizStart(items,title){quiz=shuffle(items);qi=0;qResult=null;qBusy=false;score=0;label=title;message='';view='quiz';draw();}
 function quizPage(){
  if(!quiz.length)return nav()+'<div class="u5-panel"><h2>🌟 Tiada kesilapan lagi!</h2><p>Teruskan ke misi lain.</p></div>';
  if(qi>=quiz.length)return nav()+'<div class="u5-win"><div class="trophy">🏆</div><h2>Latihan Tamat!</h2><h1>'+score+'/'+quiz.length+'</h1><p>'+Math.round(100*score/quiz.length)+'% · '+esc(label)+'</p>'+btn('🏠 Semua Misi','home')+'</div>';
  const q=quiz[qi];
  return nav()+'<div class="u5-panel"><span class="u5-chip">✍️ '+esc(label)+' · '+(qi+1)+'/'+quiz.length+' · '+esc(q.difficulty)+'</span>'+bar(qi,quiz.length)+'<h2>'+esc(q.question)+'</h2><div class="u5-options">'+q.options.map((text,i)=>{const cls=qResult?(i===qResult.answer_index?'ok':i===qResult.chosen&&!qResult.correct?'bad':''):'';return '<button class="u5-option '+cls+'" data-answer="'+i+'" '+(qResult||qBusy?'disabled':'')+'>'+['A','B','C','D'][i]+'. '+esc(text)+(cls?'<strong>'+(cls==='ok'?'✅ Betul':'❌ Pilihan kamu')+'</strong>':'')+'</button>';}).join('')+'</div>'+
   (qResult?'<div class="u5-feedback" role="status"><strong>'+(qResult.correct?'🌟 Tepat!':'💡 Jom fahamkan!')+'</strong>'+esc(qResult.explanation)+'<small style="display:block">📚 Buku teks m/s '+esc(qResult.page)+'</small></div><div class="u5-actions">'+btn(qi===quiz.length-1?'🏆 Lihat markah':'➡️ Seterusnya','nextQuestion','green')+'</div>':'')+
   (qBusy?'<div class="u5-feedback">⏳ Menyimpan jawapan…</div>':'')+(message?'<div class="u5-feedback">'+esc(message)+'</div>':'')+'</div>';
 }
 async function submit(choice){if(qResult||qBusy||admin)return;qBusy=true;message='';draw();
  try{const q=quiz[qi],r=await rpc('learning_submit_answer',{p_unit_code:U,p_question_id:q.id,p_selected_index:choice});qResult={...r,chosen:choice};if(qResult.correct)score++;A.unshift({question_id:q.id,is_correct:!!r.correct,answered_at:new Date().toISOString()});}catch(e){message='Gagal menyimpan jawapan: '+(e.message||String(e));}
  qBusy=false;draw();
 }
 function draw(){root.innerHTML='<div class="u5">'+top()+(view==='home'?home():view==='notes'?note():view==='game'?gamePage():view==='quiz'?quizPage():home())+'</div>';}
 async function onClick(b){
  if(b.dataset.m)mission=Number(b.dataset.m);
  const a=b.dataset.action;
  if(a==='home'){view='home';draw();return;}if(a==='notes'){view='notes';card=0;reveal=false;draw();return;}
  if(a==='game'){start(mission);return;}if(a==='bonus'){start(7);return;}
  if(a==='quiz'){quizStart(Q.filter(q=>q.mission===mission),'Latihan Misi '+mission);return;}
  if(a==='boss'){quizStart(M.flatMap(m=>shuffle(Q.filter(q=>q.mission===m.n)).slice(0,2)),'🏆 Boss Zaman Ais');return;}
  if(a==='revision'){const recent=new Map();A.forEach(x=>{if(!recent.has(x.question_id))recent.set(x.question_id,x.is_correct);});quizStart(Q.filter(q=>recent.has(q.id)&&!recent.get(q.id)),'🔁 Latih Kesilapan');return;}
  if(a==='flip'){reveal=!reveal;draw();return;}
  if(a==='next'){card=Math.min(card+1,m().cards.length-1);reveal=false;draw();return;}
  if(a==='prev'){card=Math.max(0,card-1);reveal=false;draw();return;}
  if(a==='retry'){g.feedback=null;message='Cuba lagi! 💪';draw();return;}
  if(a==='advance'){await advance();return;}
  if(a==='cool'||a==='heat'){if(game().type!=='thermo'||g.feedback)return;g.selected=Math.max(0,Math.min(2,g.selected+(a==='cool'?-1:1)));draw();return;}
  if(a==='confirmThermo'){if(game().type==='thermo')await choose(g.selected);return;}
  if(a==='confirmSunda'){if(game().type==='sunda'&&g.selected!==null)await choose(g.selected);else{message='Ketuk satu pilihan laut dahulu!';draw();}return;}
  if(b.dataset.sunda!==undefined){if(game().type==='sunda'&&!g.feedback){g.selected=Number(b.dataset.sunda);message='';draw();}return;}
  if(a==='nextQuestion'){qi++;qResult=null;message='';draw();return;}
  if(b.dataset.answer!==undefined){await submit(Number(b.dataset.answer));return;}
  if(b.dataset.token!==undefined){if(g.feedback)return;g.selected=Number(b.dataset.token);message='Sekarang ketuk petak yang sesuai!';draw();return;}
  if(b.dataset.slot!==undefined){await choose(null,Number(b.dataset.slot));return;}
  if(b.dataset.pick!==undefined){await choose(Number(b.dataset.pick));return;}
 }
 root.addEventListener('click',async e=>{let b=e.target.closest('button');if(!b||!root.contains(b)||busy)return;busy=true;try{await onClick(b);}catch(err){console.error('School Quest',err);message=err.message||String(err);draw();}finally{busy=false;}});
 try{
  root.innerHTML='<div class="u5-panel">⏳ Menghidupkan Dunia Zaman Air Batu…</div>';
  if(admin){/* Admin can preview Unit 5 without legacy assignments. */student=ctx.profile.user_id;}
  const [unit,q,a,p]=await Promise.all([
   rest('learning_units?select=missions,games,published&unit_code=eq.'+U),
   rpc('learning_get_questions',{p_unit_code:U}),
   rest('learning_answers?select=question_id,is_correct,answered_at&student_id=eq.'+student+'&unit_code=eq.'+U+'&order=answered_at.desc&limit=1000'),
   rest('learning_mission_progress?select=mission,completed,stars&student_id=eq.'+student+'&unit_code=eq.'+U)
  ]);
  if(!unit?.length)throw Error('Unit 5 belum ditugaskan kepada akaun ini');
  M=unit[0].missions||[];G=unit[0].games||[];Q=q||[];A=a||[];P=p||[];
  if(M.length!==6||G.length!==7||Q.length!==36)throw Error('Kandungan Unit 5 belum lengkap.');
  draw();
 }catch(err){root.innerHTML='<div class="u5-panel"><h2>Unit 5 belum dapat dibuka</h2><p>'+esc(err.message||String(err))+'</p><button class="u5-btn" onclick="location.reload()">Cuba Lagi</button></div>';}
}
window.PKSK_ICE_AGE_ADVENTURE={mount};
})();