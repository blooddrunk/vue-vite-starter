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

<script lang="ts" setup>
import { computed } from 'vue';

import { useUIStore } from '@/stores/ui';

const ui = useUIStore();
const visibleBreadcrumbs = computed(() =>
  ui.breadcrumbList.filter((breadcrumb) => breadcrumb.isVisible !== false)
);
const shouldShowBreadcrumb = computed(
  () => visibleBreadcrumbs.value.length > 0
);
</script>
