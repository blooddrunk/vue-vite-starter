<template>
  <figure
    class="tw-p-2 tw-mt-3 tw-bg-white tw-rounded-md tw-shadow tw-shadow-light"
  >
    <van-image
      class="tw-h-32"
      :src="item.thumbnail"
      fit="contain"
      round
      radius="8px"
    ></van-image>
    <div class="tw-line-clamp-3 tw-break-all tw-text-medium">
      <figcaption class="tw-inline tw-text-dark">
        {{ item.title }}
      </figcaption>
      <span class="tw-ml-2 tw-text-xs tw-text-light">
        {{ item.body }}
      </span>
    </div>
    <div class="tw-py-1 tw-flex tw-items-center">
      <span class="tw-text-primary tw-text-bold">{{ item.price }}</span>
      <span class="tw-ml-1 tw-text-primary tw-text-xs">元/月</span>

      <span class="tw-ml-auto">
        <van-button round size="small" type="primary">
          <IconShopping size="16"></IconShopping>
        </van-button>
      </span>
    </div>
  </figure>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

import { ProductItem } from '@typings';

type Props = {
  item: ProductItem;
};

const props = defineProps<Props>();
</script>
