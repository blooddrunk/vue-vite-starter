import { defineStore } from 'pinia';

import { fetchProductList } from '@/services';

export const useProductStore = defineStore('product', () => {
  const {
    items,
    isPending: isItemsLoading,
    pagination,
    errorMessage: itemsLoadingErrorMessage,
    fetchList: getItems,
    fetchListAndReset: getItemsAndReset,
  } = fetchProductList();

  return {
    items,
    isItemsLoading,
    itemsLoadingErrorMessage,
    isLastPage: pagination.isLastPage,
    nextPage: pagination.nextPage,
    getItems,
    getItemsAndReset,
  };
});
