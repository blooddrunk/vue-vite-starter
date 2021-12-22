<template>
  <article class="tw-article !tw-pb-[calc(56px+1.5rem)]">
    <div v-if="hasError">
      <van-empty image="error" description="出错了"></van-empty>
    </div>
    <div v-else-if="shouldShowEmptyPlaceholder">
      <van-empty description="购物车为空"></van-empty>
    </div>
    <CartList v-else :items="items" :loading="shouldShowSkeleton"></CartList>

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

      <router-link v-slot="{ navigate }" custom to="/mobile/order">
        <van-button
          class="!tw-ml-auto"
          type="primary"
          round
          :disabled="!cart.hasCheckedItems"
          @click="navigate"
        >
          去结算({{ cart.checkedQuantity }})
        </van-button>
      </router-link>
    </footer>
  </article>
</template>

<route lang="yaml">
meta:
  layout: tabbar-navbar
  title: 购物车
</route>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useCartStore } from '@/stores/cart';

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

// ! test code
if (!__DEV__ || isItemsEmpty.value) {
  cart.getItems();
}

const isAllChecked = ref(false);

watch(isAllChecked, () => {
  cart.$patch((state) => {
    state.items.forEach((item) => (item.checked = isAllChecked.value));
  });
});
</script>
