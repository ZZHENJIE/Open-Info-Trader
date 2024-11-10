import { fetch } from "@tauri-apps/plugin-http"
import { CandlestickChartData } from '../Echarts'

type Market = '105' | '106' | '107';
//105 纳斯达克交易所 106 纽约交易所 107 美国证券交易所
type Reinstatement = '0' | '1' | '2';
//0 不复权 1 前复权 2 后复权
type Klt = '101' | '102' | '103';
//101 日K线图 102 周K线图 103 月K线图

interface Tickchart{
    symbol:string,
    market:Market,
}

interface Longchart{
    symbol:string,
    market:Market,
    reinstatement:Reinstatement | string,
    klt:Klt | string,
    lmt:number,
}

interface StockInfo{
    name:string,
    symbol:string,
    market:Market
}

export async function get_stock_info(symbol:string):Promise<StockInfo | undefined>{
    return fetch(`https://gbapi.eastmoney.com/webarticlelist/api/Article/Articlelist?code=us${symbol}`,{
        method:'GET'
    }).then(data => {
        return data.json().then(object => {
            const json = object.bar_info;
            const info:StockInfo = {
                market:json.QMarket,
                name:json.ShortName,
                symbol:symbol
            };
            return info;
        });
    })
}

export async function long_candlestick_chart(params:Longchart):Promise<CandlestickChartData | undefined>{
    const url = `https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=${params.market}.${params.symbol}&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=${params.klt}&fqt=${params.reinstatement}&end=20500101&lmt=${params.lmt}`
    return fetch(url,{
        method:'GET'
    }).then(data => {
        return data.json().then(object => {
            const trends = object.data.klines;
            const data:CandlestickChartData = {
                candlestick:[],
                volume:[],
                date:[],
                symbol:object.data.code
            };
            for (const key in trends) {
                const item = trends[key].toString().split(',');
                data.date.push(item[0])
                data.candlestick.push([
                    parseFloat(item[1]),
                    parseFloat(item[2]),
                    parseFloat(item[4]),
                    parseFloat(item[3]),
                    parseInt(item[5]),
                ])
                data.volume.push([
                    parseInt(key),
                    parseInt(item[5]),
                    parseFloat(item[1]) > parseFloat(item[2]) ? 1 : -1
                ])
            }

            return data
        });
    })
}

export async function tick_candlestick_chart(params:Tickchart):Promise<CandlestickChartData | undefined>{
    const url = `https://push2his.eastmoney.com/api/qt/stock/trends2/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58&ndays=1&secid=${params.market}.${params.symbol}`
    return fetch(url,{
        method:'GET'
    }).then(data => {
        return data.json().then(object => {
            const trends = object.data.trends;
            const data:CandlestickChartData = {
                candlestick:[],
                volume:[],
                date:[],
                symbol:object.data.code
            };
            for (const key in trends) {
                const item = trends[key].toString().split(',');
                data.date.push(item[0])
                data.candlestick.push([
                    parseFloat(item[1]),
                    parseFloat(item[2]),
                    parseFloat(item[4]),
                    parseFloat(item[3]),
                    parseInt(item[5]),
                ])
                data.volume.push([
                    parseInt(key),
                    parseInt(item[5]),
                    parseFloat(item[1]) > parseFloat(item[2]) ? 1 : -1
                ])
            }
            return data
        });
    })
}

export default {
    tick_candlestick_chart,
    long_candlestick_chart,
    get_stock_info,
}