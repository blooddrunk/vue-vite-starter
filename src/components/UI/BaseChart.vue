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
import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

import type { CommonChartProps } from '@/utils/chart';
import { useEcharts } from '@/hooks/useEcharts';

const props = withDefaults(defineProps<CommonChartProps>(), {
  autoResize: true,
  loading: false,
  theme: 'primary',
});

const { chartRef, mergedOption } = useEcharts(props, props.type);
</script>
