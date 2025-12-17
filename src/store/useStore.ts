import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { novels as initialNovels } from '../data/mockNovels'
import { Novel } from '../types'

type Settings = {
  theme: 'light' | 'dark'
  fontSize: number
}

type State = {
  novels: Novel[]
  bookshelf: string[] // novel ids
  bookmarks: { [key: string]: number } // key: novelId:chapterId -> position
  progress: { [novelId: string]: number } // percent
  settings: Settings
  addToBookshelf: (id: string) => void
  removeFromBookshelf: (id: string) => void
  setBookmark: (novelId: string, chapterId: string, position: number) => void
  removeBookmark: (novelId: string, chapterId: string) => void
  setProgress: (novelId: string, percent: number) => void
  setTheme: (theme: 'light' | 'dark') => void
  setFontSize: (size: number) => void
}

const useStore = create<State>()(
  persist(
    (set, get) => ({
      novels: initialNovels,
      bookshelf: [],
      bookmarks: {},
      progress: {},
      settings: { theme: 'light', fontSize: 18 },
      addToBookshelf: (id) => set((s) => ({ bookshelf: Array.from(new Set([...s.bookshelf, id])) })),
      removeFromBookshelf: (id) => set((s) => ({ bookshelf: s.bookshelf.filter((x) => x !== id) })),
      setBookmark: (novelId, chapterId, position) =>
        set((s) => ({ bookmarks: { ...s.bookmarks, [`${novelId}:${chapterId}`]: position } })),
      removeBookmark: (novelId, chapterId) => {
        const key = `${novelId}:${chapterId}`
        set((s) => {
          const copy = { ...s.bookmarks }
          delete copy[key]
          return { bookmarks: copy }
        })
      },
      setProgress: (novelId, percent) => set((s) => ({ progress: { ...s.progress, [novelId]: percent } })),
      setTheme: (theme) => set((s) => ({ settings: { ...s.settings, theme } })),
      setFontSize: (size) => set((s) => ({ settings: { ...s.settings, fontSize: size } }))
    }),
    { name: 'novel-reader-storage' }
  )
)

export default useStore
