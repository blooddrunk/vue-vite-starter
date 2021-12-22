import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

import { OrderInfo } from '@typings';
import { fetchOrderList } from '@/services';

const getDefaultOrderInfo = () => ({
  items: [],
  contactPerson: '',
  servicePhone: '',
  address: '',
});

export const useOrderStore = defineStore('order', () => {
  const orderInfo = useStorage<OrderInfo>('hsop_order', getDefaultOrderInfo());

  const updateOrderInfo = (payload: Partial<OrderInfo>) => {
    orderInfo.value = {
      ...orderInfo.value,
      ...payload,
    };
  };

  const clearOrderInfo = () => {
    orderInfo.value = getDefaultOrderInfo();
  };

  const {
    data: items,
    isPending: isItemsLoading,
    errorMessage: itemsLoadingErrorMessage,
    request: getItems,
  } = fetchOrderList();

  return {
    orderInfo,
    updateOrderInfo,
    clearOrderInfo,

    items,
    isItemsLoading,
    itemsLoadingErrorMessage,
    isItemsEmpty: computed(() => !items.value.length),
    getItems,
  };
});
