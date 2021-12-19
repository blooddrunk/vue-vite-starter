import { defineStore } from 'pinia';
import { computed } from 'vue';

import { fetchCartList } from '@/services';
import { precisionFixed } from '@/utils/math';

export const useCartStore = defineStore('cart', () => {
  const {
    data: items,
    isPending: isItemsLoading,
    errorMessage: itemsLoadingErrorMessage,
    request: getItems,
  } = fetchCartList();

  const quantity = computed(() =>
    items.value.reduce((acc, item) => item.quantity + acc, 0)
  );

  const totalPrice = computed(() =>
    precisionFixed(
      items.value.reduce((acc, item) => item.quantity * item.price + acc, 0)
    )
  );

  return {
    items,
    isItemsLoading,
    itemsLoadingErrorMessage,
    quantity,
    totalPrice,
    getItems,
  };
});
