package com.thedomstudio.vital;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * Entrega el resumen de metas (JSON) solo a Vital y al Launcher Noir.
 * Cualquier otra app que pregunte recibe null.
 * content://com.thedomstudio.vital.metas/metas  →  una fila con la columna "json".
 */
public class MetasProvider extends ContentProvider {
    public static final String AUTHORITY = "com.thedomstudio.vital.metas";
    public static final Uri URI = Uri.parse("content://" + AUTHORITY + "/metas");
    public static final String PREFS = "vital_metas";
    private static final Set<String> PERMITIDAS = new HashSet<>(Arrays.asList(
            "com.thedomstudio.vital",
            "com.example.launchernoir3"
    ));

    @Override
    public boolean onCreate() {
        return true;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
        String quien = getCallingPackage();
        if (quien == null || !PERMITIDAS.contains(quien)) return null;
        Context ctx = getContext();
        if (ctx == null) return null;
        String json = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString("json", "{}");
        MatrixCursor c = new MatrixCursor(new String[]{"json"});
        c.addRow(new Object[]{json});
        return c;
    }

    @Override
    public String getType(Uri uri) {
        return "application/json";
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        return null;
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection, String[] selectionArgs) {
        return 0;
    }
}
