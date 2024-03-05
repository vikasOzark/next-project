"use client";

import { LoadingState } from "@/components/Buttons";
import { InfoMessage } from "@/components/Messages/NotificationMessage";
import { SimpleInfoMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import Link from "next/link";
import { useQuery } from "react-query";

export default function Page({ params }) {
    const tagsResponse = useQuery({
        queryKey: "tags",
        queryFn: async () => {
            const response = await fetch(`/api/users/${params.userid}/tags`);
            const jsonResponse = await response.json();
            return jsonResponse;
        },
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const tagsData = tagsResponse.data?.data || [];

    return (
        <div className=" ">
            <div className=" mb-4">
                <span className="soft-bg px-3 py-[2px] rounded-full">
                    Tags created {tagsData.length}
                </span>
            </div>
            {tagsResponse.isLoading && (
                <div className="w-full flex justify-center text-white">
                    <LoadingState
                        cssClass={"text-white"}
                        title={"Loading tags..."}
                    />
                </div>
            )}
            {!tagsResponse.isLoading && tagsData.length === 0 && (
                <div className="w-full flex justify-center text-white">
                    <SimpleInfoMessage message={"No tags found."} />
                </div>
            )}
            <div className="grid grid-cols-12 gap-2">
                {tagsData?.map((tag) => (
                    <>
                        <div
                            key={tag.id}
                            className={` col-span-4 text-center cursor-pointer mb-2 peer rounded-full px-3 p-1 flex items-center text-white justify-center ${tag.color}`}
                        >
                            <p>{tag.title}</p>
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
}
