<script lang="ts">
import { defineComponent, ref } from 'vue';
import { get_stock_info, tick_candlestick_chart, long_candlestick_chart, CandlestickChartData } from '../extended/api/DongFang';
import { createChart, IChartApi, ColorType} from 'lightweight-charts';

export default defineComponent({
    props: {
        symbol: String,
        eleid: String,
        offsetwidth: Number,
        offsetheight: Number,
    },
    data() {
        return {
            Reinstatement: [
                {
                    label: 'No-Reinstatement',
                    value: '0',
                },
                {
                    label: 'Pre-Reinstatement',
                    value: '1',
                },
                {
                    label: 'Post-Reinstatement',
                    value: '2',
                },
            ],
            Klt: [
                {
                    label: 'TickChart',
                    value: '100',
                },
                {
                    label: 'Day',
                    value: '101',
                },
                {
                    label: 'Week',
                    value: '102',
                },
                {
                    label: 'Month',
                    value: '103',
                },
            ],
            current_Reinstatement: {
                label: 'No-Reinstatement',
                value: '0',
            },
            current_Klt: {
                label: 'TickChart',
                value: '100',
            },
            IsTickChart: true,
            Chart: null as IChartApi | null,
        }
    },
    watch: {
        symbol() {
            this.flushed()
        }
    },
    setup(){
        const Chart = ref();
        const VolumeChart = ref();
        const CandlestickChart = ref();

        const init = (id:string,offsetwidth:number,offsetheight:number) => {
            const Ele = document.getElementById(id);
            if(Ele){
                Chart.value = createChart(Ele, {
                    width: window.innerWidth + offsetwidth,
                    height: window.innerHeight + offsetheight,
                    layout: {
                        textColor: 'white',
                        background: {
                            type: ColorType.Solid,
                            // color:'black'
                        },
                    },
                    rightPriceScale: {
                        borderVisible: false,
                    },
                });
            }
            CandlestickChart.value = Chart.value.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            CandlestickChart.value.priceScale().applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                },
            });
            VolumeChart.value = Chart.value.addHistogramSeries({
                color: '#26a69a',
                priceFormat: {
                    type: 'volume',
                },
                priceScaleId: '',
            });
            VolumeChart.value.priceScale().applyOptions({
                scaleMargins: {
                    top: 0.9,
                    bottom: 0,
                },
            });
            Chart.value.timeScale().fitContent();
        }

        const ChartSetData = (Data: CandlestickChartData) => {
            const VolumeList:{
                time:string,
                volume:number,
            }[] = []
            const CandlestickList:{
                time:string,
                open:number,
                close:number,
                high:number,
                low:number,
            }[] = [];
            for(const item of Data.items){
                CandlestickList.push({
                    time:item.time,
                    open:item.open,
                    close:item.close,
                    high:item.high,
                    low:item.low,
                })
                VolumeList.push({
                    time:item.time,
                    volume:item.volume,
                })
            }
            VolumeChart.value.setData(VolumeList);
            CandlestickChart.value.setData(CandlestickList);
        }

        return{
            Chart,
            init,
            ChartSetData
        }
    },
    mounted() {
        if (this.eleid && this.symbol && this.offsetheight && this.offsetwidth) {
            this.init(this.eleid,this.offsetheight,this.offsetwidth)
        }
        window.addEventListener("resize", () => {
            if (this.offsetheight && this.offsetwidth) {
                this.Chart?.resize(window.innerWidth + this.offsetwidth, window.innerHeight + this.offsetheight)
            }
        });
        this.flushed()
    },
    methods: {
        KltChange() {
            this.current_Klt.value === '100' ? this.IsTickChart = true : this.IsTickChart = false;
            this.flushed()
        },
        flushed() {
            if (this.eleid && this.symbol && this.offsetheight && this.offsetwidth) {
                get_stock_info(this.symbol).then(stock_info => {
                    if (stock_info) {
                        if (this.IsTickChart) {
                            tick_candlestick_chart({
                                market: stock_info.market,
                                symbol: stock_info.symbol,
                            }).then(data => {
                                if (data) {
                                    this.ChartSetData(data)
                                }
                            })
                        } else {
                            long_candlestick_chart({
                                market: stock_info.market,
                                symbol: stock_info.symbol,
                                reinstatement: this.current_Reinstatement.value,
                                klt: this.current_Klt.value,
                                lmt: 10000
                            }).then(data => {
                                if (data) {
                                    this.ChartSetData(data)
                                }
                            })
                        }
                    }
                })

            }
        },
    }
})

</script>

<template>
    <ElContainer>
        <ElHeader height="35px">
            <ElRow :gutter="4">
                <ElCol :span="6">
                    <ElSelect v-model="current_Klt" @change="KltChange">
                        <ElOption v-for="item in Klt" :label="item.label" :value="item" />
                    </ElSelect>
                </ElCol>
                <ElCol v-if="!IsTickChart" :span="6">
                    <ElSelect v-model="current_Reinstatement" @change="flushed">
                        <ElOption v-for="item in Reinstatement" :label="item.label" :value="item" />
                    </ElSelect>
                </ElCol>
            </ElRow>
        </ElHeader>
        <div :id="eleid"></div>
    </ElContainer>
</template>
