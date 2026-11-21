const $=s=>document.querySelector(s),K='nla_v1',
esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let S={name:'',xp:0,done:{},ch:{},fav:{},notes:{},hist:[],last:null,projects:[],theme:matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'};
try{Object.assign(S,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}},
LV=['Beginner','Learner','Builder','Developer','Entrepreneur','Advanced'],TH=[0,100,300,600,1000,1600],
lvl=()=>TH.filter(t=>S.xp>=t).length-1,
L=AREAS.flatMap(a=>a.lessons.map(l=>({...l,a}))),
lesson=id=>L.find(l=>l.id===id),
pct=(n,d)=>d?Math.round(n/d*100):0,
bar=p=>`<div class="bar"><b style="width:${p}%"></b></div>`,
nDone=ls=>ls.filter(l=>S.done[l.id]).length,
lc=l=>`<a class="card" href="#lesson/${l.id}"><b>${S.done[l.id]?'✅':'📘'} ${esc(l.t)}</b><br><span class="tag">${l.lv}</span> <span class="note">${l.a.n}</span></a>`,
LEGAL='<p class="note">ℹ️ Lernmaterial, keine Rechts- oder Finanzberatung. Alle Beispiele sind fiktiv. Für echte Geschäfte oder Verträge brauchst du als Minderjähriger die Zustimmung deiner Eltern.</p>',
MS=[['Erste Lektion abgeschlossen',()=>nDone(L)>=1],['Erste Challenge geschafft',()=>Object.keys(S.ch).length>=1],['Erstes Projekt angelegt',()=>S.projects.length>=1],['Level 3 – Builder erreicht',()=>lvl()>=2],['Alle Lektionen abgeschlossen',()=>nDone(L)===L.length]],
Q={};

function dash(){
const l=lvl(),nx=TH[l+1],cur=lesson(S.last)||L.find(x=>!S.done[x.id]),
nxt=L.filter(x=>!S.done[x.id]).slice(0,3),act=S.projects.filter(p=>p.s!=='Completed'),
rec=[...new Set(S.hist.map(h=>h.id))].slice(0,3).map(lesson).filter(Boolean);
return `<div class="v"><h1>Hallo${S.name?', '+esc(S.name):''}! 👋</h1>`
+(S.name?'':`<div class="card">Wie sollen wir dich nennen? Ein Spitzname reicht.<input id="nm" maxlength="20"><button class="btn" data-act="name">Speichern</button></div>`)
+`<div class="card"><b>Level ${l+1} – ${LV[l]}</b><br>${S.xp} XP${nx?', noch '+(nx-S.xp)+' XP bis Level '+(l+2):''}${bar(nx?pct(S.xp-TH[l],nx-TH[l]):100)}<p class="note">Gesamtfortschritt: ${pct(nDone(L),L.length)} % (${nDone(L)} von ${L.length} Lektionen)</p>${cur?`<a class="btn" href="#lesson/${cur.id}">▶ CONTINUE LEARNING</a>`:'🎉 Alle Lektionen erledigt!'}</div>`
+`<h2>Zuletzt bearbeitet</h2>${rec.map(lc).join('')||'<p class="note">Noch nichts. Starte deine erste Lektion!</p>'}`
+`<h2>Nächste Lernaufgaben</h2>${nxt.map(lc).join('')||'<p class="note">Alles erledigt. Probiere eine Challenge.</p>'}`
+`<h2>Aktive Projekte</h2>${act.map(p=>`<div class="card"><b>${esc(p.t)}</b> <span class="tag">${p.s}</span></div>`).join('')||'<p class="note">Keine aktiven Projekte. <a href="#projects">Projekt anlegen</a></p>'}`
+`<h2>Meilensteine</h2><div class="card">${MS.map(m=>(m[1]()?'🏅 ':'🔒 ')+m[0]).join('<br>')}</div></div>`}

function areas(){const f=L.filter(l=>S.fav[l.id]);
return `<div class="v"><h1>Lernbereiche</h1><div class="grid">${AREAS.map(a=>`<a class="card" href="#area/${a.id}"><b>${a.ic} ${a.n}</b><p class="note">${a.d}</p>${bar(pct(nDone(a.lessons),a.lessons.length))}<span class="note">${nDone(a.lessons)} von ${a.lessons.length} Lektionen</span></a>`).join('')}</div><h2>⭐ Favoriten</h2>${f.map(lc).join('')||'<p class="note">Tippe in einer Lektion auf ☆.</p>'}<h2>Lernhistorie</h2>${S.hist.slice(0,8).map(h=>lesson(h.id)?`<p class="note">${new Date(h.t).toLocaleString('de-AT')}: ${esc(lesson(h.id).t)}</p>`:'').join('')||'<p class="note">Noch leer.</p>'}</div>`}

const LVLS=['Beginner','Intermediate','Advanced','Expert'],xpOf=c=>({Beginner:50,Intermediate:100,Advanced:150,Expert:250})[c.lv||'Beginner'];
const area=id=>{const a=AREAS.find(x=>x.id===id);if(!a)return areas();const rd=ROAD[a.id]||[];return `<div class="v"><a href="#areas" class="note">Zurück zu Lernbereiche</a><h1>${a.ic} ${a.n}</h1><p>${a.d}</p>${LVLS.map((v,i)=>{const ls=a.lessons.filter(l=>l.lv===v),pl=i&&rd[i-1]?rd[i-1].split(';'):[];return ls.length+pl.length?`<h2>${v}</h2>${ls.map(l=>lc({...l,a})).join('')}${pl.map(t=>`<div class="card note">🔜 Geplant: ${t}</div>`).join('')}`:''}).join('')}${a.legal?LEGAL:''}</div>`};

function lessonV(id){
const l=lesson(id);if(!l)return areas();
S.last=id;if(!S.hist[0]||S.hist[0].id!==id){S.hist.unshift({id,t:Date.now()});S.hist=S.hist.slice(0,30)}save();
const ok=l.quiz.every((q,i)=>Q[id+'.'+i]===q.a),sec=(n,t,b)=>`<h2>${n}. ${t}</h2>${b}`;
return `<div class="v"><a href="#area/${l.a.id}" class="note">Zurück zu ${l.a.n}</a><h1>${esc(l.t)}</h1><span class="tag">${l.lv}</span> <button class="btn g" data-act="fav" data-v="${id}" aria-label="Favorit">${S.fav[id]?'★':'☆'}</button>`
+sec(1,'Einführung',`<p>${l.intro}</p>`)+sec(2,'Grundlagen',`<p>${l.basics}</p>`)+sec(3,'Beispiel',`<pre>${esc(l.ex)}</pre>`)+sec(4,'Praktische Anwendung',`<p>${l.prac}</p>`)+sec(5,'Zusammenfassung',`<p>${l.sum}</p>`)
+sec(6,'Wissens-Check',l.quiz.map((q,i)=>`<div class="card"><b>${q.q}</b>${q.o.map((o,j)=>`<button class="btn g opt ${Q[id+'.'+i]===j?(j===q.a?'ok':'no'):''}" data-act="quiz" data-v="${id}|${i}|${j}">${o}</button>`).join('')}</div>`).join(''))
+sec(7,'Abschlussaufgabe',`<p>${l.task}</p>`)
+`<h2>📝 Notizen</h2><textarea rows="4" data-note="${id}" placeholder="Nur in diesem Browser gespeichert">${esc(S.notes[id]||'')}</textarea>`
+(S.done[id]?'<p>✅ Lektion abgeschlossen</p>':`<button class="btn" data-act="done" data-v="${id}" ${ok?'':'disabled'}>Lektion abschließen (+${xpOf(l)} XP)</button><p class="note">Beantworte den Wissens-Check richtig, dann kannst du abschließen.</p>`)+(l.a.legal?LEGAL:'')+'</div>'}

const chV=a=>{const f=LVLS.includes(a)?a:'',ls=CHALLENGES.filter(c=>!f||(c.lv||'Beginner')===f);return `<div class="v"><h1>Challenges</h1><p>${['Alle',...LVLS].map(v=>`<a class="tag" href="#challenges/${v==='Alle'?'':v}">${v}</a>`).join(' ')}</p><p class="note">Es gibt keine automatische Prüfung. Bewerte dich ehrlich anhand der Kriterien.</p>${ls.map(c=>`<div class="card"><b>${S.ch[c.id]?'✅':'🎯'} ${c.t}</b> <span class="tag">${c.area}</span> <span class="tag">${c.lv||'Beginner'}</span><p>${c.task}</p><p class="note"><b>Lernziele:</b> ${c.goals}<br><b>Bewertung:</b> ${c.crit}</p>${S.ch[c.id]?'':`<button class="btn" data-act="chdone" data-v="${c.id}">Erledigt (+${xpOf(c)} XP)</button>`}</div>`).join('')}</div>`};

const projV=()=>`<div class="v"><h1>Projekte</h1><div class="card"><input id="pt" maxlength="60" placeholder="Projektname"><select id="pty">${PTYPES.map(t=>`<option>${t}</option>`).join('')}</select><button class="btn" data-act="padd">Projekt anlegen</button></div>${S.projects.map(p=>`<div class="card"><b>${esc(p.t)}</b> <span class="tag">${p.ty}</span> <span class="tag">${p.s}</span><textarea rows="2" data-pn="${p.id}" placeholder="Notizen und nächste Schritte">${esc(p.n||'')}</textarea><button class="btn g" data-act="pst" data-v="${p.id}">Status ändern</button> <button class="btn g" data-act="pdel" data-v="${p.id}">Löschen</button></div>`).join('')||'<p class="note">Noch keine Projekte.</p>'}</div>`;

const PH=[['HTL-Grundlagen (1. Klasse)',['mat1','de1','en1','geo1','phy1','log1','hw1','kon1','wk1']],['Programmieren & digitale Grundlagen',['prog1','clang1','clang2']],['Webentwicklung & GitHub',['web1']],['Künstliche Intelligenz & AI-Anwendungen',['ai1']],['Business-Grundlagen & Unternehmertum',['biz1','fin1']],['E-Commerce & Marketing',['eco1','mkt1']],['Eigene Projekte & Unternehmenspartnerschaften',null]];
const pathV=()=>`<div class="v"><h1>My Learning Path</h1>${PH.map((p,i)=>{const ls=p[1]?p[1].map(lesson):null,v=ls?pct(nDone(ls),ls.length):Math.min(100,S.projects.filter(x=>x.s==='Completed').length*100);return `<div class="card"><b>Phase ${i+1}: ${p[0]}</b>${bar(v)}<span class="note">${v} % geschafft</span>${ls?ls.map(lc).join(''):'<p class="note">Setze ein Projekt auf „Completed“, um diese Phase abzuschließen.</p>'}</div>`}).join('')}</div>`;

const DEMO=[[/variabl/i,'Eine Variable ist eine beschriftete Box für einen Wert, z. B. alter = 14. Den Inhalt kannst du später ändern.'],[/schleif|loop/i,'Eine Schleife wiederholt Code: for i in range(3): print(i) gibt 0, 1 und 2 aus.'],[/marge|gewinn/i,'Marge = (Preis − Kosten) ÷ Preis. Fiktives Beispiel: 20 € Preis, 12 € Kosten ergibt 40 % Marge.'],[/fehler|error|bug/i,'Lies die Fehlermeldung von unten nach oben: Zeile, Fehlertyp, Ursache. Oft sind es Tippfehler oder falsche Einrückung.'],[/quiz|frage/i,'Quizfrage: Welcher Datentyp ist "Hallo"? (int, float oder str)']];
const Tutor={endpoint:null,async ask(q){if(this.endpoint){const r=await fetch(this.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q})});return(await r.json()).answer}const m=DEMO.find(d=>d[0].test(q));return m?m[1]:'Im Demo-Modus kenne ich nur diese Stichwörter: Variablen, Schleifen, Gewinnmarge, Fehler, Quiz.'}};
const tutorV=()=>`<div class="v"><h1>AI Tutor</h1><div class="card note">⚠️ Demo-Modus: Es ist keine echte KI verbunden, die Antworten sind vorgefertigt. Eine AI-API kann später über ein eigenes Backend angeschlossen werden (Tutor.endpoint in script.js). API-Schlüssel gehören nie ins Frontend.</div><div id="chat"></div><input id="tq" placeholder="z. B. Was ist eine Variable?"><button class="btn" data-act="ask">Fragen</button></div>`;

function searchV(q){q=q.toLowerCase();const r=L.filter(l=>(l.t+l.intro+l.basics+l.a.n).toLowerCase().includes(q)),c=CHALLENGES.filter(x=>(x.t+x.task).toLowerCase().includes(q));return `<div class="v"><h1>Suche: „${esc(q)}“</h1>${r.map(lc).join('')}${c.map(x=>`<a class="card" href="#challenges">🎯 ${x.t}</a>`).join('')}${r.length+c.length?'':'<p class="note">Nichts gefunden.</p>'}</div>`}

const setV=()=>`<div class="v"><h1>Einstellungen</h1><div class="card"><b>Spitzname</b><input id="nm" maxlength="20" value="${esc(S.name)}"><button class="btn" data-act="name">Speichern</button></div><div class="card"><button class="btn g" data-act="theme">Dark/Light Mode wechseln</button></div><div class="card"><button class="btn g" data-act="reset">Alle Demo-Daten zurücksetzen</button><p class="note">Löscht Fortschritt, Notizen und Projekte in diesem Browser.</p></div><p class="note">Privates Lernprojekt, Version 1. Daten liegen nur lokal im Browser. Gib keine echten persönlichen Daten ein.</p></div>`;

const acts={
theme(){S.theme=S.theme==='dark'?'light':'dark';save();document.documentElement.dataset.theme=S.theme},
name(){S.name=$('#nm').value.trim().slice(0,20);save();route(true)},
fav(id){S.fav[id]=!S.fav[id];save();route(true)},
quiz(v){const[id,i,j]=v.split('|');Q[id+'.'+i]=+j;route(true)},
done(id){const l=lesson(id);if(!l||S.done[id]||!l.quiz.every((q,i)=>Q[id+'.'+i]===q.a))return;S.done[id]=1;S.xp+=xpOf(l);save();route(true)},
chdone(id){const c=CHALLENGES.find(x=>x.id===id);if(!c||S.ch[id])return;S.ch[id]=1;S.xp+=xpOf(c);save();route(true)},
padd(){const t=$('#pt').value.trim();if(!t)return;S.projects.unshift({id:''+Date.now(),t:t.slice(0,60),ty:$('#pty').value,s:PSTAT[0]});save();route(true)},
pst(id){const p=S.projects.find(x=>x.id===id);if(p){p.s=PSTAT[(PSTAT.indexOf(p.s)+1)%PSTAT.length];save();route(true)}},
pdel(id){S.projects=S.projects.filter(x=>x.id!==id);save();route(true)},
reset(){if(confirm('Alle Daten wirklich löschen?')){try{localStorage.removeItem(K)}catch(e){}location.reload()}},
async ask(){const i=$('#tq'),q=i.value.trim();if(!q)return;i.value='';const c=$('#chat');c.insertAdjacentHTML('beforeend',`<div class="card"><b>Du:</b> ${esc(q)}</div>`);let a;try{a=await Tutor.ask(q)}catch(e){a='Die Verbindung ist fehlgeschlagen.'}c.insertAdjacentHTML('beforeend',`<div class="card"><b>Tutor (Demo):</b> ${esc(a)}</div>`)}
};

const V={home:dash,areas,area,lesson:lessonV,challenges:chV,projects:projV,path:pathV,tutor:tutorV,settings:setV,search:searchV};
function route(keep){const y=scrollY,[p,a='']=(location.hash.slice(1)||'home').split('/');
$('#main').innerHTML=(V[p]||dash)(decodeURIComponent(a));
document.querySelectorAll('#nav a').forEach(x=>x.classList.toggle('on',x.dataset.r===(p==='lesson'||p==='area'?'areas':p)));
scrollTo(0,keep===true?y:0)}

$('#nav').innerHTML=[['home','🏠 Dashboard'],['areas','📚 Lernen'],['challenges','🎯 Challenges'],['projects','🛠 Projekte'],['path','🧭 Lernweg'],['tutor','🤖 AI Tutor'],['settings','⚙️ Einstellungen']].map(([r,t])=>`<a href="#${r}" data-r="${r}">${t}</a>`).join('');
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b&&acts[b.dataset.act])acts[b.dataset.act](b.dataset.v)});
document.addEventListener('input',e=>{const t=e.target;
if(t.dataset.note){S.notes[t.dataset.note]=t.value;save()}
else if(t.dataset.pn){const p=S.projects.find(x=>x.id===t.dataset.pn);if(p){p.n=t.value;save()}}
else if(t.id==='q'){const v=t.value.trim();location.hash=v?'#search/'+encodeURIComponent(v):'#home'}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.id==='tq')acts.ask()});
document.documentElement.dataset.theme=S.theme;
addEventListener('hashchange',()=>route());
route();
