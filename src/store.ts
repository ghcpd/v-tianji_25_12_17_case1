import { create } from 'zustand'
import { Novel, Chapter, ReadingProgress, Bookmark, AppTheme, BookshelfItem } from './types'
import { mockNovels, mockChapters } from './mockData'

interface NovelStore {
  // Data
  novels: Novel[]
  currentTheme: AppTheme
  fontSize: number
  
  // Reading Progress
  readingProgress: Record<string, ReadingProgress>
  bookshelf: Record<string, BookshelfItem>
  bookmarks: Bookmark[]
  
  // Actions
  getNovels: () => Novel[]
  getNovelById: (id: string) => Novel | undefined
  getChapters: (novelId: string) => Chapter[]
  getChapter: (novelId: string, chapterNumber: number) => Chapter | undefined
  
  // Reading Progress Actions
  updateReadingProgress: (novelId: string, currentChapter: number, currentPosition: number) => void
  getReadingProgress: (novelId: string) => ReadingProgress | undefined
  getProgressPercentage: (novelId: string) => number
  
  // Bookshelf Actions
  addToBookshelf: (novelId: string, status: 'reading' | 'completed' | 'dropped') => void
  removeFromBookshelf: (novelId: string) => void
  isInBookshelf: (novelId: string) => boolean
  getBookshelfItems: () => BookshelfItem[]
  updateBookshelfStatus: (novelId: string, status: 'reading' | 'completed' | 'dropped') => void
  
  // Bookmark Actions
  addBookmark: (novelId: string, chapterId: string, chapterNumber: number, position: number, quote: string) => void
  removeBookmark: (bookmarkId: string) => void
  getBookmarks: (novelId: string) => Bookmark[]
  isBookmarked: (novelId: string, chapterId: string, position: number) => boolean
  
  // Theme and Settings
  toggleTheme: () => void
  setFontSize: (size: number) => void
  increaseFontSize: () => void
  decreaseFontSize: () => void
}

export const useNovelStore = create<NovelStore>((set, get) => ({
  novels: mockNovels,
  currentTheme: 'light',
  fontSize: 16,
  readingProgress: {},
  bookshelf: {},
  bookmarks: [],
  
  getNovels: () => get().novels,
  
  getNovelById: (id: string) => get().novels.find(n => n.id === id),
  
  getChapters: (novelId: string) => mockChapters[novelId] || [],
  
  getChapter: (novelId: string, chapterNumber: number) => {
    const chapters = mockChapters[novelId] || []
    return chapters.find(c => c.chapterNumber === chapterNumber)
  },
  
  updateReadingProgress: (novelId: string, currentChapter: number, currentPosition: number) => {
    set(state => ({
      readingProgress: {
        ...state.readingProgress,
        [novelId]: {
          novelId,
          currentChapter: Math.min(currentChapter, (get().getNovelById(novelId)?.totalChapters || 1) - 1),
          currentPosition: Math.max(0, currentPosition)
        }
      }
    }))
  },
  
  getReadingProgress: (novelId: string) => get().readingProgress[novelId],
  
  getProgressPercentage: (novelId: string) => {
    const novel = get().getNovelById(novelId)
    if (!novel) return 0
    
    const progress = get().readingProgress[novelId]
    if (!progress) return 0
    
    const percentage = (progress.currentChapter / novel.totalChapters) * 100
    return Math.min(100, Math.max(0, percentage))
  },
  
  addToBookshelf: (novelId: string, status: 'reading' | 'completed' | 'dropped') => {
    set(state => ({
      bookshelf: {
        ...state.bookshelf,
        [novelId]: {
          novelId,
          addedDate: Date.now(),
          lastReadDate: Date.now(),
          status
        }
      }
    }))
  },
  
  removeFromBookshelf: (novelId: string) => {
    set(state => {
      const { [novelId]: _, ...rest } = state.bookshelf
      return { bookshelf: rest }
    })
  },
  
  isInBookshelf: (novelId: string) => !!get().bookshelf[novelId],
  
  getBookshelfItems: () => Object.values(get().bookshelf),
  
  updateBookshelfStatus: (novelId: string, status: 'reading' | 'completed' | 'dropped') => {
    set(state => {
      const item = state.bookshelf[novelId]
      if (!item) return state
      
      return {
        bookshelf: {
          ...state.bookshelf,
          [novelId]: {
            ...item,
            status,
            lastReadDate: Date.now()
          }
        }
      }
    })
  },
  
  addBookmark: (novelId: string, chapterId: string, chapterNumber: number, position: number, quote: string) => {
    const bookmarkId = `${novelId}-${chapterId}-${position}`
    set(state => ({
      bookmarks: [
        ...state.bookmarks.filter(b => b.id !== bookmarkId),
        {
          id: bookmarkId,
          novelId,
          chapterId,
          chapterNumber,
          position,
          quote,
          timestamp: Date.now()
        }
      ]
    }))
  },
  
  removeBookmark: (bookmarkId: string) => {
    set(state => ({
      bookmarks: state.bookmarks.filter(b => b.id !== bookmarkId)
    }))
  },
  
  getBookmarks: (novelId: string) => get().bookmarks.filter(b => b.novelId === novelId),
  
  isBookmarked: (novelId: string, chapterId: string, position: number) => {
    const bookmarkId = `${novelId}-${chapterId}-${position}`
    return get().bookmarks.some(b => b.id === bookmarkId)
  },
  
  toggleTheme: () => {
    set(state => ({
      currentTheme: state.currentTheme === 'light' ? 'dark' : 'light'
    }))
  },
  
  setFontSize: (size: number) => {
    set({ fontSize: Math.max(12, Math.min(28, size)) })
  },
  
  increaseFontSize: () => {
    set(state => ({
      fontSize: Math.min(28, state.fontSize + 2)
    }))
  },
  
  decreaseFontSize: () => {
    set(state => ({
      fontSize: Math.max(12, state.fontSize - 2)
    }))
  }
}))
