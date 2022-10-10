import type { MenuItem } from '@/stores/ui';

export default [
  {
    id: 'about',
    title: '关于',
    route: 'admin-home',
    icon: 'view-dashboard',
  },
  {
    id: 'admin',
    title: '系统管理',
    route: 'admin',
    icon: 'cogs',
    children: [
      {
        id: 'admin-account',
        title: '账号管理',
        route: 'admin-account',
      },
      {
        id: 'admin-role',
        title: '角色管理',
        route: 'admin-role',
      },
    ],
  },
] as MenuItem[];
