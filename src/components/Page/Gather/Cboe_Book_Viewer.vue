<script lang="ts">
import { defineComponent,shallowRef } from 'vue';
import { Check } from '@element-plus/icons-vue';
import { book_viewer, OrderItem } from '../../../extended/api/Cboe';

interface Unit {
    label: string;
    value: (size: number) => number;
}

interface Channel {
    label: string;
    value: string;
}

export default defineComponent({
    data() {
        return {
            Check:shallowRef(Check),
            channels: [
                {
                    label: 'BZX',
                    value: 'bzx'
                },
                {
                    label: 'BYX',
                    value: 'byx'
                },
                {
                    label: 'EDGX',
                    value: 'edgx'
                },
                {
                    label: 'EDGA',
                    value: 'edga'
                }
            ],
            units: [
                {
                    label: this.$t('Cboe_Book_Viewer.Shares'),
                    value: (size: number) => size
                },
                {
                    label: this.$t('Cboe_Book_Viewer.Skill'),
                    value: (size: number) => size / 100
                }
            ],
            current_units: null as unknown as Unit,
            current_channel: null as unknown as Channel,
            buy_list: [] as OrderItem[],
            sell_list: [] as OrderItem[],
            symbol: '',
            lastupdatetime: this.$t('Cboe_Book_Viewer.Last Update Time'),
            isUpdate: false,
        }
    },
    mounted() {
        this.current_units = this.units[0];
        this.current_channel = this.channels[0];
    },
    methods: {
        start_update() {
            this.isUpdate = true;
            this.update_list();
        },
        update_list() {
            if (this.symbol != '' && this.isUpdate) {
                book_viewer(this.current_channel.value, this.current_units.value, this.symbol).then(data => {
                    if (data) {
                        this.buy_list = data.buy;
                        this.sell_list = data.sell;
                        this.lastupdatetime = data.timestamp;
                    }
                    this.update_list();
                })
            }
        }
    }
})

</script>

<template>
    <ElContainer>
        <ElHeader height="35px">
            <ElRow :gutter="4">
                <ElCol :span="7">
                    <ElInput v-model="symbol" :placeholder="`${$t('Cboe_Book_Viewer.Please Input Symbol')}`"
                        @change="isUpdate = false" />
                </ElCol>
                <ElCol :span="7">
                    <ElSelect v-model="current_channel" @change="isUpdate = false">
                        <ElOption v-for="item in channels" :label="item.label" :value="item" />
                    </ElSelect>
                </ElCol>
                <ElCol :span="7">
                    <ElSelect v-model="current_units">
                        <ElOption v-for="item in units" :label="item.label" :value="item" />
                    </ElSelect>
                </ElCol>
                <ElCol :span="3">
                    <ElButton @click="start_update" :icon="Check" circle />
                </ElCol>
            </ElRow>
        </ElHeader>

        <ElMain>
            <ElText truncated>{{ lastupdatetime }}</ElText>
            <ElRow :gutter="3">
                <ElCol :span="12">
                    <ElTable :data="buy_list" border>
                        <ElTableColumn :label="$t('Cboe_Book_Viewer.Buy')">
                            <ElTableColumn :label="$t('Cboe_Book_Viewer.Price')" prop="Price"></ElTableColumn>
                            <ElTableColumn :label="$t('Cboe_Book_Viewer.Size')" prop="Size"></ElTableColumn>
                        </ElTableColumn>
                    </ElTable>
                </ElCol>
                <ElCol :span="12">
                    <ElTable :data="sell_list" border>
                        <ElTableColumn :label="$t('Cboe_Book_Viewer.Sell')">
                            <ElTableColumn :label="$t('Cboe_Book_Viewer.Price')" prop="Price"></ElTableColumn>
                            <ElTableColumn :label="$t('Cboe_Book_Viewer.Size')" prop="Size"></ElTableColumn>
                        </ElTableColumn>
                    </ElTable>
                </ElCol>
            </ElRow>
        </ElMain>
    </ElContainer>
</template>