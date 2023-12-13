"use client";
import { NavbarFooter } from "@/components/Navbars/Navbar";
import { DepartmentSidenav } from "@/components/SSRComponent/DepartmentSidenav";
import { SideNavbar } from "@/components/Navbars/Sidenavbar";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import Loading from "@/app/dashboard/loading";

export default function LayoutPage({ children }) {
  const pathname = usePathname();
  const queryClient = new QueryClient();
  const nonNavbar = ["/singup", "/login"];

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className="bg-gray-900">
            <div className="">
              {nonNavbar.includes(pathname) ? (
                <>{children}</>
              ) : (
                <>
                  <div className="md:grid lg:grid md:grid-cols-12 lg:grid-cols-12 gap-4  ">
                    <div className="col-span-2">
                      <SideNavbar>
                        {/* <Suspense fallback={<Loading />}>
                          <DepartmentSidenav />
                        </Suspense> */}
                      </SideNavbar>
                    </div>
                    <div className="col-span-10 px-4 my-4 h-full">
                      <Toaster position="top-right" reverseOrder={false} />
                      {children}
                    </div>
                  </div>
                </>
              )}
            </div>
          </body>
        </html>
      </QueryClientProvider>
    </>
  );
}
