use tauri_plugin_http::reqwest::{Client};
use tauri_plugin_http::reqwest;
use tauri::http::{HeaderName,HeaderValue,HeaderMap};

#[tauri::command]
pub async fn cboe_book_viewer(channel:&str,symbol: &str,) -> Result<String,String> {

    let mut headers = HeaderMap::new();
    headers.insert(
        HeaderName::from_static("referer"),
        HeaderValue::from_static("https://www.cboe.com/us/equities/market_statistics/book_viewer/"),
    );

    let client = Client::new();

    let url = format!("https://www.cboe.com/json/{}/book/{}",channel,symbol);

    let response = match client.get(url)
        .headers(headers)
        .send()
        .await{
        Ok(value) => if value.status() == reqwest::StatusCode::OK {
                value
            }else{
                return Err("The request returns a code exception".to_string());
            },
        Err(err) => return Err(err.to_string())
    };

    let source_string = match response.text().await {
        Ok(text) => text,
        Err(err) => return Err(err.to_string())
    };

    Ok(source_string)

}