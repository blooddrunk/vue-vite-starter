import VueEcharts from 'vue-echarts';
import { use, registerTheme, registerMap } from 'echarts/core';
import type { ComposeOption } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  PieChart,
  PieSeriesOption,
  GaugeChart,
  GaugeSeriesOption,
  MapChart,
  MapSeriesOption,
} from 'echarts/charts';
import {
  DatasetComponent,
  DatasetComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GeoComponent,
  GeoComponentOption,
} from 'echarts/components';
// import * as echarts from 'echarts';
import type { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import 'echarts-liquidfill';
import type { JsonObject } from 'type-fest';

import type { UserPlugin } from '@typings';
import { createNamedEntryForGlobImport } from '@/utils/misc';

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | GaugeSeriesOption
  | MapSeriesOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | TitleComponentOption
  | TooltipComponentOption
  | GeoComponentOption
>;

export const install: UserPlugin = async (app) => {
  use([
    CanvasRenderer,

    BarChart,
    LineChart,
    PieChart,
    GaugeChart,
    MapChart,

    DatasetComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GeoComponent,
  ]);

  /**
   * register themes
   * TODO: static theme type
   */
  const themeModules = import.meta.glob<JsonObject>('./theme/*.ts', {
    import: 'default',
  });
  createNamedEntryForGlobImport(themeModules).forEach(async ([key, m]) => {
    registerTheme(key, await m());
  });

  /**
   * register maps
   * TODO: static map type
   */
  const mapModules = import.meta.glob<GeoJSONSourceInput>('./map/*.json', {
    import: 'default',
  });
  createNamedEntryForGlobImport(mapModules).forEach(async ([key, m]) => {
    registerMap(key, await m());
  });

  // const themeList = await Promise.all(
  //   chartThemeList.map((theme) =>
  //     import(`./theme/${theme}.ts`).then((module) => module.default)
  //   )
  // );

  // themeList.forEach((theme, index) => {
  //   const themeName = chartThemeList[index];
  //   registerTheme(themeName, theme);
  // });

  // registerMap(
  //   'china',
  //   (await import('./map/china.json')).default as GeoJSONSourceInput
  // );
  // registerMap(
  //   'zhejiang',
  //   (await import('./map/zhejiang.json')).default as GeoJSONSourceInput
  // );

  app.component('ECharts', VueEcharts);
};
