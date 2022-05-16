<template>
  <main
    class="tw-h-screen tw-p-6 tw-overflow-y-auto dark:tw-bg-gray-800 dark:tw-text-white"
  >
    <section class="tw-flex tw-flex-col tw-items-center tw-pt-20">
      <router-link to="/">
        <h2
          class="tw-flex tw-items-center tw-py-5 tw-text-3xl tw-font-bold tw-text-primary"
        >
          <span>Vue 3</span>

          <el-button
            class="!tw-ml-3 !tw-text-xl"
            type="primary"
            text
            @click="toggleNightMode"
          >
            <icon-mdi-weather-night v-if="isDark"></icon-mdi-weather-night>
            <icon-mdi-weather-sunny v-else :size="20"></icon-mdi-weather-sunny>
          </el-button>
        </h2>
      </router-link>

      <div class="tw-container">
        <router-view></router-view>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
const isDark = useDark({
  valueDark: 'tw-dark',
});
const toggleIsDark = useToggle(isDark);
const toggleNightMode = () => toggleIsDark();
</script>
