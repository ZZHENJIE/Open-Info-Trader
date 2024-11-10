<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data(){
        return{
            
        }
    }
})

</script>

<template>
    
</template>


<!-- <template>
    <ElContainer>
      <ElHeader>
        <ElInput v-model="Input" :placeholder="$t('Please Input')">
          <template #append>
            <ElButton :icon="Search" @click="update_list" />
          </template>
        </ElInput>
      </ElHeader>
  
      <ElMain>
        <ElRow>
          <ElTable :data="Search_List.stock">
            <ElTableColumn :label="$t('Stock')">
              <ElTableColumn :label="$t('Symbol')" prop="symbol"></ElTableColumn>
              <ElTableColumn show-overflow-tooltip :label="$t('Company')" prop="stock_name"></ElTableColumn>
              <ElTableColumn :label="$t('Operations')">
                <template #default="{ row }">
                  <ElButton @click="open_url('https://www.futunn.com/stock/' + row.symbol)">{{ $t('Detail') }}</ElButton>
                </template>
              </ElTableColumn>
            </ElTableColumn>
          </ElTable>
        </ElRow>
  
        <ElRow>
          <ElTable :data="Search_List.news">
            <ElTableColumn :label="$t('News')">
              <ElTableColumn :label="$t('Time')" prop="Time"></ElTableColumn>
              <ElTableColumn show-overflow-tooltip :label="$t('Title')" prop="title"></ElTableColumn>
              <ElTableColumn :label="$t('Source')" prop="source"></ElTableColumn>
              <ElTableColumn :label="$t('Number of Views')" prop="pv"></ElTableColumn>
              <ElTableColumn :label="$t('Operations')">
                <template #default="{ row }">
                  <ElButton @click="open_url(row.url)">{{ $t('Detail') }}</ElButton>
                </template>
              </ElTableColumn>
            </ElTableColumn>
          </ElTable>
        </ElRow>
      </ElMain>
  
    </ElContainer>
  
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { Search } from '@element-plus/icons-vue';
  import { search } from '../../api/Futu';
  import { invoke } from '@tauri-apps/api/core';
  
  interface NewItem {
    title: string,
    Time: string,
    url: string,
    source: string,
    pv: number,
  }
  
  interface StockItem {
    stock_name: string,
    symbol: string,
  }
  
  const Input = ref('');
  const Search_List = ref({
    news: [] as NewItem[],
    stock: [] as StockItem[]
  });
  
  const open_url = (url: string) => {
    invoke('open_url', {
      url: url
    })
  }
  
  const update_list = () => {
    search(Input.value).then(json => {
      Search_List.value.news = [];
      Search_List.value.stock = [];
      for (const item of json.data.stock) {
        Search_List.value.stock.push({
          stock_name: item.stock_name,
          symbol: item.symbol.replace(/\./g, '-'),
        })
      }
      for (const item of json.data.news) {
        const date = new Date(item.dw_time * 1000);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        Search_List.value.news.push({
          title: item.title.replace(/<em>|<\/em>/g, ''),
          Time: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
          url: item.url,
          source: item.source,
          pv: item.pv
        })
      }
    })
  }
  
  </script> -->