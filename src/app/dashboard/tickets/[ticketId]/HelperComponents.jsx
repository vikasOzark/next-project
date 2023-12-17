import { SubmitButton } from "@/components/Buttons";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscAdd, VscPerson } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import { FcBusinessContact } from "react-icons/fc";
import { SlPeople } from "react-icons/sl";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const AddTicketNote = ({ ticketData }) => {
  const { id } = ticketData;
  const [modalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const addNoteMutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault();

      toast.loading("Adding note...");

      const data = event.target.note.value;
      if (data === "") {
        throw new Error("Please enter a note.");
      }

      return axios.post(`/api/tickets/${id}/notes`, { note: data });
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Note added successfully");
      queryClient.invalidateQueries(id);
    },
    onError: (error) => {
      toast.dismiss();
      toast.error("Couldn't added note !");
    },
  });

  useEffect(() => {
    const handleClose = () => setModalOpen(false);
    document.addEventListener("mousedown", handleClose);
  });

  return (
    <>
      {" "}
      <Button
        onClick={() => setModalOpen(true)}
        className="rounded-full gap-2 hover:bg-gray-600"
      >
        {" "}
        <VscAdd size={20} /> Add note
      </Button>
      <Modal open={modalOpen} setOpen={setModalOpen} modalTitle={"Add Note"}>
        <>
          <form onSubmit={addNoteMutation.mutate}>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
              <div className="">
                <h3 className="text-lg font-bold text-gray-700">
                  Ticket title
                </h3>
                <p>{ticketData.taskTitle}</p>
              </div>

              <div>
                <label
                  htmlFor="note"
                  className="block text-sm text-black dark:text-white font-medium leading-6 "
                >
                  Write note
                </label>
                <div className="mt-2">
                  <textarea
                    id="note"
                    name="note"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="">
                <SubmitButton title={"Add note"} cssClass={"bg-gray-300"} />
              </div>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export function TicketHoverCard({ ticketData }) {
  const personData = ticketData?.assingedUser;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="" className="gap-2 flex  capitalize">
          <SlPeople size={20} />
          {ticketData?.assingedUser?.first_name}{" "}
          {ticketData?.assingedUser?.last_name}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-[#434447] text-white shadow-xl border-0 rounded-lg">
        <div className="flex space-x-4">
          <FcBusinessContact size={65} />
          <div className="space-y-1">
            <h4 className="text-lg capitalize font-semibold">
              {ticketData?.assingedUser?.first_name}{" "}
              {ticketData?.assingedUser?.last_name}
            </h4>

            <p className="text-sm capitalize text-gray-200">
              {personData?.email}
            </p>
            <p className="text-sm capitalize text-gray-200">
              {personData?.contact_number}
            </p>
            <p className="text-sm capitalize text-gray-200">
              {personData?.role}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
