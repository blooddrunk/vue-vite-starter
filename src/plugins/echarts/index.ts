import VueEcharts from 'vue-echarts';
import { use, registerTheme, registerMap } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts';
import type { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { App } from 'vue';

import { chartThemeList } from '@/utils/chart';

export default async (app: App) => {
  use([
    CanvasRenderer,

    BarChart,
    LineChart,
    PieChart,
    MapChart,

    DatasetComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
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
    'china',
    (await import('./map/json/china.json')).default as GeoJSONSourceInput
  );

  app.component('ECharts', VueEcharts);
};
