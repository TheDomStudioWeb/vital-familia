/* Configuración pública de Firebase (no es secreta: la seguridad la ponen las reglas de Firestore). */
window.VITAL_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBHcfTiWu-bQ_94G7FpkXBugZ-NAV6kgT0",
  authDomain: "vital-familia.firebaseapp.com",
  projectId: "vital-familia",
  storageBucket: "vital-familia.firebasestorage.app",
  messagingSenderId: "403277869246",
  appId: "1:403277869246:web:a5229369c3928ebb49aeef"
};

/* URL del cobrador (Apps Script de la carpeta /cobros). Vacío = los botones de pago abren WhatsApp. */
window.VITAL_COBROS_URL = "https://script.google.com/macros/s/AKfycbyXnKYmg5U6OGwMtVxhv9PwnAFN6uJ-j1_ZgTEUlaaVhmhDE-YqOrBsrBcN-KDzM_NOAw/exec";
