import path from 'path';
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
          // MyComponentResolver,
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
