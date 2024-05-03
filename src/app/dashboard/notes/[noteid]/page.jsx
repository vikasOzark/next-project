"use client";

import { LoadingState } from "@/components/Buttons";
import CustomEditor from "@/components/Editor";
import {
    useGetUserNoteWithId,
    useUpdateUserNote,
} from "@/hooks/user-notes.hook";
import handleTimeFormat from "@/utils/dateTimeFormat";
import { isJSONString } from "@/utils/validateJsonString";
import { useState } from "react";
import { VscEdit, VscLoading } from "react-icons/vsc";

export default function NotesPage({ params }) {
    const { data: note = {}, isLoading } = useGetUserNoteWithId(params.noteid);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const { mutate, isLoading: isSaving } = useUpdateUserNote(note?.id);

    const dateTime = handleTimeFormat(note?.createdAt, {
        isFormated: true,
        dateTime: true,
    });

    const handleQuery = (content) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(
            setTimeout(() => {
                mutate({ content: content });
            }, 1000)
        );
    };

    let content;
    if (isJSONString(note?.content)) {
        content = JSON.parse(note?.content);
    } else {
        content = [];
    }

    let timeoutId;
    const handleChange = (event) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            const { value } = event.target;
            mutate({ title: value });
        }, 500);
    };

    return (
        <>
            <div className="">
                <div className="flex font-bold text-lg pb-3 mb-5 border-b-2 border-gray-500 text-gray-400 justify-between">
                    <div className="flex items-center gap-2">
                        <VscEdit />
                        <div className="">
                            <input
                                type="text"
                                onChange={handleChange}
                                className="bg-transparent focus:outline-none h-full"
                                defaultValue={note?.title || ""}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <div
                            className={`${
                                isSaving
                                    ? "text-green-500 flex font-medium items-center gap-2 border-green-500"
                                    : "border-gray-700"
                            }  border rounded-full px-2 `}
                        >
                            {isSaving ? (
                                <>
                                    <VscLoading className=" animate-spin" />{" "}
                                    saving...
                                </>
                            ) : (
                                <>Auto save</>
                            )}
                        </div>

                        <div>{dateTime}</div>
                    </div>
                </div>
                <div className="mt-5">
                    {isLoading ? (
                        <LoadingState
                            cssClass={"text-white"}
                            title={"Loading..."}
                        />
                    ) : (
                        <CustomEditor
                            onChange={handleQuery}
                            className={"h-full border-0"}
                            editorProps={{ initialContent: content }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
