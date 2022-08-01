<template>
  <div class="relative">
    <div class="aspect-w-3 aspect-h-1">
      <BaseChart :data="data" :option="chartOption" type="pie"></BaseChart>
    </div>

    <div class="text-lg 3xl:2xl text-primary font-semibold">
      <div
        class="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        昨日
      </div>
      <div class="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2">
        今日
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption, PieSeriesOption } from 'echarts';

const chartStore = useChartStore();

const data = computed(() => {
  return chartStore.data?.c2 ?? [];
});

const defaultSeries: PieSeriesOption = {
  type: 'pie',
  radius: ['25%', '45%'],
  label: {
    color: 'inherit',
    formatter: '{d}%',
  },
  labelLine: {
    show: false,
    length: 4,
    length2: 0,
  },
};

const chartOption: EChartsOption = {
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  legend: {
    show: true,
    left: 15,
    top: 'center',
    orient: 'vertical',
    // itemWidth: 16,
    // itemHeight: 8,
  },
  tooltip: {
    show: false,
  },
  series: [
    {
      ...defaultSeries,
      center: ['40%', '50%'],
      encode: {
        itemName: 'label1',
        value: 'value1',
      },
    },
    {
      ...defaultSeries,
      center: ['75%', '50%'],
      encode: {
        itemName: 'label1',
        value: 'value2',
      },
    },
  ],
};
</script>
