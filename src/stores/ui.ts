import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToggle } from '@vueuse/core';

import { menuList } from '@/utils/menu';
import { BreadcrumbItem, MenuItem } from '@typings';

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
