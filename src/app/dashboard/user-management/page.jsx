"use client";
import UserTable from "@/app/dashboard/user-management/components/UserTable";
import Modal from "@/components/Modal";
import { DropdownMenuButton } from "../tickets/component/TicketTableGlobleAction";
import { VscAdd, VscSearch, VscSymbolKeyword } from "react-icons/vsc";
import { ActionButton } from "@/components/Buttons";
import React, { useState } from "react";
import { DropdownMenuCheckboxes } from "@/components/DropdownButton";
import UserCreateUser from "./components/Forms/UserCreateForm";
import { useQuery } from "react-query";
import { getUsersData } from "./components/Forms/userUtils";

export const UsersDataContext = React.createContext();
export default function Permissions() {
  const [userCreateModal, setUserModal] = useState(false);
  const usersResponse = useQuery("users-list", getUsersData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <UsersDataContext.Provider value={usersResponse}>
        <section className="">
          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto">
              <div className="inline-block min-w-full py-2 align-middle">
                <div className="flex justify justify-between mb-2">
                  <div className="">
                    <div className="bg-gray-700 flex items-center px-3 rounded-full ">
                      <input
                        type="text"
                        className="w-full p-2 px-3 text-white bg-transparent rounded-full"
                        placeholder="Search"
                      />
                      <VscSearch size={28} color="white" />
                    </div>
                  </div>

                  <div className="p-1">
                    <div className="flex items-center gap-2">
                      <ActionButton
                        onClick={() => setUserModal(true)}
                        cssClass=" hover:bg-slate-600 flex items-center gap-2"
                      >
                        <VscAdd />
                        Create User
                      </ActionButton>
                    </div>
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
      </UsersDataContext.Provider>
    </>
  );
}
