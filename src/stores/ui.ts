import { defineStore, acceptHMRUpdate } from 'pinia';

import { menuList, menuLookup } from '@/utils/biz/menu';
import type { BreadcrumbItem, MenuItem } from '@typings';

const availableSystemList = [{ label: '默认系统', value: 'default' }] as const;
export type SystemList = typeof availableSystemList;
export type SystemValue = typeof availableSystemList[number]['value'];

export type UIState = {
  breadcrumbList: BreadcrumbItem[];

  isSidebarCollapsed: boolean;
  sidebarData: MenuItem[];

  systemList: SystemList;
  currentSystem: string;
  currentMenuList: MenuItem[];
};

export const useUIStore = defineStore('ui', () => {
  const breadcrumbList = ref<BreadcrumbItem[]>([]);

  const isSidebarCollapsed = ref(false);
  const toggleIsSidebarCollapsed = useToggle(isSidebarCollapsed);
  const sidebarData = ref<MenuItem[]>(menuList);

  const systemList = ref<SystemList>(availableSystemList);
  const currentSystem = ref('');
  const currentMenuList = ref<MenuItem[]>();

  const systemValueList = computed(() =>
    systemList.value.map((item) => item.value)
  );
  const isSystemSole = computed(() => systemValueList.value.length <= 1);

  return {
    breadcrumbList,

    isSidebarCollapsed,
    toggleIsSidebarCollapsed,
    sidebarData,

    systemList,
    currentSystem,
    currentMenuList,
    isSystemSole,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
