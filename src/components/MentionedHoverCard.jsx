import { FcBusinessContact } from "react-icons/fc";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

export function TicketHoverCardTest({ user }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <button>
                    {" "}
                    {user.first_name} {user.last_name}
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-[#434447] text-white shadow-xl border-0 rounded-lg">
                <div className="flex gap-2 ">
                    <FcBusinessContact size={65} />
                    <div className="space-y-1 w-full">
                        <div className="flex items-center justify-between">
                            <h4 className="text-lg capitalize font-semibold">
                                {user.first_name} {user.last_name}
                            </h4>

                            <p className="text-sm capitalize text-white bg-blue-600 px-2 rounded-md font-bold ">
                                {user?.role}
                            </p>
                        </div>

                        <p className="text-sm capitalize text-gray-200">
                            {user?.email}
                        </p>

                        <p className="text-sm capitalize text-gray-200">
                            {user?.contact_number}
                        </p>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
