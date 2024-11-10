<template>
    <ElForm :model="Config">
        <ElRow :gutter="8">
            <ElCol :span="12">
                <ElFormItem :label="$t('Setting.Language')">
                    <ElSelect v-model="Config.Language">
                        <ElOption v-for="item in Languages" :key="item.value" :label="item.label" :value="item.value" />
                    </ElSelect>
                </ElFormItem>
            </ElCol>
            <ElCol :span="12">
                <ElFormItem :label="$t('Setting.Theme')">
                    <ElSwitch v-model="IsDrak" inline-prompt :active-action-icon="IconThemeLight"
                        :inactive-action-icon="IconThemeDark">
                    </ElSwitch>
                </ElFormItem>
            </ElCol>
        </ElRow>
        <ElFormItem>
            <ElButton type="primary" @click="Flushed">{{ $t('Setting.Save') }}</ElButton>
        </ElFormItem>
    </ElForm>
</template>

<script lang="ts">
import { defineComponent,shallowRef, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { useDark, useToggle, useStorage } from '@vueuse/core';
import IconThemeDark from '../Icon/IconThemeDark.vue';
import IconThemeLight from '../Icon/IconThemeLight.vue';

export default defineComponent({
    data() {
        return {
            IconThemeDark: shallowRef(IconThemeDark),
            IconThemeLight: shallowRef(IconThemeLight),
            Languages: [
                {
                    label: '简体中文',
                    value: 'zh_cn',
                },
                {
                    label: 'English',
                    value: 'en_us',
                }
            ],
        }
    },
    setup() {
        const { locale } = useI18n();

        const IsDrak = ref(useDark({
            storageKey: 'oit-theme',
        }))

        const Config = useStorage('oit-config', {
            Language: 'en_us',
        });

        const Flushed = () => {
            locale.value = Config.value.Language;
            useToggle(IsDrak.value);
        }

        return {
            IsDrak,
            Config,
            Flushed
        }
    },
    mounted() {
        this.Flushed()
    },
})

</script>