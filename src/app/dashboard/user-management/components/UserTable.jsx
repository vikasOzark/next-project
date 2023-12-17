"use client";

import { useContext } from "react";
import { VscGear, VscTrash } from "react-icons/vsc";
import { SimpleErrorMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { UsersDataContext } from "../page";
import { ToggleDisableUser } from "./userUtils/DeleteUser";
import { UpdateUserRole } from "./UpdateUserRole";
import { LoadingButton } from "@/components/Buttons";

export default function UserTable() {
  const HEADERS = [
    "First Name",
    "Last Name",
    "Role",
    "Email address",
    "Contact number",
    "Created by",
    "User state",
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
        <>
          <table className="min-w-full divide-y divide-gray-500 dark:divide-gray-700">
            <thead className="bg-gray-900  dark:bg-gray-800">
              <tr>
                {HEADERS.map((head, inx) => (
                  <TableHead key={`head-${inx}`} title={head} />
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-gray-500 dark:divide-gray-700 dark:bg-gray-900">
              {usersResponse.data?.success &&
                usersResponse.data?.data?.map((user) => (
                  <TableDataRow key={user.id} user={user} />
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

const TableHead = ({ title }) => {
  return (
    <>
      <th
        scope="col"
        className="py-3.5 px-4 text-sm text-left rtl:text-right text-white font-bold dark:text-gray-400"
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

  return (
    <>
      <tr className={`text-white ${user.isDisabled && "bg-gray-800"} `}>
        <td className="px-4 py-4 text-sm font-medium  whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <div>
                <h2 className="  font-bold text-lg dark: ">
                  {user?.first_name}
                </h2>
              </div>
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-sm  dark:text-gray-300 whitespace-nowrap">
          {user?.last_name}
        </td>

        <td className="px-4 py-4 text-sm  dark:text-gray-300 whitespace-nowrap">
          {user?.role}
        </td>

        <td className="px-4 py-4 text-sm  dark:text-gray-300 whitespace-nowrap">
          <div className=" flex gap-2 items-center">{user?.email}</div>
        </td>

        <td className="px-4 py-4 text-sm  dark:text-gray-300 whitespace-nowrap">
          <div className=" flex gap-2 items-center">{user?.contact_number}</div>
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-6 justify-center">
            {user?.parent.first_name}
          </div>
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div
            className={`flex items-center gap-x-6 rounded-full py-1 font-bold  justify-center ${
              user.isDisabled
                ? "bg-gray-400 text-gray-800"
                : "bg-green-400 text-green-800"
            }`}
          >
            {user.isDisabled ? "Disabled" : "Active"}
          </div>
        </td>

        <td className="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-6 justify-center">
            <ToggleDisableUser user={user} />

            <UpdateUserRole
              title={"Update role"}
              userData={user}
              icon={
                <VscGear size={18} className="font-bold" fontWeight={800} />
              }
              styleButton="rounded-full"
            />
          </div>
        </td>
      </tr>
    </>
  );
};
