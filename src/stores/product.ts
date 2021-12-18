import { defineStore } from 'pinia';

import { useProductList } from '@/services';

export const useProductStore = defineStore('product', () => {
  const {
    items: productList,
    isPending: isProductListLoading,
    pagination,
    errorMessage: fetchListErrorMessage,
    fetchList: fetchProductList,
    fetchListAndReset: fetchProductListAndReset,
  } = useProductList();

  return {
    productList,
    isProductListLoading,
    fetchListErrorMessage,
    isLastPage: pagination.isLastPage,
    nextPage: pagination.nextPage,
    fetchProductList,
    fetchProductListAndReset,
  };
});
