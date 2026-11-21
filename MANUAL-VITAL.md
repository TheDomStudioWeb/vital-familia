# Vital · Manual interno (para Claudio)

**Qué es:** app gratuita de salud y ejercicio para Daniel y su familia (5 integrantes al inicio, hasta 30–40). Sin anuncios ni pagos. Cada persona entra con su cuenta de Google desde su teléfono; los datos se guardan en Firebase y funcionan sin conexión. Entre familiares solo se comparte la actividad (minutos, días, racha, etapa, logros); presión, peso, glucosa y check-in son privados.
**Versión:** 2 · aprende y evoluciona con cada persona.
**Desarrollado por:** The DOM Studio Web · WhatsApp 261-3431216 · thedomstudioweb@gmail.com

## Idea central
Vital une dos cosas que en otras apps se cobran por separado:
1. **Saber cómo estás hoy** (check-in → puntaje de preparación, como Garmin, Whoop u Oura, pero sin reloj).
2. **Entrenar según eso** (rutina que se arma sola, como Fitbod, con instrucciones claras, como Nike Training Club).

## Pantallas (barra inferior)
| Pestaña | Para qué sirve |
|---|---|
| **Hoy** | Saludo, puntaje de preparación (0–100) con su explicación, anillos del día (movimiento, pasos, agua), rutina sugerida, semana con racha y minutos (meta OMS 150), recuperación de cada músculo. |
| **Entrenar** | Armar rutina por enfoque (cuerpo completo, tren superior, inferior, cardio, movilidad) y duración (10 a 45 min). Rutinas rápidas: Pausa activa, Equilibrio, En familia, Antes de dormir. Biblioteca de 58 ejercicios. Historial. |
| **Salud** | Registro y tendencia de peso (con IMC), presión, pulso en reposo, glucosa en ayunas, cintura y sueño. Cada valor trae una interpretación simple. «Lo que dicen tus datos»: relaciones encontradas (ej.: preparación con o sin 7 h de sueño). |
| **Familia** | Un perfil por integrante, reto familiar semanal (minutos de todos suman a un anillo común), cambiar de perfil. |
| **Evolución** | Camino de 6 etapas, días cumplidos esta semana y la anterior, minutos de las últimas 8 semanas, chequeos mensuales con su mejora, «Lo que Vital aprendió de vos» (medida justa de cada ejercicio, horario habitual, favoritos, desbloqueos) y 13 logros. |
| **Perfil** (tocando tu nombre arriba) | Editar datos, voz guía, sonido, modo liviano, cuenta, grupo familiar, cerrar sesión. |

## Cómo se usa (paso a paso)
1. **Primera vez:** nombre, ícono, año de nacimiento, sexo, altura y peso → objetivo, nivel, minutos por rutina, meta de pasos → equipo en casa y zonas a cuidar → chequeo de seguridad PAR-Q (5 preguntas).
2. **Cada mañana:** check-in de 30 segundos (horas y calidad de sueño, energía, estrés, molestia muscular, dolor o enfermedad).
3. **Ver la rutina:** «Ver mi entrenamiento». Cada ejercicio se puede cambiar (⇄) o consultar (i). «↻ Otra» arma una distinta.
4. **Entrenar:** el reproductor guía paso a paso: temporizador, conteo de repeticiones, descansos, voz y pitidos. Muestra cómo se hace cada ejercicio.
5. **Al terminar:** marcar el esfuerzo de 1 a 10 y guardar.
6. **Anillos:** +10 min de actividad, cargar pasos (copiados de Samsung Health o Google Fit), +1 vaso de agua.

## Cómo aprende y evoluciona (lo central)
**1. Camino por etapas** (pensado para gente sedentaria):
| Etapa | Nombre | Rutina | Días/sem | Min/sem |
|---|---|---|---|---|
| 1 | Despertar | 10 min | 3 | 60 |
| 2 | Hábito | 15 min | 3 | 90 |
| 3 | Base | 20 min | 3 | 120 |
| 4 | Activo | 25 min | 4 | 150 (meta OMS) |
| 5 | En forma | 30 min | 4 | 200 |
| 6 | Imparable | 40 min | 5 | 250 |
Arranque: «poco o nada» → etapa 1; «me muevo seguido» → 3; «entreno hace tiempo» → 5.
Cada lunes revisa las dos semanas anteriores. Si cumplió los días dos semanas seguidas con esfuerzo promedio de 7,5 o menos, **propone subir**. Si no llegó a la mitad de los días dos semanas seguidas, **propone bajar** sin culpa. La persona acepta o deja para después.

**2. Medida justa por ejercicio:** al terminar cada ejercicio la app pregunta «Fácil / Justo / Difícil».
- Fácil y completo → +2 repeticiones (o +10 s). Justo → +1 (o +5 s). Difícil o incompleto → baja 1 (o −5 s).
- Fácil dos veces seguidas (o 16 repeticiones, o 75 s) → **desbloquea** la variante más difícil.
- Difícil dos veces → la próxima vez usa la variante más fácil; cuando esa sale fácil, vuelve a la original.

**3. Preferencias:** cambiar un ejercicio (⇄) o saltearlo hace que aparezca menos; los que salen bien aparecen más.
**4. Meta de pasos:** sigue el promedio real de la semana (sube de a 500 si la cumple, baja si queda muy lejos).
**5. Chequeo mensual (5 min):** sentarse y pararse en 30 s, plancha máxima y equilibrio en una pierna. Muestra el porcentaje de mejora desde el primero.
**6. Al guardar cada entrenamiento** aparece «Lo que aprendí hoy» con los cambios que hizo.

## Cómo decide (para explicarlo)
- **Preparación:** sueño 35 %, energía 25 %, estrés 20 %, molestia muscular 20 %, menos la carga de los últimos 2 días. Si el pulso en reposo de hoy supera en 7 lpm el promedio, resta. Con dolor queda en 52 como máximo; enfermo, 22 como máximo.
- **Modos:** 75+ Para empujar · 55–74 Constante · 35–54 Suave · menos de 35 Recuperar (solo movilidad, equilibrio y caminata).
- **Seguridad:** si el PAR-Q tiene algún «sí» o marcó corazón/presión, nunca pasa de «Constante» y se recomienda consultar al médico.
- **Rutina:** entrada en calor → fuerza (prioriza músculos más recuperados) → equilibrio (60+ años o movilidad) → cardio → vuelta a la calma. Filtra por equipo, nivel, edad y zonas a cuidar. El dolor marcado en el check-in suma esa zona a las evitadas.
- **Objetivos:** fuerza (3×8, descanso largo), bajar de peso (circuito, descanso corto), resistencia (3×15), salud general (2×12).
- **Progresión:** si la vez anterior completó todas las series, suma una repetición; si le sobra, propone la variante más difícil.
- **Recuperación muscular:** cada músculo vuelve al 100 % en 36 a 76 horas según el esfuerzo y la duración.

## Referencias de valores
- Presión: normal <120/80 · elevada 120–129 · alta etapa 1 130–139 u 80–89 · etapa 2 ≥140 o ≥90 · crisis >180 o >120 → consulta inmediata.
- Glucosa en ayunas: <70 baja · 70–99 normal · 100–125 elevada · ≥126 alta.
- Pulso en reposo habitual 60–100. Cintura de riesgo: 88 cm (mujer), 102 cm (hombre).
- OMS: 150–300 min semanales moderados, fuerza 2 días; equilibrio 3 días para mayores de 60. Sueño de 7 a 9 h.

## Muñeco 3D
En el detalle de cada ejercicio y en el entrenamiento guiado, un maniquí 3D muestra el movimiento en loop (23 ejercicios por ahora; el resto muestra el ícono). Se apaga en Perfil y ajustes → «Muñeco 3D», y no se carga en modo liviano.

## Condiciones de salud (privadas)
En el alta: diabetes, uso de insulina, celiaquía, presión alta.
- **Diabetes:** antes de cada entrenamiento pide medir la glucosa (queda registrada). Menos de 70 mg/dL → no entrenar y tratar la baja. Entre 70 y 99 con insulina → comer una colación con hidratos antes. Más de 250 → seguir la indicación médica; si hay cetonas o malestar, no entrenar. Al terminar recuerda volver a medir.
- **Presión alta:** la intensidad máxima queda en «Constante».
- **Celiaquía:** se guarda para el módulo de alimentación (sin TACC).
Siempre aclara que orienta y no reemplaza la indicación médica.

## Para quien ya entrena (gimnasio, deportes, clases)
- En el alta (o editando el perfil) se eligen las **actividades habituales**: gimnasio/pesas, funcional/crossfit, running, caminata, ciclismo, spinning, natación, fútbol, vóley, básquet, tenis/pádel, hockey, rugby, pole dance, baile/zumba, yoga, pilates, boxeo/artes marciales, senderismo, escalada.
- **Registrar actividad** (en Hoy o en Entrenar): deporte, día (hoy o ayer), hora de inicio, duración, intensidad (suave, moderada, intensa, al máximo), en gimnasio qué grupos trabajó, distancia si corresponde y una nota. No hace falta hacer las rutinas de Vital.
- Lo registrado **suma igual** que una rutina de Vital: minutos de la semana y del reto familiar, días activos para subir de etapa, racha, logros, carga para la preparación del día siguiente y recuperación de los músculos que se usan en ese deporte. Muestra un gasto calórico estimado (adultos).
- Tarjeta **«Tu entrenamiento»** en Hoy: consejo según la preparación del día (empujar, normal, bajar un cambio o descansar) y aviso si los músculos de su deporte todavía no se recuperaron.
- **Complementos opcionales por deporte** (10 a 15 min): prevención y fuerza específica, por ejemplo isquios, glúteos y equilibrio para fútbol; tobillos, glúteos y core para running; hombros, core y espalda para pole dance; movilidad para gimnasio.
- Si el reloj registró una actividad, aparece «Completar»: se elige el deporte y la intensidad y queda como una sola actividad (no se cuenta dos veces). El pulso del reloj se asocia a esa actividad.
- En **Evolución**: «Tus actividades» con minutos, veces y kilómetros por deporte en las últimas 4 semanas.
- Las rutinas de Vital quedan como «Rutina de Vital (opcional)».

## Rutinas rápidas
Pausa activa (8 min), Equilibrio (10), En familia (15, sin impacto), Antes de dormir (7) y **Snack de movimiento** (3 min, para cortar las horas sentado 2 o 3 veces por día).

## Familia
- El primero crea el grupo y recibe un código de 6 letras. Lo copia desde Familia → «Copiar invitación» y lo manda por WhatsApp.
- Los demás entran con Google, completan su perfil y ponen el código.
- Reto familiar: suma los minutos de todos contra la suma de las metas de cada uno, así el que arranca aporta igual que el que entrena.

## Frases para Claudio
- «Vital orienta, no diagnostica. Si hay dolor de pecho, falta de aire o mareos, se para y se consulta.»
- «Si tenés poco tiempo, la Pausa activa dura 8 minutos.»
- «Para los abuelos: la rutina de Equilibrio previene caídas.»
- «Para pasar los datos a otro teléfono: Perfil → Exportar copia, y en el otro, Importar copia.»

## Análisis que dio origen a Vital
| App | Lo mejor | Lo que falla |
|---|---|---|
| Nike Training Club | Gratis, videos claros, mucha variedad | Sin personalización ni progresión |
| Fitbod | Rutina adaptada a equipo y recuperación | Solo fuerza; de pago tras la prueba |
| Apple Fitness+ / Peloton | Clases de calidad, anillos motivadores | Pago y atado a su ecosistema |
| Garmin / Whoop / Oura | Puntaje de preparación diario | Requiere comprar el dispositivo y a veces suscripción |
| Samsung Health / Google Fit | Gratis, juntan datos | Muestran datos sin decir qué hacer; pantallas recargadas |
| Strong / MyFitnessPal | Registro detallado | Funciones clave detrás del pago |
Quejas generales del rubro: muros de pago, publicidad en medio del entrenamiento, rutinas pensadas para atletas y no para la gente común, dificultad para exportar los datos. Vital ataca las cuatro.

## Puesta en marcha (Firebase, una sola vez)
1. Crear el proyecto **vital-familia** en console.firebase.google.com con la cuenta solocorel5@gmail.com (sin Analytics ni Gemini).
2. Authentication → Método de acceso → activar **Google**.
3. Firestore Database → Crear base de datos → modo producción → región `southamerica-east1` (São Paulo).
4. Configuración del proyecto → Tus apps → **Web** (</>) → registrar «Vital» → copiar el objeto `firebaseConfig`.
5. En `public/index.html`, reemplazar `const FIREBASE_CONFIG = null;` por `const FIREBASE_CONFIG = { …lo copiado… };`.
6. En la carpeta del proyecto (Windows, con Node y firebase-tools): `firebase login`, `firebase use --add` (elegir vital-familia) y `firebase deploy`. Sube la app y las reglas de seguridad.
7. Abrir `https://vital-familia.web.app`, entrar con Google, crear el grupo familiar y mandar la invitación.
Plan gratuito (Spark): alcanza de sobra para 30–40 personas.

## Comer (alimentación)
Pestaña 🥗 **Comer**, con tres partes:
- **Hoy:** anillos de calidad del día (0–100), calorías de referencia (solo adultos y con peso y altura cargados) y gramos de frutas y verduras (meta 400 g). Botón «Registrar comida»: elegís la comida del día (desayuno, almuerzo, merienda, cena, colación), buscás un plato, una receta de casa o un alimento suelto, elegís la porción y ves calidad, calorías, hidratos (en gramos y en porciones de 15 g), proteínas, grasas, fibra y sodio, con consejos para mejorar el plato. «Del plan de hoy» anota con un toque el almuerzo o la cena planificados. Gráfico de calidad de la semana.
- **Plan semanal:** 7 días de desayuno, almuerzo, merienda y cena con comidas argentinas caseras (milanesas al horno, guisos, tartas, tortilla, merluza, wok, locro en invierno, etc.), priorizando verduras y frutas de temporada en Cuyo, máximo 3 comidas con carne roja, al menos pescado una vez y legumbres dos veces. Las porciones se ajustan a la referencia de calorías. Lista de compras por rubro (verdulería, carnicería, lácteos, almacén) para la cantidad de personas elegida, con botón para copiarla a WhatsApp.
- **Recetas de casa:** se carga la receta para toda la olla (ingredientes en gramos, con medidas caseras de ayuda) y cuántas porciones rinde; Vital calcula todo por porción. Se puede compartir con la familia para que todos la registren.

**Importar receta** (Recetas → Nueva → «📋 Importar desde foto o texto copiado»): mismo sistema que «Ganancias por servicio».
- Desde una foto: «Copiar el texto para la IA» → en Claude, ChatGPT o Gemini se sube la foto y se pega ese texto → la IA devuelve una tabla (RECETA | nombre | porciones · Ingrediente | Cantidad | Unidad) → se pega en Vital → «Importar».
- Desde internet o WhatsApp: se copia la lista de ingredientes tal cual («500 g de carne», «2 papas», «1 cda de aceite», «1/2 taza de…») y se pega.
- Vital reconoce el nombre de la receta, las porciones, cada ingrediente (con sinónimos: nalga, mozzarella, tomate triturado…), convierte medidas caseras a gramos, pasa arroz, fideos y legumbres de crudo a cocido, separa los condimentos (no suman) y avisa qué no reconoció o qué quedó sin cantidad. Después se revisa y se guarda.
- Es gratis: Vital no usa una IA paga; la IA la pone cada uno con su propia cuenta, solo para el caso de la foto.

**Calidad del plato:** se basa en el plato saludable de las Guías Alimentarias argentinas: suma por verduras y frutas (ideal: medio plato), fibra, proteínas y legumbres; resta por ultraprocesados, azúcar agregada y exceso de sodio. 75+ muy bueno · 55–74 bien · 35–54 mejorable · menos de 35 para de vez en cuando.
**Calorías de referencia:** Mifflin–St Jeor × actividad según la etapa; con objetivo «bajar de peso», déficit de hasta 15 % (máximo 500 kcal) y nunca por debajo del metabolismo basal ni de 1200 (mujeres) / 1500 (hombres) kcal. Es orientativo y no reemplaza a un nutricionista.
**Celiaquía:** todo se calcula y se planifica en versión sin TACC (pan, fideos, rebozador, masas, premezcla, salsa de soja), saca la avena, marca «verificar logo» en productos de riesgo (fiambres, quesos rallados, yerba, yogures) y recuerda cocinar aparte para evitar la contaminación cruzada.
**Diabetes:** muestra hidratos por plato, por comida y del día, prefiere platos con menos de 65 g de hidratos y saca las facturas del plan; la distribución la define su médico.
**Menores de 18:** no se muestran calorías; solo calidad y variedad.
Valores nutricionales aproximados por 100 g.

## Novedades de noviembre 2026 (pedidos de usuarios nuevos)
- **Alimentación vegetariana y vegana.** Se elige en el perfil («¿Cómo comés?»: Como de todo / Vegetariana / Vegana). El plan semanal solo usa platos aptos; Vital decide solo si un plato es apto mirando sus ingredientes (carne o pescado → no vegetariano; huevo, lácteos, miel o manteca → no vegano). Hay platos nuevos: guiso de lentejas vegano, hamburguesas de lentejas, wok de tofu, boloñesa de soja, quinoa, paella de verduras, gazpacho, pisto, desayunos con bebida vegetal, hummus o pasta de maní. Plan vegano: avisa que la vitamina B12 va como suplemento. En chicos, adolescentes o embarazo recomienda armarlo con nutricionista.
- **Dolores y articulaciones.** «¿Algo que haya que cuidar?» y el «¿Dónde?» del check-in suman Codos, Cuello, Cadera y Tobillos / pies (además de rodillas, espalda baja, hombros y muñecas). Vital saca los ejercicios que cargan esa zona.
- **País e idioma.** En Perfil → «Idioma y país». Idiomas: Español de Argentina (con vos), Español con tú (para España, Canadá y otros) e Inglés. Países: Argentina, España, Canadá u otro. Con España o Canadá: los alimentos se llaman como allá (patata, plátano, aguacate, calabacín, judías verdes…), no aparecen productos que casi no se consiguen (mate, bizcochitos), y las temporadas de frutas y verduras se corren 6 meses (verano en julio). La primera vez lo detecta solo por el idioma y la zona horaria del teléfono; también se cambia desde la pantalla de bienvenida. La voz guía habla en el idioma elegido.
- **Registrar comida más rápido** (tres botones arriba de «Registrar comida»):
  - 📸 **Foto del plato:** sacás la foto, copiás el texto para la IA (Claude, ChatGPT o Gemini), pegás la tabla que devuelve y Vital calcula calorías, hidratos y calidad. Antes de agregar se pueden corregir los gramos.
  - ▥ **Código de barras:** foto del código o escribir los números. Busca el producto en Open Food Facts (base libre). Si no está, se carga una vez a mano y queda guardado en el teléfono.
  - ✍️ **Cargar a mano:** datos de la tabla nutricional del envase (por 100 g) y cuánto pesa una porción. Arriba hay un cuadro para **pegar la tabla entera** (copiada con Google Lens o de la web del producto): con «Pegar» o «Completar los datos» se llenan solos los casilleros. Si la tabla es por porción, como casi todas en Argentina, la pasa sola a 100 g. Siempre conviene revisar los números.
- **Pastas frescas y rellenas** como ingredientes: ñoquis, ravioles (de ricota y verdura o de carne/pollo), agnolotis, sorrentinos, capeletis, canelones, tallarines al huevo y lasaña, con versión sin TACC para ñoquis y ravioles. Se cargan por peso fresco, como vienen en el paquete. También se reconocen al importar una receta o una foto del plato. Platos nuevos: ñoquis con salsa de tomate y ravioles con fileto.
- **Receta desde la foto de un plato:** Comer → Recetas → Nueva → Importar → «Desde la foto de un plato que cocinaste». La IA estima un plato servido, Vital lo multiplica por las porciones que elegís para la olla (al cambiar las porciones, las cantidades se ajustan solas) y queda guardada como receta de casa. También desde «Foto del plato» al registrar la comida: botón «Guardar también como receta de casa».
- **Cortes de carne** (Argentina, España e Italia): vacunos (lomo/filet, bife angosto o de chorizo, bife ancho u ojo de bife, costeleta, cuadril, colita y tapa de cuadril, tapa de nalga, roast beef, paleta/palomita, carnaza, osobuco, vacío, matambre, entraña, tapa de asado, falda, rabo, picada común), achuras (lengua, hígado, mondongo, molleja, chinchulines, morcilla), cerdo (solomillo, bondiola, carré, pechito, matambre, panceta, jamón crudo, salame), cordero, chivito, pollo con piel, alitas y conejo. Se reconocen también por su nombre en España (solomillo, lomo bajo, chuletón, morcillo, picaña, callos…) y en Italia (ossobuco, filetto, controfiletto, fiorentina, guanciale, prosciutto…). Los cortes con hueso (osobuco, costeleta, carré, falda) se cargan con el peso tal como se compran. Plato nuevo: osobuco braseado con risotto.
- **Ayuno intermitente** (tarjeta «⏱ Ayuno» en Comer → Hoy): 12, 14 o 16 horas, con anillo que avanza, hora de inicio y de fin, e historial. No se ofrece a menores, en embarazo ni con bajo peso; con diabetes o insulina pide confirmar que lo indicó el médico. Si registrás una comida durante el ayuno, se cierra solo.

### Frases para Claudio (novedades)
- «Para comer vegetariano: Perfil → Editar → paso 3 → ¿Cómo comés? → Vegetariana. Después rehacé el plan en Comer → Plan semanal.»
- «Para usar Vital en España o Canadá: Perfil → Idioma y país.»
- «Para registrar un plato con foto: Comer → Registrar comida → Foto del plato.»
- «Para escanear un paquete: Comer → Registrar comida → Código de barras.»
- «El ayuno está en Comer → Hoy → Ayuno. Es opcional.»

## Planes y cobro (desde noviembre 2026)
- Cada cuenta nueva tiene **14 días de prueba gratis**. Después, un plan por familia: **anual $100.000** (2 meses gratis) o **mensual $10.000** con débito automático por Mercado Pago.
- El plan del que creó el grupo familiar cubre a toda la familia, hasta 6 personas. Los demás se suman con el código del grupo.
- El estado se ve en **Perfil → ⭐ Tu plan**. Cuando vence, Vital muestra la pantalla de planes; los datos quedan guardados y vuelven al pagar.
- Después de pagar, el plan se activa solo. Si no, botón **«Ya pagué: verificar»**.
- La familia de Daniel tiene **cortesía** (sin vencimiento). Daniel administra todo desde **Perfil → 🛠 Panel de administrador**: buscar por mail, dar cortesía, sumar 1 mes o 1 año, o cortar el acceso.
- Frases para Claudio: «Para pagar Vital: cuando termina la prueba aparece la pantalla de planes, o desde Perfil → Tu plan → Ver planes.» · «Si ya pagaste y no se activó, tocá Ya pagué: verificar.» · «Para que te cubra el plan de tu familia, pedí el código del grupo y tocá Unirme.»

## Rutina armada: cómo se empieza (noviembre 2026)
- Al tocar **✨ Generar rutina** se abre la lista de ejercicios. Arriba y abajo (siempre visible) está **▶ Empezar rutina**: arranca el reproductor con los ejercicios uno atrás del otro, los descansos, el muñeco 3D y la voz guía.
- Desde la lista, **i** muestra cómo se hace cada ejercicio y **⇄** lo cambia por otro. En la ficha del ejercicio está **← Volver a la rutina**, y si tocás «Probarlo ahora», al terminar volvés a la misma rutina.
- La rutina queda guardada para el día: en **Entrenar** aparece la tarjeta **Tu rutina de hoy** con «Ver ejercicios» y «▶ Empezar», sin tener que generarla de nuevo (no cambian los ejercicios). Cuando la completás y la guardás, la tarjeta desaparece.
- Frase para Claudio: «Para hacer la rutina completa, tocá Empezar rutina: los ejercicios pasan solos uno atrás del otro con los descansos.»

## Actualizaciones
- Web (iPhone): se actualiza sola para todos después de cada `firebase deploy`.
- APK (Android): al abrirse, revisa si hay versión nueva en GitHub y muestra «Hay una versión nueva de Vital» con el botón «Descargar actualización»; se instala encima sin perder datos.
- Pasos para publicar la web desde la PC: `cd C:\Proyectos\vital-familia` → `git pull` → `firebase deploy --only hosting` (si cambiaron las reglas: `firebase deploy --only hosting,firestore:rules`).

## App para Android (APK) y reloj
- Se descarga desde GitHub → repo **TheDomStudioWeb/vital-familia** → **Releases** → `Vital.apk` (cada cambio en el código genera una nueva versión sola).
- Entra con Google de forma nativa (misma cuenta y mismos datos que la web).
- **Perfil y ajustes → Reloj y Health Connect → Conectar:** pide permiso para leer pasos, pulso, pulso en reposo, sueño, peso, presión, glucosa, calorías y actividades. Vital solo lee: no escribe nada.
- Qué hace con eso: pasos del día y de la semana (anillo con ⌚), horas de sueño precargadas en el check-in, pulso en reposo (si sube 7 lpm sobre el promedio, baja la intensidad), actividades del reloj (caminatas, bici, etc.) que suman a los minutos y al reto familiar, y el pulso promedio y máximo de cada entrenamiento hecho en Vital. Si el pulso de una semana fue muy alto, no propone subir de etapa.
- Se actualiza al abrir la app (cada 10 minutos como mucho) o con «Sincronizar ahora».
- Cómo conectar cada reloj: Samsung Health → Configuración → Health Connect; Garmin Connect → Más → Configuración → Aplicaciones conectadas → Health Connect; genéricos: buscar Health Connect en su app o usar Gadgetbridge.
- iPhone: sigue usando la web https://vital-familia.web.app con carga manual.
- La llave de firma (vital.keystore) y su clave están guardadas fuera del repo: sin ellas no se puede actualizar la app instalada.

## Hoja de ruta acordada
1. Firebase + prueba con 2 teléfonos (Google, grupo familiar, invitación).
2. APK con Capacitor + Health Connect: Samsung (Samsung Health), Motorola (Health Connect del sistema), Garmin (activar Health Connect en Garmin Connect), relojes genéricos chinos (según su app; alternativa Gadgetbridge o el podómetro del teléfono). iPhone sigue con la versión web.
3. Alimentación: plan argentino por temporada con lista de compras, recetas familiares con calorías y puntaje de calidad, modo sin TACC con aviso de contaminación cruzada, hidratos por porción para diabetes, sin dietas restrictivas para chicos.

## Pendientes / ideas
- Leer pasos automáticamente (requiere app nativa con Health Connect).
- Recordatorio diario de check-in y de «snack de movimiento» (notificaciones).
- Ilustraciones o animaciones propias de cada ejercicio.
- Perfiles a cargo (chicos o abuelos sin teléfono) dentro de la cuenta de otro integrante.
- Retos familiares temáticos (ej.: semana de pasos).

## Familia y plan: quién cubre a quién (actualización 18/11)
- Un plan **mensual, anual o de cortesía** cubre a todo el grupo familiar. La prueba gratis de 14 días cubre solo a la persona, no a su familia.
- Lo puede pagar quien creó el grupo **o cualquier integrante**: si alguien con plan pago o cortesía está en un grupo que no creó, Vital lo anota solo como «el que paga» y cubre a todos.
- Los planes pagos cubren hasta 6 personas; la cortesía no tiene tope.
- Al sumarse con el código, en Perfil → Tu plan aparece «Cubierto por el plan de tu familia (cortesía de Daniel)», aunque su prueba propia siga corriendo.
- En el panel de administrador, los cubiertos por su familia aparecen con la etiqueta «👨‍👩‍👧 Familia» y dicen quién los cubre. Si alguien está en un grupo que no tiene plan que lo cubra, también se avisa.

## Ingreso en iPhone
- El ingreso con Google ahora se hace en el mismo dominio de la app (vital-familia.web.app). Antes Safari perdía el resultado y volvía a pedir la cuenta, sobre todo con la app instalada en la pantalla de inicio.
- Mientras termina el ingreso aparece «Entrando con Google…».
- En iPhone, la app instalada y Safari no comparten la sesión: hay que entrar una vez en cada uno.

## Pegar en la app de Android (20/11)
- El botón «Pegar» de la foto del plato y de importar receta ahora usa el portapapeles del teléfono directamente. Antes, en la app de Android, el navegador interno no lo dejaba leer y había que mantener apretado el cuadro.
- Si algo falla, se puede pegar igual con el ícono de portapapeles del teclado de Samsung o manteniendo apretado el cuadro → Pegar.

## Alimentación ampliada, recetario sin TACC y niveles (20/11)
Pedido de usuarios: más tipos de alimentación y que quien ya entrena no arranque como principiante.

**Formas de comer** (se elige una, en Perfil → Editar → «¿Cómo comés?»): Como de todo, Flexitariana (poca carne: carne roja una vez por semana), Mediterránea (más pescado, legumbres y aceite de oliva), Pescetariana (sin carne, con pescado y mariscos), Vegetariana, Vegana, Alta en proteína y Baja en hidratos (no es keto).

**Condiciones de salud nuevas:** colesterol alto (menos carnes grasas, embutidos y manteca; carne roja hasta 2 veces por semana) y embarazo o lactancia (sin fiambres crudos, hígado ni alcohol). La presión alta ahora también elige platos con menos sodio.

**Alergias e intolerancias** (se pueden marcar varias): intolerancia a la lactosa, alergia a la leche, huevo, frutos secos, maní, pescado, mariscos y soja.
- El plan semanal saca los platos que las tienen.
- Con lactosa, la leche y el yogur pasan a deslactosados. Con alergia a la leche, a bebida y yogur vegetal.
- Si alguien registra algo que tiene un alérgeno, aparece «⚠ Ojo: tiene huevo» (o lo que corresponda).
- Arriba del plan aparece un cuadro con lo que Vital está cuidando y el aviso de que no reemplaza al médico ni al nutricionista.

**Recetario sin TACC** (Comer → Recetas, debajo de las recetas de casa): 16 recetas aptas para celíacos, como pizzetas de batata, risotto, pancitos de quinoa, bizcochitos de queso, hamburguesas de garbanzos, wraps de espinaca, crackers, brownies, alfajores y zapallo relleno. Cada una tiene ingredientes, pasos, calorías y calidad por porción, y un botón «Anotar una porción». Algunas entran también al plan semanal. Se basan en ideas del recetario de Natural.nu (Lic. Carolina Maggi), reescritas y corregidas:
- Pancitos de quinoa: la avena se cambió por harina de arroz, porque en Argentina la avena no se considera apta.
- Hamburguesas de garbanzos: se sacó el germen de trigo, que tiene TACC.
- Crackers: los copos de maíz tienen que tener el logo Sin TACC, porque los comunes suelen llevar malta de cebada.

**Nivel por actividad.** Cuando alguien marca una actividad (running, gimnasio, natación, etc.), Vital le pregunta su nivel con una medida propia de cada actividad:
- Pesas: hace cuánto entrena y si maneja progresiones de carga.
- Running: cuánto corre sin parar (menos de 10 minutos / unos 5 km / 10 km o más).
- Caminata, bici, natación y trekking: tiempo o distancia.
- Deportes y clases: hace cuánto lo practica.
Niveles: Inicial, Intermedio y Avanzado, más «Estoy retomando» para quien estuvo parado (arranca un escalón abajo). Se cambia en el perfil (botón «Niveles»), en la tarjeta «Tu entrenamiento» o al registrar una actividad. En running, bici y natación, el nivel ajusta las calorías estimadas. Si las últimas 3 sesiones de una actividad fueron suaves y de 30 minutos o más, Vital propone subir de nivel; se puede aceptar o decir «Todavía no».

### Frases para Claudio (20/11)
- «Para elegir tu forma de comer, entrá a Perfil, tocá Editar y bajá hasta “¿Cómo comés?”.»
- «Las alergias se marcan en el mismo lugar: el plan saca lo que no podés comer.»
- «El recetario sin TACC está en Comer → Recetas, abajo de todo.»
- «Si ya entrenás, contale a Vital tu nivel: así no te trata como principiante.»

### Próxima tanda (acordada)
1. Elongación de glúteo y fascia lata (cintilla iliotibial) y running progresivo con calentamiento, carrera y vuelta a la calma, que arranca según el nivel elegido.
2. «Cargá tu rutina»: el que va al gimnasio carga su rutina, registra cargas y Vital le sugiere la próxima (regla: 3 sesiones limpias antes de subir).
3. Calistenia, musculación y Tai Chi (también en silla).

## Cargar comidas de días pasados (20/11)
- En Comer → Hoy, arriba aparece el día con flechas ‹ y ›. Con ‹ se va a días anteriores (hasta 30 días atrás) para anotar lo que alguien se olvidó de cargar.
- Mientras se mira un día pasado aparece el aviso «Lo que anotes ahora queda en …» y el botón «Volver a hoy». Al registrar también se ve «Se anota en: …».
- Se pueden anotar y borrar comidas de ese día, y los anillos de calidad, calorías y hidratos muestran ese día.
- Al salir de Comer, la app vuelve sola al día de hoy, para no anotar en otro día sin querer.
- Anotar una comida de un día pasado no corta el ayuno intermitente en curso.
- Frase para Claudio: «Si te olvidaste de anotar, entrá a Comer y tocá la flechita de la izquierda para ir al día que querés».

## Programas (segunda tanda, 20/11)
En **Entrenar → Programas** hay cinco planes. Todos usan el nivel de cada persona y se ajustan con el esfuerzo que marca al terminar (de 1 a 10).

**🏃 Running progresivo.** Cada salida tiene entrada en calor (caminata, balanceo de piernas, círculos de cadera, talones a la cola, rodillas arriba), la carrera y la vuelta a la calma (caminata y estiramientos de isquios, cuádriceps, gemelos, fascia lata y piriforme). Son 3 salidas por semana:
- Inicial, «Empezar a correr» (8 semanas): alterna trote y caminata hasta correr 25 minutos seguidos.
- Intermedio, «De 5 a 10 km» (6 semanas): rodaje continuo, intervalos y fondo largo.
- Avanzado, «Mejorar tu 10K» (6 semanas): tempo, pasadas y fondo largo.
Cada tramo arranca solo y la voz avisa qué sigue y cuánto dura, así no hay que tocar el teléfono corriendo. Con esfuerzo 9 o 10, se repite la salida (se puede avanzar igual). Con 3 salidas fáciles seguidas, Vital ofrece saltar una semana. También se puede marcar «Ya la hice por mi cuenta». Incluye el test del habla y velocidades de referencia para la cinta. Si la persona marcó rodillas, tobillos, corazón o embarazo, recomienda consultar antes de empezar.

**🧘 Glúteo y fascia lata** (unos 10 minutos): círculos de cadera, fascia lata de pie, piriforme (o paloma en nivel intermedio, si tiene colchoneta), glúteo sentado en silla, torsión acostado y flexor de cadera, más fuerza suave de glúteo medio (almeja y elevación lateral). Con rodillo de espuma suma el rodillo en el costado del muslo y en el glúteo. El nivel se mide por hasta dónde llega con las manos (rodillas, tobillos o piso).

**🤸 Calistenia** por nivel: de flexiones inclinadas y remo australiano bajo una mesa (inicial) a flexiones, dominadas, sentadilla a una pierna, flexión en pica, canoa y burpees (avanzado). Si falta la barra o hay que cuidar una zona, Vital cambia el ejercicio por uno equivalente.

**☯️ Tai Chi**, de pie o en silla: apertura, respiración, empujar y manos de nube (inicial), más separar la crin del caballo y la grulla blanca (practicante). El muñeco muestra cada movimiento, también sentado. La versión en silla es para adultos mayores o para quien tiene poco equilibrio.

**🏋️ Tu rutina de gimnasio** («Cargá tu rutina»): cada persona carga sus días y ejercicios, o empieza con una plantilla (inicial de 3 días, intermedio superior/inferior de 4 días, avanzado de 5 días) y la ajusta. En cada ejercicio anota las series con reps y kilos, y marca cómo salió: limpio, me costó o hubo dolor. Vital sugiere la próxima carga:
- Con 3 sesiones limpias seguidas al mismo peso, sube un escalón (el escalón de cada máquina se configura: 1, 2,5 o 5 kg).
- Si hubo dolor, baja un escalón y recomienda consultar si sigue.
- Si no, mantiene el peso y busca completar las reps.
El botón «Terminé este día» abre el registro de actividad de gimnasio.

**Niveles.** Además de las actividades, ahora tienen nivel Running, Calistenia, Tai Chi y Elongación. En calistenia, Tai Chi y elongación: con 2 sesiones fáciles seguidas propone subir de nivel, y con esfuerzo 9 o 10 propone bajar.

### Frases para Claudio (programas)
- «Para empezar a correr, entrá a Entrenar → Programas → Running progresivo y elegí tu nivel.»
- «Si una salida te costó muchísimo, marcá esfuerzo 9 o 10: Vital te la hace repetir.»
- «Para la cintilla o el glúteo tenso, usá el programa Glúteo y fascia lata.»
- «En Tu rutina de gimnasio anotá series, reps y kilos: Vital te dice cuándo subir de peso.»

## Distancia, ritmo, récords y zapatillas (running, 20/11)
Inspirado en lo que hacen apps como adidas Running, pero simple.
- **GPS en las salidas del programa.** En la ficha de Running progresivo está la opción «📍 Medir distancia y ritmo con GPS» (viene activada). En la app de Android mide con la pantalla apagada y el teléfono en el bolsillo; mientras mide aparece una notificación fija: «Vital está midiendo tu salida». La primera vez el teléfono pide permiso de ubicación. En iPhone y en la web mide solo con la pantalla prendida.
- **Voz en cada kilómetro:** «Kilómetro 2. Ritmo 6 minutos 10 por kilómetro». En pantalla se ven los kilómetros y el ritmo en vivo.
- **Pausa automática para el ritmo:** el tiempo parado (un semáforo, atarse las zapatillas) no cuenta para el ritmo.
- **Privacidad:** se guarda solo la distancia, el tiempo y el ritmo por kilómetro, nunca el recorrido.
- **Distancia del reloj:** cuando Vital sincroniza con Health Connect, busca la carrera que registró el reloj en el mismo horario y trae su distancia. Sirve para las salidas del programa y para los running registrados a mano. Si hay GPS y reloj, se usa el GPS y se guarda también el dato del reloj. Las carreras del reloj que aparecen para importar también traen los kilómetros. Algunos relojes genéricos (por ejemplo, los que usan GloryFitPro) mandan solo pasos y pulso: en ese caso la distancia sale del GPS.
- **Al terminar la salida:** kilómetros, ritmo promedio, ritmo de cada kilómetro y aviso de récord.
- **Récords personales:** mejor kilómetro, 5 km, 10 km, media maratón y salida más larga.
- **Zapatillas:** se cargan los pares con los kilómetros que ya tienen. Cada salida suma al par en uso, y Vital avisa al llegar al 80 % de los 700 km recomendados.
- En Evolución, las salidas del programa cuentan como Running y suman kilómetros.

### Frases para Claudio (carrera)
- «Si no tenés reloj, dejá activado el GPS en Running progresivo: Vital mide la distancia y te dice el ritmo en cada kilómetro.»
- «Cargá tus zapatillas en Running progresivo y Vital te avisa cuándo cambiarlas.»

## Plan hacia una carrera y metas (20/11)
**🏁 Plan hacia una carrera con fecha** (Entrenar → Programas → Running → «Preparar una carrera con fecha»):
- Se elige la distancia (5K, 10K o 21K), el nombre (opcional, por ejemplo «Luján Corre»), la fecha y de 2 a 4 días por semana para correr.
- Vital arma cada salida con su fecha hasta la carrera, según el nivel de running: rodajes, una salida de calidad por semana (cambios de ritmo, intervalos o tempo según el nivel) y el fondo largo el último día de la semana. El fondo crece semana a semana, con una semana más liviana cada cuatro y una descarga antes de la carrera (activación el día anterior).
- En nivel inicial, los trotes llevan pausas de caminata que se van achicando.
- Cada salida se hace con el reproductor: calentamiento, carrera y vuelta a la calma, con GPS, voz por kilómetro y tramos automáticos. También se puede marcar como hecha o saltear. Las salidas que pasaron sin hacerse no se acumulan.
- Si hay récords de 5K o 10K, muestra un tiempo estimado para la carrera.
- El día de la carrera muestra consejos (no acelerar al principio, no estrenar nada, hidratarse) y el botón para registrarla.
- La carrera dura como máximo 16 semanas de plan. Si falta poco tiempo para la distancia, avisa que el plan prioriza llegar sano.
- En Programas, la tarjeta de Running muestra «Preparando Luján Corre · faltan 58 días». El plan por semanas sin fecha sigue disponible.

**🎯 Metas** (tarjeta en Hoy, hasta 4): kilómetros corriendo, kilómetros caminando/corriendo/en bici, entrenamientos, minutos de actividad o pasos, por semana o por mes. Muestra la barra de progreso y cuántos días faltan, y avisa con vibración al cumplirla.

**Widget en el Launcher Noir:** la app de Android publica las metas y la cuenta regresiva de la carrera, y el widget de Vital del Launcher Noir las muestra debajo de los pasos. Solo el Launcher Noir puede leer esos datos (proveedor nativo MetasProvider, que responde únicamente a Vital y al launcher).

### Frases para Claudio (objetivos)
- «Para preparar una carrera, entrá a Entrenar → Running y tocá “Preparar una carrera con fecha”.»
- «Las metas se ponen desde la tarjeta Metas en Hoy: por ejemplo, 50 km este mes.»

## Traducciones, widget para cualquier teléfono y permisos del reloj (20/11)
- **Traducciones:** todo lo nuevo de noviembre (alimentación, recetario, niveles, programas, running, carrera y metas) ya está en inglés y en español con «tú». El diccionario de las novedades está en `public/i18n-dic2.js`. En España también cambian algunos nombres: boniato, aguacate, calabaza, anacardos.
- **Widget de Vital para la pantalla de inicio** (cualquier launcher: Samsung, Motorola, etc.): se agrega manteniendo apretada la pantalla de inicio → Widgets → Vital. Muestra la cuenta regresiva a la carrera con la próxima salida y hasta 3 metas con su barra. Los días a la carrera se calculan solos; el progreso de las metas se actualiza cada vez que se abre Vital (arriba a la derecha dice hace cuánto). Tocándolo se abre Vital.
- **Permisos del reloj:** si Vital no pidió el permiso nuevo (distancia), en la tarjeta del reloj el botón **«Permisos»** ahora vuelve a pedir los que falten. Si ya están todos, abre la configuración de Health Connect.
- Frase para Claudio: «Para tener tus metas en la pantalla de inicio, mantené apretado un lugar vacío, tocá Widgets y elegí Vital.»

## Pegar la tabla nutricional (21/11)
- En «Cargar un producto» los casilleros son numéricos, y el teclado numérico de Samsung no tiene el botón del portapapeles. Por eso no se podía pegar la información nutricional.
- Ahora hay un cuadro arriba para pegar la tabla entera. Lee calorías (o kJ), hidratos, proteínas, grasas, fibra y sodio (o sal), en español o en inglés, y completa los casilleros. Si la tabla viene por porción, la convierte a 100 g y anota el peso de la porción.
