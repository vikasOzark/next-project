import { SubmitButton } from "@/components/Buttons";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { VscAdd, VscPerson } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";

export const AssignedUser = ({ ticketData }) => {
  const personData = ticketData?.assingedUser;

  return (
    <>
      {ticketData["assingedUser"] !== null && (
        <div className="relative">
          <p className=" capitalize peer flex gap-2 cursor-pointer   items-center bg-slate-700 rounded px-4 py-1">
            <VscPerson size={28} />
            <span>
              {ticketData?.assingedUser?.first_name}{" "}
              {ticketData?.assingedUser?.last_name}
            </span>
          </p>
          <FloatingCard personData={personData} />
        </div>
      )}
    </>
  );
};

export const FloatingCard = ({ personData }) => {
  return (
    <>
      <div className="absolute w-max hidden peer-hover:block transition-opacity mt-2 rounded-lg bg-gray-600 p-2">
        <div className="border-b">
          <p className="flex text-3xl mb-1 justify-center ">
            {personData.first_name} {personData.last_name}
          </p>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <div className="">
            <h3 className="text-gray-400 text-lg">Email</h3>
            <p className=" capitalize">{personData?.email}</p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Contact number</h3>
            <p className=" capitalize">{personData?.contact_number}</p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Role</h3>
            <p className=" capitalize">{personData?.role}</p>
          </div>
          <div className="">
            <h3 className="text-gray-400 text-lg">Department</h3>
            <p className=" capitalize"></p>
          </div>
        </div>
      </div>
    </>
  );
};

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
