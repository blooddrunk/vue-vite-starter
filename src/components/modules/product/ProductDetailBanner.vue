<template>
  <van-swipe v-if="items.length" @change="handleSliderChange">
    <van-swipe-item v-for="(item, index) in displayItems" :key="item.url">
      <SimpleVideoPlayer
        v-if="item.isVideo"
        class="tw-w-full tw-h-[320px]"
        :url="item.url"
        :active="activeIndex === index"
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
        class="tw-absolute tw-py-1 tw-px-2 tw-right-1 tw-bottom-1 tw-text-sm tw-text-white"
      >
        {{ active + 1 }}/{{ total }}
      </div>
    </template>
  </van-swipe>
  <van-image
    v-else
    class="tw-w-full tw-h-[320px]"
    fit="cover"
    src="http://via.placeholder.com/640"
  >
  </van-image>
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
