"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    // const [token, setToken] = useState("");
    const session = useSession();

    const data = session?.data?.user?.userData;
    // const userVerification = useGetUserVerify(token);

    // useEffect(() => {
    //     if (data?.id && !token) {
    //         const { id, uniqueCompanyId } = data;
    //         setToken(`${id}_${uniqueCompanyId}`);
    //     }
    // }, [data]);

    const route = useRouter();
    route.push("/dashboard/-");
    return null;
}
