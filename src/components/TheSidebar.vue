<template>
  <aside :class="$style.sidebar">
    <div class="tw-border-b tw-border-gray-100">
      <el-tooltip
        :content="isSidebarCollapsed ? '展开' : '折叠'"
        placement="right"
      >
        <el-button class="tw-w-full" type="text" @click="handleSidebarCollapse">
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

<style lang="scss" module>
.sidebar {
  @apply tw-h-[var(--app-content-height)];
  @apply tw-overflow-y-auto tw-border-r tw-border-gray-200;

  :global {
    span.i-icon {
      @apply tw-visible tw-w-auto tw-h-auto #{!important};
    }

    .el-menu {
      @apply tw-min-h-80;
      @apply tw-border-none #{!important};

      &:not(.el-menu--collapse) {
        @apply tw-w-56;
      }
    }
  }
}
</style>
