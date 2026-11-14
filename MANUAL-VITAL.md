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

**Calidad del plato:** se basa en el plato saludable de las Guías Alimentarias argentinas: suma por verduras y frutas (ideal: medio plato), fibra, proteínas y legumbres; resta por ultraprocesados, azúcar agregada y exceso de sodio. 75+ muy bueno · 55–74 bien · 35–54 mejorable · menos de 35 para de vez en cuando.
**Calorías de referencia:** Mifflin–St Jeor × actividad según la etapa; con objetivo «bajar de peso», déficit de hasta 15 % (máximo 500 kcal) y nunca por debajo del metabolismo basal ni de 1200 (mujeres) / 1500 (hombres) kcal. Es orientativo y no reemplaza a un nutricionista.
**Celiaquía:** todo se calcula y se planifica en versión sin TACC (pan, fideos, rebozador, masas, premezcla, salsa de soja), saca la avena, marca «verificar logo» en productos de riesgo (fiambres, quesos rallados, yerba, yogures) y recuerda cocinar aparte para evitar la contaminación cruzada.
**Diabetes:** muestra hidratos por plato, por comida y del día, prefiere platos con menos de 65 g de hidratos y saca las facturas del plan; la distribución la define su médico.
**Menores de 18:** no se muestran calorías; solo calidad y variedad.
Valores nutricionales aproximados por 100 g.

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
