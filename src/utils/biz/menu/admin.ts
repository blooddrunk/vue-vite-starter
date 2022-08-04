import { MenuItem } from '@typings';

export default [
  { id: 'dashboard', title: '首页', icon: 'view-dashboard' },
  {
    id: 'admin',
    title: '系统管理',
    icon: 'cogs',
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
] as MenuItem[];
