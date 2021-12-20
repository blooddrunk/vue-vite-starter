<template>
  <ProductItemSkeleton v-if="loading"></ProductItemSkeleton>
  <router-link v-else :to="routeLocation">
    <figure
      class="tw-p-2 tw-mt-3 tw-bg-white tw-rounded-md tw-shadow tw-shadow-light"
    >
      <van-image
        class="tw-w-full tw-h-32"
        :src="item.thumbnail"
        fit="cover"
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
        <span class="tw-text-primary tw-font-bold">{{ item.price }}</span>
        <span class="tw-ml-1 tw-text-primary tw-text-xs">元/月</span>

        <span class="tw-ml-auto">
          <van-button
            round
            size="small"
            type="primary"
            :disabled="cart.isItemAdding"
            @click.prevent="addToCart"
          >
            <IconShopping size="16"></IconShopping>
          </van-button>
        </span>
      </div>
    </figure>
  </router-link>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, watch } from 'vue';
import { Toast } from 'vant';
import { RouteLocationRaw } from 'vue-router';

import type { ProductItem } from '@typings';
import { useCartStore } from '@/stores/cart';

type Props = {
  item: ProductItem;
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const cart = useCartStore();
watch(
  () => cart.itemAddingErrorMessage,
  (value) => {
    if (value) {
      Toast(value);
    }
  }
);
const addToCart = () => {
  cart.addItem({
    ...props.item,
    quantity: 1,
  });
};

const routeLocation: RouteLocationRaw = {
  name: 'mobile-products-id',
  params: {
    id: props.item.id,
  },
};
</script>
