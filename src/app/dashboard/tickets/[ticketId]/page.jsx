"use client";
import axios from "axios";
import { VscCircleSmallFilled, VscLibrary, VscVerified } from "react-icons/vsc";
import { useQuery } from "react-query";
import React, { useContext } from "react";
import MergedTicketCard from "./components/MergedTicketCard";
import { isJSONString } from "@/utils/validateJsonString";
import TicketDetailSection from "./components/detailSection";
import { VscIssues } from "react-icons/vsc";
import { QUERY_KEYS } from "@/queryKeys";
import handleTimeFormat from "@/utils/dateTimeFormat";
import DetailSidePanel from "./components/DetailSidePanel";
import MessageThread from "./MessageThread";

export const TicketDataContext = React.createContext();

export default function Page({ params }) {
    const { ticketId } = params;

    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEYS.TICKET_LIST, ticketId],
        queryFn: () => {
            return axios.get(`/api/tickets/${ticketId}`);
        },
        retry: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const ticketData = data?.data.data || {};
    const isJsonString = isJSONString(ticketData?.ticketDetil);

    let details;
    if (isJsonString) {
        details = JSON.parse(ticketData?.ticketDetil);
    } else {
        details = ticketData?.ticketDetil;
    }

    return (
        <>
            <TicketDataContext.Provider
                value={{ ticketData, params, isLoading }}
            >
                <section>
                    <div className="grid gap-2 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                        <div
                            className="xl:col-span-4 lg:grid-span-3"
                            x-chunk="dashboard-01-chunk-4"
                        >
                            <main className="px-2 md:px-10 space-y-4 lg:px-10">
                                <div className="">
                                    <p className="block mt-2 text-sm w-full text-white font-medium leading-6 ">
                                        Title
                                    </p>

                                    {ticketData?.isLoading && (
                                        <div className="h-[2rem] animate-pulse bg-gray-500 rounded-lg"></div>
                                    )}
                                </div>
                                <div className="rounded-md p-1  ">
                                    {Object.keys(ticketData).length > 0 && (
                                        <>
                                            <TicketDetailSection
                                                ticketData={ticketData}
                                            />
                                        </>
                                    )}
                                    {isLoading && (
                                        <div className="h-[15rem] animate-pulse bg-gray-500 rounded-lg" />
                                    )}
                                </div>
                                <div className="">
                                    <p className="font-bold mb-2 text-md text-white flex items-center gap-2">
                                        <VscIssues size={18} /> Sub tickets
                                    </p>
                                    {ticketData.mergedTicket?.map((ticket) => (
                                        <MergedTicketCard
                                            key={ticket.id}
                                            ticketData={ticket}
                                        />
                                    ))}
                                    {isLoading && (
                                        <div className=" space-y-2">
                                            <div className="h-[3rem] rounded-md animate-pulse bg-gray-500"></div>
                                            <div className="h-[3rem] rounded-md animate-pulse bg-gray-500"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="">
                                    <p className="font-bold mb-2 text-md text-white flex items-center gap-2">
                                        <VscLibrary size={18} /> Activity
                                    </p>
                                    <ActivitySection />
                                </div>
                                <div className="">
                                    <MessageThread />
                                </div>
                            </main>
                        </div>
                        <div className="">
                            <DetailSidePanel />
                        </div>
                    </div>
                </section>
            </TicketDataContext.Provider>
        </>
    );
}

const ActivitySection = () => {
    const { isLoading, ticketData } = useContext(TicketDataContext);
    return (
        <>
            {!isLoading && (
                <div className="flex items-center font-bold gap-2">
                    <VscVerified size={18} />
                    {ticketData?.createdById?.first_name}
                    {ticketData?.createdById?.last_name}
                    <span className="text-sm text-gray-500 ">
                        Created ticket
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                        <VscCircleSmallFilled size={16} />
                        {handleTimeFormat(ticketData?.createdAt || "", {
                            isFormated: true,
                            dateTime: true,
                        })}
                    </span>
                </div>
            )}
            {isLoading && (
                <div className="h-[2rem] w-[12rem] bg-gray-500 rounded-md animate-pulse" />
            )}
        </>
    );
};

// TagsPopover
// const TicketDataSection = () => {
//     const { ticketData, ticketResponse } = useContext(TicketDataContext);
//     const router = useRouter();

//     const errorMessageProvider = () => {
//         const error = ticketResponse.error?.request.response || "{}";
//         const errorMessage = JSON.parse(error);
//         return errorMessage.message;
//     };

//     const isJsonString = isJSONString(ticketData?.ticketDetil);

//     let details;
//     if (isJsonString) {
//         details = JSON.parse(ticketData?.ticketDetil);
//     } else {
//         details = ticketData?.ticketDetil;
//     }

//     return (
//         <>
//             <div className="text-white font-bold">
//                 <div className="flex justify-between mb-2 gap-2">
//                     <div className="mb-2">
//                         <button
//                             title="Take me back"
//                             onClick={() => router.back()}
//                             className="text-white cursor-pointer "
//                         >
//                             <VscChevronLeft
//                                 size={32}
//                                 className="bg-slate-600 rounded-full hover:bg-slate-400 transition-all"
//                             />
//                         </button>
//                     </div>

//                     <div className="flex w-auto gap-2">
//                         <AssignUserAction
//                             icon={<VscPersonAdd size={18} />}
//                             title={"Assign people"}
//                             actionData={ticketData}
//                             revalidateKey={ticketData.id}
//                             isAlreadyAssigned={
//                                 ticketData["assingedUser"] === null
//                                     ? false
//                                     : true
//                             }
//                             className={
//                                 "gap-2   hover:bg-slate-700 bg-gray-900 transition-all  px-3 py-1 items-center rounded-full"
//                             }
//                         />
//                         <TicketStatusUpdate
//                             title={"Status update"}
//                             icon={<VscGroupByRefType />}
//                             ticketStatus={Status}
//                             actionData={ticketData}
//                             revalidateKey={ticketData.id}
//                         />
//                         <TicketDeleteButton
//                             ticketId={ticketData.id}
//                             title={"Delete"}
//                             className={"bg-red-200 p-1 px-3"}
//                             navigateTo={urlRoutes.TICKETS}
//                         />
//                     </div>
//                 </div>
//                 <div className="rounded-2xl grid grid-cols-3 gap-3 p-3 border soft-bg shadow-md border-gray-800 ">
//                     {isLoading && (
//                         <div className="col-span-3">
//                             <LoadingButton title={"Loading your ticket..."} />
//                         </div>
//                     )}
//                     {ticketResponse.isError && (
//                         <div className="col-span-3">
//                             <SimpleErrorMessage
//                                 message={errorMessageProvider()}
//                             />
//                         </div>
//                     )}
//                     {ticketResponse.isSuccess && (
//                         <>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Ticket title
//                                 </h3>
//                                 <p className=" capitalize text-sm md:text-sm lg:text-md ">
//                                     {ticketData.taskTitle}
//                                 </p>
//                             </div>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Department
//                                 </h3>
//                                 <p className=" capitalize text-sm md:text-sm lg:text-md ">
//                                     {ticketData?.department?.name}
//                                 </p>
//                             </div>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Ticket status
//                                 </h3>
//                                 <p
//                                     className={`${statusCss(
//                                         ticketData?.status,
//                                         Status,
//                                         "text"
//                                     )}`}
//                                 >
//                                     {ticketData?.status}
//                                 </p>
//                             </div>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Created by
//                                 </h3>
//                                 <p className=" capitalize text-sm md:text-sm lg:text-md ">
//                                     {ticketData?.createdById?.first_name}{" "}
//                                     {ticketData?.createdById?.last_name}
//                                 </p>
//                             </div>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Tags
//                                 </h3>
//                                 <div className=" flex gap-2 items-center">
//                                     {ticketData?.tags?.map((tag) => (
//                                         <Tag
//                                             key={tag?.id}
//                                             tag={tag}
//                                             ticketId={ticketData.id}
//                                             queryKey={[
//                                                 "ticket-detail",
//                                                 ticketData.id,
//                                             ]}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Created at
//                                 </h3>
//                                 <p className=" capitalize text-sm md:text-sm lg:text-md ">
//                                     {handleTimeFormat(ticketData?.createdAt, {
//                                         isFormated: true,
//                                         datePrifix: "/",
//                                         dateTime: true,
//                                     })}
//                                 </p>
//                             </div>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Creatd by
//                                 </h3>
//                                 <p className=" capitalize text-sm md:text-sm lg:text-md ">
//                                     {ticketData?.createdById?.first_name}{" "}
//                                     {ticketData?.createdById?.last_name}
//                                 </p>
//                             </div>
//                             <div className="">
//                                 <h3 className="text-gray-300 text-sm lg:text-lg md:text-md">
//                                     Assigned
//                                 </h3>
//                                 <div className="flex gap-3 items-center mt-2">
//                                     <TicketHoverCard ticketData={ticketData} />
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                 </div>
//                 {Object.keys(ticketData).length > 0 && (
//                     <>
//                         <TicketDetailSection ticketData={ticketData} />
//                         <UpdateTicketButtonModal
//                             title={"Update ticket"}
//                             className={"mt-2"}
//                             ticketData={ticketData}
//                         />
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };
