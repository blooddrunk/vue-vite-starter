import { defineStore } from 'pinia';

import { fetchProductList } from '@/services';

export const useProductStore = defineStore('product', () => {
  const {
    items,
    isPending: isItemsLoading,
    pagination,
    errorMessage: itemsLoadingErrorMessage,
    isEmpty: isItemsEmpty,
    fetchList: getItems,
    fetchListAndReset: getItemsAndReset,
  } = fetchProductList();

  return {
    items,
    isItemsLoading,
    isItemsEmpty,
    itemsLoadingErrorMessage,
    isLastPage: pagination.isLastPage,
    nextPage: pagination.nextPage,
    getItems,
    getItemsAndReset,
  };
});
