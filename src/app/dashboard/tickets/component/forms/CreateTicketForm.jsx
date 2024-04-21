import { VscAdd } from "react-icons/vsc";
import { LoadingButton, SubmitButton } from "../../../../../components/Buttons";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { getDepartmentData } from "./utils";
import dynamic from "next/dynamic";
import CustomEditor from "@/components/Editor";
import { QUERY_KEYS } from "@/queryKeys";
import TagsCardComponent from "@/components/TagsCardComponent";
import Tag from "@/components/TagComponent";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function CreateTicketForm({ modalClose }) {
    const formElement = useRef();
    const defaultDepartmentId = localStorage.getItem(
        "ticket_defaultDepartment"
    );
    const [detail, setDetail] = useState("");
    const [formError, setFormError] = useState({});
    const queryClient = useQueryClient();

    const responseData = useQuery("departments", getDepartmentData);
    const [selectedTag, setSelectedTag] = useState([]);

    const mutation = useMutation({
        mutationFn: (event) => {
            event.preventDefault();
            const ticketData = {
                taskTitle: event.target.taskTitle.value,
                ticketDetil: detail,
                department: event.target.department.value,
                tags: selectedTag.map((tag) => tag.id),
            };

            if (ticketData.taskTitle === "") {
                setFormError({
                    taskTitle:
                        "Ticket tile should be at least 5 characters long.",
                });
                throw new Error();
            }
            return axios.post(`/api/tickets`, ticketData);
        },

        onSettled: async (data) => {
            const response = await data;
            if (response) {
                if (response.data?.success) {
                    toast.success("Ticket is created.");
                    setTimeout(() => {
                        modalClose(false);
                    }, 1000);
                } else {
                    toast.error(response.data?.message);
                }
            }

            setSelectedTag([]);
            formElement.current.reset();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TICKET_LIST],
            });
        },
    });

    const getTag = (tag) => {
        setSelectedTag((pre) => {
            const isAvailable = pre.find(
                (selectedTag) => selectedTag.id === tag.id
            );
            if (isAvailable) {
                return pre.filter((selectedTag) => selectedTag.id !== tag.id);
            }
            return [...pre, tag];
        });
    };

    const handleTagClicks = (tag) => {
        setSelectedTag((pre) =>
            pre.filter((selectedTag) => selectedTag.id !== tag.id)
        );
    };

    return (
        <form ref={formElement} onSubmit={mutation.mutate}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
                <div>
                    <label
                        htmlFor="taskTitle"
                        className="block text-sm text-white dark:text-white font-medium leading-6 "
                    >
                        Ticket title
                    </label>
                    <div className="mt-2 ">
                        <input
                            id="taskTitle"
                            name="taskTitle"
                            type="text"
                            className="block w-full border border-gray-700 bg-inherit rounded-md py-1.5 px-2 text-white font-bold text-md shadow-sm ring-inset ring-none placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                        />
                        {mutation.isError && formError?.taskTitle && (
                            <small className="text-red-500 font-bold">
                                {formError?.taskTitle}
                            </small>
                        )}
                    </div>
                </div>

                <div className="">
                    <label
                        htmlFor="department"
                        className="block text-sm text-white  font-medium leading-6 "
                    >
                        Department
                    </label>
                    <div className="mt-2">
                        <select
                            className="py-2 temp-bg border rounded-lg px-2 w-full"
                            id="department"
                            name="department"
                        >
                            <option value="">select department</option>
                            {responseData.isSuccess &&
                            responseData.data?.success
                                ? responseData.data.data?.map((item) => (
                                      <option
                                          key={item.id}
                                          selected={
                                              item.id === defaultDepartmentId
                                          }
                                          value={item.id}
                                      >
                                          {item.name}
                                      </option>
                                  ))
                                : null}
                        </select>
                        {mutation.isError && formError?.department && (
                            <small className="text-red-500 font-bold">
                                {formError?.department}
                            </small>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <label
                    htmlFor="tag"
                    className="block text-sm mt-2 text-white   font-medium leading-6 "
                >
                    Assign tags
                </label>

                <div className="mt-2 relative flex-row items-center gap-2">
                    <div className="min-w-[10em] max-w-[13em]">
                        <TagsCardComponent
                            className={"!border"}
                            selectedIds={selectedTag.map((tag) => tag.id)}
                            onClick={getTag}
                        />
                    </div>
                    <div className=" flex gap-2 flex-wrap">
                        {selectedTag.map((tag) => (
                            <Tag
                                onClick={handleTagClicks}
                                key={tag.id}
                                tag={tag}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <label
                    htmlFor="ticketDetil"
                    className="block mt-2 text-sm w-full text-white   font-medium leading-6 "
                >
                    Ticket Detail
                </label>
                <div className="mt-2">
                    <CustomEditor onChange={setDetail} />
                    {mutation.isError && formError?.ticketDetil && (
                        <small className="text-red-500 font-bold">
                            {formError?.ticketDetil}
                        </small>
                    )}
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
                        title={"Create ticket"}
                    />
                )}
            </div>
        </form>
    );
}
