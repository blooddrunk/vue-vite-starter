<template>
  <div class="w-full">
    <HistChart></HistChart>

    <LineChart></LineChart>

    <MixedChart></MixedChart>

    <PieChart></PieChart>

    <ChinaMap map="china"></ChinaMap>
  </div>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
</route>
