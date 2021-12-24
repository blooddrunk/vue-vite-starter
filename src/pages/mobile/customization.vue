<template>
  <article class="tw-h-full tw-relative tw-bg-white tw-pb-[56px]">
    <ProductDetailBanner :items="data.bannerImageList"> </ProductDetailBanner>

    <van-image
      v-if="data.detailImage"
      class="tw-w-full tw-min-h-56"
      fit="cover"
      :src="data.detailImage"
    >
    </van-image>

    <PageFooter class="tw-bottom-[50px] tw-justify-center">
      <router-link v-slot="{ navigate }" custom to="/mobile/appointment">
        <van-button class="tw-w-11/12" type="primary" round @click="navigate">
          立即预约
        </van-button>
      </router-link>
    </PageFooter>
  </article>
</template>

<script lang="ts" setup>
import { fetchCustomizationInfo } from '@/services';

const { data, request } = fetchCustomizationInfo();

request();
</script>

<route lang="yaml">
meta:
  layout: tabbar-navbar
  title: 全屋智能
</route>
