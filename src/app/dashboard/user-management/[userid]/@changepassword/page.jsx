"use client";
import toast, { LoaderIcon } from "react-hot-toast";
import { SubmitButton } from "@/components/Buttons";
import { VscSymbolMethod } from "react-icons/vsc";
import { useMutation } from "react-query";

export default function Login({ params }) {
    const { userid: userId } = params;

    const errorResponseData = {};
    const loading = false;

    const changePasswordMutation = useMutation({
        mutationFn: async (event) => {
            event.preventDefault();
            const password = event.target.password.value;
            const confirmPassword = event.target.confirmPassword.value;
            const adminPassword = event.target.adminPassword.value;

            if (password !== confirmPassword) {
                throw {
                    message: "Password and confirm password is not matched.",
                };
            }

            if (password.length < 6) {
                throw { message: "Password must be at least 6 characters." };
            }

            const payload = {
                confirmPassword,
                password,
                adminPassword,
            };

            return fetch(`/api/users/${userId}/change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }).then((res) => res.json());
        },
        onSuccess: (res) => {
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return (
        <>
            <form onSubmit={changePasswordMutation.mutate}>
                <div className="">
                    <div className="space-y-6">
                        <div className="flex gap-2 ">
                            <div className="w-full">
                                <label
                                    htmlFor="password"
                                    className="block text-sm text-white font-medium leading-6 "
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errorResponseData?.email && (
                                    <small className="text-red-500 font-bold">
                                        {errorResponseData?.email}
                                    </small>
                                )}
                            </div>

                            <div className="w-full">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="conform-password"
                                        className="block text-sm text-white font-medium leading-6 "
                                    >
                                        Conform Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="conform-password"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="current-conform-password"
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    {errorResponseData?.password && (
                                        <small className="text-red-500 font-bold">
                                            {errorResponseData?.password}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%]">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="admin-password"
                                    className="block text-sm text-white font-medium leading-6 "
                                >
                                    Admin Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="admin-password"
                                    name="adminPassword"
                                    type="password"
                                    autoComplete="current-admin-password"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errorResponseData?.password && (
                                    <small className="text-red-500 font-bold">
                                        {errorResponseData?.password}
                                    </small>
                                )}
                            </div>
                        </div>

                        {errorResponseData && (
                            <small className="text-red-500 font-bold">
                                {errorResponseData?.error}
                            </small>
                        )}
                        <div>
                            {loading ? (
                                <div className="flex w-full justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    <LoaderIcon className="w-[1rem] h-[1rem]" />{" "}
                                    Singing up...
                                </div>
                            ) : (
                                <div className="flex justify-end">
                                    <SubmitButton
                                        icon={<VscSymbolMethod size={20} />}
                                        cssClass="hover:bg-slate-300 hover:text-slate-900 transition-all font-bold"
                                        title={"Change password"}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
