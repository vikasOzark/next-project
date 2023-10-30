"use client"

import { useSession, signOut } from "next-auth/react"
export default function Dashboard () {
    const { data , status } = useSession()
    
    console.log(data);

    return (
        <>
            <main className="">
                <section>
                    <div className="grid my-3 sm:grid-cols-1 p-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
                    </div>
                </section>
            </main>
        </>
    )
}