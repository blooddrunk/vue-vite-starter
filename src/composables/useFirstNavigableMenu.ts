import { MenuItem } from '@/stores/ui';
import { getFirstNavigableMenu, getRouteOfMenuItem } from '@/utils/biz/menu';

// TODO: narrow route name type
export type UseFirstNavigableMenuOptions = {
  withPermission?: boolean;
  lookupByRoute?: boolean;
  immediatelyRedirect?: boolean;
};
export type UseFirstNavigableMenu = {
  (menuList: MenuItem[], options?: UseFirstNavigableMenuOptions): ReturnType<
    typeof getFirstNavigableMenu
  >;
  (parentRouteName: string, options?: UseFirstNavigableMenuOptions): ReturnType<
    typeof getFirstNavigableMenu
  >;
};

export const useFirstNavigableMenu: UseFirstNavigableMenu = (
  ...args: any[]
) => {
  let options: UseFirstNavigableMenuOptions = {
    withPermission: true,
    lookupByRoute: false,
    immediatelyRedirect: false,
  };
  if (args.length === 2) {
    options = { ...options, ...args[1] };
  }

  let menuList: MenuItem[];
  if (typeof args[0] === 'string') {
    const route = useRoute();
    if (route.name !== args[0]) {
      return null;
    }

    const uiStore = useUIStore();
    const authStore = useAuthStore();

    let menuLookup: Record<string, MenuItem>;
    if (options.withPermission) {
      menuLookup = options.lookupByRoute
        ? authStore.permittedMenuLookupByRoute
        : authStore.permittedMenuLookupById;
    } else {
      menuLookup = options.lookupByRoute
        ? uiStore.menuLookupByRoute
        : uiStore.menuLookupById;
    }

    const parent = menuLookup[args[0]];
    if (parent) {
      menuList = parent.children || [];
      if (options.withPermission) {
        menuList = menuList.filter(
          (item) => !!authStore.permittedMenuLookupById[item.id]
        );
      }
    } else {
      throw new Error(`Failed to retrieve children for route '${args[0]}'`);
    }
  } else {
    menuList = args[0];
  }

  const menuItem = getFirstNavigableMenu(menuList);
  if (options.immediatelyRedirect) {
    const route = getRouteOfMenuItem(menuItem);
    if (route) {
      const router = useRouter();
      router.push(route);
      return menuItem;
    } else {
      throw new Error(`Failed to navigate with menu '${menuItem}'`);
    }
  } else {
    return menuItem;
  }
};
