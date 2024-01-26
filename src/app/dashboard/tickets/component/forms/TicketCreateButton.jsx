import Modal from "@/components/Modal";
import CreateTicketForm from "./CreateTicketForm";
import { ActionButton } from "@/components/Buttons";
import { VscAdd } from "react-icons/vsc";
import { useState } from "react";

export default function CreateTicketButton() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <ActionButton
        onClick={() => setCreateModalOpen(true)}
        cssClass=" hover:bg-slate-600 transition-all flex items-center gap-2"
      >
        <VscAdd />
        <span className="hidden hover:title-white md:block lg:block xl:block">
          Create ticket
        </span>
      </ActionButton>
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
