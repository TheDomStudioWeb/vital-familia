/* =========================================================
   Vital · Muñeco 3D animado (maniquí con cinemática directa)
   Requiere three.js r128 (global THREE).
   Convenciones (grados): cadera/hombro rx<0 = hacia adelante;
   rodilla rx>0 = flexión; codo rx<0 = flexión; tronco rx>0 = inclina adelante;
   rz>0 en lado izquierdo = abrir hacia afuera (en el derecho, rz<0).
   root rx=+90 boca abajo, -90 boca arriba.
   ========================================================= */
(function(){
const D2R=Math.PI/180;
const SEG={pelvisY:.95,spine:.08,chest:.2,neck:.22,head:.11,shX:.19,shY:.18,upper:.29,fore:.26,hand:.09,hipX:.095,hipY:-.02,thigh:.44,shin:.43,foot:.15,heel:.045};
const JOINTS=["root","spine","chest","neck","sL","sR","eL","eR","wL","wR","hL","hR","kL","kR","aL","aR"];

/* ---------- Poses ---------- */
function P(o){const p={};JOINTS.forEach(j=>p[j]=[0,0,0]);
  for(const k in o){if(k.endsWith("_")){const b=k.slice(0,-1);p[b+"L"]=o[k].slice();p[b+"R"]=[o[k][0],-(o[k][1]||0),-(o[k][2]||0)]}else if(JOINTS.includes(k))p[k]=o[k].slice();else p[k]=o[k]}
  for(const j of JOINTS)while(p[j].length<3)p[j].push(0);
  if(p.flat===undefined)p.flat=true;return p}
const STAND={s_:[-6,0,4],e_:[-8]};
const st=(o)=>P(Object.assign({},STAND,o));

const ANIM={
 "sentadilla":{view:"side3q",dur:3.2,k:[st({}),P({spine:[20],chest:[15],h_:[-88,0,6],k_:[108],s_:[-122,0,6],e_:[-6]}),st({})]},
 "sentadilla-goblet":{view:"side3q",dur:3.2,k:[P({s_:[-25,0,-12],e_:[-140]}),P({spine:[15],chest:[10],h_:[-92,0,10],k_:[112],s_:[-40,0,-12],e_:[-135]}),P({s_:[-25,0,-12],e_:[-140]})]},
 "sentarse-silla":{view:"side3q",dur:4,chair:true,k:[
   P({spine:[8],h_:[-90],k_:[90],s_:[-30,-65,-4],e_:[-112]}),
   P({spine:[38],chest:[8],h_:[-100],k_:[96],s_:[-30,-65,-4],e_:[-112]}),
   P({s_:[-30,-65,-4],e_:[-112]}),
   P({spine:[38],chest:[8],h_:[-100],k_:[96],s_:[-30,-65,-4],e_:[-112]}),
   P({spine:[8],h_:[-90],k_:[90],s_:[-30,-65,-4],e_:[-112]})]},
 "sentadilla-pared":{view:"side3q",dur:4,wall:true,k:[P({h_:[-85],k_:[85],s_:[-4,0,8]}),P({chest:[2],h_:[-85],k_:[85],s_:[-4,0,8]}),P({h_:[-85],k_:[85],s_:[-4,0,8]})]},
 "flexion":{view:"side3q",dur:2.6,k:[
   P({root:[90],s_:[-88,0,8],flat:false,a_:[-8],level:["handL","toeL"]}),
   P({root:[90],s_:[-28,0,30],e_:[-60],flat:false,a_:[-8],level:["handL","toeL"]}),
   P({root:[90],s_:[-88,0,8],flat:false,a_:[-8],level:["handL","toeL"]})]},
 "flexion-rodillas":{view:"side3q",dur:2.6,k:[
   P({root:[90],s_:[-88,0,8],k_:[95],flat:false,a_:[30],level:["handL","kneeL"]}),
   P({root:[90],s_:[-30,0,30],e_:[-58],k_:[95],flat:false,a_:[30],level:["handL","kneeL"]}),
   P({root:[90],s_:[-88,0,8],k_:[95],flat:false,a_:[30],level:["handL","kneeL"]})]},
 "plancha":{view:"side3q",dur:3,k:[
   P({root:[90],s_:[-92,0,4],e_:[-88],flat:false,a_:[-8],level:["elbowL","toeL"]}),
   P({root:[90],chest:[-2],s_:[-92,0,4],e_:[-88],flat:false,a_:[-8],level:["elbowL","toeL"]}),
   P({root:[90],s_:[-92,0,4],e_:[-88],flat:false,a_:[-8],level:["elbowL","toeL"]})]},
 "plancha-rodillas":{view:"side3q",dur:3,k:[
   P({root:[90],s_:[-92,0,4],e_:[-88],k_:[90],flat:false,a_:[30],level:["elbowL","kneeL"]}),
   P({root:[90],chest:[-2],s_:[-92,0,4],e_:[-88],k_:[90],flat:false,a_:[30],level:["elbowL","kneeL"]}),
   P({root:[90],s_:[-92,0,4],e_:[-88],k_:[90],flat:false,a_:[30],level:["elbowL","kneeL"]})]},
 "puente":{view:"side3q",dur:3,k:[
   P({root:[-90],h_:[-62],k_:[112],s_:[-4,0,14],level:["shoulderL","heelL"]}),
   P({root:[-90],h_:[-8],k_:[92],s_:[-4,0,14],level:["shoulderL","heelL"]}),
   P({root:[-90],h_:[-62],k_:[112],s_:[-4,0,14],level:["shoulderL","heelL"]})]},
 "zancada-atras":{view:"side3q",dur:3.4,k:[
   st({}),
   P({hL:[-82,0,4],kL:[86],hR:[12,0,-4],kR:[82],aR:[-44],flatR:false,s_:[-10,0,10],e_:[-20]}),
   st({})]},
 "jumping":{view:"front",dur:1.2,k:[
   P({s_:[-4,0,8]}),
   P({s_:[0,0,165],h_:[0,0,16],lift:.1}),
   P({s_:[-4,0,8]})]},
 "paso-lateral":{view:"front",dur:2.4,k:[
   P({s_:[-4,0,8]}),P({s_:[0,0,150],hL:[0,0,22],lift:0}),P({s_:[-4,0,8]}),P({s_:[0,0,150],hR:[0,0,-22]}),P({s_:[-4,0,8]})]},
 "circulos-brazos":{view:"front3q",dur:1.6,k:[
   P({s_:[0,0,88]}),P({s_:[-22,0,82]}),P({s_:[0,0,76]}),P({s_:[22,0,82]}),P({s_:[0,0,88]})]},
 "bird-dog":{view:"side3q",dur:4,k:[
   P({root:[90],h_:[-90],k_:[90],s_:[-90],flat:false,a_:[30],level:["handL","kneeL"]}),
   P({root:[90],hL:[-90],kL:[90],sR:[-90],sL:[-178],hR:[-2],kR:[0],aR:[20],flat:false,aL:[30],level:["handR","kneeL"]}),
   P({root:[90],h_:[-90],k_:[90],s_:[-90],flat:false,a_:[30],level:["handL","kneeL"]})]},
 "talones":{view:"side3q",dur:2.6,k:[st({}),st({a_:[34],flat:false}),st({})]},
 "marcha":{view:"side3q",dur:1.6,k:[
   st({hL:[-62],kL:[78],sR:[-35],sL:[20],eR:[-30]}),st({}),st({hR:[-62],kR:[78],sL:[-35],sR:[20],eL:[-30]}),st({}),st({hL:[-62],kL:[78],sR:[-35],sL:[20],eR:[-30]})]},
 "nadador":{view:"side3q",dur:3,k:[
   P({root:[90],s_:[-170,0,30],flat:false,a_:[60],level:["toeL","chestF"]}),
   P({root:[90],neck:[-10],chest:[-12],s_:[-178,0,35],flat:false,a_:[60],level:["toeL","chestF"]}),
   P({root:[90],s_:[-170,0,30],flat:false,a_:[60],level:["toeL","chestF"]})]},
 "una-pierna":{view:"side3q",dur:3,k:[st({}),st({hR:[-55],kR:[70],s_:[-6,0,22]}),st({hR:[-55],kR:[70],s_:[-6,0,22],chest:[2]}),st({})]},

};
ANIM["sentadilla-salto"]={view:"side3q",dur:1.8,k:[ANIM.sentadilla.k[1],P({s_:[-20,0,10],lift:.22}),ANIM.sentadilla.k[1]]};
ANIM["zancada-asistida"]={...ANIM["zancada-atras"],chair:"side"};
ANIM["rodillas-arriba"]={...ANIM.marcha,dur:.9};
ANIM["caminata"]=ANIM.marcha;
ANIM["dead-bug"]={view:"side3q",dur:3.4,k:[
  P({root:[-90],h_:[-90],k_:[90],s_:[-90],flat:false,level:["shoulderL","pelvis"]}),
  P({root:[-90],hL:[-90],kL:[90],hR:[-15],kR:[5],sR:[-90],sL:[-175],flat:false,level:["shoulderL","pelvis"]}),
  P({root:[-90],h_:[-90],k_:[90],s_:[-90],flat:false,level:["shoulderL","pelvis"]})]};

/* ---------- Tai Chi, elongación y running (nov 2026) ---------- */
{const B={h_:[-16,0,8],k_:[26]};const TC={
 "tc-apertura":{view:"front3q",dur:8,k:[{s_:[-6,0,6]},{s_:[-80,0,6],e_:[-8]},{...B,s_:[-30,0,8],e_:[-50]},{s_:[-6,0,6]}]},
 "tc-respiracion":{view:"front",dur:9,k:[{s_:[-6,0,6]},{s_:[0,0,160],e_:[-10]},{...B,s_:[-20,0,10],e_:[-30]},{s_:[-6,0,6]}]},
 "tc-empujar":{view:"side3q",dur:6,k:[{...B,s_:[-55,0,10],e_:[-110]},{h_:[-22,0,8],k_:[34],spine:[8],s_:[-85,0,8],e_:[-12]},{...B,s_:[-55,0,10],e_:[-110]}]},
 "tc-nubes":{view:"front3q",dur:8,k:[
   {...B,spine:[0,28,0],sL:[-70,0,20],eL:[-80],sR:[-15,0,-10],eR:[-40]},
   {...B,spine:[0,-28,0],sR:[-70,0,-20],eR:[-80],sL:[-15,0,10],eL:[-40]},
   {...B,spine:[0,28,0],sL:[-70,0,20],eL:[-80],sR:[-15,0,-10],eR:[-40]}]},
 "tc-grulla":{view:"front3q",dur:7,k:[
   {...B,s_:[-30,0,10],e_:[-60]},
   {hL:[-10],kL:[12],hR:[-12],kR:[18],sR:[-160,0,-20],eR:[-20],sL:[-10,0,25],eL:[-30]},
   {...B,s_:[-30,0,10],e_:[-60]},
   {hR:[-10],kR:[12],hL:[-12],kL:[18],sL:[-160,0,20],eL:[-20],sR:[-10,0,-25],eR:[-30]},
   {...B,s_:[-30,0,10],e_:[-60]}]},
 "tc-crin":{view:"front3q",dur:8,k:[
   {...B,sL:[-60,0,10],eL:[-90],sR:[-20,0,-10],eR:[-60]},
   {spine:[0,25,0],hL:[-35,0,8],kL:[42],hR:[8,0,-8],kR:[10],sL:[-55,0,45],eL:[-25],sR:[5,0,-15],eR:[-15]},
   {...B,sR:[-60,0,-10],eR:[-90],sL:[-20,0,10],eL:[-60]},
   {spine:[0,-25,0],hR:[-35,0,-8],kR:[42],hL:[8,0,8],kL:[10],sR:[-55,0,-45],eR:[-25],sL:[5,0,15],eL:[-15]},
   {...B,sL:[-60,0,10],eL:[-90],sR:[-20,0,-10],eR:[-60]}]}};
 const LEG=/^(h|k|a)(_|L|R)$/;
 for(const [id,a] of Object.entries(TC)){
   ANIM[id]={view:a.view,dur:a.dur,k:a.k.map(o=>P(o))};
   // versión en silla: mismo movimiento de brazos y tronco, sentado
   const sen=a.k.map(o=>{const q={};for(const k in o)if(!LEG.test(k))q[k]=o[k];q.h_=[-90];q.k_=[90];q.spine=[(o.spine||[0])[0]+4,(o.spine||[0,0])[1]||0,0];return P(q)});
   ANIM[id+"-silla"]={view:a.view==="front"?"front3q":a.view,dur:a.dur,chair:true,k:sen}}
}
ANIM["estir-tfl-pie"]={view:"front",dur:7,k:[P({s_:[-6,0,6]}),P({hR:[4,0,16],hL:[0,0,-4],spine:[0,0,-12],sR:[0,0,-165],eR:[-10],sL:[-6,0,10]}),P({hR:[4,0,16],hL:[0,0,-4],spine:[0,0,-15],sR:[0,0,-172],eR:[-10],sL:[-6,0,10]}),P({s_:[-6,0,6]})]};
ANIM["piriforme"]={view:"side3q",dur:7,k:[
  P({root:[-90],h_:[-60],k_:[100],s_:[-4,0,14],level:["shoulderL","heelR"]}),
  P({root:[-90],hL:[-105,0,-22],kL:[115],hR:[-8],kR:[4],s_:[-4,0,14],level:["shoulderL","heelR"]}),
  P({root:[-90],hL:[-110,0,-25],kL:[118],hR:[-8],kR:[4],s_:[-4,0,14],level:["shoulderL","heelR"]}),
  P({root:[-90],h_:[-60],k_:[100],s_:[-4,0,14],level:["shoulderL","heelR"]})]};
ANIM["trote"]={view:"side3q",dur:.8,k:[
  P({spine:[6],hL:[-50],kL:[85],hR:[12],kR:[30],sR:[-40,0,6],sL:[30,0,6],e_:[-90]}),
  P({spine:[6],hR:[-50],kR:[85],hL:[12],kL:[30],sL:[-40,0,6],sR:[30,0,6],e_:[-90],lift:.04}),
  P({spine:[6],hL:[-50],kL:[85],hR:[12],kR:[30],sR:[-40,0,6],sL:[30,0,6],e_:[-90]})]};
ANIM["ritmo-fuerte"]={...ANIM.trote,dur:.6};
ANIM["talones-cola"]={view:"side3q",dur:1,k:[st({kL:[120],hL:[6],e_:[-90]}),st({e_:[-90]}),st({kR:[120],hR:[6],e_:[-90]}),st({e_:[-90]}),st({kL:[120],hL:[6],e_:[-90]})]};

/* ---------- Construcción del maniquí ---------- */
function build(THREE){
  const mat=new THREE.MeshPhysicalMaterial({color:0xa9eee2,roughness:.34,metalness:.05,clearcoat:1,clearcoatRoughness:.2,sheen:new THREE.Color(0x6d5bd0)});
  const jmat=new THREE.MeshPhysicalMaterial({color:0x5eead4,roughness:.25,clearcoat:1,emissive:0x0d9488,emissiveIntensity:.25});
  const B={};const node=(name,parent,x,y,z)=>{const o=new THREE.Object3D();o.position.set(x,y,z);o.name=name;parent.add(o);B[name]=o;return o};
  const limb=(parent,len,r0,r1,dir=-1,axis="y")=>{const g=new THREE.CylinderGeometry(r1,r0,len,18,1);const m=new THREE.Mesh(g,mat);m.castShadow=true;
    if(axis==="y")m.position.y=dir*len/2;else{m.rotation.x=Math.PI/2;m.position.z=len/2}if(dir<0&&axis==="y")m.rotation.z=Math.PI;parent.add(m);return m};
  const ball=(parent,r,y=0,m=jmat)=>{const s=new THREE.Mesh(new THREE.SphereGeometry(r,20,14),m);s.position.y=y;parent.add(s);return s};
  const root=new THREE.Group();const R=node("root",root,0,SEG.pelvisY,0);
  const pel=new THREE.Mesh(new THREE.SphereGeometry(.15,24,16),mat);pel.scale.set(1.05,.7,.75);R.add(pel);
  const sp=node("spine",R,0,SEG.spine,0);const ab=new THREE.Mesh(new THREE.CylinderGeometry(.115,.125,SEG.chest,20),mat);ab.position.y=SEG.chest/2;sp.add(ab);
  const ch=node("chest",sp,0,SEG.chest,0);const tor=new THREE.Mesh(new THREE.SphereGeometry(.18,24,18),mat);tor.scale.set(1.12,1.15,.72);tor.position.y=.11;ch.add(tor);
  const nk=node("neck",ch,0,SEG.neck,0);limb(nk,.08,.045,.045,1);const hd=new THREE.Mesh(new THREE.SphereGeometry(.105,24,18),mat);hd.scale.set(.92,1.12,1);hd.position.y=SEG.head;nk.add(hd);
  const nose=new THREE.Mesh(new THREE.SphereGeometry(.025,10,8),jmat);nose.position.set(0,SEG.head,.1);nk.add(nose);
  for(const s of ["L","R"]){const sx=s==="L"?1:-1;
    const sh=node("s"+s,ch,sx*SEG.shX,SEG.shY,0);ball(sh,.055);limb(sh,SEG.upper,.05,.042);
    const el=node("e"+s,sh,0,-SEG.upper,0);ball(el,.042);limb(el,SEG.fore,.04,.032);
    const wr=node("w"+s,el,0,-SEG.fore,0);const hn=new THREE.Mesh(new THREE.SphereGeometry(.045,14,10),mat);hn.scale.set(.7,1.2,.9);hn.position.y=-.05;wr.add(hn);
    const hp=node("h"+s,R,sx*SEG.hipX,SEG.hipY,0);ball(hp,.07);limb(hp,SEG.thigh,.075,.055);
    const kn=node("k"+s,hp,0,-SEG.thigh,0);ball(kn,.055);limb(kn,SEG.shin,.052,.04);
    const an=node("a"+s,kn,0,-SEG.shin,0);ball(an,.04);const ft=new THREE.Mesh(new THREE.BoxGeometry(.085,.06,SEG.foot+SEG.heel,1,1,1),mat);ft.position.set(0,-.03,(SEG.foot-SEG.heel)/2);an.add(ft);
    // puntos de contacto
    node("toe"+s,an,0,-.06,SEG.foot);node("heel"+s,an,0,-.06,-SEG.heel);node("hand"+s,wr,0,-SEG.hand,0);node("elbowP"+s,el,0,0,0);node("kneeP"+s,kn,0,0,.03)}
  node("headTop",nk,0,SEG.head+.12,0);node("shoulderP",ch,0,.2,-.11);node("chestF",ch,0,.12,.13);node("pelvisP",R,0,-.06,-.08);
  return {root,B};
}

/* ---------- Motor ---------- */
function Mannequin(canvas,THREE){
  THREE=THREE||window.THREE;const W=()=>canvas.clientWidth||300,H=()=>canvas.clientHeight||300;
  const ren=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});ren.setPixelRatio(Math.min(2,window.devicePixelRatio||1));ren.setSize(W(),H(),false);
  ren.outputEncoding=THREE.sRGBEncoding;ren.toneMapping=THREE.ACESFilmicToneMapping;ren.toneMappingExposure=.95;
  const scene=new THREE.Scene();const cam=new THREE.PerspectiveCamera(30,W()/H(),.1,30);
  scene.add(new THREE.HemisphereLight(0xe0fffa,0x1e1b4b,.9));const key=new THREE.DirectionalLight(0xffffff,1.1);key.position.set(2,4,3);scene.add(key);
  const rim=new THREE.DirectionalLight(0xc4b5fd,1.2);rim.position.set(-3,2,-3);scene.add(rim);const fill=new THREE.PointLight(0x5eead4,.6,10);fill.position.set(0,1,3);scene.add(fill);
  // piso: sombra suave + anillo
  const cv=document.createElement("canvas");cv.width=cv.height=128;const g=cv.getContext("2d");const gr=g.createRadialGradient(64,64,4,64,64,64);gr.addColorStop(0,"rgba(0,0,0,.55)");gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.fillRect(0,0,128,128);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.002;scene.add(shadow);
  const ring=new THREE.Mesh(new THREE.RingGeometry(1.05,1.08,64),new THREE.MeshBasicMaterial({color:0x5eead4,transparent:true,opacity:.25}));ring.rotation.x=-Math.PI/2;ring.position.y=.001;scene.add(ring);
  const pmat=new THREE.MeshPhysicalMaterial({color:0xffffff,transparent:true,opacity:.18,roughness:.1,clearcoat:1});
  const chair=new THREE.Group();const seat=new THREE.Mesh(new THREE.BoxGeometry(.42,.04,.4),pmat);seat.position.set(0,.45,0);chair.add(seat);const back=new THREE.Mesh(new THREE.BoxGeometry(.42,.45,.04),pmat);back.position.set(0,.68,-.19);chair.add(back);
  for(const [x,z] of [[-.19,-.18],[.19,-.18],[-.19,.18],[.19,.18]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,.45),pmat);l.position.set(x,.225,z);chair.add(l)}scene.add(chair);
  const wall=new THREE.Mesh(new THREE.BoxGeometry(1.2,1.8,.05),pmat);scene.add(wall);
  const {root,B}=build(THREE);scene.add(root);
  const tmp=new THREE.Vector3();
  function apply(p){for(const j of JOINTS){const o=B[j];const a=p[j];o.rotation.set(a[0]*D2R,a[1]*D2R,a[2]*D2R,"XYZ")}
    for(const s of ["L","R"]){const flat=p["flat"+s]!==undefined?p["flat"+s]:p.flat;if(flat){const w=p.root[0]+p.spine[0]*0+p["h"+s][0]+p["k"+s][0];B["a"+s].rotation.x=-w*D2R}}
    B.root.position.set(0,SEG.pelvisY,0);root.updateMatrixWorld(true);
    if(p.level){const [a,b]=p.level;const yOf=n=>{root.updateMatrixWorld(true);return pt(n).y};let lo=p.root[0]-45,hi=p.root[0]+45;const f=x=>{B.root.rotation.x=x*D2R;return yOf(a)-yOf(b)};
      let flo=f(lo);for(let i=0;i<28;i++){const mid=(lo+hi)/2,fm=f(mid);if(Math.sign(fm)===Math.sign(flo)){lo=mid;flo=fm}else hi=mid}f((lo+hi)/2);
      for(const s of ["L","R"]){const flat=p["flat"+s]!==undefined?p["flat"+s]:p.flat;if(flat){B["a"+s].rotation.x=-(B.root.rotation.x/D2R+p["h"+s][0]+p["k"+s][0])*D2R}}}
    root.updateMatrixWorld(true);let mn=1e9;["toeL","toeR","heelL","heelR","handL","handR","kneePL","kneePR","elbowPL","elbowPR","headTop","shoulderP","pelvisP","chestF"].forEach(n=>{mn=Math.min(mn,pt(n).y)});
    B.root.position.y+=-mn+.012+(p.lift||0);root.updateMatrixWorld(true)}
  function pt(n){const map={kneeL:"kneePL",kneeR:"kneePR",elbowL:"elbowPL",elbowR:"elbowPR",shoulderL:"shoulderP",shoulderR:"shoulderP",pelvis:"pelvisP"};const o=B[map[n]||n];o.getWorldPosition(tmp);return tmp.clone()}
  function lerpPose(a,b,t){const p={};for(const j of JOINTS)p[j]=a[j].map((v,i)=>v+(b[j][i]-v)*t);p.flat=a.flat;p.flatL=a.flatL;p.flatR=a.flatR;
    if(a.flat!==b.flat||a.flatL!==b.flatL||a.flatR!==b.flatR){const pick=t<.5?a:b;p.flat=pick.flat;p.flatL=pick.flatL;p.flatR=pick.flatR}
    p.level=t<.5?a.level:b.level;p.lift=(a.lift||0)+((b.lift||0)-(a.lift||0))*t;
    // si ambos tienen nivelación pero distinta, interpolamos la altura con ambos y mezclamos
    p._a=a;p._b=b;p._t=t;return p}
  let cur=null,t0=performance.now(),raf=0,center=new THREE.Vector3(0,.8,0),dist=3.6,viewDir=new THREE.Vector3(1,.25,.45);
  const VIEWS={side:[1,.2,0],side3q:[1,.28,.62],front:[0,.18,1],front3q:[.55,.22,1]};
  function frame(ex){const a=ANIM[ex];if(!a)return;const box=new THREE.Box3();for(let i=0;i<a.k.length;i++)for(const t of [0,.5]){const k2=a.k[Math.min(i+1,a.k.length-1)];apply(lerpPose(a.k[i],k2,t));box.expandByObject(root)}
    box.getCenter(center);const sz=new THREE.Vector3();box.getSize(sz);center.y=Math.max(center.y,.45);const vd=VIEWS[a.view||"side3q"];viewDir.set(vd[0],vd[1],vd[2]).normalize();
    const span=Math.max(sz.y*1.05,sz.x*.9*(W()/H()<1?1.2:1),sz.z*.9,1.0);dist=span/(2*Math.tan(15*D2R))*1.18;
    chair.visible=!!a.chair;wall.visible=!!a.wall;if(a.chair===true)chair.position.set(0,0,-.36);if(a.chair==="side"){chair.position.set(.42,0,0);chair.rotation.y=Math.PI/2}else chair.rotation.y=0;
    if(a.wall){wall.position.set(0,.9,-.33)}}
  function poseAt(a,time){const n=a.k.length-1;const f=((Math.max(0,time)%a.dur)/a.dur)*n;const i=Math.min(n,Math.max(0,Math.floor(f)));let t=f-i;t=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;return lerpPose(a.k[i],a.k[Math.min(i+1,n)],t)}
  function applyBlend(p){if(p._a&&p._b&&p._a.level&&p._b.level&&(p._a.level[0]!==p._b.level[0]||p._a.level[1]!==p._b.level[1])){apply(Object.assign({},p,{level:p._a.level}));const ra=B.root.rotation.x,ya=B.root.position.y;apply(Object.assign({},p,{level:p._b.level}));const rb=B.root.rotation.x,yb=B.root.position.y;B.root.rotation.x=ra+(rb-ra)*p._t;B.root.position.y=ya+(yb-ya)*p._t;root.updateMatrixWorld(true)}else apply(p)}
  function loop(now){raf=requestAnimationFrame(loop);if(!cur)return;const a=ANIM[cur];if(!a)return;const tt=Math.max(0,(now-t0)/1000);applyBlend(poseAt(a,tt));
    const sw=Math.sin(tt*.35)*.12;const v=viewDir.clone().applyAxisAngle(new THREE.Vector3(0,1,0),sw);cam.position.copy(center).addScaledVector(v,dist);cam.lookAt(center);
    shadow.position.x=B.root.position.x;shadow.position.z=(a.k[0].root[0]?.0:0);const sc=1.2;shadow.scale.set(sc*(a.k[0].root[0]?1.3:0.9),sc*(a.k[0].root[0]?1.6:0.9),1);
    if(W()!==ren.domElement.width/ren.getPixelRatio()||H()!==ren.domElement.height/ren.getPixelRatio()){ren.setSize(W(),H(),false);cam.aspect=W()/H();cam.updateProjectionMatrix()}
    ren.render(scene,cam)}
  function play(ex){if(!ANIM[ex])return false;cur=ex;t0=performance.now();frame(ex);if(!raf)raf=requestAnimationFrame(loop);return true}
  function at(ex,time){cur=null;frame(ex);const a=ANIM[ex];applyBlend(poseAt(a,time));cam.position.copy(center).addScaledVector(viewDir,dist);cam.lookAt(center);ren.render(scene,cam)}
  function stop(){cancelAnimationFrame(raf);raf=0}
  function dispose(){stop();try{ren.dispose();ren.forceContextLoss()}catch(e){}}
  return {play,stop,at,dispose,has:ex=>!!ANIM[ex]};
}
window.VitalMuneco={Mannequin,ANIM,has:ex=>!!ANIM[ex]};
})();
