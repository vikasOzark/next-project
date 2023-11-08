"use client";
import UserTable from "@/app/dashboard/user-management/components/UserTable";
import Modal from "@/components/Modal";
import { DropdownMenuButton } from "../tickets/component/TicketTableGlobleAction";
import { VscAdd, VscSymbolKeyword } from "react-icons/vsc";
import { ActionButton } from "@/components/Buttons";
import { useState } from "react";
import { DropdownMenuCheckboxes } from "@/components/DropdownButton";
import UserCreateUser from "./components/Forms/UserCreateForm";

export default function Permissions() {
  const [userCreateModal, setUserModal] = useState(false);
  
  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="flex justify-end mb-2">
                <div className="flex items-center gap-2">
                  <ActionButton
                    onClick={() => setUserModal(true)}
                    cssClass=" hover:bg-slate-600 flex items-center gap-2"
                  >
                    <VscAdd />
                    Create User
                  </ActionButton>

                  <DropdownMenuButton
                    title={"Actions"}
                    icon={<VscSymbolKeyword />}
                    styleButton="hover:bg-slate-600"
                  />
                </div>
              </div>
              <div className="overflow-hidden border-gray-200 dark:border-gray-700 md:rounded-lg">
                <UserTable />
              </div>
            </div>
          </div>
        </div>
        <Modal
          open={userCreateModal}
          setOpen={setUserModal}
          modalTitle={"Create User"}
        >
          <UserCreateUser />
        </Modal>
      </section>
    </>
  );
}
