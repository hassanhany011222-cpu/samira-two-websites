/* ===== Letter text (kept exactly as written) ===== */
const LETTER = `أنا مش عارف أوصفلك أنا كنت مبسوط قد إيه وأنا شايفك.

أول ما شوفتك حسيت إني دوبت في كل تفصيلة فيكي، من لبسك لعيونك لضحكتك وكل حاجة فيكي حرفيًا.

المرة دي حسيت إني حفظتك أكتر من أي مرة فاتت، وإن كل تفصيلة فيكي بقت محفورة جوايا. كنت مبسوط إني أخيرًا شايفك قدامي، وإن اللحظة اللي كنت بستناها بقت حقيقة.

إنتي أقرب حد لقلبي، وأكتر واحدة ليها مكانة عندي. وأنا عارف قد إيه إنتي بتحبيني، وعايزك تعرفي إن حبي ليكي أكبر من أي كلام ممكن أقوله.

أنا محتاجك دايمًا في حياتي، محتاج وجودك وصوتك وضحكتك وتفاصيل يومك، وحتى أبسط كلام بينا.

وجودك بيفرق معايا أكتر ما تتخيلي.

نفسي أفضل أشوفك وأفرح بيكي، ونفضل نعيش ذكريات جديدة تكون أحلى من كل اللي فات.`;
const $ = s => document.querySelector(s);
LETTER.split('\n\n').forEach(t=>{const p=document.createElement('p');p.textContent=t;$('#letterText').appendChild(p);});

/* ===== Sky: stars, hearts, golden particles ===== */
for(let i=0;i<60;i++){
  const s=document.createElement('span');
  if(i<35){s.className='star';s.textContent='✦';s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;font-size:${6+Math.random()*8}px;color:#F7EBDD;animation-delay:${Math.random()*3}s`;}
  else{s.textContent=i%2?'💛':'✨';s.style.cssText=`left:${Math.random()*100}%;bottom:-30px;font-size:${10+Math.random()*14}px;opacity:.6;animation-duration:${14+Math.random()*16}s;animation-delay:${-Math.random()*25}s`;}
  $('#sky').appendChild(s);
}

/* ===== Image fallback ===== */
$('#pic img').onerror=()=>$('#pic').classList.add('missing');

/* ===== Scroll reveal for card, voice, final scene and each letter paragraph ===== */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return; e.target.classList.add('in');
  if(e.target.classList.contains('paper')) document.querySelectorAll('#letterText p').forEach((p,i)=>setTimeout(()=>p.classList.add('in'),700+i*900));
  io.unobserve(e.target);
}),{threshold:.25});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ===== AUDIO: one song file (background + player) and one voice file, never together ===== */
const song=new Audio('assets/audio/letter-song.mp3'); song.loop=true; song.volume=.55;
const voice=new Audio('assets/audio/voice-message.mp3');
let songMissing=false, resumeAfterVoice=false;
const KEY='letterSongOn'; // remembered choice: "1" on, "0" off

song.onerror=()=>{songMissing=true;$('#sBtn').title='ضيفي assets/audio/letter-song.mp3';};
voice.onerror=()=>{$('#vErr').textContent='ضيفي ملف assets/audio/voice-message.mp3';};

function setSongUI(on){
  $('#sBtn').textContent=on?'❚❚':'▶';
  $('#eq').classList.toggle('playing',on);
}
function playSong(){ if(songMissing)return; song.play().then(()=>{localStorage.setItem(KEY,'1');setSongUI(true)}).catch(()=>setSongUI(false)); }
function pauseSong(remember){ song.pause(); setSongUI(false); if(remember) localStorage.setItem(KEY,'0'); }

/* Song button: user's manual choice; also stops the voice so two files never overlap */
$('#sBtn').onclick=()=>{
  if(song.paused){ if(!voice.paused){voice.pause();resumeAfterVoice=false;setVoiceUI(false);} playSong(); }
  else pauseSong(true);
};

/* Gate click = first interaction. Start song unless the visitor previously turned it off. */
$('#openBtn').onclick=()=>{
  $('#gate').classList.add('hide');
  if(localStorage.getItem(KEY)!=='0') playSong();
};

/* ----- Voice player ----- */
const fmt=t=>isFinite(t)?Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0'):'0:00';
function setVoiceUI(on){ $('#vBtn').textContent=on?'❚❚':'▶'; $('#waves').classList.toggle('playing',on); }
// Restore the song only if it was playing before the voice began.
function endVoice(){
  setVoiceUI(false);
  if(resumeAfterVoice){ resumeAfterVoice=false; playSong(); }
}
$('#vBtn').onclick=()=>{
  if(voice.paused){
    resumeAfterVoice=!song.paused;      // remember previous state
    song.pause(); setSongUI(false);     // pause song immediately (no localStorage change)
    voice.play().then(()=>setVoiceUI(true)).catch(()=>{resumeAfterVoice=false;endVoice();});
  } else { voice.pause(); endVoice(); } // manual stop restores previous state
};
voice.onended=()=>{ $('#vFill').style.width='0'; voice.currentTime=0; endVoice(); };
voice.onloadedmetadata=()=>$('#vDur').textContent=fmt(voice.duration);
voice.ontimeupdate=()=>{ $('#vCur').textContent=fmt(voice.currentTime); if(voice.duration)$('#vFill').style.width=(voice.currentTime/voice.duration*100)+'%'; };
$('#vBar').onclick=e=>{ const r=e.currentTarget.getBoundingClientRect(); if(voice.duration) voice.currentTime=((e.clientX-r.left)/r.width)*voice.duration; };
