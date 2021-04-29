<template>
  <el-submenu v-if="hasChildren" index="item.id">
    <template #title>
      <div class="tw-h-full tw-flex tw-items-center">
        <component
          v-if="item.icon"
          :is="getIconComponentName(item.icon)"
          :size="18"
        ></component>
        <span class="tw-ml-1">{{ item.title }}</span>
      </div>
    </template>

    <TheSidebarItem
      v-for="child in item.children"
      :key="child.id"
      :item="child"
    ></TheSidebarItem>
  </el-submenu>

  <el-menu-item v-else :index="item.id" @click="handleItemClick(item)">
    <div class="tw-h-full tw-flex tw-items-center">
      <component
        v-if="item.icon"
        :is="getIconComponentName(item.icon)"
        :size="18"
      ></component>
      <span class="tw-ml-1">{{ item.title }}</span>
    </div>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useRouter } from 'vue-router';

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
