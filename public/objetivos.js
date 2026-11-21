/* =========================================================
   VITAL · Objetivos: plan hacia una carrera con fecha y metas
   - Plan hacia una carrera: distancia (5K, 10K o 21K), fecha y días
     de la semana que puede correr. Arma las salidas día por día hasta la
     carrera: base, construcción y descarga, según el nivel de running.
   - Metas por semana o por mes: kilómetros, entrenamientos, minutos o
     pasos, con tarjeta en Hoy y aviso al cumplirlas.
   - En el APK publica las metas y la cuenta regresiva para el widget de
     Vital del Launcher Noir (plugin nativo VitalMetas + MetasProvider).
   Se carga después de carrera.js.
   ========================================================= */
"use strict";
(function(){
const VP=window.VITAL_PROG,VR=window.VITAL_RUN;
const it=VP.it,apto=VP.apto,minDe=VP.minDe;
const DIAS=[["lun",1,"Lun"],["mar",2,"Mar"],["mie",3,"Mié"],["jue",4,"Jue"],["vie",5,"Vie"],["sab",6,"Sáb"],["dom",0,"Dom"]];
const DIST={5:"5K",10:"10K",21:"21K"};
const PEAK={5:[30,40,50],10:[50,65,80],21:[100,120,140]};   // fondo largo máximo (min) por nivel
const MINSEM={5:3,10:4,21:8};                                // semanas recomendadas como mínimo
const dow=k=>new Date(k+"T12:00").getDay();
const lunes=k=>addDays(k,-((dow(k)+6)%7));
const diasEntre=(a,b)=>Math.round((new Date(b+"T12:00")-new Date(a+"T12:00"))/864e5);
const fechaTxt=(k,o)=>new Date(k+"T12:00").toLocaleDateString("es-AR",o||{weekday:"long",day:"numeric",month:"long"});
const cuando=k=>k===TODAY()?"Hoy":k===addDays(TODAY(),1)?"Mañana":k===addDays(TODAY(),-1)?"Ayer":fechaTxt(k,{weekday:"long",day:"numeric"}).replace(/^./,c=>c.toUpperCase());
const car=p=>VP.prog(p).carrera;

/* ---------- Generador del plan ---------- */
function generar(c){const out=[];const wd=new Set(c.dias.map(k=>DIAS.find(d=>d[0]===k)[1]));
  const sems=[];for(let k=TODAY();k<c.fecha;k=addDays(k,1)){if(!wd.has(dow(k)))continue;const l0=lunes(k);let s=sems.find(x=>x.l===l0);if(!s){s={l:l0,f:[]};sems.push(s)}s.f.push(k)}
  const S=sems.slice(-16),W=S.length,taper=c.dist===21?2:1;const peak=PEAK[c.dist][c.l-1],start=Math.round(peak*.55);
  S.forEach((s,i)=>{const fin=W-i,build=Math.max(1,W-taper-1),q=Math.min(1,i/build);
    let largo=start+(peak-start)*q;if(i%4===3&&fin>taper)largo*=.85;if(fin<=taper)largo=peak*(fin===1?.45:.7);
    largo=Math.max(15,Math.round(largo/5)*5);const rod=Math.max(20,Math.min({5:35,10:50,21:60}[c.dist]+(c.l-1)*5,Math.round(largo*.6/5)*5));const n=s.f.length;
    const tipos=fin===1?s.f.map((_,j)=>j===n-1?"activacion":"suave"):n===1?["fondo"]:n===2?["rodaje","fondo"]:n===3?["rodaje","calidad","fondo"]:Array(Math.max(0,n-4)).fill("suave").concat(["rodaje","calidad","suave","fondo"]);
    s.f.forEach((k,j)=>{const t=tipos[j]||"suave";out.push({f:k,t,min:t==="fondo"?largo:t==="suave"?Math.max(15,Math.round(rod*.75/5)*5):t==="activacion"?20:rod,q:Math.round(q*100)/100,sem:i+1})})});
  out.push({f:c.fecha,t:"carrera"});return {ses:out,W}}
const NT={rodaje:"Rodaje",suave:"Rodaje suave",fondo:"Fondo largo",activacion:"Activación antes de la carrera",carrera:"Día de carrera"};
const nomCal=l=>["","Cambios de ritmo","Intervalos","Tempo"][l];
const nombreSes=(s,l)=>s.t==="calidad"?nomCal(l):NT[s.t];
function tramos(s,l){const r=[];const q=s.q||0;
  if(s.t==="calidad"){if(l===1){const n=4+Math.round(4*q);for(let i=0;i<n;i++)r.push(["ritmo-fuerte",60],["trote",120])}
    else if(l===2){const n=3+Math.round(3*q);for(let i=0;i<n;i++)r.push(["ritmo-fuerte",180],["trote",120])}
    else r.push(["trote",600],["ritmo-fuerte",(12+Math.round(13*q))*60],["trote",300]);return r}
  if(s.t==="activacion"){r.push(["trote",300]);for(let i=0;i<4;i++)r.push(["ritmo-fuerte",60],["trote",60]);r.push(["trote",180]);return r}
  // nivel inicial: trote con pausas de caminata que se van alargando hasta correr seguido
  const k=3+Math.round(q*12);if(l===1&&k<s.min){const n=Math.max(1,Math.floor(s.min/(k+1)));for(let i=0;i<n;i++){r.push(["trote",k*60]);if(i<n-1)r.push(["caminata",60])}return r}
  return [["trote",s.min*60]]}
function resumen(s,l){if(s.t==="carrera")return "";const tr=tramos(s,l);const m=x=>x>=60?Math.round(x/60)+"′":x+"″";
  if(s.t==="calidad"&&l<3){const n=tr.length/2;return `${n} × (${m(tr[0][1])} ${l===1?"rápido":"a ritmo fuerte"} + ${m(tr[1][1])} suave)`}
  if(s.t==="calidad")return `10′ suave, ${m(tr[1][1])} a ritmo de tempo, 5′ suave`;
  if(s.t==="activacion")return "5′ suave, 4 × (1′ a ritmo de carrera + 1′ suave), 3′ suave";
  if(tr.some(x=>x[0]==="caminata"))return `${Math.ceil(tr.length/2)} × ${m(tr[0][1])} de trote, con 1′ de caminata entre medio`;
  return `${s.min}′ de trote suave`}
function sesion(p,i){const c=car(p),s=c.ses[i];
  const cal=[it("caminata",180),it("balanceo-piernas",40),it("circulos-cadera",30),it("talones-cola",30),it("rodillas-arriba",30)].filter(x=>apto(p,x.id));
  const calma=[it("caminata",180),it("estir-isquios",40),it("estir-cuadriceps",40),it("estir-gemelos",40),it("estir-tfl-pie",40),it("piriforme",40)].filter(x=>apto(p,x.id));
  const blocks=[{n:"Entrada en calor",items:cal},{n:nombreSes(s,c.l),items:tramos(s,c.l).map(([id,x])=>it(id,x))},{n:"Vuelta a la calma",items:calma}];
  return {mode:s.t==="calidad"?"empujar":"constante",blocks,minutes:minDe(blocks),created:Date.now(),auto:true,prog:{k:"carrera",i},title:`${DIST[c.dist]} · ${nombreSes(s,c.l).toLowerCase()}`}}
function actual(c){return c.ses.findIndex(s=>s.t!=="carrera"&&!s.est&&s.f>=addDays(TODAY(),-1))}
function prediccion(p,dist){const R=VR.records(p);const base=[[R.k10,10],[R.k5,5]].find(x=>x[0]);if(!base)return null;
  const t=base[0].v*Math.pow((dist===21?21.1:dist)/base[1],1.06);return {t,ritmo:t/(dist===21?21.1:dist)}}
window.estadoCarrera=function(p){const c=car(p);if(!c)return null;const d=diasEntre(TODAY(),c.fecha);const hechas=c.ses.filter(s=>s.est==="hecha").length;
  if(d<0)return {t:(c.nombre||DIST[c.dist])+" terminada",sub:c.corrida?"¡Felicitaciones! Prepará la próxima":"¿Cómo te fue? Registrá tu carrera"};
  return {t:"Preparando "+(c.nombre||DIST[c.dist]),sub:d===0?"¡Hoy es la carrera!":`Faltan ${d} ${d===1?"día":"días"} · ${hechas} ${hechas===1?"salida hecha":"salidas hechas"}`}};

/* ---------- Vistas del plan ---------- */
let FC=null;
function formCarrera(){const p=P();const c=car(p);const n=nivDe(p,"running");
  FC=FC||{dist:c?c.dist:10,fecha:c?c.fecha:addDays(TODAY(),56),dias:c?c.dias.slice():["mar","jue","dom"],nombre:c?c.nombre||"":"",l:n?n.l:0};
  const sem=Math.floor(diasEntre(TODAY(),FC.fecha)/7);
  sheet(`<h2>🏁 Preparar una carrera</h2><p class="xs mute">Elegí la carrera, la fecha y los días que podés correr. Vital arma cada salida hasta el día de la carrera.</p>
  <label class="f">Distancia</label><div class="opts">${[5,10,21].map(d=>`<button class="opt ${FC.dist===d?"on":""}" data-act="pc-dist" data-v="${d}">${d===21?"21K (media maratón)":DIST[d]}</button>`).join("")}</div>
  <label class="f">Nombre de la carrera (opcional)</label><input class="in" id="pc-nom" value="${esc(FC.nombre)}" placeholder="Ej.: Luján Corre">
  <label class="f">Fecha</label><input class="in" type="date" id="pc-fecha" min="${addDays(TODAY(),7)}" value="${FC.fecha}">
  ${sem<MINSEM[FC.dist]?`<p class="note" style="margin-top:6px">Para ${DIST[FC.dist]} se recomiendan al menos ${MINSEM[FC.dist]} semanas. Igual se puede: el plan va a priorizar llegar sano, no la marca.</p>`:sem>16?`<p class="xs faint" style="margin-top:6px">El plan dura 16 semanas: arranca solo cuando falten 16 semanas.</p>`:""}
  <label class="f">¿Qué días podés correr? (2 a 4)</label><div class="opts">${DIAS.map(([k,,n])=>`<button class="opt ${FC.dias.includes(k)?"on":""}" data-act="pc-dia" data-v="${k}">${n}</button>`).join("")}</div>
  <p class="xs faint" style="margin-top:6px">El último día de la semana que elijas va el fondo largo. Dejá un día de descanso entre salidas si podés.</p>
  ${FC.l?`<p class="sm" style="margin-top:10px">Tu nivel en running: <b>${NIVN[FC.l]}</b> <button class="chip" data-act="pc-nivcambiar">Cambiar</button></p>`:`<label class="f">${NIVQ.running.q}</label><div class="opts">${NIVQ.running.o.map((t,i)=>`<button class="opt" data-act="pc-niv" data-v="${i+1}" style="text-align:left">${NIVN[i+1]}<br><span class="xs mute" style="font-weight:500">${t}</span></button>`).join("")}</div>`}
  <button class="btn block" style="margin-top:14px" data-act="pc-crear">${c?"Rehacer el plan":"Armar mi plan"}</button>
  ${c?`<button class="btn ghost block" style="margin-top:8px" data-act="pc-ver">Volver al plan</button>`:""}`)}
function leerForm(){const n=$("#pc-nom"),f=$("#pc-fecha");if(n)FC.nombre=n.value.trim();if(f&&f.value)FC.fecha=f.value}
function verCarrera(){const p=P();const c=car(p);if(!c)return formCarrera();
  const d=diasEntre(TODAY(),c.fecha),nom=c.nombre||DIST[c.dist];const pr=prediccion(p,c.dist);const i=actual(c);const s=i>=0?c.ses[i]:null;
  let cuerpo="";
  if(d<0)cuerpo=`<section class="glass" style="margin-top:12px;padding:14px"><b>${esc(nom)}: ${fechaTxt(c.fecha,{day:"numeric",month:"long"})}</b><p class="sm" style="margin:6px 0">${c.corrida?"¡Carrera registrada! Muy bien.":"¿Cómo te fue? Registrala para que sume a tus kilómetros y récords."}</p>${c.corrida?"":`<button class="btn block" data-act="pc-reg">Registrar mi carrera</button>`}<button class="btn ghost block" style="margin-top:8px" data-act="pc-nueva">🏁 Preparar otra carrera</button></section>`;
  else if(d===0)cuerpo=`<section class="glass" style="margin-top:12px;padding:14px;border:1px solid var(--mint)"><b>🏁 ¡Hoy es la carrera!</b>
    <ul class="sm" style="padding-left:18px;margin:8px 0"><li>Los primeros kilómetros van a parecer facilísimos: <b>no aceleres</b>. Arrancá al ritmo de tus rodajes.</li><li>Pasada la mitad, andá a sensaciones. En el último tramo, dá lo que te quede.</li><li>Desayuná lo de siempre 2 o 3 horas antes y no estrenes nada (zapatillas, ropa, geles).</li><li>Tomá agua en los puestos aunque no tengas sed${c.dist===21?" y sumá hidratos y sales en el camino":""}.</li></ul>
    ${pr?`<p class="sm">⏱️ Con tus marcas, tu tiempo estimado es <b>${VR.durTxt(pr.t)}</b> (${ritmoTxt(pr.ritmo)} /km). Usalo de guía, no de obligación.</p>`:""}
    <button class="btn block" style="margin-top:10px" data-act="pc-reg">Terminé: registrar mi carrera</button></section>`;
  else if(s)cuerpo=`<section class="glass" style="margin-top:12px;padding:14px"><b>${cuando(s.f)}: ${nombreSes(s,c.l)}</b><p class="sm mute" style="margin:4px 0">Semana ${s.sem} · ≈ ${sesion(p,i).minutes} min con calentamiento y vuelta a la calma</p><p class="sm">${resumen(s,c.l)}</p></section>
    <button class="btn block" style="margin-top:12px" data-act="pc-go" data-v="${i}">▶ ${s.f>TODAY()?"Adelantar esta salida":"Empezar la salida"}</button>
    <div class="row" style="gap:8px;margin-top:8px"><button class="btn ghost" style="flex:1" data-act="pc-hecha" data-v="${i}">Ya la hice por mi cuenta</button><button class="btn ghost" style="flex:1" data-act="pc-saltar" data-v="${i}">Saltearla</button></div>`;
  else cuerpo=`<p class="sm" style="margin-top:12px">No quedan salidas antes de la carrera: descansá y llegá fresco.</p>`;
  const semAct=s?s.sem:null;const sems=[...new Set(c.ses.filter(x=>x.sem).map(x=>x.sem))];
  const fila=x=>{const pas=x.f<TODAY()&&!x.est;return `<span class="pill" title="${nombreSes(x,c.l)}" style="${x.est==="hecha"?"border-color:var(--mint);color:var(--mint)":x.est==="salteada"||pas?"opacity:.45":x===s?"border-color:var(--lime);color:var(--lime)":""}">${DIAS.find(dd=>dd[1]===dow(x.f))[2]} ${Number(x.f.slice(8))} · ${x.t==="calidad"?nomCal(c.l).split(" ")[0]:x.t==="fondo"?"fondo "+x.min+"′":x.t==="activacion"?"activación":(x.t==="suave"?"suave ":"rodaje ")+x.min+"′"}${x.est==="hecha"?" ✓":""}</span>`};
  sheet(`<h2>🏁 ${esc(nom)}</h2><p class="xs mute">${DIST[c.dist]} · ${fechaTxt(c.fecha)} · ${d>0?`faltan ${d} ${d===1?"día":"días"}`:d===0?"es hoy":"ya pasó"} · nivel ${NIVN[c.l]}</p>
  ${pr&&d>0?`<p class="sm" style="margin-top:8px">⏱️ Tiempo estimado hoy: <b>${VR.durTxt(pr.t)}</b> (${ritmoTxt(pr.ritmo)} /km), según tus récords.</p>`:""}
  ${c.W<MINSEM[c.dist]&&d>0?`<p class="note" style="margin-top:8px">Hay poco tiempo para ${DIST[c.dist]}: el plan prioriza llegar sano. Si en una salida aparece dolor, frená.</p>`:""}
  ${cuerpo}
  ${sems.length?`<details style="margin-top:12px" ${semAct?"open":""}><summary class="sm"><b>El plan, semana por semana</b></summary>${sems.map(n=>`<div style="margin:8px 0"><span class="xs mute">Semana ${n}${n===semAct?" · esta":""}</span><div class="row wrap" style="gap:6px;margin-top:4px">${c.ses.filter(x=>x.sem===n).map(fila).join("")}</div></div>`).join("")}</details>`:""}
  ${window._extraRunningBase?_extraRunningBase(p):""}
  <div class="row wrap" style="gap:8px;margin-top:12px"><button class="chip" data-act="pc-form">✎ Cambiar fecha o días</button><button class="chip" data-act="pc-libre">Plan sin fecha</button><button class="chip" data-act="pc-borrar">Dejar este plan</button></div>`)}

window.carreraTerminar=function(pr,rpe){const p=P();const c=car(p);if(!c||!c.ses[pr.i])return;c.ses[pr.i].est="hecha";c.ses[pr.i].rpe=rpe;save();
  const i=actual(c),s=i>=0?c.ses[i]:null;const d=diasEntre(TODAY(),c.fecha);
  sheet(`<h1>Guardado 💪</h1><p class="sm">Esfuerzo ${rpe}/10.${rpe>=9?" Fue mucho: tomá la próxima salida más tranquila. Si se repite, bajá el nivel desde el plan.":""}</p>
  ${s?`<p class="sm" style="margin-top:6px">Próxima: <b>${cuando(s.f).toLowerCase()}, ${nombreSes(s,c.l).toLowerCase()}</b>.</p>`:""}<p class="xs mute">Faltan ${d} ${d===1?"día":"días"} para ${esc(c.nombre||DIST[c.dist])}.</p>
  <button class="btn block" style="margin-top:12px" data-act="close">Listo</button>`)};

/* ---------- Metas ---------- */
const TIPOS={km_run:{n:"Kilómetros corriendo",c:"Running",u:"km",i:"🏃",def:{semana:15,mes:50}},km_mov:{n:"Kilómetros caminando, corriendo o en bici",c:"Kilómetros",u:"km",i:"👟",def:{semana:25,mes:100}},
  entrenos:{n:"Entrenamientos",c:"Entrenamientos",u:"",i:"💪",def:{semana:3,mes:12}},minutos:{n:"Minutos de actividad",c:"Minutos activos",u:"min",i:"⏱️",def:{semana:150,mes:600}},pasos:{n:"Pasos",c:"Pasos",u:"pasos",i:"🚶",def:{semana:50000,mes:200000}}};
const MOV=["running","caminata","senderismo","ciclismo"];
function periodo(per){const h=TODAY();if(per==="semana"){const a=lunes(h);return {a,b:addDays(a,6),key:a,txt:"esta semana"}}
  const a=h.slice(0,8)+"01";const d=new Date(+h.slice(0,4),+h.slice(5,7),0).getDate();return {a,b:h.slice(0,8)+String(d).padStart(2,"0"),key:h.slice(0,7),txt:"en "+new Date(h+"T12:00").toLocaleDateString("es-AR",{month:"long"})}}
function avance(p,m){const P0=periodo(m.per);let v=0;for(let k=P0.a;k<=P0.b&&k<=TODAY();k=addDays(k,1)){const d=L(p.id).days[k];if(!d)continue;const ws=d.workouts||[],ex=d.ext||[];
    if(m.t==="km_run")v+=ws.filter(w=>w.dep==="running").reduce((a,w)=>a+(w.km||0),0)+ex.filter(x=>x.name==="carrera").reduce((a,x)=>a+(x.km||0),0);
    else if(m.t==="km_mov")v+=ws.filter(w=>MOV.includes(w.dep)).reduce((a,w)=>a+(w.km||0),0)+ex.reduce((a,x)=>a+(x.km||0),0);
    else if(m.t==="entrenos")v+=ws.length+ex.length;else if(m.t==="minutos")v+=ws.reduce((a,w)=>a+(w.min||0),0)+ex.reduce((a,x)=>a+(x.min||0),0);else if(m.t==="pasos")v+=d.steps||0}
  v=m.t.startsWith("km")?Math.round(v*10)/10:Math.round(v);const pct=Math.min(100,Math.round(v/m.v*100));const resta=diasEntre(TODAY(),P0.b);return {v,pct,resta,P0}}
const fmtN=(v,u)=>(u==="km"?String(v).replace(".",","):Math.round(v).toLocaleString("es-AR"))+(u?" "+u:"");
function metas(p){p.metas=p.metas||[];return p.metas}
function tarjetaMetas(p){const ms=metas(p);
  if(!ms.length)return `<section class="glass org2"><div class="row between"><h2 style="margin:0">🎯 Metas</h2><button class="btn small ghost" data-act="mt-nueva">＋ Meta</button></div><p class="xs mute" style="margin-top:6px">Por ejemplo: 50 km corriendo este mes o 3 entrenamientos por semana.</p></section>`;
  return `<section class="glass org2"><div class="row between"><h2 style="margin:0">🎯 Tus metas</h2>${ms.length<4?`<button class="btn small ghost" data-act="mt-nueva">＋</button>`:""}</div>
  ${ms.map(m=>{const T=TIPOS[m.t],a=avance(p,m);return `<button class="ex" data-act="mt-edit" data-v="${m.id}" style="display:block;text-align:left"><div class="row between sm"><span>${T.i} ${T.c} ${a.P0.txt}</span><span class="mute">${a.pct>=100?"✓ cumplida":a.resta===0?"último día":"faltan "+a.resta+" días"}</span></div><div class="bar" style="margin:6px 0 4px"><i style="width:${Math.max(3,a.pct)}%;${a.pct>=100?"background:var(--lime)":""}"></i></div><div class="xs"><b>${fmtN(a.v,T.u)}</b> <span class="mute">de ${fmtN(m.v,T.u)}</span></div></button>`}).join("")}</section>`}
let MT=null;
function editarMeta(id){const p=P();const m=id?metas(p).find(x=>x.id===id):null;MT=m?{...m}:{id:uid(),t:"km_run",per:"mes",v:TIPOS.km_run.def.mes,nueva:true};dibMeta()}
function dibMeta(){const T=TIPOS[MT.t];
  sheet(`<h2>🎯 ${MT.nueva?"Nueva meta":"Editar meta"}</h2><label class="f">¿Qué querés medir?</label><div class="opts">${Object.entries(TIPOS).map(([k,x])=>`<button class="opt ${MT.t===k?"on":""}" data-act="mt-t" data-v="${k}">${x.i} ${x.n}</button>`).join("")}</div>
  <label class="f">¿Cada cuánto?</label><div class="opts">${[["semana","Por semana"],["mes","Por mes"]].map(([k,n])=>`<button class="opt ${MT.per===k?"on":""}" data-act="mt-per" data-v="${k}">${n}</button>`).join("")}</div>
  <label class="f">Meta${T.u?" ("+T.u+")":""}</label><input class="in" id="mt-v" inputmode="decimal" value="${String(MT.v).replace(".",",")}">
  <p class="xs faint" style="margin-top:6px">Los kilómetros salen de tus salidas con GPS, de tu reloj o de lo que registres a mano.</p>
  <button class="btn block" style="margin-top:12px" data-act="mt-save">Guardar meta</button>${MT.nueva?"":`<button class="btn ghost block" style="margin-top:8px" data-act="mt-del">Borrar meta</button>`}`)}
function revisarCumplidas(p){let c=false;for(const m of metas(p)){const a=avance(p,m);m.ok=m.ok||{};if(a.pct>=100&&!m.ok[a.P0.key]){m.ok[a.P0.key]=1;c=true;toast("🎯 ¡Meta cumplida! "+TIPOS[m.t].c+" "+a.P0.txt);try{navigator.vibrate&&navigator.vibrate([20,60,20])}catch(e){}}}if(c)save()}
const _vH=vHoy;
vHoy=function(){let h=_vH();const p=P();revisarCumplidas(p);const i=h.indexOf("Anillos del día");const j=i>0?h.lastIndexOf("<section",i):-1;const t=tarjetaMetas(p);return j>0?h.slice(0,j)+t+h.slice(j):h+t};

/* ---------- Para el widget del Launcher Noir (solo en la app de Android) ---------- */
let ULT="";
function publicar(){const PL0=nplug("VitalMetas");if(!PL0||!S.profiles.length)return;const p=P();
  const ms=metas(p).map(m=>{const T=TIPOS[m.t],a=avance(p,m);return {i:T.i,n:T.c+" "+a.P0.txt,v:a.v,meta:m.v,u:T.u,pct:a.pct,resta:a.resta}});
  const c=car(p);let cr=null;if(c){const d=diasEntre(TODAY(),c.fecha);if(d>=0){const i=actual(c),s=i>=0?c.ses[i]:null;cr={n:c.nombre||DIST[c.dist],dist:c.dist,dias:d,prox:s?cuando(s.f)+": "+nombreSes(s,c.l).toLowerCase():""}}}
  const body=JSON.stringify({nombre:p.name,metas:ms,carrera:cr});if(body===ULT)return;ULT=body;
  try{PL0.publicar({json:JSON.stringify({v:1,ts:Date.now(),...JSON.parse(body)})}).catch(()=>{})}catch(e){}}
let PT=0;const _render=render;
render=function(){_render();clearTimeout(PT);PT=setTimeout(publicar,1500)};

/* ---------- Acciones ---------- */
const _extra=window.extraRunning;window._extraRunningBase=_extra;
window.extraRunning=function(p){return `<button class="btn ghost block" style="margin-top:10px" data-act="pc-form">🏁 Preparar una carrera con fecha</button>`+(_extra?_extra(p):"")};
let LIBRE=false;
const _aa=window.actAct;
window.actAct=function(a,v){const p=S.profiles.length?P():null;
  if(a==="pg-run"&&p&&car(p)&&!LIBRE){verCarrera();return true}
  if(!p||!(a.startsWith("pc-")||a.startsWith("mt-")))return _aa?_aa(a,v):false;
  switch(a){
  case "pc-form":FC=null;formCarrera();break;
  case "pc-ver":FC=null;verCarrera();break;
  case "pc-dist":leerForm();FC.dist=+v;formCarrera();break;
  case "pc-dia":{leerForm();const s=new Set(FC.dias);if(s.has(v))s.delete(v);else if(s.size<4)s.add(v);else toast("Hasta 4 días por semana");FC.dias=DIAS.map(d=>d[0]).filter(k=>s.has(k));formCarrera();break}
  case "pc-niv":leerForm();FC.l=+v;p.niv=p.niv||{};p.niv.running={l:+v};save();formCarrera();break;
  case "pc-nivcambiar":leerForm();FC.l=0;formCarrera();break;
  case "pc-crear":{leerForm();if(!FC.l){toast("Elegí tu nivel");break}if(FC.dias.length<2){toast("Elegí al menos 2 días");break}if(!FC.fecha||FC.fecha<addDays(TODAY(),7)){toast("La carrera tiene que ser dentro de al menos una semana");break}
    const g=generar(FC);const prev=car(p);VP.prog(p).carrera={dist:FC.dist,fecha:FC.fecha,dias:FC.dias,nombre:FC.nombre,l:FC.l,ses:g.ses,W:g.W,creado:TODAY(),hechasAntes:prev?prev.ses.filter(s=>s.est==="hecha").length:0};
    FC=null;save();render();verCarrera();toast("Plan armado: "+(g.ses.length-1)+" salidas hasta la carrera");break}
  case "pc-go":openSession(sesion(p,+v));break;
  case "pc-hecha":car(p).ses[+v].est="hecha";save();render();verCarrera();toast("Salida anotada ✓");break;
  case "pc-saltar":car(p).ses[+v].est="salteada";save();render();verCarrera();break;
  case "pc-borrar":if(!confirm("¿Dejar este plan de carrera?"))break;delete VP.prog(p).carrera;save();render();closeSheet();break;
  case "pc-nueva":delete VP.prog(p).carrera;FC=null;save();formCarrera();break;
  case "pc-libre":LIBRE=true;try{_aa("pg-run")}finally{LIBRE=false}break;
  case "pc-reg":{const c=car(p);c.corrida=true;save();closeSheet();abrirActividad({dep:"running",km:String(c.dist===21?21.1:c.dist).replace(".",","),min:c.dist===5?30:c.dist===10?60:130,nota:c.nombre||("Carrera "+DIST[c.dist])});break}
  case "mt-nueva":editarMeta(null);break;
  case "mt-edit":editarMeta(v);break;
  case "mt-t":{MT.t=v;MT.v=TIPOS[v].def[MT.per];dibMeta();break}
  case "mt-per":MT.per=v;MT.v=TIPOS[MT.t].def[v];dibMeta();break;
  case "mt-save":{const val=parseFloat(String($("#mt-v").value).replace(/\./g,MT.t==="pasos"?"":".").replace(",","."));if(!(val>0)){toast("Poné un número");break}MT.v=val;const ms=metas(p);const m={id:MT.id,t:MT.t,per:MT.per,v:val,ok:MT.ok||{}};const i=ms.findIndex(x=>x.id===m.id);if(i>=0)ms[i]=m;else ms.push(m);save();closeSheet();render();break}
  case "mt-del":p.metas=metas(p).filter(x=>x.id!==MT.id);save();closeSheet();render();break;
  }
  return true};
window.VITAL_OBJ={generar,tramos,avance,periodo,publicar};
try{if(S.profiles.length&&!document.querySelector("#layer .sheet"))render()}catch(e){}
})();
