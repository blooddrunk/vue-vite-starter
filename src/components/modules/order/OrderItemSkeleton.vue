<template>
  <div
    class="tw-p-2 tw-mt-3 tw-bg-white tw-rounded-md tw-shadow tw-shadow-light"
  >
    <van-skeleton :row="1" />
    <div class="tw-mt-2 tw-grid tw-grid-cols-7 tw-items-center">
      <div class="tw-col-span-2">
        <div
          class="tw-bg-light tw-rounded tw-w-full tw-aspect-w-1 tw-aspect-h-1"
        ></div>
      </div>

      <van-skeleton class="tw-col-span-5" title :row="3" />
    </div>
    <van-skeleton class="tw-mt-2" :row="1" />
  </div>
</template>
