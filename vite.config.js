import { defineConfig } from 'vite';
export default defineConfig({
  base: '/fashion/',
  build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false }
});
