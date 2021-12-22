import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

import {
  fetchCartList,
  addCartItem,
  patchCartItem,
  removeCartItem,
} from '@/services';
import { precisionFixed } from '@/utils/math';
import { OrderInfo } from '@typings';

export const useCartStore = defineStore('cart', () => {
  const stagedOrderInfo = ref<Partial<OrderInfo>>({
    remarks: '',
    isServiceAgreementChecked: false,
  });

  const {
    data: items,
    isPending: isItemsLoading,
    errorMessage: itemsLoadingErrorMessage,
    request: getItems,
  } = fetchCartList();

  const {
    data: addedItem,
    isPending: isItemAdding,
    isSuccessful: isItemAddedSuccessful,
    errorMessage: itemAddingErrorMessage,
    request: addItem,
  } = addCartItem();
  watch(isItemAddedSuccessful, (value) => {
    if (value) {
      items.value = [...items.value, addedItem.value];
    }
  });

  const {
    data: patchedItem,
    isPending: isItemPatching,
    errorMessage: itemPatchingErrorMessage,
    request: patchItem,
  } = patchCartItem();

  const {
    data: removedItem,
    isPending: isItemRemoving,
    errorMessage: itemRemovingErrorMessage,
    request: removeItem,
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
    itemAddingErrorMessage,
    addItem,

    patchedItem,
    isItemPatching,
    itemPatchingErrorMessage,
    patchItem,

    removedItem,
    isItemRemoving,
    itemRemovingErrorMessage,
    removeItem,

    quantity,
    totalPrice,
    checkedItems,
    hasCheckedItems,
    checkedQuantity,
    checkedTotalPrice,
  };
});
