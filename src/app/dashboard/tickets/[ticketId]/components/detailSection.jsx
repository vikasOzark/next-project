import CustomEditor from "@/components/Editor";
import Modal from "@/components/Modal";
import { isJSONString } from "@/utils/validateJsonString";
import { useState } from "react";
import { VscEdit } from "react-icons/vsc";
import UpdateTicketForm from "../../component/forms/UpdateTicketForm";
import UpdateTicketButtonModal from "../../component/UpdateTicketButtonModal";

export default function TicketDetailSection({ ticketData }) {
    const isJsonString = isJSONString(ticketData?.ticketDetil);
    const [editorData, setEditorData] = useState("");

    let details;
    if (isJsonString) {
        details = JSON.parse(ticketData?.ticketDetil);
    } else {
        details = ticketData?.ticketDetil;
    }

    return (
        <>
            {isJsonString ? (
                <div className="mb-2">
                    <label
                        htmlFor="ticketDetil"
                        className="block mt-2 text-sm w-full text-white font-medium leading-6 "
                    >
                        Ticket Detail
                    </label>
                    <div className="mt-2">
                        <CustomEditor
                            onChange={setEditorData}
                            className={
                                " p-2 border border-gray-700/60 h-[15rem] min-h-[10rem]  max-h-[20rem]"
                            }
                            editorProps={{ initialContent: details }}
                        />
                    </div>
                </div>
            ) : (
                <p className=" capitalize text-sm md:text-md lg:text-lg ">
                    {details}
                </p>
            )}
        </>
    );
}
