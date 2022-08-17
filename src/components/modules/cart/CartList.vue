<template>
  <CartItem
    v-for="item in items"
    :key="item.id"
    v-model:checked="item.checked"
    v-model:quantity="item.quantity"
    :readonly="readonly"
    :item="item"
  >
  </CartItem>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';
import type { CartItem } from '@typings';

withDefaults(
  defineProps<{
    items: CartItem[];
    readonly?: boolean;
  }>(),
  {
    readonly: false,
  }
);

const placeholderItems = [...Array(5).keys()].map((id) => ({
  id: String(id),
}));
</script>
