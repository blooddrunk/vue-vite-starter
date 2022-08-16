import path from 'path';
import fs from 'fs';
import { loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Legacy from '@vitejs/plugin-legacy';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import {
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import type { Resolver } from 'unplugin-auto-import/types';
import VueTypeImports from 'vite-plugin-vue-type-imports';
import fg from 'fast-glob';

const myComponentMap = new Map<string, string>();
// const files = await fg(
//   dirs.flatMap(i => [
//     i,
//     ...filePatterns.map(p => join(i, p))
//   ]),
//   {
//     absolute: true,
//     cwd: options?.cwd || process.cwd(),
//     onlyFiles: true,
//     followSymbolicLinks: true
//   }
// ).then(r => r.sort().filter(fileFilter))
const MyComponentResolver: Resolver = (name: string) => {
  const filePath = path.resolve(__dirname, `src/components/${name}.vue`);
  if (fs.existsSync(filePath)) {
    return {
      name,
      from: filePath,
    };
  }
};

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
      Vue({
        // reactivityTransform: true,
      }),
      VueJsx(),
      Legacy({
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
          // ! icon-park, deprecated in favor of unplugin-icons
          // (componentName) => {
          //   if (componentName.startsWith('Icon')) {
          //     return {
          //       name: componentName.slice(4),
          //       from: '@icon-park/vue-next',
          //     };
          //   }
          // },

          ElementPlusResolver({
            importStyle: false,
          }),

          VantResolver(),

          IconsResolver({
            prefix: 'icon',
            alias: {
              park: 'icon-park',
              fas: 'fa-solid',
            },
            enabledCollections: ['mdi'],
          }),
        ],
      }),

      Icons({ compiler: 'vue3' }),

      AutoImport({
        dts: './src/typings/auto-imports.d.ts',
        imports: [
          'vue',
          'vue-router',
          '@vueuse/head',
          '@vueuse/core',
          'vue/macros',
        ],
        dirs: ['./src/composables/**', './src/stores/**', './src/services/**'],
        vueTemplate: true,
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: 'readonly',
        },

        resolvers: [
          // * use wisely
          // IconsResolver({
          //   prefix: 'icon',
          //   alias: {
          //     park: 'icon-park',
          //     fas: 'fa-solid',
          //   },
          //   enabledCollections: ['mdi'],
          // }),
        ],
      }),

      VueTypeImports(),
    ],

    server: {
      host: '0.0.0.0',
      port: 3100,

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
