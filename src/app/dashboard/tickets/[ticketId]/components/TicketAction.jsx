import DropdownNew from "@/components/Dropdown/DropdownNew";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { VscEdit, VscExtensions, VscKebabVertical } from "react-icons/vsc";
import { TicketDeleteButton } from "../../ticketActionUtils";
import { useContext, useState } from "react";
import { TicketDataContext } from "../page";
import { QUERY_KEYS } from "@/queryKeys";
import { urlRoutes } from "@/utils/urlRoutes";
import Modal from "@/components/Modal";
import UpdateTicketForm from "../../component/forms/UpdateTicketForm";
import { ButtonComponent } from "@/components/Buttons";

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

function UpdateTicketButtonModal() {
    const { ticketData } = useContext(TicketDataContext);
    const [updateTicketModal, setTicketUpdateModal] = useState(false);
    return (
        <>
            <DropdownMenuItem className="w-[7em]">
                <button
                    onClick={() => setTicketUpdateModal((pre) => !pre)}
                    className={`hover:bg-red-400 text-red-400 flex gap-2 px-3 items-center  rounded-full transition-colors duration-200  hover:text-white focus:outline-none`}
                >
                    <VscEdit size={16} />
                    <span className="md:block lg:block">Update</span>
                </button>
            </DropdownMenuItem>

            <Modal
                cssClass={"min-w-fit"}
                className=" "
                open={updateTicketModal}
                setOpen={setTicketUpdateModal}
                modalTitle={"Update ticket"}
            >
                <UpdateTicketForm
                    setTicketUpdateModal={setTicketUpdateModal}
                    ticketData={ticketData}
                />
            </Modal>
        </>
    );
}
