/* =========================================================
   VITAL · Actividades propias (gimnasio, deportes, clases)
   Quien ya entrena registra lo que hace; las rutinas de Vital
   quedan como complemento opcional.
   ========================================================= */
"use strict";

/* deporte: [nombre, ícono, MET aprox., músculos, complemento (ejercicios), con distancia] */
const DEP = {
 gimnasio:["Gimnasio / pesas","🏋️",5.5,null,["gato-vaca","rotacion-toracica","tobillo-pared","cadera-flexor","figura4","estir-pecho","respiracion"],0],
 funcional:["Funcional / crossfit","🔥",8,["piernas","gluteos","pecho","espalda","hombros","brazos","core"],["gato-vaca","rotacion-toracica","tobillo-pared","cadera-flexor","estir-pecho","dead-bug","respiracion"],0],
 running:["Running","🏃",9,["piernas","gluteos"],["sentadilla","puente-una","talones","pm-una-pierna","plancha-lateral","tobillo-pared","cadera-flexor","estir-isquios"],1],
 caminata:["Caminata","🚶",3.8,["piernas"],["sentadilla","puente","talones","una-pierna","estir-isquios"],1],
 ciclismo:["Ciclismo / bici","🚴",7.5,["piernas","gluteos"],["puente","plancha-lateral","nadador","cadera-flexor","estir-cuadriceps","rotacion-toracica"],1],
 spinning:["Spinning","🚲",8.5,["piernas","gluteos"],["puente","plancha-lateral","nadador","cadera-flexor","estir-cuadriceps","rotacion-toracica"],0],
 natacion:["Natación","🏊",7,["espalda","hombros","brazos","core"],["nadador","plancha","puente","circulos-brazos","estir-pecho","rotacion-toracica"],1],
 futbol:["Fútbol","⚽",8,["piernas","gluteos","core"],["pm-una-pierna","zancada-atras","puente","plancha-lateral","una-pierna","cadera-flexor","figura4"],0],
 voley:["Vóley","🏐",5,["piernas","hombros","core"],["sentadilla","nadador","plancha-lateral","una-pierna","talones","circulos-brazos","estir-pecho"],0],
 basquet:["Básquet","🏀",6.5,["piernas","hombros","core"],["sentadilla","nadador","plancha-lateral","una-pierna","talones","tobillo-pared","estir-pecho"],0],
 tenis:["Tenis / pádel","🎾",7,["piernas","hombros","brazos","core"],["sentadilla","nadador","plancha-lateral","una-pierna","circulos-brazos","rotacion-toracica","estir-pecho"],0],
 hockey:["Hockey","🏑",8,["piernas","gluteos","core"],["pm-una-pierna","zancada-atras","puente","plancha-lateral","una-pierna","cadera-flexor","rotacion-toracica"],0],
 rugby:["Rugby","🏉",8.3,["piernas","gluteos","hombros","core"],["pm-una-pierna","puente","plancha-lateral","nadador","cadera-flexor","cuello"],0],
 pole:["Pole dance","💃",6,["hombros","brazos","core","espalda"],["nadador","dead-bug","plancha","bird-dog","circulos-brazos","estir-pecho","gato-vaca","cuello"],0],
 baile:["Baile / zumba","🕺",5.5,["piernas","core"],["sentadilla","flexion-rodillas","nadador","plancha","estir-pecho"],0],
 yoga:["Yoga","🧘",3,["core"],["sentadilla","flexion-rodillas","nadador","plancha"],0],
 pilates:["Pilates","🤸",3.5,["core"],["sentadilla","flexion-rodillas","remo-banda","nadador"],0],
 boxeo:["Boxeo / artes marciales","🥊",8,["hombros","brazos","core","piernas"],["gato-vaca","rotacion-toracica","cadera-flexor","estir-pecho","dead-bug","cuello"],0],
 senderismo:["Senderismo / trekking","🥾",6,["piernas","gluteos"],["sentadilla","subida-escalon","talones","tobillo-pared","estir-cuadriceps"],1],
 escalada:["Escalada","🧗",8,["espalda","brazos","core"],["estir-pecho","circulos-brazos","plancha","puente","cuello"],0],
 otro:["Otra actividad","✨",5,["piernas","core"],["gato-vaca","rotacion-toracica","cadera-flexor","estir-pecho","respiracion"],0]
};
const INTENS = [["suave","Suave","Podés charlar sin problema",4,.8],["moderada","Moderada","Respirás más rápido, pero hablás",6,1],["intensa","Intensa","Te cuesta hablar",8,1.15],["maxima","Al máximo","Competencia o a fondo",9.5,1.3]];
const WK2DEP = {caminata:"caminata",carrera:"running",cinta:"running",bicicleta:"ciclismo","bici fija":"spinning",natación:"natacion",senderismo:"senderismo",yoga:"yoga",baile:"baile",fuerza:"gimnasio",HIIT:"funcional",elíptico:"otro",pilates:"pilates",fútbol:"futbol",actividad:"otro"};

/* ---------- Nivel por actividad ----------
   p.niv = {running:{l:1-3, ret:true/false}, …}. Cada actividad se mide a su manera.
   «Retomando» = venías de ese nivel pero estuviste parado: arranca un escalón abajo. */
const NIVN=["","Inicial","Intermedio","Avanzado"];
const NIVQ={
 fuerza:{q:"¿Hace cuánto entrenás con pesas?",o:["Menos de 6 meses","De 6 meses a 2 años, 3 o más veces por semana","Más de 2 años seguidos y manejás progresiones de carga"]},
 running:{q:"¿Cuánto podés correr sin parar?",o:["Menos de 10 minutos, o alternando con caminata","Entre 20 y 40 minutos (unos 5 km)","10 km o más"]},
 caminata:{q:"¿Cuánto caminás seguido sin cansarte?",o:["Hasta 30 minutos","De 30 a 60 minutos","Más de una hora a buen ritmo"]},
 ciclismo:{q:"¿Cuánto pedaleás en una salida?",o:["Hasta 15 km","De 15 a 50 km","Más de 50 km o con subidas"]},
 natacion:{q:"¿Cuánto nadás seguido?",o:["Menos de 200 m","De 200 a 1000 m","Más de 1 km"]},
 senderismo:{q:"¿Qué salidas hacés?",o:["Caminatas de hasta 2 horas","Medio día con algo de subida","Día completo o con mucho desnivel"]},
 clase:{q:"¿Hace cuánto lo practicás?",o:["Recién empiezo (menos de 6 meses)","De 6 meses a 3 años","Más de 3 años o compito"]}
};
const NIVTIPO={gimnasio:"fuerza",funcional:"fuerza",running:"running",caminata:"caminata",ciclismo:"ciclismo",natacion:"natacion",senderismo:"senderismo"};
function nivDe(p,dep){const n=((p&&p.niv)||{})[dep];return n&&n.l?n:null}
function nivEf(p,dep){const n=nivDe(p,dep);return n?Math.max(1,n.l-(n.ret?1:0)):1}
function nivTxt(p,dep){const n=nivDe(p,dep);return n?NIVN[n.l]+(n.ret?" · retomando":""):"sin nivel"}
window.nivDe=nivDe;window.nivEf=nivEf;window.nivTxtP=nivTxt;
// Bloque de preguntas de nivel. obj: perfil o borrador · pre: prefijo de la acción (o = onboarding, p = perfil)
function nivBloque(obj,pre,deps){if(!deps.length)return "";
  return deps.map(k=>{const q=NIVQ[NIVTIPO[k]||"clase"];const n=(obj.niv||{})[k]||{};
    return `<div style="margin:10px 0;padding:10px 12px;border-radius:16px;background:rgba(255,255,255,.05)"><p class="sm"><b>${DEP[k][1]} ${esc(DEP[k][0])}</b> · ${q.q}</p><div class="opts" style="margin-top:6px">${q.o.map((t,i)=>`<button class="opt ${n.l===i+1?"on":""}" data-act="${pre}-niv" data-v="${k}:${i+1}" style="text-align:left">${NIVN[i+1]}<br><span class="xs mute" style="font-weight:500">${t}</span></button>`).join("")}<button class="opt ${n.ret?"on":""}" data-act="${pre}-nivr" data-v="${k}">↺ Estoy retomando</button></div></div>`}).join("")}
window.nivOnb=function(d){const deps=(d.sports||[]).filter(k=>DEP[k]&&k!=="otro");if(!deps.length)return "";
  return `<label class="f">¿En qué nivel estás en cada una?</label><p class="xs faint">Así Vital no te hace arrancar de cero si ya tenés experiencia. «Retomando» es para cuando estuviste un tiempo parado.</p>${nivBloque(d,"o",deps)}`};
function setNiv(obj,v){const [k,l]=v.split(":");obj.niv=obj.niv||{};const n=obj.niv[k]||{};n.l=+l;obj.niv[k]=n}
function togRet(obj,k){obj.niv=obj.niv||{};const n=obj.niv[k]||{l:0};n.ret=!n.ret;obj.niv[k]=n}
function abrirNiveles(){const p=P();const deps=depDe(p).filter(k=>k!=="otro");
  sheet(`<h2>Tu nivel en cada actividad</h2><p class="xs mute">Podés cambiarlo cuando quieras. Vital también te avisa cuando parece que estás para subir.</p>${nivBloque(p,"p",deps)||'<p class="sm mute">Primero elegí tus actividades en el perfil.</p>'}<button class="btn block" style="margin-top:12px" data-act="close">Listo</button>`)}
// Si las últimas 3 sesiones de una actividad fueron suaves y largas, propone subir
function sugerenciaNivel(p){for(const k of depDe(p)){if(k==="otro")continue;const n=nivDe(p,k);if(!n||n.l>=3)continue;
    const ws=[];for(let i=0;i<28&&ws.length<3;i++){const d=L(p.id).days[addDays(TODAY(),-i)];if(d)d.workouts.filter(w=>w.src==="act"&&w.dep===k).sort((a,b)=>b.ts-a.ts).forEach(w=>ws.length<3&&ws.push(w))}
    if(ws.length===3&&ws.every(w=>w.rpe<=4&&w.min>=30)&&!(p.nivAviso||{})[k+n.l])return {k,n};}
  return null}

function depDe(p){return (p.sports||[]).filter(s=>DEP[s])}
function kcalAct(p,dep,min,intens){const w=+p.weight||70;const f=(INTENS.find(x=>x[0]===intens)||INTENS[1])[4];
  // a la misma sensación de esfuerzo, quien tiene más nivel va más rápido y gasta más
  const nf=["running","ciclismo","natacion"].includes(NIVTIPO[dep])&&nivDe(p,dep)?[1,.85,1,1.15][nivEf(p,dep)]:1;
  return Math.round(DEP[dep][2]*f*nf*w*min/60)}
function consejoPropio(p){const rd=readiness(p.id);if(!rd)return "Hacé el check-in y te digo cómo encarar tu entrenamiento de hoy.";
  const rec=recovery(p.id);const deps=depDe(p);let extra="";
  if(deps.length){const mus=new Set();deps.forEach(d=>(DEP[d][3]||[]).forEach(m=>mus.add(m)));const bajos=[...mus].filter(m=>rec[m]<55);if(bajos.length)extra=" "+bajos.map(m=>MUS[m]).join(" y ")+(bajos.length>1?" todavía están":" todavía está")+" al "+Math.min(...bajos.map(m=>rec[m]))+"% de recuperación.";}
  return ({empujar:"Buen día para entrenar fuerte o competir.",constante:"Entrená normal y escuchá al cuerpo en la parte final.",suave:"Si entrenás hoy, bajá un cambio: más técnica, menos volumen o intensidad moderada.",recuperar:"Hoy conviene descansar o algo suave (caminar, movilidad). Si tenés partido o clase, tomalo con calma."})[rd.mode]+extra}

/* ---------- Registrar actividad ---------- */
let ACT=null;
function abrirActividad(pref){const p=P();const deps=depDe(p);const now=new Date();
  ACT=Object.assign({dep:deps[0]||"gimnasio",dia:TODAY(),min:60,intens:"moderada",mus:[],km:"",nota:"",hora:null,extId:null},pref||{});
  if(!ACT.hora){const h=new Date(now.getTime()-ACT.min*6e4);ACT.hora=String(h.getHours()).padStart(2,"0")+":"+String(h.getMinutes()).padStart(2,"0")}
  dibActividad()}
function dibActividad(){const p=P();const deps=depDe(p);const orden=[...deps,...Object.keys(DEP).filter(k=>!deps.includes(k))];const d=DEP[ACT.dep];
  const musSel=ACT.dep==="gimnasio";
  sheet(`<h2>Registrar actividad</h2><p class="xs mute">Lo que hacés por tu cuenta suma igual que las rutinas de Vital.</p>
  <label class="f">¿Qué hiciste?</label><div class="opts">${orden.map(k=>`<button class="opt ${ACT.dep===k?"on":""}" data-act="adep" data-v="${k}">${DEP[k][1]} ${DEP[k][0]}</button>`).join("")}</div>
  ${ACT.dep!=="otro"?`<div class="row wrap" style="gap:6px;margin-top:8px"><span class="xs mute">Tu nivel:</span>${[1,2,3].map(l=>`<button class="chip" data-act="aniv" data-v="${l}" style="${(nivDe(p,ACT.dep)||{}).l===l?"border-color:var(--mint);background:rgba(94,234,212,.2)":""}">${NIVN[l]}</button>`).join("")}<button class="chip" data-act="anivr" style="${(nivDe(p,ACT.dep)||{}).ret?"border-color:var(--mint);background:rgba(94,234,212,.2)":""}">↺ retomando</button></div>`:""}
  <div class="grid2"><div><label class="f">Día</label><div class="opts">${[[TODAY(),"Hoy"],[addDays(TODAY(),-1),"Ayer"]].map(([k,n])=>`<button class="opt ${ACT.dia===k?"on":""}" data-act="adia" data-v="${k}">${n}</button>`).join("")}</div></div>
   <div><label class="f">Empezó a las</label><input class="in" type="time" id="ahora" value="${ACT.hora}"></div></div>
  <label class="f">Duración</label><div class="opts">${[20,30,45,60,90,120].map(m=>`<button class="opt ${ACT.min===m?"on":""}" data-act="amin" data-v="${m}">${m<60?m+" min":(m/60)+" h"}</button>`).join("")}<input class="in" style="width:110px;padding:9px" inputmode="numeric" id="aminx" placeholder="otro (min)" value="${[20,30,45,60,90,120].includes(ACT.min)?"":ACT.min}"></div>
  <label class="f">Intensidad</label><div class="opts">${INTENS.map(([k,n,dsc])=>`<button class="opt ${ACT.intens===k?"on":""}" data-act="aint" data-v="${k}" style="text-align:left">${n}<br><span class="xs mute" style="font-weight:500">${dsc}</span></button>`).join("")}</div>
  ${musSel?`<label class="f">¿Qué trabajaste?</label><div class="opts">${Object.entries(MUS).map(([k,n])=>`<button class="opt ${ACT.mus.includes(k)?"on":""}" data-act="amus" data-v="${k}">${n}</button>`).join("")}<button class="opt ${ACT.mus.length===7?"on":""}" data-act="amus" data-v="todo">Cuerpo completo</button></div>`:""}
  ${d[5]?`<label class="f">Distancia (opcional, km)</label><input class="in" id="akm" inputmode="decimal" placeholder="Ej.: 5" value="${esc(ACT.km)}">`:""}
  <label class="f">Nota (opcional)</label><input class="in" id="anota" placeholder="Ej.: piernas, PR en sentadilla, partido 2-1" value="${esc(ACT.nota)}">
  ${esMenorAct(p)?"":`<p class="xs mute" style="margin-top:10px">Gasto estimado: <b>${kcalAct(p,ACT.dep,ACT.min,ACT.intens)} kcal</b> (aproximado).</p>`}
  <button class="btn block" style="margin-top:12px" data-act="asave">Guardar actividad</button>`)}
function esMenorAct(p){return age(p)<18}
function leerAct(){const h=$("#ahora");if(h)ACT.hora=h.value||ACT.hora;const x=$("#aminx");if(x&&parseInt(x.value)>0)ACT.min=parseInt(x.value);const k=$("#akm");if(k)ACT.km=k.value;const n=$("#anota");if(n)ACT.nota=n.value}
function guardarActividad(){leerAct();const p=P();const d=DEP[ACT.dep];const I=INTENS.find(x=>x[0]===ACT.intens);
  const [hh,mm]=(ACT.hora||"12:00").split(":").map(Number);const [y,mo,da]=ACT.dia.split("-").map(Number);const start=new Date(y,mo-1,da,hh,mm).getTime();const end=start+ACT.min*6e4;
  let mus=ACT.dep==="gimnasio"?(ACT.mus.length?ACT.mus:["piernas","pecho","espalda"]):(d[3]||[]);const carga=clamp(Math.round(ACT.min/15*I[3]/6),1,8);
  const w={id:uid(),ts:end,start,name:d[0],src:"act",dep:ACT.dep,mode:"propia",min:ACT.min,rpe:I[3],mus:Object.fromEntries(mus.map(m=>[m,carga])),ex:[],kcal:kcalAct(p,ACT.dep,ACT.min,ACT.intens)};
  const km=parseFloat(String(ACT.km).replace(",","."));if(km>0)w.km=km;if(ACT.nota)w.nota=ACT.nota.trim();
  const day=D(p.id,ACT.dia);day.workouts.push(w);
  if(ACT.extId){day.ext=(day.ext||[]).filter(x=>x.id!==ACT.extId);day.extLinked=(day.extLinked||[]).concat(ACT.extId)}
  if(!(p.sports||[]).includes(ACT.dep)&&ACT.dep!=="otro"){p.sports=(p.sports||[]).concat(ACT.dep)}
  checkBadges(p);save();closeSheet();if(current!=="hoy")location.hash="#hoy";else render();toast(d[1]+" "+ACT.min+" min registrados 💪")}

/* ---------- Complemento para tu deporte ---------- */
function complemento(dep){const p=P();const ids=DEP[dep][4].filter(id=>EXM[id]&&!EXM[id].a.some(a=>p.limits.includes(a)));
  const items=ids.map(id=>{const e=EXM[id];const fu=e.c==="fuerza"||e.c==="equi";return {id,sets:fu?2:1,secs:e.u==="seg"?(fu?35:40):0,reps:e.u==="reps"?12:0,rest:fu?20:5}});
  const s={mode:"constante",blocks:[{n:"Complemento para "+DEP[dep][0].toLowerCase(),items}],created:Date.now()};
  s.minutes=Math.round(items.reduce((x,it)=>x+it.sets*((it.secs||it.reps*3.2)+it.rest),0)/60);openSession(s,"Complemento: "+DEP[dep][0])}

/* ---------- Tarjeta para Hoy ---------- */
function tarjetaPropia(p){const deps=depDe(p);if(!deps.length)return "";const d=D(p.id);const hoy=d.workouts.filter(w=>w.src==="act");
  return `<section class="glass org2"><div class="row between"><h2 style="margin:0">Tu entrenamiento</h2><span class="xs mute">${deps.map(k=>DEP[k][1]).join(" ")}</span></div>
   <p class="sm" style="margin-top:8px">${esc(consejoPropio(p))}</p>
   ${hoy.length?`<p class="note green" style="margin-top:8px">✓ Hoy: ${hoy.map(w=>esc(w.name)+" "+w.min+" min").join(", ")}</p>`:""}
   ${(()=>{const sin=deps.filter(k=>k!=="otro"&&!nivDe(p,k));if(sin.length)return `<p class="note" style="margin-top:8px">Contale a Vital tu nivel en ${sin.map(k=>DEP[k][0].toLowerCase()).join(", ")} para que no te trate como principiante. <button class="chip" data-act="nivsheet">Elegir nivel</button></p>`;
     const sg=sugerenciaNivel(p);return sg?`<p class="note green" style="margin-top:8px">Tus últimas 3 sesiones de ${esc(DEP[sg.k][0].toLowerCase())} fueron suaves. ¿Estás para pasar a <b>${NIVN[sg.n.l+1]}</b>? <button class="chip" data-act="nivsube" data-v="${sg.k}">Subir</button> <button class="chip" data-act="nivno" data-v="${sg.k}">Todavía no</button></p>`:""})()}
   <button class="btn block" style="margin-top:10px" data-act="aadd">＋ Registrar actividad</button>
   <div class="row wrap" style="gap:6px;margin-top:10px"><span class="xs mute">Complementos opcionales:</span>${deps.slice(0,3).map(k=>`<button class="chip" data-act="acomp" data-v="${k}">${DEP[k][1]} para ${esc(DEP[k][0].split(" ")[0].toLowerCase())}</button>`).join("")}</div></section>`}

/* ---------- Resumen por deporte (Evolución) ---------- */
function resumenDeportes(p){const tot={};for(let i=0;i<28;i++){const d=L(p.id).days[addDays(TODAY(),-i)];if(!d)continue;d.workouts.forEach(w=>{const k=(w.src==="act"||w.dep)&&DEP[w.dep]?w.dep:"vital";tot[k]=(tot[k]||{min:0,n:0,km:0});tot[k].min+=w.min;tot[k].n++;tot[k].km+=w.km||0});(d.ext||[]).forEach(x=>{const k=WK2DEP[x.name]||"otro";tot[k]=(tot[k]||{min:0,n:0,km:0});tot[k].min+=x.min;tot[k].n++})}
  const arr=Object.entries(tot).sort((a,b)=>b[1].min-a[1].min);if(!arr.length)return "";const mx=arr[0][1].min;
  return `<section class="glass org3"><h2>Tus actividades · últimas 4 semanas</h2>${arr.map(([k,v])=>{const n=k==="vital"?["Rutinas de Vital","🌿"]:[DEP[k][0],DEP[k][1]];return `<div style="margin:10px 0"><div class="row between sm"><span>${n[1]} ${esc(n[0])}</span><span class="mute">${v.n} ${v.n===1?"vez":"veces"} · <b style="color:var(--ink)">${v.min>=120?Math.round(v.min/6)/10+" h":v.min+" min"}</b>${v.km?` · ${Math.round(v.km*10)/10} km`:""}</span></div><div class="bar" style="margin-top:5px"><i style="width:${Math.max(3,v.min/mx*100)}%"></i></div></div>`}).join("")}</section>`}

/* ---------- Acciones ---------- */
window.actAct=function(a,v){
  switch(a){
  case "aadd":abrirActividad();return true;
  case "adep":leerAct();ACT.dep=v;if(v!=="gimnasio")ACT.mus=[];dibActividad();return true;
  case "adia":leerAct();ACT.dia=v;dibActividad();return true;
  case "amin":{leerAct();ACT.min=+v;dibActividad();return true}
  case "aint":leerAct();ACT.intens=v;dibActividad();return true;
  case "amus":leerAct();if(v==="todo")ACT.mus=ACT.mus.length===7?[]:Object.keys(MUS);else ACT.mus=ACT.mus.includes(v)?ACT.mus.filter(m=>m!==v):ACT.mus.concat(v);dibActividad();return true;
  case "asave":guardarActividad();return true;
  case "acomp":complemento(v);return true;
  case "aext":{const p=P();const d=D(p.id);const x=(d.ext||[]).find(e=>e.id===v);if(!x)return true;abrirActividad({dep:WK2DEP[x.name]||"otro",min:x.min,km:x.km?String(x.km).replace(".",","):"",extId:x.id,hora:x.start?new Date(x.start).toTimeString().slice(0,5):null});return true}
  case "o-niv":setNiv(draft,v);drawOnb();return true;
  case "o-nivr":togRet(draft,v);drawOnb();return true;
  case "p-niv":setNiv(P(),v);save();abrirNiveles();return true;
  case "p-nivr":togRet(P(),v);save();abrirNiveles();return true;
  case "nivsheet":abrirNiveles();return true;
  case "nivsube":{const p=P();const n=nivDe(p,v);if(n){n.l=Math.min(3,n.l+1);n.ret=false;save();render();toast(DEP[v][1]+" Nivel "+NIVN[n.l]+" 💪")}return true}
  case "nivno":{const p=P();const n=nivDe(p,v);p.nivAviso=p.nivAviso||{};if(n)p.nivAviso[v+n.l]=1;save();render();return true}
  case "aniv":{leerAct();const p=P();setNiv(p,ACT.dep+":"+v);save();dibActividad();return true}
  case "anivr":{leerAct();const p=P();togRet(p,ACT.dep);save();dibActividad();return true}
  case "o-sport":{const s=new Set(draft.sports||[]);s.has(v)?s.delete(v):s.add(v);draft.sports=[...s];drawOnb();return true}
  }
  return false};
