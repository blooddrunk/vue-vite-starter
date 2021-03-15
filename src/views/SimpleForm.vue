<template>
  <section>
    <ProductForm :add-product="addProduct"></ProductForm>

    <el-table v-loading="isProductLoading" class="tw-mt-3" :data="products">
      <el-table-column prop="name" label="Product Name"></el-table-column>
      <el-table-column prop="price" label="Product Price"></el-table-column>
      <el-table-column prop="inventory" label="Inventory"></el-table-column>
      <el-table-column label="Action">
        <template #default="props">
          <TableActionButton
            :button-props="{ type: 'danger' }"
            :row-props="props"
            @click="handleDelete(props)"
          >
            DELETE
          </TableActionButton>
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

    const handleDelete = async (props: any) => {
      setItemValueByArrayIndex({
        items: products,
        index: props.$index,
        key: 'loading' as any,
        value: true,
      });

      await removeProduct(props.row);

      setItemValueByArrayIndex({
        items: products,
        index: props.$index,
        key: 'loading' as any,
        value: false,
      });
    };

    return {
      products,
      isProductLoading,
      addProduct,
      handleDelete,
    };
  },
});
</script>
