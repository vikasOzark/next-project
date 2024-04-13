"use client";
import { SideNavbar } from "@/components/Navbars/Sidenavbar";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Layout({ children }) {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <html lang="en">
                    <body className="globle-bg h-[100vh]">
                        <div className="">
                            <div className="md:grid lg:grid md:grid-cols-12 lg:grid-cols-12 gap-4  ">
                                <div className="lg:col-span-1">
                                    <SideNavbar />
                                </div>
                                <div className="col-span-12 lg:col-span-11 py-5 overflow-y-auto min-h-screen">
                                    <Toaster
                                        position="top-right"
                                        reverseOrder={false}
                                    />
                                    <div className="container">{children}</div>
                                </div>
                            </div>
                        </div>
                    </body>
                </html>
            </QueryClientProvider>
        </>
    );
}
