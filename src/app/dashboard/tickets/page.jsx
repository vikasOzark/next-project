"use client";

import CreateTicketForm from "@/app/dashboard/tickets/component/forms/CreateTicketForm";
import { TicketTableComponent } from "./component/components";
import { VscAdd, VscSymbolKeyword } from "react-icons/vsc";
import { ActionButton, LoadingButton } from "@/components/Buttons";
import Modal from "@/components/Modal";
import { useState } from "react";
import { DropdownMenuButton } from "./component/TicketTableGlobleAction";
import { useQuery } from "react-query";

export default function Tickets() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const responseData = useQuery("tickets-list", async () => {
    const response = await fetch("/api/tickets");
    console.log(response);
    const json_response = await response.json();
    console.log(json_response);
    return json_response;
  });

  console.log(responseData);

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
          {responseData.isLoading ? (
            <div className="flex justify-center border-0">
              <LoadingButton title={"Loading tickets..."} />
            </div>
          ) : (
            <TicketTableComponent responseData={responseData} />
          )}
        </div>
        <Modal
          open={createModalOpen}
          setOpen={setCreateModalOpen}
          modalTitle={"Create Ticket"}
        >
          <CreateTicketForm
            modalClose={setCreateModalOpen}
            refreshFunction={responseData.refetch}
          />
        </Modal>
      </main>
    </>
  );
}
