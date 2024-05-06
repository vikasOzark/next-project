import { useState } from "react";
import { LinkComponentLg, useNavActive } from "./Sidenavbar";
import { urlRoutes } from "@/utils/urlRoutes";
import {
    VscChevronUp,
    VscExtensions,
    VscGear,
    VscSymbolMethod,
} from "react-icons/vsc";
import { usePathname } from "next/navigation";

export default function AdvanceOptionsNav() {
    const [optionOpen, setOptionOpen] = useState(false);
    const path = usePathname().split("/");
    const current = path[path.length - 1];

    const route = [
        {
            title: "Advance Settings",
            icon: <VscGear className="h-5 w-5" title="hello" />,
            route: urlRoutes.ADVANCE_SETTINGS,
            active: current === "advance-settings",
        },
        {
            title: "Integrations",
            icon: <VscExtensions className="h-5 w-5" title="hello" />,
            route: urlRoutes.INTEGRATIONS,
            active: current === "integrations",
        },
    ];
    return (
        <>
            <div
                onClick={() => setOptionOpen(!optionOpen)}
                className="mx-[-0.65rem] cursor-pointer justify-between flex items-center gap-4 rounded-xl px-3 py-2 soft-bg-hover "
            >
                <span className="flex items-center gap-4 ">
                    <VscSymbolMethod size={20} />
                    Advance options
                </span>
                <span className="p-1">
                    <VscChevronUp
                        className={`${
                            optionOpen ? "rotate-180" : " rotate-0 "
                        } transition-all duration-500`}
                        size={20}
                    />
                </span>
            </div>
            <div
                data-state={optionOpen}
                className=" hidden data-[state=true]:block duration-500 -top-3 transition-transform slide-in-from-top-0"
            >
                {route.map((route) => (
                    <div
                        key={route.title}
                        className=" border-s ms-[0.65rem] border-gray-600 ps-1"
                    >
                        <LinkComponentLg linkObject={route} />
                    </div>
                ))}
            </div>
        </>
    );
}
