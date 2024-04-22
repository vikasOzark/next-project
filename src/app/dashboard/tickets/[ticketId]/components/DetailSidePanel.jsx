import { VscDebugDisconnect, VscPerson, VscTag } from "react-icons/vsc";
import SidePanelSection from "./SidePanelSectionLayout";
import { AssignUserAction } from "../../ticketActionUtils";
import { SetTimeFrame } from "./SetTimeFrame";
import TagsCardComponent from "@/components/TagsCardComponent";
import { TicketDataContext } from "../page";
import { useContext } from "react";
import Tag from "@/components/TagComponent";
import { useMutation, useQueryClient } from "react-query";
import { patchRequest } from "@/app/apiFunctions/api";
import { QUERY_KEYS } from "@/queryKeys";

export default function DetailSidePanel() {
    const { isLoading, ticketData } = useContext(TicketDataContext);
    return (
        <div className=" px-2">
            <SidePanelSection
                icon={<VscPerson size={20} />}
                title={"Assign people"}
            >
                <AssignUserAction
                    actionData={ticketData}
                    className={"rounded-lg hover:bg-gray-700"}
                />
                {isLoading && (
                    <div className="h-[2rem] bg-gray-500 rounded-md animate-pulse" />
                )}
            </SidePanelSection>
            <SidePanelSection
                icon={<VscDebugDisconnect size={20} />}
                title={"Time frame"}
            >
                <SetTimeFrame ticketData={ticketData} />
            </SidePanelSection>
            <SidePanelSection icon={<VscTag size={20} />} title={"Tags"}>
                <TagAction />
            </SidePanelSection>
        </div>
    );
}

const TagAction = () => {
    const { ticketData } = useContext(TicketDataContext);
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data) => {
            return patchRequest({
                url: `tickets/${ticketData.id}/tag`,
                formData: {
                    tagId: data.id,
                },
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.TICKET_DETAIL, ticketData.id],
            });
        },
    });

    return (
        <>
            <TagsCardComponent
                onClick={mutate}
                selectedIds={ticketData?.tags?.map((tag) => tag.id)}
            />
            <div className=" mb-2 flex-wrap">
                {ticketData?.tags?.map((tag) => (
                    <Tag onClick={mutate} key={tag.id} tag={tag} />
                ))}
            </div>
        </>
    );
};
