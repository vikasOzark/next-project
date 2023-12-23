import { cn } from "@/lib/utils";
import { VscAccount } from "react-icons/vsc";
import { BsTicketDetailed } from "react-icons/bs";

export default function TicketStatusInfo() {
  return (
    <>
      <main className="">
        <section>
          <div className="grid grid-cols-12 gap-2">
            <DashboardInfoCard className={"col-span-3"} />
            <DashboardInfoCard className={"col-span-3"} />
            <DashboardInfoCard className={"col-span-3"} />
            <DashboardInfoCard className={"col-span-3"} />
          </div>
        </section>
      </main>{" "}
    </>
  );
}

const DashboardInfoCard = ({ className, title, value }) => (
  <div
    class={cn(
      ` bg-white px-2 py-1 md:px-4 lg:px-4 md:py-2 lg:py-2 shadow-xl ring-1 rounded-lg `,
      className
    )}
  >
    <div class="">
      <div className="flex gap-2 items-center">
        <BsTicketDetailed className="md:text-2xl lg:text-3xl" />
        <span className=" text-sm md:text-2xl lg:text-2xl font-medium">
          {title}
        </span>
      </div>
      <div class="divide-y divide-gray-300/50">
        <div class="space-y-6 md:py-4 lg:py-4 text-base leading-7 text-gray-600">
          <p className=" text-lg md:text-2xl lg:text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  </div>
);
