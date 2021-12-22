<template>
  <CartItem readonly :item="item">
    <template #header>
      <header
        class="tw-pb-1.5 tw-mb-2.5 tw-flex tw-items-center tw-justify-between tw-border-b-thin tw-border-primary tw-text-sm tw-font-bold"
      >
        <span>
          订单编号：
          {{ item.orderNumber }}
        </span>

        <span :class="statusClass">{{ item.orderStatus }}</span>
      </header>
    </template>
    <template #footer>
      <footer class="tw-mt-3 tw-text-xs tw-text-semibold">
        <span>
          下单时间：
          {{ format(item.orderTime, 'yyyy-MM-dd HH:mm:ss') }}
        </span>
      </footer>
    </template>
  </CartItem>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { format } from 'date-fns';

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
</script>
