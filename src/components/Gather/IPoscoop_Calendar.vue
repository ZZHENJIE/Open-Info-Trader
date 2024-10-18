<template>
    <ElTable v-loading="Loading" stripe :data="TableData">
        <ElTableColumn :label="$t('Company')" prop="Company"></ElTableColumn>
        <ElTableColumn :label="$t('Symbol')" prop="Symbol"></ElTableColumn>
        <ElTableColumn :label="$t('Managers')" prop="Managers"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop Shares')" prop="Shares"></ElTableColumn>
        <ElTableColumn :label="$t('Price Low')" prop="Price_Low"></ElTableColumn>
        <ElTableColumn :label="$t('Price High')" prop="Price_High"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop Volume')" prop="Volume"></ElTableColumn>
        <ElTableColumn :label="$t('Expected Date')" prop="Expected_Date"></ElTableColumn>
    </ElTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ipooscoop_calendar, IPO_Item } from '../../api/Gather';

const Loading = ref(true);

const TableData = ref([] as IPO_Item[]);

onMounted(async () => {
    await ipooscoop_calendar().then(json => {
        TableData.value = [];
        for (const item of json) {
            TableData.value.push({
                Company: item.Company,
                Symbol: item.Symbol,
                Managers: item.Managers,
                Shares: item.Shares,
                Price_High: item.Price_High,
                Price_Low: item.Price_Low,
                Volume: item.Volume,
                Expected_Date: item.Expected_Date
            })
        }
        Loading.value = false;
    })
})

</script>