<template>
    <ElDatePicker v-model="Timestamp" type="date" :placeholder="$t('Pick Date')" format="YYYY/MM/DD" value-format="x"
        @change="UpdateTableData" />

    <ElTable v-loading="Loading" :data="TableData" stripe style="margin-top: 10px" table-layout="auto">
        <ElTableColumn :label="$t('Time')" prop="Time" />

        <ElTableColumn :label="$t('Country')">
            <template #default="{ row }">
                <ElImage :src="row.Country" />
            </template>
        </ElTableColumn>

        <ElTableColumn :label="$t('Event')" prop="Event" />
        <ElTableColumn :label="$t('Importance')" prop="Importance" />
        <ElTableColumn :label="$t('Actual')" prop="Actual" />
        <ElTableColumn :label="$t('Forecast')" prop="Forecast" />
        <ElTableColumn :label="$t('Previous')" prop="Previous" />
    </ElTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { taobao_timestamp } from '../../api/Tool';
import { wallstreetcn_event_calendar } from '../../api/Gather';

interface TableDataItem {
    Time: string,
    Country: string,
    Unit: string,
    Event: string,
    Importance: string,
    Actual: string,
    Forecast: string,
    Previous: string
}

const TableData = ref([] as TableDataItem[]);
const Timestamp = ref(0);
const Loading = ref(true);

onMounted(async () => {
    await taobao_timestamp().then(json => {
        const Today = new Date(parseInt(json.data.t, 10));
        Today.setHours(0, 0, 0, 0);
        Timestamp.value = Today.getTime();
        UpdateTableData();
    })
})

async function UpdateTableData() {
    Loading.value = true;
    TableData.value = [];
    const StartTimestamp = Timestamp.value / 1000;
    const EndTimestamp = StartTimestamp + 86399;
    wallstreetcn_event_calendar(StartTimestamp, EndTimestamp).then(json => {
        for (const item of json) {
            const date = new Date(item.public_date * 1000);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            const Actual = item.actual === "" ? "--" : item.actual;
            const Forecast = item.forecast === "" ? "--" : item.forecast;
            const Previous = item.previous === "" ? "--" : item.previous;

            let Importance = '';

            for (let index = 0; index < item.importance; index++) {
                Importance += '⭐'
            }

            TableData.value.push({
                Time: `${hours}:${minutes}:${seconds}`,
                Country: item.flag_uri,
                Unit: item.unit,
                Event: item.title,
                Importance: Importance,
                Actual: Actual,
                Forecast: Forecast,
                Previous: Previous
            });
        }
        Loading.value = false;
    })
}
</script>