<template>
  <div class="aspect-w-3 aspect-h-1">
    <BaseChart :data="dataSource" :option="option" type="pie"></BaseChart>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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

const option = {
  legend: {},
  series: {
    radius: ['20%', '40%'],
    encode: {
      itemName: 'product',
      value: '2015',
    },
  },
};
</script>
