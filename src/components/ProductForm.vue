<template>
  <div class="tw-max-w-lg tw-p-3 tw-shadow-md">
    <h1 class="tw-py-2 tw-text-semibold tw-text-xl tw">Enter Product</h1>

    <el-form status-icon @submit="onSubmit">
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
        <el-button
          type="primary"
          native-type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting"
        >
          SUBMIT
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useForm, FormActions } from 'vee-validate';

import ElementFormInput from '@/components/UI/Form/ElementFormInput';
import ElementFormInputNumber from '@/components/UI/Form/ElementFormInputNumber';

export type Product = {
  id?: string | number;
  name?: string | null;
  price?: number | null;
  inventory?: number | null;
};

const initialValues = {
  name: '',
  price: 1,
  inventory: 1,
};

export default defineComponent({
  name: 'ProductForm',

  components: {
    ElementFormInput,
    ElementFormInputNumber,
  },

  props: {
    addProduct: {
      type: Function,
      required: true,
    },
  },

  emits: {
    submit: null,
  },

  setup(props) {
    const validationSchema = {
      name: 'required|min:5|max:10',
      price: 'required|numeric|min_value:1|max_value:9999999',
      inventory: 'required',
    };

    const { meta, isSubmitting, handleSubmit } = useForm({
      validationSchema,
      initialValues,
    });

    const invalid = computed(() => !meta.value.valid);

    const onSubmit = handleSubmit(async (values) => {
      await props.addProduct(values);
    });

    return {
      validationSchema,
      invalid,
      isSubmitting,
      onSubmit,
    };
  },
});
</script>
