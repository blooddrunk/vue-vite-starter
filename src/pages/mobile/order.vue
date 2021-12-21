<template>
  <article class="tw-article !tw-pb-[56px]">
    <van-empty
      v-if="isItemsEmpty"
      image="error"
      description="出错了"
    ></van-empty>
    <CartList v-else :items="items" readonly></CartList>

    <van-cell-group class="tw-mt-6" inset>
      <van-field label="备注"></van-field>
    </van-cell-group>
  </article>
</template>

<route lang="yaml">
meta:
  layout: navbar
  title: 订单提交
  canNavBack: true
</route>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouteQuery } from '@vueuse/router';
import { useForm } from 'vee-validate';

import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { CartItem } from '@typings';

const directOrderId = useRouteQuery('id');

const product = useProductStore();
const cart = useCartStore();

const items = computed<CartItem[]>(() => {
  if (directOrderId.value) {
    const targetProduct = product.items.find(
      (item) => item.id === directOrderId.value
    );
    if (targetProduct) {
      return [
        {
          ...targetProduct,
          quantity: 1,
        },
      ];
    }
  } else {
    return cart.checkedItems;
  }

  return [];
});

const isItemsEmpty = computed(() => !items.value.length);
</script>
