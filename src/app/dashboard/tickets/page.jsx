"use client";

import CreateTicketForm from "@/app/dashboard/tickets/component/forms/CreateTicketForm";
import { TicketTableComponent } from "./component/components";
import { VscAdd, VscSymbolKeyword } from "react-icons/vsc";
import { ActionButton, LoadingButton } from "@/components/Buttons";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { DropdownMenuButton } from "./component/TicketTableGlobleAction";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
export const RounterContext = React.createContext();

export default function Tickets() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <main>
        <div className="flex justify-end mb-2">
          <div className="flex items-center gap-2">
            <ActionButton
              onClick={() => setCreateModalOpen(true)}
              cssClass=" hover:bg-slate-600 flex items-center gap-2"
            >
              <VscAdd />
              Create Ticket
            </ActionButton>

            <DropdownMenuButton
              title={"Actions"}
              icon={<VscSymbolKeyword />}
              styleButton="hover:bg-slate-600"
            />
          </div>
        </div>
        <div className="mt-4 w-full ps-1">
          <TicketTableComponent />
        </div>
        <Modal
          open={createModalOpen}
          setOpen={setCreateModalOpen}
          modalTitle={"Create Ticket"}
        >
          <CreateTicketForm modalClose={setCreateModalOpen} />
        </Modal>
      </main>
    </>
  );
}
