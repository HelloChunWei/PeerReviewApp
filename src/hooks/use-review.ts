import { useCenterStore } from '@/store'
import { checkDateIsInTheQuarter } from '@/utils/dayjs'
import { generateReviewMapByname, generateReviewPrompt } from '@/utils/review'
import {  getClaudeReview, getOpenAIReview } from '@/api/'
import {  saveFile } from '@/utils/file'

const apiFunctionMap: Record<string, (prompt: string) => Promise<string>> = {
    openAi: getOpenAIReview,
    claudeAi: getClaudeReview
}

export default function useReview () {
    const choosedAiTool = useCenterStore((state) => state.choosedAiTool)
    const reviewResult = useCenterStore((state) => state.reviewResult)

    // quarter will be like: 2025-Q1
    const startReview = async (quarter: string) => {
        // TODO:
        // write result into file
        try {
            const api = apiFunctionMap[choosedAiTool]
            if (!api) throw new Error('Can not get API function')
            
            const needReviewList = reviewResult.filter((review) => {
                const reviewDate = review.split('_');
                return checkDateIsInTheQuarter(quarter, reviewDate[0])
            })
            const reviewMap = await generateReviewMapByname(needReviewList)
            
            const promises = Object.keys(reviewMap).map(async (name) => {
                const reviewData = reviewMap[name]
                const prompt = await generateReviewPrompt(name, reviewData)
                const result = await api(prompt)
                const title = `${quarter}_${name}`
                await saveFile('results', title, result)
                return { name, result }
            })

            const results = await Promise.all(promises)
            return results
        } catch(err) {
            console.error(err)
            throw err
        }
    }

    return {
        startReview
    }

}