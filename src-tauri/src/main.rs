#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[tauri::command]
fn greet(name: &str) -> String {
    println!("greet");
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod birthday;
use local_ip_address::local_ip;

#[tauri::command]
fn birthdays() -> birthday::Response {
    println!("birthdays");
    let res = birthday::read_birthdays();
    println!("{:?}", res);
    return res;
}

#[tauri::command] 
fn ip() -> String {
    println!("ip");
    let ip = local_ip().unwrap();
    return ip.to_string();

}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, birthdays, ip])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
