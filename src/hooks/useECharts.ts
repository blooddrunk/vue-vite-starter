import { Ref, ComponentPublicInstance } from 'vue';
import ECharts from 'vue-echarts';
import { useThrottleFn } from '@vueuse/core';

export type ChartRef = Ref<ComponentPublicInstance<typeof ECharts>>;

const useAspectRatio = (aspectRatio: number) => {};

export const useECharts = (
  chartRef: Ref<ComponentPublicInstance<typeof ECharts>>
) => {};
