import { unref } from 'vue';
import { EChartsCoreOption } from 'echarts/core';
import ECharts from 'vue-echarts';

import { MaybeRef } from '@/utils/typings';

export type VueEchartsComponent = InstanceType<typeof ECharts>;

export const chartThemeList = ['primary'] as const;
export type ChartTheme = typeof chartThemeList[number];

export type CommonChartType = 'pie' | 'bar' | 'line' | 'scatter';
export type CommonChartProps = {
  autoResize?: boolean;
  dimensions: EnhancedDimensionDefinition[];
  data: any[];
  loading?: boolean;
  option: EChartsCoreOption;
  theme?: ChartTheme | Record<string, any>;
  type: CommonChartType;
};

export type EnhancedDimensionDefinition =
  | {
      name: string;
      displayName?: string;
      displayDimension?: string;
      isPercentage?: boolean;
      seriesConfig?: Record<string, any>;
    }
  | string;
export type NormalizedDimensionDefinition = {
  name: string;
  displayName?: string;
};
export type SimplifiedSeriesDefinition =
  | {
      type?: string;
      encode: Record<string, string | number | (string | number)[]>;
    }
  | Record<string, any>;

export const getSeriesEncodeByDimensions = (
  dimensions: MaybeRef<EnhancedDimensionDefinition[]>,
  type?: string,
  { hasCategoryDimension = true } = {}
) => {
  const auxiliaryDimensions: EnhancedDimensionDefinition[] = [];
  const series: SimplifiedSeriesDefinition[] = [];

  unref(dimensions).forEach((dimension, index) => {
    if (hasCategoryDimension && index === 0) {
      auxiliaryDimensions.push(dimension);
      return;
    }

    const definitionItem =
      typeof dimension === 'string'
        ? {
            name: dimension,
          }
        : dimension;
    const { name, displayName, displayDimension, isPercentage, seriesConfig } =
      definitionItem;

    auxiliaryDimensions.push({
      name,
      displayName,
    });

    let maybePercentageDimension = displayDimension;
    if (isPercentage && !displayDimension) {
      maybePercentageDimension = `${name}_Percentage`;
    }

    if (!seriesConfig?.type && !type) {
      throw new Error(`series type of [${name}] is missing`);
    }

    const seriesItem: SimplifiedSeriesDefinition = {
      encode: {
        x: [0],
        y: name,
        seriesName: name,
        tooltip: name,
      },
      ...seriesConfig,
      type: seriesConfig?.type || type,
    };

    if (maybePercentageDimension) {
      auxiliaryDimensions.push(maybePercentageDimension);
      seriesItem.encode.tooltip = maybePercentageDimension;
    }

    series.push(seriesItem);
  });

  return {
    dimensions: auxiliaryDimensions,
    series,
  };
};
