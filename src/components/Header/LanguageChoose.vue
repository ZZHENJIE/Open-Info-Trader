<script setup lang="ts">
import { ref } from 'vue';
import DBIconLanguage from '../Icon/DBIconLanguage.vue';
import { useStorage } from '@vueuse/core';
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const language = useStorage('dealbox-locale','en');

locale.value = language.value;

const changelanguage = (lang:string) => {
    locale.value = lang;
    language.value = lang;
}

const internationalization = ref([
    {
        tag:'zh',
        name:'简体中文'
    },
    {
        tag:'en',
        name:'English'
    }
]);

</script>

<template>
    <ElDropdown>
        <ElIcon :size="20" style="margin: 5px 0 0 10px;">
            <DBIconLanguage />
        </ElIcon>
        <template #dropdown>
            <ElDropdownMenu>
                <ElDropdownItem 
                    v-for="locale in internationalization"
                    @click.prevent.stop="changelanguage(locale.tag)">
                    {{ locale.name }}
                </ElDropdownItem>
            </ElDropdownMenu>
        </template>
    </ElDropdown>
</template>
