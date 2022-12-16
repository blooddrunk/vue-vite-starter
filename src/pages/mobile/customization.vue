<template>
  <article class="h-full relative bg-white pb-[56px]">
    <ProductDetailBanner :items="data.bannerImageList"> </ProductDetailBanner>

    <van-image
      v-if="data.detailImage"
      class="w-full min-h-56"
      fit="cover"
      :src="data.detailImage"
    >
    </van-image>

    <PageFooter class="!bottom-[50px] justify-center">
      <router-link v-slot="{ navigate }" custom to="/mobile/appointment">
        <van-button class="w-11/12" type="primary" round @click="navigate">
          立即预约
        </van-button>
      </router-link>
    </PageFooter>
  </article>
</template>

<script lang="ts" setup>
definePage({
  meta: {
    layout: 'tabbar-navbar',
    title: '全屋智能',
  },
});

const { data, execute } = useCustomizationDetail();

execute();
</script>
