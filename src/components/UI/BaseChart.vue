<template>
  <ECharts
    ref="chartRef"
    :autoresize="autoResize"
    :theme="theme"
    :option="mergedOption"
    v-bind="$attrs"
  ></ECharts>
</template>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import type { CommonChartProps } from '@/utils/chart';

const props = withDefaults(defineProps<CommonChartProps>(), {
  autoResize: true,
  loading: false,
  theme: 'primary',
});

const { chartRef, mergedOption } = useEcharts(props, props.type);
</script>
