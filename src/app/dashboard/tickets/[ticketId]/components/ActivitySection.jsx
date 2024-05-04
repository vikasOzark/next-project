"use client";
import {
    VscCircleSmallFilled,
    VscGitCompare,
    VscMention,
    VscPerson,
    VscVerified,
} from "react-icons/vsc";
import { useContext } from "react";
import handleTimeFormat from "@/utils/dateTimeFormat";
import getMentionedUser from "@/utils/getMentionedUsersData";
import { cn } from "@/lib/utils";
import { TicketDataContext } from "../page";
import Image from "next/image";
import { GitlabCreatedActivityPill } from "./InfoComponent/GitInfo";

export default function ActivitySection() {
    const { isLoading, ticketData } = useContext(TicketDataContext);
    const MentionedUsers = getMentionedUser(ticketData.ticketDetil);

    const hasTimeFrame = ticketData?.endDate || ticketData?.startDate;
    const isWebhookTicket = ticketData?.webhook_event_id;

    return (
        <>
            {!isLoading && (
                <>
                    <ActivityFragment
                        className={"mb-1"}
                        icon={<VscVerified size={20} />}
                        type={"Created ticket"}
                        dateTimeString={ticketData?.createdAt}
                    >
                        {!isWebhookTicket && (
                            <>
                                {ticketData?.createdById?.first_name}{" "}
                                {ticketData?.createdById?.last_name}
                            </>
                        )}
                        {isWebhookTicket && (
                            <>
                                <GitlabCreatedActivityPill />{" "}
                                <Image
                                    alt="This ticket is created by gitlab issue event."
                                    loading="lazy"
                                    width={20}
                                    height={20}
                                    src={"/svg/gitlab.svg"}
                                />
                            </>
                        )}
                    </ActivityFragment>
                    {ticketData?.assingedUser && (
                        <ActivityFragment
                            className={"mb-1"}
                            icon={<VscPerson size={20} />}
                            type={"Assigned"}
                            key={ticketData?.createdById.id}
                        >
                            <>
                                {ticketData?.assingedUser?.first_name}{" "}
                                {ticketData?.assingedUser?.last_name}
                            </>
                        </ActivityFragment>
                    )}
                    {MentionedUsers.map((user) => (
                        <ActivityFragment
                            className={"mb-1"}
                            icon={<VscMention size={20} />}
                            type={"Mentioned"}
                            key={user.id}
                        >
                            <>
                                {user?.first_name} {user?.last_name}
                            </>
                        </ActivityFragment>
                    ))}
                    {hasTimeFrame && (
                        <ActivityFragment
                            className={"mb-1"}
                            icon={<VscGitCompare size={20} />}
                            type={"Added"}
                        >
                            Time frame
                        </ActivityFragment>
                    )}
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
