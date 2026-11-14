/* =========================================================
   VITAL · Comer — alimentación familiar
   Valores nutricionales aproximados por 100 g (o 100 ml).
   Fuentes de referencia: tablas de composición de alimentos
   y Guías Alimentarias para la Población Argentina (plato saludable).
   ========================================================= */
"use strict";

/* ---------- Alimentos ----------
   [id, nombre, categoría, kcal, HC, proteínas, grasas, fibra, sodio(mg), TACC(0 no · 1 sí · 2 verificar logo), unidades caseras, temporada "desde-hasta" (meses)] */
const ALI_RAW = [
 ["tomate","Tomate","verd",18,3.9,.9,.2,1.2,5,0,{unidad:150},"12-4"],
 ["lechuga","Lechuga","verd",15,2.9,1.4,.2,1.3,28,0,{plato:60},""],
 ["zanahoria","Zanahoria","verd",41,9.6,.9,.2,2.8,69,0,{unidad:80},""],
 ["cebolla","Cebolla","verd",40,9.3,1.1,.1,1.7,4,0,{unidad:150},""],
 ["zapallo","Zapallo / calabaza","verd",45,11.7,1,.1,2,4,0,{porción:200},"3-8"],
 ["zapallito","Zapallito redondo","verd",17,3.1,1.2,.3,1,8,0,{unidad:150},"11-3"],
 ["zucchini","Zucchini","verd",17,3.1,1.2,.3,1,8,0,{unidad:200},"11-3"],
 ["berenjena","Berenjena","verd",25,5.9,1,.2,3,2,0,{unidad:250},"12-4"],
 ["morron","Morrón","verd",26,6,1,.3,2,4,0,{unidad:150},"12-4"],
 ["acelga","Acelga","verd",19,3.7,1.8,.2,1.6,213,0,{atado:300},"4-10"],
 ["espinaca","Espinaca","verd",23,3.6,2.9,.4,2.2,79,0,{taza:30},"4-10"],
 ["brocoli","Brócoli","verd",34,6.6,2.8,.4,2.6,33,0,{taza:90},"5-10"],
 ["coliflor","Coliflor","verd",25,5,1.9,.3,2,30,0,{taza:100},"5-10"],
 ["repollo","Repollo","verd",25,5.8,1.3,.1,2.5,18,0,{taza:90},"5-10"],
 ["remolacha","Remolacha","verd",43,9.6,1.6,.2,2.8,78,0,{unidad:130},"5-11"],
 ["pepino","Pepino","verd",15,3.6,.7,.1,.5,2,0,{unidad:200},"12-3"],
 ["chaucha","Chauchas","verd",31,7,1.8,.2,2.7,6,0,{taza:100},"11-3"],
 ["arvejas","Arvejas","verd",81,14,5.4,.4,5,5,0,{taza:145},"9-11"],
 ["puerro","Puerro","verd",61,14,1.5,.3,1.8,20,0,{unidad:90},"5-10"],
 ["apio","Apio","verd",16,3,.7,.2,1.6,80,0,{tallo:40},""],
 ["champi","Champiñones","verd",22,3.3,3.1,.3,1,5,0,{taza:70},""],
 ["ajo","Ajo","verd",149,33,6.4,.5,2.1,17,0,{diente:5},""],
 ["papa","Papa","fecula",77,17.5,2,.1,2.2,6,0,{unidad:170},""],
 ["batata","Batata","fecula",86,20,1.6,.1,3,55,0,{unidad:200},"3-8"],
 ["choclo","Choclo (granos)","fecula",86,19,3.3,1.4,2.7,15,0,{taza:150},"12-3"],
 ["lentejas","Lentejas cocidas","legum",116,20,9,.4,7.9,2,0,{taza:200},""],
 ["porotos","Porotos cocidos","legum",127,22.8,8.7,.5,6.4,1,0,{taza:180},""],
 ["garbanzos","Garbanzos cocidos","legum",164,27,8.9,2.6,7.6,7,0,{taza:165},""],
 ["banana","Banana","fruta",89,22.8,1.1,.3,2.6,1,0,{unidad:120},""],
 ["manzana","Manzana","fruta",52,13.8,.3,.2,2.4,1,0,{unidad:180},""],
 ["pera","Pera","fruta",57,15,.4,.1,3.1,1,0,{unidad:180},"1-7"],
 ["naranja","Naranja","fruta",47,11.8,.9,.1,2.4,0,0,{unidad:180},"5-10"],
 ["mandarina","Mandarina","fruta",53,13.3,.8,.3,1.8,2,0,{unidad:100},"4-8"],
 ["pomelo","Pomelo","fruta",42,10.7,.8,.1,1.6,0,0,{unidad:250},"5-10"],
 ["limon","Limón","fruta",29,9,1.1,.3,2.8,2,0,{unidad:100},""],
 ["kiwi","Kiwi","fruta",61,14.7,1.1,.5,3,3,0,{unidad:75},"5-10"],
 ["frutilla","Frutillas","fruta",32,7.7,.7,.3,2,1,0,{taza:150},"9-12"],
 ["durazno","Durazno","fruta",39,9.5,.9,.3,1.5,0,0,{unidad:150},"11-2"],
 ["ciruela","Ciruela","fruta",46,11.4,.7,.3,1.4,0,0,{unidad:70},"12-3"],
 ["damasco","Damasco","fruta",48,11,1.4,.4,2,1,0,{unidad:40},"11-1"],
 ["uva","Uva","fruta",69,18,.7,.2,.9,2,0,{taza:150},"1-4"],
 ["sandia","Sandía","fruta",30,7.6,.6,.2,.4,1,0,{tajada:300},"12-2"],
 ["melon","Melón","fruta",34,8.2,.8,.2,.9,16,0,{tajada:200},"12-3"],
 ["higo","Higo","fruta",74,19,.8,.3,2.9,1,0,{unidad:50},"1-3"],
 ["membrillo","Membrillo","fruta",57,15,.4,.1,1.9,4,0,{unidad:200},"3-5"],
 ["palta","Palta","grasa",160,8.5,2,14.7,6.7,7,0,{unidad:150},""],
 ["huevo","Huevo","prot",143,.7,12.6,9.5,0,142,0,{unidad:50},""],
 ["pechuga","Pollo (pechuga sin piel)","prot",120,0,22.5,2.6,0,45,0,{porción:150},""],
 ["muslo","Pollo (pata-muslo sin piel)","prot",165,0,20,9,0,90,0,{presa:180},""],
 ["carne","Carne vacuna magra (nalga, peceto)","prot",150,0,22,6.5,0,55,0,{porción:150},""],
 ["asado","Asado de tira","prot",290,0,17,25,0,60,0,{porción:250},""],
 ["picada","Carne picada especial","prot",180,0,20,10,0,66,0,{porción:120},""],
 ["cerdo","Cerdo (lomo)","prot",143,0,21,6,0,50,0,{porción:150},""],
 ["merluza","Merluza","prot",90,0,18,1.3,0,86,0,{filet:150},""],
 ["atun","Atún al natural","prot",116,0,26,1,0,320,0,{lata:120},""],
 ["jamon","Jamón cocido","prot",120,1.5,18,4.5,0,1100,2,{feta:20},""],
 ["queso","Queso cremoso","lact",280,2,18,22,0,600,0,{porción:30},""],
 ["muzza","Muzzarella","lact",280,2,22,20,0,600,0,{porción:30},""],
 ["rallado","Queso rallado","lact",400,3,33,29,0,1500,2,{cda:10},""],
 ["untable","Queso untable light","lact",140,4,12,8,0,400,2,{cda:15},""],
 ["ricota","Ricota","lact",140,3,11,9.5,0,80,0,{cda:30},""],
 ["leche","Leche entera","lact",61,4.8,3.2,3.3,0,43,0,{taza:200},""],
 ["lechedesc","Leche descremada","lact",35,5,3.4,.1,0,45,0,{taza:200},""],
 ["yogur","Yogur natural","lact",61,4.7,3.5,3.3,0,46,2,{pote:190},""],
 ["pan","Pan francés","cereal",270,56,9,1.5,2.5,550,1,{unidad:60},""],
 ["panint","Pan integral","cereal",250,43,10,4,6,450,1,{rebanada:30},""],
 ["panst","Pan sin TACC","cereal",260,50,3,5,3,400,0,{rebanada:30},""],
 ["panhamb","Pan de hamburguesa","cereal",265,49,9,4,2.5,450,1,{unidad:60},""],
 ["fideos","Fideos cocidos","cereal",158,31,5.8,.9,1.8,1,1,{plato:220},""],
 ["fideosst","Fideos sin TACC cocidos","cereal",160,34,3,1,1.5,2,0,{plato:220},""],
 ["arroz","Arroz blanco cocido","cereal",130,28,2.7,.3,.4,1,0,{taza:180},""],
 ["arrozint","Arroz integral cocido","cereal",112,23.5,2.3,.8,1.8,5,0,{taza:180},""],
 ["polenta","Polenta cocida","cereal",70,15,1.7,.4,.8,1,2,{plato:250},""],
 ["avena","Avena","cereal",389,66,17,7,10.6,2,1,{cda:10},""],
 ["harina","Harina de trigo","cereal",364,76,10,1,2.7,2,1,{taza:120},""],
 ["premezcla","Premezcla sin TACC","cereal",360,85,1,1,1,10,0,{taza:120},""],
 ["panrallado","Pan rallado","cereal",395,72,13,5,4.5,730,1,{cda:10},""],
 ["rebozador","Rebozador sin TACC","cereal",370,80,6,2,3,400,0,{cda:10},""],
 ["tapaemp","Tapa de empanada","cereal",300,45,7,10,2,600,1,{unidad:30},""],
 ["tapaempst","Tapa de empanada sin TACC","cereal",300,48,3,10,2,500,0,{unidad:30},""],
 ["tapatarta","Masa de tarta","cereal",330,45,7,14,2,600,1,{disco:250},""],
 ["tapatartast","Masa de tarta sin TACC","cereal",330,48,3,14,2,500,0,{disco:250},""],
 ["galleagua","Galletitas de agua","ultra",420,72,10,10,3,700,1,{unidad:6},""],
 ["galledulce","Galletitas dulces","ultra",480,70,6,20,2,300,1,{unidad:8},""],
 ["facturas","Facturas","ultra",410,45,6,23,1.5,300,1,{unidad:50},""],
 ["bizcochitos","Bizcochitos de grasa","ultra",480,55,8,25,2,900,1,{unidad:5},""],
 ["cereales","Cereales azucarados","ultra",380,85,6,2,3,400,1,{taza:30},""],
 ["alfajor","Alfajor","ultra",450,62,5,20,1.5,200,1,{unidad:50},""],
 ["salchicha","Salchicha","ultra",270,3,12,23,0,900,2,{unidad:50},""],
 ["hambcong","Hamburguesa congelada","ultra",250,5,15,19,0,700,2,{unidad:80},""],
 ["papasfritas","Papas fritas de paquete","ultra",536,53,7,35,4.4,500,2,{bolsita:40},""],
 ["gaseosa","Gaseosa común","ultra",42,10.6,0,0,0,10,0,{vaso:250},""],
 ["jugo","Jugo en polvo o de caja","ultra",45,11,0,0,0,10,2,{vaso:250},""],
 ["caldo","Caldo en cubo","ultra",250,20,10,15,0,20000,2,{cubo:10},""],
 ["soja","Salsa de soja","cond",53,5,8,.6,.8,5500,1,{cda:15},""],
 ["sojast","Salsa de soja sin TACC","cond",53,5,8,.6,.8,5500,0,{cda:15},""],
 ["pure","Puré de tomate","verd",30,6,1.5,.2,1.5,400,0,{taza:250},""],
 ["aceite","Aceite","grasa",884,0,0,100,0,0,0,{cda:13},""],
 ["oliva","Aceite de oliva","grasa",884,0,0,100,0,0,0,{cda:13},""],
 ["manteca","Manteca","grasa",717,.1,.9,81,0,11,0,{cda:10},""],
 ["mayonesa","Mayonesa","ultra",680,1,1,75,0,600,2,{cda:15},""],
 ["nueces","Nueces","grasa",654,14,15,65,6.7,2,0,{puñado:25},""],
 ["mani","Maní","grasa",567,16,26,49,8.5,18,0,{puñado:25},""],
 ["chia","Semillas de chía","grasa",486,42,17,31,34,16,0,{cda:12},""],
 ["azucar","Azúcar","azuc",400,100,0,0,0,0,0,{cdita:5},""],
 ["ddl","Dulce de leche","azuc",315,55,7,7.5,0,130,2,{cda:20},""],
 ["mermelada","Mermelada","azuc",250,62,.3,0,1,20,0,{cda:20},""],
 ["miel","Miel","azuc",304,82,.3,0,.2,4,0,{cda:20},""],
 ["mate","Mate (sin azúcar)","bebida",2,.3,.1,0,0,1,2,{mateada:500},""],
 ["cafe","Café o té","bebida",2,.3,.1,0,0,2,0,{taza:200},""],
 ["agua","Agua","bebida",0,0,0,0,0,2,0,{vaso:250},""],
 ["vino","Vino","bebida",85,2.6,.1,0,0,4,0,{copa:150},""],
 ["cerveza","Cerveza","bebida",43,3.6,.5,0,0,4,1,{vaso:330},""],
 ["sal","Sal","cond",0,0,0,0,0,38758,0,{pizca:1,cdita:5},""]
];
const ALI = {};ALI_RAW.forEach(a=>{ALI[a[0]]={id:a[0],n:a[1],c:a[2],kcal:a[3],hc:a[4],p:a[5],g:a[6],fib:a[7],na:a[8],tacc:a[9],u:a[10],s:a[11]}});
const SINTACC = {pan:"panst",panint:"panst",panhamb:"panst",fideos:"fideosst",harina:"premezcla",panrallado:"rebozador",tapaemp:"tapaempst",tapatarta:"tapatartast",soja:"sojast",avena:null,cerveza:null};

/* ---------- Platos argentinos (por porción, gramos) ----------
   t: tipo (d desayuno/merienda · a almuerzo/cena · c colación) · s: temporada · r: carne roja · pe: pescado · le: legumbres */
const PLATOS = [
 {id:"mila-ens",n:"Milanesa al horno con ensalada mixta",t:"a",r:1,i:{carne:150,panrallado:25,huevo:25,aceite:5,lechuga:60,tomate:100,cebolla:30,oliva:5}},
 {id:"mila-pollo",n:"Milanesa de pollo al horno con puré de calabaza",t:"a",i:{pechuga:150,panrallado:25,huevo:25,aceite:5,zapallo:250,leche:30,manteca:5}},
 {id:"guiso-lentejas",n:"Guiso de lentejas",t:"a",le:1,s:"4-9",i:{lentejas:200,carne:60,zanahoria:50,cebolla:40,morron:30,papa:80,pure:50,aceite:5}},
 {id:"locro",n:"Locro",t:"a",le:1,r:1,s:"5-8",i:{choclo:60,zapallo:120,porotos:80,carne:70,cebolla:30,aceite:5}},
 {id:"pollo-horno",n:"Pollo al horno con papas y batatas",t:"a",i:{muslo:180,papa:120,batata:100,cebolla:40,aceite:7}},
 {id:"tarta-acelga",n:"Tarta de acelga y huevo con ensalada",t:"a",s:"4-10",i:{tapatarta:70,acelga:150,huevo:35,cebolla:40,queso:15,lechuga:50,tomate:60}},
 {id:"tarta-zapallito",n:"Tarta de zapallitos",t:"a",s:"11-3",i:{tapatarta:70,zapallito:180,huevo:35,cebolla:40,queso:15}},
 {id:"fideos-tuco",n:"Fideos con tuco de carne",t:"a",r:1,i:{fideos:220,picada:70,pure:100,cebolla:30,zanahoria:30,aceite:5,rallado:5}},
 {id:"arroz-pollo",n:"Arroz con pollo y verduras",t:"a",i:{arroz:180,pechuga:100,morron:40,cebolla:40,arvejas:40,zanahoria:30,aceite:5}},
 {id:"merluza-pure",n:"Merluza al horno con puré y ensalada",t:"a",pe:1,i:{merluza:180,papa:200,leche:30,lechuga:50,tomate:100,oliva:7}},
 {id:"bife-ens",n:"Bife con ensalada mixta",t:"a",r:1,i:{carne:170,lechuga:60,tomate:120,cebolla:30,zanahoria:50,oliva:7}},
 {id:"empanadas",n:"Empanadas de carne al horno (2)",t:"a",r:1,i:{tapaemp:60,picada:60,cebolla:40,huevo:10,morron:15,aceite:5}},
 {id:"pizza",n:"Pizza casera de muzzarella (2 porciones)",t:"a",i:{harina:80,muzza:60,pure:40,aceite:5}},
 {id:"ens-completa",n:"Ensalada completa con atún, huevo y choclo",t:"a",pe:1,s:"11-3",i:{lechuga:60,tomate:120,zanahoria:50,huevo:50,atun:60,choclo:50,oliva:7}},
 {id:"zapallitos-rellenos",n:"Zapallitos rellenos",t:"a",s:"11-3",r:1,i:{zapallito:250,picada:60,cebolla:30,queso:15,panrallado:5}},
 {id:"hamb-casera",n:"Hamburguesa casera con ensalada",t:"a",r:1,i:{picada:120,huevo:10,cebolla:20,panhamb:60,lechuga:40,tomate:60}},
 {id:"sopa-verduras",n:"Sopa de verduras con huevo",t:"a",s:"4-9",i:{zapallo:80,zanahoria:60,papa:80,puerro:40,apio:20,cebolla:30,acelga:40,huevo:50}},
 {id:"revuelto-zapallitos",n:"Revuelto de zapallitos",t:"a",s:"11-3",i:{zapallito:250,huevo:100,cebolla:40,aceite:5}},
 {id:"polenta",n:"Polenta con salsa y queso",t:"a",i:{polenta:250,pure:80,queso:20,aceite:5}},
 {id:"asado",n:"Asado con ensalada",t:"a",r:1,i:{asado:200,lechuga:60,tomate:120,cebolla:30,oliva:5}},
 {id:"wok",n:"Wok de pollo y verduras con arroz",t:"a",i:{pechuga:120,brocoli:80,zanahoria:50,morron:50,cebolla:40,arroz:120,aceite:7,soja:10}},
 {id:"pastel-papa",n:"Pastel de papa",t:"a",r:1,s:"4-9",i:{picada:100,papa:250,leche:30,manteca:5,cebolla:40,huevo:10}},
 {id:"tortilla",n:"Tortilla de papas con ensalada",t:"a",i:{papa:200,huevo:75,cebolla:40,aceite:10,lechuga:50,tomate:80}},
 {id:"garbanzos",n:"Guiso de garbanzos con verduras",t:"a",le:1,s:"4-9",i:{garbanzos:180,zapallo:80,zanahoria:50,cebolla:40,morron:30,pure:50,aceite:5}},
 {id:"berenjenas",n:"Berenjenas al horno con queso y arroz",t:"a",s:"12-4",i:{berenjena:250,pure:60,muzza:40,arroz:120,oliva:5}},
 {id:"cerdo-batatas",n:"Lomo de cerdo con batatas al horno",t:"a",s:"3-8",i:{cerdo:150,batata:200,cebolla:40,aceite:7}},
 {id:"lentejas-ens",n:"Ensalada tibia de lentejas y verduras",t:"a",le:1,i:{lentejas:180,tomate:100,cebolla:30,zanahoria:50,huevo:50,oliva:7}},
 {id:"merluza-verduras",n:"Merluza con verduras al vapor",t:"a",pe:1,s:"5-10",i:{merluza:180,brocoli:100,zanahoria:80,papa:120,oliva:7}},
 {id:"mate-pan",n:"Mate con tostadas y queso untable",t:"d",i:{mate:500,panint:60,untable:30}},
 {id:"cafe-tostadas",n:"Café con leche y tostadas con mermelada",t:"d",i:{leche:200,cafe:100,pan:60,mermelada:20}},
 {id:"yogur-avena",n:"Yogur con avena y banana",t:"d",i:{yogur:190,avena:30,banana:100}},
 {id:"yogur-fruta",n:"Yogur con fruta de estación y nueces",t:"d",i:{yogur:190,manzana:150,nueces:15}},
 {id:"licuado",n:"Licuado de banana con leche",t:"d",i:{leche:250,banana:120}},
 {id:"tostadas-palta",n:"Tostadas con palta y huevo",t:"d",i:{panint:60,palta:50,huevo:50,cafe:200}},
 {id:"mate-fruta",n:"Mate con fruta de estación",t:"d",i:{mate:500,naranja:180}},
 {id:"facturas",n:"Café con leche y facturas (2)",t:"d",i:{leche:150,cafe:50,facturas:100,azucar:10}},
 {id:"col-fruta",n:"Fruta de estación",t:"c",i:{manzana:180}},
 {id:"col-frutos",n:"Puñado de frutos secos",t:"c",i:{nueces:15,mani:15}},
 {id:"col-yogur",n:"Yogur natural",t:"c",i:{yogur:190}}
];
const PLATOM = Object.fromEntries(PLATOS.map(x=>[x.id,x]));
const COMIDAS = {desayuno:"Desayuno",almuerzo:"Almuerzo",merienda:"Merienda",cena:"Cena",colacion:"Colación"};

/* ---------- Cálculos ---------- */
function mesActual(){return new Date().getMonth()+1}
function enTemporada(a,m){if(!a.s)return true;const [d,h]=a.s.split("-").map(Number);m=m||mesActual();return d<=h?(m>=d&&m<=h):(m>=d||m<=h)}
function esCeliaco(p){return (p.cond||[]).includes("celiaquia")}
function esDiabetico(p){return (p.cond||[]).includes("diabetes")}
function esMenor(p){return age(p)<18}
// adapta ingredientes a sin TACC si hace falta
function adaptar(ing,p){if(!esCeliaco(p))return {ing,cambios:[]};const out={},cambios=[];
  for(const [id,g] of Object.entries(ing)){const a=ALI[id];if(a&&a.tacc===1){const s=SINTACC[id];if(s){out[s]=(out[s]||0)+g;cambios.push(a.n+" → "+ALI[s].n)}else{cambios.push("sin "+a.n)}}else out[id]=(out[id]||0)+g}
  return {ing:out,cambios}}
function nutri(ing){const t={g:0,kcal:0,hc:0,p:0,gr:0,fib:0,na:0,grupos:{},tacc:0};
  for(const [id,g] of Object.entries(ing)){const a=ALI[id];if(!a)continue;const f=g/100;t.kcal+=a.kcal*f;t.hc+=a.hc*f;t.p+=a.p*f;t.gr+=a.g*f;t.fib+=a.fib*f;t.na+=a.na*f;
    if(a.c!=="bebida"||["gaseosa","jugo"].includes(id))t.g+=g;t.grupos[a.c]=(t.grupos[a.c]||0)+g;if(a.tacc>t.tacc)t.tacc=a.tacc}
  ["kcal","hc","p","gr","fib","na"].forEach(k=>t[k]=Math.round(t[k]*10)/10);return t}
// Calidad del plato (0-100) según el plato saludable de las Guías Alimentarias Argentinas
function calidad(t,tipo){const G=t.grupos,tot=Math.max(1,t.g);const vf=(G.verd||0)+(G.fruta||0);const ultra=G.ultra||0,az=(G.azuc||0);
  let s=50,tips=[];
  const shareVF=vf/tot;s+=Math.min(30,shareVF*60);
  if(tipo!=="d"&&tipo!=="c"&&shareVF<.35)tips.push("Sumá verduras: idealmente la mitad del plato.");
  s+=Math.min(10,t.fib*1.2);
  if(t.p>=15)s+=5;
  if((G.legum||0)>0)s+=5;
  const shareU=ultra/tot;s-=Math.min(40,shareU*70);if(shareU>.2)tips.push("Hay bastante ultraprocesado: reservalo para de vez en cuando.");
  if(az>0){s-=Math.min(20,az*.8);if(az>=10)tips.push("Probá con menos azúcar o con fruta para endulzar.")}
  if(t.na>1500){s-=20;tips.push("Mucha sal: probá con condimentos (orégano, ajo, limón).")}else if(t.na>800)s-=10;
  s=Math.round(Math.max(0,Math.min(100,s)));
  const et=s>=75?"Muy bueno":s>=55?"Bien":s>=35?"Mejorable":"Para de vez en cuando";
  return {s,et,tips}}
function colorCal(s){return s>=75?"#4ade80":s>=55?"#5eead4":s>=35?"#fcd34d":"#fb7185"}
// Calorías de referencia (solo adultos, aproximadas)
function kcalObjetivo(p){if(esMenor(p))return null;const w=+p.weight,h=+p.height,a=age(p);if(!w||!h)return null;
  let bmr=10*w+6.25*h-5*a+(p.sex==="m"?5:p.sex==="f"?-161:-78);const fa=[1.3,1.35,1.4,1.5,1.55,1.65][(p.stage||1)-1];let t=bmr*fa;
  if(p.goal==="peso"){const def=Math.min(500,t*.15);t=Math.max(t-def,bmr,p.sex==="m"?1500:1200)}else if(p.goal==="fuerza")t*=1.05;
  return {kcal:Math.round(t/10)*10,bmr:Math.round(bmr),hc:Math.round(t*.5/4)}}

/* ---------- Registro del día ---------- */
function comidaSugerida(){const h=new Date().getHours();return h<11?"desayuno":h<15?"almuerzo":h<19?"merienda":"cena"}
function itemDesde(tipoFuente,ref,factor,p){let ing={},nombre="",tipo="a";
  if(tipoFuente==="plato"){const pl=PLATOM[ref];nombre=pl.n;tipo=pl.t;for(const [k,g] of Object.entries(pl.i))ing[k]=g*factor}
  else if(tipoFuente==="receta"){const r=recetaPorId(ref);nombre=r.n;tipo="a";for(const [k,g] of Object.entries(r.i))ing[k]=g/Math.max(1,r.por)*factor}
  else {const a=ALI[ref];nombre=a.n;tipo="c";ing[ref]=factor}
  const ad=adaptar(ing,p);const t=nutri(ad.ing);const q=calidad(t,tipo);
  return {id:uid(),src:tipoFuente,ref,f:factor,n:nombre,kcal:Math.round(t.kcal),hc:Math.round(t.hc),p:Math.round(t.p),gr:Math.round(t.gr),fib:Math.round(t.fib*10)/10,na:Math.round(t.na),q:q.s,vf:Math.round((t.grupos.verd||0)+(t.grupos.fruta||0)),tacc:t.tacc,ts:Date.now()}}
function diaComida(p,k){const d=D(p.id,k);d.food=d.food||[];return d.food}
function resumenDia(p,k){const f=(L(p.id).days[k||TODAY()]||{}).food||[];const kcal=f.reduce((a,x)=>a+x.kcal,0),hc=f.reduce((a,x)=>a+x.hc,0),vf=f.reduce((a,x)=>a+x.vf,0);
  const q=kcal?Math.round(f.reduce((a,x)=>a+x.q*Math.max(x.kcal,30),0)/f.reduce((a,x)=>a+Math.max(x.kcal,30),0)):0;return {kcal,hc,vf,q,n:f.length}}

/* ---------- Recetas (propias y de la familia) ---------- */
const RECF={list:[],unsub:null};
function recetasTodas(){const p=P();const own=(p.recipes||[]).map(r=>({...r,own:true}));const fam=RECF.list.filter(r=>!own.some(o=>o.id===r.id));return own.concat(fam)}
function recetaPorId(id){return recetasTodas().find(r=>r.id===id)}
function famRecetasListen(){if(typeof CLOUD==="undefined"||!CLOUD.on||!CLOUD.fid||!CLOUD.db)return;if(RECF.unsub)RECF.unsub();
  RECF.unsub=CLOUD.db.collection("families").doc(CLOUD.fid).collection("recipes").onSnapshot(s=>{RECF.list=s.docs.map(d=>({id:d.id,...d.data()}));if(current==="comer")render()},()=>{})}
async function guardarReceta(r,compartir){const p=P();p.recipes=(p.recipes||[]).filter(x=>x.id!==r.id);
  if(compartir&&CLOUD.on&&CLOUD.fid){try{await CLOUD.db.collection("families").doc(CLOUD.fid).collection("recipes").doc(r.id).set(JSON.parse(JSON.stringify({n:r.n,por:r.por,i:r.i,by:p.name,ts:Date.now()})));toast("Receta compartida con la familia 👨‍👩‍👧")}catch(e){toast("No se pudo compartir: "+(e.code||e.message));p.recipes.push(r)}}
  else p.recipes.push(r);save()}

/* ---------- Plan semanal ---------- */
function armarPlan(p){const m=mesActual();const ref=kcalObjetivo(p);const cel=esCeliaco(p),dia=esDiabetico(p),men=esMenor(p);
  const evalPl=pl=>{const ad=adaptar(pl.i,p);const t=nutri(ad.ing);const q=calidad(t,pl.t);
    const prodTemp=Object.keys(pl.i).filter(k=>ALI[k]&&["verd","fruta","fecula"].includes(ALI[k].c)&&ALI[k].s);const temp=prodTemp.length?prodTemp.filter(k=>enTemporada(ALI[k],m)).length/prodTemp.length:1;
    let sc=q.s+(enTemporada(pl,m)?10:-25)+temp*15+Math.random()*12;
    if(dia&&t.hc>65)sc-=25;if(p.goal==="peso"&&!men&&t.kcal>650)sc-=15;if(cel&&ad.cambios.some(c=>c.startsWith("sin ")))sc-=30;return {pl,t,q,sc,cambios:ad.cambios}};
  const almu=PLATOS.filter(x=>x.t==="a").map(evalPl).sort((a,b)=>b.sc-a.sc);
  const desa=PLATOS.filter(x=>x.t==="d").map(evalPl).filter(x=>!(dia&&x.pl.id==="facturas")).sort((a,b)=>b.sc-a.sc);
  const dias=[];const usados=[];let rojas=0,pesc=0,leg=0;
  const elegir=(k)=>{for(const c of almu){if(usados.slice(-6).includes(c.pl.id))continue;if(c.pl.r&&rojas>=3)continue;usados.push(c.pl.id);if(c.pl.r)rojas++;if(c.pl.pe)pesc++;if(c.pl.le)leg++;return c}return almu[0]};
  for(let i=0;i<7;i++){const k=addDays(TODAY(),i);
    let a=elegir(k),c=elegir(k);
    if(i===3&&pesc===0){const f=almu.find(x=>x.pl.pe);if(f){c=f;pesc++}}
    if(i===5&&leg<2){const f=almu.find(x=>x.pl.le&&!usados.slice(-3).includes(x.pl.id));if(f){a=f;leg++}}
    dias.push({k,desayuno:desa[i%desa.length].pl.id,almuerzo:a.pl.id,merienda:desa[(i+3)%desa.length].pl.id,cena:c.pl.id})}
  return {creado:TODAY(),mes:m,dias,factor:ref?Math.max(.75,Math.min(1.3,ref.kcal/2000)):1}}
function listaCompras(plan,personas,p){const tot={};
  plan.dias.forEach(d=>["desayuno","almuerzo","merienda","cena"].forEach(cm=>{const pl=PLATOM[d[cm]];if(!pl)return;const ad=adaptar(pl.i,p);for(const [k,g] of Object.entries(ad.ing)){tot[k]=(tot[k]||0)+g*personas*(cm==="almuerzo"||cm==="cena"?plan.factor:1)}}));
  const grupos={verd:"🥬 Verdulería",fecula:"🥬 Verdulería",fruta:"🍎 Frutas",prot:"🥩 Carnicería, pollería y pescadería",lact:"🧀 Lácteos y huevos",cereal:"🍞 Almacén",legum:"🍞 Almacén",grasa:"🍞 Almacén",azuc:"🍞 Almacén",cond:"🍞 Almacén",bebida:"🍞 Almacén",ultra:"🍞 Almacén"};
  const out={};for(const [k,g] of Object.entries(tot)){const a=ALI[k];if(!a||["agua","sal","cafe"].includes(k))continue;let grp=grupos[a.c];if(k==="huevo")grp="🧀 Lácteos y huevos";
    let txt;if(k==="huevo")txt=Math.ceil(g/50)+" unidades";else if(a.u.unidad&&["verd","fruta","fecula"].includes(a.c))txt=Math.ceil(g/a.u.unidad)+" unidades (≈"+fmtPeso(g)+")";else if(k==="mate")txt="yerba para "+Math.round(g/500)+" mateadas";else if(a.c==="legum")txt=fmtPeso(g/2.5)+" secas";else if(/^arroz/.test(k))txt=fmtPeso(g/2.7)+" crudo";else if(/^fideos/.test(k))txt=fmtPeso(g/2.3)+" secos";else if(k==="polenta")txt=fmtPeso(g/4.5)+" de harina de maíz";else txt=fmtPeso(g);
    (out[grp]=out[grp]||[]).push({n:a.n.replace(/ cocid[oa]s?$/,"")+(a.tacc===2&&esCeliaco(p)?" (con logo Sin TACC)":""),txt})}
  return out}
function fmtPeso(g){if(g>=1000)return (Math.round(g/100)/10).toLocaleString("es-AR")+" kg";return Math.round(g/10)*10+" g"}

/* ---------- Vista ---------- */
let comerTab="hoy";
function vComer(){const p=P();const ref=kcalObjetivo(p);const r=resumenDia(p);const f=(L(p.id).days[TODAY()]||{}).food||[];
  const tabs=`<div class="tabs2">${[["hoy","Hoy"],["plan","Plan semanal"],["recetas","Recetas"]].map(([k,n])=>`<button class="chip" data-act="ctab" data-v="${k}" style="${comerTab===k?"border-color:var(--mint);background:rgba(94,234,212,.2)":""}">${n}</button>`).join("")}</div>`;
  let body="";
  if(comerTab==="hoy"){
    const porComida=Object.keys(COMIDAS).map(cm=>{const it=f.filter(x=>x.meal===cm);if(!it.length)return "";const hc=it.reduce((a,x)=>a+x.hc,0);
      return `<div class="blockt">${COMIDAS[cm]}${esDiabetico(p)?` · ${hc} g de hidratos`:""}</div>${it.map(x=>`<div class="ex"><span class="ico" style="background:${colorCal(x.q)}33;font-size:15px;font-weight:800">${x.q}</span><span class="t"><b>${esc(x.n)}</b><span>${fracTxt(x)}${esMenor(p)?"":" · "+x.kcal+" kcal"} · HC ${x.hc} g${x.tacc===1&&esCeliaco(p)?' · <span style="color:var(--bad)">⚠ contiene TACC</span>':""}</span></span><button class="iconbtn" data-act="fdel" data-v="${x.id}">✕</button></div>`).join("")}`}).join("");
    const plan=p.plan&&p.plan.dias.find(d=>d.k===TODAY());
    body=`<section class="glass org1"><div class="row" style="gap:14px;justify-content:space-around;text-align:center">
      <div>${ring(r.q/100,colorCal(r.q),104,11,`<div style="font-size:26px;font-weight:800">${r.n?r.q:"–"}</div><div class="xs mute">calidad</div>`)}<div class="xs" style="margin-top:4px">${r.n?etiquetaQ(r.q):"Sin registros"}</div></div>
      ${ref?`<div>${ring(r.kcal/ref.kcal,"#fdba74",104,11,`<div style="font-size:22px;font-weight:800">${r.kcal}</div><div class="xs mute">/ ${ref.kcal} kcal</div>`)}<div class="xs" style="margin-top:4px">referencia</div></div>`:""}
      <div>${ring(r.vf/400,"#a3e635",104,11,`<div style="font-size:22px;font-weight:800">${r.vf}</div><div class="xs mute">/ 400 g</div>`)}<div class="xs" style="margin-top:4px">frutas y verduras</div></div></div>
      ${esDiabetico(p)?`<p class="sm" style="margin-top:12px">🩸 Hidratos de hoy: <b>${r.hc} g</b>${ref?` · referencia diaria ≈ ${ref.hc} g`:""}. Repartilos según el esquema que te indicó tu médico.</p>`:""}
      ${esMenor(p)?`<p class="xs mute" style="margin-top:10px">En chicos y adolescentes Vital no cuenta calorías: mira que el plato sea variado y con frutas y verduras.</p>`:!ref?`<p class="xs mute" style="margin-top:10px">Completá peso y altura en tu perfil para ver una referencia de calorías.</p>`:`<p class="xs faint" style="margin-top:10px">Referencia aproximada según tu peso, altura, edad, etapa y objetivo. No reemplaza la indicación de un nutricionista.</p>`}
      <button class="btn block" style="margin-top:12px" data-act="fadd">+ Registrar comida</button>
      ${plan?`<div class="row wrap" style="gap:6px;margin-top:10px"><span class="xs mute">Del plan de hoy:</span>${["almuerzo","cena"].map(cm=>`<button class="chip" data-act="fplan" data-v="${cm}">${COMIDAS[cm]}: ${esc(PLATOM[plan[cm]].n.split(" ").slice(0,3).join(" "))}…</button>`).join("")}</div>`:""}</section>
    ${porComida?`<section class="glass org2"><h2>Lo que comiste hoy</h2>${porComida}</section>`:""}
    ${semanaCalidad(p)}`}
  else if(comerTab==="plan"){const pl=p.plan;
    if(!pl)body=`<section class="glass org1"><h2>Plan de comidas de la semana</h2><p class="sm mute">Comidas argentinas de todos los días, con verduras y frutas de temporada en Cuyo, adaptadas a tu objetivo${esCeliaco(p)?", sin TACC":""}${esDiabetico(p)?" y cuidando los hidratos":""}. Incluye lista de compras.</p><button class="btn block" data-act="pgen">✨ Armar mi plan</button></section>`;
    else{const hoyI=pl.dias.findIndex(d=>d.k===TODAY());
      body=`<section class="glass org1"><div class="row between"><h2 style="margin:0">Tu semana</h2><button class="btn small ghost" data-act="pgen">↻ Rehacer</button></div>
      ${esCeliaco(p)?`<p class="note" style="margin-top:10px">🌾 Sin TACC: usá solo productos con el logo oficial. Cociná aparte lo sin TACC (tablas, utensilios, aceite y agua de cocción separados) para evitar la contaminación cruzada.</p>`:""}
      ${pl.dias.map((d,i)=>`<details ${i===Math.max(0,hoyI)?"open":""} style="margin-top:10px;padding:10px 12px;border-radius:18px;background:rgba(255,255,255,.05)"><summary class="sm"><b>${new Date(d.k+"T12:00").toLocaleDateString("es-AR",{weekday:"long",day:"numeric"})}</b>${d.k===TODAY()?' <span class="pill">hoy</span>':""}</summary>
        ${["desayuno","almuerzo","merienda","cena"].map(cm=>{const x=PLATOM[d[cm]];const ad=adaptar(x.i,p);const t=nutri(ad.ing);const q=calidad(t,x.t);const fac=(cm==="almuerzo"||cm==="cena")?pl.factor:1;
          return `<div class="row between" style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,.06);gap:8px"><span class="sm"><span class="xs mute">${COMIDAS[cm]}</span><br>${esc(x.n)}${ad.cambios.length?`<br><span class="xs" style="color:var(--lime)">Sin TACC: ${esc(ad.cambios.join(", "))}</span>`:""}</span><span class="xs" style="text-align:right;white-space:nowrap"><b style="color:${colorCal(q.s)}">${q.s}</b>${esMenor(p)?"":"<br>"+Math.round(t.kcal*fac)+" kcal"}${esDiabetico(p)?"<br>HC "+Math.round(t.hc*fac)+" g":""}</span></div>`}).join("")}
      </details>`).join("")}</section>
      <section class="glass org2"><h2>🛒 Lista de compras</h2><label class="f">¿Para cuántas personas?</label><div class="opts">${[1,2,3,4,5,6].map(n=>`<button class="opt ${(p.planPersonas||2)===n?"on":""}" data-act="ppers" data-v="${n}">${n}</button>`).join("")}</div><button class="btn block" style="margin-top:12px" data-act="plista">Ver lista de la semana</button></section>`}}
  else{const rs=recetasTodas();
    body=`<section class="glass org1"><div class="row between"><h2 style="margin:0">Recetas de casa</h2><button class="btn small" data-act="rnew">+ Nueva</button></div><p class="xs mute" style="margin-top:6px">Cargá una vez la receta como la cocinan en tu casa (para toda la olla) y después registrala con un toque. Vital calcula calorías, hidratos y calidad por porción.</p>
      ${rs.length?rs.map(r=>{const t=nutri(adaptar(Object.fromEntries(Object.entries(r.i).map(([k,g])=>[k,g/Math.max(1,r.por)])),p).ing);const q=calidad(t,"a");return `<div class="ex"><span class="ico" style="background:${colorCal(q.s)}33;font-size:15px;font-weight:800">${q.s}</span><span class="t"><b>${esc(r.n)}</b><span>${r.por} porciones · ${esMenor(p)?"":Math.round(t.kcal)+" kcal · "}HC ${Math.round(t.hc)} g por porción${r.own?"":" · de "+esc(r.by||"la familia")}</span></span>${r.own?`<button class="iconbtn" data-act="redit" data-v="${r.id}">✎</button>`:""}</div>`}).join(""):`<p class="sm mute" style="margin-top:10px">Todavía no hay recetas. Probá con la que más se repite en tu casa.</p>`}</section>`}
  return `<section><h1>Comer</h1><p class="mute">Comida casera, de temporada y a tu medida.</p></section>${tabs}${body}`}
function etiquetaQ(s){return s>=75?"Muy bueno":s>=55?"Bien":s>=35?"Mejorable":"Para de vez en cuando"}
function fracTxt(x){if(x.src==="alimento")return Math.round(x.f)+" g";return ({0.5:"½ porción",0.75:"¾ porción",1:"1 porción",1.5:"1½ porciones",2:"2 porciones"})[x.f]||x.f+" porciones"}
function semanaCalidad(p){const ws=startOfWeek(TODAY());const ds=["L","M","M","J","V","S","D"].map((n,i)=>{const k=addDays(ws,i);const r=resumenDia(p,k);return {n,k,r}});if(!ds.some(d=>d.r.n))return "";
  return `<section class="glass org3"><h2>Calidad de la semana</h2><div class="bars" style="height:90px">${ds.map(d=>`<div class="bc"><span>${d.r.n?d.r.q:""}</span><i style="height:${Math.max(3,d.r.q*.6)}px;background:${d.r.n?colorCal(d.r.q):"rgba(255,255,255,.1)"}"></i>${d.n}</div>`).join("")}</div></section>`}

/* ---------- Hojas ---------- */
let FSEL=null,RED=null;
function abrirRegistrar(meal){FSEL={meal:meal||comidaSugerida(),q:""};dibRegistrar()}
function dibRegistrar(){const p=P();const q=(FSEL.q||"").toLowerCase();const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");const qq=norm(q);
  const pls=PLATOS.filter(x=>!qq||norm(x.n).includes(qq)).filter(x=>FSEL.meal==="desayuno"||FSEL.meal==="merienda"?x.t!=="a"||qq:FSEL.meal==="colacion"?x.t==="c"||qq:x.t==="a"||qq);
  const rs=recetasTodas().filter(x=>!qq||norm(x.n).includes(qq));const als=qq.length>=2?Object.values(ALI).filter(a=>norm(a.n).includes(qq)).slice(0,12):[];
  sheet(`<h2>Registrar comida</h2><div class="opts" style="margin-bottom:10px">${Object.entries(COMIDAS).map(([k,n])=>`<button class="opt ${FSEL.meal===k?"on":""}" data-act="fmeal" data-v="${k}">${n}</button>`).join("")}</div>
  <input class="in" id="fq" placeholder="Buscar: milanesa, ensalada, banana…" value="${esc(FSEL.q)}" autocomplete="off">
  <div id="fres" style="margin-top:10px">${rs.length?`<div class="blockt">Recetas de casa</div>${rs.slice(0,8).map(r=>`<button class="ex" data-act="fpick" data-v="receta:${r.id}"><span class="ico">🏠</span><span class="t"><b>${esc(r.n)}</b><span>${r.por} porciones</span></span>›</button>`).join("")}`:""}
  ${pls.length?`<div class="blockt">Platos</div>${pls.slice(0,14).map(x=>`<button class="ex" data-act="fpick" data-v="plato:${x.id}"><span class="ico">🍽️</span><span class="t"><b>${esc(x.n)}</b></span>›</button>`).join("")}`:""}
  ${als.length?`<div class="blockt">Alimentos sueltos</div>${als.map(a=>`<button class="ex" data-act="fpick" data-v="alimento:${a.id}"><span class="ico">🥕</span><span class="t"><b>${esc(a.n)}</b><span>${a.kcal} kcal cada 100 g</span></span>›</button>`).join("")}`:qq.length<2?`<p class="xs faint">Escribí al menos 2 letras para buscar alimentos sueltos (fruta, pan, gaseosa…).</p>`:""}</div>`);
  const i=$("#fq");if(i){i.addEventListener("input",()=>{FSEL.q=i.value;clearTimeout(FSEL.t);FSEL.t=setTimeout(()=>{dibRegistrar();const j=$("#fq");if(j){j.focus();j.setSelectionRange(j.value.length,j.value.length)}},250)})}}
function abrirPorcion(src,ref){const p=P();FSEL.src=src;FSEL.ref=ref;FSEL.f=src==="alimento"?(Object.values(ALI[ref].u)[0]||100):1;dibPorcion()}
function dibPorcion(){const p=P();const it=itemDesde(FSEL.src,FSEL.ref,FSEL.f,p);const a=FSEL.src==="alimento"?ALI[FSEL.ref]:null;
  const ad=FSEL.src==="plato"?adaptar(PLATOM[FSEL.ref].i,p):FSEL.src==="receta"?adaptar(recetaPorId(FSEL.ref).i,p):adaptar({[FSEL.ref]:1},p);
  sheet(`<h2>${esc(it.n)}</h2><p class="xs mute">${COMIDAS[FSEL.meal]}</p>
  ${a?`<label class="f">Cantidad</label><div class="opts">${Object.entries(a.u).map(([u,g])=>[1,2].map(n=>`<button class="opt ${FSEL.f===g*n?"on":""}" data-act="ffac" data-v="${g*n}">${n} ${u}</button>`).join("")).join("")}${[50,100,200].map(g=>`<button class="opt ${FSEL.f===g?"on":""}" data-act="ffac" data-v="${g}">${g} g</button>`).join("")}</div>`
   :`<label class="f">Porción</label><div class="opts">${[.5,.75,1,1.5,2].map(v=>`<button class="opt ${FSEL.f===v?"on":""}" data-act="ffac" data-v="${v}">${({0.5:"½",0.75:"¾",1:"1",1.5:"1½",2:"2"})[v]}</button>`).join("")}</div>`}
  <div class="grid3" style="margin-top:14px;text-align:center">
   <div class="stat"><span class="xs mute">Calidad</span><b style="color:${colorCal(it.q)}">${it.q}</b><span class="xs">${etiquetaQ(it.q)}</span></div>
   ${esMenor(P())?"":`<div class="stat"><span class="xs mute">Calorías</span><b>${it.kcal}</b><span class="xs">kcal</span></div>`}
   <div class="stat"><span class="xs mute">Hidratos</span><b>${it.hc} g</b><span class="xs">${Math.round(it.hc/15*10)/10} porc. de 15 g</span></div></div>
  <p class="xs mute" style="margin-top:10px">Proteínas ${it.p} g · Grasas ${it.gr} g · Fibra ${it.fib} g · Sodio ${it.na} mg</p>
  ${ad.cambios.length?`<p class="note green" style="margin-top:8px">🌾 Calculado en versión sin TACC: ${esc(ad.cambios.join(", "))}.</p>`:""}
  ${it.tacc===2&&esCeliaco(P())?`<p class="note" style="margin-top:8px">Verificá que tenga el logo Sin TACC.</p>`:""}
  ${calidadTips(FSEL,P()).map(t=>`<p class="sm">💡 ${esc(t)}</p>`).join("")}
  <div class="row" style="margin-top:14px"><button class="btn ghost" data-act="fadd">Volver</button><button class="btn" style="flex:1" data-act="fsave">Agregar</button></div>`)}
function calidadTips(F,p){let ing;if(F.src==="plato")ing=PLATOM[F.ref].i;else if(F.src==="receta"){const r=recetaPorId(F.ref);ing=Object.fromEntries(Object.entries(r.i).map(([k,g])=>[k,g/Math.max(1,r.por)]))}else ing={[F.ref]:F.f};
  const t=nutri(adaptar(ing,p).ing);return calidad(t,F.src==="plato"?PLATOM[F.ref].t:"a").tips.slice(0,2)}

/* Editor de recetas */
function abrirReceta(id){const r=id?recetasTodas().find(x=>x.id===id):null;RED=r?{id:r.id,n:r.n,por:r.por,i:{...r.i},share:false,q:"",nueva:false}:{id:uid(),n:"",por:4,i:{},share:!!(CLOUD.on&&CLOUD.fid),q:"",nueva:true};dibReceta()}
function dibReceta(){const p=P();const qq=(RED.q||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");const res=qq.length>=2?Object.values(ALI).filter(a=>a.n.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").includes(qq)).slice(0,8):[];
  const por=Object.fromEntries(Object.entries(RED.i).map(([k,g])=>[k,g/Math.max(1,RED.por)]));const t=nutri(adaptar(por,p).ing);const q=calidad(t,"a");
  sheet(`<h2>${RED.nueva?"Nueva receta":"Editar receta"}</h2>
  <label class="f">Nombre</label><input class="in" id="rn" value="${esc(RED.n)}" placeholder="Ej.: Guiso de la abuela">
  <label class="f">¿Para cuántas porciones es la olla?</label><div class="opts">${[1,2,3,4,5,6,8,10].map(n=>`<button class="opt ${RED.por===n?"on":""}" data-act="rpor" data-v="${n}">${n}</button>`).join("")}</div>
  <label class="f">Ingredientes (para toda la receta)</label>
  ${Object.entries(RED.i).map(([k,g])=>`<div class="row between sm" style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>${esc(ALI[k].n)}</span><span class="row" style="gap:6px"><input class="in" style="width:86px;padding:8px" inputmode="numeric" data-ring="${k}" value="${Math.round(g)}"> g<button class="iconbtn" style="width:30px;height:30px;font-size:12px" data-act="rdel" data-v="${k}">✕</button></span></div>`).join("")||'<p class="xs faint">Todavía sin ingredientes.</p>'}
  <input class="in" id="rq" style="margin-top:10px" placeholder="Agregar ingrediente: papa, carne, aceite…" value="${esc(RED.q)}" autocomplete="off">
  <div>${res.map(a=>`<button class="chip" style="margin:6px 6px 0 0" data-act="radd" data-v="${a.id}">+ ${esc(a.n)} <span class="faint">(${Object.entries(a.u).map(([u,g])=>"1 "+u+" = "+g+" g")[0]})</span></button>`).join("")}</div>
  ${Object.keys(RED.i).length?`<div class="grid3" style="margin-top:14px;text-align:center"><div class="stat"><span class="xs mute">Calidad</span><b style="color:${colorCal(q.s)}">${q.s}</b></div>${esMenor(p)?"":`<div class="stat"><span class="xs mute">Por porción</span><b>${Math.round(t.kcal)}</b><span class="xs">kcal</span></div>`}<div class="stat"><span class="xs mute">Hidratos</span><b>${Math.round(t.hc)} g</b><span class="xs">por porción</span></div></div>${q.tips.slice(0,2).map(x=>`<p class="sm" style="margin-top:6px">💡 ${esc(x)}</p>`).join("")}`:""}
  ${CLOUD.on&&CLOUD.fid?`<button class="row between" data-act="rshare" style="width:100%;background:none;border:0;padding:12px 0;text-align:left"><span class="sm">Compartir con la familia</span><span class="pill" style="${RED.share?"background:var(--mint);color:#062026":""}">${RED.share?"Sí":"No"}</span></button>`:""}
  <button class="btn block" style="margin-top:10px" data-act="rsave">Guardar receta</button>`);
  const rq=$("#rq");if(rq)rq.addEventListener("input",()=>{RED.q=rq.value;clearTimeout(RED.t);RED.t=setTimeout(()=>{leerReceta();dibReceta();const j=$("#rq");if(j){j.focus();j.setSelectionRange(j.value.length,j.value.length)}},250)});
  const rn=$("#rn");if(rn)rn.addEventListener("input",()=>{RED.n=rn.value})}
function leerReceta(){document.querySelectorAll("[data-ring]").forEach(i=>{const v=parseFloat(i.value);if(v>0)RED.i[i.dataset.ring]=v});const rn=$("#rn");if(rn)RED.n=rn.value.trim()}
function mostrarLista(){const p=P();const L2=listaCompras(p.plan,p.planPersonas||2,p);const txt=Object.entries(L2).map(([g,it])=>g+"\n"+it.map(x=>"• "+x.n+": "+x.txt).join("\n")).join("\n\n");
  sheet(`<h2>🛒 Lista de compras</h2><p class="xs mute">Para ${p.planPersonas||2} persona${(p.planPersonas||2)>1?"s":""}, 7 días. Cantidades aproximadas.</p>${Object.entries(L2).map(([g,it])=>`<div class="blockt">${g}</div>${it.map(x=>`<div class="row between sm" style="padding:5px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>${esc(x.n)}</span><b>${esc(x.txt)}</b></div>`).join("")}`).join("")}
  <textarea id="lst" style="position:absolute;left:-9999px">${esc(txt)}</textarea><button class="btn block" style="margin-top:14px" data-act="lcopy">Copiar para WhatsApp</button>`)}

/* ---------- Acciones ---------- */
window.comerAct=function(a,v){const p=P();
  switch(a){
  case "ctab":comerTab=v;render();return true;
  case "fadd":abrirRegistrar(FSEL&&FSEL.meal);return true;
  case "fmeal":FSEL.meal=v;dibRegistrar();return true;
  case "fpick":{const [s,r]=v.split(":");abrirPorcion(s,r);return true}
  case "ffac":FSEL.f=+v;dibPorcion();return true;
  case "fsave":{const it=itemDesde(FSEL.src,FSEL.ref,FSEL.f,p);it.meal=FSEL.meal;diaComida(p).push(it);save();closeSheet();comerTab="hoy";if(current!=="comer")location.hash="#comer";else render();toast("Anotado · calidad "+it.q);return true}
  case "fdel":{const d=D(p.id);d.food=(d.food||[]).filter(x=>x.id!==v);save();render();return true}
  case "fplan":{const pl=p.plan.dias.find(d=>d.k===TODAY());const it=itemDesde("plato",pl[v],p.plan.factor,p);it.meal=v;diaComida(p).push(it);save();render();toast("Anotado: "+it.n);return true}
  case "pgen":p.plan=armarPlan(p);save();render();toast("Plan armado con productos de temporada");return true;
  case "ppers":p.planPersonas=+v;save();render();return true;
  case "plista":mostrarLista();return true;
  case "lcopy":{const t=$("#lst").value;try{navigator.clipboard.writeText(t).then(()=>toast("Lista copiada ✓"),()=>toast("No se pudo copiar"))}catch(e){toast("No se pudo copiar")}return true}
  case "rnew":abrirReceta(null);return true;
  case "redit":abrirReceta(v);return true;
  case "rpor":leerReceta();RED.por=+v;dibReceta();return true;
  case "radd":{leerReceta();const a=ALI[v];RED.i[v]=(RED.i[v]||0)+(Object.values(a.u)[0]||100);RED.q="";dibReceta();return true}
  case "rdel":leerReceta();delete RED.i[v];dibReceta();return true;
  case "rshare":leerReceta();RED.share=!RED.share;dibReceta();return true;
  case "rsave":{leerReceta();if(!RED.n){toast("Ponele un nombre");return true}if(!Object.keys(RED.i).length){toast("Agregá ingredientes");return true}
    guardarReceta({id:RED.id,n:RED.n,por:RED.por,i:RED.i},RED.share).then(()=>{closeSheet();comerTab="recetas";render()});return true}
  }
  return false};
