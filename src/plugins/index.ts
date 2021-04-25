import { App } from 'vue';

export { default as elementUI } from './element-ui';
export { default as veeValidate } from './vee-validate';
export { default as echarts } from './echarts';
export { default as head } from './head';

export const clientInit = (app: App) => {
  app.config.globalProperties.$appName = import.meta.env.VITE_APP_NAME;
};
