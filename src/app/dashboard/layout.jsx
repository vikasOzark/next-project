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
          <body className="globle-bg">
            <div className="">
              <div className="md:grid lg:grid md:grid-cols-12 lg:grid-cols-12 gap-4  ">
                <div className="lg:col-span-2">
                  <SideNavbar />
                </div>
                <div className="col-span-12 lg:col-span-10 my-4 h-full">
                  <Toaster position="top-right" reverseOrder={false} />
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
