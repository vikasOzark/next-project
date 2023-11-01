"use client";

import CreateTicketForm from "@/components/Forms/CreateTicketForm";
import { TicketStatusCard, TicketTableComponent } from "./components";
import { FcBearish, FcBullish, FcMindMap, FcProcess } from "react-icons/fc";
import {
  VscAdd, VscSymbolKeyword
} from "react-icons/vsc";
import { ActionButton } from "@/components/Buttons";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { DropdownMenuButton } from "./TicketTableGlobleAction";
import { useQuery } from "react-query";

export default function Tickets() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  
  const responseData = useQuery("tickets-list", async () => {
    const response = await fetch("/api/tickets");
    const json_response = await response.json();
    return json_response;
  });

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
            <div className=" md:col-span-9 lg:col-span-9 col-spam-12">
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
              <TicketTableComponent responseData={responseData} />
            </div>
            {/* <div className=""></div> */}
          </div>
        </div>

        <Modal
          open={createModalOpen}
          setOpen={setCreateModalOpen}
          modalTitle={"Create Ticket"}
        >
          <CreateTicketForm modalClose={setCreateModalOpen} refreshFunction={responseData.refetch} />
        </Modal>
      </main>
      {/* <CreateTicketForm /> */}
    </>
  );
}
