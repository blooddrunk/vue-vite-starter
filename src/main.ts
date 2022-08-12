import 'animate.css';

import './assets/css/main.css';
import 'vant/es/toast/style/index';
import 'vant/es/dialog/style/index';

import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';
import type { UserPlugin } from '@typings';

const app = createApp(App);

const installPlugins = async () => {
  const modules = Object.entries(
    import.meta.glob<{ install: UserPlugin }>(
      ['./plugins/*/index.ts', './plugins/*.ts'],
      {
        eager: true,
      }
    )
  ).filter(([path]) => !path.split('/').pop()!.startsWith('_'));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  await Promise.all(modules.map(([_, m]) => m.install?.(app)));
};

(async () => {
  app.use(router);

  await installPlugins();

  router.isReady().then(() => app.mount('#app'));
})();
