<template>
  <div class="tw-aspect-w-4 tw-aspect-h-1">
    <BaseChart
      :dimensions="dimensions"
      :source="dataSource"
      :option="option"
    ></BaseChart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { getSeriesEncodeByDimensions } from '@/utils/chart';

export default defineComponent({
  name: 'MixedChart',

  setup() {
    const random = () => {
      return Math.round(300 + Math.random() * 700) / 10;
    };

    const { dimensions, series } = getSeriesEncodeByDimensions([
      'product',
      {
        name: '2015',
        displayName: '2015年',
        displayDimension: '2015Tooltip',
        seriesConfig: { type: 'bar' },
      },
      {
        name: '2016',
        displayName: '二零一六',
        isPercentage: true,
        seriesConfig: { type: 'bar' },
      },
      { name: '2017', seriesConfig: { type: 'line', yAxisIndex: 1 } },
    ]);

    const dataSource = ref(
      ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'].map(
        (product) => ({
          product,
          '2015': random(),
          '2015Tooltip': `${random()}!`,
          '2016': random(),
          '2016_Percentage': `${random()}%`,
          '2017': random(),
        })
      )
    );

    return {
      dimensions,
      dataSource,
      option: {
        series,
        legend: {},
        yAxis: [{}, {}],
      },
    };
  },
});
</script>
