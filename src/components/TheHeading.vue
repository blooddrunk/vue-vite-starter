<template>
  <nav :class="$style.heading">
    <AppLogo></AppLogo>

    {{ userName }}
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useStore } from '@/store';

export default defineComponent({
  setup() {
    const store = useStore();
    const userName = store.getters['auth/userName'];

    return {
      userName,
    };
  },
});
</script>

<style lang="postcss" module>
.heading {
  background-image: linear-gradient(
    to right,
    var(--color-primary) 75%,
    var(--color-tertiary)
  );
  background-color: var(--color-primary);

  @apply tw-flex-shrink-0 tw-flex tw-items-center tw-justify-between tw-p-4;
}
</style>
