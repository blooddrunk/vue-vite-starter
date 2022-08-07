import type { MenuItem } from '@/stores/ui';

export default [
  {
    id: 'dashboard',
    title: '首页',
    route: 'admin-home',
    icon: 'view-dashboard',
  },
  {
    id: 'admin',
    title: '系统管理',
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
