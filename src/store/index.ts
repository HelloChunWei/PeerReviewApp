import { create } from 'zustand'
import dayjs from 'dayjs'

// add () to match the file name
export const mathPathRegx = /^(\d{4}-\d{2}-\d{2})_([a-zA-Z0-9\u4e00-\u9fa5]+)\.md$/
type ReviewMap = {
  [key: string]: string[]
}

type SameDateReviewType = {
  key: string,
  name: string,
}[]

interface Center {
  path: string
  reviewResult: string[]
  choosedAiTool: string
  setSavePath: (pathString: string) => void
  setReviewResult: (result: string[]) => void
  setAiTool: (result: string) => void
  getReviewMap: () => ReviewMap
  getSameDateReview: (date: number) => SameDateReviewType
  getAllquarters: () => string[]
  
} 

export const useCenterStore = create<Center>()((set, get) => ({
    // state ====
    path: '',
    reviewResult: [],
    choosedAiTool: '',
    // getter ==== 
    getReviewMap: () => {
      const list = get().reviewResult
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
    },
    getSameDateReview: (date: number) => {
      const map = get().getReviewMap
      const format = dayjs(date).format('YYYY-MM-DD')
      if (map()[format]) {
        const nameList = Object.values(map()[format])
        return nameList.map((name) => {
          return {
            key: `${format}_${name}`,
            name
          }
        });
      }
      return []
    },
    getAllquarters: () => {
      // Get all quarters from review result
      // Use Set to avoid duplicate quarters
      const quarterSet = new Set<string>()
      get().reviewResult.forEach((filename) => {
          // Extract date from filename (format: YYYY-MM-DD_name)
          const date = filename.split('_')[0]
          // Split year and month
          const [year, month] = date.split('-')
          // Calculate quarter number (Q1-Q4) based on month
          const quarter = `${year}-Q${Math.ceil(parseInt(month) / 3)}`
          quarterSet.add(quarter)
      })
      return Array.from(quarterSet)
    },
    // action ====
    setSavePath: (pathString) => set(() => ({ path:  pathString })),
    setReviewResult: (result) => set((state) =>{
      const isSame = result.length === state.reviewResult.length &&
      result.every((item, idx) => item === state.reviewResult[idx])
      if (isSame) return {}
      return  {reviewResult: result}
    }),
    setAiTool: (result) =>set(() => ({ choosedAiTool:  result })),
  }));
