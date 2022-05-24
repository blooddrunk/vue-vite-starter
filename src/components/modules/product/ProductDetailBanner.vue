<template>
  <van-swipe v-if="items.length" @change="handleSliderChange">
    <van-swipe-item v-for="(item, index) in displayItems" :key="item.url">
      <SimpleVideoPlayer
        v-if="item.isVideo"
        wrapper-class="w-full h-[320px]"
        :url="item.url"
        :active="activeIndex === index"
        crossorigin="anonymous"
      ></SimpleVideoPlayer>
      <van-image
        v-else
        class="w-full h-[320px]"
        :src="item.url"
        fit="cover"
      ></van-image>
    </van-swipe-item>

    <template #indicator="{ active }">
      <div
        class="absolute px-2 left-1/2 -translate-x-1/2 bottom-2 text-sm text-white text-center"
      >
        {{ active + 1 }}/{{ total }}
      </div>
    </template>
  </van-swipe>
  <div v-else class="w-full h-[320px] bg-light"></div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, computed } from 'vue';

import { ProductMedia } from '@typings';

const props = withDefaults(
  defineProps<{
    items: ProductMedia[];
  }>(),
  {
    items: () => [],
  }
);

const activeIndex = ref(0);
const handleSliderChange = (index: number) => {
  activeIndex.value = index;
};

const displayItems = computed(() => props.items.slice(0, 9));
const total = computed(() => displayItems.value.length);
</script>
