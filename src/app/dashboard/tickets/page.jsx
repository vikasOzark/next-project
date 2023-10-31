"use client";

import CreateTicketForm from "@/components/Forms/CreateTicketForm";
import { TableRow, TicketStatusCard } from "./components";
import { FcBearish, FcBullish, FcMindMap, FcProcess } from "react-icons/fc";
import { DropdownMenuButton } from "@/components/DropdownButton";
import { VscAdd, VscPulse, VscSymbolKeyword } from "react-icons/vsc";
import { ButtonIcon } from "@radix-ui/react-icons";
import { ActionButton, SubmitButton } from "@/components/Buttons";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Tickets() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <main>
        <div className=" grid grid-cols-4 gap-2 overflow-x-auto overflow-hidden w-full">
          <TicketStatusCard
            title={"Total Tickes"}
            data={32}
            analyticString={"Success rate is 20%"}
            icon={<FcMindMap size={25} />}
          />
          <TicketStatusCard
            title={"Closed"}
            data={15}
            analyticString={"Closing rate is 50%"}
            icon={<FcProcess size={25} />}
          />
          <TicketStatusCard
            title={"Open Tickes"}
            data={10}
            analyticString={"Success rate is 20%"}
            icon={<FcBullish size={25} />}
          />
          <TicketStatusCard
            title={"Rejected Tickes"}
            data={5}
            analyticString={"Success rate is 20%"}
            icon={<FcBearish size={25} />}
          />
        </div>

        <div className="mt-4">
          <div className="grid gap-2 grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
            <div className=" md:col-span-8 lg:col-span-8">
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
                    icon={<VscSymbolKeyword />}
                    styleButton="hover:bg-slate-600"
                  />
                </div>
              </div>
              <TableRow />
            </div>
            {/* <div className=""></div> */}
          </div>
        </div>
        <Modal open={createModalOpen} setOpen={setCreateModalOpen} modalTitle={"Create Ticket"}>
          <CreateTicketForm />
        </Modal>
      </main>
      {/* <CreateTicketForm /> */}
    </>
  );
}
