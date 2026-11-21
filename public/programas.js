/* =========================================================
   VITAL · Programas (noviembre 2026)
   - Running progresivo por nivel: calentamiento, carrera y vuelta a la calma.
   - Glúteo y fascia lata: elongación + fuerza suave de glúteo medio.
   - Calistenia por nivel.
   - Tai Chi de pie y en silla.
   - Tu rutina de gimnasio: cada uno carga la suya, anota series × reps × kg
     y Vital sugiere la próxima carga (3 sesiones limpias antes de subir).
   Todos usan el nivel por actividad (p.niv) y se ajustan con el esfuerzo
   que la persona marca al terminar (1 a 10).
   Se carga después del script principal y envuelve vEntrenar y savePlayer.
   ========================================================= */
"use strict";
(function(){

/* ---------- Ejercicios nuevos ---------- */
CAT.taichi="Tai Chi";
EQUIP.rodillo="Rodillo de espuma";
const NUEVOS=[
 // Elongación de glúteo y fascia lata
 {id:"estir-tfl-pie",n:"Fascia lata de pie",c:"estir",p:"estir",m:["piernas","gluteos"],e:"ninguno",l:1,a:[],u:"seg",i:"🦵",h:["Cruzá la pierna derecha por detrás de la izquierda.","Empujá la cadera derecha hacia afuera y llevá el brazo derecho por arriba de la cabeza.","Inclinate hacia la izquierda hasta sentir el estiramiento en el costado del muslo y la cadera. Después cambiá de lado."],t:"Si te cuesta el equilibrio, apoyá la mano libre en una pared."},
 {id:"estir-tfl-acostado",n:"Torsión para fascia lata acostado",c:"estir",p:"estir",m:["piernas","gluteos","espalda"],e:"ninguno",l:1,a:[],u:"seg",i:"🌀",h:["Acostado boca arriba, brazos abiertos en cruz.","Doblá una rodilla y llevala hacia el lado contrario, cruzando el cuerpo.","Dejá los hombros apoyados y respirá. Después cambiá de lado."],t:"Llevá la rodilla hasta donde llegue sin forzar."},
 {id:"piriforme",n:"Piriforme acostado",c:"estir",p:"estir",m:["gluteos"],e:"ninguno",l:1,a:[],u:"seg",i:"🍑",h:["Acostado boca arriba con las rodillas dobladas.","Llevá una rodilla hacia el hombro contrario, ayudándote con las manos.","Sostené y respirá. Después cambiá de lado."],t:"Se siente en lo profundo del glúteo: es normal."},
 {id:"gluteo-silla",n:"Glúteo sentado en silla",c:"estir",p:"estir",m:["gluteos"],e:"silla",l:1,a:[],u:"seg",i:"🪑",h:["Sentado en el borde de la silla, apoyá el tobillo derecho sobre la rodilla izquierda.","Con la espalda derecha, inclinate un poco hacia adelante.","Sostené y después cambiá de pierna."],t:"Ideal en el trabajo o para quien no se acuesta en el piso."},
 {id:"paloma",n:"Postura de la paloma",c:"estir",p:"estir",m:["gluteos","piernas"],e:"colchoneta",l:2,a:["rodilla","cadera"],u:"seg",i:"🕊️",h:["Desde cuatro apoyos, llevá la rodilla derecha hacia la mano derecha, con la pierna cruzada adelante.","Estirá la pierna izquierda hacia atrás.","Bajá la cadera y apoyá los antebrazos si llegás. Después cambiá de lado."],t:"Si molesta la rodilla, hacé el piriforme acostado."},
 {id:"estir-gemelos",n:"Gemelos contra la pared",c:"estir",p:"estir",m:["piernas"],e:"ninguno",l:1,a:[],u:"seg",i:"🧱",h:["Manos en la pared, una pierna adelante y otra atrás.","Talón de atrás bien apoyado y pierna de atrás estirada.","Llevá la cadera hacia la pared. Después cambiá de pierna."],t:"Muy útil después de correr."},
 {id:"rodillo-cintilla",n:"Rodillo en el costado del muslo",c:"mov",p:"mov",m:["piernas"],e:"rodillo",l:1,a:[],u:"seg",i:"🧻",h:["Acostado de costado, con el rodillo debajo del muslo.","Apoyá el antebrazo y el otro pie adelante para regular el peso.","Rodá despacio desde la cadera hasta arriba de la rodilla. Después cambiá de lado."],t:"Molesta un poco, pero no tiene que doler. No pases el rodillo sobre la rodilla."},
 {id:"rodillo-gluteo",n:"Rodillo en el glúteo",c:"mov",p:"mov",m:["gluteos"],e:"rodillo",l:1,a:[],u:"seg",i:"🧻",h:["Sentado sobre el rodillo, cruzá un tobillo sobre la rodilla contraria.","Inclinate hacia el lado de la pierna cruzada.","Rodá despacio. Después cambiá de lado."],t:"Buscá los puntos tensos y quedate unos segundos ahí."},
 {id:"almeja",n:"Almeja",c:"fuerza",p:"bisagra",m:["gluteos"],e:"ninguno",l:1,a:[],u:"reps",i:"🐚",h:["Acostado de costado, rodillas dobladas y pies juntos.","Sin separar los pies, abrí la rodilla de arriba.","Bajá despacio. Hacé todas y cambiá de lado."],t:"Fortalece el glúteo medio: ayuda a que la cintilla no vuelva a tirar.",g:"abd-lateral"},
 {id:"abd-lateral",n:"Elevación lateral de pierna acostado",c:"fuerza",p:"bisagra",m:["gluteos"],e:"ninguno",l:1,a:[],u:"reps",i:"🦵",h:["Acostado de costado, pierna de abajo doblada.","Subí la pierna de arriba estirada, con el talón apenas hacia atrás.","Bajá despacio. Hacé todas y cambiá de lado."],t:"Sin girar la cadera hacia atrás.",r:"almeja"},
 // Running
 {id:"trote",n:"Trote suave",c:"cardio",p:"cardio",m:["piernas","gluteos"],e:"ninguno",l:1,a:[],u:"seg",i:"🏃",h:["Paso corto y liviano, apoyando debajo del cuerpo.","Brazos relajados a 90°.","Tenés que poder hablar con frases completas."],t:"Si no podés hablar, bajá el ritmo: así se progresa."},
 {id:"ritmo-fuerte",n:"Ritmo fuerte",c:"cardio",p:"cardio",m:["piernas","gluteos"],e:"ninguno",l:2,a:[],u:"seg",i:"⚡",h:["Subí el ritmo hasta que hablar cueste.","Mantené la técnica: pasos rápidos y cortos.","No es un sprint: tenés que poder sostenerlo todo el tramo."],t:"Cuando termine el tramo, volvé al trote suave."},
 {id:"talones-cola",n:"Talones a la cola",c:"cal",p:"cardio",m:["piernas"],e:"ninguno",l:1,a:[],u:"seg",i:"🦶",h:["Trotando en el lugar, llevá los talones hacia la cola.","Rodillas mirando al piso.","Ritmo suave y constante."],t:"Activa la parte de atrás del muslo antes de correr."},
 // Calistenia
 {id:"remo-australiano",n:"Remo australiano",c:"fuerza",p:"tiron",m:["espalda","brazos"],e:"ninguno",l:2,a:["hombro"],u:"reps",i:"🛏️",h:["Acostado debajo de una mesa firme o una barra baja, agarrate del borde.","Con el cuerpo recto, llevá el pecho hacia el borde.","Bajá despacio."],t:"Cuanto más doblás las rodillas, más fácil. Probá antes que la mesa aguante.",r:"remo-banda",g:"dominada-negativa"},
 {id:"dominada-negativa",n:"Dominada negativa",c:"fuerza",p:"tiron",m:["espalda","brazos"],e:"barra",l:2,a:["hombro","codo"],u:"reps",i:"🧗",h:["Subí arriba de la barra ayudándote con un banco o un salto.","Bajá lo más lento que puedas, unos 4 a 5 segundos.","Volvé a subir con ayuda y repetí."],t:"Es el paso previo a la dominada completa.",r:"remo-australiano",g:"dominada"},
 {id:"pike",n:"Flexión en pica",c:"fuerza",p:"empuje",m:["hombros","brazos"],e:"ninguno",l:2,a:["hombro","muneca"],u:"reps",i:"🔺",h:["Desde la plancha, subí la cadera formando una V invertida.","Doblá los codos llevando la cabeza hacia el piso, entre las manos.","Empujá para volver."],t:"Prepara los hombros para ejercicios avanzados."},
 {id:"hollow",n:"Canoa",c:"fuerza",p:"core",m:["core"],e:"ninguno",l:2,a:["espalda"],u:"seg",i:"🛶",h:["Acostado boca arriba, pegá la zona lumbar al piso.","Despegá hombros y piernas estiradas, brazos hacia atrás.","Sostené sin que se despegue la cintura."],t:"Más fácil: rodillas dobladas y brazos al costado.",r:"dead-bug"},
 {id:"pistol-asistida",n:"Sentadilla a una pierna asistida",c:"fuerza",p:"sentadilla",m:["piernas","gluteos"],e:"silla",l:3,a:["rodilla","cadera"],u:"reps",i:"🦩",h:["Agarrate de una silla firme o del marco de una puerta.","Con una pierna estirada adelante, bajá en una sola pierna lo que puedas.","Subí empujando con el talón. Hacé todas y cambiá."],t:"Bajá hasta donde controles la rodilla.",r:"bulgara"},
 // Tai Chi (de pie y en silla)
 {id:"tc-apertura",n:"Apertura",c:"taichi",p:"taichi",m:["hombros","piernas"],e:"ninguno",l:1,a:[],u:"seg",i:"☯️",h:["Pies al ancho de los hombros y rodillas blandas.","Inhalá mientras subís los brazos al frente hasta la altura de los hombros.","Exhalá mientras bajás las manos y flexionás apenas las rodillas."],t:"Lento y continuo, como si te movieras dentro del agua."},
 {id:"tc-respiracion",n:"Respiración del Tai Chi",c:"taichi",p:"taichi",m:["hombros","core"],e:"ninguno",l:1,a:[],u:"seg",i:"🌬️",h:["Inhalá abriendo los brazos por los costados hasta arriba.","Exhalá bajando las manos por delante del cuerpo.","Acompañá con las rodillas suaves."],t:"La respiración marca el ritmo del movimiento."},
 {id:"tc-empujar",n:"Empujar",c:"taichi",p:"taichi",m:["hombros","brazos","piernas"],e:"ninguno",l:1,a:[],u:"seg",i:"🤲",h:["Manos frente al pecho, palmas hacia adelante.","Exhalá empujando despacio hacia adelante, con el peso hacia adelante.","Inhalá volviendo las manos al pecho."],t:"Empujá con todo el cuerpo, no solo con los brazos."},
 {id:"tc-nubes",n:"Manos de nube",c:"taichi",p:"taichi",m:["hombros","core"],e:"ninguno",l:1,a:[],u:"seg",i:"☁️",h:["Una mano a la altura de la cara y la otra a la altura de la cadera.","Girá el tronco despacio hacia un lado, siguiendo la mano de arriba con la mirada.","Cambiá las manos y girá hacia el otro lado."],t:"El giro sale de la cintura, la cadera acompaña."},
 {id:"tc-grulla",n:"La grulla blanca abre las alas",c:"taichi",p:"taichi",m:["hombros","piernas"],e:"ninguno",l:2,a:["tobillo"],u:"seg",i:"🕊️",h:["Llevá el peso a una pierna.","Subí una mano por delante hasta arriba de la cabeza y bajá la otra al costado de la cadera.","Volvé al centro y hacé el otro lado."],t:"Si dudás del equilibrio, hacelo en silla."},
 {id:"tc-crin",n:"Separar la crin del caballo",c:"taichi",p:"taichi",m:["hombros","piernas","core"],e:"ninguno",l:2,a:["rodilla"],u:"seg",i:"🐎",h:["Manos como si sostuvieras una pelota frente al pecho.","Paso adelante girando el tronco: la mano de adelante sube en diagonal y la otra baja.","Volvé a la pelota y cambiá de lado."],t:"Rodilla de adelante alineada con el pie."}
];
// versiones en silla de Tai Chi
NUEVOS.filter(e=>e.c==="taichi").forEach(e=>NUEVOS.push({...e,id:e.id+"-silla",n:e.n.replace(/ \(.*\)$/,"")+" · en silla",e:"silla",l:1,a:[],h:["Sentado en el borde de la silla, pies apoyados al ancho de la cadera y espalda derecha.",...e.h.slice(1).map(x=>x.replace(/[,.]? ?(y )?flexionás apenas las rodillas/,"").replace("Paso adelante girando","Girando").replace("Llevá el peso a una pierna.","Sentate bien derecho."))],t:"Silla firme y sin rueditas. Movimientos lentos, sin dolor."}));
NUEVOS.forEach(e=>{if(!EXM[e.id]){EX.push(e);EXM[e.id]=e}});
["tc-apertura","tc-respiracion","tc-empujar","tc-nubes","tc-grulla","tc-crin"].forEach(id=>{ANIMADOS.add(id);ANIMADOS.add(id+"-silla")});
["estir-tfl-pie","piriforme","trote","ritmo-fuerte","talones-cola"].forEach(id=>ANIMADOS.add(id));

/* ---------- Niveles de los programas (se suman a los de actividades) ---------- */
NIVQ.calistenia={q:"¿Cuántas flexiones de brazos seguidas hacés?",o:["Ninguna o pocas, o solo con rodillas apoyadas","Entre 10 y 20","Más de 25 y alguna dominada"]};
NIVQ.taichi={q:"¿Ya practicaste Tai Chi?",o:["Nunca, o muy poco","Conozco los movimientos básicos","Practico seguido"]};
NIVQ.elong={q:"Con las piernas estiradas, ¿hasta dónde llegás con las manos?",o:["A las rodillas","A los tobillos","Toco el piso"]};
const NOMBRE={running:"Running",calistenia:"Calistenia",taichi:"Tai Chi",elong:"Elongación"};
const ICO={running:"🏃",calistenia:"🤸",taichi:"☯️",elong:"🧘",gym:"🏋️"};
const LVL=(p,k)=>nivDe(p,k)?nivEf(p,k):0;

/* ---------- Ayudas ---------- */
const it=(id,secs,extra)=>Object.assign({id,sets:1,secs:EXM[id].u==="seg"?secs:0,reps:EXM[id].u==="reps"?secs:0,rest:0},extra||{});
const minDe=blocks=>Math.round(blocks.reduce((a,b)=>a+b.items.reduce((x,i)=>x+i.sets*((i.secs||i.reps*3.5)+(i.rest||0)),0),0)/60);
function apto(p,id){const e=EXM[id];if(!e)return false;const eq=new Set(["ninguno",...(p.equipment||[])]);return eq.has(e.e)&&!e.a.some(a=>(p.limits||[]).includes(a))}
function prog(p){p.prog=p.prog||{};return p.prog}
const mm=s=>s>=60&&s%60===0?(s/60)+"′":s>=60?Math.floor(s/60)+"′"+(s%60)+"″":s+"″";

/* ---------- Running progresivo ---------- */
// cada sesión: lista de tramos [id, segundos]
const RUN={
 1:{n:"Empezar a correr",d:"8 semanas, 3 salidas por semana. Alternás trote y caminata hasta correr 25 minutos seguidos.",sem:[
   [[60,120,6]],[[120,120,5]],[[180,120,5]],[[300,120,4]],[[480,120,3]],[[600,120,3]],[[900,120,2]],[[1500,0,1]]].map(([[t,c,n]])=>[0,1,2].map(()=>{const out=[];for(let i=0;i<n;i++){out.push(["trote",t]);if(c&&i<n-1)out.push(["caminata",c])}return out}))},
 2:{n:"De 5 a 10 km",d:"6 semanas, 3 salidas: rodaje continuo, intervalos y fondo largo.",sem:[0,1,2,3,4,5].map(w=>{const rod=[25,30,30,35,35,40][w],rep=[4,4,5,5,6,6][w],fon=[35,40,45,50,55,60][w];
   const iv=[];for(let i=0;i<rep;i++){iv.push(["ritmo-fuerte",180]);iv.push(["trote",120])}
   return [[["trote",rod*60]],iv,[["trote",fon*60]]]})},
 3:{n:"Mejorar tu 10K",d:"6 semanas, 3 salidas: tempo, pasadas y fondo largo.",sem:[0,1,2,3,4,5].map(w=>{const tem=[15,18,20,22,25,25][w],rep=[6,7,8,8,10,10][w],fon=[60,65,70,75,80,70][w];
   const pa=[];for(let i=0;i<rep;i++){pa.push(["ritmo-fuerte",90]);pa.push(["trote",90])}
   return [[["trote",600],["ritmo-fuerte",tem*60],["trote",300]],[["trote",600],...pa],[["trote",fon*60]]]})}
};
const TIPO_SES={1:["Trote y caminata","Trote y caminata","Trote y caminata"],2:["Rodaje continuo","Intervalos","Fondo largo"],3:["Tempo","Pasadas","Fondo largo"]};
const CINTA={1:"Trote suave: 7 a 8,5 km/h. Caminata: 5,5 a 6,5 km/h.",2:"Trote: 8,5 a 9,5 km/h. Ritmo fuerte: 10 a 10,5 km/h.",3:"Trote: 9 a 10 km/h. Tempo y pasadas: 10,5 a 12 km/h."};
function runEstado(p){const r=prog(p).run;if(!r)return null;const pl=RUN[r.l];if(r.sem>=pl.sem.length)return {...r,fin:true};return r}
function sesionRun(p){const r=runEstado(p);const pl=RUN[r.l];const tr=pl.sem[r.sem][r.ses];
  const cal=[it("caminata",180),it("balanceo-piernas",40),it("circulos-cadera",30),it("talones-cola",30),it("rodillas-arriba",30)].filter(x=>apto(p,x.id));
  const calma=[it("caminata",180),it("estir-isquios",40),it("estir-cuadriceps",40),it("estir-gemelos",40),it("estir-tfl-pie",40),it("piriforme",40)].filter(x=>apto(p,x.id));
  const blocks=[{n:"Entrada en calor",items:cal},{n:"Carrera",items:tr.map(([id,s])=>it(id,s))},{n:"Vuelta a la calma",items:calma}];
  return {mode:"constante",blocks,minutes:minDe(blocks),created:Date.now(),prog:{k:"running",sem:r.sem,ses:r.ses,l:r.l},auto:true,
    title:`Running · semana ${r.sem+1} · ${TIPO_SES[r.l][r.ses].toLowerCase()}`}}
function verRunning(){const p=P();const r=runEstado(p);
  if(!r)return elegirNivel("running","Running progresivo","Elegí desde dónde arrancás. Vital arma el plan según tu nivel.");
  const pl=RUN[r.l];
  if(r.fin){sheet(`<h2>🏃 ${pl.n}: ¡terminado!</h2><p class="sm">Completaste las ${pl.sem.length} semanas. Muy bien.</p>${r.l<3?`<button class="btn block" style="margin-top:12px" data-act="pg-run-next">Seguir con «${RUN[r.l+1].n}»</button>`:""}<button class="btn ghost block" style="margin-top:8px" data-act="pg-run-reset">Repetir o cambiar de nivel</button>`);return}
  const sx=sesionRun(p);const riesgo=(p.limits||[]).some(x=>["rodilla","tobillo","cardio","embarazo"].includes(x))||p.parqFlag;
  sheet(`<h2>🏃 ${pl.n}</h2><p class="xs mute">Nivel ${NIVN[r.l]} · ${pl.d}</p>
  ${riesgo?`<p class="note" style="margin-top:8px">Marcaste algo para cuidar (rodillas, tobillos, corazón o embarazo). Consultá con tu médico antes de empezar a correr y frená si aparece dolor.</p>`:""}
  <div class="row wrap" style="gap:6px;margin-top:10px">${pl.sem.map((_,i)=>`<span class="pill" style="${i===r.sem?"border-color:var(--mint);color:var(--mint)":i<r.sem?"opacity:.55":""}">S${i+1}${i<r.sem?" ✓":""}</span>`).join("")}</div>
  <section class="glass" style="margin-top:12px;padding:14px"><b>Hoy: semana ${r.sem+1} · salida ${r.ses+1} de 3</b><p class="sm mute" style="margin:4px 0">${TIPO_SES[r.l][r.ses]} · ≈ ${sx.minutes} min con calentamiento y vuelta a la calma</p>
   <p class="sm">${resumenTramos(sx.blocks[1].items)}</p></section>
  <p class="note" style="margin-top:8px">🗣️ Test del habla: en el trote suave tenés que poder hablar con frases completas. Si no podés, bajá el ritmo.<br>🏃 En cinta (referencia): ${CINTA[r.l]} Inclinación 1 %.</p>
  ${window.extraRunning?extraRunning(p):""}
  <button class="btn block" style="margin-top:12px" data-act="pg-run-go">▶ Empezar la salida de hoy</button>
  <div class="row" style="gap:8px;margin-top:8px"><button class="btn ghost" style="flex:1" data-act="pg-run-hecho">Ya la hice por mi cuenta</button><button class="btn ghost" style="flex:1" data-act="pg-nivel" data-v="running">Cambiar nivel</button></div>
  <p class="xs faint" style="margin-top:10px">Vital te guía con voz en cada tramo. Al terminar, el esfuerzo que marques decide si avanzás o repetís.</p>`)}
function resumenTramos(items){const n=x=>mm(x.secs)+" "+EXM[x.id].n.toLowerCase();const out=[];let i=0;
  // comprime los tramos alternados: «4 × (3′ ritmo fuerte + 2′ trote suave)»
  while(i<items.length){const a=items[i],b=items[i+1];let k=0;
    if(b)while(i+2*k+1<items.length&&items[i+2*k].id===a.id&&items[i+2*k].secs===a.secs&&items[i+2*k+1].id===b.id&&items[i+2*k+1].secs===b.secs)k++;
    if(k>=2){const fin=items[i+2*k];if(fin&&fin.id===a.id&&fin.secs===a.secs){out.push(`${k+1} veces ${n(a)}, con ${n(b)} entre medio`);i+=2*k+1}else{out.push(`${k} × (${n(a)} + ${n(b)})`);i+=2*k}}
    else{out.push(n(a));i++}}
  return out.join(", después ")}
function avanzarRun(p){const r=prog(p).run;r.ses++;if(r.ses>2){r.ses=0;r.sem++}r.hist=(r.hist||[]).concat({k:TODAY(),sem:r.sem,ses:r.ses}).slice(-60)}

/* ---------- Glúteo y fascia lata ---------- */
function sesionGlu(p){const l=LVL(p,"elong")||1;const s=[30,40,50][l-1];
  const el=[it("estir-tfl-pie",s,{sets:2}),it(apto(p,"paloma")&&l>=2?"paloma":"piriforme",s,{sets:2}),it("gluteo-silla",s,{sets:2}),it("estir-tfl-acostado",s,{sets:2}),it("cadera-flexor",s,{sets:2})].filter(x=>apto(p,x.id));
  const rod=[it("rodillo-cintilla",45,{sets:2}),it("rodillo-gluteo",45,{sets:2})].filter(x=>apto(p,x.id));
  const fu=[it("almeja",[10,12,15][l-1],{sets:2,rest:10}),it("abd-lateral",[10,12,15][l-1],{sets:2,rest:10})].filter(x=>apto(p,x.id));
  const blocks=[{n:"Para entrar en calor",items:[it("circulos-cadera",40),it("balanceo-piernas",40)].filter(x=>apto(p,x.id))},...(rod.length?[{n:"Rodillo",items:rod}]:[]),{n:"Elongación (cada lado)",items:el},{n:"Fuerza suave de glúteo medio",items:fu}];
  return {mode:"suave",blocks,minutes:minDe(blocks),created:Date.now(),prog:{k:"elong"},auto:true,title:"Glúteo y fascia lata"}}

/* ---------- Calistenia ---------- */
const CALI={1:[["flexion-inclinada",8],["remo-australiano",8],["sentadilla",12],["puente",12],["plancha-rodillas",25]],
 2:[["flexion",10],["remo-australiano",10],["bulgara",8],["pike",8],["dominada-negativa",4],["plancha",40]],
 3:[["flexion",15],["dominada",6],["pistol-asistida",6],["pike",10],["hollow",30],["burpee",10]]};
const ALT={"remo-australiano":"remo-banda","dominada-negativa":"remo-australiano","dominada":"remo-australiano","pistol-asistida":"bulgara","pike":"flexion","hollow":"plancha","flexion-inclinada":"flexion-pared","bulgara":"zancada-atras","remo-banda":"nadador"};
function sesionCali(p){const l=LVL(p,"calistenia")||1;const sets=[3,3,4][l-1];
  const items=CALI[l].map(([id,n])=>{let x=id,g=0,f=1;while(x&&!apto(p,x)&&g++<4){if(x==="dominada"||x==="dominada-negativa")f=2;x=ALT[x]}return x?it(x,Math.round(n*f),{sets,rest:[60,60,75][l-1]}):null}).filter(Boolean);
  const blocks=[{n:"Entrada en calor",items:[it("marcha",60),it("circulos-brazos",30),it("gato-vaca",40),it("bisagra-libre",10)].filter(x=>apto(p,x.id))},{n:"Calistenia · nivel "+NIVN[l].toLowerCase(),items},{n:"Vuelta a la calma",items:[it("estir-pecho",40),it("nino",40)].filter(x=>apto(p,x.id))}];
  return {mode:"constante",blocks,minutes:minDe(blocks),created:Date.now(),prog:{k:"calistenia"},title:"Calistenia · "+NIVN[l]}}

/* ---------- Tai Chi ---------- */
function sesionTai(p,silla){const l=LVL(p,"taichi")||1;const s=[60,90,120][l-1];const ids=l===1?["tc-apertura","tc-respiracion","tc-empujar","tc-nubes","tc-respiracion"]:["tc-apertura","tc-crin","tc-grulla","tc-nubes","tc-empujar","tc-respiracion"];
  const items=ids.map(id=>{const x=silla||!apto(p,id)?id+"-silla":id;return it(x,s,{rest:5})});
  const blocks=[{n:silla?"Tai Chi en silla":"Tai Chi de pie",items}];
  return {mode:"suave",blocks,minutes:minDe(blocks),created:Date.now(),prog:{k:"taichi"},auto:true,title:silla?"Tai Chi en silla":"Tai Chi"}}

/* ---------- Elegir nivel de un programa ---------- */
let NIVPEND=null;
function elegirNivel(k,titulo,txt){const p=P();NIVPEND=k;const q=NIVQ[k];const n=nivDe(p,k)||{};
  sheet(`<h2>${ICO[k]||""} ${esc(titulo||NOMBRE[k])}</h2><p class="sm mute">${esc(txt||"Contale a Vital desde dónde arrancás.")}</p><label class="f">${q.q}</label>
  <div class="opts">${q.o.map((t,i)=>`<button class="opt ${n.l===i+1?"on":""}" data-act="pg-niv" data-v="${k}:${i+1}" style="text-align:left">${NIVN[i+1]}<br><span class="xs mute" style="font-weight:500">${t}</span></button>`).join("")}</div>
  <button class="opt ${n.ret?"on":""}" style="margin-top:8px" data-act="pg-nivr" data-v="${k}">↺ Estoy retomando después de una pausa</button>
  <p class="xs faint" style="margin-top:8px">«Retomando» arranca un escalón más abajo. Podés cambiarlo cuando quieras.</p>`)}


/* ---------- Sesiones automáticas (running, Tai Chi, elongación) ----------
   Cada tramo arranca solo y pasa al siguiente sin pedir «¿Cómo te resultó?»:
   corriendo no se puede estar tocando la pantalla. La voz dice qué sigue y cuánto dura. */
const durVoz=s=>s>=60?(s%60?Math.floor(s/60)+" minutos y "+(s%60)+" segundos":(s/60===1?"1 minuto":s/60+" minutos")):s+" segundos";
const _enter=enterStep;
enterStep=function(){_enter();if(!PL||!PL.s||!PL.s.auto)return;const st=PL.steps[PL.i];if(!st||st.kind!=="work")return;const e=EXM[st.it.id];
  if(e.u==="seg"&&!PL.run){PL.run=true;say(e.n+". "+durVoz(st.it.secs));drawPlayer();tick()}};
const _tick=tick;
tick=function(){if(!PL||!PL.s||!PL.s.auto)return _tick();clearInterval(PL.timer);
  PL.timer=setInterval(()=>{if(!PL||!PL.run)return;PL.t--;if(PL.t<=3&&PL.t>0)beep(660,.08);if(PL.t===30&&PL.steps[PL.i].kind==="work"&&PL.steps[PL.i].it.secs>=120)say("Quedan 30 segundos");
    const el=$("#pl-time");if(el)el.textContent=fmt(PL.t);if(PL.t<=0){beep(990,.25);nextStep()}},1000)};

/* ---------- Al terminar: avanza, repite o propone subir según el esfuerzo ---------- */
function alTerminar(pr,rpe){const p=P();const P2=prog(p);let h="";
  const facil=rpe<=4,duro=rpe>=9;
  if(pr.k==="running"){const r=P2.run;if(!r)return;
    if(duro){h=`<p class="sm">Marcaste esfuerzo ${rpe}/10: <b>repetimos esta salida</b> la próxima vez. Así se progresa sin lesionarse.</p><button class="btn ghost block" style="margin-top:8px" data-act="pg-run-avanzar">Prefiero avanzar igual</button>`}
    else{avanzarRun(p);const e=runEstado(p);h=e.fin?`<p class="sm">🏁 ¡Terminaste el plan «${RUN[r.l].n}»!</p>`:`<p class="sm">Esfuerzo ${rpe}/10: <b>avanzás</b>. Próxima: semana ${e.sem+1}, salida ${e.ses+1} (${TIPO_SES[e.l][e.ses].toLowerCase()}).</p>`;
      if(facil&&!e.fin){r.faciles=(r.faciles||0)+1;if(r.faciles>=3&&e.sem<RUN[r.l].sem.length-1){h+=`<p class="note green" style="margin-top:8px">Las últimas salidas te resultaron fáciles. ¿Saltás una semana?</p><button class="btn ghost block" style="margin-top:6px" data-act="pg-run-saltar">Saltar a la semana ${e.sem+2}</button>`}}else r.faciles=0}}
  else{const k=pr.k;const s=P2[k]=P2[k]||{n:0,f:0};s.n++;s.ultimo=TODAY();s.f=facil?(s.f||0)+1:0;const n=nivDe(p,k);
    if(duro)h=`<p class="sm">Esfuerzo ${rpe}/10: fue mucho. ${n&&n.l>1?`¿Bajás a <b>${NIVN[n.l-1]}</b> por un tiempo?</p><button class="btn ghost block" style="margin-top:8px" data-act="pg-baja" data-v="${k}">Bajar a ${NIVN[n.l-1]}</button>`:"La próxima, tomate más descanso entre series.</p>"}`;
    else if(s.f>=2&&n&&n.l<3)h=`<p class="sm">Dos sesiones seguidas fáciles. ¿Estás para <b>${NIVN[n.l+1]}</b>?</p><button class="btn block" style="margin-top:8px" data-act="pg-sube" data-v="${k}">Subir a ${NIVN[n.l+1]}</button>`;
    else h=`<p class="sm">Esfuerzo ${rpe}/10. Llevás ${s.n} ${s.n===1?"sesión":"sesiones"} de ${NOMBRE[k].toLowerCase()}.</p>`}
  save();sheet(`<h1>Guardado 💪</h1>${h}<button class="btn block" style="margin-top:12px" data-act="close">Listo</button>`)}
const _savePl=savePlayer;
// savePlayer cambia a #hoy y el cambio de pantalla cierra los paneles: se muestra después
savePlayer=function(){const pr=PL&&PL.s&&PL.s.prog,rpe=PL&&PL.rpe;_savePl();if(pr)setTimeout(()=>alTerminar(pr,rpe||6),150)};

/* ---------- Tu rutina de gimnasio ---------- */
const PLANT={
 1:{n:"Inicial · cuerpo completo (3 días)",dias:[["Día A · cuerpo completo",[["Prensa 45°",3,12,5],["Dorsalera (polea al pecho)",3,12,2.5],["Chest press (máquina)",3,12,2.5],["Camilla de femorales",3,12,2.5],["Press de hombros (máquina)",3,12,2.5],["Plancha (segundos)",3,30,0]]],
   ["Día B · cuerpo completo",[["Sillón de cuádriceps",3,12,2.5],["Remo sentado (polea)",3,12,2.5],["Hip thrust",3,12,5],["Vuelos laterales (mancuernas)",3,12,1],["Curl de bíceps en polea",3,12,2.5],["Crunch abdominal",3,15,0]]]]},
 2:{n:"Intermedio · superior / inferior (4 días)",dias:[["Lunes · tren superior",[["Dorsalera agarre neutro",3,12,2.5],["Remo sin apoyo de pecho",3,12,2.5],["Mariposa (pec deck)",3,12,2.5],["Posteriores (pec deck inversa)",3,12,2.5],["Tríceps en polea alta",3,12,2.5],["Curl 45° banco inclinado",3,10,1]]],
   ["Miércoles · tren inferior",[["Prensa 45°",3,12,5],["Sentadilla búlgara (mancuernas)",3,12,2],["Hip thrust",3,12,5],["Sillón de cuádriceps",3,12,2.5],["Camilla de femorales",3,12,2.5],["Plancha (segundos)",3,60,0]]],
   ["Viernes · tren inferior II",[["Hack squat",3,12,2.5],["Peso muerto rumano",3,12,2.5],["Patada de glúteo en polea",3,12,2.5],["Aductores (máquina)",3,12,2.5],["Abducciones sentado",3,12,2.5],["Gemelos en Smith",3,12,2.5]]],
   ["Sábado · tren superior II",[["Serrucho a una mano",3,12,2],["Chest press vertical",3,12,2.5],["Press militar (máquina)",3,12,2.5],["Vuelos laterales",3,10,1],["Curl de bíceps en polea",3,12,2.5],["Tríceps tras nuca en polea",3,12,2.5]]]]},
 3:{n:"Avanzado · empuje / tirón / piernas (5 días)",dias:[["Empuje",[["Press de banca",4,8,2.5],["Press inclinado con mancuernas",4,10,2],["Press militar",4,8,2.5],["Vuelos laterales",4,12,1],["Fondos",3,10,0],["Tríceps en polea",3,12,2.5]]],
   ["Tirón",[["Dominadas",4,8,0],["Remo con barra",4,8,2.5],["Jalón al pecho",3,10,2.5],["Face pull",3,15,2.5],["Curl con barra",3,10,2.5],["Curl martillo",3,12,1]]],
   ["Piernas",[["Sentadilla con barra",4,8,5],["Peso muerto rumano",4,8,5],["Prensa 45°",3,12,5],["Camilla de femorales",3,12,2.5],["Gemelos",4,15,2.5]]],
   ["Torso",[["Press de banca inclinado",4,8,2.5],["Remo con mancuerna",4,10,2],["Press Arnold",3,10,1],["Jalón agarre cerrado",3,10,2.5],["Plancha con peso (segundos)",3,45,0]]],
   ["Piernas II",[["Hip thrust con barra",4,10,5],["Sentadilla búlgara",3,10,2],["Hack squat",3,10,5],["Sillón de cuádriceps",3,12,2.5],["Abducciones",3,15,2.5]]]]}};
function gym(p){p.gym=p.gym||{dias:[]};return p.gym}
const fk=n=>String(Math.round(n*10)/10).replace(".",",");
const fmtS=s=>{if(!s||!s.length)return "—";const kg=s.map(x=>x.kg);const r=s.map(x=>x.r);const mismoKg=kg.every(k=>k===kg[0]),mismoR=r.every(x=>x===r[0]);
  if(mismoKg)return (mismoR?s.length+"×"+r[0]:s.length+"×"+r.join("-"))+(kg[0]?" @ "+fk(kg[0])+" kg":"");return s.map(x=>"1×"+x.r+(x.kg?" @ "+fk(x.kg)+" kg":"")).join(" + ")};
// Sugerencia de carga: 3 sesiones limpias con el mismo peso → sube un escalón; con dolor → baja
function sugerir(ex){const h=ex.hist||[];const last=h[h.length-1];const paso=+ex.paso||0;
  if(!last)return {kg:0,r:ex.reps,txt:"Primera vez: elegí un peso con el que hagas las "+ex.reps+" repeticiones con buena técnica."};
  const kg=Math.max(...last.s.map(x=>x.kg||0));
  if(last.ok==="dolor")return {kg:Math.max(0,kg-paso),r:ex.reps,txt:"La última vez hubo dolor: bajá un escalón y cuidá la técnica. Si sigue, consultá.",warn:1};
  const completa=x=>x.s.length>=ex.series&&x.s.every(y=>y.r>=ex.reps);
  let limpias=0;for(let i=h.length-1;i>=0;i--){const x=h[i];if(Math.max(...x.s.map(y=>y.kg||0))!==kg||!completa(x)||x.ok!=="limpio")break;limpias++}
  if(limpias>=3&&paso)return {kg:kg+paso,r:ex.reps,txt:`3 sesiones limpias con ${fk(kg)} kg: subí a ${fk(kg+paso)} kg. Si no salen todas las reps, está bien: consolidás.`,up:1};
  if(completa(last))return {kg,r:ex.reps,txt:`Mantené ${fk(kg)} kg: llevás ${limpias} de 3 sesiones limpias para subir.`};
  return {kg,r:ex.reps,txt:`Mantené ${fk(kg)} kg y buscá completar las ${ex.series}×${ex.reps} con buena técnica.`}}
let GD=null,GE=null;
function verGym(){const p=P();const g=gym(p);
  sheet(`<h2>🏋️ Tu rutina de gimnasio</h2><p class="xs mute">Cargá tu rutina una vez. Cada vez que entrenás, anotá series, repeticiones y kilos: Vital te sugiere la próxima carga.</p>
  ${g.dias.length?g.dias.map(d=>{const u=d.ex.flatMap(e=>(e.hist||[]).map(h=>h.k)).sort().pop();return `<button class="ex" data-act="pg-gdia" data-v="${d.id}"><span class="ico">🏋️</span><span class="t"><b>${esc(d.n)}</b><span>${d.ex.length} ejercicios${u?" · último: "+new Date(u+"T12:00").toLocaleDateString("es-AR",{day:"numeric",month:"short"}):""}</span></span><span class="faint">›</span></button>`}).join(""):`<p class="sm mute" style="margin-top:10px">Todavía no cargaste tu rutina.</p>`}
  <button class="btn block" style="margin-top:12px" data-act="pg-gnuevo">＋ Agregar un día</button>
  ${g.dias.length?"":`<label class="f">O empezá con una plantilla y después la ajustás</label>${Object.entries(PLANT).map(([k,t])=>`<button class="btn ghost block" style="margin-top:6px" data-act="pg-gplant" data-v="${k}">${t.n}</button>`).join("")}`}
  <p class="xs faint" style="margin-top:10px">Regla de Vital: no subir de peso hasta tener 3 sesiones limpias (todas las series y reps, sin dolor). Respetá el escalón de cada máquina.</p>`)}
function verDia(id){const p=P();const d=gym(p).dias.find(x=>x.id===id);if(!d)return verGym();GD=id;
  sheet(`<h2>${esc(d.n)}</h2><div class="row" style="gap:6px;margin:6px 0"><input class="in" style="flex:1" id="gdn" value="${esc(d.n)}" aria-label="Nombre del día"><button class="btn small ghost" data-act="pg-gren">Guardar</button></div><div class="row" style="gap:6px;margin:4px 0 8px"><button class="chip" data-act="pg-gdel">🗑 Borrar día</button><button class="chip" data-act="pg-gvolver">‹ Mis días</button></div>
  ${d.ex.map(e=>{const last=(e.hist||[]).slice(-1)[0];const sg=sugerir(e);return `<button class="ex" data-act="pg-gex" data-v="${e.id}"><span class="ico" style="font-size:13px;font-weight:800">${e.series}×${e.reps}</span><span class="t"><b>${esc(e.n)}</b><span>${last?"Último ("+new Date(last.k+"T12:00").toLocaleDateString("es-AR",{day:"numeric",month:"numeric"})+"): "+esc(fmtS(last.s)):"Sin registros"}</span><span style="display:block;color:${sg.warn?"var(--bad)":sg.up?"var(--mint)":"var(--lime)"}">🎯 ${sg.kg?e.series+"×"+sg.r+" @ "+fk(sg.kg)+" kg":"Probá tu peso"}${sg.up?" ⬆":""}</span></span><span class="faint">›</span></button>`}).join("")||`<p class="sm mute">Agregá los ejercicios de este día.</p>`}
  <label class="f">Agregar ejercicio</label><input class="in" id="gxn" placeholder="Ej.: Prensa 45°">
  <div class="grid3" style="margin-top:8px"><div><span class="xs mute">Series</span><input class="in" id="gxs" inputmode="numeric" value="3"></div><div><span class="xs mute">Reps (o seg.)</span><input class="in" id="gxr" inputmode="numeric" value="12"></div><div><span class="xs mute">Escalón kg</span><input class="in" id="gxp" inputmode="decimal" value="2,5"></div></div>
  <button class="btn ghost block" style="margin-top:8px" data-act="pg-gxadd">＋ Agregar</button>
  <button class="btn block" style="margin-top:12px" data-act="pg-gfin">✓ Terminé este día: registrar actividad</button>`)}
function verEx(id){const p=P();const d=gym(p).dias.find(x=>x.id===GD);const e=d&&d.ex.find(x=>x.id===id);if(!e)return;GE={id,ok:"limpio"};const sg=sugerir(e);
  sheet(`<h2>${esc(e.n)}</h2><p class="xs mute">Objetivo ${e.series}×${e.reps}${e.paso?" · la carga sube de a "+fk(e.paso)+" kg":""}</p>
  <p class="note ${sg.warn?"":"green"}" style="margin-top:8px">🎯 ${esc(sg.txt)}</p>
  <label class="f">Lo que hiciste hoy</label>
  ${Array.from({length:e.series},(_,i)=>`<div class="row" style="gap:8px;margin:6px 0;align-items:center"><span class="xs mute" style="width:56px">Serie ${i+1}</span><input class="in" style="flex:1" id="gr${i}" inputmode="numeric" value="${sg.r}" aria-label="Repeticiones"><span class="xs mute">reps</span><input class="in" style="flex:1" id="gk${i}" inputmode="decimal" value="${sg.kg?fk(sg.kg):""}" placeholder="kg" aria-label="Kilos"><span class="xs mute">kg</span></div>`).join("")}
  <label class="f">¿Cómo salió?</label><div class="opts">${[["limpio","Limpio, buena técnica"],["costo","Me costó"],["dolor","Hubo dolor"]].map(([k,n])=>`<button class="opt ${k==="limpio"?"on":""}" data-act="pg-gok" data-v="${k}">${n}</button>`).join("")}</div>
  <label class="f">Nota (opcional)</label><input class="in" id="gnota" placeholder="Ej.: otra máquina, pausa en la rep 9">
  <button class="btn block" style="margin-top:12px" data-act="pg-gsave">Guardar</button>
  ${(e.hist||[]).length?`<h3 style="margin-top:14px">Historial</h3>${e.hist.slice(-8).reverse().map(h=>`<p class="sm" style="margin:4px 0"><span class="mute">${new Date(h.k+"T12:00").toLocaleDateString("es-AR",{day:"numeric",month:"numeric"})}</span> · ${esc(fmtS(h.s))}${h.ok==="dolor"?" · ⚠ dolor":h.ok==="costo"?" · costó":""}${h.nota?` · <span class="mute">${esc(h.nota)}</span>`:""}</p>`).join("")}`:""}
  <div class="row" style="gap:8px;margin-top:12px"><button class="btn ghost" style="flex:1" data-act="pg-gvolverdia">‹ Volver</button><button class="btn ghost" data-act="pg-gxdel">🗑 Quitar ejercicio</button></div>`)}
const num=v=>parseFloat(String(v||"").replace(",","."))||0;

/* ---------- Sección en Entrenar ---------- */
function tarjetaProgramas(p){const r=runEstado(p);const g=gym(p);
  const b=(act,ico,t,sub,v)=>`<button class="stat" data-act="${act}" ${v?`data-v="${v}"`:""} style="text-align:left;border:1px solid var(--line)"><b>${ico} ${t}</b><span class="xs mute">${sub}</span></button>`;
  const nv=k=>nivDe(p,k)?" · "+NIVN[nivDe(p,k).l]:"";
  return `<section class="glass org2"><h2>Programas</h2><p class="xs mute" style="margin-top:-4px">Planes que avanzan con vos, según tu nivel.</p><div class="grid2">
  ${b("pg-run","🏃","Running progresivo",r?(r.fin?"¡Plan terminado!":`Semana ${r.sem+1} · salida ${r.ses+1} · ${NIVN[r.l]}`):"Calentamiento, carrera y vuelta a la calma")}
  ${b("pg-glu","🧘","Glúteo y fascia lata","Elongación + fuerza suave · ≈ "+sesionGlu(p).minutes+" min"+nv("elong"))}
  ${b("pg-cali","🤸","Calistenia","Con tu peso corporal"+nv("calistenia"))}
  ${b("pg-tai","☯️","Tai Chi","De pie o en silla"+nv("taichi"))}
  <button class="stat" data-act="pg-gym" style="text-align:left;border:1px solid var(--line);grid-column:1/-1"><b>🏋️ Tu rutina de gimnasio</b><span class="xs mute">${g.dias.length?g.dias.length+" días cargados · Vital te sugiere la próxima carga":"Cargá tu rutina y Vital te sugiere cuándo subir de peso"}</span></button>
  </div></section>`}
// En las sesiones de programa no va «↻ Otra» (armaría una rutina común en lugar del programa)
const _os=openSession;
openSession=function(s,t){_os(s,t);if(s&&s.prog){const b=document.querySelector('#layer [data-act="regen"]');if(b)b.remove()}};
const _vE=vEntrenar;
vEntrenar=function(){let h=_vE();const p=P();const i=h.indexOf("<h2>Armar rutina</h2>");const j=i>0?h.lastIndexOf("<section",i):-1;if(j>0)h=h.slice(0,j)+tarjetaProgramas(p)+h.slice(j);return h};

/* ---------- Acciones ---------- */
function progAct(a,v){const p=S.profiles.length?P():null;if(!p||!a.startsWith("pg-"))return false;
  switch(a){
  case "pg-run":verRunning();return true;
  case "pg-run-go":openSession(sesionRun(p));return true;
  case "pg-run-hecho":avanzarRun(p);save();render();verRunning();toast("Salida anotada como hecha ✓");return true;
  case "pg-run-avanzar":avanzarRun(p);save();closeSheet();toast("Avanzás a la próxima salida");return true;
  case "pg-run-saltar":{const r=prog(p).run;r.sem++;r.ses=0;r.faciles=0;save();closeSheet();toast("Saltaste a la semana "+(r.sem+1));return true}
  case "pg-run-next":{const r=prog(p).run;prog(p).run={l:Math.min(3,r.l+1),sem:0,ses:0,hist:r.hist};p.niv=p.niv||{};p.niv.running={l:Math.min(3,r.l+1)};save();verRunning();return true}
  case "pg-run-reset":delete prog(p).run;save();verRunning();return true;
  case "pg-glu":if(!nivDe(p,"elong"))return elegirNivel("elong","Glúteo y fascia lata","Elongación para la cadera, el glúteo y el costado del muslo, más fuerza suave del glúteo medio."),true;openSession(sesionGlu(p));return true;
  case "pg-cali":if(!nivDe(p,"calistenia"))return elegirNivel("calistenia","Calistenia","Fuerza con tu propio peso: flexiones, remos, sentadillas y core."),true;openSession(sesionCali(p));return true;
  case "pg-tai":if(!nivDe(p,"taichi"))return elegirNivel("taichi","Tai Chi","Movimientos lentos y continuos: equilibrio, movilidad y calma. Se puede hacer sentado."),true;
    sheet(`<h2>☯️ Tai Chi</h2><p class="sm mute">Nivel ${NIVN[nivDe(p,"taichi").l]}. Lento, continuo y sin dolor.</p><button class="btn block" style="margin-top:12px" data-act="pg-tai-go" data-v="pie">🧍 De pie · ≈ ${sesionTai(p,false).minutes} min</button><button class="btn ghost block" style="margin-top:8px" data-act="pg-tai-go" data-v="silla">🪑 En silla · ≈ ${sesionTai(p,true).minutes} min</button><p class="xs faint" style="margin-top:10px">En silla: firme, sin rueditas, y los pies bien apoyados. Ideal para adultos mayores o si te cuesta el equilibrio.</p><button class="link" data-act="pg-nivel" data-v="taichi">Cambiar nivel</button>`);return true;
  case "pg-tai-go":openSession(sesionTai(p,v==="silla"));return true;
  case "pg-nivel":elegirNivel(v);return true;
  case "pg-niv":{const [k,l]=v.split(":");p.niv=p.niv||{};const n=p.niv[k]||{};n.l=+l;p.niv[k]=n;
    if(k==="running"){const lv=Math.max(1,n.l-(n.ret?1:0));const r=prog(p).run;if(!r||r.l!==lv)prog(p).run={l:lv,sem:0,ses:0,hist:(r&&r.hist)||[]}}
    save();render();({running:verRunning,elong:()=>openSession(sesionGlu(p)),calistenia:()=>openSession(sesionCali(p)),taichi:()=>progAct("pg-tai")})[k]();return true}
  case "pg-nivr":{p.niv=p.niv||{};const n=p.niv[v]||{l:0};n.ret=!n.ret;p.niv[v]=n;save();elegirNivel(v);return true}
  case "pg-sube":case "pg-baja":{const n=nivDe(p,v);if(n){n.l=clamp(n.l+(a==="pg-sube"?1:-1),1,3);n.ret=false;(prog(p)[v]||{}).f=0}save();closeSheet();render();toast(NOMBRE[v]+": nivel "+NIVN[n.l]);return true}
  // gimnasio
  case "pg-gym":verGym();return true;
  case "pg-gvolver":verGym();return true;
  case "pg-gplant":{const t=PLANT[v];gym(p).dias=t.dias.map(([n,ex])=>({id:uid(),n,ex:ex.map(([en,s,r,ps])=>({id:uid(),n:en,series:s,reps:r,paso:ps,hist:[]}))}));save();render();verGym();toast("Plantilla cargada: ajustala a tu rutina");return true}
  case "pg-gnuevo":{const d={id:uid(),n:"Día "+(gym(p).dias.length+1),ex:[]};gym(p).dias.push(d);save();verDia(d.id);return true}
  case "pg-gdia":verDia(v);return true;
  case "pg-gren":{const d=gym(p).dias.find(x=>x.id===GD);const n=($("#gdn").value||"").trim();if(n){d.n=n;save();toast("Nombre guardado")}verDia(GD);return true}
  case "pg-gdel":{if(!confirm("¿Borrar este día y su historial?"))return true;gym(p).dias=gym(p).dias.filter(x=>x.id!==GD);save();render();verGym();return true}
  case "pg-gxadd":{const n=($("#gxn").value||"").trim();if(!n){toast("Escribí el nombre del ejercicio");return true}
    const d=gym(p).dias.find(x=>x.id===GD);d.ex.push({id:uid(),n,series:clamp(Math.round(num($("#gxs").value))||3,1,8),reps:clamp(Math.round(num($("#gxr").value))||12,1,300),paso:num($("#gxp").value),hist:[]});save();verDia(GD);return true}
  case "pg-gex":verEx(v);return true;
  case "pg-gvolverdia":verDia(GD);return true;
  case "pg-gok":{GE.ok=v;document.querySelectorAll('[data-act="pg-gok"]').forEach(b=>b.classList.toggle("on",b.dataset.v===v));return true}
  case "pg-gsave":{const d=gym(p).dias.find(x=>x.id===GD);const e=d.ex.find(x=>x.id===GE.id);const s=[];
    for(let i=0;i<e.series;i++){const r=Math.round(num($("#gr"+i).value)),kg=num($("#gk"+i).value);if(r>0)s.push({r,kg})}
    if(!s.length){toast("Anotá al menos una serie");return true}
    e.hist=(e.hist||[]).filter(h=>h.k!==TODAY()).concat({k:TODAY(),s,ok:GE.ok,nota:($("#gnota").value||"").trim()}).slice(-60);save();verDia(GD);toast("Anotado ✓ · "+fmtS(s));return true}
  case "pg-gxdel":{if(!confirm("¿Quitar este ejercicio y su historial?"))return true;const d=gym(p).dias.find(x=>x.id===GD);d.ex=d.ex.filter(x=>x.id!==GE.id);save();verDia(GD);return true}
  case "pg-gfin":{const d=gym(p).dias.find(x=>x.id===GD);const hoy=d.ex.filter(e=>(e.hist||[]).some(h=>h.k===TODAY())).length;closeSheet();abrirActividad({dep:"gimnasio",nota:d.n+(hoy?" · "+hoy+(hoy===1?" ejercicio anotado":" ejercicios anotados"):"")});return true}
  }
  return false}
const _aa=window.actAct;
window.actAct=function(a,v){return progAct(a,v)||(_aa?_aa(a,v):false)};
window.VITAL_PROG={sesionRun,sesionGlu,sesionCali,sesionTai,sugerir,RUN,PLANT};
// el script principal ya dibujó la pantalla: se vuelve a dibujar con los programas
try{if(S.profiles.length&&!document.querySelector("#layer .sheet"))render()}catch(e){}
})();
