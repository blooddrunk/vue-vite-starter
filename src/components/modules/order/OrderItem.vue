<template>
  <router-link
    class="tw-block tw-p-2 tw-mt-3 tw-bg-white tw-rounded-md tw-shadow tw-shadow-light"
    :to="routeLocation"
  >
    <header
      class="tw-pb-1.5 tw-mb-2.5 tw-flex tw-items-center tw-justify-between tw-border-b-thin tw-border-primary tw-text-sm tw-font-bold"
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

    <footer class="tw-flex tw-mt-3 tw-text-xs tw-text-semibold">
      <span>
        {{ format(item.orderTime, 'yyyy-MM-dd HH:mm:ss') }}
      </span>

      <span class="tw-ml-auto">
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
      已预约: 'tw-text-blue-400',
      已下单: 'tw-text-teal-400',
      已办理: 'tw-text-green-500',
      已撤单: 'tw-text-slate-300',
    }[props.item.orderStatus])
);

const routeLocation: RouteLocationRaw = {
  name: 'mobile-orders-id',
  params: {
    id: props.item.orderNumber,
  },
};
</script>
