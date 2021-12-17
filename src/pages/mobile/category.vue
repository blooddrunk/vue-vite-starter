<template>
  <article>
    <div class="tw-flex tw-items-center tw-justify-between">
      <AreaPicker></AreaPicker>

      <van-badge content="10">
        <IconShopping></IconShopping>
      </van-badge>
    </div>
  </article>
</template>

<route lang="yaml">
meta:
  layout: tabbar
  requiresAuth: false
</route>
