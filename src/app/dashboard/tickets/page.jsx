"use client";

import CreateTicketForm from "@/app/dashboard/tickets/component/forms/CreateTicketForm";
import { TicketTableComponent } from "./component/components";
import {
  VscAdd,
  VscChecklist,
  VscChromeClose,
  VscSymbolKeyword,
} from "react-icons/vsc";
import { ActionButton, LoadingButton } from "@/components/Buttons";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { DropdownMenuButton } from "./component/TicketTableGlobleAction";
import MergeTickets from "./component/MergeTickets";
export const SelectContext = React.createContext();

export default function Tickets() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);

  const handleUnSelectAll = () => {
    selectedTickets.map((ticket) => {
      document.getElementById(ticket.id).checked = false;
    });
    setSelectedTickets([]);
  };

  // const handleSelectAll = () => {
  //   selectedTickets.map((ticket) => {
  //     document.getElementById(ticket.id).checked = true;
  //   });
  // };

  return (
    <>
      <SelectContext.Provider value={{ selectedTickets, setSelectedTickets }}>
        <main>
          <div className="flex justify-between mb-1">
            <div className="">
              {/* <VscChecklist size={28} className="bg-white rounded p-1" /> */}
              {selectedTickets.length ? (
                <span className="bg-white flex gap-2 items-center rounded-full px-4 py-1">
                  <div className="flex gap-2">
                    <span>Selected ticket</span>
                    <span className="text-blue-900 font-bold">
                      {selectedTickets.length}
                    </span>
                  </div>
                  <VscChromeClose
                    onClick={handleUnSelectAll}
                    className="hover:bg-gray-300 rounded-full cursor-pointer"
                  />
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <MergeTickets />
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
          <div className="mt-2 w-full">
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
      </SelectContext.Provider>
    </>
  );
}
