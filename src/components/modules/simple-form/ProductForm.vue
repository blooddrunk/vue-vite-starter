<template>
  <div class="max-w-lg p-3 shadow-md">
    <h1 class="py-2 text-semibold text-xl tw">Enter Product</h1>

    <el-form status-icon @submit="onSubmit" @reset="onReset">
      <BaseInput name="name" label="Product Name" required>
        <template #label>
          <span class="text-teal-600">Product Name</span>
        </template>
      </BaseInput>

      <BaseInput name="price" label="Price" required>
        <template #label>
          <span class="text-blue-600">Price</span>
        </template>

        <template #prepend> $ </template>
      </BaseInput>

      <BaseNumberInput
        class="w-full"
        name="inventory"
        label="Inventory"
        required
        controls-position="right"
        :min="0"
        :max="9999"
        :precision="0"
      >
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

      <div class="flex justify-end py-3">
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

<script lang="ts" setup>
import { useForm } from 'vee-validate';

import { Product } from '@typings';

const props = defineProps<{
  addProduct: (p: Product) => void;
}>();

const validationSchema = {
  name: 'required|min:5|max:10',
  price: 'required|numeric|min_value:1|max_value:9999999',
  inventory: 'required',
  terms: 'required',
  tags: 'required',
  location: 'required',
};

const { meta, isSubmitting, handleSubmit, resetForm } = useForm<Product>({
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

const tagList = ref([
  {
    label: 'Phone',
    value: 'phone',
  },
  {
    label: 'Book',
    value: 'book',
  },
]);

const locationList = ref([
  {
    label: 'UP',
    value: 'up',
  },
  {
    label: 'DOWN',
    value: 'down',
  },
]);
</script>
