import {
  defineComponent,
  h,
  resolveComponent,
  ref,
  computed,
  PropType,
  ComponentOptions,
} from 'vue';
import { EChartsCoreOption } from 'echarts/core';
import { merge } from 'lodash-es';

import { useSharedProps } from '@/hooks/useECharts';

export default defineComponent({
  name: 'CatesianChart',

  props: {
    ...useSharedProps(),

    type: {
      type: String as PropType<'bar' | 'line' | 'scatter'>,
    },
  },

  setup(props, { attrs, slots }) {
    const seriesCount = computed(() => props.dimensions!.length - 1);

    const presetSeries = computed(() =>
      Array(seriesCount.value).fill({
        type: props.type,
      })
    );

    const defaultOption = computed<EChartsCoreOption>(() => ({
      dataset: {
        sourceHeader: false,
        dimensions: props.dimensions,
        source: props.source,
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: props.option?.series ?? presetSeries.value,
      tooltip: {
        trigger: 'axis',
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
