import { defineStore, acceptHMRUpdate } from 'pinia';

import { menuList } from '@/utils/biz/menu';
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
