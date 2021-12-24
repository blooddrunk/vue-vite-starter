<template>
  <div class="tw-article">
    <van-address-edit
      :area-list="areaList"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      save-button-text="确认提交"
      detail-maxlength="50"
      detail-rows="2"
      :validator="handleValidate"
      :is-saving="isPending"
      @save="handleSubmit"
    >
    </van-address-edit>
  </div>
</template>

<route lang="yaml">
meta:
  layout: navbar
  title: 服务地址填写
  canNavBack: true
</route>

<script lang="ts" setup>
import { areaList } from '@vant/area-data';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

import type { AddressEditInfo } from 'vant';
import { placeOrder } from '@/services';
import { useOrderStore } from '@/stores/order';

const router = useRouter();
const order = useOrderStore();

const handleValidate = (name: string, value: string) => {
  if (name === 'name' && value && value.length > 10) {
    return '姓名不能超过10个字符';
  }
  return '';
};

const { isPending, request } = placeOrder(
  () => {
    Toast.success({
      message: '下单成功!',
      onClose: () => {
        router.push('/mobile/user');
      },
    });
  },
  (e) => {
    Toast((e as Error).message);
  }
);
const handleSubmit = (content: AddressEditInfo) => {
  order.updateOrderInfo({
    contactPerson: content.name,
    servicePhone: content.tel,
    address: `${content.province} ${content.country} ${content.county} ${content.addressDetail}`,
  });
  request(order.orderInfo);
};
</script>
