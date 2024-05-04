"use client";

import { useSession } from "next-auth/react";
import BaseAdvancedCardLayout from "../../advance-settings/BaseCardLaylout";
import { SimpleInfoMessage } from "@/components/SimpleErrorMessage/SimpleNotifyMessages";

export default function Layout({
    children,
    tickets,
    tags,
    activity,
    params,
    changepassword,
}) {
    const { userid: userId } = params;

    const session = useSession();
    const { userData } = session?.data?.user || {};

    return (
        <>
            {children}
            <div className="grid grid-cols-8 mt-4 gap-6">
                <BaseAdvancedCardLayout
                    title={"Tickets"}
                    childrenClass={" overflow-x-auto"}
                    className={"p-3"}
                >
                    {tickets}
                </BaseAdvancedCardLayout>
                <BaseAdvancedCardLayout title={"Tags"} className={"p-3"}>
                    {tags}
                </BaseAdvancedCardLayout>
                {/* <BaseAdvancedCardLayout title={"Activity"} className={"p-3"}>
                    {activity}
                </BaseAdvancedCardLayout> */}
                {userData?.role === "Admin" && !userData?.id === userId && (
                    <BaseAdvancedCardLayout
                        title={"Change password"}
                        className={"p-3"}
                    >
                        changepassword
                    </BaseAdvancedCardLayout>
                )}
            </div>
        </>
    );
}
