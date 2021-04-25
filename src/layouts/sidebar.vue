<template>
  <div class="tw-flex">
    <div class="tw-min-h-screen tw-w-full tw-flex tw-flex-col">
      <TheHeading></TheHeading>

      <router-view></router-view>
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
