import { defineStore } from 'pinia';
import { shallowRef, watch } from 'vue';

import { useProductList } from '@/services';
import { ProductItem } from '@typings';

export const useProductStore = defineStore('product', () => {
  const {
    items,
    isPending: isProductListLoading,
    isFirstPage,
    isLastPage,
    errorMessage: fetchListErrorMessage,
    nextPage,
    fetchList,
    fetchListAndReset,
  } = useProductList();
  const productList = shallowRef<ProductItem[]>([]);

  watch(
    () => items.value,
    (value) => {
      if (isFirstPage.value) {
        productList.value = [];
      }
      if (value.length) {
        productList.value = productList.value.concat(value);
      }
    }
  );

  return {
    productList,
    isProductListLoading,
    isLastPage,
    fetchListErrorMessage,
    nextPage,
    fetchList,
    fetchListAndReset,
  };
});
