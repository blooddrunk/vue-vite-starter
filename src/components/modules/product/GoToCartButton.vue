<template>
  <van-badge class="tw-leading-none" :content="cart.quantity">
    <router-link to="/mobile/cart">
      <IconShopping size="18"></IconShopping>
    </router-link>
  </van-badge>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
</script>
