import { createReactInlineContentSpec } from "@blocknote/react";
import { FcBusinessContact } from "react-icons/fc";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

export function TicketHoverCardTest({ user }) {
    const userData = user?.props?.user;
    const colorList = [
        "#FF0000", // Red
        "#0000FF", // Blue
        "#FF00FF", // Magenta
        "#800080", // Purple
        "#FFA500", // Orange
        "#808080", // Gray
        "#008000", // Dark Green
        "#000080", // Navy Blue
    ];

    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colorList.length);
        return colorList[randomIndex];
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <button
                    className={` rounded-full px-2`}
                    style={{ backgroundColor: getRandomColor() }}
                >
                    @{`${userData?.first_name} ${userData?.last_name}`}
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-[#434447] text-white shadow-xl border-0 rounded-lg">
                <div className="flex gap-2 ">
                    <FcBusinessContact size={65} />
                    <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg capitalize font-semibold">
                                {`${userData?.first_name} ${userData?.last_name}`}
                            </h4>

                            <p className="text-sm capitalize text-white bg-blue-600 px-3 rounded-full font-bold ">
                                {userData?.role}
                            </p>
                        </div>

                        <p className="text-sm capitalize text-gray-200">
                            {userData?.email}
                        </p>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}

export const Mention = createReactInlineContentSpec(
    {
        type: "mention",
        propSchema: {
            user: {
                default: "Unknown",
            },
        },
        content: "none",
    },
    {
        render: (props) => <TicketHoverCardTest user={props.inlineContent} />,
    }
);
