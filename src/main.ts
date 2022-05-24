import 'animate.css';
// import 'nprogress/nprogress.css';
// import '@icon-park/vue-next/styles/index.css';

import './assets/css/main.css';
import 'vant/es/toast/style/index';
import 'vant/es/dialog/style/index';

import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';

const app = createApp(App);

(async () => {
  app.use(router);

  const plugins = [
    ...Object.values(import.meta.globEager('./plugins/*/index.ts')),
    ...Object.values(import.meta.globEager('./plugins/*.ts')),
  ].map((i) => i.install?.(app));

  console.log(plugins);

  await Promise.all(plugins);

  router.isReady().then(() => app.mount('#app'));
})();
