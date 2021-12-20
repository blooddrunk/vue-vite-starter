<template>
  <van-tabbar v-model="activeItem" class="!tw-fixed">
    <van-tabbar-item
      v-for="tab in tabbarItems"
      :key="tab.name"
      :name="tab.routeName"
      :to="tab.path"
      :dot="tab.dot"
      :badge="tab.badge"
    >
      <span>{{ tab.name }}</span>

      <template #icon="{ active }">
        <component
          :is="tab.icon"
          :class="active && 'tw-text-primary'"
        ></component>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts" setup>
import { shallowRef, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { AllApplication, Dropbox, Shopping, Me } from '@icon-park/vue-next';

const route = useRoute();
const tabbarItems = shallowRef([
  {
    name: '分类',
    path: '/mobile/category',
    routeName: 'mobile-category',
    icon: AllApplication,
    dot: false,
    badge: '',
  },
  {
    name: '定制',
    path: '/mobile/customization',
    routeName: 'mobile-customization',
    icon: Dropbox,
    dot: false,
    badge: '',
  },
  {
    name: '购物车',
    path: '/mobile/cart',
    routeName: 'mobile-cart',
    icon: Shopping,
    dot: false,
    badge: '',
  },
  {
    name: '我的',
    path: '/mobile/user',
    routeName: 'mobile-user',
    icon: Me,
    dot: false,
    badge: '',
  },
]);
const activeItem = ref(route.name as string);

watch(
  () => route.name as string,
  (value) => {
    activeItem.value = value;
  }
);
</script>
