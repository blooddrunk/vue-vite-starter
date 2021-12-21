import path from 'path';
import { loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Legacy from '@vitejs/plugin-legacy';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import {
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
// import AutoImport from 'unplugin-auto-import/vite';
import VueTypeImports from 'vite-plugin-vue-type-imports';
import PackageConfig from 'vite-plugin-package-config';
import OptimizationPersist from 'vite-plugin-optimize-persist';

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
        '@typings': path.resolve(__dirname, 'src/utils/typings'),
      },
    },

    plugins: [
      /**
       * official plugins
       */
      Vue(),
      VueJsx(),
      Legacy({
        targets: ['defaults', 'not IE 11'],
      }),

      /**
       * 3rd party plugins
       */

      Pages({
        extensions: ['vue'],
        // nuxtStyle: true,
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

          ElementPlusResolver({
            importStyle: false,
          }),

          VantResolver(),
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

      VueTypeImports(),

      PackageConfig(),
      OptimizationPersist(),
    ],

    server: {
      host: '0.0.0.0',
      port: 3300,

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
