import { MenuItem } from '@typings';
import admin from './admin';

export const createMenuLookup = (menuList: MenuItem[]) => {
  const lookup: Record<string, MenuItem> = {};

  const traverse = (list: MenuItem[]) =>
    list.forEach((item) => {
      if (!item.id) {
        throw new Error(`Menu item must have a 'id' field: ${item}`);
      }

      lookup[item.id] = {
        ...item,
      };

      if (item.children && item.children.length) {
        traverse(item.children);
      }
    }, {});

  traverse(menuList);

  return lookup;
};

export const menuList = [...admin];

export const menuLookup = createMenuLookup(menuList);
