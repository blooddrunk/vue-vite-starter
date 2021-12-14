<template>
  <div class="tw-max-w-lg tw-p-3 tw-shadow-md">
    <h1 class="tw-py-2 tw-text-semibold tw-text-xl tw">Enter Product</h1>

    <el-form status-icon @submit="onSubmit" @reset="onReset">
      <BaseInput name="name" label="Product Name" required>
        <template #label>
          <span class="tw-text-teal-600">Product Name</span>
        </template>
      </BaseInput>

      <BaseInput name="price" label="Price" required>
        <template #label>
          <span class="tw-text-blue-600">Price</span>
        </template>

        <template #prepend> $ </template>
      </BaseInput>

      <BaseNumberInput
        class="tw-w-full"
        name="inventory"
        label="Inventory"
        required
        controls-position="right"
        :min="0"
        :max="9999"
        :precision="0"
        >1`
      </BaseNumberInput>

      <BaseCheckbox name="terms" label="Terms" :show-label="false" required>
        Agree to terms and conditions
      </BaseCheckbox>

      <BaseCheckboxGroup
        name="tags"
        label="Tags"
        :items="tagList"
      ></BaseCheckboxGroup>

      <BaseSelect
        name="location"
        label="Location"
        :items="locationList"
        clearable
        placeholder="Location"
      >
      </BaseSelect>

      <div class="tw-flex tw-justify-end tw-py-3">
        <el-button native-type="reset">RESET</el-button>
        <el-button
          type="primary"
          native-type="submit"
          :loading="isSubmitting"
          :disabled="invalid || isSubmitting"
        >
          SUBMIT
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useForm } from 'vee-validate';

export type Product = {
  id?: string | number;
  name?: string | null;
  price?: number | null;
  inventory?: number | null;
  terms?: boolean;
  location?: string[];
};

export default defineComponent({
  name: 'ProductForm',

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
      terms: 'required',
      tags: 'required',
      location: 'required',
    };

    const { meta, isSubmitting, handleSubmit, resetForm } = useForm({
      validationSchema,
      initialValues: {
        name: '233',
        price: 1,
        inventory: 1,
        terms: false,
        tags: ['book'],
        location: '',
      },
    });

    const invalid = computed(() => !meta.value.valid && meta.value.dirty);

    const onSubmit = handleSubmit(async (values) => {
      await props.addProduct(values);
    });

    const onReset = (e: Event) => {
      e.preventDefault();

      resetForm();
    };

    return {
      tagList: ref([
        {
          label: 'Phone',
          value: 'phone',
        },
        {
          label: 'Book',
          value: 'book',
        },
      ]),
      locationList: ref([
        {
          label: 'UP',
          value: 'up',
        },
        {
          label: 'DOWN',
          value: 'down',
        },
      ]),
      invalid,
      isSubmitting,
      onSubmit,
      onReset,
    };
  },
});
</script>
