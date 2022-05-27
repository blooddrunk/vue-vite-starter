import { VueQueryPlugin } from 'vue-query';

import type { UserPlugin } from '@typings';

export const install: UserPlugin = (app) => {
  app.use(VueQueryPlugin);
};
