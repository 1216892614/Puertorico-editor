// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::AppHandle;

#[allow(unused_imports)]
use tauri::Manager;
#[allow(unused_imports)]
use window_vibrancy::*;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn dark_mode(is_dark_mode: bool, app: AppHandle) {
    #[allow(unused_variables)]
    let window = app.get_window("main").unwrap();

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    if let Ok(()) = window_vibrancy::apply_mica(&window, Some(is_dark_mode)) {
        return;
    }

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    if let Ok(()) = window_vibrancy::apply_acrylic(&window, Some((0, 0, 0, 125))) {
        return;
    }

    // 仅在 windows 下执行
    #[cfg(target_os = "windows")]
    window_vibrancy::apply_blur(&window, Some((0, 0, 0, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[allow(unused_variables)]
            let window = app.get_window("main").unwrap();

            // 仅在 macOS 下执行
            #[cfg(target_os = "macos")]
            window_vibrancy::apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            // 仅在 windows 下执行
            #[cfg(target_os = "windows")]
            if let Ok(()) = window_vibrancy::apply_mica(&window, None) {
                return Ok(());
            }

            // 仅在 windows 下执行
            #[cfg(target_os = "windows")]
            if let Ok(()) = window_vibrancy::apply_acrylic(&window, Some((255, 255, 255, 125))) {
                return Ok(());
            }

            // 仅在 windows 下执行
            #[cfg(target_os = "windows")]
            window_vibrancy::apply_blur(&window, Some((255, 255, 255, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![dark_mode])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
