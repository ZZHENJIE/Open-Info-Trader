<template>
    <ElText>UTC+8 {{ Timestring }}</ElText>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { taobao_timestamp } from '../extended/api/Tool';

export default defineComponent({
    data(){
        return{
            Timestamp:0,
            Timestring:this.$t('TimeViewer.Loading') + '...'
        }
    },
    mounted() {
        taobao_timestamp().then(json => {
            this.Timestamp = parseInt(json.data.t, 10);
            this.StartTimer();
        })
    },
    methods:{
        StartTimer() {
            setInterval(() => {
                this.Timestamp += 1000;
                const Time = new Date(this.Timestamp);
                const hours = String(Time.getHours()).padStart(2, '0');
                const minutes = String(Time.getMinutes()).padStart(2, '0');
                const seconds = String(Time.getSeconds()).padStart(2, '0');
                this.Timestring = `${hours}:${minutes}:${seconds}`;
            }, 1000);
        }
    }
})
</script>
