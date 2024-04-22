"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetUserVerify } from "../api";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Dashboard() {
    const params = useSearchParams();
    const [token, setToken] = useState("");
    const session = useSession();

    const data = session?.data?.user?.userData;
    const userVerification = useGetUserVerify(token);

    useEffect(() => {
        if (data?.id && !token) {
            const { id, uniqueCompanyId } = data;
            setToken(`${id}_${uniqueCompanyId}`);
        }
    }, [data]);

    console.log(session);

    const route = useRouter();
    route.push("/dashboard/-");
    // const searchParam = useSearchParams()

    return null;
}
