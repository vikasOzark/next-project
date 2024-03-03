"use client";

import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { twMerge } from "tailwind-merge";
import "@blocknote/react/style.css";

const CustomEditor = ({ className, theme = "light" }) => {
    const editor = useBlockNote({});
    editor.onEditorContentChange((data) => {
        console.log(data);
    });
    return (
        <BlockNoteView
            className={twMerge(
                "border rounded my-2 min-h-[5rem] max-h-[10rem] h-[8rem]",
                className
            )}
            placeholder="Ticket details..."
            theme={theme}
            editor={editor}
        />
    );
};

export default CustomEditor;
