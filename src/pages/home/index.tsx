import React, { useEffect, useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useNavigate } from 'react-router'
import { getSaveFilePath } from '@/utils/file'
import { formatDate, getThreeDays } from '@/utils/dayjs'
import { clsx } from 'clsx/lite'
import { useIntersectionObserver } from 'usehooks-ts'
import { getAllReviewFile } from '@/utils/file'
import { useCenterStore } from '@/store'
import { Link } from 'react-router'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useDialog from '@/hooks/useDialog'
import ChooseAIToolDialog from '@/components/dialogs/ChoseAItoolDialog'

function App() {
    const { openDialog } = useDialog()
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    })

    const navigate = useNavigate()
    const setReviewResult = useCenterStore((state) => state.setReviewResult)
    const getSameDateReview = useCenterStore((state) => state.getSameDateReview)
    const [dateList, setDateList] = useState(() => getThreeDays())

    getAllReviewFile().then((result) => setReviewResult(result))
    useEffect(() => {
        let ignore = false
        getSaveFilePath().then((path) => {
            if (ignore) return
            if (!path) {
                return navigate('/welcome')
            }
        })
        return () => {
            ignore = true
        }
    }, [])

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
