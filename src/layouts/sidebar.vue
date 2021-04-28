<template>
  <div class="tw-flex">
    <div class="tw-min-h-screen tw-w-full tw-flex tw-flex-col">
      <TheHeading></TheHeading>

      <main class="tw-flex-grow tw-p-4 xl:tw-p-8 2xl:tw-p-12 tw-bg-main">
        <TheBreadcrumb></TheBreadcrumb>

        <section class="tw-p-3 xl:tw-p-6 2xl:tw-p-9 tw-bg-white tw-shadow-xl">
          <router-view></router-view>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
