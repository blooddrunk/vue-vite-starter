import { RouteLocationRaw } from 'vue-router';

export type BreadcrumbItem = {
  text: string;
  to?: RouteLocationRaw | null;
  isVisible?: boolean;
};

export type UIState = {
  breadcrumbList: BreadcrumbItem[];
};

const state = () => ({
  breadcrumbList: [],
});

const mutations = {
  setBreadcrumbList: (state: UIState, payload: BreadcrumbItem[]) => {
    state.breadcrumbList = payload;
  },

  clearBreadcrumbList: (state: UIState) => {
    state.breadcrumbList = [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
