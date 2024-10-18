<template>
    <ElRow :gutter="3">
        <ElCol :span="10">
            <ElInput v-model="symbol" :placeholder="$t('Please Input') + $t('Symbol')" @change="isUpdate = false" />
        </ElCol>
        <ElCol :span="6">
            <ElCascader v-model="channel" :options="equities_list" @change="isUpdate = false" />
        </ElCol>
        <ElCol :span="2">
            <ElSwitch
                v-model="units_shares"
                inline-prompt
                :active-text="$t('Skill')"
                :inactive-text="$t('Share')"
            >
            </ElSwitch>
        </ElCol>
        <ElCol :span="6">
            <ElButton @click="start_update">{{ $t('Confirm') }}</ElButton>
        </ElCol>
    </ElRow>

    <ElDescriptions style="margin-top: 10px;" :title="$t('Stock Info')">
        <ElDescriptionsItem :label="$t('Symbol')"> {{ stock_info.Symbol }} </ElDescriptionsItem>
        <ElDescriptionsItem :label="$t('Company')"> {{ stock_info.Company }} </ElDescriptionsItem>
        <ElDescriptionsItem :label="$t('Timestamp')"> {{ stock_info.Timestamp }} </ElDescriptionsItem>
    </ElDescriptions>

    <ElRow :gutter="3" style="margin-top: 10px;">
        <ElCol :span="12">
            <ElTable :data="buy_list" stripe>
                <ElTableColumn :label="$t('Size')" prop="Size"></ElTableColumn>
                <ElTableColumn :label="$t('Price')" prop="Price"></ElTableColumn>
            </ElTable>
        </ElCol>
        <ElCol :span="12">
            <ElTable :data="sell_list" stripe>
                <ElTableColumn :label="$t('Size')" prop="Size"></ElTableColumn>
                <ElTableColumn :label="$t('Price')" prop="Price"></ElTableColumn>
            </ElTable>
        </ElCol>
    </ElRow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { book_viewer } from '../../api/Cboe';
import { ElButton, ElDescriptionsItem } from 'element-plus';

interface Order_Item{
    Size:number,
    Price:string
}

const equities_list = ref([
    {
        label:'BZX Equities',
        value:'bzx'
    },
    {
        label:'BYX Equities',
        value:'byx'
    },
    {
        label:'EDGX Equities',
        value:'edgx'
    },
    {
        label:'EDGA Equities',
        value:'edga'
    }
])
const buy_list = ref([] as Order_Item[]);
const sell_list = ref([] as Order_Item[]);
const channel = ref();
const units_shares = ref(true);
const symbol = ref('');
const stock_info = ref({
    Symbol:'',
    Company:'',
    Timestamp:'',
});
const isUpdate = ref(false);

async function start_update() {
    isUpdate.value = true;
    update_list();
}

async function update_list() {
    if(symbol.value != '' && isUpdate){
        book_viewer(channel.value[0],symbol.value).then(json => {
            buy_list.value = [];
            sell_list.value = [];
            stock_info.value = {
                Symbol:json.symbol,
                Company:json.company,
                Timestamp:json.timestamp,
            }
            const Buy_list = json.bids;
            const Sell_list = json.asks;
            for (const Item of Buy_list){
                let Size = Item[0];
                if(units_shares.value){
                    Size /= 100;
                }
                buy_list.value.push({
                    Size:Size,
                    Price:Item[1].toString()
                })
            }
            for (const Item of Sell_list){
                let Size = Item[0];
                if(units_shares.value){
                    Size /= 100;
                }
                sell_list.value.push({
                    Size:Size,
                    Price:Item[1].toString()
                })
            }
            update_list();
        })
    }
}
</script>