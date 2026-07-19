import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/demo/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        patent: resolve(import.meta.dirname, 'patent/index.html'),
        cert: resolve(import.meta.dirname, 'cert/index.html'),
      },
    },
  },
});
