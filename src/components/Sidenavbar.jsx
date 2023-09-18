"use client"

import { Suspense, useState } from "react"
import Modal from "./Modal"
import { CreateDepartmentForm } from "./Forms/CreateDepartment"
import { useRouter } from "next/navigation"
import Loading from "@/app/dashboard/loading"
import Link from "next/link"
import { Disclosure } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid"
import { VscChromeClose } from "react-icons/vsc"

export const SideNavbar = ({children, menuOpen, setMenuOpen}) => {
    const [open, setOpen] = useState(false)
    
    const router = useRouter()

    const dashboardLinks = [
        {
            title: "Dashboard",
            icons: "",
            route: "/dashboard"
        },
        {
            title: "Create Ticket",
            icons: "",
            route: "/dashboard/create-ticket"
        }
    ]

    return (
        <>
            <Disclosure as="nav" className="">
            <aside className={`md:flex lg:flex z-20 flex-col w-64 h-screen px-5 fixed ${menuOpen? "" : "hidden"} overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}>
                <div onClick={() => setMenuOpen(false)} className="text-white md:hidden lg:hidden flex justify-end m-2"><VscChromeClose /></div>
                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="-mx-3 space-y-3 ">
                        {dashboardLinks.map(item => (
                            <Link key={item.title} href={item.route} className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>

                                <span className="mx-2 text-sm font-medium">{item.title}</span>
                            </Link>
                        ))}
                        
                    </nav>

                    <div className="mb-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-semibold text-gray-800 dark:text-white">Departments</h2>

                            <button onClick={() => setOpen(pre => !pre)} className="p-0.5 hover:bg-gray-100 duration-200 transition-colors text-gray-500 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 border rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                        <nav className="mt-4 -mx-3 space-y-3 h-52 overflow-y-auto ">
                            <Suspense fallback={<Loading />} >
                                {children}
                            </Suspense>
                        </nav>
                    </div>
                </div>
            </aside>
            </Disclosure>
            <Modal open={open} setOpen={setOpen} modalTitle={"Create Department"} >
                <CreateDepartmentForm router={router} />
            </Modal>
        </>
    )
}