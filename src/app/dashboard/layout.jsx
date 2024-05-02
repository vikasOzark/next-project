"use client";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { CircleUser, HomeIcon, LineChart, Menu, Package2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { urlRoutes } from "@/utils/urlRoutes";
import { cn } from "@/lib/utils";
import { CursorArrowRaysIcon, LifebuoyIcon } from "@heroicons/react/20/solid";
import { NotesNavBarTab } from "@/components/SideNavNotesTab";

import { QueryClient, QueryClientProvider } from "react-query";
import DropdownNew from "@/components/Dropdown/DropdownNew";
import { signOut, useSession } from "next-auth/react";
import { ButtonComponent } from "@/components/Buttons";
import { VscSignOut } from "react-icons/vsc";
import { PageLoader } from "@/components/Loading";
import {
    LinkComponent,
    LinkComponentLg,
} from "@/components/Navbars/Sidenavbar";
import AdvanceOptionsNav from "@/components/Navbars/AdvancedSettingNav";

export default function Layout({ children }) {
    const queryClient = new QueryClient();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <html lang="en">
                    <body className="">
                        <Toaster position="top-right" reverseOrder={false} />
                        <MainLayout>{children}</MainLayout>
                    </body>
                </html>
            </QueryClientProvider>
        </>
    );
}

export function MainLayout({ children }) {
    const { data, status } = useSession();
    if (status === "unauthenticated") {
        location.href = urlRoutes.LOGIN_IN;
        return;
    }

    const ADMIN_VIEW_LINKS = [
        {
            title: "Dashboard",
            icon: <HomeIcon className="h-5 w-5" title="Dashboard" />,
            route: urlRoutes.DASHBOARD,
        },
        {
            title: "Tickets",
            icon: <LifebuoyIcon className="h-5 w-" title="create ticket" />,
            route: urlRoutes.TICKETS,
        },
        {
            title: "User Management",
            icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
            route: urlRoutes.PERMISSIONS,
        },
        {
            title: "Billing",
            icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
            route: urlRoutes.BILLING,
        },
        {
            title: "Tasks",
            icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
            route: urlRoutes.TASKS,
        },
    ];

    if (status === "loading") {
        return <PageLoader />;
    }
    return (
        <div className="grid text-white  min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden bg-muted/40 h-screen md:sticky bottom-0 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href={urlRoutes.DASHBOARD}
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="">Tickets</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {ADMIN_VIEW_LINKS.map((linkObject) => (
                                <LinkComponentLg
                                    key={linkObject.title}
                                    linkObject={linkObject}
                                />
                            ))}
                            <AdvanceOptionsNav />
                            <NotesNavBarTab />
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href={urlRoutes.DASHBOARD}
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Tickets</span>
                                </Link>
                                {ADMIN_VIEW_LINKS.map((linkObject) => (
                                    <LinkComponent
                                        key={linkObject.title}
                                        linkObject={linkObject}
                                    />
                                ))}
                                <AdvanceOptionsNav />
                                <NotesNavBarTab />
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1"></div>

                    <DropdownNew
                        className="w-[8rem]"
                        icon={<CircleUser className="h-5 w-5" />}
                        title={<>{data?.user?.name}</>}
                    >
                        <ButtonComponent
                            onClick={signOut}
                            icon={<VscSignOut size={18} />}
                            title={"Logout"}
                        />
                    </DropdownNew>
                </header>
                <main className="flex flex-1 overflow-hidden md:h-[calc(100vh_-_300px)] flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {status === "authenticated" && children}
                </main>
            </div>
        </div>
    );
}
