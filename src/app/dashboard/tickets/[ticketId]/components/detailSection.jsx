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
            <div className="soft-bg border border-gray-600 mt-5 rounded-2xl p-3">
                <div className="">
                    <h3 className="text-gray-400 text-sm lg:text-lg md:text-md">
                        Ticket details
                    </h3>
                    {isJsonString ? (
                        <div className="">
                            <CustomEditor
                                onChange={setEditorData}
                                className={"border-none"}
                                editable={false}
                                editorProps={{
                                    initialContent: details,
                                }}
                            />
                        </div>
                    ) : (
                        <p className=" capitalize text-sm md:text-md lg:text-lg ">
                            {details}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
