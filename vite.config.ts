import path from 'path';
import { loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import Legacy from '@vitejs/plugin-legacy';
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import {
  ElementPlusResolver,
  VantResolver,
} from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import VueMacros from 'unplugin-vue-macros/vite';
import { transformShortVmodel } from '@vue-macros/short-vmodel';
import VueTypeImports from 'vite-plugin-vue-type-imports';
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
        '@': path.resolve(__dirname, 'src'),
        '@typings': path.resolve(__dirname, 'src/utils/typings'),
      },
    },

    plugins: [
      VueRouter({
        dts: './src/typings/typed-router.d.ts',
        exclude: ['**/__*', '**/__*/**/*'],
      }),

      VueMacros({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /setup\.[cm]?[jt]sx?$/],
            reactivityTransform: true,
            template: {
              compilerOptions: {
                nodeTransforms: [
                  transformShortVmodel({
                    prefix: '$',
                  }),
                ],
              },
            },
          }),
          vueJsx: VueJsx(),
        },
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

      VueTypeImports(),
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
