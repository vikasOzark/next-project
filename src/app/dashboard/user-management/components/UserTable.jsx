"use client";

import { useContext } from "react";
import { LoadingButton } from "@/components/Buttons";
import { VscGear } from "react-icons/vsc";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { UsersDataContext } from "../page";
import { DropdownActionMenuButton } from "../../tickets/component/TicketTableMenu";
import { useMutation } from "react-query";

export default function UserTable() {
  const HEADERS = [
    "First Namr",
    "Last Name",
    "Role",
    "Email address",
    "Contect number",
    "Created by",
    "Action",
  ];
  const usersResponse = useContext(UsersDataContext);

  return (
    <>
      {usersResponse.isLoading && (
        <div className="flex justify-center border-0">
          <LoadingButton title={"Loading users..."} />
        </div>
      )}
      {usersResponse.isError && (
        <SimpleErrorMessage
          message={"Something went wrong, Please try again."}
        />
      )}
      {usersResponse.isSuccess && (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {HEADERS.map((head, inx) => (
                <TableHead key={`head-${inx}`} title={head} />
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
            {usersResponse.data?.success &&
              usersResponse.data?.data?.map((user) => (
                <TableDataRow key={user.id} user={user} />
              ))}
          </tbody>
        </table>
      )}
    </>
  );
}

const TableHead = ({ title }) => {
  return (
    <>
      <th
        scope="col"
        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <div className="flex items-center gap-x-3">
          <span>{title}</span>
        </div>
      </th>
    </>
  );
};

const TableDataRow = ({ user }) => {
  const dateObject = new Date(user.createdAt);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const dateAndTime = `${hours}:${minutes} | ${day}-${month}-${year}`;

  const mutationAction = useMutation({
    mutationFn: async () => {
      toast.loading("Deleting ticket...");
      return axios.delete(`/api/tickets/${user?.id}`);
    },
    onSettled: async (response) => {
      if (response) {
        toast.remove();
        if (response.user?.success) {
          contextFunction();
          toast.success(
            response.user?.message || "Ticket is deleted Successfully."
          );
        } else {
          toast.error(
            response.user?.message || "Something went wrong while deleting."
          );
        }
      }
    },
  });

  const mutationTagRemove = useMutation({
    mutationFn: async (tagId) => {
      toast.loading("Removing tag...");
      return axios.patch(
        `/api/tickets/${user?.id}/?operationTo=tag&tagId=${tagId}`
      );
    },
    onSettled: async (response) => {
      if (response) {
        toast.remove();
        if (response.user?.success) {
          contextFunction();
          toast.success(response.user?.message || "Tag removed Successfully.");
        } else {
          toast.error(
            response.user?.message || "Something went wrong while removing tag."
          );
        }
      }
    },
  });

  return (
    <>
      <tr>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white ">
                  {user?.first_name}
                </h2>
              </div>
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {user?.last_name}
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {user?.role}
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          <div className=" flex gap-2 items-center">{user?.email}</div>
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
          <div className=" flex gap-2 items-center">{user?.contact_number}</div>
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-6 justify-center">
            {user?.parent.first_name}
          </div>
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-6 justify-center">
            <button
              // onClick={() => mutationAction.mutate()}
              className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>

            <DropdownActionMenuButton
              // actionData={data}
              icon={
                <VscGear size={18} className="font-bold" fontWeight={800} />
              }
              styleButton="hover:bg-gray-200 bg-gray-50 text-black rounded"
            />
          </div>
        </td>
      </tr>
    </>
  );
};
