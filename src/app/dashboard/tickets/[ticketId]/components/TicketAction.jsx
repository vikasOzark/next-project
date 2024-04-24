import DropdownNew from "@/components/Dropdown/DropdownNew";
import { VscEdit, VscExtensions } from "react-icons/vsc";
import { TicketDeleteButton } from "../../ticketActionUtils";
import { useContext, useState } from "react";
import { TicketDataContext } from "../page";
import { QUERY_KEYS } from "@/queryKeys";
import { urlRoutes } from "@/utils/urlRoutes";
import { ButtonComponent } from "@/components/Buttons";
import { useSearchQuery } from "@/hooks/setQueryParam";

export default function TicketAction() {
    return (
        <DropdownNew title={"Action"} icon={<VscExtensions size={18} />}>
            <DeleteTicket />
            <UpdateTicketButtonModal />
        </DropdownNew>
    );
}

const DeleteTicket = () => {
    const { ticketData } = useContext(TicketDataContext);
    return (
        <TicketDeleteButton
            navigateTo={urlRoutes.TICKETS}
            key={`${ticketData.id}-delete`}
            ticketId={ticketData.id}
            revalidateKey={(QUERY_KEYS.TICKET_LIST, ticketData.id)}
            title={"Delete"}
            className={"w-full p-1 text-center rounded-md"}
        />
    );
};

function UpdateTicketButtonModal() {
    const query = useSearchQuery();
    return (
        <>
            <ButtonComponent
                className={"w-full"}
                onClick={() => query("mode", "edit")}
                icon={<VscEdit size={18} />}
                title={"Edit"}
            />
        </>
    );
}
