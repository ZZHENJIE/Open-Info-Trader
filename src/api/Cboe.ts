import { invoke } from '@tauri-apps/api/core';

export async function book_viewer(channel:string,symbol?:string) {
    return invoke('cboe_book_viewer',{
        channel:channel,
        symbol:symbol
    }).then((data:any) => {
        return JSON.parse(data).data;
    });
}

export default{
    book_viewer
}