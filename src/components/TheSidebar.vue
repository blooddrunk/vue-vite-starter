<template>
  <aside>
    <div></div>

    <el-menu :default-active="defaultActiveName">
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
      sidebarCollapsed: computed(() => store.state.ui.sidebarCollapsed),
      sidebarData: computed(() => store.state.ui.sidebarData),

      defaultActiveName: computed(() => route.name),
    };
  },
});
</script>
