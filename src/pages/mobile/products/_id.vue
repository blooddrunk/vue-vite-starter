<template>
  <article class="tw-h-full tw-relative tw-bg-white tw-pb-[56px]">
    <ProductDetailBanner :items="data.bannerImageList"> </ProductDetailBanner>

    <div class="tw-article tw-leading-normal">
      <van-skeleton title avatar :row="3" :loading="isPending">
        <p>
          <span class="tw-text-primary tw-font-bold">{{ data.price }}</span>
          <span class="tw-ml-1 tw-text-primary tw-text-xs">元/月</span>
        </p>
        <p class="tw-font-bold">{{ data.title }}</p>
        <p class="tw-text-medium tw-text-sm">{{ data.body }}</p>
      </van-skeleton>
    </div>

    <van-image
      v-if="data.detailImage"
      class="tw-w-full"
      fit="cover"
      :src="data.detailImage"
    >
    </van-image>

    <footer
      class="tw-h-[56px] tw-leading-[40px] tw-flex tw-items-center tw-px-4 tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-shadow tw-shadow-primary tw-bg-white"
    >
      <GoToCartButton></GoToCartButton>

      <van-button
        class="!tw-ml-auto"
        color="var(--color-secondary)"
        round
        :disabled="cart.isItemAdding"
        @click="addToCart"
      >
        加入购物车
      </van-button>

      <van-button class="!tw-ml-3" type="primary" round> 立刻购买 </van-button>
    </footer>
  </article>
</template>

<route lang="yaml">
meta:
  layout: navbar
  requiresAuth: false
  title: 商品详情
  canNavBack: true
props: true
</route>

<script lang="ts" setup>
import { defineProps, watch } from 'vue';
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
</script>
