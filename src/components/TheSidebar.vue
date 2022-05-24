<template>
  <aside :class="$style.sidebar">
    <div class="border-b border-gray-100">
      <el-tooltip
        :content="isSidebarCollapsed ? '展开' : '折叠'"
        placement="right"
      >
        <el-button class="w-full" type="text" @click="handleSidebarCollapse">
          <IconMenuUnfold v-if="isSidebarCollapsed"></IconMenuUnfold>
          <IconMenuFold v-else></IconMenuFold>
        </el-button>
      </el-tooltip>
    </div>

    <el-menu :default-active="defaultActiveName" :collapse="isSidebarCollapsed">
      <TheSidebarItem
        v-for="menu in sidebarData"
        :key="menu.id"
        :item="menu"
      ></TheSidebarItem>
    </el-menu>
  </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useUIStore } from '@/stores/ui';

const ui = useUIStore();
const { isSidebarCollapsed, sidebarData } = storeToRefs(ui);

const handleSidebarCollapse = () => ui.toggleIsSidebarCollapsed();

const route = useRoute();
const defaultActiveName = computed(() => (route.name || '') as string);
</script>

<style lang="postcss" module>
.sidebar {
  @apply h-[var(--app-content-height)];
  @apply overflow-y-auto border-r border-gray-200;

  :global {
    span.i-icon {
      @apply visible w-auto h-auto !important;
    }

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
