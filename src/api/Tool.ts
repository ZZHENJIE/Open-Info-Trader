import { fetch } from "@tauri-apps/plugin-http";

export async function taobao_timestamp() {
    const url = `https://acs.m.taobao.com/gw/mtop.common.getTimestamp/`;

    return fetch(url,{
        method:'GET'
    }).then(data => {
        return data.json();
    })
}

export default{
    taobao_timestamp
}