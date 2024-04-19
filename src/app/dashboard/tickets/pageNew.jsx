import TicketDetailSection from "./[ticketId]/components/detailSection";

export default function NewTicketDetail({ ticketData }) {
    console.log(ticketData);

    return (
        <>
            <main className="px-2 md:px-10 lg:px-10">
                <div className="">{ticketData?.taskTitle}</div>
                <div className="">
                    {Object.keys(ticketData).length > 0 && (
                        <>
                            <TicketDetailSection ticketData={ticketData} />
                            {/* <UpdateTicketButtonModal
                                title={"Update ticket"}
                                className={"mt-2"}
                                ticketData={ticketData}
                            /> */}
                        </>
                    )}
                </div>
            </main>
        </>
    );
}
