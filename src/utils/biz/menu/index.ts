import type { MenuItem } from '@typings';
import type { SystemValue } from '@/stores/ui';
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
        byRoute[item.route] = { ...newItem };
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

export const menuList = [...defaultMenuList];

export const menuLookup = createMenuLookup(menuList, 'default');
