import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
});
