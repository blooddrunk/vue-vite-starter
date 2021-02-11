<template>
  <div class="tw-max-w-lg tw-p-3 tw-shadow-md">
    <h1 class="tw-py-2 tw-text-semibold tw-text-xl tw">Enter Product</h1>

    <el-form status-icon>
      <ElementFormInput name="name" label="Product Name" required>
        <template #label>
          <span class="tw-text-teal-600">Product Name</span>
        </template>
      </ElementFormInput>

      <ElementFormInput name="price" label="Price" required>
        <template #label>
          <span class="tw-text-blue-600">Price</span>
        </template>

        <template #prepend> $ </template>
      </ElementFormInput>

      <ElementFormInputNumber
        class="tw-w-full"
        name="inventory"
        label="Inventory"
        required
        controls-position="right"
        :min="0"
        :max="9999"
        :precision="0"
      >
      </ElementFormInputNumber>

      <div class="tw-flex tw-justify-end tw-py-3">
        <el-button>RESET</el-button>
        <el-button type="primary">SUBMIT</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useForm, FormActions } from 'vee-validate';

import axios from '@/utils/axios';
import ElementFormInput from '@/components/UI/Form/ElementFormInput';
import ElementFormInputNumber from '@/components/UI/Form/ElementFormInputNumber';

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
    ElementFormInput,
    ElementFormInputNumber,
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
      name: 'required|min:5|max:10',
      price: 'required|numeric|min_value:1|max_value:9999999',
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
