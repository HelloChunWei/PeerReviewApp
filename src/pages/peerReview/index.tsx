import { useEffect, useMemo, useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useParams } from 'react-router'
import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import { getPeerReviewFile } from '@/utils/file'

export default function PeerReview() {
    const { key } = useParams()
    const [content, setContent] = useState('')
    const [mdxKey, setKey] = useState(0)

    const title = useMemo(() => {
        const split = key?.split('_')
        if (!split) return key
        return `${split[0]} ${split[1]} `
    }, [key])

    useEffect(() => {
        getPeerReviewFile(key || '').then((worklog) => {
            setContent(worklog)
            setKey((prev) => prev + 1)
        })
    }, [key])

    return (
        <main className="min-h-svh flex flex-1 relative">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <SidebarTrigger />
                <div className="mx-auto w-3/4">
                    <h1 className="text-5xl text-center mb-10 font-bold">
                        {title}
                    </h1>
                    <div className="mb-4 dark-theme prose dark:prose-invert max-w-none">
                        <MDXEditor
                            readOnly
                            key={mdxKey}
                            markdown={content}
                            contentEditableClassName="prose"
                            plugins={[
                                headingsPlugin(),
                                quotePlugin(),
                                listsPlugin(),
                                thematicBreakPlugin(),
                                markdownShortcutPlugin(),
                            ]}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
