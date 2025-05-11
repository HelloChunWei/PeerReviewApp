import React, { useEffect, useMemo, useState } from 'react'
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
    CodeToggle,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { getReviewFile, saveFile } from '@/utils/file'
import { useDebounceCallback } from 'usehooks-ts'
import { Ellipsis } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DeleteFileDialog from '@/components/dialogs/DeleteFileDialog'
import dayjs from 'dayjs'

export default function Colleague() {
    const { key } = useParams()
    const [content, setContent] = useState('')
    const [isOpen, setOpen] = useState(false)
    const [mdxKey, setKey] = useState(0)

    const debounced = useDebounceCallback((value) => {
        setContent(value)
        saveFile('reviews', key || '', value)
    }, 500)

    const showDeleteDialog = () => {
        // Due to conflict between dropdownMenu and dialog behaviors,
        // need to setTimeout 0 to ensure dropdown is fully destroyed before showing dialog
        setTimeout(() => {
            setOpen(true)
        }, 0)
    }

    const title = useMemo(() => {
        const split = key?.split('_')
        if (!split) return key
        return `${dayjs(split[0]).format('YYYY/MM/DD')} ${split[1]} `
    }, [key])

    useEffect(() => {
        getReviewFile(key || '').then((worklog) => {
            setContent(worklog)
            setKey((prev) => prev + 1)
        })
    }, [key])

    return (
        <main className="min-h-svh flex flex-1 relative">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <SidebarTrigger />

                <DropdownMenu>
                    <DropdownMenuTrigger className="absolute right-6">
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={showDeleteDialog}>
                            Delete file
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="mx-auto w-3/4">
                    <h1 className="text-5xl text-center mb-10 font-bold">
                        {title}
                    </h1>
                    <div className="mb-4 dark-theme prose dark:prose-invert max-w-none">
                        <MDXEditor
                            key={mdxKey}
                            onChange={debounced}
                            markdown={content}
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
                </div>
            </div>
            <DeleteFileDialog
                isOpen={isOpen}
                close={() => setOpen(false)}
                file={key || ''}
            />
        </main>
    )
}
