<template></template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { MenuItem } from '@/utils/menu';

export default defineComponent({
  name: 'TheSidebarItem',

  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true,
    },
  },

  setup(props) {
    const hasChildren = computed(() => props.item.children?.length);

    return {
      hasChildren,
    };
  },
});
</script>
