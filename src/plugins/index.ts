import { App } from 'vue';

import ElementInput from '@/components/UI/Form/ElementInput.ts';

export { default as elementUI } from './element-ui';
export { default as veeValidate } from './vee-validate';
export { default as promised } from './promised';

export const clientInit = (app: App) => {
  app.component('ElementInput', ElementInput);
};
