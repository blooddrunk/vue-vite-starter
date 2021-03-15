import { App } from 'vue';
import { ElLoading } from 'element-plus';
import '@/assets/scss/element-ui.scss';

export default (app: App) => {
  app.use(ElLoading);
};
