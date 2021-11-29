import {
  defineComponent,
  h,
  resolveComponent,
  ref,
  computed,
  ComponentOptions,
} from 'vue';
import { EChartsCoreOption } from 'echarts/core';
import { merge } from 'lodash-es';

import { useSharedProps } from '@/hooks/useECharts';

export default defineComponent({
  name: 'PieChart',

  props: {
    ...useSharedProps(),
  },

  setup(props, { attrs, slots }) {
    const defaultOption = computed<EChartsCoreOption>(() => ({
      dataset: {
        sourceHeader: false,
        dimensions: props.dimensions,
        source: props.source,
      },

      series: {
        type: 'pie',
        label: {
          alignTo: 'edge',
          edgeDistance: '10%',
        },
      },
      tooltip: {
        confine: true,
      },
    }));

    const mergedOption = computed<EChartsCoreOption>(() =>
      merge({}, defaultOption.value, props.option)
    );

    const chartRef = ref();

    return () => {
      const ECharts = resolveComponent('ECharts');

      return h(
        ECharts as ComponentOptions,
        {
          autoresize: props.autoResize,
          theme: props.theme,
          option: mergedOption.value,
          ...attrs,
          ref: chartRef,
        },
        slots
      );
    };
  },
});
