export default function Layout({
    children,
    ticketStatus,
    recentActivity,
    analytics,
}) {
    return (
        <>
            {/* {ticketStatus} */}
            <section>
                <div className="grid gap-2 sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12">
                    <div className="temp-bg rounded-lg overflow-hidden p-3 sm:col-span-8 md:col-span-8 lg:col-span-8">
                        {analytics}
                    </div>
                    <div className=" temp-bg rounded-lg overflow-hidden sm:col-span-4 p-3 md:col-span-4 lg:col-span-4">
                        {recentActivity}
                    </div>
                </div>
            </section>
            {children}
        </>
    );
}
