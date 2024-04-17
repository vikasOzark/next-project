"use client";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { CircleUser, HomeIcon, LineChart, Menu, Package2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { urlRoutes } from "@/utils/urlRoutes";
import { cn } from "@/lib/utils";
import { CursorArrowRaysIcon, LifebuoyIcon } from "@heroicons/react/20/solid";
import { NotesNavBarTab } from "@/components/SideNavNotesTab";

import { QueryClient, QueryClientProvider } from "react-query";

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
    const ADMIN_VIEW_LINKS = [
        {
            title: "Dashboard",
            icon: <HomeIcon className="h-5 w-5" title="Dashboard" />,
            route: urlRoutes.DASHBOARD,
        },
        {
            title: "Tickets",
            icon: <LifebuoyIcon className="h-5 w-" title="create ticket" />,
            route: urlRoutes.CREATE_TICKET,
        },
        {
            title: "User Management",
            icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
            route: urlRoutes.PERMISSIONS,
        },
        {
            title: "Advance Settings",
            icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
            route: urlRoutes.ADVANCE_SETTINGS,
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

    return (
        <div className="grid text-white  min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden bg-muted/40 md:block">
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
                            <NotesNavBarTab />
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card x-chunk="dashboard-02-chunk-0">
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access
                                    to our support team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
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
                                <NotesNavBarTab />
                            </nav>
                            <div className="mt-auto">
                                <Card className="!soft-bg border-gray-600">
                                    <CardHeader>
                                        <CardTitle>Upgrade to Pro</CardTitle>
                                        <CardDescription>
                                            Unlock all features and get
                                            unlimited access to our support
                                            team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1"></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {/* <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Inventory
                        </h1>
                    </div> */}
                    {children}
                </main>
            </div>
        </div>
    );
}

const LinkComponent = ({ linkObject, className }) => {
    return (
        <Link
            href={linkObject.route}
            className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 soft-bg-hover ",
                className
            )}
        >
            {linkObject?.icon ? (
                linkObject.icon
            ) : (
                <LineChart className="h-5 w-5" />
            )}
            {linkObject.title}
        </Link>
    );
};

const LinkComponentLg = ({ linkObject, className }) => {
    return (
        <Link
            href={linkObject.route}
            className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-md px-3 py-2 soft-bg-hover ",
                className
            )}
        >
            {linkObject?.icon ? (
                linkObject.icon
            ) : (
                <LineChart className="h-5 w-5" />
            )}
            {linkObject.title}
        </Link>
    );
};
