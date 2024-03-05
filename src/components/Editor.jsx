"use client";

import "@blocknote/react/style.css";
import { twMerge } from "tailwind-merge";
import "../../public/css/editor.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

/**
 * Editor
 * @component
 * @param {string} prop.className
 * @param {string<"dark" | "light">} props.theme
 * @param {() => void} props.onChange
 * @param {useBlockNote} props.editorProps
 * @returns
 */
const CustomEditor = ({
    className,
    theme = "dark",
    onChange,
    editable,
    editorProps,
}) => {
    const editor = useBlockNote({
        onEditorContentChange: (dataNew) => {
            const data = JSON.stringify(dataNew.topLevelBlocks);
            onChange(data);
        },
        editable: editable,
        ...editorProps,
    });

    return (
        <BlockNoteView
            className={twMerge(
                "h-[20rem] overflow-hidden overflow-y-auto border rounded-xl border-gray-500 p-1",
                className
            )}
            placeholder="Ticket details..."
            theme={theme}
            editor={editor}
        />
    );
};

export default CustomEditor;
