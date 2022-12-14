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
mod activities;
use std::collections::HashMap;

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

#[tauri::command] 
fn activities() -> activities::Response {
    println!("activities command invoked");
    activities::get_activities()
} 

#[tauri::command]
fn read_today_activities() -> HashMap<String,u32> {
    activities::read_today_log()
}

fn main() {

    // read today activity log


    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, birthdays, ip,activities, read_today_activities])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
