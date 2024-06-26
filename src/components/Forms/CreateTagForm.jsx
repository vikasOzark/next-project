import { useRef, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { LoadingButton, SubmitButton } from "../Buttons";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const CreateTagForm = ({ setTagsModalOpen }) => {
    const queryClient = useQueryClient();
    const [tagColor, setTagColor] = useState(null);
    const formElement = useRef();

    const handleColor = (color) => {
        setTagColor(color);
    };

    const mutation = useMutation({
        mutationFn: (event) => {
            event.preventDefault();
            const tagData = {
                title: event.target.title.value,
                color: tagColor,
            };
            return axios.post(`/api/tags`, tagData);
        },

        onSettled: async (data) => {
            const response = await data;
            if (response) {
                if (response.data?.success) {
                    toast.success(response.data?.message);
                    setTagColor(null);
                    setTimeout(() => {
                        setTagsModalOpen(false);
                    }, 1000);
                } else {
                    setTagColor(null);
                    toast.error(response.data?.message);
                }
            }
        },
        onError: async (data) => {
            const message = JSON.parse(data?.request?.response);
            toast.error(data.message);
            return;
        },
        onSuccess: () => queryClient.invalidateQueries("tags-list"),
    });

    return (
        <>
            <form ref={formElement} onSubmit={mutation.mutate}>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm text-white dark:text-white font-medium leading-6 "
                        >
                            Tag title
                        </label>
                        <div className="mt-2">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="ticketDetil"
                        className="block mt-2 text-sm w-full text-white  font-medium leading-6 "
                    >
                        Tag Color
                    </label>
                    <div className="mt-2  flex gap-2">
                        <div
                            onClick={() => handleColor("bg-red-400")}
                            className={`bg-red-400 h-10 w-10 rounded ${
                                tagColor === "bg-red-400"
                                    ? " border-2 border-black"
                                    : ""
                            }`}
                        ></div>
                        <div
                            onClick={() => handleColor("bg-blue-400")}
                            className={`bg-blue-400 h-10 w-10 rounded cursor-pointer hover:bg-blue-500 ${
                                tagColor === "bg-blue-400"
                                    ? " border-2 border-black"
                                    : ""
                            }`}
                        ></div>
                        <div
                            onClick={() => handleColor("bg-purple-400")}
                            className={`bg-purple-400 h-10 w-10 rounded cursor-pointer hover:bg-purple-500 ${
                                tagColor === "bg-purple-400"
                                    ? " border-2 border-black"
                                    : ""
                            }`}
                        ></div>
                        <div
                            onClick={() => handleColor("bg-yellow-400")}
                            className={`bg-yellow-400 h-10 w-10 rounded cursor-pointer hover:bg-yellow-500 ${
                                tagColor === "bg-yellow-400"
                                    ? " border-2 border-black"
                                    : ""
                            }`}
                        ></div>
                        <div
                            onClick={() => handleColor("bg-slate-400")}
                            className={`bg-slate-400 h-10 w-10 rounded cursor-pointer hover:bg-slate-500 ${
                                tagColor === "bg-slate-400"
                                    ? " border-2 border-black"
                                    : ""
                            }`}
                        ></div>
                        <div
                            onClick={() => handleColor("bg-green-400")}
                            className={`bg-green-400 h-10 w-10 rounded cursor-pointer hover:bg-green-500 ${
                                tagColor === "bg-green-400"
                                    ? " border-2 border-black"
                                    : ""
                            }`}
                        ></div>
                        <div
                            onClick={() => handleColor("bg-violet-400")}
                            className={` bg-violet-600 h-10 w-10 rounded cursor-pointer hover:bg-violet-700 ${
                                tagColor === "bg-violet-600"
                                    ? " border-2 border-black"
                                    : ""
                            }`}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-end mt-2">
                    {mutation.isLoading ? (
                        <LoadingButton title={"Creating..."} />
                    ) : (
                        <SubmitButton
                            cssClass={
                                " border-0 mr-0 hover:bg-gray-300 text-black hover:text-gray-900 font-bold border hover:border-gray-300"
                            }
                            icon={<VscAdd size={18} />}
                            title={"Create Tag"}
                        />
                    )}
                </div>
            </form>
        </>
    );
};
