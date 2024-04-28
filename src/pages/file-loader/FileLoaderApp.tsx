import { open, save } from "@tauri-apps/api/dialog";

import React, { useRef } from "react";
import {
    FolderGit2Icon,
    FolderOpenIcon,
    FolderPlusIcon,
    GitMergeIcon,
} from "lucide-react";
import FileLoadAside from "@/components/FileLoadAside";

const FileLoaderApp: React.FC = () => {
    const createHandler = async () => {
        const files = await save({ title: "选择创建仓库路径" });

        console.log(files);
    };

    const openHandler = async () => {
        const files = await open({ title: "打开已有仓库", directory: true });

        console.log(files);
    };

    const cloneDialogRef = useRef<HTMLDialogElement>(null);

    return (
        <main className="w-full h-full flex flex-row">
            <FileLoadAside />

            <div className="w-full h-full flex flex-row items-center justify-center pb-11 font-[sarasa-regular]">
                <button
                    onClick={createHandler}
                    className="btn btn-square btn-ghost flex flex-col w-[100px] h-[100px] m-5"
                >
                    <FolderPlusIcon strokeWidth={1} className="h-14 w-14" />
                    <span>创建仓库</span>
                </button>

                <button
                    onClick={openHandler}
                    className="btn btn-square btn-ghost font-[sarasa-semibold] flex flex-col w-[100px] h-[100px] m-5"
                >
                    <FolderOpenIcon strokeWidth={1} className="h-14 w-14" />
                    <span>打开本地仓库</span>
                </button>

                <button
                    onClick={() => cloneDialogRef.current?.showModal()}
                    className="btn btn-square btn-ghost flex flex-col w-[100px] h-[100px] m-5"
                >
                    <FolderGit2Icon strokeWidth={1} className="h-14 w-14" />
                    <span>克隆Git仓库</span>
                </button>

                <dialog
                    ref={cloneDialogRef}
                    onClick={() => cloneDialogRef.current?.close()}
                    className="modal"
                >
                    <div
                        onClick={(evt) => evt.stopPropagation()}
                        className="modal-box bg-base-200"
                    >
                        <h3 className="font-bold text-lg flex flex-row items-center">
                            <GitMergeIcon className="mr-2 w-5 h-5" />
                            克隆远程 git 仓库
                        </h3>

                        <input
                            type="text"
                            placeholder="Git 仓库地址"
                            className="input input-bordered w-full my-5"
                        />

                        <div className="flex flex-row items-center">
                            <input type="checkbox" className="checkbox mr-2" />

                            <span>递归</span>
                        </div>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-ghost mr-2">
                                    取消
                                </button>
                                <button className="btn btn-primary">
                                    确定
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </main>
    );
};

export default FileLoaderApp;
