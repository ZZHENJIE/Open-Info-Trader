<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { Futu_Cache,Item as CacheItem } from '../../../extended/Screener';
import { Minus,Plus,Check,ArrowRight } from '@element-plus/icons-vue';
import { screener,ScreenerItem } from '../../../extended/api/Futu'
import CandlestickChart from '../../CandlestickChart.vue';

export default defineComponent({
    components:{
        CandlestickChart
    },
    data() {
        return {
            Minus:shallowRef(Minus),
            Check:shallowRef(Check),
            Plus:shallowRef(Plus),
            ArrowRight:shallowRef(ArrowRight),
            config: new Futu_Cache,
            show_candlestick_chart:false,
            current_config_item: '',
            new_item:{} as CacheItem,
            show_revise_dialog:false,
            screener_list:[] as ScreenerItem[],
            currentlistindex:0,
            currentsymbol:''
        }
    },
    methods:{
        update(){
            screener(JSON.parse(this.current_config_item))?.then(data => {
                if(data){
                    this.screener_list = data;
                    this.currentlistindex = 0;
                    this.currentsymbol = this.screener_list[this.currentlistindex].stockCode

                }
            })
        },
        next(){
            this.currentlistindex += 1;
            this.currentsymbol = this.screener_list[this.currentlistindex].stockCode;
        }
    }
})

</script>

<template>
    <ElContainer>
        <ElHeader height="35px" >
            <ElRow :gutter="4">
                <ElCol :span="8">
                    <ElSelect v-model="current_config_item" filterable>
                        <ElOption v-for="item in config.data" :key="item.value" :label="item.label" :value="item.value">
                            <ElButton style="width: 20px; height: 20px;" @click="config.removeItem(item.label)"
                            type="danger" circle :icon="Minus" />
                            <ElText style="margin-left: 20px;">{{ item.label }}</ElText>
                        </ElOption>
                    </ElSelect>
                </ElCol>
                <ElCol :span="12">
                    <ElButton :icon="Plus" circle @click="show_revise_dialog = true;" />
                    <ElButton :icon="Check" circle @click="update" />
                </ElCol>
                <ElCol :span="2">
                    <ElButton @click="next" circle :icon="ArrowRight" v-if="show_candlestick_chart"></ElButton>
                </ElCol>
                <ElCol :span="2">
                    <ElSwitch v-model="show_candlestick_chart"></ElSwitch>
                </ElCol>
            </ElRow>
            <ElDialog v-model="show_revise_dialog" :title="$t('Futu_Screener.Screener Parameters')">
                <ElForm>
                    <ElInput style="margin-bottom: 10px;" v-model="new_item.label" :placeholder="$t('Futu_Screener.Please Input Label')" />
                    <ElInput v-model="new_item.value" autosize type="textarea" :placeholder="$t('Futu_Screener.Please Input Value')" />
                </ElForm>
                <template #footer>
                    <ElButton @click="show_revise_dialog = false">Cancel</ElButton>
                    <ElButton type="primary" @click="config.addItem(new_item)">{{ $t('Futu_Screener.Confirm') }}</ElButton>
                </template>
            </ElDialog>
        </ElHeader>

            <template v-if="!show_candlestick_chart">
                <ElTable :data="screener_list">
                <ElTableColumn :label="$t('Futu_Screener.StockCode')" prop="stockCode"></ElTableColumn>
                <ElTableColumn show-overflow-tooltip :label="$t('Futu_Screener.Name')" prop="name"></ElTableColumn>
                <ElTableColumn :label="$t('Futu_Screener.Price')" prop="price"></ElTableColumn>
                <ElTableColumn :label="$t('Futu_Screener.ChangeRatio')" prop="changeRatio"></ElTableColumn>
                <ElTableColumn :label="$t('Futu_Screener.Change')" prop="change"></ElTableColumn>
                <ElTableColumn :label="$t('Futu_Screener.Markcap')" prop="markcap"></ElTableColumn>
                <ElTableColumn :label="$t('Futu_Screener.Volume')" prop="volume"></ElTableColumn>
            </ElTable>
            </template>
            <template v-else>
                <CandlestickChart :symbol="currentsymbol" :offset="-110" eleid="FutuScreenerCandlestickChart" />
            </template>
    </ElContainer>
</template>