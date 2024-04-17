import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Status } from "@prisma/client";
import { CgReorder } from "react-icons/cg";

import { useRouter, useSearchParams } from "next/navigation";
import {
    AiOutlineSortAscending,
    AiOutlineSortDescending,
} from "react-icons/ai";
import { VscChromeClose, VscFilter, VscListFilter } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import DropdownNew from "@/components/Dropdown/DropdownNew";

export function TicketFilter() {
    const search = useSearchParams();
    const query = new URLSearchParams(search);
    const newStatusObject = { ...Status };

    const sorting = query.get("sort");
    const router = useRouter();

    const handleFilter = (type, filter) => {
        if (query.has(type)) {
            query.delete(type);
        }
        query.set(type, filter);

        router.push(`?${query.toString()}`);
    };

    return (
        <>
            <DropdownNew icon={<VscFilter size={18} />} title={"Filter"}>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className={""}>
                            <span className="flex items-center gap-2">
                                <VscListFilter size={20} /> Order by create
                            </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleFilter("order", "desc")
                                    }
                                >
                                    New to old
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleFilter("order", "asc")}
                                >
                                    Old to new
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>

                <DropdownMenuGroup>
                    {sorting === "desc" ? (
                        <DropdownMenuItem
                            onClick={() => handleFilter("sort", "asc")}
                        >
                            <span className="flex items-center gap-2">
                                <AiOutlineSortAscending size={20} /> Title Asc
                            </span>
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            onClick={() => handleFilter("sort", "desc")}
                        >
                            <span className="flex items-center gap-2">
                                <AiOutlineSortDescending size={20} /> Title Desc
                            </span>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger size={20}>
                            <span className="flex items-center gap-2">
                                <CgReorder />
                                Filter by Status
                            </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                {Object.entries(newStatusObject).map(
                                    (status) => (
                                        <DropdownMenuItem
                                            className={"mb-1"}
                                            onClick={() =>
                                                handleFilter(
                                                    "status",
                                                    status[0]
                                                )
                                            }
                                            key={status[0]}
                                        >
                                            {status[1]}
                                        </DropdownMenuItem>
                                    )
                                )}
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownNew>
            <FilteredChips />
        </>
    );
}

const FilteredChips = () => {
    const searchParams = useSearchParams();
    const queryParams = new URLSearchParams(searchParams);
    const router = useRouter();

    const handlerClear = (searchName) => {
        queryParams.delete(searchName);
        router.push("?" + queryParams.toString());
    };
    const status = searchParams.get("status");
    const sort = searchParams.get("sort");
    const order = searchParams.get("order");

    return (
        <>
            <div className="flex gap-2">
                {status && (
                    <div className="text-white border border-gray-600 flex gap-2 items-center justify-between rounded-full  px-4">
                        STATUS : {status}
                        <VscChromeClose
                            className=" hover:bg-gray-100 hover:text-black rounded-full h-5 p-[1px] cursor-pointer w-5"
                            onClick={() => handlerClear("status")}
                        />{" "}
                    </div>
                )}
                {sort && (
                    <div className="text-white border border-gray-600 flex gap-2 items-center justify-between rounded-full  px-4">
                        SORT : {sort}
                        <VscChromeClose
                            className=" hover:bg-gray-100 hover:text-black rounded-full h-5 p-[1px] cursor-pointer w-5"
                            onClick={() => handlerClear("sort")}
                        />{" "}
                    </div>
                )}
                {order && (
                    <div className="text-white border border-gray-600 flex gap-2 items-center justify-between rounded-full  px-4">
                        ORDER : {order}
                        <VscChromeClose
                            className=" hover:bg-gray-100 hover:text-black rounded-full h-5 p-[1px] cursor-pointer w-5"
                            onClick={() => handlerClear("order")}
                        />{" "}
                    </div>
                )}
            </div>
        </>
    );
};
