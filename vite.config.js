import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
  // 👇 fallback per React Router
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // 👇 aggiungi questo
  esbuild: {
    jsxInject: `import React from 'react'`,
  }
});


