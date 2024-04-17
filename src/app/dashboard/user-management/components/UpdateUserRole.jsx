import { useState } from "react";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "react-query";
import { twMerge } from "tailwind-merge";
import { VscSparkle, VscSymbolEvent } from "react-icons/vsc";
import Input from "@/components/Input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { LoadingButton, SubmitButton } from "@/components/Buttons";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import DropdownNew from "@/components/Dropdown/DropdownNew";

export function UpdateUserRole({ styleButton, icon, title, userData }) {
    const queryClient = useQueryClient();
    const [updateUserModal, setUserUpdateModal] = useState(false);

    const mutationUpdateUser = useMutation({
        mutationFn: async (event) => {
            event.preventDefault();
            const payload = {
                role: event.target.role.value,
                password: event.target.password.value,
            };

            return axios.patch(`/api/users/${userData.id}`, {
                OPERATION_TYPE: "alter_role",
                ...payload,
            });
        },
        onSuccess: (response) => {
            toast.success(response.data.message);
            queryClient.invalidateQueries("users-list");
        },
        onError: (error) => {
            const response = JSON.parse(error?.request?.response);
            toast.error(response.message);
        },
    });

    return (
        <>
            <DropdownNew title={"Alter role"} btnClassName={""}>
                <DropdownMenuItem
                    className="dropdown-item"
                    onClick={() => setUserUpdateModal(true)}
                >
                    <VscSparkle
                        size={18}
                        className="font-bold"
                        fontWeight={800}
                    />
                    Alter role
                </DropdownMenuItem>
            </DropdownNew>

            <Modal
                cssClass={"min-w-fit"}
                className=" "
                open={updateUserModal}
                setOpen={setUserUpdateModal}
                modalTitle={"Alter role"}
            >
                <AlterUserConfirm mutationFn={mutationUpdateUser} />
            </Modal>
        </>
    );
}

export const AlterUserConfirm = ({ mutationFn }) => {
    const session = useSession();
    const userRole = session?.data?.user.userData.role;

    return (
        <>
            <form onSubmit={mutationFn.mutate}>
                <div className="mb-2">
                    <label htmlFor="">Select user role</label>
                    <div className="">
                        <select
                            name="role"
                            required
                            className="w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option value="">Select role type</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </div>
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Admin password
                    </label>
                    <small>
                        Please enter your password to conform your identity.
                    </small>
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">
                                {">"}
                            </span>
                        </div>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            required
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  ${
                                userRole === "User"
                                    ? "ring-red-600 focus:ring-red-600"
                                    : "focus:ring-green-600"
                            } sm:text-sm sm:leading-6`}
                            placeholder="*********"
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    {mutationFn.isLoading ? (
                        <LoadingButton
                            title={"Altering role..."}
                            cssClass={"bg-gray-200 rounded-full"}
                            icon={<VscSymbolEvent size={20} />}
                        />
                    ) : (
                        <SubmitButton
                            title={"Alter role"}
                            cssClass={
                                "bg-gray-200 transition-all rounded-full hover:bg-gray-300"
                            }
                            icon={<VscSymbolEvent size={20} />}
                        />
                    )}
                </div>
            </form>
        </>
    );
};
