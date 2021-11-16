import 'animate.css';
import 'nprogress/nprogress.css';
import '@icon-park/vue-next/styles/index.css';

import './assets/css/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';
import { store } from './store';
import { install } from './install-plugins';

const app = createApp(App);

(async () => {
  await install(app);

  app.use(router).use(store);

  router.isReady().then(() => app.mount('#app'));
})();
