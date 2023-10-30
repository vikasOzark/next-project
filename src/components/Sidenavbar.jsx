"use client";

import { Suspense, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { CreateDepartmentForm } from "@/components/Forms/CreateDepartment";
import { redirect, useRouter, usePathname } from "next/navigation";
import Loading from "@/app/dashboard/loading";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import {
  CursorArrowRaysIcon,
  HomeIcon,
  LifebuoyIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { VscChromeClose, VscSignOut } from "react-icons/vsc";
import { useSession, signOut } from "next-auth/react";
import { urlRoutes } from "@/utils/urlRoutes";

export const SideNavbar = ({ children, menuOpen, setMenuOpen }) => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      return redirect("/login");
    }
  });

  const dashboardLinks = [
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
      title: "User Permissions",
      icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
      route: urlRoutes.PERMISSIONS,
    },
  ];

  return (
    <>
      <Disclosure as="nav" className="">
        <aside
          className={`md:flex lg:flex z-20 flex-col w-64 h-screen px-5 fixed ${
            menuOpen ? "" : "hidden"
          } overflow-y-auto bg-white  dark:bg-gray-900 dark:border-gray-700`}
        >
          <div
            onClick={() => setMenuOpen(false)}
            className="text-white md:hidden lg:hidden flex justify-end m-2"
          >
            <VscChromeClose />
          </div>
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="-mx-3 space-y-3 ">
              {dashboardLinks.map((item) => (
                <NavigationLink
                  key={item.title}
                  href={item.route}
                  text={item.title}
                  icon={item.icon}
                />
              ))}
            </nav>

            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800 dark:text-white">
                  Departments
                </h2>

                <button
                  onClick={() => setOpen((pre) => !pre)}
                  className="p-0.5 hover:bg-gray-100 duration-200 transition-colors text-gray-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 border rounded-lg"
                >
                  <PlusCircleIcon
                    className="h-5 w-5"
                    title="create new department"
                  />
                </button>
              </div>
              <nav className="mt-4 -mx-3 space-y-3 h-52 overflow-y-auto ">
                <Suspense fallback={<Loading />}>{children}</Suspense>
              </nav>
            </div>
          </div>
        </aside>
      </Disclosure>
      <Modal open={open} setOpen={setOpen} modalTitle={"Create Department"}>
        <CreateDepartmentForm router={router} />
      </Modal>
    </>
  );
};

function NavigationLink({ href, text, icon }) {
  const currentPath = usePathname();

  const isActive = href === currentPath ? true : false;
  return (
    <Link
      href={href === "/home" ? "/" : href}
      passHref
      className={`${
        isActive ? "bg-gray-800 text-gray-600 " : "text-gray-600 "
      } flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
    >
      {icon}
      {/* <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" /> */}
      <span className="mx-2 text-sm font-medium">{text}</span>
    </Link>
  );
}
