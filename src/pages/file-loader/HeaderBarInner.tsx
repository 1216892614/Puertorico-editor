import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";

import React, { useEffect, useRef, useState } from "react";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import {
    Copy,
    LanguagesIcon,
    MenuIcon,
    Minus,
    MoonIcon,
    MoveLeftIcon,
    MoveRightIcon,
    PanelBottom,
    PanelLeft,
    PanelRight,
    SearchIcon,
    Square,
    SunIcon,
    X,
} from "lucide-react";

const lightModeAtom = atomWithStorage("darkMode", true);

const App: React.FC = () => {
    const [lightMode, setLightMode] = useAtom(lightModeAtom);

    useEffect(() => {
        document.body.classList.toggle("dark", !lightMode);

        invoke("dark_mode", { isDarkMode: !lightMode });
    }, [lightMode]);

    const [isWindowMaximized, setIsWindowMaximized] = useState<boolean | null>(
        null
    );

    const clearListenFn = useRef<Awaited<
        ReturnType<WebviewWindow["onResized"]>
    > | null>(null);

    useEffect(() => {
        appWindow.isMaximized().then(setIsWindowMaximized);

        appWindow
            .onResized(() => {
                appWindow.isMaximized().then(setIsWindowMaximized);
            })
            .then((unFn) => (clearListenFn.current = unFn));

        return () => clearListenFn.current?.();
    }, []);

    return (
        <>
            <label className="swap swap-rotate btn btn-square btn-ghost btn-sm mx-5">
                <input
                    type="checkbox"
                    className="theme-controller"
                    value="RicoBright"
                    checked={lightMode}
                    onChange={(evt) => setLightMode(evt.target.checked)}
                />

                <MoonIcon className="swap-on" />

                <SunIcon className="swap-off" />
            </label>

            <details className="dropdown">
                <summary className="btn btn-square btn-ghost btn-sm mr-5">
                    <LanguagesIcon />
                </summary>

                <ul className="dropdown-content z-10 menu bg-base-200 p-2 shadow rounded-box w-52">
                    <li>
                        <a> 中文 (简体)</a>
                    </li>

                    <li>
                        <a>中文 (繁體)</a>
                    </li>

                    <li>
                        <a>日本語</a>
                    </li>

                    <li>
                        <a>English</a>
                    </li>
                </ul>
            </details>

            <div className="flex-1" />

            <h1 className="font-[sarasa-semibold] text-md mx-2 font-bold select-none">
                打开文件
            </h1>

            <div className="flex-1" />

            <button
                className="titlebar-button btn btn-square btn-ghost mr-2"
                id="titlebar-minimize"
                onClick={() => appWindow.minimize()}
            >
                <Minus className="w-[29px] h-[29px]" />
            </button>

            <button
                className="titlebar-button btn btn-square btn-ghost mr-2"
                id="titlebar-maximize"
                onClick={() => appWindow.toggleMaximize()}
            >
                {isWindowMaximized ? <Copy /> : <Square />}
            </button>

            <button
                className="titlebar-button btn btn-square btn-ghost mr-2"
                id="titlebar-close"
                onClick={() => appWindow.close()}
            >
                <X className="w-[29px] h-[29px]" />
            </button>
        </>
    );
};

export default App;
