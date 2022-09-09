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

#[tauri::command]
fn birthdays() -> birthday::Response {
    println!("birthdays");
    let res = birthday::readBirthdays();
    println!("{:?}", res);
    return res;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, birthdays])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
