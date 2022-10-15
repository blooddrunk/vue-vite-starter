import type { MenuItem } from '@/stores/menu';

export default [
  {
    id: 'about',
    title: '关于',
    route: 'admin-1',
    icon: 'view-dashboard',
  },
  {
    id: 'admin1',
    title: '系统管理',
    route: 'admin1',
    icon: 'cogs',
    children: [
      {
        id: 'admin-account1',
        title: '账号管理',
        route: 'admin-account1',
      },
      {
        id: 'admin-role1',
        title: '角色管理',
        route: 'admin-role1',
      },
    ],
  },
] as MenuItem[];
