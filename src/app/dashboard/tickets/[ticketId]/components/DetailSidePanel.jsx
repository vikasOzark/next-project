import {
    VscChromeClose,
    VscDebugDisconnect,
    VscPerson,
    VscTag,
} from "react-icons/vsc";
import SidePanelSection from "./SidePanelSectionLayout";
import { AssignUserAction } from "../../ticketActionUtils";
import { SetTimeFrame } from "./SetTimeFrame";
import TagsCardComponent from "@/components/TagsCardComponent";
import { TicketDataContext } from "../page";
import { useContext } from "react";
import { cn } from "@/lib/utils";

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
                <TagsCardComponent />
                <div className=" mb-2 flex-wrap">
                    {ticketData?.tags?.map((tag) => (
                        <div
                            key={tag.id}
                            onClick={() => onClick(tag)}
                            className={cn(
                                "p-1 px-2 mb-1 flex items-center justify-between max-w-[8em] min-w-[6em] rounded-full ",
                                tag.color
                            )}
                        >
                            {tag.title}
                            <span className="hover:bg-gray-500 rounded-full px-1 cursor-pointer">
                                <VscChromeClose size={20} />
                            </span>
                        </div>
                    ))}
                </div>
            </SidePanelSection>
        </div>
    );
}
