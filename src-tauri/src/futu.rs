use tauri_plugin_http::reqwest::{
    self,
    Url,
    Client,
    cookie::Jar,
    header::{
        HeaderName,
        HeaderValue,
        HeaderMap
    }
};
use std::sync::Arc;

#[tauri::command]
pub async fn futu_screener(quotetoken:&str,body:&str,) -> Result<String,String> {

    let jar = Arc::new(Jar::default());
    
    let url = Url::parse("https://www.futunn.com").unwrap();
    
    jar.add_cookie_str("csrfToken=1", &url);

    let client = Client::builder()
        .cookie_provider(Arc::clone(&jar))
        .build()
        .unwrap();
    
    let mut headers = HeaderMap::new();

    headers.insert(
        HeaderName::from_static("futu-x-csrf-token"),
        HeaderValue::from_static("1")
    );

    headers.insert(
        HeaderName::from_static("quote-token"),
        HeaderValue::from_str(quotetoken).unwrap(),
    );

    headers.insert(
        HeaderName::from_static("content-type"),
        HeaderValue::from_static("application/json")
    );

    let response = match client.post("https://www.futunn.com/quote-api/quote-v2/get-screener-list")
        .headers(headers)
        .body(body.to_string())
        .send()
        .await{
        Ok(value) => if value.status() == reqwest::StatusCode::OK {
                value
            }else{
                return Err("The request returns a code exception".to_string());
            },
        Err(err) => {
            return Err(err.to_string())
        }
    };

    let source_string = match response.text().await {
        Ok(text) => text,
        Err(err) => return Err(err.to_string())
    };

    Ok(source_string)

}