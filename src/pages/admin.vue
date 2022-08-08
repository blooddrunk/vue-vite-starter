<template>
  <router-view></router-view>
</template>

<route lang="yaml">
meta:
  layout: sidebar
  breadcrumb:
    text: 'Admin'
</route>

<script lang="ts" setup>
useFirstNavigableMenu('admin', {
  immediatelyRedirect: true,
});
</script>
