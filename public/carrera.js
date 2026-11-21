/* =========================================================
   VITAL · Carrera: distancia, ritmo, récords y zapatillas
   - GPS durante las salidas del programa de running:
     · APK: plugin @capgo/background-geolocation (servicio en primer
       plano con notificación fija, mide con la pantalla apagada).
     · Web / iPhone: geolocalización del navegador, solo con la pantalla prendida.
     Se guarda solo la distancia, el tiempo y el ritmo, no el recorrido.
   - Voz por kilómetro («Kilómetro 2. Ritmo 6 minutos 10»).
   - Pausa automática para el ritmo: el tiempo parado (semáforo) no cuenta.
   - Reloj: después de cada salida (y de cada running registrado) busca en
     Health Connect la carrera del reloj y trae su distancia.
   - Récords personales y kilómetros de cada par de zapatillas.
   Se carga después de programas.js.
   ========================================================= */
"use strict";
(function(){
const G={on:false,dist:0,mov:0,last:null,splits:[],kmMov:0,src:null,watch:null,sum:null};
const rad=x=>x*Math.PI/180;
function hav(a,b){const R=6371000,dLa=rad(b.latitude-a.latitude),dLo=rad(b.longitude-a.longitude);const s=Math.sin(dLa/2)**2+Math.cos(rad(a.latitude))*Math.cos(rad(b.latitude))*Math.sin(dLo/2)**2;return 2*R*Math.asin(Math.sqrt(s))}
const ritmo=s=>!s||!isFinite(s)?"–:––":Math.floor(s/60)+":"+String(Math.round(s%60)).padStart(2,"0");
const ritmoVoz=s=>{const m=Math.floor(s/60),x=Math.round(s%60);return m+(m===1?" minuto":" minutos")+(x?" "+x:"")};
const kmTxt=k=>(Math.round(k*100)/100).toFixed(2).replace(".",",");
window.ritmoTxt=ritmo;

/* ---------- GPS ---------- */
function gpsDisponible(){return !!(nplug("BackgroundGeolocation")||navigator.geolocation)}
function gpsActivado(p){return p.gpsRun!==false&&gpsDisponible()}
function onLoc(l){if(!G.on)return;if(!PL){pararGPS();return}
  if(!l||l.accuracy==null||l.accuracy>30||l.simulated)return;const t=l.time||Date.now();const q={latitude:l.latitude,longitude:l.longitude,time:t};
  if(G.last){const d=hav(G.last,q),dt=(t-G.last.time)/1000;if(dt<=0)return;const v=d/dt;
    if(v>9)return;                       // salto del GPS (más de 32 km/h): se descarta
    if(d<3&&dt<20)return;                // ruido estando quieto
    G.dist+=d;if(v>.7)G.mov+=dt;         // parado no suma tiempo: pausa automática para el ritmo
    while(G.dist>=(G.splits.length+1)*1000){const s=G.mov-G.kmMov;G.splits.push(s);G.kmMov=G.mov;say("Kilómetro "+G.splits.length+". Ritmo "+ritmoVoz(s)+" por kilómetro")}}
  G.last=q;const el=document.getElementById("gps-line");if(el)el.innerHTML=lineaGPS()}
function lineaGPS(){const km=G.dist/1000;return `📍 <b>${kmTxt(km)} km</b> · ritmo ${km>.05?ritmo(G.mov/km):"–:––"} /km`}
async function arrancarGPS(){Object.assign(G,{on:true,dist:0,mov:0,last:null,splits:[],kmMov:0,sum:null});
  const BG=nplug("BackgroundGeolocation");
  if(BG){G.src="gps";try{await BG.start({backgroundTitle:"Vital está midiendo tu salida",backgroundMessage:"Distancia y ritmo de tu carrera",requestPermissions:true,stale:false,distanceFilter:5},(loc,err)=>{
      if(err){if(err.code==="NOT_AUTHORIZED"){G.on=false;toast("Sin permiso de ubicación: la distancia se va a tomar del reloj, si tenés")}return}onLoc(loc)})}catch(e){G.on=false}return}
  if(navigator.geolocation){G.src="gps-web";G.watch=navigator.geolocation.watchPosition(pos=>onLoc({latitude:pos.coords.latitude,longitude:pos.coords.longitude,accuracy:pos.coords.accuracy,time:pos.timestamp}),
    e=>{if(e.code===1){G.on=false;toast("Sin permiso de ubicación")}},{enableHighAccuracy:true,maximumAge:0,timeout:20000})}}
function pararGPS(){if(!G.on&&G.watch==null)return;G.on=false;const BG=nplug("BackgroundGeolocation");try{BG&&BG.stop()}catch(e){}
  if(G.watch!=null){try{navigator.geolocation.clearWatch(G.watch)}catch(e){}G.watch=null}
  const km=G.dist/1000;G.sum=km>=.2?{km:Math.round(km*100)/100,mov:Math.round(G.mov),ritmo:Math.round(G.mov/km),splits:G.splits.map(Math.round),src:G.src}:null}

const esRun=s=>!!(s&&s.prog&&s.prog.k==="running");
const _start=startPlayer;
startPlayer=function(s){_start(s);if(esRun(s)&&gpsActivado(P())){arrancarGPS();if(PL)drawPlayer()}};
const _fin=finishPlayer;
finishPlayer=function(){if(G.on||G.watch!=null)pararGPS();_fin()};
const _draw=drawPlayer;
drawPlayer=function(){_draw();if(!G.on||!PL)return;const t=document.getElementById("pl-time");if(t&&!document.getElementById("gps-line"))t.insertAdjacentHTML("afterend",`<div id="gps-line" class="sm" style="margin:4px 0 8px;text-align:center">${lineaGPS()}</div>`)};

/* ---------- Récords y zapatillas ---------- */
function carreras(p){const out=[];for(const [k,d] of Object.entries(L(p.id).days))for(const w of d.workouts||[])if(w.dep==="running"&&w.km>0)out.push({k,w});return out.sort((a,b)=>a.w.ts-b.w.ts)}
function tiempoDist(w,km){const r=w.run||{};if(r.splits&&r.splits.length>=km)return r.splits.slice(0,km).reduce((a,b)=>a+b,0);if(w.km>=km&&r.ritmo)return r.ritmo*km;return null}
function records(p,sin){const rs=carreras(p).filter(x=>x.w!==sin);const R={};
  for(const {k,w} of rs){const r=w.run||{};
    if(!R.largo||w.km>R.largo.v)R.largo={v:w.km,k};
    const s1=(r.splits||[]).length?Math.min(...r.splits):null;if(s1&&(!R.k1||s1<R.k1.v))R.k1={v:s1,k};
    for(const [n,km] of [["k5",5],["k10",10],["k21",21.1]]){const t=tiempoDist(w,km);if(t&&(!R[n]||t<R[n].v))R[n]={v:t,k}}}
  return R}
const durTxt=s=>{s=Math.round(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(x).padStart(2,"0")};
function nuevosRecords(p,w){const antes=records(p,w),ahora=records(p);const out=[];
  if(ahora.largo&&ahora.largo.v>((antes.largo||{}).v||0)&&carreras(p).length>1)out.push("salida más larga: "+kmTxt(ahora.largo.v)+" km");
  if(ahora.k1&&(!antes.k1||ahora.k1.v<antes.k1.v))out.push("mejor kilómetro: "+ritmo(ahora.k1.v));
  for(const [n,t] of [["k5","5 km"],["k10","10 km"],["k21","media maratón"]])if(ahora[n]&&(!antes[n]||ahora[n].v<antes[n].v))out.push(t+" en "+durTxt(ahora[n].v));
  return out}
function zapas(p){p.zapas=p.zapas||[];return p.zapas}
function sumarZapas(p,km){const z=zapas(p).find(x=>x.activa);if(z){z.km=Math.round((z.km+km)*10)/10;return z}return null}

/* ---------- Al guardar la salida ---------- */
const _save=savePlayer;
savePlayer=function(){const run=PL&&esRun(PL.s);const sum=G.sum;const p=P();_save();if(!run)return;
  const d=D(p.id);const w=d.workouts[d.workouts.length-1];if(!w)return;w.dep="running";w.start=w.ts-w.min*6e4;
  let extra="";
  if(sum){w.km=sum.km;w.run=sum;const z=sumarZapas(p,sum.km);const rec=nuevosRecords(p,w);
    extra=`<p class="sm" style="margin-top:8px">📍 <b>${kmTxt(sum.km)} km</b> · ritmo ${ritmo(sum.ritmo)} /km${sum.splits.length?` · ${sum.splits.map((s,i)=>"km "+(i+1)+": "+ritmo(s)).join(" · ")}`:""}</p>${rec.length?`<p class="note green" style="margin-top:6px">🏅 ${carreras(p).length>1?"¡Nuevo récord!":"Tus primeras marcas:"} ${esc(rec.join(" · "))}</p>`:""}${z&&z.km>=(z.max||700)*.8?`<p class="note" style="margin-top:6px">👟 Tus ${esc(z.n)} ya tienen ${Math.round(z.km)} km: pensá en cambiarlas pronto.</p>`:""}`}
  else extra=`<p class="xs mute" style="margin-top:8px">Sin distancia del GPS. Si usás reloj, Vital la busca en Health Connect cuando sincroniza.</p>`;
  save();G.sum=null;setTimeout(()=>{const sh=document.querySelector("#layer .sheet");const h=sh&&sh.querySelector("h1");if(h)h.insertAdjacentHTML("afterend",extra)},400)};

/* ---------- Distancia del reloj (Health Connect) ---------- */
let RELBUSY=false;
async function relojCarreras(){const H=nplug("Health");if(!H||!S.settings.hc||RELBUSY||!S.profiles.length)return;RELBUSY=true;const p=P();let cambio=false;const iso=t=>new Date(t).toISOString();
  try{for(let i=0;i<3;i++){const k=addDays(TODAY(),-i);const d=L(p.id).days[k];if(!d)continue;
    for(const w of d.workouts){if(!["running","caminata","senderismo","ciclismo"].includes(w.dep)||w.relojOk||Date.now()-w.ts<3*6e4)continue;
      const st=w.start||(w.ts-w.min*6e4),en=w.ts;let km=0;
      try{const r=await H.queryWorkouts({startDate:iso(st-15*6e4),endDate:iso(en+15*6e4),limit:20});
        const cands=(r.workouts||[]).filter(x=>!/vital/i.test(x.sourceName||"")&&x.totalDistance>0).map(x=>({x,ov:Math.min(en,Date.parse(x.endDate))-Math.max(st,Date.parse(x.startDate))})).filter(c=>c.ov>0).sort((a,b)=>b.ov-a.ov);
        if(cands.length)km=cands[0].x.totalDistance/1000}catch(e){}
      if(!km){try{const r=await H.queryAggregated({dataType:"distance",startDate:iso(st),endDate:iso(en),bucket:"day",aggregation:"sum"});km=(r.samples||[]).reduce((a,b)=>a+(b.value||0),0)/1000}catch(e){}}
      if(km>=.2){km=Math.round(km*100)/100;w.run=w.run||{};w.run.kmReloj=km;
        if(!w.km){w.km=km;w.run.km=km;w.run.src="reloj";if(!w.run.ritmo)w.run.ritmo=Math.round(w.min*60/km);if(w.dep==="running")sumarZapas(p,km)}
        w.relojOk=true;cambio=true}
      else if(Date.now()-w.ts>24*3600e3){w.relojOk=true;cambio=true}}}}
  finally{RELBUSY=false}
  if(cambio){save();render()}}
const _hc=hcSync;
hcSync=async function(force){await _hc(force);relojCarreras()};

/* ---------- Sección para la ficha de running ---------- */
window.extraRunning=function(p){const rs=carreras(p);const R=records(p);const zs=zapas(p);const z=zs.find(x=>x.activa);
  const ult=rs.slice(-3).reverse();
  return `${gpsDisponible()?`<button class="opt ${gpsActivado(p)?"on":""}" style="margin-top:10px;width:100%;text-align:left" data-act="cr-gps">📍 Medir distancia y ritmo con GPS${nplug("BackgroundGeolocation")?"":" (con la pantalla prendida)"}<br><span class="xs mute" style="font-weight:500">La voz te dice el ritmo en cada kilómetro. Se guarda solo la distancia, no el recorrido.</span></button>`:""}
  ${ult.length?`<label class="f">Tus últimas salidas</label>${ult.map(({k,w})=>`<p class="sm" style="margin:4px 0"><span class="mute">${new Date(k+"T12:00").toLocaleDateString("es-AR",{day:"numeric",month:"short"})}</span> · <b>${kmTxt(w.km)} km</b> · ${w.min} min${w.run&&w.run.ritmo?" · "+ritmo(w.run.ritmo)+" /km":""}${w.run&&w.run.src==="reloj"?" · ⌚":""}</p>`).join("")}`:""}
  ${R.largo?`<label class="f">🏅 Tus récords</label><div class="row wrap" style="gap:6px">${R.k1?`<span class="pill">Mejor km ${ritmo(R.k1.v)}</span>`:""}${R.k5?`<span class="pill">5 km ${durTxt(R.k5.v)}</span>`:""}${R.k10?`<span class="pill">10 km ${durTxt(R.k10.v)}</span>`:""}${R.k21?`<span class="pill">21 km ${durTxt(R.k21.v)}</span>`:""}<span class="pill">Más larga ${kmTxt(R.largo.v)} km</span></div>`:""}
  <button class="ex" style="margin-top:10px" data-act="cr-zapas"><span class="ico">👟</span><span class="t"><b>${z?esc(z.n):"Tus zapatillas"}</b><span>${z?Math.round(z.km)+" km de "+(z.max||700)+" recomendados":"Anotalas y Vital cuenta los kilómetros de cada par"}</span></span><span class="faint">›</span></button>`};
function verZapas(){const p=P();const zs=zapas(p);
  sheet(`<h2>👟 Tus zapatillas</h2><p class="xs mute">Vital suma los kilómetros de cada salida al par que estés usando. Las zapatillas de running suelen durar entre 600 y 800 km.</p>
  ${zs.filter(z=>!z.retirada).map(z=>`<div class="ex"><span class="ico">👟</span><span class="t"><b>${esc(z.n)}${z.activa?' <span class="pill">en uso</span>':""}</b><span>${Math.round(z.km)} km de ${z.max||700}</span><div class="bar" style="margin-top:5px"><i style="width:${Math.min(100,z.km/(z.max||700)*100)}%;${z.km>=(z.max||700)*.8?"background:var(--warn)":""}"></i></div></span>${z.activa?"":`<button class="btn small ghost" data-act="cr-zusar" data-v="${z.id}">Usar</button>`}<button class="iconbtn" data-act="cr-zret" data-v="${z.id}" title="Retirar">✕</button></div>`).join("")||`<p class="sm mute">Todavía no cargaste ninguna.</p>`}
  <label class="f">Agregar un par</label><input class="in" id="zn" placeholder="Ej.: Adidas Adizero, Topper azules"><div class="row" style="gap:8px;margin-top:8px;align-items:center"><span class="xs mute">Ya tienen</span><input class="in" style="width:90px" id="zk" inputmode="decimal" value="0"><span class="xs mute">km</span></div>
  <button class="btn block" style="margin-top:10px" data-act="cr-zadd">＋ Agregar</button>`)}

const _aa=window.actAct;
window.actAct=function(a,v){if(!a.startsWith("cr-"))return _aa?_aa(a,v):false;const p=P();
  switch(a){
  case "cr-gps":p.gpsRun=!gpsActivado(p);save();window.actAct("pg-run");break;
  case "cr-zapas":verZapas();break;
  case "cr-zadd":{const n=($("#zn").value||"").trim();if(!n){toast("Poné el nombre o la marca");break}const zs=zapas(p);zs.forEach(z=>z.activa=false);zs.push({id:uid(),n,km:parseFloat(String($("#zk").value).replace(",","."))||0,max:700,activa:true});save();verZapas();break}
  case "cr-zusar":zapas(p).forEach(z=>z.activa=z.id===v);save();verZapas();break;
  case "cr-zret":{const z=zapas(p).find(x=>x.id===v);if(z){z.retirada=true;z.activa=false}save();verZapas();break}
  }
  return true};
})();
