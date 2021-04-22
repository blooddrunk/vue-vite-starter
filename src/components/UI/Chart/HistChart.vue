<template>
  <ECharts :autoresize="autoResize" :option="option" :theme="theme"> </ECharts>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { EChartsCoreOption } from 'echarts/core';
import { BarSeriesOption } from 'echarts/charts';
import { merge } from 'lodash-es';

import { useSharedProps } from '@/hooks/useECharts';

export default defineComponent({
  props: {
    ...useSharedProps(),

    series: {
      type: [Object, Array, Function] as PropType<
        | BarSeriesOption
        | BarSeriesOption[]
        | { (config: BarSeriesOption): BarSeriesOption | BarSeriesOption[] }
      >,
    },
  },

  setup(props) {
    const seriesCount = computed(() => props.dimensions!.length - 1);

    const series = computed(() => {
      if (Array.isArray(props.series)) {
        return props.series;
      }

      const baseConfig: BarSeriesOption = {
        type: 'bar',
      };

      if (typeof props.series === 'function') {
        return props.series(baseConfig);
      } else if (props.option?.series) {
        return props.option.series;
      } else {
        return Array(seriesCount.value).fill(baseConfig);
      }
    });

    const defaultOption = computed<EChartsCoreOption>(() => ({
      dataset: {
        sourceHeader: false,
        dimensions: props.dimensions,
        source: props.source,
      },
      xAxis: { type: 'category' },
      yAxis: {},
      series: series.value,
      tooltip: {
        trigger: 'axis',
        confine: true,
        // formatter: (params: any) => {
        //   console.log(params);
        //   return null;
        // },
      },
    }));

    const mergedOption = computed<EChartsCoreOption>(() =>
      merge({}, defaultOption.value, props.option)
    );

    return { option: mergedOption };
  },
});
</script>
