"use client";
import Link from "next/link";
import React from "react";
import { VscArrowRight, VscListUnordered } from "react-icons/vsc";
import { useQuery } from "react-query";

export default function RecentActivity() {
    const data = useQuery({
        queryKey: "activity",
        queryFn: async () => {
            const response = await fetch(
                "/api/dashboard/recent-activities",
                {}
            );
            const jsonResponse = await response.json();
            return jsonResponse;
        },
    });

    return (
        <div className="min-h-[25rem] space-y-4 max-h-[30rem] ">
            <div className=" text-white flex items-center gap-2 font-bold text-sm md:text-lg lg:text-lg">
                <VscListUnordered size={18} />
                Recent tickets
            </div>
            <div className="overflow-hidden overflow-y-auto">
                {data?.data?.data.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-lg mb-2 group  text-white font-bold text-lg temp-card-bg"
                    >
                        <Link
                            href={item.url}
                            className="w-full p-2 flex rounded-lg items-center justify-between  hover:bg-gray-600 transition-all"
                        >
                            <p className=" truncate flex items-center gap-2 ">
                                <span className=" text-base truncate">
                                    {item?.taskTitle}
                                </span>
                                <span className="rounded-lg text-xs py-0.5  px-2  font-bold  text-white  bg-gray-700">
                                    {item.status}
                                </span>
                            </p>
                            <div className=" -translate-x-3 ms-4 transition-all group-hover:translate-x-0">
                                <VscArrowRight />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
