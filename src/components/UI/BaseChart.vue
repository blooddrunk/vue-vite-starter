<template>
  <ECharts
    ref="chartRef"
    :autoresize="autoResize"
    :theme="theme"
    :option="mergedOption"
    v-bind="$attrs"
  ></ECharts>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, toRefs } from 'vue';

import { CommonChartProps as Props } from '@/utils/chart';
import { useEcharts } from '@/hooks/useEcharts';

const props = withDefaults(defineProps<Props>(), {
  autoResize: true,
  loading: false,
  theme: 'primary',
});
const { autoResize, theme } = toRefs(props);

const { chartRef, mergedOption } = useEcharts(props, props.type);
</script>
