/* =========================================================
   VITAL · Comer 2
   - Alimentación vegetariana y vegana (perfil p.dieta).
   - Alimentos y platos nuevos (soja, tofu, quinoa, hummus, salmón, pavo…).
   - Nombres por país (España / Canadá) e inglés, productos que no se
     consiguen fuera de Argentina y temporadas del hemisferio norte.
   - Registro rápido: foto del plato con IA, código de barras
     (Open Food Facts) y alimentos cargados a mano.
   - Ayuno intermitente (12, 14 o 16 h) con controles de seguridad.
   Se carga después de comer.js y envuelve sus funciones.
   ========================================================= */
"use strict";
(function(){
const LC=window.LOC||{lang:"es-AR",pais:"AR",norte:false,nombres:"ar"};

/* ---------- Alimentos nuevos (por 100 g) ---------- */
[
 ["tofu","Tofu firme","prot",120,2,13,7,1,10,0,{porción:100}],
 ["pst","Proteína de soja texturizada (hidratada)","legum",110,10,17,.4,5.6,4,2,{taza:100}],
 ["seitan","Seitán","prot",140,4,25,2,.6,300,1,{porción:100}],
 ["quinoa","Quinoa cocida","cereal",120,21.3,4.4,1.9,2.8,7,2,{taza:180}],
 ["bebveg","Bebida vegetal (soja o avena, sin azúcar)","lact",40,3,3,1.8,.5,40,2,{vaso:250,taza:200}],
 ["yogurveg","Yogur vegetal","lact",66,8,3.5,2,.6,30,2,{unidad:125}],
 ["hummus","Hummus","legum",170,14,7.5,9.6,6,380,0,{cda:20}],
 ["salmon","Salmón","prot",206,0,22,13,0,60,0,{porción:150}],
 ["pavo","Pavo (pechuga)","prot",135,0,30,1,0,50,0,{porción:150,feta:20}],
 ["arandanos","Arándanos","fruta",57,14.5,.7,.3,2.4,1,0,{taza:150},"10-1"],
 ["pmani","Pasta de maní","grasa",590,20,25,50,6,400,2,{cda:16}],
 ["arce","Jarabe de arce","azuc",260,67,0,0,0,12,0,{cda:20}],
 ["aceitunas","Aceitunas","grasa",145,3.8,1,15,3.3,1500,0,{unidad:4}],
 // Pastas frescas y rellenas (por 100 g como se compran, frescas)
 ["noquis","Ñoquis de papa","cereal",150,31,4,1,1.8,300,1,{porción:250}],
 ["noquisst","Ñoquis sin TACC","cereal",160,33,2.5,1.5,1.5,300,0,{porción:250}],
 ["ravioles","Ravioles de ricota y verdura","cereal",250,38,10,6.5,2,450,1,{porción:150}],
 ["raviolescarne","Ravioles de carne o pollo","cereal",260,36,11.5,7.5,1.5,480,1,{porción:150}],
 ["raviolesst","Ravioles sin TACC","cereal",230,34,7,7,1.5,400,0,{porción:150}],
 ["agnolotis","Agnolotis de ricota","cereal",265,38,11,7.5,1.5,450,1,{porción:150}],
 ["sorrentinos","Sorrentinos de jamón y queso","cereal",255,33,11,8.5,1.3,600,1,{porción:180}],
 ["capeletis","Capeletis de carne o pollo","cereal",280,40,12,8,1.5,500,1,{porción:150}],
 ["canelones","Canelones de verdura (sin salsa)","cereal",160,18,8,6,1.5,300,1,{unidad:120}],
 ["tallarines","Tallarines al huevo cocidos","cereal",150,27,5.8,1.8,1.5,10,1,{plato:220}],
 ["lasana","Masa de lasaña cocida","cereal",150,29,5.5,1,1.5,5,1,{plancha:40}]
].forEach(a=>{ALI[a[0]]={id:a[0],n:a[1],c:a[2],kcal:a[3],hc:a[4],p:a[5],g:a[6],fib:a[7],na:a[8],tacc:a[9],u:a[10],s:a[11]}});

/* ---------- Cortes de carne (Argentina, España, Italia) ----------
   Por 100 g crudos, como se compran (con hueso cuando el corte lo trae).
   Valores aproximados de tablas de composición (ARGENFOODS / USDA). */
const CORTES=[
 // vacunos
 ["lomo","Lomo (filet)",140,21,6,{porción:180}],
 ["bifeangosto","Bife angosto / bife de chorizo",180,20.5,11,{unidad:250}],
 ["bifeancho","Bife ancho / ojo de bife",230,18.5,17,{unidad:250}],
 ["costeleta","Costeleta / T-bone (con hueso)",180,15.5,13,{unidad:350}],
 ["cuadril","Cuadril",160,20.5,8.5,{porción:180}],
 ["colita","Colita de cuadril",150,20.5,7.5,{porción:180}],
 ["tapacuadril","Tapa de cuadril (picaña)",215,19,15,{porción:180}],
 ["tapanalga","Tapa de nalga",165,21,9,{porción:180}],
 ["roastbeef","Roast beef",200,19,13,{porción:180}],
 ["paleta","Paleta / palomita",160,20,8.5,{porción:180}],
 ["carnaza","Carnaza",145,21,6.5,{porción:180}],
 ["osobuco","Osobuco (con hueso)",115,15,5.5,{rodaja:300}],
 ["vacio","Vacío",230,18,17,{porción:250}],
 ["matambre","Matambre",230,19,17,{porción:200}],
 ["entrana","Entraña",220,18,16,{porción:200}],
 ["tapaasado","Tapa de asado",220,18,16,{porción:200}],
 ["falda","Falda (con hueso)",250,15,21,{porción:250}],
 ["rabo","Rabo (cola, con hueso)",190,14,15,{porción:300}],
 ["picadacomun","Carne picada común",260,17,21,{porción:120}],
 ["lengua","Lengua",220,15,17,{porción:150}],
 ["higado","Hígado",135,20,3.6,{porción:150},3.9],
 ["mondongo","Mondongo (callos)",85,12,3.7,{porción:200}],
 ["molleja","Molleja",230,12,20,{porción:150}],
 ["chinchulin","Chinchulines",300,12,28,{porción:150}],
 ["morcilla","Morcilla",380,14,34,{unidad:100},1.3,680],
 // cerdo
 ["solomillocerdo","Solomillo de cerdo (filet)",120,21,3.5,{porción:180}],
 ["bondiola","Bondiola (presa, coppa)",230,17,18,{porción:200}],
 ["carre","Carré / costeleta de cerdo (con hueso)",190,19,12,{unidad:200}],
 ["pechito","Pechito / costillas de cerdo",280,16,23,{porción:300}],
 ["matambrecerdo","Matambre de cerdo",210,18,15,{porción:200}],
 ["panceta","Panceta / bacon / guanciale",460,14,44,{feta:15},0,1600],
 ["jamoncrudo","Jamón crudo / serrano / prosciutto",250,28,15,{feta:15},0,2300],
 ["salame","Salame / salami",400,22,33,{feta:10},1,1800],
 // otros
 ["cordero","Cordero",230,17,18,{porción:250}],
 ["chivito","Chivito",145,20,6,{porción:250}],
 ["pollopiel","Pollo con piel (presas)",215,18,15,{porción:250}],
 ["alitas","Alitas de pollo",200,18,14,{unidad:40}],
 ["conejo","Conejo",135,21,5.5,{porción:200}]
];
CORTES.forEach(([id,n,kcal,pr,g,u,hc,na])=>{ALI[id]={id,n,c:["panceta","jamoncrudo","salame","morcilla"].includes(id)?"ultra":"prot",kcal,hc:hc||0,p:pr,g,fib:0,na:na||60,tacc:["salame","morcilla"].includes(id)?2:0,u}});

/* ---------- Platos nuevos ----------
   x: países donde NO se muestran en el plan · solo: únicos países */
[
 {id:"lentejas-veg",n:"Guiso de lentejas vegano",t:"a",le:1,s:"4-9",i:{lentejas:220,zanahoria:60,cebolla:40,morron:30,papa:80,zapallo:60,pure:50,aceite:6}},
 {id:"mila-berenjena",n:"Milanesas de berenjena al horno con ensalada",t:"a",s:"12-4",i:{berenjena:200,panrallado:30,huevo:30,aceite:5,lechuga:60,tomate:100,queso:20}},
 {id:"hamb-lentejas",n:"Hamburguesas de lentejas con ensalada",t:"a",le:1,i:{lentejas:150,avena:20,cebolla:30,zanahoria:40,panhamb:60,lechuga:40,tomate:60,aceite:5}},
 {id:"wok-tofu",n:"Wok de tofu y verduras con arroz",t:"a",i:{tofu:130,brocoli:80,zanahoria:50,morron:50,cebolla:40,arroz:130,aceite:7,soja:10}},
 {id:"fideos-soja",n:"Fideos con boloñesa de soja",t:"a",le:1,i:{fideos:220,pst:90,pure:100,cebolla:30,zanahoria:30,aceite:6,rallado:5}},
 {id:"ens-garbanzos",n:"Ensalada de garbanzos, tomate y palta",t:"a",le:1,s:"11-3",i:{garbanzos:150,tomate:120,cebolla:30,palta:50,lechuga:40,oliva:7}},
 {id:"quinoa-verd",n:"Quinoa con verduras salteadas y huevo",t:"a",i:{quinoa:180,zucchini:100,morron:50,cebolla:40,huevo:50,oliva:7}},
 {id:"pastel-lentejas",n:"Pastel de papa y lentejas",t:"a",le:1,s:"4-9",i:{lentejas:130,papa:250,leche:30,manteca:5,cebolla:40,zanahoria:40}},
 {id:"empanadas-verdura",n:"Empanadas de verdura al horno (2)",t:"a",s:"4-10",i:{tapaemp:60,acelga:100,cebolla:40,queso:20,huevo:10}},
 {id:"paella-verd",n:"Paella de verduras",t:"a",i:{arroz:200,morron:50,arvejas:40,chaucha:40,tomate:60,cebolla:30,oliva:8}},
 {id:"gazpacho",n:"Gazpacho con tostadas y huevo duro",t:"a",s:"12-3",i:{tomate:250,pepino:60,morron:40,ajo:3,oliva:10,pan:40,huevo:50}},
 {id:"pisto",n:"Pisto de verduras con huevo",t:"a",s:"12-4",i:{zucchini:150,morron:60,cebolla:50,tomate:150,oliva:8,huevo:50,pan:40}},
 {id:"salmon-verd",n:"Salmón al horno con papas y brócoli",t:"a",pe:1,i:{salmon:150,papa:150,brocoli:100,oliva:5}},
 {id:"pavo-arroz",n:"Pavo a la plancha con arroz y ensalada",t:"a",i:{pavo:150,arroz:130,lechuga:50,tomate:80,oliva:6}},
 {id:"tofu-ens",n:"Ensalada de quinoa, tofu y verduras",t:"a",i:{quinoa:120,tofu:100,tomate:100,pepino:60,zanahoria:50,oliva:7}},
 {id:"avena-veg",n:"Avena con bebida vegetal y fruta",t:"d",i:{avena:40,bebveg:200,banana:100}},
 {id:"tostadas-hummus",n:"Tostadas con hummus y tomate",t:"d",i:{panint:60,hummus:40,tomate:80,cafe:200}},
 {id:"yogurveg-frutos",n:"Yogur vegetal con arándanos y nueces",t:"d",i:{yogurveg:125,arandanos:80,nueces:15}},
 {id:"tostadas-mani",n:"Tostadas con pasta de maní y banana",t:"d",i:{panint:60,pmani:16,banana:100,cafe:200}},
 {id:"avena-arce",n:"Avena con leche, arándanos y jarabe de arce",t:"d",i:{avena:40,leche:200,arandanos:60,arce:10},solo:["CA"]},
 {id:"col-hummus",n:"Bastones de zanahoria con hummus",t:"c",i:{zanahoria:100,hummus:40}},
 {id:"osobuco-risotto",n:"Osobuco braseado con risotto",t:"a",r:1,s:"4-9",i:{osobuco:350,arroz:150,cebolla:40,zanahoria:30,pure:60,manteca:8,rallado:10,vino:30}},
 {id:"noquis-fileto",n:"Ñoquis con salsa de tomate",t:"a",i:{noquis:250,pure:100,cebolla:30,aceite:5,rallado:5}},
 {id:"ravioles-fileto",n:"Ravioles de verdura con salsa fileto y ensalada",t:"a",i:{ravioles:170,pure:100,cebolla:30,aceite:5,rallado:5,lechuga:50,tomate:80}},
 {id:"col-aceitunas",n:"Tomates cherry con aceitunas",t:"c",i:{tomate:120,aceitunas:20}}
].forEach(x=>{PLATOS.push(x);PLATOM[x.id]=x});
Object.assign(SINTACC,{noquis:"noquisst",ravioles:"raviolesst",raviolescarne:"raviolesst",agnolotis:"raviolesst",sorrentinos:"raviolesst",capeletis:"raviolesst",canelones:"raviolesst",tallarines:"fideosst",lasana:"fideosst"});
["mate-pan","mate-fruta"].forEach(id=>{if(PLATOM[id])PLATOM[id].solo=["AR"]});
if(PLATOM.facturas)PLATOM.facturas.noveg=1;   // facturas: llevan grasa animal o manteca

/* ---------- Dieta ---------- */
const PESC=new Set(["merluza","atun","salmon","langostinos","mariscos","sardinas"]);
const CARNE=new Set(["langostinos","mariscos","sardinas","pechuga","muslo","carne","asado","picada","cerdo","merluza","atun","jamon","chorizo","salchicha","hambcong","salmon","pavo","raviolescarne","sorrentinos","capeletis",...CORTES.map(c=>c[0])]);
const ANIMAL=new Set(["lechepolvo","lechesl","yogursl","huevo","queso","muzza","rallado","untable","ricota","leche","lechedesc","yogur","manteca","mayonesa","miel","ddl","facturas","bizcochitos","alfajor","galledulce","caldo","noquis","noquisst","ravioles","raviolesst","agnolotis","canelones","tallarines","lasana"]);
function dietaDe(ing){const ks=Object.keys(ing);if(ks.some(k=>CARNE.has(k)))return "omni";if(ks.some(k=>ANIMAL.has(k)))return "veggie";return "vegano"}
function apto(pl,p){const d=(p&&p.dieta)||"";const dd=dietaDe(pl.i);
  if(d==="pesce"&&Object.keys(pl.i).some(k=>CARNE.has(k)&&!PESC.has(k)))return false;
  if(d==="veggie"&&dd==="omni")return false;if(d==="vegano"&&(dd!=="vegano"||pl.noveg))return false;return true}
function enPais(pl){if(pl.solo&&!pl.solo.includes(LC.pais))return false;if(pl.x&&pl.x.includes(LC.pais))return false;return true}
window.dietaDe=dietaDe;window.platoApto=apto;
const DIETAS={"":"Como de todo",flexi:"Flexitariana (poca carne)",medit:"Mediterránea",pesce:"Pescetariana (sin carne, con pescado)",veggie:"Vegetariana",vegano:"Vegana",prote:"Alta en proteína",lowcarb:"Baja en hidratos"};window.DIETAS=DIETAS;
window.DIETA_ICO={flexi:"🌿 ",medit:"🫒 ",pesce:"🐟 ",veggie:"🌱 ",vegano:"🌱 ",prote:"💪 ",lowcarb:"🥗 "};
function conPlatos(lista,fn){const bak=PLATOS.slice();PLATOS.length=0;PLATOS.push(...lista);try{return fn()}finally{PLATOS.length=0;PLATOS.push(...bak)}}

/* ---------- Nombres por país e idioma ---------- */
const N_ES={lomo:"Solomillo de ternera",bifeangosto:"Lomo bajo / entrecot",bifeancho:"Lomo alto / entrecot de lomo alto",costeleta:"Chuleta / chuletón (con hueso)",cuadril:"Cadera",colita:"Rabillo de cadera",tapacuadril:"Picaña",tapanalga:"Tapa (babilla)",roastbeef:"Aguja",paleta:"Espaldilla / llana",carnaza:"Morcillo de paleta",osobuco:"Morcillo / jarrete en rodajas (ossobuco)",vacio:"Vacío (falda)",matambre:"Matambre (falda fina)",entrana:"Entraña",tapaasado:"Tapa de costillar",falda:"Pecho (con hueso)",rabo:"Rabo de toro / de ternera",picadacomun:"Carne picada (mezcla)",mondongo:"Callos",molleja:"Mollejas",chinchulin:"Chinchulines (tripas)",solomillocerdo:"Solomillo de cerdo",bondiola:"Presa / aguja de cerdo",carre:"Chuleta de cerdo",pechito:"Costillas de cerdo",matambrecerdo:"Falda de cerdo",panceta:"Panceta / beicon / guanciale",jamoncrudo:"Jamón serrano / prosciutto",salame:"Salchichón / salami",chivito:"Cabrito",zapallo:"Calabaza",zapallito:"Calabacín redondo",zucchini:"Calabacín",morron:"Pimiento",chaucha:"Judías verdes",arvejas:"Guisantes",papa:"Patata",batata:"Boniato",choclo:"Maíz dulce",porotos:"Alubias cocidas",banana:"Plátano",frutilla:"Fresas",durazno:"Melocotón",damasco:"Albaricoque",palta:"Aguacate",
 carne:"Ternera magra (filete)",asado:"Costillas de ternera",picada:"Carne picada",jamon:"Jamón york",queso:"Queso tierno",muzza:"Mozzarella",untable:"Queso crema light",ricota:"Requesón",pan:"Pan de barra",tapaemp:"Masa de empanadilla",tapaempst:"Masa de empanadilla sin gluten",tapatarta:"Masa quebrada",tapatartast:"Masa quebrada sin gluten",
 fideos:"Pasta cocida",fideosst:"Pasta sin gluten cocida",panst:"Pan sin gluten",premezcla:"Harina sin gluten",rebozador:"Pan rallado sin gluten",galleagua:"Galletas saladas",galledulce:"Galletas",facturas:"Bollería",gaseosa:"Refresco",jugo:"Zumo de caja",caldo:"Pastilla de caldo",sojast:"Salsa de soja sin gluten",pure:"Tomate triturado",manteca:"Mantequilla",mani:"Cacahuetes",pmani:"Crema de cacahuete",cereales:"Cereales azucarados",hambcong:"Hamburguesa congelada",papasfritas:"Patatas fritas de bolsa",ddl:"Dulce de leche",
 pechuga:"Pollo (pechuga sin piel)",noquis:"Ñoquis de patata",noquisst:"Ñoquis sin gluten",ravioles:"Raviolis de ricota y verdura",raviolescarne:"Raviolis de carne o pollo",raviolesst:"Raviolis sin gluten",agnolotis:"Agnolotti de ricota",capeletis:"Tortellini de carne o pollo",canelones:"Canelones de verdura (sin salsa)",lasana:"Placas de lasaña cocidas",muslo:"Pollo (muslo sin piel)",pst:"Soja texturizada (hidratada)",arce:"Sirope de arce",cafe:"Café o té",repollo:"Col / repollo",champi:"Champiñones",lechedesc:"Leche desnatada",cerdo:"Lomo de cerdo"};
const N_EN={lomo:"Beef tenderloin (filet mignon)",bifeangosto:"Strip loin / sirloin steak",bifeancho:"Ribeye",costeleta:"T-bone (bone-in)",cuadril:"Rump",colita:"Tri-tip",tapacuadril:"Picanha (rump cap)",tapanalga:"Top round cap",roastbeef:"Chuck roll",paleta:"Shoulder clod",carnaza:"Shoulder shank meat",osobuco:"Beef shank, cross-cut (osso buco)",vacio:"Flank / bavette",matambre:"Matambre (thin flank)",entrana:"Skirt steak",tapaasado:"Rib cap",falda:"Brisket (bone-in)",rabo:"Oxtail",picadacomun:"Regular ground beef",lengua:"Beef tongue",higado:"Beef liver",mondongo:"Tripe",molleja:"Sweetbreads",chinchulin:"Chitterlings",morcilla:"Blood sausage",solomillocerdo:"Pork tenderloin",bondiola:"Pork collar (coppa)",carre:"Pork chop (bone-in)",pechito:"Pork ribs",matambrecerdo:"Pork flank",panceta:"Pancetta / bacon / guanciale",jamoncrudo:"Cured ham (prosciutto)",salame:"Salami",cordero:"Lamb",chivito:"Young goat (kid)",pollopiel:"Chicken pieces with skin",alitas:"Chicken wings",conejo:"Rabbit",tomate:"Tomato",lechuga:"Lettuce",zanahoria:"Carrot",cebolla:"Onion",zapallo:"Pumpkin / squash",zapallito:"Round zucchini",zucchini:"Zucchini",berenjena:"Eggplant",morron:"Bell pepper",acelga:"Swiss chard",espinaca:"Spinach",brocoli:"Broccoli",coliflor:"Cauliflower",repollo:"Cabbage",remolacha:"Beet",pepino:"Cucumber",chaucha:"Green beans",arvejas:"Peas",puerro:"Leek",apio:"Celery",champi:"Mushrooms",ajo:"Garlic",
 papa:"Potato",batata:"Sweet potato",choclo:"Corn (kernels)",lentejas:"Lentils (cooked)",porotos:"Beans (cooked)",garbanzos:"Chickpeas (cooked)",banana:"Banana",manzana:"Apple",pera:"Pear",naranja:"Orange",mandarina:"Mandarin",pomelo:"Grapefruit",limon:"Lemon",kiwi:"Kiwi",frutilla:"Strawberries",durazno:"Peach",ciruela:"Plum",damasco:"Apricot",uva:"Grapes",sandia:"Watermelon",melon:"Melon",higo:"Fig",membrillo:"Quince",palta:"Avocado",
 huevo:"Egg",pechuga:"Chicken breast (skinless)",muslo:"Chicken thigh (skinless)",carne:"Lean beef",asado:"Beef short ribs",picada:"Ground beef",cerdo:"Pork loin",merluza:"Hake / white fish",atun:"Tuna in water",jamon:"Cooked ham",queso:"Soft cheese",muzza:"Mozzarella",rallado:"Grated cheese",untable:"Light cream cheese",ricota:"Ricotta",leche:"Whole milk",lechedesc:"Skim milk",yogur:"Plain yogurt",
 pan:"White bread",panint:"Whole wheat bread",panst:"Gluten-free bread",panhamb:"Burger bun",fideos:"Pasta (cooked)",fideosst:"Gluten-free pasta (cooked)",arroz:"White rice (cooked)",arrozint:"Brown rice (cooked)",polenta:"Polenta (cooked)",avena:"Oats",harina:"Wheat flour",premezcla:"Gluten-free flour mix",panrallado:"Breadcrumbs",rebozador:"Gluten-free breadcrumbs",tapaemp:"Empanada dough",tapaempst:"Gluten-free empanada dough",tapatarta:"Pie crust",tapatartast:"Gluten-free pie crust",
 galleagua:"Crackers",galledulce:"Sweet cookies",facturas:"Pastries",bizcochitos:"Savory biscuits",cereales:"Sugary cereal",alfajor:"Alfajor (cookie sandwich)",chorizo:"Chorizo sausage",salchicha:"Hot dog sausage",hambcong:"Frozen burger patty",papasfritas:"Potato chips",gaseosa:"Soda",jugo:"Boxed or powdered juice",caldo:"Bouillon cube",soja:"Soy sauce",sojast:"Gluten-free soy sauce",pure:"Tomato purée",
 aceite:"Oil",oliva:"Olive oil",manteca:"Butter",mayonesa:"Mayonnaise",nueces:"Walnuts",mani:"Peanuts",chia:"Chia seeds",azucar:"Sugar",ddl:"Dulce de leche",mermelada:"Jam",miel:"Honey",mate:"Mate (unsweetened)",cafe:"Coffee or tea",agua:"Water",vino:"Wine",cerveza:"Beer",sal:"Salt",
 tofu:"Firm tofu",pst:"Textured soy protein (rehydrated)",seitan:"Seitan",quinoa:"Quinoa (cooked)",bebveg:"Plant milk (soy or oat, unsweetened)",yogurveg:"Plant-based yogurt",hummus:"Hummus",salmon:"Salmon",pavo:"Turkey breast",arandanos:"Blueberries",pmani:"Peanut butter",arce:"Maple syrup",aceitunas:"Olives",noquis:"Potato gnocchi",noquisst:"Gluten-free gnocchi",ravioles:"Ricotta and spinach ravioli",raviolescarne:"Meat or chicken ravioli",raviolesst:"Gluten-free ravioli",agnolotis:"Ricotta agnolotti",sorrentinos:"Ham and cheese sorrentini",capeletis:"Meat or chicken tortellini",canelones:"Vegetable cannelloni (no sauce)",tallarines:"Egg tagliatelle (cooked)",lasana:"Lasagna sheets (cooked)"};
const P_ES={"mila-ens":"Filete empanado al horno con ensalada mixta","mila-pollo":"Pollo empanado al horno con puré de calabaza","guiso-lentejas":"Lentejas estofadas","locro":"Locro (guiso de maíz, calabaza y alubias)","pollo-horno":"Pollo al horno con patatas y boniato","tarta-acelga":"Quiche de acelgas y huevo con ensalada","tarta-zapallito":"Quiche de calabacín","fideos-tuco":"Pasta con boloñesa",
 "bife-ens":"Filete de ternera con ensalada mixta","empanadas":"Empanadillas de carne al horno (2)","pizza":"Pizza casera de mozzarella (2 porciones)","ens-completa":"Ensalada completa con atún, huevo y maíz","zapallitos-rellenos":"Calabacines rellenos","revuelto-zapallitos":"Revuelto de calabacín","polenta":"Polenta con tomate y queso","asado":"Costillas a la brasa con ensalada","pastel-papa":"Pastel de patata y carne","tortilla":"Tortilla de patatas con ensalada","garbanzos":"Potaje de garbanzos con verduras","cerdo-batatas":"Lomo de cerdo con boniato al horno","merluza-pure":"Merluza al horno con puré y ensalada",
 "yogur-avena":"Yogur con avena y plátano","licuado":"Batido de plátano con leche","tostadas-palta":"Tostadas con aguacate y huevo","facturas":"Café con leche y bollería (2)","col-frutos":"Puñado de frutos secos",
 "mila-berenjena":"Berenjenas empanadas al horno con ensalada","fideos-soja":"Pasta con boloñesa de soja","ens-garbanzos":"Ensalada de garbanzos, tomate y aguacate","pastel-lentejas":"Pastel de patata y lentejas","empanadas-verdura":"Empanadillas de verdura al horno (2)","salmon-verd":"Salmón al horno con patatas y brócoli","tostadas-mani":"Tostadas con crema de cacahuete y plátano","avena-arce":"Avena con leche, arándanos y sirope de arce","noquis-fileto":"Ñoquis de patata con salsa de tomate","osobuco-risotto":"Ossobuco de ternera con risotto","ravioles-fileto":"Raviolis de verdura con salsa de tomate y ensalada"};
const P_EN={"mila-ens":"Baked breaded beef with mixed salad","mila-pollo":"Baked breaded chicken with mashed squash","guiso-lentejas":"Lentil stew","locro":"Locro (corn, squash and bean stew)","pollo-horno":"Roast chicken with potatoes and sweet potatoes","tarta-acelga":"Chard and egg pie with salad","tarta-zapallito":"Zucchini pie","fideos-tuco":"Pasta with meat sauce","arroz-pollo":"Chicken and vegetable rice","merluza-pure":"Baked hake with mashed potatoes and salad","bife-ens":"Steak with mixed salad","empanadas":"Baked beef empanadas (2)","pizza":"Homemade mozzarella pizza (2 slices)","ens-completa":"Tuna, egg and corn salad","zapallitos-rellenos":"Stuffed zucchini","hamb-casera":"Homemade burger with salad","sopa-verduras":"Vegetable soup with egg","revuelto-zapallitos":"Zucchini scramble","polenta":"Polenta with tomato sauce and cheese","asado":"Barbecued ribs with salad","wok":"Chicken and vegetable stir-fry with rice","pastel-papa":"Shepherd's pie","tortilla":"Spanish potato omelette with salad","garbanzos":"Chickpea and vegetable stew","berenjenas":"Baked eggplant with cheese and rice","cerdo-batatas":"Pork loin with roasted sweet potatoes","lentejas-ens":"Warm lentil and vegetable salad","merluza-verduras":"Hake with steamed vegetables",
 "mate-pan":"Mate with toast and cream cheese","cafe-tostadas":"Coffee with milk and toast with jam","yogur-avena":"Yogurt with oats and banana","yogur-fruta":"Yogurt with seasonal fruit and walnuts","licuado":"Banana milkshake","tostadas-palta":"Avocado toast with egg","mate-fruta":"Mate with seasonal fruit","facturas":"Coffee with milk and pastries (2)","col-fruta":"Seasonal fruit","col-frutos":"Handful of nuts","col-yogur":"Plain yogurt",
 "lentejas-veg":"Vegan lentil stew","mila-berenjena":"Baked breaded eggplant with salad","hamb-lentejas":"Lentil burgers with salad","wok-tofu":"Tofu and vegetable stir-fry with rice","fideos-soja":"Pasta with soy bolognese","ens-garbanzos":"Chickpea, tomato and avocado salad","quinoa-verd":"Quinoa with sautéed vegetables and egg","pastel-lentejas":"Potato and lentil pie","empanadas-verdura":"Baked vegetable empanadas (2)","paella-verd":"Vegetable paella","gazpacho":"Gazpacho with toast and boiled egg","pisto":"Pisto (Spanish ratatouille) with egg","salmon-verd":"Baked salmon with potatoes and broccoli","pavo-arroz":"Grilled turkey with rice and salad","tofu-ens":"Quinoa, tofu and vegetable salad","avena-veg":"Oats with plant milk and fruit","tostadas-hummus":"Toast with hummus and tomato","yogurveg-frutos":"Plant yogurt with blueberries and walnuts","tostadas-mani":"Peanut butter and banana toast","avena-arce":"Oats with milk, blueberries and maple syrup","col-hummus":"Carrot sticks with hummus","col-aceitunas":"Cherry tomatoes with olives","noquis-fileto":"Gnocchi with tomato sauce","osobuco-risotto":"Braised osso buco with risotto","ravioles-fileto":"Vegetable ravioli with tomato sauce and salad"};
Object.values(ALI).forEach(a=>{a.n0=a.n;a.nEN=N_EN[a.id]||a.n});
Object.values(PLATOM).forEach(x=>{x.n0=x.n});
if(LC.nombres==="es"){for(const [k,n] of Object.entries(N_ES))if(ALI[k])ALI[k].n=n;for(const [k,n] of Object.entries(P_ES))if(PLATOM[k])PLATOM[k].n=n;
  Object.values(ALI).forEach(a=>{a.n=a.n.replace(/sin TACC/g,"sin gluten")})}
if(LC.nombres==="en"){for(const [k,n] of Object.entries(N_EN))if(ALI[k])ALI[k].n=n;for(const [k,n] of Object.entries(P_EN))if(PLATOM[k])PLATOM[k].n=n}
// No se consiguen (o casi) fuera de Argentina: no aparecen en búsquedas ni planes
const SOLO_AR=new Set(["mate","bizcochitos","tapaempst","tapatartast"]);
function aliVisible(a){return LC.pais==="AR"||!SOLO_AR.has(a.id)}

/* ---------- Sinónimos para importar (España, Canadá, inglés y nuevos) ---------- */
SINON.unshift(
 ["solomillo de cerdo|filet de cerdo|lomito de cerdo|pork tenderloin|filetto di maiale","solomillocerdo"],["bondiola|presa iberica|presa de cerdo|aguja de cerdo|coppa|capocollo|pork collar|pork shoulder","bondiola"],
 ["matambre de cerdo|matambrito|falda de cerdo|pork flank","matambrecerdo"],["pechito|costillas de cerdo|costillitas de cerdo|costine|spare ?ribs|pork ribs|baby back","pechito"],
 ["carre|carré|costeleta de cerdo|chuleta de cerdo|braciola|bistecca di maiale|pork chop|lombata di maiale","carre"],["lomo de cerdo|lonza|pork loin","cerdo"],
 ["panceta|pancetta|guanciale|bacon|beicon|tocino","panceta"],["jamon crudo|jamón crudo|jamon serrano|jamón serrano|jamon iberico|jamón ibérico|prosciutto crudo|prosciutto|cured ham","jamoncrudo"],["prosciutto cotto|jamon york","jamon"],
 ["salame|salami|salchichon|salchichón|fuet","salame"],["salsiccia|salchicha parrillera|longaniza","chorizo"],["morcilla|blood sausage","morcilla"],
 ["osobuco|ossobuco|osso buco|morcillo|jarrete|stinco|beef shank","osobuco"],["colita de cuadril|rabillo de cadera|tri-tip|tri tip","colita"],["tapa de cuadril|picana|picaña|picanha|rump cap","tapacuadril"],["cuadril|cadera|scamone|codone|rump","cuadril"],
 ["tapa de nalga|babilla|top round","tapanalga"],["ojo de bife|bife ancho|lomo vetado|lomo veteado|lomo alto|entrecot de lomo alto|ribeye|rib eye|costata","bifeancho"],
 ["bife de chorizo|bife angosto|lomo bajo|entrecot|contrafilete|controfiletto|striploin|strip loin|sirloin|new york strip","bifeangosto"],
 ["costeleta|chuleton|chuletón|chuleta de ternera|chuleta de vaca|t-bone|t bone|fiorentina|bistecca","costeleta"],
 ["filet de lomo|filet mignon|lomo|solomillo|filetto|tenderloin|chateaubriand","lomo"],["roast beef|roastbeef|rosbif|aguja de ternera|aguja de vaca|reale|chuck","roastbeef"],
 ["palomita|paleta|espaldilla|llana|spalla|shoulder clod","paleta"],["carnaza|morcillo de paleta|girello di spalla","carnaza"],["vacio|vacío|bavette|bavetta|flank steak|flank","vacio"],["matambre|falda fina","matambre"],["entraña|entrana|skirt steak|diaframma","entrana"],
 ["tapa de asado|tapa de costillar|rib cap","tapaasado"],["falda|pecho de ternera|punta di petto|brisket|bollito","falda"],["rabo|cola de vaca|coda alla vaccinara|oxtail","rabo"],
 ["carne picada comun|carne picada común|picada comun|picada común|carne picada mixta|picada mixta|macinato misto","picadacomun"],["macinato|ground beef|carne molida","picada"],
 ["peceto|redondo|girello|nalga|fesa|noce|cuadrada|bola de lomo|contra|polpa|top round|eye of round","carne"],
 ["lengua|lingua|beef tongue","lengua"],["higado|hígado|fegato|liver","higado"],["mondongo|callos|trippa|tripe","mondongo"],["molleja|animelle|sweetbread","molleja"],["chinchulin|chinchulín|tripa gorda","chinchulin"],
 ["cordero|agnello|lamb","cordero"],["chivito|cabrito|capretto","chivito"],["alitas|alas de pollo|ali di pollo|chicken wing","alitas"],["pollo con piel|pollo entero|cuarto de pollo|pata y muslo con piel|whole chicken","pollopiel"],["conejo|coniglio|rabbit","conejo"],
 ["noquis sin tacc|ñoquis sin tacc|noquis sin gluten|ñoquis sin gluten|gluten-free gnocchi","noquisst"],["noqui|ñoqui|gnocchi","noquis"],
 ["ravioles sin tacc|raviolis sin gluten|ravioles sin gluten|gluten-free ravioli","raviolesst"],
 ["ravioles de carne|ravioles de pollo|ravioles de verdura y carne|raviolis de carne|raviolis de pollo|meat ravioli|chicken ravioli","raviolescarne"],["raviol|ravioli","ravioles"],
 ["agnolot","agnolotis"],["sorrentin","sorrentinos"],["capelet|capellet|cappellet|tortellin|tortelin","capeletis"],["canelon|canelón|cannellon","canelones"],
 ["lasana|lasaña|lasagna|lasagne","lasana"],["tallarines al huevo|tallarin al huevo|tallarines frescos|pasta fresca|fettuccine|fetuccine|tagliatelle|egg noodle","tallarines"],
 ["leche de soja|leche de avena|leche de almendra|bebida de soja|bebida de avena|bebida de almendra|bebida vegetal|leche vegetal|soy milk|oat milk|almond milk|plant milk","bebveg"],
 ["yogur de soja|yogur vegetal|yogur de coco|soy yogurt|plant yogurt|vegan yogurt","yogurveg"],
 ["soja texturizada|proteina de soja|proteína de soja|carne de soja|textured soy|tvp","pst"],
 ["tofu","tofu"],["seitan|seitán","seitan"],["quinoa|quinua","quinoa"],["hummus|humus","hummus"],
 ["salmon|salmón","salmon"],["pavo|turkey","pavo"],["arandano|arándano|blueberr","arandanos"],
 ["crema de cacahuete|mantequilla de cacahuete|mantequilla de mani|mantequilla de maní|pasta de mani|pasta de maní|peanut butter","pmani"],
 ["jarabe de arce|sirope de arce|maple","arce"],["aceituna|olive(?!\\s*oil)","aceitunas"],
 ["patata|potato(?!\\s*chip)","papa"],["boniato|sweet potato","batata"],["calabacin|calabacín|courgette","zucchini"],["pimiento|bell pepper|red pepper|green pepper","morron"],["judias verdes|judías verdes|green bean","chaucha"],["guisante","arvejas"],["alubia|judia|judía|kidney bean|black bean|white bean","porotos"],
 ["platano|plátano","banana"],["fresa|strawberr","frutilla"],["melocoton|melocotón|peach","durazno"],["albaricoque|apricot","damasco"],["aguacate|avocado","palta"],["cacahuete|peanut","mani"],["mantequilla","manteca"],["nata","manteca"],["requeson|requesón","ricota"],["ternera","carne"],["maiz dulce|maíz dulce|sweetcorn","choclo"],["jamon york|jamón york|jamon cocido","jamon"],["macarron|macarrón|espagueti|pasta","fideos"],["refresco","gaseosa"],["zumo","jugo"],["bolleria|bollería|croissant|cruasan","facturas"],
 ["chicken breast|chicken","pechuga"],["ground beef|minced beef|hamburger meat","picada"],["beef|steak","carne"],["pork","cerdo"],["hake|cod|white fish|fish","merluza"],["tuna","atun"],["ham\\b","jamon"],["egg","huevo"],["cream cheese","untable"],["parmesan|grated cheese","rallado"],["cheese|cheddar","queso"],["milk","leche"],["yogurt|yoghurt","yogur"],["butter","manteca"],["olive oil","oliva"],["oil\\b","aceite"],
 ["whole wheat bread|wholemeal bread","panint"],["bread|toast","pan"],["noodle|spaghetti|macaroni","fideos"],["brown rice","arrozint"],["rice","arroz"],["oat","avena"],["lentil","lentejas"],["chickpea|garbanzo","garbanzos"],["bean","porotos"],["corn","choclo"],["pumpkin|squash","zapallo"],["eggplant|aubergine","berenjena"],["tomato sauce|passata|crushed tomato","pure"],["tomato","tomate"],["lettuce","lechuga"],["carrot","zanahoria"],["onion","cebolla"],["spinach","espinaca"],["chard","acelga"],["broccoli","brocoli"],["cauliflower","coliflor"],["cabbage","repollo"],["mushroom","champi"],["garlic","ajo"],["cucumber","pepino"],["\\bpeas?\\b","arvejas"],["apple","manzana"],["pear\\b","pera"],["orange","naranja"],["lemon","limon"],["walnut|nuts","nueces"],["sugar","azucar"],["honey","miel"],["jam\\b","mermelada"],["coffee|tea\\b","cafe"],["water","agua"],["wine","vino"],["beer","cerveza"],["salt\\b","sal"]
);
const _buscar=buscarAli;
buscarAli=function(nombre){const n=normTxt(nombre).trim();
  const ex=Object.values(ALI).find(a=>[a.n,a.n0,a.nEN].some(x=>x&&normTxt(x)===n));if(ex)return ex.id;return _buscar(nombre)};

/* ---------- Temporadas del hemisferio norte ---------- */
const _enT=enTemporada;
enTemporada=function(a,m){m=m||mesActual();if(LC.norte)m=((m+5)%12)+1;return _enT(a,m)};

/* ---------- Plan semanal según dieta y país ---------- */
const _armar=armarPlan;
armarPlan=function(p){const lista=PLATOS.filter(x=>enPais(x)&&apto(x,p));return conPlatos(lista,()=>_armar(p))};
const _dibReg=dibRegistrar;
dibRegistrar=function(){const p=P();const q=(FSEL&&FSEL.q)||"";const lista=PLATOS.filter(x=>enPais(x)&&(q.length>=2||apto(x,p)));
  const aliBak={};Object.values(ALI).forEach(a=>{if(!aliVisible(a)){aliBak[a.id]=a;delete ALI[a.id]}});
  try{conPlatos(lista,()=>_dibReg())}finally{Object.assign(ALI,aliBak)}
  inyectarRapidos()};
function inyectarRapidos(){const sh=document.querySelector("#layer .sheet");if(!sh||sh.querySelector(".c2-rap"))return;const h2=sh.querySelector("h2");if(!h2)return;
  const d=document.createElement("div");d.className="c2-rap";d.style.cssText="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:2px 0 12px";
  d.innerHTML=[["c2-foto","📸","Foto del plato"],["c2-cod","▥","Código de barras"],["c2-mano","✍️","Cargar a mano"]].map(([a,i,t])=>`<button class="glass" data-act="${a}" style="padding:12px 6px;border-radius:18px;text-align:center;color:inherit;border:1px solid rgba(255,255,255,.12)"><div style="font-size:22px">${i}</div><div class="xs" style="margin-top:4px">${t}</div></button>`).join("");
  h2.after(d)}

/* ---------- Productos escaneados o cargados a mano ---------- */
const OFFK="vital-prod";
function prodTodos(){try{return JSON.parse(localStorage.getItem(OFFK)||"{}")}catch(e){return {}}}
function prodGuardar(x){const all=prodTodos();all[x.id]=x;try{localStorage.setItem(OFFK,JSON.stringify(all))}catch(e){}inyectarProd(x)}
function inyectarProd(x){ALI[x.id]={id:x.id,n:x.n,c:x.c||"otro",kcal:x.kcal,hc:x.hc,p:x.p,g:x.g,fib:x.fib||0,na:x.na||0,tacc:x.tacc==null?2:x.tacc,u:x.u||{porción:100},prod:1,code:x.code}}
Object.values(prodTodos()).forEach(inyectarProd);

async function buscarCodigo(code){code=String(code).replace(/\D/g,"");if(code.length<8){toast("El código tiene que tener al menos 8 números");return null}
  const ya=Object.values(ALI).find(a=>a.code===code);if(ya)return ya;
  let j;try{const r=await fetch("https://world.openfoodfacts.org/api/v2/product/"+code+".json?fields=product_name,product_name_es,product_name_en,brands,nutriments,serving_size,serving_quantity,allergens_tags,labels_tags,nova_group,categories_tags");j=await r.json()}catch(e){toast("Sin conexión: no pude buscar el producto");return null}
  if(!j||j.status!==1||!j.product){return {nuevo:true,code}}
  const pr=j.product,n=pr.nutriments||{};const kc=n["energy-kcal_100g"]!=null?n["energy-kcal_100g"]:n["energy_100g"]!=null?n["energy_100g"]/4.184:null;
  if(kc==null)return {nuevo:true,code,nombre:pr.product_name_es||pr.product_name||""};
  const nombre=((LC.lang==="en"?pr.product_name_en:pr.product_name_es)||pr.product_name||"Producto "+code).trim()+(pr.brands?" · "+String(pr.brands).split(",")[0].trim():"");
  const cats=(pr.categories_tags||[]).join(" ");let c=pr.nova_group===4?"ultra":/beverages|bebidas/.test(cats)?"bebida":/dairies|lacteos/.test(cats)?"lact":/fruits|frutas/.test(cats)?"fruta":/vegetables|verduras/.test(cats)?"verd":/legumes/.test(cats)?"legum":/cereals|cereales|breads|panes/.test(cats)?"cereal":"otro";
  if((n.sugars_100g||0)>=25&&c!=="fruta")c="azuc";
  const al=pr.allergens_tags||[],lb=pr.labels_tags||[];const tacc=al.some(x=>/gluten/.test(x))?1:lb.some(x=>/gluten-free|sin-gluten|sin-tacc/.test(x))?0:2;
  const sq=+pr.serving_quantity||parseFloat(String(pr.serving_size||"").match(/(\d+(?:[.,]\d+)?)\s*(g|ml)/i)?.[1]?.replace(",","."))||0;
  const x={id:"off"+code,code,n:nombre,c,kcal:Math.round(kc),hc:+(n.carbohydrates_100g||0).toFixed(1),p:+(n.proteins_100g||0).toFixed(1),g:+(n.fat_100g||0).toFixed(1),fib:+(n.fiber_100g||0).toFixed(1),na:Math.round(n.sodium_100g!=null?n.sodium_100g*1000:(n.salt_100g||0)*400),tacc,u:sq?{porción:Math.round(sq)}:{porción:100},src:"off"};
  prodGuardar(x);return ALI[x.id]}
function abrirCodigo(){sheet(`<h2>▥ Código de barras</h2><p class="sm mute">Sacale una foto al código del paquete (que se vea nítido y derecho) o escribí los números.</p>
  <label class="btn block" style="margin-top:10px;text-align:center;cursor:pointer">📷 Sacar foto del código<input type="file" accept="image/*" capture="environment" id="c2-codimg" style="display:none"></label>
  <label class="f">O escribí el número que está debajo de las barras</label><div class="row" style="gap:8px"><input class="in" id="c2-codnum" inputmode="numeric" placeholder="7790000000000" autocomplete="off" style="flex:1"><button class="btn" data-act="c2-codbus">Buscar</button></div>
  <p class="xs faint" style="margin-top:10px">Los datos vienen de Open Food Facts, una base libre armada por usuarios de todo el mundo. Si el producto no está, lo cargás una vez y queda guardado.</p>
  <div class="row" style="margin-top:12px"><button class="btn ghost" data-act="fadd">Volver</button></div>`);
  const f=$("#c2-codimg");if(f)f.addEventListener("change",async()=>{const file=f.files&&f.files[0];if(!file)return;
    if(!("BarcodeDetector" in window)){toast("Este teléfono no lee códigos desde fotos: escribí el número");return}
    try{toast("Leyendo el código…");const bmp=await createImageBitmap(file);const det=new BarcodeDetector({formats:["ean_13","ean_8","upc_a","upc_e","code_128"]});const r=await det.detect(bmp);
      if(!r.length){toast("No encontré el código en la foto. Probá más cerca y con luz, o escribilo");return}
      $("#c2-codnum").value=r[0].rawValue;resolverCodigo(r[0].rawValue)}catch(e){toast("No pude leer la foto: escribí el número")}})}
async function resolverCodigo(code){const a=await buscarCodigo(code);if(!a)return;
  if(a.nuevo){abrirMano({code:a.code,n:a.nombre||""});toast("No está en la base: cargalo una vez y queda guardado");return}
  abrirPorcion("alimento",a.id)}
function abrirMano(pre){pre=pre||{};sheet(`<h2>✍️ Cargar un producto</h2><p class="sm mute">Copiá los datos de la tabla nutricional del envase (columna «por 100 g»). Queda guardado en este teléfono para la próxima.</p>
  <label class="f">Nombre</label><input class="in" id="c2-mn" value="${esc(pre.n||"")}" placeholder="Ej.: Barrita de cereal marca X" autocomplete="off">
  <div class="grid2"><div><label class="f">Calorías (kcal)</label><input class="in" id="c2-mk" inputmode="decimal"></div><div><label class="f">Hidratos (g)</label><input class="in" id="c2-mh" inputmode="decimal"></div>
  <div><label class="f">Proteínas (g)</label><input class="in" id="c2-mp" inputmode="decimal"></div><div><label class="f">Grasas (g)</label><input class="in" id="c2-mg" inputmode="decimal"></div>
  <div><label class="f">Fibra (g)</label><input class="in" id="c2-mf" inputmode="decimal" placeholder="0"></div><div><label class="f">Sodio (mg)</label><input class="in" id="c2-ms" inputmode="decimal" placeholder="0"></div>
  <div><label class="f">Una porción pesa (g)</label><input class="in" id="c2-mq" inputmode="decimal" placeholder="100"></div><div><label class="f">¿Ultraprocesado?</label><select class="in" id="c2-mu"><option value="otro">No</option><option value="ultra">Sí (golosina, snack, gaseosa…)</option></select></div></div>
  ${pre.code?`<p class="xs faint" style="margin-top:8px">Código ${esc(pre.code)}</p>`:""}
  <div class="row" style="margin-top:14px"><button class="btn ghost" data-act="fadd">Volver</button><button class="btn" style="flex:1" data-act="c2-mansave" data-v="${esc(pre.code||"")}">Guardar y registrar</button></div>`)}
function num(id){const v=parseFloat(String(($(id)||{}).value||"").replace(",","."));return isNaN(v)?0:v}

/* ---------- Foto del plato con IA ---------- */
function promptPlato(){const lista=Object.values(ALI).filter(a=>!a.prod&&aliVisible(a)).map(a=>a.n0).join(", ");
  if(LC.lang==="en")return `I'm sending you a photo of my plate of food. Estimate what is on it and how much, as a plain text table with columns separated by a vertical bar ( | ).
First line: RECETA | name of the dish | 1
Then one line per ingredient: Ingredient | grams | g
Rules: write ingredient names IN SPANISH, using this list whenever possible: ${lista}. Estimate the grams as served (cooked weight: write "arroz cocido", "fideos cocidos"). Include oil, butter, sauces and dressings you can see or that are usually used. Do not add explanations: only the table, inside a code block.`;
  return `Te paso la foto de mi plato de comida. Estimá qué tiene y cuánto, como una tabla de texto con columnas separadas por barra vertical ( | ).
Primera línea: RECETA | nombre del plato | 1
Después, una línea por ingrediente: Ingrediente | gramos | g
Reglas: usá estos nombres siempre que se pueda: ${lista}. Estimá los gramos como están servidos (peso cocido: escribí "arroz cocido", "fideos cocidos"). Incluí el aceite, la manteca, las salsas y los aderezos que se vean o que se suelan usar. No agregues explicaciones: solo la tabla, dentro de un bloque de código.`}
let FOTO=null;
let FMODO="dia";
function abrirFoto(modo){if(modo)FMODO=modo;const rec=FMODO==="receta";sheet(`<h2>📸 ${rec?"Receta desde la foto de un plato":"Foto del plato"}</h2>${rec?`<p class="sm mute">Ideal para las fotos de comidas que ya cocinaste: la IA estima un plato servido y después elegís cuántas porciones salen de la olla.</p>`:""}
  <ol class="steps"><li>Sacale una foto al plato desde arriba, con buena luz (si podés, con un cubierto al lado para que se entienda el tamaño).</li>
  ${NATIVE?`<li>Elegí tu IA: se abre con el pedido ya escrito. Ahí le sumás la foto y lo enviás.<div class="row" id="c2-ias" style="flex-wrap:wrap;gap:8px;margin-top:8px"><button class="btn small ghost" data-act="c2-iaotra">Abrir mi IA</button></div></li>
  <li>Cuando te conteste, tocá <b>Compartir</b> en la respuesta (o seleccioná la tabla → Compartir) y elegí <b>Vital</b>: la tabla vuelve sola acá.</li></ol>`:`<li>Abrí tu asistente de IA (Claude, ChatGPT o Gemini), subí la foto y pegale el texto de este botón: <button class="btn small ghost" data-act="c2-fprompt">Copiar el texto para la IA</button></li>
  <li>Copiá la tabla que te devuelve y pegala acá abajo.</li></ol>`}
  <textarea class="in" id="c2-ftxt" rows="7" placeholder="RECETA | Milanesa con puré | 1&#10;Carne vacuna magra | 150 | g&#10;Papa | 200 | g&#10;Aceite | 10 | g"></textarea>
  <div class="row" style="margin-top:10px"><button class="btn ghost" data-act="c2-fpaste">Pegar</button><button class="btn" style="flex:1" data-act="c2-fcalc">Calcular</button></div>
  <p class="xs faint" style="margin-top:8px">La IA estima a ojo: en el paso siguiente podés corregir los gramos. Si lo pesás, mejor.</p>
  <div class="row" style="margin-top:8px"><button class="btn ghost" data-act="${rec?"rimp":"fadd"}">Volver</button></div>`);if(NATIVE)pintarIAs()}

/* ---------- Ida y vuelta con la IA (app de Android) ----------
   Ida: botón por cada IA instalada → se abre con el pedido escrito (y queda copiado por si la IA no lo toma).
   Vuelta: en la IA, Compartir → Vital. El texto entra directo al cuadro, sin pasar por el portapapeles.
   Si Android cerró Vital mientras tanto, se recuerda en qué comida, día y modo se estaba cargando. */
const IAP=()=>nplug("VitalCompartir");
function pintarIAs(){const c=IAP(),box=$("#c2-ias");if(!c||!box)return;
  c.ias().then(r=>{const L=(r&&r.ias)||[];if(!$("#c2-ias"))return;
    $("#c2-ias").innerHTML=L.map(x=>`<button class="btn small" data-act="c2-iaabrir" data-v="${esc(x.pkg)}">Abrir en ${esc(x.n)}</button>`).join("")+`<button class="btn small ghost" data-act="c2-iaotra">${L.length?"Otra app":"Abrir mi IA"}</button>`},()=>{})}
function recordarIA(){try{localStorage.setItem("vital-ia",JSON.stringify({modo:FMODO,meal:FSEL&&FSEL.meal,dia:(window.diaSelC&&diaSelC()!==TODAY())?diaSelC():null,t:Date.now()}))}catch(e){}}
function abrirIA(pkg){const c=IAP(),t=promptPlato();recordarIA();
  if(!c){try{copiarPP(t)}catch(e){}toast("Texto copiado: pegalo en tu IA junto con la foto");return}
  (pkg?c.abrir({pkg,texto:t}):c.elegir({texto:t,titulo:"¿Con qué IA lo abrís?"})).then(r=>{if(r&&r.modo==="copiado")setTimeout(()=>toast("Pegá el texto en la IA (ya está copiado) y sumale la foto"),400)},()=>{try{copiarPP(t)}catch(e){}toast("No pude abrir la IA: el texto quedó copiado")})}
function recibirDeIA(t){t=String(t||"").trim();if(!t)return;
  {const L=t.split(/\r?\n/),tab=L.filter(l=>l.includes("|"));if(tab.length>=2)t=tab.join("\n")} // solo la tabla: sin el «Acá tenés…» ni las marcas ``` de la IA
  const poner=()=>{const el=$("#c2-ftxt")||$("#rimp");if(!el)return false;el.value=t;
    if(el.id==="c2-ftxt"&&Object.keys(importarReceta(t).i).length){const b=$('[data-act="c2-fcalc"]');if(b){toast("Tabla recibida de la IA ✓");b.click();return true}}
    toast("Texto recibido de la IA: revisalo y seguí");return true};
  if(poner())return;
  let ctx={};try{ctx=JSON.parse(localStorage.getItem("vital-ia")||"{}");if(Date.now()-(ctx.t||0)>6*3600e3)ctx={}}catch(e){}
  if(location.hash!=="#comer")location.hash="#comer";
  setTimeout(()=>{if(ctx.dia&&window.setDiaC)setDiaC(ctx.dia);if(typeof comerTab!=="undefined")comerTab="hoy";
    FSEL={meal:ctx.meal||comidaSugerida(),q:""};FOTO=null;abrirFoto(ctx.modo||"dia");setTimeout(poner,60)},250)}
document.addEventListener("DOMContentLoaded",function escucharIA(){if(typeof NATIVE==="undefined"||!NATIVE)return;let n=0;
  const listo=()=>typeof S!=="undefined"&&S.profiles&&S.profiles.length&&document.querySelector("#view");
  const arrancar=()=>{const c=IAP();if(!c)return;
    c.addListener("compartido",e=>{const go=()=>listo()?(c.pendiente().catch(()=>{}),recibirDeIA(e&&e.texto)):(n++<60&&setTimeout(go,250));go()});
    const pend=()=>listo()?c.pendiente().then(r=>{if(r&&r.texto)recibirDeIA(r.texto)},()=>{}):(n++<60&&setTimeout(pend,250));pend()};
  arrancar()});
function dibFoto(){const p=P();const ing=FOTO.i;const ad=adaptar(ing,p);const t=nutri(ad.ing);const q=calidad(t,"a");
  sheet(`<h2>${esc(FOTO.n||"Mi plato")}</h2><p class="xs mute">${COMIDAS[FSEL.meal]} · revisá y corregí los gramos</p>
  <label class="f">Nombre</label><input class="in" id="c2-fn" value="${esc(FOTO.n||"")}" placeholder="Mi plato" autocomplete="off">
  ${Object.entries(ing).map(([k,g])=>`<div class="row between sm" style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>${esc(ALI[k].n)}</span><span class="row" style="gap:6px"><input class="in" style="width:86px;padding:8px" inputmode="numeric" data-c2g="${k}" value="${Math.round(g)}"> g<button class="iconbtn" style="width:30px;height:30px;font-size:12px" data-act="c2-fdel" data-v="${k}">✕</button></span></div>`).join("")}
  ${FOTO.no&&FOTO.no.length?`<p class="note" style="margin-top:10px">No reconocí: ${esc(FOTO.no.join(", "))}. Si es importante, buscalo como alimento suelto y sumalo aparte.</p>`:""}
  <div class="grid3" style="margin-top:14px;text-align:center"><div class="stat"><span class="xs mute">Calidad</span><b style="color:${colorCal(q.s)}">${q.s}</b><span class="xs">${etiquetaQ(q.s)}</span></div>${esMenor(p)?"":`<div class="stat"><span class="xs mute">Calorías</span><b>${Math.round(t.kcal)}</b><span class="xs">kcal</span></div>`}<div class="stat"><span class="xs mute">Hidratos</span><b>${Math.round(t.hc)} g</b><span class="xs">${Math.round(t.hc/15*10)/10} porc. de 15 g</span></div></div>
  <p class="xs mute" style="margin-top:10px">Proteínas ${Math.round(t.p)} g · Grasas ${Math.round(t.gr)} g · Fibra ${Math.round(t.fib*10)/10} g · Sodio ${Math.round(t.na)} mg</p>
  ${q.tips.slice(0,2).map(x=>`<p class="sm">💡 ${esc(x)}</p>`).join("")}
  <div class="row" style="margin-top:14px"><button class="btn ghost" data-act="c2-foto">Volver</button><button class="btn" style="flex:1" data-act="c2-fsave">Agregar</button></div>
  <button class="btn ghost block" style="margin-top:10px" data-act="c2-frec">💾 Guardar también como receta de casa</button>`)}
function fotoAReceta(){const por=4;const i={};for(const [k,g] of Object.entries(FOTO.i))i[k]=Math.round(g*por);
  RED={id:uid(),n:FOTO.n||"",por,i,share:!!(typeof CLOUD!=="undefined"&&CLOUD.on&&CLOUD.fid),q:"",nueva:true,foto:true};dibReceta();
  const sh=document.querySelector("#layer .sheet h2");if(sh&&!document.querySelector(".c2-fnota")){const n=document.createElement("p");n.className="note c2-fnota";n.style.marginTop="8px";n.textContent="Armada desde la foto de un plato: elegí cuántas porciones salen de la olla y las cantidades se ajustan solas.";sh.after(n)}}
const _abrImp=abrirImportar;
abrirImportar=function(){_abrImp();const sh=document.querySelector("#layer .sheet h2");if(!sh)return;const d=document.createElement("button");d.className="glass";d.dataset.act="c2-frecini";
  d.style.cssText="display:flex;gap:12px;align-items:center;width:100%;padding:14px;border-radius:18px;margin:8px 0;color:inherit;border:1px solid rgba(255,255,255,.12);text-align:left";
  d.innerHTML='<span style="font-size:26px">📸</span><span><b class="sm">Desde la foto de un plato que cocinaste</b><br><span class="xs mute">La IA reconoce el plato y vos elegís las porciones de la olla</span></span>';sh.after(d)};
function leerFoto(){document.querySelectorAll("[data-c2g]").forEach(i=>{const v=parseFloat(i.value);if(v>0)FOTO.i[i.dataset.c2g]=v});const n=$("#c2-fn");if(n)FOTO.n=n.value.trim()}
function itemLibre(n,ing,p){const ad=adaptar(ing,p);const t=nutri(ad.ing);const q=calidad(t,"a");
  return {id:uid(),src:"foto",ref:"",f:1,n:n||"Mi plato",i:ing,kcal:Math.round(t.kcal),hc:Math.round(t.hc),p:Math.round(t.p),gr:Math.round(t.gr),fib:Math.round(t.fib*10)/10,na:Math.round(t.na),q:q.s,vf:Math.round((t.grupos.verd||0)+(t.grupos.fruta||0)),tacc:t.tacc,ts:Date.now()}}

/* ---------- Ayuno intermitente ---------- */
const AYUNOS=[12,14,16];
function ayunoBloqueo(p){if(esMenor(p))return "En chicos y adolescentes no se recomienda el ayuno: necesitan comer seguido para crecer.";
  if((p.limits||[]).includes("embarazo"))return "Durante el embarazo y la lactancia no se recomienda el ayuno.";
  const w=+p.weight,h=+p.height;if(w&&h&&w/((h/100)**2)<18.5)return "Con tu peso actual no conviene ayunar. Si querés, consultalo con un profesional.";
  return ""}
function ayunoMed(p){return (p.cond||[]).some(c=>c==="diabetes"||c==="insulina")}
function hm2(ts){return new Date(ts).toLocaleTimeString(LC.lang==="en"?"en-CA":"es-AR",{hour:"2-digit",minute:"2-digit"})}
function ayunoCard(p){const a=p.ayuno;const bl=ayunoBloqueo(p);
  if(!a){if(!p.ayunoVisto&&!(p.ayunos||[]).length)return `<section class="glass org3"><div class="row between"><div><b>⏱ Ayuno intermitente</b><br><span class="xs mute">Opcional · 12, 14 o 16 horas</span></div><button class="btn small ghost" data-act="c2-ayuno">Ver</button></div></section>`;
    return `<section class="glass org3"><div class="row between"><div><b>⏱ Ayuno</b><br><span class="xs mute">${(p.ayunos||[]).length?"Último: "+ayunoTxt(p.ayunos[0]):"Sin ayunos registrados"}</span></div>${bl?"":`<button class="btn small" data-act="c2-ayini" data-v="${p.ayunoMeta||14}">Empezar ${p.ayunoMeta||14} h</button>`}</div><button class="xs faint" data-act="c2-ayuno" style="background:none;border:0;padding:8px 0 0;color:inherit">Opciones e historial ›</button></section>`}
  const el=(Date.now()-a.ini)/36e5,fin=a.ini+a.meta*36e5;const ok=el>=a.meta;
  return `<section class="glass org3" id="c2-aycard"><div class="row" style="gap:14px">${ring(Math.min(1,el/a.meta),ok?"#4ade80":"#5eead4",96,10,`<div style="font-size:20px;font-weight:800">${Math.floor(el)}:${String(Math.floor((el%1)*60)).padStart(2,"0")}</div><div class="xs mute">de ${a.meta} h</div>`)}
   <div style="flex:1"><b>${ok?"¡Meta cumplida! 🎉":"Ayuno en curso"}</b><p class="xs mute" style="margin-top:4px">Empezaste a las ${hm2(a.ini)}<br>${ok?"Podés comer cuando quieras.":"Termina a las "+hm2(fin)}</p><p class="xs faint" style="margin-top:4px">Agua, café o té sin azúcar no lo cortan.</p>
   <button class="btn small ${ok?"":"ghost"}" style="margin-top:8px" data-act="c2-ayfin">${ok?"Terminar y comer":"Cortar ahora"}</button></div></div></section>`}
function ayunoTxt(x){const h=(x.fin-x.ini)/36e5;return Math.floor(h)+" h "+String(Math.round((h%1)*60)).padStart(2,"0")+" min"+(h>=x.meta?" ✓":" de "+x.meta+" h")}
function abrirAyuno(){const p=P();p.ayunoVisto=true;save();const bl=ayunoBloqueo(p);const med=ayunoMed(p);
  sheet(`<h2>⏱ Ayuno intermitente</h2><p class="sm mute">Es dejar pasar varias horas sin comer (por ejemplo, de la cena al almuerzo del día siguiente). Para algunas personas sirve para ordenar las comidas; no es obligatorio ni mejor que comer en horarios regulares.</p>
  ${bl?`<p class="note" style="margin-top:10px">${esc(bl)}</p>`:`
  <label class="f">¿Cuántas horas?</label><div class="opts">${AYUNOS.map(h=>`<button class="opt ${(p.ayunoMeta||14)===h?"on":""}" data-act="c2-aymeta" data-v="${h}">${h} h · come en ${24-h} h</button>`).join("")}</div>
  <p class="xs faint" style="margin-top:6px">${({12:"12 h: el más suave, ideal para empezar (por ejemplo, de 21 a 9).",14:"14 h: intermedio (por ejemplo, de 21 a 11).",16:"16 h: el más exigente que propone Vital. No hace falta hacerlo todos los días."})[p.ayunoMeta||14]}</p>
  ${med?`<p class="note" style="margin-top:10px">🩸 Con diabetes${(p.cond||[]).includes("insulina")?" e insulina":""} el ayuno puede bajar la glucosa de forma peligrosa. Hacelo solo si tu médico te lo indicó y con el esquema que te dio.</p>
   <button class="row between" data-act="c2-aymed" style="width:100%;background:none;border:0;padding:12px 0;text-align:left;color:inherit"><span class="sm">Mi médico me indicó el ayuno</span><span class="pill" style="${p.ayunoOkMed?"background:var(--mint);color:#062026":""}">${p.ayunoOkMed?"Sí":"No"}</span></button>`:""}
  <ul class="xs mute" style="margin:10px 0 0 18px;line-height:1.6"><li>Tomá agua durante el ayuno.</li><li>Si te mareás, te sentís débil o con mucho dolor de cabeza, cortalo y comé.</li><li>No lo hagas los días de entrenamiento fuerte si no estás acostumbrado.</li><li>Cuando comés, que sea un plato completo: no se trata de compensar.</li></ul>
  <button class="btn block" style="margin-top:14px" data-act="c2-ayini" data-v="${p.ayunoMeta||14}" ${med&&!p.ayunoOkMed?"disabled":""}>Empezar ahora</button>`}
  ${(p.ayunos||[]).length?`<div class="blockt">Últimos ayunos</div>${p.ayunos.slice(0,10).map(x=>`<div class="row between sm" style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06)"><span>${new Date(x.ini).toLocaleDateString(LC.lang==="en"?"en-CA":"es-AR",{weekday:"short",day:"numeric",month:"short"})}</span><b>${ayunoTxt(x)}</b></div>`).join("")}`:""}`)}
function terminarAyuno(p,silencio){const a=p.ayuno;if(!a)return;p.ayunos=[{ini:a.ini,fin:Date.now(),meta:a.meta}].concat(p.ayunos||[]).slice(0,30);p.ayuno=null;save();
  if(!silencio)toast((Date.now()-a.ini)/36e5>=a.meta?"Ayuno cumplido ✓":"Ayuno cortado. Está bien: escuchá a tu cuerpo")}
setInterval(()=>{try{if(typeof current!=="undefined"&&current==="comer"&&comerTab==="hoy"&&!$("#layer").innerHTML&&S.profiles.length&&P().ayuno)render()}catch(e){}},60e3);

/* ---------- Vista: agregados a Comer ---------- */
const _vComer=vComer;
vComer=function(){const p=P();let h=_vComer();
  const dTxt={veggie:" vegetarianas",vegano:" veganas",pesce:" pescetarianas",medit:" de estilo mediterráneo",flexi:" con poca carne",prote:" altas en proteína",lowcarb:" bajas en hidratos"}[p.dieta]||"";
  if(LC.pais!=="AR")h=h.replace("Comidas argentinas de todos los días, con verduras y frutas de temporada en Cuyo","Comidas caseras de todos los días, con verduras y frutas de temporada");
  if(dTxt)h=h.replace("Comidas argentinas de todos los días","Comidas argentinas"+dTxt+" de todos los días").replace("Comidas caseras de todos los días","Comidas caseras"+dTxt+" de todos los días");
  if(comerTab==="plan"&&(p.dieta==="veggie"||p.dieta==="vegano")){const nota=p.dieta==="vegano"?`<p class="note green" style="margin-top:10px">🌱 Plan vegano. La vitamina B12 no está en los alimentos vegetales: hace falta tomarla como suplemento. Consultá la dosis con tu médico o nutricionista.</p>`:`<p class="note green" style="margin-top:10px">🌱 Plan vegetariano: las legumbres, el huevo, los lácteos y la soja aportan las proteínas.</p>`;
    const extra=(esMenor(p)||(p.limits||[]).includes("embarazo"))?`<p class="note" style="margin-top:8px">En chicos, adolescentes y durante el embarazo, una alimentación ${p.dieta==="vegano"?"vegana":"vegetariana"} conviene armarla con un nutricionista.</p>`:"";
    const i=h.indexOf("</h2>",h.indexOf('class="glass org1"'));if(i>0){const j=h.indexOf("</div>",i);const k=j>0&&j-i<200?j+6:i+5;h=h.slice(0,k)+nota+extra+h.slice(k)}}
  if(comerTab==="hoy"){const marca='<section class="glass org1">';const a=h.indexOf(marca);if(a>=0){const b=h.indexOf("</section>",a);if(b>0)h=h.slice(0,b+10)+ayunoCard(p)+h.slice(b+10)}}
  return h};

/* ---------- Acciones ---------- */
const _ca=window.comerAct;
window.comerAct=function(a,v){const p=P();
  switch(a){
  case "c2-foto":FOTO=null;abrirFoto(v==="receta"?"receta":FMODO);return true;
  case "fadd":FMODO="dia";return _ca(a,v);
  case "c2-frecini":FOTO=null;abrirFoto("receta");return true;
  case "c2-frec":leerFoto();fotoAReceta();return true;
  case "rpor":if(RED&&RED.foto){leerReceta();const n=+v,o=Math.max(1,RED.por);for(const k in RED.i)RED.i[k]=Math.round(RED.i[k]/o*n);RED.por=n;dibReceta();
    const sh=document.querySelector("#layer .sheet h2");if(sh){const x=document.createElement("p");x.className="note c2-fnota";x.style.marginTop="8px";x.textContent="Cantidades ajustadas para "+n+" porciones.";sh.after(x)}return true}return _ca(a,v);
  case "c2-iaabrir":abrirIA(v);return true;
  case "c2-iaotra":abrirIA(null);return true;
  case "c2-fprompt":{const t=promptPlato();try{copiarPP(t).then(()=>toast("Texto copiado: pegalo en tu IA junto con la foto"),()=>toast("No se pudo copiar"))}catch(e){toast("No se pudo copiar")}return true}
  case "c2-fpaste":try{leerPP().then(t=>{$("#c2-ftxt").value=t},()=>toast("Mantené apretado el cuadro y elegí «Pegar»"))}catch(e){toast("Mantené apretado el cuadro y elegí «Pegar»")}return true;
  case "c2-fcalc":{const r=importarReceta(($("#c2-ftxt")||{}).value||"");if(!Object.keys(r.i).length){toast("No encontré ingredientes: pegá la tabla que te dio la IA");return true}
    const por=Math.max(1,r.por||1);const i={};for(const [k,g] of Object.entries(r.i))i[k]=g/por;FOTO={n:r.n,i,no:r.no.concat(r.sinq)};if(FMODO==="receta"){fotoAReceta();if(FOTO.no.length)toast("No reconocí: "+FOTO.no.join(", "));return true}dibFoto();return true}
  case "c2-fdel":leerFoto();delete FOTO.i[v];if(!Object.keys(FOTO.i).length){abrirFoto();return true}dibFoto();return true;
  case "c2-fsave":{leerFoto();const it=itemLibre(FOTO.n,FOTO.i,p);it.meal=FSEL.meal;diaComida(p).push(it);if(p.ayuno&&it.kcal>15&&!(window.diaSelC&&diaSelC()!==TODAY()))terminarAyuno(p,true);save();closeSheet();comerTab="hoy";if(current!=="comer")location.hash="#comer";else render();toast("Anotado · calidad "+it.q);return true}
  case "c2-cod":abrirCodigo();return true;
  case "c2-codbus":resolverCodigo(($("#c2-codnum")||{}).value||"");return true;
  case "c2-mano":abrirMano({});return true;
  case "c2-mansave":{const n=(($("#c2-mn")||{}).value||"").trim();const kc=num("#c2-mk");if(!n){toast("Ponele un nombre");return true}if(!kc){toast("Cargá las calorías cada 100 g");return true}
    const q=num("#c2-mq")||100;const x={id:v?"off"+v:"man"+uid(),code:v||"",n,c:($("#c2-mu")||{}).value||"otro",kcal:Math.round(kc),hc:num("#c2-mh"),p:num("#c2-mp"),g:num("#c2-mg"),fib:num("#c2-mf"),na:num("#c2-ms"),tacc:2,u:{porción:Math.round(q)},src:"mano"};
    prodGuardar(x);abrirPorcion("alimento",x.id);return true}
  case "c2-ayuno":abrirAyuno();return true;
  case "c2-aymeta":p.ayunoMeta=+v;save();abrirAyuno();return true;
  case "c2-aymed":p.ayunoOkMed=!p.ayunoOkMed;save();abrirAyuno();return true;
  case "c2-ayini":{const bl=ayunoBloqueo(p);if(bl){toast(bl);return true}if(ayunoMed(p)&&!p.ayunoOkMed){abrirAyuno();return true}
    p.ayuno={ini:Date.now(),meta:+v||14};save();closeSheet();if(current!=="comer")location.hash="#comer";comerTab="hoy";render();toast("Ayuno de "+p.ayuno.meta+" h en marcha · tomá agua");return true}
  case "c2-ayfin":terminarAyuno(p);render();return true;
  case "fsave":{const r=_ca(a,v);if(p.ayuno){const f=(L(p.id).days[TODAY()]||{}).food||[];const last=f[f.length-1];if(last&&last.kcal>15&&last.ts>p.ayuno.ini){terminarAyuno(p,true);render()}}return r}
  }
  return _ca(a,v)};
})();
