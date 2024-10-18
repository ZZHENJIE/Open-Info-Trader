<template>
    <div style="margin-top: 5px;">
        <ElText>
            {{ Timestring }} {{ $t('Message') }}: {{ Message }}
        </ElText>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { taobao_timestamp } from '../../api/Tool';

const Timestamp = ref(0);
const Message = ref("");
const Timestring = ref("xx:xx:xx");

taobao_timestamp().then(json => {
    Timestamp.value = parseInt(json.data.t, 10);
    StartTimer();
})

function StartTimer() {
    setInterval(() => {
        Timestamp.value += 1000;
        const Time = new Date(Timestamp.value);
        const hours = String(Time.getHours()).padStart(2, '0');
        const minutes = String(Time.getMinutes()).padStart(2, '0');
        const seconds = String(Time.getSeconds()).padStart(2, '0');
        Timestring.value = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

</script>
