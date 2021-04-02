<template>
  <section>
    <ProductForm :add-product="addProduct"></ProductForm>

    <el-table v-loading="isProductLoading" class="tw-mt-3" :data="products">
      <el-table-column prop="name" label="Product Name"></el-table-column>
      <el-table-column prop="price" label="Product Price"></el-table-column>
      <el-table-column prop="inventory" label="Inventory"></el-table-column>
      <el-table-column label="Action">
        <template #default="props">
          <BaseLoadingButton
            :button-props="{ type: 'danger' }"
            :action="getDeleteAction(props)"
          >
            DELETE
          </BaseLoadingButton>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';

import ProductForm, { Product } from '@/components/ProductForm.vue';
import { useAxios } from '@/hooks/useAxios';
import axios from '@/utils/axios';
import { setItemValueByArrayIndex } from '@/utils/misc';

const useProduct = () => {
  const { data: products, isPending: isProductLoading } = useAxios<Product[]>(
    {
      url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
      __needValidation: false,
    },
    [],
    { immediate: true }
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

    const getDeleteAction = (props: any) => removeProduct(props.row);

    return {
      products,
      isProductLoading,
      addProduct,
      getDeleteAction,
    };
  },
});
</script>
