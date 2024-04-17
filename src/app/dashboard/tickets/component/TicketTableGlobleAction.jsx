import DropdownNew from "@/components/Dropdown/DropdownNew";
import { CreateTagForm } from "@/components/Forms/CreateTagForm";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { VscSymbolKeyword } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

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
