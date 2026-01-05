export type Novel = {
  id: string
  title: string
  author: string
  cover: string
  description: string
  totalChapters: number
  rating: number
  genre: string[]
}

export type Chapter = {
  id: string
  novelId: string
  chapterNumber: number
  title: string
  content: string
}

export type ReadingProgress = {
  novelId: string
  currentChapter: number
  currentPosition: number
}

export type Bookmark = {
  id: string
  novelId: string
  chapterNumber: number
  chapterId: string
  position: number
  quote: string
  timestamp: number
}

export type AppTheme = 'light' | 'dark'

export type BookshelfItem = {
  novelId: string
  addedDate: number
  lastReadDate: number
  status: 'reading' | 'completed' | 'dropped'
}
