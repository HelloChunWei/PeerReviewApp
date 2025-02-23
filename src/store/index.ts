import { create } from 'zustand'

interface Center {
  path: string
  setSavePath: (pathString: string) => void
}

export const useCenterStore = create<Center>()((set) => ({
    path: '',
    setSavePath: (pathString) => set(() => ({ path:  pathString })),
  }));
