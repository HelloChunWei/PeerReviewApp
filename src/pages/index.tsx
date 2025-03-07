import React, { useEffect, useState } from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useNavigate } from 'react-router'
import { getSaveFilePath } from '@/utils/file'
import { formatDate, getThreeDays } from '@/utils/dayjs'
import { LoaderCircle } from 'lucide-react'
import { clsx } from 'clsx/lite'
import { useIntersectionObserver } from 'usehooks-ts'

function App() {
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    })

    const navigate = useNavigate()
    const [dateList, setDateList] = useState(() => getThreeDays())
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
    return (
        <main className="min-h-svh flex flex-1">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <SidebarTrigger />
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
                                <li></li>
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
