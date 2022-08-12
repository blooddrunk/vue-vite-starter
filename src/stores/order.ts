import { defineStore, acceptHMRUpdate } from 'pinia';

import { OrderInfo } from '@typings';

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
    isLoading: isItemsLoading,
    execute: getItems,
  } = fetchOrderList();

  return {
    orderInfo,
    updateOrderInfo,
    clearOrderInfo,

    items,
    isItemsLoading,
    isItemsEmpty: computed(() => !items.value.length),
    getItems,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
