import Link from "next/link";
import { TableFlag } from "./components";
import handleTimeFormat from "@/utils/dateTimeFormat";
import { urlRoutes } from "@/utils/urlRoutes";
import Image from "next/image";
import { TICKET_CREATOR_TYPE } from "@prisma/client";

const {
    VscChromeClose,
    VscPassFilled,
    VscPass,
    VscCircleSmallFilled,
} = require("react-icons/vsc");

export const SelectedDataInfo = ({ selectedTickets, setSelectedTickets }) => {
    if (selectedTickets.length) {
        return (
            <span className="temp-bg flex gap-2 text-white items-center rounded-full px-4 py-1">
                <div className="flex gap-2">
                    <span>Selected ticket</span>
                    <span className="text-blue-500 font-bold">
                        {selectedTickets.length}
                    </span>
                </div>
                <VscChromeClose
                    size={20}
                    onClick={() => setSelectedTickets([])}
                    className="hover:bg-gray-700 rounded-full cursor-pointer"
                />
            </span>
        );
    }
    return null;
};

export const TicketTitle = ({
    ticket,
    setSelectedTickets,
    selectedTickets,
}) => {
    const dateTime = (date) => {
        return handleTimeFormat(date, {
            isFormated: true,
            dateTime: true,
        });
    };

    const handleSelect = (ticket) => {
        setSelectedTickets((pre) => {
            const isAvailable = pre.find(
                (selectedTicket) => selectedTicket.id === ticket.id
            );
            if (isAvailable) {
                return pre.filter(
                    (selectedTicket) => selectedTicket.id !== ticket.id
                );
            }
            return [...pre, ticket];
        });
    };
    const selectedIds = selectedTickets.map((ticket) => ticket.id);

    return (
        <div className="inline-flex items-center gap-x-3 w-max">
            <div className="flex items-center gap-x-2">
                <div className=" flex gap-3 items-center">
                    <div className="">
                        {selectedIds.includes(ticket.id) ? (
                            <VscPassFilled
                                className="text-green-500"
                                onClick={() => handleSelect(ticket)}
                                size={20}
                            />
                        ) : (
                            <VscPass
                                onClick={() => handleSelect(ticket)}
                                size={20}
                            />
                        )}
                    </div>
                    <TableFlag ticketData={ticket} />
                    <div className="text-wrap truncate">
                        <Link
                            href={`${urlRoutes.TICKETS}/${ticket.id}`}
                            className="font-medium  text-gray-300 dark:text-white hover:underline"
                        >
                            {ticket.taskTitle}
                        </Link>
                        <div className="flex gap-2 items-center">
                            <small>{dateTime(ticket.createdAt)}</small>
                            {/* <VscCircleSmallFilled size={18} />
                            <span>
                                {ticket?.createdById?.first_name}{" "}
                                {ticket?.createdById?.last_name}
                            </span> */}
                            {ticket.creator_type ===
                                TICKET_CREATOR_TYPE.GITLAB && (
                                <>
                                    <VscCircleSmallFilled size={18} />
                                    <Image
                                        title="This ticket is created by gitlab event."
                                        alt="gitlab"
                                        loading="lazy"
                                        width={15}
                                        height={15}
                                        src={"/svg/gitlab.svg"}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
