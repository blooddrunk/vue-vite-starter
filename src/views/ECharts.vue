<template>
  <div class="tw-w-full tw-h-72">
    <HistChart
      :dimensions="dimensions"
      :source="dataSource"
      :series="series"
    ></HistChart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ECharts',

  setup() {
    function random() {
      return Math.round(300 + Math.random() * 700) / 10;
    }

    const dimensions = ref([
      'Product',
      { name: '2015', displayName: '2015年' },
      '2016',
      '2017',
      '2015Tooltip',
    ]);
    const dataSource = ref([
      {
        Product: 'Matcha Latte',
        '2015': random(),
        '2015Tooltip': `${random()}!`,
        '2016': random(),
        '2017': random(),
      },
      {
        Product: 'Milk Tea',
        '2015': random(),
        '2015Tooltip': `${random()}!`,
        '2016': random(),
        '2017': random(),
      },
      {
        Product: 'Cheese Cocoa',
        '2015': random(),
        '2015Tooltip': `${random()}!`,
        '2016': random(),
        '2017': random(),
      },
      {
        Product: 'Walnut Brownie',
        '2015': random(),
        '2015Tooltip': `${random()}!`,
        '2016': random(),
        '2017': random(),
      },
    ]);
    const series = ref([
      {
        type: 'bar',
        encode: {
          y: '2015',
          seriesName: '2015',
          tooltip: '2015Tooltip',
        },
      },
      {
        type: 'bar',
        encode: {
          y: '2016',
          seriesName: '2016',
          tooltip: '2016',
        },
      },
      {
        type: 'bar',
        encode: {
          y: '2017',
          seriesName: '2017',
          tooltip: '2017',
        },
      },
    ]);

    return {
      dimensions,
      dataSource,
      series,
    };
  },
});
</script>
