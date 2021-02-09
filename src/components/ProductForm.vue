<template>
  <div class="tw-p-3 tw-shadow-md">
    <h1 class="tw-py-2 tw-text-semibold tw-text-xl">Enter Product</h1>

    <el-form> </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useForm, FormActions } from 'vee-validate';

import axios from '@/utils/axios';
import ElementInput from '@/components/UI/Form/ElementInput.ts';

export type Product = {
  id?: string | number;
  name?: string | null;
  price?: number | null;
  inventory?: number | null;
};

const useSubmit = (product: Product) =>
  axios.request<Product>({
    url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
    method: 'post',
    data: product,
    __needValidation: false,
  });

export default defineComponent({
  name: 'ProductForm',

  components: {
    ElementInput,
  },

  props: {
    onSubmit: {
      type: Function,
    },
  },

  emits: {
    submit: null,
  },

  setup(props, { emit }) {
    const validationSchema = {
      name: 'required',
      price: 'required',
      inventory: 'required',
    };

    const onSubmit = async (values: Product, actions: FormActions<Product>) => {
      const { data } = await useSubmit(values);
      emit('submit', data);
      actions.resetForm();
    };

    useForm({
      validationSchema,
    });

    // const message = ref('');
    // watch(isCompleted, (value) => {
    //   if (!value) {
    //     return;
    //   }

    //   if (error.value) {
    //     message.value = 'Failed to create product';
    //   } else {
    //     message.value = 'Product created';
    //     onReset();
    //     emit('submit', data.value);
    //   }

    //   useTimeout(() => {
    //     message.value = '';
    //   }, 3000);
    // });

    return {
      validationSchema,
      onSubmit,
    };
  },
});
</script>
