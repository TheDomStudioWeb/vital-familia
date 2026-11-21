/* =========================================================
   VITAL · Comer 3
   - Estilos de alimentación nuevos (flexitariana, mediterránea,
     pescetariana, alta en proteína, baja en hidratos): filtro en
     comer2.js y puntaje del plan acá (window.ajustePlato).
   - Condiciones nuevas: colesterol alto, embarazo o lactancia
     (y la presión alta ahora cuida el sodio del plan).
   - Alergias e intolerancias (p.alerg): lactosa, proteína de leche,
     huevo, frutos secos, maní, pescado, mariscos y soja. El plan
     saca los platos que no se pueden adaptar y avisa al registrar.
   - Recetario sin TACC de Vital (pestaña Recetas), reescrito y
     corregido para que sea apto de verdad.
   Se carga después de comer2.js y envuelve sus funciones.
   ========================================================= */
"use strict";
(function(){

/* ---------- Alimentos nuevos (por 100 g) ----------
   [id, nombre, grupo, kcal, hidratos, proteínas, grasas, fibra, sodio mg, tacc (0 apto · 1 contiene · 2 verificar logo), unidades] */
[
 ["hgarb","Harina de garbanzos","legum",387,58,22,6.7,11,64,2,{cda:10,taza:100}],
 ["almidon","Almidón de maíz (fécula)","cereal",381,91,.3,.1,.9,9,2,{cda:10,taza:120}],
 ["harroz","Harina de arroz","cereal",366,80,6,1.4,2.4,0,2,{cda:10,taza:120}],
 ["hmaiz","Harina de maíz (polenta cruda)","cereal",360,76,8,3.5,7,5,2,{cda:12,taza:150}],
 ["halm","Harina de almendras","grasa",580,20,21,50,10,1,0,{cda:8,taza:110}],
 ["castanas","Castañas de cajú","grasa",553,30,18,44,3.3,12,0,{puñado:20}],
 ["coco","Coco rallado","grasa",660,24,7,65,16,37,0,{cda:6,taza:80}],
 ["semillas","Mix de semillas (girasol, lino, sésamo, chía)","grasa",540,20,20,45,20,10,0,{cda:10}],
 ["sesamo","Semillas o harina de sésamo","grasa",573,23,18,50,12,11,0,{cda:9,taza:110}],
 ["cacao","Cacao amargo en polvo","cond",228,58,20,14,33,21,2,{cda:6}],
 ["chocolate","Chocolate amargo","azuc",550,45,8,40,10,10,2,{cuadradito:5}],
 ["levnut","Levadura nutricional","cond",325,36,50,5,22,40,2,{cda:5}],
 ["polvo","Polvo de hornear","cond",53,28,0,0,0,10600,2,{cdita:4}],
 ["mascabo","Azúcar mascabo","azuc",380,98,0,0,0,30,0,{cda:12,taza:200}],
 ["hongos","Hongos secos","verd",296,60,10,1,12,13,0,{puñado:10}],
 ["copos","Copos de maíz sin azúcar","cereal",375,84,7,1,3,700,2,{taza:30}],
 ["lechepolvo","Leche en polvo descremada","lact",362,52,36,1,0,535,0,{cda:8}],
 ["lechesl","Leche deslactosada","lact",46,4.8,3.3,1.5,0,45,0,{vaso:250,taza:200}],
 ["yogursl","Yogur deslactosado","lact",60,7,3.5,1.5,0,46,0,{unidad:190}],
 ["rucula","Rúcula","verd",25,3.7,2.6,.7,1.6,27,0,{puñado:20}],
 ["langostinos","Langostinos","prot",90,0,20,1,0,220,0,{porción:150}]
].forEach(a=>{ALI[a[0]]={id:a[0],n:a[1],c:a[2],kcal:a[3],hc:a[4],p:a[5],g:a[6],fib:a[7],na:a[8],tacc:a[9],u:a[10]}});

/* ---------- Alergias e intolerancias ---------- */
const ALERG={lactosa:"Intolerancia a la lactosa",aplv:"Alergia a la leche",huevo:"Huevo",frutos:"Frutos secos",mani:"Maní",pescado:"Pescado",mariscos:"Mariscos",soja:"Soja"};
window.ALERG=ALERG;
const LACTEOS=["queso","muzza","rallado","untable","ricota","leche","lechedesc","lechesl","yogur","yogursl","manteca","ddl","lechepolvo","facturas","alfajor","galledulce","ravioles","agnolotis","sorrentinos","canelones","raviolesst"];
const CONTIENE={
 aplv:new Set(LACTEOS),
 huevo:new Set(["huevo","mayonesa","facturas","galledulce","alfajor","tallarines","noquis","noquisst","ravioles","raviolescarne","raviolesst","agnolotis","sorrentinos","capeletis","canelones","lasana"]),
 frutos:new Set(["nueces","halm","castanas"]),
 mani:new Set(["mani","pmani"]),
 pescado:new Set(["merluza","atun","salmon","sardinas"]),
 mariscos:new Set(["langostinos","mariscos"]),
 soja:new Set(["soja","sojast","tofu","pst"])
};
// Reemplazos automáticos (como el sin TACC): la leche y el yogur se cambian, el resto de los lácteos se deja
const SIN_LACTOSA={leche:"lechesl",lechedesc:"lechesl",yogur:"yogursl"};
const SIN_LECHE={leche:"bebveg",lechedesc:"bebveg",lechesl:"bebveg",yogur:"yogurveg",yogursl:"yogurveg"};
// Embarazo: fiambres crudos, hígado y alcohol afuera
const EMB_NO=new Set(["jamoncrudo","salame","higado","vino","cerveza"]);
// Colesterol: grasas saturadas que conviene espaciar
const SAT=new Set(["manteca","asado","chorizo","salchicha","panceta","salame","morcilla","chinchulin","molleja","facturas","bizcochitos","hambcong","tapaasado","falda","vacio","matambre","pechito","bondiola","pollopiel","papasfritas","mayonesa","tapacuadril","bifeancho"]);

const alergDe=p=>(p&&p.alerg)||[];
const tiene=(p,c)=>(p.cond||[]).includes(c);
const embarazada=p=>tiene(p,"embarazo")||(p.limits||[]).includes("embarazo");
window.embarazadaComer=embarazada;

const _adaptar=adaptar;
adaptar=function(ing,p){const r=_adaptar(ing,p);if(!p)return r;const al=alergDe(p);
  const mapa=al.includes("aplv")?SIN_LECHE:al.includes("lactosa")?SIN_LACTOSA:null;if(!mapa)return r;
  const out={},cambios=r.cambios.slice();
  for(const [id,g] of Object.entries(r.ing)){const s=mapa[id];if(s&&ALI[s]){out[s]=(out[s]||0)+g;if(!cambios.some(c=>c.startsWith(ALI[id].n+" →")))cambios.push(ALI[id].n+" → "+ALI[s].n)}else out[id]=(out[id]||0)+g}
  return {ing:out,cambios}};

// Motivos por los que un conjunto de ingredientes (ya adaptado) no va para esta persona
function motivos(ing,p){const ks=Object.keys(ing),out=[];
  for(const a of alergDe(p)){const set=CONTIENE[a];if(set&&ks.some(k=>set.has(k)))out.push(a==="aplv"?"lácteos":ALERG[a].toLowerCase())}
  if(embarazada(p)&&ks.some(k=>EMB_NO.has(k)))out.push("no recomendado en el embarazo");
  return out}
window.motivosComida=motivos;
function ingDeItem(x){if(x.src==="plato"&&PLATOM[x.ref])return PLATOM[x.ref].i;if(x.src==="receta"){const r=recetaPorId(x.ref);return r?r.i:{}}return {[x.ref]:1}}

/* ---------- Puntaje del plan según estilo y condiciones ---------- */
window.ajustePlato=function(pl,t,p,ing){let s=0;const d=p.dieta||"";const ks=Object.keys(ing||pl.i);const desa=pl.t==="d";
  if(d==="flexi"&&window.dietaDe&&dietaDe(pl.i)==="omni")s-=12;
  if(d==="medit"){if(pl.pe||pl.le)s+=8;if(ks.includes("oliva"))s+=4;if(pl.r)s-=10;if((t.grupos.ultra||0)>0)s-=15}
  if(d==="prote"){s+=Math.min(15,t.p*.4);if(desa&&t.p<10)s-=8}
  if(d==="lowcarb")s-=Math.max(0,t.hc-(desa?30:40))*.6;
  if(tiene(p,"colesterol")){s-=ks.filter(k=>SAT.has(k)).length*15;if(pl.le||pl.pe)s+=5}
  if(tiene(p,"hta")&&t.na>700)s-=Math.min(25,(t.na-700)/40);
  return s};
window.maxRojas=function(p){if(p.dieta==="flexi"||p.dieta==="medit")return 1;if(tiene(p,"colesterol"))return 2;return 3};

/* ---------- Platos nuevos para el plan ---------- */
[
 {id:"langostinos-arroz",n:"Langostinos salteados con arroz y verduras",t:"a",pe:1,i:{langostinos:150,arroz:180,morron:40,cebolla:40,arvejas:40,oliva:7}},
 {id:"tostadas-palta",n:"Tostadas con palta y tomate",t:"d",i:{pan:60,palta:50,tomate:60}},
 {id:"fruta-semillas",n:"Fruta de estación con semillas",t:"d",i:{manzana:150,banana:60,semillas:10}}
].forEach(x=>{PLATOS.push(x);PLATOM[x.id]=x});

/* ---------- Recetario sin TACC de Vital ----------
   Recetas reescritas a partir de ideas del recetario de Natural.nu
   (Lic. Carolina Maggi), revisadas para que sean aptas de verdad.
   i: gramos para toda la receta · por: porciones · ing: cómo se mide en casa */
const RECETARIO=[
 {id:"rv-pizza-batata",n:"Pizzetas de batata",por:3,plan:"a",ens:1,
  i:{batata:300,hgarb:50,semillas:20,huevo:50,polvo:4,tomate:120,ajo:5,rucula:20,palta:60,queso:60},
  ing:["2 batatas medianas hervidas o al vapor","5 cucharadas de harina de garbanzos","2 cucharadas de semillas (girasol, chía, lino, sésamo)","1 huevo (si no comés huevo, se puede sacar)","1 cucharadita de polvo de hornear","Sal, pimienta y pimentón","Salsa: 1 tomate, 1 diente de ajo y unas hojas de albahaca","Arriba: rúcula, palta, huevo a la plancha o el queso que tengas"],
  pasos:["Procesá la batata con la harina, el huevo, las semillas, el polvo de hornear y los condimentos.","Armá 3 pizzetas sobre una placa aceitada y horneá hasta que estén firmes y doradas abajo.","Mientras, procesá el tomate con el ajo y la albahaca: esa es la salsa.","Poné la salsa, el queso y volvé al horno unos minutos. Terminá con rúcula y palta."]},
 {id:"rv-risotto",n:"Risotto de calabaza y hongos",por:3,plan:"a",
  i:{cebolla:100,ajo:5,zapallo:150,arroz:450,hongos:20,bebveg:150,untable:40,rallado:20,castanas:20,oliva:13},
  ing:["1 cebolla picada y 1 diente de ajo","½ taza de calabaza ya cocida al horno","1 taza y media de arroz (doble Carolina o el que tengas)","1 puñado de hongos secos hidratados","Un chorro de bebida vegetal","2 cucharadas de queso crema (o vegano)","Queso rallado o levadura nutricional","Castañas de cajú y semillas tostadas"],
  pasos:["Hidratá los hongos en agua tibia. Guardá esa agua: le da mucho sabor.","Saltá la cebolla y el ajo con una cucharada de aceite de oliva y un poco de agua o caldo casero.","Sumá los hongos, el arroz y andá agregando el agua de a poco, revolviendo, unos 20 a 25 minutos.","Cuando el arroz esté a punto, agregá la calabaza, la bebida vegetal y el queso crema.","Serví con queso rallado, castañas y semillas tostadas. Con un huevo y tomates cherry queda un plato completo."],
  nota:"Si usás caldo en cubo, que tenga el logo Sin TACC; mejor caldo casero."},
 {id:"rv-pancitos-quinoa",n:"Pancitos de quinoa",por:6,
  i:{huevo:100,semillas:10,quinoa:270,polvo:4,harroz:40},
  ing:["2 huevos","1 cucharada de mix de semillas","1 taza y media de quinoa cocida","1 cucharadita de polvo de hornear","4 cucharadas de harina de arroz"],
  pasos:["Mezclá todos los ingredientes hasta que quede una pasta que se pueda formar.","Armá 6 pancitos sobre una placa aceitada.","Horneá hasta que estén firmes y dorados.","Rellenalos con verduras grilladas, queso y huevo, o lo que tengas."],
  cambio:"La receta original lleva avena: la cambiamos por más harina de arroz porque en Argentina la avena no se considera apta para celíacos."},
 {id:"rv-bizcochitos",n:"Bizcochitos de queso",por:20,
  i:{almidon:180,hgarb:120,huevo:50,lechedesc:160,oliva:30,rallado:30,queso:50,sal:6,polvo:4},
  ing:["1 taza y media de almidón de maíz (180 g)","¾ taza de harina de garbanzos (120 g)","1 huevo","1 taza de leche descremada caliente","2 cucharadas de aceite de oliva","30 g de queso de rallar y 50 g de queso criollo (o más)","Sal a gusto (poca) y 1 cucharadita de polvo de hornear"],
  pasos:["En un bowl mezclá el almidón, la harina de garbanzos, la sal, el polvo de hornear y los quesos.","Agregá la leche caliente, después el aceite y el huevo, y uní todo.","Formá bolitas, ponelas en una placa y horneá hasta que doren."]},
 {id:"rv-hamb-garbanzos",n:"Hamburguesas de garbanzos",por:4,plan:"a",ens:1,
  i:{garbanzos:240,ajo:5,morron:75,berenjena:120,harroz:10,huevo:110,levnut:5},
  ing:["1 taza y media de garbanzos cocidos","1 diente de ajo, sal, pimienta y pimentón","½ morrón rojo y ½ berenjena pelada en cubos","1 cucharada de harina de arroz integral (o la que tengas sin TACC)","1 huevo y 2 claras","1 cucharada de levadura nutricional (opcional)"],
  pasos:["Procesá todos los ingredientes hasta que quede una pasta.","Formá las hamburguesas con las manos húmedas.","Cocinalas vuelta y vuelta en sartén o al horno hasta que doren.","Quedan muy bien en pan de zanahoria (la receta que sigue) con huevo, queso y verduras."],
  cambio:"La receta original lleva germen de trigo, que tiene TACC: lo sacamos y dejamos la levadura nutricional."},
 {id:"rv-pan-zanahoria",n:"Pan proteico de zanahoria",por:6,
  i:{zanahoria:320,huevo:150,lechepolvo:10,hgarb:30,polvo:4,semillas:10},
  ing:["4 zanahorias ralladas","1 huevo y 3 claras (o 3 huevos)","1 cucharada de leche en polvo descremada (o más harina)","3 cucharadas de harina de garbanzos","1 cucharadita de polvo de hornear","Sal, pimienta, pimentón y semillas"],
  pasos:["Mezclá todo y condimentá.","Formá 6 panes finitos sobre una placa aceitada.","Horneá hasta que estén dorados."]},
 {id:"rv-wrap-espinaca",n:"Wraps de espinaca",por:3,
  i:{huevo:130,harroz:20,lechepolvo:10,polvo:4,espinaca:150},
  ing:["2 huevos y 1 clara","2 cucharadas de harina de arroz","1 cucharada de leche en polvo descremada (o más harina)","1 cucharadita de polvo de hornear","½ atado de espinaca (las hojas)","Condimentos a gusto"],
  pasos:["Procesá la espinaca con los huevos.","Sumá el resto de los ingredientes y mezclá bien.","Cociná en sartén, vuelta y vuelta, como un panqueque.","Rellenalos con lo que tengas. Con el hummus de lentejas quedan bárbaros."]},
 {id:"rv-hummus-lentejas",n:"Hummus de lentejas",por:6,
  i:{lentejas:200,ajo:10,limon:10,sal:2},
  ing:["1 taza de lentejas cocidas","2 dientes de ajo","Unas gotas de jugo de limón","Sal, pimienta y pimentón ahumado (opcional)"],
  pasos:["Procesá todo hasta que quede cremoso.","Si queda espeso, agregá una cucharada de agua.","Listo en 5 minutos: sirve para untar o para acompañar bastones de verdura."]},
 {id:"rv-galletas-sesamo",n:"Galletas de sésamo",por:20,
  i:{sesamo:110,almidon:130,mascabo:100,bebveg:240,halm:220,huevo:50},
  ing:["1 taza de harina de semillas de sésamo","1 taza de almidón de maíz o harina de arroz","½ taza de azúcar mascabo","1 taza de bebida vegetal","2 tazas de harina de almendras","1 huevo"],
  pasos:["Mezclá todos los ingredientes.","Formá las galletas sobre una placa.","Horneá a fuego bajo, con el horno ya caliente, unos 20 minutos."],
  cambio:"Usamos la mitad del azúcar de la receta original: quedan ricas igual."},
 {id:"rv-alfajores",n:"Alfajores sin TACC",por:8,
  i:{huevo:50,bebveg:120,halm:110,coco:40,almidon:65,cacao:12,mascabo:25,sesamo:10,pmani:80},
  ing:["1 huevo","½ taza de bebida vegetal","1 taza de harina de almendras","½ taza de coco rallado","½ taza de almidón de maíz","2 cucharadas de cacao amargo","2 cucharadas de azúcar mascabo","Semillas de sésamo","Para rellenar: pasta de maní sin azúcar (o lo que te guste)"],
  pasos:["Mezclá todos los ingredientes de la masa.","Formá las tapitas y horneá hasta que estén firmes.","Dejalas enfriar y rellenalas."]},
 {id:"rv-pancake",n:"Pancake sin TACC",por:1,plan:"d",
  i:{huevo:50,polvo:2,harroz:20,banana:60,frutilla:80},
  ing:["1 huevo (o 2 claras)","1 cucharadita de polvo de hornear","2 cucharadas de harina de arroz, de almendras o de legumbres","Vainilla y endulzante (opcional)","Opcional: un scoop de proteína, cacao amargo o semillas","Arriba: frutas, coco rallado, frutos secos o pasta de maní"],
  pasos:["Batí el huevo con la harina y el polvo de hornear.","Cociná en sartén a fuego medio, vuelta y vuelta.","Serví con frutas por arriba."]},
 {id:"rv-crackers",n:"Crackers de garbanzo",por:6,
  i:{oliva:26,semillas:20,sal:5,hgarb:120,harroz:75,copos:25},
  ing:["2 cucharadas de aceite de oliva","2 cucharadas de semillas","1 cucharadita de sal y una pizca de pimentón","1 taza de harina de garbanzos","½ taza de harina de arroz","½ taza de copos de maíz sin azúcar molidos","Agua, la que pida la masa","1 huevo (opcional; sin huevo son veganas)"],
  pasos:["Mezclá todo hasta formar una masa.","Estirala entre dos separadores de tarta o una bolsa abierta, porque es pegajosa.","Cortá las galletas y horneá fuerte hasta que doren."],
  cambio:"Bajamos la sal a 1 cucharadita.",nota:"Los copos de maíz comunes suelen llevar malta de cebada: usá solo los que tienen el logo Sin TACC."},
 {id:"rv-brownies",n:"Brownies veganos",por:8,
  i:{cacao:40,halm:40,chia:5,polvo:4,banana:120,oliva:10,nueces:20},
  ing:["40 g de cacao en polvo","40 g de harina de almendras","1 cucharadita de semillas de chía","1 cucharadita de polvo de hornear","1 cucharada de stevia (o el endulzante que uses)","1 cucharadita de vainilla","1 banana bien madura","1 cucharada de aceite de oliva","Nueces o chocolate picado"],
  pasos:["Pisá la banana y mezclala con el resto de los ingredientes.","Pasá la mezcla a una budinera aceitada.","Cociná a horno moderado: menos tiempo si los querés húmedos, más si los querés secos."]},
 {id:"rv-cookies",n:"Cookies en 5 minutos",por:8,
  i:{huevo:50,aceite:13,hgarb:20,almidon:20,harroz:20,polvo:4,coco:8,chocolate:20},
  ing:["1 huevo","1 cucharada de vainilla y 1 de aceite","2 cucharadas de harina de garbanzos, 2 de fécula de mandioca y 2 de harina de arroz","1 cucharadita de polvo de hornear","1 cucharada de coco rallado","Chips de chocolate amargo sin azúcar"],
  pasos:["Mezclá todo.","Armá las cookies sobre una placa.","Horneá hasta que doren. Sin endulzante quedan muy bien."]},
 {id:"rv-milas-berenjena",n:"Milanesas de berenjena con rebozador sin TACC",por:3,plan:"a",ens:1,
  i:{berenjena:400,hmaiz:45,hgarb:20,semillas:20,levnut:10,huevo:50},
  ing:["1 berenjena grande en rodajas","2 cucharadas de harina de maíz y 2 de polenta","2 cucharadas de harina de garbanzos","2 cucharadas de mix de semillas","2 cucharadas de levadura nutricional","Sal y pimentón","1 huevo batido para pegar el rebozador"],
  pasos:["Mezclá todos los secos: ese es el rebozador.","Pasá cada rodaja por huevo batido y después por el rebozador.","Horneá hasta dorar, dándolas vuelta una vez.","Acompañá con huevo, queso, garbanzos y ensalada para un plato completo."],
  nota:"Si no comés huevo, pegá el rebozador con agua mezclada con harina de garbanzos."},
 {id:"rv-zapallo-relleno",n:"Zapallo relleno",por:4,plan:"a",
  i:{zapallo:1200,choclo:150,zucchini:200,zapallito:200,cebolla:120,huevo:150,untable:30,queso:80,rallado:20,semillas:10},
  ing:["1 zapallo cabutia","1 choclo","1 zucchini y 1 zapallito","1 cebolla","2 huevos duros y 1 huevo crudo (o 2 claras)","2 cucharadas de queso crema descremado","Queso fresco y rallado a gusto","Semillas y condimentos"],
  pasos:["Ahuecá el zapallo y horneálo hasta que esté blando, unos 40 minutos.","Mientras, saltá las verduras cortadas junto con lo que sacaste del centro del zapallo.","Mezclá las verduras con los quesos y los huevos, y condimentá.","Rellená el zapallo y horneá 15 minutos más."]}
];
const RECM={};RECETARIO.forEach(r=>{r.st=1;r.by="Vital";RECM[r.id]=r});
window.RECETARIO=RECETARIO;
// Las recetas con plan:"a"/"d" entran también al plan semanal (una porción + ensalada si corresponde)
RECETARIO.filter(r=>r.plan).forEach(r=>{const i={};for(const [k,g] of Object.entries(r.i))i[k]=Math.round(g/r.por);
  if(r.ens){i.lechuga=(i.lechuga||0)+50;i.tomate=(i.tomate||0)+80}
  const x={id:r.id,n:r.n+(r.ens?" con ensalada":""),t:r.plan,le:i.garbanzos||i.lentejas?1:0,i};PLATOS.push(x);PLATOM[x.id]=x});
const _recPorId=recetaPorId;
recetaPorId=function(id){return RECM[id]||_recPorId(id)};

/* ---------- Plan semanal: saca lo que no se puede comer ---------- */
function filtrar(lista,p){return lista.filter(pl=>!motivos(adaptar(pl.i,p).ing,p).length)}
const _armar=armarPlan;
armarPlan=function(p){const ok=filtrar(PLATOS,p);
  if(!ok.some(x=>x.t==="d"))ok.push(PLATOM["fruta-semillas"]);
  if(ok.filter(x=>x.t==="a").length<4){toast("Con tantas restricciones hay pocos platos: el plan va a repetir algunos");}
  const bak=PLATOS.slice();PLATOS.length=0;PLATOS.push(...ok);try{return _armar(p)}finally{PLATOS.length=0;PLATOS.push(...bak)}};

/* ---------- Avisos al registrar ---------- */
window.avisoItem=function(x,p){const m=motivos(adaptar(ingDeItem(x),p).ing,p);return m.length?` · <span style="color:var(--bad)">⚠ ${esc(m.join(", "))}</span>`:""};
const _dibPor=dibPorcion;
dibPorcion=function(){_dibPor();const p=P();const it={src:FSEL.src,ref:FSEL.ref};const m=motivos(adaptar(ingDeItem(it),p).ing,p);
  const sh=document.querySelector("#layer .sheet");if(!m.length||!sh)return;const h2=sh.querySelector("h2");if(!h2)return;
  const n=document.createElement("p");n.className="note";n.style.marginTop="8px";n.style.borderColor="var(--bad)";n.innerHTML="⚠ Ojo: tiene "+esc(m.join(", "))+". Revisá antes de comerlo.";h2.after(n)};

/* ---------- Notas del plan y recetario ---------- */
function notasPlan(p){const al=alergDe(p),out=[];
  const sacamos=al.filter(a=>a!=="lactosa").map(a=>a==="aplv"?"lácteos":ALERG[a].toLowerCase());
  if(sacamos.length)out.push(`🚫 Sin ${sacamos.join(", ")}: el plan no incluye platos que los lleven. Igual leé siempre las etiquetas, porque muchos productos tienen trazas.`);
  if(al.includes("aplv"))out.push("🥛 La leche y el yogur se cambian por bebida y yogur vegetal fortificados con calcio.");
  else if(al.includes("lactosa"))out.push("🥛 Sin lactosa: la leche y el yogur pasan a deslactosados. Los quesos duros y estacionados suelen tolerarse bien.");
  if(tiene(p,"colesterol"))out.push("❤️ Colesterol: menos carnes grasas, embutidos y manteca; más legumbres, pescado, aceite de oliva y fibra.");
  if(tiene(p,"hta"))out.push("🧂 Presión alta: el plan elige platos con menos sodio. Cociná con poca sal y probá con limón, ajo y hierbas.");
  if(embarazada(p))out.push("🤰 Embarazo o lactancia: sin fiambres crudos, hígado ni alcohol. Carnes y huevos bien cocidos, verduras bien lavadas y lácteos pasteurizados. Los suplementos (ácido fólico, hierro) los indica tu médico.");
  const d=p.dieta||"";
  if(d==="prote")out.push("💪 Alta en proteína: el plan prioriza platos con más proteína. Si entrenás fuerte, repartila en todas las comidas.");
  if(d==="lowcarb")out.push("🥗 Baja en hidratos: el plan elige platos con menos harinas y azúcares. No es una dieta keto: si buscás algo más estricto, hacelo con un nutricionista.");
  if(d==="medit")out.push("🫒 Mediterránea: más pescado, legumbres, verduras y aceite de oliva; carne roja una vez por semana.");
  if(d==="flexi")out.push("🌿 Flexitariana: la mayoría de los platos sin carne y carne roja una vez por semana.");
  if(d==="pesce")out.push("🐟 Pescetariana: sin carnes, con pescado y mariscos. Sumá legumbres y huevo para variar las proteínas.");
  if(!out.length)return "";
  return `<div class="note" style="margin-top:10px">${out.map(t=>`<p class="sm" style="margin:4px 0">${t}</p>`).join("")}<p class="xs faint" style="margin-top:6px">Vital orienta, no reemplaza a tu médico ni a tu nutricionista.</p></div>`}
function secRecetario(p){const cel=(p.cond||[]).includes("celiaquia");
  return `<section class="glass org2"><h2>🌾 Recetario sin TACC</h2><p class="xs mute">Recetas aptas para celíacos, ricas para toda la familia. Tocá una para ver cómo se hace.</p>
  ${RECETARIO.map(r=>{const por=Object.fromEntries(Object.entries(r.i).map(([k,g])=>[k,g/r.por]));const ad=adaptar(por,p);const t=nutri(ad.ing);const q=calidad(t,r.plan||"a");const m=motivos(ad.ing,p);
    return `<button class="ex" data-act="rv" data-v="${r.id}"><span class="ico" style="background:${colorCal(q.s)}33;font-size:15px;font-weight:800">${q.s}</span><span class="t"><b>${esc(r.n)}</b><span>${r.por} ${r.por===1?"porción":"porciones"}${esMenor(p)?"":" · "+Math.round(t.kcal)+" kcal"} · HC ${Math.round(t.hc)} g por porción${m.length?` · <span style="color:var(--bad)">⚠ ${esc(m.join(", "))}</span>`:""}</span></span><span class="faint">›</span></button>`}).join("")}
  ${cel?"":`<p class="xs faint" style="margin-top:8px">Aunque no seas celíaco, son recetas con harinas de legumbres, arroz y semillas: buena fibra y variedad.</p>`}</section>`}
function verReceta(id){const r=RECM[id];if(!r)return;const p=P();const por=Object.fromEntries(Object.entries(r.i).map(([k,g])=>[k,g/r.por]));const ad=adaptar(por,p);const t=nutri(ad.ing);const q=calidad(t,r.plan||"a");const m=motivos(ad.ing,p);
  sheet(`<h2>${esc(r.n)}</h2><p class="xs mute">🌾 Sin TACC · ${r.por} ${r.por===1?"porción":"porciones"}</p>
  ${m.length?`<p class="note" style="margin-top:8px;border-color:var(--bad)">⚠ Ojo: tiene ${esc(m.join(", "))}.</p>`:""}
  <div class="grid3" style="margin-top:12px;text-align:center"><div class="stat"><span class="xs mute">Calidad</span><b style="color:${colorCal(q.s)}">${q.s}</b></div>${esMenor(p)?"":`<div class="stat"><span class="xs mute">Por porción</span><b>${Math.round(t.kcal)}</b><span class="xs">kcal</span></div>`}<div class="stat"><span class="xs mute">Hidratos</span><b>${Math.round(t.hc)} g</b></div></div>
  <h3 style="margin-top:14px">Ingredientes</h3><ul class="sm" style="padding-left:18px;margin:6px 0">${r.ing.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
  <h3 style="margin-top:12px">Cómo se hace</h3><ol class="sm" style="padding-left:18px;margin:6px 0">${r.pasos.map(x=>`<li style="margin:4px 0">${esc(x)}</li>`).join("")}</ol>
  ${r.cambio?`<p class="note green" style="margin-top:10px">✓ ${esc(r.cambio)}</p>`:""}
  ${r.nota?`<p class="note" style="margin-top:8px">${esc(r.nota)}</p>`:""}
  <p class="note" style="margin-top:8px">🌾 Polvo de hornear, harinas, cacao, quesos y bebidas vegetales: siempre con el logo Sin TACC. Cociná con utensilios limpios para evitar la contaminación cruzada.</p>
  ${ad.cambios.length?`<p class="xs" style="color:var(--lime);margin-top:6px">Adaptado para vos: ${esc(ad.cambios.join(", "))}</p>`:""}
  <button class="btn block" style="margin-top:12px" data-act="rvan" data-v="${r.id}">Anotar una porción</button>
  <p class="xs faint" style="margin-top:10px">Basado en ideas del recetario de Natural.nu (Lic. Carolina Maggi).</p>`)}

const _vC=vComer;
vComer=function(){const p=P();let h=_vC();
  if(comerTab==="plan"&&p.plan){const n=notasPlan(p);if(n){const a=h.indexOf("Tu semana");const b=a>0?h.indexOf("</div>",a):-1;if(b>0)h=h.slice(0,b+6)+n+h.slice(b+6)}}
  if(comerTab==="plan"&&!p.plan){const n=notasPlan(p);if(n){const a=h.indexOf('data-act="pgen"');const b=a>0?h.indexOf("</button>",a):-1;if(b>0)h=h.slice(0,b+9)+n+h.slice(b+9)}}
  if(comerTab==="recetas"){const a=h.indexOf("Recetas de casa");const b=a>0?h.indexOf("</section>",a):-1;if(b>0)h=h.slice(0,b+10)+secRecetario(p)+h.slice(b+10)}
  return h};

const _ca=window.comerAct;
window.comerAct=function(a,v){
  if(a==="rv"){verReceta(v);return true}
  if(a==="rvan"){abrirRegistrar(comidaSugerida());abrirPorcion("receta",v);return true}
  return _ca(a,v)};
})();
