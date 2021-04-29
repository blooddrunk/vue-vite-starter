import { RouteLocationRaw } from 'vue-router';

import { menuList, MenuItem } from '@/utils/menu';

export type BreadcrumbItem = {
  text: string;
  to?: RouteLocationRaw | null;
  isVisible?: boolean;
};

export type UIState = {
  breadcrumbList: BreadcrumbItem[];
  isSidebarCollapsed: boolean;
  sidebarData: MenuItem[];
};

const state = () => ({
  breadcrumbList: [],
  isSidebarCollapsed: false,
  sidebarData: menuList,
});

const mutations = {
  setBreadcrumbList: (state: UIState, payload: BreadcrumbItem[]) => {
    state.breadcrumbList = payload;
  },

  toggleIsSidebarCollapsed: (state: UIState) => {
    state.isSidebarCollapsed = !state.isSidebarCollapsed;
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
