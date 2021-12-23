<template>
  <article class="tw-article">
    <div v-if="hasError">
      <van-empty image="error" description="出错了"></van-empty>
    </div>
    <div v-else-if="shouldShowEmptyPlaceholder">
      <van-empty description="出错了"></van-empty>
    </div>
    <OrderList v-else :items="items" :loading="shouldShowSkeleton"></OrderList>
  </article>
</template>

<route lang="yaml">
meta:
  layout: tabbar-navbar
  title: 我的订单
</route>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useOrderStore } from '@/stores/order';

const order = useOrderStore();

const { items, isItemsLoading, isItemsEmpty, itemsLoadingErrorMessage } =
  storeToRefs(order);

// ! test code
if (!__DEV__ || isItemsEmpty.value) {
  order.getItems();
}

const hasError = computed(() => !!itemsLoadingErrorMessage.value);

const shouldShowSkeleton = computed(
  () => isItemsEmpty.value && isItemsLoading.value
);

const shouldShowEmptyPlaceholder = computed(
  () => isItemsEmpty.value && !isItemsLoading.value
);
</script>
