<template>
  <div class="aspect-w-4 aspect-h-1">
    <BaseMap :data="dataSource" :option="option" map="china"></BaseMap>
  </div>
</template>

<script lang="ts" setup>
const dataSource = [] as any[];
const option = {} as any;
</script>
