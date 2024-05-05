import { LoadingState } from "../../../../components/Buttons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InfoMessage } from "../../../../components/Messages/NotificationMessage";
import {
    SimpleErrorMessage,
    SimpleInfoMessage,
} from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { VscAdd, VscTrash } from "react-icons/vsc";
import Modal from "@/components/Modal";
import { CreateDepartmentForm } from "@/components/Forms/CreateDepartment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export const Departments = () => {
    const savedDepartmentName = localStorage.getItem(
        "ticket_defaultDepartment"
    );
    const [defaultDepartment, setDefaultDepartment] =
        useState(savedDepartmentName);

    const responseData = useQuery("departments", async () => {
        const response = await fetch("/api/departments");
        const json_response = await response.json();
        return json_response;
    });

    const handleDefaultDepartment = (id) => {
        localStorage.setItem("ticket_defaultDepartment", id);
        setDefaultDepartment(id);
    };

    return (
        <>
            <div className="overflow-y-auto overflow-hidden h-[16em]">
                {responseData.isLoading && (
                    <>
                        <div className="flex justify-center ">
                            <LoadingState
                                title={"Loading..."}
                                cssClass={"text-white"}
                            />
                        </div>
                    </>
                )}
                {responseData.data?.success &&
                    responseData.data.data?.map((item) => (
                        <button
                            key={item.id}
                            className="flex group mb-2 w-full hover:softer-bg text-white items-center justify-between px-3 py-2 text-xs font-medium transition-colors duration-300 transform rounded-lg   dark:text-gray-200"
                        >
                            <div className="flex items-center gap-x-2 ">
                                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                                <span>{item.name}</span>
                                {defaultDepartment === item.id && (
                                    <span className="bg-gray-600 rounded-full px-2">
                                        Default
                                    </span>
                                )}
                            </div>
                            <div className=" flex gap-2 items-center transition-all">
                                <button
                                    onClick={() =>
                                        handleDefaultDepartment(item.id)
                                    }
                                    className="bg-slate-400 text-slate-800 invisible transition-opacity group-hover:visible rounded-full px-2 py-1"
                                >
                                    Set default
                                </button>
                                <DepartmentDelete deparment={item} />
                            </div>
                        </button>
                    ))}
            </div>
            {responseData.isSuccess &&
            responseData.data?.success &&
            responseData.data?.data?.length === 0 ? (
                <SimpleInfoMessage message={"No department found."} />
            ) : null}

            {responseData.isError ? (
                <SimpleErrorMessage message={"Something went wrong "} />
            ) : null}

            {responseData.isSuccess && !responseData.data?.success ? (
                <SimpleErrorMessage message={responseData.data?.message} />
            ) : null}
        </>
    );
};

export const CreateDepartment = () => {
    const [tagsModalOpen, setTagsModalOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setTagsModalOpen((pre) => !pre)}
                className="hover:bg-gray-400 p-2 rounded-full transition-all hover:text-black flex items-center"
            >
                <VscAdd />
            </button>
            <Modal
                open={tagsModalOpen}
                setOpen={setTagsModalOpen}
                modalTitle={"Create Department"}
            >
                <CreateDepartmentForm />
            </Modal>
        </>
    );
};

const DepartmentDelete = ({ deparment }) => {
    const queryClient = useQueryClient();

    const departmentDeleteMutation = useMutation(
        async () => {
            const response = await fetch(`/api/departments/${deparment.id}`, {
                method: "DELETE",
                headers: {},
            });
            return await response.json();
        },
        {
            onSuccess: (data) => {
                if (data.success) {
                    queryClient.invalidateQueries("departments");
                    toast.success(data?.message);
                } else {
                    toast.error(data.message);
                }
            },
            onError: (error) => {
                toast.error(data?.message);
            },
        }
    );
    return (
        <>
            {" "}
            {departmentDeleteMutation.isLoading ? (
                <LoadingState />
            ) : (
                <div
                    onClick={departmentDeleteMutation.mutate}
                    className="hover:bg-gray-500 invisible group-hover:visible rounded-full p-1  hover:text-red-500"
                >
                    <VscTrash size={18} />
                </div>
            )}
        </>
    );
};
