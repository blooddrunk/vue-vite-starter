<template>
  <div class="flex">
    <div class="w-64 mx-auto">
      <h3 class="p-3">aspect ratio = 1</h3>

      <BaseImage
        v-for="imageUrl in imageList"
        :key="imageUrl"
        class="mb-3"
        :aspect-ratio="1"
        :src="imageUrl"
      ></BaseImage>
    </div>
    <div class="w-64 mx-auto">
      <h3 class="p-3">original</h3>

      <BaseImage
        v-for="imageUrl in imageList"
        :key="imageUrl"
        class="mb-3"
        :src="imageUrl"
      ></BaseImage>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
</route>

<script lang="ts" setup>
const imageList = [...Array(10).keys()].map(
  (index) =>
    `https://ik.imagekit.io/demo/img/image${index + 1}.jpeg?tr=w-400,h-300`
);
</script>
