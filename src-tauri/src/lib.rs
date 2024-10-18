use tauri::http::{HeaderName, HeaderValue,HeaderMap};
use tauri_plugin_http::reqwest;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
async fn cboe_book_viewer(channel:&str,symbol: &str,) -> Result<String,String> {

    let mut headers = HeaderMap::new();
    headers.insert(
        HeaderName::from_static("referer"),
        HeaderValue::from_static("https://www.cboe.com/us/equities/market_statistics/book_viewer/"),
    );

    let builder = reqwest::ClientBuilder::new();

    let client = builder.default_headers(headers).build().unwrap();

    let url = format!("https://www.cboe.com/json/{}/book/{}",channel,symbol);

    let response = match client.get(url).send().await{
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![cboe_book_viewer])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
