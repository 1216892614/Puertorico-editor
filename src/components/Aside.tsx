import {
    CloudIcon,
    ContainerIcon,
    GithubIcon,
    ScreenShareIcon,
} from "lucide-react";

const Aside = () => (
    <aside className="menu h-full w-1/5 min-w-[230px] flex-nowrap overflow-x-hidden overflow-y-auto font-[sarasa-regular]">
        <h2 className="menu-title font-[sarasa-semibold]">远程连接</h2>

        <li className="w-full">
            <a>
                <ScreenShareIcon strokeWidth={1} /> WSL2
            </a>
        </li>

        <li className="w-full">
            <a>
                <CloudIcon strokeWidth={1} /> Puertorico Cloud
                <div className="badge badge-warning gap-2">Beta</div>
            </a>
        </li>

        <li className="w-full">
            <a>
                <GithubIcon strokeWidth={1} /> Github Code Space
                <div className="badge badge-warning gap-2">Beta</div>
            </a>
        </li>

        <li className="w-full">
            <a>
                <ContainerIcon strokeWidth={1} /> Docker Code Space
                <div className="badge badge-warning gap-2">Beta</div>
            </a>
        </li>

        <h2 className="menu-title font-[sarasa-semibold]">打开过的仓库</h2>

        <li className="w-full">
            <a className="w-full flex flex-col items-start">
                <div className="w-full font-[sarasa-semibold] text-md flex flex-row justify-between">
                    test-lib
                </div>
                <div className="w-full text-secondary text-nowrap truncate text-sm">
                    C:/User/Nerd/Documents/test-lib
                </div>
            </a>
        </li>

        <li className="w-full">
            <a className="w-full flex flex-col items-start">
                <div className="w-full font-[sarasa-semibold] text-md flex flex-row justify-between">
                    test-lib
                    <ScreenShareIcon strokeWidth={1} className="w-4 h-4 ml-1" />
                </div>
                <div className="w-full text-secondary text-nowrap truncate text-sm">
                    WSL2://home/Nerd/Code/test-lib
                </div>
            </a>
        </li>
    </aside>
);

export default Aside;
