import { Ref, ComponentPublicInstance, PropType } from 'vue';
import ECharts from 'vue-echarts';
import { EChartsCoreOption } from 'echarts/core';
import { useThrottleFn } from '@vueuse/core';

export type ChartRef = Ref<ComponentPublicInstance<typeof ECharts>>;

export const useSharedProps = () => ({
  aspectRatio: {
    type: Number,
  },

  autoResize: {
    type: Boolean,
    default: false,
  },

  dimensions: {
    type: Array,
    required: true,
  },

  source: {
    type: Array,
    required: true,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  loadingOptions: {
    type: Object,
  },

  option: {
    type: Object as PropType<EChartsCoreOption>,
  },

  theme: {
    type: [String, Object],
    default: 'primary',
  },

  shouldPrintDebugInfo: {
    type: Boolean,
    default: false,
  },
});

const useAspectRatio = (aspectRatio: number) => {};

export const useECharts = (
  chartRef: Ref<ComponentPublicInstance<typeof ECharts>>
) => {};
