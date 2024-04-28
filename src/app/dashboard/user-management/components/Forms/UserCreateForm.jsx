import toast from "react-hot-toast";
import { createUserMutation } from "./userUtils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDepartmentData } from "@/app/dashboard/tickets/component/forms/utils";
import { useRef, useState } from "react";
import { Role } from "@prisma/client";
import { ButtonComponent } from "@/components/Buttons";
import { VscAccount } from "react-icons/vsc";

export default function UserCreateUser() {
    const [formError, setFormError] = useState({});
    const [departmentMemberId, setSelectedDepartment] = useState(null);
    const [role, setSelectedRole] = useState(null);
    const formElement = useRef();
    const queryClient = useQueryClient();

    const { data: departments = [] } = useQuery(
        "department-data",
        getDepartmentData,
        {
            select: (data) => data?.data || [],
        }
    );

    const mutation = useMutation({
        mutationFn: async (event) =>
            createUserMutation(
                event,
                { role, departmentMemberId },
                setFormError
            ),

        onSettled: (response) => {
            if (response) {
                if (response.data?.success) {
                    toast.success(response.data?.message);
                    setTimeout(() => {
                        modalClose(false);
                    }, 1000);
                } else {
                    queryClient.invalidateQueries("users-list");
                }
            }
        },
        onError: (error) => {
            const response = JSON.parse(error.request?.response);
            toast.error(response.message);
        },
        onSuccess: (response) => {
            if (response.data?.success) {
                toast.success(response.data?.message);
                setTimeout(() => {
                    modalClose(false);
                }, 1000);
                formElement.current.reset();
            } else {
                toast.error(response.message);
            }
        },
    });

    return (
        <>
            {" "}
            <div className="">
                <form
                    ref={formElement}
                    onSubmit={mutation.mutate}
                    className="space-y-4 !text-left"
                >
                    <div className=" grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-sm text-gray-100  font-medium leading-6 "
                            >
                                First Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    autoComplete="text"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {formError?.first_name && (
                                <small className="text-red-500 capitalize font-bold">
                                    {formError.first_name}
                                </small>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="lasr_name"
                                className="block text-sm text-gray-100  font-medium leading-6 "
                            >
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lasr_name"
                                    name="last_name"
                                    type="text"
                                    autoComplete="text"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            {formError?.last_name && (
                                <small className="text-red-500 capitalize font-bold">
                                    {formError.last_name}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className=" grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2">
                        <div className="">
                            <label className="block text-sm  font-medium leading-6 ">
                                Select department
                            </label>
                            <div className="mt-2 text-gray-900">
                                <select
                                    onChange={(event) =>
                                        setSelectedDepartment(
                                            event.target.value
                                        )
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option value="">select department</option>
                                    {departments.map((department) => (
                                        <>
                                            <option value={department.id}>
                                                {department.name}
                                            </option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            {formError?.departmentMemberId && (
                                <small className="text-red-500 capitalize font-bold">
                                    Department field is required.
                                </small>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="contact_number"
                                className="block text-sm text-gray-100  font-medium leading-6 "
                            >
                                Contact Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="contact_number"
                                    name="contact_number"
                                    type="text"
                                    autoComplete="text"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {formError?.contact_number && (
                                <small className="text-red-500 capitalize font-bold">
                                    {formError.contact_number}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="w-full text-white">
                        <label className=" text-sm flex items-center gap-2 text-gray-100  font-medium leading-6 ">
                            Select role
                        </label>
                        <div className="mt-2 text-gray-900">
                            <select
                                onChange={(event) =>
                                    setSelectedRole(event.target.value)
                                }
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="">select department</option>
                                <option value={Role.Admin}>{Role.Admin}</option>
                                <option value={Role.User}>{Role.User}</option>
                            </select>
                        </div>
                        {formError?.role && (
                            <small className="text-red-500 capitalize font-bold">
                                {formError.role}
                            </small>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-100  font-medium leading-6 "
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text  "
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {formError?.email && (
                            <small className="text-red-500 capitalize font-bold">
                                {formError.email}
                            </small>
                        )}
                    </div>

                    <div className=" grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-2">
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className=" text-sm flex items-center gap-2 text-gray-100  font-medium leading-6 "
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    //   ref={passwd}
                                    id="password"
                                    name="password"
                                    //   onChange={checkPassword}
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div className="mt-1">
                                    {/* {validationLevel ? (
                    <PasswordValidatorConponent
                      validateLevel={validationLevel}
                    />
                  ) : null} */}
                                </div>
                            </div>
                            {formError?.password && (
                                <small className="text-red-500 capitalize font-bold">
                                    {formError.password}
                                </small>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm text-gray-100  font-medium leading-6 "
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    //   ref={conformPasswd}
                                    //   onChange={checkPassword}
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {formError?.confirm_password && (
                                <small className="text-red-500 capitalize font-bold">
                                    {formError.confirm_password}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <ButtonComponent
                            className={"border"}
                            isLoading={mutation.isLoading}
                            title={"Create"}
                            icon={<VscAccount size={18} />}
                            type={"submit"}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
