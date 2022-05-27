import ElementPlus from 'element-plus';

import type { UserPlugin } from '@typings';

export const install: UserPlugin = (app) => {
  app.use(ElementPlus);
};
