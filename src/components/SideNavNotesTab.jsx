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
import { useRef, useState } from "react";
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
import { cn } from "@/lib/utils";

export const NotesNavBarTab = ({ className }) => {
    const [creating, setCreating] = useState(false);
    const [showList, setShowList] = useState(false);

    return (
        <>
            <div className="">
                <div
                    onClick={() => setShowList((pre) => !pre)}
                    className={cn(
                        "mx-[-0.65rem] cursor-pointer flex items-center gap-4 rounded-xl px-3 py-2 soft-bg-hover",
                        className
                    )}
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

                {creating && (
                    <div
                        className={`border-s-2 border-gray-500 duration-400 relative ms-6 transition-opacity `}
                    >
                        <CreateNote setCreating={setCreating} />
                    </div>
                )}
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

const LinkComponent = ({ linkObject, className }) => {
    return (
        <Link
            href={linkObject.route}
            className={cn(
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
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

// const LinkComponentLg = ({ linkObject, className }) => {
//     return (
//         <Link
//             href={linkObject.route}
//             className={cn(
//                 "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
//                 className
//             )}
//         >
//             {linkObject?.icon ? (
//                 linkObject.icon
//             ) : (
//                 <LineChart className="h-5 w-5" />
//             )}
//             {linkObject.title}
//         </Link>
//     );
// };
