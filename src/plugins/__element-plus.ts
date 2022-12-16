import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import type { UserPlugin } from '@typings';

export const install: UserPlugin = (app) => {
  app.use(ElementPlus, {
    locale: zhCn,
  });
};
