<template>
  <article ref="wrapper" class="tw-article">
    <van-sticky offset-top="46px" @change="handleStick">
      <div
        class="tw-flex tw-items-center tw-justify-between tw-pr-2"
        :class="
          isSticky &&
          'tw-bg-white/75 tw--mx-6 tw-pl-6 tw-pr-8 tw-py-3 tw-shadow-md'
        "
      >
        <AreaPicker
          :model-value="auth.area"
          @update:model-value="handleAreaChange"
        ></AreaPicker>

        <GoToCartButton></GoToCartButton>
      </div>
    </van-sticky>

    <ProductList class="tw-mt-4"></ProductList>
  </article>
</template>

<route lang="yaml">
meta:
  layout: tabbar-navbar
  title: 商品分类
</route>

<script lang="ts" setup>
import { ref } from 'vue';

import { useMobileAuthStore } from '@/stores/mobile-auth';

const auth = useMobileAuthStore();

const handleAreaChange = (area: string) => {
  auth.updateUser({
    area,
  });
};

const isSticky = ref(false);
const handleStick = (sticky: boolean) => {
  isSticky.value = sticky;
};
</script>
