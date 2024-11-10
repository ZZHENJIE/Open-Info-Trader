<script lang="ts">
import { defineComponent } from 'vue';
import { CandlestickChart } from '../extended/Echarts'
import DongFang from '../extended/api/DongFang';

export default defineComponent({
    props:{
        symbol: String,
        eleid: String,
        offset: Number
    },
    data(){
        return {
            Reinstatement:[
                {
                    label:'No-Reinstatement',
                    value:'0',
                },
                {
                    label:'Pre-Reinstatement',
                    value:'1',
                },
                {
                    label:'Post-Reinstatement',
                    value:'2',
                },
            ],
            Klt:[
                {
                    label:'TickChart',
                    value:'100',
                },
                {
                    label:'Day',
                    value:'101',
                },
                {
                    label:'Week',
                    value:'102',
                },
                {
                    label:'Month',
                    value:'103',
                },
            ],
            current_Reinstatement:{
                label:'No-Reinstatement',
                value:'0',
            },
            current_Klt:{
                label:'TickChart',
                value:'100',
            },
            IsTickChart:true,
            Chart:null as CandlestickChart | null
        }
    },
    watch:{
        symbol(newValue, oldValue){
            this.flushed()
        }
    },
    mounted() {
        this.flushed()
    },
    methods:{
        KltChange(){
            this.current_Klt.value === '100' ? this.IsTickChart = true : this.IsTickChart = false;
            this.flushed()
        },
        flushed(){
            if (this.eleid && this.symbol && this.offset) {
                const Ele = document.getElementById(this.eleid);
                if (Ele) {
                    if(this.Chart === null){
                        this.Chart = new CandlestickChart(Ele, undefined, null, undefined, window.innerHeight + this.offset)
                        this.Chart?.AdaptiveSize(this.offset);
                    }
                    DongFang.get_stock_info(this.symbol).then(stock_info => {
                        if (stock_info) {
                            if(this.IsTickChart){
                                DongFang.tick_candlestick_chart({
                                    market: stock_info.market,
                                    symbol: stock_info.symbol,
                                }).then(data => {
                                    if (data) {
                                        this.Chart?.SetData(data);
                                    }
                                })
                            }else{
                                DongFang.long_candlestick_chart({
                                    market: stock_info.market,
                                    symbol:stock_info.symbol,
                                    reinstatement: this.current_Reinstatement.value,
                                    klt: this.current_Klt.value,
                                    lmt: 10000
                                }).then(data => {
                                    if (data) {
                                        this.Chart?.SetData(data);
                                    }
                                })
                            }
                        }
                    })
                }
            }
        }
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
