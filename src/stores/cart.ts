import { defineStore, acceptHMRUpdate } from 'pinia';

import { precisionFixed } from '@/utils/math';
import { OrderInfo } from '@typings';

export const useCartStore = defineStore('cart', () => {
  const stagedOrderInfo = ref<Partial<OrderInfo>>({
    remarks: '',
    isServiceAgreementChecked: false,
  });

  const {
    data: items,
    isLoading: isItemsLoading,
    errorMessage: itemsLoadingErrorMessage,
    execute: getItems,
  } = fetchCartList();

  const {
    data: addedItem,
    isLoading: isItemAdding,
    execute: addItem,
  } = addCartItem();
  watch(items, (value) => {
    if (value) {
      items.value = [...items.value, addedItem.value];
    }
  });

  const {
    data: patchedItem,
    isLoading: isItemPatching,
    execute: patchItem,
  } = patchCartItem();

  const {
    data: removedItem,
    isLoading: isItemRemoving,
    execute: removeItem,
  } = removeCartItem();

  const quantity = computed(() =>
    items.value.reduce((acc, item) => item.quantity + acc, 0)
  );

  const totalPrice = computed(() =>
    precisionFixed(
      items.value.reduce((acc, item) => item.quantity * item.price + acc, 0)
    )
  );

  const checkedItems = computed(() =>
    items.value.filter((item) => item.checked)
  );
  const hasCheckedItems = computed(() => !!checkedItems.value.length);
  const checkedQuantity = computed(() =>
    checkedItems.value.reduce((acc, item) => item.quantity + acc, 0)
  );
  const checkedTotalPrice = computed(() =>
    precisionFixed(
      checkedItems.value.reduce(
        (acc, item) => item.quantity * item.price + acc,
        0
      )
    )
  );

  return {
    stagedOrderInfo,

    items,
    isItemsLoading,
    itemsLoadingErrorMessage,
    isItemsEmpty: computed(() => !items.value.length),
    getItems,

    addedItem,
    isItemAdding,
    addItem,

    patchedItem,
    isItemPatching,
    patchItem,

    removedItem,
    isItemRemoving,
    removeItem,

    quantity,
    totalPrice,
    checkedItems,
    hasCheckedItems,
    checkedQuantity,
    checkedTotalPrice,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
