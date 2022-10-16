<template>
  <el-menu
    :class="$style.topNav"
    :default-active="currentSystem"
    mode="horizontal"
    @select="handleSystemSwitch"
  >
    <el-menu-item
      v-for="system in systemList"
      :key="system.value"
      :index="system.value"
    >
      {{ system.label }}
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import type { SystemValue } from '@/stores/menu';
import { getRouteOfMenuItem } from '@/utils/biz/menu';

const menuStore = useMenuStore();
const { systemList, currentSystem } = storeToRefs(menuStore);
const { firstPermittedMenuBySystem } = useAuthStore();
const router = useRouter();

const handleSystemSwitch = (key: string) => {
  menuStore.currentMenuList = [];

  setTimeout(() => {
    menuStore.switchSystem(key as SystemValue);

    const nextRoute = getRouteOfMenuItem(firstPermittedMenuBySystem);
    if (nextRoute) {
      router.push(nextRoute);
    }
  }, 300);
};
</script>

<style lang="postcss" module>
.sidebar {
  @apply h-[var(--app-content-height)];
  @apply overflow-y-auto border-r border-gray-200;

  :global {
    .el-menu {
      @apply min-h-80;
      @apply border-none !important;

      &:not(.el-menu--collapse) {
        @apply w-56;
      }
    }
  }
}
</style>
