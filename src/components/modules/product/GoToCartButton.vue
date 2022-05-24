<template>
  <van-badge class="leading-none" :content="cart.quantity" max="99">
    <router-link to="/mobile/cart">
      <IconShopping size="18"></IconShopping>
    </router-link>
  </van-badge>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cart';

const cart = useCartStore();
</script>
