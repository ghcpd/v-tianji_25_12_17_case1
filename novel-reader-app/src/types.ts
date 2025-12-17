export interface Novel {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface Bookmark {
  id: string;
  novelId: string;
  chapterId: string;
  position: number; // e.g., paragraph index
  note?: string;
}

export interface ReadingProgress {
  novelId: string;
  chapterId: string;
  position: number; // scroll position or paragraph
}

export interface AppState {
  novels: Novel[];
  bookshelf: string[]; // novel ids
  bookmarks: Bookmark[];
  progress: ReadingProgress[];
  theme: 'light' | 'dark';
  fontSize: number;
}