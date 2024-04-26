"use client";

import { useContext } from "react";
import { VscCircleFilled, VscGear, VscTrash } from "react-icons/vsc";
import {
    SimpleErrorMessage,
    SimpleInfoMessage,
} from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { UsersDataContext } from "../page";
import { ToggleDisableUser } from "./userUtils/DeleteUser";
import { UpdateUserRole } from "./UpdateUserRole";
import { LoadingButton } from "@/components/Buttons";
import handleTimeFormat from "@/utils/dateTimeFormat";
import Link from "next/link";
import TableComponent from "@/components/TableComponent";

export default function UserTable() {
    const HEADERS = [
        { name: "First Name" },
        { name: "Last Name" },
        { name: "Role" },
        { name: "Email address" },
        { name: "Contact number" },
        { name: "Created by" },
        { name: "User state" },
        { name: "Action" },
    ];
    const usersResponse = useContext(UsersDataContext);
    const users = usersResponse?.data?.data || [];

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
                    <TableComponent
                        tableData={usersTableData(users)}
                        headers={HEADERS}
                    />
                </>
            )}
        </>
    );
}

const usersTableData = (users) => {
    const dateTime = (date) =>
        handleTimeFormat(date, {
            isFormated: true,
            dateTime: true,
        });

    return users.map((user) => ({
        id: user.id,
        columns: [
            {
                content: (
                    <Link
                        href={`/dashboard/user-management/${user.id}`}
                        className="inline-flex items-center hover:underline gap-x-3"
                    >
                        <div className="flex items-center gap-x-2">
                            <div>
                                <h2 className="  font-bold text-lg dark: ">
                                    {user?.first_name}
                                </h2>
                            </div>
                        </div>
                    </Link>
                ),
            },
            { content: user.last_name },
            { content: user.role },
            { content: user.email },
            { content: user.contact_number },
            // { content: dateTime(user) },
            { content: user.parent?.first_name || "N/A" },
            {
                content: (
                    <div
                        className={`flex items-center gap-x-3 font-medium  justify-center ${
                            user?.isDisabled
                                ? "text-gray-400"
                                : "text-green-500 "
                        }`}
                    >
                        {user.isDisabled ? "Disabled" : "Active"}
                    </div>
                ),
            },
            {
                content: (
                    <div
                        key={user.contact_number}
                        className="flex items-center "
                    >
                        <ToggleDisableUser user={user} />

                        <UpdateUserRole
                            title={"Update role"}
                            userData={user}
                            icon={
                                <VscGear
                                    size={18}
                                    className="font-bold"
                                    fontWeight={800}
                                />
                            }
                            styleButton="rounded-full border border-gray-600 hover:border-transparent"
                        />
                    </div>
                ),
            },
        ],
    }));
};
