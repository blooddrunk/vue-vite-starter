import { createHead } from '@vueuse/head';

import type { UserPlugin } from '@typings';

export const install: UserPlugin = (app) => {
  const head = createHead();
  app.use(head);
};
