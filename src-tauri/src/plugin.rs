use std::process::Command;

pub fn get_platform_command() -> String {
    
    let os_name = sysinfo::System::name().unwrap().to_lowercase();
    
    if os_name.contains("windows") {
        "start".to_string()
    } else if os_name.contains("linux") {
        "xdg-open".to_string()
    } else if os_name.contains("macos") || os_name.contains("darwin") {
        "open".to_string()
    } else {
        "".to_string()
    }
}

#[tauri::command]
pub fn open_url(url:String) {
    if let Err(e) = Command::new(get_platform_command()).arg(url).spawn() {
        eprintln!("Failed to open URL: {}", e);
    }
}