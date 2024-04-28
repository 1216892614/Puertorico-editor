#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::AppHandle;

#[allow(unused_imports)]
use tauri::Manager;
#[allow(unused_imports)]
use window_vibrancy::*;

#[tauri::command]
#[allow(unreachable_code)]
fn get_platform() -> String {
    #[cfg(target_os = "windows")]
    return "windows".to_string();

    #[cfg(target_os = "macos")]
    return "macos".to_string();

    #[cfg(target_os = "linux")]
    return "linux".to_string();

    return "other".to_string();
}

#[tauri::command]
#[allow(unreachable_code, unused_variables)]
fn dark_mode(is_dark_mode: bool, app: AppHandle) {
    #[allow(unused_variables)]
    let window = app.get_window("main").unwrap();

    #[cfg(target_os = "windows")]
    if let Ok(()) = window_vibrancy::apply_mica(&window, Some(is_dark_mode)) {
        return;
    }

    #[cfg(target_os = "windows")]
    if let Ok(()) = window_vibrancy::apply_acrylic(&window, Some((0, 0, 0, 125))) {
        return;
    }

    #[cfg(target_os = "windows")]
    window_vibrancy::apply_blur(&window, Some((0, 0, 0, 125)))
        .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[allow(unused_variables)]
            let window = app.get_window("main").unwrap();

            #[cfg(target_os = "macos")]
            window_vibrancy::apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            if let Ok(()) = window_vibrancy::apply_mica(&window, None) {
                return Ok(());
            }

            #[cfg(target_os = "windows")]
            if let Ok(()) = window_vibrancy::apply_acrylic(&window, Some((255, 255, 255, 125))) {
                return Ok(());
            }

            #[cfg(target_os = "windows")]
            window_vibrancy::apply_blur(&window, Some((255, 255, 255, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![dark_mode, get_platform])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
