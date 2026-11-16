# Vital · Puesta en marcha de los cobros

Orden recomendado. Cada paso se puede hacer en un día distinto: nada se rompe si quedan pasos sin hacer.

## 1. Actualizar a todos (antes de activar el bloqueo)
1. En la PC: `git pull` y después `firebase deploy --only hosting`. La web se actualiza sola.
2. En cada teléfono con la app de Android: instalar el APK nuevo (el link de la última versión de GitHub).
3. Cada usuario abre Vital una vez con el APK nuevo.

> Si activás las reglas (paso 3) antes de que alguien actualice su APK, esa persona queda bloqueada hasta que actualice.

## 2. Hacerte administrador
1. Firebase Console → proyecto **vital-familia** → **Authentication** → Usuarios. Copiá tu **UID** (la columna «UID de usuario» de tu mail).
2. **Firestore Database** → **Iniciar colección** → ID de colección: `admins`.
3. ID del documento: pegá tu UID. Campo: `nombre` (string) = `Daniel`. Guardar.

## 3. Activar las licencias (el bloqueo)
1. En la PC, en la carpeta de Vital: `firebase deploy --only firestore:rules`
2. Abrí Vital: en **Perfil** aparece **⭐ Tu plan** (vas a estar en prueba de 14 días) y el botón **🛠 Panel de administrador**.
3. En el panel tocá **🎁 Cortesía** en tu cuenta y en las de tu familia. Con que el que creó el grupo familiar tenga cortesía, toda la familia queda cubierta (sin tope de personas).

## 4. Mercado Pago (para cobrar)
1. Entrá a https://www.mercadopago.com.ar/developers/panel/app → **Crear aplicación**.
   - Nombre: `Vital`. Tipo de solución: **Pagos online**. ¿Usás plataforma de e-commerce? **No**. Producto: **Checkout Pro** (y después **Suscripciones**).
2. Dentro de la aplicación → **Credenciales de producción** → copiá el **Access Token** (empieza con `APP_USR-`). Es secreto: no lo pegues en la app ni en GitHub.

## 5. El cobrador automático (Google Apps Script, gratis)
1. Entrá a https://script.google.com con **la misma cuenta de Google que creó el proyecto de Firebase** → **Nuevo proyecto**. Nombre: `Vital cobros`.
2. Borrá lo que tenga `Código.gs` y pegá el contenido de `cobros/Codigo.gs`.
3. ⚙️ **Configuración del proyecto** → tildá **Mostrar el archivo de manifiesto "appsscript.json"**. Volvé al editor, abrí `appsscript.json` y reemplazalo por el de `cobros/appsscript.json`.
4. ⚙️ **Configuración del proyecto** → **Propiedades del script** → agregá:
   - `MP_TOKEN` = el Access Token de producción
   - `PROYECTO` = `vital-familia`
   - `PRECIO_MENSUAL` = `10000`
   - `PRECIO_ANUAL` = `100000`
5. En el editor elegí la función **probar** → **Ejecutar**. Google pide permisos: **Revisar permisos** → tu cuenta → **Configuración avanzada** → **Ir a Vital cobros** → **Permitir**. En el registro tiene que decir «Mercado Pago OK» y «Firebase: OK».
6. Elegí la función **instalarActivador** → **Ejecutar** (revisa los pagos cada hora, aunque falle un aviso).
7. **Implementar** → **Nueva implementación** → tipo **Aplicación web** → Ejecutar como: **Yo** · Quién tiene acceso: **Cualquier usuario** → **Implementar**. Copiá la **URL de la aplicación web** (termina en `/exec`).

## 6. Conectar todo
1. En `public/config.js` pegá la URL: `window.VITAL_COBROS_URL = "https://script.google.com/macros/s/.../exec";` → guardar, `git push` (o pasámela y lo hago yo).
2. Mercado Pago → tu aplicación → **Webhooks** → **Configurar notificaciones** → Modo productivo → URL: la misma URL `/exec` → eventos: **Pagos** y **Planes y suscripciones** → Guardar.
3. `firebase deploy --only hosting` y el APK nuevo se arma solo con el push.

## Cómo funciona para el cliente
1. Descarga Vital, entra con Google → **14 días gratis**.
2. Al terminar la prueba ve la pantalla de planes: **anual $100.000** o **mensual $10.000** (débito automático).
3. Paga en Mercado Pago y vuelve a Vital: el plan se activa solo (o toca **Ya pagué: verificar**).
4. Su familia se suma con el código del grupo y queda cubierta (hasta 6 personas).
5. Si el link del APK circula, quien no pagó solo tiene la prueba de 14 días: el bloqueo lo hace Firebase, no la app.

## Cambiar precios
Apps Script → Propiedades del script → `PRECIO_MENSUAL` / `PRECIO_ANUAL`. Lo que se muestra en la app está en `public/licencia.js` (`PRECIOS`): cambiar los dos.
Los que ya tienen suscripción mensual siguen con el monto viejo hasta que lo actualices desde Mercado Pago.

## Si algo falla
- Apps Script → **Ejecuciones**: muestra cada aviso de Mercado Pago y los errores.
- Un pago que no se activó: en el panel de administrador, **+1 mes** o **+1 año** a mano.
