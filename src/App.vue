<template>
    <ElContainer class="layout-container" :style="`height:${windowHeight}px`">
        <ElAside width="65px">
            <ElMenu collapse>
                <!-- 主页 -->
                <ElMenuItem index="0" @click="TogglePage(Home)">
                    <ElIcon><HomeFilled /></ElIcon>
                    <template #title>{{ $t('App.Home') }}</template>
                </ElMenuItem>
                <!-- 富途牛牛 -->
                <ElSubMenu index="1">
                    <template #title>
                        <ElIcon><Futu_Icon /></ElIcon>
                    </template>
                    <ElMenuItemGroup>
                        <template #title><span>{{ $t('App.Futu') }}</span></template>
                        <ElMenuItem index="1-0" @click="TogglePage(Futu_Search)">
                            {{ $t('App.Search') }}
                        </ElMenuItem>
                        <ElMenuItem index="1-1" @click="TogglePage(Futu_Screener)">
                            {{ $t('App.Screener') }}
                        </ElMenuItem>
                    </ElMenuItemGroup>
                </ElSubMenu>
                <!-- 功能集合 -->
                <ElSubMenu index="2">
                    <template #title>
                        <ElIcon><Grid /></ElIcon>
                    </template>
                    <ElMenuItemGroup>
                        <template #title><span>{{ $t('App.Gather') }}</span></template>
                        <ElMenuItem index="2-0" @click="TogglePage(Event_Calendar)">
                            {{ $t('App.Event Calendar') }}
                        </ElMenuItem>
                        <ElMenuItem index="2-1" @click="TogglePage(IPoscoop_Calendar)">
                            {{ $t('App.IPoscoop Calendar') }}
                        </ElMenuItem>
                        <ElMenuItem index="2-2" @click="TogglePage(Cboe_Book_Viewer)">
                            {{ `Cboe ${$t('App.Book Viewer')}` }}
                        </ElMenuItem>
                    </ElMenuItemGroup>
                </ElSubMenu>
                <!-- 设置 -->
                <ElMenuItem index="3" @click="OpenSetting = !OpenSetting">
                    <ElIcon><SettingHollow /></ElIcon>
                    <template #title>{{ $t('App.Setting') }}</template>
                </ElMenuItem>
            </ElMenu>
        </ElAside>
        
        <ElContainer>
            <ElHeader height="20px">
                <TimeViewer></TimeViewer>
            </ElHeader>
            <ElMain>
                <ElDrawer
                    v-model="OpenSetting"
                    :with-header="false"
                    direction="rtl"
                    size="90%"
                >
                    <Setting ref="SettingPage" />
                </ElDrawer>
                <component
                    :style="`height:${windowHeight - 60}px`"
                    :is="CurrentPage">
                </component>
            </ElMain>
        </ElContainer>
    </ElContainer>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import { Setting as SettingHollow } from '@element-plus/icons-vue'
import TimeViewer from './components/TimeViewer.vue';
//页面
import Home from './components/Page/Home.vue'
import Setting from './components/Page/Setting.vue'
import Futu_Search from './components/Page/Futu/Search.vue'
import Futu_Screener from './components/Page/Futu/Screener.vue'
import Cboe_Book_Viewer from './components/Page/Gather/Cboe_Book_Viewer.vue'
import Event_Calendar from './components/Page/Gather/Event_Calendar.vue'
import IPoscoop_Calendar from './components/Page/Gather/IPoscoop_Calendar.vue'
//图标
import Futu_Icon from './components/Icon/IconFutu.vue'

export default defineComponent({
    components:{
        Setting,
        TimeViewer,
        Futu_Icon,
        SettingHollow
    },
    data(){
        return{
            Home:Home,
            Futu_Search:Futu_Search,
            Futu_Screener:Futu_Screener,
            Cboe_Book_Viewer:Cboe_Book_Viewer,
            Event_Calendar:Event_Calendar,
            IPoscoop_Calendar:IPoscoop_Calendar,
            CurrentPage:shallowRef(Home),
            OpenSetting:true,
            windowHeight:window.innerHeight,
        }
    },
    mounted() {
        this.OpenSetting = false;
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
        });
    },
    methods:{
        TogglePage(Page:any){
            this.CurrentPage = Page;
        }
    }
})
</script>