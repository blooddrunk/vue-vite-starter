import path from 'path';

import Legacy from '@vitejs/plugin-legacy';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import {
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
// @ts-expect-error see https://github.com/sxzz/unplugin-vue-macros/issues/257
import VueMacros from 'unplugin-vue-macros/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import VueRouter from 'unplugin-vue-router/vite';
import { loadEnv } from 'vite';
import Layouts from 'vite-plugin-vue-layouts';
import TypeImports from 'vite-plugin-vue-type-imports';

// import type { Resolver } from 'unplugin-auto-import/types';
// import fg from 'fast-glob';
// import consola from 'consola';

// ).then(r => r.sort().filter(fileFilter))
// const MyComponentResolver: Resolver = async (name: string) => {
//   // const filePath = path.resolve(__dirname, `src/components/${name}.vue`);
//   // if (fs.existsSync(filePath)) {
//   //   return {
//   //     name,
//   //     from: filePath,
//   //   };
//   // }

//   if (!name.match(/^My[A-Z]/)) {
//     return;
//   }

//   const fileName = name.slice(2);
//   const files = await fg(`./src/components/**/${fileName}.vue`, {
//     absolute: true,
//   });
//   if (files.length) {
//     console.log(files);
//     if (files.length > 1) {
//       consola.warn(`More than one entry found for component "${name}"：`);
//       consola.warn(files);
//     }
//     return files[0];
//   }
// };

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
        '@/typings': path.resolve(__dirname, 'src/utils/typings'),
        '@/modules/': `${path.resolve(__dirname, 'src/components/modules')}/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },

    plugins: [
      VueRouter({
        dts: './src/typings/typed-router.d.ts',
        exclude: ['**/__*', '**/__*/**/*'],
      }),

      VueMacros({
        plugins: {
          vue: Vue(),
          vueJsx: VueJsx(),
        },

        // ! this won't always work, use vite-plugin-vue-type-imports temporarily
        betterDefine: false,
      }),

      Legacy({
        targets: ['defaults', 'not IE 11'],
      }),

      Layouts(),

      Components({
        extensions: ['vue'],

        dts: './src/typings/components.d.ts',

        resolvers: [
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
          '@vueuse/head',
          '@vueuse/core',
          'vue/macros',
          VueRouterAutoImports,
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
          // MyComponentResolver,
        ],
      }),

      TypeImports(),
    ],

    server: {
      host: '0.0.0.0',
      port: 3500,

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
