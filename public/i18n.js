/* =========================================================
   VITAL · Idioma y país
   - es-AR: rioplatense (voseo), como está escrito el código.
   - es:    español neutro con «tú» (España, Canadá y otros países).
   - en:    inglés.
   Traduce el texto ya dibujado (nodos de texto, placeholder, title)
   con un MutationObserver. Los nombres de alimentos y platos se
   cambian en los datos (comer2.js), no acá.
   ========================================================= */
"use strict";
(function(){
const KEY="vital-loc";
function detectar(){let tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
  const nl=(navigator.language||"es-AR").toLowerCase();
  let pais="OT";
  if(/^america\/(argentina|buenos_aires|cordoba|mendoza)/i.test(tz)||nl==="es-ar")pais="AR";
  else if(/^(europe\/madrid|atlantic\/canary|africa\/ceuta)$/i.test(tz)||nl==="es-es")pais="ES";
  else if(/^america\/(toronto|vancouver|montreal|edmonton|winnipeg|halifax|regina|st_johns|moncton|whitehorse|yellowknife|iqaluit|glace_bay|goose_bay|dawson_creek|fort_nelson|swift_current|rankin_inlet|cambridge_bay|inuvik|atikokan|creston)$/i.test(tz)||nl==="en-ca"||nl==="fr-ca")pais="CA";
  let lang=pais==="AR"?"es-AR":/^es/.test(nl)?"es":/^en/.test(nl)?"en":"es";
  return {lang,pais,auto:true}}
let LOC;try{LOC=JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){}
if(!LOC||!LOC.lang||!LOC.pais){LOC=detectar();try{localStorage.setItem(KEY,JSON.stringify(LOC))}catch(e){}}
LOC.norte=["ES","CA"].includes(LOC.pais);           // hemisferio norte: temporadas corridas 6 meses
LOC.nombres=LOC.lang==="en"?"en":(LOC.pais==="AR"||(LOC.pais==="OT"&&LOC.lang==="es-AR"))?"ar":"es";
window.LOC=LOC;
document.documentElement.lang=LOC.lang==="en"?"en":LOC.lang==="es"?"es":"es-AR";

const LANGS={"es-AR":"Español (Argentina, con vos)","es":"Español (con tú)","en":"English"};
const PAISES={AR:"🇦🇷 Argentina",ES:"🇪🇸 España",CA:"🇨🇦 Canadá",OT:"🌎 Otro país"};
window.setLoc=function(k,v){const n={...LOC,auto:false};delete n.norte;delete n.nombres;n[k]=v;
  if(k==="pais"&&LOC.auto!==false){/* al elegir país por primera vez, idioma acorde */}
  try{localStorage.setItem(KEY,JSON.stringify(n))}catch(e){}location.reload()};
window.locSection=function(){
  return `<section class="glass org2"><h2>🌐 Idioma y país</h2>
  <label class="f">Idioma</label><div class="opts">${Object.entries(LANGS).map(([k,n])=>`<button class="opt ${LOC.lang===k?"on":""}" data-loc="lang" data-v="${k}">${n}</button>`).join("")}</div>
  <label class="f">¿Dónde vivís?</label><div class="opts">${Object.entries(PAISES).map(([k,n])=>`<button class="opt ${LOC.pais===k?"on":""}" data-loc="pais" data-v="${k}">${n}</button>`).join("")}</div>
  <p class="xs faint" style="margin-top:8px">El país cambia los nombres de los alimentos, los productos que se consiguen y las temporadas de frutas y verduras (en España y Canadá el verano es en julio).</p></section>`};
window.locChips=function(){return `<div class="row wrap" style="gap:6px;margin:-4px 0 12px">${Object.entries({"es-AR":"Español AR","es":"Español","en":"English"}).map(([k,n])=>`<button class="chip" data-loc="lang" data-v="${k}" style="${LOC.lang===k?"border-color:var(--mint);background:rgba(94,234,212,.2)":""}">${n}</button>`).join("")}</div>`};
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-loc]");if(!b)return;e.preventDefault();e.stopPropagation();setLoc(b.dataset.loc,b.dataset.v)},true);

/* ---------- Motor de traducción ---------- */
const TR={pairs:[],rx:null,map:null};
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function preparar(dic){const ks=Object.keys(dic).filter(k=>k&&dic[k]!=null&&dic[k]!==k).sort((a,b)=>b.length-a.length);
  if(!ks.length)return;TR.map=new Map(ks.map(k=>[k,dic[k]]));
  TR.rx=new RegExp("(?<![\\p{L}\\p{N}])(?:"+ks.map(esc).join("|")+")(?![\\p{L}\\p{N}])","gu")}
function tr(s){if(!TR.rx||!s||!/\p{L}/u.test(s))return s;return s.replace(TR.rx,m=>{const t=TR.map.get(m);return t==null?m:t})}
window.T=tr;
const SKIP=new Set(["SCRIPT","STYLE","TEXTAREA","CODE","PRE","NOSCRIPT"]);
function walk(root){if(!TR.rx)return;
  if(root.nodeType===3){const p=root.parentNode;if(p&&!SKIP.has(p.nodeName)&&!(p.closest&&p.closest("[data-notr]"))){const v=root.nodeValue,n=tr(v);if(n!==v)root.nodeValue=n}return}
  if(root.nodeType!==1||SKIP.has(root.nodeName)||root.hasAttribute&&root.hasAttribute("data-notr"))return;
  for(const at of ["placeholder","title","aria-label"]){if(root.hasAttribute(at)){const v=root.getAttribute(at),n=tr(v);if(n!==v)root.setAttribute(at,n)}}
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT,{acceptNode:n=>n.nodeType===1?(SKIP.has(n.nodeName)||n.hasAttribute("data-notr")?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_SKIP):NodeFilter.FILTER_ACCEPT});
  let n;const cambios=[];while((n=tw.nextNode()))cambios.push(n);
  cambios.forEach(t=>{const v=t.nodeValue,x=tr(v);if(x!==v)t.nodeValue=x});
  root.querySelectorAll&&root.querySelectorAll("[placeholder],[title],[aria-label]").forEach(el=>{if(el.closest("[data-notr]"))return;for(const at of ["placeholder","title","aria-label"]){if(el.hasAttribute(at)){const v=el.getAttribute(at),x=tr(v);if(x!==v)el.setAttribute(at,x)}}})}
let obs=null;
function arrancar(){if(!TR.rx||obs)return;walk(document.body);document.title=tr(document.title);
  obs=new MutationObserver(ms=>{for(const m of ms){if(m.type==="characterData")walk(m.target);else m.addedNodes.forEach(walk)}});
  obs.observe(document.body,{childList:true,subtree:true,characterData:true})}
window.I18N={tr,preparar,arrancar,LOC};
document.addEventListener("DOMContentLoaded",()=>{const d=LOC.lang==="en"?window.I18N_EN:LOC.lang==="es"?window.I18N_TU:null;if(d){preparar(d);arrancar()}});
})();
