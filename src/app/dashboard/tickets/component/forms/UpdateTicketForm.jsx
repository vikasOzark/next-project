import { LoadingButton, SubmitButton } from "../../../../../components/Buttons";
import { useEffect, useRef, useState } from "react";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import CustomEditor from "@/components/Editor";
import { isJSONString } from "@/utils/validateJsonString";
import { useUpdateTicket } from "@/hooks/updateTicket.hook";
import { useGetDepartments } from "@/hooks/getDepartments";
import GitlabParser from "../parser/gitlabDescriptionParser";
import TagsCardComponent from "@/components/TagsCardComponent";
import { TagComponentWithRemove } from "@/components/TagComponent";

export default function UpdateTicketForm({ ticketData, setTicketUpdateModal }) {
    const formElement = useRef();
    const [selectedTag, setSelectedTag] = useState([]);
    const [ticketDataUpdate, setTicketDataUpdate] = useState({ ...ticketData });
    const [detail, setDetail] = useState("");

    const responseData = useGetDepartments();
    const mutation = useUpdateTicket(
        setSelectedTag,
        selectedTag,
        formElement,
        ticketDataUpdate.id
    );

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

    useEffect(() => {
        if (mutation.data?.data?.success) {
            setTicketUpdateModal(false);
        }
    }, [mutation.data?.data?.success, setTicketUpdateModal]);

    useEffect(() => {
        if (ticketDataUpdate.tags) {
            const tagsSelected = ticketDataUpdate?.tags.map((tag) => ({
                ...tag,
                isSelected: true,
            }));
            setSelectedTag(tagsSelected);
        }
    }, [ticketDataUpdate.tags]);

    const isJsonString = isJSONString(ticketData?.ticketDetil);
    let details;
    if (isJsonString) {
        details = JSON.parse(ticketData?.ticketDetil);
    } else {
        details = GitlabParser(ticketData?.ticketDetil);
    }

    return (
        <form
            ref={formElement}
            onSubmit={(event) => mutation.mutate({ event, detail })}
        >
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3">
                <div>
                    <label
                        htmlFor="taskTitle"
                        className="block text-sm text-white font-medium leading-6 "
                    >
                        Ticket title
                    </label>
                    <div className="mt-2">
                        <input
                            value={ticketDataUpdate.taskTitle}
                            id="taskTitle"
                            name="taskTitle"
                            onChange={(e) =>
                                setTicketDataUpdate({
                                    ...ticketDataUpdate,
                                    ["taskTitle"]: e.target.value,
                                })
                            }
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 px-2 softer-bg text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="department"
                        className="block text-sm text-white   font-medium leading-6 "
                    >
                        Department
                    </label>
                    <div className="mt-2">
                        <select
                            className="py-2 softer-bg rounded-lg px-2 w-full"
                            id="department"
                            name="department"
                        >
                            <option value="">select department</option>
                            {responseData.isSuccess &&
                            responseData.data?.success
                                ? responseData.data.data?.map((item) => (
                                      <option
                                          selected={
                                              ticketDataUpdate?.department
                                                  ?.name === item.name
                                                  ? true
                                                  : false
                                          }
                                          key={item.id}
                                          value={item.id}
                                      >
                                          {item.name}
                                      </option>
                                  ))
                                : null}
                        </select>
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
                            <TagComponentWithRemove
                                handler={getTag}
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
                    className="block mt-2 text-sm w-full text-white font-medium leading-6 "
                >
                    Ticket Detail
                </label>
                <div className="mt-2 p-2">
                    <CustomEditor
                        onChange={setDetail}
                        editorProps={{ initialContent: details }}
                    />
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
                        icon={
                            <MdOutlineTipsAndUpdates color="blue" size={28} />
                        }
                        title={"Update ticket"}
                    />
                )}
            </div>
        </form>
    );
}
