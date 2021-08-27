<template>
  <main
    class=" tw-h-screen tw-p-6 tw-overflow-y-auto dark:tw-bg-gray-800 dark:tw-text-white"
  >
    <section class="tw-flex tw-flex-col tw-items-center tw-pt-20">
      <router-link to="/">
        <h2
          class=" tw-flex tw-items-center tw-py-5 tw-text-3xl tw-font-bold tw-text-primary"
        >
          <span>Vue 3</span>

          <el-button class="!tw-ml-3" type="text" @click="toggleIsDark">
            <IconMoon v-if="isDark" :size="20"></IconMoon>
            <IconSun v-else :size="20"></IconSun>
          </el-button>
        </h2>
      </router-link>

      <div class="tw-container">
        <router-view></router-view>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

export default defineComponent({
  setup() {
    const isDark = useDark({
      valueDark: 'tw-dark',
    });
    const toggleIsDark = useToggle(isDark);

    return {
      isDark,
      toggleIsDark,
    };
  },
});
</script>
