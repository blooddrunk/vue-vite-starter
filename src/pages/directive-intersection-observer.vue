<template>
  <section>
    <div class="flex flex-col justify-center items-center">
      <div
        class="w-6 h-6 transition-all duration-1000 ease-in-out"
        :class="
          isBoxIntersecting ? 'rounded-full bg-pink-300 shadow' : 'bg-green-300'
        "
      ></div>
      <transition
        enter-active-class="animate__animated animate__rubberBand"
        leave-active-class="animate__animated animate__backOutDown"
      >
        <p v-if="isBoxIntersecting">Intersecting</p>
      </transition>
    </div>

    <div
      ref="scrollContainer"
      class="mt-6 overflow-y-auto"
      style="max-height: 20rem"
    >
      <div class="h-screen flex justify-center items-end p-6">
        <div
          v-intersect="intersect"
          class="w-40 h-40 p-6 border-4 border-blue-500 border-opacity-75"
        ></div>
      </div>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
</route>

<script lang="ts" setup>
import { ref } from 'vue';

const scrollContainer = ref(null);

const isBoxIntersecting = ref(false);
const handleIntersect = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
  isIntersecting: boolean
) => {
  isBoxIntersecting.value = isIntersecting;
};

const intersect = {
  handler: handleIntersect,
  options: {
    root: scrollContainer,
    // threshold: [0, 0.5, 1.0],
  },
};
</script>
