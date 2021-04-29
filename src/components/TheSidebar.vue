<template>
  <aside :class="$style.sidebar">
    <div>
      <el-tooltip
        :content="isSidebarCollapsed ? '展开' : '折叠'"
        placement="right"
      >
        <el-button
          class="tw-w-full"
          type="text"
          @click="toggleIsSidebarCollapsed"
        >
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

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

import { useStore } from '@/store';

export default defineComponent({
  name: 'TheSidebar',

  setup() {
    const store = useStore();
    const route = useRoute();

    return {
      isSidebarCollapsed: computed(() => store.state.ui.isSidebarCollapsed),
      toggleIsSidebarCollapsed: () =>
        store.commit('ui/toggleIsSidebarCollapsed'),
      sidebarData: computed(() => store.state.ui.sidebarData),

      defaultActiveName: computed(() => route.name),
    };
  },
});
</script>

<style lang="scss" module>
.sidebar {
  height: var(--app-content-height);
  @apply tw-overflow-y-auto;

  :global {
    span.i-icon {
      @apply tw-visible tw-w-auto tw-h-auto #{!important};
    }

    .el-menu {
      min-height: theme('spacing.96');
    }
  }
}
</style>
