export type Chapter = {
  id: string
  title: string
  content: string
}

export type Novel = {
  id: string
  title: string
  author: string
  description?: string
  chapters: Chapter[]
}

export type Bookmark = {
  novelId: string
  chapterId: string
  position: number
  note?: string
}
