<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { DEFAULT_ICON_CONFIGS, IconProvider } from '@icon-park/vue-next';

useHead({
  title: 'Vue 3 starter template using Vite',
  meta: [
    { name: 'description', content: 'Opinionated Vite/Vue 3 Starter Template' },
  ],
});

IconProvider({ ...DEFAULT_ICON_CONFIGS, size: '1em' });
</script>
