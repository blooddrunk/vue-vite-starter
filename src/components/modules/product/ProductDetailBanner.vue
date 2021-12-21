<template>
  <van-swipe v-if="items.length" @change="handleSliderChange">
    <van-swipe-item v-for="(item, index) in displayItems" :key="item.url">
      <SimpleVideoPlayer
        v-if="item.isVideo"
        wrapper-class="tw-w-full tw-h-[320px]"
        :url="item.url"
        :active="activeIndex === index"
        crossorigin="anonymous"
      ></SimpleVideoPlayer>
      <van-image
        v-else
        class="tw-w-full tw-h-[320px]"
        :src="item.url"
        fit="cover"
      ></van-image>
    </van-swipe-item>

    <template #indicator="{ active }">
      <div
        class="tw-absolute tw-px-2 tw-left-1/2 tw--translate-x-1/2 tw-bottom-2 tw-text-sm tw-text-white tw-text-center"
      >
        {{ active + 1 }}/{{ total }}
      </div>
    </template>
  </van-swipe>
  <div v-else class="tw-w-full tw-h-[320px] tw-bg-light"></div>
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
