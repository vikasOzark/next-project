import { FcBearish, FcBullish, FcMindMap, FcProcess } from "react-icons/fc";
import { TicketStatusCard } from "@/app/dashboard/tickets/component/DashboardInfoCard";
import { getTickets, overViewFilterData } from "./templateUtils";

export default async function Template({ children }) {
  // const tickets = await getTickets();
  // const overViewData = overViewFilterData(tickets);

  return (
    <>
      <main>
        {/* <div className=" grid grid-cols-4 gap-2 overflow-x-auto overflow-hidden w-full">
          <TicketStatusCard
            title={"Total Tickes"}
            data={overViewData.total}
            analyticString={"Success rate is 20%"}
            icon={<FcMindMap size={25} />}
          />
          <TicketStatusCard
            title={"Closed"}
            data={overViewData.closed}
            analyticString={"Closing rate is 50%"}
            icon={<FcProcess size={25} />}
          />
          <TicketStatusCard
            title={"Open Tickes"}
            data={overViewData.pending}
            analyticString={"Success rate is 20%"}
            icon={<FcBullish size={25} />}
          />
          <TicketStatusCard
            title={"Rejected Tickes"}
            data={overViewData.rejected}
            analyticString={"Success rate is 20%"}
            icon={<FcBearish size={25} />}
          />
        </div> */}
        <div className="mt-4 w-full ps-1">{children}</div>
      </main>
    </>
  );
}
