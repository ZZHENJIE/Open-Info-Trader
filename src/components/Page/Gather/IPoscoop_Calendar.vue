<script lang="ts">
import { defineComponent } from 'vue';
import { ipooscoop_calendar, IPOItem } from '../../../extended/api/Gather';

export default defineComponent({
    data(){
        return{
            Loading:true,
            TableData:[] as IPOItem[]
        }
    },
    mounted() {
        ipooscoop_calendar().then(data => {
            if(data){
                this.TableData = data;
                this.Loading = false;
            }
        })
    },
})

</script>

<template>
    <ElTable v-loading="Loading" stripe :data="TableData">
        <ElTableColumn show-overflow-tooltip :label="$t('IPoscoop_Calendar.Company')" prop="Company"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop_Calendar.Symbol')" prop="Symbol"></ElTableColumn>
        <ElTableColumn show-overflow-tooltip :label="$t('IPoscoop_Calendar.Managers')" prop="Managers"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop_Calendar.Shares')" prop="Shares"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop_Calendar.Price Low')" prop="Price_Low"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop_Calendar.Price High')" prop="Price_High"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop_Calendar.Volume')" prop="Volume"></ElTableColumn>
        <ElTableColumn :label="$t('IPoscoop_Calendar.Expected Date')" prop="Expected_Date"></ElTableColumn>
    </ElTable>
</template>