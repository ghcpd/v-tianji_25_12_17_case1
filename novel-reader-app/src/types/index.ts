export interface Novel {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  totalChapters: number;
  category: string;
}

export interface Chapter {
  id: string;
  novelId: string;
  chapterNumber: number;
  title: string;
  content: string;
}

export interface Bookmark {
  id: string;
  novelId: string;
  chapterId: string;
  position: number;
  note: string;
  createdAt: Date;
}

export interface ReadingProgress {
  novelId: string;
  currentChapter: number;
  position: number;
  lastReadAt: Date;
}

export interface UserPreferences {
  fontSize: number;
  theme: 'light' | 'dark';
  fontFamily: string;
}
