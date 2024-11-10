
mod cboe;
mod plugin;
mod futu;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            cboe::cboe_book_viewer,
            plugin::open_url,
            futu::futu_screener,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
