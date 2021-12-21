<template>
  <article class="tw-article !tw-pb-[calc(51px+1.5rem)]">
    <CartList></CartList>

    <footer
      class="tw-h-[56px] tw-leading-[56px] tw-flex tw-items-center tw-px-4 tw-fixed tw-bottom-[50px] tw-left-0 tw-right-0 tw-shadow tw-shadow-primary tw-bg-white tw-text-sm"
    >
      <van-checkbox v-model="isAllChecked" icon-size="18px">
        全选
      </van-checkbox>

      <span class="tw-ml-3">
        合计： ￥
        <strong class="tw-font-semibold">
          {{ cart.checkedTotalPrice }}
        </strong>
      </span>

      <van-button class="!tw-ml-auto" type="primary" round>
        去结算({{ cart.checkedQuantity }})
      </van-button>
    </footer>
  </article>
</template>

<route lang="yaml">
meta:
  layout: tabbar-navbar
  title: 购物车
</route>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { useCartStore } from '@/stores/cart';

const cart = useCartStore();

const isAllChecked = ref(false);

watch(isAllChecked, () => {
  cart.items = cart.items.map((item) => ({
    ...item,
    checked: isAllChecked.value,
  }));
});
</script>
