import { SubmitButton } from "@/components/Buttons";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { VscClose, VscGitMerge } from "react-icons/vsc";
import { SelectContext } from "../page";
import { SimpleInfoMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";
import { useMutation, useQuery } from "react-query";
import { TagsOptions } from "./forms/TagsDropDownOptions";
import { getDepartmentData } from "./forms/utils";
import toast from "react-hot-toast";
import TagsCardComponent from "@/components/TagsCardComponent";
import Tag from "@/components/Tag";
import CustomEditor from "@/components/Editor";

const MergeTickets = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Button onClick={() => setOpen((pre) => !pre)}>
                <VscGitMerge size={18} />
                <span className="hidden md:block lg:block">Merge Tickets</span>
            </Button>
            <Modal
                open={open}
                setOpen={setOpen}
                size={"lg"}
                cssClass={"w-full"}
                modalTitle={"Merge tickets"}
            >
                <div className="">
                    <MergeForm />
                </div>
            </Modal>
        </>
    );
};

export default MergeTickets;

export const MergeForm = () => {
    const { selectedTickets } = useContext(SelectContext);
    const [detail, setDetail] = useState("");
    const [selectedTag, setSelectedTag] = useState([]);
    const responseData = useQuery("departments", getDepartmentData);
    const defaultDepartmentId = localStorage.getItem(
        "ticket_defaultDepartment"
    );

    const mergeMutation = useMutation({
        mutationFn: async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const payload = Object.fromEntries(formData);
            payload.tags = selectedTag.map((tag) => tag.id);
            payload.mergingTicketIds = selectedTickets.map(
                (ticket) => ticket.id
            );
            payload.ticketDetil = detail;

            const response = await fetch(`/api/tickets/merge`, {
                method: "POST",
                body: JSON.stringify(payload),
            });
            const json_response = await response.json();
            return json_response;
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        },
        onError: (error) => {
            toast.error("Couldn't complete your request at the moment.");
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
        <div className=" transition-all tex-white">
            <form onSubmit={mergeMutation.mutate}>
                <p className=" text-sm font-bold line-clamp-2">
                    <span className="">Note: </span>Merging tickets together
                    will create new tickets as reference. Through you can track
                    tickets all of them.
                </p>
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
                            {mergeMutation.isError && formError?.taskTitle && (
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
                                                  item.id ===
                                                  defaultDepartmentId
                                              }
                                              value={item.id}
                                          >
                                              {item.name}
                                          </option>
                                      ))
                                    : null}
                            </select>
                            {mergeMutation.isError && formError?.department && (
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
                        {mergeMutation.isError && formError?.ticketDetil && (
                            <small className="text-red-500 font-bold">
                                {formError?.ticketDetil}
                            </small>
                        )}
                    </div>
                </div>

                <div className=" transition-all">
                    <label
                        htmlFor="ticketDetil"
                        className="block mt-2 text-sm w-full    font-medium leading-6 "
                    >
                        Merging tickets
                    </label>
                    <div className="grid grid-cols-12 gap-2">
                        {selectedTickets.map((ticket) => (
                            <MergingTicket key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                    {!selectedTickets.length ? (
                        <SimpleInfoMessage
                            message={"No ticket selected to merge."}
                        />
                    ) : null}
                </div>

                <div className="flex justify-end">
                    <SubmitButton
                        cssClass={
                            " border-0 mr-0 hover:bg-gray-300  hover: font-bold border hover:border-gray-300"
                        }
                        icon={<VscGitMerge size={18} />}
                        title={"Merge ticket"}
                    />
                </div>
            </form>
        </div>
    );
};

export const MergingTicket = ({ ticket }) => {
    const { selectedTickets, setSelectedTickets } = useContext(SelectContext);

    const handleRemove = () => {
        setSelectedTickets(selectedTickets.filter((t) => t.id !== ticket.id));
        document.getElementById(ticket.id).checked = false;
    };

    return (
        <div className="temp-card-bg rounded-lg p-2 col-span-4 shadow">
            <div className="flex items-center justify-between">
                <small className="bg-green-600 text-xs font-bold text-white px-3 rounded-md py-1">
                    {ticket.status}
                </small>
                <VscClose
                    onClick={handleRemove}
                    className=" cursor-pointer hover:bg-neutral-300 rounded-full"
                />
            </div>
            <h1 className="text-gray-200 font-bold text-sm md:text-gray-200 leading-none mt-1">
                {ticket.taskTitle}
            </h1>
            <small className=" font-bold">{ticket.department.name}</small>
        </div>
    );
};
