import { FcVlc } from "react-icons/fc";

export function TicketEmptyState({ message }) {
    return (
        <>
            <div className="grid place-content-center">
                <div className="flex justify-center">
                    <FcVlc size={45} />
                </div>
                <div className="font-bold text-2xl text-gray-400">
                    Opps..! No tickets found
                </div>
            </div>
        </>
    );
}
