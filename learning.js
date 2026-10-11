
(function () {
  'use strict';
  const UNIT='sejarah_t4_u1';
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const styles = [
  '.learn{--pink:#f6a5d0;--lav:#ebddff;--mint:#dcf7e8;--blue:#e0f1ff;--gold:#fff0bc;max-width:1040px;margin:auto;color:#27304a}',
  '.learn *{box-sizing:border-box}.learn button,.learn select{font:inherit}.learn button{cursor:pointer}',
  '.learn-hero{padding:28px;border-radius:24px;background:linear-gradient(110deg,#7448c7,#b66bc8,#f4a9b6);color:white;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;gap:14px}',
  '.learn-hero h1{margin:5px 0;font-size:clamp(1.55rem,4vw,2.35rem)}.learn-hero p{margin:6px 0;color:#fffde8}',
  '.learn-badge{display:inline-block;background:#ffffff35;padding:7px 11px;border-radius:999px;font-weight:800;font-size:.8rem}',
  '.learn-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:14px 0 20px}.learn-stat{background:white;padding:14px;border-radius:16px;text-align:center;border:1px solid #eadff1}.learn-stat b{display:block;font-size:1.55rem;color:#6b40ac}.learn-stat span{font-size:.76rem;color:#697188}',
  '.learn-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.learn-card{background:#fff;border:1px solid #e6e0ec;border-radius:20px;padding:19px;box-shadow:0 10px 30px #27203e09}',
  '.learn-card h3{margin:8px 0 4px}.learn-card p{color:#66718b;font-size:.9rem;line-height:1.55}.learn-emoji{font-size:2.2rem}',
  '.learn-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:14px}.learn-btn{border:0;border-radius:12px;background:#754cc3;color:white;padding:11px 15px;font-weight:800;min-height:43px}.learn-btn:hover{filter:brightness(.96)}.learn-btn:disabled{opacity:.45;cursor:not-allowed}',
  '.learn-btn.alt{background:#f0e9fd;color:#5833a1}.learn-btn.mint{background:#147b63;color:white}.learn-btn.light{background:white;color:#6844ae;border:1px solid #e2d7f1}',
  '.learn-paper{background:white;border:1px solid #e9e2ef;border-radius:22px;padding:24px;margin-bottom:17px}.learn-paper h2{margin:10px 0}.learn-progress{height:10px;border-radius:50px;background:#f1eafa;overflow:hidden;margin:13px 0}.learn-progress>div{height:100%;background:linear-gradient(90deg,#9b6ae4,#56c5b1)}',
  '.learn-flash{background:linear-gradient(135deg,#fdf1c7,#ffe7f3,#eee9ff);border-radius:21px;min-height:230px;padding:25px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:14px}',
  '.learn-flash h3{font-size:1.3rem;margin:0;line-height:1.45}.learn-answer{color:#332952;font-size:1.06rem;line-height:1.65;font-weight:650}.learn-tip{background:#ffffffbb;border-radius:12px;padding:12px;font-size:.91rem;line-height:1.5}',
  '.learn-options{display:grid;gap:11px;margin:16px 0}.learn-option{width:100%;text-align:left;border:2px solid #e9dff6;background:#fbf9ff;border-radius:14px;padding:14px;min-height:52px;color:#353051;font-weight:700}',
  '.learn-option:disabled{cursor:default}.learn-option.correct{background:#d6f8e9;border-color:#43ad7c}.learn-option.wrong{background:#ffe0e3;border-color:#e67e8b}',
  '.learn-message{border-radius:14px;background:#eff9f4;border:1px solid #bfebd7;padding:14px;margin:16px 0;line-height:1.6}',
  '.learn-game-row{display:flex;gap:10px;justify-content:space-between;align-items:center;flex-wrap:wrap;padding:12px 0;border-bottom:1px solid #f0e9f7}',
  '.learn-game-row select{border:1px solid #d5c6e8;border-radius:9px;background:#fff;padding:10px;max-width:100%;min-width:180px}',
  '.learn-chip{border-radius:999px;background:#f2edfc;padding:7px 12px;font-size:.85rem;font-weight:750}.learn-soft{color:#64708a}',
  '.learn-unit-note{font-size:.79rem;color:#68758b}.learn-card .learn-btn{font-size:.87rem}',
  '@media(max-width:650px){.learn-grid{grid-template-columns:1fr}.learn-hero{padding:19px}.learn-paper{padding:16px}.learn-stats{gap:6px}.learn-stat{padding:10px}.learn-stat b{font-size:1.23rem}.learn-stat span{font-size:.69rem}.learn-game-row select{width:100%}}'
  ].join('');
  if(!document.getElementById('arif-learning-style')) {const x=document.createElement('style');x.id='arif-learning-style';x.textContent=styles;document.head.append(x);}
  function errorText(e){return esc(e && e.message || 'Tidak dapat memuatkan data. Cuba lagi.');}
  function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
  async function mount(ctx){
    const root=ctx.container;
    const learnerName=esc(ctx.profile.display_nickname||ctx.profile.display_name||'Pelajar');
    let unit, missions=[],games=[],questions=[],answers=[],progress=[],targetId=ctx.profile.user_id;
    let mode='home', mission=1, card=0, revealed=false, quiz=[],qIndex=0, qResult=null,qBusy=false,gameOrder=[],gameMessage='',gameDone=false;
    let quizCorrect=0, quizLabel='',pending=false;
    const admin=ctx.profile.role==='admin';
    const rest=(path,opts)=>ctx.authedJson('/rest/v1/'+path,opts||{});
    const rpc=(name,args)=>ctx.rpc(name,args);
    const latestMap=()=>{const m=new Map();for(const a of answers){if(!m.has(a.question_id))m.set(a.question_id,a);}return m;};
    const answeredCount=()=>latestMap().size;
    const mastered=()=>[...latestMap().values()].filter(a=>a.is_correct).length;
    const completed=()=>progress.filter(p=>p.completed).length;
    const cardStart=()=>{mode='cards';card=0;revealed=false;draw();};
    const gameStart=()=>{mode='game';gameMessage='';gameDone=false;const g=games.find(x=>x.mission===mission);gameOrder=g&&g.type==='sort'?shuffle(g.items.map((_,i)=>i)):[];if(g?.type==='sort'&&gameOrder.every((n,i)=>n===i))gameOrder.reverse();draw();};
    function header(){
      const badge=admin?'Parent / Admin View':'Tahun 4 · Sejarah';
      return '<div class="learn-hero"><div><span class="learn-badge">✨ '+badge+'</span><h1>📚 Pengembaraan Sejarah</h1><p>Unit 1 · Mengenali Sejarah · Belajar • Main • Cuba Lagi</p></div><div style="font-size:3.3rem" aria-hidden="true">🕵️</div></div>';
    }
    function stats(){
      return '<div class="learn-stats"><div class="learn-stat"><b>'+completed()+'/6</b><span>Misi siap</span></div><div class="learn-stat"><b>'+mastered()+'/30</b><span>Soalan dikuasai</span></div><div class="learn-stat"><b>'+answers.length+'</b><span>Jawapan direkod</span></div></div>';
    }
    function menu(){
      return '<div class="learn-actions" style="margin:0 0 18px"><button class="learn-btn alt" data-learn="home">🏠 Semua Misi</button>'+
      (!admin?'<button class="learn-btn light" data-learn="revision">🔁 Ulang Kaji Pintar</button><button class="learn-btn mint" data-learn="boss">🏆 Cabaran Juara</button>':'')+'</div>';
    }
    function home(){
      const tiles=missions.map(m=>{
        const p=progress.find(x=>x.mission===m.n);
        const a=questions.filter(q=>q.mission===m.n).length;
        return '<article class="learn-card"><div class="learn-emoji">'+esc(m.icon)+'</div><h3>Misi '+m.n+': '+esc(m.title)+'</h3><p>'+esc(m.subtitle)+'</p><div class="learn-chip">'+(p?.completed?'✅ Misi selesai · ':'📖 Sedia belajar · ')+a+' soalan</div><div class="learn-actions"><button class="learn-btn" data-learn="cards" data-mission="'+m.n+'">📖 Nota</button><button class="learn-btn alt" data-learn="game" data-mission="'+m.n+'">🎮 Main</button>'+(!admin?'<button class="learn-btn mint" data-learn="quiz" data-mission="'+m.n+'">📝 Latihan</button>':'')+'</div></article>';
      }).join('');
      return '<div class="learn-paper"><h2>Selamat datang, '+(admin?'Ibu / Ayah':learnerName)+'! 👋</h2><p class="learn-soft">Belajar satu misi demi satu misi. Buka kad ilmu, main permainan dan jawab latihan. Semua fakta berpandukan muka surat 2–15 buku teks Sejarah Tahun 4.</p>'+(!admin?'<p class="learn-soft">💡 Setiap misi ada 5 soalan. Jangan risau kalau tersalah — kamu boleh cuba lagi!</p>':'<p class="learn-soft">Paparan pentadbir: keputusan pelajar boleh dipantau di bawah.</p>')+'</div><div class="learn-grid">'+tiles+'</div>'+ (admin?adminPanel():'');
    }
    function cardsView(){
      const m=missions.find(x=>x.n===mission),c=m.cards[card];
      return menu()+'<div class="learn-paper"><div class="learn-chip">Misi '+mission+' · Kad Ilmu '+(card+1)+'/'+m.cards.length+' · Buku teks m/s '+esc(c.page)+'</div>'+
        '<div class="learn-progress"><div style="width:'+Math.round((card+1)/m.cards.length*100)+'%"></div></div>'+
        '<div class="learn-flash"><div style="font-size:2.9rem">'+esc(m.icon)+'</div><h3>'+esc(c.q)+'</h3>'+
        (revealed?'<div class="learn-answer">'+esc(c.a)+'</div><div class="learn-tip">💡 '+esc(c.tip)+'</div>':'<p class="learn-soft">Fikirkan jawapan dahulu…</p>')+'</div>'+
        '<div class="learn-actions"><button class="learn-btn alt" data-learn="prev-card" '+(card===0?'disabled':'')+'>← Sebelum</button><button class="learn-btn" data-learn="flip">'+(revealed?'🙈 Tutup Jawapan':'👀 Buka Jawapan')+'</button>'+
        (card<m.cards.length-1?'<button class="learn-btn mint" data-learn="next-card">Seterusnya →</button>':'<button class="learn-btn mint" data-learn="game">🎮 Jom Main →</button>')+'</div></div>';
    }
    function gameView(){
      const g=games.find(x=>x.mission===mission);
      if(!g)return menu()+'Permainan belum disediakan.';
      let content='';
      if(g.type==='classify')content=g.items.map((it,i)=>'<div class="learn-game-row"><strong>'+esc(it[0])+'</strong><select data-classify="'+i+'"><option value="">Pilih kategori…</option>'+g.categories.map((v,j)=>'<option value="'+j+'">'+esc(v)+'</option>').join('')+'</select></div>').join('');
      if(g.type==='match'){
        const labels=g.items.map(it=>it[1]).reverse();
        content=g.items.map((it,i)=>'<div class="learn-game-row"><strong>'+esc(it[0])+'</strong><select data-match="'+i+'"><option value="">Pilih pasangan…</option>'+labels.map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('')+'</select></div>').join('');
      }
      if(g.type==='sort')content=gameOrder.map((idx,i)=>'<div class="learn-game-row"><strong>'+(i+1)+'. '+esc(g.items[idx])+'</strong><span><button class="learn-btn light" aria-label="Naik" data-move="'+i+'" data-direction="-1" '+(i===0?'disabled':'')+'>↑</button> <button class="learn-btn light" aria-label="Turun" data-move="'+i+'" data-direction="1" '+(i===gameOrder.length-1?'disabled':'')+'>↓</button></span></div>').join('');
      return menu()+'<div class="learn-paper"><div class="learn-chip">🎮 Misi '+mission+'</div><h2>'+esc(g.title)+'</h2><p class="learn-soft">'+(g.type==='sort'?'Gunakan anak panah untuk menyusun urutan yang betul.':g.type==='match'?'Padankan setiap nama atau sebab dengan jawapan yang betul.':'Pilih kategori yang paling tepat bagi setiap item.')+'</p>'+content+
      (gameMessage?'<div class="learn-message" role="status">'+esc(gameMessage)+'</div>':'')+
      '<div class="learn-actions"><button class="learn-btn" data-learn="check-game">✅ Semak Jawapan</button>'+(!admin?'<button class="learn-btn mint" data-learn="quiz">📝 Latihan Misi →</button>':'')+'</div><p class="learn-unit-note">Semua aktiviti ini berpandukan contoh dalam buku teks Unit 1.</p></div>';
    }
    function quizStart(items,label){
      quiz=items;quizLabel=label;qIndex=0;qResult=null;qBusy=false;quizCorrect=0;mode='quiz';draw();
    }
    function quizView(){
      if(!quiz.length)return menu()+'<div class="learn-paper">Tiada soalan ulang kaji lagi. Cuba jawab satu misi dahulu.</div>';
      if(qIndex>=quiz.length){
        const pct=Math.round(quizCorrect/quiz.length*100);
        return menu()+'<div class="learn-paper" style="text-align:center"><div style="font-size:4rem">🏆</div><h2>Tahniah, '+learnerName+'!</h2><p class="learn-soft">'+esc(quizLabel)+'</p><h1 style="font-size:2.8rem;color:#754cc3">'+quizCorrect+'/'+quiz.length+'</h1><p>Markah '+pct+'% · '+(pct===100?'Hebat! Semua betul! 🌟':'Bagus mencuba! Baca penerangan dan cuba lagi. 💪')+'</p><div class="learn-actions" style="justify-content:center"><button class="learn-btn alt" data-learn="home">Semua Misi</button><button class="learn-btn" data-learn="revision">🔁 Ulang Kaji Salah</button></div></div>';
      }
      const q=quiz[qIndex];const options=q.options.map((a,i)=>'<button class="learn-option'+(qResult&&qResult.answer_index===i?' correct':'')+(qResult&&qResult.chosen===i&&!qResult.correct?' wrong':'')+'" data-answer="'+i+'" '+(qResult||qBusy?'disabled':'')+'>'+'ABCD'[i]+'. '+esc(a)+'</button>').join('');
      return menu()+'<div class="learn-paper"><div class="learn-chip">'+esc(quizLabel)+' · '+(qIndex+1)+'/'+quiz.length+' · '+esc(q.difficulty)+'</div><div class="learn-progress"><div style="width:'+Math.round((qIndex)/quiz.length*100)+'%"></div></div><h2>'+esc(q.question)+'</h2><div class="learn-options">'+options+'</div>'+
      (qBusy?'<p class="learn-soft" role="status">Menyemak jawapan…</p>':'')+
      (qResult?'<div class="learn-message" role="status"><strong>'+(qResult.correct?'✅ Tepat sekali!':'💡 Jom fahamkan jawapan!')+'</strong><div>Jawapan: '+esc(q.options[qResult.answer_index])+'</div><div>'+esc(qResult.explanation)+'</div><small>Rujukan buku teks: m/s '+esc(qResult.page)+'</small></div><button class="learn-btn mint" data-learn="next-q">'+(qIndex===quiz.length-1?'Lihat keputusan':'Soalan seterusnya →')+'</button>':'')+'</div>';
    }
    function adminPanel(){
      const correct=answers.filter(a=>a.is_correct).length;
      const per=missions.map(m=>{
        const a=answers.filter(x=>questions.some(q=>q.id===x.question_id&&q.mission===m.n));
        const c=a.filter(x=>x.is_correct).length;
        return '<div class="learn-game-row"><strong>Misi '+m.n+': '+esc(m.title)+'</strong><span>'+a.length+' percubaan · '+(a.length?Math.round(c/a.length*100)+'%':'Belum cuba')+'</span></div>';
      }).join('');
      return '<div class="learn-paper" style="margin-top:20px"><h2>📊 Prestasi Pelajar</h2><p>'+answers.length+' jawapan direkod · '+correct+' betul ('+(answers.length?Math.round(correct/answers.length*100):0)+'%)</p>'+per+'<p class="learn-unit-note">Ketepatan mengira semua percubaan; soalan dikuasai mengikut jawapan terkini setiap soalan.</p></div>';
    }
    function draw(){
      root.innerHTML='<div class="learn">'+header()+stats()+(mode==='home'?home():mode==='cards'?cardsView():mode==='game'?gameView():mode==='quiz'?quizView():home())+'</div>';
      root.querySelectorAll('button[data-learn]').forEach(btn=>btn.addEventListener('click',()=>action(btn)));
      root.querySelectorAll('button[data-answer]').forEach(btn=>btn.addEventListener('click',()=>submit(Number(btn.dataset.answer))));
      root.querySelectorAll('button[data-move]').forEach(btn=>btn.addEventListener('click',()=>{
        const i=Number(btn.dataset.move),j=i+Number(btn.dataset.direction);
        if(j>=0&&j<gameOrder.length){[gameOrder[i],gameOrder[j]]=[gameOrder[j],gameOrder[i]];gameMessage='';draw();}
      }));
    }
    async function saveProgress(stars){
      if(admin)return;
      const old=progress.find(p=>p.mission===mission);
      const row={student_id:targetId,unit_code:UNIT,mission:mission,completed:true,stars:Math.max(old?.stars||0,stars),updated_at:new Date().toISOString()};
      try{
        await rest('learning_mission_progress?on_conflict=student_id,unit_code,mission',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(row)});
        progress=progress.filter(p=>p.mission!==mission);progress.push(row);
      }catch(e){console.warn('Progress not saved:',e);gameMessage='Markah permainan belum dapat disimpan. Cuba semula.';}
    }
    async function checkGame(){
      if(pending)return;
      const g=games.find(x=>x.mission===mission);if(!g)return;
      let total=g.items.length,score=0,missing=false;
      if(g.type==='sort')score=gameOrder.filter((it,i)=>it===i).length;
      else g.items.forEach((it,i)=>{
        const el=root.querySelector(g.type==='match'?'[data-match="'+i+'"]':'[data-classify="'+i+'"]');
        if(!el?.value){missing=true;return;}
        if(g.type==='match'&&el.value===it[1])score++;
        if(g.type==='classify'&&Number(el.value)===it[1])score++;
      });
      if(missing){gameMessage='Lengkapkan semua pilihan dahulu, ya!';draw();return;}
      if(score===total) {
        gameMessage='Hebat! Semua '+total+' jawapan betul. 🌟🌟🌟';gameDone=true;pending=true;await saveProgress(3);pending=false;
      } else gameMessage='Betul '+score+'/'+total+'. Cuba semak semula pilihan atau susunan. 💪';
      if(g.type==='sort'){draw();}else{
        const msg=root.querySelector('.learn-message');
        if(msg)msg.textContent=gameMessage;
        else {const btn=root.querySelector('[data-learn="check-game"]');btn.insertAdjacentHTML('beforebegin','<div class="learn-message" role="status">'+esc(gameMessage)+'</div>');}
        root.querySelectorAll('.learn-stat b')[0].textContent=completed()+'/6';
      }
    }
    async function submit(selected){
      if(qBusy||qResult||admin)return;
      const q=quiz[qIndex];qBusy=true;draw();
      try{
        const result=await rpc('learning_submit_answer',{p_unit_code:UNIT,p_question_id:q.id,p_selected_index:selected});
        qResult={...result,chosen:selected};if(result.correct)quizCorrect++;
        answers.unshift({student_id:targetId,unit_code:UNIT,question_id:q.id,selected_index:selected,is_correct:result.correct,answered_at:new Date().toISOString()});
      }catch(e){qResult=null;alert('Jawapan belum disimpan: '+(e.message||String(e)));}
      qBusy=false;draw();
    }
    async function action(btn){
      const a=btn.dataset.learn;
      if(a==='home'){mode='home';draw();return;}
      if(a==='revision'){
        const last=latestMap();
        const wrong=questions.filter(q=>last.has(q.id)&&!last.get(q.id).is_correct);
        quizStart(shuffle(wrong),'Ulang Kaji Pintar');return;
      }
      if(a==='boss'){quizStart(shuffle(questions).slice(0,10),'🏆 Cabaran Juara');return;}
      if(btn.dataset.mission)mission=Number(btn.dataset.mission);
      if(a==='cards'){cardStart();return;}
      if(a==='game'){gameStart();return;}
      if(a==='quiz'){quizStart(shuffle(questions.filter(q=>q.mission===mission)),'Misi '+mission+' · Latihan');return;}
      if(a==='prev-card'){card=Math.max(0,card-1);revealed=false;draw();return;}
      if(a==='next-card'){card=Math.min(missions.find(m=>m.n===mission).cards.length-1,card+1);revealed=false;draw();return;}
      if(a==='flip'){revealed=!revealed;draw();return;}
      if(a==='check-game'){await checkGame();return;}
      if(a==='next-q'){qIndex++;qResult=null;draw();return;}
    }
    try{
      root.innerHTML='<div class="learn-paper">Memuatkan Pengembaraan Sejarah… ⏳</div>';
      if(admin){
        const assigned=await rest('learning_assignments?select=student_id&unit_code=eq.'+UNIT,{method:'GET'});
        if(!assigned?.length)throw new Error('No student assigned to Unit 1');
        targetId=assigned[0].student_id;
      }
      const [units,allQ,allAns,allProgress]=await Promise.all([
        rest('learning_units?select=unit_code,title,missions,games,published&unit_code=eq.'+UNIT,{method:'GET'}),
        rpc('learning_get_questions',{p_unit_code:UNIT}),
        rest('learning_answers?select=question_id,is_correct,answered_at,selected_index&student_id=eq.'+targetId+'&unit_code=eq.'+UNIT+'&order=answered_at.desc&limit=1000',{method:'GET'}),
        rest('learning_mission_progress?select=mission,completed,stars&student_id=eq.'+targetId+'&unit_code=eq.'+UNIT,{method:'GET'})
      ]);
      if(!Array.isArray(units)||!units.length)throw new Error('Unit 1 not available for this account');
      unit=units[0];missions=unit.missions;games=unit.games;
      questions=allQ||[];answers=allAns||[];progress=allProgress||[];
      draw();
    }catch(e){root.innerHTML='<div class="learn-paper"><h2>Learning Adventure belum dapat dibuka</h2><p>'+errorText(e)+'</p><button class="learn-btn" onclick="location.reload()">Cuba Lagi</button></div>';}
  }
  window.PKSK_LEARNING={mount};
})();
