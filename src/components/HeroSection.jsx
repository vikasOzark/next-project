"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { AiOutlineLogin } from "react-icons/ai";
import { ActionButton, LoadingState } from "./Buttons";
import { useRouter } from "next/navigation";
import { urlRoutes } from "@/utils/urlRoutes";
import { VscLoading } from "react-icons/vsc";

export default function HeroSection() {
    const session = useSession();
    const route = useRouter();

    useEffect(() => {
        if (session?.status === "authenticated") {
            setTimeout(() => {
                route.push(urlRoutes.DASHBOARD);
            }, 500);
        }
    }, [route]);

    return (
        <div className="">
            <div className="relative h-screen grid place-content-center mx-auto  isolate px-6 lg:px-8">
                <div className="mx-auto min-w-min py-32 sm:py-35 md:py-56 lg:p-64 ">
                    <div
                        className="absolute inset-x-0 -z-10 top-0 transform-gpu overflow-hidden blur-3xl "
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-6xl">
                            <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                                Streamline
                            </span>{" "}
                            Your Support Experience with Ticket Tracker
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            – Effortlessly Manage, Monitor, and Resolve your
                            Inquiries, All in One Place!
                        </p>
                        <div className="mt-10 py-2 px-5 flex items-center justify-center gap-x-6">
                            {session?.status === "unauthenticated" && (
                                <ActionButton
                                    cssClass={
                                        " border text-white hover:text-blue-600 bg-blue-600 border-transparent text-lg"
                                    }
                                    onClick={() => signIn()}
                                >
                                    Get started
                                    <AiOutlineLogin size={20} />
                                </ActionButton>
                            )}
                            {session?.status === "authenticated" && (
                                <ActionButton
                                    cssClass={
                                        " border text-white hover:text-blue-600 bg-blue-600 border-transparent text-lg"
                                    }
                                    onClick={() =>
                                        (window.location.href =
                                            urlRoutes.DASHBOARD)
                                    }
                                >
                                    Dashboard
                                    <AiOutlineLogin size={20} />
                                </ActionButton>
                            )}
                            {session.status === "loading" && (
                                <ActionButton
                                    cssClass={
                                        " border text-white hover:text-blue-600 bg-blue-600 border-transparent text-lg"
                                    }
                                >
                                    <VscLoading
                                        className=" animate-spin"
                                        size={20}
                                    />
                                    Loading...
                                </ActionButton>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
