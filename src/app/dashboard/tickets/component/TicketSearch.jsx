"use client";

import { VscClose, VscSearch } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function TicketSearch({ setSearchQuery, queryTicketTitle }) {
    const search = useSearchParams();
    const queryParams = new URLSearchParams(search);
    const router = useRouter();
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handlerClear = () => {
        queryParams.delete("q");
        router.push("?" + queryParams.toString());
        setSearchQuery("");
    };

    useEffect(() => {
        const q = queryParams.get("q");
        console.log(q);
        if (q && q !== "") {
            setSearchQuery(q);
        }

        if (q === "" || q === null) {
            handlerClear();
        }
    }, []);

    const handleQuery = (event) => {
        const query = event.target.value;

        // Clear previous timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(
            setTimeout(() => {
                setSearchQuery(query);
                queryParams.set("q", query);
                router.push("?" + queryParams.toString());
            }, 500)
        );
    };

    return (
        <>
            {" "}
            <div className="">
                <div className="bg-gray-700 flex items-center px-3 rounded-full ">
                    <input
                        type="text"
                        defaultValue={queryTicketTitle}
                        onChange={handleQuery}
                        className="w-full p-2 px-3 text-white focus:outline-none bg-transparent rounded-full"
                        placeholder="Search"
                    />
                    {queryTicketTitle ? (
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
