package com.thedomstudio.vital;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Plugin propio de Vital: publica las metas para el widget del Launcher Noir
        registerPlugin(MetasPlugin.class);
        // Ida y vuelta con las apps de IA (abrir con el texto y recibir lo que se comparte a Vital)
        registerPlugin(CompartirPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
