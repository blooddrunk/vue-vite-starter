import { PropType } from 'vue';
import { EChartsCoreOption } from 'echarts/core';

export const useSharedProps = () => ({
  autoResize: {
    type: Boolean,
    default: true,
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
});
