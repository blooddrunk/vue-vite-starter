<template>
  <div>
    <van-pull-refresh v-model="isRefreshing" @refresh="handleRefresh">
      <van-list
        v-model:loading="isProductListLoading"
        :finished="isLastPage"
        finished-text="没有更多了"
        :immediate-check="false"
        :error="hasError"
        :error-text="fetchListErrorMessage"
        @load="fetchData"
      >
        <van-cell
          v-for="item in productList"
          :key="item.id"
          :title="item.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useProductStore } from '@/stores/product';

const product = useProductStore();
const { productList, isProductListLoading, isLastPage, fetchListErrorMessage } =
  storeToRefs(product);

const isRefreshing = ref(false);
const hasError = computed(() => !!fetchListErrorMessage.value);

const fetchData = () => {
  product.nextPage();
};

const handleRefresh = async () => {
  isRefreshing.value = true;
  await product.fetchProductListAndReset();
  isRefreshing.value = false;
};

product.fetchProductList();
</script>
