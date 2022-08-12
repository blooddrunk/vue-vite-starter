<template>
  <ProductItemSkeleton v-if="loading"></ProductItemSkeleton>
  <router-link v-else :to="routeLocation">
    <figure class="p-2 mt-3 bg-white rounded-md shadow shadow-light">
      <van-image
        class="w-full h-32"
        :src="item.thumbnail"
        fit="cover"
        round
        radius="8px"
      ></van-image>
      <div class="line-clamp-3 break-all text-medium">
        <figcaption class="inline text-dark">
          {{ item.title }}
        </figcaption>
        <span class="ml-2 text-xs text-light">
          {{ item.body }}
        </span>
      </div>
      <div class="py-1 flex items-center">
        <span class="text-primary font-bold">{{ item.price }}</span>
        <span class="ml-1 text-primary text-xs">元/月</span>

        <span class="ml-auto">
          <van-button
            round
            size="small"
            type="primary"
            :disabled="cart.isItemAdding"
            @click.prevent.stop="addToCart"
          >
            <IconMdiCartPlus></IconMdiCartPlus>
          </van-button>
        </span>
      </div>
    </figure>
  </router-link>
</template>

<script lang="ts" setup>
import { Toast } from 'vant';
import { RouteLocationRaw } from 'vue-router';

import type { ProductItem } from '@typings';

type Props = {
  item: ProductItem;
  loading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const cart = useCartStore();

const addToCart = () => {
  try {
    cart.addItem({
      ...props.item,
      quantity: 1,
    });
  } catch (error: any) {
    Toast(error.message);
  }
};

const routeLocation: RouteLocationRaw = {
  name: 'mobile-products-id',
  params: {
    id: props.item.id,
  },
};
</script>
