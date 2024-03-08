import { createReactInlineContentSpec } from "@blocknote/react";

export const Mention = createReactInlineContentSpec(
    {
        type: "mention",
        propSchema: {
            user: {
                default: "Unknown",
            },
        },
        content: "none",
    },
    {
        render: (props) => (
            <a
                href="#"
                className="hover:bg-red-500"
                style={{ backgroundColor: "#8400ff33" }}
            >
                @{props.inlineContent.props.user}
            </a>
        ),
    }
);
