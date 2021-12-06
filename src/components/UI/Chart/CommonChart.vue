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
import { toRefs } from 'vue';

import { getSharedProps } from '@/utils/chart';
import { useEcharts } from '@/hooks/useEcharts';

const props = getSharedProps();
const { autoResize, theme } = toRefs(props);

const { chartRef, mergedOption } = useEcharts(props, props.type);
</script>
