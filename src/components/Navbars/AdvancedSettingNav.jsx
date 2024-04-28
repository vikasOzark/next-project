import { LineChart } from "lucide-react";
import { useState } from "react";
import { LinkComponent, LinkComponentLg } from "./Sidenavbar";
import { CursorArrowRaysIcon } from "@heroicons/react/20/solid";
import { urlRoutes } from "@/utils/urlRoutes";

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
                Advance options
            </div>
            <div
                data-state={optionOpen}
                className=" hidden data-[state=true]:block"
            >
                {route.map((route) => (
                    <div
                        key={route.title}
                        className=" border-s border-gray-600 ps-1"
                    >
                        <LinkComponentLg linkObject={route} />
                    </div>
                ))}
            </div>
        </>
    );
}
