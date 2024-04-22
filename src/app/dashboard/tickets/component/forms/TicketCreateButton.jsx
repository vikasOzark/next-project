import Modal from "@/components/Modal";
import CreateTicketForm from "./CreateTicketForm";
import { ButtonComponent } from "@/components/Buttons";
import { VscAdd } from "react-icons/vsc";
import { useState } from "react";

export default function CreateTicketButton() {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <>
            <ButtonComponent
                onClick={() => setCreateModalOpen(true)}
                icon={<VscAdd />}
                title={"Create ticket"}
            />
            <Modal
                open={createModalOpen}
                setOpen={setCreateModalOpen}
                modalTitle={"Create ticket"}
            >
                <CreateTicketForm modalClose={setCreateModalOpen} />
            </Modal>
        </>
    );
}
