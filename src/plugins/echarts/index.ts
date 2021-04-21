import ECharts from 'vue-echarts';
import { use, registerTheme } from 'echarts/core';

import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';

import { App } from 'vue';

const availableThemeNameList = ['primary'];

export default async (app: App) => {
  use([
    CanvasRenderer,

    BarChart,

    DatasetComponent,
    GridComponent,
    LegendComponent,
    TitleComponent,
    TooltipComponent,
  ]);

  const themeList = await Promise.all(
    availableThemeNameList.map((theme) =>
      import(`./theme/${theme}.ts`).then((module) => module.default)
    )
  );

  themeList.forEach((theme, index) => {
    const themeName = availableThemeNameList[index];
    registerTheme(themeName, theme);
  });

  app.component('ECharts', ECharts);
};
