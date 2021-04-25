import { App } from 'vue';
import { createHead } from '@vueuse/head';

export default (app: App) => {
  const head = createHead();
  app.use(head);
};
