<template>
  <div class="tw-aspect-w-3 tw-aspect-h-1">
    <BaseChart
      :dimensions="dimensions"
      :data="dataSource"
      :option="option"
      type="pie"
    ></BaseChart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PieChart',

  setup() {
    const random = () => {
      return Math.round(300 + Math.random() * 700) / 10;
    };

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
      dimensions: [
        'product',
        {
          name: '2015',
          displayName: '2015年',
        },
        { name: '2016', displayName: '二零一六' },
        '2017',
      ],
      dataSource,
      option: {
        legend: {},
        series: {
          radius: ['20%', '40%'],
          encode: {
            itemName: 'product',
            value: '2015',
          },
        },
      },
    };
  },
});
</script>
