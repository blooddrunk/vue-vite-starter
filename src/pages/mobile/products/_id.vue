<template>
  <article class="h-full relative bg-white pb-[56px]">
    <ProductDetailBanner :items="data.bannerImageList"> </ProductDetailBanner>

    <div class="article leading-normal">
      <van-skeleton title avatar :row="3" :loading="isPending">
        <div class="space-y-3">
          <p>
            <span class="text-primary text-lg font-bold">
              {{ data.price }}
            </span>
            <span class="ml-1 text-primary text-xs">元/月</span>
          </p>
          <p class="font-bold">{{ data.title }}</p>
          <p class="text-medium text-sm">{{ data.body }}</p>
        </div>
      </van-skeleton>
    </div>

    <van-image
      v-if="data.detailImage"
      class="w-full"
      fit="cover"
      :src="data.detailImage"
    >
    </van-image>

    <PageFooter>
      <GoToCartButton></GoToCartButton>

      <van-button
        class="!ml-auto"
        color="var(--color-secondary)"
        round
        :disabled="cart.isItemAdding"
        @click="addToCart"
      >
        加入购物车
      </van-button>

      <router-link :to="checkoutRoute">
        <van-button class="!ml-3" type="primary" round> 立刻购买 </van-button>
      </router-link>
    </PageFooter>
  </article>
</template>

<route lang="yaml">
meta:
  layout: navbar
  title: 商品详情
  canNavBack: true
props: true
</route>

<script lang="ts" setup>
import { defineProps, watch, computed } from 'vue';
import { Toast } from 'vant';

import { fetchProductById } from '@/services';
import { useCartStore } from '@/stores/cart';

const props = defineProps<{
  id: string;
}>();

const { data, isPending, errorMessage, request } = fetchProductById();

watch(
  () => errorMessage.value,
  (value) => {
    Toast.fail(value);
  }
);

request(props.id);

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
    ...data.value,
    quantity: 1,
  });
};

const checkoutRoute = computed(() => ({
  name: 'mobile-order',
  query: {
    productId: props.id,
  },
}));
</script>
