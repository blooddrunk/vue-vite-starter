<template>
  <div>
    <ProductForm :add-product="addProduct"></ProductForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';

import ProductForm, { Product } from '@/components/ProductForm.vue';
import { useAxios } from '@/hooks/useAxios';
import axios from '@/utils/axios';

const useProduct = () => {
  const { data: products, isPending: isProductLoading } = useAxios<Product[]>(
    {
      url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
      __needValidation: false,
    },
    []
  );

  const addProduct = async (product: Product) => {
    try {
      await axios.request<Product>({
        url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
        method: 'post',
        data: product,
        __needValidation: false,
      });

      products.value.unshift(product);
    } catch (error) {
      console.error(error);
      ElMessage.error(error.message);
    }
  };

  const removeProduct = async (target: Product) => {
    if (!target.id) {
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_JSON_SERVER_PATH}products/${target.id}`,
        {
          __needValidation: false,
        }
      );

      products.value = products.value.filter(
        (product) => product.id !== target.id
      );
    } catch (error) {
      ElMessage.error(error.message);
      console.error(error);
    }
  };

  return {
    products,
    isProductLoading,
    addProduct,
    removeProduct,
  };
};

export default defineComponent({
  name: 'SimpleFormView',

  components: {
    ProductForm,
  },

  setup() {
    const {
      products,
      isProductLoading,
      addProduct,
      removeProduct,
    } = useProduct();

    return {
      products,
      isProductLoading,
      addProduct,
      removeProduct,
    };
  },
});
</script>
