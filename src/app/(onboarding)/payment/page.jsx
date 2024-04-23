"use client";

// import Payments from "@/payments/razorpayPayments";
import { urlRoutes } from "@/utils/urlRoutes";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaymentPage() {
    const params = useSearchParams();
    const router = useRouter();

    const plan = params.get("plan");

    if (!plan) {
        router.push(urlRoutes.SELECT_PLAN);
    }

    // const payment = new Payments();

    return <>payments</>;
}
