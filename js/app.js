const STORAGE_KEY = "inburgering_a2_exp_v3";
function loadProgress(){try{const r=localStorage.getItem(STORAGE_KEY);return r?JSON.parse(r):defaultProgress()}catch{return defaultProgress()}}
function defaultProgress(){return{streak:0,lastStudyDate:null,daysStudied:0,vocabKnown:{},completedLessons:{},skillScores:{listening:[],reading:[],writing:[],speaking:[],knm:[]},pathDone:{},knmCorrect:0,knmTotal:0,onaExempt:false}}
function saveProgress(){localStorage.setItem(STORAGE_KEY,JSON.stringify(progress))}
let progress=loadProgress();
function markStudied(){const t=new Date().toDateString();if(progress.lastStudyDate!==t){const y=new Date();y.setDate(y.getDate()-1);progress.streak=(progress.lastStudyDate===y.toDateString())?progress.streak+1:1;progress.daysStudied++;progress.lastStudyDate=t;saveProgress();updateStats()}}
function avgSkill(s){const a=progress.skillScores[s]||[];return a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0}
function pushScore(s,sc){if(!progress.skillScores[s])progress.skillScores[s]=[];progress.skillScores[s].push(sc);if(progress.skillScores[s].length>20)progress.skillScores[s].shift();saveProgress();updateStats()}

document.querySelectorAll(".nav-btn").forEach(b=>{b.addEventListener("click",()=>{document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".section").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.getElementById(b.dataset.section).classList.add("active")})});
document.getElementById("go-path")?.addEventListener("click",()=>document.querySelector('[data-section="path"]').click());

function updateStats(){
  document.getElementById("stat-streak").textContent=progress.streak;
  document.getElementById("streak-display").textContent="🔥 Streak: "+progress.streak;
  document.getElementById("stat-vocab").textContent=Object.keys(progress.vocabKnown).length;
  document.getElementById("stat-days").textContent=progress.daysStudied;
  const sk=["listening","reading","writing","speaking","knm"];
  const av=sk.map(avgSkill);const ov=av.filter(x=>x>0).length?Math.round(av.reduce((a,b)=>a+b,0)/av.filter(x=>x>0).length):0;
  document.getElementById("stat-skills").textContent=ov+"%";
  document.getElementById("overall-progress").textContent="Overall: "+ov+"%";
  const f=["Module + Vocab","Listening + Writing","Speaking + Grammar","Reading + KNM","Full round","ONA/Mock","Review"];
  document.getElementById("today-focus").textContent=f[new Date().getDay()%7];
  const lb={listening:"Listening",reading:"Reading",writing:"Writing",speaking:"Speaking",knm:"KNM"};
  document.getElementById("skill-bars").innerHTML=sk.map(s=>'<div class="skill-row"><span>'+lb[s]+'</span><div class="bar-bg"><div class="bar-fill" style="width:'+avgSkill(s)+'%"></div></div><div class="skill-pct">'+avgSkill(s)+'%</div></div>').join("");
}
updateStats();
document.getElementById("reset-progress").addEventListener("click",()=>{if(confirm("Reset?")){progress=defaultProgress();saveProgress();location.reload()}});

function speakDutch(text){if(!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="nl-NL";u.rate=0.9;const v=speechSynthesis.getVoices().find(x=>x.lang.startsWith("nl"));if(v)u.voice=v;speechSynthesis.speak(u)}

// VOCAB
let curV=[],vIdx=0;
document.getElementById("start-vocab").onclick=()=>{const c=document.getElementById("vocab-category").value;curV=VOCAB.filter(w=>c==="all"||w.cat===c).sort((a,b)=>(progress.vocabKnown[a.id]?1:0)-(progress.vocabKnown[b.id]?1:0)).slice(0,15);if(!curV.length)return alert("No words");vIdx=0;document.getElementById("vocab-session").classList.remove("hidden");document.getElementById("vocab-list-view").classList.add("hidden");showV();markStudied()};
document.getElementById("vocab-list-btn").onclick=()=>{const c=document.getElementById("vocab-category").value;const l=VOCAB.filter(w=>c==="all"||w.cat===c);let h='<table style="width:100%;border-collapse:collapse;font-size:13px"><tr style="background:#f0f0f0"><th style="text-align:left;padding:6px">Dutch</th><th style="text-align:left;padding:6px">English</th><th>Known</th></tr>';l.forEach(w=>h+='<tr style="border-bottom:1px solid #eee"><td style="padding:6px"><b>'+w.nl+'</b></td><td style="padding:6px">'+w.en+'</td><td style="text-align:center">'+(progress.vocabKnown[w.id]?"✅":"")+'</td></tr>');h+='</table>';document.getElementById("vocab-table").innerHTML=h;document.getElementById("vocab-list-view").classList.remove("hidden");document.getElementById("vocab-session").classList.add("hidden")};
document.getElementById("back-to-vocab").onclick=()=>document.getElementById("vocab-list-view").classList.add("hidden");
document.getElementById("show-answer").onclick=()=>{document.querySelector(".card-front").classList.add("hidden");document.querySelector(".card-back").classList.remove("hidden");document.getElementById("show-answer").classList.add("hidden");document.getElementById("know-btn").classList.remove("hidden");document.getElementById("again-btn").classList.remove("hidden")};
document.getElementById("know-btn").onclick=()=>ansV(true);document.getElementById("again-btn").onclick=()=>ansV(false);
function showV(){const w=curV[vIdx];document.getElementById("vocab-word").textContent=w.nl;document.getElementById("vocab-hint").textContent=w.cat;document.getElementById("vocab-translation").textContent=w.en;document.getElementById("vocab-example").textContent=w.example;document.querySelector(".card-front").classList.remove("hidden");document.querySelector(".card-back").classList.add("hidden");document.getElementById("show-answer").classList.remove("hidden");document.getElementById("know-btn").classList.add("hidden");document.getElementById("again-btn").classList.add("hidden");document.getElementById("vocab-counter").textContent=(vIdx+1)+" / "+curV.length;document.getElementById("vocab-progress").style.width=(vIdx/curV.length*100)+"%"}
function ansV(k){const w=curV[vIdx];if(k)progress.vocabKnown[w.id]=true;else delete progress.vocabKnown[w.id];saveProgress();updateStats();vIdx++;if(vIdx>=curV.length){document.getElementById("vocab-session").classList.add("hidden");alert("Klaar!")}else showV()}

// GRAMMAR
function renderG(){document.getElementById("grammar-list").innerHTML=GRAMMAR_LESSONS.map(l=>'<div class="lesson-item" data-id="'+l.id+'"><div><h3>'+l.title+'</h3><p>'+l.level+'</p></div><span class="badge">'+(progress.completedLessons[l.id]?"Done":"Open")+'</span></div>').join("");document.querySelectorAll("#grammar-list .lesson-item").forEach(el=>el.onclick=()=>openG(el.dataset.id))}
function openG(id){const l=GRAMMAR_LESSONS.find(x=>x.id===id);const d=document.getElementById("grammar-detail");d.innerHTML='<div class="detail-header"><button class="back-btn" id="gb">← Back</button><h2>'+l.title+'</h2></div>'+l.content+'<div class="card"><button class="btn primary" id="gdone">Mark as done</button></div>';document.getElementById("grammar-list").classList.add("hidden");d.classList.remove("hidden");document.getElementById("gb").onclick=()=>{d.classList.add("hidden");document.getElementById("grammar-list").classList.remove("hidden")};document.getElementById("gdone").onclick=()=>{progress.completedLessons[id]=true;saveProgress();markStudied();alert("Done!");d.classList.add("hidden");document.getElementById("grammar-list").classList.remove("hidden");renderG()}}
renderG();

// LISTENING
function renderL(){document.getElementById("listening-list").innerHTML=LISTENING_ITEMS.map(i=>'<div class="lesson-item" data-id="'+i.id+'"><div><h3>'+i.title+'</h3><p>'+i.level+' • '+i.questions.length+' Q</p></div><span class="badge">Listen</span></div>').join("");document.querySelectorAll("#listening-list .lesson-item").forEach(el=>el.onclick=()=>openL(el.dataset.id))}
function openL(id){const item=LISTENING_ITEMS.find(x=>x.id===id);const d=document.getElementById("listening-detail");d.innerHTML='<div class="detail-header"><button class="back-btn" id="lb">← Back</button><h2>'+item.title+'</h2></div><div class="card"><div class="audio-controls"><button class="btn primary" id="pl">▶ Play</button><button class="btn" id="st">Stop</button></div><details><summary style="cursor:pointer">Transcript</summary><div class="transcript-box">'+item.text+'</div></details></div><div id="lqs"></div><button class="btn primary" id="cl">Check</button><div id="lr" class="hidden"></div>';document.getElementById("listening-list").classList.add("hidden");d.classList.remove("hidden");document.getElementById("lb").onclick=()=>{d.classList.add("hidden");document.getElementById("listening-list").classList.remove("hidden");speechSynthesis.cancel()};document.getElementById("pl").onclick=()=>speakDutch(item.text);document.getElementById("st").onclick=()=>speechSynthesis.cancel();let qh="";item.questions.forEach((q,i)=>{qh+='<div class="quiz-question" data-qi="'+i+'"><h3>'+(i+1)+'. '+q.q+'</h3><div class="options">';q.options.forEach((o,j)=>qh+='<div class="option" data-j="'+j+'">'+o+'</div>');qh+='</div></div>'});document.getElementById("lqs").innerHTML=qh;d.querySelectorAll(".option").forEach(o=>o.onclick=()=>{o.parentElement.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));o.classList.add("selected")});document.getElementById("cl").onclick=()=>{let c=0;item.questions.forEach((q,i)=>{const cont=d.querySelector('[data-qi="'+i+'"] .options');const sel=cont.querySelector(".selected");cont.querySelectorAll(".option").forEach(o=>{if(+o.dataset.j===q.correct)o.classList.add("correct")});if(sel&&+sel.dataset.j===q.correct){c++;sel.classList.add("correct")}else if(sel)sel.classList.add("wrong")});const p=Math.round(c/item.questions.length*100);pushScore("listening",p);document.getElementById("lr").classList.remove("hidden");document.getElementById("lr").innerHTML='<div class="score-box"><div class="big-score">'+p+'%</div>'+c+'/'+item.questions.length+'</div>';markStudied()}}
renderL();

// READING
function renderR(){document.getElementById("reading-list").innerHTML=READING_TEXTS.map(t=>'<div class="lesson-item" data-id="'+t.id+'"><div><h3>'+t.title+'</h3><p>'+t.level+'</p></div><span class="badge">Read</span></div>').join("");document.querySelectorAll("#reading-list .lesson-item").forEach(el=>el.onclick=()=>openR(el.dataset.id))}
function openR(id){const t=READING_TEXTS.find(x=>x.id===id);const d=document.getElementById("reading-detail");d.innerHTML='<div class="detail-header"><button class="back-btn" id="rb">← Back</button><h2>'+t.title+'</h2></div><div class="card"><pre style="white-space:pre-wrap;font-family:inherit">'+t.text+'</pre></div><div id="rqs"></div><button class="btn primary" id="cr">Check</button><div id="rr" class="hidden"></div>';document.getElementById("reading-list").classList.add("hidden");d.classList.remove("hidden");document.getElementById("rb").onclick=()=>{d.classList.add("hidden");document.getElementById("reading-list").classList.remove("hidden")};let qh="";t.questions.forEach((q,i)=>{qh+='<div class="quiz-question" data-qi="'+i+'"><h3>'+(i+1)+'. '+q.q+'</h3><div class="options">';q.options.forEach((o,j)=>qh+='<div class="option" data-j="'+j+'">'+o+'</div>');qh+='</div></div>'});document.getElementById("rqs").innerHTML=qh;d.querySelectorAll(".option").forEach(o=>o.onclick=()=>{o.parentElement.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));o.classList.add("selected")});document.getElementById("cr").onclick=()=>{let c=0;t.questions.forEach((q,i)=>{const cont=d.querySelector('[data-qi="'+i+'"] .options');const sel=cont.querySelector(".selected");cont.querySelectorAll(".option").forEach(o=>{if(+o.dataset.j===q.correct)o.classList.add("correct")});if(sel&&+sel.dataset.j===q.correct){c++;sel.classList.add("correct")}else if(sel)sel.classList.add("wrong")});const p=Math.round(c/t.questions.length*100);pushScore("reading",p);document.getElementById("rr").classList.remove("hidden");document.getElementById("rr").innerHTML='<div class="score-box"><div class="big-score">'+p+'%</div>'+c+'/'+t.questions.length+'</div>';markStudied()}}
renderR();

// WRITING
function renderW(){document.getElementById("writing-list").innerHTML=WRITING_TASKS.map(t=>'<div class="lesson-item" data-id="'+t.id+'"><div><h3>'+t.title+'</h3><p>'+t.type+'</p></div><span class="badge">Write</span></div>').join("");document.querySelectorAll("#writing-list .lesson-item").forEach(el=>el.onclick=()=>openW(el.dataset.id))}
function openW(id){const t=WRITING_TASKS.find(x=>x.id===id);const d=document.getElementById("writing-detail");d.innerHTML='<div class="detail-header"><button class="back-btn" id="wb">← Back</button><h2>'+t.title+'</h2></div><div class="card"><div class="task-box">'+t.prompt+'</div><textarea class="write-input" id="wa" placeholder="Schrijf hier..."></textarea><button class="btn primary" id="ew">Evaluate</button><div id="wr" class="hidden"></div><button class="btn" id="sm" style="margin-top:10px">Model answer</button><div id="mw" class="hidden model-answer"></div></div>';document.getElementById("writing-list").classList.add("hidden");d.classList.remove("hidden");document.getElementById("wb").onclick=()=>{d.classList.add("hidden");document.getElementById("writing-list").classList.remove("hidden")};document.getElementById("ew").onclick=()=>{const text=document.getElementById("wa").value.trim().toLowerCase();if(text.length<10)return alert("Write first");const words=text.split(/\s+/).length;let hits=0;t.keywords.forEach(k=>{if(text.includes(k.toLowerCase()))hits++});const ks=Math.min(100,Math.round(hits/Math.max(2,t.keywords.length*0.4)*100));const ls=words>=t.minWords?100:Math.round(words/t.minWords*100);const hasG=/geachte|beste|hoi|hallo/.test(text);const hasC=/groet|vriendelijke/.test(text);const tot=Math.min(100,Math.round(ks*0.5+ls*0.3+(hasG?10:0)+(hasC?10:0)));pushScore("writing",tot);document.getElementById("wr").classList.remove("hidden");document.getElementById("wr").innerHTML='<div class="score-box"><div class="big-score">'+tot+'%</div>Keywords: '+hits+' • Words: '+words+'</div>';markStudied()};document.getElementById("sm").onclick=()=>{document.getElementById("mw").classList.remove("hidden");document.getElementById("mw").innerHTML="<strong>Model:</strong><br>"+t.model.replace(/\n/g,"<br>")}}
renderW();

// SPEAKING
function renderS(){document.getElementById("speaking-list").innerHTML=SPEAKING_PROMPTS.map(p=>'<div class="lesson-item" data-id="'+p.id+'"><div><h3>'+p.title+'</h3><p>'+p.situation+'</p></div><span class="badge">Speak</span></div>').join("");document.querySelectorAll("#speaking-list .lesson-item").forEach(el=>el.onclick=()=>openS(el.dataset.id))}

function openS(id){
  const p = SPEAKING_PROMPTS.find(x => x.id === id);
  const d = document.getElementById("speaking-detail");
  d.innerHTML = '<div class="detail-header"><button class="back-btn" id="sb">← Back</button><h2>'+p.title+'</h2></div>'+
    '<div class="card"><p>'+p.situation+'</p><ol>'+p.tasks.map(t=>'<li>'+t+'</li>').join("")+'</ol>'+
    '<div class="audio-controls" style="margin-top:16px">'+
    '<button class="btn mic" id="mic">🎤 Start speaking</button>'+
    '<button class="btn" id="he">▶ Example</button>'+
    '<button class="btn" id="clear-tr" style="display:none">Clear</button>'+
    '</div>'+
    '<div class="transcript-box" id="st">Druk op de microfoon en spreek. Je kunt lang praten – druk op Stop als je klaar bent.</div>'+
    '<div id="ss" class="hidden"></div>'+
    '<p style="font-size:12px;color:var(--muted);margin-top:8px">Tip: Spreek duidelijk en niet te snel. Chrome werkt het best. Als het stopt, druk opnieuw op Start en ga verder.</p>'+
    '</div>';
  document.getElementById("speaking-list").classList.add("hidden");
  d.classList.remove("hidden");
  document.getElementById("sb").onclick = () => {
    d.classList.add("hidden");
    document.getElementById("speaking-list").classList.remove("hidden");
    if (window._currentRec) { try { window._currentRec.stop(); } catch(e){} }
  };
  document.getElementById("he").onclick = () => speakDutch(p.example);

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  let fullTranscript = "";
  let isRecording = false;

  if (SR) {
    rec = new SR();
    rec.lang = "nl-NL";
    rec.continuous = true;          // important: keep listening
    rec.interimResults = true;      // show live text
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          final += t + " ";
        } else {
          interim += t;
        }
      }
      if (final) fullTranscript += final;
      document.getElementById("st").textContent = (fullTranscript + interim).trim() || "Luisteren...";
    };

    rec.onerror = (e) => {
      console.log("Speech error:", e.error);
      if (e.error === "no-speech" || e.error === "aborted") {
        // ignore, user can continue
        return;
      }
      document.getElementById("st").textContent = "Fout: " + e.error + ". Probeer opnieuw.";
    };

    rec.onend = () => {
      // If user is still supposed to be recording, restart automatically
      if (isRecording) {
        try {
          rec.start();
        } catch (err) {
          // already started or other issue
        }
      } else {
        const mic = document.getElementById("mic");
        if (mic) {
          mic.classList.remove("recording");
          mic.textContent = "🎤 Start speaking";
        }
      }
    };
  }

  window._currentRec = rec;

  const mic = document.getElementById("mic");
  mic.onclick = () => {
    if (!rec) {
      const m = prompt("Microfoon niet ondersteund. Typ wat je zou zeggen:");
      if (m) scoreS(m, p);
      return;
    }

    if (isRecording) {
      // STOP
      isRecording = false;
      try { rec.stop(); } catch(e){}
      mic.classList.remove("recording");
      mic.textContent = "🎤 Start speaking";
      const finalText = (fullTranscript || document.getElementById("st").textContent || "").trim();
      if (finalText && finalText !== "Luisteren..." && finalText.length > 3) {
        scoreS(finalText, p);
      }
      document.getElementById("clear-tr").style.display = "inline-block";
    } else {
      // START
      fullTranscript = "";
      isRecording = true;
      document.getElementById("st").textContent = "Luisteren... spreek nu (druk op Stop als je klaar bent)";
      document.getElementById("ss").classList.add("hidden");
      mic.classList.add("recording");
      mic.textContent = "⏹ Stop";
      try {
        rec.start();
      } catch (err) {
        // sometimes needs a small delay
        setTimeout(() => { try { rec.start(); } catch(e){} }, 300);
      }
    }
  };

  document.getElementById("clear-tr").onclick = () => {
    fullTranscript = "";
    document.getElementById("st").textContent = "Transcript gewist. Je kunt opnieuw beginnen.";
    document.getElementById("ss").classList.add("hidden");
  };
}

function scoreS(tr,p){const t=tr.toLowerCase();let h=0;p.keywords.forEach(k=>{if(t.includes(k.toLowerCase()))h++});const ks=Math.min(100,Math.round(h/Math.max(1,p.keywords.length*0.4)*100));const ls=t.split(/\s+/).length>=6?100:Math.round(t.split(/\s+/).length/6*100);const tot=Math.min(100,Math.round(ks*0.6+ls*0.4));pushScore("speaking",tot);document.getElementById("ss").classList.remove("hidden");document.getElementById("ss").innerHTML='<div class="score-box"><div class="big-score">'+tot+'%</div>Keywords: '+h+'</div>';markStudied()}
renderS();

// KNM
function renderK(){document.getElementById("knm-topics").innerHTML=KNM_TOPICS.map(t=>'<div class="lesson-item" data-id="'+t.id+'"><div><h3>'+t.title+'</h3><p>'+t.points.length+' points</p></div><span class="badge">Theory</span></div>').join("");document.querySelectorAll("#knm-topics .lesson-item").forEach(el=>el.onclick=()=>{const t=KNM_TOPICS.find(x=>x.id===el.dataset.id);const d=document.getElementById("knm-topic-detail");d.innerHTML='<div class="detail-header"><button class="back-btn" id="kb">← Back</button><h2>'+t.title+'</h2></div><div class="theory-card"><ul>'+t.points.map(p=>'<li>'+p+'</li>').join("")+'</ul></div>';document.getElementById("knm-topics").classList.add("hidden");d.classList.remove("hidden");document.getElementById("kb").onclick=()=>{d.classList.add("hidden");document.getElementById("knm-topics").classList.remove("hidden")};markStudied()})}
renderK();
document.querySelectorAll(".tab-btn").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tab-btn").forEach(x=>x.classList.remove("active"));document.querySelectorAll(".tab-content").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.getElementById(b.dataset.tab).classList.add("active")});
let kQs=[],kI=0,kS=0;
document.getElementById("start-knm-quiz").onclick=()=>{kQs=[...KNM_QUESTIONS].sort(()=>Math.random()-0.5).slice(0,12);kI=0;kS=0;document.getElementById("knm-quiz-area").classList.remove("hidden");showKQ();markStudied()};
function showKQ(){const a=document.getElementById("knm-quiz-area");if(kI>=kQs.length){const p=Math.round(kS/kQs.length*100);pushScore("knm",p);a.innerHTML='<div class="card"><h2>Klaar!</h2><div class="big-score" style="font-size:32px;color:var(--primary)">'+p+'%</div><button class="btn primary" onclick="document.getElementById(\'start-knm-quiz\').click()">Again</button></div>';return}const q=kQs[kI];let o="";q.options.forEach((x,j)=>o+='<div class="option" data-j="'+j+'">'+x+'</div>');a.innerHTML='<div class="quiz-question"><p>Q '+(kI+1)+'/'+kQs.length+'</p><h3>'+q.q+'</h3><div class="options">'+o+'</div><div id="ke" class="explanation hidden"></div><button class="btn primary" id="kn" disabled>Next</button></div>';let ans=false;a.querySelectorAll(".option").forEach(op=>op.onclick=()=>{if(ans)return;ans=true;const j=+op.dataset.j;a.querySelectorAll(".option").forEach(x=>{if(+x.dataset.j===q.correct)x.classList.add("correct")});if(j===q.correct){op.classList.add("correct");kS++}else op.classList.add("wrong");document.getElementById("ke").textContent=q.expl;document.getElementById("ke").classList.remove("hidden");document.getElementById("kn").disabled=false});document.getElementById("kn").onclick=()=>{kI++;showKQ()}}

// ONA
document.getElementById("ona-content").innerHTML=ONA_CONTENT;
setTimeout(()=>{
  const btn=document.getElementById("ona-exempt-btn");
  const st=document.getElementById("ona-exempt-status");
  if(progress.onaExempt){st.textContent="✅ Je hebt ONA als muaf gemarkeerd.";btn.style.display="none"}
  if(btn)btn.onclick=()=>{if(confirm("ONA’dan muaf olduğunuzu onaylıyor musunuz? (Mijn Inburgering’den kontrol edin)")){progress.onaExempt=true;saveProgress();st.textContent="✅ ONA muaf olarak işaretlendi.";btn.style.display="none";markStudied()}};
},100);

// PATH
function renderP(){document.getElementById("path-modules").innerHTML=PATH_MODULES.map((m,i)=>{const done=progress.pathDone[m.id];const locked=i>0&&!progress.pathDone[PATH_MODULES[i-1].id];return '<div class="lesson-item '+(locked?"locked":"")+'" data-id="'+m.id+'"><div><h3>'+m.title+'</h3><p>'+m.desc+'</p></div><span class="badge '+(locked?"locked":"")+'">'+(done?"✅":locked?"🔒":"Start")+'</span></div>'}).join("");document.querySelectorAll("#path-modules .lesson-item").forEach(el=>el.onclick=()=>{if(el.classList.contains("locked"))return alert("Önce önceki modülü bitir");const m=PATH_MODULES.find(x=>x.id===el.dataset.id);const d=document.getElementById("path-detail");d.innerHTML='<div class="detail-header"><button class="back-btn" id="pb">← Back</button><h2>'+m.title+'</h2></div><div class="card"><p>'+m.desc+'</p><button class="btn primary" id="mpd">Mark done ✓</button></div>';document.getElementById("path-modules").classList.add("hidden");d.classList.remove("hidden");document.getElementById("pb").onclick=()=>{d.classList.add("hidden");document.getElementById("path-modules").classList.remove("hidden")};document.getElementById("mpd").onclick=()=>{progress.pathDone[m.id]=true;saveProgress();alert("Done!");d.classList.add("hidden");document.getElementById("path-modules").classList.remove("hidden");renderP();markStudied()}})}
renderP();

// MOCK
document.querySelectorAll(".mock-start").forEach(b=>b.onclick=()=>{const area=document.getElementById("mock-area");area.classList.remove("hidden");let qs=[...KNM_QUESTIONS].sort(()=>Math.random()-0.5).slice(0,10);let i=0,sc=0;function sh(){if(i>=qs.length){const p=Math.round(sc/qs.length*100);area.innerHTML='<div class="card"><h2>Finished</h2><div class="big-score" style="font-size:32px;color:var(--primary)">'+p+'%</div><button class="btn primary" onclick="location.reload()">Back</button></div>';markStudied();return}const q=qs[i];let o="";q.options.forEach((x,j)=>o+='<div class="option" data-j="'+j+'">'+x+'</div>');area.innerHTML='<div class="quiz-question"><p>Q '+(i+1)+'/'+qs.length+'</p><h3>'+q.q+'</h3><div class="options">'+o+'</div><button class="btn primary" id="mn" disabled>Next</button></div>';let a=false;area.querySelectorAll(".option").forEach(op=>op.onclick=()=>{if(a)return;a=true;const j=+op.dataset.j;area.querySelectorAll(".option").forEach(x=>{if(+x.dataset.j===q.correct)x.classList.add("correct")});if(j===q.correct){op.classList.add("correct");sc++}else op.classList.add("wrong");document.getElementById("mn").disabled=false});document.getElementById("mn").onclick=()=>{i++;sh()}}sh()});

console.log("Expanded trainer ready – 20+ per section + ONA exempt");
