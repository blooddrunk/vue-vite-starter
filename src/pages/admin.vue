<template>
  <router-view></router-view>
</template>

<route lang="yaml">
meta:
  layout: sidebar
  breadcrumb:
    title: '系统管理'
</route>

<script lang="ts" setup>
useFirstNavigableRoute('admin');
</script>
