import { RouteLocationRaw } from 'vue-router';

import { menuList, MenuItem } from '@/utils/menu';

export type BreadcrumbItem = {
  text: string;
  to?: RouteLocationRaw | null;
  isVisible?: boolean;
};

export type UIState = {
  breadcrumbList: BreadcrumbItem[];
  sidebarCollapsed: boolean;
  sidebarData: MenuItem[];
};

const state = () => ({
  breadcrumbList: [],
  sidebarCollapsed: false,
  sidebarData: menuList,
});

const mutations = {
  setBreadcrumbList: (state: UIState, payload: BreadcrumbItem[]) => {
    state.breadcrumbList = payload;
  },

  setSidebarData: (state: UIState, payload: MenuItem[]) => {
    state.sidebarData = payload;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
