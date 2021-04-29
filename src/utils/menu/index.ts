import { RouteLocationRaw } from 'vue-router';

export type MenuItem = {
  id: string;
  title: string;
  icon?: string;
  to?: RouteLocationRaw;
  children?: MenuItem[];
};

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

export const menuList: MenuItem[] = [
  { id: 'dashboard', title: '首页', icon: 'dashboard' },
  {
    id: 'admin',
    title: '系统管理',
    icon: 'config',
    children: [
      {
        id: 'admin-account',
        title: '账号管理',
        to: {
          name: 'admin-account',
        },
      },
      {
        id: 'admin-role',
        title: '角色管理',
        to: {
          name: 'admin-role',
        },
      },
    ],
  },
];

export const menuLookup = createMenuLookup(menuList);
