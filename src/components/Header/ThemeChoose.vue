<template>
    <ElSwitch 
        @click="ToggleDark"
        v-model="IsDrak"
        inline-prompt
        :active-text="$t('Theme Dark')"
        :inactive-text="$t('Theme Light')"
        style="--el-switch-on-color: #6C6E72; --el-switch-off-color: #6C6E72"
    >
    </ElSwitch>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import { ref } from 'vue';

const IsDrak = ref(useDark({
    storageKey: 'dealbox-theme',
}))

const ToggleDark = useToggle(IsDrak.value)
</script>