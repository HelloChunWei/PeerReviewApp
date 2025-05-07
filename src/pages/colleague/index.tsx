import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useParams } from 'react-router'
import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    toolbarPlugin,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    InsertThematicBreak,
    ListsToggle,
    UndoRedo,
    codeBlockPlugin,
    codeMirrorPlugin,
    CodeToggle,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

export default function Colleague() {
    const { key } = useParams()
    return (
        <main className="p-4">
            <SidebarTrigger />
            <h1 className="mb-4">{key}</h1>
            <div className="dark-theme prose dark:prose-invert max-w-none">
                <MDXEditor
                    onChange={(value) => {
                        console.log(value)
                    }}
                    markdown="# Hello world"
                    contentEditableClassName="prose"
                    plugins={[
                        headingsPlugin(),
                        quotePlugin(),
                        listsPlugin(),
                        thematicBreakPlugin(),
                        markdownShortcutPlugin(),
                        toolbarPlugin({
                            toolbarContents: () => (
                                <>
                                    <CodeToggle />
                                    <UndoRedo />
                                    <BoldItalicUnderlineToggles />
                                    <BlockTypeSelect />
                                    <InsertThematicBreak />
                                    <ListsToggle />
                                </>
                            ),
                        }),
                    ]}
                />
            </div>
        </main>
    )
}
