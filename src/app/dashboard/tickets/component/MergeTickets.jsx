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

const MergeTickets = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen((pre) => !pre)}
        className="bg-transparent gap-2 hover:bg-gray-600"
      >
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
  const [selectedTag, setSelectedTag] = useState([]);
  const responseData = useQuery("departments", getDepartmentData);

  const mergeMutation = useMutation({
    mutationFn: async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const payload = Object.fromEntries(formData);
      payload.tags = selectedTag.map((tag) => tag.id);
      payload.mergingTicketIds = selectedTickets.map((ticket) => ticket.id);

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

  return (
    <div className=" transition-all">
      <form onSubmit={mergeMutation.mutate}>
        <p className="text-gray-600 text-sm font-bold line-clamp-2">
          <span className="text-gray-900">Note: </span>Merging tickets together
          will create new tickets as reference. Through you can track tickets
          all of them.
        </p>
        <div className="grid grid-cols-1 mt-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="taskTitle"
              className="block text-sm text-black dark:text-white font-medium leading-6 "
            >
              Ticket title
            </label>
            <div className="mt-2">
              <input
                id="taskTitle"
                name="taskTitle"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm text-black   font-medium leading-6 "
            >
              Department
            </label>
            <div className="mt-2">
              <select
                className="py-2 bg-white border rounded-lg px-2 w-full"
                id="department"
                name="department"
              >
                <option value="">select department</option>
                {responseData.isSuccess && responseData.data?.success
                  ? responseData.data.data?.map((item) => (
                      <option key={item.id} value={item.id}>
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
            htmlFor="department"
            className="block text-sm mt-2 text-black   font-medium leading-6 "
          >
            Assign tags
          </label>

          <div className="mt-2 relative flex items-center gap-2">
            <TagsOptions
              setSelectedTag={setSelectedTag}
              selectedTag={selectedTag}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="ticketDetil"
            className="block mt-2 text-sm w-full text-black   font-medium leading-6 "
          >
            Ticket Detail
          </label>
          <div className="mt-2">
            <textarea
              id="ticketDetil"
              name="ticketDetil"
              className="py-2 bg-white border w-full rounded-lg px-2"
            />
          </div>
        </div>

        <div className=" transition-all">
          <label
            htmlFor="ticketDetil"
            className="block mt-2 text-sm w-full text-black   font-medium leading-6 "
          >
            Merging tickets
          </label>
          <div className="grid grid-cols-12 gap-2">
            {selectedTickets.map((ticket) => (
              <MergingTicket key={ticket.id} ticket={ticket} />
            ))}
          </div>
          {!selectedTickets.length ? (
            <SimpleInfoMessage message={"No ticket selected to merge."} />
          ) : null}
        </div>

        <div className="flex justify-end">
          <SubmitButton
            cssClass={
              " border-0 mr-0 hover:bg-gray-300 text-black hover:text-gray-900 font-bold border hover:border-gray-300"
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
    <div className="bg-neutral- border rounded-lg p-2 col-span-4 shadow">
      <div className="flex items-center justify-between">
        <small className="bg-green-600 text-xs font-bold text-white px-3 rounded-md py-1">
          {ticket.status}
        </small>
        <VscClose
          onClick={handleRemove}
          className=" cursor-pointer hover:bg-neutral-300 rounded-full"
        />
      </div>
      <h1 className="text-gray-800 font-bold text-sm md:text-neutral-700 leading-none mt-1">
        {ticket.taskTitle}
      </h1>
      <small className="text-gray-600 font-bold">
        {ticket.department.name}
      </small>
    </div>
  );
};
