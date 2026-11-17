/* ===== Configuration ===== */
// Replace with the real link of the second website after publishing it.
const SECOND_WEBSITE_URL = "YOUR_SECOND_WEBSITE_URL";
const MUSIC_SRC = "assets/audio/museum-music.mp3";

/* ===== Exhibit content ===== */
const EXHIBITS = [
 {id:'mug', tag:'المعرض الأول — السعادة اليومية', card:'ركن السعادة اليومية', teaser:'مج صغير شايل حتة حب في كل رشفة.', icon:'☕',
  img:'assets/images/mug.jpg', title:'شوية سعادة في كل يوم ❤️',
  text:`كل مرة تشربي فيها أي مشروب بتحبيه من المج ده، افتكريني.

وافتكري إن فيه حد بيحبك جدًا، وبيفرح بأبسط تفاصيلك، وبيتمنى دايمًا يشوفك مبسوطة.

خلي المج ده يفكرك بيا، حتى لو مش موجود جنبك في اللحظة دي.

كل رشفة فيه معاها حتة حب مني ليكي يا كوكو ❤️`},
 {id:'notebook', tag:'المعرض الثاني — عالمك الصغير', card:'ركن عالمك الصغير', teaser:'مساحة صغيرة تخصك، لسه صفحاتها مستنية حكاياتنا.', icon:'📓',
  img:'assets/images/notebook.jpg', title:'حكاياتنا اللي لسه هتتكتب ❤️', pen:true,
  text:`النوتة دي مش مجرد ورق وقلم.

دي مساحة صغيرة تخصك إنتي، اكتبي فيها أحلامك، خواطرك، الحاجات اللي بتفرحك، وكل حاجة نفسك تحكيها.

وعايزك كمان تكتبي فيها كل ذكرى حلوة بينا، كل موقف ضحكنا فيه، وكل لحظة جمعتنا.

نفسي بعد سنين نفتح النوتة دي ونرجع نقرأ كل التفاصيل، ونفتكر قد إيه كانت أيامنا حلوة.

ويمكن نكتشف إن كل يوم عيشناه مع بعض كان أجمل من اللي قبله.`},
 {id:'letter', tag:'المعرض الثالث — رسالة من قلبي', card:'ركن الرسالة', teaser:'ظرف صغير فيه كلام أكبر من إنه يتقال.', icon:'💌',
  title:'رسالة صغيرة من قلبي ليكي',
  text:`في كلام ساعات بيكون أكبر من إنه يتقال في هدية، وعشان كده حبيت أسيبلك رسالة تانية مخصوص.`}
];

const $ = s => document.querySelector(s);

/* ===== Scene navigation (single page, so music never stops) ===== */
function show(id){
  document.querySelectorAll('.scene').forEach(s=>s.classList.remove('active'));
  $('#'+id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ===== Image frame with a styled placeholder when the file is missing ===== */
function frame(src,file){
  const f=document.createElement('div');
  f.className='frame'; f.innerHTML=`<img src="${src}" alt=""><div class="ph">ضيفي الصورة دي: ${file}</div>`;
  f.querySelector('img').onerror=()=>f.classList.add('missing');
  return f;
}

/* ===== Letter corner = go straight to the second website ("A Letter From Hassan") ===== */
function goLetter(){
  if(SECOND_WEBSITE_URL.startsWith('YOUR_')) alert('حطي رابط الموقع التاني في SECOND_WEBSITE_URL داخل script.js');
  else location.href=SECOND_WEBSITE_URL;
}

/* ===== Guided tour: one exhibit at a time, in order (mug -> notebook -> letter) ===== */
let step=0;
const NEXT=['روحي لركن عالمك الصغير ❤️','روحي لركن الرسالة ❤️'];
function btn(txt,cls,fn){const b=document.createElement('button');b.className='btn '+cls;b.textContent=txt;b.onclick=fn;return b;}

// Letter corner: text card on the right, Polaroid on the left (RTL: first child sits on the right)
function letterLayout(e){
  const w=document.createElement('div'); w.className='letter-wrap';
  const card=document.createElement('div'); card.className='letter-card';
  card.innerHTML=`<div class="envelope small"><div class="seal">❤️</div></div><h2>${e.title}</h2><p>${e.text}</p><p class="sign">حبيب قلبك سونا، حسن</p><div class="hr"></div><p class="ily">I LOVE YOU FOREVER ❤️</p>`;
  card.appendChild(btn('افتحي رسالتي ❤️','',()=>{
    if(SECOND_WEBSITE_URL.startsWith('YOUR_')) alert('حطي رابط الموقع التاني في SECOND_WEBSITE_URL داخل script.js');
    else location.href=SECOND_WEBSITE_URL;
  }));
  const pol=document.createElement('figure'); pol.className='polaroid';
  pol.innerHTML=`<span class="tape"></span><div class="pic"><img src="assets/images/couple-photo.jpg" alt=""><div class="ph">📷<br>صورتنا هتتحط هنا<br><small>couple-photo.jpg</small></div></div><figcaption>أحلى سميرة</figcaption>`;
  pol.querySelector('img').onerror=()=>pol.querySelector('.pic').classList.add('missing');
  w.append(card,pol); return w;
}

function openStep(i){
  step=i; const e=EXHIBITS[i], d=$('#detail'); d.innerHTML='';
  const box=document.createElement('div'); box.className='detail-box'+(e.id==='letter'?' wide':'');
  box.insertAdjacentHTML('beforeend','<div class="dots">'+EXHIBITS.map((_,k)=>`<i class="${k===i?'on':k<i?'done':''}"></i>`).join('')+`</div><small class="tag">${e.tag}</small>`);
  if(e.id==='letter'){
    box.appendChild(letterLayout(e));
    box.appendChild(frame('assets/images/gift-details.jpg','gift-details.jpg')); // extra gift details photo
  }else{
    box.appendChild(frame(e.img,e.img.split('/').pop()));
    box.insertAdjacentHTML('beforeend',`<h2>${e.title}</h2>`);
    if(e.pen) box.insertAdjacentHTML('beforeend','<span class="pen">✒️</span>');
    e.text.split('\n\n').forEach((p,k)=>{const el=document.createElement('p');el.textContent=p;el.style.animationDelay=(k*.5)+'s';box.appendChild(el);});
    box.appendChild(btn(NEXT[i],'',()=>EXHIBITS[i+1].id==='letter'?goLetter():openStep(i+1)));
  }
  if(i>0){box.appendChild(document.createElement('br'));box.appendChild(btn('← رجوع','ghost',()=>openStep(i-1)));}
  d.appendChild(box); show('detail');
}

/* ===== Password gate: Samira's birthday (16 March 2007) ===== */
const PASSWORDS=['16032007','1632007','20070316']; // accepted digit-only forms
function checkPw(){
  const ar='٠١٢٣٤٥٦٧٨٩';
  const v=$('#pw').value.replace(/[٠-٩]/g,c=>ar.indexOf(c)).replace(/\D/g,'');
  if(PASSWORDS.includes(v)){ startMusic(); show('entrance'); }
  else $('#pwErr').textContent='لأ يا كوكو، فكري تاني 🌙 ده اليوم اللي القمر جه فيه';
}
$('#pwBtn').onclick=checkPw;
$('#pw').addEventListener('keydown',e=>{if(e.key==='Enter')checkPw();});

/* ===== Music: starts after first interaction, survives scene changes ===== */
let music=null, musicOK=true, wanted=true;
function initMusic(){
  music=new Audio(MUSIC_SRC); music.loop=true; music.volume=.6;
  music.onerror=()=>{musicOK=false; $('#musicBtn').style.display='none';}; // missing file: hide button quietly
}
function startMusic(){ if(!music) initMusic(); if(wanted&&musicOK) music.play().catch(()=>{}); }
$('#musicBtn').onclick=()=>{
  if(!music) initMusic();
  if(music.paused){wanted=true;music.play().catch(()=>{});$('#musicBtn').classList.remove('off');}
  else{wanted=false;music.pause();$('#musicBtn').classList.add('off');}
};
$('#enterBtn').onclick=()=>{ startMusic(); openStep(0); };

/* ===== Floating hearts & sparkles ===== */
const P=$('#particles');
for(let i=0;i<22;i++){
  const s=document.createElement('span'); s.textContent=['❤','✦','♡','✧'][i%4];
  s.style.cssText=`left:${Math.random()*100}%;font-size:${10+Math.random()*16}px;color:${i%2?'#C6A15B':'#ff8aa0'};animation-duration:${10+Math.random()*14}s;animation-delay:${-Math.random()*20}s`;
  P.appendChild(s);
}
