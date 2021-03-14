import { App } from 'vue';

import PaginatedTable from '../components/UI/PaginatedTable.vue';
import TableActionButton from '@/components/UI/TableActionButton';
import InputWrapper from '@/components/UI/Form/InputWrapper';
import InputNumberWrapper from '@/components/UI/Form/InputNumberWrapper';

export { default as elementUI } from './element-ui';
export { default as veeValidate } from './vee-validate';
export { default as promised } from './promised';

export const clientInit = (app: App) => {
  app.component('PaginatedTable', PaginatedTable);
  app.component('TableActionButton', TableActionButton);
  app.component('InputWrapper', InputWrapper);
  app.component('InputNumberWrapper', InputNumberWrapper);
};
