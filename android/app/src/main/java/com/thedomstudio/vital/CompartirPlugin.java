package com.thedomstudio.vital;

import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Ida y vuelta con las apps de IA, sin pasar por el portapapeles de Vital:
 *  - ias(): qué apps de IA hay instaladas (Claude, Gemini, ChatGPT, Copilot).
 *  - abrir({pkg, texto}): abre esa IA con el texto ya escrito (además lo deja copiado, por si la IA no lo toma).
 *  - elegir({texto, titulo}): el menú de Android para elegir con qué app abrirlo.
 *  - Recibir: cuando en la IA se toca Compartir → Vital, el texto llega acá (evento «compartido» o pendiente()).
 */
@CapacitorPlugin(name = "VitalCompartir")
public class CompartirPlugin extends Plugin {

    static final String[][] IAS = {
        {"claude", "Claude", "com.anthropic.claude"},
        {"gemini", "Gemini", "com.google.android.apps.bard"},
        {"chatgpt", "ChatGPT", "com.openai.chatgpt"},
        {"copilot", "Copilot", "com.microsoft.copilot"},
    };
    private static String pendiente = null;

    @Override
    public void load() {
        tomar(getActivity().getIntent());
    }

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);
        tomar(intent);
    }

    private void tomar(Intent intent) {
        if (intent == null || !Intent.ACTION_SEND.equals(intent.getAction())) return;
        String t = intent.getStringExtra(Intent.EXTRA_TEXT);
        if (t == null || t.trim().isEmpty()) return;
        intent.setAction(Intent.ACTION_MAIN);           // que no se vuelva a procesar al rotar o volver
        intent.removeExtra(Intent.EXTRA_TEXT);
        pendiente = t;
        JSObject o = new JSObject();
        o.put("texto", t);
        notifyListeners("compartido", o, true);
    }

    @PluginMethod
    public void pendiente(PluginCall call) {
        JSObject o = new JSObject();
        o.put("texto", pendiente);
        pendiente = null;
        call.resolve(o);
    }

    @PluginMethod
    public void ias(PluginCall call) {
        PackageManager pm = getContext().getPackageManager();
        JSArray lista = new JSArray();
        for (String[] ia : IAS) {
            if (pm.getLaunchIntentForPackage(ia[2]) == null) continue;
            JSObject o = new JSObject();
            o.put("id", ia[0]);
            o.put("n", ia[1]);
            o.put("pkg", ia[2]);
            lista.put(o);
        }
        JSObject r = new JSObject();
        r.put("ias", lista);
        call.resolve(r);
    }

    private void copiar(String texto) {
        try {
            ClipboardManager cm = (ClipboardManager) getContext().getSystemService(Context.CLIPBOARD_SERVICE);
            cm.setPrimaryClip(ClipData.newPlainText("Vital", texto));
        } catch (Exception ignored) {
        }
    }

    @PluginMethod
    public void abrir(PluginCall call) {
        String pkg = call.getString("pkg", "");
        String texto = call.getString("texto", "");
        copiar(texto);
        Intent i = new Intent(Intent.ACTION_SEND);
        i.setType("text/plain");
        i.putExtra(Intent.EXTRA_TEXT, texto);
        i.setPackage(pkg);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        try {
            getContext().startActivity(i);
            JSObject r = new JSObject();
            r.put("modo", "texto");
            call.resolve(r);
        } catch (ActivityNotFoundException e) {
            // La IA no recibe texto compartido: se abre igual y el texto queda copiado para pegarlo
            Intent l = getContext().getPackageManager().getLaunchIntentForPackage(pkg);
            if (l == null) { call.reject("no_instalada"); return; }
            l.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(l);
            JSObject r = new JSObject();
            r.put("modo", "copiado");
            call.resolve(r);
        }
    }

    @PluginMethod
    public void elegir(PluginCall call) {
        String texto = call.getString("texto", "");
        copiar(texto);
        Intent i = new Intent(Intent.ACTION_SEND);
        i.setType("text/plain");
        i.putExtra(Intent.EXTRA_TEXT, texto);
        Intent ch = Intent.createChooser(i, call.getString("titulo", "Abrir con"));
        ch.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getContext().startActivity(ch);
        call.resolve();
    }
}
