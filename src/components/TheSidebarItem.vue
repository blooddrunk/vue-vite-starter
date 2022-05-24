<template>
  <el-sub-menu v-if="hasChildren" index="item.id">
    <template #title>
      <component
        :is="getIconComponentName(item.icon)"
        v-if="item.icon"
        :size="18"
      ></component>
      <span class="ml-1.5">{{ item.title }}</span>
    </template>

    <TheSidebarItem
      v-for="child in item.children"
      :key="child.id"
      :item="child"
    ></TheSidebarItem>
  </el-sub-menu>

  <el-menu-item v-else :index="item.id" @click="handleItemClick(item)">
    <component
      :is="getIconComponentName(item.icon)"
      v-if="item.icon"
      :size="18"
    ></component>
    <span class="ml-1.5">{{ item.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useRouter } from 'vue-router';

import { MenuItem } from '@typings';

export default defineComponent({
  name: 'TheSidebarItem',

  props: {
    item: {
      type: Object as PropType<MenuItem>,
      required: true,
    },
  },

  setup(props) {
    const hasChildren = computed(() => !!props.item.children?.length);

    const router = useRouter();
    const handleItemClick = (item: MenuItem) => {
      if (item.to) {
        router.push(item.to);
      } else {
        console.warn(`No route config found for '${item.id}'`);
      }
    };

    const getIconComponentName = (shortname: string) => `icon-${shortname}`;

    return {
      hasChildren,
      handleItemClick,
      getIconComponentName,
    };
  },
});
</script>
