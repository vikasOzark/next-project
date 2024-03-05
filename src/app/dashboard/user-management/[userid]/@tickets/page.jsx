"use client";

import { LoadingState } from "@/components/Buttons";
import { InfoMessage } from "@/components/Messages/NotificationMessage";
import { SimpleInfoMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import Link from "next/link";
import { useQuery } from "react-query";

export default function Page({ params }) {
    const ticketResponse = useQuery({
        queryKey: "ticket",
        queryFn: async () => {
            const response = await fetch(`/api/users/${params.userid}/tickets`);
            const jsonResponse = await response.json();
            return jsonResponse;
        },
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const ticketData = ticketResponse.data?.data || [];

    return (
        <div className=" ">
            <div className=" mb-4">
                <span className="soft-bg px-3 py-[2px] rounded-full">
                    Tickets {ticketData.length}
                </span>
            </div>

            {ticketResponse.isLoading && (
                <div className="w-full flex justify-center text-white">
                    <LoadingState
                        cssClass={"text-white"}
                        title={"Loading tickets..."}
                    />
                </div>
            )}
            {!ticketResponse.isLoading && ticketData.length === 0 && (
                <div className="w-full flex justify-center text-white">
                    <SimpleInfoMessage message={"No tickets found."} />
                </div>
            )}
            <div className="grid grid-cols-12 gap-2">
                {ticketData?.map((ticket) => (
                    <div key={ticket.id} className="col-span-6">
                        <Link href={`/dashboard/tickets/${ticket.id}`}>
                            <div className="bg-white flex gap-2 rounded-lg px-3 py-1 mb-2">
                                <div className="h-100 w-2 bg-blue-400 rounded-xl"></div>
                                <div className="w-full">
                                    <div className="text-xs text-gray-600">
                                        2/3/2024
                                    </div>
                                    <div className=" flex justify-between text-gray-600">
                                        <div className="text-sm">
                                            {ticket.taskTitle}
                                        </div>
                                        <div className="text-xs">
                                            {ticket.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
