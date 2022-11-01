import type { Router } from 'vue-router';
import { merge } from 'lodash-es';

export default (router: Router) => {
  router.beforeEach((to) => {
    const navTabStore = useNavTabStore();
    const menuStore = useMenuStore();

    const { meta, query, name } = to;

    if (query.experimentalNavTab) {
      navTabStore.experimentalNavTab = true;
    }

    const matchedMenu = menuStore.menuLookupByRoute[name as string];

    if (meta.openInTab !== false && matchedMenu) {
      navTabStore.setActiveTab(matchedMenu.route!);
      navTabStore.addTab(
        merge({}, matchedMenu, {
          routerProps: query,
        })
      );
    }
  });
};
