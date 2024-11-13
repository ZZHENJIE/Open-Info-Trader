import { fetch } from "@tauri-apps/plugin-http";

export class Screener {
    private Parameter: string = '';
    constructor(baseurl: string) {
        this.SetParameter(baseurl);
    }
    SetParameter(baseurl: string) {
        const Parameter = new URLSearchParams(new URL(baseurl).search.slice(1));
        Parameter.set('v', '411')
        Parameter.delete('ar')
        this.Parameter = Parameter.toString();
    }
    async GetCount(): Promise<number> {
        return fetch('https://finviz.com/screener.ashx?' + this.Parameter).then(data => {
            return data.text().then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const xpath = "/html/body/div[2]/table/tbody/tr[4]/td/div/table/tbody/tr[7]/td/a";
                const rows = doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                return rows.snapshotLength === 1 ? 1 : rows.snapshotLength - 1;
            })
        })
    }
    async GetList(index: number): Promise<string[]> {
        const Url = this.Parameter + (index === 0 ? '' : ('&r=' + ((index * 1000) + 1)));
        return fetch('https://finviz.com/screener.ashx?' + Url).then(data => {
            return data.text().then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const xpath = "/html/body/div[2]/table/tbody/tr[4]/td/div/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr/td/span";
                const rows = doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                const list = [];
                for (let i = 0; i < rows.snapshotLength; i++) {
                    const row = rows.snapshotItem(i);
                    if (row?.textContent) {
                        list.push(row?.textContent.split(/[\t\r\f\n\s]*/g).join(''));
                    }
                }
                return list;
            })
        })
    }
}
