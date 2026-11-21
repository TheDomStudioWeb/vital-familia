package com.thedomstudio.vital;

import android.content.Context;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Guarda en el teléfono el resumen de metas y del plan de carrera que arma la web de Vital,
 * para que lo lea el widget de Vital del Launcher Noir (a través de MetasProvider).
 */
@CapacitorPlugin(name = "VitalMetas")
public class MetasPlugin extends Plugin {

    @PluginMethod
    public void publicar(PluginCall call) {
        String json = call.getString("json", "{}");
        Context ctx = getContext();
        ctx.getSharedPreferences(MetasProvider.PREFS, Context.MODE_PRIVATE).edit().putString("json", json).apply();
        try {
            ctx.getContentResolver().notifyChange(MetasProvider.URI, null);
        } catch (Exception ignored) {
        }
        try {
            VitalWidget.actualizarTodos(ctx);   // widget de la pantalla de inicio
        } catch (Exception ignored) {
        }
        call.resolve();
    }
}
