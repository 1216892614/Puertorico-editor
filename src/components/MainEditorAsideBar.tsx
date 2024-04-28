import React from "react";
import {
    BlocksIcon,
    FilesIcon,
    GitMergeIcon,
    SearchIcon,
    SettingsIcon,
    WaypointsIcon,
    ZapIcon,
} from "lucide-react";
import { useAtomValue } from "jotai";
import { isAsideBarToggleA } from "@/pages/main-editor/HeaderBarInner";

const AsideBarTopHalfKit = [
    {
        name: "文件资源管理",
        icon: <FilesIcon />,
    },
    {
        name: "全局搜索",
        icon: <SearchIcon />,
    },
    {
        name: "Git",
        icon: <GitMergeIcon />,
    },
    {
        name: "关系图",
        icon: <WaypointsIcon />,
    },
];

const AsideBarBottomHalfKit = [
    {
        name: "快捷动作",
        icon: <ZapIcon />,
    },
    {
        name: "插件",
        icon: <BlocksIcon />,
    },
    {
        name: "设置",
        icon: <SettingsIcon />,
    },
];

const MainEditorAsideBar: React.FC = () => {
    const isAsideBarToggle = useAtomValue(isAsideBarToggleA);

    return (
        isAsideBarToggle && (
            <>
                <div className="menu h-full min-w-[63px] w-[63px] bg-primary-content" />

                {AsideBarTopHalfKit.map(({ name, icon }, idx) => (
                    <div
                        className="tooltip tooltip-right absolute p-0 before:ml-2 after:hidden"
                        style={{ left: 8, top: idx * 60 + 75 }}
                        data-tip={name}
                    >
                        <div className="btn btn-ghost btn-square p-0 flex justify-center items-center py-3 mb-2">
                            {icon}
                        </div>
                    </div>
                ))}

                {AsideBarBottomHalfKit.map(({ name, icon }, idx, arr) => (
                    <div
                        className={`tooltip tooltip-right absolute p-0 before:ml-2 after:hidden`}
                        style={{
                            left: 8,
                            bottom: (arr.length - idx - 1) * 60 + 12,
                        }}
                        data-tip={name}
                    >
                        <div className="btn btn-ghost btn-square p-0 flex justify-center items-center py-3 mb-2">
                            {icon}
                        </div>
                    </div>
                ))}
            </>
        )
    );
};

export default MainEditorAsideBar;
