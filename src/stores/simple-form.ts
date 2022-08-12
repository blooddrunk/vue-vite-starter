import { acceptHMRUpdate, defineStore } from 'pinia';

import type { Product } from '@typings';

export const useSimpleFormStore = defineStore('simple-form', () => {
  const {
    data: products,
    isLoading: isProductLoading,
    execute: fetchProducts,
  } = useSimpleFormList();

  const { addProduct } = useAddProduct();
  const { removeProduct } = useRemoveProduct();

  return {
    products,
    isProductLoading,
    fetchProducts,
    addProduct: async (product: Product) => {
      await addProduct(product);
      products.value.unshift(product);
    },
    removeProduct: async (product: Product) => {
      await removeProduct(product);
      products.value = products.value.filter((p) => p.id !== product.id);
    },
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSimpleFormStore, import.meta.hot));
}
