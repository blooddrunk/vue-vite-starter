<template>
  <div v-if="hasError">
    <van-empty image="error" description="出错了"></van-empty>
  </div>
  <div v-else-if="shouldShowEmptyPlaceholder">
    <van-empty description="购物车为空"></van-empty>
  </div>
  <div v-else>
    <CartItem
      v-for="item in itemsMaybeSkeleton"
      :key="item.id"
      v-model:checked="item.checked"
      v-model:quantity="item.quantity"
      :readonly="readonly"
      :item="item"
      :loading="shouldShowSkeleton"
    >
    </CartItem>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useCartStore } from '@/stores/cart';
import type { CartItem } from '@typings';

withDefaults(
  defineProps<{
    readonly?: boolean;
  }>(),
  {
    readonly: false,
  }
);

const placeholderItems = [...Array(10).keys()].map((id) => ({
  id: String(id),
})) as CartItem[];

const cart = useCartStore();
const { items, isItemsLoading, isItemsEmpty, itemsLoadingErrorMessage } =
  storeToRefs(cart);

const hasError = computed(() => !!itemsLoadingErrorMessage.value);

const shouldShowSkeleton = computed(
  () => isItemsEmpty.value && isItemsLoading.value
);

const shouldShowEmptyPlaceholder = computed(
  () => isItemsEmpty.value && !isItemsLoading.value
);

const itemsMaybeSkeleton = computed(() =>
  shouldShowSkeleton.value ? placeholderItems : items.value
);

cart.getItems();
</script>
