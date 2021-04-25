<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({
  title: 'Vue 3 starter template using Vite',
  meta: [
    { name: 'description', content: 'Opinionated Vite/Vue 3 Starter Template' },
  ],
});
</script>
