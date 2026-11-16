/* =========================================================
   VITAL · Cobrador (Google Apps Script, gratis)
   Crea los cobros de Mercado Pago y activa las licencias en Firebase.
   No necesita el plan Blaze: escribe en Firestore con la cuenta de
   Google dueña del proyecto.

   Propiedades del script (Configuración del proyecto → Propiedades del script):
     MP_TOKEN        Access token de PRODUCCIÓN de Mercado Pago (APP_USR-...)
     PROYECTO        vital-familia
     PRECIO_MENSUAL  10000
     PRECIO_ANUAL    100000
   ========================================================= */

const DIAS_MES = 33;    // 31 + 2 de margen para los reintentos de cobro
const DIAS_ANIO = 366;

function prop(k, def) { return PropertiesService.getScriptProperties().getProperty(k) || def; }
function salida(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function urlScript() { return ScriptApp.getService().getUrl(); }
const UID_OK = /^[A-Za-z0-9]{20,40}$/;

/* ---------- Entradas web ---------- */
function doGet(e) {
  const p = (e && e.parameter) || {};
  try {
    if (p.accion === 'pagar') return salida(crearCobro(p));
    if (p.accion === 'verificar') return salida(verificar(p.uid));
    if (p.accion === 'gracias') return HtmlService.createHtmlOutput(paginaGracias()).setTitle('Vital · Pago recibido');
    return salida({ ok: true, servicio: 'Vital cobros' });
  } catch (err) { return salida({ ok: false, error: String(err && err.message || err) }); }
}

// Avisos (webhooks) de Mercado Pago
function doPost(e) {
  try {
    const q = (e && e.parameter) || {};
    let b = {};
    try { b = JSON.parse((e.postData && e.postData.contents) || '{}'); } catch (x) {}
    const tipo = b.type || q.type || q.topic || '';
    const id = (b.data && b.data.id) || q['data.id'] || q.id;
    if (id) procesarAviso(tipo, String(id));
  } catch (err) { console.error(err); }
  return ContentService.createTextOutput('ok');
}

function procesarAviso(tipo, id) {
  if (/payment/.test(tipo) && !/authorized/.test(tipo)) { aplicarPago(mp('GET', '/v1/payments/' + id)); return; }
  if (/authorized_payment/.test(tipo)) {
    const ap = mp('GET', '/authorized_payments/' + id);
    if (ap && ap.payment && ap.payment.id) aplicarPago(mp('GET', '/v1/payments/' + ap.payment.id), ap.preapproval_id);
    return;
  }
  if (/preapproval/.test(tipo)) { aplicarSuscripcion(mp('GET', '/preapproval/' + id)); return; }
}

/* ---------- Crear el cobro ---------- */
function crearCobro(p) {
  if (!UID_OK.test(p.uid || '')) throw new Error('Usuario inválido');
  const plan = p.plan === 'anual' ? 'anual' : 'mensual';
  const ref = p.uid + '|' + plan;
  if (plan === 'anual') {
    const pref = mp('POST', '/checkout/preferences', {
      items: [{ title: 'Vital · Plan anual familiar', quantity: 1, unit_price: Number(prop('PRECIO_ANUAL', 100000)), currency_id: 'ARS' }],
      external_reference: ref,
      payer: p.email ? { email: p.email } : undefined,
      back_urls: { success: urlScript() + '?accion=gracias', pending: urlScript() + '?accion=gracias', failure: urlScript() + '?accion=gracias' },
      auto_return: 'approved',
      notification_url: urlScript(),
      statement_descriptor: 'VITAL'
    });
    return { ok: true, url: pref.init_point };
  }
  if (!p.mpmail) throw new Error('Falta el mail de Mercado Pago');
  const sus = mp('POST', '/preapproval', {
    reason: 'Vital · Plan mensual familiar',
    external_reference: ref,
    payer_email: p.mpmail,
    auto_recurring: { frequency: 1, frequency_type: 'months', transaction_amount: Number(prop('PRECIO_MENSUAL', 10000)), currency_id: 'ARS' },
    back_url: urlScript() + '?accion=gracias',
    status: 'pending'
  });
  PropertiesService.getScriptProperties().setProperty('pre_' + p.uid, sus.id);
  return { ok: true, url: sus.init_point };
}

/* ---------- Aplicar pagos ---------- */
function aplicarPago(pago, preId) {
  if (!pago || pago.status !== 'approved') return false;
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('pg_' + pago.id)) return true;          // ya procesado
  let ref = pago.external_reference || '';
  if (!/\|/.test(ref)) {                                         // cobro mensual sin referencia: buscarla en la suscripción
    const sid = preId || (pago.metadata && pago.metadata.preapproval_id) ||
      (pago.point_of_interaction && pago.point_of_interaction.transaction_data && pago.point_of_interaction.transaction_data.subscription_id);
    if (sid) { const s = mp('GET', '/preapproval/' + sid); ref = (s && s.external_reference) || ''; }
  }
  const m = ref.match(/^([A-Za-z0-9]{20,40})\|(mensual|anual)$/);
  if (!m) return false;
  const uid = m[1], plan = m[2];
  const lic = leerLicencia(uid);
  const actual = lic && lic.vence ? Date.parse(lic.vence) : 0;
  const base = Math.max(Date.now(), actual);
  const vence = new Date(base + (plan === 'anual' ? DIAS_ANIO : DIAS_MES) * 864e5);
  escribirLicencia(uid, { plan: plan, vence: vence, pago: String(pago.id) });
  props.setProperty('pg_' + pago.id, '1');
  return true;
}

function aplicarSuscripcion(s) {
  if (!s || s.status !== 'authorized') return false;
  const m = String(s.external_reference || '').match(/^([A-Za-z0-9]{20,40})\|mensual$/);
  if (!m || !s.next_payment_date) return false;
  const uid = m[1];
  PropertiesService.getScriptProperties().setProperty('pre_' + uid, s.id);
  const lic = leerLicencia(uid);
  const actual = lic && lic.vence ? Date.parse(lic.vence) : 0;
  const prox = Date.parse(s.next_payment_date) + 3 * 864e5;
  if (prox > actual) escribirLicencia(uid, { plan: 'mensual', vence: new Date(prox), suscripcion: String(s.id) });
  return true;
}

/* ---------- Verificar desde la app ---------- */
function verificar(uid) {
  if (!UID_OK.test(uid || '')) throw new Error('Usuario inválido');
  ['anual', 'mensual'].forEach(function (plan) {
    const r = mp('GET', '/v1/payments/search?sort=date_created&criteria=desc&limit=10&status=approved&external_reference=' + encodeURIComponent(uid + '|' + plan));
    (r && r.results || []).forEach(function (pg) { aplicarPago(pg); });
  });
  const pre = PropertiesService.getScriptProperties().getProperty('pre_' + uid);
  if (pre) aplicarSuscripcion(mp('GET', '/preapproval/' + pre));
  const lic = leerLicencia(uid);
  const activa = lic && (lic.plan === 'cortesia' || Date.parse(lic.vence) > Date.now());
  return { ok: true, plan: lic && lic.plan, vence: lic && lic.vence,
    mensaje: activa && lic.plan !== 'prueba' ? '¡Plan activo!' : 'Todavía no figura el pago' };
}

/* ---------- Revisión automática (activador cada hora) ---------- */
function sincronizar() {
  const desde = new Date(Date.now() - 3 * 864e5).toISOString();
  const r = mp('GET', '/v1/payments/search?sort=date_created&criteria=desc&limit=100&status=approved&range=date_created&begin_date=' + encodeURIComponent(desde) + '&end_date=NOW');
  (r && r.results || []).forEach(function (pg) { try { aplicarPago(pg); } catch (x) { console.error(x); } });
  const props = PropertiesService.getScriptProperties().getProperties();
  Object.keys(props).filter(function (k) { return k.indexOf('pre_') === 0; }).forEach(function (k) {
    try { aplicarSuscripcion(mp('GET', '/preapproval/' + props[k])); } catch (x) { console.error(x); }
  });
}

// Ejecutar UNA vez a mano para crear el activador horario
function instalarActivador() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === 'sincronizar') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('sincronizar').timeBased().everyHours(1).create();
}

// Ejecutar a mano para probar la conexión con Mercado Pago y Firebase
function probar() {
  const yo = mp('GET', '/users/me');
  console.log('Mercado Pago OK: ' + yo.nickname + ' (' + yo.site_id + ')');
  const url = 'https://firestore.googleapis.com/v1/projects/' + prop('PROYECTO', 'vital-familia') + '/databases/(default)/documents/licencias?pageSize=1';
  const r = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() }, muteHttpExceptions: true });
  console.log('Firebase: ' + (r.getResponseCode() === 200 ? 'OK' : 'ERROR ' + r.getResponseCode() + ' ' + r.getContentText()));
}

/* ---------- Mercado Pago ---------- */
function mp(metodo, ruta, cuerpo) {
  const op = { method: metodo.toLowerCase(), muteHttpExceptions: true, contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + prop('MP_TOKEN', ''), 'X-Idempotency-Key': Utilities.getUuid() } };
  if (cuerpo) op.payload = JSON.stringify(cuerpo);
  const r = UrlFetchApp.fetch('https://api.mercadopago.com' + ruta, op);
  const j = JSON.parse(r.getContentText() || '{}');
  if (r.getResponseCode() >= 300) throw new Error('Mercado Pago: ' + (j.message || r.getResponseCode()));
  return j;
}

/* ---------- Firestore (REST con la cuenta dueña del proyecto) ---------- */
function docUrl(uid) { return 'https://firestore.googleapis.com/v1/projects/' + prop('PROYECTO', 'vital-familia') + '/databases/(default)/documents/licencias/' + uid; }
function leerLicencia(uid) {
  const r = UrlFetchApp.fetch(docUrl(uid), { headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() }, muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return null;
  const f = JSON.parse(r.getContentText()).fields || {};
  return { plan: f.plan && f.plan.stringValue, vence: f.vence && f.vence.timestampValue };
}
function escribirLicencia(uid, datos) {
  const fields = { actualizado: { timestampValue: new Date().toISOString() } };
  Object.keys(datos).forEach(function (k) {
    const v = datos[k];
    fields[k] = v instanceof Date ? { timestampValue: v.toISOString() } : { stringValue: String(v) };
  });
  const mask = Object.keys(fields).map(function (k) { return 'updateMask.fieldPaths=' + k; }).join('&');
  const r = UrlFetchApp.fetch(docUrl(uid) + '?' + mask, { method: 'patch', contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() }, payload: JSON.stringify({ fields: fields }), muteHttpExceptions: true });
  if (r.getResponseCode() >= 300) throw new Error('Firestore: ' + r.getContentText());
}

function paginaGracias() {
  return '<meta name="viewport" content="width=device-width,initial-scale=1"><div style="font-family:system-ui;text-align:center;padding:48px 24px;background:#062026;color:#e6fffb;min-height:100vh;box-sizing:border-box">' +
    '<div style="font-size:56px">💚</div><h1>¡Gracias!</h1><p style="opacity:.8;font-size:18px">Volvé a Vital: el plan se activa solo en unos segundos.<br>Si no, tocá «Ya pagué: verificar».</p></div>';
}
