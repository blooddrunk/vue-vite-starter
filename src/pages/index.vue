<template>
  <ul class="tw-list-none md:tw-w-1/2 tw-w-2/3 tw-m-auto tw-text-lg">
    <li
      v-for="item in menuList"
      class="tw-px-2 tw-py-3 tw-border-b"
      :key="item.text"
    >
      <router-link
        class="tw-flex tw-items-center tw-justify-between tw-cursor-pointer"
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
  breadcrumb:
    text: 'fsd'
</route>

<script setup lang="ts">
const menuList = [
  {
    text: 'Simple list',
    to: '/simple-list',
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
    text: 'Directive(Intersection Observer)',
    to: '/directive-intersection-observer',
  },

  {
    text: 'Lazy Image',
    to: '/lazy-image',
  },

  {
    text: 'Biz Admin',
    to: '/admin/account',
  },
];
</script>
