"use client";

import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
} from "@mdxeditor/editor";
import { FC } from "react";

const admonitionMarkdown = `

:::note
foo
:::

:::tip
Some **content** with _Markdown_ syntax. Check [this component](https://virtuoso.dev/).
:::

:::info
Some **content** with _Markdown_ syntax. 
:::

:::caution
Some **content** with _Markdown_ syntax.
:::

:::danger
Some **content** with _Markdown_ syntax.
:::
`;

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const Editor = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className="bg-white p-5 m-5"
      markdown={admonitionMarkdown}
      plugins={[
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
    />
  );
};

export default Editor;
