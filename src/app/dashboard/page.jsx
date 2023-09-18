import { Card } from "@/components/Card";
import { SideNavbar } from "@/components/Sidenavbar";
import Link from "next/link";

export default function Dashboard () {
    return (
        <>
            <main className="">
                <section>
                    <div className="grid my-3 sm:grid-cols-1 p-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
                            <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                            <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                            <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                            <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                            <Card cssClass={"cursor-pointer hover:shadow-xl"} />
                    </div>
                </section>
            </main>
        </>
    )
}