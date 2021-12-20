<template>
  <van-swipe v-if="items.length" :autoplay="3000" height="320px">
    <van-swipe-item v-for="item in props.items" :key="item.url">
      <van-image
        v-if="item.isVideo"
        class="tw-h-full"
        :src="item.url"
        fit="contain"
      ></van-image>
    </van-swipe-item>

    <template #indicator="{ active }">
      <div
        class="tw-absolute tw-py-1 tw-px-2 tw-right-1 tw-bottom-1 tw-bg-white/40 tw-text-white"
      >
        {{ active + 1 }}/${{ total }}
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
import { withDefaults, defineProps, computed } from 'vue';

import { ProductMedia } from '@typings';

const props = withDefaults(
  defineProps<{
    items: ProductMedia[];
  }>(),
  {
    items: () => [],
  }
);

const total = computed(() => props.items.length);
</script>
