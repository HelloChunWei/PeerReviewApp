import { useCenterStore } from '@/store'
import { checkDateIsInTheQuarter } from '@/utils/dayjs'

export default function useReview () {
    const choosedAiTool = useCenterStore((state) => state.choosedAiTool)
    const reviewResult = useCenterStore((state) => state.reviewResult)

    // quarter will be like: 2025-Q1
    const startReview = async (quarter: string) => {
        // TODO: 1 取得 quarter 內的 review
        // 讀取 file 
        // send to API review
        // write result into file
        const needReviewList = reviewResult.filter((review) => {
            const reviewDate = review.split('_');
            console.log('review', review)
            const isInTheRange = checkDateIsInTheQuarter(quarter, reviewDate[0])
            console.log(isInTheRange)
            console.log('----')
            return isInTheRange
        })
        console.log(needReviewList)
    }

    return {
        startReview
    }

}