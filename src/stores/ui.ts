import { defineStore, acceptHMRUpdate } from 'pinia';
import { RouteLocationRaw } from 'vue-router';

import {
  getFirstNavigableMenu,
  menuLookup as rawMenuLookup,
  menuPerSystem as rawMenuPerSystem,
} from '@/utils/biz/menu';

export type BreadcrumbItem = {
  text: string;
  to?: RouteLocationRaw;
  isVisible?: boolean;
};

const availableSystemList = [{ label: '默认系统', value: 'default' }] as const;
export type SystemList = typeof availableSystemList;
export type SystemValue = typeof availableSystemList[number]['value'];
export type MenuItem = {
  id: string;
  title: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
  system: SystemValue;
};

export const useUIStore = defineStore('ui', () => {
  const breadcrumbList = ref<BreadcrumbItem[]>([]);

  const isSidebarCollapsed = useStorage('is_sidebar_collapsed', false);
  const toggleIsSidebarCollapsed = useToggle(isSidebarCollapsed);

  const currentMenuList = shallowRef<MenuItem[]>([]);
  const menuLookup = shallowRef(rawMenuLookup);
  const menuPerSystem = shallowRef(rawMenuPerSystem);
  const menuLookupById = computed(() => menuLookup.value.byId);
  const menuLookupByRoute = computed(() => menuLookup.value.byRoute);
  const firstNavigableMenu = computed(() => {
    const target = getFirstNavigableMenu(currentMenuList.value);
    if (target) {
      return menuLookupByRoute.value[target.route!.toString()];
    }
    return null;
  });

  const systemList = ref<SystemList>(availableSystemList);
  const currentSystem = ref('');
  const systemValueList = computed(() =>
    systemList.value.map((item) => item.value)
  );
  const isSystemSole = computed(() => systemValueList.value.length <= 1);
  const firstAvailableSystem = computed(() => systemList.value[0]);

  const switchSystem = (system: SystemValue) => {
    currentSystem.value = system;
    currentMenuList.value = menuPerSystem.value[system];
  };

  const clearSystem = () => {
    currentSystem.value = '';
    currentMenuList.value = [];
  };

  return {
    breadcrumbList,

    isSidebarCollapsed,
    toggleIsSidebarCollapsed,

    currentMenuList,
    menuLookup,
    menuLookupById,
    menuLookupByRoute,
    firstNavigableMenu,

    systemList,
    currentSystem,
    isSystemSole,
    firstAvailableSystem,
    switchSystem,
    clearSystem,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUIStore, import.meta.hot));
}
