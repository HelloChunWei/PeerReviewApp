import { useCenterStore } from '@/store'
import { checkDateIsInTheQuarter } from '@/utils/dayjs'
import { generateReviewMapByname, generateReviewPrompt } from '@/utils/review'
import {  getClaudeReview, getOpenAIReview, getGeminiAIReview } from '@/api/'
import {  saveFile, checkHasResultFile } from '@/utils/file'

const apiFunctionMap: Record<string, (prompt: string) => Promise<string>> = {
    openAi: getOpenAIReview,
    claudeAi: getClaudeReview,
    geminiAi: getGeminiAIReview
}

export default function useReview () {
    const choosedAiTool = useCenterStore((state) => state.choosedAiTool)
    const reviewResult = useCenterStore((state) => state.reviewResult)

    // quarter will be like: 2025-Q1
    const startReview = async (quarter: string, needResetOldResult: boolean, updateProgress: (percent: number) => void) => {
        try {
            const api = apiFunctionMap[choosedAiTool]
            if (!api) throw new Error('Can not get API function')
            
            const needReviewList = reviewResult.filter((review) => {
                const reviewDate = review.split('_');
                return checkDateIsInTheQuarter(quarter, reviewDate[0])
            })
            const reviewMap = await generateReviewMapByname(needReviewList)
            const keyList = Object.keys(reviewMap)
            
            const chunkSize = 4
            const results = []
            const totalChunks = Math.ceil(keyList.length / chunkSize)
            
            // Process 4 reviews at a time to avoid overwhelming the API
            for (let i = 0; i < keyList.length; i += chunkSize) {
                const chunk = keyList.slice(i, i + chunkSize)
                const currentChunk = Math.floor(i / chunkSize) + 1
                updateProgress(Math.round((currentChunk / totalChunks) * 100))
 
                const promises = chunk.map(async (name) => {
                    const reviewData = reviewMap[name]
                    const title = `${quarter}_${name}`
                    if (!needResetOldResult) {
                        const hasFile = await checkHasResultFile(title)
                        if (hasFile) return
                    }
                    const prompt = await generateReviewPrompt(name, reviewData)
                    const result = await api(prompt)
                    await saveFile('results', title, result)
                    return { name, result }
                })
                
                const chunkResults = await Promise.all(promises)
                results.push(...chunkResults)
            }
            
            updateProgress(100)
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