<script setup lang="ts">
import { SwaggerUIBundle, SwaggerUIStandalonePreset } from 'swagger-ui-dist';


const client = import.meta.client;
    if (client) {
      const ui = SwaggerUIBundle({
        url: `/api/docs`,
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        defaultModelsExpandDepth: -1,
        layout: "StandaloneLayout",
      });
      const w = window as any;
      w.ui = ui;
    }
</script>

<template>
    <div id="swagger-ui"></div>
  </template>

<style>
    @import "swagger-ui-dist/swagger-ui.css";
</style>