/* =========================================================
   VITAL · Licencias
   - Cada cuenta nueva arranca con 14 días de prueba.
   - Planes por familia: mensual o anual (Mercado Pago).
   - Un plan pago (o de cortesía) cubre a la familia del que paga
     (hasta 6 miembros; la cortesía no tiene tope).
   - El bloqueo real lo hacen las reglas de Firestore: sin licencia
     vigente no se puede leer ni guardar nada en la nube.
   - Panel de administrador para Daniel (colección admins/{uid}).
   Se carga después del script principal y envuelve cloudLoad y render.
   ========================================================= */
"use strict";
(function(){
const PRECIOS={mensual:10000,anual:100000};
const PRUEBA_DIAS=14;
const WAPP="5492613431216";
const URL_COBROS=window.VITAL_COBROS_URL||"";   // URL del Apps Script (config.js)
const LIC={doc:null,bloq:false,admin:false,familia:false,cargado:false};window.LIC=LIC;
const fmt$=n=>"$"+Math.round(n).toLocaleString("es-AR");
const ms=t=>t&&t.toMillis?t.toMillis():(t&&t.seconds?t.seconds*1000:(+t||0));
function vigente(d){return !!d&&(d.plan==="cortesia"||ms(d.vence)>Date.now())}
// ¿Este plan cubre a una familia? (igual que las reglas: pago o cortesía; la prueba no cubre a otros)
function cubreFam(d,n){return !!d&&(d.plan==="cortesia"||((d.plan==="mensual"||d.plan==="anual")&&vigente(d)&&n<=6))}
const propioPago=d=>!!d&&(d.plan==="cortesia"||((d.plan==="mensual"||d.plan==="anual")&&vigente(d)));
function diasRestan(d){return Math.max(0,Math.ceil((ms(d.vence)-Date.now())/864e5))}
const PLAN_TXT={prueba:"Prueba gratis",mensual:"Plan mensual",anual:"Plan anual",cortesia:"Cortesía"};

async function asegurar(u){const db=CLOUD.db;const ref=db.collection("licencias").doc(u.uid);
  let s;try{s=await ref.get()}catch(e){s=null}
  if(s&&!s.exists){try{await ref.set({plan:"prueba",vence:firebase.firestore.Timestamp.fromMillis(Date.now()+PRUEBA_DIAS*864e5),email:u.email||"",nombre:u.displayName||"",creado:firebase.firestore.FieldValue.serverTimestamp()});s=await ref.get()}catch(e){console.warn("lic",e)}}
  LIC.doc=s&&s.exists?s.data():null;LIC.cargado=true;
  try{LIC.admin=(await db.collection("admins").doc(u.uid).get()).exists}catch(e){LIC.admin=false}}
async function marcarFamilia(fid){if(!CLOUD.user||!fid)return;try{await CLOUD.db.collection("licencias").doc(CLOUD.user.uid).update({familia:fid});if(LIC.doc)LIC.doc.familia=fid}catch(e){console.warn("lic fam",e)}}
window.licMarcarFamilia=marcarFamilia;
/* Mira quién cubre a la familia. Si yo pago (o tengo cortesía) y no es mi grupo, me anoto como pagador. */
async function revisarFamilia(){LIC.cubre=null;const fid=CLOUD.fid,u=CLOUD.user;if(!fid||!u)return;const db=CLOUD.db;
  let f;try{f=await db.collection("families").doc(fid).get({source:"server"})}catch(e){try{f=await db.collection("families").doc(fid).get()}catch(e2){return}}
  if(!f||!f.exists)return;const F=f.data(),n=(F.members||[]).length;
  if(LIC.doc&&LIC.doc.familia!==fid)await marcarFamilia(fid);
  if(propioPago(LIC.doc)){
    if(F.owner!==u.uid&&F.pagador!==u.uid){let otro=false;for(const k of [F.owner,F.pagador]){if(!k||k===u.uid)continue;try{const x=await db.collection("licencias").doc(k).get();if(x.exists&&cubreFam(x.data(),n))otro=true}catch(e){}}
      if(!otro){try{await db.collection("families").doc(fid).update({pagador:u.uid})}catch(e){console.warn("pagador",e)}}}
    return}
  for(const k of [F.pagador,F.owner]){if(!k||k===u.uid)continue;try{const x=await db.collection("licencias").doc(k).get();if(x.exists&&cubreFam(x.data(),n)){LIC.cubre={plan:x.data().plan,nombre:x.data().nombre||""};return}}catch(e){}}}

/* ---------- Envolver la carga de la nube ---------- */
const _cl=cloudLoad;
cloudLoad=async function(u){await asegurar(u);
  try{await _cl(u);LIC.bloq=false}
  catch(e){if(/permission|insufficient/i.test(String((e&&(e.code||e.message))||e))){LIC.bloq=true;S=blank();return}throw e}
  const fid=S.profiles[0]&&S.profiles[0].familyId;if(fid&&LIC.doc&&LIC.doc.familia!==fid)await marcarFamilia(fid);
  await revisarFamilia();LIC.familia=!!LIC.cubre&&!propioPago(LIC.doc)};   // lo cubre el plan de su familia
const _fc=famCreate,_fj=famJoin;
async function trasFamilia(){if(!CLOUD.fid)return;await marcarFamilia(CLOUD.fid);await revisarFamilia();LIC.familia=!!LIC.cubre&&!propioPago(LIC.doc);
  if(LIC.familia)toast("Te cubre el plan de tu familia ✓");render()}
famCreate=async function(){await _fc();await trasFamilia()};
famJoin=async function(){await _fj();await trasFamilia()};

/* ---------- Pantalla de planes ---------- */
function vPlanes(bloq){const d=LIC.doc||{};const em=(CLOUD.user&&CLOUD.user.email)||"";
  const card=(k,t,sub,extra,dest)=>`<div class="glass" style="padding:18px;border-radius:24px;margin-top:12px;${dest?"border:1px solid rgba(94,234,212,.55);box-shadow:0 0 0 4px rgba(94,234,212,.08)":""}">
    <div class="row between"><b style="font-size:17px">${t}</b>${dest?`<span class="pill" style="background:var(--mint);color:#062026">2 meses gratis</span>`:""}</div>
    <div style="font-size:30px;font-weight:800;margin-top:6px">${fmt$(PRECIOS[k])}<span class="sm mute" style="font-weight:500"> ${sub}</span></div>${extra}
    <button class="btn block" style="margin-top:12px" data-lic="pagar" data-v="${k}">Elegir ${t.toLowerCase()}</button></div>`;
  return `<section class="glass org1" style="text-align:center"><div class="brand" style="justify-content:center"><div class="logo" style="width:52px;height:52px"></div></div>
    <h1 style="margin-top:10px">${bloq?(d.plan==="prueba"?"Terminó tu prueba gratis":"Tu plan venció"):"Planes de Vital"}</h1>
    <p class="mute sm" style="margin-top:6px">Un solo pago cubre a toda tu familia (hasta 6 personas). Tus datos quedan guardados: al activar el plan, todo sigue donde lo dejaste.</p></section>
  ${card("anual","Plan anual","por año",`<p class="xs mute" style="margin-top:4px">Equivale a ${fmt$(PRECIOS.anual/12)} por mes · un solo pago</p>`,true)}
  ${card("mensual","Plan mensual","por mes",`<p class="xs mute" style="margin-top:4px">Débito automático por Mercado Pago · cancelás cuando quieras</p>
    <label class="f" style="text-align:left">Mail de tu cuenta de Mercado Pago</label><input class="in" id="lic-mpmail" type="email" value="${esc(em)}" autocomplete="email">`,false)}
  <section class="glass org2"><h2>¿Ya pagaste?</h2><p class="sm mute">Si ya completaste el pago en Mercado Pago, tocá acá y Vital lo verifica.</p><button class="btn ghost block" style="margin-top:10px" data-lic="verificar">✓ Ya pagué: verificar</button></section>
  <section class="glass org3"><h2>👨‍👩‍👧 ¿Alguien de tu familia ya paga?</h2><p class="sm mute">Pedile el código del grupo familiar y sumate: su plan te cubre.</p>
    <div class="row" style="gap:8px;margin-top:10px"><input class="in" id="lic-code" placeholder="Ej.: K7Q2MX" maxlength="8" style="flex:1;text-transform:uppercase;letter-spacing:3px;font-weight:800"><button class="btn" data-lic="unirme">Unirme</button></div></section>
  <p class="xs faint" style="text-align:center;margin:14px 0">¿Dudas? <a href="https://wa.me/${WAPP}?text=${encodeURIComponent("Hola, tengo una consulta sobre mi plan de Vital ("+em+")")}" style="color:inherit">Escribinos por WhatsApp</a>${bloq?` · <button class="link" data-act="logout" style="font-size:inherit">Cerrar sesión</button>`:""}</p>`}
window.vPlanes=vPlanes;

const _render=render;
render=function(){if(CLOUD.on&&CLOUD.user&&LIC.bloq){document.body.classList.toggle("lite",!!S.settings.lite);$("#tab").style.display="none";$("#who").style.visibility="hidden";$("#view").innerHTML=vPlanes(true);return}
  _render();if(current==="perfil"&&CLOUD.user&&LIC.cargado)inyectarPerfil()};
function inyectarPerfil(){const v=$("#view");if(!v||v.querySelector(".lic-plan"))return;const d=LIC.doc||{};
  const estado=LIC.familia?`Cubierto por el plan de tu familia${LIC.cubre?" ("+(LIC.cubre.plan==="cortesia"?"cortesía":PLAN_TXT[LIC.cubre.plan].toLowerCase())+(LIC.cubre.nombre?" de "+esc(LIC.cubre.nombre.split(" ")[0]):"")+")":""}`:d.plan==="cortesia"?"Cortesía · sin vencimiento":vigente(d)?`${PLAN_TXT[d.plan]||"Plan"} · ${d.plan==="prueba"?"quedan "+diasRestan(d)+" días":"vence el "+new Date(ms(d.vence)).toLocaleDateString("es-AR")}`:"Vencido";
  const s=document.createElement("section");s.className="glass org3 lic-plan";
  s.innerHTML=`<h2>⭐ Tu plan</h2><div class="row between"><span class="sm">${estado}</span>${d.plan==="cortesia"||LIC.familia?"":`<button class="btn small" data-lic="planes">${d.plan==="prueba"?"Ver planes":"Renovar"}</button>`}</div>
    ${LIC.admin?`<button class="btn ghost block" style="margin-top:12px" data-lic="admin">🛠 Panel de administrador</button>`:""}`;
  const first=v.querySelector("section");if(first)first.after(s);else v.prepend(s)}

/* ---------- Cobro (Apps Script + Mercado Pago) ---------- */
async function llamar(params){if(!URL_COBROS)throw new Error("sin-url");const q=new URLSearchParams(params).toString();const r=await fetch(URL_COBROS+"?"+q,{redirect:"follow"});return r.json()}
async function pagar(plan){const u=CLOUD.user;if(!u)return;
  if(!URL_COBROS){location.href=`https://wa.me/${WAPP}?text=${encodeURIComponent("Hola, quiero el plan "+plan+" de Vital. Mi mail: "+(u.email||""))}`;return}
  const mp=(($("#lic-mpmail")||{}).value||u.email||"").trim();if(plan==="mensual"&&!/^\S+@\S+\.\S+$/.test(mp)){toast("Revisá el mail de Mercado Pago");return}
  toast("Abriendo Mercado Pago…");
  try{const j=await llamar({accion:"pagar",plan,uid:u.uid,email:u.email||"",mpmail:mp,nombre:u.displayName||""});
    if(!j.ok||!j.url){toast("No se pudo iniciar el pago: "+(j.error||"probá de nuevo"));return}
    try{localStorage.setItem("vital-pago",JSON.stringify({plan,t:Date.now()}))}catch(e){}
    if(NATIVE)window.open(j.url,"_system");else location.href=j.url}catch(e){toast("Sin conexión: no se pudo iniciar el pago")}}
async function verificar(silencio){const u=CLOUD.user;if(!u)return;
  if(URL_COBROS){try{const j=await llamar({accion:"verificar",uid:u.uid});if(!silencio&&j&&j.mensaje)toast(j.mensaje)}catch(e){if(!silencio)toast("Sin conexión")}}
  await asegurar(u);if(vigente(LIC.doc)||LIC.bloq){CLOUD.ready=false;try{await cloudLoad(u)}catch(e){}CLOUD.ready=true;
    if(!LIC.bloq){try{localStorage.removeItem("vital-pago")}catch(e){}if(!silencio)toast("¡Plan activo! Gracias 💚");if(CLOUD.fid)famListen()}
    else if(!silencio)toast("Todavía no figura el pago. Si recién pagaste, esperá un minuto y probá de nuevo")}
  closeSheet();render()}
async function unirme(){const code=(($("#lic-code")||{}).value||"").trim().toUpperCase();if(code.length<6){toast("Revisá el código");return}
  const db=CLOUD.db,id=CLOUD.user.uid;
  try{const c=await db.collection("codes").doc(code).get();if(!c.exists){toast("Código no encontrado");return}const fid=c.data().fid;
    await db.collection("families").doc(fid).update({members:firebase.firestore.FieldValue.arrayUnion(id)});CLOUD.fid=fid;await marcarFamilia(fid);
    LIC.bloq=false;CLOUD.ready=false;await cloudLoad(CLOUD.user);CLOUD.ready=true;
    if(LIC.bloq){toast("Te sumaste, pero el plan de esa familia no está activo o ya tiene 6 personas")}
    else{const p=S.profiles[0];if(p){Object.assign(p,{familyId:fid,familyCode:code});CLOUD.fid=fid;famListen();save()}toast("¡Listo! Te cubre el plan de tu familia")}
    render()}catch(e){toast("No se pudo unir: revisá el código o la conexión")}}
// Al volver de Mercado Pago, verificar solo
document.addEventListener("visibilitychange",()=>{if(document.visibilityState!=="visible"||!CLOUD.user)return;let pend=null;try{pend=JSON.parse(localStorage.getItem("vital-pago")||"null")}catch(e){}
  if(pend&&Date.now()-pend.t<36e5)verificar(true)});

/* ---------- Panel de administrador ---------- */
let ADM={lista:[],q:""};
async function abrirAdmin(){if(!LIC.admin)return;sheet(`<h2>🛠 Licencias</h2><p class="xs mute">Cargando…</p>`);
  try{const s=await CLOUD.db.collection("licencias").get();ADM.lista=s.docs.map(x=>({id:x.id,...x.data()})).sort((a,b)=>(a.plan==="cortesia")-(b.plan==="cortesia")||ms(a.vence)-ms(b.vence));
    // Familias: quién cubre a cada integrante
    const fids=[...new Set(ADM.lista.map(x=>x.familia).filter(Boolean))];const fam={};
    await Promise.all(fids.map(async f=>{try{const d=await CLOUD.db.collection("families").doc(f).get();if(d.exists)fam[f]=d.data()}catch(e){}}));
    const porId=Object.fromEntries(ADM.lista.map(x=>[x.id,x]));
    ADM.lista.forEach(x=>{x.cubre=null;const F=fam[x.familia];x.grupo=F?F.name:"";if(!F||!(F.members||[]).includes(x.id))return;
      for(const k of [F.pagador,F.owner]){const o=k&&k!==x.id&&porId[k];if(o&&cubreFam(o,(F.members||[]).length)){x.cubre=o;break}}});
    dibAdmin()}catch(e){sheet(`<h2>🛠 Licencias</h2><p class="note">No se pudo leer: ${esc(e.code||e.message||"")}</p>`)}}
function dibAdmin(){const q=ADM.q.toLowerCase();const L=ADM.lista.filter(x=>!q||(x.email||"").toLowerCase().includes(q)||(x.nombre||"").toLowerCase().includes(q));
  const porFam=x=>!!x.cubre&&!propioPago(x);
  const cuenta=k=>ADM.lista.filter(x=>k==="familia"?porFam(x):x.plan===k&&!porFam(x)&&(k!=="prueba"||vigente(x))).length;
  sheet(`<h2>🛠 Licencias</h2>
  <div class="grid3" style="text-align:center"><div class="stat"><span class="xs mute">Pagas activas</span><b>${ADM.lista.filter(x=>vigente(x)&&(x.plan==="mensual"||x.plan==="anual")).length}</b></div><div class="stat"><span class="xs mute">En prueba</span><b>${cuenta("prueba")}</b></div><div class="stat"><span class="xs mute">Cortesía</span><b>${cuenta("cortesia")}</b></div></div>
  <p class="xs mute" style="text-align:center;margin-top:6px">Cubiertos por su familia: <b>${cuenta("familia")}</b></p>
  <input class="in" id="adm-q" placeholder="Buscar por mail o nombre" value="${esc(ADM.q)}" autocomplete="off" style="margin-top:12px">
  ${L.map(x=>`<div class="glass" style="padding:12px 14px;margin-top:8px;border-radius:18px"><div class="row between"><div><b class="sm">${esc(x.nombre||"(sin nombre)")}</b><br><span class="xs mute">${esc(x.email||x.id)}</span></div>
    <span class="pill" style="${vigente(x)||porFam(x)?"background:rgba(94,234,212,.2)":"background:rgba(248,113,113,.2)"}">${porFam(x)?"👨‍👩‍👧 Familia":(PLAN_TXT[x.plan]||x.plan)}</span></div>
    <p class="xs mute" style="margin-top:6px">${porFam(x)?`Lo cubre ${esc(x.cubre.nombre||x.cubre.email||"el titular")} (${PLAN_TXT[x.cubre.plan]||x.cubre.plan})${x.grupo?" · grupo "+esc(x.grupo):""}${x.plan==="prueba"&&vigente(x)?" · su prueba propia sigue corriendo":""}`
      :(x.plan==="cortesia"?"Sin vencimiento":(vigente(x)?"Vence ":"Venció ")+new Date(ms(x.vence)).toLocaleDateString("es-AR"))+(x.familia?" · grupo "+esc(x.grupo||"(sin datos)")+(x.cubre?"":" · el grupo no tiene plan que lo cubra"):" · sin grupo")}</p>
    <div class="row wrap" style="gap:6px;margin-top:8px"><button class="chip" data-lic="adm" data-v="cortesia|${x.id}">🎁 Cortesía</button><button class="chip" data-lic="adm" data-v="mes|${x.id}">+1 mes</button><button class="chip" data-lic="adm" data-v="anio|${x.id}">+1 año</button><button class="chip" data-lic="adm" data-v="cortar|${x.id}">⛔ Cortar</button></div></div>`).join("")||`<p class="sm mute" style="margin-top:10px">Sin resultados.</p>`}`);
  const i=$("#adm-q");if(i){i.addEventListener("input",()=>{ADM.q=i.value;const pos=i.selectionStart;dibAdmin();const j=$("#adm-q");j.focus();j.setSelectionRange(pos,pos)})}}
async function admAccion(v){const [acc,id]=v.split("|");const x=ADM.lista.find(y=>y.id===id);if(!x)return;const TS=firebase.firestore.Timestamp;let upd;
  const base=Math.max(Date.now(),ms(x.vence));
  if(acc==="cortesia")upd={plan:"cortesia",vence:TS.fromMillis(Date.now()+3650*864e5)};
  else if(acc==="mes")upd={plan:x.plan==="anual"?"anual":"mensual",vence:TS.fromMillis(base+31*864e5)};
  else if(acc==="anio")upd={plan:"anual",vence:TS.fromMillis(base+365*864e5)};
  else if(acc==="cortar"){if(!confirm("¿Cortar el acceso de "+(x.email||x.nombre)+"?"))return;upd={plan:x.plan==="cortesia"?"mensual":x.plan,vence:TS.fromMillis(Date.now()-1000)}}
  upd.manual=firebase.firestore.FieldValue.serverTimestamp();
  try{await CLOUD.db.collection("licencias").doc(id).update(upd);Object.assign(x,upd);toast("Guardado ✓");dibAdmin()}catch(e){toast("No se pudo: "+(e.code||e.message))}}

document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-lic]");if(!b)return;e.preventDefault();e.stopPropagation();const a=b.dataset.lic,v=b.dataset.v;
  if(a==="pagar")pagar(v);else if(a==="verificar")verificar(false);else if(a==="unirme")unirme();else if(a==="admin")abrirAdmin();else if(a==="adm")admAccion(v);
  else if(a==="planes")sheet(vPlanes(false))},true);
})();
