import { QUERY_KEYS } from "@/queryKeys";
import { Card } from "./ui/card";
import { useQuery } from "react-query";
import { getTagsList } from "@/app/dashboard/tickets/component/forms/utils";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { LoadingState } from "./Buttons";
import { EmptyState } from "./EmptyState";
import { useOnClickOutside } from "@/hooks/modalClose.hook";
import { VscCheckAll } from "react-icons/vsc";

export default function TagsCardComponent({
    onClick,
    className,
    selectedIds = [],
}) {
    const [query, setQuery] = useState("");
    const [isOpenState, setState] = useState(false);
    /**
     * @type {HTMLDivElement}
     */
    const dropdownRef = useRef(null);
    const { data: tags = [], isLoading } = useQuery({
        queryKey: [QUERY_KEYS.TAGS],
        queryFn: () => getTagsList({}),
        select: (data) => data.data,
        enabled: !!isOpenState,
    });

    const filtered_tags = tags.filter((tag) =>
        tag.title.toLowerCase().includes(query.toLowerCase())
    );

    useOnClickOutside({ ref: dropdownRef, handler: () => setState(false) });

    return (
        <div
            ref={dropdownRef}
            data-state={isOpenState ? "open" : "close"}
            className=" mb-2 data-[state=open]:transition-all "
        >
            <div
                onClick={() => setState((pre) => !pre)}
                className={cn(
                    "rounded-lg my-2 hover:border-gray-700 border border-transparent transition-all temp-card-bg",
                    className
                )}
            >
                <input
                    type="search tags"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search"
                    className="bg-transparent px-2md w-full focus:outline-none px-2 py-1"
                />
            </div>
            <div className="">
                <Card>
                    <div
                        data-state={isOpenState ? "open" : "close"}
                        className=" max-h-[15em] mt-2 temp-card-bg overflow-hidden overflow-y-auto rounded-md p-2 data-[state=close]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    >
                        {filtered_tags.map((tag) => {
                            return (
                                <div
                                    key={tag.id}
                                    onClick={() => onClick(tag)}
                                    className={cn(
                                        "px-1 mb-1 flex items-center justify-between cursor-pointer hover:border-gray-200 transition-all hover:border-2 border-2 border-transparent rounded-md ",
                                        tag.color
                                    )}
                                >
                                    {tag.title}
                                    {selectedIds?.includes(tag.id) && (
                                        <VscCheckAll size={15} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {!isLoading &&
                        isOpenState &&
                        filtered_tags.length === 0 && (
                            <EmptyState
                                className={"text-lg"}
                                size={32}
                                message={"No tags found."}
                            />
                        )}
                    {isLoading && isOpenState && (
                        <>
                            <div className="grid place-content-center items-center">
                                <LoadingState title={"Loading..."} />
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
}
