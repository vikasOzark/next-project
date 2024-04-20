import CustomEditor from "@/components/Editor";
import { isJSONString } from "@/utils/validateJsonString";
import { useContext, useState } from "react";
import { TicketDataContext } from "../page";

export default function TicketDetailSection() {
    const { ticketData } = useContext(TicketDataContext);

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
            <div className="mb-2">
                <label
                    htmlFor="ticketDetil"
                    className="block mt-2 text-sm w-full text-white font-medium leading-6 "
                >
                    Ticket Detail
                </label>
                <div className="mt-2">
                    {isJsonString ? (
                        <CustomEditor
                            editable={false}
                            key={"editor-123"}
                            onChange={setEditorData}
                            className={
                                " p-2 border border-gray-700/60 h-[15rem] min-h-[10rem]  max-h-[20rem]"
                            }
                            editorProps={{ initialContent: details }}
                        />
                    ) : (
                        <div className="p-2 border rounded-md border-gray-700/60 h-[8em] min-h-[10rem]  max-h-[20rem]" />
                    )}
                </div>
            </div>
        </>
    );
}
