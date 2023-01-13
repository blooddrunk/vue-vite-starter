<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
definePage({
  meta: {
    layout: 'sidebar',
    breadcrumb: {
      title: '系统管理',
    },
  },
});

useFirstNavigableRoute('/main/admin');
</script>
