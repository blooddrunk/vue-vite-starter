<template>
  <article>
    <div class="tw-flex tw-items-center tw-justify-between">
      <AreaPicker></AreaPicker>

      <van-badge content="10">
        <IconShopping></IconShopping>
      </van-badge>
    </div>

    <ProductList
      class="tw-mt-4 tw-bg-white tw-rounded-md tw-shadow-lg tw-shadow-medium"
    ></ProductList>
  </article>
</template>

<route lang="yaml">
meta:
  layout: tabbar-navbar
  requiresAuth: false
  title: 商品分类
</route>
