import type { MenuItem } from '@/stores/ui';
import { getFirstNavigableMenu, getRouteOfMenuItem } from '@/utils/biz/menu';

// TODO: narrow route name type
export type UseFirstNavigableMenuOptions = {
  withPermission?: boolean;
  lookupByRoute?: boolean;
};

export type UseFirstNavigableMenuReturn = {
  menuItem: ReturnType<typeof getFirstNavigableMenu>;
  targetRoute: ReturnType<typeof getRouteOfMenuItem>;
};

export type UseFirstNavigableMenu = {
  (options?: UseFirstNavigableMenuOptions): UseFirstNavigableMenuReturn;
  (
    menuList: MenuItem[],
    options?: UseFirstNavigableMenuOptions
  ): UseFirstNavigableMenuReturn;
  (
    parentRouteName: string,
    options?: UseFirstNavigableMenuOptions
  ): UseFirstNavigableMenuReturn;
};

export const useFirstNavigableMenu: UseFirstNavigableMenu = (
  ...args: any[]
) => {
  let options: UseFirstNavigableMenuOptions = {
    withPermission: true,
    lookupByRoute: true,
  };
  if (args.length === 2) {
    options = { ...options, ...args[1] };
  } else if (args.length === 1) {
    if (!Array.isArray(args[0]) && typeof args[0] !== 'string') {
      options = {
        ...options,
        ...args[0],
      };
    }
  }

  const authStore = useAuthStore();

  let menuList: MenuItem[] | null = null;
  if (typeof args[0] === 'string') {
    const uiStore = useUIStore();

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
  } else if (Array.isArray(args[0])) {
    menuList = args[0];
  }

  const menuItem = menuList
    ? getFirstNavigableMenu(menuList)
    : authStore.firstPermittedMenu;
  const targetRoute = getRouteOfMenuItem(menuItem);

  return {
    menuItem,
    targetRoute,
  };
};
