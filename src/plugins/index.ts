import { App } from 'vue';

import ElementFormInput from '@/components/UI/Form/ElementFormInput';

export { default as elementUI } from './element-ui';
export { default as veeValidate } from './vee-validate';
export { default as promised } from './promised';

export const clientInit = (app: App) => {
  app.component('ElementFormInput', ElementFormInput);
};
