import { FcBearish, FcBullish, FcMindMap, FcProcess } from "react-icons/fc";
import { TicketStatusCard } from "@/app/dashboard/tickets/component/DashboardInfoCard";

export default function Template({ children }) {
  return (
    <>
      <main>
        <div className=" grid grid-cols-4 gap-2 overflow-x-auto overflow-hidden w-full">
          <TicketStatusCard
            title={"Total Tickes"}
            data={32}
            analyticString={"Success rate is 20%"}
            icon={<FcMindMap size={25} />}
          />
          <TicketStatusCard
            title={"Closed"}
            data={15}
            analyticString={"Closing rate is 50%"}
            icon={<FcProcess size={25} />}
          />
          <TicketStatusCard
            title={"Open Tickes"}
            data={10}
            analyticString={"Success rate is 20%"}
            icon={<FcBullish size={25} />}
          />
          <TicketStatusCard
            title={"Rejected Tickes"}
            data={5}
            analyticString={"Success rate is 20%"}
            icon={<FcBearish size={25} />}
          />
        </div>
        <div className="mt-4 w-full ps-1">{children}</div>
      </main>
    </>
  );
}
