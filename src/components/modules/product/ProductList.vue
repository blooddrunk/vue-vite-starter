<template>
  <div>
    <van-pull-refresh v-model="isRefreshing" @refresh="handleRefresh">
      <van-list
        v-model:loading="isItemsLoading"
        :finished="isLastPage"
        finished-text="没有更多了"
        :immediate-check="false"
        :error="hasError"
        :error-text="itemsLoadingErrorMessage"
        @load="fetchData"
      >
        <ProductItem v-for="item in items" :key="item.id" :item="item">
        </ProductItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useProductStore } from '@/stores/product';

const product = useProductStore();
const { items, isItemsLoading, isLastPage, itemsLoadingErrorMessage } =
  storeToRefs(product);

const isRefreshing = ref(false);
const hasError = computed(() => !!itemsLoadingErrorMessage.value);

const fetchData = () => {
  product.nextPage();
};

const handleRefresh = async () => {
  isRefreshing.value = true;
  await product.getItemsAndReset();
  isRefreshing.value = false;
};

product.getItems();
</script>
