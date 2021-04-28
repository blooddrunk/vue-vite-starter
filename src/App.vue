<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@vueuse/head';
import { DEFAULT_ICON_CONFIGS, IconProvider } from '@icon-park/vue-next';

export default defineComponent({
  setup() {
    useHead({
      title: 'Vue 3 starter template using Vite',
      meta: [
        {
          name: 'description',
          content: 'Opinionated Vite/Vue 3 Starter Template',
        },
      ],
    });

    IconProvider({ ...DEFAULT_ICON_CONFIGS, size: '1em' });
  },
});
</script>
