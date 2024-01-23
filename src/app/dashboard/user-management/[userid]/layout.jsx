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
      <div className="grid grid-cols-8 gap-4">
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
        <BaseAdvancedCardLayout title={"Activity"} className={"p-3"}>
          {activity}
        </BaseAdvancedCardLayout>
        <BaseAdvancedCardLayout title={"Change password"} className={"p-3"}>
          {userData?.id === userId && (
            <>
              <SimpleInfoMessage
                message={"You can't change password for yourself"}
              />
            </>
          )}
          {userData?.role === "Admin" ? (
            changepassword
          ) : (
            <SimpleInfoMessage
              message={"You are not authorized to change the password."}
            />
          )}
        </BaseAdvancedCardLayout>
      </div>
    </>
  );
}
