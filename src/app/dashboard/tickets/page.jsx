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
        <div className="flex justify-end mb-1">
          <div className="flex items-center gap-2">
            <ActionButton
              onClick={() => setCreateModalOpen(true)}
              cssClass=" hover:bg-slate-600 transition-all flex items-center gap-2"
            >
              <VscAdd />
              <span className="hidden md:block lg:block xl:block">
                Create ticket
              </span>
            </ActionButton>

            <DropdownMenuButton
              title={"Actions"}
              icon={<VscSymbolKeyword />}
              styleButton="hover:bg-slate-600 bg-transparent"
            />
          </div>
        </div>
        <div className="mt-2 w-full ps-1">
          <TicketTableComponent />
        </div>
        <Modal
          open={createModalOpen}
          setOpen={setCreateModalOpen}
          modalTitle={"Create ticket"}
        >
          <CreateTicketForm modalClose={setCreateModalOpen} />
        </Modal>
      </main>
    </>
  );
}
