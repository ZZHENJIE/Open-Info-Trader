import { fetch } from "@tauri-apps/plugin-http";

export async function wallstreetcn_event_calendar(start?: number, end?: number) {
    const url = `https://api-one-wscn.awtmt.com/apiv1/finance/macrodatas?start=${start}&end=${end}`;

    return fetch(url, {
        method: 'GET'
    }).then(data => {
        return data.json().then(json => {
            return json.data.items;
        });
    })
}

export interface IPO_Item {
    Company: string,
    Symbol: string,
    Managers: string,
    Shares: string,
    Price_High: string,
    Price_Low: string,
    Volume: string,
    Expected_Date: string
};

export async function ipooscoop_calendar() {
    const url = `https://www.iposcoop.com/ipo-calendar/`;
    return fetch(url, {
        method: 'GET'
    }).then(data => {
        return data.text().then(html => {

            const Data = [];
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const xpath = "//*[@id='main-content']/div[@class='row container']/div/div/table/tbody/tr";
            const rows = doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            for (let i = 0; i < rows.snapshotLength; i++) {
                const row = rows.snapshotItem(i);

                if (row === null) continue;

                const company = doc.evaluate("td[1]/a", row, null, XPathResult.STRING_TYPE, null).stringValue;
                const symbol = doc.evaluate("td[2]/a", row, null, XPathResult.STRING_TYPE, null).stringValue;
                const managers = doc.evaluate("td[3]", row, null, XPathResult.STRING_TYPE, null).stringValue;
                const shares = doc.evaluate("td[4]", row, null, XPathResult.STRING_TYPE, null).stringValue;
                const priceLow = doc.evaluate("td[5]", row, null, XPathResult.STRING_TYPE, null).stringValue;
                const priceHigh = doc.evaluate("td[6]", row, null, XPathResult.STRING_TYPE, null).stringValue;
                const volume = doc.evaluate("td[7]", row, null, XPathResult.STRING_TYPE, null).stringValue;
                const expectedDate = doc.evaluate("td[8]", row, null, XPathResult.STRING_TYPE, null).stringValue;

                Data.push({
                    Company: company,
                    Symbol: symbol,
                    Managers: managers,
                    Shares: shares,
                    Price_Low: priceLow,
                    Price_High: priceHigh,
                    Volume: volume,
                    Expected_Date: expectedDate
                });
            }

            return Data;
        })
    })
}

export default {
    wallstreetcn_event_calendar,
    ipooscoop_calendar,
}