"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import { VscAdd, VscChevronUp, VscChromeClose, VscTag } from "react-icons/vsc";
import { useQuery } from "react-query";
import { Square2StackIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

export default function Modal({
    open,
    setOpen,
    cssClass,
    children,
    modalTitle,
    className,
    dialogClass,
}) {
    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className={twMerge("relative z-30 text-white", cssClass)}
                initialFocus={cancelButtonRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 backdrop-blur-md bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="md:flex lg:flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    "relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all max-w-[60rem] w-screen min-w-[40rem]",
                                    dialogClass
                                )}
                            >
                                <div
                                    className={cn(
                                        "temp-bg px-4 pb-2 pt-3 sm:p-4 sm:pb-2 min-w-fit max-h-fit",
                                        className
                                    )}
                                >
                                    <div className="items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base font-semibold leading-6 flex items-center justify-between text-gray-900"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <Square2StackIcon
                                                            className="h-6 w-6 text-green-600"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <span className="text-white">
                                                        {modalTitle}
                                                    </span>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        setOpen((pre) => !pre)
                                                    }
                                                    className="hover:bg-gray-200 hover:text-gray-600 text-white p-1 cursor-pointer transition-all rounded-full"
                                                >
                                                    <VscChromeClose />
                                                </div>
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export const ButtonDropdownComponent = ({ title, selectedUserTags = [] }) => {
    const tagsSelectedFormat = () => {
        if (selectedUserTags.length > 0) {
            selectedUserTags.map((tag) => ({
                name: tag.name,
                id: tag.id,
                isSelected: true,
            }));
        } else {
            return [];
        }
    };
    const [tagsIsOption, setTagsIsOption] = useState(false);
    const [selectedTag, setSelectedTag] = useState(tagsSelectedFormat());
    const [tags, setTags] = useState([]);

    const responseData = useQuery("tags-list", async () => {
        const response = await fetch("/api/tags");
        const json_response = await response.json();
        return json_response;
    });

    useEffect(() => {
        if (responseData.data && responseData.data?.success) {
            setTags(responseData.data?.data);
        }
    }, [responseData.isSuccess]);

    const handleSelect = (tag) => {
        const isMatched = selectedTag.find((item) => item.id === tag.id);
        if (!isMatched) {
            setSelectedTag([...selectedTag, tag]);
        }

        tags.find((item, index) => {
            if (item.id === tag.id) {
                const newUpdated = [...tags];
                if (!newUpdated[index].isSelected) {
                    newUpdated[index].isSelected = true;
                }
                setTags(newUpdated);
            }
        });
    };

    const handleRemove = (tag) => {
        selectedTag.find((item, index) => {
            if (item.id === tag.id) {
                const newA = [...selectedTag];
                newA.splice(index, 1);
                setSelectedTag(newA);
            }

            tags.find((item, index) => {
                if (item.id === tag.id) {
                    const newUpdated = [...tags];
                    newUpdated[index].isSelected = false;
                    setTags(newUpdated);
                }
            });
        });
    };

    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setTagsIsOption(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    return (
        <>
            <div className="mt-2 relative flex items-center gap-2">
                <div className="">
                    <button
                        type="button"
                        onClick={() => setTagsIsOption((pre) => !pre)}
                        className=" border hover:border-gray-300 flex gap-2 justify-center items-center h-6 w-6 rounded-full hover:bg-gray-300"
                    >
                        {tagsIsOption ? (
                            <VscAdd className=" rotate-90 transition-transform " />
                        ) : (
                            <VscAdd className="transition-transform" />
                        )}
                        {title}
                    </button>
                </div>

                <div className="mt-2 flex  items-center gap-1 overflow-x-auto overflow-hidden">
                    {selectedTag?.map((item) => (
                        <span
                            key={item.id}
                            className="bg-purple-300 px-3 rounded-full font-bold py-1 flex gap-2 items-center break-keep"
                        >
                            {item.name}{" "}
                            <VscChromeClose
                                onClick={() => handleRemove(item)}
                                className=" hover:bg-gray-100 rounded-full h-5 p-[3px] cursor-pointer w-5"
                            />{" "}
                        </span>
                    ))}
                </div>

                <div
                    className={`absolute rounded-lg top-8 drop-shadow-xl border bg-white mt-2  p-1 w-[12rem] z-[100] overflow-hidden overflow-y-auto h-[8rem] ${
                        tagsIsOption ? "block" : "hidden"
                    }`}
                >
                    {tags?.sort().map((item) => (
                        <p
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className={`p-1 hover:bg-slate-300 font-bold rounded mb-1 ${
                                item.isSelected ? "bg-slate-400" : ""
                            }`}
                        >
                            {item.name}
                        </p>
                    ))}
                    {tags.length < 1 ? (
                        <>
                            <p className="text-center ">No Tags Available</p>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
};
