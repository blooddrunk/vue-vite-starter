import { menuLookup } from '@/utils/menu';

import { Router } from 'vue-router';

import { useStore } from '@/store';
import { BreadcrumbItem } from '@/store/modules/ui';

export default (router: Router) => {
  router.beforeEach((to, from) => {
    const store = useStore();
    const { matched } = to;
    let breadcrumbList: BreadcrumbItem[] = [];

    const { meta } = matched[matched.length - 1];

    if (Array.isArray(meta.breadcrumb)) {
      breadcrumbList = meta.breadcrumb;
    } else if (meta.breadcrumb) {
      breadcrumbList = matched.reduce<BreadcrumbItem[]>((acc, record) => {
        let item: BreadcrumbItem;
        if (record.meta?.breadcrumb === true) {
          const matchedMenu = menuLookup[record.name as string];
          if (matchedMenu) {
            item = {
              to: matchedMenu.to,
              text: matchedMenu.title,
            };
          } else {
            console.warn(
              `failed to find a matched menu item for route '${
                record.name as string
              }'`
            );
          }
        } else if (record.meta?.breadcrumb) {
          acc = acc.concat(record.meta?.breadcrumb);
        }

        return acc;
      }, []);
    }

    store.commit('ui/setBreadcrumbList', breadcrumbList);
    // // eslint-disable-next-line prefer-const
  });
};
