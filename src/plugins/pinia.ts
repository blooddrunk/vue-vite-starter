import { createPinia } from 'pinia';

import type { UserPlugin } from '@typings';

export const install: UserPlugin = (app) => {
  const pinia = createPinia();
  app.use(pinia);
};
