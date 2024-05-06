"use client";

import { LoadingState } from "@/components/Buttons";
import { InfoMessage } from "@/components/Messages/NotificationMessage";
import { SimpleInfoMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { TagComponent } from "@/components/TagComponent";
import TagsCardComponent from "@/components/TagsCardComponent";
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
            <div className="flex flex-1 gap-2">
                {tagsData?.map((tag) => (
                    <TagComponent
                        key={tag.id}
                        color={tag.color}
                        title={tag.title}
                    />
                ))}
            </div>
        </div>
    );
}
