import path from 'path';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import {
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
// import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return {
    base: mode === 'production' ? '/' : '/',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    plugins: [
      /**
       * official plugins
       */
      Vue(),
      VueJsx(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),

      /**
       * 3rd party plugins
       */

      Pages({
        extensions: ['vue', 'ts'],
        nuxtStyle: true,
      }),

      Layouts(),

      // * this works, but I don't really like it
      Components({
        extensions: ['vue', 'tsx'],

        dts: './src/typings/components.d.ts',

        resolvers: [
          // * icon-park
          (name) => {
            if (name.startsWith('Icon')) {
              return {
                importName: name.slice(4),
                path: '@icon-park/vue-next',
              };
            }
          },

          ElementPlusResolver(),
          VantResolver(),
        ],
      }),

      // AutoImport({
      //   dts: './src/typings/auto-imports.d.ts',
      //   imports: [
      //     'vue',
      //     'vue-router',
      //     '@vueuse/head',
      //     '@vueuse/core',
      //     'pinia',
      //     'vee-validate',
      //   ],
      // }),
    ],

    server: {
      host: '0.0.0.0',
      port: 3000,

      proxy: {
        '^/json/.*': {
          target:
            'https://my-json-server.typicode.com/blooddrunk/my-json-server/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/json/, ''),
        },
      },
    },
  };
};
