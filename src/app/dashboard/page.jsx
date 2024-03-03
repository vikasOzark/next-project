"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const route = useRouter();
    route.push("/dashboard/-");
    return <></>;
}
