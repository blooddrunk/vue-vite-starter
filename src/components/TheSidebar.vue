<template>
  <aside :class="$style.sidebar">
    <div class="border-b border-gray-100">
      <el-tooltip
        :content="isSidebarCollapsed ? '展开' : '折叠'"
        placement="right"
      >
        <el-button
          class="w-full !h-[var(--el-menu-item-height)]"
          link
          type="primary"
          @click="handleSidebarCollapse"
        >
          <IconMdiMenu v-if="isSidebarCollapsed"></IconMdiMenu>
          <IconMdiMenuOpen v-else></IconMdiMenuOpen>
        </el-button>
      </el-tooltip>
    </div>

    <el-menu :default-active="defaultActiveName" :collapse="isSidebarCollapsed">
      <TheSidebarItem
        v-for="menu in filterPermittedMenu(currentMenuList)"
        :key="menu.id"
        :item="menu"
        :filter="filterPermittedMenu"
      ></TheSidebarItem>
    </el-menu>
  </aside>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import type { MenuItem } from '@/stores/ui';

const uiStore = useUIStore();
const { isSidebarCollapsed, currentMenuList, menuLookupByRoute } =
  storeToRefs(uiStore);
const handleSidebarCollapse = () => uiStore.toggleIsSidebarCollapsed();

const route = useRoute();
const defaultActiveName = computed(() => {
  const matched = menuLookupByRoute.value[route.name as string];
  return matched ? matched.id : '';
});

const authStore = useAuthStore();
const filterPermittedMenu = (items?: MenuItem[]) =>
  items
    ? items.filter((item) => !!authStore.permittedMenuLookupById[item.id])
    : [];
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
