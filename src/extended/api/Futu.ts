import { fetch } from '@tauri-apps/plugin-http';
import { useStorage } from '@vueuse/core';
import {CreateRequestConfig,GenerateToken} from './Quote_Token';
import { invoke } from '@tauri-apps/api/core';

export async function search(keyword:string) {

    const lang = useStorage('oit-locale','en_us').value.replace(/_/g, "-");

    const url = `https://www.futunn.com/search-stock/predict?lang=${lang}&keyword=${keyword}`;
    
    return fetch(url,{
        method:'GET'
    }).then(data => {        
        return data.json();
    })
}

export interface ScreenerItem{
    change:string,
    changeRatio:string,
    markcap:string,
    name:string,
    price:string,
    stockCode:string,
    stockId:string,
    volume:string,
}

export async function screener(body:any):Promise<ScreenerItem[] | undefined>{
    return invoke('futu_screener',{
        quotetoken:GenerateToken(CreateRequestConfig('get-screener-list','post',undefined,body)).toString(),
        body:JSON.stringify(body)
    }).then((data:any) => {
        const json = JSON.parse(data).data;
        
        const List:ScreenerItem[] = [];

        for(const item of json.list){
            List.push({
                change:item.change,
                changeRatio:item.changeRatio + '%',
                markcap:item.markcap,
                name:item.name,
                price:item.price,
                stockCode:item.stockCode,
                stockId:item.stockId,
                volume:item.volume,
            })
        }

        return List;
    })
}

export default{
    search,
    screener
}