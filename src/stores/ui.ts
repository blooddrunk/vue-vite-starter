import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RouteLocationRaw } from 'vue-router';
import { useToggle } from '@vueuse/core';

import { menuList, MenuItem } from '@/utils/menu';

export type BreadcrumbItem = {
  text: string;
  to?: RouteLocationRaw;
  isVisible?: boolean;
};

export type UIState = {
  breadcrumbList: BreadcrumbItem[];
  isSidebarCollapsed: boolean;
  sidebarData: MenuItem[];
};

export const useUIStore = defineStore('ui', () => {
  const breadcrumbList = ref<BreadcrumbItem[]>([]);

  const isSidebarCollapsed = ref(false);
  const toggleIsSidebarCollapsed = useToggle(isSidebarCollapsed);
  const sidebarData = ref<MenuItem[]>(menuList);

  return {
    breadcrumbList,

    isSidebarCollapsed,
    toggleIsSidebarCollapsed,
    sidebarData,
  };
});
