<template>
  <div class="tw-w-full">
    <HistChart></HistChart>

    <LineChart></LineChart>

    <MixedChart></MixedChart>

    <DemoPieChart></DemoPieChart>
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
</route>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ECharts',

  setup() {},
});
</script>
