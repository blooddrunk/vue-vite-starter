import VueEcharts from 'vue-echarts';
import { use, registerTheme, registerMap, ComposeOption } from 'echarts/core';
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

import type { UserPlugin } from '@typings';
import { chartThemeList } from '@/utils/chart';

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

  const themeList = await Promise.all(
    chartThemeList.map((theme) =>
      import(`./theme/${theme}.ts`).then((module) => module.default)
    )
  );

  themeList.forEach((theme, index) => {
    const themeName = chartThemeList[index];
    registerTheme(themeName, theme);
  });

  registerMap(
    'zj',
    (await import('./map/json/china.json')).default as GeoJSONSourceInput
  );

  app.component('ECharts', VueEcharts);
};
