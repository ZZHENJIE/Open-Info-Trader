<script lang="ts">
import { defineComponent } from 'vue';
import { wallstreetcn_event_calendar,EventItem } from '../../../extended/api/Gather';
import { taobao_timestamp } from '../../../extended/api/Tool';

export default defineComponent({
    data() {
        return {
            TableData:[] as EventItem[],
            Timestamp:0,
            Loading:true,
        }
    },
    mounted() {
        taobao_timestamp().then(json => {
            const Today = new Date(parseInt(json.data.t, 10));
            Today.setHours(0, 0, 0, 0);
            this.Timestamp = Today.getTime();
            this.UpdateTableData();
        })
    },
    methods:{
        UpdateTableData() {
            this.Loading = true;
            this.TableData = [];
            const StartTimestamp = this.Timestamp / 1000;
            const EndTimestamp = StartTimestamp + 86399;
            wallstreetcn_event_calendar(StartTimestamp, EndTimestamp).then(data => {
                if(data){
                    this.TableData = data;
                    this.Loading = false;
                }
            })
        }
    }
})

</script>

<template>
    <ElContainer>
        <ElHeader height="35px">
            <ElDatePicker v-model="Timestamp" type="date" :placeholder="$t('Event_Calendar.Pick Date')" format="YYYY/MM/DD"
                value-format="x" @change="UpdateTableData" />
        </ElHeader>
        <ElTable v-loading="Loading" :data="TableData" stripe table-layout="auto">
            <ElTableColumn :label="$t('Event_Calendar.Time')" prop="Time" />

            <ElTableColumn :label="$t('Event_Calendar.Country')">
                <template #default="{ row }">
                    <ElImage style="width: 60px; height: 40px;" :src="row.Country" />
                </template>
            </ElTableColumn>

            <ElTableColumn show-overflow-tooltip :label="$t('Event_Calendar.Event')" prop="Event" />
            <ElTableColumn :label="$t('Event_Calendar.Importance')" prop="Importance" />
            <ElTableColumn :label="$t('Event_Calendar.Actual')" prop="Actual" />
            <ElTableColumn :label="$t('Event_Calendar.Forecast')" prop="Forecast" />
            <ElTableColumn :label="$t('Event_Calendar.Previous')" prop="Previous" />
        </ElTable>
    </ElContainer>
</template>