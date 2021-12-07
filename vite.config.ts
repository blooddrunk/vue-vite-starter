import path from 'path';
import { loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// import AutoImport from 'unplugin-auto-import/vite';
// import VueTypeImports from 'vite-plugin-vue-type-imports';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isDev = mode === 'development';
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: process.env.VITE_PUBLIC_PATH,

    define: {
      __DEV__: isDev,
    },

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
        extensions: ['vue'],
        nuxtStyle: true,
      }),

      Layouts(),

      Components({
        extensions: ['vue'],

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
        ],
      }),

      // AutoImport({
      //   dts: './src/typings/auto-imports.d.ts',
      // imports: [
      //   'vue',
      //   'vue-router',
      //   '@vueuse/head',
      //   '@vueuse/core',
      //   'pinia',
      //   'vee-validate',
      // ],

      //   resolvers: [
      // * jsx
      //     (name) => {
      //       console.log(name);
      //       if (name.endsWith('Chart')) {
      //         return `./../components/UI/Chart/${name}`;
      //       }
      //     },
      //   ],
      // }),

      // VueTypeImports(),
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
