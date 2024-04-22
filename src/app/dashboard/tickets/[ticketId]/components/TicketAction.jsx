import DropdownNew from "@/components/Dropdown/DropdownNew";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { VscExtensions, VscKebabVertical } from "react-icons/vsc";
import { TicketDeleteButton } from "../../ticketActionUtils";
import { useContext } from "react";
import { TicketDataContext } from "../page";
import { QUERY_KEYS } from "@/queryKeys";
import { urlRoutes } from "@/utils/urlRoutes";

export default function TicketAction() {
    return (
        <DropdownNew title={"Action"} icon={<VscExtensions size={18} />}>
            <UpdateTicket />
        </DropdownNew>
    );
}
//<VscKebabVertical />

const UpdateTicket = () => {
    const { ticketData } = useContext(TicketDataContext);
    return (
        <DropdownMenuItem className="w-[7em]">
            <TicketDeleteButton
                navigateTo={urlRoutes.TICKETS}
                key={`${ticketData.id}-delete`}
                ticketId={ticketData.id}
                revalidateKey={(QUERY_KEYS.TICKET_LIST, ticketData.id)}
                title={"Delete"}
                className={"w-full p-1 text-center rounded-md"}
            />
        </DropdownMenuItem>
    );
};
