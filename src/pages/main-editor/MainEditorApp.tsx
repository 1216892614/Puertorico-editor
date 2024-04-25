import React from "react";
import {
    BlocksIcon,
    FilePlus2Icon,
    FileTextIcon,
    FilesIcon,
    GitMergeIcon,
    SearchIcon,
    SettingsIcon,
    WaypointsIcon,
    ZapIcon,
} from "lucide-react";

const FileLoaderApp: React.FC = () => {
    return (
        <main className="w-full h-full flex flex-row">
            <aside className="menu h-full min-w-[63px] w-[63px] bg-primary-content flex-nowrap overflow-hidden font-[sarasa-regular]">
                <li>
                    <a className="p-0 flex justify-center items-center py-3 mb-2">
                        <FilesIcon />
                    </a>
                </li>

                <li>
                    <a className="p-0 flex justify-center items-center py-3 mb-2">
                        <SearchIcon />
                    </a>
                </li>

                <li>
                    <a className="p-0 flex justify-center items-center py-3 mb-2">
                        <GitMergeIcon />
                    </a>
                </li>

                <li>
                    <a className="p-0 flex justify-center items-center py-3 mb-2">
                        <WaypointsIcon />
                    </a>
                </li>

                <div className="flex-1" />

                <li>
                    <a className="p-0 flex justify-center items-center py-3 mb-2">
                        <ZapIcon />
                    </a>
                </li>

                <li>
                    <a className="p-0 flex justify-center items-center py-3 mb-2">
                        <BlocksIcon />
                    </a>
                </li>

                <li>
                    <a className="p-0 flex justify-center items-center py-3 mb-2">
                        <SettingsIcon />
                    </a>
                </li>
            </aside>

            <div className="w-full h-full flex flex-row items-center justify-center pb-11 font-[sarasa-regular]">
                <button className="btn btn-square btn-ghost font-[sarasa-semibold] flex flex-col w-[160px] h-[80px] p-2 m-5">
                    <FilePlus2Icon strokeWidth={1} className="h-14 w-14" />
                    <div>
                        创建文件
                        <div className="mt-2">
                            <kbd className="kbd kbd-sm">ctrl</kbd>+
                            <kbd className="kbd kbd-sm">n</kbd>
                        </div>
                    </div>
                </button>

                <button className="btn btn-square btn-ghost flex flex-col w-[160px] h-[80px] p-2 m-5">
                    <FileTextIcon strokeWidth={1} className="h-14 w-14" />
                    <div>
                        打开文件
                        <div className="mt-2">
                            <kbd className="kbd kbd-sm">ctrl</kbd>+
                            <kbd className="kbd kbd-sm">o</kbd>
                        </div>
                    </div>
                </button>
            </div>
        </main>
    );
};

export default FileLoaderApp;
