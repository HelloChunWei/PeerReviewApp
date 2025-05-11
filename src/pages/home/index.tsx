import { useCallback, useEffect, useMemo, useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { formatDate, getThreeDays } from '@/utils/dayjs'
import { clsx } from 'clsx/lite'
import { useIntersectionObserver } from 'usehooks-ts'
import { useCenterStore } from '@/store'
import { Link } from 'react-router'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useDialog from '@/hooks/use-dialog'
import ChooseAIToolDialog from '@/components/dialogs/ChoseAItoolDialog'
import dayjs from 'dayjs'
import { mathPathRegx } from '@/utils/regax'

type ReviewMap = {
    [key: string]: string[]
}

function App() {
    const { openDialog } = useDialog()
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    })

    const reviewResult = useCenterStore((state) => state.reviewResult)
    const getRevieMapByDate = useMemo(() => {
        const list = reviewResult
        return list.reduce((acc: ReviewMap, cur: string) => {
            const match = cur.match(mathPathRegx)
            if (match) {
                const date = match[1]
                const name = match[2]
                if (!acc[date]) acc[date] = []
                if (!acc[date].includes(name)) acc[date].push(name)
            }
            return acc
        }, {} as ReviewMap)
    }, [reviewResult])

    const getSameDateReview = useCallback(
        (date: number) => {
            const map = getRevieMapByDate
            const format = dayjs(date).format('YYYY-MM-DD')
            if (map[format]) {
                const nameList = Object.values(map[format])
                return nameList.map((name) => {
                    return {
                        key: `${format}_${name}`,
                        name,
                    }
                })
            }
            return []
        },
        [getRevieMapByDate]
    )
    const [dateList, setDateList] = useState(() => getThreeDays())

    useEffect(() => {
        setDateList([
            ...dateList,
            ...getThreeDays(dateList[dateList.length - 1]),
        ])
    }, [isIntersecting])

    const openChooseAIToolDialog = () => {
        openDialog(ChooseAIToolDialog)
    }
    return (
        <main className="min-h-svh flex flex-1">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <SidebarTrigger />
                <Button
                    onClick={openChooseAIToolDialog}
                    className="absolute right-6"
                    variant="ghost"
                    size="icon"
                >
                    <Play />
                </Button>
                <div id="content-block" className="mx-auto w-1/2 min-h-svh">
                    {dateList.map((date, index) => (
                        <div
                            key={date.toString()}
                            className={clsx(
                                'daily-block',
                                'border-b',
                                'mb-5',
                                index === 0 ? 'min-h-[500px]' : 'min-h-[300px]'
                            )}
                        >
                            <h1 className="text-left w-full font-bold text-4xl mb-10 box-border">
                                {formatDate(date)}
                            </h1>
                            <ul className="list-disc pl-5">
                                {getSameDateReview(date).map((data) => (
                                    <li key={data.key}>
                                        <Link to={`colleague/${data.key}`}>
                                            {data.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div
                        ref={ref}
                        id="last-element"
                        className="h-1 w-full"
                    ></div>
                    {/* <div className="flex justify-center">
                        <LoaderCircle className=" animate-spin h-10 w-10" />
                    </div> */}
                </div>
            </div>
        </main>
    )
}

export default App
