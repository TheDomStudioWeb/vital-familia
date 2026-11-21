package com.thedomstudio.vital;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

/**
 * Widget de Vital para la pantalla de inicio de cualquier teléfono Android:
 * cuenta regresiva a la carrera y hasta 3 metas con su barra.
 * Lee el mismo resumen que publica la app (MetasPlugin → SharedPreferences).
 */
public class VitalWidget extends AppWidgetProvider {
    private static final int[][] FILAS = {
            {R.id.w_meta1, R.id.w_meta1_n, R.id.w_meta1_v, R.id.w_meta1_b},
            {R.id.w_meta2, R.id.w_meta2_n, R.id.w_meta2_v, R.id.w_meta2_b},
            {R.id.w_meta3, R.id.w_meta3_n, R.id.w_meta3_v, R.id.w_meta3_b}
    };

    @Override
    public void onUpdate(Context ctx, AppWidgetManager mgr, int[] ids) {
        actualizar(ctx, mgr, ids);
    }

    /** Redibuja todos los widgets de Vital que haya en la pantalla. */
    public static void actualizarTodos(Context ctx) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(ctx);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(ctx, VitalWidget.class));
        if (ids != null && ids.length > 0) actualizar(ctx, mgr, ids);
    }

    private static String num(double v, String u) {
        String s = "km".equals(u) ? String.format(Locale.US, "%.1f", v).replace(".0", "").replace('.', ',')
                : String.format(new Locale("es", "AR"), "%,d", Math.round(v));
        return u == null || u.isEmpty() ? s : s + " " + u;
    }

    static void actualizar(Context ctx, AppWidgetManager mgr, int[] ids) {
        String json = ctx.getSharedPreferences(MetasProvider.PREFS, Context.MODE_PRIVATE).getString("json", "{}");
        JSONObject o;
        try { o = new JSONObject(json); } catch (Exception e) { o = new JSONObject(); }
        JSONObject tx = o.optJSONObject("txt");
        if (tx == null) tx = new JSONObject();
        String tHoy = tx.optString("hoy", "¡Hoy!"), tDia = tx.optString("dia", "día"), tDias = tx.optString("dias", "días"), tHace = tx.optString("hace", "hace");
        boolean ingles = "ago".equals(tHace);
        for (int id : ids) {
            RemoteViews v = new RemoteViews(ctx.getPackageName(), R.layout.vital_widget);
            v.setTextViewText(R.id.w_nombre, o.optString("nombre", ""));

            long ts = o.optLong("ts", 0);
            if (ts > 0) {
                long min = (System.currentTimeMillis() - ts) / 60000;
                String cuanto = min < 60 ? Math.max(1, min) + " min" : min < 1440 ? (min / 60) + " h" : (min / 1440) + " d";
                v.setTextViewText(R.id.w_act, ingles ? cuanto + " " + tHace : tHace + " " + cuanto);
            } else v.setTextViewText(R.id.w_act, "");

            // Carrera: los días se calculan acá con la fecha, así el widget no queda viejo
            JSONObject c = o.optJSONObject("carrera");
            boolean hayCarrera = false;
            if (c != null) {
                long dias = c.optLong("dias", -1);
                String fecha = c.optString("fecha", "");
                try { if (!fecha.isEmpty()) dias = ChronoUnit.DAYS.between(LocalDate.now(), LocalDate.parse(fecha)); } catch (Exception ignored) { }
                if (dias >= 0) {
                    hayCarrera = true;
                    v.setTextViewText(R.id.w_carrera_n, "🏁 " + c.optString("n", "Carrera"));
                    v.setTextViewText(R.id.w_carrera_d, dias == 0 ? tHoy : dias + " " + (dias == 1 ? tDia : tDias));
                    String prox = c.optString("prox", "");
                    v.setTextViewText(R.id.w_carrera_p, prox);
                    v.setViewVisibility(R.id.w_carrera_p, prox.isEmpty() ? View.GONE : View.VISIBLE);
                }
            }
            v.setViewVisibility(R.id.w_carrera, hayCarrera ? View.VISIBLE : View.GONE);

            JSONArray ms = o.optJSONArray("metas");
            int n = ms == null ? 0 : Math.min(3, ms.length());
            for (int i = 0; i < 3; i++) {
                int[] f = FILAS[i];
                if (i < n) {
                    JSONObject m = ms.optJSONObject(i);
                    String u = m.optString("u", "");
                    v.setTextViewText(f[1], m.optString("i", "") + " " + m.optString("n", ""));
                    v.setTextViewText(f[2], num(m.optDouble("v", 0), u) + " / " + num(m.optDouble("meta", 0), u));
                    v.setProgressBar(f[3], 100, Math.max(2, Math.min(100, m.optInt("pct", 0))), false);
                    v.setViewVisibility(f[0], View.VISIBLE);
                } else v.setViewVisibility(f[0], View.GONE);
            }
            v.setTextViewText(R.id.w_vacio, tx.optString("vacio", "Poné tus metas en Vital y aparecen acá."));
            v.setViewVisibility(R.id.w_vacio, (n == 0 && !hayCarrera) ? View.VISIBLE : View.GONE);

            Intent abrir = new Intent(ctx, MainActivity.class).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
            v.setOnClickPendingIntent(R.id.w_raiz, PendingIntent.getActivity(ctx, 0, abrir, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE));
            mgr.updateAppWidget(id, v);
        }
    }
}
