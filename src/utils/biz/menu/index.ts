import { mergeWith } from 'lodash-es';

import type { SystemValue, MenuItem } from '@/stores/ui';
import defaultMenuList from './default';

export const createMenuLookup = (menuList: MenuItem[], system: SystemValue) => {
  const byId = {} as Record<string, MenuItem>;
  const byRoute = {} as Record<string, MenuItem>;

  const traverse = (tree: MenuItem[]) =>
    tree.forEach((item) => {
      if (!item.id) {
        throw new Error(`Menu item must have a 'id' field: ${item}`);
      }

      const newItem = {
        ...item,
        system,
      };

      byId[item.id] = { ...newItem };
      if (item.route) {
        byRoute[item.route.toString()] = { ...newItem };
      }

      if (item.children && item.children.length) {
        traverse(item.children);
      }
    }, {});

  traverse(menuList);

  return {
    byId,
    byRoute,
  };
};

export const getFirstNavigableMenu = (
  menuList: MenuItem[]
): MenuItem | null | undefined => {
  for (const item of menuList) {
    if (item.route) {
      return item;
    } else if (item.children) {
      return getFirstNavigableMenu(item.children);
    } else {
      return null;
    }
  }
};

export const getRouteOfMenuItem = (item: MenuItem) => {
  if (item && item.route && item.id) {
    if (typeof item.route !== 'string') {
      throw new Error(`[route] property of menu item must be route name`);
    }
    return { name: item.route };
  }

  return null;
};

export const allMenuList = [...defaultMenuList];

export const menuLookup = mergeWith(
  {},
  createMenuLookup(defaultMenuList, 'default'),
  (objValue, srcValue) => {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  }
);

export const menuPerSystem: { [Key in SystemValue]: MenuItem[] } = {
  default: defaultMenuList,
};
