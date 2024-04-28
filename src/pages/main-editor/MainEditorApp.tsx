import React from "react";
import { FilePlus2Icon, FileTextIcon } from "lucide-react";
import MainEditorAsideBar from "@/components/MainEditorAsideBar";

const FileLoaderApp: React.FC = () => {
    return (
        <main className="w-full h-full flex flex-row">
            <MainEditorAsideBar />

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
