import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  root: 'src',
  server: { open: true, port: 5173 },
  build: {
    target: 'es2018',
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/index.html')
    }
  },
  publicDir: '../public'
});
