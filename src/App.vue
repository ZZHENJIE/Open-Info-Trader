<template>
    <ElContainer class="layout-container" :style="'height:' + windowHeight +'px'">
        <ElAside width="180px">
            <ElScrollbar>
                <ElMenu :default-openeds="['1', '3']">
                    <!-- 主页 -->
                    <ElMenuItem index="0" @click="TogglePage(Home)">
                        <template #title>
                            <ElIcon>
                                <HomeFilled />
                            </ElIcon>{{ $t('Home') }}
                        </template>
                    </ElMenuItem>
                    <!-- 富途牛牛 -->
                    <ElSubMenu index="1">
                        <template #title>
                            <ElIcon>
                                <DBIconFutu />
                            </ElIcon>{{ $t('Futu') }}
                        </template>

                        <ElMenuItem index="1-0" @click="TogglePage(Futu_Search)">
                            {{ $t('Search') }}
                        </ElMenuItem>

                    </ElSubMenu>
                    <!-- 集合 -->
                    <ElSubMenu index="2">
                        <template #title>
                            <ElIcon>
                                <Grid />
                            </ElIcon>{{ $t('Gather') }}
                        </template>

                        <ElMenuItem index="2-0" @click="TogglePage(Wallstreetcn_Event_Calendar)">
                            {{ $t('Event Calendar') }}
                        </ElMenuItem>

                        <ElMenuItem index="2-1" @click="TogglePage(IPoscoop_Calendar)">
                            {{ $t('IPoscoop Calendar') }}
                        </ElMenuItem>

                    </ElSubMenu>
                    <!-- Cboe 市场 -->
                    <ElSubMenu index="3">
                        <template #title>
                            <ElIcon>
                                <DBIconCboe />
                            </ElIcon>{{ $t('Cboe') }}
                        </template>

                        <ElMenuItem index="3-0" @click="TogglePage(Cboe_BookViewer)">
                            {{ $t('Book Viewer') }}
                        </ElMenuItem>

                    </ElSubMenu>
                </ElMenu>
            </ElScrollbar>
        </ElAside>

        <ElContainer>
            <ElHeader>
                <ElCol>
                    <ElRow :span="1">
                        <ThemeChoose></ThemeChoose>
                        <LanguageChoose></LanguageChoose>
                    </ElRow>
                    <ElRow :span="1">
                        <TimeViewer></TimeViewer>
                    </ElRow>
                </ElCol>
            </ElHeader>

            <ElMain>
                <ElScrollbar>
                    <component :is="CurrentPage"></component>
                </ElScrollbar>
            </ElMain>

        </ElContainer>
    </ElContainer>

</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import Futu_Search from './components/Futu/Search.vue';
import Home from './components/Home.vue';
import TimeViewer from './components/Header/TimeViewer.vue';
import Wallstreetcn_Event_Calendar from './components/Gather/Wallstreetcn_Event_Calendar.vue';
import DBIconFutu from './components/Icon/DBIconFutu.vue';
import DBIconCboe from './components/Icon/DBIconCboe.vue';
import ThemeChoose from './components/Header/ThemeChoose.vue';
import LanguageChoose from './components/Header/LanguageChoose.vue';
import IPoscoop_Calendar from './components/Gather/IPoscoop_Calendar.vue';
import Cboe_BookViewer from './components/Cboe/BookViewer.vue';

const CurrentPage = ref(Home)

const TogglePage = (Page: any) => {
    CurrentPage.value = Page;
}

const windowHeight = ref(window.innerHeight - 40);

const getWindowHeight = () => {
    windowHeight.value = window.innerHeight - 40;
};

onMounted(() => {
    window.addEventListener('resize', getWindowHeight);
});

onBeforeMount(() => {
    window.removeEventListener('resize', getWindowHeight);
});

</script>

<style lang="css" scoped>
.layout-container .ElHeader {
    position: relative;
    background-color: var(--Elcolor-primary-light-7);
    color: var(--Eltext-color-primary);
}

.layout-container .ElAside {
    color: var(--Eltext-color-primary);
    background: var(--Elcolor-primary-light-8);
}

.layout-container .ElMenu {
    border-right: none;
}

.layout-container .ElMain {
    padding: 0;
}
</style>