import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],

  alias: {
    '@': path.resolve(__dirname, '/src'),
  },

  server: {
    proxy: {
      '^/json/.*': {
        target:
          'https://my-json-server.typicode.com/blooddrunk/my-json-server/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/json/, ''),
      },
    },
  },
});
