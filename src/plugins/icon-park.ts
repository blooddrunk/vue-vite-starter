import { Dashboard, Config } from '@icon-park/vue-next';
import { Icon } from '@icon-park/vue-next/es/runtime';
import { App } from 'vue';

export default (app: App) => {
  const registerIconComponent = (...iconList: Icon[]) => {
    iconList.forEach((icon) => {
      app.component(icon.name, icon);
    });
  };

  registerIconComponent(Dashboard, Config);
};
