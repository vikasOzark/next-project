import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
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

export function FilterByCreation() {
    const search = useSearchParams();
    const query = new URLSearchParams(search);
    const [modified, setModified] = useState({});
    const newStatusObject = { ...Status };
    newStatusObject.all = "all";

    const sorting = query.get("sort");
    const router = useRouter();

    /**
     * This effect check is any search param is changed or not if changed then add to modified state
     */
    useEffect(() => {
        const sorting = query.get("sort");
        const filter = query.get("filter");
        const order = query.get("order");

        let check = {};
        if (sorting !== "asc" && sorting) {
            check.sort = sorting;
        }

        if (filter !== "all" && filter) {
            check.filter = filter;
        }

        if (order !== "desc" && order) {
            check.order = order;
        }
        if (query.toString()) {
            setModified(check);
        }
    }, []);

    /**
     * This method is used reset search string if modified or remove from the search url.
     * @param {Boolean} all To reset all at once
     * @param {String} resetName Individual reset search param
     */
    const handleSearchReset = (all, resetName = null) => {
        if (all) {
            query.set("order", "desc");
            query.set("sort", "asc");
            query.set("filter", "all");
            router.push(`?${query.toString()}`);
            setModified({});
            return;
        }

        const modifiedCopy = { ...modified };
        delete modifiedCopy[resetName];
        setModified(modifiedCopy);
    };

    const handleOrderBy = (order) => {
        query.set("order", order);
        router.push(`?${query.toString()}`);
        setModified({ ...modified, ["order"]: order });
    };

    /**
     * @param {String} sortType
     */
    const handleSort = (sortType) => {
        query.set("sort", sortType);
        router.push(`?${query.toString()}`);
        setModified({ ...modified, ["sort"]: sortType });
    };

    const handleFilter = (filter) => {
        query.set("filter", filter);
        router.push(`?${query.toString()}`);
        setModified({ ...modified, ["filter"]: filter });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className={twMerge(
                            "px-4 flex gap-2 bg-transparent rounded-full items-center text-gray-300 font-bold hover:bg-gray-600",
                            ""
                        )}
                    >
                        <VscFilter size={18} />
                        <span className="hidden lg:block md:block">Filter</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#666974] text-white border-gray-400">
                    <DropdownMenuLabel>Filter</DropdownMenuLabel>

                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger
                                className={"gap-2 hover:bg-gray-700"}
                            >
                                <VscListFilter size={20} /> Order by creation
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent
                                    className={
                                        "bg-[#666974] border-gray-400 text-white"
                                    }
                                >
                                    <DropdownMenuItem
                                        className={" cursor-pointer"}
                                        onClick={() => handleOrderBy("desc")}
                                    >
                                        New to old
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className={" cursor-pointer"}
                                        onClick={() => handleOrderBy("asc")}
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
                                className={"gap-2"}
                                onClick={() => handleSort("asc")}
                            >
                                <AiOutlineSortAscending size={20} /> Title Asc
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem
                                className={"gap-2"}
                                onClick={() => handleSort("desc")}
                            >
                                <AiOutlineSortDescending size={20} /> Title Desc
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuGroup>

                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger
                                size={20}
                                className={"gap-2"}
                            >
                                <CgReorder />
                                Filter by Status
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent
                                    className={
                                        "bg-[#666974] border-gray-400 text-white"
                                    }
                                >
                                    {Object.entries(newStatusObject).map(
                                        (status) => (
                                            <DropdownMenuItem
                                                className={"mb-1"}
                                                onClick={() =>
                                                    handleFilter(status[0])
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
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex gap-2">
                {Object.entries(modified).map((item) => (
                    <>
                        <div className="text-white border border-gray-600 flex gap-2 items-center justify-between rounded-full  px-4">
                            {item[0]} {" : "} {item[1]}{" "}
                            <VscChromeClose
                                className=" hover:bg-gray-100 hover:text-black rounded-full h-5 p-[1px] cursor-pointer w-5"
                                onClick={() =>
                                    handleSearchReset(false, item[0])
                                }
                            />{" "}
                        </div>
                    </>
                ))}
                {Object.keys(modified).length > 0 && (
                    <div className="text-white border border-gray-600 flex gap-2 items-center justify-between rounded-full  px-4">
                        Reset
                        <VscChromeClose
                            className=" hover:bg-gray-100 hover:text-black rounded-full h-5 p-[1px] cursor-pointer w-5"
                            onClick={() => handleSearchReset(true)}
                        />{" "}
                    </div>
                )}
            </div>
        </>
    );
}

export function DropdownMenuDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Keyboard shortcuts
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Invite users
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
