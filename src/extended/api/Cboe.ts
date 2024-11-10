import { invoke } from '@tauri-apps/api/core';

export interface OrderItem {
    Size: number,
    Price: string
}

export async function book_viewer(channel:string,units:Function,symbol?:string):Promise<undefined | {
    "timestamp":string,
    "buy":OrderItem[],
    "sell":OrderItem[]
}>{
    return invoke('cboe_book_viewer',{
        channel:channel,
        symbol:symbol
    }).then((data:any) => {

        const json = JSON.parse(data).data;

        const list = {
            "buy":[] as OrderItem[],
            "sell":[] as OrderItem[]
        };

        for (const Item of json.bids) {
            list.buy.push({
                Size: units(Item[0]),
                Price: Item[1].toString()
            })
        }
        for (const Item of json.asks) {
            list.sell.push({
                Size: units(Item[0]),
                Price: Item[1].toString()
            })
        }

        return {
            "timestamp":json.timestamp,
            "buy":list.buy,
            "sell":list.sell
        };
    });
}

export default{
    book_viewer
}