import { LineChart } from "lucide-react";
import { useState } from "react";
import { LinkComponent, LinkComponentLg } from "./Sidenavbar";
import { CursorArrowRaysIcon } from "@heroicons/react/20/solid";
import { urlRoutes } from "@/utils/urlRoutes";
import { VscChevronUp, VscSymbolMethod } from "react-icons/vsc";

export default function AdvanceOptionsNav() {
    const [optionOpen, setOptionOpen] = useState(false);
    const route = [
        {
            title: "Advance Settings",
            icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
            route: urlRoutes.ADVANCE_SETTINGS,
        },
        {
            title: "Integrations",
            icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
            route: urlRoutes.INTEGRATIONS,
        },
    ];
    return (
        <>
            <div
                onClick={() => setOptionOpen(!optionOpen)}
                className="mx-[-0.65rem] cursor-pointer flex items-center gap-4 rounded-xl px-3 py-2 soft-bg-hover "
            >
                <VscSymbolMethod size={20} />
                Advance options
                <VscChevronUp
                    className={`${
                        optionOpen ? "rotate-180" : " rotate-0 "
                    } transition-all duration-500`}
                    size={20}
                />
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
