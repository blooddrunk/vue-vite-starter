<template>
  <main class="tw-h-screen tw-p-6 tw-overflow-y-auto dark:tw-bg-gray-800">
    <section class="tw-flex tw-flex-col tw-items-center tw-pt-20">
      <router-link to="/">
        <h2
          class="tw-flex tw-items-center tw-py-5 tw-text-3xl tw-text-indigo-500 tw-font-bold"
        >
          <IconHome></IconHome>
          <span class="tw-ml-1">Vue 3</span>
        </h2>
      </router-link>

      <div class="tw-container">
        <slot></slot>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { Home } from '@icon-park/vue-next';

export default defineComponent({
  name: 'DefaultLayout',

  // components: {
  //   [Home.name]: Home,
  // },
});
</script>
