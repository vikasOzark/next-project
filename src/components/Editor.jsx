"use client";
import {
    BlockNoteView,
    useCreateBlockNote,
    SuggestionMenuController,
} from "@blocknote/react";
import { twMerge } from "tailwind-merge";
import {
    BlockNoteSchema,
    defaultInlineContentSpecs,
    filterSuggestionItems,
} from "@blocknote/core";
import "@blocknote/react/style.css";

import "../../public/css/editor.css";

import React from "react";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/queryKeys";
import { getUsersData } from "@/app/dashboard/user-management/components/Forms/userUtils";
import { Mention } from "./MentionedHoverCard";

/**
 * Editor
 * @component
 * @param {string} prop.className
 * @param {string<"dark" | "light">} props.theme
 * @param {() => void} props.onChange
 * @param {useBlockNote} props.editorProps
 */
const CustomEditor = React.forwardRef(
    (
        { className, theme = "dark", onChange, editable = true, editorProps },
        ref
    ) => {
        const editor = useCreateBlockNote({
            schema,
            ...editorProps,
        });

        async function saveContent(jsonBlocks) {
            const content = JSON.stringify(jsonBlocks);
            onChange(content);
        }

        const { data: users = [] } = useQuery(QUERY_KEYS.USERS, getUsersData, {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: editable,
            select: (data) => data.data,
            mention: Mention,
        });

        return (
            <BlockNoteView
                ref={ref}
                data-changing-font-demo
                editor={editor}
                className={twMerge(
                    "h-[20rem] editor-cls bg-transparent overflow-hidden overflow-y-auto rounded-xl ",
                    className
                )}
                id="editor"
                editable={editable}
                placeholder="Ticket details..."
                theme={theme}
                onChange={() => {
                    saveContent(editor?.document);
                }}
                sideMenu={false}
            >
                {/* Adds a mentions menu which opens with the "@" key */}
                <SuggestionMenuController
                    triggerCharacter={"@"}
                    getItems={async (query) =>
                        // Gets the mentions menu items
                        filterSuggestionItems(
                            getMentionMenuItems(editor, users),
                            query
                        )
                    }
                />
            </BlockNoteView>
        );
    }
);

CustomEditor.displayName = "block-editor";

export default CustomEditor;

const schema = BlockNoteSchema.create({
    inlineContentSpecs: {
        ...defaultInlineContentSpecs,
        mention: Mention,
    },
});

const getMentionMenuItems = (editor, users) => {
    return users.map((user) => ({
        title: `${user.first_name} ${user.last_name}`,
        onItemClick: () => {
            editor.insertInlineContent([
                {
                    type: "mention",
                    props: {
                        user,
                        data: user,
                    },
                },
                " ",
            ]);
        },
    }));
};
