<script lang="ts">
import { defineComponent } from 'vue';
import CandlestickChart from '../CandlestickChart.vue';

export default defineComponent({
    components: {
        CandlestickChart
    },
    data() {
        return {
            text: 'NIO',
            symbol: '',
        }
    },
    methods: {
        comfirm() {
            this.symbol = this.text;
        }
    },
})

</script>

<template>
    <ElContainer>
        <ElHeader height="35px">
            <ElRow>
                <ElCol :span="12">
                    <ElInput v-model="text"></ElInput>
                </ElCol>
                <ElCol :span="12">
                    <ElButton @click="comfirm"></ElButton>
                </ElCol>
            </ElRow>
        </ElHeader>
        <CandlestickChart :symbol="symbol" v-bind:offsetwidth="-90" :offsetheight="-110" eleid="HomeTest"></CandlestickChart>
    </ElContainer>
</template>