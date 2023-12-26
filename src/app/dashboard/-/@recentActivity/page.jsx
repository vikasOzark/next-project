"use client";
import Link from "next/link";
import React from "react";
import { VscArrowRight, VscListUnordered } from "react-icons/vsc";
import { useQuery } from "react-query";

export default function RecentActivity() {
  const data = useQuery({
    queryKey: "activity",
    queryFn: async () => {
      const response = await fetch("/api/dashboard/recent-activities", {});
      const jsonResponse = await response.json();
      return jsonResponse;
    },
  });

  return (
    <div className="min-h-[25rem] max-h-[30rem] overflow-hidden overflow-y-auto">
      <div className=" text-white flex items-center gap-2 font-bold text-sm md:text-lg lg:text-lg">
        <VscListUnordered size={18} />
        Recent
      </div>
      <div className="mb-4">
        <small className="text-gray-300 font-bold">
          Recent tickets and user creations.
        </small>
      </div>
      <div className="">
        {data?.data?.data.map((item) => (
          <div
            key={item.id}
            className="rounded-lg mb-2 group  text-white font-bold text-lg soft-bg"
          >
            <Link
              href={item.url}
              className="w-full p-2  flex rounded-lg items-center justify-between  hover:bg-gray-600 transition-all"
            >
              <div className=" flex items-center gap-2 ">
                {item?.taskTitle || item?.first_name}
                <span className="rounded-lg text-xs py-0.5  px-2  font-bold  text-white  bg-gray-700">
                  {item.status}
                </span>
              </div>
              <div className=" -translate-x-3 transition-all group-hover:translate-x-0">
                <VscArrowRight />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
