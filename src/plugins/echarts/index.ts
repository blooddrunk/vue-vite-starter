import VueEcharts from 'vue-echarts';
import {
  use,
  registerTheme,
  registerMap,
  GeoJSONCompressed,
} from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
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
    (await import('./map/json/china.json')) as GeoJSONCompressed
  );

  app.component('ECharts', VueEcharts);
};
