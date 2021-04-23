import { unref } from 'vue';

import { MaybeRef } from '@/utils/typings';

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
    let {
      name,
      displayName,
      displayDimension,
      isPercentage,
      seriesConfig,
    } = definitionItem;

    auxiliaryDimensions.push({
      name,
      displayName,
    });

    if (isPercentage && !displayDimension) {
      displayDimension = `${name}_Percentage`;
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

    if (displayDimension) {
      auxiliaryDimensions.push(displayDimension);
      seriesItem.encode.tooltip = displayDimension;
    }

    series.push(seriesItem);
  });

  return {
    dimensions: auxiliaryDimensions,
    series,
  };
};
