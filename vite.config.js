import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve, dirname } from 'node:path';
import i18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    i18n({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        './src/i18n/locales/**'
      ),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
