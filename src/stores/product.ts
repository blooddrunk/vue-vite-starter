import { defineStore } from 'pinia';

import { useProductList } from '@/services';

export const useProductStore = defineStore('product', () => {
  const {
    items,
    isPending: isItemsLoading,
    pagination,
    errorMessage: itemsLoadingErrorMessage,
    fetchList: getItems,
    fetchListAndReset: getItemsAndReset,
  } = useProductList();

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
