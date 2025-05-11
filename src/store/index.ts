import { create } from 'zustand'

interface Center {
  path: string
  reviewResult: string[]
  allPeerReviewResult: string[]
  choosedAiTool: string
  setSavePath: (pathString: string) => void
  setReviewResult: (result: string[]) => void
  setAiTool: (result: string) => void
  setAllPeerReview: (result: string[]) => void
  getAllquarters: () => string[]
  
} 

export const useCenterStore = create<Center>()((set, get) => ({
    // state ====
    path: '',
    reviewResult: [],
    allPeerReviewResult: [],
    choosedAiTool: '',
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
    setAllPeerReview: (result) => set((state) =>{
      const isSame = result.length === state.allPeerReviewResult.length &&
      result.every((item, idx) => item === state.allPeerReviewResult[idx])
      if (isSame) return {}
      return  {allPeerReviewResult: result}
    }),
  }))
