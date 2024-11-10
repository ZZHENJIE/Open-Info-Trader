import * as echarts from 'echarts/core';
import {
    TooltipComponent,
    GridComponent,
    VisualMapComponent,
    LegendComponent,
    BrushComponent,
    DataZoomComponent,
    ToolboxComponent,
} from 'echarts/components';
import {
    CandlestickChart as EchartsCandlestickChart,
    LineChart,
    BarChart,
} from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import EchartsTheme from './EchartsTheme'

echarts.use([
    TooltipComponent,
    ToolboxComponent,
    GridComponent,
    VisualMapComponent,
    LegendComponent,
    BrushComponent,
    EchartsCandlestickChart,
    LineChart,
    BarChart,
    CanvasRenderer,
    DataZoomComponent,
    UniversalTransition
]);
echarts.registerTheme('chalk', EchartsTheme)

export interface CandlestickChartData {
    "candlestick": number[][],
    "volume": number[][],
    "date": number[],
    "symbol": string,
}

export class CandlestickChart {
    public prototype: any;
    constructor(
        private Element: HTMLElement,
        private Chart: echarts.ECharts | undefined,
        private IsDark?: boolean | null,
        private Width?: number,
        private Height?: number,
    ) {
        this.prototype = Object.prototype;
    }
    public GetTheme = () => {
        if (this.IsDark === false) {
            return ''
        }
        if (this.IsDark === true) {
            return 'dark'
        }
        return 'chalk'
    }
    public AdaptiveSize = (offset: number = 0) => {
        window.addEventListener("resize", () => {
            this.Chart?.resize({
                height: window.innerHeight + offset,
            });
        });
    };
    public SetData = (Data: CandlestickChartData) => {
        if (this.Chart === undefined) {
            this.Chart = echarts.init(this.Element, this.GetTheme(), {
                height: this.Height,
                width: this.Width,
            });
        }

        this.Chart.setOption({
            animation: true,
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "cross",
                },
                borderWidth: 1,
                padding: 10,
            },
            axisPointer: {
                link: [
                    {
                        xAxisIndex: [0],
                    },
                ],
            },
            brush: {
                xAxisIndex: "all",
                brushLink: "all",
                outOfBrush: {
                    colorAlpha: 0.1,
                },
            },
            toolbox:{
                show:false
            },
            grid: [
                {
                    left: "10%",
                    right: "8%",
                    height: "50%",
                },
                {
                    left: "10%",
                    right: "8%",
                    top: "63%",
                    height: "16%",
                },
            ],
            xAxis: [
                {
                    type: "category",
                    data: Data.date,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: "dataMin",
                    max: "dataMax",
                    axisPointer: {
                        z: 100,
                    },
                },
                {
                    type: "category",
                    gridIndex: 1,
                    data: Data.date,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    min: "dataMin",
                    max: "dataMax",
                },
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: false,
                    },
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                },
            ],
            dataZoom: [
                {
                    type: "inside",
                    xAxisIndex: [0, 1],
                    start: 80,
                    end: 100,
                    show: true,
                },
                {
                    show: false,
                },
            ],
            series: [
                {
                    name: Data.symbol,
                    type: "candlestick",
                    data: Data.candlestick,
                },
                {
                    name: "Volume",
                    type: "bar",
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: Data.volume,
                },
            ],
        });
    };
}