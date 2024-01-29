"use client";

import { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import {
  CursorArrowRaysIcon,
  HomeIcon,
  LifebuoyIcon,
} from "@heroicons/react/20/solid";
import { VscChromeClose } from "react-icons/vsc";
import { useSession, signOut } from "next-auth/react";
import { urlRoutes } from "@/utils/urlRoutes";
import { LoadingState } from "../Buttons";
import { TfiAlignLeft } from "react-icons/tfi";
import { FcBusinessman } from "react-icons/fc";
import { BiPowerOff } from "react-icons/bi";
import { Role } from "@prisma/client";
import { TfiReceipt } from "react-icons/tfi";

export const SideNavbar = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignout, setSignout] = useState(false);

  const session = useSession();
  const data = session;
  const userSession = data?.data?.user || {};

  const USER_ROLE = session?.data?.user?.userData.role;

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      return redirect("/login");
    }
  });

  const USER_VIEW_LINKS = [
    {
      title: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" title="Dashboard" />,
      route: urlRoutes.DASHBOARD,
    },
    {
      title: "Tickets",
      icon: <LifebuoyIcon className="h-5 w-5" title="create ticket" />,
      route: urlRoutes.CREATE_TICKET,
    },
    {
      title: "User Management",
      icon: <CursorArrowRaysIcon className="h-5 w-5" title="hello" />,
      route: urlRoutes.PERMISSIONS,
    },
  ];

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
      icon: <TfiReceipt size={20} className="h-5 w-5" title="hello" />,
      route: urlRoutes.BILLING,
    },
  ];

  const handleSignout = () => {
    setSignout(true);
    try {
      setTimeout(() => {
        signOut();
      }, 1000);
    } finally {
      setSignout(false);
    }
  };

  return (
    <>
      <Disclosure as="nav" className="relative">
        <div onClick={() => setMenuOpen(true)} className="md:block lg:hidden">
          <div className="absolute p-2 text-2xl">
            <TfiAlignLeft color="white" />
          </div>
        </div>

        <aside
          className={` lg:block [1412px]:hidden z-20 flex-col duration-500 transition-all globle-bg border-gray-700 w-64 h-screen px-5 fixed ${
            menuOpen
              ? "md:block left-0 "
              : "md:hidden -left-[100%] md:left-0 lg:left-0 "
          } overflow-y-auto
              dark:border-gray-700`}
        >
          <div
            onClick={() => setMenuOpen(false)}
            className="text-white md:block lg:hidden flex justify-end m-2"
          >
            <VscChromeClose />
          </div>
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="-mx-3 space-y-3 ">
              <div className=" bg-[#2c85ea36] capitalize rounded-lg flex items-center gap-2 py-2 px-4 text-white font-bold md:text-lg lg:text-lg">
                <div className="bg-white  rounded">
                  <FcBusinessman className="lg:text-4xl" />
                </div>
                {userSession.name}
              </div>
              {USER_ROLE === Role.Admin
                ? ADMIN_VIEW_LINKS.map((item) => {
                    return (
                      <NavigationLink
                        key={item.title}
                        href={item.route}
                        text={item.title}
                        icon={item.icon}
                      />
                    );
                  })
                : USER_VIEW_LINKS.map((item) => {
                    return (
                      <NavigationLink
                        key={item.title}
                        href={item.route}
                        text={item.title}
                        icon={item.icon}
                      />
                    );
                  })}
              <div className="mt-5 ">
                {isSignout ? (
                  <div className=" rounded border font-bold text-center py-1 mb-2">
                    <LoadingState title={"Logging out..."} cssClass={"py-1"} />
                  </div>
                ) : (
                  <div
                    onClick={() => handleSignout()}
                    className="hover:bg-gray-700 cursor-pointer flex place-content-center items-center gap-2 text-gray-500 hover:text-gray-300 border hover:border-transparent border-gray-600 rounded-lg font-bold text-center py-1 mb-2"
                  >
                    Log out <BiPowerOff size={18} />
                  </div>
                )}
              </div>
            </nav>
          </div>
        </aside>
      </Disclosure>
    </>
  );
};

function NavigationLink({ href, text, icon }) {
  const currentPath = usePathname();

  const isActive = currentPath.endsWith(href);
  return (
    <Link
      href={href === "/home" ? "/" : href}
      passHref
      className={`${
        isActive ? "bg-gray-600 text-white " : "text-gray-400 font-bold "
      } flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 dark:hover:text-gray-200 `}
    >
      {icon}
      {/* <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" /> */}
      <span className="mx-2 text-sm font-medium">{text}</span>
    </Link>
  );
}
