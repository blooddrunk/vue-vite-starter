<template>
  <router-link
    class="block p-2 mt-3 bg-white rounded-md shadow shadow-light"
    :to="routeLocation"
  >
    <header
      class="pb-1.5 mb-2.5 flex items-center justify-between border-b-thin border-primary text-sm font-bold"
    >
      <span>
        订单编号：
        {{ item.orderNumber }}
      </span>

      <span :class="statusClass">{{ item.orderStatus }}</span>
    </header>

    <CartItem
      v-for="cartItem in item.items"
      :key="cartItem.id"
      readonly
      :quantity="cartItem.quantity"
      :item="cartItem"
    >
    </CartItem>

    <footer class="flex mt-3 text-xs text-semibold">
      <span>
        {{ format(item.orderTime, 'yyyy-MM-dd HH:mm:ss') }}
      </span>

      <span class="ml-auto">
        共计
        <strong>
          {{ item.quantity }}
        </strong>
        件商品，
      </span>
      <span>
        合计
        <strong>{{ item.totalPrice }}</strong>
        元
      </span>
    </footer>
  </router-link>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { format } from 'date-fns';
import { RouteLocationRaw } from 'vue-router';

import type { OrderItem } from '@typings';

type Props = {
  item: OrderItem;
};

const props = defineProps<Props>();

const statusClass = computed(
  () =>
    ({
      已预约: 'text-blue-400',
      已下单: 'text-teal-400',
      已办理: 'text-green-500',
      已撤单: 'text-slate-300',
    }[props.item.orderStatus])
);

const routeLocation: RouteLocationRaw = {
  name: 'mobile-orders-id',
  params: {
    id: props.item.orderNumber,
  },
};
</script>
