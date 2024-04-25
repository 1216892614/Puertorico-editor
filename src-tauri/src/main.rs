// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{App, Manager};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .setup(init)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[allow(unused_imports)]
use window_vibrancy::{apply_blur, apply_mica, apply_vibrancy, NSVisualEffectMaterial};

pub fn init(app: &mut App) -> std::result::Result<(), Box<dyn std::error::Error>> {
    #[allow(unused_variables)]
    let window = app.get_window("main").unwrap();

    // 仅在 macOS 下执行
    #[cfg(target_os = "macos")]
    window_vibrancy::apply_vibrancy(&window, NSVisualEffectMaterial::FullScreenUI)
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    if let Ok(()) = window_vibrancy::apply_mica(&window, Some((18, 18, 18, 125))) {
        return Ok(());
    }

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    if let Ok(()) = window_vibrancy::apply_acrylic(&window, Some((18, 18, 18, 125))) {
        return Ok(());
    }

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    window_vibrancy::apply_blur(&window, Some((18, 18, 18, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

    Ok(())
}
