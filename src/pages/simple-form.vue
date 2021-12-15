<template>
  <section>
    <ProductForm :add-product="addProduct"></ProductForm>

    <el-table
      v-loading="isProductLoading"
      class="tw-mt-3"
      :data="products"
      row-key="id"
    >
      <el-table-column prop="id" label="ID" width="100"></el-table-column>
      <el-table-column prop="name" label="Product Name"></el-table-column>
      <el-table-column
        prop="price"
        label="Product Price"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="inventory"
        label="Inventory"
        width="100"
      ></el-table-column>
      <el-table-column label="Action" width="200">
        <template #default="props">
          <BaseLoadingButton
            type="danger"
            :action="getDeleteAction(props.row)"
            confirm-text="Are you sure?"
          >
            DELETE
            <template #loading> DELETING... </template>
          </BaseLoadingButton>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
</route>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';

import { Product } from '@/components/ProductForm.vue';
import { useAxios } from '@/hooks/useAxios';
import axios from '@/utils/axios';

const useProduct = () => {
  const {
    data: products,
    isPending: isProductLoading,
    request: fetchProducts,
  } = useAxios<Product[]>(
    {
      url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
      __needValidation: false,
    },
    [],
    { immediate: true }
  );

  const addProduct = async (product: Product) => {
    try {
      const { data } = await axios.request<Product>({
        url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
        method: 'post',
        data: product,
        __needValidation: false,
      });

      products.value.unshift(data);
    } catch (error) {
      console.error(error);
      ElMessage.error((error as Error).message);
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
      console.error(error);
      ElMessage.error((error as Error).message);
    }
  };

  return {
    products,
    isProductLoading,
    addProduct,
    removeProduct,
    fetchProducts,
  };
};

export default defineComponent({
  name: 'SimpleFormView',

  setup() {
    const { products, isProductLoading, addProduct, removeProduct } =
      useProduct();

    const getDeleteAction = (row: any) => {
      return async () => {
        await removeProduct(row);
        ElMessage.success('Deleted successfully');
      };
    };

    return {
      products,
      isProductLoading,
      addProduct,
      getDeleteAction,
    };
  },
});
</script>
