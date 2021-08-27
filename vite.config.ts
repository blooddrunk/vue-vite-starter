import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import vitePages from 'vite-plugin-pages';
import viteLayous from 'vite-plugin-vue-layouts';
import viteComponents, {
  VueUseComponentsResolver,
} from 'vite-plugin-components';
// import VitePluginElementPlus from 'vite-plugin-element-plus';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return {
    base: mode === 'production' ? '/' : '/',

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '/src'),
      },
    },

    plugins: [
      /**
       * official plugins
       */
      vue(),
      vueJsx(),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),

      /**
       * 3rd party plugins
       */

      vitePages({
        extensions: ['vue', 'ts'],
        nuxtStyle: true,
      }),

      viteLayous(),

      // * this works, but I don't really like it
      viteComponents({
        extensions: ['vue', 'ts'],

        globalComponentsDeclaration: './src/typings/components.d.ts',

        customComponentResolvers: [
          // * icon-park
          (name) => {
            if (name.startsWith('Icon')) {
              return {
                importName: name.slice(4),
                path: '@icon-park/vue-next',
              };
            }
          },

          // * element-plus
          // (name) => {
          //   if (name.startsWith('El')) {
          //     const partialName =
          //       name[2].toLowerCase() +
          //       name
          //         .substring(3)
          //         .replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
          //     return {
          //       path: `element-plus/es/components/${partialName}`,
          //     };
          //   }
          // },

          VueUseComponentsResolver(),
        ],
      }),

      // VitePluginElementPlus({
      //   useSource: false,
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
