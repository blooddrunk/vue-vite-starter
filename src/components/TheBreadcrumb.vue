<template>
  <nav v-if="shouldShowBreadcrumb" class="tw-py-3">
    <el-breadcrumb>
      <el-breadcrumb-item
        v-for="breadbrumb in visibleBreadcrumbs"
        :key="breadbrumb.text"
        :to="breadbrumb.to"
      >
        {{ breadbrumb.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const visibleBreadcrumbs = computed(() =>
      store.state.ui.breadcrumbList.filter(
        (breadcrumb) => breadcrumb.isVisible !== false
      )
    );
    const shouldShowBreadcrumb = computed(
      () => visibleBreadcrumbs.value.length > 0
    );

    return {
      visibleBreadcrumbs,
      shouldShowBreadcrumb,
    };
  },
});
</script>
