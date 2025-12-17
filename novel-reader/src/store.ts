import { create } from 'zustand'
import { novels } from './data/novels'
import type { Novel, Chapter } from './data/novels'

export interface ReadingProgress {
  chapterId: string
  percent?: number
}

export interface Bookmark {
  chapterId: string
  excerpt: string
}

export interface AppState {
  novels: Novel[]
  // Current reading state
  currentNovelId?: string
  currentChapterId?: string

  // User data
  readingProgress: Record<string, ReadingProgress> // novelId -> progress
  bookmarks: Record<string, Bookmark[]> // novelId -> bookmarks
  bookshelf: Set<string> // set of novelIds

  // UI state
  theme: 'light' | 'dark'
  fontSize: number

  // Actions
  setCurrentNovel: (novelId: string) => void
  setCurrentChapter: (chapterId: string) => void
  advanceChapter: () => void
  toggleBookmark: (novelId: string, chapterId: string, excerpt: string) => void
  toggleBookshelf: (novelId: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  setFontSize: (size: number) => void
}

export const useStore = create<AppState>((set, get) => ({
  novels,
  currentNovelId: undefined,
  currentChapterId: undefined,
  readingProgress: {},
  bookmarks: {},
  bookshelf: new Set(),
  theme: 'light',
  fontSize: 16,

  setCurrentNovel: (novelId: string) => {
    const novel = novels.find((n) => n.id === novelId)
    const firstChapter = novel?.chapters[0]
    set({
      currentNovelId: novelId,
      currentChapterId: firstChapter?.id,
    })
  },
  setCurrentChapter: (chapterId: string) => set({ currentChapterId: chapterId }),
  advanceChapter: () => {
    const { currentNovelId, currentChapterId, novels } = get()
    if (!currentNovelId || !currentChapterId) return
    const novel = novels.find((n) => n.id === currentNovelId)
    if (!novel) return
    const idx = novel.chapters.findIndex((c) => c.id === currentChapterId)
    if (idx >= 0 && idx < novel.chapters.length - 1) {
      set({ currentChapterId: novel.chapters[idx + 1].id })
    }
  },
  toggleBookmark: (novelId: string, chapterId: string, excerpt: string) => {
    const bookmarks = get().bookmarks
    const arr = bookmarks[novelId] ?? []
    const exists = arr.find((b) => b.chapterId === chapterId && b.excerpt === excerpt)
    const newArr = exists ? arr.filter((b) => b !== exists) : [...arr, { chapterId, excerpt }]
    const updated = { ...bookmarks, [novelId]: newArr }
    // Remove key if array is empty
    if (newArr.length === 0) delete updated[novelId]
    set({ bookmarks: updated })
  },
  toggleBookshelf: (novelId: string) => {
    const shelfs = new Set(get().bookshelf)
    if (shelfs.has(novelId)) shelfs.delete(novelId)
    else shelfs.add(novelId)
    set({ bookshelf: shelfs })
  },
  setReadingProgress: (novelId: string, progress: ReadingProgress) => {
    set({ readingProgress: { ...get().readingProgress, [novelId]: progress } })
  },
  setTheme: (theme) => set({ theme }),
  setFontSize: (size) => set({ fontSize: size }),
}))
