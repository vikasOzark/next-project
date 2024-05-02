import DropdownNew from "@/components/Dropdown/DropdownNew";
import { CreateTagForm } from "@/components/Forms/CreateTagForm";
import Modal from "@/components/Modal";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { VscGroupByRefType, VscSymbolKeyword } from "react-icons/vsc";
import { TicketDeleteButton } from "../ticketActionUtils";
import { TicketStatusUpdate } from "./TicketTableMenu";
import UpdateTicketButtonModal from "./UpdateTicketButtonModal";

export function TicketActionDropdown() {
    const [tagsModalOpen, setTagsModalOpen] = useState(false);
    return (
        <>
            <DropdownNew title={"Action"} icon={<VscSymbolKeyword size={18} />}>
                <DropdownMenuItem
                    onClick={() => setTagsModalOpen((pre) => !pre)}
                >
                    Create Tag
                </DropdownMenuItem>
            </DropdownNew>
            <Modal
                open={tagsModalOpen}
                setOpen={setTagsModalOpen}
                modalTitle={"Create Tags"}
            >
                <CreateTagForm setTagsModalOpen={setTagsModalOpen} />
            </Modal>
        </>
    );
}

export function TicketAction({ ticket }) {
    const [tagsModalOpen, setTagsModalOpen] = useState(false);
    return (
        <>
            <DropdownNew title={"Action"} icon={<VscSymbolKeyword size={18} />}>
                <TicketDeleteButton
                    key={`${ticket.id}-key`}
                    ticketId={ticket.id}
                    revalidateKey={QUERY_KEYS.TICKET_LIST}
                    title={"Delete"}
                    className={"delete-btn"}
                />

                <TicketStatusUpdate
                    actionData={ticket}
                    // title={"Update"}
                    icon={<VscGroupByRefType />}
                />
                <UpdateTicketButtonModal
                    className={
                        "hover:bg-gray-200 bg-transparent px-3 py-[3px] font-medium rounded-md text-gray-300"
                    }
                    // title={"Edit"}
                    ticketData={ticket}
                />
            </DropdownNew>
            <Modal
                open={tagsModalOpen}
                setOpen={setTagsModalOpen}
                modalTitle={"Create Tags"}
            >
                <CreateTagForm setTagsModalOpen={setTagsModalOpen} />
            </Modal>
        </>
    );
}
