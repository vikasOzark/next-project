"use client";

import CreateNote from "@/components/Forms/CreateNote";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteNoteWithId, useGetUserNote } from "@/hooks/user-notes.hook";
import { useState } from "react";
import {
    VscAdd,
    VscChevronUp,
    VscClose,
    VscKebabVertical,
    VscLoading,
    VscNote,
    VscTrash,
} from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useRouter, useParams } from "next/navigation";
import { urlRoutes } from "@/utils/urlRoutes";

export const NotesNavBarTab = () => {
    const [creating, setCreating] = useState(false);
    const [showList, setShowList] = useState(false);

    return (
        <>
            <div className="">
                <div
                    onClick={() => setShowList((pre) => !pre)}
                    className={`${
                        creating && "bg-gray-500 text-white"
                    } text-gray-400 mb-1 cursor-pointer font-bold justify-between flex items-center gap-2 px-3 py-1 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-500 hover:text-white dark:hover:bg-gray-800 dark:hover:text-gray-200 `}
                >
                    <div className="flex transition-all items-center gap-2">
                        <span
                            className={`${
                                showList && "rotate-180"
                            } transition-all duration-500`}
                        >
                            <VscChevronUp size={22} />
                        </span>
                        <span className="mx-2 text-sm font-medium">Notes</span>
                    </div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            setCreating((pre) => !pre);
                        }}
                        className={`${
                            creating && "bg-gray-700 hover:bg-gray-800 "
                        } hover:bg-gray-700 rounded-md p-1`}
                    >
                        <span className={`transition-all duration-500`}>
                            {creating ? (
                                <VscClose size={22} />
                            ) : (
                                <VscAdd size={22} />
                            )}
                        </span>
                    </div>
                </div>

                <div
                    className={`${
                        creating ? "block" : "hidden"
                    } border-s-2 border-gray-500 duration-400 relative ms-6 transition-opacity `}
                >
                    <CreateNote setCreating={setCreating} />
                </div>
                <ShowNotesList setCreating={setCreating} showList={showList} />
            </div>
        </>
    );
};

const ShowNotesList = ({ showList, setCreating }) => {
    const { data: notes = [], isLoading } = useGetUserNote();
    const { noteid } = useParams();
    const router = useRouter();

    const handleRedirect = (id) => {
        setCreating(false);
        router.push(urlRoutes.NOTES + "/" + id);
    };

    return (
        <div className={`${showList ? "block" : "hidden"}`}>
            {isLoading && (
                <div className="flex justify-center text-white">
                    <span className="flex items-center gap-2">
                        <VscLoading className=" animate-spin" /> Loading...
                    </span>
                </div>
            )}
            {!isLoading && notes.length === 0 && (
                <div className="flex justify-center text-white">
                    <span className="flex items-center gap-2">
                        <VscNote /> No note found.
                    </span>
                </div>
            )}
            {notes?.map((note) => (
                <div
                    onClick={() => handleRedirect(note.id)}
                    className=" ms-6 border-gray-500  border-s-2"
                    key={note.id}
                >
                    <div
                        className={` text-white hover:bg-gray-700 ${
                            noteid === note.id && "bg-gray-600"
                        }  cursor-pointer  ms-1 rounded-lg flex group items-center justify-between  h-full w-full relative  `}
                    >
                        <span className="ms-2 flex items-center gap-2">
                            <VscNote size={18} />
                            {note.title}
                        </span>
                        <SideNavNotesOptions noteData={note} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export function SideNavNotesOptions({ styleButton, noteData }) {
    const mutation = useDeleteNoteWithId(noteData.id);
    const handleDelete = () => {
        mutation.mutate(noteData.id);
    };
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className={twMerge(
                            "me-1 invisible group-hover:visible ease-linear bg-transparent hover:bg-gray-600 rounded p-1 delay-300",
                            styleButton
                        )}
                    >
                        <VscKebabVertical />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                        {noteData.title} actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <div
                                onClick={handleDelete}
                                className={
                                    "flex gap-2 items-center cursor-pointer "
                                }
                            >
                                <VscTrash /> Delete
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
