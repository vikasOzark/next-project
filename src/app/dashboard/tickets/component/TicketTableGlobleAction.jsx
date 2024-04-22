import DropdownNew from "@/components/Dropdown/DropdownNew";
import { CreateTagForm } from "@/components/Forms/CreateTagForm";
import Modal from "@/components/Modal";
import {
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { VscSymbolKeyword } from "react-icons/vsc";

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
