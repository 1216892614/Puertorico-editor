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

export const isAsideBarToggleA = atom(true);

export const platformA = atom<"linux" | "windows" | "macos" | "other" | null>(
    null
);

const lightModeAtom = atomWithStorage("darkMode", true);

const Header: React.FC<{ type?: "file-loader" }> = ({ type }) => {
    const [isAsideBarToggle, setIsAsideBarToggle] = useAtom(isAsideBarToggleA);

    const [lightMode, setLightMode] = useAtom(lightModeAtom);

    useEffect(() => {
        document.body.classList.toggle("dark", !lightMode);

        invoke("dark_mode", { isDarkMode: !lightMode });
    }, [lightMode]);

    const [platform, setPlatform] = useAtom(platformA);

    useEffect(() => {
        invoke<typeof platform>("get_platform")
            .then(setPlatform)
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (platform === "linux" || platform === "other") {
            document.documentElement.classList.toggle("bg-transparent", false);
            document.body.classList.toggle("bg-transparent", false);
            return;
        }
    }, [platform]);

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
            {type !== "file-loader" && (
                <div
                    className={`h-[64px] w-[63px] ${
                        isAsideBarToggle
                            ? "bg-primary-content"
                            : "bg-primary-content/20"
                    } flex items-center justify-center mr-5`}
                >
                    <button
                        onClick={() => setIsAsideBarToggle(!isAsideBarToggle)}
                        className="btn btn-square btn-md btn-ghost"
                    >
                        <MenuIcon />
                    </button>
                </div>
            )}

            <label
                className={`swap swap-rotate btn btn-square btn-ghost btn-sm ${
                    type !== "file-loader" ? "mr-2" : "mx-5"
                }`}
            >
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

            {type !== "file-loader" && (
                <>
                    <button className="btn btn-square btn-ghost btn-sm mr-2">
                        <PanelLeft />
                    </button>
                    <button className="btn btn-square btn-ghost btn-sm mr-2">
                        <PanelBottom />
                    </button>
                    <button className="btn btn-square btn-ghost btn-sm mr-5">
                        <PanelRight />
                    </button>{" "}
                </>
            )}

            {type !== "file-loader" ? (
                <>
                    <div className="flex-1" />

                    <button className="btn btn-square btn-ghost btn-sm mr-1">
                        <MoveLeftIcon className="w-[20px] h-[20px]" />
                    </button>

                    <button className="btn btn-square btn-ghost btn-sm mr-2">
                        <MoveRightIcon className="w-[20px] h-[20px]" />
                    </button>

                    <label className="input input-bordered input-sm flex items-center justify-center w-1/3">
                        <SearchIcon className="w-4 h-4 text-secondary" />
                        <input
                            type="text"
                            placeholder="text-lib"
                            className="grow ml-2"
                        />
                        <kbd className="kbd kbd-xs">ctrl</kbd>+
                        <kbd className="kbd kbd-xs">p</kbd>
                    </label>
                </>
            ) : (
                <>
                    <div className="flex-1" />

                    <h1 className="font-[sarasa-semibold] text-md mx-2 font-bold select-none">
                        打开文件
                    </h1>
                </>
            )}

            <div className="flex-1" />

            {type !== "file-loader" && (
                <button className="titlebar-button btn btn-md btn-ghost flex flex-row items-center justify-between w-[160px] p-1 mr-2">
                    <div className="w-[104px] truncate">Nerd_hnd</div>

                    <div className="indicator">
                        <span className="indicator-item badge badge-secondary badge-success badge-xs right-[1px] top-[1px]"></span>
                        <div className="avatar w-[38px] h-[38px]">
                            <div className="rounded">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                </button>
            )}

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

export default Header;
