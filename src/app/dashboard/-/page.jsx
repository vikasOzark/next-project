"use client";
import TicketStatusInfo from "./dashboardComponents/DashboardInfoCard";

export default function Dashboard() {
  return (
    <>
      <section>
        <TicketStatusInfo />
      </section>
      <section>
        <div className="grid mt-6 gap-2 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
          <div className="softer-bg rounded-lg overflow-hidden p-3 sm:col-span-8 md:col-span-8 lg:col-span-8">
            <div className=" text-white font-bold text-sm md:text-lg lg:text-lg">
              Analytics
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            quidem eius, ipsum minima commodi explicabo consequuntur repellendus
            molestiae facere, quis rerum dicta temporibus nisi nam inventore
            amet porro est nobis?
          </div>
          <div className=" softer-bg rounded-lg overflow-hidden sm:col-span-4 p-3 md:col-span-4 lg:col-span-4">
            <div className=" text-white font-bold text-sm md:text-lg lg:text-lg">
              Recent Tickets
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            quidem eius, ipsum minima commodi explicabo consequuntur repellendus
            molestiae facere, quis rerum dicta temporibus nisi nam inventore
            amet porro est nobis?
          </div>
        </div>
      </section>
    </>
  );
}
