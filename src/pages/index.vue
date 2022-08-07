<template>
  <ul class="list-none md:w-1/2 w-2/3 m-auto text-lg">
    <li v-for="item in menuList" :key="item.text" class="px-2 py-3 border-b">
      <router-link
        class="flex items-center justify-between cursor-pointer"
        :to="item.to"
      >
        {{ item.text }}
      </router-link>
    </li>
  </ul>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
</route>

<script setup lang="ts">
const menuList = ref([
  {
    text: 'Simple list',
    to: '/simple-list',
  },

  {
    text: 'Virtual list',
    to: '/virtual-list',
  },

  {
    text: 'Simple Form',
    to: '/simple-form',
  },

  {
    text: 'ECharts',
    to: '/echarts',
  },

  {
    text: 'Biz Admin',
    to: '/admin/',
  },

  {
    text: 'Mobile layout with vant',
    to: '/mobile',
  },
]);
</script>
