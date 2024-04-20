"use client";
import { VscCircleSmallFilled, VscMention, VscVerified } from "react-icons/vsc";
import React, { useContext } from "react";
import handleTimeFormat from "@/utils/dateTimeFormat";
import getMentionedUser from "@/utils/getMentionedUsersData";
import { cn } from "@/lib/utils";
import { TicketDataContext } from "../page";

export default function ActivitySection() {
    const { isLoading, ticketData } = useContext(TicketDataContext);
    const MentionedUsers = getMentionedUser(ticketData.ticketDetil);
    return (
        <>
            {!isLoading && (
                <>
                    <ActivityFragment
                        icon={<VscVerified size={18} />}
                        type={"Created ticket"}
                        key={ticketData?.createdById.id}
                        dateTimeString={ticketData?.createdAt}
                    >
                        <>
                            {ticketData?.createdById?.first_name}{" "}
                            {ticketData?.createdById?.last_name}
                        </>
                    </ActivityFragment>
                    {MentionedUsers.map((user) => (
                        <ActivityFragment
                            icon={<VscMention size={20} />}
                            type={"Mentioned"}
                            key={user.id}
                        >
                            <>
                                {user?.first_name} {user?.last_name}
                            </>
                        </ActivityFragment>
                    ))}
                </>
            )}
            {isLoading && (
                <div className="h-[2rem] w-[12rem] bg-gray-500 rounded-md animate-pulse" />
            )}
        </>
    );
}

const ActivityFragment = ({
    icon,
    children,
    dateTimeString,
    type,
    className,
}) => {
    return (
        <div className={cn("flex items-center font-bold gap-2", className)}>
            {icon}
            {children}
            <span className="text-sm text-gray-500 ">{type}</span>
            <span className="flex items-center gap-2 text-sm text-gray-400">
                {dateTimeString && <VscCircleSmallFilled size={16} />}
                {dateTimeString &&
                    handleTimeFormat(dateTimeString || "", {
                        isFormated: true,
                        dateTime: true,
                    })}
            </span>
        </div>
    );
};
