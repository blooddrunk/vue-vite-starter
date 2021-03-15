import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import legacy from '@vitejs/plugin-legacy';
import viteComponents, { ElementPlusResolver } from 'vite-plugin-components';

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
      // * this works, but I don't really like it
      viteComponents({
        extensions: ['vue', 'ts'],

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

          ElementPlusResolver({
            importStyle: false,
          }),
        ],
      }),
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
