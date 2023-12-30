import { useQueryClient } from "react-query";
import { LoadingState, SubmitButton } from "@/components/Buttons";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscAdd, VscCheck } from "react-icons/vsc";
import { useMutation, useQuery } from "react-query";
import { appendTicketCall, getTicketList } from "./utils";

export const AppendChildToMergeForm = ({ ticketData }) => {
  const [selectedTickets, setTicket] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [ticketsData, setTicketData] = useState([]);
  const queryClient = useQueryClient();

  const tickets = useQuery({
    queryKey: "tickets-list",
    queryFn: () => getTicketList(setTicketData),
  });

  useEffect(() => {
    setSelectedIds(selectedTickets.map((ticket) => ticket.id));
  }, [selectedTickets]);

  const handleSelect = (ticket) => {
    const isAlreadyExists = selectedTickets.find(
      (selected) => selected.id === ticket.id
    );
    if (!isAlreadyExists) {
      setTicket([...selectedTickets, ticket]);
    } else {
      const remove = selectedTickets.filter(
        (selected) => selected.id !== ticket.id
      );
      setTicket(remove);
    }
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    const filtered = tickets.data?.data?.filter((ticket) =>
      ticket.taskTitle.toLowerCase().includes(value.toLowerCase())
    );
    setTicketData(filtered);
  };

  const appendMutation = useMutation({
    mutationKey: "append-tickets",
    mutationFn: (event) => appendTicketCall(event, ticketData, selectedIds),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response?.message);
        queryClient.invalidateQueries("tickets-list");
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message);
    },
  });

  return (
    <>
      <div className="">
        <div className="bg-gray-300 p-1 rounded-md ">
          <input
            onChange={handleFilter}
            type="search"
            name="searchInput"
            className="w-full bg-transparent p-1 active:outline-none focus:outline-none"
            placeholder="Search ticket"
          />
        </div>
        <div className=" mt-2 h-auto">
          {selectedTickets.map((selected) => (
            <span
              key={selected.id + "selected"}
              className="rounded-full bg-green-400 text-green-900 font-bold px-3 py-1  ms-1"
            >
              {selected.taskTitle}
            </span>
          ))}
        </div>

        <form onSubmit={appendMutation.mutate}>
          <div className="mt-4">
            {tickets.isLoading && <LoadingState title={"Loading tickets..."} />}
            <ul></ul>
            {ticketsData?.map((ticket) => (
              <li
                key={ticket.id}
                onClick={() => handleSelect(ticket)}
                className={` mb-2 rounded-md  cursor-pointer transition-all font-bold py-1 list-none px-2 ${
                  selectedIds.includes(ticket.id)
                    ? "bg-green-300 hover:bg-green-400"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  {ticket?.taskTitle}{" "}
                  {selectedIds.includes(ticket.id) && <VscCheck size={18} />}
                </div>
              </li>
            ))}
          </div>
          <div className=" flex justify-end">
            {appendMutation.isLoading ? (
              <LoadingState title={"Appending..."} />
            ) : (
              <SubmitButton icon={<VscAdd />} title={"Append ticket"} />
            )}
          </div>
        </form>
      </div>
    </>
  );
};
