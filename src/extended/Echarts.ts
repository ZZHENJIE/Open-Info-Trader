import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  BrushComponent,
  DataZoomComponent,
} from 'echarts/components';
import {
  CandlestickChart as EChartsCandlestickChart,
  LineChart,
  BarChart,
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import EchartsTheme from './EchartsTheme'

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  LegendComponent,
  BrushComponent,
  DataZoomComponent,
  EChartsCandlestickChart,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition
]);
echarts.registerTheme('chalk', EchartsTheme)

export interface CandlestickChartData {
  "candlestick": number[][],
  "volume": number[][],
  "date": number[],
  "symbol": string,
}

export default echarts