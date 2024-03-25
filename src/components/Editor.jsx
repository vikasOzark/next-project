"use client";
import "@blocknote/core/fonts/inter.css";
import {
    BlockNoteView,
    useEditorChange,
    useCreateBlockNote,
    SuggestionMenuController,
} from "@blocknote/react";
import { twMerge } from "tailwind-merge";

import {
    BlockNoteSchema,
    defaultInlineContentSpecs,
    filterSuggestionItems,
} from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "../../public/css/editor.css";

import { Mention } from "./Mention";

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
    const editor = useCreateBlockNote({
        schema,
        editable: editable,
        ...editorProps,
    });

    async function saveContent(jsonBlocks) {
        const content = JSON.stringify(jsonBlocks);
        onChange(content);
    }

    return (
        <BlockNoteView
            data-changing-font-demo
            editor={editor}
            className={twMerge(
                "h-[20rem] bg-transparent overflow-hidden overflow-y-auto border rounded-xl border-gray-500 p-1",
                className
            )}
            placeholder="Ticket details..."
            theme={theme}
            onChange={() => {
                saveContent(editor.document);
            }}
            sideMenu={false}
        >
            {/* Adds a mentions menu which opens with the "@" key */}
            <SuggestionMenuController
                triggerCharacter={"@"}
                getItems={async (query) =>
                    // Gets the mentions menu items
                    filterSuggestionItems(getMentionMenuItems(editor), query)
                }
            />
        </BlockNoteView>
    );
};

export default CustomEditor;

const schema = BlockNoteSchema.create({
    inlineContentSpecs: {
        ...defaultInlineContentSpecs,
        mention: Mention,
    },
});

const getMentionMenuItems = (editor) => {
    const users = ["Steve", "Bob", "Joe", "Mike"];

    return users.map((user) => ({
        title: user,
        onItemClick: () => {
            editor.insertInlineContent([
                {
                    type: "mention",
                    props: {
                        user,
                    },
                },
                " ",
            ]);
        },
    }));
};
