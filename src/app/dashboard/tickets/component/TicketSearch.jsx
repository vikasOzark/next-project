"use client";

import { VscClose, VscSearch } from "react-icons/vsc";
import { useSearchParams, useRouter } from "next/navigation";
import { useRef } from "react";

export default function TicketSearch({ searchName }) {
    const search = useSearchParams();
    const searchRef = useRef(null);
    const queryParams = new URLSearchParams(search);
    const router = useRouter();
    const searchValue = search.get(searchName);

    const handlerClear = () => {
        queryParams.delete(searchName);
        router.push("?" + queryParams.toString());
        searchRef.current.value = "";
    };

    const queryCheck = queryParams.get(searchName);
    if (queryCheck === "") {
        handlerClear();
    }

    const handleQuery = (event) => {
        const query = event.target.value;
        queryParams.set(searchName, query);
        router.push("?" + queryParams.toString());
    };

    return (
        <>
            {" "}
            <div className="">
                <div className="bg-gray-700 flex items-center px-3 rounded-full ">
                    <input
                        ref={searchRef}
                        type="text"
                        defaultValue={searchValue || ""}
                        onChange={handleQuery}
                        className="w-full p-2 px-3 text-white focus:outline-none bg-transparent rounded-full"
                        placeholder="Search"
                    />
                    {queryCheck ? (
                        <VscClose
                            className="hover:cursor-pointer"
                            onClick={handlerClear}
                            size={25}
                            color="white"
                        />
                    ) : (
                        <VscSearch
                            className="hover:cursor-pointer"
                            size={25}
                            color="white"
                        />
                    )}
                </div>
            </div>
        </>
    );
}
