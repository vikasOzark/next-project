import Modal from "@/components/Modal";
import { VscEdit } from "react-icons/vsc";
import UpdateTicketForm from "./forms/UpdateTicketForm";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function UpdateTicketButtonModal({
    ticketData,
    className,
    title,
}) {
    const [updateTicketModal, setTicketUpdateModal] = useState(false);
    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={() => setTicketUpdateModal((pre) => !pre)}
                    className={twMerge(
                        "text-gray-500 bg-gray-100 flex gap-2 py-1  px-4 items-center  rounded-lg transition-colors duration-200 text-lg dark:hover:gray-red-500 dark:text-gray-300 hover:text-gray-800 focus:outline-none",
                        className
                    )}
                >
                    <VscEdit size={16} />
                    <span className="hidden md:block lg:block">{title}</span>
                </button>
            </div>
            <Modal
                cssClass={"min-w-fit"}
                className=" "
                open={updateTicketModal}
                setOpen={setTicketUpdateModal}
                modalTitle={"Update ticket"}
            >
                <UpdateTicketForm
                    setTicketUpdateModal={setTicketUpdateModal}
                    ticketData={ticketData}
                />
            </Modal>
        </>
    );
}
