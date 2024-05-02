import CustomEditor from "@/components/Editor";
import { isJSONString } from "@/utils/validateJsonString";
import { useContext, useState } from "react";
import { TicketDataContext } from "../page";
import { useSearchParams } from "next/navigation";

export default function TicketDetailSection() {
    const { ticketData, isLoading } = useContext(TicketDataContext);
    const searchParam = useSearchParams();
    const mode = searchParam.get("mode");
    const editable = mode === "edit";

    const isJsonString = isJSONString(ticketData?.ticketDetil);
    const [editorData, setEditorData] = useState("");

    let details;
    if (isJsonString) {
        details = JSON.parse(ticketData?.ticketDetil);
    } else {
        details = ticketData?.ticketDetil;
    }

    const isWebhookCreate = ticketData?.webhook_event_id;
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
                    <input
                        type="hidden"
                        name="ticketDetil"
                        value={editorData}
                    />
                    {!isLoading && !isWebhookCreate && (
                        <>
                            <CustomEditor
                                editable={editable}
                                key={"editor-123"}
                                onChange={setEditorData}
                                className={
                                    " p-2 border border-gray-700/60 h-[15rem] min-h-[10rem]  max-h-[20rem]"
                                }
                                editorProps={{ initialContent: details }}
                            />
                        </>
                    )}
                    <div className="">
                        <p>{details}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
